import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
} from "react-native";
import * as Animatable from "react-native-animatable";
import { useRouter } from "expo-router";

const PrediccionStock = () => {
    const [ventasDiarias, setVentasDiarias] = useState("");
    const [variabilidad, setVariabilidad] = useState("");
    const [periodo, setPeriodo] = useState("");
    const [confianza, setConfianza] = useState("");
    const [resultados, setResultados] = useState(null);
    const router = useRouter(); 

    const calcularMonteCarlo = () => {
        try {
            if (!ventasDiarias || !variabilidad || !periodo || !confianza) {
                Alert.alert("Error", "Por favor, completa todos los campos.");
                return;
            }

            const promedioVentas = parseFloat(ventasDiarias);
            const variabilidadDemanda = parseFloat(variabilidad) / 100;
            const dias = parseInt(periodo);
            const nivelConfianza = parseFloat(confianza) / 100;

            const simulaciones = 1000;
            const resultadosSimulados = [];

            for (let i = 0; i < simulaciones; i++) {
                let demandaTotal = 0;
                for (let j = 0; j < dias; j++) {
                    const demandaDia =
                        promedioVentas +
                        (Math.random() * 2 - 1) * variabilidadDemanda * promedioVentas;
                    demandaTotal += Math.max(0, demandaDia); // Evitar valores negativos
                }
                resultadosSimulados.push(demandaTotal);
            }

            // Calcular estadísticas de las simulaciones
            const promedioDemanda =
                resultadosSimulados.reduce((a, b) => a + b, 0) / simulaciones;

            const rangoInferior = Math.min(...resultadosSimulados).toFixed(2);
            const rangoSuperior = Math.max(...resultadosSimulados).toFixed(2);

            // Calcular inventario recomendado
            resultadosSimulados.sort((a, b) => a - b);
            const inventarioRecomendado =
                resultadosSimulados[
                    Math.floor(simulaciones * nivelConfianza)
                ].toFixed(2);

            setResultados({
                promedioDemanda: promedioDemanda.toFixed(2),
                rangoInferior,
                rangoSuperior,
                inventarioRecomendado,
            });
        } catch (error) {
            Alert.alert("Error", "Ocurrió un problema al calcular los resultados.");
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>

            <Text style={styles.title}>Predicción de Stock</Text>

            <TextInput
                style={styles.input}
                placeholder="Ventas promedio diarias (unidades)"
                value={ventasDiarias}
                onChangeText={setVentasDiarias}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Variabilidad de la demanda (%)"
                value={variabilidad}
                onChangeText={setVariabilidad}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Período de predicción (días)"
                value={periodo}
                onChangeText={setPeriodo}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Nivel de confianza (%)"
                value={confianza}
                onChangeText={setConfianza}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={calcularMonteCarlo}>
                <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            {resultados && (
                <Animatable.View
                    animation="fadeInUp"
                    duration={800}
                    style={styles.resultContainer}
                >
                    <Text style={styles.resultTitle}>Resultados</Text>
                    <Text style={styles.resultText}>
                        Demanda Promedio Total: {resultados.promedioDemanda} unidades
                    </Text>
                    <Text style={styles.resultText}>
                        Rango Probable: {resultados.rangoInferior} - {resultados.rangoSuperior} unidades
                    </Text>
                    <Text style={styles.resultText}>
                        Inventario Recomendado: {resultados.inventarioRecomendado} unidades
                    </Text>
                </Animatable.View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 80,
        paddingHorizontal: 20,
        backgroundColor: "#fff",
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
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        marginBottom: 20,
        color: "#333",
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
    button: {
        backgroundColor: "#1e90ff",
        padding: 15,
        borderRadius: 25,
        alignItems: "center",
        marginTop: 10,
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
        textAlign: "center",
    },
    resultText: {
        fontSize: 16,
        marginBottom: 5,
        textAlign: "center",
    },
    resultMessage: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center",
    },
});

export default PrediccionStock;