import { useForm } from 'react-hook-form';
import CommonForm from '../common-layout/CommonForm';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { SigninValidationSchema } from '@/utils/formschema';

function SignIn() {
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

  const onSubmit = (data) => {
    console.log('form data', data);
  };
  return (
    <CommonForm
      formcontrols={formcontrols}
      handleSubmit={form.handleSubmit(onSubmit)}
      form={form}
      btntext="Login In"
    />
  );
}
export default SignIn;
