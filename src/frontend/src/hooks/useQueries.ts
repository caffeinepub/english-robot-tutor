import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { ConversationTurn } from '../backend';

export function useGetConversationLog() {
  const { actor, isFetching } = useActor();

  return useQuery<ConversationTurn[]>({
    queryKey: ['conversationLog'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getConversationLog();
    },
    enabled: !!actor && !isFetching,
  });
}
