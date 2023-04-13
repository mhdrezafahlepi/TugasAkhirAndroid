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
  const [items, setItems] = useState([
    {label: 'Female', value: 'F'},
    {label: 'Male', value: 'M'},
  ]);

  const [idnumber, setIdnumber] = useState();
  const [mhsname, setMhsname] = useState();
  const [mhsprodi, setMhsprodi] = useState();
  const [mhsjenkel, setMhsjenkel] = useState();
  const [mhsalamat, setMhsalamat] = useState();
  const [mhsnohp, setMhsnohp] = useState();
  const [mhsemail, setMhsemail] = useState();
  const [mhspembing, setMhspembing] = useState();

  const [loading, setLoading] = useState(false);

  // State for error
  const [errorIdNumber, setErrorIdNumber] = useState();
  const [errorMhsName, setErrorMhsName] = useState();
  const [errorMhsProdi, setErrorMhsProdi] = useState();
  const [errorMhsJenkel, setErrorMhsJenkel] = useState();
  const [errorMhsAlamat, setErrorMhsAlamat] = useState();
  const [errorMhsNohp, setErrorMhsNohp] = useState();
  const [errorMhsEmail, setErrorMhsEmail] = useState();
  const [errorMhsPembing, setErrorMhsPembing] = useState();
  // end

  const saveData = async () => {
    setLoading(true);
    await fetch(`${Domain.ipAddress}/api/mhs`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idnumber: idnumber,
        mhsname: mhsname,
        mhsprodi: mhsprodi,
        mhsjenkel: mhsjenkel,
        mhsalamat: mhsalamat,
        mhsnohp: mhsnohp,
        mhsemail: mhsemail,
        mhspembing: mhspembing,
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
          setErrorMhsName(json.mhsname);
          setErrorMhsProdi(json.mhsprodi);
          setErrorMhsJenkel(json.mhsjenkel);
          setErrorMhsAlamat(json.mhsalamat);
          setErrorMhsNohp(json.mhsnohp);
          setErrorMhsEmail(json.mhsemail);
          setErrorMhsPembing(json.mhspembing);
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
          label="ID Students"
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
          label="Nama Mahasiswa"
          value={mhsname}
          onChangeText={value => setMhsname(value)}
        />
        {errorMhsName ? <Text style={styles.textError}>errorMhsName</Text> : ''}
        <TextInput
          style={styles.textInput}
          label="Prodi"
          value={mhsprodi}
          onChangeText={value => setMhsprodi(value)}
        />
        {errorMhsProdi ? (
          <Text style={styles.textError}>errorMhsProdi</Text>
        ) : (
          ''
        )}
        <DropDownPicker
          style={styles.textInput}
          open={open}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onSelectItem={item => setMhsjenkel(item.value)}
        />
        {errorMhsJenkel ? (
          <Text style={styles.textError}>errorMhsJenkel</Text>
        ) : (
          ''
        )}
        <TextInput
          style={styles.textInput}
          label="Alamat"
          multiline={true}
          numberOfLines={3}
          value={mhsalamat}
          onChangeText={value => setMhsalamat(value)}
        />
        {errorMhsAlamat ? (
          <Text style={styles.textError}>errorMhsAlamat</Text>
        ) : (
          ''
        )}
        <TextInput
          style={styles.textInput}
          label="No.Hp"
          multiline={true}
          keyboardType="number-pad"
          value={mhsnohp}
          onChangeText={value => setMhsnohp(value)}
        />
        {errorMhsNohp ? <Text style={styles.textError}>errorMhsNohp</Text> : ''}
        <TextInput
          style={styles.textInput}
          label="E-Mail"
          multiline={true}
          keyboardType="email-address"
          value={mhsemail}
          onChangeText={value => setMhsemail(value)}
        />
        {errorMhsEmail ? (
          <Text style={styles.textError}>errorMhsEmail</Text>
        ) : (
          ''
        )}
        <TextInput
          style={styles.textInput}
          label="Dosen PA"
          value={mhspembing}
          onChangeText={value => setMhspembing(value)}
        />
        {errorMhsPembing ? (
          <Text style={styles.textError}>errorMhsPembing</Text>
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
