import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/common-layout/Layout';
import TaskPage from './pages/TaskPage';
import ScrumbBoardPage from './pages/ScrumbBoardPage';
import SignInPage from './pages/auth/SignInPage';
import SignUpPage from './pages/auth/SignUpPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <TaskPage />,
      },
      {
        path: '/auth/signin',
        element: <SignInPage />,
      },
      {
        path: '/auth/signup',
        element: <SignUpPage />,
      },
      {
        path: '/scrumbboard',
        element: <ScrumbBoardPage />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
