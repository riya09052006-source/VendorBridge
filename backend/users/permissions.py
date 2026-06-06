from rest_framework.permissions import BasePermission

class IsAdminRole(BasePermission):
    """
    Allows access only to Admin users.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'ADMIN')

class IsProcurementOfficerRole(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'PROCUREMENT_OFFICER')

class IsVendorRole(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'VENDOR')

class IsManagerRole(BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.role == 'MANAGER')
