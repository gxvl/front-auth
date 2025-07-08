import { forwardRef } from "react";

import { Slot } from "@radix-ui/react-slot";
import Image from "next/image";
import { tv } from "tailwind-variants";

import { cn } from "@/lib/utils";


import LoadingComponent from "../Loading/loading";
import { ButtonProps, Ref } from "./types";

export const buttonVariants = tv({
  base: "rounded-lg outline-none flex flex-row items-center justify-center gap-2 transition-colors cursor-pointer border disabled:cursor-not-allowed font-semibold",
  variants: {
    size: {
      sm: "py-2 px-3.5 text-sm",
      md: "py-2.5 px-4 text-sm",
      lg: "py-2.5 px-[18px] text-base",
      xl: "py-3 px-5 text-base",
      xxl: "py-4 px-7 text-lg",
    },
    variant: {
      success:
        "bg-default-blue hover:bg-gray-700 disabled:bg-primary-50 font-normal rounded-[10px] disabled:border-primary-50 active:bg-primary-600 border-primary-600 hover:border-primary-700 text-white disabled:text-primary-400",
      "secondary-gray":
        "border-gray-300 bg-base-white hover:bg-gray-50 disabled:bg-gray-50 disabled:border-gray-200 text-gray-700 disabled:text-gray-300",
      "secondary-color":
        "bg-primary-50 border-primary-700 hover:bg-primary-100 hover:border-primary-100 disabled:bg-primary-25 disabled:border-primary-25 text-primary-800 disabled:text-primary-300",
      "tertiary-gray":
        "bg-transparent border-transparent hover:bg-gray-50 text-gray-600 disabled:text-gray-300",
      "tertiary-color":
        "bg-transparent border-transparent hover:bg-primary-50 text-primary-700 disabled:text-gray-300",
      secondary:
        "bg-white hover:bg-primary-700 disabled:bg-primary-50 font-normal rounded-[10px] disabled:border-primary-50 active:bg-primary-600 hover:border-primary-700 text-default-blue disabled:text-primary-400 border-white",
      destructive:
        "bg-error-600 border-error-600 hover:border-bg-error-700 hover:bg-error-700 disabled:bg-error-200 disabled:border-error-200 text-base-white disabled:text-base-white",
      disabled: "bg-gray-300 text-white font-medium cursor-not-allowed",
    },
  },
  defaultVariants: {
    size: "md",
    variant: "success",
  },
});

const Button = forwardRef<Ref, ButtonProps>(
  (
    {
      loading = false,
      disabled,
      className,
      size,
      variant = "success",
      asChild = false,
      prefix,
      suffix,
      fixSize,
      ...props
    },
    ref
  ) => {
    const loadingVariant = {
      "secondary-color": "text-primary-600",
      "secondary-gray": "text-gray-800",
      success: "text-base-white",
      secondary: "text-default-blue",
      destructive: "text-base-white",
      disabled: "text-gray-400",
      "tertiary-color": "text-base-white",
      "tertiary-gray": "text-base-white",
    } as const;

    const Comp = asChild ? Slot : "button";

    if (loading) {
      return (
        <Comp
          className={buttonVariants({
            className,
            size,
            variant,
          })}
          ref={ref}
          disabled={true}
        >
          <LoadingComponent
            className={cn("h-4 w-4", loadingVariant[variant as keyof typeof loadingVariant])}
          />
          {prefix && (
            <Image src={prefix} alt={prefix} width={fixSize} height={fixSize} />
          )}
          {props.children}
          {suffix && (
            <Image src={suffix} alt={suffix} width={fixSize} height={fixSize} />
          )}
        </Comp>
      );
    }

    if (disabled)
      return (
        <Comp
          disabled={disabled}
          className={buttonVariants({
            className,
            size,
            variant: "disabled",
          })}
          ref={ref}
          {...props}
        />
      );

    return (
      <Comp
        disabled={disabled}
        className={buttonVariants({
          className,
          size,
          variant,
        })}
        ref={ref}
        {...props}
      >
        {prefix && (
          <Image src={prefix} alt={prefix} width={fixSize} height={fixSize} />
        )}
        {props.children}
        {suffix && (
          <Image src={suffix} alt={suffix} width={fixSize} height={fixSize} />
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export default Button;
