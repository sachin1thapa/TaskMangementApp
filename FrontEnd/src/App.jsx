import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './components/common-layout/Layout';
import TaskPage from './pages/TaskPage';
import ScrumbBoardPage from './pages/ScrumbBoardPage';
import AuthPage from './pages/AuthPage';
import TaskListPage from './pages/TaskListPage'; // Import the missing component
import ErrorPage from './pages/ErrorPage';

// routes
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'task',
        element: <TaskPage />,
        children: [
          {
            path: 'list',
            element: <TaskListPage />,
          },
          {
            path: 'scrumb-board',
            element: <ScrumbBoardPage />,
          },
        ],
      },
      {
        path: 'auth',
        element: <AuthPage />,
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
