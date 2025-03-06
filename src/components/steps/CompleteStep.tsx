import { Box, Text, VStack, Button, Flex, Icon } from '@chakra-ui/react';
import { CheckCircleIcon } from '@chakra-ui/icons';
import { useTutorial, TutorialStep } from '../../context/TutorialContext';

const CompleteStep = () => {
  const { setCurrentStep } = useTutorial();

  const handleRestart = () => {
    setCurrentStep(TutorialStep.WELCOME);
  };

  const handleTestAgain = () => {
    setCurrentStep(TutorialStep.TEST_ANONYMIZATION);
  };

  return (
    <VStack gap={6} align="stretch">
      <Box textAlign="center" py={4}>
        <Icon as={CheckCircleIcon} w={16} h={16} color="green.500" mb={4} />
        <Text fontSize="2xl" fontWeight="bold" mb={2}>
          Congratulations!
        </Text>
        <Text fontSize="lg" mb={4}>
          You've successfully completed the Ollama Anonymization Tutorial
        </Text>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="green.200" bg="green.50">
        <Text fontWeight="bold" mb={4} fontSize="lg">
          What you've accomplished:
        </Text>
        <VStack align="start" gap={2}>
          <Flex align="center">
            <Icon as={CheckCircleIcon} color="green.500" mr={2} />
            <Text>Installed Ollama on your computer</Text>
          </Flex>
          <Flex align="center">
            <Icon as={CheckCircleIcon} color="green.500" mr={2} />
            <Text>Downloaded a lightweight AI model</Text>
          </Flex>
          <Flex align="center">
            <Icon as={CheckCircleIcon} color="green.500" mr={2} />
            <Text>Tested the anonymization capabilities</Text>
          </Flex>
          <Flex align="center">
            <Icon as={CheckCircleIcon} color="green.500" mr={2} />
            <Text>Set up a privacy-preserving solution for your legal documents</Text>
          </Flex>
        </VStack>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="blue.200" bg="blue.50">
        <Text fontWeight="bold" mb={4} fontSize="lg">
          Next Steps:
        </Text>
        <Text mb={3}>
          You can now use Ollama to anonymize any legal document by:
        </Text>
        <VStack align="start" gap={2} pl={4}>
          <Text>1. Opening the Ollama application</Text>
          <Text>2. Pasting your text into the anonymization tool</Text>
          <Text>3. Running the anonymization process</Text>
          <Text>4. Using the anonymized text in your work</Text>
        </VStack>
      </Box>

      <Flex gap={4} justify="center" mt={4}>
        <Button colorScheme="blue" onClick={handleTestAgain}>
          Test Anonymization Again
        </Button>
        <Button variant="outline" onClick={handleRestart}>
          Restart Tutorial
        </Button>
      </Flex>
    </VStack>
  );
};

export default CompleteStep; 