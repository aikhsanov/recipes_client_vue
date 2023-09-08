import { useFormStore } from '../stores/form';

export default function usePrepareEditData(formData) {
  try {
    const form = useFormStore();

    const data = {};
    // console.log(values);
    const dirtyFields = Object.keys(form.getForm).filter((el) => form.getForm[el].dirty);

    for (const key of dirtyFields) {
      const path = key.replace(/\[([^\[\]]*)\]/g, '.$1.');
      for (const pair of formData.entries()) {
        const pairRep = pair[0].replace(/\[([^\[\]]*)\]/g, '.$1.');
        if (pairRep !== path) {
          formData.delete(pair[0]);
        }
      }
    }
  } catch (e) {
    console.error(e);
  }
}

function splitFieldPath(path) {
  return path
    .replace(/\[([^\[\]]*)\]/g, '.$1.')
    .split('.')
    .filter((e) => e != '');
}
