import { useForm } from 'react-hook-form';
import CommonForm from '../common-layout/CommonForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { SignUpValidationSchema } from '@/utils/Form/formValidationSchema';
import { SignUpformcontrols } from '@/utils/Form/FormControls';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '@/redux/authAction';
import { STATUSES } from '@/redux/authSlice';

function SignUp() {
  const userInfo = useSelector((state) => state.auth);
  console.log(userInfo);
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      gender: '',
    },
    resolver: zodResolver(SignUpValidationSchema),
  });

  const onSubmit = async (formdata) => {
    await dispatch(registerUser(formdata)).unwrap();

    if (userInfo.status === STATUSES.IDLE && userInfo.success) {
      toast({
        title: 'Registration Successful',
        description: `Welcome ${userInfo?.userInfo?.username.split(' ')[0]}`,
        className: 'bg-blue-600 text-white',
      });
      form.reset();
      navigate('/auth/sign-in', { replace: true });
    }
  };

  return (
    <CommonForm
      formcontrols={SignUpformcontrols}
      handleSubmit={form.handleSubmit(onSubmit)}
      form={form}
      btntext="Sign up"
      UserInfo={userInfo}
    />
  );
}

export default SignUp;
