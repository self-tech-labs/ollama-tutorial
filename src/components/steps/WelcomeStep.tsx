import { Box, Text, VStack, Heading, Image, Flex, Button, Collapse, useDisclosure } from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import StepNavigation from '../StepNavigation';

interface FoldableBoxProps {
  isOpen: boolean;
  onToggle: () => void;
  title: string;
  bgColor: string;
  borderColor: string;
  titleColor: string;
  children: React.ReactNode;
}

const WelcomeStep = () => {
  const learningDisclosure = useDisclosure({ defaultIsOpen: true });
  const advantagesDisclosure = useDisclosure({ defaultIsOpen: true });
  const disclaimerDisclosure = useDisclosure({ defaultIsOpen: true });

  const FoldableBox = ({ 
    isOpen, 
    onToggle, 
    title, 
    bgColor, 
    borderColor, 
    titleColor, 
    children 
  }: FoldableBoxProps) => (
    <Box>
      <Button
        onClick={onToggle}
        variant="ghost"
        width="100%"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Text fontWeight="bold" color={titleColor}>{title}</Text>
        {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
      </Button>
      <Collapse in={isOpen}>
        <Box 
          bg={bgColor} 
          p={6} 
          borderRadius="xl" 
          borderLeft="4px solid" 
          borderColor={borderColor}
          boxShadow="md"
          mb={4}
        >
          {children}
        </Box>
      </Collapse>
    </Box>
  );

  return (
    <VStack gap={8} align="stretch">
      <Flex justify="center" mb={4}>
        <Image src="/ritsl_1.png" alt="RITSL Logo" height="80px" />
      </Flex>
      
      <Box textAlign="center" py={4}>
        <Heading as="h3" size="lg" mb={6} color="teal.600" fontWeight="600">
          Tutoriel d'Anonymisation de données pour avocat.e.s
        </Heading>
        <Text fontSize="md" mb={4} lineHeight="1.7">
          Ce tutoriel vous guidera à travers l'installation d'Ollama et la configuration d'un modèle d'IA léger
          pour anonymiser des documents juridiques sur votre machine locale.
        </Text>
        <Text fontSize="md" mb={4} lineHeight="1.7">
          Ollama est un outil qui vous permet d'exécuter des modèles d'IA localement sur votre ordinateur,
          garantissant que vos données sensibles ne quittent jamais votre machine.
        </Text>
      </Box>

      <FoldableBox
        isOpen={learningDisclosure.isOpen}
        onToggle={learningDisclosure.onToggle}
        title="Ce que vous allez apprendre:"
        bgColor="teal.50"
        borderColor="teal.500"
        titleColor="teal.700"
      >
        <VStack align="start" gap={3} pl={4}>
          <Flex align="center">
            <Text as="span" color="teal.500" fontWeight="bold" mr={2}>•</Text>
            <Text>Comment installer Ollama sur votre ordinateur</Text>
          </Flex>
          <Flex align="center">
            <Text as="span" color="teal.500" fontWeight="bold" mr={2}>•</Text>
            <Text>Comment télécharger un modèle d'IA léger</Text>
          </Flex>
          <Flex align="center">
            <Text as="span" color="teal.500" fontWeight="bold" mr={2}>•</Text>
            <Text>Comment utiliser le modèle pour anonymiser des documents juridiques</Text>
          </Flex>
          <Flex align="center">
            <Text as="span" color="teal.500" fontWeight="bold" mr={2}>•</Text>
            <Text>Comment garantir que vos données restent privées et sécurisées</Text>
          </Flex>
        </VStack>
      </FoldableBox>

      <FoldableBox
        isOpen={advantagesDisclosure.isOpen}
        onToggle={advantagesDisclosure.onToggle}
        title="Avantages pour les professionnels juridiques:"
        bgColor="green.50"
        borderColor="green.500"
        titleColor="green.700"
      >
        <VStack align="start" gap={3} pl={4}>
          <Flex align="center">
            <Text as="span" color="green.500" fontWeight="bold" mr={2}>•</Text>
            <Text>Protéger la confidentialité des clients avec un traitement local</Text>
          </Flex>
          <Flex align="center">
            <Text as="span" color="green.500" fontWeight="bold" mr={2}>•</Text>
            <Text>Anonymiser rapidement des documents sensibles</Text>
          </Flex>
          <Flex align="center">
            <Text as="span" color="green.500" fontWeight="bold" mr={2}>•</Text>
            <Text>Maintenir le contrôle sur vos données</Text>
          </Flex>
          <Flex align="center">
            <Text as="span" color="green.500" fontWeight="bold" mr={2}>•</Text>
            <Text>Se conformer aux réglementations de protection des données</Text>
          </Flex>
        </VStack>
      </FoldableBox>

      <FoldableBox
        isOpen={disclaimerDisclosure.isOpen}
        onToggle={disclaimerDisclosure.onToggle}
        title="Conditions Générales d'Utilisation et Avertissement:"
        bgColor="orange.50"
        borderColor="orange.500"
        titleColor="orange.700"
      >
        <VStack align="start" gap={3} pl={4}>
          <Flex align="center">
            <Text as="span" color="orange.500" fontWeight="bold" mr={2}>•</Text>
            <Text>Cet outil d'anonymisation doit être utilisé avec précaution et discernement professionnel.</Text>
          </Flex>
          <Flex align="center">
            <Text as="span" color="orange.500" fontWeight="bold" mr={2}>•</Text>
            <Text>L'avocat.e est tenu.e de vérifier manuellement l'exactitude et l'exhaustivité de chaque anonymisation effectuée.</Text>
          </Flex>
          <Flex align="center">
            <Text as="span" color="orange.500" fontWeight="bold" mr={2}>•</Text>
            <Text>Nous déclinons toute responsabilité en cas d'erreur ou d'omission dans le processus d'anonymisation.</Text>
          </Flex>
          <Flex align="center">
            <Text as="span" color="orange.500" fontWeight="bold" mr={2}>•</Text>
            <Text>L'utilisation de cet outil ne dispense pas l'avocat.e de son devoir de diligence professionnelle.</Text>
          </Flex>
        </VStack>
      </FoldableBox>

      <StepNavigation nextLabel="Démarrer le Tutoriel" />
    </VStack>
  );
};

export default WelcomeStep; 