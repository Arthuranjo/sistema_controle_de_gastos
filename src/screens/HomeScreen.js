import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { selectAllGastos, deleteGasto } from '../database/database';
import ExpenseItem from '../components/ExpenseItem';

export default function HomeScreen({ navigation }) {
  const [gastos, setGastos] = useState([]);
  const [categoriaFiltro, setCategoriaFiltro] = useState('');
  const [busca, setBusca] = useState('');
  const [showFiltro, setShowFiltro] = useState(false);

  const isFocused = useIsFocused();
  const screenWidth = Dimensions.get('window').width;

  const categorias = [
    { label: 'Todos', value: '' },
    { label: 'Alimentação', value: 'alimentacao' },
    { label: 'Transporte', value: 'transporte' },
    { label: 'Lazer', value: 'lazer' },
    { label: 'Estudos', value: 'estudos' },
    { label: 'Contas Domésticas', value: 'contas domesticas' },
    { label: 'Saúde', value: 'saude' }
  ];

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

  
  const gastosFiltrados = gastos.filter((gasto) => {
    const matchDescricao = gasto.descricao
      .toLowerCase()
      .includes(busca.toLowerCase());

    const matchCategoria = categoriaFiltro
      ? gasto.categoria === categoriaFiltro
      : true;

    return matchDescricao && matchCategoria;
  });

  const renderGastoItem = ({ item }) => (
    <ExpenseItem item={item} onDelete={handleDeletarGasto} />
  );

  return (
    <View style={styles.container}>

      <View
        style={[
          styles.wrapper,
          screenWidth > 768 && styles.wrapperWeb
        ]}
      >

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Seus Gastos</Text>

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => setShowFiltro(true)}
          >
            <Text style={{ color: '#fff' }}>Filtrar</Text>
          </TouchableOpacity>
        </View>

        
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar gasto..."
          placeholderTextColor="#777"
          value={busca}
          onChangeText={setBusca}
        />

        
        <View style={styles.totalContainer}>
          <Text style={styles.totalLabel}>
            {categoriaFiltro
              ? `Total (${categoriaFiltro})`
              : 'Total Geral'}
          </Text>

          <Text style={styles.totalValue}>
            R$ {gastosFiltrados.reduce((sum, g) => sum + g.valor, 0).toFixed(2)}
          </Text>
        </View>

       
        <FlatList
          data={gastosFiltrados}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderGastoItem}
          ListEmptyComponent={
            <Text style={styles.emptyText}>
              Nenhum gasto encontrado.
            </Text>
          }
        />

      </View>

      
      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('AddExpense')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      
      <Modal visible={showFiltro} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>

            {categorias.map((item) => (
              <TouchableOpacity
                key={item.value}
                style={styles.optionItem}
                onPress={() => {
                  setCategoriaFiltro(item.value);
                  setShowFiltro(false);
                }}
              >
                <Text style={styles.optionText}>
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowFiltro(false)}
            >
              <Text style={{ color: '#fff', fontWeight: 'bold' }}>
                Fechar
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

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

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },

  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },

  filterButton: {
    backgroundColor: '#6200ee',
    padding: 8,
    borderRadius: 8,
  },


  searchInput: {
    backgroundColor: '#121212',
    color: '#fff',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
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

  closeButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#6200ee',
    borderRadius: 10,
    alignItems: 'center',
  },
});