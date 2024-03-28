import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

    const login = async (inputs) => {
        const res = await axios.post("http://88.200.63.148:8068/server/auth/login", inputs, {
          withCredentials: true,
        });
        setUser(res.data);
        return res;
      };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
      }, [user]);
    return (
        <AuthContext.Provider value={{ user, setUser, login }}>
            {children}
        </AuthContext.Provider>
    )
}

