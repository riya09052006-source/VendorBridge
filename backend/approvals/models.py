from django.db import models
from django.conf import settings
from quotations.models import Quotation

class Approval(models.Model):
    class Status(models.TextChoices):
        APPROVED = 'APPROVED', 'Approved'
        REJECTED = 'REJECTED', 'Rejected'
        PENDING = 'PENDING', 'Pending'

    quotation = models.ForeignKey(Quotation, on_delete=models.CASCADE, related_name='approvals')
    manager = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='given_approvals')
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)
    remarks = models.TextField(blank=True, null=True)
    
    approved_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.status} on {self.quotation} by {self.manager.email}"
