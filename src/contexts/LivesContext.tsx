// import { createContext, useContext, useState } from "react";

// type LivesContextType = {
//   vidas: number;
//   perderVida: () => void;
//   resetarVidas: () => void;
// };

// const LivesContext = createContext<LivesContextType | null>(null);

// export function LivesProvider({ children }: { children: React.ReactNode }) {
//   const [vidas, setVidas] = useState(5);

//   const perderVida = () => {
//     setVidas((v) => (v > 0 ? v - 1 : 0));
//   };

//   const resetarVidas = () => setVidas(5);

//   return (
//     <LivesContext.Provider value={{ vidas, perderVida, resetarVidas }}>
//       {children}
//     </LivesContext.Provider>
//   );
// }

// export const useLives = () => {
//   const ctx = useContext(LivesContext);
//   if (!ctx) throw new Error("useLives deve estar dentro do LivesProvider.");
//   return ctx;
// };
