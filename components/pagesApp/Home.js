import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, onSnapshot } from 'firebase/firestore';
import Firebase from '../Firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({ navigation }) {
  const auth = getAuth();
  const [boletim, setBoletim] = useState([]);
  const firestore = getFirestore();

  function deleteBoletim(id) {
    Firebase.collection("boletim").doc(id).delete();
    Alert.alert("O Boletim foi Deletado.");
  }

  useEffect(() => {
    const unsubscribeBoletim = onSnapshot(collection(firestore, 'boletim'), (querySnapshot) => {
      const lista = [];
      querySnapshot.forEach((doc) => { lista.push({ ...doc.data(), id: doc.id }); });
      setBoletim(lista);
    });

    return () => { unsubscribeBoletim(); };
  }, [firestore]);

  return (
    <View style={estilo.container}>
      <Text style={estilo.titulo}>Meu Boletim</Text>
      <FlatList
        data={boletim}
        renderItem={({ item }) => (
          <View style={estilo.boletins}>
            <TouchableOpacity onPress={() => navigation.navigate("AlterarBoletim", {
              id: item.id,
              disciplina: item.disciplina,
              nota: item.nota
            })}>
              <View style={estilo.itens}>
                <Text style={estilo.tituloboletim}>Disciplina: <Text style={estilo.textoBoletim}>{item.disciplina}</Text></Text>
                <Text style={estilo.tituloboletim}>Nota: <Text style={estilo.textoBoletim}>{item.nota}</Text></Text>
              </View>
            </TouchableOpacity>
            <View style={estilo.botaodeletar}>
              <TouchableOpacity onPress={() => { deleteBoletim(item.id) }}>
                <MaterialCommunityIcons name="delete-empty" size={30} color="red" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity style={estilo.addbutton} onPress={() => navigation.navigate("CadastrarBoletim")}>
        <MaterialCommunityIcons name="plus-circle-outline" size={30} color="green" />
      </TouchableOpacity>
    </View>
  );
}

const estilo = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  titulo: {
    marginTop: 50,
    fontSize: 30
  },
  itens: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },
  tituloboletim: {
    fontSize: 15,
    fontWeight: 'bold'
  },
  textoBoletim: {
    fontSize: 15,
  },
  boletins: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 5,
    padding: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 10
  },
  botaodeletar: {
    marginVertical: 5,
  },
  addbutton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#ffffff',
    borderRadius: 50,
    padding: 10,
  }
});
