import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, Dimensions } from 'react-native';

interface TaskCardProps extends TouchableOpacityProps {
    task: string;
    isDone: boolean;
}

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export function TaskCard({ task,isDone, ...rest }: TaskCardProps) {
    return (
        <TouchableOpacity
            style={styles.buttonTask}
            {...rest}
        >
            <Text style={(isDone===false)?(styles.tasksUndone):(styles.tasksDone)}>{task}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    buttonTask: {
        backgroundColor: '#1f1f1f',
        padding: 5,
        marginBottom: 10,
        width: windowWidth*0.8,
        borderRadius:5,
        shadowColor:"#cfcfff",
    },
    tasks: {
 
    },
    tasksUndone:{
        color: '#ffffff',
        fontSize: 20,
        fontWeight: '200'
    },
    tasksDone:{
        color: '#9f9f9f',
        fontSize:20,
        fontWeight: '200',
        textDecorationLine: 'line-through'
    }
})

