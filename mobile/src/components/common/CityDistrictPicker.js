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
import { CITIES_DATA } from '../../constants/data';

const CityDistrictPicker = ({ 
  selectedCity, 
  selectedDistrict, 
  onCitySelect, 
  onDistrictSelect,
  placeholder = "Şehir seçin",
  districtPlaceholder = "İlçe seçin"
}) => {
  const [cityModalVisible, setCityModalVisible] = useState(false);
  const [districtModalVisible, setDistrictModalVisible] = useState(false);
  const [searchText, setSearchText] = useState('');

  const cities = Object.keys(CITIES_DATA);
  const districts = selectedCity ? CITIES_DATA[selectedCity] || [] : [];

  const filteredCities = cities.filter(city => 
    city.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleCitySelect = (city) => {
    onCitySelect(city);
    onDistrictSelect(''); // Reset district when city changes
    setCityModalVisible(false);
    setSearchText('');
  };

  const handleDistrictSelect = (district) => {
    onDistrictSelect(district);
    setDistrictModalVisible(false);
  };

  const renderCityItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleCitySelect(item)}
    >
      <Text style={styles.listItemText}>{item}</Text>
      <Ionicons name="chevron-forward" size={16} color={COLORS.GRAY} />
    </TouchableOpacity>
  );

  const renderDistrictItem = ({ item }) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => handleDistrictSelect(item)}
    >
      <Text style={styles.listItemText}>{item}</Text>
      <Ionicons name="chevron-forward" size={16} color={COLORS.GRAY} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* City Picker */}
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setCityModalVisible(true)}
      >
        <Ionicons name="location" size={20} color={COLORS.GRAY} />
        <Text style={[styles.pickerText, !selectedCity && styles.placeholderText]}>
          {selectedCity || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={COLORS.GRAY} />
      </TouchableOpacity>

      {/* District Picker - only show if city is selected */}
      {selectedCity && (
        <TouchableOpacity
          style={[styles.pickerButton, styles.districtPicker]}
          onPress={() => setDistrictModalVisible(true)}
        >
          <Ionicons name="business" size={20} color={COLORS.GRAY} />
          <Text style={[styles.pickerText, !selectedDistrict && styles.placeholderText]}>
            {selectedDistrict || districtPlaceholder}
          </Text>
          <Ionicons name="chevron-down" size={20} color={COLORS.GRAY} />
        </TouchableOpacity>
      )}

      {/* City Modal */}
      <Modal
        visible={cityModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCityModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Şehir Seçin</Text>
              <TouchableOpacity onPress={() => setCityModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.GRAY} />
              </TouchableOpacity>
            </View>

            <View style={styles.searchContainer}>
              <Ionicons name="search" size={20} color={COLORS.GRAY} />
              <TextInput
                style={styles.searchInput}
                placeholder="Şehir ara..."
                value={searchText}
                onChangeText={setSearchText}
                placeholderTextColor={COLORS.GRAY}
              />
            </View>

            <FlatList
              data={filteredCities}
              renderItem={renderCityItem}
              keyExtractor={(item) => item}
              style={styles.list}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

      {/* District Modal */}
      <Modal
        visible={districtModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setDistrictModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{selectedCity} İlçeleri</Text>
              <TouchableOpacity onPress={() => setDistrictModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.GRAY} />
              </TouchableOpacity>
            </View>

            <FlatList
              data={districts}
              renderItem={renderDistrictItem}
              keyExtractor={(item) => item}
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
    gap: Sizes.spacing.m,
  },
  pickerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: Sizes.spacing.m,
    paddingVertical: Sizes.spacing.m,
    gap: Sizes.spacing.s,
  },
  districtPicker: {
    marginTop: 0,
  },
  pickerText: {
    flex: 1,
    fontSize: getFontSize(16),
    color: COLORS.BLACK,
  },
  placeholderText: {
    color: COLORS.GRAY,
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
  listItemText: {
    fontSize: getFontSize(16),
    color: COLORS.BLACK,
  },
});

export default CityDistrictPicker;