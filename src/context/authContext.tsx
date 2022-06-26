import React, { createContext, useContext } from "react";
import usePersistedState from "../utils/persistedState";

interface IProps {
  children: React.ReactNode;
}

interface IAuthContext {
  handleDataUsername: string;
  setHandleDataUsername: (dataUsername: string) => void;
}

const AuthContext = createContext({} as IAuthContext);

function AuthProvider({ children }: IProps) {
    const [handleDataUsername, setHandleDataUsername] = usePersistedState(
      "@Context/DataUsername"
    , '');

  return (
    <AuthContext.Provider
      value={{
        handleDataUsername,
        setHandleDataUsername
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuthContext() {
  const context = useContext(AuthContext);

  return context;
}

export { useAuthContext, AuthProvider };
