import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  // Change this to your FastAPI server URL
  static const String baseUrl = 'http://localhost:8000/api';

  // For Android emulator, use: 'http://10.0.2.2:8000/api'
  // For real device, use your computer's IP: 'http://192.168.1.XX:8000/api'

  static const Map<String, String> headers = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };

  // Authentication endpoints
  static Future<Map<String, dynamic>> register({
    required String email,
    required String password,
    required String fullName,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/register'),
        headers: headers,
        body: jsonEncode({
          'email': email,
          'password': password,
          'full_name': fullName,
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        return {
          'success': true,
          'data': jsonDecode(response.body),
        };
      } else {
        return {
          'success': false,
          'error': jsonDecode(response.body)['detail'] ?? 'Registration failed',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Network error: ${e.toString()}',
      };
    }
  }

  static Future<Map<String, dynamic>> login({
    required String email,
    required String password,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/auth/login'),
        headers: headers,
        body: jsonEncode({
          'email': email,
          'password': password,
        }),
      );

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': jsonDecode(response.body),
        };
      } else {
        return {
          'success': false,
          'error': jsonDecode(response.body)['detail'] ?? 'Login failed',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Network error: ${e.toString()}',
      };
    }
  }

  // Course endpoints
  static Future<Map<String, dynamic>> getCourses() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/courses'),
        headers: headers,
      );

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': jsonDecode(response.body),
        };
      } else {
        return {
          'success': false,
          'error': 'Failed to load courses',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Network error: ${e.toString()}',
      };
    }
  }

  static Future<Map<String, dynamic>> getCourse(String courseId) async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/courses/$courseId'),
        headers: headers,
      );

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': jsonDecode(response.body),
        };
      } else {
        return {
          'success': false,
          'error': 'Failed to load course',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Network error: ${e.toString()}',
      };
    }
  }

  // User progress endpoints
  static Future<Map<String, dynamic>> getUserProgress() async {
    try {
      final response = await http.get(
        Uri.parse('$baseUrl/users/progress'),
        headers: headers,
      );

      if (response.statusCode == 200) {
        return {
          'success': true,
          'data': jsonDecode(response.body),
        };
      } else {
        return {
          'success': false,
          'error': 'Failed to load user progress',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Network error: ${e.toString()}',
      };
    }
  }

  static Future<Map<String, dynamic>> updateProgress({
    required String courseId,
    required String lessonId,
    required double progress,
  }) async {
    try {
      final response = await http.post(
        Uri.parse('$baseUrl/progress'),
        headers: headers,
        body: jsonEncode({
          'course_id': courseId,
          'lesson_id': lessonId,
          'progress': progress,
        }),
      );

      if (response.statusCode == 200 || response.statusCode == 201) {
        return {
          'success': true,
          'data': jsonDecode(response.body),
        };
      } else {
        return {
          'success': false,
          'error': 'Failed to update progress',
        };
      }
    } catch (e) {
      return {
        'success': false,
        'error': 'Network error: ${e.toString()}',
      };
    }
  }
}
