from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsProcurementOfficerOrVendorReadOnly(BasePermission):
    """
    Custom permission for Purchase Orders.
    - Procurement Officers and Admins can create and edit POs.
    - Vendors can only view POs (and the viewset will filter it to only their own).
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
            
        if request.method in SAFE_METHODS:
            return True

        return request.user.role in ['PROCUREMENT_OFFICER', 'ADMIN']

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            # Only allow Vendor to view if the PO belongs to them.
            if request.user.role == 'VENDOR':
                return obj.quotation.vendor.email == request.user.email
            return True

        # Only PROCUREMENT_OFFICER or ADMIN can update/delete
        return request.user.role in ['PROCUREMENT_OFFICER', 'ADMIN']
