// Fluent UI Design Tokens - Teams Dark Theme
// TDS Co-Pilot uses these tokens to validate Fluent design system compliance

export interface FluentTokens {
  borderRadius: {
    none: number;
    small: number;
    medium: number;
    large: number;
    xLarge: number;
    circular: number;
  };
  spacing: {
    none: number;
    xxs: number;
    xs: number;
    sNudge: number;
    s: number;
    mNudge: number;
    m: number;
    l: number;
    xl: number;
    xxl: number;
    xxxl: number;
  };
  strokeWidth: {
    thin: number;
    thick: number;
    thicker: number;
    thickest: number;
  };
  colors: {
    // Storing hex values for reference
    // In practice, we validate against Figma color styles, not raw hex
    brand: {
      background: string;
      foreground1: string;
      foreground2: string;
    };
    neutral: {
      foreground1: string;
      foreground2: string;
      foreground3: string;
      background1: string;
      background2: string;
      background3: string;
    };
  };
}

// Teams Dark Theme Token Values
export const teamsTokens: FluentTokens = {
  borderRadius: {
    none: 0,
    small: 2,
    medium: 4,
    large: 6,
    xLarge: 8,
    circular: 10000 // Effectively creates a circle
  },
  spacing: {
    none: 0,
    xxs: 2,
    xs: 4,
    sNudge: 6,
    s: 8,
    mNudge: 10,
    m: 12,
    l: 16,
    xl: 20,
    xxl: 24,
    xxxl: 32
  },
  strokeWidth: {
    thin: 1,
    thick: 2,
    thicker: 3,
    thickest: 4
  },
  colors: {
    brand: {
      background: "#115ea3",
      foreground1: "#479ef5",
      foreground2: "#62abf5"
    },
    neutral: {
      foreground1: "#ffffff",
      foreground2: "#d6d6d6",
      foreground3: "#adadad",
      background1: "#292929",
      background2: "#1f1f1f",
      background3: "#141414"
    }
  }
};

// Get all valid border radius values as an array
export function getValidBorderRadiusValues(): number[] {
  return Object.values(teamsTokens.borderRadius);
}

// Get all valid spacing values as an array
export function getValidSpacingValues(): number[] {
  return Object.values(teamsTokens.spacing);
}

// Get all valid stroke width values as an array
export function getValidStrokeWidthValues(): number[] {
  return Object.values(teamsTokens.strokeWidth);
}

// Token name mapping for user-friendly error messages
export const tokenNameMap = {
  borderRadius: {
    0: "borderRadiusNone",
    2: "borderRadiusSmall",
    4: "borderRadiusMedium",
    6: "borderRadiusLarge",
    8: "borderRadiusXLarge",
    10000: "borderRadiusCircular"
  },
  spacing: {
    0: "spacingNone",
    2: "spacingXXS",
    4: "spacingXS",
    6: "spacingSNudge",
    8: "spacingS",
    10: "spacingMNudge",
    12: "spacingM",
    16: "spacingL",
    20: "spacingXL",
    24: "spacingXXL",
    32: "spacingXXXL"
  },
  strokeWidth: {
    1: "strokeWidthThin",
    2: "strokeWidthThick",
    3: "strokeWidthThicker",
    4: "strokeWidthThickest"
  }
};

// Helper function to get the recommended token name for a value
export function getRecommendedTokenName(
  type: "borderRadius" | "spacing" | "strokeWidth",
  value: number
): string | null {
  const map = tokenNameMap[type];
  return map[value] || null;
}

// Helper function to find the closest valid value
export function findClosestValidValue(
  type: "borderRadius" | "spacing" | "strokeWidth",
  value: number
): { value: number; tokenName: string; distance: number } | null {
  let validValues: number[];
  
  switch (type) {
    case "borderRadius":
      validValues = getValidBorderRadiusValues();
      break;
    case "spacing":
      validValues = getValidSpacingValues();
      break;
    case "strokeWidth":
      validValues = getValidStrokeWidthValues();
      break;
    default:
      return null;
  }

  // Filter out the circular radius for closest match (special case)
  if (type === "borderRadius") {
    validValues = validValues.filter(v => v !== 10000);
  }

  let closest = validValues[0];
  let minDistance = Math.abs(value - closest);

  for (const validValue of validValues) {
    const distance = Math.abs(value - validValue);
    if (distance < minDistance) {
      minDistance = distance;
      closest = validValue;
    }
  }

  const tokenName = getRecommendedTokenName(type, closest);
  
  return tokenName ? { value: closest, tokenName, distance: minDistance } : null;
}
