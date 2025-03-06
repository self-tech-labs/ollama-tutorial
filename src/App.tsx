import { Routes, Route, Navigate } from 'react-router-dom';
import { TutorialProvider, useTutorial, TutorialStep } from './context/TutorialContext';
import Layout from './components/Layout';

// Step components
import WelcomeStep from './components/steps/WelcomeStep';
import SystemCheckStep from './components/steps/SystemCheckStep';
import InstallOllamaStep from './components/steps/InstallOllamaStep';
import ChooseModelStep from './components/steps/ChooseModelStep';
import DownloadModelStep from './components/steps/DownloadModelStep';
import TestAnonymizationStep from './components/steps/TestAnonymizationStep';
import CompleteStep from './components/steps/CompleteStep';

// Main app content
const AppContent = () => {
  const { currentStep } = useTutorial();

  // Map steps to components and titles
  const stepConfig = {
    [TutorialStep.WELCOME]: {
      component: <WelcomeStep />,
      title: 'Welcome',
      subtitle: 'Let\'s get started with Ollama for document anonymization',
    },
    [TutorialStep.SYSTEM_CHECK]: {
      component: <SystemCheckStep />,
      title: 'System Check',
      subtitle: 'Checking your system compatibility',
    },
    [TutorialStep.INSTALL_OLLAMA]: {
      component: <InstallOllamaStep />,
      title: 'Install Ollama',
      subtitle: 'Setting up Ollama on your system',
    },
    [TutorialStep.CHOOSE_MODEL]: {
      component: <ChooseModelStep />,
      title: 'Choose a Model',
      subtitle: 'Select the right model for your needs',
    },
    [TutorialStep.DOWNLOAD_MODEL]: {
      component: <DownloadModelStep />,
      title: 'Download Model',
      subtitle: 'Downloading the selected model to your computer',
    },
    [TutorialStep.TEST_ANONYMIZATION]: {
      component: <TestAnonymizationStep />,
      title: 'Test Anonymization',
      subtitle: 'Try out the anonymization capabilities',
    },
    [TutorialStep.COMPLETE]: {
      component: <CompleteStep />,
      title: 'Tutorial Complete',
      subtitle: 'You\'re all set to use Ollama for document anonymization',
    },
  };

  const currentStepConfig = stepConfig[currentStep];

  return (
    <Layout title={currentStepConfig.title} subtitle={currentStepConfig.subtitle}>
      {currentStepConfig.component}
    </Layout>
  );
};

// Main App component with context provider
function App() {
  return (
    <TutorialProvider>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </TutorialProvider>
  );
}

export default App;
