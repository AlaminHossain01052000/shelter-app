import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';

const FingerprintAuth = ({ onFingerprintSuccess }) => {
  const [isSensorAvailable, setIsSensorAvailable] = useState(false);

  useEffect(() => {
    checkDeviceForHardware();
  }, []);

  const checkDeviceForHardware = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    setIsSensorAvailable(compatible);
  };

  const handleAuthenticate = async () => {
    if (isSensorAvailable) {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate with your fingerprint',
      });

      if (result.success) {
        onFingerprintSuccess();
      }
    }
  };

  return (
    <View>
      {isSensorAvailable ? (
        <TouchableOpacity onPress={handleAuthenticate}>
          <Text>Authenticate with Fingerprint</Text>
        </TouchableOpacity>
      ) : (
        <Text>Fingerprint not available on this device</Text>
      )}
    </View>
  );
};

export default FingerprintAuth;
