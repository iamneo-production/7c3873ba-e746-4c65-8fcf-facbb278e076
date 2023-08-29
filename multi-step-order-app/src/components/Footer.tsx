import React from 'react';

function Footer(){
  return (
    <footer className="mt-4 py-3 bg-light text-center">
      &copy; {new Date().getFullYear()} Telecom App
    </footer>
  );
};

export default Footer;
