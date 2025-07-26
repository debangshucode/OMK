"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";

type User = {
  avatar: string | Blob | undefined;
  id: string;
  name: string;
  email: string;
  role: string;
};

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isAuthenticated: boolean;
  loading: boolean;
  logout: () => void;
  setAuthState: (user: User) => void;
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  useEffect(() => {
    axios
      .get("/auth/verify-session", { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = () => {
    axios.get("/auth/logout", { withCredentials: true });
    setUser(null);
    router.push("/");
  };

  const setAuthState = (user: User) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout, setAuthState , setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
