import React, {useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {fcmService} from './FcmService/FCMService';
import {localNotificationService} from './FcmService/LocalNotificationService';
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const app = () => {
  useEffect(() => {
    fcmService.registerAppWithFCM();
    fcmService.register(onRegister, onNotification, onOpenNotification);
    localNotificationService.configure(onOpenNotification);
    localNotificationService.getchannelid();

    function onRegister(token) {
      // AsyncStorage.setItem('@NotificationToken', JSON.stringify(token));
      console.warn('[App] onRegister: ', token);
    }

    function onNotification(notify) {
      //   if(notify.title == 'sajib'){
      //     // navigation.navigate('ReserveAllRestaurant')
      //     alert('sajib')
      //   }
      console.log('[App] onNotification: ', notify);
      const options = {
        soundName: 'default',
        playSound: true, //,
        // largeIcon: 'ic_launcher', // add icon large for Android (Link: app/src/main/mipmap)
        // smallIcon: 'ic_launcher' // add icon small for Android (Link: app/src/main/mipmap)
      };
      localNotificationService.showNotification(
        0,
        notify.title,
        notify.body,
        notify,
        options,
      );
    }

    function onOpenNotification(notify) {
      console.log('[App] onOpenNotification: ', notify);
      if (notify.title == 'sajib') {
        alert('new notification');
      }
    }

    return () => {
      console.log('[App] unRegister');
      // getCurrentLocation()
      fcmService.unRegister();
      localNotificationService.unregister();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text>app</Text>
    </View>
  );
};

export default app;
