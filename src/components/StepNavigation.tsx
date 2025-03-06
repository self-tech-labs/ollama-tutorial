import { Button, Flex } from '@chakra-ui/react';
import { useTutorial, TutorialStep } from '../context/TutorialContext';

type StepNavigationProps = {
  onNext?: () => void;
  onBack?: () => void;
  nextDisabled?: boolean;
  backDisabled?: boolean;
  nextLabel?: string;
  backLabel?: string;
};

const StepNavigation = ({
  onNext,
  onBack,
  nextDisabled = false,
  backDisabled = false,
  nextLabel = 'Suivant',
  backLabel = 'Retour',
}: StepNavigationProps) => {
  const { currentStep, setCurrentStep } = useTutorial();

  const handleNext = () => {
    if (onNext) {
      onNext();
    } else {
      // Default navigation logic
      switch (currentStep) {
        case TutorialStep.WELCOME:
          setCurrentStep(TutorialStep.SYSTEM_CHECK);
          break;
        case TutorialStep.SYSTEM_CHECK:
          setCurrentStep(TutorialStep.INSTALL_OLLAMA);
          break;
        case TutorialStep.INSTALL_OLLAMA:
          setCurrentStep(TutorialStep.CHOOSE_MODEL);
          break;
        case TutorialStep.CHOOSE_MODEL:
          setCurrentStep(TutorialStep.DOWNLOAD_MODEL);
          break;
        case TutorialStep.DOWNLOAD_MODEL:
          setCurrentStep(TutorialStep.TEST_ANONYMIZATION);
          break;
        case TutorialStep.TEST_ANONYMIZATION:
          setCurrentStep(TutorialStep.COMPLETE);
          break;
        default:
          break;
      }
    }
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      // Default navigation logic
      switch (currentStep) {
        case TutorialStep.SYSTEM_CHECK:
          setCurrentStep(TutorialStep.WELCOME);
          break;
        case TutorialStep.INSTALL_OLLAMA:
          setCurrentStep(TutorialStep.SYSTEM_CHECK);
          break;
        case TutorialStep.CHOOSE_MODEL:
          setCurrentStep(TutorialStep.INSTALL_OLLAMA);
          break;
        case TutorialStep.DOWNLOAD_MODEL:
          setCurrentStep(TutorialStep.CHOOSE_MODEL);
          break;
        case TutorialStep.TEST_ANONYMIZATION:
          setCurrentStep(TutorialStep.DOWNLOAD_MODEL);
          break;
        case TutorialStep.COMPLETE:
          setCurrentStep(TutorialStep.TEST_ANONYMIZATION);
          break;
        default:
          break;
      }
    }
  };

  return (
    <Flex mt={8} width="100%" justifyContent="space-between">
      {currentStep !== TutorialStep.WELCOME ? (
        <Button
          onClick={handleBack}
          disabled={backDisabled}
          variant="outline"
          colorScheme="teal"
          size={{ base: "md", md: "lg" }}
          px={{ base: 4, md: 6 }}
          borderRadius="md"
          _hover={{ bg: 'teal.50' }}
        >
          {backLabel}
        </Button>
      ) : (
        <div></div> // Empty div to maintain flex layout
      )}
      
      {currentStep !== TutorialStep.COMPLETE && (
        <Button
          onClick={handleNext}
          disabled={nextDisabled}
          colorScheme="teal"
          size={{ base: "md", md: "lg" }}
          px={{ base: 4, md: 6 }}
          borderRadius="md"
          boxShadow="md"
          _hover={{ transform: 'translateY(-2px)', boxShadow: 'lg' }}
          transition="all 0.2s"
        >
          {nextLabel}
        </Button>
      )}
    </Flex>
  );
};

export default StepNavigation; 