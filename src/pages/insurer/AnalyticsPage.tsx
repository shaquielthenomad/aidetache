import React, { useEffect, useState } from 'react';
import { BarChart2, TrendingUp, AlertTriangle, CheckCircle, XCircle, Clock, Download } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import { useNotification } from '../../contexts/NotificationContext';

interface AnalyticsData {
  overview: {
    totalClaims: number;
    pendingClaims: number;
    approvedClaims: number;
    rejectedClaims: number;
    averageProcessingTime: number;
    fraudDetectionRate: number;
  };
  trends: {
    dailyClaims: Array<{
      date: string;
      total: number;
      approved: number;
      rejected: number;
    }>;
    claimTypes: Array<{
      type: string;
      count: number;
      percentage: number;
    }>;
    verificationResults: Array<{
      status: string;
      count: number;
      percentage: number;
    }>;
  };
  performance: {
    processingTime: {
      average: number;
      byType: Array<{
        type: string;
        time: number;
      }>;
    };
    fraudMetrics: {
      detectedCases: number;
      preventedLoss: number;
      commonPatterns: Array<{
        pattern: string;
        frequency: number;
      }>;
    };
  };
}

const AnalyticsPage: React.FC = () => {
  const { addNotification } = useNotification();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      try {
        // TODO: Replace with actual API call
        const mockData: AnalyticsData = {
          overview: {
            totalClaims: 150,
            pendingClaims: 25,
            approvedClaims: 100,
            rejectedClaims: 25,
            averageProcessingTime: 2.5,
            fraudDetectionRate: 15
          },
          trends: {
            dailyClaims: [
              {
                date: new Date().toISOString(),
                total: 10,
                approved: 7,
                rejected: 3
              }
            ],
            claimTypes: [
              {
                type: 'Vehicle Damage',
                count: 75,
                percentage: 50
              },
              {
                type: 'Property Damage',
                count: 45,
                percentage: 30
              },
              {
                type: 'Other',
                count: 30,
                percentage: 20
              }
            ],
            verificationResults: [
              {
                status: 'Passed',
                count: 120,
                percentage: 80
              },
              {
                status: 'Failed',
                count: 30,
                percentage: 20
              }
            ]
          },
          performance: {
            processingTime: {
              average: 2.5,
              byType: [
                {
                  type: 'Vehicle Damage',
                  time: 2.0
                },
                {
                  type: 'Property Damage',
                  time: 3.0
                }
              ]
            },
            fraudMetrics: {
              detectedCases: 15,
              preventedLoss: 50000,
              commonPatterns: [
                {
                  pattern: 'Duplicate Claims',
                  frequency: 5
                },
                {
                  pattern: 'Image Manipulation',
                  frequency: 3
                }
              ]
            }
          }
        };
        setAnalyticsData(mockData);
      } catch (error: any) {
        addNotification({
          type: 'error',
          message: error.message || 'Failed to load analytics data'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAnalyticsData();
  }, [addNotification, timeRange]);

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-32 bg-white/10 rounded"></div>
              <div className="h-32 bg-white/10 rounded"></div>
              <div className="h-32 bg-white/10 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) {
    return (
      <div className="min-h-screen bg-[#003366] text-white p-6">
        <div className="max-w-7xl mx-auto">
          <Card className="bg-error-50 border-error-200">
            <CardBody className="text-error-800">
              <h2 className="text-lg font-semibold">Error Loading Analytics</h2>
              <p className="mt-2">Unable to load analytics data. Please try again later.</p>
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
            <h1 className="text-3xl font-bold mb-2">Analytics Dashboard</h1>
            <p className="text-primary-200">Detailed performance metrics and insights</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex rounded-lg border border-primary-200">
              <Button
                variant={timeRange === '7d' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimeRange('7d')}
              >
                7D
              </Button>
              <Button
                variant={timeRange === '30d' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimeRange('30d')}
              >
                30D
              </Button>
              <Button
                variant={timeRange === '90d' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setTimeRange('90d')}
              >
                90D
              </Button>
            </div>
            <Button
              variant="secondary"
              onClick={handleExportData}
            >
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-lg">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600">Total Claims</p>
                  <p className="text-2xl font-bold text-primary-800">{analyticsData.overview.totalClaims}</p>
                </div>
                <div className="bg-primary-100 rounded-full p-3">
                  <BarChart2 className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2">
                <div className="text-center">
                  <p className="text-xs text-primary-600">Pending</p>
                  <p className="text-sm font-medium text-warning-600">{analyticsData.overview.pendingClaims}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-primary-600">Approved</p>
                  <p className="text-sm font-medium text-success-600">{analyticsData.overview.approvedClaims}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-primary-600">Rejected</p>
                  <p className="text-sm font-medium text-error-600">{analyticsData.overview.rejectedClaims}</p>
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600">Average Processing Time</p>
                  <p className="text-2xl font-bold text-primary-800">{analyticsData.overview.averageProcessingTime} days</p>
                </div>
                <div className="bg-primary-100 rounded-full p-3">
                  <Clock className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4">
                <div className="space-y-2">
                  {analyticsData.performance.processingTime.byType.map((item) => (
                    <div key={item.type} className="flex justify-between items-center">
                      <span className="text-sm text-primary-600">{item.type}</span>
                      <span className="text-sm font-medium text-primary-800">{item.time} days</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>

          <Card className="shadow-lg">
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-primary-600">Fraud Detection</p>
                  <p className="text-2xl font-bold text-primary-800">{analyticsData.overview.fraudDetectionRate}%</p>
                </div>
                <div className="bg-primary-100 rounded-full p-3">
                  <AlertTriangle className="w-6 h-6 text-primary-600" />
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-primary-600">Prevented Loss</p>
                <p className="text-lg font-bold text-success-600">
                  R{analyticsData.performance.fraudMetrics.preventedLoss.toLocaleString()}
                </p>
                <div className="mt-2 space-y-1">
                  {analyticsData.performance.fraudMetrics.commonPatterns.map((pattern) => (
                    <div key={pattern.pattern} className="flex justify-between items-center text-sm">
                      <span className="text-primary-600">{pattern.pattern}</span>
                      <span className="text-primary-800">{pattern.frequency} cases</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Detailed Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Claim Types Distribution */}
          <Card className="shadow-lg">
            <CardHeader className="bg-primary-50">
              <h2 className="text-xl font-semibold text-primary-800">Claim Types Distribution</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {analyticsData.trends.claimTypes.map((type) => (
                  <div key={type.type}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-primary-800">{type.type}</span>
                      <span className="text-sm text-primary-600">{type.percentage}%</span>
                    </div>
                    <div className="w-full bg-primary-100 rounded-full h-2">
                      <div
                        className="bg-primary-600 h-2 rounded-full"
                        style={{ width: `${type.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>

          {/* Verification Results */}
          <Card className="shadow-lg">
            <CardHeader className="bg-primary-50">
              <h2 className="text-xl font-semibold text-primary-800">Verification Results</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                {analyticsData.trends.verificationResults.map((result) => (
                  <div key={result.status}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm font-medium text-primary-800">{result.status}</span>
                      <span className="text-sm text-primary-600">{result.percentage}%</span>
                    </div>
                    <div className="w-full bg-primary-100 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          result.status === 'Passed' ? 'bg-success-600' : 'bg-error-600'
                        }`}
                        style={{ width: `${result.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 