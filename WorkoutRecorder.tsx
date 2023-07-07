import React, { useEffect, useState } from "react";
import {
    ScrollView,
    View,
    Button,
    Text,
    TextInput,
    Modal,
    Alert,
    Pressable,
} from "react-native";
import { workoutRecorderStyles } from "./WorkoutRecorder.styles";
import { modalStyles } from "./Modal.styles";
import { Colors } from "react-native/Libraries/NewAppScreen";
import AsyncStorage from "@react-native-async-storage/async-storage"
import DropDownPicker from "react-native-dropdown-picker";

function WorkoutRecorder(): JSX.Element {

    // State Hooks
    const [data, setData] = useState(
        {
            schedule: {
                days: 
                [
                    {
                        dayName: "",
                        workouts: 
                        [
                            {
                                workoutName: "",
                                sets: 
                                [
                                    {
                                        weight: "",
                                        reps: ""
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    );

    const [saveModalVisible, setSaveModalVisible] = useState(false);
    const [saveName, setSaveName] = useState("");
    const [loadModalVisible, setLoadModalVisible] = useState(false)

    const [loadPickerOpen, setLoadPickerOpen] = useState(false);
    const [saveNameToLoad, setSaveNameToLoad] = useState(null);
    const [saveNames, setSaveNames] = useState([{label: "", value: ""}]);

    useEffect(() => {
        performInitialSetup();
    }, []);

    async function performInitialSetup() {
        await AsyncStorage.setItem("Default", JSON.stringify(
            {
                schedule: {
                    days: 
                    [
                        {
                            dayName: "",
                            workouts: 
                            [
                                {
                                    workoutName: "",
                                    sets: 
                                    [
                                        {
                                            weight: "",
                                            reps: ""
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            }
        ));
        DropDownPicker.setTheme("DARK");
    }
    
    function addDay() {
        const newData = {...data};
        newData.schedule.days = [...data.schedule.days,
            {
                dayName: "",
                workouts: 
                [
                    {
                        workoutName: "",
                        sets: 
                        [
                            {
                                weight: "",
                                reps: ""
                            }
                        ]
                    }
                ]
            }
        ];
        setData(newData);
    }

    function removeDay() {
        const newData = {...data};
        newData.schedule.days = data.schedule.days.slice(0, -1);
        setData(newData);
    }

    function addWorkout(dayIndex: number) {
        const newData = {...data};
        newData.schedule.days[dayIndex].workouts = [...data.schedule.days[dayIndex].workouts, 
            {
                workoutName: "",
                sets: 
                [
                    {
                        weight: "",
                        reps: ""
                    }
                ]
            },
        ];
        setData(newData);
    }

    function removeWorkout(dayIndex: number) {
        const newData = {...data};
        newData.schedule.days[dayIndex].workouts = data.schedule.days[dayIndex].workouts.slice(0, -1);
        setData(newData);
    }

    function addSet(dayIndex: number, workoutIndex: number) {
        const newData = {...data};
        newData.schedule.days[dayIndex].workouts[workoutIndex].sets = [...data.schedule.days[dayIndex].workouts[workoutIndex].sets, 
            {
                weight: "",
                reps: ""
            }
        ];
        setData(newData);
    }

    function removeSet(dayIndex: number, workoutIndex: number) {
        const newData = {...data};
        newData.schedule.days[dayIndex].workouts[workoutIndex].sets = data.schedule.days[dayIndex].workouts[workoutIndex].sets.slice(0, -1);
        setData(newData);
    }


    function setDayName(value: string, dayIndex: number) {
        const newData = {...data};
        newData.schedule.days[dayIndex].dayName = value;
        setData(newData);
    }

    function setWorkoutName(value: string, dayIndex: number, workoutIndex: number) {
        const newData = {...data};
        newData.schedule.days[dayIndex].workouts[workoutIndex].workoutName = value;
        setData(newData);
    }

    function setWeight(value: string, dayIndex: number, workoutIndex: number, setIndex: number) {
        const newData = {...data};
        newData.schedule.days[dayIndex].workouts[workoutIndex].sets[setIndex].weight = value;
        setData(newData);
    }

    function setReps(value: string, dayIndex: number, workoutIndex: number, setIndex: number) {
        const newData = {...data};
        newData.schedule.days[dayIndex].workouts[workoutIndex].sets[setIndex].reps = value;
        setData(newData);
    }

    async function saveData() {
        setSaveModalVisible(false);
        await AsyncStorage.setItem(saveName, JSON.stringify(data));
        setSaveName("");
    }

    async function loadSaveNames() {
        const allKeys = await AsyncStorage.getAllKeys();
        setSaveNames(allKeys.map( (key) => ({label: key, value: key})));
    }

    async function removeSaveName() {
        await AsyncStorage.removeItem((saveNameToLoad != null) ? saveNameToLoad : "Default");
        loadSaveNames();
    }

    async function loadData() {
        setLoadModalVisible(false);
        const jsonSaveData = await AsyncStorage.getItem((saveNameToLoad != null) ? saveNameToLoad : "Default");
        setData(JSON.parse( (jsonSaveData != null) ? jsonSaveData : `{
            schedule: {
                days: 
                [
                    {
                        dayName: "",
                        workouts: 
                        [
                            {
                                workoutName: "",
                                sets: 
                                [
                                    {
                                        weight: "",
                                        reps: ""
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }`));
    }

    return (

        <View style = { workoutRecorderStyles.container }>
            {/* Save Data View */}
            <View style = {modalStyles.centeredView}>
                <Modal
                    animationType = "slide"
                    transparent = {true}
                    visible = {saveModalVisible}
                    onRequestClose = {()  => {
                        Alert.alert("Modal has been closed.");
                        setSaveModalVisible(false);
                    }}>
                    <View style = {modalStyles.centeredView}>
                        <View style = {modalStyles.modalView}>
                            <TextInput value = {saveName} onChangeText = {(value) => setSaveName(value)} placeholder = "Save Name" style = {modalStyles.modalText} />
                            <Pressable
                                style = {[modalStyles.button, modalStyles.buttonClose]}
                                onPress = { () => setSaveModalVisible(false) }>
                                <Text style = {modalStyles.textStyle}>Close</Text>
                            </Pressable>
                            <Pressable
                                style = {[modalStyles.button, modalStyles.buttonConfirm]}
                                onPress = {saveData}>
                                <Text style = {modalStyles.textStyle}>Save</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
            
            {/* Load Data Modal View */}
            <View style = {modalStyles.centeredView}>
                <Modal
                    animationType = "slide"
                    transparent = {true}
                    visible = {loadModalVisible}
                    onRequestClose = {()  => {
                        Alert.alert("Modal has been closed.");
                        setLoadModalVisible(false);
                    }}>
                    <View style = {modalStyles.centeredView}>
                        <View style = {modalStyles.modalView}>
                            <DropDownPicker
                                open = {loadPickerOpen}
                                setOpen = {setLoadPickerOpen}
                                value = {saveNameToLoad}
                                setValue = {setSaveNameToLoad}
                                items = {saveNames}
                                setItems = {setSaveNames}
                            />
                            <Pressable
                                style = {[modalStyles.button, modalStyles.buttonRemove]}
                                onPress = {removeSaveName}>
                                <Text style = {modalStyles.textStyle}>Remove</Text>
                            </Pressable>
                            <Pressable
                                style = {[modalStyles.button, modalStyles.buttonClose]}
                                onPress = { () => setLoadModalVisible(false) }>
                                <Text style = {modalStyles.textStyle}>Close</Text>
                            </Pressable>
                            <Pressable
                                style = {[modalStyles.button, modalStyles.buttonConfirm]}
                                onPress = {loadData}>
                                <Text style = {modalStyles.textStyle}>Load</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
            
            {/* Schedule View */}
            <ScrollView style = { workoutRecorderStyles.scrollViewContainer } >
                <View style = { workoutRecorderStyles.dayButtons }>
                    <Button title = "Add Day" onPress = {addDay} color = {"green"} />
                    <Button title = "Remove Day" onPress = {removeDay} color = {"red"} />
                </View>
                { 
                    data.schedule.days.map( (day, dayIndex) => (
                        <View key = {`${dayIndex}`} style = { workoutRecorderStyles.dayContainer }>
                            <TextInput 
                                value = { day.dayName } 
                                placeholder = "Enter day name" 
                                onChangeText = { (value) => setDayName(value, dayIndex) } 
                                style = { workoutRecorderStyles.dayInputText } 
                                placeholderTextColor = { Colors.darker }
                            />
                            { 
                                day.workouts.map( (workout, workoutIndex) => (
                                    <View key = {`${dayIndex}-${workoutIndex}`} style = { workoutRecorderStyles.workoutContainer }>
                                        <TextInput 
                                            value = { workout.workoutName }
                                            placeholder = "Enter workout name"
                                            onChangeText = { (value) => setWorkoutName(value, dayIndex, workoutIndex) }
                                            style = { workoutRecorderStyles.workoutInputText }
                                            placeholderTextColor = { Colors.darker }
                                        />
                                        <View style = { workoutRecorderStyles.setContainer } >
                                            <Text style = { workoutRecorderStyles.setDescriptionText }>Set</Text>
                                            <Text style = { workoutRecorderStyles.setDescriptionText }>Weight</Text>
                                            <Text style = { workoutRecorderStyles.setDescriptionText }>Reps</Text>
                                        </View>
                                        <View style = { workoutRecorderStyles.setButtons }>
                                            <Button title = "Add Set" onPress = {() => addSet(dayIndex, workoutIndex)} color = {"green"} />
                                            <Button title = "Remove Set" onPress = {() => removeSet(dayIndex, workoutIndex)} color = {"red"} />
                                        </View>
                                        {
                                            workout.sets.map( (set, setIndex) => (
                                                <View key = {`${dayIndex}-${workoutIndex}-${setIndex}`} style = { workoutRecorderStyles.setContainer } >
                                                    <Text style = { workoutRecorderStyles.setDescriptionText }> {setIndex + 1} </Text>
                                                    <TextInput 
                                                        value = { String(set.weight) } 
                                                        placeholder = "0" 
                                                        onChangeText = { (value) => setWeight(value, dayIndex, workoutIndex, setIndex) } 
                                                        style = { workoutRecorderStyles.setInputText } 
                                                    />
                                                    <TextInput 
                                                        value = { String(set.reps) }
                                                        placeholder = "0" 
                                                        onChangeText = { (value) => setReps(value, dayIndex, workoutIndex, setIndex) } 
                                                        style = { workoutRecorderStyles.setInputText } 
                                                     />
                                                </View>
                                            ))
                                        }
                                    </View>
                                )) 
                            }
                            <View style = { workoutRecorderStyles.workoutButtons } >
                                <Button title = "Add Workout" onPress = {() => addWorkout(dayIndex)} color = {"green"} />
                                <Button title = "Remove Workout" onPress = {() => removeWorkout(dayIndex)} color = {"red"} />
                            </View>
                        </View>
                    )) 
                }
            </ScrollView>
            
            {/* Navbar */}
            <View style = { workoutRecorderStyles.navbarContainer }>
                <View style = { workoutRecorderStyles.navbarButtonContainer }>
                    <Button title = "Save Data" onPress = { () => setSaveModalVisible(true) } />
                </View>
                <View style = { workoutRecorderStyles.navbarButtonContainer }>
                    <Button title = "Load Data" onPress = { () => {
                        loadSaveNames();
                        setLoadModalVisible(true);
                    } } />
                </View>
            </View>

        </View>
    );

}


export default WorkoutRecorder;
