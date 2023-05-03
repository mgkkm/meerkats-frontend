import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ContentContainer from './components/ContentContainer/ContentContainer';

export default function App() {
  const [show, setShow] = useState(true);

  const scrollHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      setShow(false);
    } else {
      setShow(true);
    }
  };
  return (
    <>
      <Nav show={show} />
      <ContentContainer scrollHandler={scrollHandler}>
        <Outlet />
      </ContentContainer>
      <Footer />
    </>
  );
}
