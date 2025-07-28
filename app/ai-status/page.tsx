'use client'

import { useAI } from '@/lib/ai-context'
import { Activity, Zap, Clock, AlertCircle, CheckCircle, TrendingUp, Settings, BarChart3, Globe, Shield, Database } from 'lucide-react'

export default function AIStatusPage() {
  const { 
    aiStatus, 
    analysisHistory, 
    aiFeatures, 
    isAIActive,
    toggleAIFeature,
    checkAIStatus,
    generateQuickAnalysis
  } = useAI()

  const formatUptime = (uptime: number) => {
    const days = Math.floor(uptime / 24)
    const hours = Math.floor(uptime % 24)
    return `${days}d ${hours}h`
  }

  const getStatusColor = (isOnline: boolean) => {
    return isOnline ? 'text-green-600' : 'text-red-600'
  }

  const getStatusIcon = (isOnline: boolean) => {
    return isOnline ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />
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
            <span className="text-sm text-gray-600">AI Status & Monitoring</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 ${getStatusColor(aiStatus.isOnline)}`}>
              {getStatusIcon(aiStatus.isOnline)}
              <span className="text-sm font-medium">
                {aiStatus.isOnline ? 'AI Online' : 'AI Offline'}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Status & Monitoring
          </h1>
          <p className="text-lg text-gray-600">
            Real-time monitoring of Gemini AI performance and analysis history
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* AI Status Overview */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Status */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
                  <Activity className="h-6 w-6 text-blue-600" />
                  Real-time AI Status
                </h2>
                <button
                  onClick={checkAIStatus}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Refresh Status
                </button>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{aiStatus.responseTime}ms</div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{aiStatus.apiCalls}</div>
                  <div className="text-sm text-gray-600">API Calls</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{aiStatus.errors}</div>
                  <div className="text-sm text-gray-600">Errors</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-gray-900">{aiStatus.uptime}%</div>
                  <div className="text-sm text-gray-600">Uptime</div>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-blue-900">Model Information</h3>
                    <p className="text-sm text-blue-700">Version: {aiStatus.modelVersion}</p>
                    <p className="text-sm text-blue-700">Last Ping: {aiStatus.lastPing.toLocaleTimeString()}</p>
                  </div>
                  <div className={`flex items-center gap-2 ${getStatusColor(aiStatus.isOnline)}`}>
                    {getStatusIcon(aiStatus.isOnline)}
                    <span className="font-medium">
                      {aiStatus.isOnline ? 'Operational' : 'Service Disrupted'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis History */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <BarChart3 className="h-6 w-6 text-green-600" />
                Recent Analysis History
              </h2>
              
              <div className="space-y-4">
                {analysisHistory.length > 0 ? (
                  analysisHistory.map((entry) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900">{entry.drugName}</h3>
                        <p className="text-sm text-gray-600">
                          Risk Score: {entry.riskScore}/100 • {entry.processingTime}
                        </p>
                        <p className="text-xs text-gray-500">
                          {entry.timestamp.toLocaleString()}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          entry.status === 'success' ? 'bg-green-100 text-green-800' :
                          entry.status === 'mock' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {entry.status === 'success' ? 'Real AI' : 
                           entry.status === 'mock' ? 'Mock Data' : 'Error'}
                        </span>
                        <span className="text-xs text-gray-500">{entry.modelUsed}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Database className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>No analysis history yet</p>
                    <p className="text-sm">Generate your first AI analysis to see history here</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Features & Controls */}
          <div className="space-y-6">
            {/* AI Features */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Settings className="h-6 w-6 text-purple-600" />
                AI Features
              </h2>
              
              <div className="space-y-4">
                {Object.entries(aiFeatures).map(([feature, isEnabled]) => (
                  <div key={feature} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${isEnabled ? 'bg-green-100' : 'bg-gray-100'}`}>
                        {feature === 'realTimeAnalysis' && <Zap className="h-4 w-4 text-green-600" />}
                        {feature === 'predictiveModeling' && <TrendingUp className="h-4 w-4 text-blue-600" />}
                        {feature === 'riskAssessment' && <Shield className="h-4 w-4 text-red-600" />}
                        {feature === 'marketAnalysis' && <BarChart3 className="h-4 w-4 text-purple-600" />}
                        {feature === 'regulatoryMonitoring' && <Globe className="h-4 w-4 text-orange-600" />}
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 capitalize">
                          {feature.replace(/([A-Z])/g, ' $1').trim()}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {isEnabled ? 'Active' : 'Disabled'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleAIFeature(feature as keyof typeof aiFeatures)}
                      className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                        isEnabled 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {isEnabled ? 'ON' : 'OFF'}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Zap className="h-6 w-6 text-yellow-600" />
                Quick Actions
              </h2>
              
              <div className="space-y-3">
                <button
                  onClick={() => generateQuickAnalysis('Demo Drug')}
                  className="w-full px-4 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Zap className="h-4 w-4" />
                  Generate Quick Analysis
                </button>
                
                <button
                  onClick={() => checkAIStatus()}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Activity className="h-4 w-4" />
                  Test AI Connection
                </button>
                
                <a
                  href="/input-page"
                  className="w-full px-4 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  <Settings className="h-4 w-4" />
                  Full AI Analysis
                </a>
              </div>
            </div>

            {/* System Information */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                <Database className="h-6 w-6 text-gray-600" />
                System Info
              </h2>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">AI Status:</span>
                  <span className={`font-medium ${getStatusColor(aiStatus.isOnline)}`}>
                    {aiStatus.isOnline ? 'Online' : 'Offline'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Model Version:</span>
                  <span className="font-medium">{aiStatus.modelVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total API Calls:</span>
                  <span className="font-medium">{aiStatus.apiCalls}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Error Rate:</span>
                  <span className="font-medium">
                    {aiStatus.apiCalls > 0 ? ((aiStatus.errors / aiStatus.apiCalls) * 100).toFixed(1) : 0}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Last Updated:</span>
                  <span className="font-medium">{aiStatus.lastPing.toLocaleTimeString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 