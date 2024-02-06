// SmallBannerAd.tsx

import React from 'react';
import {View, StyleSheet} from 'react-native';
import {BannerAd, BannerAdSize, TestIds} from 'react-native-google-mobile-ads';

const SmallBannerAd3: React.FC = () => {
  // Replace with your own ad unit ID for production
  const adUnitId = __DEV__
    ? TestIds.BANNER
    : 'ca-app-pub-4769036634090806/7146133283';

  return (
    <View style={styles.container}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
        onAdLoaded={() => console.log('Ad Loaded')}
        onAdFailedToLoad={error => console.error('Ad failed to load: ', error)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SmallBannerAd3;
