export default function prepareForm(values) {
  const formData = new FormData();
  prepareFn(values, '', formData);
  console.log(formData, 'formData');
  return formData;
}

export function prepareFn(data, parentKey = '', formData) {
  try {
    if (
      typeof data === 'object' &&
      !(data instanceof File) &&
      !(data instanceof Date) &&
      !(data instanceof Blob)
    ) {
      Object.keys(data).forEach((el) => {
        const key = parentKey ? `${parentKey}[${el}]` : el;
        prepareFn(data[el], key, formData);
      });
    } else {
      const value = data == null ? '' : data;
      formData.append(parentKey, value);
    }
  } catch (e) {
    console.error(e);
  }
}
