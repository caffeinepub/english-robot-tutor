import { useEffect, useState } from 'react';

interface RobotCharacterProps {
  state: 'idle' | 'listening' | 'speaking';
}

export function RobotCharacter({ state }: RobotCharacterProps) {
  const [bounce, setBounce] = useState(false);

  useEffect(() => {
    if (state === 'speaking') {
      setBounce(true);
      const timer = setTimeout(() => setBounce(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [state]);

  const getStateMessage = () => {
    switch (state) {
      case 'listening':
        return "I'm listening... 👂";
      case 'speaking':
        return "Let me help you! 💬";
      default:
        return "Ready to practice! 🎯";
    }
  };

  const getStateColor = () => {
    switch (state) {
      case 'listening':
        return 'from-green-400 to-emerald-500';
      case 'speaking':
        return 'from-blue-400 to-purple-500';
      default:
        return 'from-yellow-400 to-orange-500';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <div
        className={`relative transition-transform duration-300 ${
          bounce ? 'animate-bounce' : ''
        } ${state === 'listening' ? 'scale-110' : 'scale-100'}`}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${getStateColor()} rounded-full blur-2xl opacity-50 animate-pulse`}
        />
        <img
          src="/assets/generated/robot-character.dim_512x512.png"
          alt="Friendly Robot Teacher"
          className="relative w-64 h-64 object-contain drop-shadow-2xl"
        />
      </div>

      <div
        className={`px-8 py-4 rounded-full bg-gradient-to-r ${getStateColor()} shadow-lg transform transition-all duration-300`}
      >
        <p className="text-white text-xl md:text-2xl font-bold text-center">{getStateMessage()}</p>
      </div>

      {state === 'listening' && (
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-75" />
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse delay-150" />
        </div>
      )}
    </div>
  );
}
