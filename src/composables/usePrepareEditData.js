import { useFormStore } from '../stores/form';

export default function usePrepareEditData(values) {
  const form = useFormStore();

  const data = {};
  // console.log(values);
  const dirtyFields = Object.keys(form.getForm).filter((el) => form.getForm[el].dirty);
  console.log(dirtyFields);
  // for (const key in values) {
  //   if (form.getForm[key] && form.getForm[key].dirty) {
  //     data[key] = values[key];
  //   }
  // }

  for (const key of dirtyFields) {
    const path = splitFieldPath(key);
    console.log(path);
    path.reduce((acc, n, i, arr) => {
      const pv = arr[i - 1];
      const nx = arr[i + 1];
      if (i === 0) {
        acc[n] = !isNaN(parseInt(nx)) ? [] : {};
      }
      if (!isNaN(parseInt(n))) {
        acc[pv].push[];
      }
      data[n] = acc[n];
      return acc;
    }, {});
  }
  console.log(data, 'DATA');
  return data;
}

function splitFieldPath(path) {
  return path
    .replace(/\[([^\[\]]*)\]/g, '.$1.')
    .split('.')
    .filter((e) => e != '');
}
