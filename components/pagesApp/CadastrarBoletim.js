import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Firebase from '../Firebase';

export default function CadastroBoletim({ navigation }) {
    const [Disciplina, setDisciplina] = useState('');
    const [Nota, setNota] = useState('');

    function addDisciplina() {
        Firebase.collection("boletim").add({
            Disciplina: Disciplina,
            Nota: parseFloat(Nota) // Converter Nota para número
        })
        .then(() => {
            Alert.alert("Disciplina", "Disciplina cadastrada com sucesso!");
            navigation.navigate("Home");
        })
        .catch(error => {
            console.error("Erro ao adicionar disciplina: ", error);
            Alert.alert("Erro", "Ocorreu um erro ao cadastrar a disciplina. Por favor, tente novamente.");
        });
    }

    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.disciplina}>Registre a Disciplina</Text>
            </View>
            <TextInput
                autoCapitalize='words'
                style={estilo.input}
                placeholder='Digite a disciplina'
                onChangeText={setDisciplina}
                value={Disciplina}
            />
            <TextInput
                style={estilo.input}
                placeholder="Digite a nota"
                onChangeText={setNota}
                value={Nota}
            />

            <TouchableOpacity
                style={estilo.btnenviar}
                onPress={() => addDisciplina()}
            >
                <Text style={estilo.btntxtenviar}>Enviar</Text>
            </TouchableOpacity>
        </View>
    );
}

const estilo = StyleSheet.create({
    container: {
        flex: 1,
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
        backgroundColor: '#9ac234',
        padding: 10,
        borderRadius: 10,
    },
    btntxtenviar: {
        fontSize: 20,
        textAlign: 'center',
    },
    disciplina: {
        marginBottom: 20,
        fontSize: 25,
        textAlign: 'center',
    },
});


    

