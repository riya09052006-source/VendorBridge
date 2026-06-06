from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsVendorOwnerOrProcurementReadOnly(BasePermission):
    """
    Custom permission for Invoices.
    - Vendors can create/edit invoices, but only for their own Purchase Orders.
    - Procurement Officers/Admins can read all invoices and update their status (e.g. to PAID).
    """
    def has_permission(self, request, view):
        if not request.user or not request.user.is_authenticated:
            return False
        return True

    def has_object_permission(self, request, view, obj):
        # Vendors can only access their own invoices
        if request.user.role == 'VENDOR':
            return obj.purchase_order.quotation.vendor.email == request.user.email
            
        # Admins and Procurement Officers can read and update status
        if request.user.role in ['PROCUREMENT_OFFICER', 'ADMIN']:
            return True
            
        return False
