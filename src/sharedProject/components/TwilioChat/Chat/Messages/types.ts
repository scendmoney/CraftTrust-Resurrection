import { Ref } from 'react';
import { Message } from '@twilio/conversations';

export interface IProps {
  messages: Message[];
  refBottom: Ref<HTMLDivElement> | undefined;
  loadMore: () => void;
  scrollBottom: () => void;
  hasMoreMessages: boolean;
}
