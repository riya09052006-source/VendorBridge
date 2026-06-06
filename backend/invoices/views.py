from django.http import FileResponse
from django.core.mail import EmailMessage
from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Invoice
from .serializers import InvoiceSerializer
from .permissions import IsVendorOwnerOrProcurementReadOnly
from .utils import generate_invoice_pdf

class InvoiceViewSet(viewsets.ModelViewSet):
    serializer_class = InvoiceSerializer
    permission_classes = [IsAuthenticated, IsVendorOwnerOrProcurementReadOnly]

    def get_queryset(self):
        """
        Vendors can only see their own Invoices.
        Procurement Officers and Admins can see all Invoices.
        """
        user = self.request.user
        if user.role == 'VENDOR':
            return Invoice.objects.filter(purchase_order__quotation__vendor__email=user.email).order_by('-created_at')
        return Invoice.objects.all().order_by('-created_at')

    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        invoice = self.get_object()
        pdf_buffer = generate_invoice_pdf(invoice)
        
        response = FileResponse(pdf_buffer, as_attachment=True, filename=f'{invoice.invoice_number}.pdf')
        return response

    @action(detail=True, methods=['post'])
    def email_invoice(self, request, pk=None):
        invoice = self.get_object()
        pdf_buffer = generate_invoice_pdf(invoice)
        vendor_email = invoice.purchase_order.quotation.vendor.email
        
        email = EmailMessage(
            subject=f'Invoice {invoice.invoice_number}',
            body=f'Please find attached the invoice {invoice.invoice_number} for PO {invoice.purchase_order.po_number}.',
            from_email='noreply@vendorbridge.com',
            to=[vendor_email],
        )
        # Attach the PDF
        email.attach(f'{invoice.invoice_number}.pdf', pdf_buffer.getvalue(), 'application/pdf')
        email.send()

        return Response({'message': f'Invoice {invoice.invoice_number} emailed to {vendor_email}'})

