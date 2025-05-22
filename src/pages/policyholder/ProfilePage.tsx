import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import { User, Shield, FileText, Clock, Mail, Phone } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../../components/Card';
import Button from '../../components/Button';

interface ProfileData {
  name: string;
  email: string;
  phone: string;
  policyNumber: string;
  joinDate: string;
  lastLogin: string;
  verificationStatus: 'verified' | 'pending' | 'unverified';
  documents: Array<{
    id: string;
    name: string;
    type: string;
    uploadedAt: string;
    status: 'verified' | 'pending' | 'rejected';
  }>;
}

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // TODO: Replace with actual API call
        const mockData: ProfileData = {
          name: user?.name || 'John Doe',
          email: user?.email || 'john.doe@example.com',
          phone: '+27 12 345 6789',
          policyNumber: 'POL-2024-001',
          joinDate: new Date().toISOString(),
          lastLogin: new Date().toISOString(),
          verificationStatus: 'verified',
          documents: [
            {
              id: '1',
              name: 'ID Document',
              type: 'identity',
              uploadedAt: new Date().toISOString(),
              status: 'verified'
            },
            {
              id: '2',
              name: 'Proof of Address',
              type: 'address',
              uploadedAt: new Date().toISOString(),
              status: 'pending'
            }
          ]
        };
        setProfileData(mockData);
      } catch (error: any) {
        addNotification({
          type: 'error',
          message: error.message || 'Failed to load profile data'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user, addNotification]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded w-1/4"></div>
            <div className="h-64 bg-white/10 rounded"></div>
            <div className="h-32 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-error-50 border-error-200">
            <CardBody className="text-error-800">
              <h2 className="text-lg font-semibold">Error Loading Profile</h2>
              <p className="mt-2">Unable to load profile data. Please try again later.</p>
              <Button
                variant="error"
                className="mt-4"
                onClick={() => window.location.reload()}
              >
                Retry
              </Button>
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#003366] text-white p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Profile</h1>
          <p className="text-primary-200">Manage your account and verification status</p>
        </div>

        {/* Profile Overview */}
        <Card className="shadow-lg mb-8">
          <CardHeader className="bg-primary-50">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-primary-800">Profile Overview</h2>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                profileData.verificationStatus === 'verified' 
                  ? 'bg-success-100 text-success-800'
                  : profileData.verificationStatus === 'pending'
                  ? 'bg-warning-100 text-warning-800'
                  : 'bg-error-100 text-error-800'
              }`}>
                {profileData.verificationStatus === 'verified' ? (
                  <>
                    <Shield className="w-3 h-3 mr-1" />
                    Verified
                  </>
                ) : profileData.verificationStatus === 'pending' ? (
                  <>
                    <Clock className="w-3 h-3 mr-1" />
                    Pending
                  </>
                ) : (
                  <>
                    <Shield className="w-3 h-3 mr-1" />
                    Unverified
                  </>
                )}
              </span>
            </div>
          </CardHeader>
          <CardBody className="text-primary-800">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-primary-600">Personal Information</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-2 text-primary-500" />
                    <span>{profileData.name}</span>
                  </div>
                  <div className="flex items-center">
                    <Mail className="w-4 h-4 mr-2 text-primary-500" />
                    <span>{profileData.email}</span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-primary-500" />
                    <span>{profileData.phone}</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium text-primary-600">Policy Information</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center">
                    <FileText className="w-4 h-4 mr-2 text-primary-500" />
                    <span>Policy Number: {profileData.policyNumber}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary-500" />
                    <span>Member since: {new Date(profileData.joinDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="w-4 h-4 mr-2 text-primary-500" />
                    <span>Last login: {new Date(profileData.lastLogin).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Documents */}
        <Card className="shadow-lg">
          <CardHeader className="bg-primary-50">
            <h2 className="text-xl font-semibold text-primary-800">Documents</h2>
          </CardHeader>
          <CardBody className="text-primary-800">
            <div className="space-y-4">
              {profileData.documents.map((doc) => (
                <div
                  key={doc.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-primary-100"
                >
                  <div className="flex items-center space-x-3">
                    <FileText className="w-5 h-5 text-primary-500" />
                    <div>
                      <p className="text-sm font-medium text-primary-800">{doc.name}</p>
                      <p className="text-xs text-primary-500">
                        Uploaded: {new Date(doc.uploadedAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    doc.status === 'verified'
                      ? 'bg-success-100 text-success-800'
                      : doc.status === 'pending'
                      ? 'bg-warning-100 text-warning-800'
                      : 'bg-error-100 text-error-800'
                  }`}>
                    {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <Button variant="primary">
                Upload New Document
              </Button>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage; 