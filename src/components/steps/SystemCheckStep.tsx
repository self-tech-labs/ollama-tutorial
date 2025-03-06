import { useEffect, useState } from 'react';
import { Box, Text, VStack, Spinner, Alert, AlertIcon, AlertTitle, AlertDescription, Button } from '@chakra-ui/react';
import { CheckCircleIcon, WarningIcon, InfoIcon } from '@chakra-ui/icons';
import StepNavigation from '../StepNavigation';
import { useTutorial, TutorialStep } from '../../context/TutorialContext';
import { checkOllamaStatus, getSystemInfo } from '../../utils/ollamaApi';

const SystemCheckStep = () => {
  const { systemInfo, setSystemInfo, isLoading, setIsLoading, setCurrentStep } = useTutorial();
  const [checkComplete, setCheckComplete] = useState(false);
  const [connectionError, setConnectionError] = useState(false);

  useEffect(() => {
    const runSystemCheck = async () => {
      setIsLoading(true);
      setConnectionError(false);
      
      try {
        // Get system information
        const sysInfo = await getSystemInfo();
        
        // Check if Ollama is already installed
        const isInstalled = await checkOllamaStatus();
        
        // Determine recommended model based on system specs
        let recommendedModel = 'llama3';
        
        if (sysInfo.arch === 'arm64') {
          recommendedModel = 'llama3:8b';
        } else if (sysInfo.arch === 'x86_64') {
          recommendedModel = 'llama3:8b';
        }
        
        setSystemInfo({
          os: sysInfo.os,
          arch: sysInfo.arch,
          isOllamaInstalled: isInstalled,
          recommendedModel,
        });
        
        setCheckComplete(true);
      } catch (error) {
        console.error('Error during system check:', error);
        setConnectionError(true);
      } finally {
        setIsLoading(false);
      }
    };
    
    runSystemCheck();
  }, [setSystemInfo, setIsLoading]);

  const handleGoToInstallation = () => {
    setCurrentStep(TutorialStep.INSTALL_OLLAMA);
  };

  return (
    <VStack gap={6} align="stretch">
      <Box textAlign="center" py={4}>
        <Text fontSize="lg" mb={4}>
          We're checking your system to determine the best setup for Ollama.
        </Text>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="blue.200" bg="blue.50">
        <Box display="flex" alignItems="center" mb={2}>
          <InfoIcon color="blue.500" mr={2} />
          <Text fontWeight="bold">What is Ollama?</Text>
        </Box>
        <Text mb={3}>
          Ollama is an open-source tool that allows you to run AI models locally on your computer.
          This ensures your data never leaves your machine, providing privacy and security for sensitive legal documents.
        </Text>
        <Text>
          The system check will determine if Ollama is already installed on your system.
        </Text>
      </Box>

      {isLoading ? (
        <Box textAlign="center" py={8}>
          <Spinner size="xl" color="blue.500" mb={4} />
          <Text>Scanning your system...</Text>
        </Box>
      ) : (
        <VStack gap={4} align="stretch">
          <Box p={4} borderRadius="md" borderWidth="1px" borderColor={systemInfo.os ? "green.300" : "gray.200"}>
            <Box display="flex" alignItems="center">
              {systemInfo.os ? (
                <CheckCircleIcon color="green.500" mr={2} />
              ) : (
                <Spinner size="sm" mr={2} />
              )}
              <Text fontWeight="bold">Operating System</Text>
            </Box>
            <Text ml={6} mt={1}>
              {systemInfo.os ? `Detected: ${systemInfo.os}` : 'Checking...'}
            </Text>
          </Box>

          <Box p={4} borderRadius="md" borderWidth="1px" borderColor={systemInfo.arch ? "green.300" : "gray.200"}>
            <Box display="flex" alignItems="center">
              {systemInfo.arch ? (
                <CheckCircleIcon color="green.500" mr={2} />
              ) : (
                <Spinner size="sm" mr={2} />
              )}
              <Text fontWeight="bold">System Architecture</Text>
            </Box>
            <Text ml={6} mt={1}>
              {systemInfo.arch ? `Detected: ${systemInfo.arch}` : 'Checking...'}
            </Text>
          </Box>

          <Box p={4} borderRadius="md" borderWidth="1px" borderColor={checkComplete ? (systemInfo.isOllamaInstalled ? "green.300" : "orange.300") : "gray.200"}>
            <Box display="flex" alignItems="center">
              {!checkComplete ? (
                <Spinner size="sm" mr={2} />
              ) : systemInfo.isOllamaInstalled ? (
                <CheckCircleIcon color="green.500" mr={2} />
              ) : (
                <WarningIcon color="orange.500" mr={2} />
              )}
              <Text fontWeight="bold">Ollama Installation</Text>
            </Box>
            <Text ml={6} mt={1}>
              {!checkComplete
                ? 'Checking...'
                : systemInfo.isOllamaInstalled
                ? 'Ollama is already installed and running!'
                : 'Ollama is not installed or not running.'}
            </Text>
          </Box>

          {connectionError && (
            <Alert
              status="warning"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="md"
              p={4}
            >
              <AlertIcon boxSize="24px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Connection Issue Detected
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                We couldn't connect to Ollama. This usually means Ollama is not installed or not running.
                <Box mt={3}>
                  <Button
                    colorScheme="blue"
                    onClick={handleGoToInstallation}
                  >
                    Continue to Installation Instructions
                  </Button>
                </Box>
              </AlertDescription>
            </Alert>
          )}

          {checkComplete && !connectionError && (
            <Alert
              status={systemInfo.isOllamaInstalled ? 'success' : 'info'}
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="md"
              p={4}
            >
              <AlertIcon boxSize="24px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                {systemInfo.isOllamaInstalled
                  ? 'Ollama is already installed!'
                  : 'Ready to install Ollama'}
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {systemInfo.isOllamaInstalled
                  ? 'We can proceed to downloading a model for anonymization.'
                  : `Based on your ${systemInfo.os} system with ${systemInfo.arch} architecture, we'll help you install Ollama.`}
              </AlertDescription>
            </Alert>
          )}
        </VStack>
      )}

      <StepNavigation
        nextDisabled={!checkComplete && !connectionError}
        nextLabel={systemInfo.isOllamaInstalled ? 'Choose Model' : 'Install Ollama'}
      />
    </VStack>
  );
};

export default SystemCheckStep; 