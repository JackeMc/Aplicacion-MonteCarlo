// app/ejemplo1.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

const AgujaDeBuffon = () => {
    const [longitudAguja, setLongitudAguja] = useState('');
    const [distanciaLineas, setDistanciaLineas] = useState('');
    const [numLanzamientos, setNumLanzamientos] = useState('');
    const [estimacionPi, setEstimacionPi] = useState<number | null>(null);
    const [numCruces, setNumCruces] = useState(0);
    const [error, setError] = useState('');

    const router = useRouter();

    const calcularPi = () => {
        const L = parseFloat(longitudAguja);
        const D = parseFloat(distanciaLineas);
        const N = parseInt(numLanzamientos);

        if (isNaN(L) || isNaN(D) || isNaN(N) || L <= 0 || D <= 0 || N <= 0) {
            setError('Por favor, ingresa valores válidos para todos los campos.');
            return;
        }

        let cruces = 0;

        // Simulación de lanzamientos de la aguja
        for (let i = 0; i < N; i++) {
            const angulo = Math.random() * Math.PI; // Ángulo aleatorio entre 0 y π
            const distanciaCentro = Math.random() * (D / 2); // Distancia desde el centro de la línea

            if (distanciaCentro <= (L / 2) * Math.sin(angulo)) {
                cruces++;
            }
        }

        setNumCruces(cruces);

        // Estimación de pi
        const estimacion = (2 * L * N) / (D * cruces);
        setEstimacionPi(estimacion);
        setError('');
    };

    return (
        <View style={styles.container}>
            {/* Botón para regresar */}
            <TouchableOpacity onPress={() => router.push('/explore')} style={styles.backButton}>
                <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Aguja de Buffon</Text>

            {/* Entradas para los parámetros */}
            <TextInput
                style={styles.input}
                placeholder="Longitud de la aguja (L)"
                keyboardType="numeric"
                value={longitudAguja}
                onChangeText={setLongitudAguja}
            />
            <TextInput
                style={styles.input}
                placeholder="Distancia entre líneas (D)"
                keyboardType="numeric"
                value={distanciaLineas}
                onChangeText={setDistanciaLineas}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de lanzamientos"
                keyboardType="numeric"
                value={numLanzamientos}
                onChangeText={setNumLanzamientos}
            />

            {/* Botón para calcular */}
            <TouchableOpacity onPress={calcularPi} style={styles.calculateButton}>
                <Text style={styles.calculateButtonText}>Calcular</Text>
            </TouchableOpacity>

            {/* Resultado */}
            {estimacionPi && (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultText}>
                        Estimación de Pi: {estimacionPi.toFixed(4)}
                    </Text>
                    <Text style={styles.resultText}>Número de cruces: {numCruces}</Text>
                </View>
            )}

            {/* Error */}
            {error && <Text style={styles.errorText}>{error}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 40,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: '#fff',
    },
    backButton: {
        marginBottom: 20,
    },
    backText: {
        fontSize: 18,
        color: '#1e90ff',
        fontWeight: 'bold',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
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
        borderRadius: 25,
        alignItems: 'center',
    },
    calculateButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 8,
        backgroundColor: "#e3f2fd",
        width: "95%",
        alignSelf: "center",
    },
    resultText: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
});

export default AgujaDeBuffon;
