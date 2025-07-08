import '@testing-library/jest-dom';

global.fetch = jest.fn();
global.Request = jest.fn();
global.Response = jest.fn();
global.Headers = jest.fn();