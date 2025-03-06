import { useState } from 'react';
import { Box, Text, VStack, Progress, Button, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import StepNavigation from '../StepNavigation';
import { useTutorial, TutorialStep } from '../../context/TutorialContext';
import { downloadModel } from '../../utils/ollamaApi';

const DownloadModelStep = () => {
  const { systemInfo, isLoading, setIsLoading, setCurrentStep } = useTutorial();
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadComplete, setDownloadComplete] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOllamaNotRunning, setIsOllamaNotRunning] = useState(false);

  const handleDownload = async () => {
    setDownloadStarted(true);
    setIsLoading(true);
    setError(null);
    setIsOllamaNotRunning(false);
    
    try {
      const success = await downloadModel(
        systemInfo.recommendedModel, 
        (progress) => {
          setDownloadProgress(progress);
        },
        (errorMessage) => {
          setError(errorMessage);
          if (errorMessage.includes('not running or not installed')) {
            setIsOllamaNotRunning(true);
          }
        }
      );
      
      if (success) {
        setDownloadComplete(true);
      } else if (!error) {
        setError('Failed to download the model. Please try again.');
      }
    } catch (error) {
      console.error('Error downloading model:', error);
      setError('An error occurred while downloading the model. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToInstallation = () => {
    setCurrentStep(TutorialStep.INSTALL_OLLAMA);
  };

  return (
    <VStack gap={6} align="stretch">
      <Box textAlign="center" py={4}>
        <Text fontSize="lg" mb={4}>
          Download the {systemInfo.recommendedModel} Model
        </Text>
        <Text fontSize="md" color="gray.600">
          This model will be downloaded and stored locally on your computer.
        </Text>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="blue.200" bg="blue.50">
        <Text fontWeight="bold" mb={4} fontSize="lg">
          About this model
        </Text>
        <Text mb={3}>
          The {systemInfo.recommendedModel} model is optimized for text anonymization tasks.
          It can identify and replace personal information while preserving the context and meaning of your documents.
        </Text>
        <Text>
          The download size is approximately 4-8 GB depending on the model, and it will be stored on your local machine.
        </Text>
      </Box>

      {!downloadStarted ? (
        <Box textAlign="center" py={4}>
          <Button
            colorScheme="blue"
            size="lg"
            onClick={handleDownload}
            disabled={isLoading}
          >
            Start Download
          </Button>
          <Text fontSize="sm" color="gray.500" mt={2}>
            This may take several minutes depending on your internet connection.
          </Text>
          <Text fontSize="sm" color="orange.500" mt={2}>
            Make sure Ollama is installed and running before starting the download.
          </Text>
        </Box>
      ) : (
        <Box>
          <Text fontWeight="bold" mb={2}>
            Download Progress
          </Text>
          <Progress 
            value={downloadProgress} 
            size="lg" 
            colorScheme={downloadComplete ? "green" : "blue"} 
            borderRadius="md"
            mb={4}
          />
          
          {downloadComplete ? (
            <Alert
              status="success"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="md"
              p={4}
              mt={4}
            >
              <CheckCircleIcon boxSize="24px" mr={0} mb={2} />
              <AlertTitle mt={2} mb={1} fontSize="lg">
                Download Complete!
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                The model has been successfully downloaded and is ready to use for anonymization.
              </AlertDescription>
            </Alert>
          ) : error ? (
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              borderRadius="md"
              p={4}
              mt={4}
            >
              <AlertIcon boxSize="24px" mr={0} mb={2} />
              <AlertTitle mt={2} mb={1} fontSize="lg">
                {isOllamaNotRunning ? "Ollama Not Running" : "Download Failed"}
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {error}
                {isOllamaNotRunning && (
                  <Box mt={2}>
                    <Text mb={2}>Please make sure Ollama is installed and running before trying again.</Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={handleGoToInstallation}
                      mt={2}
                    >
                      Go to Installation Instructions
                    </Button>
                  </Box>
                )}
              </AlertDescription>
              <Button
                mt={4}
                colorScheme="red"
                onClick={handleDownload}
                disabled={isLoading}
              >
                Try Again
              </Button>
            </Alert>
          ) : (
            <Text textAlign="center" color="gray.600">
              Downloading... {downloadProgress}%
            </Text>
          )}
        </Box>
      )}

      <StepNavigation
        nextDisabled={!downloadComplete}
        nextLabel="Continue to Anonymization"
      />
    </VStack>
  );
};

export default DownloadModelStep; 