import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { useStore } from '../store';

interface CertificateSealProps {
  certificateId: string;
  timestamp: string;
  username: string;
  verificationUrl: string;
}

const CertificateSeal: React.FC<CertificateSealProps> = ({
  certificateId,
  timestamp,
  username,
  verificationUrl,
}) => {
  const { user } = useStore();

  const sealData = {
    certificateId,
    timestamp,
    username,
    verifiedBy: user?.name || 'System',
    verificationUrl,
  };

  return (
    <div className="flex items-center justify-center p-4 bg-white rounded-lg border-2 border-primary-200">
      <div className="text-center">
        <div className="mb-2">
          <QRCodeSVG
            value={JSON.stringify(sealData)}
            size={120}
            level="H"
            includeMargin
            className="mx-auto"
          />
        </div>
        <div className="text-xs text-primary-600 space-y-1">
          <p className="font-semibold">Verified Certificate Seal</p>
          <p>Certificate ID: {certificateId}</p>
          <p>Verified by: {user?.name || 'System'}</p>
          <p>Timestamp: {new Date(timestamp).toLocaleString()}</p>
          <p className="text-[10px] text-primary-500">
            Scan QR code to verify authenticity
          </p>
        </div>
      </div>
    </div>
  );
};

export default CertificateSeal; 