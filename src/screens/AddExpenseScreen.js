import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  Dimensions,
} from 'react-native';
import { insertGasto } from '../database/database';
import { Calendar } from 'react-native-calendars';

export default function AddExpenseScreen({ navigation }) {

  const screenWidth = Dimensions.get('window').width;

  const [descricao, setDescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState('');

  const [showCalendar, setShowCalendar] = useState(false);
  const [showCategoria, setShowCategoria] = useState(false);

  // 👉 NOVO STATE (SUCESSO)
  const [showSuccess, setShowSuccess] = useState(false);

  const categorias = [
    { label: 'Alimentação', value: 'alimentacao' },
    { label: 'Transporte', value: 'transporte' },
    { label: 'Lazer', value: 'lazer' },
    { label: 'Estudos', value: 'estudos' },
    { label: 'Contas Domésticas', value: 'contas domesticas' },
    { label: 'Saúde', value: 'saude' }
  ];

  const formatarValor = (texto) => {
    const numero = texto.replace(/\D/g, '');
    const valorFormatado = (Number(numero) / 100).toFixed(2);
    setValor(valorFormatado);
  };

  const handleSalvar = async () => {
    if (!descricao.trim() || !categoria.trim() || !valor.trim() || !data.trim()) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }

    const valorNumerico = parseFloat(valor.replace(',', '.'));

    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      Alert.alert('Erro', 'Valor inválido.');
      return;
    }

    try {
      const id = await insertGasto(descricao, categoria, valorNumerico, data);

      if (id) {
        // 👉 MOSTRA MODAL DE SUCESSO
        setShowSuccess(true);
      }
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Falha ao salvar.');
    }
  };

  return (
    <ScrollView style={styles.container}>

      <View
        style={[
          styles.wrapper,
          screenWidth > 768 && styles.wrapperWeb
        ]}
      >

        <Text style={styles.title}>Novo Gasto</Text>

        <View style={styles.card}>

          <Text style={styles.label}>Descrição</Text>
          <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={setDescricao}
            placeholder="Ex: Almoço"
            placeholderTextColor="#777"
          />

          <Text style={styles.label}>Categoria</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowCategoria(true)}
          >
            <Text style={{ color: categoria ? '#fff' : '#777' }}>
              {categoria
                ? categorias.find(c => c.value === categoria)?.label
                : 'Selecionar categoria'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.label}>Valor</Text>
          <TextInput
            style={styles.input}
            value={valor}
            onChangeText={formatarValor}
            keyboardType="numeric"
            placeholder="0,00"
            placeholderTextColor="#777"
          />

          <Text style={styles.label}>Data</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowCalendar(true)}
          >
            <Text style={{ color: data ? '#fff' : '#777' }}>
              {data || 'Selecionar data'}
            </Text>
          </TouchableOpacity>

        </View>

        <TouchableOpacity style={styles.button} onPress={handleSalvar}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>

      </View>

      {/* ✅ MODAL SUCESSO */}
      <Modal visible={showSuccess} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.successModal}>

            <Text style={styles.successTitle}>✅ Sucesso</Text>
            <Text style={styles.successText}>
              Novo gasto criado com sucesso!
            </Text>

            <TouchableOpacity
              style={styles.successButton}
              onPress={() => {
                setShowSuccess(false);
                navigation.goBack();
              }}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                OK
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* CALENDÁRIO */}
      <Modal visible={showCalendar} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Calendar
              onDayPress={(day) => {
                setData(day.dateString);
                setShowCalendar(false);
              }}
              theme={{
                backgroundColor: '#1a1a1a',
                calendarBackground: '#1a1a1a',
                dayTextColor: '#fff',
                monthTextColor: '#fff',
                arrowColor: '#6200ee',
                todayTextColor: '#6200ee',
                selectedDayBackgroundColor: '#6200ee',
                selectedDayTextColor: '#fff',
              }}
            />
          </View>
        </View>
      </Modal>

      {/* CATEGORIA */}
      <Modal visible={showCategoria} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {categorias.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.optionItem}
                onPress={() => {
                  setCategoria(item.value);
                  setShowCategoria(false);
                }}
              >
                <Text style={styles.optionText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
  },

  wrapper: {
    width: '100%',
    padding: 16,
    alignSelf: 'center',
  },

  wrapperWeb: {
    maxWidth: 750,
  },

  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },

  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },

  label: {
    color: '#aaa',
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    backgroundColor: '#121212',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: '#6200ee',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContent: {
    width: '90%',
    maxWidth: 400,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    padding: 10,
  },

  optionItem: {
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#2a2a2a',
  },

  optionText: {
    color: '#fff',
    fontSize: 16,
  },

  // 🔥 NOVO ESTILO SUCESSO
  successModal: {
    width: '80%',
    maxWidth: 350,
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },

  successTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00e676',
    marginBottom: 10,
  },

  successText: {
    color: '#ccc',
    marginBottom: 20,
    textAlign: 'center',
  },

  successButton: {
    backgroundColor: '#6200ee',
    padding: 12,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
  },
});