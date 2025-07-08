import { LabelProps } from "./types";


const Label = ({ children, name }: LabelProps) => {
  return (
    <label
      className={`cursor-pointer text-sm font-medium text-gray-700`}
      htmlFor={name}
    >
      {children}
    </label>
  );
};

export default Label;
