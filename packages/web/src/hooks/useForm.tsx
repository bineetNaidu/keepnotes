import { useState } from 'react';

export const useForm = (initialValue: any = '') => {
  const [state, setState] = useState<any>(initialValue);

  const handleChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setState(e.target.value);
  };

  const resetState = () => {
    const val = typeof initialValue == 'string' ? '' : 0;
    setState(val);
  };

  return [state, handleChange, resetState];
};
