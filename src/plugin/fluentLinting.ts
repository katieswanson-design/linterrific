// TDS Co-Pilot - Enhanced Fluent UI Linting Functions
// These functions extend the base linting with Fluent-specific checks and AI-powered suggestions

import {
  teamsTokens,
  getValidBorderRadiusValues,
  getValidSpacingValues,
  getValidStrokeWidthValues,
  getRecommendedTokenName,
  findClosestValidValue
} from "./fluentTokens";

import { createErrorObject } from "./lintingFunctions";

// Enhanced border radius check with Fluent token validation
export function checkFluentRadius(node, errors) {
  let cornerType = node.cornerRadius;
  const validValues = getValidBorderRadiusValues();

  if (typeof cornerType !== "symbol") {
    // Skip if it's 0 or if it's a perfect circle (height === radius)
    if (cornerType === 0 || cornerType === node.height) {
      return;
    }
  }

  // Skip if using Figma variables
  if (typeof node.boundVariables !== "undefined") {
    if (typeof node.boundVariables.bottomLeftRadius !== "undefined") {
      return;
    }
  }

  // Check if radius is mixed (different on each corner)
  if (typeof cornerType === "symbol") {
    const corners = [
      { name: "Top Left", value: node.topLeftRadius },
      { name: "Top Right", value: node.topRightRadius },
      { name: "Bottom Left", value: node.bottomLeftRadius },
      { name: "Bottom Right", value: node.bottomRightRadius }
    ];

    for (const corner of corners) {
      if (validValues.indexOf(corner.value) === -1) {
        const suggestion = findClosestValidValue("borderRadius", corner.value);
        
        return errors.push(
          createErrorObject(
            node,
            "radius",
            `Non-Fluent ${corner.name} Radius`,
            corner.value,
            null,
            suggestion ? [{
              tokenName: suggestion.tokenName,
              value: suggestion.value,
              reason: `Closest Fluent token (${suggestion.distance}px away)`
            }] : null
          )
        );
      }
    }
  } else {
    // Uniform radius on all corners
    if (validValues.indexOf(node.cornerRadius) === -1) {
      const suggestion = findClosestValidValue("borderRadius", node.cornerRadius);
      
      return errors.push(
        createErrorObject(
          node,
          "radius",
          "Non-Fluent border radius",
          node.cornerRadius,
          null,
          suggestion ? [{
            tokenName: suggestion.tokenName,
            value: suggestion.value,
            reason: `Closest Fluent token (${suggestion.distance}px away)`
          }] : null
        )
      );
    }
  }
}

// Check spacing/padding values against Fluent tokens
export function checkFluentSpacing(node, errors, property: "padding" | "gap") {
  // This would check auto-layout spacing
  // Figma's API structure for this:
  if (node.type === "FRAME" || node.type === "COMPONENT") {
    const validValues = getValidSpacingValues();
    
    // Check horizontal padding
    if (node.paddingLeft && validValues.indexOf(node.paddingLeft) === -1) {
      const suggestion = findClosestValidValue("spacing", node.paddingLeft);
      
      errors.push(
        createErrorObject(
          node,
          "spacing",
          "Non-Fluent horizontal padding",
          node.paddingLeft,
          null,
          suggestion ? [{
            tokenName: suggestion.tokenName,
            value: suggestion.value,
            reason: `Use Fluent spacing token`
          }] : null
        )
      );
    }

    // Check vertical padding
    if (node.paddingTop && validValues.indexOf(node.paddingTop) === -1) {
      const suggestion = findClosestValidValue("spacing", node.paddingTop);
      
      errors.push(
        createErrorObject(
          node,
          "spacing",
          "Non-Fluent vertical padding",
          node.paddingTop,
          null,
          suggestion ? [{
            tokenName: suggestion.tokenName,
            value: suggestion.value,
            reason: `Use Fluent spacing token`
          }] : null
        )
      );
    }

    // Check item spacing (gap)
    if (node.itemSpacing && validValues.indexOf(node.itemSpacing) === -1) {
      const suggestion = findClosestValidValue("spacing", node.itemSpacing);
      
      errors.push(
        createErrorObject(
          node,
          "spacing",
          "Non-Fluent item spacing",
          node.itemSpacing,
          null,
          suggestion ? [{
            tokenName: suggestion.tokenName,
            value: suggestion.value,
            reason: `Use Fluent spacing token`
          }] : null
        )
      );
    }
  }
}

// Enhanced stroke width check with Fluent token validation
export function checkFluentStrokeWidth(node, errors) {
  if (node.strokes && node.strokes.length > 0) {
    const validValues = getValidStrokeWidthValues();
    let strokeWeight = node.strokeWeight;

    // Skip if mixed stroke weight
    if (typeof strokeWeight === "symbol") {
      return;
    }

    // Skip if using Figma variables for strokes
    if (typeof node.boundVariables !== "undefined") {
      if (typeof node.boundVariables.strokes !== "undefined") {
        return;
      }
    }

    if (strokeWeight && validValues.indexOf(strokeWeight) === -1) {
      const suggestion = findClosestValidValue("strokeWidth", strokeWeight);
      
      errors.push(
        createErrorObject(
          node,
          "stroke",
          "Non-Fluent stroke width",
          strokeWeight,
          null,
          suggestion ? [{
            tokenName: suggestion.tokenName,
            value: suggestion.value,
            reason: `Closest Fluent token (${suggestion.distance}px away)`
          }] : null
        )
      );
    }
  }
}

// AI-powered error explanation generator
// This creates a context object that can be sent to Claude API
export function generateAIContext(error, node) {
  const context = {
    errorType: error.type,
    errorMessage: error.message,
    currentValue: error.value,
    nodeName: node.name,
    nodeType: node.type,
    suggestion: error.suggestions?.[0],
    fluentTokens: null as any
  };

  // Add relevant Fluent tokens based on error type
  switch (error.type) {
    case "radius":
      context.fluentTokens = {
        category: "Border Radius",
        validValues: getValidBorderRadiusValues(),
        tokens: teamsTokens.borderRadius
      };
      break;
    case "spacing":
      context.fluentTokens = {
        category: "Spacing",
        validValues: getValidSpacingValues(),
        tokens: teamsTokens.spacing
      };
      break;
    case "stroke":
      // Check if it's a stroke width issue
      if (error.message.includes("width")) {
        context.fluentTokens = {
          category: "Stroke Width",
          validValues: getValidStrokeWidthValues(),
          tokens: teamsTokens.strokeWidth
        };
      }
      break;
  }

  return context;
}

// Generate user-friendly documentation link
export function getDocumentationLink(errorType: string): string {
  const baseUrl = "https://fluent2.microsoft.design";
  
  switch (errorType) {
    case "radius":
      return `${baseUrl}/shapes`;
    case "spacing":
      return `${baseUrl}/spacing`;
    case "stroke":
      return `${baseUrl}/shapes#strokes`;
    case "fill":
      return `${baseUrl}/color`;
    case "text":
      return `${baseUrl}/typography`;
    case "effect":
      return `${baseUrl}/elevation`;
    default:
      return baseUrl;
  }
}
