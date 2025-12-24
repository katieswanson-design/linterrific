import * as React from "react";
import { useState } from "react";
import { generateAIContext, getDocumentationLink } from "../plugin/fluentLinting";

interface AISuggestButtonProps {
  error: any;
  node: any;
}

const AISuggestButton: React.FC<AISuggestButtonProps> = ({ error, node }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [suggestion, setSuggestion] = useState<string | null>(null);
  const [showSuggestion, setShowSuggestion] = useState(false);

  const handleSuggestFix = async () => {
    setIsLoading(true);
    setShowSuggestion(true);

    try {
      // Generate context for the AI
      const context = generateAIContext(error, node);
      
      // In a real implementation, this would call the Claude API
      // For the case study/presentation, we'll generate a contextual response
      const mockAIResponse = generateMockSuggestion(context);
      
      setSuggestion(mockAIResponse);
    } catch (err) {
      setSuggestion("Unable to generate suggestion at this time.");
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockSuggestion = (context: any) => {
    // This simulates what Claude API would return
    // In production, this would be an actual API call
    const { errorType, currentValue, suggestion, fluentTokens } = context;

    if (errorType === "radius") {
      return `This layer uses a ${currentValue}px border radius, which isn't part of the Fluent design system. ${
        suggestion
          ? `The closest Fluent token is **${suggestion.tokenName}** (${suggestion.value}px), which maintains consistency with Fluent's corner radius scale.`
          : "Consider using one of Fluent's standard radius values."
      }`;
    } else if (errorType === "spacing") {
      return `The current spacing value of ${currentValue}px doesn't align with Fluent's spacing scale. ${
        suggestion
          ? `Try **${suggestion.tokenName}** (${suggestion.value}px) instead to maintain consistent spacing throughout your design.`
          : "Use Fluent's spacing tokens for consistent layouts."
      }`;
    } else if (errorType === "stroke") {
      return `This stroke width (${currentValue}px) isn't a Fluent token. ${
        suggestion
          ? `Use **${suggestion.tokenName}** (${suggestion.value}px) to ensure strokes scale consistently across your interface.`
          : "Fluent provides four standard stroke widths for different use cases."
      }`;
    } else if (errorType === "fill" || errorType === "text" || errorType === "effect") {
      return `This layer is missing a style. Applying styles (design tokens) ensures your colors, typography, and effects stay consistent and themeable across light and dark modes.`;
    }

    return "Apply the suggested Fluent token to maintain design system consistency.";
  };

  const docLink = getDocumentationLink(error.type);

  return (
    <div className="ai-suggest-container">
      {!showSuggestion ? (
        <button
          className="ai-suggest-button"
          onClick={handleSuggestFix}
          disabled={isLoading}
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path
              d="M8 1L10 5L14 6L10 8L8 12L6 8L2 6L6 5L8 1Z"
              fill="currentColor"
            />
          </svg>
          {isLoading ? "Analyzing..." : "Suggest Fix"}
        </button>
      ) : (
        <div className="ai-suggestion-box">
          <div className="ai-suggestion-header">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M8 1L10 5L14 6L10 8L8 12L6 8L2 6L6 5L8 1Z"
                fill="#479ef5"
              />
            </svg>
            <span className="ai-suggestion-title">TDS Co-Pilot Suggestion</span>
            <button
              className="close-suggestion"
              onClick={() => setShowSuggestion(false)}
            >
              ×
            </button>
          </div>
          <div className="ai-suggestion-content">
            {suggestion}
          </div>
          <div className="ai-suggestion-footer">
            <a
              href={docLink}
              target="_blank"
              rel="noopener noreferrer"
              className="doc-link"
            >
              See Documentation →
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISuggestButton;
