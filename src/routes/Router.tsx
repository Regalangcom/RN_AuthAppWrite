import React, {useContext, useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';

import {AppWriteContext} from '../appWrite/appWriteContex';
import Loading from '../components/Loading';

// Routes
import {AppStack} from './AppStack';
import {AuthStack} from './AuthStack';

export const Router = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {isLoggedIn, appWrite, setIsLoggedIn} = useContext(AppWriteContext);

  useEffect(() => {
    appWrite
      .GetCurrentUsers()
      .then(response => {
        setIsLoggedIn(false);
        if (response) {
          setIsLoggedIn(true);
        }
        setIsLoading(false);
      })
      .catch(_ => {
        setIsLoading(false);
        setIsLoggedIn(false);
      });
  }, [appWrite, setIsLoggedIn]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};
