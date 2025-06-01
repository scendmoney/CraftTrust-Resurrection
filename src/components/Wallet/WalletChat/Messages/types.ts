import { Ref } from 'react';

import { IMessage } from '../types';

export interface IProps {
  messages: IMessage[];
  refBottom: Ref<HTMLDivElement> | undefined;
  loadMore: () => void;
  scrollBottom: () => void;
  hasMoreMessages: boolean;
}
