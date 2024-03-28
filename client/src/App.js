import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

/**import all components  */
import Username from './components/login/Username';
import Password from './components/login/Password';
import Reset from './components/login/Reset';
import Register from './components/login/Register';
import Recovery from './components/login/Recovery';
import Profile from './components/login/Profile';
import PageNotFound from './components/login/PageNotFound';

import Main from './components/quiz/Main';
import Quiz from './components/quiz/Quiz';
import Result from './components/quiz/Result';
import { CheckUserExist } from './helper/helper';



/** auth Middleware */
import { Authorization, ProtectRoute } from './middleware/auth';

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
    element : <ProtectRoute><Password/></ProtectRoute>
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
    element : <Authorization><Profile /></Authorization>
  },
  {
    path : '/*',
    element : <PageNotFound></PageNotFound>
  },
  {
    path : '/root',
    element : <Main></Main>
  },
  {
    path : '/quiz',
    element : <CheckUserExist><Quiz/></CheckUserExist>
  },
  {
    path : '/result',
    element : <CheckUserExist><Result/></CheckUserExist>
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
