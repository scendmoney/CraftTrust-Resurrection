export interface IMessage {
  id: number;
  text: string;
  time: number | Date;
  isMyMessage: boolean;
  author: string;
  image: string;
  avatar: string;
  isMoney?: boolean;
}
