# RemoveBG Fullstack - Parte 2

Aplicação web fullstack para remoção de fundo de imagens com autenticação, busca e inserção de dados persistidos em banco de dados MySQL.

## 📋 Descrição

Este projeto implementa uma aplicação web completa seguindo a arquitetura de 3 camadas solicitada no Edital do Projeto 2:
- **Frontend**: React.js com Tailwind CSS (Vite)
- **Backend**: Express.js (REST API)
- **Banco de Dados**: MySQL (com Pool de Conexões)

### Funcionalidades Implementadas

- ✅ **Login e Autenticação**: Autenticação local (Admin) com proteção de rotas no Frontend.
- ✅ **Processamento de Imagens**: Integração com API remove.bg para remoção de fundo.
- ✅ **Inserção (Persistência)**: Armazenamento da imagem original e processada no banco de dados (Base64).
- ✅ **Busca (Histórico)**: Listagem do histórico de processamentos ordenado por data.
- ✅ **Download**: Download automático das imagens geradas.

## 🏗️ Arquitetura e Estrutura

O projeto segue estritamente a estrutura de pastas solicitada:

### Backend (Express.js REST)
