from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsManager(BasePermission):
    """
    Custom permission to only allow Managers to create or update approvals.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)

        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['MANAGER', 'ADMIN']
        )
