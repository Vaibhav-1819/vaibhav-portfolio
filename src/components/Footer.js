import React from 'react';

const Footer = () => {
  return (
    <footer className="py-6 text-center bg-gray-100 dark:bg-gray-900 text-gray-600 dark:text-gray-400">
      © {new Date().getFullYear()} Vaibhav Ram Bharathula. All rights reserved.
    </footer>
  );
};

export default Footer;
