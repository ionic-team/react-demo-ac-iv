import React from 'react';
import { AuthenticationService } from '../services/AuthService';

export const AuthContext = React.createContext<AuthenticationService | undefined>(undefined);

export const AuthConsumer = AuthContext.Consumer;

export const AuthProvider: React.FC<{value: AuthenticationService}> = (props) => {
  return <AuthContext.Provider value={props.value}>{props.children}</AuthContext.Provider>;
}

export function useAuthService() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthService must be used within an AuthProvider');
  }
  return context;
}
