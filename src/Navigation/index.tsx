import React from 'react';
import {useAuth} from '../components/common/hooks/useAuth';
import UserStack from './userStack';
import AuthStack from './authStack';
import BarStack from './barStack';

export default function RootNavigation() {
  const {userType} = useAuth();

  if (userType === 'bar') {
    return <BarStack />;
  } else if (userType === 'customer') {
    return <UserStack />;
  } else {
    return <AuthStack />;
  }
}
