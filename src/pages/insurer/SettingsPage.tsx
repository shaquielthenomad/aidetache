import React, { useState } from 'react';
import { Save, Bell, Lock, Shield, Sliders } from 'lucide-react';
import Card, { CardBody } from '../../components/Card';
import Button from '../../components/Button';

const SettingsPage: React.FC = () => {
  const [settings, setSettings] = useState({
    notifications: {
      newClaims: true,
      highRiskAlerts: true,
      statusUpdates: false,
      dailyReports: true
    },
    verification: {
      autoVerifyLowRisk: true,
      riskThreshold: 20,
      requireDocuments: true,
      allowAppeal: true
    },
    security: {
      twoFactorAuth: true,
      sessionTimeout: 30,
      ipWhitelist: false,
      auditLogs: true
    }
  });

  const handleNotificationChange = (key: keyof typeof settings.notifications) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleVerificationChange = (key: keyof typeof settings.verification) => {
    if (key === 'riskThreshold') return;
    setSettings(prev => ({
      ...prev,
      verification: {
        ...prev.verification,
        [key]: !prev.verification[key]
      }
    }));
  };

  const handleSecurityChange = (key: keyof typeof settings.security) => {
    if (key === 'sessionTimeout') return;
    setSettings(prev => ({
      ...prev,
      security: {
        ...prev.security,
        [key]: !prev.security[key]
      }
    }));
  };

  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-primary-800 mb-2">
          Settings
        </h1>
        <p className="text-primary-600">
          Configure your insurance verification system
        </p>
      </div>

      <div className="grid gap-6">
        {/* Notifications */}
        <Card className="shadow-md">
          <CardBody className="p-6">
            <div className="flex items-center mb-4">
              <Bell className="w-5 h-5 text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-primary-800">
                Notification Preferences
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-primary-900">New Claims</h3>
                  <p className="text-sm text-primary-500">Get notified when new claims are submitted</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.notifications.newClaims}
                    onChange={() => handleNotificationChange('newClaims')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-primary-900">High Risk Alerts</h3>
                  <p className="text-sm text-primary-500">Receive alerts for high-risk claims</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.notifications.highRiskAlerts}
                    onChange={() => handleNotificationChange('highRiskAlerts')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-primary-900">Daily Reports</h3>
                  <p className="text-sm text-primary-500">Receive daily summary reports</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.notifications.dailyReports}
                    onChange={() => handleNotificationChange('dailyReports')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Verification Settings */}
        <Card className="shadow-md">
          <CardBody className="p-6">
            <div className="flex items-center mb-4">
              <Shield className="w-5 h-5 text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-primary-800">
                Verification Settings
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-primary-900">Auto-verify Low Risk</h3>
                  <p className="text-sm text-primary-500">Automatically verify claims below risk threshold</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.verification.autoVerifyLowRisk}
                    onChange={() => handleVerificationChange('autoVerifyLowRisk')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div>
                <h3 className="text-sm font-medium text-primary-900 mb-1">Risk Threshold</h3>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={settings.verification.riskThreshold}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    verification: {
                      ...prev.verification,
                      riskThreshold: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-primary-500 mt-1">
                  <span>Low Risk</span>
                  <span>{settings.verification.riskThreshold}%</span>
                  <span>High Risk</span>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Security Settings */}
        <Card className="shadow-md">
          <CardBody className="p-6">
            <div className="flex items-center mb-4">
              <Lock className="w-5 h-5 text-primary-600 mr-2" />
              <h2 className="text-lg font-semibold text-primary-800">
                Security Settings
              </h2>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-primary-900">Two-Factor Authentication</h3>
                  <p className="text-sm text-primary-500">Require 2FA for all staff accounts</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.security.twoFactorAuth}
                    onChange={() => handleSecurityChange('twoFactorAuth')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-primary-900">Audit Logs</h3>
                  <p className="text-sm text-primary-500">Keep detailed logs of all actions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={settings.security.auditLogs}
                    onChange={() => handleSecurityChange('auditLogs')}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>

              <div>
                <h3 className="text-sm font-medium text-primary-900 mb-1">Session Timeout (minutes)</h3>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={settings.security.sessionTimeout}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    security: {
                      ...prev.security,
                      sessionTimeout: parseInt(e.target.value)
                    }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </CardBody>
        </Card>

        <div className="flex justify-end">
          <Button variant="primary" className="flex items-center">
            <Save className="w-4 h-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 