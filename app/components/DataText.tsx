import React from 'react';
import { View, Text, TextInput, StyleSheet, Image } from 'react-native';
import { Icons } from './Icons';

interface DataTextProperties {
    iconName: string;
    text:string;
}

const styles= StyleSheet.create({
    container:{
        flexDirection: "row",
        alignSelf: "center",
        alignItems: "center",
        gap: 5
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    text: {
        color: '#BCBCBD',
        fontSize: 20,
        flex: 1,
    },
});

const DataText: React.FC<DataTextProperties> = ({ iconName, text }) => {
    return (
        <View style={styles.container}>
            <Image source={Icons[iconName]} style={styles.icon} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

export default DataText;

