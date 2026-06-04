import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { selectAllGastos, deleteGasto } from '../database/database';
import ExpenseItem from '../components/ExpenseItem';

export default function HomeScreen({ navigation }) {
  const [gastos, setGastos] = useState([]);
  const isFocused = useIsFocused();

  const screenWidth = Dimensions.get('window').width;

  useEffect(() => {
    if (isFocused) {
      carregarGastos();
    }
  }, [isFocused]);

  const carregarGastos = async () => {
    try {
      const dados = await selectAllGastos();
      setGastos(dados);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeletarGasto = async (id) => {
    await deleteGasto(id);
    await carregarGastos();
  };

  const renderGastoItem = ({ item }) => (
    <ExpenseItem item={item} onDelete={handleDeletarGasto} />
  );

  return (
    <View style={styles.container}>
      
      {/* WRAPPER CENTRALIZADO */}
      <View
        style={[
          styles.wrapper,
          screenWidth > 768 && styles.wrapperWeb
        ]}
      >

        {/* TOTAL */}
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>Total Gasto</Text>
          <Text style={styles.totalValue}>
            R$ {gastos.reduce((sum, g) => sum + g.valor, 0).toFixed(2)}
          </Text>
        </View>

        {/* LISTA */}
        <FlatList
          data={gastos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGastoItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhum gasto cadastrado ainda.
            </Text>
          }
        />

      </View>

      {/* BOTÃO */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f0f',
    alignItems: 'center', 
  },

  wrapper: {
    width: '100%',
    padding: 16,
  },

 
  wrapperWeb: {
    maxWidth: 800,
  },

  totalContainer: {
    padding: 18,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },

  totalLabel: {
    fontSize: 14,
    color: '#aaa',
  },

  totalValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00e676',
    marginTop: 4,
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#777',
    fontSize: 14,
  },

  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    backgroundColor: '#6200ee',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },

  fabText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
  },
});