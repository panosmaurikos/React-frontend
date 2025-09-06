// src/components/process-bar/context.tsx
import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';

import { usePathname } from 'src/routes/hooks';

type ProcessBarContextType = {
  steps: string[];
  setSteps: (s: string[]) => void;
  activeStep: number;
  setActiveStep: (n: number) => void;
  totalSteps: number;
};

const ProcessBarContext = createContext<ProcessBarContextType | null>(null);

export function ProcessBarProvider({
  children,
  initialSteps = [],
}: {
  children: React.ReactNode;
  initialSteps?: string[];
}) {
  const pathname = usePathname();
  const [steps, setSteps] = useState<string[]>(initialSteps);
  const [activeStep, setActiveStep] = useState<number>(0);

  // Map pathname to step index
  useEffect(() => {
    // Αν είμαστε σε sign-in, κρατάμε το activeStep στο 0
    if (pathname === '/sign-in') {
      setActiveStep(0);
      return;
    }

    const stepMap: Record<string, number> = {
      '/register': 0,
      '/register/personal': 1,
      '/register/shipping': 2,
      '/register/confirmation': 3,
      '/dashboard': 3,
    };

    const step = stepMap[pathname] ?? 0;
    setActiveStep(step);
  }, [pathname]);

  const value = useMemo(
    () => ({
      steps,
      setSteps,
      activeStep,
      setActiveStep,
      totalSteps: steps.length,
    }),
    [steps, activeStep]
  );

  return <ProcessBarContext.Provider value={value}>{children}</ProcessBarContext.Provider>;
}

export function useProcessBarContext() {
  const ctx = useContext(ProcessBarContext);
  if (!ctx) {
    throw new Error('useProcessBarContext must be used within a ProcessBarProvider');
  }
  return ctx;
}