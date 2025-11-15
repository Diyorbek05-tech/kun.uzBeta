import { Outlet } from 'react-router-dom';
import Header from '../pages/Header/header';
import Footer from '../pages/Footer/index';

const Layout = () => (
  <div className="min-h-screen container items-center flex flex-col">
    <Header />
    <main className="grow">
      <Outlet />
    </main>
    <Footer />
  </div>

);

export default Layout;