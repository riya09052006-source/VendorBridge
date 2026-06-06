from rest_framework import serializers
from .models import PurchaseOrder
from quotations.models import Quotation

class PurchaseOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PurchaseOrder
        fields = '__all__'
        read_only_fields = ['id', 'po_number', 'created_at', 'updated_at']

    def validate(self, data):
        # On creation or update, ensure the referenced quotation is actually APPROVED.
        quotation = data.get('quotation', getattr(self.instance, 'quotation', None))
        
        if quotation:
            # We look for an Approval linked to this quotation that has status 'APPROVED'
            # (Assuming a quotation can have an approval record)
            has_approved = quotation.approvals.filter(status='APPROVED').exists()
            if not has_approved:
                raise serializers.ValidationError("A Purchase Order can only be generated for a quotation that has been officially APPROVED.")
        
        return data
