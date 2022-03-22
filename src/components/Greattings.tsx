import React, {useState} from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps, Alert } from 'react-native';


interface Greattings extends TouchableOpacityProps {
    greattings: string;
}

export function Greattings({ greattings, ...rest }: Greattings) {

    const [messageDay, setMessageDay] = useState('A sorte acompanha os guerreiros audazes !');

    function callMessageDay(messageDay:string){
        return(
                Alert.alert(  "Menssagem do dia:",
                "Guerreiro",
                [
                  {
                    text: messageDay,
                    onPress: () => console.log("Hoop")
                  }
                ])
            )
    }   

    return (
        <TouchableOpacity
            style={styles.buttonTask}
            onPress ={()=> callMessageDay(messageDay)}
            {...rest}
        >
            <Text style={[styles.text1, { marginBottom: 30, alignSelf: 'center' }]}>{greattings}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    text1: {
        color: '#ECECEC',
        fontSize: 24,
        fontWeight: '300'
    },
    buttonTask: {
        backgroundColor: '#000',
        padding: 5,
        marginBottom: 10
    },
    tasks: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    }
})

