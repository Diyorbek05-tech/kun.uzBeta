import { Outlet } from 'react-router-dom';
import Header from '../pages/Header/header';
import Footer from '../pages/Footer/index';

const Layout = () => {
  return (
       <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>

  );
};

export default Layout;