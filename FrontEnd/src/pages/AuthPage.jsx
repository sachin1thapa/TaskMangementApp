import SignIn from '@/components/auth/SignIn';
import SignUp from '@/components/auth/SignUp';
import CommonButton from '@/components/common-layout/CommonButton';
import { useState } from 'react';

function AuthPage() {
  const [isLoginView, setIsLoginView] = useState(false);

  const toggleView = () => {
    setIsLoginView(!isLoginView);
  };

  return (
    <div className="flex flex-auto flex-col min-h-screen h-full">
      <div className="flex h-full flex-col justify-center items-center">
        <h2 className="text-3xl font-bold mt-3">Welcome</h2>
        <div className="mt-6 w-[400px]">{isLoginView ? <SignIn /> : <SignUp />}</div>
        <div className="mt-5">
          <CommonButton
            onClick={toggleView}
            buttonText={isLoginView ? 'Switch to SignUp' : 'Switch to SignIn'}
            type="button"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
