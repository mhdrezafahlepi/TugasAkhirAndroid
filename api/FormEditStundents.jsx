import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, LogBox, ActivityIndicator, ToastAndroid } from 'react-native';
import { TextInput } from 'react-native-paper';
import DropDownPicker from 'react-native-dropdown-picker';
import Domain from './Domain';
import { useFocusEffect } from '@react-navigation/native';


export default function FormEditStudents({ route, navigation }) {

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        { label: 'Male', value: 'M' },
        { label: 'Female', value: 'F' },
    ]);

    const [idnumber, setIdnumber] = useState();
    const [mhsname, setMhsname] = useState();
    const [mhsprodi, setMhsprodi] = useState();
    const [mhsjenkel, setMhsjenkel] = useState();
    const [mhsalamat, setMhsalamat] = useState();
    const [mhsnohp, setMhsnohp] = useState();
    const [mhsemail, setMhsemail] = useState();
    const [mhspembing, setMhspembing] = useState();

    const [loading, setLoading] = useState(false)

    // State for error
    const [errorIdNumber, setErrorIdNumber] = useState()
    const [errorMhsName, setErrorMhsName] = useState()
    const [errorMhsProdi, setErrorMhsProdi] = useState()
    const [errorMhsJenkel, setErrorMhsJenkel] = useState()
    const [errorMhsAlamat, setErrorMhsAlamat] = useState()
    const [errorMhsNohp, setErrorMhsNohp] = useState()
    const [errorMhsEmail, setErrorMhsEmail] = useState()
    const [errorMhsPembing, setErrorMhsPembing] = useState()
    // end

    const DropDownGender = (
        <DropDownPicker
            style={styles.textInput}
            open={open}
            value={mhsjenkel}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onSelectItem={item => setMhsjenkel(item.value)}
        />
    );

    const getDetailDataStudents = () => {
        fetch(`${Domain.ipAddress}/api/mhs/${route.params.id}`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
            }
        })
            .then(response => response.json())
            .then(json => {
                if (json.success == true) {
                    setIdnumber(json.data.idnumber)
                    setMhsname(json.data.mhsname)
                    setMhsprodi(json.data.mhsprodi)
                    setMhsjenkel(json.data.mhsjenkel)
                    setMhsalamat(json.data.mhsalamat)
                    setMhsnohp(json.data.mhsnohp)
                    setMhsemail(json.data.mhsemail)
                    setMhspembing(json.data.mhspembing)

                }
                setLoading(false)
                console.log(json);
            })
            .catch(err => console.log(err));
    };

    useFocusEffect(
        useCallback(
            () => {
                getDetailDataStudents()
            },
            [],
        )
    )

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    useEffect(() => {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    }, []);

    const updateData = async () => {
        setLoading(true)
        await fetch(`${Domain.ipAddress}/api/mhs/${route.params.id}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _method: 'PUT',
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
                    navigation.goBack();
                } else {
                    setErrorIdNumber(json.idnumber)
                    setErrorMhsName(json.mhsname)
                    setErrorMhsProdi(json.mhsprodi)
                    setErrorMhsJenkel(json.mhsjenkel)
                    setErrorMhsAlamat(json.mhsalamat)
                    setErrorMhsNohp(json.mhsnohp)
                    setErrorMhsEmail(json.mhsemail)
                    setErrorMhsPembing(json.mhspembing)
                }
                console.log(json)
                setLoading(false)

            })
            .catch(err => console.log(err));
    };

    return (
        <View styles={{
            flex: 1,
        }}>
            <ScrollView style={{ width: '100%' }}>
                <TextInput
                    maxLength={7}
                    style={styles.textInput}
                    label="ID Mahasiswa"
                    keyboardType='number-pad'
                    value={idnumber}
                    onChangeText={value => setIdnumber(value)}
                    disabled={true}
                />
                {(errorIdNumber) ? (<Text style={styles.teksError}>errorIdNumber</Text>) : ''}
                <TextInput
                    style={styles.textInput}
                    label="Nama Mahasiswa"
                    value={mhsname}
                    onChangeText={value => setMhsname(value)}
                />
                {(errorMhsName) ? (<Text style={styles.teksError}>errorMhsName</Text>) : ''}
                <TextInput
                    style={styles.textInput}
                    label="Prodi"
                    value={mhsprodi}
                    onChangeText={value => setMhsprodi(value)}
                />
                {(errorMhsProdi) ? (<Text style={styles.teksError}>errorMhsProdi</Text>) : ''}
                {DropDownGender}
                {(errorMhsJenkel) ? (<Text style={styles.teksError}>errorMhsJenkel</Text>) : ''}
                <TextInput
                    style={styles.textInput}
                    label="Alamat"
                    multiline={true}
                    numberOfLines={5}
                    value={mhsalamat}
                    onChangeText={value => setMhsalamat(value)}
                />
                {(errorMhsAlamat) ? (<Text style={styles.teksError}>errorMhsAlamat</Text>) : ''}
                <TextInput
                    style={styles.textInput}
                    label="No.Hp"
                    keyboardType='number-pad'
                    value={mhsnohp}
                    onChangeText={value => setMhsnohp(value)}
                />
                {(errorMhsNohp) ? (<Text style={styles.teksError}>errorMhsNohp</Text>) : ''}
                <TextInput
                    style={styles.textInput}
                    label="E-Mail Address"
                    value={mhsemail}
                    onChangeText={value => setMhsemail(value)}
                />
                {(errorMhsEmail) ? (<Text style={styles.teksError}>errorMhsEmail</Text>) : ''}
                <TextInput
                    style={styles.textInput}
                    label="Dosen PA"
                    value={mhspembing}
                    onChangeText={value => setMhspembing(value)}
                />
                {(errorMhsPembing) ? (<Text style={styles.teksError}>errorMhsPembing</Text>) : ''}
                <TouchableOpacity style={styles.button} onPress={() => updateData()}>
                    {(loading) ?
                        (<ActivityIndicator size={20} color="white" />) : (
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
