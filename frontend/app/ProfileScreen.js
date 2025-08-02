import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import apiService from "../services/apiService";

export default function ProfileScreen() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    fullName: "Kullanıcı",
    email: "user@gmail.com",
  });

  // Kullanıcı bilgilerini yükle
  useEffect(() => {
    const loadUserInfo = async () => {
      try {
        const currentUser = await apiService.getCurrentUser();
        if (currentUser) {
          setUserInfo({
            fullName: currentUser.full_name || "Kullanıcı",
            email: currentUser.email || "user@gmail.com",
          });
        }
      } catch (error) {
        console.log("Kullanıcı bilgileri yüklenemedi:", error);
      }
    };

    loadUserInfo();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
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
        <Text style={styles.headerTitle}>Profilim</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Image
            source={require("../assets/notification_icon.png")}
            style={styles.notificationIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 130 }}
      >
        {/* Profile Info Section */}
        <View style={styles.profileSection}>
          <View style={styles.profileImageContainer}>
            <Image
              source={require("../assets/profile_icon.png")}
              style={styles.profileImage}
              resizeMode="contain"
            />
          </View>
          <Text style={styles.userName}>{userInfo.fullName}</Text>
          <Text style={styles.userEmail}>{userInfo.email}</Text>
          <TouchableOpacity style={styles.editProfileButton}>
            <Text style={styles.editProfileText}>Profili Düzenle</Text>
          </TouchableOpacity>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          {/* Kurslarım */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/courses")}
          >
            <Text style={styles.menuText}>Kurslarım</Text>
            <View style={styles.arrowContainer}>
              <Image
                source={require("../assets/forward_arrow.png")}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Geçmiş */}
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Geçmiş</Text>
            <View style={styles.arrowContainer}>
              <Image
                source={require("../assets/forward_arrow.png")}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Ödüllerim */}
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => router.push("/rewards")}
          >
            <Text style={styles.menuText}>Ödüllerim</Text>
            <View style={styles.arrowContainer}>
              <Image
                source={require("../assets/forward_arrow.png")}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Ayarlar */}
          <TouchableOpacity style={styles.menuItem}>
            <Text style={styles.menuText}>Ayarlar</Text>
            <View style={styles.arrowContainer}>
              <Image
                source={require("../assets/forward_arrow.png")}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>

          {/* Çıkış Yap */}
          <TouchableOpacity
            style={[styles.menuItem, styles.logoutItem]}
            onPress={async () => {
              try {
                await apiService.logout();
                router.push("/login");
              } catch (error) {
                console.log("Çıkış yapılırken hata:", error);
              }
            }}
          >
            <Text style={[styles.menuText, styles.logoutText]}>Çıkış Yap</Text>
            <View style={[styles.arrowContainer, styles.logoutArrow]}>
              <Image
                source={require("../assets/forward_arrow.png")}
                style={styles.arrowIcon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/home")}
        >
          <Image
            source={require("../assets/home_icon.png")}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/courses")}
        >
          <Image
            source={require("../assets/courses_icon.png")}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => router.push("/rewards")}
        >
          <Image
            source={require("../assets/trophy_icon.png")}
            style={styles.navIcon}
            resizeMode="contain"
          />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Image
            source={require("../assets/profile_icon.png")}
            style={[styles.navIcon, styles.navIconActive]}
            resizeMode="contain"
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
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
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  notificationButton: {
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
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 30,
    paddingHorizontal: 20,
  },
  profileImageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  profileImage: {
    width: 60,
    height: 60,
    tintColor: "#666",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "#20B2AA",
    marginBottom: 20,
  },
  editProfileButton: {
    backgroundColor: "#150892",
    borderRadius: 10,
    paddingHorizontal: 30,
    paddingVertical: 12,
  },
  editProfileText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  menuContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  menuItem: {
    backgroundColor: "#FFF",
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  menuText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  arrowContainer: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: "#150892",
    alignItems: "center",
    justifyContent: "center",
  },
  arrowIcon: {
    width: 16,
    height: 16,
    tintColor: "#FFF",
  },
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFF",
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#E0E0E0",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    width: "100%",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 5,
  },
  navIcon: {
    width: 28,
    height: 28,
    tintColor: "#404040",
  },
  navIconActive: {
    tintColor: "#150892",
  },
  logoutItem: {
    backgroundColor: "#FFF5F5",
    borderWidth: 1,
    borderColor: "#FFE4E4",
  },
  logoutText: {
    color: "#DC2626",
  },
  logoutArrow: {
    backgroundColor: "#DC2626",
  },
});
