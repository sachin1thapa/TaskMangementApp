import { Button } from '../ui/button';
import { ReloadIcon } from '@radix-ui/react-icons';

function CommonButton({ onClick, buttonText, type, disabled, icon, className, ...props }) {
  return icon ? (
    <Button
      disabled
      className={
        className ||
        'w-full h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500'
      }
    >
      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
      Please wait
    </Button>
  ) : (
    <Button
      className={
        className ||
        'w-full h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500'
      }
      onClick={onClick || null}
      type={type || 'submit'}
      disabled={disabled || false}
      {...props}
    >
      {buttonText}
    </Button>
  );
}

export default CommonButton;
