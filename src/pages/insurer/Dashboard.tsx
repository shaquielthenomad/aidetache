import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  PieChart, 
  Users, 
  FileText, 
  AlertTriangle, 
  CheckCircle, 
  TrendingUp, 
  Clock,
  ExternalLink 
} from 'lucide-react';
import Card, { CardBody, CardHeader } from '../../components/Card';
import { useAuth } from '../../contexts/AuthContext';

type ClaimStats = {
  total: number;
  pending: number;
  verified: number;
  rejected: number;
  avgProcessingTime: number;
  fraudDetectionRate: number;
};

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<ClaimStats>({
    total: 156,
    pending: 23,
    verified: 120,
    rejected: 13,
    avgProcessingTime: 2.5,
    fraudDetectionRate: 8.3
  });

  const { user } = useAuth();

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
          Welcome back, {user?.name || 'Insurer'}
        </h1>
        <p className="text-primary-600">
          Monitor and manage insurance claim verifications
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="shadow-sm">
          <CardBody className="flex items-center p-4">
            <div className="bg-primary-100 rounded-full p-3 mr-4">
              <FileText className="w-6 h-6 text-primary-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Total Claims</p>
              <p className="text-2xl font-bold text-primary-800">{stats.total}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-sm">
          <CardBody className="flex items-center p-4">
            <div className="bg-warning-100 rounded-full p-3 mr-4">
              <Clock className="w-6 h-6 text-warning-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Pending Review</p>
              <p className="text-2xl font-bold text-warning-600">{stats.pending}</p>
            </div>
          </CardBody>
        </Card>

        <Card className="shadow-sm">
          <CardBody className="flex items-center p-4">
            <div className="bg-success-100 rounded-full p-3 mr-4">
              <CheckCircle className="w-6 h-6 text-success-600" />
            </div>
            <div>
              <p className="text-sm text-primary-600">Verified Claims</p>
              <p className="text-2xl font-bold text-success-600">{stats.verified}</p>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary-800 mb-4">
          Performance Metrics
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="shadow-sm">
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-primary-600">Processing Time</h3>
                <TrendingUp className="w-4 h-4 text-success-500" />
              </div>
              <p className="text-2xl font-bold text-primary-800">
                {stats.avgProcessingTime} <span className="text-sm font-normal">hours</span>
              </p>
              <p className="text-sm text-primary-500">Average claim processing time</p>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-primary-600">Fraud Detection</h3>
                <AlertTriangle className="w-4 h-4 text-warning-500" />
              </div>
              <p className="text-2xl font-bold text-primary-800">
                {stats.fraudDetectionRate}%
              </p>
              <p className="text-sm text-primary-500">Fraud detection rate</p>
            </CardBody>
          </Card>

          <Card className="shadow-sm">
            <CardBody className="p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-primary-600">Success Rate</h3>
                <CheckCircle className="w-4 h-4 text-success-500" />
              </div>
              <p className="text-2xl font-bold text-primary-800">
                {((stats.verified / stats.total) * 100).toFixed(1)}%
              </p>
              <p className="text-sm text-primary-500">Claims verification rate</p>
            </CardBody>
          </Card>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-primary-800 mb-4">
          Quick Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link to="/insurer/claims">
            <Card className="shadow-sm transition-all hover:shadow-md">
              <CardBody className="p-4 flex items-center">
                <div className="bg-warning-100 rounded-full p-3 mr-4">
                  <Clock className="w-6 h-6 text-warning-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">Review Claims</h3>
                  <p className="text-sm text-primary-600">
                    {stats.pending} claims awaiting review
                  </p>
                </div>
              </CardBody>
            </Card>
          </Link>

          <Link to="/insurer/users">
            <Card className="shadow-sm transition-all hover:shadow-md">
              <CardBody className="p-4 flex items-center">
                <div className="bg-primary-100 rounded-full p-3 mr-4">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">Manage Users</h3>
                  <p className="text-sm text-primary-600">
                    View and manage policyholders
                  </p>
                </div>
              </CardBody>
            </Card>
          </Link>

          <Link to="/insurer/settings">
            <Card className="shadow-sm transition-all hover:shadow-md">
              <CardBody className="p-4 flex items-center">
                <div className="bg-secondary-100 rounded-full p-3 mr-4">
                  <PieChart className="w-6 h-6 text-secondary-600" />
                </div>
                <div>
                  <h3 className="font-medium text-primary-800">Analytics</h3>
                  <p className="text-sm text-primary-600">
                    View detailed performance metrics
                  </p>
                </div>
              </CardBody>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 