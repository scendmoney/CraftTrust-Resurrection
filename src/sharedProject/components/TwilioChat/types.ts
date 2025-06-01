export interface IProps {
  token: string | undefined | null;
  facilityId: string | number | undefined;
  chatSid: string | undefined | null;
  isOnCultivator?: boolean;
  isUserSelected?: boolean;
}
