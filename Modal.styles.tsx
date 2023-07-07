import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const modalStyles = StyleSheet.create({
    
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },

    modalView: {
        margin: 20,
        backgroundColor: Colors.darker,
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 150,
        height: 50,
        marginVertical: 5
    },

    buttonOpen: {
        backgroundColor: "#F194FF"
    },

    buttonConfirm: {
        backgroundColor: "#2196F3"
    },

    buttonClose: {
        backgroundColor: "gray"
    },

    buttonRemove: {
        backgroundColor: "red"
    },

    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    modalText: {
        marginBottom: 15,
        textAlign: "center",
        color: "white",
        fontSize: 20,
        backgroundColor: "gray"
    }
});
