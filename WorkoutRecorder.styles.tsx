import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

export const workoutRecorderStyles = StyleSheet.create({

    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: Colors.darker
    },

    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.darker
    },

    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },

    scrollViewContainer: {
        marginBottom: 50
    },

    navbarContainer: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        bottom: 1
    },

    navbarButtonContainer: {
        flex: 1,
        borderColor: "black",
        borderWidth: 3
    },

    dayContainer: {
        marginLeft: 10
    },

    dayButtons: {
        marginVertical: 5
    },

    dayInputText: {
        fontSize: 30,
        borderColor: "white",
        borderBottomWidth: 2,
        backgroundColor: "lightgrey",
        fontWeight: "bold",
        color: "black"
    },

    workoutContainer: {
        marginLeft: 30,
        marginTop: 5
    },

    workoutButtons: {
        marginLeft: 30,
        marginVertical: 5
    },

    workoutInputText: {
        fontSize: 20,
        backgroundColor: "lightblue",
        fontStyle: "italic",
        color: "black"
    },

    setContainer: {
        marginLeft: 30,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },

    setInputText: {
        flex: 1,
        fontSize: 15,
        backgroundColor: "grey",
        margin: 5
    },

    setButtons: {
        marginLeft: 30,
        marginVertical: 5
    },

    setDescriptionText: {
        marginLeft: 30,
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 20
    },

    removeButtonContainer: {
        marginBottom: 10
    }

});