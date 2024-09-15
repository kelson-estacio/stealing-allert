import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Dimensions } from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { SendDirectSms } from 'react-native-send-direct-sms';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function Desativar({ route }) {
  const [speed, setSpeed] = useState(0);
  const [password, setPassword] = useState('');
  const [isMonitoring, setIsMonitoring] = useState(false);
  const { phoneNumber, savedPassword } = route.params; 
  const navigation = useNavigation();

  useEffect(() => {
    startMonitoring();
    return () => stopMonitoring();
  }, []);

  // Remove a barra de navegação
  navigation.setOptions({
    headerShown: false, 
  });

  //inicia a função de monitoramento
  const startMonitoring = () => {
    setIsMonitoring(true);
    Geolocation.watchPosition(
      (position) => {
        const { speed } = position.coords;
        setSpeed(speed * 3.6); // Converte m/s para km/h
        if (speed * 3.6 >= 1) {
          sendSMSAlert(position.coords);
        }
      },
      (error) => {
        console.log(error);
      },
      { enableHighAccuracy: true, distanceFilter: 0, interval: 1000 }
    );
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);
    Geolocation.clearWatch();
  };

  //Função para o envio de mensagem SMS com a localização
  const sendSMSAlert = (coords) => {
    const message = `Alerta de roubo: https://www.google.com/maps?q=${coords.latitude},${coords.longitude}`;    SendDirectSms(phoneNumber, message)
      .then((res) => console.log("SMS enviado com sucesso", res))
      .catch((err) => console.error("Erro ao enviar SMS", err));
  };


  //Confronta o password definido
  const handleDeactivate = () => {
    if (password === savedPassword) { 
      stopMonitoring();
      navigation.navigate('Home');
    } else {
      alert('Senha incorreta');
    }
  };

  //Configuraçao do input
  return (
    <View style={styles.container}>
      <Text style={styles.speedText}>Velocidade: {speed.toFixed(2)} km/h</Text>
      <TextInput
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
        keyboardType="numeric"
        maxLength={6}
        placeholder="Digite a senha"
      />
      <Button title="Desativar" onPress={handleDeactivate} color="red" style={styles.button} />
    </View>
  );
}
//Layouts
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  speedText: {
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