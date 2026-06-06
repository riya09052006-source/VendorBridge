import uuid
from django.db import models
from django.utils import timezone
from quotations.models import Quotation

class PurchaseOrder(models.Model):
    class Status(models.TextChoices):
        ISSUED = 'ISSUED', 'Issued'
        ACCEPTED = 'ACCEPTED', 'Accepted'
        FULFILLED = 'FULFILLED', 'Fulfilled'
        CANCELLED = 'CANCELLED', 'Cancelled'

    po_number = models.CharField(max_length=50, unique=True, blank=True, editable=False)
    quotation = models.OneToOneField(Quotation, on_delete=models.CASCADE, related_name='purchase_order')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.ISSUED)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Auto-generate PO number if it doesn't exist
        if not self.po_number:
            date_str = timezone.now().strftime("%Y%m%d")
            short_uuid = str(uuid.uuid4().hex)[:6].upper()
            self.po_number = f"PO-{date_str}-{short_uuid}"
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.po_number} for {self.quotation.vendor.company_name}"
