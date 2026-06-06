from django.db import models

class Vendor(models.Model):
    class Category(models.TextChoices):
        IT = 'IT', 'IT Services & Equipment'
        LOGISTICS = 'LOGISTICS', 'Logistics & Transport'
        RAW_MATERIALS = 'RAW_MATERIALS', 'Raw Materials'
        OFFICE_SUPPLIES = 'OFFICE_SUPPLIES', 'Office Supplies'
        SERVICES = 'SERVICES', 'Professional Services'
        OTHER = 'OTHER', 'Other'

    class Status(models.TextChoices):
        ACTIVE = 'ACTIVE', 'Active'
        INACTIVE = 'INACTIVE', 'Inactive'
        PENDING = 'PENDING', 'Pending Approval'

    company_name = models.CharField(max_length=255)
    gst_number = models.CharField(max_length=15, unique=True)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    address = models.TextField()
    category = models.CharField(max_length=50, choices=Category.choices, default=Category.OTHER)
    status = models.CharField(max_length=20, choices=Status.choices, default=Status.PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.company_name} ({self.gst_number})"
