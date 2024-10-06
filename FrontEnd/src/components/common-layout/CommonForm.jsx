import CommonButton from './CommonButton';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { STATUSES } from '@/redux/authSlice';

function CommonForm({ formcontrols = [], handleSubmit, form, btntext, UserInfo }) {
  return (
    <Form {...form}>
      {/* {console.log(form)} */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {' '}
        {formcontrols?.length
          ? formcontrols?.map((controlsitem) => (
              <FormField
                control={form.control}
                name={controlsitem.id}
                key={controlsitem.id}
                render={({ field }) => {
                  // console.log(field );
                  return (
                    <FormItem className="space-y-2">
                      {' '}
                      <FormLabel className="text-base font-medium text-gray-700">
                        {controlsitem.label}
                      </FormLabel>
                      {controlsitem.componentType === 'input' ? (
                        <FormControl>
                          <Input
                            className="w-full h-12 px-4 text-gray-900 placeholder-gray-500 border border-gray-300 rounded-md shadow-sm 
                            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                            placeholder={controlsitem.placeholder}
                            type={controlsitem.type}
                            {...field}
                          />
                        </FormControl>
                      ) : controlsitem.componentType === 'select' ? (
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger
                              className="w-full h-12 px-4 bg-gray-50 border border-gray-300 rounded-md shadow-sm text-gray-900 
                              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition ease-in-out duration-150"
                            >
                              <span>{field.value || controlsitem.selectlabel || 'Select...'}</span>
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent className="bg-white shadow-lg rounded-md">
                            {controlsitem?.options.map((item) => (
                              <SelectItem key={item} value={item}>
                                {item}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : null}
                      <FormMessage className="text-red-500 text-sm mt-1" />
                    </FormItem>
                  );
                }}
              />
            ))
          : null}
        {
          <p className="text-red-500 text-sm mt-1">
            {UserInfo?.status === STATUSES.ERROR && UserInfo?.error}
          </p>
        }
        
        
        <CommonButton
          type="submit"
          buttonText={btntext}
          className="w-full h-12 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-150 ease-in-out 
          focus:outline-none focus:ring-2 focus:ring-blue-500"
          icon={UserInfo?.status === STATUSES.LOADING}
        />
      </form>
    </Form>
  );
}

export default CommonForm;
