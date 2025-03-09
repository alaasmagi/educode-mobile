import React from 'react';
import { TouchableOpacity, Image, StyleSheet, View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Icons } from './Icons';

interface StudentDataCellProperties {
    onPressButton: () => void;   
    studentCode: string;
    workplaceId?: string;   
}

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
    dataText: {
        color: "#BCBCBD",
        fontSize: 20,
    },
    icon: {
        height: 30,
        width: 30,
    }
});

const StudentDataCell: React.FC<StudentDataCellProperties> = ({ onPressButton, studentCode, workplaceId }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.structure}>
            <Text style={styles.dataText}>{studentCode}</Text>
            <Text style={styles.dataText}>{workplaceId ?? t("no-workplace2")}</Text>
            <TouchableOpacity onPress={onPressButton}>
                <Image source={Icons["bin-icon"]} style={styles.icon} />
            </TouchableOpacity>
        </View>
        
    );
};

export default StudentDataCell;
