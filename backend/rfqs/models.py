from django.db import models
from django.conf import settings
from vendors.models import Vendor

class RFQ(models.Model):
    class Status(models.TextChoices):
        DRAFT = 'DRAFT', 'Draft'
        OPEN = 'OPEN', 'Open'
        CLOSED = 'CLOSED', 'Closed'

    title = models.CharField(max_length=255)
    description = models.TextField()
    quantity = models.PositiveIntegerField()
    deadline = models.DateTimeField()
    
    assigned_vendors = models.ManyToManyField(Vendor, related_name='assigned_rfqs', blank=True)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='created_rfqs')
    
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.DRAFT)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} (Qty: {self.quantity})"
