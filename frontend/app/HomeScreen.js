import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState('İlk Yardım');
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Image source={require('../assets/logo.png')} style={styles.logo} resizeMode="contain" />
          </View>
        </View>

        {/* Main Content */}
        <View style={styles.content}>
          {/* Title */}
          <View style={styles.titleContainer}>
            <Image source={require('../assets/title_hadi_baslayalim.png')} style={styles.titleImage} resizeMode="contain" />
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <Image source={require('../assets/search_bar.png')} style={styles.searchBarImage} resizeMode="contain" />
          </View>

          {/* Category Buttons */}
          <View style={styles.categoryContainer}>
            <Image source={require('../assets/category_buttons.png')} style={styles.categoryButtonsImage} resizeMode="contain" />
          </View>

          {/* Courses Section */}
          <View style={styles.coursesSection}>
            <View style={styles.coursesGrid}>
                             {/* Acil Durum Talimatları */}
               <TouchableOpacity style={styles.courseCard} onPress={() => router.push('/emergency-instructions')}>
                 <Image source={require('../assets/cpr_icon.png')} style={styles.courseIcon} resizeMode="contain" />
                 <Text style={styles.courseTitle}>Acil Durum Talimatları</Text>
               </TouchableOpacity>

               {/* İlk Yardım Temelleri */}
               <TouchableOpacity style={styles.courseCard}>
                 <Image source={require('../assets/first_aid_kit_icon.png')} style={styles.courseIcon} resizeMode="contain" />
                 <Text style={styles.courseTitle}>İlk Yardım Temelleri</Text>
               </TouchableOpacity>

               {/* Yanık ve Yaralanma */}
               <TouchableOpacity style={styles.courseCard}>
                 <Image source={require('../assets/burn_icon.png')} style={styles.courseIcon} resizeMode="contain" />
                 <Text style={styles.courseTitle}>Yanık ve Yaralanma</Text>
               </TouchableOpacity>

               {/* Doğal Afetler */}
               <TouchableOpacity style={styles.courseCard}>
                 <Image source={require('../assets/medical_supplies_icon.png')} style={styles.courseIcon} resizeMode="contain" />
                 <Text style={styles.courseTitle}>Doğal Afetler</Text>
               </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/home')}>
          <Image 
            source={require('../assets/home_icon.png')} 
            style={[styles.navIcon, styles.navIconActive]} 
            resizeMode="contain" 
          />
        </TouchableOpacity>
                 <TouchableOpacity style={styles.navItem} onPress={() => router.push('/courses')}>
           <Image 
             source={require('../assets/courses_icon.png')} 
             style={styles.navIcon} 
             resizeMode="contain" 
           />
         </TouchableOpacity>
                 <TouchableOpacity style={styles.navItem} onPress={() => router.push('/rewards')}>
           <Image 
             source={require('../assets/trophy_icon.png')} 
             style={styles.navIcon} 
             resizeMode="contain" 
           />
         </TouchableOpacity>
                 <TouchableOpacity style={styles.navItem} onPress={() => router.push('/profile')}>
           <Image 
             source={require('../assets/profile_icon.png')} 
             style={styles.navIcon} 
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
    backgroundColor: '#FDF6F6',
  },
  header: {
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 5,
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    width: 300,
    height: 160,
  },
  content: {
    paddingHorizontal: 20,
    flex: 1,
  },
  titleContainer: {
    alignItems: 'center',
    marginBottom: 25,
  },
  titleImage: {
    width: 300,
    height: 60,
  },
  searchContainer: {
    marginBottom: 25,
    alignItems: 'center',
  },
  searchBarImage: {
    width: '100%',
    height: 50,
  },
  categoryContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  categoryButtonsImage: {
    width: '100%',
    height: 50,
  },
  coursesSection: {
    marginBottom: 20,
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseCard: {
    width: '48%',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
  },
  courseIcon: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  courseTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingVertical: 25,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    width: '100%',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  navIcon: {
    width: 32,
    height: 32,
    tintColor: '#404040',
  },
  navIconActive: {
    tintColor: '#150892',
  },
}); 