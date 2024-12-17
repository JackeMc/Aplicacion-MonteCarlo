import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useRouter } from 'expo-router';

const SupermarketQueueSimulation = () => {
    const [clientes, setClientes] = useState('');
    const [tiempoPromedioLlegada, setTiempoPromedioLlegada] = useState('');
    const [tiempoPromedioServicio, setTiempoPromedioServicio] = useState('');
    const [simulaciones, setSimulaciones] = useState(''); // Nuevas simulaciones
    const [resultados, setResultados] = useState([]);
    const router = useRouter();

    // Función para calcular la simulación Monte Carlo
    const calcularSimulacion = () => {
        const resultadosSimulacion = [];

        // Realizar simulaciones múltiples
        for (let s = 0; s < Number(simulaciones); s++) {
            let tiempoActual = 0;
            const resultadosClientes = [];

            for (let i = 0; i < Number(clientes); i++) {
                // Generar tiempos aleatorios de llegada y servicio
                const tiempoLlegada = Math.random() * Number(tiempoPromedioLlegada) * 2;
                const tiempoServicio = Math.random() * Number(tiempoPromedioServicio) * 2;

                // Actualizar el tiempo acumulado
                tiempoActual = Math.max(tiempoActual, tiempoLlegada) + tiempoServicio;

                // Calcular el tiempo de espera
                const tiempoEspera = Math.max(0, tiempoActual - tiempoLlegada - tiempoServicio);

                // Calcular el tiempo total
                const tiempoTotal = tiempoEspera + tiempoServicio;

                // Determinar si el sistema está saturado (tiempo de espera > 5 minutos)
                const desbordado = tiempoEspera > 5;

                resultadosClientes.push({
                    cliente: i + 1,
                    tiempoLlegada,
                    tiempoServicio,
                    tiempoEspera,
                    tiempoTotal,
                    desbordado,
                });
            }

            // Guardar los resultados de la simulación
            resultadosSimulacion.push(resultadosClientes);
        }

        // Establecer los resultados de las simulaciones
        setResultados(resultadosSimulacion);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.push('/explore')} style={styles.backButton}>
                <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>
            {/* Encabezado */}
            <Text style={styles.title}> Colas en Supermercado </Text>

            {/* Entradas */}
            <TextInput
                style={styles.input}
                placeholder="Número de clientes"
                value={clientes}
                keyboardType="numeric"
                onChangeText={(text) => setClientes(text.replace(/[^0-9]/g, ''))}
            />
            <TextInput
                style={styles.input}
                placeholder="Tiempo promedio de llegada (min)"
                value={tiempoPromedioLlegada}
                keyboardType="numeric"
                onChangeText={(text) => setTiempoPromedioLlegada(text.replace(/[^0-9.]/g, ''))}
            />
            <TextInput
                style={styles.input}
                placeholder="Tiempo promedio de servicio (min)"
                value={tiempoPromedioServicio}
                keyboardType="numeric"
                onChangeText={(text) => setTiempoPromedioServicio(text.replace(/[^0-9.]/g, ''))}
            />
            <TextInput
                style={styles.input}
                placeholder="Número de simulaciones"
                value={simulaciones}
                keyboardType="numeric"
                onChangeText={(text) => setSimulaciones(text.replace(/[^0-9.]/g, ''))}
            />

            {/* Botón para calcular */}
            <TouchableOpacity style={styles.button} onPress={calcularSimulacion}>
                <Text style={styles.buttonText}>Calcular Simulación</Text>
            </TouchableOpacity>

            {/* Resultados */}
            <ScrollView style={styles.resultsContainer}>
                {resultados.map((simulacion, index) => (
                    <Animatable.View
                        key={index}
                        animation="fadeInUp"
                        duration={600}
                        style={styles.resultItemSuccess}
                    >
                        <Text style={styles.resultText}>Simulación {index + 1}</Text>
                        {simulacion.map((res, idx) => (
                            <View key={idx}>
                                <Text style={styles.resultText}>Cliente {res.cliente}</Text>
                                <Text style={styles.resultText}>Llegada: {res.tiempoLlegada.toFixed(2)} min</Text>
                                <Text style={styles.resultText}>Servicio: {res.tiempoServicio.toFixed(2)} min</Text>
                                <Text style={styles.resultText}>Espera: {res.tiempoEspera.toFixed(2)} min</Text>
                                <Text style={styles.resultText}>Total: {res.tiempoTotal.toFixed(2)} min</Text>
                                <Text style={styles.resultText}>
                                    {res.desbordado ? '⚠️ Sistema saturado' : '✅ Sistema adecuado'}
                                </Text>
                            </View>
                        ))}
                    </Animatable.View>
                ))}
            </ScrollView>
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
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
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
    button: {
        backgroundColor: '#1e90ff',
        padding: 15,
        borderRadius: 25,
        alignItems: 'center',
        marginBottom: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    resultsContainer: {
        marginTop: 20,
    },
    resultItemSuccess: {
        backgroundColor: '#d4edda',
        borderLeftWidth: 5,
        borderLeftColor: '#28a745',
        padding: 10,
        marginBottom: 10,
        borderRadius: 25,
    },
    resultItemError: {
        backgroundColor: '#f8d7da',
        borderLeftWidth: 5,
        borderLeftColor: '#dc3545',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    resultText: {
        fontSize: 16,
    },
});

export default SupermarketQueueSimulation;
