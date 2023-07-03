import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Header from './header/Header';
import Footer from './footer/Footer';
import SkipToMainContent from './header/SkipToMainContent';

function Layout() {
  
  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);

  return (
    <>
    <SkipToMainContent/>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
