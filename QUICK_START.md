# TDS Co-Pilot - Quick Implementation Guide

## 🚀 Fast Track Setup (5 minutes)

### Step 1: Copy Files to Your Repo

Copy these files I created into your local `linterrific` repo:

**Plugin files** (go in `src/plugin/`):
1. ✅ `fluentTokens.ts` - Token definitions
2. ✅ `fluentLinting.ts` - Fluent-specific linting
3. ✅ `controller.ts` - Updated controller (REPLACES existing)

**UI Component** (goes in `src/app/components/`):
4. ✅ `AISuggestButton.tsx` - AI suggestion button

**Main App** (goes in `src/app/`):
5. ✅ `App.tsx` - Updated app (REPLACES existing)

**Styles** (goes in `src/app/styles/`):
6. ✅ `tds-copilot.css` - TDS Co-Pilot styles

### Step 2: Update Panel Component

You'll need to manually add the AI button to your Panel component.

**File to edit**: `src/app/components/Panel.tsx`

**Add this import** at the top:
```typescript
import AISuggestButton from "./AISuggestButton";
```

**Add the button** in the render method, after error details but before the close button:
```tsx
{/* Add this after your error display code */}
<AISuggestButton error={activeError} node={node} />
```

### Step 3: Import CSS

**File to edit**: `src/app/components/App.tsx`

**Add this import** with the other CSS imports:
```typescript
import "../styles/tds-copilot.css";
```

### Step 4: Update manifest.json (Optional - for branding)

**File to edit**: `manifest.json` (in root)

**Update the name**:
```json
{
  "name": "TDS Co-Pilot",
  "id": "your-plugin-id",
  "api": "1.0.0",
  "main": "code.js",
  "ui": "index.html",
  "editorType": ["figma"]
}
```

### Step 5: Build and Test

```bash
# From your repo root
yarn install
yarn build:watch
```

Then in Figma:
1. Plugins > Development > Import plugin from manifest
2. Select your `manifest.json`
3. Test on a design with non-Fluent values!

---

## 🧪 Testing Checklist

Create test shapes in Figma with these values to verify it's working:

### Border Radius Tests
- [ ] Rectangle with 3px radius → Should flag error, suggest 2px or 4px
- [ ] Rectangle with 4px radius → No error ✅
- [ ] Rectangle with 10px radius → Should flag error, suggest 8px

### Spacing Tests  
- [ ] Auto-layout frame with 15px gap → Should flag error, suggest 12px or 16px
- [ ] Auto-layout frame with 16px gap → No error ✅

### AI Suggestion Test
- [ ] Click "Suggest Fix" on any error → Should show AI explanation
- [ ] Click "See Documentation" → Should have valid Fluent link

---

## 📁 File Structure After Setup

```
linterrific/
├── src/
│   ├── plugin/
│   │   ├── fluentTokens.ts          ← NEW
│   │   ├── fluentLinting.ts         ← NEW
│   │   ├── controller.ts            ← UPDATED
│   │   ├── lintingFunctions.ts      (existing)
│   │   └── ...
│   │
│   └── app/
│       ├── components/
│       │   ├── AISuggestButton.tsx  ← NEW
│       │   ├── App.tsx              ← UPDATED
│       │   ├── Panel.tsx            ← NEEDS MANUAL EDIT
│       │   └── ...
│       │
│       └── styles/
│           ├── tds-copilot.css      ← NEW
│           └── ...
│
├── manifest.json                     ← OPTIONAL UPDATE
├── package.json
└── README.md                         ← NEW
```

---

## 🎯 What You Get

### Before (Design Lint)
- Generic error: "Incorrect border radius: 5"
- No context, no suggestions
- Manual lookup required

### After (TDS Co-Pilot)
- Smart error: "Non-Fluent border radius"
- AI explains: "This layer uses a 5px border radius, which isn't part of the Fluent design system. The closest Fluent token is **borderRadiusMedium** (4px)..."
- One-click documentation link
- Clear path to compliance

---

## 🆘 Troubleshooting

**Problem**: Build errors about missing imports

**Solution**: Make sure all 6 files are copied to correct locations

---

**Problem**: AI button doesn't appear

**Solution**: Did you add `<AISuggestButton>` to Panel.tsx and import the CSS?

---

**Problem**: Plugin doesn't load in Figma

**Solution**: Check console for errors, ensure `yarn build:watch` is running

---

## 🎨 Next Steps for Your Case Study

1. **Customize Colors**: Update brand colors in `fluentTokens.ts` to match Teams
2. **Add Screenshots**: Capture before/after of the AI suggestions
3. **Record Demo**: Screen record the suggest fix flow
4. **Document Impact**: "Reduced QA time by X%, caught Y errors before dev"

---

**Questions?** The README.md has full documentation!
