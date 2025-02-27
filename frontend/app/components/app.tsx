import { AuthProvider } from "./auth-provider";
import { Chat } from "./chat";

export function App() {
  return (
    <AuthProvider>
      <Chat />
    </AuthProvider>
  );
} 
