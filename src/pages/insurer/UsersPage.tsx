import React, { useState } from 'react';
import { User, Mail, Phone, Calendar, MoreVertical, UserPlus } from 'lucide-react';
import Card, { CardBody } from '../../components/Card';
import Button from '../../components/Button';

type PolicyHolder = {
  id: string;
  name: string;
  email: string;
  phone: string;
  joinDate: string;
  activePolicies: number;
  claims: number;
  status: 'active' | 'suspended' | 'pending';
};

const UsersPage: React.FC = () => {
  const [users] = useState<PolicyHolder[]>([
    {
      id: 'USR-001',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+27 12 345 6789',
      joinDate: '2024-01-15',
      activePolicies: 2,
      claims: 1,
      status: 'active'
    },
    {
      id: 'USR-002',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+27 98 765 4321',
      joinDate: '2024-02-01',
      activePolicies: 1,
      claims: 0,
      status: 'active'
    },
    {
      id: 'USR-003',
      name: 'Bob Wilson',
      email: 'bob.wilson@example.com',
      phone: '+27 11 223 3444',
      joinDate: '2024-03-10',
      activePolicies: 1,
      claims: 1,
      status: 'pending'
    }
  ]);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-success-100 text-success-800';
      case 'suspended':
        return 'bg-error-100 text-error-800';
      default:
        return 'bg-warning-100 text-warning-800';
    }
  };

  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
            Policyholders
          </h1>
          <p className="text-primary-600">
            Manage and monitor policyholder accounts
          </p>
        </div>
        <Button variant="primary">
          <UserPlus className="w-4 h-4 mr-2" />
          Add Policyholder
        </Button>
      </div>

      <Card className="shadow-md">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead className="bg-primary-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  User
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Contact
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Join Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Policies
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Claims
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-primary-700 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-neutral-200">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-primary-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="bg-primary-100 rounded-full p-2 mr-3">
                        <User className="w-5 h-5 text-primary-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary-900">{user.name}</div>
                        <div className="text-sm text-primary-500">{user.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="flex items-center text-primary-900 mb-1">
                        <Mail className="w-4 h-4 mr-2" />
                        {user.email}
                      </div>
                      <div className="flex items-center text-primary-500">
                        <Phone className="w-4 h-4 mr-2" />
                        {user.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-primary-500">
                      <Calendar className="w-4 h-4 mr-2" />
                      {user.joinDate}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-primary-900">{user.activePolicies}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-primary-900">{user.claims}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeColor(user.status)}`}
                    >
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Button variant="outline" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
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

export default UsersPage; 