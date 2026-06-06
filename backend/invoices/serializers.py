from rest_framework import serializers
from .models import Invoice

class InvoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Invoice
        fields = '__all__'
        read_only_fields = ['id', 'invoice_number', 'total', 'created_at', 'updated_at']

    def validate(self, data):
        # Additional validation can be added here
        # E.g. Ensuring tax and subtotal are positive
        if data.get('subtotal', 0) < 0 or data.get('tax', 0) < 0:
            raise serializers.ValidationError("Subtotal and tax must be positive amounts.")
        return data
