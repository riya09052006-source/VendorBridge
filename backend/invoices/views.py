from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Invoice
from .serializers import InvoiceSerializer
from .permissions import IsVendorOwnerOrProcurementReadOnly

class InvoiceViewSet(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated, IsVendorOwnerOrProcurementReadOnly]

    def get_queryset(self):
        """
        Vendors can only see their own Invoices.
        Procurement Officers and Admins can see all Invoices.
        """
        user = self.request.user
        if user.role == 'VENDOR':
            return Invoice.objects.filter(purchase_order__quotation__vendor__email=user.email).order_by('-created_at')
        return Invoice.objects.all().order_by('-created_at')
