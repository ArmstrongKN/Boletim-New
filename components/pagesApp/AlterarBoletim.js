import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import Firebase from '../Firebase';

export default function AddBoletim({ navigation, route }) {
    const [disciplina, setDisciplina] = useState(route.params.disciplina);
    const [nota, setNota] = useState(route.params.nota);
    const id = route.params.id;

    function AlterarBoletim(id, disciplina, nota) {
        Firebase.collection("boletim").doc(id).update({
            disciplina: disciplina,
            nota: nota
        })
        Alert.alert("Aviso", "Boletim alterado com sucesso.");
        navigation.navigate("Home");
    }

    return (
        <View style={estilo.container}>
            <View>
                <Text style={estilo.titulo}>Alterar a Disciplina</Text>
            </View>
            <View>
                <TextInput
                    autoCapitalize='words'
                    style={estilo.input}
                    placeholder='Digite a disciplina'
                    onChangeText={setDisciplina}
                    value={disciplina}
                />
                <TextInput
                    style={estilo.input}
                    placeholder="Digite sua nota"
                    onChangeText={setNota}
                    value={nota}
                />
                <TouchableOpacity
                    style={estilo.btnenviar}
                    onPress={() => {
                        AlterarBoletim(id, disciplina, nota);
                    }}
                >
                    <Text style={estilo.btntxtenviar}>Enviar</Text>
                </TouchableOpacity>
            </View>
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
    titulo: {
        marginVertical: 40,
        fontSize: 25,
        textAlign: 'center'
    },
});
