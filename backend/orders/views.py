from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import PurchaseOrder
from .serializers import PurchaseOrderSerializer
from .permissions import IsProcurementOfficerOrVendorReadOnly

class PurchaseOrderViewSet(viewsets.ModelViewSet):
    serializer_class = PurchaseOrderSerializer
    permission_classes = [IsAuthenticated, IsProcurementOfficerOrVendorReadOnly]

    def get_queryset(self):
        """
        Vendors can only see their own Purchase Orders.
        Procurement Officers and Admins can see all Purchase Orders.
        """
        user = self.request.user
        if user.role == 'VENDOR':
            return PurchaseOrder.objects.filter(quotation__vendor__email=user.email).order_by('-created_at')
        return PurchaseOrder.objects.all().order_by('-created_at')
