import { AnalyticsBrowser } from '@customerio/cdp-analytics-browser';

export const analytics = AnalyticsBrowser.load({
  writeKey: process.env.NEXT_PUBLIC_ANALYTICS_WRITE_KEY || ''
});

export default function CustomerIoAnalytics() {
  return null;
}
