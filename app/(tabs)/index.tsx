// app/index.tsx
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

const HomeScreen = () => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => router.push('/montecarlo')}>
        <Image
          source={{ uri: 'https://cdn2.excelyvba.com/wp-content/uploads/2015/06/0-crear-un-gr%C3%A1fico-en-Excel.png' }}
          style={styles.image}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Simulacion MonteCarlo</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  text: {
    fontSize: 20,  // Tamaño de fuente ajustado a un tamaño mediano
    color: '#000', // Color de texto ajustado a un verde claro
    fontWeight: 'bold',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
  },
});

export default HomeScreen;