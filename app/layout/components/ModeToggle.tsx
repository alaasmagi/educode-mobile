import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface ModeToggleProperties {
  textLeft: string;
  textRight: string;
  onPressLeft: () => void;
  onPressRight: () => void;
  isDisabled?: boolean;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#525252",
    borderRadius: 20,
    padding: 2,
  },
  containerDisabled: {
    flexDirection: "row",
    backgroundColor: "#525252",
    borderRadius: 20,
    padding: 2,
    opacity: 0.5,
  },
  option: {
    flex: 1,
    paddingVertical: hp("2%"),
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  selected: {
    backgroundColor: "#1E1E1E",
    borderWidth: 2,
    borderColor: "#4492EA",
  },
  text: {
    color: "#BCBCBD",
    fontSize: wp("6%"),
    fontWeight: "bold",
  },
});

const ModeToggle: React.FC<ModeToggleProperties> = ({
  textLeft,
  textRight,
  onPressLeft,
  onPressRight,
  isDisabled = false,
}) => {
  const [isRight, setIsRight] = useState(false);

  return (
    <View style={isDisabled ? styles.containerDisabled : styles.container}>
      <TouchableOpacity
        style={[styles.option, !isRight && styles.selected]}
        disabled={isDisabled}
        onPress={() => {
          onPressLeft();
          setIsRight(false);
        }}
      >
        <Text style={styles.text}>{textLeft}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.option, isRight && styles.selected]}
        disabled={isDisabled}
        onPress={() => {
          onPressRight();
          setIsRight(true);
        }}
      >
        <Text style={styles.text}>{textRight}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModeToggle;
