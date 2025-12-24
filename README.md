# TDS Co-Pilot

**AI-Powered Design System Linter for Fluent UI**

TDS Co-Pilot is an intelligent Figma plugin that ensures your designs comply with the Fluent design system (Teams Design System). It validates design tokens, suggests fixes using AI, and helps maintain consistency across your product designs.

## 🎯 Features

### Core Linting
- **Border Radius Validation**: Ensures corner radii match Fluent tokens (2px, 4px, 6px, 8px, 10000px)
- **Spacing Validation**: Checks padding and gap values against Fluent's spacing scale
- **Stroke Width Validation**: Validates stroke weights (1px, 2px, 3px, 4px)
- **Color Token Validation**: Ensures fills, strokes, and effects use proper styles
- **Typography Validation**: Checks text styles for compliance

### AI-Powered Suggestions
- **Context-Aware Explanations**: AI analyzes errors and explains why they matter
- **Smart Recommendations**: Suggests the closest valid Fluent token for non-compliant values
- **Documentation Links**: Direct links to Fluent design system documentation

### Design System Integration
- **Fluent UI Tokens**: Pre-configured with Teams Light and Dark theme values
- **Customizable**: Easy to update tokens for custom brand implementations
- **Variable-Aware**: Respects Figma variables and skips already-tokenized layers

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- Yarn or npm
- Figma desktop app

### Setup

1. **Clone and navigate to your local repo**:
   ```bash
   cd /path/to/linterrific
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   # or
   npm install
   ```

3. **Copy the new TDS Co-Pilot files**:
   
   Copy these files into your `src/plugin/` directory:
   - `fluentTokens.ts`
   - `fluentLinting.ts`
   - `controller.ts` (replace existing)
   
   Copy these files into your `src/app/` directory:
   - `App.tsx` (replace existing)
   
   Copy these files into your `src/app/components/` directory:
   - `AISuggestButton.tsx` (new component)
   
   Copy this file into your `src/app/styles/` directory:
   - `tds-copilot.css`

4. **Update your App.tsx to import the AI component**:
   
   Add this import at the top of `src/app/components/Panel.tsx`:
   ```typescript
   import AISuggestButton from "./AISuggestButton";
   ```
   
   Then add the AI button component to the Panel render, after the error details:
   ```tsx
   <AISuggestButton error={activeError} node={node} />
   ```

5. **Import the TDS Co-Pilot CSS**:
   
   Add this to `src/app/components/App.tsx`:
   ```typescript
   import "../styles/tds-copilot.css";
   ```

6. **Build the plugin**:
   ```bash
   yarn build:watch
   # or
   npm run build:watch
   ```

7. **Load in Figma**:
   - Open Figma Desktop
   - Go to Menu > Plugins > Development > Import plugin from manifest
   - Select the `manifest.json` file from your repo
   - The plugin will appear as "TDS Co-Pilot"

## 🚀 Usage

### Basic Linting

1. **Select layers** in your Figma file
2. **Run TDS Co-Pilot** from the Plugins menu
3. **Review errors** organized by layer or category
4. **Click "Suggest Fix"** on any error to get AI-powered guidance

### Understanding Errors

#### Border Radius Errors
- **What it means**: Layer uses a non-standard corner radius
- **Example**: A button with 5px radius instead of Fluent's 4px or 6px
- **Fix**: Click "Suggest Fix" to see the closest Fluent token

#### Spacing Errors
- **What it means**: Padding or gap doesn't match Fluent's spacing scale
- **Example**: 15px gap instead of 12px or 16px
- **Fix**: Apply the suggested spacing token for consistent layouts

#### Stroke Width Errors
- **What it means**: Border thickness doesn't match Fluent standards
- **Example**: 1.5px stroke instead of 1px or 2px
- **Fix**: Use strokeWidthThin (1px) or strokeWidthThick (2px)

### AI Suggestions

When you click **"Suggest Fix"**:
1. TDS Co-Pilot analyzes the error context
2. AI generates a human-friendly explanation
3. Suggests the closest valid Fluent token
4. Provides a link to relevant documentation

## 🎨 Customizing Tokens

### Updating Token Values

Edit `src/plugin/fluentTokens.ts` to modify token values:

```typescript
export const teamsTokens: FluentTokens = {
  borderRadius: {
    none: 0,
    small: 2,    // Change these values
    medium: 4,   // to match your
    large: 6,    // design system
    xLarge: 8,
    circular: 10000
  },
  // ... spacing and other tokens
};
```

### Adding New Token Categories

1. Add the token type to the `FluentTokens` interface
2. Add values to `teamsTokens` object
3. Create a `getValid[TokenType]Values()` function
4. Create a check function in `fluentLinting.ts`
5. Integrate into the linting rules in `controller.ts`

## 📊 Case Study Integration

This plugin demonstrates **"Beyond Documentation: AI Managing Complexity at Scale"** by:

1. **Automated Enforcement**: Replaces manual design QA with systematic checks
2. **AI-Powered Guidance**: Transforms cryptic errors into educational moments
3. **Scalable Knowledge**: Distributes design system expertise through AI
4. **Continuous Compliance**: Catches issues before they reach development

### Key Metrics
- **Time Saved**: Reduces QA time from hours to minutes
- **Consistency**: 100% automated token validation
- **Education**: Every error becomes a learning opportunity
- **Adoption**: Makes design system compliance effortless

## 🛠️ Architecture

```
TDS Co-Pilot
├── Plugin Layer (TypeScript)
│   ├── fluentTokens.ts      # Token definitions & utilities
│   ├── fluentLinting.ts     # Fluent-specific linting logic
│   ├── controller.ts        # Main orchestration
│   └── lintingFunctions.ts  # Base linting functions
│
├── UI Layer (React)
│   ├── App.tsx              # Main app component
│   ├── AISuggestButton.tsx  # AI suggestion interface
│   └── [other components]   # Panel, NodeList, etc.
│
└── Styles
    ├── tds-copilot.css      # TDS Co-Pilot branding
    └── [other styles]       # Base UI styles
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] Border radius validation works for all standard values
- [ ] AI suggestions appear when clicking "Suggest Fix"
- [ ] Documentation links navigate to correct Fluent pages
- [ ] Spacing validation catches non-standard padding/gaps
- [ ] Stroke width validation works correctly
- [ ] Plugin respects Figma variables (doesn't flag them as errors)

### Sample Test Cases

1. **Border Radius**
   - Create rectangle with 5px radius → Should suggest 4px or 6px
   - Create rectangle with 4px radius → No error

2. **Spacing**
   - Create auto-layout with 15px gap → Should suggest 12px or 16px
   - Create auto-layout with 16px gap → No error

3. **AI Suggestions**
   - Click "Suggest Fix" on radius error → Should explain why and suggest token
   - Click "See Documentation" → Should open Fluent docs

## 📝 Notes for Portfolio/Case Study

### Presentation Talking Points

1. **The Problem**: Design systems create hundreds of tokens. Designers struggle to remember and apply them consistently.

2. **The Solution**: TDS Co-Pilot combines automated linting with AI-powered education to make compliance effortless.

3. **The Innovation**: Rather than just flagging errors, the AI explains *why* rules exist and *how* to fix them.

4. **The Impact**: Teams ship Fluent-compliant designs faster, with fewer QA cycles and better understanding of the system.

### Demo Flow

1. Show a non-compliant design (mixed border radii, random spacing)
2. Run TDS Co-Pilot to surface errors
3. Click "Suggest Fix" to demonstrate AI explanations
4. Show documentation links for deeper learning
5. Apply fixes to achieve 100% compliance

## 🤝 Contributing

This is a case study/portfolio project, but contributions are welcome:

1. Fork the repo
2. Create a feature branch
3. Make your changes
4. Submit a PR with description

## 📄 License

MIT License - Based on the original design-lint plugin

## 🙏 Acknowledgments

- Original design-lint plugin by [@destefanis](https://github.com/destefanis)
- Fluent UI design system by Microsoft
- Built with AI assistance from Claude (Anthropic)

---

**Built by Katie Swanson** | [Portfolio](https://katieswanson.design) | [LinkedIn](https://linkedin.com/in/yourprofile)
