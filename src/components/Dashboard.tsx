import React from 'react';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { TrendingUp, TrendingDown, Users, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { mockComplianceStats, mockMonthlyTrends, mockIndustryCompliance } from '../services/mockData';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Dashboard: React.FC = () => {
  const stats = mockComplianceStats();

  const monthlyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Compliant',
        data: mockMonthlyTrends.compliant,
        backgroundColor: 'rgba(34, 197, 94, 0.8)',
        borderColor: 'rgba(34, 197, 94, 1)',
        borderWidth: 1,
      },
      {
        label: 'Non-Compliant',
        data: mockMonthlyTrends.nonCompliant,
        backgroundColor: 'rgba(239, 68, 68, 0.8)',
        borderColor: 'rgba(239, 68, 68, 1)',
        borderWidth: 1,
      },
    ],
  };

  const industryData = {
    labels: Object.keys(mockIndustryCompliance),
    datasets: [
      {
        data: Object.values(mockIndustryCompliance),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 69, 19, 0.8)',
          'rgba(168, 85, 247, 0.8)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(139, 69, 19, 1)',
          'rgba(168, 85, 247, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Compliance Dashboard</h1>
        <p className="text-gray-600">Overview of contractor tax compliance status</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Verified</p>
              <p className="text-3xl font-bold text-gray-900">{stats.totalVerified}</p>
            </div>
            <Users className="h-12 w-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Compliant</p>
              <p className="text-3xl font-bold text-gray-900">{stats.compliant}</p>
              <p className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="h-4 w-4 mr-1" />
                {stats.complianceRate}%
              </p>
            </div>
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Non-Compliant</p>
              <p className="text-3xl font-bold text-gray-900">{stats.nonCompliant}</p>
              <p className="text-sm text-red-600 flex items-center mt-1">
                <TrendingDown className="h-4 w-4 mr-1" />
                {stats.nonComplianceRate}%
              </p>
            </div>
            <AlertTriangle className="h-12 w-12 text-red-500" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">Pending Review</p>
              <p className="text-3xl font-bold text-gray-900">{stats.pending}</p>
            </div>
            <Clock className="h-12 w-12 text-yellow-500" />
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Compliance Trends</h3>
          <Bar data={monthlyData} options={chartOptions} />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Compliance by Industry</h3>
          <Pie data={industryData} options={chartOptions} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Verifications</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-900">Company Name</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">TPIN</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {[
                { name: 'ABC Construction Ltd', tpin: '1001234567', status: 'Compliant', date: '2025-01-20' },
                { name: 'XYZ Suppliers', tpin: '1001234568', status: 'Non-Compliant', date: '2025-01-20' },
                { name: 'Tech Solutions Zambia', tpin: '1001234569', status: 'Compliant', date: '2025-01-19' },
                { name: 'Green Energy Corp', tpin: '1001234570', status: 'Pending', date: '2025-01-19' },
              ].map((item, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">{item.name}</td>
                  <td className="px-4 py-3 text-gray-600">{item.tpin}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'Compliant' 
                        ? 'bg-green-100 text-green-800'
                        : item.status === 'Non-Compliant'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600">{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
