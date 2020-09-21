import React, { useCallback, useEffect, useState } from "react";
import { Text, View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

const MESES = {
  enero: { value: 1 },
  febrero: { value: 2 },
  marzo: { value: 3 },
  abril: { value: 4 },
  mayo: { value: 5 },
  junio: { value: 6 },
  julio: { value: 7 },
  agosto: { value: 8 },
  septiembre: { value: 9 },
  octubre: { value: 10 },
  noviembre: { value: 11 },
  diciembre: { value: 12 },
};

export default function Home({ dataScan }) {
  const [placa, setPlaca] = useState(dataScan ? dataScan : "");
  const [showError, setShowError] = useState(false);

  const handleOnChange = (text) => {
    setPlaca(text);
  };

  useEffect(() => {
    if (placa.trim() !== "") {
      setShowError(false);
    }
  }, [placa, setShowError]);

  const handleOnPress = useCallback(() => {
    const date = new Date();
    const arregloMeses = Object.values(MESES);
    const mes = arregloMeses[date.getMonth()];

    const message1 = "Circula los días: Lunes, Miércoles, Viernes y Domingo";
    const message2 = "Circula los días: Martes, Jueves, Sábado y Domingo";

    const placaValida =
      placa.length === 6 ? placa.length === 6 : placa.length === 7;

    const ultimoDigito = parseInt(placa.slice(6, 7))
      ? parseInt(placa.slice(6, 7))
      : parseInt(placa.slice(4, 5));

    const placaValidacionCarro = /^[A-Z]{3}[0-9]{4}$/;
    const placaValidacionMoto = /^[A-Z]{2}[0-9]{3}[A-Z]$/;

    if (placa.trim() === "") {
      setShowError(true);
      Alert.alert("Resultado", "Ingrese una placa");
    } else if (!showError) {
      if (
        placaValidacionCarro.test(placa.toUpperCase()) ||
        placaValidacionMoto.test(placa.toUpperCase())
      ) {
        if (mes % 2 === 0) {
          if (placaValida) {
            if (ultimoDigito % 2 === 0) {
              Alert.alert("Resultado", message1);
            } else if (ultimoDigito % 2 !== 0)
              Alert.alert("Resultado", message2);
          }
        } else if (mes % 2 !== 0) {
          if (placaValida) {
            if (ultimoDigito % 2 === 0) {
              Alert.alert("Resultado", message2);
            } else if (ultimoDigito % 2 !== 0)
              Alert.alert("Resultado", message1);
          }
        }
      }
    } else {
      Alert.alert("Resultado", "Placa incorrecta");
    }
  }, [setShowError, placa]);

  useEffect(() => {
    if (dataScan) {
      handleOnPress();
    }
  }, [dataScan]);

  const errorInput = showError ? "red" : "#fff";
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        width: "100%",
        padding: 15,
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
          borderRadius: 5,
          borderWidth: 2,
          borderColor: errorInput,
        }}
        autoCapitalize="characters"
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
      <View
        style={{
          backgroundColor: "#117FB9",
          marginBottom: 12,
          borderRadius: 5,
        }}
      >
        <TouchableOpacity
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#117FB9",
            padding: 0,
            borderRadius: 5,
          }}
          onPress={handleOnPress}
        >
          <Feather name="search" size={24} color="white" />
          <Text style={{ color: "#fff", marginBottom: 15, marginTop: 15 }}>
            {" "}
            BUSCAR{" "}
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
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
