export interface MainTextMatchedSubstrings {
  offset: number;
  length: number;
}

export interface PlaceType {
  description: string;
  structured_formatting: StructuredFormatting;
  place_id: string;
}
export interface StructuredFormatting {
  main_text: string;
  secondary_text: string;
  main_text_matched_substrings?: readonly MainTextMatchedSubstrings[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type UnknownGoogleType = any;

export type TypeGoogleMapsInput = {
  latitude: string;
  longitude: string;
  address: string;
  googlePlaceId: string;
  timezone: string;
};
