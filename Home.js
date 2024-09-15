import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, PermissionsAndroid } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { useNavigation } from '@react-navigation/native';

//Definição das variaveis
export default function Home() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();


  //Requisitar permissoes
  useEffect(() => {
    requestPermission();
  }, []);

  // Remove a barra de navegação
  navigation.setOptions({
    headerShown: false, 
  });

  const requestPermission = async () => {
    try {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
      ]);
      if (
        granted['android.permission.ACCESS_FINE_LOCATION'] === PermissionsAndroid.RESULTS.GRANTED &&
        granted['android.permission.SEND_SMS'] === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissions granted');
      } else {
        console.log('Permissions denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };


  //Dados inseridos pelo usuário: telefone e password
  const handleActivate = () => {
    if (phoneNumber.length === 15 && password === confirmPassword) {
      const formattedPhoneNumber = `+55${phoneNumber.replace(/\D/g, '')}`; // Remove caracteres especiais e mantém o +
      navigation.navigate('Desativar', { phoneNumber: formattedPhoneNumber, savedPassword: password });
    } else {
      alert('Por favor, verifique as informações inseridas.');
    }
  };

  //configuraçoes dos inputs
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alerta de roubo</Text>
      <TextInputMask
        type={'cel-phone'}
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        keyboardType="numeric"
        maxLength={15}
        placeholder="Número de telefone"
      />
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        keyboardType="numeric"
        maxLength={6}
        placeholder="Senha (6 dígitos)"
      />
      <TextInput
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
        keyboardType="numeric"
        maxLength={6}
        placeholder="Confirmar senha"
      />
      <Button title="Ativar" onPress={handleActivate} style={styles.button} />
    </View>
  );
}

//Definição dos layouts
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  button: {
    marginTop: 20,
  },
});
