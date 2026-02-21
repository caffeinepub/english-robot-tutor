import { useState } from 'react';
import { RobotCharacter } from './components/RobotCharacter';
import { VoiceInput } from './components/VoiceInput';
import { ConversationHistory } from './components/ConversationHistory';
import { useConversation } from './hooks/useConversation';

function App() {
  const [robotState, setRobotState] = useState<'idle' | 'listening' | 'speaking'>('idle');
  const { sendMessage, conversationLog, isProcessing } = useConversation();

  const handleVoiceStart = () => {
    setRobotState('listening');
  };

  const handleVoiceEnd = () => {
    setRobotState('idle');
  };

  const handleTranscript = async (transcript: string) => {
    if (transcript.trim()) {
      setRobotState('speaking');
      await sendMessage(transcript);
      setTimeout(() => setRobotState('idle'), 2000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-100 via-purple-50 to-pink-100 dark:from-slate-900 dark:via-purple-950 dark:to-slate-900">
      <header className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-b-4 border-primary shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-primary via-purple-600 to-pink-600 bg-clip-text text-transparent">
            🤖 English Robot Tutor
          </h1>
          <p className="text-center text-lg mt-2 text-muted-foreground font-medium">
            Practice your English with your friendly robot teacher!
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Robot and Voice Input */}
          <div className="space-y-6">
            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-primary/20">
              <RobotCharacter state={robotState} />
            </div>

            <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-primary/20">
              <VoiceInput
                onTranscript={handleTranscript}
                onStart={handleVoiceStart}
                onEnd={handleVoiceEnd}
                disabled={isProcessing}
              />
            </div>
          </div>

          {/* Right Column: Conversation History */}
          <div className="bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border-4 border-primary/20 lg:min-h-[600px]">
            <ConversationHistory conversationLog={conversationLog} isLoading={isProcessing} />
          </div>
        </div>
      </main>

      <footer className="mt-16 py-8 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm border-t-4 border-primary/20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground text-lg font-medium">
            © {new Date().getFullYear()} Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 font-bold underline decoration-2 underline-offset-4"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;
