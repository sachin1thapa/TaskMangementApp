import { useForm } from 'react-hook-form';
import CommonForm from '../common-layout/CommonForm';
import { zodResolver } from '@hookform/resolvers/zod';
import { callRegisterApi } from '@/services';
import { SignUpValidationSchema } from '@/utils/formschema';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@radix-ui/react-toast';
import { useState } from 'react';

function SignUp() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const formcontrols = [
    {
      id: 'name',
      label: 'Name',
      placeholder: 'Enter the name',
      componentType: 'input',
      type: 'text',
    },
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
    {
      id: 'gender',
      label: 'Gender',
      componentType: 'select',
      selectlabel: 'Select Gender',
      options: ['Male', 'Female'],
    },
  ];

  // Define the validation schema using zod

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
    setLoading(true);
    console.log('form data', formdata);
    try {
      const data = await callRegisterApi(formdata);
      if (data?.success) {
        setLoading(false);
        toast({
          title: 'User Registered Successfully',
          description: 'Welcome',
          className: 'bg-blue-600 text-white',
        });
        navigate('/task/list');
      } else {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: 'There was a problem with your request.',
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          className: 'bg-red-600 text-white',
        });
      }
    } catch (error) {
      console.error('Error during registration:', error);
      toast({
        variant: 'destructive',
        title: 'Uh oh! Something went wrong.',
        description: 'There was a problem with your request.',
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        className: 'bg-red-600 text-white',
      });
    }
  };

  return (
    <CommonForm
      formcontrols={formcontrols}
      handleSubmit={form.handleSubmit(onSubmit)}
      form={form}
      btntext="Sign up"
      isloadingicon={loading}
    />
  );
}
export default SignUp;
