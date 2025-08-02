import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, CheckCircle, BarChart3, Users, ArrowRight, Eye, FileText, AlertTriangle } from 'lucide-react';

const LandingPage: React.FC = () => {
  const features = [
    {
      icon: CheckCircle,
      title: 'Real-time Verification',
      description: 'Instantly verify contractor tax compliance status with our integrated ZRA database connection.'
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Comprehensive analytics and reporting tools to track compliance trends and patterns.'
    },
    {
      icon: Users,
      title: 'Multi-role Access',
      description: 'Role-based access control for administrators, auditors, and procurement officers.'
    },
    {
      icon: FileText,
      title: 'Automated Reports',
      description: 'Generate detailed compliance reports and audit trails for procurement processes.'
    },
    {
      icon: Eye,
      title: 'Audit Transparency',
      description: 'Complete audit trail of all verification activities for accountability and transparency.'
    },
    {
      icon: AlertTriangle,
      title: 'Risk Management',
      description: 'Automated alerts and flagging system for non-compliant contractors and high-risk tenders.'
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Contractors Verified' },
    { number: '95%', label: 'Compliance Rate' },
    { number: '500+', label: 'Tenders Processed' },
    { number: '24/7', label: 'System Availability' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">e-ProcureWatch</h1>
                <p className="text-xs text-gray-500">Zambia Revenue Authority</p>
              </div>
            </div>
            <Link
              to="/login"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition duration-200 font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ensuring Tax Compliance in
              <span className="text-blue-300 block">Public Procurement</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
              Streamline contractor verification and enhance transparency in government procurement processes with real-time tax compliance monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/login"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg hover:bg-blue-50 transition duration-200 font-semibold flex items-center justify-center"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white hover:text-blue-900 transition duration-200 font-semibold">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Comprehensive Compliance Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform provides all the tools needed to ensure tax compliance in public procurement, from real-time verification to detailed reporting.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition duration-300">
                  <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                    <Icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Transform Your Procurement Process?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join government agencies across Zambia in ensuring transparency and compliance in public procurement.
          </p>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition duration-200 font-semibold inline-flex items-center"
          >
            Access Platform
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center mb-4">
                <Shield className="h-8 w-8 text-blue-400 mr-3" />
                <div>
                  <h3 className="text-xl font-bold">e-ProcureWatch</h3>
                  <p className="text-sm text-gray-400">Zambia Revenue Authority</p>
                </div>
              </div>
              <p className="text-gray-400 max-w-md">
                Ensuring transparency and compliance in public procurement through advanced tax verification technology.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition duration-200">Dashboard</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Verification</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Reports</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Admin Panel</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition duration-200">Documentation</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">Contact Us</a></li>
                <li><a href="#" className="hover:text-white transition duration-200">System Status</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Zambia Revenue Authority. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;