import { createContext, useContext, useState, ReactNode } from 'react';

// Define the system info type
export type SystemInfo = {
  os: string | null;
  arch: string | null;
  isOllamaInstalled: boolean;
  recommendedModel: string;
};

// Define the tutorial steps
export enum TutorialStep {
  WELCOME = 'welcome',
  SYSTEM_CHECK = 'system_check',
  INSTALL_OLLAMA = 'install_ollama',
  CHOOSE_MODEL = 'choose_model',
  DOWNLOAD_MODEL = 'download_model',
  TEST_ANONYMIZATION = 'test_anonymization',
  COMPLETE = 'complete',
}

// Define the context type
type TutorialContextType = {
  currentStep: TutorialStep;
  setCurrentStep: (step: TutorialStep) => void;
  systemInfo: SystemInfo;
  setSystemInfo: (info: SystemInfo) => void;
  sampleText: string;
  setSampleText: (text: string) => void;
  anonymizedText: string;
  setAnonymizedText: (text: string) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

// Create the context with default values
const TutorialContext = createContext<TutorialContextType>({
  currentStep: TutorialStep.WELCOME,
  setCurrentStep: () => {},
  systemInfo: {
    os: null,
    arch: null,
    isOllamaInstalled: false,
    recommendedModel: '',
  },
  setSystemInfo: () => {},
  sampleText: '',
  setSampleText: () => {},
  anonymizedText: '',
  setAnonymizedText: () => {},
  isLoading: false,
  setIsLoading: () => {},
});

// Create a provider component
export const TutorialProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState<TutorialStep>(TutorialStep.WELCOME);
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    os: null,
    arch: null,
    isOllamaInstalled: false,
    recommendedModel: 'llama3',
  });
  const [sampleText, setSampleText] = useState<string>('');
  const [anonymizedText, setAnonymizedText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <TutorialContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        systemInfo,
        setSystemInfo,
        sampleText,
        setSampleText,
        anonymizedText,
        setAnonymizedText,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TutorialContext.Provider>
  );
};

// Create a custom hook to use the context
export const useTutorial = () => useContext(TutorialContext); 