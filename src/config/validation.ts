import { defineRule, configure, useForm } from 'vee-validate';
import { required, email, confirmed, numeric, regex } from '@vee-validate/rules';

const setDefaultValidationRules = () => {
  configure({
    generateMessage: (context) => {
      if (context.rule?.name === 'required') {
        // console.log(context, 'CONTEXT');
        return `Поле ${context.field} обязательно для заполнения`;
      }
      if (context.rule?.name === 'email') {
        return `${context.field} должен быть правильного формата`;
      }
      if (context.rule?.name === 'confirmed') {
        return `${context.field} должен совпадать`;
      }
      if (context.rule?.name === 'numeric') {
        return `Поле ${context.field} должно быть числовым`;
      }
      if (context.rule?.name === 'regex') {
        return `Поле ${context.field} не подходит под заданное правило`;
      }
      return `${context.field} содержит некоректные данные`;
    },
  });

  defineRule('required', required);
  defineRule('email', email);
  defineRule('confirmed', confirmed);
  defineRule('numeric', numeric);
  defineRule('regex', regex);

  defineRule(
    'decimal',
    (
      value: string,
      { decimals = '*', separator = '.' }: Record<string, string>
    ): boolean | string => {
      if (value === null || value === undefined || value === '') {
        return false;
      }

      // if is 0.
      if (Number(decimals) === 0) {
        return /^-?\d*$/.test(value);
      }

      const regexPart = decimals === '*' ? '+' : `{1,${decimals}}`;
      const regex = new RegExp(`^[-+]?\\d*(\\${separator}\\d${regexPart})?([eE]{1}[-]?\\d+)?$`);

      if (!regex.test(value)) {
        return `Поле должно быть числовым и может содержать до ${decimals} десятичных чисел`;
      }

      const parsedValue = parseFloat(value);

      return parsedValue === parsedValue;
    }
  );

  defineRule('minMax', (value: string, { min, max }: Record<string, string>): boolean | string => {
    // The field is empty so it should pass
    if (!value || !value.length) {
      return true;
    }
    const numericValue = Number(value);
    if (numericValue < Number(min)) {
      return `Поле должно быть ≥ ${min}`;
    }
    if (numericValue > Number(max)) {
      return `Поле должно быть ≤ ${max}`;
    }
    return true;
  });

  // defineRule('arrayOfObjects', (value: [], { field }): any => {
  //   const { setFieldError, setErrors } = useForm();
  //
  //   // The field is empty so it should pass
  //   console.log(value.length, 'VALUE');
  //   console.log(field, 'context');
  //   if (!value || !value.length) {
  //     return true;
  //   }
  //   const errors = [];
  //   value.forEach((obj, ind) => {
  //     for (const o in obj) {
  //       if (!obj[o]) {
  //         const p = `ingridients[${ind}].${o}`;
  //         console.log(p, 'P');
  //         setFieldError(`ingridients[${ind}].${o}`, `Поле должны быть заполнено`);
  //       }
  //     }
  //   });
  //   // setErrors(errors);
  //   console.log(errors, 'ERROR');
  //   return true;
  // });
};
export default setDefaultValidationRules;
