import { FieldValues } from "react-hook-form";


import { InputProps } from "./types";
import { cn } from "@/app/lib/utils";

const Input = <T extends FieldValues>({
  register,
  name,
  className,
  prefixIcon,
  suffixIcon,
  ...props
}: InputProps<T>) => {
  return (
    <div
      className={cn(
        "ring-offset-primary-50 focus-within:ring-primary-50 relative flex h-11 w-full items-center gap-1 rounded-[10px] border border-stroke-color px-3 text-base placeholder:text-white text-white outline-none",
        className
      )}
    >
      <div className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
        {prefixIcon}
      </div>
      <input
        className={`w-full bg-inherit outline-none ring-0 ring-offset-0 placeholder:text-stroke-color ${prefixIcon && "ml-7"} ${props.readOnly && " text-search-gray"} `}
        {...props}
        {...(register && name ? register(name) : {})}
      />
      <div className="absolute right-5 top-1/2 z-10 -translate-y-1/2">
        {suffixIcon}
      </div>
    </div>
  );
};

export default Input;
