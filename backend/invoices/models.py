import uuid
from django.db import models
from django.utils import timezone
from orders.models import PurchaseOrder

class Invoice(models.Model):
    class Status(models.TextChoices):
        PENDING = 'PENDING', 'Pending'
        PAID = 'PAID', 'Paid'
        OVERDUE = 'OVERDUE', 'Overdue'

    invoice_number = models.CharField(max_length=50, unique=True, blank=True, editable=False)
    purchase_order = models.OneToOneField(PurchaseOrder, on_delete=models.CASCADE, related_name='invoice')
    
    subtotal = models.DecimalField(max_digits=12, decimal_places=2)
    tax = models.DecimalField(max_digits=12, decimal_places=2)
    total = models.DecimalField(max_digits=12, decimal_places=2, blank=True)
    
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def save(self, *args, **kwargs):
        # Auto-calculate total
        if self.subtotal is not None and self.tax is not None:
            self.total = self.subtotal + self.tax
            
        # Auto-generate invoice number if it doesn't exist
        if not self.invoice_number:
            date_str = timezone.now().strftime("%Y%m%d")
            short_uuid = str(uuid.uuid4().hex)[:6].upper()
            self.invoice_number = f"INV-{date_str}-{short_uuid}"
            
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.invoice_number} for {self.purchase_order.po_number}"
