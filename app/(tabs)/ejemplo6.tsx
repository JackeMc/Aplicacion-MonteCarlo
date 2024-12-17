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

const MonteCarloProbabilidadAprobar = () => {
    const [notas, setNotas] = useState("");
    const [resultados, setResultados] = useState(null);
    const router = useRouter(); // Router para navegación

    // Simulación Monte Carlo para calcular la probabilidad de aprobar
    const calcularResultados = () => {
        try {
            if (!notas) {
                Alert.alert("Error", "Por favor, ingresa tus calificaciones.");
                return;
            }

            const notasArray = notas.split(",").map((n) => parseFloat(n.trim()) || 0);
            const simulaciones = 1000; // Número de simulaciones Monte Carlo
            const resultadosSimulados = [];
            const minimoParaAprobar = 60; // Nota mínima para aprobar

            for (let i = 0; i < simulaciones; i++) {
                const notasSimuladas = notasArray.map((nota) =>
                    nota === 0 ? Math.random() * 100 : nota
                );
                const promedioSimulado =
                    notasSimuladas.reduce((a, b) => a + b, 0) / notasSimuladas.length;
                resultadosSimulados.push(promedioSimulado);
            }

            const promedioFinal =
                resultadosSimulados.reduce((a, b) => a + b, 0) / simulaciones;

            const probabilidadAprobar =
                (resultadosSimulados.filter((r) => r >= minimoParaAprobar).length /
                    simulaciones) *
                100;

            // Generar mensaje basado en probabilidades
            let mensajeResultado = "";

            if (probabilidadAprobar >= 80) {
                mensajeResultado =
                    "¡Estás en camino seguro a aprobar! Mantén el buen trabajo.";
            } else if (probabilidadAprobar >= 20) {
                mensajeResultado =
                    "¡Sí es posible aprobar! Sigue esforzándote, tus probabilidades son alentadoras.";
            } else {
                mensajeResultado =
                    "Parece que estás quedándote. Necesitas mejorar significativamente para aprobar. No te rindas.";
            }
            setResultados({
                promedioFinal: promedioFinal.toFixed(2),
                probabilidadAprobar: probabilidadAprobar.toFixed(2),
                mensaje: mensajeResultado,
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

            <Text style={styles.title}>Calificaciones Académicas</Text>
            <TextInput
                style={styles.input}
                placeholder="Ingresa tus calificaciones separadas por comas (ej. 80,90,0)"
                value={notas}
                onChangeText={setNotas}
            />
            <TouchableOpacity style={styles.button} onPress={calcularResultados}>
                <Text style={styles.buttonText}>Calcular</Text>
            </TouchableOpacity>

            {resultados && (
                <Animatable.View animation="fadeInUp" duration={800} style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Resultados</Text>
                    <Text style={styles.resultText}>
                        Promedio Final Estimado: {resultados.promedioFinal}
                    </Text>
                    <Text style={styles.resultText}>
                        Probabilidad de Aprobar: {resultados.probabilidadAprobar}%
                    </Text>
                    <Text style={styles.resultMessage}>{resultados.mensaje}</Text>
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
        marginLeft: 10,
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
        fontSize: 11,
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

export default MonteCarloProbabilidadAprobar;