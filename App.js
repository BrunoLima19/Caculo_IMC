import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function App() {
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imc, setImc] = useState(null);
  const [erro, setErro] = useState('');

  const calcularIMC = () => {
    const alturaMetros = altura / 100;
    const imcCalculado = peso / (alturaMetros * alturaMetros);
    setImc(imcCalculado.toFixed(2));
  };

  const validarNumero = (valor, nomeCampo) => {
    if (isNaN(valor)) {
      setErro(`O valor digitado no campo ${nomeCampo} não é um número válido.`);
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validarNumero(altura, "Altura") || !validarNumero(peso, "Peso")) {
      return;
    }
    calcularIMC();
    setErro('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>ALTURA (cm)</Text>
      <TextInput
        style={styles.input}
        value={altura}
        onChangeText={setAltura}
        keyboardType="numeric"
      />

      <Text style={styles.label}>PESO (kg)</Text>
      <TextInput
        style={styles.input}
        value={peso}
        onChangeText={setPeso}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Calcular IMC</Text>
      </TouchableOpacity>

      {erro ? (
        <Text style={styles.erro}>{erro}</Text>
      ) : (
        imc && (
          <Text style={styles.resultado}>
            Seu IMC é {imc}.{'\n'}
            {imc < 18.5 ? 'MAGREZA' : ''}
            {imc >= 18.5 && imc < 24.9 ? 'NORMAL' : ''}
            {imc >= 25 && imc < 29.9 ? 'SOBREPESO' : ''}
            {imc >= 30 && imc < 39.9 ? 'OBESIDADE' : ''}
            {imc > 40 ? 'OBESIDADE GRAVE' : ''}
          </Text>
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f5fcff',
  },
  label: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 50,
    paddingHorizontal: 16,
    marginTop: 10,
    marginBottom: 16,
    fontSize: 20,
  },
  button: {
    backgroundColor: '#ff0000',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 50,
  },
    buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
    resultado: {
    marginTop: 32,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});