import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function useCodeQr() {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [showScanner, setShowScanner] = useState(false)
  const [dataScan, setDataScan] = useState("")

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({  data }) => {
    setScanned(true);
    setDataScan(data)
    /* alert(`El codigo escaneado es: ${dataScan}`); */
    setShowScanner(false)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  const callScanner = ()=>{
    return <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
  }

  return {setShowScanner, setScanned, showScanner,callScanner,dataScan}
}