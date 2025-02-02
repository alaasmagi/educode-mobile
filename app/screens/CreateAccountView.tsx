import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Platform } from 'react-native';

const App = () => {
  const [uniId, setUniId] = useState('');
  const [studentCode, setStudentCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignUp = () => {
    console.log('Signing up with:', uniId, studentCode, password);
  };

  const handleLoginPress = () => {
    // Handle login navigation
    console.log('Navigating to login screen');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.content}>
        <Image source={require('../assets/logos/main-logo.png')} style={styles.logo} />

        <Text style={styles.title}>Welcome to EduCode!</Text>

        <TextInput
          style={styles.input}
          placeholder="Uni-ID"
          onChangeText={setUniId}
          value={uniId}
        />
        <TextInput
          style={styles.input}
          placeholder="Student code"
          onChangeText={setStudentCode}
          value={studentCode}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={setPassword}
          value={password}
          secureTextEntry
        />
        <TextInput
          style={styles.input}
          placeholder="Password again"
          onChangeText={setConfirmPassword}
          value={confirmPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLoginPress}>
          <Text style={styles.loginLink}>Already have an account? Log in!</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#282c34', // Dark background color
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: '80%',
    maxWidth: 400, // Set a maximum width for larger screens
    backgroundColor: '#383e4b', // Slightly lighter background for the content area
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  logo: {
    width: 150, // Adjust size as needed
    height: 50,  // Adjust size as needed
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#484f60', // Even lighter background for inputs
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
    color: 'white', // Text color for better visibility
  },
  button: {
    width: '100%',
    backgroundColor: '#61dafb', // React Native's default blue
    borderRadius: 4,
    padding: 12,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  loginLink: {
    color: '#61dafb',
    marginTop: 10,
  },
});

export default App;