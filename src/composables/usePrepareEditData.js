import { useFormStore } from '../stores/form';

export default function usePrepareEditData(values) {
  const form = useFormStore();

  const data = {};
  console.log(values);
  for (const key in form.getForm) {
    console.log(key, 'KEY');
    console.log(values[`description`], 'values[key]');
    // if (form.getForm[key].dirty && values[key]) {
    //   data[key] = values[key];
    // }
  }
  return data;
}
