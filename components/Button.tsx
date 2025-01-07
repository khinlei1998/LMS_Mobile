import { View, Text, Pressable } from "react-native";
import React from "react";

interface ButtonProps {
  title: string;
  action?: () => void;
}

const Button: React.FC<ButtonProps> = ({ title, action }: ButtonProps) => {
  return (
    <Pressable
      className="bg-blue-700 w-3/4 py-4 rounded-3xl justify-center items-center"
      onPress={action}
    >
      <Text className="text-white">{title} </Text>
    </Pressable>
  );
};

export default Button;
