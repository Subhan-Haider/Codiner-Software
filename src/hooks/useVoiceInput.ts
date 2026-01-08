import { useState, useCallback, useRef } from "react";
import { showError } from "@/lib/toast";

export function useVoiceInput() {
    const [isListening, setIsListening] = useState(false);
    const recognitionRef = useRef<any>(null);

    const startListening = useCallback((onResult: (text: string) => void) => {
        // Check for browser support
        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

        if (!SpeechRecognition) {
            showError("Speech recognition is not supported in this browser.");
            return;
        }

        try {
            if (!recognitionRef.current) {
                recognitionRef.current = new SpeechRecognition();
                recognitionRef.current.continuous = false;
                recognitionRef.current.interimResults = false;
                recognitionRef.current.lang = "en-US";

                recognitionRef.current.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    onResult(transcript);
                    setIsListening(false);
                };

                recognitionRef.current.onend = () => {
                    setIsListening(false);
                };

                recognitionRef.current.onerror = (event: any) => {
                    console.error("Speech recognition error", event.error);
                    setIsListening(false);
                    if (event.error !== "no-speech") {
                        showError(`Speech error: ${event.error}`);
                    }
                };
            }

            recognitionRef.current.start();
            setIsListening(true);
        } catch (err) {
            console.error("Failed to start speech recognition", err);
            setIsListening(false);
        }
    }, []);

    const stopListening = useCallback(() => {
        if (recognitionRef.current) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    }, []);

    const toggleListening = useCallback((onResult: (text: string) => void) => {
        if (isListening) {
            stopListening();
        } else {
            startListening(onResult);
        }
    }, [isListening, startListening, stopListening]);

    return {
        isListening,
        startListening,
        stopListening,
        toggleListening
    };
}
