import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import { useRecoilState } from 'recoil';
import { topBtnState } from './recoil/TopBtnState';
import ContentContainer from './components/ContentContainer/ContentContainer';

export default function App() {
  const [show, setShow] = useState(true);
  const [, setHide] = useRecoilState(topBtnState);

  const scrollHandler = (e: React.WheelEvent<HTMLDivElement>) => {
    if (e.deltaY > 0) {
      setShow(false);
    } else {
      setShow(true);
    }

    if (e.pageY > 700) {
      setHide(false);
    } else {
      setHide(true);
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
