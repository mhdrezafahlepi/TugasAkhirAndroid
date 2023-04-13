import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  StatusBar,
  Image,
  TouchableOpacity,
  ImageBackground,
  ToastAndroid,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import React, {useCallback, useState, useEffect} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import Domain from './Domain';
export default function DetailMatkuls({route, navigation}) {
  // const [photo, setPhoto] = useState();
  const [idnumber, setIdnumber] = useState();
  const [matkulname, setMatkulname] = useState();
  const [matkulsks, setMatkulsks] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState([]);

  const deleted = () => {
    Alert.alert('Delete Matakuliah !', 'Are you sure deleted data ?', [
      {
        text: 'ok',
        onPress: () => deletedData(),
      },
      {
        text: 'Cancel',
        style: 'cancel',
      },
    ]);
  };

  const deletedData = async () => {
    setLoading(true);
    fetch(`${Domain.ipAddress}/api/mtk/${route.params.id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          ToastAndroid.show(json.messages, ToastAndroid.LONG);
          navigation.goBack();
        }
        console.log(json);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };
  const getDetailDataMatkuls = () => {
    fetch(`${Domain.ipAddress}/api/mtk/${route.params.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          setIdnumber(json.data.idnumber);
          setMatkulname(json.data.matkulname);
          setMatkulsks(json.data.matkulsks);
        }
        console.log(json);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getDetailDataMatkuls();
    }, []),
  );

  return loading ? (
    <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
      <ActivityIndicator size={30} color="blue" />
    </View>
  ) : (
    // <View>
    //     <Text>{idnumber}</Text>
    //     <Text>{fullname}</Text>
    // </View>
    <View style={{flex: 1}}>
      <StatusBar barStyle={'light-content'} backgroundColor="#0D4C92" />
      <View style={{flex: 0.4, justifyContent: 'center', alignItems: 'center'}}>
        <View style={{flexDirection: 'row', marginTop: 80}}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Icon name="graduation-cap" size={80} color="#212121" />
            <Text style={{fontSize: 36, color: '#0D4C92'}}>
              Data Matakuliah
            </Text>
            <StatusBar
              barStyle="light-content"
              backgroundColor="#15133C"
              animated={true}
            />
            {/* <ActivityIndicator size="large" color="blue"></ActivityIndicator> */}
          </View>
        </View>
        <StatusBar
          // barStyle="light-content"
          backgroundColor="#15133C"
          animated={false}
        />
        {/* <ActivityIndicator size="small" color="blue"></ActivityIndicator> */}
      </View>

      <View style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View style={{marginLeft: 40, bottom: 10}}>
          <View style={{marginLeft: 10, bottom: 10}}>
            <View style={{flexDirection: 'row', marginTop: 80}}>
              <Icon name="unlock-alt" size={20} color="#212121" />
              <View style={{justifyContent: 'center', marginLeft: 15}}>
                <View>
                  <Text>{idnumber}</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={{marginLeft: 10, bottom: 40}}>
            <View style={{flexDirection: 'row', marginTop: 50}}>
              <Icon name="user-circle" size={20} color="#212121" />
              <View style={{justifyContent: 'center', marginLeft: 15}}>
                <View>
                  <Text>{matkulname}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginLeft: 10, bottom: 100}}>
            <View style={{flexDirection: 'row', marginTop: 80}}>
              <Icon name="list-alt" size={20} color="#212121" />
              <View style={{justifyContent: 'center', marginLeft: 15}}>
                <View>
                  <Text>{matkulsks}</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              bottom: 650,
              marginTop: 600,
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={() =>
                navigation.navigate('FormEditMatkuls', {
                  id: route.params.id,
                  title: 'Edit Matakuliah',
                })
              }>
              <Icon name="edit" size={25} color="#0D4C92" />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => deleted()}
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
              <Icon name="trash" size={25} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
