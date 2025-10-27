import { useState, useEffect } from 'react';

export const DebouncedInput = ({ value, onChange, ...rest }) => {
  const [innerValue, setInnerValue] = useState('');
  const [timerId, setTimerId] = useState();
  const handleChange = evt => {
    timerId && clearTimeout(timerId);
    setInnerValue(evt.target.value);
    setTimerId(setTimeout(() => onChange(evt), 1000));
  };

  useEffect(() => setInnerValue(value), [value]);

  return (
    <input value={innerValue} onChange={handleChange} {...rest} />
  );
};
