import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import ContentContainer from './components/ContentContainer/ContentContainer';

export default function App() {
  const [hide, setHide] = useState(false);

  const scrollHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY < 0) {
      setHide(true);
    } else {
      setHide(false);
    }
  };
  return (
    <>
      <Nav hide={hide} />
      <ContentContainer scrollHandler={scrollHandler}>
        <Outlet />
      </ContentContainer>
      <Footer />
    </>
  );
}
