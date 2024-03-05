import React from 'react';
import {useAuth} from '../components/common/hooks/useAuth';
import UserStack from './userStack';

import AuthStack from './authStack';
import BarStack from './barStack';
import BouncerStack from './bouncerStack';

export default function RootNavigation() {
  const {userType} = useAuth();

  if (userType === 'bar') {
    return <BarStack />;
  } else if (userType === 'customer') {
    return <UserStack />;
  } else if (userType === 'bouncer') {
    return <BouncerStack />;
  } else {
    return <AuthStack />;
  }
}
