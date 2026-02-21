import { ScrollArea } from '@/components/ui/scroll-area';
import { CorrectionFeedback } from './CorrectionFeedback';
import type { ConversationTurn } from '../backend';
import { Loader2 } from 'lucide-react';

interface ConversationHistoryProps {
  conversationLog: ConversationTurn[];
  isLoading?: boolean;
}

export function ConversationHistory({ conversationLog, isLoading }: ConversationHistoryProps) {
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
          💬 Conversation
        </h2>
        <p className="text-muted-foreground text-lg">
          Your practice session with the robot
        </p>
      </div>

      <ScrollArea className="flex-1 pr-4">
        {conversationLog.length === 0 && !isLoading ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🎯</div>
            <p className="text-muted-foreground text-xl font-medium">
              Start speaking to begin your practice!
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {conversationLog.map((turn, index) => (
              <div key={index} className="space-y-4">
                {/* User Message */}
                <div className="flex justify-end">
                  <div className="bg-gradient-to-br from-blue-500 to-purple-600 text-white rounded-3xl rounded-tr-sm px-6 py-4 max-w-[85%] shadow-lg">
                    <p className="text-sm font-bold mb-1 opacity-90">You:</p>
                    <p className="text-lg font-medium">{turn.user}</p>
                  </div>
                </div>

                {/* Robot Response */}
                <div className="flex justify-start">
                  <div className="bg-gradient-to-br from-green-500 to-emerald-600 text-white rounded-3xl rounded-tl-sm px-6 py-4 max-w-[85%] shadow-lg">
                    <p className="text-sm font-bold mb-1 opacity-90">🤖 Robot:</p>
                    <p className="text-lg font-medium">{turn.robot}</p>
                  </div>
                </div>

                {/* Correction Feedback */}
                {turn.correction && <CorrectionFeedback correction={turn.correction} />}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted rounded-3xl rounded-tl-sm px-6 py-4 shadow-lg">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-5 h-5 animate-spin text-primary" />
                    <p className="text-muted-foreground font-medium">Robot is thinking...</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}
