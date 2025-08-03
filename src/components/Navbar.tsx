import React, { useState } from 'react';
import Sidebar from './Sidebar';
import MobileHeader from './MobileHeader';

const Navbar: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <MobileHeader onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
    </>
  );
};

export default Navbar;