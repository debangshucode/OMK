"use client";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";
import { useRouter } from "next/navigation";

type User = {
  avatar: string | Blob | undefined;
  _id: string;
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
  authenticated:boolean;
  getUserData:() => void;
  

  
  
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();
  const [authenticated , setAuthenticated] = useState(false)

  const isAuthenticated = !!user;

     const getUserData = async() =>{
    const {data}= await axios.get("http://localhost:4000/api/auth/getuser", {
          withCredentials: true
    });
    console.log("check",data)

    if(data.success){
      setUser(data.user);
    }
    console.log(data.user)
        
   }

useEffect(() => {
  const verify = async () => {
    try {
      await axios.get("/auth/verify-session", { withCredentials: true });
      setAuthenticated(true);
      await getUserData(); // ✅ get user after verifying
      console.log(user)
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };
  verify();
}, []);

useEffect(()=>{
  console.log(user)
},[user])

  const logout = () => {
    axios.get("/auth/logout", { withCredentials: true });
    setUser(null);
    router.push("/");
  };

  const setAuthState = (user: User) => {
    setUser(user);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, logout, setAuthState , setUser , authenticated ,getUserData}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
