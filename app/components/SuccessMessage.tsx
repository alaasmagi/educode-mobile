import React from 'react';
import { Text, StyleSheet } from 'react-native';
 

interface SuccessMessageProperties {
    text: string; 
}

const styles = StyleSheet.create({
    content: {
        fontWeight: "bold",
        backgroundColor: "#051b11",
        color: "#0a4040",
        fontSize: 18,
        height: 70,
        width: 300,
        alignSelf: "center"
    },
});


const SuccessMessage: React.FC<SuccessMessageProperties> = ({ text }) => {
    return (
        <Text style={styles.content}>{text}</Text>
    );
};

export default SuccessMessage;