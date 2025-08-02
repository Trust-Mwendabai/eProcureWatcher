import React, { useState } from 'react';
import { Upload, Download, Eye, Trash2, Plus, FileText, Users, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminPanel: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'procurement' | 'logs' | 'reports'>('procurement');

  if (user?.role !== 'admin') {
    return (
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">Access Denied</h2>
          <p className="text-red-600">You don't have permission to access the admin panel.</p>
        </div>
      </div>
    );
  }

  const mockProcurementRecords = [
    { id: '1', tenderNo: 'ZP-2025-001', title: 'Road Construction Project', contractor: 'ABC Construction Ltd', amount: 500000, status: 'Active' },
    { id: '2', tenderNo: 'ZP-2025-002', title: 'IT Equipment Supply', contractor: 'Tech Solutions Zambia', amount: 150000, status: 'Completed' },
    { id: '3', tenderNo: 'ZP-2025-003', title: 'Medical Supplies', contractor: 'Health Corp Ltd', amount: 300000, status: 'Pending' },
  ];

  const mockAuditLogs = [
    { id: '1', action: 'Contractor Verification', user: 'john.mwansa@zra.gov.zm', target: 'ABC Construction Ltd', timestamp: '2025-01-20 14:30:00', result: 'Compliant' },
    { id: '2', action: 'Report Generation', user: 'sarah.phiri@zra.gov.zm', target: 'Monthly Compliance Report', timestamp: '2025-01-20 13:15:00', result: 'Success' },
    { id: '3', action: 'Tender Upload', user: 'michael.banda@zppa.gov.zm', target: 'ZP-2025-004', timestamp: '2025-01-20 12:00:00', result: 'Success' },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600">Manage procurement records, audit logs, and generate reports</p>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-4 lg:space-x-8 overflow-x-auto">
          {[
            { id: 'procurement', name: 'Procurement Records', icon: FileText },
            { id: 'logs', name: 'Audit Logs', icon: Activity },
            { id: 'reports', name: 'Reports', icon: Download },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Procurement Records Tab */}
      {activeTab === 'procurement' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Procurement Records</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                <Upload className="h-4 w-4" />
                <span>Upload Records</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                <Plus className="h-4 w-4" />
                <span>Add Record</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tender No.</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contractor</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount (K)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockProcurementRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.tenderNo}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.title}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.contractor}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.amount.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          record.status === 'Active' 
                            ? 'bg-green-100 text-green-800'
                            : record.status === 'Completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {record.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Eye className="h-4 w-4" />
                          </button>
                          <button className="text-red-600 hover:text-red-900">
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Audit Logs Tab */}
      {activeTab === 'logs' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">Audit Logs</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200">
              <Download className="h-4 w-4" />
              <span>Export Logs</span>
            </button>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Target</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockAuditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.target}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{log.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                          log.result === 'Success' || log.result === 'Compliant'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {log.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {activeTab === 'reports' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-900">Generate Reports</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Compliance Summary</h3>
              <p className="text-gray-600 text-sm mb-4">Overall compliance statistics and trends</p>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                <Download className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Non-Compliant Contractors</h3>
              <p className="text-gray-600 text-sm mb-4">List of contractors with compliance issues</p>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition duration-200">
                <Download className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Tender Analysis</h3>
              <p className="text-gray-600 text-sm mb-4">Analysis of tenders by compliance status</p>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200">
                <Download className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Monthly Report</h3>
              <p className="text-gray-600 text-sm mb-4">Comprehensive monthly compliance report</p>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition duration-200">
                <Download className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Industry Breakdown</h3>
              <p className="text-gray-600 text-sm mb-4">Compliance rates by industry sector</p>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-200">
                <Download className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Audit Trail</h3>
              <p className="text-gray-600 text-sm mb-4">Complete audit trail of all system activities</p>
              <button className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200">
                <Download className="h-4 w-4" />
                <span>Generate</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;