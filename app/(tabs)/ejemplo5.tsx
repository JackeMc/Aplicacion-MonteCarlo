import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet, Alert } from "react-native";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";

const RouteOptimizationMonteCarlo = () => {
  const [puntos, setPuntos] = useState(""); // Ejemplo: "Casa,Farmacia,Escuela"
  const [numRutas, setNumRutas] = useState(""); // Cantidad de rutas a generar
  const [mejorRuta, setMejorRuta] = useState(null); // Resultado de la mejor ruta
  const [rutasGeneradas, setRutasGeneradas] = useState([]); // Todas las rutas generadas
  const router = useRouter();

  const calcularRutas = () => {
    try {
      if (!puntos) {
        Alert.alert("Error", "Por favor, ingresa los puntos.");
        return;
      }
      if (!numRutas || isNaN(numRutas) || parseInt(numRutas) <= 0) {
        Alert.alert("Error", "Por favor, ingresa un número válido de rutas a generar.");
        return;
      }

      const puntosArray = puntos.split(",").map((p) => p.trim()); // Dividir puntos por comas
      const matriz = generarMatrizAleatoria(puntosArray.length);
      const totalRutas = parseInt(numRutas);

      let mejorRutaLocal = null;
      let menorCosto = Infinity;
      const rutasLocales = [];

      // Generar múltiples rutas
      for (let i = 0; i < totalRutas; i++) {
        const rutaAleatoria = [...puntosArray].sort(() => Math.random() - 0.5); // Ruta aleatoria
        let costoTotal = 0;

        // Calcular costo de la ruta
        for (let j = 0; j < rutaAleatoria.length - 1; j++) {
          const desde = puntosArray.indexOf(rutaAleatoria[j]);
          const hasta = puntosArray.indexOf(rutaAleatoria[j + 1]);
          costoTotal += matriz[desde][hasta];
        }

        // Cerrar el ciclo (último punto al primero)
        const inicio = puntosArray.indexOf(rutaAleatoria[0]);
        const fin = puntosArray.indexOf(rutaAleatoria[rutaAleatoria.length - 1]);
        costoTotal += matriz[fin][inicio];

        // Guardar la ruta generada
        rutasLocales.push({ ruta: rutaAleatoria, costo: costoTotal });

        // Actualizar mejor ruta si aplica
        if (costoTotal < menorCosto) {
          menorCosto = costoTotal;
          mejorRutaLocal = { ruta: rutaAleatoria, costo: costoTotal };
        }
      }

      setRutasGeneradas(rutasLocales);
      setMejorRuta(mejorRutaLocal); // Mostrar mejor ruta
    } catch (error) {
      Alert.alert("Error", "Ocurrió un problema al procesar los datos.");
    }
  };

  // Generar matriz de distancias aleatorias
  const generarMatrizAleatoria = (size) => {
    const matriz = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => Math.floor(Math.random() * 50) + 1)
    );
    for (let i = 0; i < size; i++) matriz[i][i] = 0; // Distancia de un punto a sí mismo es 0
    return matriz;
  };

  return (
    <View style={styles.container}>
      {/* Botón de regresar */}
      <TouchableOpacity onPress={() => router.push("/explore")} style={styles.backButton}>
        <Text style={styles.backText}>Atrás</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Optimización de Rutas</Text>

      {/* Entrada de puntos */}
      <TextInput
        style={styles.input}
        placeholder="Ingresa los puntos separados por comas (ej. Casa,Farmacia,Escuela)"
        value={puntos}
        onChangeText={setPuntos}
      />
      
      {/* Entrada del número de rutas */}
      <TextInput
        style={styles.input}
        placeholder="¿Cuántas rutas quieres generar?"
        value={numRutas}
        keyboardType="numeric"
        onChangeText={setNumRutas}
      />

      {/* Botón para calcular */}
      <TouchableOpacity style={styles.button} onPress={calcularRutas}>
        <Text style={styles.buttonText}>Generar Rutas</Text>
      </TouchableOpacity>

      {/* Mostrar mejor ruta */}
      {mejorRuta && (
        <Animatable.View animation="fadeInDown" duration={800} style={styles.resultContainer}>
          <Text style={styles.resultTitle}>🏆 Mejor Ruta Encontrada</Text>
          <Text style={styles.resultText}>
            Ruta: {mejorRuta.ruta.join(" ➡️ ")}
          </Text>
          <Text style={styles.resultText}>
            Costo Total: {mejorRuta.costo.toFixed(2)}
          </Text>
        </Animatable.View>
      )}

      {/* Mostrar todas las rutas generadas */}
      {rutasGeneradas.length > 0 && (
        <ScrollView style={styles.scrollContainer}>
          <Text style={styles.resultSubtitle}>📋 Rutas Contempladas</Text>
          {rutasGeneradas.map((ruta, index) => (
            <View key={index} style={styles.routeCard}>
              <Text style={styles.routeText}>
                Ruta {index + 1}: {ruta.ruta.join(" ➡️ ")}
              </Text>
              <Text style={styles.routeCost}>Costo: {ruta.costo.toFixed(2)}</Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1e90ff',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 25,
    marginBottom: 15,
    fontSize: 16,
  },
  exampleText: {
    fontSize: 16,
    marginBottom: 10,
    color: "#666",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#1e90ff",
    padding: 15,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
    width: ""
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  resultContainer: {
    marginTop: 20,
    padding: 20,
    borderRadius: 8,
    backgroundColor: "#e3f2fd",
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
    textAlign: "center",
  },
  resultText: {
    fontSize: 16,
    marginBottom: 1,
    color: "#555",
    textAlign: "center",
  },
  scrollContainer: {
    marginTop: 20,
  },
  resultSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  routeCard: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 25,
  },
  routeText: {
    fontSize: 16,
    color: "#555",
  },
  routeCost: {
    fontSize: 14,
    color: "#888",
  },
});

export default RouteOptimizationMonteCarlo;