import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Image } from 'react-native';
import { useRouter } from 'expo-router';

export default function SSSScreen() {
  const router = useRouter();
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const faqData = [
    {
      id: 1,
      question: "ResQ kimler için uygundur?",
             answer: "• Gençler ve Üniversite Öğrencileri\n• Ebeveynler ve Bakıcılar\n• Kurumsal Çalışanlar\n• Öğretmenler ve Eğitimciler\n• Toplum Gönüllüleri ve STK Üyeleri\n\nHiçbir ön bilgiye gerek yoktur; uygulama sizi adım adım yönlendirir."
    },
    {
      id: 2,
      question: "Puanlar ve seviyeler nasıl kazanılır?",
      answer: "Kullanıcılar, uygulamadaki mini dersleri tamamlayarak, senaryolarda doğru adımları seçerek ve günlük görevleri yerine getirerek puan kazanır. Bu puanlar birikir ve kullanıcıların seviye atlamasını ve rozetler kazanmasını sağlar.\n\nYanlış cevaplarda bile öğrenmeye devam ettiğiniz için sistem sizi tekrarlarla destekler, ama en yüksek puanı almak için doğru sıralamalar ve kararlar önemlidir."
    },
    {
      id: 3,
      question: "ResQ çevrimdışı çalışır mı?",
      answer: "Evet, uygulamanın bazı temel bölümleri çevrimdışı olarak kullanılabilir.\n\nAncak interaktif senaryolar, konum tabanlı özellikler ve video içerikler için internet bağlantısı gerekebilir."
    },
    {
      id: 4,
      question: "Kurumsal kullanım için seçenekler var mı?",
      answer: "Evet, uygulama kurumlar ve eğitim veren kuruluşlar için özel çözümler sunar.\n\nOkullar, şirketler, belediyeler, STK'lar ve sağlık kurumları gibi topluluklara yönelik:\n• Toplu kullanıcı lisansları\n• Eğitim raporları ve ilerleme takibi\n• Kuruma özel senaryo ve modül tasarımı\n\nAyrıca kurum çalışanlarına yönelik düzenli eğitim takvimleri, acil durum tatbikat senaryoları ve oyunlaştırma modülleriyle motivasyon artırıcı içerikler hazırlanabilir.\n\nDaha fazla bilgi veya teklif almak isterseniz, bizimle iletişime geçebilirsiniz."
    },
    {
      id: 5,
      question: "Verilerim ve konum bilgilerim güvende mi?",
      answer: "Evet, verileriniz güven altındadır. Uygulama, kişisel bilgilerinizi ve ilerleme verilerinizi korumak için uluslararası standartlara uygun veri güvenliği protokolleri kullanır.\n\nKonum bilgisi gibi hassas veriler sadece sizin izninizle alınır ve yalnızca acil durumlara özel işlevlerde (örneğin en yakın hastaneyi gösterme) kullanılır.\n\nHiçbir kişisel bilgi üçüncü taraflarla paylaşılmaz."
    }
  ];

  const toggleQuestion = (id) => {
    setExpandedQuestion(expandedQuestion === id ? null : id);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Image source={require('../assets/back_button.png')} style={styles.backIcon} resizeMode="contain" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Sıkça Sorulan Sorular</Text>
        <TouchableOpacity style={styles.notificationButton}>
          <Image source={require('../assets/notification_icon.png')} style={styles.notificationIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {faqData.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.questionContainer}
            onPress={() => toggleQuestion(item.id)}
            activeOpacity={0.7}
          >
            <View style={styles.questionHeader}>
              <Text style={styles.questionText}>{item.question}</Text>
              <View style={[
                styles.arrowContainer,
                expandedQuestion === item.id && styles.arrowRotated
              ]}>
                <Image 
                  source={require('../assets/forward_arrow.png')} 
                  style={styles.arrowIcon} 
                  resizeMode="contain" 
                />
              </View>
            </View>
            
            {expandedQuestion === item.id && (
              <View style={styles.answerContainer}>
                <Text style={styles.answerText}>{item.answer}</Text>
              </View>
            )}
          </TouchableOpacity>
        ))}
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
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    width: 20,
    height: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  notificationButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notificationIcon: {
    width: 20,
    height: 20,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  questionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    flex: 1,
    marginRight: 10,
  },
  arrowContainer: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowRotated: {
    transform: [{ rotate: '90deg' }],
  },
  arrowIcon: {
    width: 16,
    height: 16,
  },
  answerContainer: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  answerText: {
    fontSize: 14,
    color: '#666666',
    lineHeight: 20,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
}); 