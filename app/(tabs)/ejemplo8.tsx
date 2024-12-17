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
import { useRouter } from "expo-router"; // Importamos useRouter para la navegación

const SimulacionConsumoEnergetico = () => {
    const [consumoBase, setConsumoBase] = useState(""); // kWh/día
    const [dias, setDias] = useState(""); // Días del mes
    const [variacion, setVariacion] = useState(""); // Variación diaria (%)
    const [metaEnergetica, setMetaEnergetica] = useState(""); // Meta kWh/mes
    const [resultados, setResultados] = useState(null);
    const router = useRouter(); 

    const calcularConsumo = () => {
        try {
            if (!consumoBase || !dias || !variacion || !metaEnergetica) {
                Alert.alert("Error", "Por favor, completa todos los campos.");
                return;
            }

            const consumoDiarioBase = parseFloat(consumoBase); // Consumo base en kWh
            const numDias = parseInt(dias);
            const rangoVariacion = parseFloat(variacion) / 100; // Variación en porcentaje
            const metaMensual = parseFloat(metaEnergetica);

            const simulaciones = 1000;
            const consumosSimulados = [];

            // Realizar simulaciones Monte Carlo
            for (let i = 0; i < simulaciones; i++) {
                let consumoMensual = 0;
                for (let j = 0; j < numDias; j++) {
                    // Generar un factor aleatorio entre -rangoVariación y +rangoVariación
                    const factorAleatorio =
                        Math.random() * rangoVariacion * 2 - rangoVariacion;
                    consumoMensual += consumoDiarioBase * (1 + factorAleatorio);
                }
                consumosSimulados.push(consumoMensual);
            }

            // Calcular resultados
            const promedioConsumo =
                consumosSimulados.reduce((a, b) => a + b, 0) / simulaciones;
            const rangoInferior = Math.min(...consumosSimulados);
            const rangoSuperior = Math.max(...consumosSimulados);
            const probabilidadMeta =
                (consumosSimulados.filter((c) => c <= metaMensual).length /
                    simulaciones) *
                100;

            let mensajeProbabilidad = "";
            if (probabilidadMeta >= 80) {
                mensajeProbabilidad = "Alta probabilidad de cumplir con tu meta energética.";
            } else if (probabilidadMeta >= 30) {
                mensajeProbabilidad =
                    "Probabilidad moderada de cumplir con tu meta. Considera ajustes.";
            } else {
                mensajeProbabilidad =
                    "Baja probabilidad de cumplir con tu meta. Revisa tus patrones de consumo.";
            }

            setResultados({
                promedioConsumo: promedioConsumo.toFixed(2),
                rangoInferior: rangoInferior.toFixed(2),
                rangoSuperior: rangoSuperior.toFixed(2),
                probabilidadMeta: probabilidadMeta.toFixed(2),
                mensajeProbabilidad,
            });
        } catch (error) {
            Alert.alert("Error", "Ocurrió un problema al calcular los resultados.");
        }
    };

    return (
        <View style={styles.container}>
            {/* Botón de regresar */}
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>
            
            <Text style={styles.title}>Consumo Energético</Text>

            <TextInput
                style={styles.input}
                placeholder="Consumo base diario (kWh)"
                value={consumoBase}
                onChangeText={setConsumoBase}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Días del mes"
                value={dias}
                onChangeText={setDias}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Variación diaria (%)"
                value={variacion}
                onChangeText={setVariacion}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Meta mensual (kWh)"
                value={metaEnergetica}
                onChangeText={setMetaEnergetica}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={calcularConsumo}>
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
                        Consumo Promedio: {resultados.promedioConsumo} kWh
                    </Text>
                    <Text style={styles.resultText}>
                        Rango Probable: {resultados.rangoInferior} - {resultados.rangoSuperior} kWh
                    </Text>
                    <Text style={styles.resultText}>
                        Probabilidad de cumplir la meta: {resultados.probabilidadMeta}%
                    </Text>
                    <Text style={styles.resultMessage}>
                        {resultados.mensajeProbabilidad}
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

export default SimulacionConsumoEnergetico;
