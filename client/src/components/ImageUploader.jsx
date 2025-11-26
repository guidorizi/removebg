import { useRef } from 'react';
import styled from 'styled-components';
import { useApp } from '../contexts/AppContext';

const UploaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 40px;
  border: 2px dashed #e0e0e0;
  border-radius: 12px;
  background: #fafafa;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    border-color: #007bff;
    background: #f0f8ff;
  }

  &.dragover {
    border-color: #007bff;
    background: #f0f8ff;
  }
`;

const UploadText = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #666;
  margin: 0;
  text-align: center;
`;

const UploadButton = styled.button`
  font-family: 'Poppins', sans-serif;
  font-weight: 700;
  background: #007bff;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #0056b3;
  }

  &:disabled {
    background: #ccc;
    cursor: not-allowed;
  }
`;

const HiddenInput = styled.input`
  display: none;
`;

const ErrorMessage = styled.div`
  font-family: 'Poppins', sans-serif;
  font-weight: 500;
  color: #dc3545;
  background: #f8d7da;
  padding: 12px;
  border-radius: 8px;
  margin-top: 10px;
`;

export default function ImageUploader() {
  const { state, dispatch } = useApp();
  const fileInputRef = useRef(null);

  const handleFileSelect = (file) => {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Por favor, selecione apenas arquivos de imagem.'
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      dispatch({
        type: 'SET_ERROR',
        payload: 'A imagem deve ter no máximo 10MB.'
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      dispatch({
        type: 'SET_ORIGINAL_IMAGE',
        payload: {
          file: file,
          preview: e.target.result
        }
      });
    };
    reader.readAsDataURL(file);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.currentTarget.classList.add('dragover');
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.currentTarget.classList.remove('dragover');
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  return (
    <>
      <UploaderContainer
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <UploadText>
          Arraste uma imagem aqui ou clique para selecionar
        </UploadText>
        <UploadButton type="button" disabled={state.isLoading}>
          {state.isLoading ? 'Processando...' : 'Selecionar Imagem'}
        </UploadButton>
        <HiddenInput
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
        />
      </UploaderContainer>
      {state.error && <ErrorMessage>{state.error}</ErrorMessage>}
    </>
  );
}

