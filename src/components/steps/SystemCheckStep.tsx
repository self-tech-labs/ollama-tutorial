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
          Nous vérifions votre système pour déterminer la meilleure configuration pour Ollama.
        </Text>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="blue.200" bg="blue.50">
        <Box display="flex" alignItems="center" mb={2}>
          <InfoIcon color="blue.500" mr={2} />
          <Text fontWeight="bold">Qu'est-ce qu'Ollama ?</Text>
        </Box>
        <Text mb={3}>
          Ollama est un outil open-source qui vous permet d'exécuter des modèles d'IA localement sur votre ordinateur.
          Cela garantit que vos données ne quittent jamais votre machine, assurant la confidentialité et la sécurité de vos documents sensibles.
        </Text>
        <Text>
          La vérification du système déterminera si Ollama est déjà installé sur votre système.
        </Text>
      </Box>

      {isLoading ? (
        <Box textAlign="center" py={8}>
          <Spinner size="xl" color="blue.500" mb={4} />
          <Text>Analyse de votre système en cours...</Text>
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
              <Text fontWeight="bold">Système d'exploitation</Text>
            </Box>
            <Text ml={6} mt={1}>
              {systemInfo.os ? `Détecté : ${systemInfo.os}` : 'Vérification en cours...'}
            </Text>
          </Box>

          <Box p={4} borderRadius="md" borderWidth="1px" borderColor={systemInfo.arch ? "green.300" : "gray.200"}>
            <Box display="flex" alignItems="center">
              {systemInfo.arch ? (
                <CheckCircleIcon color="green.500" mr={2} />
              ) : (
                <Spinner size="sm" mr={2} />
              )}
              <Text fontWeight="bold">Architecture système</Text>
            </Box>
            <Text ml={6} mt={1}>
              {systemInfo.arch ? `Détecté : ${systemInfo.arch}` : 'Vérification en cours...'}
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
              <Text fontWeight="bold">Installation d'Ollama</Text>
            </Box>
            <Text ml={6} mt={1}>
              {!checkComplete
                ? 'Vérification en cours...'
                : systemInfo.isOllamaInstalled
                ? 'Ollama est déjà installé et en cours d\'exécution !'
                : 'Ollama n\'est pas installé ou n\'est pas en cours d\'exécution.'}
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
                Problème de connexion détecté
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Nous n'avons pas pu nous connecter à Ollama. Cela signifie généralement qu'Ollama n'est pas installé ou n'est pas en cours d'exécution.
                <Box mt={3}>
                  <Button
                    colorScheme="blue"
                    onClick={handleGoToInstallation}
                  >
                    Continuer vers les instructions d'installation
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
                  ? 'Ollama est déjà installé !'
                  : 'Prêt à installer Ollama'}
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {systemInfo.isOllamaInstalled
                  ? 'Nous pouvons procéder au téléchargement d\'un modèle pour l\'anonymisation.'
                  : `En fonction de votre système ${systemInfo.os} avec l'architecture ${systemInfo.arch}, nous allons vous aider à installer Ollama.`}
              </AlertDescription>
            </Alert>
          )}
        </VStack>
      )}

      <StepNavigation
        nextDisabled={!checkComplete && !connectionError}
        nextLabel={systemInfo.isOllamaInstalled ? 'Choisir le modèle' : 'Installer Ollama'}
      />
    </VStack>
  );
};

export default SystemCheckStep; 