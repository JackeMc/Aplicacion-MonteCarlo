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

const MonteCarloInversion = () => {
    const [inversionInicial, setInversionInicial] = useState("");
    const [anios, setAnios] = useState("");
    const [rendimientoMedio, setRendimientoMedio] = useState("");
    const [volatilidad, setVolatilidad] = useState("");
    const [meta, setMeta] = useState("");
    const [resultados, setResultados] = useState(null);
    const router = useRouter(); // Declaramos el router para navegar entre pantallas

    const calcularMonteCarlo = () => {
        try {
            if (!inversionInicial || !anios || !rendimientoMedio || !volatilidad || !meta) {
                Alert.alert("Error", "Por favor, completa todos los campos.");
                return;
            }

            const inversion = parseFloat(inversionInicial);
            const nAnios = parseInt(anios);
            const tasaMedia = parseFloat(rendimientoMedio) / 100;
            const volatilidadAnual = parseFloat(volatilidad) / 100;
            const metaFinanciera = parseFloat(meta);

            const simulaciones = 1000;
            const resultadosSimulados = [];

            for (let i = 0; i < simulaciones; i++) {
                let valor = inversion;
                for (let j = 0; j < nAnios; j++) {
                    const rendimientoAnual =
                        tasaMedia + Math.random() * volatilidadAnual * 2 - volatilidadAnual;
                    valor *= 1 + rendimientoAnual;
                }
                resultadosSimulados.push(valor);
            }

            const promedioFinal =
                resultadosSimulados.reduce((a, b) => a + b, 0) / simulaciones;

            const rangoInferior = Math.min(...resultadosSimulados);
            const rangoSuperior = Math.max(...resultadosSimulados);

            const probabilidadMeta =
                (resultadosSimulados.filter((r) => r >= metaFinanciera).length /
                    simulaciones) *
                100;

            let mensajeProbabilidad = "";
            if (probabilidadMeta >= 80) {
                mensajeProbabilidad = "Alta probabilidad de alcanzar tu meta.";
            } else if (probabilidadMeta >= 30) {
                mensajeProbabilidad =
                    "Probabilidad moderada de alcanzar tu meta. Considera ajustes.";
            } else {
                mensajeProbabilidad =
                    "Baja probabilidad de alcanzar tu meta. Evalúa estrategias.";
            }

            setResultados({
                promedioFinal: promedioFinal.toFixed(2),
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

            <Text style={styles.title}>Simulación de Inversión</Text>

            <TextInput
                style={styles.input}
                placeholder="Inversión inicial ($)"
                value={inversionInicial}
                onChangeText={setInversionInicial}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Duración (años)"
                value={anios}
                onChangeText={setAnios}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Rendimiento medio anual (%)"
                value={rendimientoMedio}
                onChangeText={setRendimientoMedio}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Volatilidad anual (%)"
                value={volatilidad}
                onChangeText={setVolatilidad}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Meta financiera ($)"
                value={meta}
                onChangeText={setMeta}
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
                        Valor Final Promedio: ${resultados.promedioFinal}
                    </Text>
                    <Text style={styles.resultText}>
                        Rango Probable: ${resultados.rangoInferior} - ${resultados.rangoSuperior}
                    </Text>
                    <Text style={styles.resultText}>
                        Probabilidad de alcanzar la meta: {resultados.probabilidadMeta}%
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
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 25,
        marginBottom: 15,
        fontSize: 16,
        backgroundColor: "#fff",
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
        color: "#333",
        textAlign: "center",
    },
    resultText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#555",
        textAlign: "center",
    },
    resultMessage: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: "bold",
        color: "#00796b",
        textAlign: "center",
    },
});

export default MonteCarloInversion;