import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
 

interface ErrorMessageProperties {
    text: string; 
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        textAlign: "center",
        alignItems: "center",
        backgroundColor: "#3f1e20",
        padding: 15,
        width: "90%",
        borderRadius: 20,
        borderColor: "#dd2d4a",
        borderWidth: 2,
    },
    content: {
        fontWeight: "bold",
        color: "#dd2d4a",
        fontSize: 18,
    }
});


const ErrorMessage: React.FC<ErrorMessageProperties> = ({ text }) => {
    return (
        <View style = {styles.container}>
            <Text style={styles.content}>{text}</Text>
        </View>
        
    );
};

export default ErrorMessage;