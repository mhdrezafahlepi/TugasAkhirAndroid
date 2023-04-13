import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';

export default function Home({navigation}) {
  return (
    <View>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ShowMhs')}>
        <Text style={styles.textButton}>Mahasiswa</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ShowDsn')}>
        <Text style={styles.textButton}>Dosen</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ShowMatkul')}>
        <Text style={styles.textButton}>Matakuliah</Text>
      </TouchableOpacity>
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
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});
