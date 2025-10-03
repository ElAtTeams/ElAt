import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import { getFontSize, Sizes } from '../../utils/dimensions';
import { PHONE_CODES } from '../../constants/data';

const PhoneNumberInput = ({ 
  selectedCode, 
  phoneNumber, 
  onCodeSelect, 
  onPhoneNumberChange,
  placeholder = "Telefon numaranız"
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const filteredCodes = PHONE_CODES.filter(item => 
    item.country.toLowerCase().includes(searchText.toLowerCase()) ||
    item.code.includes(searchText)
  );

  const handleCodeSelect = (codeItem) => {
    onCodeSelect(codeItem);
    setModalVisible(false);
    setSearchText('');
  };

  const renderCodeItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleCodeSelect(item)}
    >
      <View style={styles.countryInfo}>
        <Text style={styles.flag}>{item.flag}</Text>
        <View style={styles.countryDetails}>
          <Text style={styles.countryName}>{item.country}</Text>
          <Text style={styles.countryCode}>{item.code}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={16} color={COLORS.GRAY} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* Country Code Picker */}
        <TouchableOpacity
          style={styles.codeButton}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.flag}>{selectedCode?.flag || '🇹🇷'}</Text>
          <Text style={styles.code}>{selectedCode?.code || '+90'}</Text>
          <Ionicons name="chevron-down" size={16} color={COLORS.GRAY} />
        </TouchableOpacity>

        {/* Phone Number Input */}
        <TextInput
          style={styles.phoneInput}
          placeholder={placeholder}
          value={phoneNumber}
          onChangeText={onPhoneNumberChange}
          keyboardType="phone-pad"
          placeholderTextColor={COLORS.GRAY}
        />
      </View>

      {/* Country Code Modal */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Ülke Kodu Seçin</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.GRAY} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={COLORS.GRAY} />
              <TextInput
                style={styles.searchInput}
                placeholder="Ülke veya kod ara..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor={COLORS.GRAY}
              />
            </View>

            <FlatList
              data={filteredCodes}
              renderItem={renderCodeItem}
              keyExtractor={(item) => item.code}
              style={styles.list}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    overflow: 'hidden',
  },
  codeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing.m,
    paddingVertical: Sizes.spacing.m,
    borderRightWidth: 1,
    borderRightColor: '#e2e8f0',
    backgroundColor: COLORS.LIGHT_GRAY,
    gap: Sizes.spacing.xs,
  },
  flag: {
    fontSize: getFontSize(18),
  },
  code: {
    fontSize: getFontSize(14),
    fontWeight: '600',
    color: COLORS.BLACK,
  },
  phoneInput: {
    flex: 1,
    paddingHorizontal: Sizes.spacing.m,
    paddingVertical: Sizes.spacing.m,
    fontSize: getFontSize(16),
    color: COLORS.BLACK,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Sizes.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  modalTitle: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    color: COLORS.BLACK,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: Sizes.spacing.l,
    paddingHorizontal: Sizes.spacing.m,
    paddingVertical: Sizes.spacing.s,
    backgroundColor: COLORS.LIGHT_GRAY,
    borderRadius: 12,
    gap: Sizes.spacing.s,
  },
  searchInput: {
    flex: 1,
    fontSize: getFontSize(16),
    color: COLORS.BLACK,
  },
  list: {
    maxHeight: 400,
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing.l,
    paddingVertical: Sizes.spacing.m,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  countryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.spacing.m,
  },
  countryDetails: {
    flex: 1,
  },
  countryName: {
    fontSize: getFontSize(16),
    color: COLORS.BLACK,
    fontWeight: '500',
  },
  countryCode: {
    fontSize: getFontSize(12),
    color: COLORS.GRAY,
  },
});

export default PhoneNumberInput;