from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import RFQ
from .serializers import RFQSerializer
from .permissions import IsProcurementOfficerOrReadOnly

class RFQViewSet(viewsets.ModelViewSet):
    serializer_class = RFQSerializer
    permission_classes = [IsAuthenticated, IsProcurementOfficerOrReadOnly]

    def get_queryset(self):
        """
        By default, we return all RFQs.
        If we wanted VENDORS to only see assigned RFQs, we could do:
        if self.request.user.role == 'VENDOR':
            return RFQ.objects.filter(assigned_vendors__email=self.request.user.email)
        """
        return RFQ.objects.all().order_by('-created_at')

    def perform_create(self, serializer):
        # Automatically set the user who created the RFQ
        serializer.save(created_by=self.request.user)
