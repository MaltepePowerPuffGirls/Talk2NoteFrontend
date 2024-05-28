import { useState, useEffect, useRef } from "react";

const useSpeechToText = (options) => {
  const [isListening, setIsListening] = useState(false);
  const [interimTranscript, setInterimTranscript] = useState("");
  const [finalTranscript, setFinalTranscript] = useState("");
  const [error, setError] = useState(null);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (!("webkitSpeechRecognition" in window)) {
      console.error("Web speech API is not supported");
      return;
    }

    recognitionRef.current = new window.webkitSpeechRecognition();
    const recognition = recognitionRef.current;
    recognition.interimResults = true;
    recognition.lang = options.lang || "en-US";
    recognition.continuous = options.continuous || false;

    recognition.onresult = (event) => {
      let interimText = "";
      let finalText = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          finalText += event.results[i][0].transcript + " ";
        } else {
          interimText += event.results[i][0].transcript;
        }
      }

      setInterimTranscript(interimText);
      setFinalTranscript((prev) => prev + finalText);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error: ", event.error);
      setError(event.error);
      if (event.error === "no-speech") {
        console.log("No speech was detected. Please try again.");
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    return () => {
      recognition.stop();
    };
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setError(null); // Clear previous errors
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const saveValue = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setFinalTranscript("");
      setIsListening(false);
    }
  };

  return {
    isListening,
    interimTranscript,
    finalTranscript,
    setFinalTranscript,
    startListening,
    stopListening,
    saveValue,
    error,
  };
};

export default useSpeechToText;
