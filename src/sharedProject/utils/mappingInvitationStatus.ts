import { InviteStatusEnum } from 'graphql/_server';

const mappingInvitationStatus = (oldMessage?: InviteStatusEnum | undefined): string => {
  switch (oldMessage) {
    case InviteStatusEnum.Approved:
      return 'Accepted';
    case InviteStatusEnum.Processing:
      return 'Sent';
    case InviteStatusEnum.Rejected:
      return 'Rejected';
    default:
      return '--';
  }
};

export const mappingInvitationStatusReverse = [
  { value: InviteStatusEnum.Approved, label: 'Accepted' },
  { value: InviteStatusEnum.Processing, label: 'Sent' },
  { value: InviteStatusEnum.Rejected, label: 'Rejected' }
];

export default mappingInvitationStatus;
