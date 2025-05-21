import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { LayoutDashboard, Upload, PieChart, AlertTriangle, CheckCircle, XCircle, ExternalLink, FileText } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';

type Claim = {
  id: string;
  image: string;
  imageName: string | null;
  passed: boolean;
  confidence: number;
  timestamp: string;
};

const Dashboard: React.FC = () => {
  const [claims, setClaims] = useState<Claim[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    passed: 0,
    failed: 0,
    avgConfidence: 0,
  });
  
  const { user } = useAuth();
  
  useEffect(() => {
    // Load claims from sessionStorage
    const storedClaims = JSON.parse(sessionStorage.getItem('claims') || '[]');
    setClaims(storedClaims);
    
    // Calculate stats
    if (storedClaims.length > 0) {
      const passed = storedClaims.filter((claim: Claim) => claim.passed).length;
      const totalConfidence = storedClaims.reduce((acc: number, claim: Claim) => acc + claim.confidence, 0);
      
      setStats({
        total: storedClaims.length,
        passed: passed,
        failed: storedClaims.length - passed,
        avgConfidence: Math.round(totalConfidence / storedClaims.length),
      });
    }
  }, []);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
          Welcome back, {user?.name || 'User'}
        </h1>
        <p className="text-primary-600">
          Manage your insurance claim verifications and certificates
        </p>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="shadow-sm">
          <CardBody className="flex items-center p-4">
            <div className="bg-primary-100 rounded-full p-3 mr-4">
              <LayoutDashboard className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Total Claims</p>
              <p className="text-2xl font-bold text-primary-800">{stats.total}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card className="shadow-sm">
          <CardBody className="flex items-center p-4">
            <div className="bg-success-100 rounded-full p-3 mr-4">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Verified</p>
              <p className="text-2xl font-bold text-success-600">{stats.passed}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card className="shadow-sm">
          <CardBody className="flex items-center p-4">
            <div className="bg-error-100 rounded-full p-3 mr-4">
              <AlertTriangle className="w-6 h-6 text-error-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Failed</p>
              <p className="text-2xl font-bold text-error-600">{stats.failed}</p>
            </div>
          </CardBody>
        </Card>
        
        <Card className="shadow-sm">
          <CardBody className="flex items-center p-4">
            <div className="bg-primary-100 rounded-full p-3 mr-4">
              <PieChart className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Avg. Confidence</p>
              <p className="text-2xl font-bold text-primary-800">{stats.avgConfidence}%</p>
            </div>
          </CardBody>
        </Card>
      </div>
      
      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary-800 mb-4">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/upload">
            <Card className="shadow-sm transition-all hover:shadow-md">
              <CardBody className="p-4 flex items-center">
                <div className="bg-secondary-100 rounded-full p-3 mr-4">
                  <Upload className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">Upload New Claim</h3>
                  <p className="text-sm text-primary-600">
                    Submit a new image for analysis
                  </p>
                </div>
              </CardBody>
            </Card>
          </Link>
          
          <Link to="/certificates">
            <Card className="shadow-sm transition-all hover:shadow-md">
              <CardBody className="p-4 flex items-center">
                <div className="bg-primary-100 rounded-full p-3 mr-4">
                  <FileText className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">View Certificates</h3>
                  <p className="text-sm text-primary-600">
                    Download verification certificates
                  </p>
                </div>
              </CardBody>
            </Card>
          </Link>
          
          <Link to="/help">
            <Card className="shadow-sm transition-all hover:shadow-md">
              <CardBody className="p-4 flex items-center">
                <div className="bg-neutral-100 rounded-full p-3 mr-4">
                  <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">Help & Support</h3>
                  <p className="text-sm text-primary-600">
                    Get assistance with your claims
                  </p>
                </div>
              </CardBody>
            </Card>
          </Link>
        </div>
      </div>
      
      {/* Recent Claims */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-primary-800">
            Recent Claims
          </h2>
          
          {claims.length > 0 && (
            <Link to="/claims" className="text-primary-600 hover:text-primary-800 text-sm flex items-center">
              View All
              <ExternalLink className="w-4 h-4 ml-1" />
            </Link>
          )}
        </div>
        
        {claims.length > 0 ? (
          <Card className="shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-neutral-200">
                <thead className="bg-primary-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Image
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Confidence
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-neutral-200">
                  {claims.map((claim) => (
                    <tr key={claim.id} className="hover:bg-primary-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded-md object-cover" src={claim.image} alt="" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-primary-900">{claim.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            claim.passed
                              ? 'bg-success-100 text-success-800'
                              : 'bg-error-100 text-error-800'
                          }`}
                        >
                          {claim.passed ? (
                            <>
                              <CheckCircle className="w-3 h-3 mr-1" />
                              Verified
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3 h-3 mr-1" />
                              Failed
                            </>
                          )}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-primary-900">{claim.confidence}%</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-primary-500">{formatDate(claim.timestamp)}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex space-x-2">
                          <Link to={`/result/${claim.id}`}>
                            <Button variant="outline" size="sm">
                              View
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        ) : (
          <Card className="shadow-md">
            <CardBody className="p-8 text-center">
              <div className="bg-primary-50 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 className="text-lg font-medium text-primary-800 mb-2">No Claims Yet</h3>
              <p className="text-primary-600 mb-6">
                You haven't uploaded any claims for verification yet.
              </p>
              <Link to="/upload">
                <Button variant="primary">
                  Upload Your First Claim
                </Button>
              </Link>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;