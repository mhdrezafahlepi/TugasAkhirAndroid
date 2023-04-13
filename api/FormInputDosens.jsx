import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  LogBox,
  ToastAndroid,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TextInput} from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Domain from './Domain';

export default function FormInputStudents({navigation}) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  // const [items, setItems] = useState([
  //   {label: 'Female', value: 'F'},
  //   {label: 'Male', value: 'M'},
  // ]);

  const [idnumber, setIdnumber] = useState();
  const [dsnname, setDsnname] = useState();
  const [dsnmatkul, setDsnmatkul] = useState();
  // const [mhsjenkel, setMhsjenkel] = useState();
  // const [mhsalamat, setMhsalamat] = useState();
  // const [mhsnohp, setMhsnohp] = useState();
  // const [mhsemail, setMhsemail] = useState();
  // const [mhspembing, setMhspembing] = useState();

  const [loading, setLoading] = useState(false);

  // State for error
  const [errorIdNumber, setErrorIdNumber] = useState();
  const [errorDsnName, setErrorDsnName] = useState();
  const [errorDsnMatkul, setErrorDsnMatkul] = useState();
  // const [errorMhsJenkel, setErrorMhsJenkel] = useState();
  // const [errorMhsAlamat, setErrorMhsAlamat] = useState();
  // const [errorMhsNohp, setErrorMhsNohp] = useState();
  // const [errorMhsEmail, setErrorMhsEmail] = useState();
  // const [errorMhsPembing, setErrorMhsPembing] = useState();
  // end

  const saveData = async () => {
    setLoading(true);
    await fetch(`${Domain.ipAddress}/api/dsn`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idnumber: idnumber,
        dsnname: dsnname,
        dsnmatkul: dsnmatkul,
      }),
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          ToastAndroid.show(json.messages, ToastAndroid.LONG);
          // navigation.push('ShowMhs');
          navigation.goBack();
        } else {
          setErrorIdNumber(json.idnumber);
          setErrorDsnName(json.dsnname);
          setErrorDsnMatkul(json.dsnmatkul);
        }
        setLoading(false);
        console.log(json);
      })
      .catch(err => console.log(err));
  };
  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, []);

  return (
    <View
      styles={{
        flex: 1,
      }}>
      <ScrollView style={{width: '100%'}}>
        <TextInput
          style={styles.textInput}
          label="ID Dosen"
          keyboardType="number-pad"
          value={idnumber}
          onChangeText={value => setIdnumber(value)}
        />
        {errorIdNumber ? (
          <Text style={styles.textError}>errorIdNumber</Text>
        ) : (
          ''
        )}
        <TextInput
          style={styles.textInput}
          label="Nama Dosen"
          value={dsnname}
          onChangeText={value => setDsnname(value)}
        />
        {errorDsnName ? <Text style={styles.textError}>errorDsnName</Text> : ''}
        <TextInput
          style={styles.textInput}
          label="Matakuliah"
          value={dsnmatkul}
          onChangeText={value => setDsnmatkul(value)}
        />
        {errorDsnMatkul ? (
          <Text style={styles.textError}>errorDsnMatkul</Text>
        ) : (
          ''
        )}

        <TouchableOpacity style={styles.button} onPress={() => saveData()}>
          {loading ? (
            <ActivityIndicator size={20} color="white" />
          ) : (
            <Text style={styles.textButton}>Save</Text>
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
    marginTop: 5,
    marginHorizontal: 10,
    color: 'red',
    fontWeight: 'bold',
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
