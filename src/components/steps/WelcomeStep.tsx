import { Box, Text, VStack, Heading } from '@chakra-ui/react';
import StepNavigation from '../StepNavigation';

const WelcomeStep = () => {
  return (
    <VStack gap={6} align="stretch">
      <Box textAlign="center" py={4}>
        <Heading as="h3" size="lg" mb={4} color="brand.600">
          Welcome to the Ollama Anonymization Tutorial
        </Heading>
        <Text fontSize="md" mb={4}>
          This tutorial will guide you through installing Ollama and setting up a lightweight AI model
          for anonymizing legal documents on your local machine.
        </Text>
        <Text fontSize="md" mb={4}>
          Ollama is a tool that allows you to run AI models locally on your computer,
          ensuring your sensitive data never leaves your machine.
        </Text>
      </Box>

      <Box bg="blue.50" p={4} borderRadius="md" borderLeft="4px solid" borderColor="blue.500">
        <Text fontWeight="bold" mb={2}>
          What you'll learn:
        </Text>
        <VStack align="start" gap={2} pl={4}>
          <Text>• How to install Ollama on your computer</Text>
          <Text>• How to download a lightweight AI model</Text>
          <Text>• How to use the model to anonymize legal documents</Text>
          <Text>• How to ensure your data remains private and secure</Text>
        </VStack>
      </Box>

      <Box bg="green.50" p={4} borderRadius="md" borderLeft="4px solid" borderColor="green.500">
        <Text fontWeight="bold" mb={2}>
          Benefits for legal professionals:
        </Text>
        <VStack align="start" gap={2} pl={4}>
          <Text>• Protect client confidentiality with local processing</Text>
          <Text>• Quickly anonymize sensitive documents</Text>
          <Text>• Maintain control over your data</Text>
          <Text>• Comply with data protection regulations</Text>
        </VStack>
      </Box>

      <StepNavigation nextLabel="Start Tutorial" />
    </VStack>
  );
};

export default WelcomeStep; 