'use client'

import { useAI } from '@/lib/ai-context'
import { MapPin, Users, Clock, Shield, Activity, Zap, CheckCircle, AlertTriangle } from 'lucide-react'

export default function SiteReadinessPage() {
  const { analysis, inputs } = useAI()

  // Use AI analysis data if available, otherwise show placeholder
  const siteReadinessData = analysis?.siteReadiness || {
    siteSelection: 'Sites selected based on respiratory disease expertise, pulmonary function testing capabilities, and patient population availability',
    infrastructureRequirements: 'Sites must have certified pulmonary function testing equipment, spirometry training, and respiratory therapy support',
    trainingRequirements: 'Site staff training on inhalation device use, pulmonary function testing protocols, and respiratory safety monitoring',
    regulatoryCompliance: 'Sites must meet local regulatory requirements for respiratory drug trials and pulmonary function testing',
    timelineConsiderations: 'Site activation timeline 3-6 months including regulatory approvals, staff training, and equipment certification'
  }

  const trialMetrics = analysis?.trialMetrics || {
    countries: 15,
    sites: 85,
    duration: '24 months',
    budget: '$78,000,000'
  }

  const siteStatus = [
    {
      region: 'North America',
      sites: 25,
      activated: 20,
      pending: 3,
      issues: 2,
      status: 'good'
    },
    {
      region: 'Europe',
      sites: 30,
      activated: 25,
      pending: 4,
      issues: 1,
      status: 'good'
    },
    {
      region: 'APAC',
      sites: 20,
      activated: 15,
      pending: 3,
      issues: 2,
      status: 'warning'
    },
    {
      region: 'Latin America',
      sites: 10,
      activated: 8,
      pending: 1,
      issues: 1,
      status: 'good'
    }
  ]

  const activationTimeline = [
    {
      phase: 'Site Identification',
      duration: '2-4 weeks',
      activities: ['Site database review', 'PI identification', 'Initial contact', 'Expression of interest'],
      status: 'completed'
    },
    {
      phase: 'Site Qualification',
      duration: '4-6 weeks',
      activities: ['Site feasibility assessment', 'Infrastructure evaluation', 'Staff qualification', 'Patient population review'],
      status: 'completed'
    },
    {
      phase: 'Regulatory Approval',
      duration: '6-12 weeks',
      activities: ['IRB/EC submission', 'Regulatory review', 'Approval process', 'Documentation completion'],
      status: 'active'
    },
    {
      phase: 'Site Training',
      duration: '2-4 weeks',
      activities: ['Protocol training', 'Equipment training', 'Safety training', 'Data management training'],
      status: 'pending'
    },
    {
      phase: 'Site Activation',
      duration: '1-2 weeks',
      activities: ['Final site visit', 'Site initiation', 'First patient screening', 'Trial initiation'],
      status: 'pending'
    }
  ]

  const infrastructureRequirements = [
    {
      category: 'Clinical Equipment',
      requirements: ['Pulmonary function testing equipment', 'Spirometry devices', 'Vital signs monitors', 'ECG machines'],
      status: 'available'
    },
    {
      category: 'Laboratory Facilities',
      requirements: ['Clinical laboratory', 'Sample processing', 'Storage facilities', 'Shipping capabilities'],
      status: 'available'
    },
    {
      category: 'Data Management',
      requirements: ['Electronic data capture', 'Internet connectivity', 'Data backup systems', 'Security protocols'],
      status: 'available'
    },
    {
      category: 'Safety Equipment',
      requirements: ['Emergency equipment', 'Resuscitation devices', 'Safety protocols', 'Emergency contacts'],
      status: 'available'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'active': return 'text-blue-600 bg-blue-50'
      case 'pending': return 'text-gray-600 bg-gray-50'
      case 'good': return 'text-green-600'
      case 'warning': return 'text-yellow-600'
      case 'error': return 'text-red-600'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'active': return <Activity className="h-4 w-4 text-blue-600" />
      case 'pending': return <Clock className="h-4 w-4 text-gray-600" />
      case 'good': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Clock className="h-4 w-4 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              ← Back to Dashboard
            </a>
            <span className="text-gray-500">|</span>
            <span className="text-sm text-gray-600">Site Readiness Analysis</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Activity className="h-4 w-4" />
              AI-Powered Analysis
            </div>
            {analysis && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Zap className="h-4 w-4" />
                Live Data
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            <MapPin className="h-10 w-10 text-blue-600" />
            Site Readiness Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive site activation and readiness assessment for clinical trial execution
          </p>
        </div>

        {/* Site Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Total Sites</h3>
              <MapPin className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{trialMetrics.sites}</div>
            <div className="text-sm text-gray-600">Across {trialMetrics.countries} countries</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Activated Sites</h3>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">68</div>
            <div className="text-sm text-gray-600">80% activation rate</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Pending Activation</h3>
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">11</div>
            <div className="text-sm text-gray-600">In regulatory review</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Issues Identified</h3>
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">6</div>
            <div className="text-sm text-gray-600">Require attention</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Site Selection & Requirements */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <MapPin className="h-6 w-6 text-blue-600" />
                Site Selection & Requirements
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Site Selection Criteria</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{siteReadinessData.siteSelection}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Infrastructure Requirements</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{siteReadinessData.infrastructureRequirements}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Training Requirements</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{siteReadinessData.trainingRequirements}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Regulatory Compliance</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{siteReadinessData.regulatoryCompliance}</p>
                </div>
              </div>
            </div>

            {/* Infrastructure Assessment */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Infrastructure Assessment</h2>
              
              <div className="space-y-4">
                {infrastructureRequirements.map((infra, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{infra.category}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(infra.status)}`}>
                        {infra.status === 'available' ? 'Available' : 'Limited'}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Requirements:</span>
                      <ul className="text-gray-600 mt-1 space-y-1">
                        {infra.requirements.map((req, reqIndex) => (
                          <li key={reqIndex}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Regional Status */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="h-6 w-6 text-green-600" />
                Regional Site Status
              </h2>
              
              <div className="space-y-4">
                {siteStatus.map((region, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900">{region.region}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getStatusColor(region.status)}`}>
                          {region.status === 'good' ? 'Good' : region.status === 'warning' ? 'Warning' : 'Issue'}
                        </span>
                        {getStatusIcon(region.status)}
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-medium text-gray-900">Total Sites:</span>
                        <span className="text-gray-600 ml-2">{region.sites}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Activated:</span>
                        <span className="text-green-600 ml-2">{region.activated}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Pending:</span>
                        <span className="text-yellow-600 ml-2">{region.pending}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Issues:</span>
                        <span className="text-red-600 ml-2">{region.issues}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activation Timeline */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Clock className="h-6 w-6 text-purple-600" />
                Activation Timeline
              </h2>
              
              <div className="space-y-4">
                {activationTimeline.map((phase, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                        <p className="text-sm text-gray-600">Duration: {phase.duration}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(phase.status)}`}>
                        {phase.status.charAt(0).toUpperCase() + phase.status.slice(1)}
                      </span>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Key Activities:</span>
                      <ul className="text-gray-600 mt-1 space-y-1">
                        {phase.activities.map((activity, actIndex) => (
                          <li key={actIndex}>• {activity}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timeline Considerations */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Timeline Considerations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Current Timeline</h3>
              <p className="text-gray-700 text-sm leading-relaxed mb-4">{siteReadinessData.timelineConsiderations}</p>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Site identification: 2-4 weeks</li>
                <li>• Site qualification: 4-6 weeks</li>
                <li>• Regulatory approval: 6-12 weeks</li>
                <li>• Site training: 2-4 weeks</li>
                <li>• Site activation: 1-2 weeks</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Risk Factors</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Regulatory approval delays in certain regions</li>
                <li>• Site infrastructure limitations</li>
                <li>• Staff training requirements</li>
                <li>• Equipment procurement delays</li>
                <li>• Patient population availability</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Action Plan */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Site Readiness Action Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Immediate Actions (0-30 days)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Address identified site issues</li>
                <li>• Expedite regulatory submissions</li>
                <li>• Initiate site training programs</li>
                <li>• Procure missing equipment</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Short-term (1-3 months)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Complete site activation</li>
                <li>• Conduct site initiation visits</li>
                <li>• Begin patient recruitment</li>
                <li>• Monitor site performance</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Long-term (3-12 months)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Optimize site performance</li>
                <li>• Expand site network if needed</li>
                <li>• Implement best practices</li>
                <li>• Continuous monitoring and support</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 