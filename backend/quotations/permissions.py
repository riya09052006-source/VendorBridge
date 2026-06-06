from rest_framework.permissions import BasePermission, SAFE_METHODS
from vendors.models import Vendor

class IsVendorOwnerOrReadOnly(BasePermission):
    """
    Custom permission to only allow Vendors to edit their own quotations.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)

        return bool(request.user and request.user.is_authenticated and request.user.role == 'VENDOR')

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True

        # Ensure the quotation's vendor email matches the logged-in user's email
        return obj.vendor.email == request.user.email
