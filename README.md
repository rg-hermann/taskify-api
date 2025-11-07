# Taskify API

API RESTful do sistema Taskify para gerenciamento de tarefas.

## 🚀 Funcionalidades

- CRUD completo de tarefas
- Autenticação e autorização de usuários
- Integração com sistema de mensageria para processamento assíncrono
- Documentação automática com Swagger
- Logs estruturados
- Rate limiting
- Métricas para monitoramento

## 🛠️ Tecnologias

- Node.js
- Express
- MongoDB (com Mongoose)
- RabbitMQ
- Jest (testes)
- Docker
- Kubernetes

## 📦 Estrutura do Projeto

```
taskify-api/
├── src/
│   ├── config/           # Configurações da aplicação
│   ├── controllers/      # Controladores da API
│   ├── models/          # Modelos do Mongoose
│   ├── routes/          # Rotas da API
│   ├── services/        # Lógica de negócio
│   ├── utils/           # Utilitários
│   └── server.js        # Entrada da aplicação
├── tests/               # Testes automatizados
├── k8s/                 # Configurações Kubernetes/Helm
├── docker/             # Arquivos Docker
└── docs/               # Documentação
```

## 🔧 Configuração

### Pré-requisitos

- Node.js >= 18
- Docker
- Kubernetes (Minikube para desenvolvimento)
- Helm

### Instalação

1. Clone o repositório
```bash
git clone https://github.com/rg-hermann/taskify-api.git
cd taskify-api
```

2. Instale as dependências
```bash
npm install
```

3. Configure as variáveis de ambiente
```bash
cp .env.example .env
```

4. Inicie o servidor de desenvolvimento
```bash
npm run dev
```

### Docker

Build da imagem:
```bash
docker build -t taskify-api .
```

Executar container:
```bash
docker run -p 3000:3000 taskify-api
```

### Kubernetes/Helm

Instalação no cluster:
```bash
cd k8s
helm install taskify-api .
```

## 📝 API Endpoints

- `GET /api/tasks` - Lista todas as tarefas
- `POST /api/tasks` - Cria uma nova tarefa
- `GET /api/tasks/:id` - Obtém uma tarefa específica
- `PUT /api/tasks/:id` - Atualiza uma tarefa
- `DELETE /api/tasks/:id` - Remove uma tarefa

Documentação completa disponível em `/api-docs` quando a aplicação estiver rodando.

## 🧪 Testes

Executar testes:
```bash
npm test
```

## 📈 Métricas

Métricas disponíveis em `/metrics`:
- Latência das requisições
- Taxa de erros
- Uso de memória
- Conexões ativas

## 🤝 Contribuição

1. Fork o projeto
2. Crie sua Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a Branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.