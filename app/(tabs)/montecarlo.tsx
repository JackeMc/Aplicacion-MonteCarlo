// app/montecarlo.tsx
import React from 'react';
import { View, Text, ScrollView, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const MontecarloScreen = () => {
    const router = useRouter();

    return (
        <View style={styles.container}>
            {/* Botón para regresar */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>

            {/* Imagen decorativa */}
            <Image
                source={{
                    uri: 'https://www.hubspot.com/hs-fs/hubfs/media/simulacionmontecarlo.jpeg?width=893&height=600&name=simulacionmontecarlo.jpeg',
                }} // Reemplaza con la URL de tu imagen
                style={styles.image}
                resizeMode="cover"
            />

            {/* Contenido con scroll */}
            <ScrollView contentContainerStyle={styles.content}>
                <Text style={styles.title}>¿Qué es simulación MonteCarlo?</Text>
                <Text style={styles.description}>
                    También conocida como el Método de Montecarlo o una simulación de probabilidad múltiple, 
                    la Simulación de Montecarlo es una técnica matemática que se utiliza para estimar los posibles 
                    resultados de un evento incierto. El Método de Montecarlo fue inventado por John von Neumann y 
                    Stanislaw Ulam durante la Segunda Guerra Mundial para mejorar la toma de decisiones en condiciones 
                    inciertas. Debe su nombre a una conocida ciudad casino, llamada Mónaco, ya que el elemento de azar es 
                    fundamental en el planteamiento del modelo, similar a un juego de ruleta.
                </Text>
                <Text style={styles.description}>
                    Desde su introducción, las simulaciones de Montecarlo han evaluado el impacto del riesgo en muchos escenarios 
                    de la vida real, como la inteligencia artificial, los precios de las acciones, la previsión de ventas, la gestión 
                    de proyectos y la fijación de precios. También proporcionan una serie de ventajas sobre los modelos predictivos 
                    con entradas fijas, como la capacidad de realizar análisis de sensibilidad o calcular la correlación de las entradas. 
                    El análisis de sensibilidad permite a los responsables de la toma de decisiones ver el impacto de cada variable en un 
                    resultado determinado, y la correlación les permite comprender las relaciones entre las variables de entrada.
                </Text>
            </ScrollView>

            {/* Botón para ir a la pantalla explore */}
            <TouchableOpacity onPress={() => router.push('/explore')} style={styles.exploreButton}>
                <Icon name="compass" size={20} color="#fff" />
                <Text style={styles.exploreText}>Ir a Simulaciones</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backButton: {
        flexDirection: 'row',
        alignItems: 'center',
        position: 'absolute',
        top: 40,
        left: 20,
        zIndex: 1,
    },
    backText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1e90ff',
        marginLeft: 10,
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 20,
    },
    content: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#555',
        lineHeight: 24,
        marginBottom: 10,
    },
    exploreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#1e90ff',
        padding: 15,
        borderRadius: 25,
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5, // Para Android
    },
    exploreText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
    },
});

export default MontecarloScreen;