import React from 'react';
import { View, TextInput, StyleSheet, Image } from 'react-native';
import { Icons } from './Icons';


interface TextBoxProperties {
    iconName: string;
    placeHolder: string;
    value?: string;
    onChangeText?: (text: string) => void;
    isPassword?: boolean;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    editable?: boolean;
}


const styles= StyleSheet.create({
    textBoxContainer:{
        width: '80%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    },
    icon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    input: {
        color: '#BCBCBD',
        fontSize: 20,
        flex: 1,
    },
    inputDisabled: {
        color: '#BCBCBD',
        fontSize: 20,
        flex: 1,
        opacity: 0.5
    },
    underline: {
        height: 1,
        backgroundColor: '#BCBCBD',
    }
});

const TextBox: React.FC<TextBoxProperties> = ({ iconName, placeHolder, value, onChangeText, isPassword, autoCapitalize = "sentences", editable = true}) => {
    return (
        <View style={styles.textBoxContainer}>
            <View style={styles.inputContainer}>
                <Image source={Icons[iconName]} style={styles.icon} />
                <TextInput 
                    placeholder={placeHolder} 
                    placeholderTextColor="#BCBCBD" 
                    style={editable == false ? styles.inputDisabled : styles.input} 
                    scrollEnabled={true} 
                    numberOfLines={1} 
                    secureTextEntry={isPassword} 
                    value={value} 
                    onChangeText={onChangeText} 
                    autoCapitalize={autoCapitalize} 
                    editable={editable}/>
            </View>
            <View style={styles.underline} />
        </View>
    );
};

export default TextBox;

