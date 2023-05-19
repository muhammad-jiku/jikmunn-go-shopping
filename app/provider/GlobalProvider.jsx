import { AuthProvider } from '@/context/AuthContext';
import { CartProvider } from '@/context/CartContext';

export function GlobalProvider({ children }) {
  return (
    <>
      <AuthProvider>
        <CartProvider>{children}</CartProvider>
      </AuthProvider>
    </>
  );
}
