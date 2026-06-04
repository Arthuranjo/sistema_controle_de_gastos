import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ExpenseItem({ item, onDelete }) {

  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <View style={styles.card}>
        
        <View style={styles.infoContainer}>
          <Text style={styles.descricao}>{item.descricao}</Text>

          <Text style={styles.subtext}>
            • Categoria: {item.categoria}
          </Text>

          <Text style={styles.subtext}>
            • Data: {item.data}
          </Text>
        </View>

        <View style={styles.rightContainer}>
          
          <Text style={styles.valor}>
            R$ {item.valor.toFixed(2)}
          </Text>

          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => setShowConfirm(true)}
          >
            <Ionicons name="trash" size={18} color="#fff" />
          </TouchableOpacity>

        </View>
      </View>

      {/* MODAL CUSTOMIZADO */}
      {showConfirm && (
        <View style={styles.overlay}>
          <View style={styles.modal}>

            <Text style={styles.modalTitle}>Excluir gasto</Text>

            <Text style={styles.modalText}>
              Tem certeza que deseja excluir este gasto?
            </Text>

            <View style={styles.modalActions}>
              
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowConfirm(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.confirmButton}
                onPress={() => {
                  setShowConfirm(false);
                  onDelete(item.id);
                }}
              >
                <Text style={styles.confirmText}>Excluir</Text>
              </TouchableOpacity>

            </View>

          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1a1a1a',
    padding: 16,
    borderRadius: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },

  infoContainer: {
    flex: 1,
  },

  descricao: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },

  subtext: {
    fontSize: 12,
    color: '#aaa',
    marginTop: 4,
  },

  rightContainer: {
    alignItems: 'flex-end',
  },

  valor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00e676',
    marginBottom: 8,
  },

  deleteButton: {
    backgroundColor: '#e53935',
    padding: 8,
    borderRadius: 8,
  },

  /* MODAL */

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    width: '85%',
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#2a2a2a',
  },

  modalTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },

  modalText: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 20,
  },

  modalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  cancelButton: {
    marginRight: 10,
    padding: 10,
  },

  cancelText: {
    color: '#aaa',
  },

  confirmButton: {
    backgroundColor: '#e53935',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },

  confirmText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});