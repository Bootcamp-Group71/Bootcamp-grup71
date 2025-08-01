import React, { useState } from 'react';
import { View, Image, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Text } from 'react-native';
import { useRouter } from 'expo-router';

export default function EmergencyInstructionsScreen() {
  const [expandedInfo, setExpandedInfo] = useState(false);
  const [expandedFAQs, setExpandedFAQs] = useState({
    faq1: false,
    faq2: false,
    faq3: false,
    faq4: false,
  });
  const router = useRouter();

  const toggleInfo = () => {
    setExpandedInfo(!expandedInfo);
  };

  const toggleFAQ = (faqKey) => {
    setExpandedFAQs(prev => ({
      ...prev,
      [faqKey]: !prev[faqKey]
    }));
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('../assets/back_button.png')} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ünite 1</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Image source={require('../assets/notification_icon.png')} style={styles.notificationIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 130 }}>
        {/* Main Content */}
        <View style={styles.content}>
          {/* Header Section */}
          <View style={styles.headerSection}>
            <View style={styles.cprCard}>
              <Image source={require('../assets/cpr_icon.png')} style={styles.cprIcon} resizeMode="contain" />
            </View>
            <Text style={styles.mainTitle}>Acil Durum Talimatları</Text>
          </View>

          {/* Information Card */}
          <TouchableOpacity style={styles.infoCard} onPress={toggleInfo}>
            <Text style={styles.infoQuestion}>Acil Çağrı Merkezi hizmet alanı nedir?</Text>
            {expandedInfo && (
              <Text style={styles.infoAnswer}>
                Sağlık, emniyet, jandarma, itfaiye, afet, orman yangını ilgilendiren her türlü durum için kurumlar arası koordinasyonun sağlanabilmesi adına 112 tek çağrı sistemine geçilmiştir.
              </Text>
            )}
          </TouchableOpacity>

          {/* FAQ Cards */}
          <TouchableOpacity style={styles.faqCard} onPress={() => toggleFAQ('faq1')}>
            <Text style={styles.faqQuestion}>112'yi hangi durumlarda arayabiliriz?</Text>
            {expandedFAQs.faq1 && (
              <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>FAQ 1 cevabı buraya gelecek...</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqCard} onPress={() => toggleFAQ('faq2')}>
            <Text style={styles.faqQuestion}>112'yi aradığımda ne sorulur?</Text>
            {expandedFAQs.faq2 && (
              <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>FAQ 2 cevabı buraya gelecek...</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqCard} onPress={() => toggleFAQ('faq3')}>
            <Text style={styles.faqQuestion}>112 aramaları ücretli midir?</Text>
            {expandedFAQs.faq3 && (
              <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>FAQ 3 cevabı buraya gelecek...</Text>
              </View>
            )}
          </TouchableOpacity>

          <TouchableOpacity style={styles.faqCard} onPress={() => toggleFAQ('faq4')}>
            <Text style={styles.faqQuestion}>Bulunduğum yerin adresini bilmediğim durumlarda yardımcı olur musunuz?</Text>
            {expandedFAQs.faq4 && (
              <View style={styles.faqAnswer}>
                <Text style={styles.faqAnswerText}>FAQ 4 cevabı buraya gelecek...</Text>
              </View>
            )}
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
  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  headerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  cprCard: {
    width: 80,
    height: 80,
    borderRadius: 15,
    backgroundColor: '#FFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  cprIcon: {
    width: 60,
    height: 60,
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  infoCard: {
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
    justifyContent: 'center',
    minHeight: 60,
  },
  infoQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
    textAlign: 'left',
  },
  infoAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  faqCard: {
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
  faqQuestion: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  faqAnswer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  faqAnswerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
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