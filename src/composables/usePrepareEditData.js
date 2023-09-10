import { useFormStore } from '../stores/form';

export default function usePrepareEditData(formData) {
  try {
    const form = useFormStore();

    // console.log(values);
    const dirtyFields = Object.keys(form.getForm).filter((el) => form.getForm[el].dirty);
    const dirtyArr = dirtyFields.map((path) => splitFieldPath(path).join('.'));
    const deletItems = [];
    for (const pair of formData.entries()) {
      const pairRep = splitFieldPath(pair[0]).join('.');

      if (!dirtyArr.includes(pairRep)) {
        deletItems.push(pair[0]);
      }
    }
    deletItems.forEach((el) => formData.delete(el));
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
