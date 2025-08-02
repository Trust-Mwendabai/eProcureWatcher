import React, { useState } from 'react';
import { Search, AlertTriangle, CheckCircle, Clock, Download, Mail } from 'lucide-react';
import { searchContractor, type ComplianceResult } from '../services/mockData';

const ContractorVerification: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'name' | 'tpin'>('tpin');
  const [result, setResult] = useState<ComplianceResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setLoading(true);
    setSearched(true);
    
    // Simulate API delay
    setTimeout(() => {
      const searchResult = searchContractor(searchTerm, searchType);
      setResult(searchResult);
      setLoading(false);
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Compliant': return 'text-green-600 bg-green-50 border-green-200';
      case 'Non-Compliant': return 'text-red-600 bg-red-50 border-red-200';
      case 'Pending': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'Non-Compliant': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'Pending': return <Clock className="h-5 w-5 text-yellow-600" />;
      default: return null;
    }
  };

  const generateReport = () => {
    if (!result) return;
    
    const reportData = {
      searchDate: new Date().toISOString(),
      contractor: result,
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `compliance-report-${result.tpin}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const sendAlert = () => {
    alert('Email alert would be sent to procurement officers regarding this non-compliant contractor.');
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Contractor Verification</h1>
        <p className="text-gray-600">Verify tax compliance status before awarding tenders</p>
      </div>

      {/* Search Form */}
      <div className="bg-white rounded-xl shadow-md p-4 lg:p-6 mb-8">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex-1">
              <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
                Search Contractor
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  id="search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder={searchType === 'tpin' ? 'Enter TPIN (e.g., 1001234567)' : 'Enter company name'}
                  required
                />
              </div>
            </div>
            
            <div className="lg:w-40">
              <label htmlFor="searchType" className="block text-sm font-medium text-gray-700 mb-2">
                Search By
              </label>
              <select
                id="searchType"
                value={searchType}
                onChange={(e) => setSearchType(e.target.value as 'name' | 'tpin')}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="tpin">TPIN</option>
                <option value="name">Company Name</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition duration-200 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Verifying...' : 'Verify Compliance'}
          </button>
        </form>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking compliance with ZRA database...</p>
        </div>
      )}

      {/* Results */}
      {!loading && searched && result && (
        <div className="bg-white rounded-xl shadow-md p-4 lg:p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Compliance Report</h2>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
              <button
                onClick={generateReport}
                className="flex items-center justify-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition duration-200 text-sm"
              >
                <Download className="h-4 w-4" />
                <span>Download Report</span>
              </button>
              {result.overallStatus === 'Non-Compliant' && (
                <button
                  onClick={sendAlert}
                  className="flex items-center justify-center space-x-2 px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition duration-200 text-sm"
                >
                  <Mail className="h-4 w-4" />
                  <span>Send Alert</span>
                </button>
              )}
            </div>
          </div>

          {/* Company Info */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Company Information</h3>
              <div className="space-y-2">
                <div><span className="font-medium">Name:</span> {result.companyName}</div>
                <div><span className="font-medium">TPIN:</span> {result.tpin}</div>
                <div><span className="font-medium">Industry:</span> {result.industry}</div>
                <div><span className="font-medium">Registration Date:</span> {result.registrationDate}</div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Overall Status</h3>
              <div className={`flex items-center space-x-2 p-4 rounded-lg border ${getStatusColor(result.overallStatus)}`}>
                {getStatusIcon(result.overallStatus)}
                <span className="font-semibold text-lg">{result.overallStatus}</span>
              </div>
            </div>
          </div>

          {/* Compliance Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Compliance Details</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className={`p-4 rounded-lg border ${getStatusColor(result.taxClearance.status)}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(result.taxClearance.status)}
                  <span className="font-medium">Tax Clearance Certificate</span>
                </div>
                <div className="text-sm">
                  <div>Status: {result.taxClearance.status}</div>
                  <div>Valid Until: {result.taxClearance.validUntil}</div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${getStatusColor(result.monthlyReturns.status)}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(result.monthlyReturns.status)}
                  <span className="font-medium">Monthly Returns</span>
                </div>
                <div className="text-sm">
                  <div>Status: {result.monthlyReturns.status}</div>
                  <div>Last Filed: {result.monthlyReturns.lastFiled}</div>
                </div>
              </div>

              <div className={`p-4 rounded-lg border ${getStatusColor(result.outstandingDebt.status)}`}>
                <div className="flex items-center space-x-2 mb-2">
                  {getStatusIcon(result.outstandingDebt.status)}
                  <span className="font-medium">Outstanding Debt</span>
                </div>
                <div className="text-sm">
                  <div>Status: {result.outstandingDebt.status}</div>
                  <div>Amount: K{result.outstandingDebt.amount.toLocaleString()}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          {result.overallStatus === 'Non-Compliant' && (
            <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2">⚠️ Risk Assessment</h4>
              <p className="text-red-700 text-sm">
                This contractor is non-compliant and poses a risk for government procurement. 
                Consider excluding from tender processes until compliance is achieved.
              </p>
            </div>
          )}
        </div>
      )}

      {/* No Results */}
      {!loading && searched && !result && (
        <div className="bg-white rounded-xl shadow-md p-8 text-center">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Results Found</h3>
          <p className="text-gray-600">No contractor found with the provided {searchType}. Please verify and try again.</p>
        </div>
      )}
    </div>
  );
};

export default ContractorVerification;