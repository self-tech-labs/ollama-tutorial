import { Box, Container, Flex, Heading, Text, Image, useColorModeValue } from '@chakra-ui/react';
import { ReactNode } from 'react';

type LayoutProps = {
  children: ReactNode;
  title?: string;
  subtitle?: string;
};

const Layout = ({ children, title, subtitle }: LayoutProps) => {
  // Modern color scheme
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.100', 'gray.700');
  const primaryColor = 'teal.500';
  const subtitleColor = useColorModeValue('gray.600', 'gray.400');

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.50', 'gray.900')} width="100%">
      <Flex
        as="header"
        align="center"
        justify="space-between"
        py={4}
        px={8}
        bg={bgColor}
        borderBottom="1px"
        borderColor={borderColor}
        boxShadow="sm"
        position="sticky"
        top="0"
        zIndex="sticky"
        width="100%"
      >
        <Flex align="center">
          <Image src="/ritsl_1.png" alt="RITSL Logo" height="40px" mr={3} />
          <Heading as="h1" size="md" color={primaryColor} fontWeight="600">
            Tutoriel d'Anonymisation RITSL
          </Heading>
        </Flex>
      </Flex>

      <Container maxW="container.xl" py={12} px={[4, 6, 8]}>
        {title && (
          <Box mb={8} textAlign="center">
            <Heading as="h2" size="xl" mb={3} color={primaryColor}>
              {title}
            </Heading>
            {subtitle && (
              <Text fontSize="lg" color={subtitleColor}>
                {subtitle}
              </Text>
            )}
          </Box>
        )}

        <Box
          bg={bgColor}
          p={8}
          borderRadius="xl"
          boxShadow="lg"
          borderWidth="1px"
          borderColor={borderColor}
          transition="all 0.3s ease"
          _hover={{ boxShadow: "xl" }}
        >
          {children}
        </Box>
      </Container>

      <Box 
        as="footer" 
        py={6} 
        textAlign="center" 
        borderTop="1px" 
        borderColor={borderColor}
        bg={bgColor}
      >
        <Flex justify="center" align="center" direction="column">
          <Image src="/ritsl_2.png" alt="RITSL Logo" height="30px" mb={3} />
          <Text fontSize="sm" color={subtitleColor}>
            © {new Date().getFullYear()} RITSL - Tutoriel d'Anonymisation pour Professionnels Juridiques
          </Text>
          <Text fontSize="sm" color={subtitleColor} mt={2}>
            Made with ❤️ by <a href="https://ritsl.com" target="_blank" rel="noopener noreferrer">ritsl.com</a>
          </Text>
        </Flex>
      </Box>
    </Box>
  );
};

export default Layout; 