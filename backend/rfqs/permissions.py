from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsProcurementOfficerOrReadOnly(BasePermission):
    """
    Custom permission to only allow Procurement Officers or Admins to edit or create RFQs.
    Read-only permissions are allowed for any authenticated user.
    """
    def has_permission(self, request, view):
        # Read permissions are allowed to any authenticated request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        if request.method in SAFE_METHODS:
            return bool(request.user and request.user.is_authenticated)

        # Write permissions are only allowed to the PROCUREMENT_OFFICER or ADMIN roles.
        return bool(
            request.user and 
            request.user.is_authenticated and 
            request.user.role in ['PROCUREMENT_OFFICER', 'ADMIN']
        )
