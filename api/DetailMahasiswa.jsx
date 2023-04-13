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
export default function DetailStudents({route, navigation}) {
  // const [photo, setPhoto] = useState();
  const [idnumber, setIdnumber] = useState();
  const [mhsname, setMhsname] = useState();
  const [mhsprodi, setMhsprodi] = useState();
  const [mhsjenkel, setMhsjenkel] = useState();
  const [mhsalamat, setMhsalamat] = useState();
  const [mhsnohp, setMhsnohp] = useState();
  const [mhsemail, setMhsemail] = useState();
  const [mhspembing, setMhspembing] = useState();
  const [loading, setLoading] = useState(false);
  const [id, setId] = useState([]);

  const deleted = () => {
    Alert.alert('Delete Mahasiswa !', 'Are you sure deleted data ?', [
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
    fetch(`${Domain.ipAddress}/api/mhs/${route.params.id}`, {
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
  const getDetailDataStudents = () => {
    fetch(`${Domain.ipAddress}/api/mhs/${route.params.id}`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    })
      .then(response => response.json())
      .then(json => {
        if (json.success == true) {
          setIdnumber(json.data.idnumber);
          setMhsname(json.data.mhsname);
          setMhsprodi(json.data.mhsprodi);
          setMhsjenkel(json.data.mhsjenkel);
          setMhsalamat(json.data.mhsalamat);
          setMhsnohp(json.data.mhsnohp);
          setMhsemail(json.data.mhsemail);
          setMhspembing(json.data.mhspembing);
        }
        console.log(json);
        setLoading(false);
      })
      .catch(err => console.log(err));
  };

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      getDetailDataStudents();
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
            <Text style={{fontSize: 36, color: '#0D4C92'}}>Data Mahasiswa</Text>
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
                  <Text>{mhsname}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginLeft: 10, bottom: 100}}>
            <View style={{flexDirection: 'row', marginTop: 80}}>
              <Icon name="list-alt" size={20} color="#212121" />
              <View style={{justifyContent: 'center', marginLeft: 15}}>
                <View>
                  <Text>{mhsprodi}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginLeft: 10, bottom: 160}}>
            <View style={{flexDirection: 'row', marginTop: 80}}>
              <Icon name="venus-mars" size={20} color="#212121" />
              <View style={{justifyContent: 'center', marginLeft: 15}}>
                <View>
                  <Text>{mhsjenkel}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginLeft: 10, bottom: 220}}>
            <View style={{flexDirection: 'row', marginTop: 80}}>
              <Icon name="map-marker" size={20} color="#212121" />
              <View style={{justifyContent: 'center', marginLeft: 20}}>
                <View>
                  <Text>{mhsalamat}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginLeft: 10, bottom: 285}}>
            <View style={{flexDirection: 'row', marginTop: 80}}>
              <Icon name="mobile-alt" size={20} color="#212121" />
              <View style={{justifyContent: 'center', marginLeft: 25}}>
                <View>
                  <Text>{mhsnohp}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginLeft: 10, bottom: 355}}>
            <View style={{flexDirection: 'row', marginTop: 80}}>
              <Icon name="envelope" size={20} color="#212121" />
              <View style={{justifyContent: 'center', marginLeft: 17}}>
                <View>
                  <Text>{mhsemail}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={{marginLeft: 10, bottom: 420}}>
            <View style={{flexDirection: 'row', marginTop: 80}}>
              <Icon name="id-badge" size={20} color="#212121" />
              <View style={{justifyContent: 'center', marginLeft: 20}}>
                <View>
                  <Text>{mhspembing}</Text>
                </View>
              </View>
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              marginLeft: 10,
              bottom: 650,
              marginTop: 300,
              marginHorizontal: 30,
            }}>
            <TouchableOpacity
              style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              onPress={() =>
                navigation.navigate('FormEditStudents', {
                  id: route.params.id,
                  title: 'Edit Data Students',
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
