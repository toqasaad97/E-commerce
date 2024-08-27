
import { createContext } from "react";

export const ContextObj = createContext<{ token: string | null }>({ token: null });