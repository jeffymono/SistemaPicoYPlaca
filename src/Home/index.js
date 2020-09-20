import React, { useCallback, useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from '@expo/vector-icons'; 

const MESES = {
  enero: { position: 0, value: 1 },
  febrero: { position: 1, value: 2 },
  marzo: { position: 2, value: 3 },
  abril: { position: 3, value: 4 },
  mayo: { position: 4, value: 5 },
  junio: { position: 5, value: 6 },
  julio: { position: 6, value: 7 },
  agosto: { position: 7, value: 8 },
  septiembre: { position: 8, value: 9 },
  octubre: { position: 9, value: 10 },
  noviembre: { position: 10, value: 11 },
  diciembre: { position: 11, value: 12 },
};

export default function Home({dataScan=null}={}) {
  
  const [placa, setPlaca] = useState("");
  const [showError, setShowError] = useState(false);


  const handleOnChange = (text) => {
    setPlaca(text);
  };
  const placaParaUsar = dataScan ? dataScan : placa

  useEffect(()=>{
  if(placaParaUsar.trim() !== ""){
      setShowError(false);
    }
  },[placaParaUsar,setShowError])

  const handleOnPress = useCallback(() => {

    const date = new Date();
    const arregloMeses = Object.values(MESES);
    const mes = arregloMeses[date.getMonth()].value;
    const message1 = "Circula los días: Lunes, Miércoles, Viernes y Domingo";
    const message2 = "Circula los días: Martes, Jueves, Sábado y Domingo";
    const placaValida =
    placaParaUsar.length === 6 ? placaParaUsar.length === 6 : placaParaUsar.length === 7;
    const ultimoDigito = parseInt(placaParaUsar.slice(6, 7))
      ? parseInt(placaParaUsar.slice(6, 7))
      : parseInt(placaParaUsar.slice(4, 5));
    const placaValidacionCarro = /^[A-Z]{3}[0-9]{4}$/;
    const placaValidacionMoto = /^[A-Z]{2}[0-9]{3}[A-Z]$/;

    if (placaParaUsar.trim() === "") {
      setShowError(true);
    }
    if (showError) {
      Alert.alert("Resultado", "Ingrese una placa");
    } else if(!showError) {
      if (
        placaValidacionCarro.test(placaParaUsar.toUpperCase()) ||
        placaValidacionMoto.test(placaParaUsar.toUpperCase())
      ) {
        if (mes % 2 === 0) {
          if (placaValida) {
            if (ultimoDigito % 2 === 0) {
              Alert.alert("Resultado", message1);
            } else if (ultimoDigito % 2 !== 0)
              Alert.alert("Resultado", message2);
          } else {
            Alert.alert("Resultado", "Placa inválida");
          }
        } else if (mes % 2 !== 0) {
          if (placaValida) {
            if (ultimoDigito % 2 === 0) {
              Alert.alert("Resultado", message2);
            } else if (ultimoDigito % 2 !== 0)
              Alert.alert("Resultado", message1);
          } else {
            Alert.alert("Resultado", "Placa inválida");
          }
        }
      } else {
        Alert.alert("Resultado", "Placa incorrecta");
      }
    }
  }, [setShowError, placaParaUsar]);

  useEffect(()=>{
    if(dataScan) handleOnPress()
  },[])
  const errorInput = showError ? "red" :"#fff"
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: 15
      }}
    >
      <Text style={{ color: "#fff" }}>Ingresar el placa</Text>
      <TextInput
        style={{
          backgroundColor: "#fff",
          maxWidth: "100%",
          height: 50,
          marginTop: 15,
          marginBottom: 0,
          borderRadius:5,
          borderWidth:2,
        borderColor:errorInput
        }}
        autoCapitalize='characters'
        maxLength={7}
        value={placa}
        onChangeText={handleOnChange}
        placeholder="Ingrese su placa ej. MNA0123"
      />
      {!showError && (
        <Text style={{ color: "#fff", marginBottom: 25 }}>
          Este campo es requerido
        </Text>
      )}
      {showError && (
        <Text style={{ color: "red", marginBottom: 25 }}>
          * Este campo es requerido
        </Text>
      )}
      <View style={{ backgroundColor: "#117FB9", marginBottom:12, borderRadius:5}}>
        <TouchableOpacity
          style={{
            display:"flex",
            flexDirection:"row",
            justifyContent:"center",
            alignItems: "center",
            backgroundColor: "#117FB9",
            padding: 0,
            borderRadius:5
          }}
          onPress={handleOnPress}
        >
          <Feather name="search" size={24} color="white" />
          <Text style={{ color: "#fff", marginBottom:15, marginTop:15 }}> BUSCAR </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: "#fff",
            width: 120,
          }}
        ></View>
        <Text
          style={{
            color: "#fff",
            alignSelf: "center",
            marginLeft: 15,
            marginRight: 15,
            marginTop: 25,
            marginBottom: 25,
          }}
        >
          Or
        </Text>
        <View
          style={{
            borderBottomWidth: 0.5,
            borderBottomColor: "#fff",
            width: 120,
          }}
        ></View>
      </View>
    </View>
  );
}
