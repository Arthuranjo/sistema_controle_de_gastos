import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable } from 'react-native';

export default function ExpenseItem({ item, onDelete }) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        {/* Descrição do Gasto */}
        <Text style={styles.descricao}>{item.descricao}</Text>
        
        {/* Categoria e Data */}
        <Text style={styles.subtext}>•  Categoria:  {item.categoria}</Text>
        <Text style={styles.subtext}>•  Data: {item.data}</Text>

      </View>

      <View style={styles.rightContainer}>
        {/* Valor formatado */}
        <Text style={styles.valor}>R$ {item.valor.toFixed(2)}</Text>
        
        {/* FUNCIONALIDADE EXTRA: Botão de deletar item */}
        {onDelete && (
        <Pressable
  style={styles.deleteButton}
  onPress={() => {
    console.log("CLICOU NO DELETE");
    onDelete && onDelete(item.id);
  }}
>
  <Text style={styles.deleteText}>deletar</Text>
</Pressable>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    elevation: 1, // Sombra para Android
    shadowColor: '#000', // Sombra para iOS
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  infoContainer: {
    flex: 1,
  },
  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  subtext: {
    fontSize: 12,
    color: '#777',
    marginTop: 4,
  },
  rightContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2e7d32', // Cor verde para destacar o valor (personalize!)
    marginRight: 10,
  },
  deleteButton: {
    padding: 5,
  },
  deleteText: {
    fontSize: 18,
  },
});