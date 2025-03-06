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
        setError('Échec du téléchargement du modèle. Veuillez réessayer.');
      }
    } catch (error) {
      console.error('Erreur lors du téléchargement du modèle:', error);
      setError('Une erreur est survenue lors du téléchargement du modèle. Veuillez réessayer.');
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
          Télécharger le modèle {systemInfo.recommendedModel}
        </Text>
        <Text fontSize="md" color="gray.600">
          Ce modèle sera téléchargé et stocké localement sur votre ordinateur.
        </Text>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="blue.200" bg="blue.50">
        <Text fontWeight="bold" mb={4} fontSize="lg">
          À propos de ce modèle
        </Text>
        <Text mb={3}>
          Le modèle {systemInfo.recommendedModel} est optimisé pour les tâches d'anonymisation de texte.
          Il peut identifier et remplacer les informations personnelles tout en préservant le contexte et le sens de vos documents.
        </Text>
        <Text>
          La taille du téléchargement est d'environ 4-8 Go selon le modèle, et il sera stocké sur votre machine locale.
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
            Démarrer le téléchargement
          </Button>
          <Text fontSize="sm" color="gray.500" mt={2}>
            Cela peut prendre plusieurs minutes selon votre connexion internet.
          </Text>
          <Text fontSize="sm" color="orange.500" mt={2}>
            Assurez-vous qu'Ollama est installé et en cours d'exécution avant de commencer le téléchargement.
          </Text>
        </Box>
      ) : (
        <Box>
          <Text fontWeight="bold" mb={2}>
            Progression du téléchargement
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
                Téléchargement terminé !
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                Le modèle a été téléchargé avec succès et est prêt à être utilisé pour l'anonymisation.
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
                {isOllamaNotRunning ? "Ollama n'est pas en cours d'exécution" : "Échec du téléchargement"}
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {error}
                {isOllamaNotRunning && (
                  <Box mt={2}>
                    <Text mb={2}>Veuillez vous assurer qu'Ollama est installé et en cours d'exécution avant de réessayer.</Text>
                    <Button
                      size="sm"
                      colorScheme="blue"
                      onClick={handleGoToInstallation}
                      mt={2}
                    >
                      Aller aux instructions d'installation
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
                Réessayer
              </Button>
            </Alert>
          ) : (
            <Text textAlign="center" color="gray.600">
              Téléchargement en cours... {downloadProgress}%
            </Text>
          )}
        </Box>
      )}

      <StepNavigation
        nextDisabled={!downloadComplete}
        nextLabel="Continuer vers l'anonymisation"
      />
    </VStack>
  );
};

export default DownloadModelStep; 