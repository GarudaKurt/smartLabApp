import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable, Picker } from 'react-native-web';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const Signup = ({navigation}) => {
  const [userID, setuserID] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState(''); // State to hold selected user type

  const handleSignup = () => {
    // Perform signup logic here
    console.log('User ID:', userID);
    console.log('Password:', password);
    console.log('User Type:', userType);
  };

  const handleLogin = () => {
    navigation.replace('Login')
  }

  return (
    <View style={styles.formContainer}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Smart Lab App</Text>

        <TextInput
          style={styles.input} 
          placeholder='UserID'
          value={userID} 
          onChangeText={(userID) => { setuserID(userID) }}
        />

        <TextInput 
          style={styles.input} 
          placeholder='Password'
          value={password} 
          onChangeText={(password) => { setPassword(password) }} 
          secureTextEntry={true}
        />
        
        <Picker
          selectedValue={userType}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => setUserType(itemValue)}
        >
          <Picker.Item label="Select User Type" value="" />
          <Picker.Item label="Instructor" value="Instructor" />
          <Picker.Item label="Student" value="Student" />
          <Picker.Item label="Lab Supervisor" value="Lab Supervisor" />
        </Picker>

        <Pressable style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
        
        <Pressable style={styles.buttonLogin} onPress={handleLogin} >
          <Text style={styles.footerText}>Go back to Login?</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    backgroundColor: '#f5f6fa',
    borderRadius: 10,
    padding: 20
  },
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20
  },
  input: {
    height: 40,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderRadius: 3
  },
  picker: {
    height: 40,
    marginVertical: 5,
    borderWidth: 1,
    borderRadius: 3,
    width: '15%'
  },
  button: {
    width: '20%',
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginTop: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  footer: {
    fontSize: 15,
    marginTop: 10,
    textAlign: 'center'
  },
  buttonLogin: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 5,
    alignItems: 'center',
  },
  footerText: {
    marginTop: 5,
    color: '#189AB4'
  }
});

export default Signup;
