import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Mic, MicOff, Volume2 } from 'lucide-react';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';

interface VoiceInputProps {
  onTranscript: (transcript: string) => void;
  onStart?: () => void;
  onEnd?: () => void;
  disabled?: boolean;
}

export function VoiceInput({ onTranscript, onStart, onEnd, disabled }: VoiceInputProps) {
  const { transcript, isListening, startListening, stopListening, isSupported, error } =
    useSpeechRecognition();
  const [lastTranscript, setLastTranscript] = useState('');

  useEffect(() => {
    if (transcript && transcript !== lastTranscript && !isListening) {
      setLastTranscript(transcript);
      onTranscript(transcript);
    }
  }, [transcript, isListening, lastTranscript, onTranscript]);

  const handleToggle = () => {
    if (isListening) {
      stopListening();
      onEnd?.();
    } else {
      startListening();
      onStart?.();
    }
  };

  if (!isSupported) {
    return (
      <div className="text-center space-y-4">
        <div className="bg-destructive/10 border-2 border-destructive rounded-2xl p-6">
          <Volume2 className="w-12 h-12 mx-auto mb-3 text-destructive" />
          <p className="text-destructive font-bold text-lg">
            Voice input is not supported in your browser.
          </p>
          <p className="text-muted-foreground mt-2">
            Please try using Chrome, Edge, or Safari.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          🎤 Speak to Practice
        </h2>
        <p className="text-muted-foreground text-lg">
          Click the microphone and say something in English!
        </p>
      </div>

      <div className="flex flex-col items-center space-y-4">
        <Button
          onClick={handleToggle}
          disabled={disabled}
          size="lg"
          className={`w-32 h-32 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 ${
            isListening
              ? 'bg-gradient-to-br from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 animate-pulse'
              : 'bg-gradient-to-br from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
          }`}
        >
          {isListening ? (
            <MicOff className="w-16 h-16 text-white" />
          ) : (
            <Mic className="w-16 h-16 text-white" />
          )}
        </Button>

        <p className="text-center font-bold text-xl">
          {isListening ? (
            <span className="text-red-600 dark:text-red-400">🔴 Recording...</span>
          ) : (
            <span className="text-green-600 dark:text-green-400">Press to speak</span>
          )}
        </p>
      </div>

      {transcript && (
        <div className="bg-primary/10 border-2 border-primary rounded-2xl p-6">
          <p className="text-sm font-bold text-primary mb-2">You said:</p>
          <p className="text-lg text-foreground font-medium">{transcript}</p>
        </div>
      )}

      {error && (
        <div className="bg-destructive/10 border-2 border-destructive rounded-2xl p-4">
          <p className="text-destructive font-medium text-center">{error}</p>
        </div>
      )}
    </div>
  );
}
