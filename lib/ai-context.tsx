'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

interface MoleculeInputs {
  geneSymbol: string
  uniprotId: string
  structureType: string
  mechanism: string
  route: string
  indication: string
  phase: string
  type: string
  molecularWeight?: string
  solubility?: string
  targetReceptor?: string
  halfLife?: string
}

interface DrugAnalysis {
  drugName: string
  molecularDetails: {
    geneSymbol: string
    uniprotId: string
    structureType: string
    mechanism: string
    route: string
    molecularWeight: string
    solubility: string
    targetReceptor: string
    halfLife: string
  }
  clinicalInfo: {
    indication: string
    phase: string
    type: string
    studyDesign: string
    primaryEndpoint: string
    patientPopulation: string
    protocolNumber: string
    clinicalTrialsGov: string
  }
  riskAssessment: {
    overallScore: number
    riskLevel: string
    components: Array<{
      name: string
      score: number
      description: string
      detailedAnalysis: string
      recommendations: string[]
      operationalImpact?: string
      dataSources?: string[]
    }>
  }
  manufacturing: {
    analysis: string
    competitiveLandscape: string
    regulatoryPathway: string
    qualityControl: string
    aiInsights: Array<{
      category: string
      insight: string
      impact: string
      recommendation: string
    }>
  }
  marketAnalysis: {
    competitiveLandscape: string
    marketSize: string
    regulatoryPathway: string
    timeline: string
  }
  croAnalysis: {
    selectedCRO: string
    croStrengths: string
    croExperience: string
    croRiskFactors: string
    aiRecommendations: Array<{
      category: string
      insight: string
      impact: string
      recommendation: string
    }>
  }
  externalFactors: {
    externalRiskScore: number
    countriesMonitored: number
    activeAlerts: number
    disruptionRisk: string
    geopoliticalRisk: string
    supplyChainRisk: string
    regulatoryRisk: string
    fdaUpdates: string
    emaUpdates: string
    aiInsights: Array<{
      category: string
      insight: string
      impact: string
      recommendation: string
    }>
  }
  trialMetrics: {
    countries: number
    sites: number
    duration: string
    budget: string
  }
  trialDesign: {
    studyDesign: string
    primaryEndpoint: string
    patientPopulation: string
    statisticalAnalysis: string
    safetyMonitoring: string
  }
  siteReadiness: {
    siteSelection: string
    infrastructureRequirements: string
    trainingRequirements: string
    regulatoryCompliance: string
    timelineConsiderations: string
  }
  blurredData: {
    [key: string]: string
  }
  modelUsed?: string
  processingTime?: string
  timestamp?: string
  isMockResponse?: boolean
  geminiError?: string
}

interface AIStatus {
  isOnline: boolean
  lastPing: Date
  responseTime: number
  modelVersion: string
  apiCalls: number
  errors: number
  uptime: number
}

interface AIAnalysisHistory {
  id: string
  timestamp: Date
  drugName: string
  riskScore: number
  processingTime: string
  modelUsed: string
  status: 'success' | 'error' | 'mock'
}

interface AIContextType {
  // Core AI State
  inputs: MoleculeInputs
  analysis: DrugAnalysis | null
  isLoading: boolean
  error: string | null
  
  // AI Status & Monitoring
  aiStatus: AIStatus
  analysisHistory: AIAnalysisHistory[]
  
  // AI Features
  isAIActive: boolean
  aiFeatures: {
    realTimeAnalysis: boolean
    predictiveModeling: boolean
    riskAssessment: boolean
    marketAnalysis: boolean
    regulatoryMonitoring: boolean
  }
  
  // Core Functions
  updateInputs: (newInputs: Partial<MoleculeInputs>) => void
  generateAnalysis: () => Promise<void>
  clearAnalysis: () => void
  
  // AI Status Functions
  checkAIStatus: () => Promise<void>
  getAnalysisHistory: () => AIAnalysisHistory[]
  
  // AI Feature Functions
  toggleAIFeature: (feature: keyof AIContextType['aiFeatures']) => void
  generateQuickAnalysis: (drugName: string) => Promise<void>
  generateMarketReport: () => Promise<void>
  generateRegulatoryUpdate: () => Promise<void>
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [inputs, setInputs] = useState<MoleculeInputs>({
    geneSymbol: '',
    uniprotId: '',
    structureType: '',
    mechanism: '',
    route: '',
    indication: '',
    phase: '',
    type: ''
  })

  const [analysis, setAnalysis] = useState<DrugAnalysis | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // AI Status & Monitoring
  const [aiStatus, setAIStatus] = useState<AIStatus>({
    isOnline: true,
    lastPing: new Date(),
    responseTime: 1200,
    modelVersion: 'gemini-1.5-flash',
    apiCalls: 0,
    errors: 0,
    uptime: 99.8
  })
  
  const [analysisHistory, setAnalysisHistory] = useState<AIAnalysisHistory[]>([])
  
  // AI Features
  const [isAIActive, setIsAIActive] = useState(true)
  const [aiFeatures, setAIFeatures] = useState({
    realTimeAnalysis: true,
    predictiveModeling: true,
    riskAssessment: true,
    marketAnalysis: true,
    regulatoryMonitoring: true
  })

  const updateInputs = (newInputs: Partial<MoleculeInputs>) => {
    setInputs(prev => ({ ...prev, ...newInputs }))
  }

  const generateAnalysis = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setAnalysis(data)
      
      // Add to history
      const historyEntry: AIAnalysisHistory = {
        id: Date.now().toString(),
        timestamp: new Date(),
        drugName: data.drugName,
        riskScore: data.riskAssessment.overallScore,
        processingTime: data.processingTime,
        modelUsed: data.modelUsed,
        status: data.isMockResponse ? 'mock' : 'success'
      }
      
      setAnalysisHistory(prev => [historyEntry, ...prev.slice(0, 9)]) // Keep last 10
      
      // Update AI status
      setAIStatus(prev => ({
        ...prev,
        apiCalls: prev.apiCalls + 1,
        lastPing: new Date(),
        responseTime: parseInt(data.processingTime) || prev.responseTime
      }))
      
    } catch (err) {
      console.error('Error generating analysis:', err)
      setError(err instanceof Error ? err.message : 'An error occurred')
      
      // Update AI status
      setAIStatus(prev => ({
        ...prev,
        errors: prev.errors + 1,
        lastPing: new Date()
      }))
    } finally {
      setIsLoading(false)
    }
  }

  const clearAnalysis = () => {
    setAnalysis(null)
    setError(null)
  }
  
  const checkAIStatus = async () => {
    try {
      const startTime = Date.now()
      const response = await fetch('/api/ai-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          geneSymbol: 'TEST',
          uniprotId: 'TEST',
          structureType: 'Small molecule',
          mechanism: 'Test',
          route: 'Oral',
          indication: 'Test',
          phase: 'Phase I',
          type: 'Test'
        })
      })
      
      const responseTime = Date.now() - startTime
      
      setAIStatus(prev => ({
        ...prev,
        isOnline: response.ok,
        lastPing: new Date(),
        responseTime,
        apiCalls: prev.apiCalls + 1
      }))
    } catch (err) {
      setAIStatus(prev => ({
        ...prev,
        isOnline: false,
        lastPing: new Date(),
        errors: prev.errors + 1
      }))
    }
  }
  
  const getAnalysisHistory = () => {
    return analysisHistory
  }
  
  const toggleAIFeature = (feature: keyof typeof aiFeatures) => {
    setAIFeatures(prev => ({
      ...prev,
      [feature]: !prev[feature]
    }))
  }
  
  const generateQuickAnalysis = async (drugName: string) => {
    // Quick analysis for demonstration
    const quickAnalysis: DrugAnalysis = {
      drugName,
      molecularDetails: {
        geneSymbol: 'QUICK',
        uniprotId: 'P00000',
        structureType: 'Small molecule',
        mechanism: 'Quick analysis',
        route: 'Oral',
        molecularWeight: '450',
        solubility: 'Moderate',
        targetReceptor: 'Quick target',
        halfLife: '8 hours'
      },
      clinicalInfo: {
        indication: 'Quick indication',
        phase: 'Phase I',
        type: 'Quick type',
        studyDesign: 'Quick design',
        primaryEndpoint: 'Quick endpoint',
        patientPopulation: 'Quick population',
        protocolNumber: 'QUICK-001',
        clinicalTrialsGov: 'NCT00000000'
      },
      riskAssessment: {
        overallScore: 65,
        riskLevel: 'Medium Risk',
        components: []
      },
      manufacturing: {
        analysis: 'Quick manufacturing analysis',
        competitiveLandscape: 'Quick competitive landscape',
        regulatoryPathway: 'Quick regulatory pathway',
        qualityControl: 'Quick quality control',
        aiInsights: []
      },
      marketAnalysis: {
        competitiveLandscape: 'Quick market analysis',
        marketSize: '$1B market',
        regulatoryPathway: 'Quick pathway',
        timeline: '2-3 years'
      },
      croAnalysis: {
        selectedCRO: 'Quick CRO',
        croStrengths: 'Quick strengths',
        croExperience: 'Quick experience',
        croRiskFactors: 'Quick risks',
        aiRecommendations: []
      },
      externalFactors: {
        externalRiskScore: 45,
        countriesMonitored: 10,
        activeAlerts: 2,
        disruptionRisk: 'Low',
        geopoliticalRisk: 'Low',
        supplyChainRisk: 'Medium',
        regulatoryRisk: 'Low',
        fdaUpdates: 'Quick FDA updates',
        emaUpdates: 'Quick EMA updates',
        aiInsights: []
      },
      trialMetrics: {
        countries: 8,
        sites: 50,
        duration: '18 months',
        budget: '$25M'
      },
      trialDesign: {
        studyDesign: 'Quick study design',
        primaryEndpoint: 'Quick endpoint',
        patientPopulation: 'Quick population',
        statisticalAnalysis: 'Quick statistical analysis',
        safetyMonitoring: 'Quick safety monitoring'
      },
      siteReadiness: {
        siteSelection: 'Quick site selection',
        infrastructureRequirements: 'Quick infrastructure',
        trainingRequirements: 'Quick training',
        regulatoryCompliance: 'Quick compliance',
        timelineConsiderations: 'Quick timeline'
      },
      blurredData: {},
      modelUsed: 'Gemini 1.5 Flash (Quick)',
      processingTime: '0.5 seconds',
      timestamp: new Date().toISOString(),
      isMockResponse: true
    }
    
    setAnalysis(quickAnalysis)
  }
  
  const generateMarketReport = async () => {
    // Generate market analysis report
    console.log('Generating market report...')
    // This would call a market analysis API
  }
  
  const generateRegulatoryUpdate = async () => {
    // Generate regulatory update
    console.log('Generating regulatory update...')
    // This would call a regulatory monitoring API
  }

  // Auto-check AI status every 30 seconds
  useEffect(() => {
    const interval = setInterval(checkAIStatus, 30000)
    return () => clearInterval(interval)
  }, [])

  return (
    <AIContext.Provider value={{
      inputs,
      analysis,
      isLoading,
      error,
      aiStatus,
      analysisHistory,
      isAIActive,
      aiFeatures,
      updateInputs,
      generateAnalysis,
      clearAnalysis,
      checkAIStatus,
      getAnalysisHistory,
      toggleAIFeature,
      generateQuickAnalysis,
      generateMarketReport,
      generateRegulatoryUpdate
    }}>
      {children}
    </AIContext.Provider>
  )
}

export function useAIContext() {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error('useAIContext must be used within an AIProvider')
  }
  return context
}

export function useAI() {
  return useAIContext()
} 