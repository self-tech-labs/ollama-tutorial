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
              Pour installer Ollama sur macOS, vous pouvez télécharger l'installateur depuis le site officiel :
            </Text>
            <Link 
              href="https://ollama.com/download/mac" 
              isExternal 
              color="blue.500"
              fontWeight="bold"
              fontSize="lg"
            >
              Télécharger Ollama pour macOS <ExternalLinkIcon mx="2px" />
            </Link>
            <Text>Après le téléchargement, suivez ces étapes :</Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>Ouvrez le fichier .dmg téléchargé</ListItem>
              <ListItem>Faites glisser l'application Ollama dans votre dossier Applications</ListItem>
              <ListItem>Ouvrez Ollama depuis votre dossier Applications</ListItem>
            </UnorderedList>
          </VStack>
        );
      case 'windows':
        return (
          <VStack align="start" gap={4}>
            <Text>
              Pour installer Ollama sur Windows, vous pouvez télécharger l'installateur depuis le site officiel :
            </Text>
            <Link 
              href="https://ollama.com/download/windows" 
              isExternal 
              color="blue.500"
              fontWeight="bold"
              fontSize="lg"
            >
              Télécharger Ollama pour Windows <ExternalLinkIcon mx="2px" />
            </Link>
            <Text>Après le téléchargement, suivez ces étapes :</Text>
            <UnorderedList spacing={2} pl={4}>
              <ListItem>Exécutez l'installateur téléchargé</ListItem>
              <ListItem>Suivez l'assistant d'installation</ListItem>
              <ListItem>Lancez Ollama après l'installation</ListItem>
            </UnorderedList>
          </VStack>
        );
      case 'linux':
        return (
          <VStack align="start" gap={4}>
            <Text>
              Pour installer Ollama sur Linux, vous pouvez utiliser la commande suivante dans votre terminal :
            </Text>
            <Code p={3} borderRadius="md" bg="gray.100" width="100%">
              curl -fsSL https://ollama.com/install.sh | sh
            </Code>
            <Text>Ce script installera Ollama sur votre système.</Text>
            <Text>Après l'installation, vous pouvez démarrer Ollama avec :</Text>
            <Code p={3} borderRadius="md" bg="gray.100" width="100%">
              ollama serve
            </Code>
          </VStack>
        );
      default:
        return (
          <VStack align="start" gap={4}>
            <Text>
              Veuillez visiter le site officiel d'Ollama pour télécharger la version appropriée pour votre système :
            </Text>
            <Link 
              href="https://ollama.com/download" 
              isExternal 
              color="blue.500"
              fontWeight="bold"
              fontSize="lg"
            >
              Télécharger Ollama <ExternalLinkIcon mx="2px" />
            </Link>
          </VStack>
        );
    }
  };

  return (
    <VStack gap={6} align="stretch">
      <Box textAlign="center" py={4}>
        <Text fontSize="lg" mb={4}>
          Installons Ollama sur votre système {systemInfo.os}
        </Text>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="blue.200" bg="blue.50">
        <Text fontWeight="bold" mb={4} fontSize="lg">
          Qu'est-ce qu'Ollama ?
        </Text>
        <Text mb={3}>
          Ollama est un outil open-source qui vous permet d'exécuter des modèles de langage localement sur votre ordinateur.
          Cela signifie que vos données ne quittent jamais votre machine, garantissant ainsi la confidentialité et la sécurité.
        </Text>
        <Text>
          Pour les professionnels du droit, c'est crucial lors du traitement d'informations clients sensibles qui doivent rester confidentielles.
        </Text>
      </Box>

      <Divider />

      <Box>
        <Text fontWeight="bold" mb={4} fontSize="lg">
          Instructions d'installation
        </Text>
        {getInstallInstructions()}
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="yellow.200" bg="yellow.50">
        <Text fontWeight="bold" mb={2}>
          Note importante :
        </Text>
        <Text>
          Après avoir installé Ollama, assurez-vous qu'il est en cours d'exécution avant de passer à l'étape suivante.
          Vous devriez voir l'icône Ollama dans votre barre des tâches ou barre de menu.
        </Text>
      </Box>

      <StepNavigation nextLabel="Continuer vers la sélection du modèle" />
    </VStack>
  );
};

export default InstallOllamaStep; 