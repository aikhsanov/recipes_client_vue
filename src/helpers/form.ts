export default function prepareForm(values) {
  const formData = new FormData();
  prepareFn(values, '', formData);
  console.log(formData, 'formData');
  return formData;
}

// function prepareFn(values, key = '', formData) {
//   try {
//     // TODO: переделать луп под массив и под объекты
//     for (const mainKey in values) {
//       if (Array.isArray(values[mainKey])) {
//         const arr = values[mainKey];
//         const arrOfObjects = arr.find((el) => typeof el === 'object');
//         if (!arrOfObjects) {
//           arr.forEach((el, ind) => {
//             formData.append(`${mainKey}`, el);
//           });
//         } else {
//           arr.forEach((el, ind) => {
//             const newKey = key ? `${key}[${mainKey}][${ind}]` : `${mainKey}[${ind}]`;
//             prepareFn(el, newKey, formData);
//           });
//         }
//       } else if (
//         typeof values[mainKey] === 'object' &&
//         !Array.isArray(values[mainKey]) &&
//         !mainKey.includes('img')
//         // TODO: нормальная проверка на пикчу
//       ) {
//         const obj = values[mainKey];
//         for (const propKey in obj) {
//           const el = obj[propKey];
//           const newKey = key ? `${key}.${mainKey}.${propKey}` : `${mainKey}.${propKey}`;
//           if (typeof el === 'object' || Array.isArray(el)) {
//             prepareFn(el, newKey, formData);
//           } else {
//             const name = key ? `${key}.${mainKey}.${propKey}` : `${mainKey}.${propKey}`;
//             formData.append(`${name}`, el);
//           }
//         }
//       } else {
//         const name = key ? `${key}.${mainKey}` : `${mainKey}`;
//         formData.append(`${name}`, values[mainKey]);
//       }
//     }
//   } catch (e) {
//     console.error(e);
//   }
// }

export function prepareFn(mainObj, parentKey = '', formData) {
  try {
    if (
      typeof mainObj === 'object' &&
      !(mainObj instanceof File) &&
      !(mainObj instanceof Date) &&
      !(mainObj instanceof Blob)
    ) {
      Object.keys(mainObj).forEach((el) => {
        const key = parentKey ? `${parentKey}[${el}]` : `${el}`;
        debugger;
        prepareFn(mainObj[el], key, formData);
      });
    }
    formData.append(`${parentKey}`, mainObj);
    debugger;
  } catch (e) {
    console.error(e);
  }
}

// function prepareArray(values, mainKey, formData) {
//   const arr = values[mainKey];
//   arr.forEach((el, ind) => {
//     if (typeof el === 'object') {
//       for (const propKey in el) {
//         if (el[propKey]) formData.append(`${mainKey}[${ind}].${propKey}`, el[propKey]);
//       }
//     } else {
//       formData.append(`${mainKey}[${ind}]`, el);
//     }
//   });
// }

// function prepareObject(values, mainKey, formData) {
//   const obj = values[mainKey];
//   for (const propKey in obj) {
//     const el = obj[propKey];
//     if (typeof el === 'object') {
//       for (const nestedKey in el) {
//         if (el[nestedKey]) formData.append(`${mainKey}.${propKey}.${nestedKey}.`, el[nestedKey]);
//       }
//     } else {
//       formData.append(`${mainKey}.${propKey}`, el);
//     }
//   }
// }
