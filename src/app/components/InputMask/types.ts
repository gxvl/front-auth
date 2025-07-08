import { FieldValues, Path, UseFormRegister } from "react-hook-form";

export interface InputMaskProps<T extends FieldValues> {
  name: Path<T>;
  register: UseFormRegister<T>;
  mask: string;
  className?: string;
  maskPlaceholder?: string | null;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
}
