import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Hoş geldiniz!</Text>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/btn_google.png')} style={styles.buttonImage} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/btn_apple.png')} style={styles.buttonImage} resizeMode="contain" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Image source={require('../assets/btn_email.png')} style={styles.buttonImage} resizeMode="contain" />
        </TouchableOpacity>
      </View>
      <Text style={styles.footerText}>
        Hesabınız var mı? <Text style={styles.loginLink}>Giriş yapın</Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF6F6',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  logoContainer: {
    marginTop: 60,
    marginBottom: 80,
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
    marginBottom: 40,
    textAlign: 'center',
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 60,
  },
  button: {
    marginVertical: 8,
  },
  buttonImage: {
    width: 350,
    height: 60,
  },
  footerText: {
    position: 'absolute',
    bottom: 50,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: '#888',
    fontSize: 15,
  },
  loginLink: {
    color: '#000',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});