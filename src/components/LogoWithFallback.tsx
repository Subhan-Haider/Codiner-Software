import { useState } from "react";
import codinerLogo from "../../assets/new-logo.png";
import techflowLogoIcon from "../../assets/techflow-logo-icon.png";

type LogoVariant = "icon" | "custom";

interface LogoWithFallbackProps {
    src?: string;
    alt?: string;
    className?: string;
    fallbackSrc?: string;
    useCodinerAsDefault?: boolean;
    variant?: LogoVariant;
    useTechFlow?: boolean;
}

/**
 * Logo component with automatic fallback to Codiner or TechFlow software logos
 * when the primary logo fails to load or is missing.
 * 
 * @param variant - Logo variant: "icon" (TechFlow icon), "custom" (use src)
 * @param useTechFlow - If true, uses TechFlow icon; otherwise uses Codiner branding
 */
export function LogoWithFallback({
    src,
    alt = "Logo",
    className = "",
    fallbackSrc,
    useCodinerAsDefault = true,
    variant = "custom",
    useTechFlow = true,
}: LogoWithFallbackProps) {
    const [hasError, setHasError] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Determine which logo to use based on variant and branding
    const getLogoSrc = () => {
        // If TechFlow icon variant is requested and no error, use it directly
        if (!hasError && useTechFlow && variant === "icon") {
            return techflowLogoIcon;
        }

        // If there's an error with the primary src, or src is not provided
        if (hasError || !src) {
            if (fallbackSrc) return fallbackSrc;

            // If no explicit fallback, use TechFlow icon as fallback if specified
            if (useTechFlow) {
                return techflowLogoIcon;
            }

            // Otherwise, fall back to Codiner branding if useCodinerAsDefault is true
            return useCodinerAsDefault ? codinerLogo : undefined;
        }

        // If primary src is available, no error, and not overridden by TechFlow variant, use src
        return src;
    };

    const logoSrc = getLogoSrc();

    const handleError = () => {
        setHasError(true);
        setIsLoading(false);
    };

    const handleLoad = () => {
        setIsLoading(false);
    };

    if (!logoSrc) {
        return null;
    }

    return (
        <img
            src={logoSrc}
            alt={alt}
            className={className}
            onError={handleError}
            onLoad={handleLoad}
            style={{
                opacity: isLoading ? 0.5 : 1,
                transition: "opacity 0.3s ease-in-out",
            }}
        />
    );
}
