import { useFormStore } from '../stores/form';

export default function usePrepareEditData(formData) {
  try {
    const form = useFormStore();

    // console.log(values);
    const dirtyFields = Object.keys(form.getForm).filter((el) => form.getForm[el].dirty);
    const dirtyArr = dirtyFields.map((path) => splitFieldPath(path).join('.'));
    console.log(dirtyArr);
    const deleteItems = [];
    for (const pair of formData.entries()) {
      const pairRep = splitFieldPath(pair[0]);
      if (pairRep.length === 2 && !isNaN(parseInt(pairRep[1]))) {
        continue;
      }
      if (!dirtyArr.includes(pairRep.join('.'))) {
        deleteItems.push(pair[0]);
      }
    }
    deleteItems.forEach((el) => formData.delete(el));
    console.log(deleteItems);
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
