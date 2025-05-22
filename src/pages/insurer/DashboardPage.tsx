import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2, TrendingUp, AlertTriangle, CheckCircle, XCircle, Clock, FileText, Users, DollarSign, Shield } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import { useNotification } from '../../contexts/NotificationContext';

interface DashboardData {
  overview: {
    totalClaims: number;
    pendingClaims: number;
    approvedClaims: number;
    rejectedClaims: number;
    totalPayouts: number;
    activePolicies: number;
    fraudDetectionRate: number;
  };
  recentActivity: Array<{
    id: string;
    type: 'claim' | 'policy' | 'verification';
    status: 'pending' | 'approved' | 'rejected';
    title: string;
    description: string;
    timestamp: string;
    amount?: number;
  }>;
  quickStats: {
    averageProcessingTime: number;
    customerSatisfaction: number;
    fraudPrevention: number;
    policyRetention: number;
  };
}

const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // TODO: Replace with actual API call
        const mockData: DashboardData = {
          overview: {
            totalClaims: 150,
            pendingClaims: 25,
            approvedClaims: 100,
            rejectedClaims: 25,
            totalPayouts: 500000,
            activePolicies: 1000,
            fraudDetectionRate: 15
          },
          recentActivity: [
            {
              id: 'CLM-001',
              type: 'claim',
              status: 'pending',
              title: 'Vehicle Damage Claim',
              description: 'New claim submitted by John Doe',
              timestamp: new Date().toISOString(),
              amount: 5000
            },
            {
              id: 'POL-001',
              type: 'policy',
              status: 'approved',
              title: 'New Policy Activation',
              description: 'Policy activated for Sarah Smith',
              timestamp: new Date(Date.now() - 3600000).toISOString()
            },
            {
              id: 'VER-001',
              type: 'verification',
              status: 'rejected',
              title: 'Document Verification Failed',
              description: 'Image manipulation detected in claim documents',
              timestamp: new Date(Date.now() - 7200000).toISOString()
            }
          ],
          quickStats: {
            averageProcessingTime: 2.5,
            customerSatisfaction: 92,
            fraudPrevention: 85,
            policyRetention: 88
          }
        };
        setDashboardData(mockData);
      } catch (error: any) {
        addNotification({
          type: 'error',
          message: error.message || 'Failed to load dashboard data'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [addNotification]);

  const handleViewClaims = () => {
    navigate('/insurer/claims');
  };

  const handleViewAnalytics = () => {
    navigate('/insurer/analytics');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-4">
            <div className="h-8 bg-white/10 rounded w-1/4"></div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="h-32 bg-white/10 rounded"></div>
              <div className="h-32 bg-white/10 rounded"></div>
              <div className="h-32 bg-white/10 rounded"></div>
              <div className="h-32 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!dashboardData) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-error-50 border-error-200">
            <CardBody className="text-error-800">
              <h2 className="text-lg font-semibold">Error Loading Dashboard</h2>
              <p className="mt-2">Unable to load dashboard data. Please try again later.</p>
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
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">Insurer Dashboard</h1>
            <p className="text-primary-200">Welcome back! Here's your overview</p>
          </div>
          <div className="flex space-x-4">
            <Button
              variant="primary"
              onClick={handleViewClaims}
            >
              <FileText className="w-4 h-4 mr-2" />
              View Claims
            </Button>
            <Button
              variant="secondary"
              onClick={handleViewAnalytics}
            >
              <BarChart2 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600">Total Claims</p>
                  <p className="text-2xl font-bold text-primary-800">{dashboardData.overview.totalClaims}</p>
                </div>
                <div className="bg-primary-100 rounded-full p-3">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-xs text-primary-600">Pending</p>
                  <p className="text-sm font-medium text-warning-600">{dashboardData.overview.pendingClaims}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-primary-600">Approved</p>
                  <p className="text-sm font-medium text-success-600">{dashboardData.overview.approvedClaims}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-primary-600">Rejected</p>
                  <p className="text-sm font-medium text-error-600">{dashboardData.overview.rejectedClaims}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600">Active Policies</p>
                  <p className="text-2xl font-bold text-primary-800">{dashboardData.overview.activePolicies}</p>
                </div>
                <div className="bg-primary-100 rounded-full p-3">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-primary-600">Policy Retention</p>
                <p className="text-lg font-bold text-success-600">{dashboardData.quickStats.policyRetention}%</p>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600">Total Payouts</p>
                  <p className="text-2xl font-bold text-primary-800">
                    R{dashboardData.overview.totalPayouts.toLocaleString()}
                  </p>
                </div>
                <div className="bg-primary-100 rounded-full p-3">
                  <DollarSign className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-primary-600">Avg. Processing Time</p>
                <p className="text-lg font-bold text-primary-800">{dashboardData.quickStats.averageProcessingTime} days</p>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600">Fraud Detection</p>
                  <p className="text-2xl font-bold text-primary-800">{dashboardData.overview.fraudDetectionRate}%</p>
                </div>
                <div className="bg-primary-100 rounded-full p-3">
                  <Shield className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-primary-600">Prevention Rate</p>
                <p className="text-lg font-bold text-success-600">{dashboardData.quickStats.fraudPrevention}%</p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="shadow-lg">
          <CardHeader className="bg-primary-50">
            <h2 className="text-xl font-semibold text-primary-800">Recent Activity</h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              {dashboardData.recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-center justify-between p-4 bg-white rounded-lg border border-primary-100"
                >
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${
                      activity.type === 'claim'
                        ? 'bg-primary-100'
                        : activity.type === 'policy'
                        ? 'bg-success-100'
                        : 'bg-warning-100'
                    }`}>
                      {activity.type === 'claim' ? (
                        <FileText className="w-5 h-5 text-primary-600" />
                      ) : activity.type === 'policy' ? (
                        <Users className="w-5 h-5 text-success-600" />
                      ) : (
                        <Shield className="w-5 h-5 text-warning-600" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-primary-800">{activity.title}</h3>
                      <p className="text-sm text-primary-600">{activity.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {activity.amount && (
                      <span className="text-sm font-medium text-primary-800">
                        R{activity.amount.toLocaleString()}
                      </span>
                    )}
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      activity.status === 'approved'
                        ? 'bg-success-100 text-success-800'
                        : activity.status === 'rejected'
                        ? 'bg-error-100 text-error-800'
                        : 'bg-warning-100 text-warning-800'
                    }`}>
                      {activity.status === 'approved' ? (
                        <>
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approved
                        </>
                      ) : activity.status === 'rejected' ? (
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
                    <span className="text-sm text-primary-600">
                      {new Date(activity.timestamp).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default DashboardPage; 