import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function RewardsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('../assets/back_button.png')} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ödüllerim</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Image source={require('../assets/notification_icon.png')} style={styles.notificationIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Awards List */}
        <View style={styles.awardsContainer}>
          {/* Award Card 1 */}
          <TouchableOpacity style={styles.awardCard}>
            <View style={styles.awardContent}>
              <View style={styles.awardIconContainer}>
                <Image source={require('../assets/first_step_badge.png')} style={styles.awardIcon} resizeMode="contain" />
              </View>
              <View style={styles.awardInfo}>
                <Text style={styles.awardTitle}>İlk Adım Rozeti</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Award Card 2 */}
          <TouchableOpacity style={styles.awardCard}>
            <View style={styles.awardContent}>
              <View style={styles.awardIconContainer}>
                <Image source={require('../assets/112_expert_badge.png')} style={styles.awardIcon} resizeMode="contain" />
              </View>
              <View style={styles.awardInfo}>
                <Text style={styles.awardTitle}>112 Uzmanı</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Award Card 3 */}
          <TouchableOpacity style={styles.awardCard}>
            <View style={styles.awardContent}>
              <View style={styles.awardIconContainer}>
                <Image source={require('../assets/novice_volunteer_badge.png')} style={styles.awardIcon} resizeMode="contain" />
              </View>
              <View style={styles.awardInfo}>
                <Text style={styles.awardTitle}>Çaylak Gönüllü</Text>
              </View>
            </View>
          </TouchableOpacity>

          {/* Award Card 4 */}
          <TouchableOpacity style={styles.awardCard}>
            <View style={styles.awardContent}>
              <View style={styles.awardIconContainer}>
                <Image source={require('../assets/community_volunteer_badge.png')} style={styles.awardIcon} resizeMode="contain" />
              </View>
              <View style={styles.awardInfo}>
                <Text style={styles.awardTitle}>Toplum Gönüllüsü</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => router.push('/home')}>
          <Image 
            source={require('../assets/home_icon.png')} 
            style={styles.navIcon} 
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
        <TouchableOpacity style={styles.navItem}>
          <Image 
            source={require('../assets/trophy_icon.png')} 
            style={[styles.navIcon, styles.navIconActive]} 
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
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
    fontWeight: 'bold',
    color: '#333',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
  awardsContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  awardCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  awardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  awardIconContainer: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  awardIcon: {
    width: 80,
    height: 80,
  },
  awardInfo: {
    flex: 1,
  },
  awardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    paddingVertical: 20,
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
    justifyContent: 'center',
    paddingVertical: 5,
  },
  navIcon: {
    width: 28,
    height: 28,
    tintColor: '#404040',
  },
  navIconActive: {
    tintColor: '#150892',
  },
}); 