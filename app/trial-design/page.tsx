'use client'

import { useAI } from '@/lib/ai-context'
import { ClipboardList, Target, Users, BarChart3, Activity, Zap, CheckCircle } from 'lucide-react'

export default function TrialDesignPage() {
  const { analysis, inputs } = useAI()

  // Use AI analysis data if available, otherwise show placeholder
  const trialDesignData = analysis?.trialDesign || {
    studyDesign: 'Randomized, double-blind, placebo-controlled, parallel-group study with 24-week treatment period',
    primaryEndpoint: 'FEV1 AUC0-12h at Week 12 compared to placebo',
    patientPopulation: 'Moderate-to-severe COPD patients (FEV1 30-70% predicted) with chronic bronchitis',
    statisticalAnalysis: 'Primary analysis using mixed model for repeated measures (MMRM) with treatment, visit, and treatment-by-visit interaction as fixed effects',
    safetyMonitoring: 'Comprehensive safety monitoring including adverse events, vital signs, laboratory parameters, and pulmonary function tests'
  }

  const trialMetrics = analysis?.trialMetrics || {
    countries: 15,
    sites: 85,
    duration: '24 months',
    budget: '$78,000,000'
  }

  const clinicalInfo = analysis?.clinicalInfo || {
    indication: 'COPD with chronic bronchitis',
    phase: 'Phase III',
    type: 'Inhaled Small Molecule',
    studyDesign: 'Randomized, double-blind, placebo-controlled',
    primaryEndpoint: 'FEV1 AUC0-12h at Week 12',
    patientPopulation: 'Moderate-to-severe COPD patients',
    protocolNumber: 'VER-202-301',
    clinicalTrialsGov: 'NCT04636671'
  }

  const studyPhases = [
    {
      phase: 'Screening',
      duration: '4 weeks',
      activities: ['Patient identification', 'Informed consent', 'Baseline assessments', 'Randomization'],
      status: 'completed'
    },
    {
      phase: 'Treatment',
      duration: '24 weeks',
      activities: ['Drug administration', 'Safety monitoring', 'Efficacy assessments', 'Patient follow-up'],
      status: 'active'
    },
    {
      phase: 'Follow-up',
      duration: '4 weeks',
      activities: ['Final assessments', 'Safety monitoring', 'Data collection', 'Study closure'],
      status: 'pending'
    }
  ]

  const endpoints = [
    {
      type: 'Primary',
      name: 'FEV1 AUC0-12h at Week 12',
      description: 'Forced expiratory volume in 1 second area under curve from 0-12 hours',
      significance: 'Primary efficacy measure for bronchodilation',
      status: 'active'
    },
    {
      type: 'Secondary',
      name: 'FEV1 at Week 12',
      description: 'Trough FEV1 at Week 12',
      significance: 'Secondary efficacy measure',
      status: 'active'
    },
    {
      type: 'Secondary',
      name: 'Exacerbation Rate',
      description: 'Annualized rate of moderate-to-severe exacerbations',
      significance: 'Clinical outcome measure',
      status: 'active'
    },
    {
      type: 'Safety',
      name: 'Adverse Events',
      description: 'Incidence and severity of adverse events',
      significance: 'Safety monitoring',
      status: 'active'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-50'
      case 'active': return 'text-blue-600 bg-blue-50'
      case 'pending': return 'text-gray-600 bg-gray-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'active': return <Activity className="h-4 w-4 text-blue-600" />
      case 'pending': return <ClipboardList className="h-4 w-4 text-gray-600" />
      default: return <ClipboardList className="h-4 w-4 text-gray-600" />
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
            <span className="text-sm text-gray-600">Trial Design Analysis</span>
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
            <ClipboardList className="h-10 w-10 text-blue-600" />
            Trial Design Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive clinical trial design optimization and statistical analysis
          </p>
        </div>

        {/* Trial Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Study Phase</h3>
              <Target className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{clinicalInfo.phase}</div>
            <div className="text-sm text-gray-600">Clinical development</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Study Sites</h3>
              <Users className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{trialMetrics.sites}</div>
            <div className="text-sm text-gray-600">Across {trialMetrics.countries} countries</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Study Duration</h3>
              <BarChart3 className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{trialMetrics.duration}</div>
            <div className="text-sm text-gray-600">Total timeline</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Study Budget</h3>
              <Activity className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{trialMetrics.budget}</div>
            <div className="text-sm text-gray-600">Total investment</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Study Design */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <ClipboardList className="h-6 w-6 text-blue-600" />
                Study Design
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Design Type</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{trialDesignData.studyDesign}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Patient Population</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{trialDesignData.patientPopulation}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Statistical Analysis</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{trialDesignData.statisticalAnalysis}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Safety Monitoring</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{trialDesignData.safetyMonitoring}</p>
                </div>
              </div>
            </div>

            {/* Study Phases */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Study Phases</h2>
              
              <div className="space-y-4">
                {studyPhases.map((phase, index) => (
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

          {/* Endpoints */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="h-6 w-6 text-green-600" />
                Study Endpoints
              </h2>
              
              <div className="space-y-4">
                {endpoints.map((endpoint, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          endpoint.type === 'Primary' ? 'bg-blue-100 text-blue-800' :
                          endpoint.type === 'Secondary' ? 'bg-green-100 text-green-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {endpoint.type}
                        </span>
                        <h3 className="font-semibold text-gray-900">{endpoint.name}</h3>
                      </div>
                      {getStatusIcon(endpoint.status)}
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{endpoint.description}</p>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Significance:</span>
                      <p className="text-gray-600 mt-1">{endpoint.significance}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Patient Population */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="h-6 w-6 text-purple-600" />
                Patient Population
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Target Population</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{trialDesignData.patientPopulation}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Inclusion Criteria</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Age 40-80 years</li>
                    <li>• FEV1 30-70% predicted</li>
                    <li>• History of chronic bronchitis</li>
                    <li>• Current or former smokers</li>
                    <li>• Stable COPD for ≥3 months</li>
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Exclusion Criteria</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Recent exacerbation (≤4 weeks)</li>
                    <li>• Other significant respiratory diseases</li>
                    <li>• Unstable cardiovascular disease</li>
                    <li>• Pregnancy or lactation</li>
                    <li>• Known hypersensitivity to study drug</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistical Analysis */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Statistical Analysis Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Primary Analysis</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Mixed model for repeated measures (MMRM)</li>
                <li>• Treatment, visit, and interaction effects</li>
                <li>• Baseline FEV1 as covariate</li>
                <li>• Missing data handled by MMRM</li>
                <li>• Two-sided α = 0.05</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Sample Size</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Total sample size: 600 patients</li>
                <li>• Treatment groups: 300 each</li>
                <li>• Power: 90% for primary endpoint</li>
                <li>• Effect size: 150 mL FEV1 improvement</li>
                <li>• Dropout rate: 15% assumed</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Risk Assessment */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Design Risk Assessment</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Low Risk Factors</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Well-established endpoint (FEV1)</li>
                <li>• Standard study design</li>
                <li>• Clear patient population</li>
                <li>• Adequate sample size</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Medium Risk Factors</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Patient recruitment challenges</li>
                <li>• Site activation delays</li>
                <li>• Protocol compliance</li>
                <li>• Data quality variability</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Mitigation Strategies</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Robust site selection criteria</li>
                <li>• Enhanced patient engagement</li>
                <li>• Regular monitoring visits</li>
                <li>• Data quality checks</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 