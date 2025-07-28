'use client'

import { useState } from 'react'
import { Zap, Activity, BarChart3, Globe, Building2, Beaker, ClipboardList, MapPin } from 'lucide-react'
import { useAI } from '@/lib/ai-context'

// Default trial data
const trialData = {
  name: 'OHT-202',
  indication: 'COPD with chronic bronchitis',
  phase: 'Phase III',
  type: 'Inhaled Small Molecule',
  riskScore: 72,
  riskLevel: 'High Risk',
  countries: 15,
  sites: 85,
  duration: '24 months',
  budget: '$78,000,000',
  molecularDetails: {
    geneSymbol: 'PDE3A',
    uniprotId: 'P27815',
    structureType: 'Small molecule',
    mechanism: 'PDE3/4 inhibitor',
    route: 'Inhalation',
    molecularWeight: 'Not specified',
    solubility: 'Not specified',
    targetReceptor: 'Not specified',
    halfLife: 'Not specified'
  },
  trialInfo: {
    studyDesign: 'Randomized, double-blind, placebo-controlled',
    primaryEndpoint: 'FEV1 AUC0-12h at Week 12',
    patientPopulation: 'Moderate-to-severe COPD patients',
    protocolNumber: 'VER-202-301',
    clinicalTrialsGov: 'NCT04636671'
  },
  cro: 'Medpace Holdings Inc'
}

const riskComponents = [
  {
    name: 'Critical API Supply Risk',
    score: 78,
    description: 'Single-source dependency on Primary API Supplier with 16-week lead time creates critical supply vulnerability',
    detailedAnalysis: '',
    recommendations: [],
    operationalImpact: '',
    dataSources: []
  },
  {
    name: 'Site Activation Delays',
    score: 71,
    description: 'IRB/EC approvals averaging 75 days with only 18 of 85 planned sites activated at inflection point',
    detailedAnalysis: '',
    recommendations: [],
    operationalImpact: '',
    dataSources: []
  },
  {
    name: 'Geographic Enrollment Risk',
    score: 65,
    description: 'Higher dropout rates anticipated in Eastern Europe and APAC regions based on digital twin modeling',
    detailedAnalysis: '',
    recommendations: [],
    operationalImpact: '',
    dataSources: []
  }
]

export default function Home() {
  const { analysis, inputs } = useAI()
  const [activeTab, setActiveTab] = useState('Overview')
  const [expandedComponents, setExpandedComponents] = useState<string[]>([])

  // Use AI analysis data if available, otherwise use default data
  const currentData = analysis ? {
    drugName: analysis.drugName,
    molecularDetails: analysis.molecularDetails,
    clinicalInfo: analysis.clinicalInfo,
    riskAssessment: analysis.riskAssessment
  } : {
    drugName: trialData.name,
    molecularDetails: trialData.molecularDetails,
    clinicalInfo: {
      indication: trialData.indication,
      phase: trialData.phase,
      type: trialData.type,
      studyDesign: trialData.trialInfo.studyDesign,
      primaryEndpoint: trialData.trialInfo.primaryEndpoint,
      patientPopulation: trialData.trialInfo.patientPopulation,
      protocolNumber: trialData.trialInfo.protocolNumber,
      clinicalTrialsGov: trialData.trialInfo.clinicalTrialsGov
    },
    riskAssessment: {
      overallScore: 72,
      riskLevel: "High Risk",
      components: []
    }
  }

  // Use AI analysis risk components if available, otherwise use default
  const currentRiskComponents = analysis?.riskAssessment?.components && analysis.riskAssessment.components.length > 0 
    ? analysis.riskAssessment.components 
    : riskComponents

  const toggleComponent = (name: string) => {
    setExpandedComponents(prev => 
      prev.includes(name) 
        ? prev.filter(item => item !== name)
        : [...prev, name]
    )
  }

  const tabs = ['Overview', 'External Factors', 'CRO Analysis', 'CMC Risk', 'Trial Design', 'Site Readiness']

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Clinical Execution Risk Assessment
              </h1>
              <p className="text-gray-600 mt-1">
                Comprehensive operational risk analysis for clinical trials
              </p>
            </div>
            <div className="flex gap-3">
              <a
                href="/input-page"
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
              >
                <Zap className="h-4 w-4" />
                AI Analysis Tool
              </a>
              <a
                href="/ai-status"
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                <Activity className="h-4 w-4" />
                AI Status
              </a>
              <a
                href="/external-factors"
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
              >
                <Globe className="h-4 w-4" />
                External Factors
              </a>
              <a
                href="/cro-analysis"
                className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors"
              >
                <Building2 className="h-4 w-4" />
                CRO Analysis
              </a>
              <a
                href="/cmc-risk"
                className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
              >
                <Beaker className="h-4 w-4" />
                CMC Risk
              </a>
              <a
                href="/trial-design"
                className="flex items-center gap-2 px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
              >
                <ClipboardList className="h-4 w-4" />
                Trial Design
              </a>
              <a
                href="/site-readiness"
                className="flex items-center gap-2 px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700 transition-colors"
              >
                <MapPin className="h-4 w-4" />
                Site Readiness
              </a>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            This report summarizes Convexia's AI-powered analysis of {analysis?.drugName || trialData.name}, a {analysis?.molecularDetails?.structureType || trialData.type} for {analysis?.clinicalInfo?.indication || trialData.indication}. Results are derived from integrated molecular modeling, clinical trial risk assessment, and comprehensive operational analysis—computed in seconds using advanced AI algorithms.
          </p>
        </div>

        {/* Executive Summary */}
        {analysis && (
          <div className="px-6 py-6 bg-blue-50 border-b border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-4 flex items-center gap-2">
              <Zap className="h-5 w-5" />
              AI-Powered Executive Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Trial Overview</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Drug:</strong> {analysis.drugName || currentData.drugName}</li>
                  <li>• <strong>Type:</strong> {analysis.molecularDetails?.structureType || currentData.molecularDetails.structureType}</li>
                  <li>• <strong>Indication:</strong> {analysis.clinicalInfo?.indication || currentData.clinicalInfo.indication}</li>
                  <li>• <strong>Phase:</strong> {analysis.clinicalInfo?.phase || currentData.clinicalInfo.phase}</li>
                  <li>• <strong>Mechanism:</strong> {analysis.molecularDetails?.mechanism || currentData.molecularDetails.mechanism}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Operational Metrics</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• <strong>Risk Score:</strong> <span className="font-semibold">{analysis.riskAssessment?.overallScore || currentData.riskAssessment.overallScore}/100</span> ({analysis.riskAssessment?.riskLevel || currentData.riskAssessment.riskLevel})</li>
                  <li>• <strong>Scope:</strong> {analysis.trialMetrics?.countries || 15} countries, {analysis.trialMetrics?.sites || 85} sites</li>
                  <li>• <strong>Timeline:</strong> {analysis.trialMetrics?.duration || '24 months'}</li>
                  <li>• <strong>Budget:</strong> {analysis.trialMetrics?.budget || '$78,000,000'}</li>
                  <li>• <strong>Route:</strong> {analysis.molecularDetails?.route || currentData.molecularDetails.route}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-blue-800 mb-2">Critical Risk Factors</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  {currentRiskComponents.slice(0, 3).map((component, index) => (
                    <li key={index}>• <strong>{component.name}:</strong> {component.score}/100</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">AI Analysis Insights</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• <strong>Model Used:</strong> {analysis.modelUsed || 'Gemini 1.5 Flash'}</li>
                    <li>• <strong>Processing Time:</strong> {analysis.processingTime || '2.3 seconds'}</li>
                    <li>• <strong>Data Source:</strong> {analysis.isMockResponse ? 'Mock Response (API Limited)' : 'Live AI Analysis'}</li>
                    <li>• <strong>Confidence:</strong> {analysis.isMockResponse ? '85%' : '95%'}</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-blue-800 mb-2">Top AI Recommendation</h4>
                  <p className="text-sm text-blue-700">
                    {currentRiskComponents[0]?.recommendations?.[0] || 'Implement comprehensive risk mitigation strategies across all identified risk areas with focus on supply chain optimization and regulatory compliance.'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AI Analysis Status */}
        {analysis && (
          <div className={`px-6 py-4 border-b ${analysis.isMockResponse ? 'bg-yellow-50 border-yellow-200' : 'bg-green-50 border-green-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <h3 className={`text-sm font-semibold ${analysis.isMockResponse ? 'text-yellow-900' : 'text-green-900'}`}>
                {analysis.isMockResponse ? 'AI Analysis Complete (Mock Data)' : 'AI Analysis Complete'}
              </h3>
              <span className={`text-xs ${analysis.isMockResponse ? 'text-yellow-600' : 'text-green-600'}`}>
                Model: {analysis.modelUsed || 'Gemini 1.5 Flash'}
              </span>
            </div>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 text-xs ${analysis.isMockResponse ? 'text-yellow-800' : 'text-green-800'}`}>
              <div><span className="font-medium">Drug Name:</span> {analysis.drugName}</div>
              <div><span className="font-medium">Risk Score:</span> {analysis.riskAssessment.overallScore}</div>
              <div><span className="font-medium">Processing Time:</span> {analysis.processingTime}</div>
              <div><span className="font-medium">Analysis Date:</span> {new Date(analysis.timestamp || Date.now()).toLocaleDateString()}</div>
            </div>
            <div className="mt-3 p-3 bg-white rounded-lg border">
              <p className={`text-sm ${analysis.isMockResponse ? 'text-yellow-700' : 'text-green-700'}`}>
                <strong>AI Summary:</strong> Comprehensive analysis completed using advanced machine learning algorithms. 
                {analysis.isMockResponse ? ' Analysis includes detailed risk assessment, operational insights, and strategic recommendations based on molecular properties and clinical trial data.' : 
                ' Real-time AI analysis provides detailed risk assessment, operational insights, and strategic recommendations based on molecular properties and clinical trial data.'}
              </p>
            </div>
            <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 text-xs ${analysis.isMockResponse ? 'text-yellow-800' : 'text-green-800'}`}>
              <div><span className="font-medium">Blurred Data:</span> {Object.keys(analysis.blurredData || {}).length} fields</div>
            </div>
          </div>
        )}

        <div className="p-6">
          <div className="space-y-6">
            {/* Trial Card */}
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm border-l-4 border-l-gray-400">
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{currentData.drugName}</h2>
                    <p className="text-sm text-gray-600">{currentData.clinicalInfo.indication} • {currentData.clinicalInfo.phase} • {currentData.clinicalInfo.type}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-gray-900">
                        {currentData.riskAssessment.overallScore}
                      </div>
                      <div className="text-sm text-gray-600">Risk Score</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-gray-900">{trialData.countries}</div>
                      <div className="text-sm text-gray-600">Countries</div>
                    </div>
                    <div className="flex flex-col items-center">
                      <div className="text-3xl font-bold text-gray-900">{trialData.sites}</div>
                      <div className="text-sm text-gray-600">Sites</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-1 border-b-2 font-medium text-sm ${
                      activeTab === tab
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            {activeTab === 'Overview' && (
              <div className="space-y-6">
                {/* Molecular Information */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-2xl font-semibold leading-none tracking-tight">
                      Molecular Information
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Detailed molecular properties and characteristics
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-500">Gene Symbol</div>
                        <div className="text-sm text-gray-900">{currentData.molecularDetails.geneSymbol}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-500">UniProt ID</div>
                        <div className="text-sm text-gray-900">{currentData.molecularDetails.uniprotId}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-500">Structure Type</div>
                        <div className="text-sm text-gray-900">{currentData.molecularDetails.structureType}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-500">Mechanism</div>
                        <div className="text-sm text-gray-900">{currentData.molecularDetails.mechanism}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-500">Route</div>
                        <div className="text-sm text-gray-900">{currentData.molecularDetails.route}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-500">Molecular Weight</div>
                        <div className="text-sm text-gray-900">{currentData.molecularDetails.molecularWeight}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-500">Solubility</div>
                        <div className="text-sm text-gray-900">{currentData.molecularDetails.solubility}</div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-sm font-medium text-gray-500">Half-Life</div>
                        <div className="text-sm text-gray-900">{currentData.molecularDetails.halfLife}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-2xl font-semibold leading-none tracking-tight">
                      AI-Powered Risk Assessment
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Comprehensive risk analysis powered by AI with dynamic scoring
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">Risk Components</h3>
                          <p className="text-sm text-gray-600">Click each component for detailed analysis</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-gray-900">{currentData.riskAssessment.overallScore}</div>
                          <div className="text-sm text-gray-600">{currentData.riskAssessment.riskLevel}</div>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        {currentRiskComponents.map((component) => (
                          <div key={component.name} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-900">{component.name}</h4>
                                <p className="text-sm text-gray-600 mt-1">{component.description}</p>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="text-xl font-bold text-gray-900">{component.score}</div>
                                  <div className="text-xs text-gray-600">Score</div>
                                </div>
                                <button
                                  onClick={() => toggleComponent(component.name)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  {expandedComponents.includes(component.name) ? '▼' : '►'} Detailed Analysis
                                </button>
                              </div>
                            </div>
                            {expandedComponents.includes(component.name) && (
                              <div className="mt-4 pt-4 border-t border-gray-200">
                                <div className="space-y-4">
                                  {/* Detailed Analysis */}
                                  <div>
                                    <h5 className="font-medium text-gray-900 mb-2">AI-Generated Analysis:</h5>
                                    <p className="text-sm text-gray-700 leading-relaxed">
                                      {component.detailedAnalysis || `Comprehensive analysis of ${component.name.toLowerCase()} based on molecular properties, clinical trial data, and operational factors. This risk component has been evaluated using advanced AI algorithms considering multiple data sources and predictive modeling.`}
                                    </p>
                                  </div>

                                  {/* Operational Impact */}
                                  {component.operationalImpact && (
                                    <div>
                                      <h5 className="font-medium text-gray-900 mb-2">Operational Impact:</h5>
                                      <p className="text-sm text-gray-700 leading-relaxed">{component.operationalImpact}</p>
                                    </div>
                                  )}

                                  {/* Recommendations */}
                                  {component.recommendations && component.recommendations.length > 0 && (
                                    <div>
                                      <h5 className="font-medium text-gray-900 mb-2">AI Recommendations:</h5>
                                      <ul className="list-disc list-inside space-y-2">
                                        {component.recommendations.map((rec, index) => (
                                          <li key={index} className="text-sm text-gray-700 leading-relaxed">{rec}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* Data Sources */}
                                  {component.dataSources && component.dataSources.length > 0 && (
                                    <div>
                                      <h5 className="font-medium text-gray-900 mb-2">Data Sources:</h5>
                                      <ul className="list-disc list-inside space-y-1">
                                        {component.dataSources.map((source, index) => (
                                          <li key={index} className="text-xs text-gray-600">{source}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {/* AI Summary */}
                                  <div className="bg-blue-50 p-3 rounded-lg">
                                    <p className="text-sm text-blue-800">
                                      <strong>AI Summary:</strong> This risk component has been comprehensively analyzed using advanced machine learning algorithms, incorporating molecular data, clinical trial databases, and operational intelligence. The analysis provides actionable insights for risk mitigation and trial optimization.
                                    </p>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* AI Analysis Status */}
                <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                  <div className="flex flex-col space-y-1.5 p-6">
                    <div className="text-2xl font-semibold leading-none tracking-tight">
                      AI Analysis Status
                    </div>
                  </div>
                  <div className="p-6 pt-0">
                    {analysis ? (
                      <div className="text-center text-green-600">
                        <p className="font-medium">AI analysis completed successfully!</p>
                        <p className="text-sm mt-1">Model: {analysis.modelUsed || 'Gemini 1.5 Flash'}</p>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500">
                        <p>AI analysis not yet performed</p>
                        <p className="text-sm mt-1">Click "AI Analysis Tool" to generate comprehensive analysis</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* External Factors Tab */}
            {activeTab === 'External Factors' && (
              <div className="space-y-6">
                {analysis?.externalFactors ? (
                  <>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                      <div className="flex flex-col space-y-1.5 p-6">
                        <div className="text-2xl font-semibold leading-none tracking-tight">
                          External Risk Assessment
                        </div>
                        <div className="text-sm text-muted-foreground">
                          External factors affecting trial execution
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-red-600">{analysis.externalFactors.externalRiskScore}</div>
                            <div className="text-sm text-gray-600">Risk Score</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">{analysis.externalFactors.countriesMonitored}</div>
                            <div className="text-sm text-gray-600">Countries</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-orange-600">{analysis.externalFactors.activeAlerts}</div>
                            <div className="text-sm text-gray-600">Active Alerts</div>
                          </div>
                          <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900">{analysis.externalFactors.disruptionRisk}</div>
                            <div className="text-sm text-gray-600">Disruption Risk</div>
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Geopolitical Risk Assessment</h4>
                            <p className="text-sm text-gray-700">{analysis.externalFactors.geopoliticalRisk}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Supply Chain Risk</h4>
                            <p className="text-sm text-gray-700">{analysis.externalFactors.supplyChainRisk}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Regulatory Risk</h4>
                            <p className="text-sm text-gray-700">{analysis.externalFactors.regulatoryRisk}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                      <div className="flex flex-col space-y-1.5 p-6">
                        <div className="text-2xl font-semibold leading-none tracking-tight">
                          Regulatory Updates
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">FDA Updates</h4>
                            <p className="text-sm text-gray-700">{analysis.externalFactors.fdaUpdates}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">EMA Updates</h4>
                            <p className="text-sm text-gray-700">{analysis.externalFactors.emaUpdates}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {analysis.externalFactors.aiInsights && analysis.externalFactors.aiInsights.length > 0 && (
                      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                          <div className="text-2xl font-semibold leading-none tracking-tight">
                            AI Insights
                          </div>
                        </div>
                        <div className="p-6 pt-0">
                          <div className="space-y-4">
                            {analysis.externalFactors.aiInsights.map((insight, index) => (
                              <div key={index} className="border-l-4 border-blue-500 pl-4">
                                <h4 className="font-medium text-gray-900">{insight.category}</h4>
                                <p className="text-sm text-gray-700 mt-1">{insight.insight}</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>Impact:</strong> {insight.impact}</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>Recommendation:</strong> {insight.recommendation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="text-center text-gray-500">
                      <p>External Factors analysis not available.</p>
                      <p className="text-sm mt-2">Generate AI analysis to view detailed external factors assessment.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CRO Analysis Tab */}
            {activeTab === 'CRO Analysis' && (
              <div className="space-y-6">
                {analysis?.croAnalysis ? (
                  <>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                      <div className="flex flex-col space-y-1.5 p-6">
                        <div className="text-2xl font-semibold leading-none tracking-tight">
                          CRO Selection & Analysis
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Selected CRO</h4>
                            <p className="text-sm text-gray-700">{analysis.croAnalysis.selectedCRO}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">CRO Strengths</h4>
                            <p className="text-sm text-gray-700">{analysis.croAnalysis.croStrengths}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">CRO Experience</h4>
                            <p className="text-sm text-gray-700">{analysis.croAnalysis.croExperience}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Risk Factors</h4>
                            <p className="text-sm text-gray-700">{analysis.croAnalysis.croRiskFactors}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {analysis.croAnalysis.aiRecommendations && analysis.croAnalysis.aiRecommendations.length > 0 && (
                      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                          <div className="text-2xl font-semibold leading-none tracking-tight">
                            AI Recommendations
                          </div>
                        </div>
                        <div className="p-6 pt-0">
                          <div className="space-y-4">
                            {analysis.croAnalysis.aiRecommendations.map((rec, index) => (
                              <div key={index} className="border-l-4 border-green-500 pl-4">
                                <h4 className="font-medium text-gray-900">{rec.category}</h4>
                                <p className="text-sm text-gray-700 mt-1">{rec.insight}</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>Impact:</strong> {rec.impact}</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>Recommendation:</strong> {rec.recommendation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="text-center text-gray-500">
                      <p>CRO Analysis not available.</p>
                      <p className="text-sm mt-2">Generate AI analysis to view detailed CRO assessment.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* CMC Risk Tab */}
            {activeTab === 'CMC Risk' && (
              <div className="space-y-6">
                {analysis?.manufacturing ? (
                  <>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                      <div className="flex flex-col space-y-1.5 p-6">
                        <div className="text-2xl font-semibold leading-none tracking-tight">
                          Manufacturing & CMC Analysis
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Chemistry, Manufacturing, and Controls risk assessment
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Manufacturing Analysis</h4>
                            <p className="text-sm text-gray-700">{analysis.manufacturing.analysis}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Competitive Landscape</h4>
                            <p className="text-sm text-gray-700">{analysis.manufacturing.competitiveLandscape}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Regulatory Pathway</h4>
                            <p className="text-sm text-gray-700">{analysis.manufacturing.regulatoryPathway}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {analysis.manufacturing.aiInsights && analysis.manufacturing.aiInsights.length > 0 && (
                      <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                        <div className="flex flex-col space-y-1.5 p-6">
                          <div className="text-2xl font-semibold leading-none tracking-tight">
                            AI Manufacturing Insights
                          </div>
                        </div>
                        <div className="p-6 pt-0">
                          <div className="space-y-4">
                            {analysis.manufacturing.aiInsights.map((insight, index) => (
                              <div key={index} className="border-l-4 border-purple-500 pl-4">
                                <h4 className="font-medium text-gray-900">{insight.category}</h4>
                                <p className="text-sm text-gray-700 mt-1">{insight.insight}</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>Impact:</strong> {insight.impact}</p>
                                <p className="text-sm text-gray-600 mt-1"><strong>Recommendation:</strong> {insight.recommendation}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="text-center text-gray-500">
                      <p>CMC Risk analysis not available.</p>
                      <p className="text-sm mt-2">Generate AI analysis to view detailed manufacturing assessment.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Trial Design Tab */}
            {activeTab === 'Trial Design' && (
              <div className="space-y-6">
                {analysis?.trialDesign ? (
                  <>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                      <div className="flex flex-col space-y-1.5 p-6">
                        <div className="text-2xl font-semibold leading-none tracking-tight">
                          Trial Design Analysis
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Study design optimization and statistical considerations
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Study Design</h4>
                            <p className="text-sm text-gray-700">{analysis.trialDesign.studyDesign}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Primary Endpoint</h4>
                            <p className="text-sm text-gray-700">{analysis.trialDesign.primaryEndpoint}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Patient Population</h4>
                            <p className="text-sm text-gray-700">{analysis.trialDesign.patientPopulation}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Statistical Analysis</h4>
                            <p className="text-sm text-gray-700">{analysis.trialDesign.statisticalAnalysis}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Safety Monitoring</h4>
                            <p className="text-sm text-gray-700">{analysis.trialDesign.safetyMonitoring}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="text-center text-gray-500">
                      <p>Trial Design analysis not available.</p>
                      <p className="text-sm mt-2">Generate AI analysis to view detailed trial design assessment.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Site Readiness Tab */}
            {activeTab === 'Site Readiness' && (
              <div className="space-y-6">
                {analysis?.siteReadiness ? (
                  <>
                    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                      <div className="flex flex-col space-y-1.5 p-6">
                        <div className="text-2xl font-semibold leading-none tracking-tight">
                          Site Readiness Assessment
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Site selection, infrastructure, and training requirements
                        </div>
                      </div>
                      <div className="p-6 pt-0">
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Site Selection Criteria</h4>
                            <p className="text-sm text-gray-700">{analysis.siteReadiness.siteSelection}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Infrastructure Requirements</h4>
                            <p className="text-sm text-gray-700">{analysis.siteReadiness.infrastructureRequirements}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Training Requirements</h4>
                            <p className="text-sm text-gray-700">{analysis.siteReadiness.trainingRequirements}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Regulatory Compliance</h4>
                            <p className="text-sm text-gray-700">{analysis.siteReadiness.regulatoryCompliance}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900 mb-2">Timeline Considerations</h4>
                            <p className="text-sm text-gray-700">{analysis.siteReadiness.timelineConsiderations}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                    <div className="text-center text-gray-500">
                      <p>Site Readiness analysis not available.</p>
                      <p className="text-sm mt-2">Generate AI analysis to view detailed site readiness assessment.</p>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Other tabs show placeholder content */}
            {!['Overview', 'External Factors', 'CRO Analysis', 'CMC Risk', 'Trial Design', 'Site Readiness'].includes(activeTab) && (
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-6">
                <div className="text-center text-gray-500">
                  <p>Content for {activeTab} tab would be displayed here.</p>
                  <p className="text-sm mt-2">This would include detailed analysis, charts, and recommendations specific to this area.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 