import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Icons } from './Icons';


interface TextBoxProperties {
    iconName: string;
    placeHolder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    isPassword?: boolean; 
}


const styles= StyleSheet.create({
    textBoxContainer:{
        width: '80%',
        alignSelf: 'center',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 5,
        resizeMode: 'contain',
    },
    input: {
        color: '#BCBCBD',
        fontSize: 20,
        flex: 1,
    },
    underline: {
        height: 1,
        backgroundColor: '#BCBCBD',
    }
});

const TextBox: React.FC<TextBoxProperties> = ({ iconName, placeHolder, value, onChangeText, isPassword }) => {
    return (
        <View style={styles.textBoxContainer}>
            <View style={styles.inputContainer}>
                <Image source={Icons[iconName]} style={styles.icon} />
                <TextInput placeholder={placeHolder} placeholderTextColor="#BCBCBD" style={styles.input} scrollEnabled={true} numberOfLines={1} secureTextEntry={isPassword} 
                            value={value} onChangeText={onChangeText} />
            </View>
            <View style={styles.underline} />
        </View>
    );
};

export default TextBox;

