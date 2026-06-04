import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import ChatbotWidget from '../components/common/ChatbotWidget';
import { useAuth } from '../context/AuthContext';

const PublicLayout = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {user && <ChatbotWidget />}
    </div>
  );
};

export default PublicLayout;
