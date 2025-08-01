"use client";

import { FieldValues } from "react-hook-form";
import ReactInputMask from "react-input-mask";
import { InputMaskProps } from "./types";
import { cn } from "@/app/lib/utils";


const InputMask = <T extends FieldValues>({
  mask,
  register,
  name,
  className,
  ...props
}: InputMaskProps<T>) => {
  return (
    <ReactInputMask
      className={cn(
        "ring-offset-primary-50 focus-within:border-primary-300 focus-within:ring-primary-50 h-11 items-center gap-1 rounded-lg border border-neutral-500 px-3 text-sm outline-none focus-within:ring-1 focus-within:ring-offset-2",
        className
      )}
      {...props}
      {...(register && register(name))}
      mask={mask}
      maskPlaceholder={null}
    />
  );
};

export default InputMask;
