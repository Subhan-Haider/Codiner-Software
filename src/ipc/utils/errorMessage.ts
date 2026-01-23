import log from "electron-log";

const logger = log.scope("error_utils");

/**
 * Attempts to parse an AI provider error message and extract a more user-friendly
 * description, especially when the error details are encoded as JSON.
 */
export function parseAiErrorMessage(error: any): string {
    let errorMessage = error?.message || String(error);

    try {
        // Try to parse error details if it looks like JSON or contains JSON details
        if (errorMessage.includes("Details:")) {
            const detailsStr = errorMessage.split("Details:")[1]?.trim();
            if (detailsStr) {
                const details = JSON.parse(detailsStr);

                // Handle standard AI SDK / OpenRouter / Provider metadata structure
                const rawJson = details.error?.metadata?.raw;
                if (rawJson) {
                    try {
                        const rawDetails = JSON.parse(rawJson);
                        // Some providers nest the error message under { error: { message: "..." } }
                        // others just { error: "..." }
                        const nestedMsg = rawDetails.error?.message || rawDetails.error;
                        if (nestedMsg && typeof nestedMsg === "string") {
                            return nestedMsg;
                        }
                    } catch {
                        // If internal JSON parsing fails, fall through
                    }
                }

                // Fallback to direct error message in details
                const detailsMsg = details.error?.message || details.message;
                if (detailsMsg && typeof detailsMsg === "string") {
                    return detailsMsg;
                }
            }
        }

        // Check if the whole message is a JSON string (sometimes happens)
        if (errorMessage.trim().startsWith("{")) {
            const details = JSON.parse(errorMessage);
            const nestedMsg = details.error?.message || details.message;
            if (nestedMsg && typeof nestedMsg === "string") {
                return nestedMsg;
            }
        }
    } catch (e) {
        logger.debug("Failed to parse error details as JSON:", e);
    }

    // Handle common specific patterns if not caught by JSON parsing
    if (errorMessage.includes("No endpoints found matching your data policy")) {
        return `OpenRouter error: No models match your data policy. This usually happens when trying to use free models without allowing "Free model publication" in your settings. Please configure your data policy at: https://openrouter.ai/settings/privacy`;
    }

    if (errorMessage.includes("quota") || errorMessage.includes("billing") || errorMessage.includes("402")) {
        return "Your API is not working: Quota or spend limit exceeded. Please check your plan and billing details.";
    }

    if (errorMessage.includes("fetch failed") || errorMessage.includes("ECONNREFUSED") || errorMessage.includes("Failed to fetch") || errorMessage.includes("ETIMEDOUT")) {
        if (errorMessage.includes("11434")) {
            return "Your API is not working: Could not connect to Ollama. Ensure it is running at http://localhost:11434";
        }
        if (errorMessage.includes("1234")) {
            return "Your API is not working: Could not connect to LM Studio. Ensure it is running at http://localhost:1234 (default)";
        }
        return "Your API is not working: Connection failed. The AI server is unreachable. Please check your network or provider settings.";
    }

    if (errorMessage.includes("key") && (errorMessage.includes("invalid") || errorMessage.includes("incorrect"))) {
        return `Your API is not working: Invalid API key. Please update your settings with a valid key.`;
    }

    return `Your API is not working: ${errorMessage}`;
}
