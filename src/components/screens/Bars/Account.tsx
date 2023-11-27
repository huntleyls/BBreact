import React from 'react';
import {View, Button} from 'react-native';
import {useAuth} from '../../common/hooks/useAuth';

const AccountScreen = () => {
  const {signOutUser} = useAuth();

  return (
    <View>
      {/* Other account-related content */}
      <Button title="Sign Out" onPress={signOutUser} />
    </View>
  );
};

export default AccountScreen;
