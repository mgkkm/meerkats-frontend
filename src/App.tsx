import React from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';

export default function App() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
