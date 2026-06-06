from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Approval
from .serializers import ApprovalSerializer
from .permissions import IsManager

class ApprovalViewSet(viewsets.ModelViewSet):
    """
    A ViewSet for managing quotation approvals.
    Allows Managers to create approvals, and anyone authenticated to view history.
    """
    serializer_class = ApprovalSerializer
    permission_classes = [IsAuthenticated, IsManager]
    queryset = Approval.objects.all().order_by('-approved_at')

    def perform_create(self, serializer):
        # Automatically assign the logged-in manager to the approval
        serializer.save(manager=self.request.user)
