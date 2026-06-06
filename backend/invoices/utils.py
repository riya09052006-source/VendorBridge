import io
from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors

def generate_invoice_pdf(invoice):
    """
    Generates a PDF for the given invoice in a BytesIO buffer.
    Returns the buffer.
    """
    buffer = io.BytesIO()
    
    # Create the PDF object, using the buffer as its "file."
    p = canvas.Canvas(buffer, pagesize=letter)
    width, height = letter

    # Header
    p.setFont("Helvetica-Bold", 20)
    p.drawString(50, height - 50, "INVOICE")
    
    # Invoice Details
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 90, f"Invoice Number: {invoice.invoice_number}")
    p.drawString(50, height - 110, f"Date: {invoice.created_at.strftime('%Y-%m-%d')}")
    p.drawString(50, height - 130, f"Status: {invoice.status}")
    
    # Vendor Details
    vendor = invoice.purchase_order.quotation.vendor
    p.drawString(350, height - 90, "FROM:")
    p.drawString(350, height - 110, f"Vendor: {vendor.company_name}")
    p.drawString(350, height - 130, f"Email: {vendor.email}")
    p.drawString(350, height - 150, f"Phone: {vendor.phone}")
    
    # PO Details
    p.drawString(50, height - 170, f"Purchase Order: {invoice.purchase_order.po_number}")

    # Separator Line
    p.line(50, height - 190, width - 50, height - 190)

    # Financials
    p.setFont("Helvetica-Bold", 12)
    p.drawString(50, height - 220, "Summary")
    
    p.setFont("Helvetica", 12)
    p.drawString(50, height - 250, "Subtotal:")
    p.drawRightString(width - 50, height - 250, f"${invoice.subtotal}")
    
    p.drawString(50, height - 270, "Tax:")
    p.drawRightString(width - 50, height - 270, f"${invoice.tax}")
    
    p.setFont("Helvetica-Bold", 14)
    p.drawString(50, height - 300, "TOTAL:")
    p.drawRightString(width - 50, height - 300, f"${invoice.total}")

    # Footer
    p.setFont("Helvetica-Oblique", 10)
    p.setFillColor(colors.gray)
    p.drawCentredString(width / 2.0, 50, "Thank you for your business.")

    # Close the PDF object cleanly, and we're done.
    p.showPage()
    p.save()

    # File buffer needs to be rewinded to the beginning
    buffer.seek(0)
    return buffer
