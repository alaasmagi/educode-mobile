import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import StudentsDataTableHeader from '../components/StudentsDataTableHeader';
import StudentDataCell from '../components/StudentDataCell';
import StudentAttendanceModel from '../models/StudentAttendanceModel';

interface StudentsTableProperties {
    students:StudentAttendanceModel[]
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        borderColor: "#BCBCBD",
        borderRadius: 12,
        borderWidth: 2,
    },
    scrollviewContainer: {
        height: 180
    },

    structure: {
        flexGrow: 1,
        gap: 2
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

const StudentsTable: React.FC<StudentsTableProperties> = ({ students }) => {
    const { t } = useTranslation();
    return (
        <View style={styles.container}>
            <StudentsDataTableHeader/>
            <ScrollView style={styles.scrollviewContainer} contentContainerStyle={styles.structure} showsVerticalScrollIndicator={true}>
                {students.map((student, index) => (
                <StudentDataCell
                    studentCode={student.studentCode}
                    workplaceId={student.workplaceId}
                    onPressButton={() => console.log(`Pressed button for student ${student.studentCode}`)}/>))}
            </ScrollView>
        </View>        
    );
};

export default StudentsTable;
