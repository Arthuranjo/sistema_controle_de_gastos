import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { selectAllGastos, deleteGasto } from '../database/database';

// Importação do componente isolado
import ExpenseItem from '../components/ExpenseItem';

export default function HomeScreen({ navigation }) {
  const [gastos, setGastos] = useState([]);
  const isFocused = useIsFocused();

  // Recarrega os dados toda vez que a tela ganha foco
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

  // Função para deletar (Funcionalidade Extra Opcional)
  const handleDeletarGasto = async (id) => {
  console.log("DELETE CHAMADO COM ID:", id);

  await deleteGasto(id);

  console.log("DELETE EXECUTADO");

  await carregarGastos();
};

  // Renderizador atualizado utilizando o componente reutilizável
  const renderGastoItem = ({ item }) => (
    <ExpenseItem 
      item={item} 
      onDelete={handleDeletarGasto} 
    />
  );

  return (
    <View style={styles.container}>
      {/* Totalizador de gastos */}
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total Gasto:</Text>
        <Text style={styles.totalValue}>
          R$ {gastos.reduce((sum, current) => sum + current.valor, 0).toFixed(2)}
        </Text>
      </View>

      {/* Listagem com FlatList */}
      <FlatList
        data={gastos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGastoItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Nenhum gasto cadastrado ainda.</Text>
        }
      />

      {/* Botão Flutuante para Adicionar */}
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
    padding: 16 
  },
  totalContainer: {
    padding: 16,
    backgroundColor: '#1a1a1a',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },
  totalLabel: { 
    fontSize: 16, 
    color: '#666' 
  },
  totalValue: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: '#00e676' 
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 40, 
    color: '#999',
    fontSize: 14
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
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  fabText: { 
    color: '#fff', 
    fontSize: 28, 
    fontWeight: 'bold' 
  },

  card: {
  backgroundColor: '#1a1a1a',
  padding: 16,
  borderRadius: 14,
  marginBottom: 12,
  borderWidth: 1,
  borderColor: '#2a2a2a',
},

descricao: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#fff'
},
subtext: {
  color: '#aaa'
},
valor: {
  color: '#00e676'
}
});