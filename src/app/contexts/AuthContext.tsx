import { createContext, useState, ReactNode, useEffect } from "react";
import { UserModel } from "../models/UserModel";
import { loginUser, logoutUser } from "../services/UserServices";
import { uselocalStorage } from "../hooks/useLocalStorage";

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
  const { savelocal, getlocal, removelocal } = uselocalStorage();

  useEffect(() => {
    const storedUser = getlocal("user");
    const storedToken = getlocal("token");

    if (storedUser && storedToken) {
      setUser(storedUser);
      setToken(storedToken);
    }
    setLoading(false);
  }, [getlocal]);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const response = await loginUser({ email, password });
      const { user: loggedInUser, token } = response;

      if (loggedInUser && token) {
        setUser(loggedInUser);
        setToken(token);
        savelocal("user", loggedInUser);
        savelocal("token", token);
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
    try {
      await logoutUser();
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setUser(null);
      setToken(null);
      removelocal("user");
      removelocal("token");
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
