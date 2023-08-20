import { useFormStore } from '../stores/form';

export default function usePrepareEditData(values) {
  const form = useFormStore();

  const data = {};
  console.log(values);
  for (const key in values) {
    if (form.getForm[key] && form.getForm[key].dirty) {
      data[key] = values[key];
    }
  }
  return data;
}
