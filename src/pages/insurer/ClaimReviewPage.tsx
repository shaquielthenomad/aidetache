import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, HelpCircle, Send, Description, Person, Image, VerifiedUser, BarChart2, Flag } from 'lucide-react';
import { useNotification } from '../../contexts/NotificationContext';
import Card from '../../components/Card';

interface ClaimReviewData {
  claimId: string;
  policyNumber: string;
  incidentDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'under_review';
  claimType: string;
  amount: number;
  submittedDate: string;
  analyst: string;
  claimant: {
    name: string;
    address: string;
    phone: string;
    email: string;
    dob: string;
    occupation: string;
  };
  images: Array<{
    id: string;
    url: string;
  }>;
  verification: {
    imageVerification: 'passed' | 'failed';
    documentVerification: 'passed' | 'failed';
    claimHistory: string;
    confidence: number;
  };
  notes: string;
}

const ClaimReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [comment, setComment] = useState('');
  const [claimData, setClaimData] = useState<ClaimReviewData>({
    claimId: '123456789',
    policyNumber: 'POL-987654321',
    incidentDate: '2024-07-20',
    status: 'under_review',
    claimType: 'Auto Accident',
    amount: 5000,
    submittedDate: '2024-07-22',
    analyst: 'Emily Carter',
    claimant: {
      name: 'Sarah Johnson',
      address: '123 Maple Street, Anytown, USA',
      phone: '(555) 123-4567',
      email: 'sarah.johnson@email.com',
      dob: '1985-05-15',
      occupation: 'Teacher'
    },
    images: [
      {
        id: '1',
        url: 'https://example.com/image1.jpg'
      },
      {
        id: '2',
        url: 'https://example.com/image2.jpg'
      },
      {
        id: '3',
        url: 'https://example.com/image3.jpg'
      }
    ],
    verification: {
      imageVerification: 'passed',
      documentVerification: 'passed',
      claimHistory: 'No prior claims',
      confidence: 95
    },
    notes: 'No flags raised during automated analysis. Claim appears to be consistent with policy terms and incident report.'
  });

  const handleApprove = async () => {
    try {
      // TODO: Implement actual API call
      addNotification({
        type: 'success',
        message: 'Claim approved successfully'
      });
      navigate('/insurer/claims');
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to approve claim'
      });
    }
  };

  const handleReject = async () => {
    try {
      // TODO: Implement actual API call
      addNotification({
        type: 'success',
        message: 'Claim rejected successfully'
      });
      navigate('/insurer/claims');
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to reject claim'
      });
    }
  };

  const handleRequestInfo = async () => {
    try {
      // TODO: Implement actual API call
      addNotification({
        type: 'success',
        message: 'Information request sent successfully'
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to send information request'
      });
    }
  };

  const handleSubmitComment = async () => {
    if (!comment.trim()) {
      addNotification({
        type: 'error',
        message: 'Please enter a comment'
      });
      return;
    }

    try {
      // TODO: Implement actual API call
      addNotification({
        type: 'success',
        message: 'Comment submitted successfully'
      });
      setComment('');
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to submit comment'
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#111318] text-white">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 p-4 text-sm">
          <button 
            onClick={() => navigate('/insurer/claims')}
            className="text-[#9da4b9] hover:text-white transition-colors"
          >
            Claims
          </button>
          <span className="text-[#9da4b9]">/</span>
          <span className="text-white font-medium">Claim Review</span>
        </div>

        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4 p-4 mb-6">
          <div className="flex flex-col gap-1">
            <h1 className="text-white text-3xl font-bold leading-tight">Claim Review</h1>
            <p className="text-[#9da4b9] text-sm">
              Review and manage claim details for policyholder:{' '}
              <span className="text-white font-medium">{claimData.claimant.name}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Claim Details */}
            <Card className="bg-[#1c1e27] p-6 rounded-xl shadow-lg">
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <Description className="text-[#1142d4] w-5 h-5" />
                Claim Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div className="flex flex-col gap-1 py-2 pr-2 border-b border-[#282c39]">
                  <p className="text-[#9da4b9]">Claim ID</p>
                  <p className="text-white font-medium">#{claimData.claimId}</p>
                </div>
                <div className="flex flex-col gap-1 py-2 pl-0 sm:pl-2 border-b border-[#282c39]">
                  <p className="text-[#9da4b9]">Policy Number</p>
                  <p className="text-white font-medium">{claimData.policyNumber}</p>
                </div>
                {/* Add other claim details similarly */}
              </div>
            </Card>

            {/* Claimant Information */}
            <Card className="bg-[#1c1e27] p-6 rounded-xl shadow-lg">
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <Person className="text-[#1142d4] w-5 h-5" />
                Claimant Information
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                {/* Add claimant information fields */}
              </div>
            </Card>

            {/* Submitted Images */}
            <Card className="bg-[#1c1e27] p-6 rounded-xl shadow-lg">
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <Image className="text-[#1142d4] w-5 h-5" />
                Submitted Images
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {claimData.images.map((image) => (
                  <div
                    key={image.id}
                    className="bg-center bg-no-repeat bg-cover aspect-square rounded-lg border border-[#282c39] hover:opacity-80 transition-opacity cursor-pointer"
                    style={{ backgroundImage: `url(${image.url})` }}
                  />
                ))}
              </div>
            </Card>

            {/* Verification Results */}
            <Card className="bg-[#1c1e27] p-6 rounded-xl shadow-lg">
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <VerifiedUser className="text-[#1142d4] w-5 h-5" />
                Verification Results
              </h3>
              <div className="space-y-4 text-sm">
                {/* Add verification results */}
              </div>
            </Card>

            {/* Confidence Level */}
            <Card className="bg-[#1c1e27] p-6 rounded-xl shadow-lg">
              <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                <BarChart2 className="text-[#1142d4] w-5 h-5" />
                Confidence Level
              </h3>
              <div className="flex items-center justify-between mb-1">
                <p className="text-green-400 text-sm font-medium">High Confidence</p>
                <p className="text-white text-sm font-semibold">{claimData.verification.confidence}%</p>
              </div>
              <div className="w-full bg-[#282c39] rounded-full h-2.5">
                <div
                  className="bg-green-500 h-2.5 rounded-full"
                  style={{ width: `${claimData.verification.confidence}%` }}
                />
              </div>
            </Card>

            {/* Notes & Flags */}
            <Card className="bg-[#1c1e27] p-6 rounded-xl shadow-lg">
              <h3 className="text-white text-xl font-semibold mb-4 flex items-center gap-2">
                <Flag className="text-[#1142d4] w-5 h-5" />
                Notes & Flags
              </h3>
              <p className="text-[#9da4b9] text-sm leading-relaxed">
                {claimData.notes}
              </p>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="bg-[#1c1e27] p-6 rounded-xl shadow-lg">
              <h3 className="text-white text-xl font-semibold mb-6 flex items-center gap-2">
                <CheckCircle className="text-[#1142d4] w-5 h-5" />
                Actions
              </h3>
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleApprove}
                  className="flex items-center justify-center gap-2 w-full h-10 px-4 rounded-md bg-[#1142d4] hover:bg-blue-700 text-white text-sm font-medium transition-colors"
                >
                  <CheckCircle className="w-4 h-4" />
                  Approve Claim
                </button>
                <button
                  onClick={handleReject}
                  className="flex items-center justify-center gap-2 w-full h-10 px-4 rounded-md bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-colors"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Claim
                </button>
                <button
                  onClick={handleRequestInfo}
                  className="flex items-center justify-center gap-2 w-full h-10 px-4 rounded-md bg-[#282c39] hover:bg-[#3b4154] text-white text-sm font-medium transition-colors"
                >
                  <HelpCircle className="w-4 h-4" />
                  Request Additional Info
                </button>
              </div>

              <h3 className="text-white text-xl font-semibold my-6 flex items-center gap-2">
                <Send className="text-[#1142d4] w-5 h-5" />
                Comments
              </h3>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full min-h-32 resize-none rounded-md text-white bg-[#111318] border border-[#282c39] focus:border-[#1142d4] focus:ring-1 focus:ring-[#1142d4] p-3 text-sm placeholder:text-[#9da4b9]"
                placeholder="Add a comment..."
              />
              <button
                onClick={handleSubmitComment}
                className="flex items-center justify-center gap-2 w-full h-10 px-4 mt-3 rounded-md bg-[#282c39] hover:bg-[#3b4154] text-white text-sm font-medium transition-colors"
              >
                <Send className="w-4 h-4" />
                Submit Comment
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaimReviewPage; 