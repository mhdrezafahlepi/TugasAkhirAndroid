import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, { useState, useEffect, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/core';
import Icon from 'react-native-vector-icons/FontAwesome';
import Domain from './Domain';

export default function ShowMhs({ navigation }) {
  const [msg, setMsg] = useState();
  const [datamahasiswas, setDatamahasiswas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const getDataMahasiswas = () => {
    fetch(`${Domain.ipAddress}/api/mhs`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          setMsg(json.messages);
          setDatamahasiswas(json.data);
          setLoading(false);
        }
      })
      .catch(err => console.log(err));
  };

  // useEffect(() => {
  //   setLoading(true);
  //   getDataMahasiswas();
  // }, []);

  useFocusEffect(
    useCallback(
      () => {
        setLoading(true);
        getDataMahasiswas();
      },
      [],
    )
  )

  return loading ? (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#15133C"
        animated={true}
      />
      <ActivityIndicator size="large" color="blue"></ActivityIndicator>
    </View>
  ) : (
    <View>
      {/* <Text>{msg}</Text> */}
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={refresh}
            onRefresh={() => {
              getDataMahasiswas();
              setRefresh(false);
            }}
          />
        }
        data={datamahasiswas}
        keyExtractor={item => item.id}
        renderItem={({ item, index }) => (

          <TouchableOpacity style={styles.container} onPress={
            () => navigation.navigate('DetailMahasiswa', {
              id: item.id,
              idnumber: item.idnumber
            })
          }>
            <View style={styles.teks}>
              <Text style={styles.teksID}> {item.idnumber} </Text>
              <Text style={styles.teksName}> {item.mhsname} </Text>
            </View>
          </TouchableOpacity>
        )
        }
      />
      < TouchableOpacity
        style={{
          backgroundColor: '#0D4C92',
          height: 50,
          width: 50,
          borderRadius: 50 / 2,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          right: 30,
          bottom: 30,
        }}
        onPress={() => navigation.navigate("FormInputStudents")}
      >
        <Icon name="plus" size={20} color="#F1EEE9" />
      </TouchableOpacity >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
    borderBottomWidth: 1,
    borderColor: '#0D4C92',
  },
  img: {
    margin: 15,
    width: 50,
    height: 50,
    borderRadius: 50 / 2,
  },
  teks: {
    flex: 1,
  },
  teksID: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  teksNama: {
    fontSize: 14,
    color: '#CFF5E7',
  },
});
