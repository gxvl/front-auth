import { FieldValues } from "react-hook-form";

import { InputFieldProps } from "./types";
import { cn } from "@/app/lib/utils";
import Input from "../Input/input";
import Label from "../Label/label";
import FormErrorLabel from "../FormErrorLabel/formErrorLabel";
import InputMask from "../InputMask/inputMask";


const InputField = <T extends FieldValues>({
  register,
  name,
  className,
  mask,
  formErrors,
  label,
  labelClassname,
  currency = false,
  control,
  required,
  requiredVisual,
  prefixIcon,
  suffixIcon,
  ...props
}: InputFieldProps<T>) => {
  const errorMessage = formErrors && name ? formErrors[name]?.message : null;

  if (currency && control) {
    return (
      <div className="flex flex-col gap-1">
        {label && <Label>{label}</Label>}

        {errorMessage && (
          <FormErrorLabel>{errorMessage.toString()}</FormErrorLabel>
        )}
      </div>
    );
  }

  if (mask) {
    return (
      <div className="flex flex-col gap-1">
        {label && <Label>{label}</Label>}
        <InputMask
          {...props}
          className={className}
          mask={mask}
          name={name}
          register={register}
        />

        {errorMessage && (
          <FormErrorLabel>{errorMessage.toString()}</FormErrorLabel>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label
        htmlFor={name}
          className={cn(
            "text-sm text-white font-semibold",
            labelClassname
          )}
        >
          {required && requiredVisual && (
            <span className="mr-1 font-bold text-red-500">*</span>
          )}
          {label}
          {!required && !requiredVisual && (
            <span className="ml-1 font-normal italic text-gray-500">
              {" "}
              (opcional){" "}
            </span>
          )}
        </label>
      )}
      <Input
        {...props}
        className={className}
        name={name}
        register={register}
        prefixIcon={prefixIcon}
        suffixIcon={suffixIcon}
      />

      {errorMessage && (
        <FormErrorLabel>{errorMessage.toString()}</FormErrorLabel>
      )}
    </div>
  );
};

export default InputField;
