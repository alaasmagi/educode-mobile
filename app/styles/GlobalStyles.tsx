import { StyleSheet, Platform, StatusBar } from "react-native";

export default StyleSheet.create({
    
    // Overall safe area
    anrdoidSafeArea: {
        flex: 1,
        backgroundColor: '#2B2B2B',
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        paddingBottom: 20,
        paddingLeft: 20,
        paddingRight: 20,
    },

    // Default button
    normalButton: {
        backgroundColor: "#1E1E1E",
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#4492EA",
        justifyContent: "center",
        alignItems: "center",
        width: 300,
        marginBottom: 25,
        },
    buttonText: {
        color: '#BCBCBD', 
        fontSize: 24,
        fontWeight: 'bold',
        margin: 15,
    },

    //Separator line
    lineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: 30,
        marginTop: 5,
    },
    line: {
        flex: 1,
        height: 1,
        backgroundColor: '#BCBCBD', 
    },
    lineText: {
        color: '#BCBCBD',
        fontSize: 16,
        marginHorizontal: 10,
    },

    // Textbox
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width:"80%",
        marginTop: 10,
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 8,
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
        width: '85%',
        marginTop: 2,
        marginBottom: 15,
    },
})