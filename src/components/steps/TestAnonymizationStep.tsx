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

  // Exemple de texte juridique
  const sampleLegalText = `
Client : Jean Dupont
Date de naissance : 12/05/1980
Adresse : 15 Avenue de la Gare, Lausanne, 1003
Téléphone : 021 123 45 67
Email : jean.dupont@exemple.ch
Numéro de dossier : ABC-12345

Cher M. Dupont,

Cette lettre confirme notre rendez-vous du 15 juin 2023 à 14h00 concernant votre procédure de divorce contre Marie Dupont. Nous discuterons de la répartition des biens situés au 24 Rue de Bourg et des arrangements de garde pour vos enfants, Michel (12 ans) et Sarah (9 ans).

Veuillez apporter vos relevés bancaires de UBS (Compte n°987654321) et toute correspondance de l'avocat de Mme Dupont, Me Robert Martin du cabinet Martin & Associés (tél : 021 987 65 43).

Cordialement,
Maître Élisabeth Martin
Numéro du Barreau : 98765
Cabinet Martin Services Juridiques
8 Place Saint-François
Lausanne, 1003
Téléphone : 021 789 01 23
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
          Testez les Capacités d'Anonymisation
        </Text>
        <Text fontSize="md" color="gray.600">
          Maintenant que vous avez installé Ollama et téléchargé un modèle, testons ses capacités d'anonymisation.
        </Text>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="blue.200" bg="blue.50">
        <Text fontWeight="bold" mb={4} fontSize="lg">
          Comment ça fonctionne
        </Text>
        <Text mb={3}>
          Le modèle d'IA analysera votre texte et remplacera les informations personnelles identifiables (IPI) telles que les noms,
          adresses, numéros de téléphone et autres données sensibles par des marqueurs génériques.
        </Text>
        <Text>
          Ce processus se déroule entièrement sur votre ordinateur, garantissant que vos données ne quittent jamais votre machine.
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
            {isOllamaNotRunning ? "Ollama n'est pas en cours d'exécution" : "Échec de l'anonymisation"}
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
                  Aller aux Instructions d'Installation
                </Button>
              </Box>
            )}
          </AlertDescription>
        </Alert>
      )}

      <Box>
        <Flex justify="space-between" align="center" mb={2}>
          <Text fontWeight="bold">Texte d'entrée</Text>
          <Button size="sm" onClick={handleLoadSample} colorScheme="blue" variant="outline">
            Charger un Exemple de Texte
          </Button>
        </Flex>
        <Textarea
          value={sampleText}
          onChange={(e) => setSampleText(e.target.value)}
          placeholder="Entrez ou collez un texte juridique contenant des informations personnelles que vous souhaitez anonymiser..."
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
          {isLoading ? 'Anonymisation en cours...' : 'Anonymiser le Texte'}
        </Button>

        {(anonymizedText || hasAnonymized) && (
          <Box>
            <Text fontWeight="bold" mb={2}>
              Résultat Anonymisé
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
        nextLabel="Terminer le Tutoriel"
        nextDisabled={!hasAnonymized}
      />
    </VStack>
  );
};

export default TestAnonymizationStep; 