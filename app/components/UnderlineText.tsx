import React from 'react';
import {  StyleSheet, Text } from 'react-native';


interface UnderlinetextProperties {
    text: string
}


const styles= StyleSheet.create({
    text: {
        color: "#BCBCBD",
        fontSize: 25,
        textDecorationLine: "underline",
        textAlign: "center",
        alignSelf: "center",
        maxWidth: "80%",
        margin: 5
    }
});

const UnderlineText: React.FC<UnderlinetextProperties> = ({ text }) => {
    return (
        <Text style={styles.text}>{text}</Text>
    );
};

export default UnderlineText;