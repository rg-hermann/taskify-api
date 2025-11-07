# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Cria e define o diretório de trabalho
WORKDIR /usr/src/app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala as dependências
RUN npm ci --only=production

# Copia o código fonte
COPY . .

# Expõe a porta que a aplicação usa
EXPOSE 3000

# Define as variáveis de ambiente padrão
ENV NODE_ENV=production

# Usuário não-root para segurança
USER node

# Comando para iniciar a aplicação
CMD ["npm", "start"]