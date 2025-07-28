import { NextRequest, NextResponse } from 'next/server'

interface MarketAnalysisRequest {
  drugName: string
  indication: string
  phase: string
  structureType: string
}

interface MarketAnalysisResponse {
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

function generateMockMarketAnalysis(inputs: MarketAnalysisRequest): MarketAnalysisResponse {
  const isRadioligand = inputs.structureType.toLowerCase().includes('radioligand')
  const isBiologic = inputs.structureType.toLowerCase().includes('biologic')
  
  const marketSizes = isRadioligand ? 
    ['$3.2B global radioligand therapy market', '$2.8B targeted radiotherapy market', '$4.1B nuclear medicine market'] :
    isBiologic ? 
    ['$450B global biologics market', '$380B monoclonal antibodies market', '$520B protein therapeutics market'] :
    ['$1.2T global pharmaceutical market', '$850B small molecule market', '$1.5T drug discovery market']
  
  const growthRates = isRadioligand ? 
    ['12% CAGR', '15% annual growth', '18% market expansion'] :
    isBiologic ? 
    ['8% CAGR', '10% annual growth', '12% market expansion'] :
    ['6% CAGR', '7% annual growth', '9% market expansion']
  
  const competitors = isRadioligand ? 
    ['Novartis (Lutathera)', 'Advanced Accelerator Applications', 'Curium Pharma', 'GE Healthcare', 'IBA Molecular'] :
    isBiologic ? 
    ['Roche', 'Amgen', 'AbbVie', 'Johnson & Johnson', 'Novartis'] :
    ['Pfizer', 'Merck', 'GSK', 'AstraZeneca', 'Bristol-Myers Squibb']
  
  const regulatoryPathways = isRadioligand ? 
    'FDA Breakthrough Therapy Designation pathway with accelerated approval for radioligand therapies. EMA PRIME designation available for innovative nuclear medicine approaches.' :
    isBiologic ? 
    'FDA Biologics License Application (BLA) pathway with potential for accelerated approval. EMA centralized procedure for biologics with conditional marketing authorization.' :
    'FDA New Drug Application (NDA) pathway with potential for Fast Track designation. EMA centralized procedure with conditional marketing authorization.'
  
  const timelines = isRadioligand ? 
    '2-3 years to market with accelerated pathways, 4-5 years with standard regulatory process' :
    isBiologic ? 
    '3-4 years to market with accelerated pathways, 5-7 years with standard regulatory process' :
    '2-3 years to market with accelerated pathways, 4-6 years with standard regulatory process'
  
  const riskFactors = isRadioligand ? [
    'Limited nuclear medicine infrastructure globally',
    'Regulatory complexity for radioligand therapies',
    'Supply chain dependency on radioisotopes',
    'High manufacturing and distribution costs',
    'Limited reimbursement coverage in some markets'
  ] : isBiologic ? [
    'High manufacturing complexity and costs',
    'Patent expiration and biosimilar competition',
    'Complex regulatory requirements',
    'Limited patient access due to high costs',
    'Immunogenicity concerns'
  ] : [
    'Generic competition after patent expiration',
    'Regulatory approval delays',
    'Market saturation in some indications',
    'Pricing pressure from payers',
    'Clinical trial failures'
  ]
  
  const opportunities = isRadioligand ? [
    'Expanding nuclear medicine infrastructure',
    'Growing demand for targeted therapies',
    'Advancements in imaging technology',
    'Increasing cancer prevalence',
    'Regulatory support for innovative approaches'
  ] : isBiologic ? [
    'Growing biologics market',
    'Advancements in manufacturing technology',
    'Expanding indications',
    'Emerging markets growth',
    'Personalized medicine trends'
  ] : [
    'Large market opportunities',
    'Established manufacturing processes',
    'Broad patient populations',
    'Cost-effective development',
    'Multiple indication potential'
  ]

  return {
    drugName: inputs.drugName,
    indication: inputs.indication,
    marketSize: marketSizes[Math.floor(Math.random() * marketSizes.length)],
    growthRate: growthRates[Math.floor(Math.random() * growthRates.length)],
    competitiveLandscape: isRadioligand ? 
      'Highly specialized market with limited competition but significant barriers to entry. Major players include Novartis, Advanced Accelerator Applications, and Curium Pharma. Market characterized by high technical expertise requirements and regulatory complexity.' :
      isBiologic ? 
      'Competitive market with established players and high barriers to entry. Major companies include Roche, Amgen, and AbbVie. Market characterized by high development costs and complex manufacturing requirements.' :
      'Highly competitive market with numerous players across all therapeutic areas. Major pharmaceutical companies compete with generics and biosimilars. Market characterized by patent cliffs and pricing pressure.',
    keyCompetitors: competitors,
    regulatoryPathway: regulatoryPathways,
    timeline: timelines,
    riskFactors,
    opportunities,
    aiInsights: [
      {
        category: 'Market Dynamics',
        insight: isRadioligand ? 
          'Radioligand therapy market experiencing rapid growth due to increasing cancer prevalence and advancements in nuclear medicine technology' :
          isBiologic ? 
          'Biologics market continues to expand with growing demand for targeted therapies and personalized medicine approaches' :
          'Small molecule market remains stable with opportunities in niche indications and combination therapies',
        impact: 'High',
        recommendation: 'Focus on differentiation through innovative delivery mechanisms and expanded indications'
      },
      {
        category: 'Competitive Positioning',
        insight: isRadioligand ? 
          'Limited competition creates opportunities for first-mover advantage but requires significant infrastructure investment' :
          isBiologic ? 
          'Established players dominate but opportunities exist in novel mechanisms and improved formulations' :
          'Highly competitive landscape requires strong differentiation and cost-effective development',
        impact: 'Medium',
        recommendation: 'Develop strategic partnerships and focus on underserved patient populations'
      },
      {
        category: 'Regulatory Environment',
        insight: 'Regulatory agencies increasingly supportive of innovative therapies with accelerated pathways available',
        impact: 'High',
        recommendation: 'Engage early with regulatory agencies and leverage available expedited pathways'
      },
      {
        category: 'Market Access',
        insight: 'Pricing and reimbursement challenges increasing across all therapeutic areas',
        impact: 'High',
        recommendation: 'Develop comprehensive market access strategy and demonstrate value proposition early'
      }
    ],
    modelUsed: 'Gemini 1.5 Flash (Market Analysis)',
    processingTime: `${Math.floor(Math.random() * 2000) + 1000}ms`,
    timestamp: new Date().toISOString(),
    isMockResponse: true
  }
}

export async function POST(request: NextRequest) {
  try {
    const inputs: MarketAnalysisRequest = await request.json()
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500))
    
    // Generate mock market analysis
    const analysis = generateMockMarketAnalysis(inputs)
    
    return NextResponse.json(analysis)
  } catch (error) {
    console.error('Market analysis error:', error)
    return NextResponse.json(
      { error: 'Failed to generate market analysis' },
      { status: 500 }
    )
  }
} 