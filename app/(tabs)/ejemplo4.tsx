import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import * as Animatable from "react-native-animatable";
import { evaluate } from "mathjs"; // Para evaluar funciones matemáticas
import { useRouter } from "expo-router"; // Para la navegación

const AreaUnderCurveScreen = () => {
    const [funcion, setFuncion] = useState("x^2");
    const [limiteInferior, setLimiteInferior] = useState("");
    const [limiteSuperior, setLimiteSuperior] = useState("");
    const [numeroPuntos, setNumeroPuntos] = useState("");
    const [resultado, setResultado] = useState(null);
    const router = useRouter(); // Hook para manejar la navegación

    // Función para manejar cambios en entradas
    const handleInputChange = (setter) => (text) => setter(text.replace(/[^0-9.]/g, ""));

    // Simulación Montecarlo
    const calcularArea = () => {
        const a = parseFloat(limiteInferior);
        const b = parseFloat(limiteSuperior);
        const n = parseInt(numeroPuntos, 10);

        if (isNaN(a) || isNaN(b) || isNaN(n) || a >= b || n <= 0) {
            alert("Por favor, introduce valores válidos.");
            return;
        }

        let puntosDentro = 0;

        for (let i = 0; i < n; i++) {
            const x = Math.random() * (b - a) + a; // Generar punto aleatorio en el intervalo [a, b]
            const y = Math.random(); // Generar punto aleatorio en el intervalo [0, 1]
            const valorFuncion = evaluate(funcion, { x }); // Evaluar la función en x

            if (y <= valorFuncion) {
                puntosDentro++;
            }
        }

        // Calcular el área
        const area = (puntosDentro / n) * (b - a); // Escalar por la longitud del intervalo

        // Guardar el resultado
        setResultado({
            funcion,
            limiteInferior: a,
            limiteSuperior: b,
            numeroPuntos: n,
            area,
        });
    };

    return (
        <View style={styles.container}>
            {/* Botón de regresar */}
            <TouchableOpacity onPress={() => router.push("/explore")} style={styles.backButton}>
                <Text style={styles.backText}>Atrás</Text>
            </TouchableOpacity>

            <ScrollView contentContainerStyle={styles.contentContainer}>
                <Text style={styles.title}>Estimación del Área bajo una Curva</Text>

                {/* Entrada de datos */}
                <TextInput
                    style={styles.input}
                    placeholder="Función (ej. x^2)"
                    value={funcion}
                    onChangeText={setFuncion}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Límite inferior"
                    value={limiteInferior}
                    onChangeText={handleInputChange(setLimiteInferior)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Límite superior"
                    value={limiteSuperior}
                    onChangeText={handleInputChange(setLimiteSuperior)}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Número de puntos"
                    value={numeroPuntos}
                    onChangeText={handleInputChange(setNumeroPuntos)}
                    keyboardType="numeric"
                />

                {/* Botón para calcular */}
                <TouchableOpacity style={styles.button} onPress={calcularArea}>
                    <Text style={styles.buttonText}>Calcular Área</Text>
                </TouchableOpacity>

                {/* Mostrar resultados */}
                {resultado && (
                    <Animatable.View animation="fadeInUp" style={styles.resultContainer}>
                        <Text style={styles.resultTitle}>Resultados:</Text>
                        <Text style={styles.resultText}>
                            Función: {resultado.funcion}
                        </Text>
                        <Text style={styles.resultText}>
                            Intervalo: [{resultado.limiteInferior}, {resultado.limiteSuperior}]
                        </Text>
                        <Text style={styles.resultText}>
                            Número de puntos: {resultado.numeroPuntos}
                        </Text>
                        <Text style={styles.resultText}>
                            Área estimada: {resultado.area.toFixed(4)}
                        </Text>
                        <Text style={styles.resultExplanation}>
                            La simulación Montecarlo estima el área bajo la curva al generar puntos aleatorios y calcular la proporción que cae debajo de la función. Aumentar el número de puntos mejora la precisión.
                        </Text>
                    </Animatable.View>
                )}
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
    contentContainer: {
        alignItems: "center",
        paddingBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
        color: "#333",
        textAlign: "center",
    },
    input: {
        width: "95%",
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
        width: "90%",
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
        width: "90%",
    },
    resultTitle: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#333",
    },
    resultText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#555",
    },
    resultExplanation: {
        fontSize: 14,
        marginTop: 10,
        color: "#666",
        textAlign: "justify",
    },
});

export default AreaUnderCurveScreen;
