export interface ComplianceResult {
  companyName: string;
  tpin: string;
  industry: string;
  registrationDate: string;
  overallStatus: 'Compliant' | 'Non-Compliant' | 'Pending';
  taxClearance: {
    status: 'Compliant' | 'Non-Compliant' | 'Pending';
    validUntil: string;
  };
  monthlyReturns: {
    status: 'Compliant' | 'Non-Compliant' | 'Pending';
    lastFiled: string;
  };
  outstandingDebt: {
    status: 'Compliant' | 'Non-Compliant';
    amount: number;
  };
}

// Mock contractor database
const mockContractors: ComplianceResult[] = [
  {
    companyName: 'ABC Construction Ltd',
    tpin: '1001234567',
    industry: 'Construction',
    registrationDate: '2018-03-15',
    overallStatus: 'Compliant',
    taxClearance: {
      status: 'Compliant',
      validUntil: '2025-06-30'
    },
    monthlyReturns: {
      status: 'Compliant',
      lastFiled: '2025-01-15'
    },
    outstandingDebt: {
      status: 'Compliant',
      amount: 0
    }
  },
  {
    companyName: 'XYZ Suppliers',
    tpin: '1001234568',
    industry: 'Retail',
    registrationDate: '2020-07-22',
    overallStatus: 'Non-Compliant',
    taxClearance: {
      status: 'Non-Compliant',
      validUntil: '2024-12-31'
    },
    monthlyReturns: {
      status: 'Non-Compliant',
      lastFiled: '2024-11-15'
    },
    outstandingDebt: {
      status: 'Non-Compliant',
      amount: 45000
    }
  },
  {
    companyName: 'Tech Solutions Zambia',
    tpin: '1001234569',
    industry: 'Technology',
    registrationDate: '2019-11-08',
    overallStatus: 'Compliant',
    taxClearance: {
      status: 'Compliant',
      validUntil: '2025-08-31'
    },
    monthlyReturns: {
      status: 'Compliant',
      lastFiled: '2025-01-15'
    },
    outstandingDebt: {
      status: 'Compliant',
      amount: 0
    }
  },
  {
    companyName: 'Green Energy Corp',
    tpin: '1001234570',
    industry: 'Energy',
    registrationDate: '2021-02-14',
    overallStatus: 'Pending',
    taxClearance: {
      status: 'Pending',
      validUntil: '2025-03-31'
    },
    monthlyReturns: {
      status: 'Compliant',
      lastFiled: '2025-01-15'
    },
    outstandingDebt: {
      status: 'Compliant',
      amount: 0
    }
  },
  {
    companyName: 'Mining Solutions Ltd',
    tpin: '1001234571',
    industry: 'Mining',
    registrationDate: '2017-09-30',
    overallStatus: 'Non-Compliant',
    taxClearance: {
      status: 'Non-Compliant',
      validUntil: '2024-11-30'
    },
    monthlyReturns: {
      status: 'Non-Compliant',
      lastFiled: '2024-10-15'
    },
    outstandingDebt: {
      status: 'Non-Compliant',
      amount: 125000
    }
  }
];

export const searchContractor = (searchTerm: string, searchType: 'name' | 'tpin'): ComplianceResult | null => {
  const term = searchTerm.toLowerCase().trim();
  
  if (searchType === 'tpin') {
    return mockContractors.find(contractor => contractor.tpin === term) || null;
  } else {
    return mockContractors.find(contractor => 
      contractor.companyName.toLowerCase().includes(term)
    ) || null;
  }
};

export const mockComplianceStats = () => {
  const totalVerified = mockContractors.length * 20; // Simulate larger dataset
  const compliant = mockContractors.filter(c => c.overallStatus === 'Compliant').length * 20;
  const nonCompliant = mockContractors.filter(c => c.overallStatus === 'Non-Compliant').length * 20;
  const pending = mockContractors.filter(c => c.overallStatus === 'Pending').length * 20;
  
  return {
    totalVerified,
    compliant,
    nonCompliant,
    pending,
    complianceRate: Math.round((compliant / totalVerified) * 100),
    nonComplianceRate: Math.round((nonCompliant / totalVerified) * 100)
  };
};

export const mockMonthlyTrends = {
  compliant: [45, 52, 48, 61, 55, 67],
  nonCompliant: [15, 12, 18, 14, 16, 13]
};

export const mockIndustryCompliance = {
  'Construction': 85,
  'Technology': 92,
  'Mining': 78,
  'Energy': 88,
  'Retail': 75
};