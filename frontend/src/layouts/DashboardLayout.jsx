import { Outlet } from 'react-router-dom';
import Navbar from '../components/common/Navbar';
import ChatbotWidget from '../components/common/ChatbotWidget';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-20 lg:pt-24 pb-8">
        <div className="container-custom">
          <Outlet />
        </div>
      </main>
      <ChatbotWidget />
    </div>
  );
};

export default DashboardLayout;
