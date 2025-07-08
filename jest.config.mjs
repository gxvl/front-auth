// jest.config.mjs
import nextJest from 'next/jest.js'; // Adicione .js aqui para importação de módulos ES

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});

// Add any custom config to be passed to Jest
const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'], // Pode continuar .js aqui
  testEnvironment: 'jest-environment-jsdom',
  moduleNameMapper: {
    // Handle module aliases (this will be automatically configured for you by create-next-app)
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};

// createJestConfig is exported in this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(customJestConfig);