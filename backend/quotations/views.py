from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Quotation
from .serializers import QuotationSerializer
from .permissions import IsVendorOwnerOrReadOnly
from vendors.models import Vendor

class QuotationViewSet(viewsets.ModelViewSet):
    serializer_class = QuotationSerializer
    permission_classes = [IsAuthenticated, IsVendorOwnerOrReadOnly]

    def get_queryset(self):
        """
        If the user is a VENDOR, only show their own quotations.
        Otherwise, show all quotations (for Admin / Procurement Officer).
        """
        user = self.request.user
        if user.role == 'VENDOR':
            return Quotation.objects.filter(vendor__email=user.email).order_by('-submitted_at')
        return Quotation.objects.all().order_by('-submitted_at')

    def perform_create(self, serializer):
        """
        Automatically link the quotation to the logged-in vendor's profile based on email.
        """
        user = self.request.user
        try:
            vendor_profile = Vendor.objects.get(email=user.email)
            serializer.save(vendor=vendor_profile)
        except Vendor.DoesNotExist:
            # If for some reason the user doesn't have a matching vendor profile,
            # we let the serializer try to pull it from the request data, or it will fail validation
            # if `vendor` isn't provided or is read-only. We should ideally pass it.
            serializer.save()
