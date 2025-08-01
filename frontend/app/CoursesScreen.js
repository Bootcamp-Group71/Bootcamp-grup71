import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function CoursesScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('../assets/back_button.png')} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Kurslarım</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Image source={require('../assets/notification_icon.png')} style={styles.notificationIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* User Progress Section */}
        <View style={styles.progressSection}>
                     <View style={styles.trophyContainer}>
             <Image source={require('../assets/gold_medal.png')} style={styles.trophyIcon} resizeMode="contain" />
           </View>
          <View style={styles.progressInfo}>
            <Text style={styles.pointsText}>2100 Puan</Text>
            <Text style={styles.levelText}>Seviye 3: Toplum Gönüllüsü</Text>
          </View>
        </View>

        {/* Course Cards */}
        <View style={styles.coursesContainer}>
                     {/* Course Card 1 */}
           <TouchableOpacity style={styles.courseCard} onPress={() => router.push('/emergency-instructions')}>
             <View style={styles.courseContent}>
               <View style={styles.courseInfo}>
                 <View style={styles.courseProgressSection}>
                   <Text style={styles.progressPercentage}>75% tamamlandı</Text>
                   <View style={styles.progressBar}>
                     <View style={[styles.progressFill, { width: '75%' }]} />
                   </View>
                 </View>
                 <Text style={styles.courseTitle}>Acil Durum Talimatları</Text>
                 <View style={styles.courseDetails}>
                   <Image source={require('../assets/courses_icon.png')} style={styles.bookIcon} resizeMode="contain" />
                   <Text style={styles.courseDetailText}>4 Ünite • 1s 45dk</Text>
                 </View>
               </View>
               <View style={styles.courseIconContainer}>
                 <Image source={require('../assets/cpr_icon.png')} style={styles.courseIcon} resizeMode="contain" />
               </View>
             </View>
           </TouchableOpacity>

                     {/* Course Card 2 */}
           <TouchableOpacity style={styles.courseCard}>
             <View style={styles.courseContent}>
               <View style={styles.courseInfo}>
                 <View style={styles.courseProgressSection}>
                   <Text style={styles.progressPercentage}>25% tamamlandı</Text>
                   <View style={styles.progressBar}>
                     <View style={[styles.progressFill, { width: '25%' }]} />
                   </View>
                 </View>
                 <Text style={styles.courseTitle}>İlk Yardım</Text>
                 <View style={styles.courseDetails}>
                   <Image source={require('../assets/courses_icon.png')} style={styles.bookIcon} resizeMode="contain" />
                   <Text style={styles.courseDetailText}>4 Ünite • 1s 15dk</Text>
                 </View>
               </View>
               <View style={styles.courseIconContainer}>
                 <Image source={require('../assets/medical_supplies_icon.png')} style={styles.courseIcon} resizeMode="contain" />
               </View>
             </View>
           </TouchableOpacity>

                     {/* Course Card 3 */}
           <TouchableOpacity style={styles.courseCard}>
             <View style={styles.courseContent}>
               <View style={styles.courseInfo}>
                 <View style={styles.courseProgressSection}>
                   <Text style={styles.progressPercentage}>50% tamamlandı</Text>
                   <View style={styles.progressBar}>
                     <View style={[styles.progressFill, { width: '50%' }]} />
                   </View>
                 </View>
                 <Text style={styles.courseTitle}>Acil Müdahale</Text>
                 <View style={styles.courseDetails}>
                   <Image source={require('../assets/courses_icon.png')} style={styles.bookIcon} resizeMode="contain" />
                   <Text style={styles.courseDetailText}>4 Ünite • 1s 15dk</Text>
                 </View>
               </View>
               <View style={styles.courseIconContainer}>
                 <Image source={require('../assets/first_aid_kit_icon.png')} style={styles.courseIcon} resizeMode="contain" />
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
        <TouchableOpacity style={styles.navItem}>
          <Image 
            source={require('../assets/courses_icon.png')} 
            style={[styles.navIcon, styles.navIconActive]} 
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
  progressSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FDF6F6',
  },
  trophyContainer: {
    marginRight: 15,
  },
  trophyIcon: {
    width: 60,
    height: 60,
  },
  progressInfo: {
    flex: 1,
  },
  pointsText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  levelText: {
    fontSize: 14,
    color: '#666',
  },
  coursesContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  courseCard: {
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
  courseContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  courseInfo: {
    flex: 1,
  },
  courseProgressSection: {
    marginBottom: 10,
  },
  progressPercentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#20B2AA',
    marginBottom: 8,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    marginBottom: 15,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#20B2AA',
    borderRadius: 3,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  courseDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bookIcon: {
    width: 16,
    height: 16,
    marginRight: 8,
  },
  courseDetailText: {
    fontSize: 14,
    color: '#666',
  },
  courseIconContainer: {
    width: 90,
    height: 90,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
  },
  courseIcon: {
    width: 70,
    height: 70,
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