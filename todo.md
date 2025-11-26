# Project TODO

## Funcionalidades Principais (Requisitos da Parte 2)

- [x] Login e autenticação de usuários
- [x] Busca de imagens processadas (histórico do usuário)
- [x] Inserção de novas imagens processadas (salvar no banco)
- [x] Upload e processamento de imagens via API remove.bg
- [x] Visualização de imagens originais e processadas
- [x] Download de imagens processadas

## Backend (Express.js + tRPC)

- [x] Schema do banco de dados para imagens processadas
- [x] Rota protegida para buscar histórico de imagens do usuário
- [x] Rota protegida para inserir nova imagem processada
- [x] Validação de campos no servidor
- [x] Mensagens de erro e validação do servidor
- [x] Implementação do padrão REST/tRPC

## Frontend (React.js)

- [x] Migrar componentes da Parte 1 (ImageUploader, ImageProcessor)
- [x] Página de login
- [x] Página principal com upload de imagens
- [x] Página de histórico de imagens processadas
- [x] Integração com rotas tRPC do backend

## Segurança

- [x] HTTPS (configurado automaticamente pela plataforma)
- [x] Armazenamento seguro de senhas (JWT já implementado)
- [x] Sanitização de parâmetros (prevenir SQL/NoSQL injection)
- [x] Prevenção de XSS
- [x] Invalidação correta de tokens de autenticação
- [x] Logs de autenticação, buscas e inserções

## Otimização

- [x] Compressão de arquivos estáticos
- [x] Compressão de respostas do servidor
- [x] Estratégia de cache no backend
- [x] Pool de conexões do banco de dados

## Testes

- [x] Testes unitários com Vitest para rotas de busca
- [x] Testes unitários com Vitest para rotas de inserção
- [x] Testes de autenticação

## Documentação

- [x] README com instruções de execução
- [ ] Vídeo de apresentação (máx 3 minutos) - A ser feito pelo aluno
