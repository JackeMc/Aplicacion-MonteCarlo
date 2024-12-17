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

const SimulacionRiesgoMedico = () => {
    const [edad, setEdad] = useState("");
    const [imc, setIMC] = useState("");
    const [actividadFisica, setActividadFisica] = useState("");
    const [antecedentesFamiliares, setAntecedentesFamiliares] = useState("");
    const [dieta, setDieta] = useState("");
    const [resultados, setResultados] = useState(null);
    const router = useRouter(); 

    const calcularRiesgo = () => {
        try {
            if (!edad || !imc || !actividadFisica || !antecedentesFamiliares || !dieta) {
                Alert.alert("Error", "Por favor, completa todos los campos.");
                return;
            }

            const edadVal = parseInt(edad);
            const imcVal = parseFloat(imc);
            const actividadVal = parseInt(actividadFisica);
            const antecedentesVal = parseInt(antecedentesFamiliares);
            const dietaVal = parseInt(dieta);

            const simulaciones = 1000;
            const resultadosSimulados = [];

            for (let i = 0; i < simulaciones; i++) {
                let riesgo = 0;

                // Edad
                if (edadVal < 40) {
                    riesgo += Math.random() * 0.05;
                } else if (edadVal >= 40 && edadVal <= 55) {
                    riesgo += Math.random() * 0.15;
                } else {
                    riesgo += Math.random() * 0.3;
                }

                // IMC
                if (imcVal < 25) {
                    riesgo += Math.random() * 0.05;
                } else if (imcVal >= 25 && imcVal <= 28) {
                    riesgo += Math.random() * 0.15;
                } else {
                    riesgo += Math.random() * 0.25;
                }

                // Actividad física
                if (actividadVal === 1) {
                    riesgo += Math.random() * 0.25;
                } else if (actividadVal === 2) {
                    riesgo += Math.random() * 0.15;
                } else {
                    riesgo += Math.random() * 0.05;
                }

                // Antecedentes familiares
                if (antecedentesVal === 1) {
                    riesgo += Math.random() * 0.3;
                }

                // Dieta
                if (dietaVal === 1) {
                    riesgo += Math.random() * 0.2;
                } else if (dietaVal === 2) {
                    riesgo += Math.random() * 0.1;
                }

                // Limitar riesgo máximo a 100%
                riesgo = Math.min(riesgo * 100, 100);
                resultadosSimulados.push(riesgo);
            }

            const promedioRiesgo =
                resultadosSimulados.reduce((a, b) => a + b, 0) / simulaciones;

            const rangoInferior = Math.min(...resultadosSimulados);
            const rangoSuperior = Math.max(...resultadosSimulados);

            let clasificacion = "";
            if (promedioRiesgo > 70) {
                clasificacion = "Alto Riesgo";
            } else if (promedioRiesgo > 30) {
                clasificacion = "Riesgo Moderado";
            } else {
                clasificacion = "Bajo Riesgo";
            }

            setResultados({
                promedioRiesgo: promedioRiesgo.toFixed(2),
                rangoInferior: rangoInferior.toFixed(2),
                rangoSuperior: rangoSuperior.toFixed(2),
                clasificacion,
            });
        } catch (error) {
            Alert.alert("Error", "Ocurrió un problema al calcular el riesgo.");
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>
            
            <Text style={styles.title}>Simulación de Riesgo Médico</Text>

            <TextInput
                style={styles.input}
                placeholder="Edad (años)"
                value={edad}
                onChangeText={setEdad}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="IMC (Índice de Masa Corporal)"
                value={imc}
                onChangeText={setIMC}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Actividad Física (1: Baja, 2: Moderada, 3: Alta)"
                value={actividadFisica}
                onChangeText={setActividadFisica}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Antecedentes Familiares (1: Sí, 0: No)"
                value={antecedentesFamiliares}
                onChangeText={setAntecedentesFamiliares}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Dieta (1: Mala, 2: Moderada, 3: Saludable)"
                value={dieta}
                onChangeText={setDieta}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={calcularRiesgo}>
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
                        Promedio de Riesgo: {resultados.promedioRiesgo}%
                    </Text>
                    <Text style={styles.resultText}>
                        Rango Probable: {resultados.rangoInferior}% - {resultados.rangoSuperior}%
                    </Text>
                    <Text style={styles.resultMessage}>
                        Clasificación: {resultados.clasificacion}
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

export default SimulacionRiesgoMedico;
