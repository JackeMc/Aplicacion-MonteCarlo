import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const PrediccionClimaMonteCarlo = () => {
  const router = useRouter();

  // Estados para los parámetros de la simulación
  const [probabilidadLluvia, setProbabilidadLluvia] = useState<string>(""); // Inicialmente vacío
  const [diasPrediccion, setDiasPrediccion] = useState<string>(""); // Inicialmente vacío
  const [simulaciones, setSimulaciones] = useState<string>(""); // Inicialmente vacío
  const [resultados, setResultados] = useState<number[]>([]); // Almacena los resultados de las simulaciones

  // Validar que los valores de entrada sean correctos
  const validarDecimal = (texto: string) => {
    return texto.match(/^\d*\.?\d*$/); // Acepta números decimales, enteros y vacío
  };

  const handleInputChange = (setter: React.Dispatch<React.SetStateAction<string>>) => (text: string) => {
    if (validarDecimal(text)) {
      setter(text);
    }
  };

  // Función para simular el clima
  const calcularLluvia = () => {
    // Convertir valores de string a números
    const probabilidad = parseFloat(probabilidadLluvia);
    const dias = parseInt(diasPrediccion, 10);
    const numSimulaciones = parseInt(simulaciones, 10);

    if (isNaN(probabilidad) || isNaN(dias) || isNaN(numSimulaciones)) {
      alert("Por favor, introduce valores válidos en todos los campos.");
      return;
    }

    let simulacionesLluvia = [];

    // Realizar las simulaciones
    for (let i = 0; i < numSimulaciones; i++) {
      let diasConLluvia = 0;

      // Simular los días de lluvia en el período
      for (let j = 0; j < dias; j++) {
        if (Math.random() < probabilidad) {
          diasConLluvia++;
        }
      }

      // Almacenar el resultado de la simulación
      simulacionesLluvia.push(diasConLluvia);
    }

    setResultados(simulacionesLluvia); // Actualizar resultados con las simulaciones
  };

  // Función para generar la visualización con emojis
  const generarVisualizacion = () => {
    return resultados.map((diasConLluvia, index) => {
      const diasLluviaEmoji = "🌧️".repeat(diasConLluvia); // Emojis de lluvia
      const diasSolEmoji = "☀️".repeat(parseInt(diasPrediccion, 10) - diasConLluvia); // Emojis de sol

      return (
        <Text key={index} style={styles.simulacionText}>
          Simulación {index + 1}: {diasLluviaEmoji}{diasSolEmoji}
        </Text>
      );
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/explore')} style={styles.backButton}>
        <Text style={styles.backText}>Atrás</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Simulación MonteCarlo - Predicción de Lluvia</Text>

      {/* Entradas del usuario */}
      <TextInput
        style={styles.input}
        placeholder="Probabilidad de lluvia diaria (0 a 1)"
        keyboardType="decimal-pad"
        value={probabilidadLluvia}
        onChangeText={handleInputChange(setProbabilidadLluvia)}
      />
      <TextInput
        style={styles.input}
        placeholder="Días de predicción (Ej: 30)"
        keyboardType="numeric"
        value={diasPrediccion}
        onChangeText={handleInputChange(setDiasPrediccion)}
      />
      <TextInput
        style={styles.input}
        placeholder="Número de simulaciones (Ej: 1000)"
        keyboardType="numeric"
        value={simulaciones}
        onChangeText={handleInputChange(setSimulaciones)}
      />

      {/* Botón para iniciar simulación */}
      <TouchableOpacity onPress={calcularLluvia} style={styles.calculateButton}>
        <Text style={styles.calculateButtonText}>Iniciar Simulación</Text>
      </TouchableOpacity>

      {/* Mostrar los resultados como Emojis */}
      {resultados.length > 0 && (
        <View style={styles.resultContainer}>
          <Text style={styles.resultText}>
            Promedio de días con lluvia: {(
              resultados.reduce((sum, value) => sum + value, 0) / resultados.length
            ).toFixed(2)}
          </Text>
          <ScrollView style={styles.resultadosContainer}>
            {generarVisualizacion()}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

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
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 25,
    marginBottom: 15,
    paddingLeft: 10,
    fontSize: 16,
  },
  calculateButton: {
    backgroundColor: '#1e90ff',
    padding: 15,
    marginBottom: 5,
    borderRadius: 25,
    alignItems: 'center',
  },
  calculateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 30,
    alignItems: 'center',
  },
  resultText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
  },
  resultadosContainer: {
    width: '100%',
    paddingHorizontal: 10,
  },
  simulacionText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
});

export default PrediccionClimaMonteCarlo;
