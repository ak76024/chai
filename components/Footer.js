import React from 'react';

const Footer = () => {
  return (
    <footer className='!bg-black px-8 py-4'>
      <p>&copy; {new Date().getFullYear()} Chai. All rights reserved.</p>
    </footer>
  );
}

export default Footer;