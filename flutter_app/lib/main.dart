import 'package:flutter/material.dart';
import 'package:resq_app/screens/auth/main_screen.dart';
import 'package:resq_app/screens/home/home_screen.dart';
import 'package:resq_app/utils/colors.dart';

void main() {
  runApp(const ResQApp());
}

class ResQApp extends StatelessWidget {
  const ResQApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'resQ',
      theme: ThemeData(
        primarySwatch: Colors.blue,
        fontFamily: 'Roboto',
        scaffoldBackgroundColor: AppColors.backgroundColor,
      ),
      home: const SignUpScreen1(), // Start with signup screen
      routes: {
        'screens/auth': (context) => const SignUpScreen1(),
        'screens/home': (context) => const HomeScreen(),
      },
      debugShowCheckedModeBanner: false,
    );
  }
}
