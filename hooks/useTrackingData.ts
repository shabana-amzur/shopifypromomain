import { useEffect, useState } from 'react';

export interface TrackingData {
  utmSource: string;
  utmMedium: string;
  utmCampaign: string;
  utmTerm: string;
  utmContent: string;
  referrer: string;
  landingPage: string;
}

const STORAGE_KEY = 'shopifypromo_tracking';
const DEFAULT_TRACKING: TrackingData = {
  utmSource: '',
  utmMedium: '',
  utmCampaign: '',
  utmTerm: '',
  utmContent: '',
  referrer: '',
  landingPage: '',
};

// Stores the latest non-empty value so we can attribute even after navigation.
function persistTracking(data: TrackingData) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.warn('Unable to persist tracking data', error);
  }
}

function readStoredTracking(): TrackingData | null {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return null;
    }
    const parsed = JSON.parse(raw) as Partial<TrackingData>;
    return {
      ...DEFAULT_TRACKING,
      ...parsed,
    };
  } catch (error) {
    console.warn('Unable to read tracking data', error);
    return null;
  }
}

export function useTrackingData(): TrackingData {
  const [trackingData, setTrackingData] = useState<TrackingData>(DEFAULT_TRACKING);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const stored = readStoredTracking();
    const params = new URLSearchParams(window.location.search);
    const nextTracking: TrackingData = {
      ...DEFAULT_TRACKING,
      ...stored,
    };

    const paramMap: Array<[keyof TrackingData, string]> = [
      ['utmSource', 'utm_source'],
      ['utmMedium', 'utm_medium'],
      ['utmCampaign', 'utm_campaign'],
      ['utmTerm', 'utm_term'],
      ['utmContent', 'utm_content'],
    ];

    paramMap.forEach(([key, queryKey]) => {
      const value = params.get(queryKey);
      if (value) {
        nextTracking[key] = value;
      }
    });

    if (document.referrer) {
      nextTracking.referrer = document.referrer;
    }

    if (window.location) {
      nextTracking.landingPage = `${window.location.pathname}${window.location.search}`;
    }

    setTrackingData(nextTracking);
    persistTracking(nextTracking);
  }, []);

  return trackingData;
}
