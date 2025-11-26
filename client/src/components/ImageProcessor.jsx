import { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useApp } from '../contexts/AppContext';

const ProcessorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`;

const ImageContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
  width: 100%;
`;

const ImageBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ImageTitle = styled.h3`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  color: #333;
  margin: 0;
`;

const Image = styled.img`
  max-width: 300px;
  max-height: 300px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const ProcessButton = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  background: #28a745;
  color: white;
  border: none;
  padding: 15px 30px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 16px;
  transition: background 0.3s ease;

  &:hover {
    background: #218838;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const DownloadButton = styled.a`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  background: #007bff;
  color: white;
  text-decoration: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }
`;

const LoadingSpinner = styled.div`
  width: 40px;
  height: 40px;
  border: 4px solid #f3f3f3;
  border-top: 4px solid #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;

const API_KEY = 'm7L3iMbEwMdK3dRBNhbTCsuW';

export default function ImageProcessor() {
  const { state, dispatch } = useApp();

  const processImage = async () => {
    if (!state.originalImage) return;

    dispatch({ type: 'SET_LOADING', payload: true });

    try {
      const formData = new FormData();
      formData.append('image_file', state.originalImage.file);
      formData.append('size', 'auto');

      const response = await axios.post('https://api.remove.bg/v1.0/removebg', formData, {
        headers: {
          'X-Api-Key': API_KEY,
          'Content-Type': 'multipart/form-data'
        },
        responseType: 'blob'
      });

      const processedImageUrl = URL.createObjectURL(response.data);
      
      dispatch({
        type: 'SET_PROCESSED_IMAGE',
        payload: processedImageUrl
      });

    } catch (error) {
      let errorMessage = 'Erro ao processar a imagem. Tente novamente.';
      
      if (error.response) {
        switch (error.response.status) {
          case 400:
            errorMessage = 'Formato de imagem inválido.';
            break;
          case 402:
            errorMessage = 'Limite de créditos da API excedido.';
            break;
          case 403:
            errorMessage = 'Chave da API inválida.';
            break;
          case 429:
            errorMessage = 'Muitas requisições. Tente novamente em alguns minutos.';
            break;
          default:
            errorMessage = `Erro ${error.response.status}: ${error.response.statusText}`;
        }
      }

      dispatch({
        type: 'SET_ERROR',
        payload: errorMessage
      });
    }
  };

  useEffect(() => {
    if (state.originalImage && !state.processedImage && !state.isLoading) {
      processImage();
    }
  }, [state.originalImage]);

  if (!state.originalImage) {
    return null;
  }

  return (
    <ProcessorContainer>
      <ImageContainer>
        <ImageBox>
          <ImageTitle>Imagem Original</ImageTitle>
          <Image src={state.originalImage.preview} alt="Imagem original" />
        </ImageBox>

        {state.isLoading && (
          <ImageBox>
            <ImageTitle>Processando...</ImageTitle>
            <LoadingSpinner />
          </ImageBox>
        )}

        {state.processedImage && (
          <ImageBox>
            <ImageTitle>Fundo Removido</ImageTitle>
            <Image src={state.processedImage} alt="Imagem processada" />
            <DownloadButton
              href={state.processedImage}
              download="imagem-sem-fundo.png"
            >
              Baixar Imagem
            </DownloadButton>
          </ImageBox>
        )}
      </ImageContainer>

      {!state.isLoading && !state.processedImage && (
        <ProcessButton onClick={processImage} disabled={state.isLoading}>
          Remover Fundo
        </ProcessButton>
      )}
    </ProcessorContainer>
  );
}

