import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, FileText, Clock, Search, Filter, Download } from 'lucide-react';
import Card, { CardBody, CardHeader } from '../../components/Card';
import Button from '../../components/Button';
import { useNotification } from '../../contexts/NotificationContext';

interface Policyholder {
  id: string;
  name: string;
  email: string;
  policyNumber: string;
  joinDate: string;
  lastActive: string;
  status: 'active' | 'pending' | 'inactive';
  claims: Array<{
    id: string;
    type: string;
    status: 'pending' | 'approved' | 'rejected';
    amount: number;
    submittedAt: string;
  }>;
}

const PolicyholderListPage: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [policyholders, setPolicyholders] = useState<Policyholder[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'pending' | 'inactive'>('all');

  useEffect(() => {
    const fetchPolicyholders = async () => {
      try {
        // TODO: Replace with actual API call
        const mockData: Policyholder[] = [
          {
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            policyNumber: 'POL-2024-001',
            joinDate: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            status: 'active',
            claims: [
              {
                id: 'CLM-001',
                type: 'Vehicle Damage',
                status: 'pending',
                amount: 5000,
                submittedAt: new Date().toISOString()
              }
            ]
          },
          {
            id: '2',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            policyNumber: 'POL-2024-002',
            joinDate: new Date().toISOString(),
            lastActive: new Date().toISOString(),
            status: 'pending',
            claims: []
          }
        ];
        setPolicyholders(mockData);
      } catch (error: any) {
        addNotification({
          type: 'error',
          message: error.message || 'Failed to load policyholders'
        });
      } finally {
        setLoading(false);
      }
    };

    fetchPolicyholders();
  }, [addNotification]);

  const filteredPolicyholders = policyholders.filter(ph => {
    const matchesSearch = ph.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ph.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ph.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filter === 'all' || ph.status === filter;
    return matchesSearch && matchesFilter;
  });

  const handleViewDetails = (id: string) => {
    navigate(`/insurer/policyholders/${id}`);
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
            <h1 className="text-3xl font-bold mb-2">Policyholders</h1>
            <p className="text-primary-200">Manage and view policyholder information</p>
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
                    placeholder="Search by name, email, or policy number..."
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
                  variant={filter === 'active' ? 'primary' : 'outline'}
                  onClick={() => setFilter('active')}
                >
                  Active
                </Button>
                <Button
                  variant={filter === 'pending' ? 'primary' : 'outline'}
                  onClick={() => setFilter('pending')}
                >
                  Pending
                </Button>
                <Button
                  variant={filter === 'inactive' ? 'primary' : 'outline'}
                  onClick={() => setFilter('inactive')}
                >
                  Inactive
                </Button>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Policyholder List */}
        <Card className="shadow-lg">
          <CardBody className="p-0">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-primary-200">
                <thead className="bg-primary-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Policyholder
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Policy Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Claims
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Last Active
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-primary-700 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-primary-200">
                  {filteredPolicyholders.map((ph) => (
                    <tr key={ph.id} className="hover:bg-primary-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                              <User className="w-5 h-5 text-primary-600" />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-primary-900">{ph.name}</div>
                            <div className="text-sm text-primary-500">{ph.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-primary-900">{ph.policyNumber}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          ph.status === 'active'
                            ? 'bg-success-100 text-success-800'
                            : ph.status === 'pending'
                            ? 'bg-warning-100 text-warning-800'
                            : 'bg-error-100 text-error-800'
                        }`}>
                          {ph.status.charAt(0).toUpperCase() + ph.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-primary-900">
                          {ph.claims.length} {ph.claims.length === 1 ? 'claim' : 'claims'}
                        </div>
                        {ph.claims.length > 0 && (
                          <div className="text-xs text-primary-500">
                            {ph.claims.filter(c => c.status === 'pending').length} pending
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-primary-900">
                          {new Date(ph.lastActive).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-primary-500">
                          {new Date(ph.lastActive).toLocaleTimeString()}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(ph.id)}
                        >
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default PolicyholderListPage; 