import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import LoginPage from '@/app/(public)/login/page';
import { AuthProvider, useAuth } from '@/store/providers/auth';
import { useRouter } from 'next/navigation';

jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/store/providers/auth', () => ({ 
  useAuth: jest.fn(),
  AuthProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

const mockFetch = jest.spyOn(global, 'fetch');

describe('LoginPage', () => {
  let mockPush: jest.Mock;
  let mockReplace: jest.Mock; 
  let mockLogin: jest.Mock;

  beforeEach(() => {
    mockPush = jest.fn();
    mockReplace = jest.fn(); 
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      replace: mockReplace,
    });

    mockLogin = jest.fn();

    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isAuthenticated: false,
      isLoading: false,
      user: null,
      token: null,
    });

    mockFetch.mockClear();
  });

  afterEach(() => {
    mockFetch.mockRestore();
  });

  it('displays validation errors for empty fields on blur', async () => {
    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    const emailInput = screen.getByLabelText(/e-mail/i);
    const passwordInput = screen.getByLabelText(/senha/i);

    await userEvent.type(emailInput, 'a');
    fireEvent.blur(emailInput);
    await userEvent.clear(emailInput);
    fireEvent.blur(emailInput);

    await userEvent.type(passwordInput, 'a');
    fireEvent.blur(passwordInput);
    await userEvent.clear(passwordInput);
    fireEvent.blur(passwordInput);

    await waitFor(() => {
      expect(screen.getByText(/o e-mail é obrigatório\./i)).toBeInTheDocument();
      expect(screen.getByText(/a senha é obrigatória\./i)).toBeInTheDocument();
    });
  });

  it('handles successful login and redirects to dashboard', async () => {
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify({
      message: 'Logged in successfully!',
      token: 'mock-jwt-token',
      userName: 'Test User',
      userEmail: 'test@example.com',
    }), { status: 200 }));

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'test@example.com');
    await userEvent.type(screen.getByLabelText(/senha/i), 'password123');

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(mockFetch).toHaveBeenCalledWith('/api/login', expect.any(Object));
    });

    expect(mockLogin).toHaveBeenCalledWith('mock-jwt-token', 'Test User', 'test@example.com');
    expect(mockPush).toHaveBeenCalledWith('/dashboard');
  });

  it('displays error message for failed login', async () => {
    mockFetch.mockResolvedValueOnce(new Response(JSON.stringify({
      message: 'Erro ao fazer login. Credenciais inválidas.'
    }), { status: 400 }));

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    await userEvent.type(screen.getByLabelText(/e-mail/i), 'wrong@example.com');
    await userEvent.type(screen.getByLabelText(/senha/i), 'wrongpassword');

    const loginButton = screen.getByRole('button', { name: /entrar/i });
    await userEvent.click(loginButton);

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    await waitFor(() => {
      expect(screen.getByText(/erro ao fazer login\. credenciais inválidas\./i)).toBeInTheDocument();
    });

    expect(mockLogin).not.toHaveBeenCalled();
    expect(mockPush).not.toHaveBeenCalled();
  });

  it('redirects to dashboard if already authenticated', async () => {
    (useAuth as jest.Mock).mockReturnValue({
      login: mockLogin,
      isAuthenticated: true, 
      isLoading: false, 
      user: { name: 'Existing User', email: 'existing@example.com' },
      token: 'existing-token',
    });

    render(
      <AuthProvider>
        <LoginPage />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/dashboard'); 
    });

    expect(screen.queryByLabelText(/e-mail/i)).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /entrar/i })).not.toBeInTheDocument();
  });
});