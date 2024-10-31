import React, { useState } from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, Alert, TextInput, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

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

    if (!result.cancelled && result.assets.length > 0) {
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

    if (!result.cancelled && result.assets.length > 0) {
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

  const shareImage = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`Uh oh, sharing isn't available on your platform`);
      return;
    }
    await Sharing.shareAsync(imageUri);
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Image source={{ uri: imageUri }} style={styles.image} />
        <TouchableOpacity onPress={pickImage} style={styles.button3}>
          <Text style={styles.buttontext}>Cambiar Imagen de Perfil</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={takePhoto} style={styles.button2}>
          <Text style={styles.buttontext}>Tomar Foto</Text>
        </TouchableOpacity>

        <View style={styles.subcontainer2}>
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
        </View>
        <TouchableOpacity onPress={handleLogin} style={styles.button2}>
          <Text style={styles.buttontext}>Aceptar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={shareImage} style={styles.button2}>
          <Text style={styles.buttontext}>Compartir Imagen</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000000', alignItems: 'center', justifyContent: 'center' },
  subcontainer2: { marginTop: 25, marginBottom: 15 },
  subcontainer: { borderColor: '#294AEC', backgroundColor: '#1E1E1F', borderWidth: 2, alignItems: 'center', justifyContent: 'center', padding: 30, borderRadius: 50 },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  input: { padding: 5, height: 25, width: 200, borderRadius: 5, backgroundColor: '#FFFFFF', color: '#000000', marginTop: 5, marginBottom: 10, borderColor: '#5975FE', borderWidth: 2 },
  button2: { height: 30, width: 120, color: '#FFFFFF', backgroundColor: '#191970', borderRadius: 8, borderColor: '#5975FE', borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  button3: { height: 30, width: 150, color: '#FFFFFF', backgroundColor: '#191970', borderRadius: 8, borderColor: '#5975FE', borderWidth: 1.5, justifyContent: 'center', alignItems: 'center' },
  buttontext: { color: '#E0FFFF', fontSize: 12, justifyContent: 'center' }
});

export default App;
