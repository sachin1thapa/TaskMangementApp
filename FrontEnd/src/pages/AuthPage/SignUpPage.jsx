import { SignUp } from '@/components/index.js';
import { useSelector } from 'react-redux';
import { Navigate, NavLink, useLocation } from 'react-router-dom';

function SignUpPage() {
  const userInfo = useSelector((state) => state.auth);
  const location = useLocation();
  const from = location.state?.from?.pathname || '/tasklist';

  // If logged in, redirect to task list
  if (userInfo?.islogedin) {
    return <Navigate to={from} replace />;
  }

  return (
    <div className="flex flex-auto flex-col min-h-screen h-full">
      <div className="flex h-full flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mt-3">Welcome</h2>
        <div className="mt-6 w-[400px]">
          {' '}
          <SignUp />
        </div>
        <div className="flex text-md">
          <p className="mr-3">Already have an account?</p>
          <NavLink to="/auth/sign-in" className="text-blue-500">
            Login
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
