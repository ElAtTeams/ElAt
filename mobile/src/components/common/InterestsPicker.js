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
import { INTERESTS_DATA } from '../../constants/data';

const InterestsPicker = ({ 
  selectedInterests, 
  onInterestsChange,
  placeholder = "İlgi alanlarınızı seçin",
  maxSelections = 10
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchText, setSearchText] = useState('');

  const categories = Object.keys(INTERESTS_DATA);
  
  const getSelectedInterestsText = () => {
    if (selectedInterests.length === 0) return placeholder;
    if (selectedInterests.length <= 3) {
      return selectedInterests.join(', ');
    }
    return `${selectedInterests.slice(0, 3).join(', ')} ve ${selectedInterests.length - 3} tane daha`;
  };

  const toggleInterest = (interest) => {
    const isSelected = selectedInterests.includes(interest);
    let newInterests;
    
    if (isSelected) {
      newInterests = selectedInterests.filter(item => item !== interest);
    } else {
      if (selectedInterests.length >= maxSelections) {
        return; // Max limit reached
      }
      newInterests = [...selectedInterests, interest];
    }
    
    onInterestsChange(newInterests);
  };

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={styles.categoryItem}
      onPress={() => setSelectedCategory(item)}
    >
      <Text style={styles.categoryTitle}>{item}</Text>
      <View style={styles.categoryInfo}>
        <Text style={styles.categoryCount}>
          {INTERESTS_DATA[item].length} seçenek
        </Text>
        <Ionicons name="chevron-forward" size={16} color={COLORS.GRAY} />
      </View>
    </TouchableOpacity>
  );

  const renderInterestItem = ({ item }) => {
    const isSelected = selectedInterests.includes(item);
    const isMaxReached = selectedInterests.length >= maxSelections && !isSelected;
    
    return (
      <TouchableOpacity
        style={[
          styles.interestItem,
          isSelected && styles.selectedInterestItem,
          isMaxReached && styles.disabledInterestItem
        ]}
        onPress={() => toggleInterest(item)}
        disabled={isMaxReached}
      >
        <Text style={[
          styles.interestText,
          isSelected && styles.selectedInterestText,
          isMaxReached && styles.disabledInterestText
        ]}>
          {item}
        </Text>
        {isSelected && (
          <Ionicons name="checkmark" size={16} color={COLORS.PRIMARY} />
        )}
      </TouchableOpacity>
    );
  };

  const filteredInterests = selectedCategory ? 
    INTERESTS_DATA[selectedCategory].filter(interest =>
      interest.toLowerCase().includes(searchText.toLowerCase())
    ) : [];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.pickerButton}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons name="heart" size={20} color={COLORS.GRAY} />
        <Text style={[
          styles.pickerText, 
          selectedInterests.length === 0 && styles.placeholderText
        ]}>
          {getSelectedInterestsText()}
        </Text>
        <View style={styles.rightSection}>
          {selectedInterests.length > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{selectedInterests.length}</Text>
            </View>
          )}
          <Ionicons name="chevron-down" size={20} color={COLORS.GRAY} />
        </View>
      </TouchableOpacity>

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View style={styles.modalHeader}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => selectedCategory ? setSelectedCategory(null) : setModalVisible(false)}
              >
                <Ionicons name="chevron-back" size={24} color={COLORS.PRIMARY} />
              </TouchableOpacity>
              <Text style={styles.modalTitle}>
                {selectedCategory || 'İlgi Alanları'}
              </Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={24} color={COLORS.GRAY} />
              </TouchableOpacity>
            </View>

            {selectedCategory && (
              <View style={styles.selectedCount}>
                <Text style={styles.selectedCountText}>
                  {selectedInterests.length}/{maxSelections} seçildi
                </Text>
              </View>
            )}

            {selectedCategory && (
              <View style={styles.searchContainer}>
                <Ionicons name="search" size={20} color={COLORS.GRAY} />
                <TextInput
                  style={styles.searchInput}
                  placeholder="İlgi alanı ara..."
                  value={searchText}
                  onChangeText={setSearchText}
                  placeholderTextColor={COLORS.GRAY}
                />
              </View>
            )}

            <FlatList
              data={selectedCategory ? filteredInterests : categories}
              renderItem={selectedCategory ? renderInterestItem : renderCategoryItem}
              keyExtractor={(item) => item}
              style={styles.list}
              showsVerticalScrollIndicator={false}
              numColumns={selectedCategory ? 2 : 1}
              key={selectedCategory ? 'interests' : 'categories'}
            />

            {selectedInterests.length > 0 && (
              <View style={styles.selectedInterestsContainer}>
                <Text style={styles.selectedInterestsTitle}>Seçilen İlgi Alanları:</Text>
                <View style={styles.selectedInterestsTags}>
                  {selectedInterests.map((interest) => (
                    <TouchableOpacity
                      key={interest}
                      style={styles.selectedTag}
                      onPress={() => toggleInterest(interest)}
                    >
                      <Text style={styles.selectedTagText}>{interest}</Text>
                      <Ionicons name="close" size={14} color={COLORS.PRIMARY} />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            )}
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
    minHeight: 50,
  },
  pickerText: {
    flex: 1,
    fontSize: getFontSize(16),
    color: COLORS.BLACK,
    lineHeight: 20,
  },
  placeholderText: {
    color: COLORS.GRAY,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.spacing.xs,
  },
  badge: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 6,
    paddingVertical: 2,
    minWidth: 20,
    alignItems: 'center',
  },
  badgeText: {
    fontSize: getFontSize(10),
    color: COLORS.WHITE,
    fontWeight: 'bold',
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
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: Sizes.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  backButton: {
    width: 30,
  },
  modalTitle: {
    fontSize: getFontSize(18),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    flex: 1,
    textAlign: 'center',
  },
  selectedCount: {
    paddingHorizontal: Sizes.spacing.l,
    paddingVertical: Sizes.spacing.s,
    backgroundColor: COLORS.SECONDARY,
  },
  selectedCountText: {
    fontSize: getFontSize(12),
    color: COLORS.PRIMARY,
    fontWeight: '600',
    textAlign: 'center',
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
    flex: 1,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing.l,
    paddingVertical: Sizes.spacing.l,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  categoryTitle: {
    fontSize: getFontSize(16),
    fontWeight: '500',
    color: COLORS.BLACK,
  },
  categoryInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Sizes.spacing.s,
  },
  categoryCount: {
    fontSize: getFontSize(12),
    color: COLORS.GRAY,
  },
  interestItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 4,
    paddingHorizontal: Sizes.spacing.m,
    paddingVertical: Sizes.spacing.s,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    backgroundColor: COLORS.WHITE,
    flex: 1,
  },
  selectedInterestItem: {
    backgroundColor: COLORS.SECONDARY,
    borderColor: COLORS.PRIMARY,
  },
  disabledInterestItem: {
    opacity: 0.5,
  },
  interestText: {
    fontSize: getFontSize(14),
    color: COLORS.BLACK,
    flex: 1,
  },
  selectedInterestText: {
    color: COLORS.PRIMARY,
    fontWeight: '500',
  },
  disabledInterestText: {
    color: COLORS.GRAY,
  },
  selectedInterestsContainer: {
    padding: Sizes.spacing.l,
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    backgroundColor: '#f8fafc',
  },
  selectedInterestsTitle: {
    fontSize: getFontSize(14),
    fontWeight: '600',
    color: COLORS.BLACK,
    marginBottom: Sizes.spacing.s,
  },
  selectedInterestsTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Sizes.spacing.xs,
  },
  selectedTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: Sizes.spacing.s,
    paddingVertical: Sizes.spacing.xs,
    borderRadius: 16,
    gap: Sizes.spacing.xs,
  },
  selectedTagText: {
    fontSize: getFontSize(12),
    color: COLORS.WHITE,
    fontWeight: '500',
  },
});

export default InterestsPicker;