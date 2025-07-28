'use client'

import { useAI } from '@/lib/ai-context'
import { Beaker, Factory, Shield, Activity, Zap, AlertTriangle, CheckCircle } from 'lucide-react'

export default function CMCRiskPage() {
  const { analysis, inputs } = useAI()

  // Use AI analysis data if available, otherwise show placeholder
  const cmcData = analysis?.manufacturing || {
    analysis: 'Small molecule manufacturing utilizes established synthetic chemistry processes. API synthesis involves 8-step synthetic route with multiple purification steps. Manufacturing process well-characterized with established quality control protocols.',
    competitiveLandscape: 'Highly competitive small molecule market with numerous players. Generic competition significant post-patent expiration. Cost-effective manufacturing provides competitive advantage. Multiple companies pursuing similar mechanisms.',
    regulatoryPathway: 'FDA New Drug Application (NDA) pathway with potential for Fast Track designation. EMA centralized procedure with conditional marketing authorization. Standard regulatory pathway with established requirements.',
    qualityControl: 'Standard quality control protocols for small molecules including purity, potency, and stability testing. Well-established analytical methods and acceptance criteria. Stability testing under standard conditions.',
    aiInsights: [
      {
        category: 'Manufacturing Optimization',
        insight: 'Small molecule manufacturing cost can be reduced by 20% through route optimization and improved crystallization processes',
        impact: 'High',
        recommendation: 'Implement manufacturing optimization strategies to improve efficiency and reduce costs'
      },
      {
        category: 'Supply Chain Risk',
        insight: 'API starting materials and key intermediates represent potential supply chain risks',
        impact: 'High',
        recommendation: 'Establish secondary suppliers and increase inventory buffers for critical materials'
      },
      {
        category: 'Regulatory Strategy',
        insight: 'Regulatory agencies increasingly supportive of innovative manufacturing approaches with potential for accelerated pathways',
        impact: 'Medium',
        recommendation: 'Engage early with regulatory agencies to discuss innovative manufacturing strategies'
      }
    ]
  }

  const getImpactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-600'
      case 'medium': return 'text-yellow-600'
      case 'low': return 'text-green-600'
      default: return 'text-gray-600'
    }
  }

  const cmcRiskFactors = [
    {
      category: 'API Manufacturing',
      risk: 'Medium',
      description: '8-step synthetic route with multiple purification steps',
      mitigation: 'Route optimization and process validation',
      status: 'warning'
    },
    {
      category: 'Formulation Development',
      risk: 'Low',
      description: 'Standard formulation approaches applicable',
      mitigation: 'Standard formulation protocols',
      status: 'success'
    },
    {
      category: 'Quality Control',
      risk: 'Low',
      description: 'Well-established analytical methods',
      mitigation: 'Standard QC protocols',
      status: 'success'
    },
    {
      category: 'Supply Chain',
      risk: 'Medium',
      description: 'Multiple suppliers for key materials',
      mitigation: 'Backup supplier qualification',
      status: 'warning'
    },
    {
      category: 'Regulatory Compliance',
      risk: 'Low',
      description: 'Standard regulatory pathway',
      mitigation: 'Standard compliance protocols',
      status: 'success'
    },
    {
      category: 'Scale-up',
      risk: 'Medium',
      description: 'Manufacturing scale-up considerations',
      mitigation: 'Pilot plant validation',
      status: 'warning'
    }
  ]

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success': return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case 'error': return <AlertTriangle className="h-4 w-4 text-red-600" />
      default: return <Activity className="h-4 w-4 text-gray-600" />
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
            <span className="text-sm text-gray-600">CMC Risk Analysis</span>
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
            <Beaker className="h-10 w-10 text-blue-600" />
            CMC Risk Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Chemistry, Manufacturing, and Controls risk assessment for clinical trial success
          </p>
        </div>

        {/* Risk Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Overall CMC Risk</h3>
              <Shield className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">Medium</div>
            <div className="text-sm text-gray-600">Manageable with mitigation</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Manufacturing Complexity</h3>
              <Factory className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">Standard</div>
            <div className="text-sm text-gray-600">Well-established processes</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Regulatory Pathway</h3>
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">Standard</div>
            <div className="text-sm text-gray-600">NDA pathway</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI Confidence</h3>
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">92%</div>
            <div className="text-sm text-gray-600">High accuracy</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Manufacturing Analysis */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Factory className="h-6 w-6 text-blue-600" />
                Manufacturing Analysis
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Process Overview</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{cmcData.analysis}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Competitive Landscape</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{cmcData.competitiveLandscape}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Quality Control</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{cmcData.qualityControl}</p>
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-600" />
                AI Insights
              </h2>
              
              <div className="space-y-4">
                {cmcData.aiInsights.map((insight, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{insight.category}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(insight.impact)}`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{insight.insight}</p>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Recommendation:</span>
                      <p className="text-gray-600 mt-1">{insight.recommendation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6 text-red-600" />
                CMC Risk Factors
              </h2>
              
              <div className="space-y-4">
                {cmcRiskFactors.map((factor, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{factor.category}</h3>
                      <div className="flex items-center gap-2">
                        <span className={`font-medium ${getRiskColor(factor.risk)}`}>
                          {factor.risk} Risk
                        </span>
                        {getStatusIcon(factor.status)}
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{factor.description}</p>
                    <div className="text-sm">
                      <span className="font-medium text-gray-900">Mitigation:</span>
                      <p className="text-gray-600 mt-1">{factor.mitigation}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Regulatory Pathway */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6 text-green-600" />
                Regulatory Pathway
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">FDA Pathway</h3>
                  <p className="text-gray-700 text-sm leading-relaxed">{cmcData.regulatoryPathway}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold text-gray-900 mb-2">Key Requirements</h3>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Chemistry and manufacturing controls (CMC) data</li>
                    <li>• Process validation and control</li>
                    <li>• Quality control and stability testing</li>
                    <li>• Environmental assessment</li>
                    <li>• Drug master file (DMF) submission</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Manufacturing Timeline */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Manufacturing Timeline</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Phase 1: Process Development (Months 1-6)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Route optimization</li>
                <li>• Process characterization</li>
                <li>• Analytical method development</li>
                <li>• Initial stability studies</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Phase 2: Scale-up (Months 7-12)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pilot plant manufacturing</li>
                <li>• Process validation</li>
                <li>• Quality control validation</li>
                <li>• Regulatory documentation</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Phase 3: Commercial Prep (Months 13-18)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Commercial facility qualification</li>
                <li>• Technology transfer</li>
                <li>• Regulatory submissions</li>
                <li>• Pre-approval inspections</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Phase 4: Launch (Months 19-24)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Commercial manufacturing</li>
                <li>• Post-approval commitments</li>
                <li>• Ongoing monitoring</li>
                <li>• Continuous improvement</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Risk Mitigation Strategies */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Risk Mitigation Strategies</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Immediate Actions (0-3 months)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Initiate route optimization studies</li>
                <li>• Qualify backup suppliers</li>
                <li>• Establish quality control protocols</li>
                <li>• Begin regulatory engagement</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Short-term (3-12 months)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Complete process validation</li>
                <li>• Establish commercial manufacturing</li>
                <li>• Prepare regulatory submissions</li>
                <li>• Implement quality systems</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Long-term (12+ months)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Continuous process improvement</li>
                <li>• Technology advancement</li>
                <li>• Cost optimization</li>
                <li>• Regulatory compliance maintenance</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 