import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
 

interface NormalMessageProperties {
    text: string|null; 
}

const styles = StyleSheet.create({
    container: {
        alignSelf: "center",
        textAlign: "center",
        alignItems: "center",
        backgroundColor: "#16325B",
        padding: 15,
        width: "90%",
        borderRadius: 20,
        borderColor: "#4c97ff",
        borderWidth: 2,
    },
    content: {
        fontWeight: "bold",
        color: "#4c97ff",
        fontSize: 18,
    }
});


const NormalMessage: React.FC<NormalMessageProperties> = ({ text }) => {
    return (
        <View style = {styles.container}>
            <Text style={styles.content}>{text}</Text>
        </View>
        
    );
};

export default NormalMessage;