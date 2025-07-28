'use client'

import { useAI } from '@/lib/ai-context'
import { Loader2, Beaker, Activity, Target, Zap } from 'lucide-react'

export default function InputPage() {
  const { 
    inputs, 
    analysis, 
    isLoading, 
    error, 
    updateInputs, 
    generateAnalysis,
    aiStatus,
    aiFeatures,
    generateQuickAnalysis
  } = useAI()

  const handleInputChange = (field: keyof typeof inputs, value: string) => {
    updateInputs({ [field]: value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await generateAnalysis()
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
            <span className="text-sm text-gray-600">AI Analysis Tool</span>
          </div>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 text-sm ${aiStatus.isOnline ? 'text-green-600' : 'text-red-600'}`}>
              <Activity className="h-4 w-4" />
              {aiStatus.isOnline ? 'AI Online' : 'AI Offline'}
            </div>
            {analysis && (
              <div className="flex items-center gap-2 text-sm text-green-600">
                <Zap className="h-4 w-4" />
                Analysis Complete
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-8 px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI-Powered Drug Analysis
          </h1>
          <p className="text-lg text-gray-600">
            Enter molecule information to generate comprehensive drug analysis using Gemini AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                             <Beaker className="h-6 w-6 text-blue-600" />
              Molecule Information
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gene Symbol *
                  </label>
                  <input
                    type="text"
                    required
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
                    required
                    value={inputs.uniprotId}
                    onChange={(e) => handleInputChange('uniprotId', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., P27815"
                  />
                </div>
              </div>

              {/* Structure and Mechanism */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Structure Type *
                  </label>
                  <select
                    required
                    value={inputs.structureType}
                    onChange={(e) => handleInputChange('structureType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select structure type</option>
                    <option value="Small molecule">Small molecule</option>
                    <option value="Radiolabeled small molecule">Radiolabeled small molecule</option>
                    <option value="Biologic">Biologic</option>
                    <option value="Antibody">Antibody</option>
                    <option value="Peptide">Peptide</option>
                    <option value="Gene therapy">Gene therapy</option>
                    <option value="Cell therapy">Cell therapy</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mechanism of Action *
                  </label>
                  <input
                    type="text"
                    required
                    value={inputs.mechanism}
                    onChange={(e) => handleInputChange('mechanism', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., PDE3/4 inhibitor"
                  />
                </div>
              </div>

              {/* Route and Indication */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Route of Administration *
                  </label>
                  <select
                    required
                    value={inputs.route}
                    onChange={(e) => handleInputChange('route', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select route</option>
                    <option value="Oral">Oral</option>
                    <option value="Inhalation">Inhalation</option>
                    <option value="Intravenous">Intravenous</option>
                    <option value="Subcutaneous">Subcutaneous</option>
                    <option value="Intramuscular">Intramuscular</option>
                    <option value="Topical">Topical</option>
                    <option value="Transdermal">Transdermal</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Indication *
                  </label>
                  <input
                    type="text"
                    required
                    value={inputs.indication}
                    onChange={(e) => handleInputChange('indication', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., COPD with chronic bronchitis"
                  />
                </div>
              </div>

              {/* Phase and Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Development Phase *
                  </label>
                  <select
                    required
                    value={inputs.phase}
                    onChange={(e) => handleInputChange('phase', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select phase</option>
                    <option value="Preclinical">Preclinical</option>
                    <option value="Phase I">Phase I</option>
                    <option value="Phase II">Phase II</option>
                    <option value="Phase III">Phase III</option>
                    <option value="Phase IV">Phase IV</option>
                    <option value="Approved">Approved</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Drug Type *
                  </label>
                  <select
                    required
                    value={inputs.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select drug type</option>
                    <option value="Inhaled Small Molecule">Inhaled Small Molecule</option>
                    <option value="Oral Small Molecule">Oral Small Molecule</option>
                    <option value="Injectable Biologic">Injectable Biologic</option>
                    <option value="Monoclonal Antibody">Monoclonal Antibody</option>
                    <option value="Radioligand Therapy">Radioligand Therapy</option>
                    <option value="Gene Therapy">Gene Therapy</option>
                    <option value="Cell Therapy">Cell Therapy</option>
                  </select>
                </div>
              </div>

              {/* Additional Properties */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Molecular Weight (Da)
                  </label>
                  <input
                    type="text"
                    value={inputs.molecularWeight}
                    onChange={(e) => handleInputChange('molecularWeight', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 450.5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Solubility
                  </label>
                  <input
                    type="text"
                    value={inputs.solubility}
                    onChange={(e) => handleInputChange('solubility', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Water soluble"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Target Receptor
                  </label>
                  <input
                    type="text"
                    value={inputs.targetReceptor}
                    onChange={(e) => handleInputChange('targetReceptor', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., PDE3A, PDE4D"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Half-Life (hours)
                  </label>
                  <input
                    type="text"
                    value={inputs.halfLife}
                    onChange={(e) => handleInputChange('halfLife', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 12"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Analyzing with AI...
                  </>
                ) : (
                  <>
                    <Zap className="h-5 w-5" />
                    Generate AI Analysis
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Results Display */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
              <Activity className="h-6 w-6 text-green-600" />
              AI Analysis Results
            </h2>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
                <p className="text-red-800">{error}</p>
              </div>
            )}

            {isLoading && (
              <div className="text-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
                <p className="text-gray-600">Analyzing molecule with Gemini AI...</p>
                <p className="text-sm text-gray-500 mt-2">This may take 10-30 seconds</p>
              </div>
            )}

            {analysis && (
              <div className="space-y-6">
                {/* Success Message */}
                <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-green-600" />
                      <p className="text-green-800 font-medium">Analysis Complete!</p>
                    </div>
                    <a
                      href="/"
                      className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-sm"
                    >
                      View on Dashboard →
                    </a>
                  </div>
                  <p className="text-green-700 text-sm mt-2">
                    Your analysis has been saved and will be visible on the main dashboard. Click the button above to see all changes.
                  </p>
                </div>
                {/* Drug Overview */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{analysis.drugName || 'Drug Name Not Available'}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Indication:</span> {analysis.clinicalInfo?.indication || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Phase:</span> {analysis.clinicalInfo?.phase || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Type:</span> {analysis.clinicalInfo?.type || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Route:</span> {analysis.molecularDetails?.route || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Study Design:</span> {analysis.clinicalInfo?.studyDesign || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Primary Endpoint:</span> {analysis.clinicalInfo?.primaryEndpoint || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Patient Population:</span> {analysis.clinicalInfo?.patientPopulation || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Protocol:</span> {analysis.clinicalInfo?.protocolNumber || 'Not specified'}
                    </div>
                  </div>
                </div>

                {/* Molecular Details */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Molecular Details</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-medium">Gene Symbol:</span> {analysis.molecularDetails?.geneSymbol || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">UniProt ID:</span> {analysis.molecularDetails?.uniprotId || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Structure Type:</span> {analysis.molecularDetails?.structureType || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Mechanism:</span> {analysis.molecularDetails?.mechanism || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Molecular Weight:</span> {analysis.molecularDetails?.molecularWeight || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Solubility:</span> {analysis.molecularDetails?.solubility || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Target Receptor:</span> {analysis.molecularDetails?.targetReceptor || 'Not specified'}
                    </div>
                    <div>
                      <span className="font-medium">Half-Life:</span> {analysis.molecularDetails?.halfLife || 'Not specified'}
                    </div>
                  </div>
                </div>

                {/* Risk Assessment */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Risk Assessment</h3>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="text-3xl font-bold text-gray-900">{analysis.riskAssessment?.overallScore || 'N/A'}</div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                      analysis.riskAssessment?.riskLevel === 'High Risk' ? 'bg-red-100 text-red-800' :
                      analysis.riskAssessment?.riskLevel === 'Medium Risk' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {analysis.riskAssessment?.riskLevel || 'Not assessed'}
                    </div>
                  </div>
                  <div className="space-y-4">
                    {analysis.riskAssessment?.components?.map((component, index) => (
                      <div key={index} className="border-l-4 border-blue-200 pl-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium">{component.name}</span>
                          <span className="font-bold text-lg">{component.score}/100</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{component.description}</p>
                        <p className="text-sm text-gray-700 mb-2">{component.detailedAnalysis}</p>
                        <div className="text-sm">
                          <span className="font-medium">Recommendations:</span>
                          <ul className="list-disc list-inside mt-1">
                            {component.recommendations.map((rec, recIndex) => (
                              <li key={recIndex} className="text-gray-600">{rec}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Manufacturing */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Manufacturing Analysis</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="font-medium">Analysis:</span> {analysis.manufacturing?.analysis || 'Not specified'}
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="font-medium">Competitive Landscape:</span> {analysis.manufacturing?.competitiveLandscape || 'Not specified'}
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="font-medium">Regulatory Pathway:</span> {analysis.manufacturing?.regulatoryPathway || 'Not specified'}
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="font-medium">Quality Control:</span> {analysis.manufacturing?.qualityControl || 'Not specified'}
                    </div>
                  </div>
                </div>

                {/* Market Analysis */}
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Market Analysis</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="font-medium">Competitive Landscape:</span> {analysis.marketAnalysis?.competitiveLandscape || 'Not specified'}
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="font-medium">Market Size:</span> {analysis.marketAnalysis?.marketSize || 'Not specified'}
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="font-medium">Regulatory Pathway:</span> {analysis.marketAnalysis?.regulatoryPathway || 'Not specified'}
                    </div>
                    <div className="p-3 bg-gray-50 rounded">
                      <span className="font-medium">Timeline:</span> {analysis.marketAnalysis?.timeline || 'Not specified'}
                    </div>
                  </div>
                </div>

                {/* CRO Analysis */}
                {analysis.croAnalysis && (
                  <div className="border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">CRO Analysis</h3>
                    <div className="space-y-3 text-sm">
                      <div className="p-3 bg-blue-50 rounded">
                        <span className="font-medium">Selected CRO:</span> {analysis.croAnalysis.selectedCRO || 'Not specified'}
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <span className="font-medium">CRO Strengths:</span> {analysis.croAnalysis.croStrengths || 'Not specified'}
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <span className="font-medium">Relevant Experience:</span> {analysis.croAnalysis.croExperience || 'Not specified'}
                      </div>
                      <div className="p-3 bg-gray-50 rounded">
                        <span className="font-medium">Risk Factors:</span> {analysis.croAnalysis.croRiskFactors || 'Not specified'}
                      </div>
                    </div>
                  </div>
                )}

                {/* Blurred Data Notice */}
                {analysis.blurredData && Object.keys(analysis.blurredData).length > 0 && (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <svg className="h-5 w-5 text-yellow-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-yellow-800 font-medium">Data Security Notice</h4>
                        <p className="text-yellow-700 text-sm mt-1">
                          The following sensitive information has been automatically blurred for security:
                        </p>
                        <ul className="text-yellow-700 text-sm mt-2 list-disc list-inside space-y-1">
                          <li>Proprietary manufacturing costs and specifications</li>
                          <li>Confidential protocol details and trial registry numbers</li>
                          <li>Exact market size figures and competitive intelligence</li>
                          <li>Specific CRO vendor details and proprietary risk metrics</li>
                          <li>Exact molecular specifications and proprietary algorithms</li>
                        </ul>
                        <p className="text-yellow-700 text-sm mt-2">
                          <strong>Reason:</strong> This information requires proprietary databases, confidential sources, or specialized algorithms that are not publicly accessible.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {!analysis && !isLoading && !error && (
              <div className="text-center py-12 text-gray-500">
                <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p>Enter molecule information and click "Generate AI Analysis" to see results</p>
              </div>
            )}

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-600" />
                Quick AI Actions
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => generateQuickAnalysis('Demo Drug')}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="font-medium text-gray-900 mb-1">Quick Demo Analysis</div>
                  <div className="text-sm text-gray-600">Generate instant demo analysis for testing</div>
                </button>
                
                <a
                  href="/ai-status"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="font-medium text-gray-900 mb-1">AI Status Monitor</div>
                  <div className="text-sm text-gray-600">View real-time AI performance and history</div>
                </a>
                
                <a
                  href="/"
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-left"
                >
                  <div className="font-medium text-gray-900 mb-1">View Dashboard</div>
                  <div className="text-sm text-gray-600">See comprehensive analysis results</div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 