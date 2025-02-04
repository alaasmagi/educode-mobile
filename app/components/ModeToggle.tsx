import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ModeToggleProperties {
    textLeft: string;
    textRight: string;
    onPressLeft: () => void;
    onPressRight: () => void;   
}

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#525252',
      borderRadius: 20,
      padding: 2
    },
    option: {
      flex: 1,
      paddingVertical: 15,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: "center"
    },
    selected: {
      backgroundColor: '#1E1E1E',
      borderWidth: 2,
      borderColor: '#4492EA'
    },
    text: {
      color: '#BCBCBD',
      fontSize: 24,
      fontWeight: 'bold'
    }
  });


const ModeToggle: React.FC<ModeToggleProperties> = ({ textLeft, textRight, onPressLeft, onPressRight }) => {
  const [isRight, setIsRight] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={[styles.option, !isRight && styles.selected]} onPress={() => {onPressLeft(); setIsRight(false)}}>
        <Text style={styles.text}>{textLeft}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.option, isRight && styles.selected]} onPress={() => {onPressRight(); setIsRight(true)}}>
        <Text style={styles.text}>{textRight}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ModeToggle;
