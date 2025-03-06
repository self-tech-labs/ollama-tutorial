import { useState } from 'react';
import { Box, Text, VStack, Heading, useRadioGroup, useRadio, RadioProps, HStack } from '@chakra-ui/react';
import StepNavigation from '../StepNavigation';
import { useTutorial } from '../../context/TutorialContext';

// Custom radio card component
function RadioCard(props: RadioProps & { children: React.ReactNode }) {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const checkbox = getRadioProps();

  return (
    <Box as="label" width="100%">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        borderWidth="1px"
        borderRadius="md"
        boxShadow="md"
        _checked={{
          bg: 'blue.50',
          borderColor: 'blue.500',
          borderWidth: '2px',
        }}
        _hover={{
          borderColor: 'blue.300',
        }}
        px={5}
        py={3}
      >
        {props.children}
      </Box>
    </Box>
  );
}

// Model option type
interface ModelOption {
  id: string;
  name: string;
  description: string;
  size: string;
  recommended: boolean;
}

const ChooseModelStep = () => {
  const { systemInfo } = useTutorial();
  
  // Model options
  const modelOptions: ModelOption[] = [
    {
      id: 'llama3:8b',
      name: 'Llama 3 (8B)',
      description: 'A lightweight model suitable for basic anonymization tasks.',
      size: '4.7 GB',
      recommended: systemInfo.recommendedModel === 'llama3:8b',
    },
    {
      id: 'llama3',
      name: 'Llama 3',
      description: 'A balanced model with good performance for most anonymization needs.',
      size: '8.1 GB',
      recommended: systemInfo.recommendedModel === 'llama3',
    },
    {
      id: 'mistral',
      name: 'Mistral',
      description: 'A powerful model for complex anonymization tasks.',
      size: '7.4 GB',
      recommended: systemInfo.recommendedModel === 'mistral',
    },
  ];

  const [selectedModel, setSelectedModel] = useState(systemInfo.recommendedModel);

  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'model',
    defaultValue: selectedModel,
    onChange: setSelectedModel,
  });

  const group = getRootProps();

  return (
    <VStack gap={6} align="stretch">
      <Box textAlign="center" py={4}>
        <Text fontSize="lg" mb={4}>
          Choose an AI model for anonymization
        </Text>
        <Text fontSize="md" color="gray.600">
          Based on your system ({systemInfo.os}, {systemInfo.arch}), we recommend the following models.
        </Text>
      </Box>

      <Box p={6} borderRadius="md" borderWidth="1px" borderColor="blue.200" bg="blue.50">
        <Text fontWeight="bold" mb={4} fontSize="lg">
          Why choose the right model?
        </Text>
        <Text mb={3}>
          Different models have different capabilities and resource requirements. 
          Smaller models run faster and use less memory, while larger models may provide better anonymization quality.
        </Text>
        <Text>
          We've pre-selected the model that we think will work best on your system, but you can choose another if you prefer.
        </Text>
      </Box>

      <VStack {...group} gap={4} align="stretch">
        {modelOptions.map((option) => {
          const radio = getRadioProps({ value: option.id });
          return (
            <RadioCard key={option.id} {...radio}>
              <HStack justifyContent="space-between">
                <VStack align="start" spacing={1}>
                  <Heading size="sm">{option.name}</Heading>
                  <Text fontSize="sm">{option.description}</Text>
                  <Text fontSize="xs" color="gray.500">Size: {option.size}</Text>
                </VStack>
                {option.recommended && (
                  <Box
                    bg="green.100"
                    color="green.700"
                    px={2}
                    py={1}
                    borderRadius="md"
                    fontSize="xs"
                    fontWeight="bold"
                  >
                    Recommended
                  </Box>
                )}
              </HStack>
            </RadioCard>
          );
        })}
      </VStack>

      <StepNavigation 
        nextLabel="Download Model" 
        nextDisabled={!selectedModel}
      />
    </VStack>
  );
};

export default ChooseModelStep; 