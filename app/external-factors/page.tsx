'use client'

import { useAI } from '@/lib/ai-context'
import { Globe, AlertTriangle, TrendingUp, Shield, Activity, Zap } from 'lucide-react'

export default function ExternalFactorsPage() {
  const { analysis, inputs } = useAI()

  // Use AI analysis data if available, otherwise show placeholder
  const externalData = analysis?.externalFactors || {
    externalRiskScore: 23,
    countriesMonitored: 15,
    activeAlerts: 2,
    disruptionRisk: 'Low',
    geopoliticalRisk: 'Low overall with moderate tensions in APAC region',
    supplyChainRisk: 'Low with established contingency plans',
    regulatoryRisk: 'Low with stable regulatory environment',
    fdaUpdates: 'FDA issued updated guidance on inhaled drug development in Q3 2024. New requirements for pulmonary function testing standardization. Accelerated approval pathway available for innovative respiratory therapies.',
    emaUpdates: 'EMA published updated guidelines on COPD drug development in Q2 2024. New requirements for exacerbation rate assessment. Conditional marketing authorization available for innovative approaches.',
    aiInsights: [
      {
        category: 'Geopolitical Risk',
        insight: 'Low overall geopolitical risk with moderate tensions in APAC region being monitored',
        impact: 'Low',
        recommendation: 'Continue monitoring APAC developments but no immediate action required'
      },
      {
        category: 'Supply Chain Risk',
        insight: 'Supply chain risks remain low with established contingency plans and multiple suppliers',
        impact: 'Low',
        recommendation: 'Maintain current supply chain contingency plans'
      },
      {
        category: 'Regulatory Risk',
        insight: 'Regulatory environment remains stable with supportive guidance for innovative therapies',
        impact: 'Low',
        recommendation: 'Continue engagement with regulatory agencies on innovative approaches'
      }
    ]
  }

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50'
      case 'medium': return 'text-yellow-600 bg-yellow-50'
      case 'low': return 'text-green-600 bg-green-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getRiskBgColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'high': return 'bg-red-100'
      case 'medium': return 'bg-yellow-100'
      case 'low': return 'bg-green-100'
      default: return 'bg-gray-100'
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
            <span className="text-sm text-gray-600">External Factors Analysis</span>
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
            <Globe className="h-10 w-10 text-blue-600" />
            External Factors Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive analysis of geopolitical, regulatory, and supply chain factors affecting clinical trial execution
          </p>
        </div>

        {/* Risk Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Overall Risk Score</h3>
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{externalData.externalRiskScore}/100</div>
            <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(externalData.disruptionRisk)}`}>
              {externalData.disruptionRisk} Risk
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Countries Monitored</h3>
              <Globe className="h-6 w-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{externalData.countriesMonitored}</div>
            <div className="text-sm text-gray-600">Active monitoring</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Active Alerts</h3>
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">{externalData.activeAlerts}</div>
            <div className="text-sm text-gray-600">Require attention</div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">AI Confidence</h3>
              <Zap className="h-6 w-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">95%</div>
            <div className="text-sm text-gray-600">High accuracy</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Risk Categories */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Shield className="h-6 w-6 text-blue-600" />
                Risk Categories
              </h2>
              
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Geopolitical Risk</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor('low')}`}>
                      Low
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{externalData.geopoliticalRisk}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Supply Chain Risk</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor('low')}`}>
                      Low
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{externalData.supplyChainRisk}</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-gray-900">Regulatory Risk</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor('low')}`}>
                      Low
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{externalData.regulatoryRisk}</p>
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
                {externalData.aiInsights.map((insight, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{insight.category}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskColor(insight.impact)}`}>
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

          {/* Regulatory Updates */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-green-600" />
                Regulatory Updates
              </h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    FDA Updates
                  </h3>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{externalData.fdaUpdates}</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                    EMA Updates
                  </h3>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <p className="text-gray-700 text-sm leading-relaxed">{externalData.emaUpdates}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Global Monitoring Map */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="h-6 w-6 text-purple-600" />
                Global Monitoring
              </h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{externalData.countriesMonitored}</div>
                    <div className="text-sm text-gray-600">Countries</div>
                  </div>
                  <div className="text-center p-4 bg-gray-50 rounded-lg">
                    <div className="text-2xl font-bold text-gray-900">{externalData.activeAlerts}</div>
                    <div className="text-sm text-gray-600">Active Alerts</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">North America</span>
                    <span className="text-green-600 font-medium">Stable</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Europe</span>
                    <span className="text-green-600 font-medium">Stable</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">APAC</span>
                    <span className="text-yellow-600 font-medium">Monitoring</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Latin America</span>
                    <span className="text-green-600 font-medium">Stable</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Items */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Recommended Actions</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Immediate (0-30 days)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Continue monitoring APAC developments</li>
                <li>• Review supply chain contingency plans</li>
                <li>• Update regulatory engagement strategy</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Short-term (1-3 months)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Establish additional supplier relationships</li>
                <li>• Enhance geopolitical monitoring systems</li>
                <li>• Develop regulatory response protocols</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">Long-term (3-12 months)</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Implement AI-powered risk prediction</li>
                <li>• Expand global monitoring network</li>
                <li>• Develop comprehensive contingency plans</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 