import React, {useState} from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Pressable } from 'react-native-web';
import { db } from './firebaseConfig';
import {collection, doc, DocumentSnapshot, getDoc, getDocs, query, where } from 'firebase/firestore';
import Signup from './Signup';


const LoginPage = () => {
    
    const[userID, setuserID] = useState('')
    const[password, setPassword] = useState('')

    const RetrieveData = async () => {
      console.log('Hello');
      try {
          const querySnapshot = await getDocs(collection(db, "users"));
          let userExists = false;
          querySnapshot.forEach(doc => {
              const userData = doc.data();
              console.log("Retrieved user data:", userData); // Log the retrieved user data
              if (parseInt(userData.userID) === parseInt(userID) && userData.password === password) {
                  userExists = true;
                  console.log("User found:", userData);
              }
          });
          if (!userExists) {
              console.log("User does not exist");
          }
      } catch (error) {
          console.log("Error getting documents: ", error);
      }
  }

  return (
    <View style={styles.formContainer}>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Smart Lab App</Text>

        <TextInput
         style={styles.input} placeholder='UserID'
         value={userID} onChangeText={(userID) => {setuserID(userID)}}/>

        <TextInput style={styles.input} placeholder='Password'
         value={password} onChangeText={(password) => {setPassword(password)}} secureTextEntry={true}/>

        <Pressable style={styles.button} onPress={RetrieveData}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>

        <Text style={styles.footer}> Don't have an account yet?</Text>
        <Pressable style={styles.buttonCreate} onPress={Signup}>
          //I want to invoked another ui form if this button press 
          <Text style={styles.footerCreate}>Create one</Text>
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
  button: {
    width: '100%',
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
  buttonCreate: {
    width: '100%',
    backgroundColor: 'transparent',
    padding: 5,
    alignItems: 'center',
  },
  footerCreate: {
    color: '#189AB4'
  },
  buttonText: {
    color: 'white',
    alignItems: 'center'
  },

});

export default LoginPage;
