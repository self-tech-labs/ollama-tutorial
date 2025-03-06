import axios from 'axios';

// Base URL for Ollama API
const OLLAMA_API_BASE_URL = 'http://localhost:11434';

// Model type definition
interface OllamaModel {
  name: string;
  size: number;
  modified_at: string;
  digest: string;
}

// Error messages
const ERROR_MESSAGES = {
  CONNECTION_REFUSED: 'Ollama is not running or not installed. Please make sure Ollama is installed and running before proceeding.',
  GENERIC_ERROR: 'An error occurred while communicating with Ollama.',
};

// Helper function to handle API errors
const handleApiError = (error: any): string => {
  if (error.code === 'ERR_NETWORK' || error.message?.includes('Network Error')) {
    return ERROR_MESSAGES.CONNECTION_REFUSED;
  }
  return ERROR_MESSAGES.GENERIC_ERROR;
};

// Check if Ollama is installed and running
export const checkOllamaStatus = async (): Promise<boolean> => {
  try {
    const response = await axios.get(`${OLLAMA_API_BASE_URL}/api/tags`);
    return response.status === 200;
  } catch (error) {
    console.error('Error checking Ollama status:', error);
    return false;
  }
};

// Get list of installed models
export const getInstalledModels = async (): Promise<string[]> => {
  try {
    const response = await axios.get(`${OLLAMA_API_BASE_URL}/api/tags`);
    if (response.status === 200 && response.data.models) {
      return response.data.models.map((model: OllamaModel) => model.name);
    }
    return [];
  } catch (error) {
    console.error('Error getting installed models:', error);
    return [];
  }
};

// Download a model
export const downloadModel = async (
  modelName: string, 
  onProgress?: (progress: number) => void,
  onError?: (errorMessage: string) => void
): Promise<boolean> => {
  try {
    // In a real implementation, we would use a streaming approach to track progress
    // For this tutorial, we'll simulate progress updates
    if (onProgress) {
      const simulateProgress = () => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          onProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
          }
        }, 1000);
      };
      
      simulateProgress();
    }
    
    const response = await axios.post(`${OLLAMA_API_BASE_URL}/api/pull`, {
      name: modelName,
    });
    return response.status === 200;
  } catch (error) {
    console.error(`Error downloading model ${modelName}:`, error);
    if (onError) {
      onError(handleApiError(error));
    }
    return false;
  }
};

// Anonymize text using Ollama
export const anonymizeText = async (
  text: string, 
  modelName: string,
  onError?: (errorMessage: string) => void
): Promise<string> => {
  try {
    const response = await axios.post(`${OLLAMA_API_BASE_URL}/api/generate`, {
      model: modelName,
      prompt: `Please anonymize the following text by replacing all personal identifiable information (names, addresses, phone numbers, email addresses, etc.) with generic placeholders. Keep the structure, language, and meaning of the text intact. Here's the text to anonymize:\n\n${text}`,
      stream: false,
    });
    
    if (response.status === 200 && response.data.response) {
      return response.data.response;
    }
    return 'Error: Could not anonymize text';
  } catch (error) {
    console.error('Error anonymizing text:', error);
    if (onError) {
      onError(handleApiError(error));
    }
    return 'Error: Could not anonymize text. Please make sure Ollama is running and the model is installed.';
  }
};

// Get system information
export const getSystemInfo = async (): Promise<{os: string, arch: string}> => {
  // In a real application, this would be done through a backend API
  // For this tutorial, we'll simulate it with browser detection
  const userAgent = navigator.userAgent;
  let os = 'inconnu';
  let arch = 'inconnu';
  
  if (userAgent.indexOf('Win') !== -1) os = 'windows';
  else if (userAgent.indexOf('Mac') !== -1) os = 'macos';
  else if (userAgent.indexOf('Linux') !== -1) os = 'linux';
  
  // Detecting architecture is more complex in the browser
  // This is a simplified approach
  if (userAgent.indexOf('x64') !== -1 || userAgent.indexOf('x86_64') !== -1) {
    arch = 'x86_64';
  } else if (userAgent.indexOf('arm') !== -1 || userAgent.indexOf('aarch64') !== -1) {
    arch = 'arm64';
  }
  
  return { os, arch };
}; 