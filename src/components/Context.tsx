import React, { ReactNode, createContext, useContext, useState } from "react";

interface GlobalContextProps {
    showWelcome: boolean;
    setWelcome: React.Dispatch<React.SetStateAction<boolean>>;
}

const Context = createContext<GlobalContextProps | undefined>(undefined);

interface GlobalProviderProps {
    children: ReactNode;
}

export const GlobalProvider: React.FC<GlobalProviderProps> = ({ children }) => {
    const [showWelcome, setWelcome] = useState(true);

    return (
        <Context.Provider value={{ showWelcome, setWelcome }}>
            {children}
        </Context.Provider>
    );
};

export const useGlobalContext = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error("useGlobalContext must be used within a GlobalProvider");
    }
    return context;
};