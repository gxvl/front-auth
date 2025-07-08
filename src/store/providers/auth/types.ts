export interface UserData {
  name: string;
  email: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserData | null;
  token: string | null;
}

export interface AuthContextType extends AuthState {
  login: (token: string, userName: string, userEmail: string) => void;
  logout: () => void;
  isLoading: boolean;
}