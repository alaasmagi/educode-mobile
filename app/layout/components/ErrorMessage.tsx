import React from "react";
import { Text, StyleSheet, View } from "react-native";

interface ErrorMessageProperties {
  text: string | null;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    textAlign: "center",
    alignItems: "center",
    backgroundColor: "#3F1E20",
    padding: 15,
    width: "90%",
    borderRadius: 20,
    borderColor: "#DD2D4A",
    borderWidth: 2,
  },
  content: {
    fontWeight: "bold",
    color: "#DD2D4A",
    textAlign: "center",
    fontSize: 18,
  },
});

const ErrorMessage: React.FC<ErrorMessageProperties> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{text}</Text>
    </View>
  );
};

export default ErrorMessage;
