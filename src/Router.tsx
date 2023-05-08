import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import NotFound from './pages/NotFound/NotFound';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import KakaoLogin from './pages/Login/components/KakaoLogin';
import BlogMain from './pages/Blog/BlogMain';
import EventList from './pages/Event/EventList';
import EventDetail from './pages/Event/EventDetail';
import BlogPosting from './pages/Blog/BlogPosting';
import Membership from './pages/Membership/Membership';
import BlogDetail from './pages/Blog/BlogDetail/BlogDetail';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Main /> },
      { path: '/login', element: <Login /> },
      { path: '/kakaoRedirect', element: <KakaoLogin /> },
      { path: '/blogMain', element: <BlogMain /> },
      { path: '/event', element: <EventList /> },
      { path: '/event/:id', element: <EventDetail /> },
      { path: '/kakaoRedirect', element: <KakaoLogin /> },
      { path: '/post', element: <BlogPosting /> },
      { path: '/membership', element: <Membership /> },
      { path: '/blogDetail/:id', element: <BlogDetail /> },
    ],
  },
]);

export default router;
