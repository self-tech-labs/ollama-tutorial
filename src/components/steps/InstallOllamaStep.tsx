import { Box, Text, VStack, Link, Code, UnorderedList, ListItem, Divider } from '@chakra-ui/react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import StepNavigation from '../StepNavigation';
import { useTutorial } from '../../context/TutorialContext';

const InstallOllamaStep = () => {
  const { systemInfo } = useTutorial();

  const getInstallInstructions = () => {
    switch (systemInfo.os) {
      case 'macos':
        return (
          <VStack align="start" gap={4}>
            <Text>
              To install Ollama on macOS, you can download the installer from the official website:
            </Text>
            <Link 
              href="https://ollama.com/download/mac" 
              isExternal 
              color="blue.500"
              fontWeight="bold"
              fontSize="lg"
            >
              Download Ollama for macOS <ExternalLinkIcon mx="2px" />
            </Link>
            <Text>After downloading, follow these steps:</Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>Open the downloaded .dmg file</ListItem>
              <ListItem>Drag the Ollama app to your Applications folder</ListItem>
              <ListItem>Open Ollama from your Applications folder</ListItem>
            </UnorderedList>
          </VStack>
        );
      case 'windows':
        return (
          <VStack align="start" gap={4}>
            <Text>
              To install Ollama on Windows, you can download the installer from the official website:
            </Text>
            <Link 
              href="https://ollama.com/download/windows" 
              isExternal 
              color="blue.500"
              fontWeight="bold"
              fontSize="lg"
            >
              Download Ollama for Windows <ExternalLinkIcon mx="2px" />
            </Link>
            <Text>After downloading, follow these steps:</Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>Run the downloaded installer</ListItem>
              <ListItem>Follow the installation wizard</ListItem>
              <ListItem>Launch Ollama after installation</ListItem>
            </UnorderedList>
          </VStack>
        );
      case 'linux':
        return (
          <VStack align="start" gap={4}>
            <Text>
              To install Ollama on Linux, you can use the following command in your terminal:
            </Text>
            <Code p={3} borderRadius="md" bg="gray.100" width="100%">
              curl -fsSL https://ollama.com/install.sh | sh
            </Code>
            <Text>This script will install Ollama on your system.</Text>
            <Text>After installation, you can start Ollama with:</Text>
            <Code p={3} borderRadius="md" bg="gray.100" width="100%">
              ollama serve
            </Code>
          </VStack>
        );
      default:
        return (
          <VStack align="start" gap={4}>
            <Text>
              Please visit the official Ollama website to download the appropriate version for your system:
            </Text>
            <Link 
              href="https://ollama.com/download" 
              isExternal 
              color="blue.500"
              fontWeight="bold"
              fontSize="lg"
            >
              Download Ollama <ExternalLinkIcon mx="2px" />
            </Link>
          </VStack>
        );
    }
  };

  return (
    <VStack gap={6} align="stretch">
      <Box textAlign="center" py={4}>
        <Text fontSize="lg" mb={4}>
          Let's install Ollama on your {systemInfo.os} system
        </Text>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="blue.200" bg="blue.50">
        <Text fontWeight="bold" mb={4} fontSize="lg">
          What is Ollama?
        </Text>
        <Text mb={3}>
          Ollama is an open-source tool that allows you to run large language models locally on your computer.
          This means your data never leaves your machine, ensuring privacy and security.
        </Text>
        <Text>
          For legal professionals, this is crucial when working with sensitive client information that needs to remain confidential.
        </Text>
      </Box>

      <Divider />

      <Box>
        <Text fontWeight="bold" mb={4} fontSize="lg">
          Installation Instructions
        </Text>
        {getInstallInstructions()}
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="yellow.200" bg="yellow.50">
        <Text fontWeight="bold" mb={2}>
          Important Note:
        </Text>
        <Text>
          After installing Ollama, make sure it's running before proceeding to the next step.
          You should see the Ollama icon in your system tray or menu bar.
        </Text>
      </Box>

      <StepNavigation nextLabel="Continue to Model Selection" />
    </VStack>
  );
};

export default InstallOllamaStep; 