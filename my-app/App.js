import React, { useState } from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity, Alert, TextInput, Platform} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const App = () => {
  const [imageUri, setImageUri] = useState('https://static.vecteezy.com/system/resources/previews/005/005/840/non_2x/user-icon-in-trendy-flat-style-isolated-on-grey-background-user-symbol-for-your-web-site-design-logo-app-ui-illustration-eps10-free-vector.jpg');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleLogin = () => {
    if (username === 'usuario' && password === 'contraseña') {
      if (Platform.OS === 'web') {
        window.alert('Inicio de sesión exitoso');
      } else {
        Alert.alert('Inicio de sesión exitoso'); // Para iOS y Android
      }
    } else {
      if (Platform.OS === 'web') {
        window.alert('Credenciales incorrectas');
      } else {
        Alert.alert('Credenciales incorrectas'); // Para iOS y Android
      }
    }
  };
  return (
      <View style={styles.container}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <TouchableOpacity onPress={pickImage}>
          <Text>Cambiar Imagen de Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto}>
          <Text>Tomar Foto</Text>
        </TouchableOpacity>
        <TextInput
            placeholder="Usuario"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
        />
        <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            style={styles.input}
        />
        <TouchableOpacity onPress={handleLogin}>
          <Text>Aceptar</Text>
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 12,
    padding: 10,
    width: '80%',
  },
});

export default App;
