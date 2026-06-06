from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import RFQ
from .serializers import RFQSerializer
from .permissions import IsProcurementOfficerOrReadOnly, IsProcurementOfficer

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

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated, IsProcurementOfficer])
    def comparison(self, request, pk=None):
        rfq = self.get_object()
        
        # Get all quotes for this RFQ sorted by price (ascending) and delivery days (ascending)
        quotations = rfq.quotations.all().order_by('quoted_price', 'delivery_days')
        
        lowest_price_vendor = None
        if quotations.exists():
            lowest_price_vendor = quotations.first().vendor.company_name
            
        data = []
        for q in quotations:
            data.append({
                'id': q.id,
                'vendor_name': q.vendor.company_name,
                'quoted_price': q.quoted_price,
                'delivery_days': q.delivery_days,
                'notes': q.notes,
                'submitted_at': q.submitted_at
            })
            
        return Response({
            'lowest_price_vendor': lowest_price_vendor,
            'quotations': data
        })
