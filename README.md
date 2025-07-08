Passo a Passo de Setup (Instalação e Execução)
Para configurar e rodar o projeto em sua máquina local, siga os passos abaixo:

Clone o Repositório:
Abra seu terminal e execute o comando para clonar o projeto:

```
git clone https://github.com/gxvl/front-auth.git
cd my-auth-app # Ou o nome da pasta que você escolheu
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

Inicie o Servidor de Desenvolvimento:
Após configurar as variáveis de ambiente, inicie o servidor de desenvolvimento do Next.js.

```
pnpm dev
# ou
# npm run dev
# ou
# yarn dev
```

A aplicação estará acessível em http://localhost:3000.

Como Rodar Mocks e Testes
O projeto inclui testes unitários básicos configurados com Jest e React Testing Library.

Executar Testes:
Para rodar todos os testes definidos no projeto:

```
pnpm test
# ou
# npm test
# ou
# yarn test
```

O Jest detectará automaticamente os arquivos de teste (ex: *.test.tsx) e os executará.

Mocks:
As chamadas de API (fetch) são automaticamente mockadas nos testes unitários usando jest.spyOn(global, 'fetch') para simular as respostas da API de login, cadastro e verificação de token. Isso garante que os testes unitários sejam rápidos e isolados do backend real.