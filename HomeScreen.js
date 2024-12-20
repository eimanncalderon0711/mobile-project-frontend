import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import LogoutScreen from './LogoutScreen'; // New Support Screen for the tab
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Feather from '@expo/vector-icons/Feather';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  return (
    <Tab.Navigator >
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{tabBarStyle: {
        paddingTop: 10, 
        paddingBottom: 10, 
        height: 60, 
      },
        tabBarIcon: () => (
          <FontAwesome name="user-circle-o" size={24} color="#0064ab" /> // Change "person" to your desired icon
        ),
      }}
    />
    <Tab.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{tabBarStyle: {
        paddingTop: 10, 
        paddingBottom: 10, 
        height: 60, 
      },
        tabBarIcon: () => (
          <Feather name="settings" size={24} color="#0064ab" />
        ),
      }}
    />
    <Tab.Screen 
      name="Logout" 
      component={LogoutScreen}
      options={{tabBarStyle: {
        paddingTop: 10, 
        paddingBottom: 10, 
        height: 60, 
      },
        tabBarIcon: () => (
          <MaterialIcons name="support-agent" size={24} color="#0064ab" />
        ),
      }}
    />
  </Tab.Navigator>
  );
};

export default HomeScreen;
