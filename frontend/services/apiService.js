// Backend API servisi
const API_BASE_URL = "https://bootcamp-grup71-production.up.railway.app/api/v1";

class ApiService {
  // Kullanıcı kaydı
  async register(userData) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: userData.fullName,
          email: userData.email,
          password: userData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Hata mesajını daha detaylı kontrol et
        let errorMessage = "Kayıt işlemi başarısız";

        if (data.detail) {
          if (typeof data.detail === "string") {
            errorMessage = data.detail;
          } else if (Array.isArray(data.detail)) {
            errorMessage = data.detail
              .map((err) => err.msg || err.message)
              .join(", ");
          } else if (typeof data.detail === "object") {
            errorMessage =
              data.detail.message ||
              data.detail.msg ||
              JSON.stringify(data.detail);
          }
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        }

        throw new Error(errorMessage);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı girişi
  async login(email, password) {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Hata mesajını daha detaylı kontrol et
        let errorMessage = "Giriş işlemi başarısız";

        if (data.detail) {
          if (typeof data.detail === "string") {
            errorMessage = data.detail;
          } else if (Array.isArray(data.detail)) {
            errorMessage = data.detail
              .map((err) => err.msg || err.message)
              .join(", ");
          } else if (typeof data.detail === "object") {
            errorMessage =
              data.detail.message ||
              data.detail.msg ||
              JSON.stringify(data.detail);
          }
        } else if (data.message) {
          errorMessage = data.message;
        } else if (data.error) {
          errorMessage = data.error;
        }

        throw new Error(errorMessage);
      }

      // Token'ı localStorage'a kaydet
      if (data.access_token) {
        localStorage.setItem("token", data.access_token);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcı çıkışı
  async logout() {
    try {
      const token = localStorage.getItem("token");

      if (token) {
        await fetch(`${API_BASE_URL}/auth/logout`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      }

      localStorage.removeItem("token");
      return { success: true };
    } catch (error) {
      localStorage.removeItem("token");
      throw error;
    }
  }

  // Mevcut kullanıcı bilgilerini al
  async getCurrentUser() {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        return null;
      }

      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        localStorage.removeItem("token");
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      localStorage.removeItem("token");
      return null;
    }
  }

  // Kursları getir
  async getCourses() {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_BASE_URL}/courses/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Kurslar yüklenemedi");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Kullanıcının giriş yapıp yapmadığını kontrol et
  async isLoggedIn() {
    const user = await this.getCurrentUser();
    return !!user;
  }
}

export default new ApiService();
