import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**import all components  */
import Username from './components/Username';
import Password from './components/Password';
import Reset from './components/Reset';
import Register from './components/Register';
import Recovery from './components/Recovery';
import Profile from './components/Profile';
import PageNotFound from './components/PageNotFound';

/** root routes  */
const router = createBrowserRouter([
  {
    path : '/',
    element : <Username></Username>
  },
  {
    path : '/register',
    element : <Register></Register>
  },
  {
    path : '/password',
    element : <Password></Password>
  },
  {
    path : '/reset',
    element : <Reset></Reset>
  },
  {
    path : '/recovery',
    element : <Recovery></Recovery>
  },
  {
    path : '/profile',
    element : <Profile></Profile>
  },
  {
    path : '/*',
    element : <PageNotFound></PageNotFound>
  },
])

function App() {
  return (
    <main>
      <RouterProvider router={router}></RouterProvider>
    </main>
  );
}

export default App;
