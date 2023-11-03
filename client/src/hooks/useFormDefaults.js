import { useState } from 'react';


export function useFormDefaults() {

  const [formData, setFormData] = useState({});



  function defaults(
    name,
    placeholder,
    override = {},
    validator = () => true,
    invalidMessage = 'Inte giltig'
  ) {
    return {
      name,
      value: formData[name] || '',
      placeholder,
      required: true,
      autoComplete: 'on',
      maxLength: 50,
      type: 'text',
      onChange: ({ target: t }) => {
        setFormData({ ...formData, [t.name]: t.value })
        // if we have a a validator we expect it to be 
        // a function that returns true or false -> true = valid
        t.setCustomValidity(validator(t.value) ? '' : invalidMessage)
      },
      ...override
    };
  }
  return { defaults, formData, setFormData };

}