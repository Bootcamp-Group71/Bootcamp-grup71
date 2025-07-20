class User {
  final String id;
  final String email;
  final String fullName;
  final String? profileImage;
  final DateTime createdAt;
  final List<String> completedCourses;
  final int totalPoints;
  final List<Achievement> achievements;

  User({
    required this.id,
    required this.email,
    required this.fullName,
    this.profileImage,
    required this.createdAt,
    this.completedCourses = const [],
    this.totalPoints = 0,
    this.achievements = const [],
  });

  factory User.fromJson(Map<String, dynamic> json) {
    return User(
      id: json['id'] ?? '',
      email: json['email'] ?? '',
      fullName: json['full_name'] ?? '',
      profileImage: json['profile_image'],
      createdAt: DateTime.parse(
          json['created_at'] ?? DateTime.now().toIso8601String()),
      completedCourses: List<String>.from(json['completed_courses'] ?? []),
      totalPoints: json['total_points'] ?? 0,
      achievements: (json['achievements'] as List<dynamic>?)
              ?.map((achievement) => Achievement.fromJson(achievement))
              .toList() ??
          [],
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'email': email,
      'full_name': fullName,
      'profile_image': profileImage,
      'created_at': createdAt.toIso8601String(),
      'completed_courses': completedCourses,
      'total_points': totalPoints,
      'achievements':
          achievements.map((achievement) => achievement.toJson()).toList(),
    };
  }

  User copyWith({
    String? id,
    String? email,
    String? fullName,
    String? profileImage,
    DateTime? createdAt,
    List<String>? completedCourses,
    int? totalPoints,
    List<Achievement>? achievements,
  }) {
    return User(
      id: id ?? this.id,
      email: email ?? this.email,
      fullName: fullName ?? this.fullName,
      profileImage: profileImage ?? this.profileImage,
      createdAt: createdAt ?? this.createdAt,
      completedCourses: completedCourses ?? this.completedCourses,
      totalPoints: totalPoints ?? this.totalPoints,
      achievements: achievements ?? this.achievements,
    );
  }
}

class Achievement {
  final String id;
  final String title;
  final String description;
  final String iconUrl;
  final DateTime earnedAt;

  Achievement({
    required this.id,
    required this.title,
    required this.description,
    required this.iconUrl,
    required this.earnedAt,
  });

  factory Achievement.fromJson(Map<String, dynamic> json) {
    return Achievement(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      iconUrl: json['icon_url'] ?? '',
      earnedAt:
          DateTime.parse(json['earned_at'] ?? DateTime.now().toIso8601String()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'icon_url': iconUrl,
      'earned_at': earnedAt.toIso8601String(),
    };
  }
}
