import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import CertificateSeal from '../components/CertificateSeal';
import { Certificate } from '../store';

interface GenerateCertificateOptions {
  certificate: Certificate;
  username: string;
  verificationUrl: string;
}

export const generateCertificatePDF = async ({
  certificate,
  username,
  verificationUrl,
}: GenerateCertificateOptions): Promise<Blob> => {
  // Create a temporary container for the certificate content
  const container = document.createElement('div');
  container.style.position = 'absolute';
  container.style.left = '-9999px';
  container.style.top = '-9999px';
  document.body.appendChild(container);

  // Render the certificate seal
  const sealElement = document.createElement('div');
  const seal = new CertificateSeal({
    certificateId: certificate.id,
    timestamp: new Date().toISOString(),
    username,
    verificationUrl,
  });

  // Create the certificate content
  const content = `
    <div style="font-family: Arial, sans-serif; padding: 40px; max-width: 800px; margin: 0 auto;">
      <div style="text-align: center; margin-bottom: 40px;">
        <h1 style="color: #003366; font-size: 24px; margin-bottom: 10px;">
          Verification Certificate
        </h1>
        <p style="color: #666; font-size: 16px;">
          This document certifies the authenticity of the claim verification
        </p>
      </div>

      <div style="margin-bottom: 40px;">
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
          <div>
            <h3 style="color: #003366; font-size: 14px; margin-bottom: 5px;">Certificate ID</h3>
            <p style="color: #333; font-size: 16px;">${certificate.id}</p>
          </div>
          <div>
            <h3 style="color: #003366; font-size: 14px; margin-bottom: 5px;">Claim ID</h3>
            <p style="color: #333; font-size: 16px;">${certificate.claimId}</p>
          </div>
          <div>
            <h3 style="color: #003366; font-size: 14px; margin-bottom: 5px;">Issue Date</h3>
            <p style="color: #333; font-size: 16px;">
              ${new Date(certificate.issueDate).toLocaleDateString()}
            </p>
          </div>
          <div>
            <h3 style="color: #003366; font-size: 14px; margin-bottom: 5px;">Expiry Date</h3>
            <p style="color: #333; font-size: 16px;">
              ${new Date(certificate.expiryDate).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>

      <div style="margin-bottom: 40px;">
        <h2 style="color: #003366; font-size: 18px; margin-bottom: 20px;">
          Verification Details
        </h2>
        <p style="color: #333; font-size: 14px; line-height: 1.6;">
          This certificate has been generated and verified through our secure verification system.
          The authenticity of this document can be verified by scanning the QR code below or
          visiting the verification URL provided.
        </p>
      </div>

      <div style="text-align: center; margin-top: 40px;">
        <div id="certificate-seal"></div>
      </div>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #666; font-size: 12px; text-align: center;">
          This is a digitally generated certificate. For verification, please visit:<br />
          ${verificationUrl}
        </p>
      </div>
    </div>
  `;

  container.innerHTML = content;
  container.querySelector('#certificate-seal')?.appendChild(sealElement);

  // Convert the content to canvas
  const canvas = await html2canvas(container, {
    scale: 2,
    useCORS: true,
    logging: false,
  });

  // Generate PDF
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const imgData = canvas.toDataURL('image/png');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

  // Clean up
  document.body.removeChild(container);

  // Return the PDF as a blob
  return pdf.output('blob');
};

export const verifyCertificateSeal = async (
  certificateId: string,
  sealData: string
): Promise<{
  isValid: boolean;
  details: {
    certificateId: string;
    timestamp: string;
    username: string;
    verifiedBy: string;
    verificationUrl: string;
  };
}> => {
  try {
    const data = JSON.parse(sealData);
    
    // Verify the certificate ID matches
    if (data.certificateId !== certificateId) {
      throw new Error('Invalid certificate seal');
    }

    // Verify the timestamp is not too old (e.g., within 24 hours)
    const sealTimestamp = new Date(data.timestamp).getTime();
    const now = new Date().getTime();
    const hoursDiff = (now - sealTimestamp) / (1000 * 60 * 60);
    
    if (hoursDiff > 24) {
      throw new Error('Certificate seal has expired');
    }

    return {
      isValid: true,
      details: data,
    };
  } catch (error) {
    return {
      isValid: false,
      details: {
        certificateId: '',
        timestamp: '',
        username: '',
        verifiedBy: '',
        verificationUrl: '',
      },
    };
  }
}; 