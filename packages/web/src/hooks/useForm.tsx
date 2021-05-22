import { useState } from 'react';

export const useForm = (initialValue: number | string = '') => {
  const [state, setState] = useState<typeof initialValue>(initialValue);

  const handleChange = (val: string) => {
    setState(val);
  };

  const resetState = () => {
    const val = typeof initialValue == 'string' ? '' : 0;
    setState(val);
  };

  return [state, handleChange, resetState];
};
