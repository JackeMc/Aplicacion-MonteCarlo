// app/explore.tsx
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const ExploreScreen = () => {
  const router = useRouter();

  const handleButtonPress = (buttonName: string) => {
    // Redirigir a la pantalla correspondiente según el botón presionado
    const screenMap: { [key: string]: string } = {
      'Aguja de Buffon': '/ejemplo1',
      'Predicción de Lluvia': '/ejemplo2',
      'Cola de Supermercado': '/ejemplo3',
      'Área Bajo la Curva': '/ejemplo4',
      'Optimización de Rutas': '/ejemplo5',
      'Calificaciones Académicas': '/ejemplo6',
      'Inversiones': '/ejemplo7',
      'Consumo Energético': '/ejemplo8',
      'Riesgo Médico': '/ejemplo9',
      'Predicción de Stock': '/ejemplo10',
    };

    const route = screenMap[buttonName];

    if (route) {
      router.push(route); // Navegar a la ruta correspondiente
    } else {
      alert(`Pantalla para ${buttonName} no está implementada`);
    }
  };

  return (
    <View style={styles.container}>
      {/* Botón para regresar a la pantalla principal (index) */}
      <TouchableOpacity onPress={() => router.push('/')} style={styles.backButton}>
        <Text style={styles.backText}>Atrás</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={styles.title}>Simulaciones</Text>

      {/* Botones */}
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        {[
          'Aguja de Buffon',
          'Predicción de Lluvia', 
          'Cola de Supermercado',
          'Área Bajo la Curva',
          'Optimización de Rutas',
          'Calificaciones Académicas',
          'Inversiones',
          'Consumo Energético',
          'Riesgo Médico',
          'Predicción de Stock',
        ].map((name, index) => (
          <TouchableOpacity
            key={index}
            style={styles.button}
            onPress={() => handleButtonPress(name)}
          >
            <Icon name="comments" size={20} color="#fff" style={styles.buttonIcon} />
            <Text style={styles.buttonText}>{name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 65,
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
    textTransform: 'uppercase',
  },
  buttonContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#b3e0ff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 25,
    width: '90%',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ExploreScreen;