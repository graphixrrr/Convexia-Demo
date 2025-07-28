'use client'

import { useAI } from '@/lib/ai-context'
import { Loader2, Beaker, Activity, Target, Zap, RefreshCw, CheckCircle } from 'lucide-react'

export default function TestGeminiPage() {
  const { inputs, analysis, isLoading, error, updateInputs, generateAnalysis, clearAnalysis } = useAI()

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    updateInputs({ [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generateAnalysis()
  }

  const testMolecule = {
    geneSymbol: 'PDE3A',
    uniprotId: 'P27815',
    structureType: 'Small molecule',
    mechanism: 'PDE3/4 inhibitor',
    route: 'Inhalation',
    indication: 'COPD with chronic bronchitis',
    phase: 'Phase III',
    type: 'Inhaled Small Molecule',
    molecularWeight: '450 Da',
    solubility: 'Lipophilic',
    targetReceptor: 'PDE3A/PDE4D',
    halfLife: '12 hours'
  }

  const loadTestData = () => {
    console.log('Loading test data:', testMolecule)
    updateInputs(testMolecule)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Gemini AI Integration Test
          </h1>
          <p className="text-lg text-gray-600">
            Test the Gemini AI integration and see real-time updates across all pages
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Beaker className="h-6 w-6 text-blue-600" />
              Molecule Inputs
            </h2>

            <div className="mb-4 space-y-2">
              <button
                onClick={loadTestData}
                className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 transition-colors"
              >
                Load Test Data (PDE3A)
              </button>
              <button
                onClick={() => {
                  updateInputs({
                    geneSymbol: 'PDE3A',
                    uniprotId: 'P27815',
                    structureType: 'Small molecule',
                    mechanism: 'PDE3/4 inhibitor',
                    route: 'Inhalation',
                    indication: 'COPD with chronic bronchitis',
                    phase: 'Phase III',
                    type: 'Inhaled Small Molecule'
                  })
                }}
                className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors"
              >
                Fill All Required Fields
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gene Symbol *
                  </label>
                  <input
                    type="text"
                    value={inputs.geneSymbol}
                    onChange={(e) => handleInputChange('geneSymbol', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., PDE3A"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    UniProt ID *
                  </label>
                  <input
                    type="text"
                    value={inputs.uniprotId}
                    onChange={(e) => handleInputChange('uniprotId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., P27815"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Structure Type *
                  </label>
                  <select
                    value={inputs.structureType}
                    onChange={(e) => handleInputChange('structureType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select type</option>
                    <option value="Small molecule">Small molecule</option>
                    <option value="Biologic">Biologic</option>
                    <option value="Antibody">Antibody</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Route *
                  </label>
                  <select
                    value={inputs.route}
                    onChange={(e) => handleInputChange('route', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select route</option>
                    <option value="Oral">Oral</option>
                    <option value="Inhalation">Inhalation</option>
                    <option value="Intravenous">Intravenous</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mechanism *
                </label>
                <input
                  type="text"
                  value={inputs.mechanism}
                  onChange={(e) => handleInputChange('mechanism', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., PDE3/4 inhibitor"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Indication *
                  </label>
                  <input
                    type="text"
                    value={inputs.indication}
                    onChange={(e) => handleInputChange('indication', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., COPD with chronic bronchitis"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phase *
                  </label>
                  <select
                    value={inputs.phase}
                    onChange={(e) => handleInputChange('phase', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select phase</option>
                    <option value="Phase I">Phase I</option>
                    <option value="Phase II">Phase II</option>
                    <option value="Phase III">Phase III</option>
                    <option value="Phase IV">Phase IV</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Drug Type *
                </label>
                <select
                  value={inputs.type}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select type</option>
                  <option value="Inhaled Small Molecule">Inhaled Small Molecule</option>
                  <option value="Oral Small Molecule">Oral Small Molecule</option>
                  <option value="Injectable Biologic">Injectable Biologic</option>
                  <option value="Monoclonal Antibody">Monoclonal Antibody</option>
                </select>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing with Gemini...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    Generate AI Analysis
                  </>
                )}
              </button>
              
              <button
                type="button"
                disabled={isLoading}
                onClick={async () => {
                  // First update inputs with the required data
                  updateInputs({
                    geneSymbol: 'PDE3A',
                    uniprotId: 'P27815',
                    structureType: 'Small molecule',
                    mechanism: 'PDE3/4 inhibitor',
                    route: 'Inhalation',
                    indication: 'COPD with chronic bronchitis',
                    phase: 'Phase III',
                    type: 'Inhaled Small Molecule'
                  })
                  
                  // Then generate analysis
                  await generateAnalysis()
                }}
                className="w-full bg-orange-600 text-white py-3 px-6 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Loading Data & Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    Load Data & Generate Analysis
                  </>
                )}
              </button>
            </form>

            <div className="mt-4">
              <div className="space-y-2">
                <button
                  onClick={clearAnalysis}
                  className="w-full bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition-colors"
                >
                  Clear Analysis
                </button>
                <button
                  onClick={() => {
                    console.log('Current inputs:', inputs)
                    alert(`Current inputs: ${JSON.stringify(inputs, null, 2)}`)
                  }}
                  className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600 transition-colors"
                >
                  Debug: Show Current Inputs
                </button>
              </div>
            </div>
          </div>

          {/* Current State */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Activity className="h-6 w-6 text-green-600" />
              Current State
            </h2>

            <div className="space-y-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h3 className="font-semibold text-blue-900 mb-2">Inputs</h3>
                <div className="text-sm space-y-1">
                  <div><span className="font-medium">Gene Symbol:</span> {inputs.geneSymbol || 'Not set'}</div>
                  <div><span className="font-medium">UniProt ID:</span> {inputs.uniprotId || 'Not set'}</div>
                  <div><span className="font-medium">Structure Type:</span> {inputs.structureType || 'Not set'}</div>
                  <div><span className="font-medium">Mechanism:</span> {inputs.mechanism || 'Not set'}</div>
                  <div><span className="font-medium">Route:</span> {inputs.route || 'Not set'}</div>
                  <div><span className="font-medium">Indication:</span> {inputs.indication || 'Not set'}</div>
                  <div><span className="font-medium">Phase:</span> {inputs.phase || 'Not set'}</div>
                  <div><span className="font-medium">Drug Type:</span> {inputs.type || 'Not set'}</div>
                </div>
              </div>

              <div className="p-4 bg-green-50 rounded-lg">
                <h3 className="font-semibold text-green-900 mb-2">Analysis Status</h3>
                <div className="text-sm">
                  {analysis ? (
                    <div className="space-y-1">
                      <div><span className="font-medium">Drug Name:</span> {analysis.drugName}</div>
                      <div><span className="font-medium">Risk Score:</span> {analysis.riskAssessment.overallScore}</div>
                      <div><span className="font-medium">Risk Level:</span> {analysis.riskAssessment.riskLevel}</div>
                      <div><span className="font-medium">Model Used:</span> {analysis.modelUsed}</div>
                      <div><span className="font-medium">Processing Time:</span> {analysis.processingTime}</div>
                    </div>
                  ) : (
                    <div className="text-gray-600">No analysis generated yet</div>
                  )}
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 rounded-lg">
                  <h3 className="font-semibold text-red-900 mb-2">Error</h3>
                  <div className="text-sm text-red-700">{error}</div>
                </div>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Target className="h-6 w-6 text-purple-600" />
              Test Navigation
            </h2>

            <div className="space-y-4">
              <a
                href="/"
                className="block w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors text-center"
              >
                Main Dashboard
              </a>
              
              <a
                href="/input-page"
                className="block w-full bg-green-600 text-white py-3 px-6 rounded-md hover:bg-green-700 transition-colors text-center"
              >
                Full AI Analysis Tool
              </a>

              <a
                href="/ai-status"
                className="block w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors text-center"
              >
                AI Status Page
              </a>

              <div className="p-4 bg-yellow-50 rounded-lg">
                <h3 className="font-semibold text-yellow-900 mb-2">Test Instructions</h3>
                <div className="text-sm text-yellow-800 space-y-2">
                  <p>1. Click "Load Test Data" to populate inputs</p>
                  <p>2. Click "Generate AI Analysis" to call Gemini</p>
                  <p>3. Navigate to other pages to see the same data</p>
                  <p>4. The data persists across page refreshes</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Gemini Integration Status */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-600" />
            Gemini Integration Status
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">✅ Working Features</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Gemini 1.5 Flash API integration</li>
                <li>• Real-time molecule analysis</li>
                <li>• Data persistence across pages</li>
                <li>• Error handling and validation</li>
                <li>• Sensitive data blurring</li>
                <li>• Global state management</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h3 className="font-medium text-gray-900">🔧 Technical Details</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• API Endpoint: /api/ai-analysis</li>
                <li>• Model: gemini-1.5-flash</li>
                <li>• Processing Time: ~2-3 seconds</li>
                <li>• Data Storage: localStorage + React Context</li>
                <li>• Error Recovery: Automatic fallbacks</li>
                <li>• Security: Data blurring for sensitive info</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 