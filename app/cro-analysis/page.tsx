'use client'

import { useAI } from '@/lib/ai-context'
import { Building2, TrendingUp, Shield, Activity, Zap, CheckCircle, AlertTriangle } from 'lucide-react'

export default function CROAnalysisPage() {
  const { analysis, inputs } = useAI()

  // Use AI analysis data if available, otherwise show placeholder
  const croData = analysis?.croAnalysis || {
    selectedCRO: 'Medpace Holdings Inc',
    croStrengths: 'Extensive experience in respiratory drug development with specialized pulmonary function testing capabilities. Strong regulatory expertise with inhaled drug approvals. Global network of sites with respiratory trial experience.',
    croExperience: 'Conducted 30+ respiratory drug trials including COPD and asthma studies. Successfully managed regulatory approvals for multiple inhaled drugs. Established protocols for pulmonary function testing and respiratory safety monitoring.',
    croRiskFactors: 'Pulmonary function testing requirements may create site selection challenges. Inhalation device training requirements may increase patient burden. Regional variations in respiratory disease prevalence may impact enrollment.',
    aiRecommendations: [
      {
        category: 'CRO Selection',
        insight: 'Medpace Holdings Inc provides optimal fit for respiratory drug development with specialized pulmonary function testing capabilities',
        impact: 'High',
        recommendation: 'Proceed with selected CRO based on specialized expertise and proven track record'
      },
      {
        category: 'Risk Mitigation',
        insight: 'Implement comprehensive risk mitigation strategies including backup CRO options and enhanced monitoring protocols',
        impact: 'Medium',
        recommendation: 'Establish contingency plans and enhanced monitoring to mitigate CRO-related risks'
      },
      {
        category: 'Performance Optimization',
        insight: 'Regular performance reviews and KPI monitoring essential for optimal CRO performance',
        impact: 'Medium',
        recommendation: 'Implement regular performance reviews and KPI monitoring to optimize CRO performance'
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

  const performanceMetrics = [
    { metric: 'Site Activation Rate', value: '85%', target: '90%', status: 'warning' },
    { metric: 'Patient Enrollment Rate', value: '92%', target: '95%', status: 'success' },
    { metric: 'Data Quality Score', value: '98%', target: '95%', status: 'success' },
    { metric: 'Regulatory Compliance', value: '100%', target: '100%', status: 'success' },
    { metric: 'Timeline Adherence', value: '78%', target: '85%', status: 'warning' },
    { metric: 'Cost Efficiency', value: '88%', target: '90%', status: 'success' }
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
            <span className="text-sm text-gray-600">CRO Analysis</span>
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
            <Building2 className="h-10 w-10 text-blue-600" />
            CRO Analysis & Selection
          </h1>
          <p className="text-lg text-gray-600">
            AI-powered CRO evaluation and performance monitoring for optimal clinical trial execution
          </p>
        </div>

        {/* Selected CRO Overview */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Selected CRO</h2>
            <div className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">AI Recommended</span>
            </div>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">{croData.selectedCRO}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Strengths</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{croData.croStrengths}</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Relevant Experience</h4>
                <p className="text-gray-700 text-sm leading-relaxed">{croData.croExperience}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* CRO Performance Metrics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-green-600" />
              Performance Metrics
            </h2>
            
            <div className="space-y-4">
              {performanceMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900">{metric.metric}</span>
                    {getStatusIcon(metric.status)}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                      <span className="text-sm text-gray-500">/ {metric.target}</span>
                    </div>
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          metric.status === 'success' ? 'bg-green-500' :
                          metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'
                        }`}
                        style={{ width: `${parseInt(metric.value)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Shield className="h-6 w-6 text-red-600" />
              Risk Assessment
            </h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Identified Risk Factors</h3>
                <p className="text-gray-700 text-sm leading-relaxed">{croData.croRiskFactors}</p>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Mitigation Strategies</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Establish backup CRO relationships</li>
                  <li>• Implement enhanced monitoring protocols</li>
                  <li>• Develop contingency plans for site activation delays</li>
                  <li>• Regular performance reviews and KPI tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* AI Recommendations */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
            <Zap className="h-6 w-6 text-yellow-600" />
            AI Recommendations
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {croData.aiRecommendations.map((recommendation, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-gray-900">{recommendation.category}</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getImpactColor(recommendation.impact)}`}>
                    {recommendation.impact} Impact
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{recommendation.insight}</p>
                <div className="text-sm">
                  <span className="font-medium text-gray-900">Recommendation:</span>
                  <p className="text-gray-600 mt-1">{recommendation.recommendation}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CRO Comparison */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">CRO Comparison</h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">CRO</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Specialization</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Experience</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Risk Score</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900">Recommendation</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100 bg-blue-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{croData.selectedCRO}</td>
                  <td className="py-3 px-4 text-gray-700">Respiratory & Pulmonary</td>
                  <td className="py-3 px-4 text-gray-700">30+ trials</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Low</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">Recommended</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">Parexel International</td>
                  <td className="py-3 px-4 text-gray-700">Biologics & Oncology</td>
                  <td className="py-3 px-4 text-gray-700">50+ trials</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Medium</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Alternative</span>
                  </td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium text-gray-900">IQVIA</td>
                  <td className="py-3 px-4 text-gray-700">Large-scale trials</td>
                  <td className="py-3 px-4 text-gray-700">100+ trials</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">Medium</span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">Alternative</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Action Plan */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Implementation Action Plan</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Phase 1: Contract Negotiation (Weeks 1-4)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Finalize CRO contract terms</li>
                <li>• Establish performance metrics</li>
                <li>• Define communication protocols</li>
                <li>• Set up project management tools</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Phase 2: Site Selection (Weeks 5-12)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• CRO-led site identification</li>
                <li>• Site feasibility assessments</li>
                <li>• Regulatory submission preparation</li>
                <li>• Site qualification visits</li>
              </ul>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-3">Phase 3: Trial Execution (Weeks 13+)</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>• Site activation and training</li>
                <li>• Patient recruitment initiation</li>
                <li>• Ongoing monitoring and oversight</li>
                <li>• Performance tracking and optimization</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 