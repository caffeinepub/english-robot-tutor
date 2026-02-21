import { Lightbulb } from 'lucide-react';

interface CorrectionFeedbackProps {
  correction: string;
}

export function CorrectionFeedback({ correction }: CorrectionFeedbackProps) {
  return (
    <div className="flex justify-center px-4">
      <div className="bg-gradient-to-br from-yellow-100 to-orange-100 dark:from-yellow-900/30 dark:to-orange-900/30 border-3 border-yellow-500 dark:border-yellow-600 rounded-2xl p-5 max-w-[90%] shadow-lg">
        <div className="flex items-start space-x-3">
          <div className="flex-shrink-0 mt-1">
            <Lightbulb className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
          </div>
          <div>
            <p className="text-sm font-bold text-yellow-800 dark:text-yellow-300 mb-1">
              💡 Learning Tip:
            </p>
            <p className="text-base text-yellow-900 dark:text-yellow-200 font-medium">
              {correction}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
