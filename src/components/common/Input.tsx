import { useState, ChangeEvent } from "react";
import cn from "classnames";
import debounce from "lodash/debounce";

interface InputProps {
  title?: string;
  regEx?: RegExp;
  placeholder?: string;
  inputValue: string;
  setInputValue: (inputValue: string) => void;
  disabled?: boolean;
  errorText?: string;
}

function Input({ title, regEx, placeholder, inputValue, setInputValue, disabled, errorText }: InputProps) {
  const [isError, setIsError] = useState<boolean>(false);

  const validInput = (text: string) => {
    if (regEx) {
      const isValid = regEx.test(text);
      setIsError(!isValid);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setInputValue(value);
    debounce(() => {
      validInput(value);
    }, 500)();
  };

  return (
    <div className={cn("input-wrap")}>
      {title && <span className={cn("input-title")}>{title}</span>}
      <input
        type="text"
        disabled={disabled}
        value={inputValue}
        onChange={(e) => handleChange(e)}
        placeholder={placeholder}
        className={cn(isError && "error")}
      />
      {isError && <span className={cn("error-text")}>{errorText}</span>}
    </div>
  );
}

export default Input;
