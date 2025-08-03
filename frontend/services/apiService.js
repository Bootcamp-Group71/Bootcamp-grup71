// Backend API servisi - LOCAL AUTH SERVICE KULLANILIYOR
// PRODUCTION URL - YORUMA ALINDI
// const API_BASE_URL = "https://bootcamp-grup71-production.up.railway.app/api/v1";

// LOCAL URL - YORUMA ALINDI (Local auth service kullanıyoruz)
// const API_BASE_URL = "http://localhost:8000/api/v1";

// Local Auth Service kullanıyoruz
import authService from "./authService";

class ApiService {
  // Kullanıcı kaydı
  async register(userData) {
    try {
      return await authService.register(userData);
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı girişi
  async login(email, password) {
    try {
      return await authService.login(email, password);
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı çıkışı
  async logout() {
    try {
      return await authService.logout();
    } catch (error) {
      throw error;
    }
  }

  // Mevcut kullanıcı bilgilerini al
  async getCurrentUser() {
    try {
      return authService.getCurrentUser();
    } catch (error) {
      return null;
    }
  }

  // Kursları getir (Mock data)
  async getCourses() {
    try {
      // Mock kurs verisi
      return [
        {
          id: 1,
          title: "Temel İlk Yardım",
          description: "Acil durumlarda temel müdahale teknikleri",
          duration: "2 saat",
          level: "Başlangıç",
        },
        {
          id: 2,
          title: "CPR Teknikleri",
          description: "Kalp masajı ve suni teneffüs",
          duration: "1.5 saat",
          level: "Orta",
        },
        {
          id: 3,
          title: "Kanama Kontrolü",
          description: "Farklı kanama türlerinde müdahale",
          duration: "1 saat",
          level: "Başlangıç",
        },
      ];
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcının giriş yapıp yapmadığını kontrol et
  async isLoggedIn() {
    return authService.isLoggedIn();
  }
}

export default new ApiService();
