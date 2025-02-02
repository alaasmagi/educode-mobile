import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
 

interface NormalButtonProperties {
    text: string;
    onPress: () => void;   
}

const styles = StyleSheet.create({
    structure: {
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#4492EA",
        justifyContent: "center",
        alignItems: "center",
        width: '90%',
        marginBottom: 25,
        },
    content: {
        color: '#BCBCBD', 
        fontSize: 24,
        fontWeight: 'bold',
        margin: 15,
    },
});


const NormalButton: React.FC<NormalButtonProperties> = ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.structure} onPress={onPress}>
            <Text style={styles.content}>{text}</Text>
        </TouchableOpacity>
    );
};

export default NormalButton;
