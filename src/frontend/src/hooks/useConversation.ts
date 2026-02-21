import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ConversationTurn } from '../backend';

export function useConversation() {
  const { actor, isFetching } = useActor();
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState(false);

  const { data: conversationLog = [] } = useQuery<ConversationTurn[]>({
    queryKey: ['conversationLog'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConversationLog();
    },
    enabled: !!actor && !isFetching,
  });

  const sendMessageMutation = useMutation({
    mutationFn: async (userInput: string) => {
      if (!actor) throw new Error('Actor not initialized');
      return actor.processInput(userInput);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['conversationLog'] });
    },
  });

  const sendMessage = async (userInput: string) => {
    setIsProcessing(true);
    try {
      await sendMessageMutation.mutateAsync(userInput);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    conversationLog,
    sendMessage,
    isProcessing,
  };
}
