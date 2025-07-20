class Course {
  final String id;
  final String title;
  final String description;
  final String imageUrl;
  final String category;
  final int totalLessons;
  final int completedLessons;
  final double progress;
  final List<Lesson> lessons;
  final DateTime createdAt;
  final DateTime updatedAt;

  Course({
    required this.id,
    required this.title,
    required this.description,
    required this.imageUrl,
    required this.category,
    required this.totalLessons,
    this.completedLessons = 0,
    this.progress = 0.0,
    this.lessons = const [],
    required this.createdAt,
    required this.updatedAt,
  });

  factory Course.fromJson(Map<String, dynamic> json) {
    return Course(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      imageUrl: json['image_url'] ?? '',
      category: json['category'] ?? '',
      totalLessons: json['total_lessons'] ?? 0,
      completedLessons: json['completed_lessons'] ?? 0,
      progress: (json['progress'] ?? 0.0).toDouble(),
      lessons: (json['lessons'] as List<dynamic>?)
              ?.map((lesson) => Lesson.fromJson(lesson))
              .toList() ??
          [],
      createdAt: DateTime.parse(
          json['created_at'] ?? DateTime.now().toIso8601String()),
      updatedAt: DateTime.parse(
          json['updated_at'] ?? DateTime.now().toIso8601String()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'image_url': imageUrl,
      'category': category,
      'total_lessons': totalLessons,
      'completed_lessons': completedLessons,
      'progress': progress,
      'lessons': lessons.map((lesson) => lesson.toJson()).toList(),
      'created_at': createdAt.toIso8601String(),
      'updated_at': updatedAt.toIso8601String(),
    };
  }

  Course copyWith({
    String? id,
    String? title,
    String? description,
    String? imageUrl,
    String? category,
    int? totalLessons,
    int? completedLessons,
    double? progress,
    List<Lesson>? lessons,
    DateTime? createdAt,
    DateTime? updatedAt,
  }) {
    return Course(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      imageUrl: imageUrl ?? this.imageUrl,
      category: category ?? this.category,
      totalLessons: totalLessons ?? this.totalLessons,
      completedLessons: completedLessons ?? this.completedLessons,
      progress: progress ?? this.progress,
      lessons: lessons ?? this.lessons,
      createdAt: createdAt ?? this.createdAt,
      updatedAt: updatedAt ?? this.updatedAt,
    );
  }

  bool get isCompleted => completedLessons >= totalLessons;
  String get progressText => '${completedLessons}/${totalLessons} tamamlandı';
}

class Lesson {
  final String id;
  final String title;
  final String description;
  final String content;
  final String videoUrl;
  final int order;
  final int duration; // in minutes
  final bool isCompleted;
  final DateTime createdAt;

  Lesson({
    required this.id,
    required this.title,
    required this.description,
    required this.content,
    required this.videoUrl,
    required this.order,
    required this.duration,
    this.isCompleted = false,
    required this.createdAt,
  });

  factory Lesson.fromJson(Map<String, dynamic> json) {
    return Lesson(
      id: json['id'] ?? '',
      title: json['title'] ?? '',
      description: json['description'] ?? '',
      content: json['content'] ?? '',
      videoUrl: json['video_url'] ?? '',
      order: json['order'] ?? 0,
      duration: json['duration'] ?? 0,
      isCompleted: json['is_completed'] ?? false,
      createdAt: DateTime.parse(
          json['created_at'] ?? DateTime.now().toIso8601String()),
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'title': title,
      'description': description,
      'content': content,
      'video_url': videoUrl,
      'order': order,
      'duration': duration,
      'is_completed': isCompleted,
      'created_at': createdAt.toIso8601String(),
    };
  }

  Lesson copyWith({
    String? id,
    String? title,
    String? description,
    String? content,
    String? videoUrl,
    int? order,
    int? duration,
    bool? isCompleted,
    DateTime? createdAt,
  }) {
    return Lesson(
      id: id ?? this.id,
      title: title ?? this.title,
      description: description ?? this.description,
      content: content ?? this.content,
      videoUrl: videoUrl ?? this.videoUrl,
      order: order ?? this.order,
      duration: duration ?? this.duration,
      isCompleted: isCompleted ?? this.isCompleted,
      createdAt: createdAt ?? this.createdAt,
    );
  }

  String get durationText => '${duration} dk';
}
