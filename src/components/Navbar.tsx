import React from "react";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-lg font-bold">Project Bolt</div>
        <div>
          {/* Add navigation links here if needed */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
