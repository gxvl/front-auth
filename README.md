## Passo a Passo de Setup (Instalação e Execução)

Para configurar e rodar o projeto em sua máquina local, siga os passos abaixo:

Clone o Repositório:

Abra seu terminal e execute o comando para clonar o projeto:

```
git clone https://github.com/gxvl/front-auth.git
cd front-auth
Instale as Dependências:
Utilize o pnpm (ou npm/yarn se preferir) para instalar todas as dependências do projeto:
```

```
pnpm install
# ou
# npm install
# ou
# yarn install
```

Caso queira rodar o projeto localmente, entrar em contato para envio da .env.local.

## Inicie o Servidor de Desenvolvimento:

Após configurar as variáveis de ambiente, inicie o servidor de desenvolvimento do Next.js.

```
pnpm dev
# ou
# npm run dev
# ou
# yarn dev
```

A aplicação estará acessível em http://localhost:3000.

## Como Rodar Mocks e Testes

O projeto inclui testes unitários básicos configurados com Jest e React Testing Library.

##Executar Testes:

Para rodar todos os testes definidos no projeto:

```
pnpm test
# ou
# npm test
# ou
# yarn test
```

O Jest detectará automaticamente os arquivos de teste (ex: *.test.tsx) e os executará.

### Mocks:
As chamadas de API (fetch) são automaticamente mockadas nos testes unitários usando jest.spyOn(global, 'fetch') para simular as respostas da API de login, cadastro e verificação de token. Isso garante que os testes unitários sejam rápidos e isolados do backend real.

## Explicação e resumo de decisões arquiteturais

Este projeto foi construído com foco em eficiência. No frontend, utilizamos Next.js 14 (App Router) e Tailwind CSS para um desenvolvimento ágil e performance otimizada, com deploy facilitado na Vercel.

Para a lógica de backend e dados, utilizei API Routes do Next.js, conectando-se ao MongoDB Atlas (nuvem) via Mongoose.js. A autenticação é gerenciada por JWTs armazenados no localStorage do cliente, com proteção de rotas feita nos layouts React do lado do cliente.

O gerenciamento de estado é centralizado com a Context API do React. Validação de formulários é feita com React Hook Form e Zod, e notificações são exibidas usando Sonner.
