import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
// react native element
import {FAB} from '@rneui/themed';
// Snackbar
import Snackbar from 'react-native-snackbar';

// Context API
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppWriteContext} from '../appWrite/appWriteContex';
import {AuthStackParamList} from '../routes/AuthStack';

type UserObj = {
  name: string;
  email: string;
  status: boolean;
};

type LogoutScreenProps = NativeStackScreenProps<AuthStackParamList, 'Home'>;
const Home = ({navigation}: LogoutScreenProps) => {
  const [userData, setuserData] = useState<UserObj>();
  const {appWrite, setIsLoggedIn} = useContext(AppWriteContext);

  const HandleLogout = () => {
    appWrite.Logout().then(() => {
      setIsLoggedIn(false);
      navigation.navigate('Login');
      Snackbar.show({
        text: 'Logout successfully',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };

  useEffect(() => {
    appWrite.GetCurrentUsers().then(response => {
      if (response) {
        setIsLoggedIn(true);
        const user: UserObj = {
          name: response.name,
          email: response.email,
          status: true,
        };
        setuserData(user);
      }
    });
  }, [appWrite, setIsLoggedIn]);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.welcomeContainer}>
        <Image
          source={require('../assets/guest.png')}
          style={styles.Images}
          // source={{
          //   width: 400,
          //   height: 300,
          //   cache: 'default',
          // }}
          resizeMode="contain"
        />
        <Text style={styles.message}>
          Hello Welcome
          <Text style={styles.NameUsers}> {userData?.name}</Text>
        </Text>
        {userData && (
          <View style={styles.userContainer}>
            <Text style={styles.userDetails}>Name: {userData.name}</Text>
            <Text style={styles.userDetails}>Email: {userData.email}</Text>
            <Text style={styles.userDetails}>
              Status: {JSON.stringify(userData.status)}
            </Text>
          </View>
        )}
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{color: '#FFFFFF'}}
        onPress={HandleLogout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  NameUsers: {
    color: 'black',
  },
  Images: {
    width: 100,
    height: 200,
    marginBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: '#00000',
  },
  welcomeContainer: {
    // padding: 12,
    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#1A4870',
  },
  userContainer: {
    marginTop: 20,
  },
  userDetails: {
    fontSize: 20,
    color: '#1A4870',
  },
});

export default Home;
