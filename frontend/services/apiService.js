// API Service for backend integration
class ApiService {
  constructor() {
    this.baseURL = 'http://localhost:3000/api'; // Backend URL
  }

  // Login method
  async login(email, password) {
    try {
      // Simulate API call for now
      console.log('Login attempt:', { email, password });
      
      // For development, return success
      return {
        success: true,
        message: 'Giriş başarılı!',
        user: {
          id: 1,
          email: email,
          fullName: 'Test User',
          full_name: 'Test User'
        }
      };
    } catch (error) {
      throw new Error('Giriş yapılırken hata oluştu');
    }
  }

  // Register method
  async register(userData) {
    try {
      // Simulate API call for now
      console.log('Register attempt:', userData);
      
      // For development, return success
      return {
        success: true,
        message: 'Kayıt başarılı!',
        user: {
          id: 1,
          email: userData.email,
          fullName: userData.fullName,
          full_name: userData.fullName
        }
      };
    } catch (error) {
      throw new Error('Kayıt olurken hata oluştu');
    }
  }

  // Get current user
  async getCurrentUser() {
    try {
      // Simulate API call for now
      // Get stored user data from localStorage or AsyncStorage
      const storedUser = this.getStoredUser();
      return storedUser || {
        id: 1,
        email: 'user@gmail.com',
        fullName: 'Kullanıcı',
        full_name: 'Kullanıcı'
      };
    } catch (error) {
      console.log('Kullanıcı bilgileri alınamadı:', error);
      return null;
    }
  }

  // Store user data (simulate localStorage)
  storeUser(userData) {
    try {
      // In a real app, you'd use AsyncStorage
      // For now, we'll store in memory
      this.currentUser = userData;
    } catch (error) {
      console.log('Kullanıcı bilgileri kaydedilemedi:', error);
    }
  }

  // Get stored user data
  getStoredUser() {
    return this.currentUser || null;
  }

  // Logout method
  async logout() {
    try {
      // Simulate API call for now
      console.log('Logout attempt');
      
      // Clear stored user data
      this.currentUser = null;
      
      return { success: true, message: 'Çıkış başarılı!' };
    } catch (error) {
      throw new Error('Çıkış yapılırken hata oluştu');
    }
  }
}

export default new ApiService(); 