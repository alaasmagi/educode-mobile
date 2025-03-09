import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import NavigationProps from '../../types'
import { Icons } from './Icons';

const styles = StyleSheet.create({
    structure: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
        backgroundColor: "#1E1E1E",
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems:"center",
    },
    icon: {
        height: 30,
        width: 30,
    }
});

const StudentsDataTableHeader = () => {
    return (
        <View style={styles.structure}> 
            <Image source={Icons["person-icon"]} style={styles.icon} />
            <Image source={Icons["work-icon"]} style={styles.icon} />
            <Image />
        </View>
    );
};

export default StudentsDataTableHeader;