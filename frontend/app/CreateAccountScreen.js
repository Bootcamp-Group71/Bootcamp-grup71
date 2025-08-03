import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import apiService from "../services/apiService";

export default function CreateAccountScreen({ navigation }) {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      Alert.alert("Hata", "Ad Soyad alanı boş olamaz!");
      return false;
    }
    if (!formData.email.trim()) {
      Alert.alert("Hata", "E-posta alanı boş olamaz!");
      return false;
    }
    if (!formData.email.includes("@")) {
      Alert.alert("Hata", "Geçerli bir e-posta adresi giriniz!");
      return false;
    }
    if (formData.password.length < 6) {
      Alert.alert("Hata", "Şifre en az 6 karakter olmalıdır!");
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      Alert.alert("Hata", "Şifreler eşleşmiyor!");
      return false;
    }
    return true;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const result = await apiService.register(formData);
      
      // Store user data
      apiService.storeUser({
        id: result.user.id,
        email: formData.email,
        fullName: formData.fullName,
        full_name: formData.fullName
      });
      
      Alert.alert(
        "Başarılı!",
        "Hesabınız başarıyla oluşturuldu. Giriş yapabilirsiniz.",
        [
          {
            text: "Tamam",
            onPress: () => {
              // Form verilerini login sayfasına aktar
              router.push({
                pathname: "/login",
                params: {
                  email: formData.email,
                  password: formData.password,
                },
              });
            },
          },
        ]
      );
    } catch (error) {
      Alert.alert("Hata", error.message);
    }
  };

  // Tek görsel kullan
  const courseImage = require("../assets/courses_grid.png");

  // Her kart için aynı görseli kullan, ama farklı pozisyonlarda göster

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Image
            source={require("../assets/back_button.png")}
            style={styles.backIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      {/* Logo */}
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Welcome Text */}
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcomeTitle}>Hoşgeldiniz!</Text>
        <Text style={styles.welcomeSubtitle}>
          Hesabını oluştur ve ResQ'ya katıl!
        </Text>
      </View>

      {/* Form */}
      <View style={styles.formContainer}>
        <TextInput
          style={styles.input}
          placeholder="Ad Soyad"
          placeholderTextColor="#999"
          value={formData.fullName}
          onChangeText={(text) => handleInputChange("fullName", text)}
        />

        <TextInput
          style={styles.input}
          placeholder="E-posta"
          placeholderTextColor="#999"
          keyboardType="email-address"
          value={formData.email}
          onChangeText={(text) => handleInputChange("email", text)}
        />

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Şifre"
            placeholderTextColor="#999"
            secureTextEntry={!showPassword}
            value={formData.password}
            onChangeText={(text) => handleInputChange("password", text)}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowPassword(!showPassword)}
          >
            <Text style={styles.eyeIcon}>{showPassword ? "👁️" : "👁️‍🗨️"}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Şifre Tekrar"
            placeholderTextColor="#999"
            secureTextEntry={!showConfirmPassword}
            value={formData.confirmPassword}
            onChangeText={(text) => handleInputChange("confirmPassword", text)}
          />
          <TouchableOpacity
            style={styles.eyeButton}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            <Text style={styles.eyeIcon}>
              {showConfirmPassword ? "👁️" : "👁️‍🗨️"}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.createAccountButton}
          onPress={handleRegister}
        >
          <Text style={styles.createAccountButtonText}>Hesap Oluştur</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <Text style={styles.googleButtonText}>Google ile Kaydol</Text>
        </TouchableOpacity>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Zaten hesabın var mı?{" "}
          <Text style={styles.loginLink} onPress={() => router.push("/login")}>
            Giriş yap
          </Text>
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDF6F6",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 5,
    paddingBottom: 10,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    marginRight: 10,
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 25,
  },
  logo: {
    width: 300,
    height: 150,
  },
  welcomeContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  welcomeTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  welcomeSubtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  formContainer: {
    paddingHorizontal: 30,
    marginBottom: 40,
  },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    fontSize: 16,
  },
  eyeButton: {
    padding: 15,
  },
  eyeIcon: {
    fontSize: 20,
  },
  createAccountButton: {
    backgroundColor: "#1E3A8A",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    marginBottom: 15,
  },
  createAccountButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  googleButton: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
  },
  googleButtonText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "500",
  },
  footer: {
    alignItems: "center",
    paddingBottom: 30,
  },
  footerText: {
    fontSize: 14,
    color: "#666",
  },
  loginLink: {
    color: "#1E3A8A",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
}); 