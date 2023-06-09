import '../styles/globals.css';
import { Navbar } from '@/components';
import { GlobalProvider } from './provider/GlobalProvider';

export const metadata = {
  title: 'Go Shopping',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='flex flex-col min-h-screen overflow-x-hidden'>
        <GlobalProvider>
          <Navbar />
          {children}
        </GlobalProvider>
      </body>
    </html>
  );
}
