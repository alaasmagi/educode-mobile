import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import NavigationProps from '../../types'
import { Icons } from './Icons';

interface SettingsButtonProperties {
    onPress: () => void;   
}

const styles = StyleSheet.create({
    structure: {
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#4492EA",
        height: 65
    },
    icon: {
        height: 40,
        width: 40,
        margin: 10
    }
});

const SettingsButton: React.FC<SettingsButtonProperties> = ({ onPress }) => {
    return (
        <TouchableOpacity style={styles.structure} onPress={onPress}>
            <Image source={Icons["account-settings-icon"]} style={styles.icon} />
        </TouchableOpacity>
    );
};

export default SettingsButton;
