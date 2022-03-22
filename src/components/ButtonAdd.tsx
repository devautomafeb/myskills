import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, TouchableOpacityProps} from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';

interface ButtonAdd extends TouchableOpacityProps {

}

export function ButtonAdd({...rest }: ButtonAdd ) {

    return (
        <TouchableOpacity style={styles.button}
        {...rest}
        >
            <Icon size ={30} name ='add' color ={'#000'}/>
        </TouchableOpacity>
    )
}



const styles = StyleSheet.create({
    button: {
        padding: 15,
        margin: 5,
        backgroundColor: '#F1FF29',
        alignItems: 'center',
        justifyContent:'center',
        height: 60,
        width: 60,
        borderRadius: 5,
    },
})

