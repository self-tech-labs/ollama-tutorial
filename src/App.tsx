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

  // Map steps to components and titles (translated to French)
  const stepConfig = {
    [TutorialStep.WELCOME]: {
      component: <WelcomeStep />,
      title: 'Bienvenue',
      subtitle: 'Commençons avec Ollama pour l\'anonymisation de documents',
    },
    [TutorialStep.SYSTEM_CHECK]: {
      component: <SystemCheckStep />,
      title: 'Vérification du Système',
      subtitle: 'Vérification de la compatibilité de votre système',
    },
    [TutorialStep.INSTALL_OLLAMA]: {
      component: <InstallOllamaStep />,
      title: 'Installation d\'Ollama',
      subtitle: 'Configuration d\'Ollama sur votre système',
    },
    [TutorialStep.CHOOSE_MODEL]: {
      component: <ChooseModelStep />,
      title: 'Choisir un Modèle',
      subtitle: 'Sélectionnez le modèle adapté à vos besoins',
    },
    [TutorialStep.DOWNLOAD_MODEL]: {
      component: <DownloadModelStep />,
      title: 'Télécharger le Modèle',
      subtitle: 'Téléchargement du modèle sélectionné sur votre ordinateur',
    },
    [TutorialStep.TEST_ANONYMIZATION]: {
      component: <TestAnonymizationStep />,
      title: 'Tester l\'Anonymisation',
      subtitle: 'Essayez les capacités d\'anonymisation',
    },
    [TutorialStep.COMPLETE]: {
      component: <CompleteStep />,
      title: 'Tutoriel Terminé',
      subtitle: 'Vous êtes prêt à utiliser Ollama pour l\'anonymisation de documents',
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
