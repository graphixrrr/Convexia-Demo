'use client'

import { useState } from 'react'
import { useAI } from '@/lib/ai-context'
import { BarChart3, TrendingUp, Target, Globe, DollarSign, AlertTriangle, CheckCircle, Loader2, Zap } from 'lucide-react'

interface MarketAnalysis {
  drugName: string
  indication: string
  marketSize: string
  growthRate: string
  competitiveLandscape: string
  keyCompetitors: string[]
  regulatoryPathway: string
  timeline: string
  riskFactors: string[]
  opportunities: string[]
  aiInsights: Array<{
    category: string
    insight: string
    impact: string
    recommendation: string
  }>
  modelUsed: string
  processingTime: string
  timestamp: string
  isMockResponse: boolean
}

export default function MarketAnalysisPage() {
  const { analysis } = useAI()
  const [marketAnalysis, setMarketAnalysis] = useState<MarketAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const generateMarketAnalysis = async () => {
    if (!analysis) {
      setError('Please generate a drug analysis first')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/market-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          drugName: analysis.drugName,
          indication: analysis.clinicalInfo.indication,
          phase: analysis.clinicalInfo.phase,
          structureType: analysis.molecularDetails.structureType
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setMarketAnalysis(data)
    } catch (err) {
      console.error('Error generating market analysis:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
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
            <span className="text-sm text-gray-600">AI Market Analysis</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Zap className="h-4 w-4" />
              AI-Powered Market Intelligence
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Market Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Comprehensive market intelligence powered by Gemini AI
          </p>
        </div>

        {/* Generate Analysis Button */}
        <div className="text-center mb-8">
          {!marketAnalysis && !isLoading && (
            <button
              onClick={generateMarketAnalysis}
              disabled={!analysis}
              className="px-8 py-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 mx-auto transition-colors"
            >
              <BarChart3 className="h-5 w-5" />
              Generate Market Analysis
            </button>
          )}
          
          {isLoading && (
            <div className="flex items-center gap-2 text-purple-600">
              <Loader2 className="h-5 w-5 animate-spin" />
              Generating market analysis...
            </div>
          )}
          
          {error && (
            <div className="text-red-600 bg-red-50 p-4 rounded-lg max-w-md mx-auto">
              {error}
            </div>
          )}
        </div>

        {/* Market Analysis Results */}
        {marketAnalysis && (
          <div className="space-y-8">
            {/* Market Overview */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Globe className="h-6 w-6 text-blue-600" />
                Market Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <DollarSign className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{marketAnalysis.marketSize}</div>
                  <div className="text-sm text-gray-600">Market Size</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <TrendingUp className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{marketAnalysis.growthRate}</div>
                  <div className="text-sm text-gray-600">Growth Rate</div>
                </div>
                <div className="text-center p-4 bg-purple-50 rounded-lg">
                  <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{marketAnalysis.timeline}</div>
                  <div className="text-sm text-gray-600">Time to Market</div>
                </div>
              </div>
            </div>

            {/* Competitive Landscape */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Target className="h-6 w-6 text-red-600" />
                Competitive Landscape
              </h2>
              
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{marketAnalysis.competitiveLandscape}</p>
                
                <div>
                  <h3 className="font-medium text-gray-900 mb-3">Key Competitors</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {marketAnalysis.keyCompetitors.map((competitor, index) => (
                      <div key={index} className="p-2 bg-gray-50 rounded text-sm">
                        {competitor}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Risk Factors & Opportunities */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                  Risk Factors
                </h2>
                
                <div className="space-y-3">
                  {marketAnalysis.riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-red-50 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-red-800">{risk}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                  Opportunities
                </h2>
                
                <div className="space-y-3">
                  {marketAnalysis.opportunities.map((opportunity, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-800">{opportunity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* AI Insights */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-600" />
                AI-Generated Insights
              </h2>
              
              <div className="space-y-6">
                {marketAnalysis.aiInsights.map((insight, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-gray-900">{insight.category}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        insight.impact === 'High' ? 'bg-red-100 text-red-800' :
                        insight.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {insight.impact} Impact
                      </span>
                    </div>
                    <p className="text-gray-700 mb-3">{insight.insight}</p>
                    <div className="bg-blue-50 p-3 rounded">
                      <p className="text-sm text-blue-800">
                        <strong>Recommendation:</strong> {insight.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Analysis Metadata */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <span>Model: {marketAnalysis.modelUsed}</span>
                  <span>Processing Time: {marketAnalysis.processingTime}</span>
                  <span>Generated: {new Date(marketAnalysis.timestamp).toLocaleString()}</span>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  marketAnalysis.isMockResponse ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                }`}>
                  {marketAnalysis.isMockResponse ? 'Mock Data' : 'Real AI Analysis'}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        {!marketAnalysis && !isLoading && (
          <div className="text-center py-12 text-gray-500">
            <BarChart3 className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Generate a drug analysis first, then click "Generate Market Analysis" to see AI-powered market intelligence</p>
          </div>
        )}
      </div>
    </div>
  )
} 