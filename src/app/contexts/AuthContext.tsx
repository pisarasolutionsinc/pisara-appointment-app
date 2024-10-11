import { createContext, useState, ReactNode, useEffect } from "react";
import { UserModel } from "../models/UserModel";
import { loginUser, logoutUser } from "../services/UserServices";
import { getLocal, removeLocal, saveLocal } from "../hooks/useLocalStorage";

interface AuthContextType {
  user: UserModel | null;
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<UserModel | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = getLocal("user");
    const storedToken = getLocal("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, [getLocal]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginUser({ email, password });
      const { user: loggedInUser, token } = response;

      if (loggedInUser && token) {
        setUser(loggedInUser);
        setToken(token);
        saveLocal("user", loggedInUser);
        saveLocal("token", token);
        return true;
      } else {
        console.error("Login failed: User or token is missing");
        return false;
      }
    } catch (error) {
      console.error("Error during login:", error);
      return false;
    }
  };

  const logout = async () => {
    if (!token) return;
    try {
      await logoutUser(token);
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null);
      setToken(null);
      removeLocal("user");
      removeLocal("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
