import React from 'react';
import { VaultService } from '../services/VaultService';


export const VaultContext = React.createContext<VaultService | undefined>(undefined);

export const VaultConsumer = VaultContext.Consumer;

export const VaultProvider: React.FC<{value: VaultService}> = (props) => {
  return <VaultContext.Provider value={props.value}>{props.children}</VaultContext.Provider>;
}

export function useVaultService() {
  const context = React.useContext(VaultContext);
  if (context === undefined) {
    throw new Error('useVaultService must be used within a VaultProvider')
  }
  return context;
}

