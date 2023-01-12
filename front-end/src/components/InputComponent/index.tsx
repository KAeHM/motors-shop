import React from "react";

import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

interface IMainProps {
  isError?: boolean;
  formLabel: string;
  formHelperText?: string;
  formErrorMessage?: string;
  inputType: React.HTMLInputTypeAttribute;
  placeholder?: string;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputComponent({
  isError,
  formLabel,
  formErrorMessage,
  formHelperText,
  inputType,
  placeholder,
  value,
  setValue,
}: IMainProps) {
  const handleInputChange = (e: {
    target: { value: React.SetStateAction<string> };
  }) => setValue(e.target.value);

  return (
    <FormControl isInvalid={isError}>
      <FormLabel>{formLabel}</FormLabel>
      <Input
        size={"lg"}
        placeholder={placeholder}
        type={inputType}
        value={value}
        onChange={handleInputChange}
      />
      {!isError ? (
        <FormHelperText>{formHelperText}</FormHelperText>
      ) : (
        <FormErrorMessage>{formErrorMessage}</FormErrorMessage>
      )}
    </FormControl>
  );
}
