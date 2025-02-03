import React from 'react';
import { Text, StyleSheet } from 'react-native';
 

interface GreetingProperties {
    text: string; 
}

const styles = StyleSheet.create({
    content: {
        fontWeight: "bold",
        color: "#BCBCBD",
        fontSize: 36,
        alignSelf: "center",
    },
});


const Greeting: React.FC<GreetingProperties> = ({ text }) => {
    return (
        <Text style={styles.content}>{text}</Text>
    );
};

export default Greeting;