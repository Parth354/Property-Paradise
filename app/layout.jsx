import '@/assets/styles/global.css';
import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import { GlobalProvider } from '@/context/GlobalContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'photoswipe/dist/photoswipe.css';

export const metadata = {
    title: 'Property Paradise | Hassle Free Property Search',
    description: 'Find Your Dream Property',
    keywords: 'rental , rent , property on sale , cheap rents'
};
const MainLayout = ({ children }) => {
    return (
        <GlobalProvider>
            <AuthProvider>
                <html>
                    <body>
                        <Navbar />
                        <main>{children}</main>
                        <ToastContainer />
                    </body>
                </html>
            </AuthProvider>
        </GlobalProvider>
    );
}

export default MainLayout
