import React, {useState, useEffect} from 'react';
import {  View, Text, StyleSheet,  FlatList, TouchableOpacity, Alert } from 'react-native';
import Firebase from '../Firebase';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function Home({navigation}) { 
 
 
  const [boletim, setBoletim] = useState([]);

  function deleteBoletim(id)
  {
    Firebase.collection("diario").doc(id).delete();

    Alert.alert("O Boletim foi Deletado.");
  }

  useEffect(()=>
  {
    Firebase.collection("boletim").onSnapshot((query)=>
    {
      const lista=[];
      query.forEach((doc) =>
      {
        lista.push({...doc.data(),id: doc.id});
      });
      setBoletim(lista);
    });
  },[]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={estilo.titulo}>Meu Boletim</Text>
      </View>

      <FlatList
      data={boletim}
      renderItem={({item})=>{
        return(
          <View style={estilo.boletins}>

            <TouchableOpacity onPress={()=>navigation.navigate("AlterarBoletim",{
              id: item.id,
              disciplina: item.disciplina,
              nota: item.nota 
              })}>
              <View style={estilo.itens}>
                <Text style={estilo.tituloboletim}> Disciplina: <Text style={estilo.textoBoletim}>{item.titulo}</Text></Text>
                <Text style={estilo.tituloboletim}> Nota: <Text style={estilo.textoBoletim}>{item.texto}</Text> </Text>
              </View>

              </TouchableOpacity>
               <View style={estilo.botaodeletar}>
               <TouchableOpacity onPress={()=>{deleteBoletim(item.id)}}>
               <MaterialCommunityIcons name="delete-empty" size={70} color="red"/>
              </TouchableOpacity>
            </View>
          </View>
        );
          }}
          />
          <TouchableOpacity style={estilo.addbutton} onPress={()=> navigation.navigate("CadastrarBoletim")}>
            <MaterialCommunityIcons name="plus-circle-outline" size={70} color="green" />
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
  titulo:{
    marginTop: 50,
    fontSize: 30
  },
  itens:{
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
  },
  titulobanda:{
    fontSize: 13,
    collor:'#fff',
  },
  textobanda:{
    fontSize: 15,
    fontWeight: "bold",
  },
  musicas:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 10,
    backgroundColor: '#0000CD',
    borderRadius: 10
  },
  botaodeletar:{
    textAlignVertical: 'center',
    marginVertical: 10
  },
  addbutton:{
    backgroundColor: '#ffffff',
    borderRadius: 50,
    position: 'absolute',
    left: 20,
    bottom: 40,
    justifyContent: "center",
    alignItems: "center"
  }
});