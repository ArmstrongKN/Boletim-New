import React from 'react';
import {createStackNavigator} from '@react-navigatio/stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from './Home';
import CadastroBoletim from './CadastroBoletim';
import AlterarBoletim from './AlterarBoletim';

const Stack = createStackNavigator();

export default function RotasApp() {
    return(
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} option={{headerTintColor:'#9ac234', title:'Cadastro do Boletim'}} />
        <Stack.Screen name="CadastrarBoletim" component={CadastroBoletim} option={{headerTintColor:'#9ac234', title:'Cadastro do Boletim'}} />
        <Stack.Screen name="AlterarBoletim" component={AlterarBoletim} option={{headerTintColor:'#9ac234', title:'AlterarBoletim'}} />
        </Stack.Navigator>
        </NavigationContainer>
    );
}