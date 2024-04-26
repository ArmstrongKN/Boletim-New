import React,{useState} from "react";
import {View, Text, StyleSheet, TextInput, TouchableOpacity, Alert} from 'react-native';
import Firebase from '../Firebase';

export default function CadastroBoletim({navigation}){
    const [disciplina,setDisciplina] = useState(null);
    const [nota,setNota] = useState(null);

    function addDisciplina(){
        Firebase.collection("disciplina").add({
            disciplina:disciplina,
            nota,
        })
        Alert.alert("Disciplina", "Disciplina cadastrada com sucesso!");
        navigation.navigate("Home");
    }
    return(
        <View style={estilo.container}>
            <View>
                <Text style={estilo.disciplina}>Registre a Disciplina</Text>
            </View>
            <TextInput autoCapitalize = 'words' style={estilo.input} placeholder='Digite a disciplina' onChangeText={setBoletim} value={data} />
            <TextInput  style={estilo.input} placeholder="Digite a nota" onChangeText={setNota} value={nota} />
        
        <TouchableOpacity style={estilo.btnenviar} onPress={() => {addDisciplina();}} >
            <Text style={estilo.btntxtenviar}>Alterar</Text>
        </TouchableOpacity>
        </View>
    );
}

    const estilo = StyleSheet.create({
        container: {
            flex:1,
            justifyContent: 'center',
            alignItems: 'center',
        },
        input: {
            marginVertical: 10,
            marginHorizontal: 10,
            backgroundColor: '#9ac234',
            paddingHorizontal: 20,
            paddingVertical: 10,
            fontSize: 15,
            borderRadius: 10,
        },
        btnenviar: {
            marginTop: 20,
        },
        btntxtenviar: {
            fontSize: 25,
        },
        titulo: {
            marginVertical: 40,
            fontSize: 25,
            textAlign: 'center'
        },
    });
    

