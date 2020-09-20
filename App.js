import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image} from "react-native";
import useCodeQr from "./src/hooks/useCodeQr";
import Home from "./src/Home";
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

export default function App() {
  const { setShowScanner, setScanned, showScanner, callScanner, dataScan } = useCodeQr();

  return (
    <View style={styles.container}>

      <Image style={{display:"flex", position:"relative", marginTop:-100, resizeMode:'contain', maxWidth:"60%"}} source={require("./assets/CirculacionVehicular.png")}/>

      {showScanner && callScanner()}
      {!showScanner && (
        <View>
          <Home dataScan = {dataScan ? dataScan : null}/>
          <TouchableOpacity
            style={{
              display:"flex",
              flexDirection:"row",
              justifyContent:"center",
              alignItems: "center",
              backgroundColor: "#54A52B",
              marginRight: 15,
              marginLeft:15,
              borderRadius:5
            }}
            onPress={() => {
              setShowScanner(true);
              setScanned(false);
            }}
          >
            <MaterialCommunityIcons style={{margin:0, padding:0}} name="qrcode-scan" size={34} color="white" />
            <Text style={{display:"flex", color: "#fff", alignItems:"center", marginTop:15, marginBottom:15, padding:0 }}> SCANEAR CÓDIGO QR </Text>
          </TouchableOpacity>
        </View>
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
