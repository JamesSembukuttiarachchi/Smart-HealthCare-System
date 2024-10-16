import React from "react";
import { TextInput, TextInputProps } from "react-native";

interface CustomTextInputProps extends TextInputProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
}

const CustomTextInput: React.FC<CustomTextInputProps> = ({
  placeholder,
  keyboardType,
  secureTextEntry,
  value,
  onChangeText,
}) => {
  return (
    <TextInput
      className="border border-gray-300 rounded-lg p-4 mb-4 text-base w-full"
      placeholder={placeholder}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
      placeholderTextColor="#A9A9A9"
      value={value}
      onChangeText={onChangeText}
    />
  );
};

export default CustomTextInput;