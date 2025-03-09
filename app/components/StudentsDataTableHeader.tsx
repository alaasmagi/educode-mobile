import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View } from 'react-native';
import NavigationProps from '../../types'
import { Icons } from './Icons';

const styles = StyleSheet.create({
    structure: {
        flexDirection: "row",
        width: "100%",
        borderColor: "#BCBCBD",
        borderRadius: 10,
        backgroundColor: "#1E1E1E",
        borderWidth: 0.5,
        paddingHorizontal: "13%",
        paddingVertical: 5,
        alignItems:"center",
        gap: "49%"
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
        </View>
    );
};

export default StudentsDataTableHeader;