import { useState } from 'react';
import { Box, Text, VStack, Textarea, Button, Spinner, Flex, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import StepNavigation from '../StepNavigation';
import { useTutorial, TutorialStep } from '../../context/TutorialContext';
import { anonymizeText } from '../../utils/ollamaApi';

const TestAnonymizationStep = () => {
  const { systemInfo, sampleText, setSampleText, anonymizedText, setAnonymizedText, isLoading, setIsLoading, setCurrentStep } = useTutorial();
  const [hasAnonymized, setHasAnonymized] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isOllamaNotRunning, setIsOllamaNotRunning] = useState(false);

  // Sample legal text
  const sampleLegalText = `
Client: John Smith
Date of Birth: 05/12/1980
Address: 123 Main Street, New York, NY 10001
Phone: (555) 123-4567
Email: john.smith@example.com
Case Number: ABC-12345

Dear Mr. Smith,

This letter is to confirm our meeting on June 15, 2023, at 2:00 PM regarding your divorce proceedings against Jane Smith. We will discuss the division of assets located at 456 Park Avenue and custody arrangements for your children, Michael (12) and Sarah (9).

Please bring your bank statements from Chase Bank (Account #987654321) and any correspondence from Ms. Smith's attorney, Robert Johnson of Johnson & Associates (phone: 555-987-6543).

Sincerely,
Attorney Elizabeth Williams
Bar Number: 98765
Williams Legal Services
789 Broadway, Suite 500
New York, NY 10003
Phone: (555) 789-0123
`;

  const handleLoadSample = () => {
    setSampleText(sampleLegalText);
    setError(null);
  };

  const handleAnonymize = async () => {
    if (!sampleText.trim()) return;
    
    setIsLoading(true);
    setAnonymizedText('');
    setError(null);
    setIsOllamaNotRunning(false);
    
    try {
      const result = await anonymizeText(
        sampleText, 
        systemInfo.recommendedModel,
        (errorMessage) => {
          setError(errorMessage);
          if (errorMessage.includes('not running or not installed')) {
            setIsOllamaNotRunning(true);
          }
        }
      );
      setAnonymizedText(result);
      setHasAnonymized(true);
    } catch (error) {
      console.error('Error anonymizing text:', error);
      setAnonymizedText('');
      if (!error) {
        setError('Error: Failed to anonymize text. Please try again.');
      }
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
          Test the Anonymization Capabilities
        </Text>
        <Text fontSize="md" color="gray.600">
          Now that you have installed Ollama and downloaded a model, let's test its anonymization capabilities.
        </Text>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="blue.200" bg="blue.50">
        <Text fontWeight="bold" mb={4} fontSize="lg">
          How it works
        </Text>
        <Text mb={3}>
          The AI model will analyze your text and replace personal identifiable information (PII) such as names,
          addresses, phone numbers, and other sensitive data with generic placeholders.
        </Text>
        <Text>
          This process happens entirely on your computer, ensuring your data never leaves your machine.
        </Text>
      </Box>

      {error && (
        <Alert
          status="error"
          variant="subtle"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          textAlign="center"
          borderRadius="md"
          p={4}
        >
          <AlertIcon boxSize="24px" mr={0} mb={2} />
          <AlertTitle mt={2} mb={1} fontSize="lg">
            {isOllamaNotRunning ? "Ollama Not Running" : "Anonymization Failed"}
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
        </Alert>
      )}

      <Box>
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontWeight="bold">Input Text</Text>
          <Button size="sm" onClick={handleLoadSample} colorScheme="blue" variant="outline">
            Load Sample Text
          </Button>
        </Flex>
        <Textarea
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          placeholder="Enter or paste legal text containing personal information that you want to anonymize..."
          minHeight="200px"
          mb={4}
        />

        <Button
          onClick={handleAnonymize}
          colorScheme="blue"
          disabled={!sampleText.trim() || isLoading}
          width="full"
          mb={6}
        >
          {isLoading ? <Spinner size="sm" mr={2} /> : null}
          {isLoading ? 'Anonymizing...' : 'Anonymize Text'}
        </Button>

        {(anonymizedText || hasAnonymized) && (
          <Box>
            <Text fontWeight="bold" mb={2}>
              Anonymized Result
            </Text>
            <Textarea
              value={anonymizedText}
              readOnly
              minHeight="200px"
              bg="gray.50"
            />
          </Box>
        )}
      </Box>

      <StepNavigation
        nextLabel="Complete Tutorial"
        nextDisabled={!hasAnonymized}
      />
    </VStack>
  );
};

export default TestAnonymizationStep; 