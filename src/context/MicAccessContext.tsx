import React, { createContext, useContext, useState } from "react";

interface MicAccessContextType {
  hasMicAccess: boolean | null;
  setHasMicAccess: (value: boolean | null) => void;
}

const MicAccessContext = createContext<MicAccessContextType | undefined>(
  undefined
);

export const MicAccessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [hasMicAccess, setHasMicAccess] = useState<boolean | null>(null);

  return (
    <MicAccessContext.Provider value={{ hasMicAccess, setHasMicAccess }}>
      {children}
    </MicAccessContext.Provider>
  );
};

export const useMicAccess = () => {
  const context = useContext(MicAccessContext);
  if (!context) {
    throw new Error("useMicAccess must be used within a MicAccessProvider");
  }
  return context;
};
