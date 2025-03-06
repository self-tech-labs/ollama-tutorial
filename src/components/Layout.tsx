import { Box, Container, Flex, Heading, Text } from '@chakra-ui/react';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

const Layout = ({ children, title, subtitle }: LayoutProps) => {
  const bgColor = 'white';
  const borderColor = 'gray.200';

  return (
    <Box minH="100vh" bg="gray.50">
      <Flex
        as="header"
        align="center"
        justify="center"
        py={4}
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        boxShadow="sm"
      >
        <Flex align="center" maxW="container.lg" width="full" px={4}>
          <Heading as="h1" size="md" color="brand.500">
            Ollama Anonymization Tutorial
          </Heading>
        </Flex>
      </Flex>

      <Container maxW="container.md" py={8}>
        {title && (
          <Box mb={6} textAlign="center">
            <Heading as="h2" size="xl" mb={2}>
              {title}
            </Heading>
            {subtitle && (
              <Text fontSize="lg" color="gray.600">
                {subtitle}
              </Text>
            )}
          </Box>
        )}

        <Box
          bg={bgColor}
          p={6}
          borderRadius="lg"
          boxShadow="md"
          borderWidth="1px"
          borderColor={borderColor}
        >
          {children}
        </Box>
      </Container>

      <Box as="footer" py={4} textAlign="center" borderTop="1px" borderColor={borderColor}>
        <Text fontSize="sm" color="gray.500">
          © {new Date().getFullYear()} Ollama Anonymization Tutorial for Legal Professionals
        </Text>
      </Box>
    </Box>
  );
};

export default Layout; 