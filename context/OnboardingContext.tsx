import React, { createContext, PropsWithChildren, useContext, useState } from 'react';

type OnboardingContextData = {
  hasCompletedOnboarding: boolean;
  completeOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextData | undefined>(undefined);

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return context;
}

export function OnboardingProvider({ children }: PropsWithChildren) {
  const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState(false);

  const completeOnboarding = () => {
    setHasCompletedOnboarding(true);
  };

  return (
    <OnboardingContext.Provider value={{ hasCompletedOnboarding, completeOnboarding }}>
      {children}
    </OnboardingContext.Provider>
  );
} 