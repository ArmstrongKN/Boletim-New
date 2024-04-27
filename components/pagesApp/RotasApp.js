import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import CadastrarBoletim from './CadastrarBoletim';
import AlterarBoletim from './AlterarBoletim';

const Stack = createStackNavigator();

export default function RotasApp() {
    return(
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} option={{headerTintColor:'#9ac234', title:'Cadastro do Boletim'}} />
        <Stack.Screen name="CadastrarBoletim" component={CadastrarBoletim} option={{headerTintColor:'#9ac234', title:'Cadastro do Boletim'}} />
        <Stack.Screen name="AlterarBoletim" component={AlterarBoletim} option={{headerTintColor:'#9ac234', title:'AlterarBoletim'}} />
        </Stack.Navigator>
    );
}