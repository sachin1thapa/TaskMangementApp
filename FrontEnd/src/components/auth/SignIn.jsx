import { useForm } from 'react-hook-form';
import CommonForm from '../common-layout/CommonForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninValidationSchema } from '@/utils/Form/formValidationSchema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '@/redux/authAction';
import { STATUSES } from '@/redux/authSlice';

function SignIn() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const UserInfo = useSelector((state) => state.auth);

  const formcontrols = [
    {
      id: 'email',
      label: 'Email',
      placeholder: 'Enter the Email',
      componentType: 'input',
      type: 'email',
    },
    {
      id: 'password',
      label: 'Password',
      placeholder: 'Enter the Password',
      componentType: 'input',
      type: 'password',
    },
  ];

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(SigninValidationSchema),
  });

  const onSubmit = async (Formdata) => {
    dispatch(loginUser(Formdata));
    if (UserInfo.status === STATUSES.IDLE && UserInfo.success) {
      toast({
        title: 'Login successful',
        description: `Welcome ${UserInfo?.userInfo?.user?.username.split(' ')[0]}`,
        className: 'bg-blue-600 text-white',
      });
      form.reset();
      navigate('/tasklist', { replace: true });
    }
  };

  return (
    <CommonForm
      formcontrols={formcontrols}
      handleSubmit={form.handleSubmit(onSubmit)}
      form={form}
      btntext="Login In"
      UserInfo={UserInfo}
    />
  );
}
export default SignIn;
