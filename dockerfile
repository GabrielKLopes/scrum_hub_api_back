# Use a imagem oficial do Node.js
FROM node:14

# Crie o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos de dependência
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código-fonte
COPY . .

# Exponha a porta em que o aplicativo estará em execução
EXPOSE 3000

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
