import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import ShowMhs from './ShowMhs';
import FormInputStudents from './FormInputStudents';
import DetailMahasiswa from './DetailMahasiswa';
import FormEditStudents from './FormEditStundents';
import Home from './Home';
import ShowDsn from './ShowDsn';
import FormInputDosens from './FormInputDosens';
import ShowMatkul from './ShowMatkul';
import FormInputMatkuls from './FormInputMatkuls';
import DetailDosens from './DetailDosens';
import DetailMatkuls from './DetailMatkuls';
import FormEditDosens from './FormEditDosens';
import FormEditMatkuls from './FormEditMatkuls';

const Stack = createNativeStackNavigator();
const navOptions = ({navigation}) => ({
  title: 'Add New Data',
  headerStyle: {
    backgroundColor: '#0D4C92',
  },
  headerTitleStyle: {
    color: '#F1EEE9',
  },
  headerTitleAlign: 'center',
  headerLeft: () => (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Icon name="arrow-left" size={20} color="#F1EEE9" />
    </TouchableOpacity>
  ),
});

export default function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Siakad">
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: 'Home',
            headerStyle: {
              backgroundColor: '#FF6000',
            },
            headerTitleStyle: {
              color: '#F1EEE9',
            },
            headerTitleAlign: 'center',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="ShowMhs"
          component={ShowMhs}
          options={{
            title: 'Data Mahasiswa',
            headerStyle: {
              backgroundColor: '#0D4C92',
            },
            headerTitleStyle: {
              color: '#F1EEE9',
            },
            headerTitleAlign: 'center',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="ShowDsn"
          component={ShowDsn}
          options={{
            title: 'Data Dosen',
            headerStyle: {
              backgroundColor: '#0D4C92',
            },
            headerTitleStyle: {
              color: '#F1EEE9',
            },
            headerTitleAlign: 'center',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="ShowMatkul"
          component={ShowMatkul}
          options={{
            title: 'Data Matakuliah',
            headerStyle: {
              backgroundColor: '#0D4C92',
            },
            headerTitleStyle: {
              color: '#F1EEE9',
            },
            headerTitleAlign: 'center',
            headerBackVisible: false,
          }}
        />
        <Stack.Screen
          name="FormEditStudents"
          component={FormEditStudents}
          options={navOptions}
        />
        <Stack.Screen
          name="FormEditDosens"
          component={FormEditDosens}
          options={navOptions}
        />
        <Stack.Screen
          name="FormEditMatkuls"
          component={FormEditMatkuls}
          options={navOptions}
        />
        <Stack.Screen
          name="FormInputStudents"
          component={FormInputStudents}
          options={navOptions}
        />
        <Stack.Screen
          name="FormInputDosens"
          component={FormInputDosens}
          options={navOptions}
        />
        <Stack.Screen
          name="FormInputMatkuls"
          component={FormInputMatkuls}
          options={navOptions}
        />

        <Stack.Screen
          name="DetailMahasiswa"
          component={DetailMahasiswa}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailDosens"
          component={DetailDosens}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailMatkuls"
          component={DetailMatkuls}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
