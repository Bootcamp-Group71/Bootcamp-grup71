import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';

export default function WelcomeScreen({ navigation }) {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Hoş geldiniz!</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Image source={require('../assets/btn_google.png')} style={styles.buttonImage} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Image source={require('../assets/btn_apple.png')} style={styles.buttonImage} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/create-account')}>
          <Image source={require('../assets/btn_email.png')} style={styles.buttonImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.footerText}>
          Hesabınız var mı? <Text style={styles.loginLink}>Giriş yapın</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F6',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 40,
  },
  logoContainer: {
    marginBottom: 50,
    alignItems: 'center',
  },
  logo: {
    width: 525,
    height: 300,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 30,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  button: {
    marginVertical: 8,
  },
  buttonImage: {
    width: 350,
    height: 60,
  },
  footerText: {
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
    marginTop: 20,
    marginBottom: 20,
  },
  loginLink: {
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});