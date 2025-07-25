# Convexia Execution Risk Assessment Platform

A comprehensive clinical trial execution risk assessment platform that analyzes operational factors affecting clinical trial success probability. This application provides detailed risk analysis for the OHT-202 (Ensifentrine) COPD clinical trial.

## Features

- **Clinical Trial Overview**: Detailed information about OHT-202 including molecular details, trial information, and CRO selection
- **Risk Assessment Dashboard**: Interactive risk score visualization with circular progress indicator
- **Risk Component Analysis**: Detailed breakdown of various risk factors affecting trial execution
- **Recommended Actions**: Prioritized interventions to reduce execution risk
- **Multi-tab Interface**: Organized sections for different aspects of trial analysis
- **Responsive Design**: Modern, clean UI that works across different screen sizes

## Technology Stack

- **Frontend**: Next.js 14 with React 18
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **TypeScript**: Full type safety
- **Build Tool**: Next.js built-in bundler

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Convexia-Demo
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
Convexia-Demo/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles and Tailwind imports
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Main page component
├── lib/                   # Utility functions
│   └── utils.ts           # Class name utility function
├── package.json           # Dependencies and scripts
├── tailwind.config.js     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── README.md              # Project documentation
```

## Key Components

### Trial Data
The application displays comprehensive information about the OHT-202 clinical trial:
- **Drug**: Ensifentrine (OHT-202) - inhaled dual PDE3/PDE4 inhibitor
- **Indication**: COPD with chronic bronchitis
- **Phase**: Phase III
- **Risk Score**: 72/100 (High Risk)
- **Scope**: 15 countries, 85 sites, 24-month duration, $78M budget

### Risk Components
The platform analyzes five key risk areas:
1. **Critical API Supply Risk** (78/100) - Single-source dependency vulnerability
2. **Site Activation Delays** (71/100) - IRB/EC approval delays
3. **Geographic Enrollment Risk** (65/100) - Regional dropout rate concerns
4. **Protocol Complexity Burden** (58/100) - Patient burden from visit requirements
5. **External Disruption Risk** (23/100) - Low geopolitical risk

### Recommended Actions
Prioritized interventions include:
- **Critical**: Establish Secondary API Supplier
- **High**: Optimize Site Activation Strategy

## Design System

The application uses a consistent design system with:
- **Colors**: Gray scale with semantic color coding for risk levels
- **Typography**: Inter font family with hierarchical text sizing
- **Spacing**: Consistent padding and margin using Tailwind's spacing scale
- **Components**: Reusable card components with hover states and transitions

## Future Enhancements

- Integration with real-time data sources
- Interactive charts and visualizations
- User authentication and role-based access
- Export functionality for reports
- Real-time risk score updates
- Integration with clinical trial management systems

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is for demonstration purposes and showcases the capabilities of modern web development for clinical trial risk assessment platforms. 