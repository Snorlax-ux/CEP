import React, { useState } from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator} from 'react-native';

export default function App() {
  const [cep, setCep] = useState('');
  const [dados, setDados] = useState(null);
  const [erro, setErro] = useState('');
  const [loading, setLoading] = useState(false);

  const buscarCep = async () => {
    setErro('');
    setDados(null);

    // validação
    if (cep.length !== 8 || isNaN(cep)) {
      setErro('Digite um CEP válido com 8 números.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setErro('CEP não encontrado.');
      } else {
        setDados(data);
      }
    } catch (error) {
      setErro('Erro ao buscar o CEP. Verifique sua conexão.');
    }

    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Consulta de CEP</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite o CEP (somente números)"
        keyboardType="numeric"
        maxLength={8}
        value={cep}
        onChangeText={setCep}
      />

      <TouchableOpacity style={styles.button} onPress={buscarCep}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" />}

      {erro !== '' && <Text style={styles.erro}>{erro}</Text>}

      {dados && (
        <View style={styles.resultado}>
          <Text>Rua: {dados.logradouro}</Text>
          <Text>Bairro: {dados.bairro}</Text>
          <Text>Cidade: {dados.localidade}</Text>
          <Text>Estado: {dados.uf}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  resultado: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  erro: {
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
