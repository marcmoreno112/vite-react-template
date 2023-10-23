import React, { createContext, useContext, ReactNode, useState } from "react";

interface AuthContextType {
  authed: boolean;
  login: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthConsumer = () => {
  const auth = useContext(AuthContext);
  if (!auth) {
    throw new Error("AuthConsumer must be used within an AuthProvider");
  }
  return auth;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

const useAuth = () => {
  const [authed, setAuthed] = useState(false);

  return {
    login() {
      setAuthed(true);
    },
    authed,
    setAuthed,
  };
};
