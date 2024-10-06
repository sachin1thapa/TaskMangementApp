import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/common-layout/Layout';
import {
  ErrorPage,
  ScrumbBoardPage,
  SignInPage,
  SignUpPage,
  TaskListPage,
} from './pages/index.js';
import ProtectedRoute from './Routing/ProtectedRoute';
import TestPage from './pages/TestPage';

// Routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          {
            path: 'tasklist',
            element: <TaskListPage />,
          },
          {
            path: 'scrumb-board',
            element: <ScrumbBoardPage />,
          },
          {
            path: 'test',
            element: <TestPage />,
          },
          {
            path: 'test2',
            element: <div>Test2</div>,
          },
        ],
      },
      {
        path: 'auth/sign-in',
        element: <SignInPage />,
      },
      {
        path: 'auth/sign-up',
        element: <SignUpPage />,
      },
      {
        path: '*',
        element: <ErrorPage />,
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
