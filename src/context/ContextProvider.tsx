import { ReactNode,  useState } from "react";
import { ContextObj } from "./ContextObj"; // Import the created context

interface ContextProviderProps {
  children: ReactNode;
}

export default function ContextProvider({ children }: ContextProviderProps) {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );

  // useEffect(() => {
  //   if (token) {
  //     setToken(localStorage.getItem("token"));
  //   }
  // }, []);

  console.log(token);

  return (
    <ContextObj.Provider value={{ token, setToken }}>
      {children}
    </ContextObj.Provider>
  );
}
