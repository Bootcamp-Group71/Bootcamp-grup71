// Basit in-memory storage kullanarak AsyncStorage bağımlılığını kaldırıyoruz
class AuthService {
  constructor() {
    // In-memory storage
    this.users = [
      // Test kullanıcısı
      {
        id: "1",
        fullName: "Test Kullanıcı",
        email: "test@example.com",
        password: "123456",
        createdAt: new Date().toISOString(),
      },
    ];
    this.currentUser = null;
  }

  // Kullanıcı kaydı
  async register(userData) {
    try {
      // Email kontrolü
      const existingUser = this.users.find(
        (user) => user.email === userData.email
      );
      if (existingUser) {
        throw new Error("Bu email adresi zaten kayıtlı!");
      }

      // Yeni kullanıcı oluştur
      const newUser = {
        id: Date.now().toString(),
        fullName: userData.fullName,
        email: userData.email,
        password: userData.password, // Gerçek uygulamada şifre hash'lenmelidir
        createdAt: new Date().toISOString(),
      };

      // Kullanıcıyı kaydet
      this.users.push(newUser);

      return { success: true, message: "Kayıt başarılı!" };
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı girişi
  async login(email, password) {
    try {
      const user = this.users.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        throw new Error("Email veya şifre hatalı!");
      }

      // Giriş yapan kullanıcıyı kaydet
      this.currentUser = user;

      return { success: true, user, message: "Giriş başarılı!" };
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı çıkışı
  logout() {
    try {
      this.currentUser = null;
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  // Mevcut kullanıcıyı al
  getCurrentUser() {
    return this.currentUser;
  }

  // Tüm kullanıcıları al
  getUsers() {
    return this.users;
  }

  // Kullanıcının giriş yapıp yapmadığını kontrol et
  isLoggedIn() {
    return !!this.currentUser;
  }
}

export default new AuthService();
