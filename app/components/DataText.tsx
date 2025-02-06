import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Icons } from './Icons';

interface DataTextProperties {
    iconName: string;
    text:string;
}



const DataText: React.FC<DataTextProperties> = ({ iconName, text }) => {
    return (
        <View style= {styles.container}>
            <Image source={Icons[iconName]} style={styles.icon} />
            <Text style={styles.text}>{text}</Text>
        </View>
    );
};

const styles= StyleSheet.create({
    container: {
        flexDirection:"row",
        gap: 10,
        width: "auto",
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    text: {
        color: '#BCBCBD',
        fontSize: 20,
    },
});

export default DataText;

