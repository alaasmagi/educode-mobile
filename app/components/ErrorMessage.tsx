import React from 'react';
import { Text, StyleSheet } from 'react-native';
 

interface ErrorMessageProperties {
    text: string; 
}

const styles = StyleSheet.create({
    content: {
        fontWeight: "bold",
        color: "#BCBCBD",
        fontSize: 40,
        alignSelf: "center"
    },
});


const ErrorMessage: React.FC<ErrorMessageProperties> = ({ text }) => {
    return (
        <Text style={styles.content}>{text}</Text>
    );
};

export default ErrorMessage;