from django.db import models
from rfqs.models import RFQ
from vendors.models import Vendor

class Quotation(models.Model):
    rfq = models.ForeignKey(RFQ, on_delete=models.CASCADE, related_name='quotations')
    vendor = models.ForeignKey(Vendor, on_delete=models.CASCADE, related_name='quotations')
    
    quoted_price = models.DecimalField(max_digits=12, decimal_places=2)
    delivery_days = models.PositiveIntegerField()
    notes = models.TextField(blank=True, null=True)
    
    submitted_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        # Prevent a single vendor from submitting multiple quotes to the same RFQ
        unique_together = ['rfq', 'vendor']

    def __str__(self):
        return f"Quote from {self.vendor.company_name} for {self.rfq.title}"
