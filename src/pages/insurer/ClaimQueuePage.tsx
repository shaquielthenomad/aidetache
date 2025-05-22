import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Clock, CheckCircle, XCircle, AlertCircle, Search, Filter, Download } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import { useNotification } from '../../contexts/NotificationContext';

interface Claim {
  id: string;
  policyholderId: string;
  policyholderName: string;
  policyNumber: string;
  type: string;
  status: 'pending' | 'approved' | 'rejected';
  amount: number;
  submittedAt: string;
  documents: Array<{
    id: string;
    name: string;
    type: string;
    url: string;
    uploadedAt: string;
  }>;
  verificationResult?: {
    passed: boolean;
    confidence: number;
    timestamp: string;
  };
}

const ClaimQueuePage: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [claims, setClaims] = useState<Claim[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationNote, setVerificationNote] = useState('');

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        // TODO: Replace with actual API call
        const mockData: Claim[] = [
          {
            id: 'CLM-001',
            policyholderId: '1',
            policyholderName: 'John Doe',
            policyNumber: 'POL-2024-001',
            type: 'Vehicle Damage',
            status: 'pending',
            amount: 5000,
            submittedAt: new Date().toISOString(),
            documents: [
              {
                id: 'DOC-001',
                name: 'Damage Photos',
                type: 'image',
                url: '#',
                uploadedAt: new Date().toISOString()
              }
            ],
            verificationResult: {
              passed: true,
              confidence: 95,
              timestamp: new Date().toISOString()
            }
          }
        ];
        setClaims(mockData);
      } catch (error: any) {
        addNotification({
          type: 'error',
          message: error.message || 'Failed to load claims'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchClaims();
  }, [addNotification]);

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.policyholderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.policyNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || claim.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (claim: Claim) => {
    setSelectedClaim(claim);
    navigate(`/insurer/claims/${claim.id}`);
  };

  const handleVerify = async (claim: Claim) => {
    try {
      // TODO: Implement actual verification API call
      const updatedClaim = { ...claim, status: 'approved' as const };
      setClaims(claims.map(c => c.id === claim.id ? updatedClaim : c));
      
      addNotification({
        type: 'success',
        message: 'Claim verified successfully'
      });
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to verify claim'
      });
    }
  };

  const handleReject = async (claim: Claim) => {
    if (!verificationNote.trim()) {
      addNotification({
        type: 'error',
        message: 'Please provide a reason for rejection'
      });
      return;
    }

    try {
      // TODO: Implement actual rejection API call
      const updatedClaim = { ...claim, status: 'rejected' as const };
      setClaims(claims.map(c => c.id === claim.id ? updatedClaim : c));
      
      addNotification({
        type: 'success',
        message: 'Claim rejected successfully'
      });
      
      setShowVerificationModal(false);
      setVerificationNote('');
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to reject claim'
      });
    }
  };

  const handleExportData = () => {
    // TODO: Implement export functionality
    addNotification({
      type: 'info',
      message: 'Export functionality coming soon'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded w-1/4"></div>
            <div className="h-64 bg-white/10 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#003366] text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Claim Queue</h1>
            <p className="text-primary-200">Review and process insurance claims</p>
          </div>
          <Button
            variant="secondary"
            onClick={handleExportData}
          >
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>

        {/* Search and Filter */}
        <Card className="shadow-lg mb-6">
          <CardBody>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="w-5 h-5 text-primary-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Search by policyholder, policy number, or claim ID..."
                    className="w-full pl-10 pr-4 py-2 rounded-lg border border-primary-200 bg-white text-primary-800 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Button
                  variant={filter === 'all' ? 'primary' : 'outline'}
                  onClick={() => setFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={filter === 'pending' ? 'primary' : 'outline'}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant={filter === 'approved' ? 'primary' : 'outline'}
                  onClick={() => setFilter('approved')}
                >
                  Approved
                </Button>
                <Button
                  variant={filter === 'rejected' ? 'primary' : 'outline'}
                  onClick={() => setFilter('rejected')}
                >
                  Rejected
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Claims List */}
        <Card className="shadow-lg">
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-primary-200">
                <thead className="bg-primary-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Claim Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Policyholder
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Verification
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Submitted
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-primary-200">
                  {filteredClaims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-primary-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-primary-900">{claim.id}</div>
                        <div className="text-sm text-primary-500">{claim.type}</div>
                        <div className="text-sm text-primary-900">R{claim.amount.toLocaleString()}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-primary-900">{claim.policyholderName}</div>
                        <div className="text-sm text-primary-500">{claim.policyNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          claim.status === 'approved'
                            ? 'bg-success-100 text-success-800'
                            : claim.status === 'rejected'
                            ? 'bg-error-100 text-error-800'
                            : 'bg-warning-100 text-warning-800'
                        }`}>
                          {claim.status === 'approved' ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Approved
                            </>
                          ) : claim.status === 'rejected' ? (
                            <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Rejected
                            </>
                          ) : (
                            <>
                              <Clock className="w-3 h-3 mr-1" />
                              Pending
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {claim.verificationResult ? (
                          <div>
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              claim.verificationResult.passed
                                ? 'bg-success-100 text-success-800'
                                : 'bg-error-100 text-error-800'
                            }`}>
                              {claim.verificationResult.passed ? (
                                <>
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Passed
                                </>
                              ) : (
                                <>
                                  <XCircle className="w-3 h-3 mr-1" />
                                  Failed
                                </>
                              )}
                            </span>
                            <div className="text-xs text-primary-500 mt-1">
                              {claim.verificationResult.confidence}% confidence
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-primary-500">Not verified</span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-primary-900">
                          {new Date(claim.submittedAt).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-primary-500">
                          {new Date(claim.submittedAt).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(claim)}
                          >
                            View
                          </Button>
                          {claim.status === 'pending' && (
                            <>
                              <Button
                                variant="success"
                                size="sm"
                                onClick={() => handleVerify(claim)}
                              >
                                <CheckCircle className="w-4 h-4 mr-1" />
                                Verify
                              </Button>
                              <Button
                                variant="error"
                                size="sm"
                                onClick={() => {
                                  setSelectedClaim(claim);
                                  setShowVerificationModal(true);
                                }}
                              >
                                <XCircle className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>

        {/* Rejection Modal */}
        {showVerificationModal && selectedClaim && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <Card className="max-w-lg w-full">
              <CardHeader className="bg-error-50">
                <h2 className="text-xl font-semibold text-error-800">Reject Claim</h2>
              </CardHeader>
              <CardBody>
                <p className="text-primary-800 mb-4">
                  Please provide a reason for rejecting this claim:
                </p>
                <textarea
                  className="w-full p-2 border border-primary-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={4}
                  value={verificationNote}
                  onChange={(e) => setVerificationNote(e.target.value)}
                  placeholder="Enter rejection reason..."
                />
                <div className="flex justify-end space-x-2 mt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setShowVerificationModal(false);
                      setVerificationNote('');
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="error"
                    onClick={() => handleReject(selectedClaim)}
                  >
                    Confirm Rejection
                  </Button>
                </div>
              </CardBody>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClaimQueuePage; 