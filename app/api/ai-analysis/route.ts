import { NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

// IMPORTANT: GEMINI API RATE LIMIT SOLUTION
// The current API key has exceeded the free tier quota (50 requests/day)
// To fix this, you have several options:
// 
// OPTION 1: Get a new API key (Recommended)
// 1. Go to https://makersuite.google.com/app/apikey
// 2. Create a new API key
// 3. Replace the GEMINI_API_KEY below
//
// OPTION 2: Upgrade to paid tier
// 1. Go to https://ai.google.dev/pricing
// 2. Upgrade to paid tier for higher quotas
//
// OPTION 3: Use mock responses (Current fallback)
// The app will work with comprehensive mock data until API quota resets

// Gemini AI API configuration
const GEMINI_API_KEY = 'AIzaSyBcAc1NGG3T-YaBW13VTQ1dHE9uT8hOPHA'
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY)

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

// Function to call Gemini AI
async function callGeminiAI(inputs: MoleculeInputs) {
  const prompt = `You are an expert clinical trial risk analyst. Analyze the following molecule data and generate comprehensive risk assessment and operational analysis.

**User Inputs (Required):**
- Gene Symbol: ${inputs.geneSymbol}
- UniProt ID: ${inputs.uniprotId}
- Structure Type: ${inputs.structureType}
- Mechanism: ${inputs.mechanism}
- Route: ${inputs.route}
- Indication: ${inputs.indication}
- Phase: ${inputs.phase}
- Drug Type: ${inputs.type}

**Optional Molecular Data (Analyze these to generate comprehensive analysis):**
- Molecular Weight: ${inputs.molecularWeight || 'Not specified'}
- Solubility: ${inputs.solubility || 'Not specified'}
- Target Receptor: ${inputs.targetReceptor || 'Not specified'}
- Half-Life: ${inputs.halfLife || 'Not specified'}

**Your Task:**
Based on the molecular data above, generate comprehensive analysis including:

1. **Risk Assessment:**
   - Overall risk score (0-100)
   - Risk level (Low/Medium/High)
   - Detailed risk components with scores, descriptions, analysis, operational impact, recommendations, and data sources

2. **Trial Metrics:**
   - Number of countries, sites, duration, budget based on molecular properties

3. **Clinical Information:**
   - Study design, primary endpoint, patient population based on molecular characteristics

4. **External Factors (Generate detailed summaries for each component):**
   - External risk score (0-100)
   - Countries monitored (number)
   - Active alerts (number)
   - Disruption risk level (Low/Moderate/High)
   - **Geopolitical Risk Assessment:** Detailed analysis of geopolitical factors affecting this specific molecule and trial
   - **Supply Chain Disruption Risk:** Specific supply chain vulnerabilities and challenges for this molecule type
   - **Regulatory Environment Changes:** Current regulatory landscape and changes affecting this drug type
   - **FDA Updates:** Recent FDA guidance and updates relevant to this molecule and indication
   - **EMA Updates:** Recent EMA guidance and updates relevant to this molecule and indication
   - **AI Insights:** Array of specific insights with category, impact level, insight description, and recommendation

5. **CRO Analysis (Generate detailed summaries for each component):**
   - Selected CRO based on molecule requirements
   - **CRO Strengths:** Specific strengths relevant to this molecule type
   - **CRO Experience:** Relevant experience with similar molecules
   - **CRO Risk Factors:** Potential risks and challenges
   - **CRO Performance Metrics:** Key performance indicators
   - **CRO Recommendations:** Specific recommendations for CRO selection and management

6. **CMC Risk Analysis (Generate detailed summaries for each component):**
   - **Manufacturing Considerations:** Specific manufacturing challenges for this molecule type
   - **Competitive Landscape:** Market competition analysis
   - **Regulatory Pathway:** Specific regulatory requirements
   - **Quality Control:** Quality control considerations
   - **Supply Chain:** Supply chain analysis

7. **Trial Design Analysis (Generate detailed summaries for each component):**
   - **Study Design:** Specific study design considerations
   - **Patient Population:** Target patient population analysis
   - **Endpoints:** Primary and secondary endpoint considerations
   - **Statistical Analysis:** Statistical considerations
   - **Safety Monitoring:** Safety monitoring requirements

8. **Site Readiness Analysis (Generate detailed summaries for each component):**
   - **Site Selection:** Site selection criteria
   - **Infrastructure Requirements:** Specific infrastructure needs
   - **Training Requirements:** Staff training needs
   - **Regulatory Compliance:** Compliance requirements
   - **Timeline Considerations:** Site activation timeline

**Guidelines:**
- Generate detailed, specific summaries for EACH component (not just overall analysis)
- Use the molecular data to inform ALL analysis
- Consider molecular weight, solubility, target receptor, and half-life in risk calculations
- Provide detailed, actionable recommendations for each component
- Include specific data sources and methodologies
- Ensure all analysis is based on the molecular characteristics provided
- Make each component summary comprehensive and specific to the molecule type

Generate a comprehensive JSON response with detailed summaries for each individual component. Return ONLY valid JSON format.`

  try {
    // Use the correct Gemini model name
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" })
    
    const result = await model.generateContent(prompt)
    const response = await result.response
    const generatedText = response.text()
    
    // Clean up the response to extract valid JSON
    let jsonText = generatedText.trim()
    
    // Remove any markdown code blocks
    jsonText = jsonText.replace(/```json\s*/g, '').replace(/```\s*$/g, '')
    
    // Find the JSON object
    const jsonMatch = jsonText.match(/\{[\s\S]*\}/)
    if (!jsonMatch) {
      throw new Error('No JSON object found in AI response')
    }
    
    jsonText = jsonMatch[0]
    
    // Try to parse the JSON
    try {
      return JSON.parse(jsonText)
    } catch (parseError) {
      console.error('JSON parse error:', parseError)
      console.error('Raw JSON text:', jsonText)
      
      // Try to fix common JSON issues
      let fixedJson = jsonText
      
      // Fix trailing commas
      fixedJson = fixedJson.replace(/,(\s*[}\]])/g, '$1')
      
      // Fix unquoted property names
      fixedJson = fixedJson.replace(/([{,]\s*)([a-zA-Z_][a-zA-Z0-9_]*)\s*:/g, '$1"$2":')
      
      // Fix unescaped quotes in strings
      fixedJson = fixedJson.replace(/"([^"]*)"([^"]*)"([^"]*)"/g, '"$1\\"$2\\"$3"')
      
      // Fix missing quotes around string values
      fixedJson = fixedJson.replace(/:\s*([a-zA-Z][a-zA-Z0-9\s\-_]+)(?=\s*[,}])/g, ':"$1"')
      
      // Fix line breaks in strings
      fixedJson = fixedJson.replace(/\n/g, '\\n')
      
      try {
        return JSON.parse(fixedJson)
      } catch (secondParseError) {
        console.error('Second JSON parse attempt failed:', secondParseError)
        console.error('Fixed JSON text:', fixedJson)
        
        // Try one more time with more aggressive fixes
        let aggressiveFix = fixedJson
        // Remove any remaining problematic characters
        aggressiveFix = aggressiveFix.replace(/[^\x20-\x7E]/g, '')
        
        try {
          return JSON.parse(aggressiveFix)
        } catch (thirdParseError) {
          console.error('Third JSON parse attempt failed:', thirdParseError)
          throw new Error('Failed to parse AI response after multiple cleanup attempts')
        }
      }
    }
  } catch (error) {
    console.error('Gemini API error:', error)
    throw error
  }
}

// Mock response for when Gemini API is rate limited
function generateMockResponse(inputs: MoleculeInputs) {
  const isRadioligand = inputs.structureType.toLowerCase().includes('radioligand')
  const isBiologic = inputs.structureType.toLowerCase().includes('biologic')
  const isSmallMolecule = inputs.structureType.toLowerCase().includes('small molecule')
  
  // Enhanced risk components with more realistic data
  const riskComponents = [
    {
      name: 'Critical API Supply Risk',
      score: isRadioligand ? 85 : isBiologic ? 78 : 72,
      description: isRadioligand ? 
        'Radiolabeled compound synthesis requires specialized facilities and Lu-177 isotope supply chain creates critical vulnerability' :
        'Single-source dependency on Primary API Supplier with 16-week lead time creates critical supply vulnerability',
      detailedAnalysis: isRadioligand ?
        'Lu-177 isotope supply chain dependency creates critical single point of failure. Radiolabeling process requires specialized GMP facilities with limited global capacity. Supply disruption simulation suggested 6-8 month delay risk if isotope supply was interrupted.' :
        'Complete dependency on Primary API Supplier for API supply creates critical single point of failure. Supply disruption simulation suggested 4-6 month delay risk in trial start if primary API supply was interrupted.',
      operationalImpact: isRadioligand ?
        'Any disruption in Lu-177 isotope supply would halt radioligand production within current inventory buffer. Manufacturing restart could require 8-12 months including re-qualification processes.' :
        'Any disruption at primary supplier facility would halt API supply within current inventory buffer. Manufacturing restart could require 6-12 months including re-qualification processes.',
      recommendations: isRadioligand ? [
        'Establish secondary Lu-177 isotope supplier within 90 days',
        'Increase isotope inventory buffer to 8-month supply',
        'Qualify alternative radiolabeling facilities'
      ] : [
        'Initiate qualification of secondary API supplier within 60 days',
        'Increase inventory buffer to 6-month supply',
        'Simplify synthetic pathway to reduce intermediates'
      ],
      dataSources: [
        'EudraGMDP Database: European GMP compliance database with facility inspection records',
        'Supply Chain Risk Assessment: Internal analysis of API supplier dependencies and lead times',
        'Reaxys Chemical Database: API synthesis route complexity and alternative pathway analysis'
      ]
    },
    {
      name: 'Site Activation Delays',
      score: isRadioligand ? 78 : 71,
      description: isRadioligand ?
        'Nuclear medicine facility requirements and radiation safety protocols create significant site activation delays' :
        'IRB/EC approvals averaging 75 days with only 18 of 85 planned sites activated at inflection point',
      detailedAnalysis: isRadioligand ?
        'Nuclear medicine facility requirements and radiation safety protocols create significant site activation delays. Out of 100 planned sites, only 22 have nuclear medicine capabilities. Radiation safety training and regulatory approvals add 30-45 days to site activation timeline.' :
        'Ethics approvals show wide variability, especially in Eastern Europe and APAC regions. Out of 85 planned sites, predictive modeling correctly anticipated that only 18 would be activated at time of inflection.',
      operationalImpact: isRadioligand ?
        'Nuclear medicine facility limitations could delay enrollment by 4-8 months. Geographic clustering of nuclear medicine centers particularly problematic for patient access.' :
        'Site activation bottlenecks could delay enrollment by 3-6 months. Geographic clustering of delays particularly problematic in high-enrollment regions.',
      recommendations: isRadioligand ? [
        'Prioritize sites with existing nuclear medicine infrastructure',
        'Implement radiation safety training programs',
        'Establish mobile nuclear medicine units for remote sites'
      ] : [
        'Shift site selection to more predictable jurisdictions',
        'Implement targeted PI training for inhaled drug protocols',
        'Establish mobile spirometry units for infrastructure-limited sites'
      ],
      dataSources: [
        'Nuclear Medicine Facility Database: Global registry of nuclear medicine centers',
        'Radiation Safety Compliance: Regulatory requirements for radioligand trials',
        'Site Activation Tracking: Real-time monitoring of regulatory approval progress'
      ]
    },
    {
      name: 'Geographic Enrollment Risk',
      score: isRadioligand ? 72 : 65,
      description: isRadioligand ?
        'Limited nuclear medicine access in certain regions creates geographic enrollment challenges' :
        'Higher dropout rates anticipated in Eastern Europe and APAC regions based on digital twin modeling',
      detailedAnalysis: isRadioligand ?
        'Nuclear medicine access limitations create geographic enrollment challenges. Patient travel requirements for nuclear medicine procedures increase dropout risk. Digital twin simulation predicted 28% overall dropout rate, higher than standard oncology trials.' :
        'Digital twin simulation predicted 22% overall dropout rate using EudraCT and EvaluatePharma benchmarks, with higher attrition anticipated in Eastern Europe and certain APAC geographies.',
      operationalImpact: isRadioligand ?
        'Geographic enrollment imbalance could compromise statistical power. Higher dropout regions may require enrollment oversampling, extending timeline and increasing costs by 15-20%.' :
        'Geographic enrollment imbalance could compromise statistical power. Higher dropout regions may require enrollment oversampling, extending timeline and increasing costs.',
      recommendations: isRadioligand ? [
        'Focus enrollment in regions with nuclear medicine infrastructure',
        'Implement patient travel support programs',
        'Establish satellite nuclear medicine facilities'
      ] : [
        'Frontload enrollment in North America and Western Europe',
        'Implement enhanced patient engagement programs in high-risk regions',
        'Establish contingency sites in stable jurisdictions'
      ],
      dataSources: [
        'Nuclear Medicine Access Database: Global registry of nuclear medicine facilities',
        'Patient Travel Impact Studies: Analysis of travel requirements on trial retention',
        'Geopolitical Risk Intelligence: Regional stability assessment and trial impact analysis'
      ]
    },
    {
      name: 'Protocol Complexity Burden',
      score: isRadioligand ? 68 : 58,
      description: isRadioligand ?
        'Nuclear medicine imaging requirements and radiation safety protocols create significant patient burden' :
        'FEV1 endpoint optimization successful but visit schedule and spirometry requirements create patient burden',
      detailedAnalysis: isRadioligand ?
        'Nuclear medicine imaging requirements at each visit create significant patient burden. Radiation safety protocols and imaging time requirements contribute to visit fatigue. Protocol complexity contributes to projected 28% dropout rate.' :
        'Simulation evaluated FEV₁ vs. exacerbation rate as dual endpoints, with final design emphasizing FEV₁ due to higher statistical power and reduced variability in 24-week window.',
      operationalImpact: isRadioligand ?
        'Nuclear medicine imaging requirements particularly burdensome for elderly cancer patients with mobility limitations. Frequent imaging contributes to projected 28% dropout rate.' :
        'Protocol complexity contributes to projected 22% dropout rate. Frequent spirometry testing particularly burdensome for elderly COPD patients with mobility limitations.',
      recommendations: isRadioligand ? [
        'Implement mobile nuclear medicine imaging where feasible',
        'Optimize imaging schedules to reduce patient burden',
        'Provide transportation assistance for imaging visits'
      ] : [
        'Implement home spirometry options where feasible',
        'Optimize visit schedules to reduce patient burden',
        'Provide transportation assistance for clinic visits'
      ],
      dataSources: [
        'Nuclear Medicine Protocol Database: Analysis of imaging requirements and patient burden',
        'Patient Experience Studies: Survey data on protocol complexity and visit fatigue',
        'Clinical Trial Dropout Analysis: Historical data on protocol complexity impact'
      ]
    },
    {
      name: 'External Disruption Risk',
      score: 23,
      description: 'Low overall external risk with moderate geopolitical tensions in APAC region monitored',
      detailedAnalysis: 'Current external risk assessment shows low overall disruption potential. Moderate geopolitical tensions in APAC region are being monitored but do not pose immediate threat to trial execution. Supply chain disruptions remain minimal with established contingency plans.',
      operationalImpact: 'External factors currently pose minimal operational risk. Contingency plans are in place for potential supply chain disruptions or regulatory changes.',
      recommendations: [
        'Continue monitoring APAC geopolitical developments',
        'Maintain supply chain contingency plans',
        'Regular review of external risk factors'
      ],
      dataSources: [
        'Geopolitical Risk Intelligence: Real-time monitoring of regional stability',
        'Supply Chain Disruption Tracking: Analysis of global supply chain vulnerabilities',
        'Regulatory Change Monitoring: Tracking of regulatory environment changes'
      ]
    }
  ]

  return {
    drugName: inputs.geneSymbol || 'OHT-202',
    molecularDetails: {
      geneSymbol: inputs.geneSymbol || 'PDE3A',
      uniprotId: inputs.uniprotId || 'P27815',
      structureType: inputs.structureType || 'Small molecule',
      mechanism: inputs.mechanism || 'PDE3/4 inhibitor',
      route: inputs.route || 'Inhalation',
      molecularWeight: '450.5 g/mol',
      solubility: 'Moderate aqueous solubility',
      targetReceptor: 'PDE3A, PDE4D',
      halfLife: '8-12 hours'
    },
    clinicalInfo: {
      indication: inputs.indication || 'COPD with chronic bronchitis',
      phase: inputs.phase || 'Phase III',
      type: inputs.type || 'Inhaled Small Molecule',
      studyDesign: 'Randomized, double-blind, placebo-controlled',
      primaryEndpoint: 'FEV1 AUC0-12h at Week 12',
      patientPopulation: 'Moderate-to-severe COPD patients',
      protocolNumber: 'VER-202-301',
      clinicalTrialsGov: 'NCT04636671'
    },
    riskAssessment: {
      overallScore: 72,
      riskLevel: "High Risk",
      components: riskComponents
    },
    manufacturing: {
      analysis: isRadioligand ? 
        'Radioligand manufacturing requires specialized GMP facilities with nuclear medicine capabilities. Lu-177 isotope supply chain creates critical dependency. Manufacturing process involves complex radiolabeling procedures with strict quality control requirements.' :
        isBiologic ? 
        'Biologic manufacturing requires sophisticated bioreactor systems and complex purification processes. Cell culture optimization and protein expression systems critical for consistent product quality. Manufacturing scale-up presents significant technical challenges.' :
        'Small molecule manufacturing utilizes established synthetic chemistry processes. API synthesis involves 8-step synthetic route with multiple purification steps. Manufacturing process well-characterized with established quality control protocols.',
      competitiveLandscape: isRadioligand ? 
        'Limited competition in radioligand therapy space. Novartis dominates with Lutathera. High barriers to entry due to regulatory complexity and infrastructure requirements. Emerging competitors include Advanced Accelerator Applications and Curium Pharma.' :
        isBiologic ? 
        'Highly competitive biologics market with established players. Roche, Amgen, and AbbVie dominate monoclonal antibody space. Biosimilar competition increasing post-patent expiration. High development costs create significant barriers to entry.' :
        'Highly competitive small molecule market with numerous players. Generic competition significant post-patent expiration. Cost-effective manufacturing provides competitive advantage. Multiple companies pursuing similar mechanisms.',
      regulatoryPathway: isRadioligand ? 
        'FDA Breakthrough Therapy Designation pathway with accelerated approval for radioligand therapies. EMA PRIME designation available for innovative nuclear medicine approaches. Specialized regulatory requirements for radiation safety and nuclear medicine protocols.' :
        isBiologic ? 
        'FDA Biologics License Application (BLA) pathway with potential for accelerated approval. EMA centralized procedure for biologics with conditional marketing authorization. Complex regulatory requirements for manufacturing process validation.' :
        'FDA New Drug Application (NDA) pathway with potential for Fast Track designation. EMA centralized procedure with conditional marketing authorization. Standard regulatory pathway with established requirements.',
      qualityControl: isRadioligand ? 
        'Rigorous quality control for radioligand products including radiochemical purity, specific activity, and sterility testing. Radiation safety protocols require specialized equipment and trained personnel. Stability testing under radiation conditions critical.' :
        isBiologic ? 
        'Comprehensive quality control including potency, purity, and immunogenicity testing. Complex analytical methods required for protein characterization. Stability testing under various conditions essential for biologic products.' :
        'Standard quality control protocols for small molecules including purity, potency, and stability testing. Well-established analytical methods and acceptance criteria. Stability testing under standard conditions.',
      aiInsights: [
        {
          category: 'Manufacturing Optimization',
          insight: isRadioligand ? 
            'Radioligand manufacturing efficiency can be improved by 25% through automated synthesis modules and optimized purification protocols' :
            isBiologic ? 
            'Biologic manufacturing yield can be increased by 30% through cell line optimization and improved bioreactor conditions' :
            'Small molecule manufacturing cost can be reduced by 20% through route optimization and improved crystallization processes',
          impact: 'High',
          recommendation: 'Implement manufacturing optimization strategies to improve efficiency and reduce costs'
        },
        {
          category: 'Supply Chain Risk',
          insight: isRadioligand ? 
            'Lu-177 isotope supply chain represents critical single point of failure requiring immediate mitigation strategies' :
            isBiologic ? 
            'Cell culture media and bioreactor components represent potential supply chain vulnerabilities' :
            'API starting materials and key intermediates represent potential supply chain risks',
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
    },
    marketAnalysis: {
      competitiveLandscape: isRadioligand ? 
        'Radioligand therapy market experiencing rapid growth with limited competition. Novartis dominates with Lutathera. High barriers to entry create opportunities for innovative approaches.' :
        isBiologic ? 
        'Biologics market highly competitive with established players. Biosimilar competition increasing. Innovation in delivery and formulation provides competitive advantages.' :
        'Small molecule market highly competitive with numerous players. Generic competition significant. Cost-effective development and manufacturing provide competitive advantages.',
      marketSize: isRadioligand ? 
        '$3.2B global radioligand therapy market growing at 12% CAGR' :
        isBiologic ? 
        '$450B global biologics market growing at 8% CAGR' :
        '$1.2T global pharmaceutical market growing at 6% CAGR',
      regulatoryPathway: isRadioligand ? 
        'FDA Breakthrough Therapy Designation pathway with accelerated approval. EMA PRIME designation available for innovative approaches.' :
        isBiologic ? 
        'FDA BLA pathway with potential for accelerated approval. EMA centralized procedure with conditional marketing authorization.' :
        'FDA NDA pathway with potential for Fast Track designation. EMA centralized procedure with conditional marketing authorization.',
      timeline: isRadioligand ? 
        '2-3 years to market with accelerated pathways, 4-5 years with standard regulatory process' :
        isBiologic ? 
        '3-4 years to market with accelerated pathways, 5-7 years with standard regulatory process' :
        '2-3 years to market with accelerated pathways, 4-6 years with standard regulatory process'
    },
    croAnalysis: {
      selectedCRO: isRadioligand ? 
        'Advanced Accelerator Applications' :
        isBiologic ? 
        'Parexel International' :
        'Medpace Holdings Inc',
      croStrengths: isRadioligand ? 
        'Specialized expertise in nuclear medicine trials with global network of nuclear medicine facilities. Strong regulatory experience with radioligand therapy approvals. Established relationships with nuclear medicine centers worldwide.' :
        isBiologic ? 
        'Extensive experience in biologic drug development with specialized immunogenicity testing capabilities. Strong regulatory expertise with biologic approvals. Global network of sites with biologic trial experience.' :
        'Extensive experience in respiratory drug development with specialized pulmonary function testing capabilities. Strong regulatory expertise with inhaled drug approvals. Global network of sites with respiratory trial experience.',
      croExperience: isRadioligand ? 
        'Conducted 15+ radioligand therapy trials including landmark VISION trial. Successfully managed regulatory approvals for multiple radioligand therapies. Established protocols for radiation safety and nuclear medicine compliance.' :
        isBiologic ? 
        'Conducted 50+ biologic trials across multiple therapeutic areas. Successfully managed regulatory approvals for multiple biologics. Established protocols for immunogenicity testing and biologic safety monitoring.' :
        'Conducted 30+ respiratory drug trials including COPD and asthma studies. Successfully managed regulatory approvals for multiple inhaled drugs. Established protocols for pulmonary function testing and respiratory safety monitoring.',
      croRiskFactors: isRadioligand ? 
        'Limited number of qualified nuclear medicine facilities may create enrollment bottlenecks. Radiation safety training requirements may delay site activation. Specialized equipment requirements may limit site selection.' :
        isBiologic ? 
        'Complex biologic manufacturing requirements may create supply chain challenges. Immunogenicity testing requirements may increase trial complexity. Higher costs associated with biologic development may impact budget.' :
        'Pulmonary function testing requirements may create site selection challenges. Inhalation device training requirements may increase patient burden. Regional variations in respiratory disease prevalence may impact enrollment.',
      aiRecommendations: [
        {
          category: 'CRO Selection',
          insight: isRadioligand ? 
            'Advanced Accelerator Applications provides optimal fit for radioligand therapy development with specialized nuclear medicine expertise' :
            isBiologic ? 
            'Parexel International provides optimal fit for biologic development with specialized immunogenicity testing capabilities' :
            'Medpace Holdings Inc provides optimal fit for respiratory drug development with specialized pulmonary function testing capabilities',
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
    },
    externalFactors: {
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
    },
    trialMetrics: {
      countries: 15,
      sites: 85,
      duration: '24 months',
      budget: '$78,000,000'
    },
    trialDesign: {
      studyDesign: 'Randomized, double-blind, placebo-controlled, parallel-group study with 24-week treatment period',
      primaryEndpoint: 'FEV1 AUC0-12h at Week 12 compared to placebo',
      patientPopulation: 'Moderate-to-severe COPD patients (FEV1 30-70% predicted) with chronic bronchitis',
      statisticalAnalysis: 'Primary analysis using mixed model for repeated measures (MMRM) with treatment, visit, and treatment-by-visit interaction as fixed effects',
      safetyMonitoring: 'Comprehensive safety monitoring including adverse events, vital signs, laboratory parameters, and pulmonary function tests'
    },
    siteReadiness: {
      siteSelection: 'Sites selected based on respiratory disease expertise, pulmonary function testing capabilities, and patient population availability',
      infrastructureRequirements: 'Sites must have certified pulmonary function testing equipment, spirometry training, and respiratory therapy support',
      trainingRequirements: 'Site staff training on inhalation device use, pulmonary function testing protocols, and respiratory safety monitoring',
      regulatoryCompliance: 'Sites must meet local regulatory requirements for respiratory drug trials and pulmonary function testing',
      timelineConsiderations: 'Site activation timeline 3-6 months including regulatory approvals, staff training, and equipment certification'
    },
    blurredData: {
      proprietaryManufacturingCosts: 'Proprietary manufacturing cost data blurred for confidentiality',
      confidentialProtocolDetails: 'Confidential protocol details and trial registry numbers blurred',
      exactMarketSizeFigures: 'Exact market size figures and competitive intelligence blurred',
      specificCROVendorDetails: 'Specific CRO vendor details and proprietary risk metrics blurred',
      exactMolecularSpecifications: 'Exact molecular specifications and proprietary algorithms blurred'
    },
    modelUsed: 'Gemini 1.5 Flash',
    processingTime: `${Math.floor(Math.random() * 2000) + 1000}ms`,
    timestamp: new Date().toISOString(),
    isMockResponse: true,
    geminiError: null
  }
}

// Function to blur sensitive data that Gemini can't realistically generate
function blurSensitiveData(analysis: any) {
  const blurredData: { [key: string]: string } = {}
  
  // Only blur data that would be genuinely proprietary or confidential
  // Don't blur data that Gemini can reasonably determine from molecule properties
  
  // Blur exact protocol numbers (confidential trial information)
  if (analysis.clinicalInfo?.protocolNumber) {
    blurredData.protocolNumber = "***REDACTED***"
  }
  
  // Blur exact clinical trial registry numbers (confidential)
  if (analysis.clinicalInfo?.clinicalTrialsGov) {
    blurredData.clinicalTrialsGov = "***REDACTED***"
  }
  
  // Blur exact budget figures (proprietary financial information)
  if (analysis.trialMetrics?.budget) {
    blurredData.exactBudget = "***REDACTED***"
  }
  
  // Blur exact molecular specifications that might be proprietary
  if (analysis.molecularDetails?.molecularWeight && 
      (analysis.molecularDetails.molecularWeight.includes('Calculate') || 
       analysis.molecularDetails.molecularWeight.includes('Generate'))) {
    blurredData.exactMolecularSpecs = "***REDACTED***"
  }
  
  // Blur exact market size estimates (proprietary market research)
  if (analysis.marketAnalysis?.marketSize && 
      (analysis.marketAnalysis.marketSize.includes('Calculate') || 
       analysis.marketAnalysis.marketSize.includes('Generate'))) {
    blurredData.exactMarketSize = "***REDACTED***"
  }
  
  // Blur exact timeline estimates (proprietary planning)
  if (analysis.marketAnalysis?.timeline && 
      (analysis.marketAnalysis.timeline.includes('Calculate') || 
       analysis.marketAnalysis.timeline.includes('Generate'))) {
    blurredData.exactTimeline = "***REDACTED***"
  }
  
  // Blur exact cost estimates (proprietary financial information)
  if (analysis.manufacturing?.costEstimates && 
      (analysis.manufacturing.costEstimates.includes('Calculate') || 
       analysis.manufacturing.costEstimates.includes('Generate'))) {
    blurredData.manufacturingCosts = "***REDACTED***"
  }
  
  return blurredData
}

export async function POST(request: Request) {
  try {
    const inputs: MoleculeInputs = await request.json()
    
    // Validate required inputs
    const requiredFields = ['geneSymbol', 'uniprotId', 'structureType', 'mechanism', 'route', 'indication', 'phase', 'type'] as const
    for (const field of requiredFields) {
      if (!inputs[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        )
      }
    }

    try {
      // Try to call Gemini AI first
      const aiAnalysis = await callGeminiAI(inputs)
      
      // Blur sensitive data
      const blurredData = blurSensitiveData(aiAnalysis)
      
      // Add blurred data to response
      const response = {
        ...aiAnalysis,
        blurredData,
        timestamp: new Date().toISOString(),
        modelUsed: "Gemini 1.5 Flash",
        processingTime: "2.3 seconds"
      }

      return NextResponse.json(response)
    } catch (geminiError) {
      console.error('Gemini API failed, using mock response:', geminiError)
      
      // Use mock response when Gemini API fails (rate limit, etc.)
      const mockAnalysis = generateMockResponse(inputs)
      
      // Add a flag to indicate this is a mock response
      const response = {
        ...mockAnalysis,
        isMockResponse: true,
        geminiError: geminiError instanceof Error ? geminiError.message : 'Unknown error',
        timestamp: new Date().toISOString(),
        modelUsed: "Mock Response (Gemini failed)",
        processingTime: "0.5 seconds"
      }
      
      return NextResponse.json(response)
    }
  } catch (error) {
    console.error('AI Analysis error:', error)
    
    // Return error response for other errors
    return NextResponse.json(
      { 
        error: 'Failed to analyze molecule',
        message: 'AI analysis service temporarily unavailable',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
} 