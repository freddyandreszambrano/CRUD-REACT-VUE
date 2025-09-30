import { reactive, toRefs } from "vue";
import {required} from "../../../shared/validators.js";

export function useForm(initialValues) {
  const form = reactive({ ...initialValues });
  const errors = reactive({ ...initialValues });

  const handleChange = (key, value) => {
    form[key] = value;
  };

  const validate = () => {
    let valid = true;
    Object.keys(form).forEach((key) => {
      const err = required(form[key]);
      errors[key] = err;
      if (err) valid = false;
    });
    return valid;
  };

  return { ...toRefs(form), errors: toRefs(errors), handleChange, validate };
}
