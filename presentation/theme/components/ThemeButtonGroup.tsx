import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useThemeColor } from "../hooks/useThemeColor";

interface Props {
  options: string[];
  selectedOptions: string[];
  onSelect: (option: string) => void;
}

const ThemedButtonGroup = ({ options, selectedOptions, onSelect }: Props) => {
  const primaryColor = useThemeColor({}, "primary");
  return (
    <View style={style.container}>
      {options.map((option) => (
        <TouchableOpacity
          key={option}
          onPress={() => onSelect(option)}
          style={[
            style.button,
            selectedOptions.includes(option) && {
              backgroundColor: primaryColor,
            },
          ]}
        >
          <Text
            numberOfLines={1}
            adjustsFontSizeToFit
            style={[
              style.buttonText,
              selectedOptions.includes(option) && style.selectedButtonText,
            ]}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default ThemedButtonGroup;

const style = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  buttonText: {
    fontSize: 16,
  },
  selectedButtonText: {
    color: "#fff",
  },
});
