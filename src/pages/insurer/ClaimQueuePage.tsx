import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';
import Card, { CardBody } from '../../components/Card';
import Button from '../../components/Button';

type Claim = {
  id: string;
  policyNumber: string;
  submissionDate: string;
  policyholder: string;
  status: 'pending' | 'verified' | 'rejected';
  riskScore: number;
};

const ClaimQueuePage: React.FC = () => {
  const [claims] = useState<Claim[]>([
    {
      id: 'CLM-001',
      policyNumber: 'POL-123456',
      submissionDate: '2024-03-15',
      policyholder: 'John Doe',
      status: 'pending',
      riskScore: 15
    },
    {
      id: 'CLM-002',
      policyNumber: 'POL-789012',
      submissionDate: '2024-03-15',
      policyholder: 'Jane Smith',
      status: 'pending',
      riskScore: 45
    },
    {
      id: 'CLM-003',
      policyNumber: 'POL-345678',
      submissionDate: '2024-03-14',
      policyholder: 'Bob Wilson',
      status: 'pending',
      riskScore: 8
    }
  ]);

  const getRiskBadgeColor = (score: number) => {
    if (score < 20) return 'bg-success-100 text-success-800';
    if (score < 50) return 'bg-warning-100 text-warning-800';
    return 'bg-error-100 text-error-800';
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
          Claims Queue
        </h1>
        <p className="text-primary-600">
          Review and process pending insurance claims
        </p>
      </div>

      <Card className="shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-primary-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Claim ID
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Policy Number
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Policyholder
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Submission Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Risk Score
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
                      <FileText className="w-5 h-5 text-primary-500 mr-2" />
                      <span className="text-sm text-primary-900">{claim.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-primary-900">{claim.policyNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-primary-900">{claim.policyholder}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-primary-500">{claim.submissionDate}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskBadgeColor(claim.riskScore)}`}
                    >
                      {claim.riskScore}% Risk
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="flex space-x-2">
                      <Button variant="success" size="sm">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Verify
                      </Button>
                      <Button variant="error" size="sm">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                      <Link to={`/insurer/claims/${claim.id}`}>
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
    </div>
  );
};

export default ClaimQueuePage; 