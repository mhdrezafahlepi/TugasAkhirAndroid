import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LogBox,
  ActivityIndicator,
  ToastAndroid,
} from 'react-native';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Domain from './Domain';
import {useFocusEffect} from '@react-navigation/native';

export default function FormEditStudents({route, navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);

  const [idnumber, setIdnumber] = useState();
  const [dsnname, setDsnname] = useState();
  const [dsnmatkul, setDsnmatkul] = useState();

  const [loading, setLoading] = useState(false);

  // State for error
  const [errorIdNumber, setErrorIdNumber] = useState();
  const [errorDsnName, setErrorDsnName] = useState();
  const [errorDsnmatkul, setErrorDsnmatkul] = useState();

  // end

  const getDetailDataStudents = () => {
    fetch(`${Domain.ipAddress}/api/dsn/${route.params.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          setIdnumber(json.data.idnumber);
          setDsnname(json.data.dsnname);
          setDsnmatkul(json.data.dsnmatkul);
        }
        setLoading(false);
        console.log(json);
      })
      .catch(err => console.log(err));
  };

  useFocusEffect(
    useCallback(() => {
      getDetailDataStudents();
    }, []),
  );

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  const updateData = async () => {
    setLoading(true);
    await fetch(`${Domain.ipAddress}/api/dsn/${route.params.id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        _method: 'PUT',
        idnumber: idnumber,
        dsnname: dsnname,
        dsnmatkul: dsnmatkul,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          ToastAndroid.show(json.messages, ToastAndroid.LONG);
          navigation.goBack();
        } else {
          setErrorIdNumber(json.idnumber);
          setErrorDsnName(json.dsnname);
          setErrorDsnmatkul(json.dsnmatkul);
        }
        console.log(json);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  return (
    <View
      styles={{
        flex: 1,
      }}>
      <ScrollView style={{width: '100%'}}>
        <TextInput
          maxLength={7}
          style={styles.textInput}
          label="ID Dosen"
          keyboardType="number-pad"
          value={idnumber}
          onChangeText={value => setIdnumber(value)}
          disabled={true}
        />
        {errorIdNumber ? (
          <Text style={styles.teksError}>errorIdNumber</Text>
        ) : (
          ''
        )}
        <TextInput
          style={styles.textInput}
          label="Nama Dosen"
          value={dsnname}
          onChangeText={value => setDsnname(value)}
        />
        {errorDsnName ? <Text style={styles.teksError}>errorDsnName</Text> : ''}
        <TextInput
          style={styles.textInput}
          label="Matakuliah"
          value={dsnmatkul}
          onChangeText={value => setDsnmatkul(value)}
        />
        {errorDsnmatkul ? (
          <Text style={styles.teksError}>errorDsnmatkul</Text>
        ) : (
          ''
        )}

        <TouchableOpacity style={styles.button} onPress={() => updateData()}>
          {loading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <Text style={styles.textButton}>Update</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'white',
    width: 'auto',
  },
  textError: {
    marginHorizontal: 10,
    color: 'red',
  },
  button: {
    marginHorizontal: 10,
    marginTop: 10,
    elevation: 5,
    backgroundColor: '#0D4C92',
    borderRadius: 10,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textButton: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
