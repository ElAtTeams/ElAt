import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS } from '../../constants';
import { Sizes, getFontSize } from '../../utils/dimensions';
import authService from '../../services/authService';
import { useAuth } from '../../contexts/AuthContext';
import LoadingOverlay from '../../components/common/LoadingOverlay';
import ThemedAlert from '../../components/common/ThemedAlert';
import PhoneNumberInput from '../../components/common/PhoneNumberInput';
import CityDistrictPicker from '../../components/common/CityDistrictPicker';
import InterestsPicker from '../../components/common/InterestsPicker';

// Steps tanımını component dışına taşıyalım
const steps = [
  {
    title: "Kişisel Bilgiler",
    subtitle: "Sizi tanıyalım ve profilinizi oluşturalım",
    icon: "person-circle-outline",
    color: "#6366f1",
    fields: ["firstName", "lastName", "phone"]
  },
  {
    title: "Konum Bilgileri", 
    subtitle: "Çevrenizdeki komşularınızı bulalım",
    icon: "location-outline",
    color: "#10b981",
    fields: ["address", "location"]
  },
  {
    title: "Hakkınızda",
    subtitle: "Kendinizi tanıtın ve ilgi alanlarınızı paylaşın",
    icon: "heart-outline",
    color: "#f59e0b",
    fields: ["bio", "interests"]
  }
];

export default function OnboardingScreen({ navigation, route }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phoneCode: { code: '+90', country: 'Türkiye', flag: '🇹🇷' },
    phoneNumber: '',
    address: '',
    city: '',
    district: '',
    bio: '',
    interests: []
  });
  const [alert, setAlert] = useState({ visible: false, type: 'info', title: '', message: '' });
  
  // Auth context'ten bilgileri al
  const { user, token, loading, completeOnboarding } = useAuth();

  const currentStepData = steps[currentStep];

  // Form değer güncellemesi
  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Sonraki adıma geçme
  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  // Geri gitme
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const showAlert = (type, title, message) => {
    setAlert({ visible: true, type, title, message });
  };

  // Form gönderme
  const handleSubmit = async () => {
    console.log('HandleSubmit - User:', user); // Debug için
    console.log('HandleSubmit - Token:', token); // Debug için
    
    if (!user?.id) {
      showAlert('error', 'Hata', 'Kullanıcı bilgisi bulunamadı. Lütfen tekrar giriş yapın.');
      navigation.navigate('Login');
      return;
    }
    
    if (!token) {
      showAlert('error', 'Hata', 'Oturum süresi dolmuş. Lütfen tekrar giriş yapın.');
      navigation.navigate('Login');
      return;
    }
    
    try {
      // Format phone number
      const fullPhone = formData.phoneNumber ? 
        `${formData.phoneCode.code}${formData.phoneNumber}` : '';
      
      // Format interests array to string
      const interestsString = Array.isArray(formData.interests) ? 
        formData.interests.join(', ') : formData.interests;
      
      const profileData = {
        userId: user.id,
        firstName: formData.firstName || user.firstName,
        lastName: formData.lastName || user.lastName,
        phone: fullPhone,
        address: formData.address,
        city: formData.city,
        district: formData.district,
        bio: formData.bio,
        interests: interestsString,
        isOnboardingComplete: true
      };
      
      const result = await completeOnboarding(profileData);
      
      if (result.success) {
        // Success screen'e yönlendir
        navigation.navigate('SuccessScreen', {
          title: 'Profil Tamamlandı! 🎉',
          message: `Hoş geldin ${user.firstName}! Profilin başarıyla oluşturuldu. Artık komşularınla bağlantı kurabilirsin.`,
          buttonText: 'Uygulamayı Keşfet',
          onButtonPress: () => {
            console.log('Onboarding tamamlandı, ana ekrana yönlendiriliyor');
          }
        });
      } else {
        showAlert('error', 'Hata', result.error || 'Profil güncellenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error("Profil güncelleme hatası:", error);
      showAlert('error', 'Hata', 'Beklenmeyen bir hata oluştu.');
    }
  };

  // Skip fonksiyonu
  const handleSkip = async () => {
    Alert.alert(
      'Profili Atla',
      'Profilinizi şimdi tamamlamak istemiyorsanız daha sonra ayarlar bölümünden düzenleyebilirsiniz.',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Atla', 
          onPress: async () => {
            // Onboarding'i tamamlanmış olarak işaretle
            await completeOnboarding({});
          }
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardContainer}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={currentStep === 0 ? () => navigation.goBack() : handleBack}
          >
            <Ionicons name="chevron-back" size={24} color={COLORS.PRIMARY} />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipText}>Atla</Text>
          </TouchableOpacity>
        </View>

        {/* Progress Bar */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View 
              style={[
                styles.progressFill, 
                { width: `${((currentStep + 1) / steps.length) * 100}%` }
              ]} 
            />
          </View>
          <Text style={styles.progressText}>
            {currentStep + 1} / {steps.length}
          </Text>
        </View>

        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Step Header */}
          <View style={styles.stepHeader}>
            <View style={[styles.iconContainer, { backgroundColor: currentStepData.color }]}>
              <Ionicons name={currentStepData.icon} size={32} color="white" />
            </View>
            <Text style={styles.stepTitle}>{currentStepData.title}</Text>
            <Text style={styles.stepSubtitle}>{currentStepData.subtitle}</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            {currentStepData.fields.map((field) => (
              <View key={field} style={styles.inputContainer}>
                <Text style={styles.inputLabel}>{getFieldLabel(field)}</Text>
                
                {(() => {
                  switch (field) {
                    case 'phone':
                      return (
                        <PhoneNumberInput
                          selectedCode={formData.phoneCode}
                          phoneNumber={formData.phoneNumber}
                          onCodeSelect={(code) => setFormData(prev => ({ ...prev, phoneCode: code }))}
                          onPhoneChange={(number) => setFormData(prev => ({ ...prev, phoneNumber: number }))}
                        />
                      );
                    
                    case 'location':
                      return (
                        <CityDistrictPicker
                          selectedCity={formData.city}
                          selectedDistrict={formData.district}
                          onCitySelect={(city) => setFormData(prev => ({ ...prev, city, district: '' }))}
                          onDistrictSelect={(district) => setFormData(prev => ({ ...prev, district }))}
                        />
                      );
                    
                    case 'interests':
                      return (
                        <InterestsPicker
                          selectedInterests={formData.interests}
                          onInterestsChange={(interests) => setFormData(prev => ({ ...prev, interests }))}
                        />
                      );
                    
                    default:
                      return (
                        <InputField
                          icon={getFieldIcon(field)}
                          value={formData[field]}
                          onChangeText={(text) => updateFormData(field, text)}
                          placeholder={getFieldPlaceholder(field)}
                          multiline={field === 'bio'}
                          numberOfLines={field === 'bio' ? 4 : 1}
                          style={field === 'bio' ? styles.textArea : null}
                        />
                      );
                  }
                })()}
              </View>
            ))}
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomContainer}>
          <TouchableOpacity 
            style={[styles.nextButton, { backgroundColor: currentStepData.color }]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {currentStep === steps.length - 1 ? 'Tamamla' : 'Devam Et'}
            </Text>
            <Ionicons 
              name={currentStep === steps.length - 1 ? "checkmark" : "chevron-forward"} 
              size={20} 
              color="white" 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Loading Overlay */}
      <LoadingOverlay visible={loading} />

      {/* Themed Alert */}
      <ThemedAlert
        visible={alert.visible}
        type={alert.type}
        title={alert.title}
        message={alert.message}
        onClose={() => setAlert({ ...alert, visible: false })}
      />
    </SafeAreaView>
  );
}

// InputField component
const InputField = ({ icon, style, ...props }) => {
  return (
    <View style={[styles.inputWrapper, style]}>
      <Ionicons name={icon} size={20} color={COLORS.GRAY} style={styles.inputIcon} />
      <TextInput
        style={[styles.input, props.multiline && styles.multilineInput]}
        placeholderTextColor={COLORS.LIGHT_GRAY}
        {...props}
      />
    </View>
  );
};

// Helper functions
function getFieldLabel(field) {
  const labels = {
    firstName: 'Ad',
    lastName: 'Soyad',
    phone: 'Telefon',
    address: 'Adres',
    city: 'Şehir',
    district: 'İlçe',
    bio: 'Hakkınızda',
    interests: 'İlgi Alanları'
  };
  return labels[field] || field;
}

function getFieldIcon(field) {
  const icons = {
    firstName: 'person-outline',
    lastName: 'person-outline',
    phone: 'call-outline',
    address: 'home-outline',
    city: 'business-outline',
    district: 'location-outline',
    bio: 'document-text-outline',
    interests: 'heart-outline'
  };
  return icons[field] || 'text-outline';
}

function getFieldPlaceholder(field) {
  const placeholders = {
    firstName: 'Adınızı girin',
    lastName: 'Soyadınızı girin',
    phone: 'Telefon numaranızı girin',
    address: 'Adresinizi girin',
    city: 'Şehrinizi girin',
    district: 'İlçenizi girin',
    bio: 'Kendinizden bahsedin...',
    interests: 'İlgi alanlarınızı yazın...'
  };
  return placeholders[field] || `${field} girin`;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  keyboardContainer: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing.l,
    paddingVertical: Sizes.spacing.m,
  },
  backButton: {
    padding: Sizes.spacing.s,
  },
  skipButton: {
    padding: Sizes.spacing.s,
  },
  skipText: {
    fontSize: getFontSize(16),
    color: COLORS.PRIMARY,
    fontWeight: '500',
  },
  progressContainer: {
    paddingHorizontal: Sizes.spacing.l,
    paddingBottom: Sizes.spacing.l,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#e5e7eb',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 2,
  },
  progressText: {
    textAlign: 'center',
    marginTop: Sizes.spacing.s,
    fontSize: getFontSize(12),
    color: COLORS.GRAY,
  },
  scrollContainer: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: Sizes.spacing.l,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: Sizes.spacing.xl,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.spacing.m,
  },
  stepTitle: {
    fontSize: getFontSize(24),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: Sizes.spacing.s,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: getFontSize(16),
    color: COLORS.GRAY,
    textAlign: 'center',
    lineHeight: 24,
  },
  formContainer: {
    marginBottom: Sizes.spacing.xl,
  },
  inputContainer: {
    marginBottom: Sizes.spacing.l,
  },
  inputLabel: {
    fontSize: getFontSize(16),
    fontWeight: '500',
    color: COLORS.BLACK,
    marginBottom: Sizes.spacing.s,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#f8fafc',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    paddingHorizontal: Sizes.spacing.m,
    paddingVertical: Sizes.spacing.m,
  },
  inputIcon: {
    marginRight: Sizes.spacing.s,
    marginTop: 2,
  },
  input: {
    flex: 1,
    fontSize: getFontSize(16),
    color: COLORS.BLACK,
    paddingVertical: 0,
  },
  multilineInput: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  textArea: {
    alignItems: 'flex-start',
  },
  bottomContainer: {
    paddingHorizontal: Sizes.spacing.l,
    paddingVertical: Sizes.spacing.l,
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.spacing.m,
    borderRadius: 12,
  },
  nextButtonText: {
    fontSize: getFontSize(18),
    fontWeight: '600',
    color: 'white',
    marginRight: Sizes.spacing.s,
  },
});