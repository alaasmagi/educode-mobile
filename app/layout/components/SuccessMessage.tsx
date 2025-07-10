import React from "react";
import { Text, StyleSheet, View } from "react-native";

interface SuccessMessageProperties {
  text: string | null;
}

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1E3F20",
    padding: 15,
    width: "90%",
    borderRadius: 20,
    borderColor: "#57A773",
    borderWidth: 2,
  },
  content: {
    fontWeight: "bold",
    color: "#57A773",
    fontSize: 18,
  },
});

const SuccessMessage: React.FC<SuccessMessageProperties> = ({ text }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.content}>{text}</Text>
    </View>
  );
};

export default SuccessMessage;
