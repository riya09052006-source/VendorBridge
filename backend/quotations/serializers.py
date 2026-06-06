from rest_framework import serializers
from .models import Quotation
from django.utils import timezone

class QuotationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Quotation
        fields = '__all__'
        read_only_fields = ['id', 'submitted_at', 'updated_at']

    def validate(self, data):
        # Allow partial updates to skip RFQ checking if RFQ is not provided in data
        # but if it's an update, self.instance holds the current quotation.
        rfq = data.get('rfq', getattr(self.instance, 'rfq', None))
        
        if rfq:
            if rfq.deadline < timezone.now():
                raise serializers.ValidationError("Cannot submit or edit a quotation after the RFQ deadline has passed.")
            
            if rfq.status != 'OPEN':
                raise serializers.ValidationError(f"Cannot submit a quotation to an RFQ with status '{rfq.status}'.")

        return data
