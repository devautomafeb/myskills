import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions, TouchableOpacity, FlatList } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { TaskCard } from './components/TaskCard'
import { Greattings } from './components/Greattings'
import { ButtonAdd } from './components/ButtonAdd'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

import Icon from 'react-native-vector-icons/Ionicons';


//interfaces

interface TaskData {
    id: string;
    name: string;
    isDone: boolean;
}

interface TypeGreattings {
    date: Date;
    message: string;
}

export function Home() {

    const [logged, setLogged] = useState(false)
    const [newTask, setNewTask] = useState('');
    const [myTasks, setMyTasks] = useState<TaskData[]>([]);
    const [grettings, setGreattings] = useState<TypeGreattings>({ date: new Date(), message: 'Olá!' });

    useEffect(() => {
        changeGreattings()
        if (logged===false){
            loadData()
            setLogged(true);
        }
        storeData() 
    }, [myTasks])

    async function storeData() { 
        try {
            const taskJason = JSON.stringify(myTasks)
            await AsyncStorage.setItem('@myskills:TaskData', taskJason)
            console.log('Arquivo salvo')
        } catch (e) {
            console.log('Não foi possível salvar');
        }
    }


    async function getData() {
        try {
            const jsonTask = await AsyncStorage.getItem('@myskills:TaskData');
            setMyTasks(JSON.parse(jsonTask!))
            console.log('Arquivo logado com sucesso');
          } catch(e) {
            console.log('Não foi possível logar');
          }
          return myTasks
        }
         

    async function handleAddNewTask() {
        const data = {
            id: String(new Date().getTime()),
            name: newTask,
            isDone: false
        }
        setMyTasks([...myTasks, data])
        //storeData()
    }
 
    async function handleModifyTask(id: string) {
        const newMyTasks =  myTasks.map( obj =>{
            if (obj.id === id){
                return {...obj, isDone:!obj.isDone}
            }
            return obj
        })
        setMyTasks(newMyTasks)
    }

    async function handleRemoveTask(id: string) {
        setMyTasks(myTasks.filter(
            task => task.id !== id
        ))
       // storeData()
    }

    function changeGreattings() {
        const hour = new Date().getHours()
        console.log(hour)
        let message = 'Olá automafeb'
        if (hour <= 12) {
            message = 'Olá, bom dia!'
        }
        if ((hour > 12) && (hour < 18)) {
            message = 'Olá, boa tarde!'
        } if ((hour > 18) && (hour <= 24)) {
            message = 'Olá, boa noite!'
        }
        const newGreat = {
            date: new Date(),
            message: message
        }
        setGreattings({ date: newGreat.date, message: newGreat.message })
    }

    async function loadData() {
        await getData()
    }

    return (
        <View style={styles.container}>
            <Greattings
                greattings={grettings.message}
            />

            <View style={{flexDirection: 'row', alignSelf: 'flex-start', marginBottom:50}}>
            <TextInput style={styles.input}
                placeholder='nova tarefa'
                placeholderTextColor='#999'
                onChangeText={setNewTask}
            />
            <ButtonAdd onPress = {handleAddNewTask}/>
            </View>

            <Text style={[styles.text1, { marginBottom: 20, alignSelf: 'center' }]}> Minhas Tarefas </Text>
            <FlatList
                data={myTasks}
                keyExtractor={task => task.id}
                renderItem={({ item, index }) => (
                    <View style={{flexDirection: 'row', alignSelf: 'flex-start'}}>
                        <TaskCard
                            task={item.name}
                            isDone = {item.isDone}
                            onPress={() => handleModifyTask(item.id)}
                            />
                            <TouchableOpacity style={{backgroundColor:'#000', justifyContent:'center'}}>
                                <Icon style={{ marginLeft:30, alignSelf:'center'}} size ={26}
                                name ='trash-outline' color ={'#ff2b18'} onPress ={()=>handleRemoveTask(item.id)}/>
                            </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
        paddingHorizontal: 20,
        paddingVertical: 70,
    },
    text1: {
        color: '#ECECEC',
        fontSize: 24,
        fontWeight: '300',
    },
    text2: {
        color: '#ECECEC'
    },
    input: {
        padding: 15,
        margin: 5,
        backgroundColor: '#ECECEC',
        fontSize: 18,
        color: '#000',
        height: 60,
        width:windowWidth*0.8,
        //width: windowWidth*0.5,
        borderRadius: 5
    },
})
