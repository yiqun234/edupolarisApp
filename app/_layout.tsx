import { OnboardingProvider, useOnboarding } from '@/context/OnboardingContext';
import { Slot, useRouter, useSegments } from 'expo-router';
import React, { useEffect } from 'react';

function RootLayoutNav() {
    const { hasCompletedOnboarding } = useOnboarding();
    const router = useRouter();
    const segments = useSegments();

    useEffect(() => {
        const inTabsGroup = segments[0] === '(tabs)';

        if (hasCompletedOnboarding && !inTabsGroup) {
            router.replace('/dashboard');
        } else if (!hasCompletedOnboarding && inTabsGroup) {
            router.replace('/onboarding');
        }
    }, [hasCompletedOnboarding, segments]);

    return <Slot />;
}

export default function RootLayout() {
  return (
    <OnboardingProvider>
      <RootLayoutNav />
    </OnboardingProvider>
  );
}
