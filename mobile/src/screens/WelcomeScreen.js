import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Sizes, getFontSize, getSize } from '../utils/dimensions';
import { COLORS, THEME } from '../constants';

const { width } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const slides = [
  {
    id: '1',
    title: 'Komşularınla Tanış',
    description: 'Çevrende yaşayan insanlarla güvenli bir şekilde tanış ve topluluk oluştur.',
    icon: '👋',
    gradient: ['#667eea', '#764ba2'],
    bgColor: '#f8faff',
  },
  {
    id: '2',
    title: 'Yardım İste & Ver',
    description: 'İhtiyacın olduğunda yardım iste, sen de başkalarına destek ol.',
    icon: '�',
    gradient: ['#f093fb', '#f5576c'],
    bgColor: '#fff5f8',
  },
  {
    id: '3',
    title: 'Eşya Değişimi',
    description: 'Kullanmadığın eşyaları paylaş, ihtiyacın olanları bul.',
    icon: '♻️',
    gradient: ['#4facfe', '#00f2fe'],
    bgColor: '#f0fdff',
  },
  {
    id: '4',
    title: 'Güvenli İletişim',
    description: 'Korunmuş mesajlaşma ile komşularınla güvenle iletişim kur.',
    icon: '�',
    gradient: ['#43e97b', '#38f9d7'],
    bgColor: '#f0fff4',
  },
];

export default function WelcomeScreen({ navigation }) {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  const viewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setCurrentIndex(viewableItems[0].index);
    }
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const scrollTo = () => {
    if (currentIndex < slides.length - 1) {
      slidesRef.current?.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const renderSlide = ({ item, index }) => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const translateX = scrollX.interpolate({
      inputRange,
      outputRange: [width * 0.1, 0, -width * 0.1],
      extrapolate: 'clamp',
    });

    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    const opacity = scrollX.interpolate({
      inputRange,
      outputRange: [0.5, 1, 0.5],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.slideContainer}>
        <Animated.View
          style={[
            styles.slideContent,
            { opacity, transform: [{ translateX }, { scale }] },
          ]}
        >
          <View style={styles.iconWrapper}>
            <View style={[styles.iconContainer, { 
              backgroundColor: COLORS.WHITE
            }]}>
              <Text style={styles.iconText}>{item.icon}</Text>
            </View>
          </View>
          
          <View style={styles.textContainer}>
            <Text style={styles.slideTitle}>{item.title}</Text>
            <Text style={styles.slideDescription}>{item.description}</Text>
          </View>
        </Animated.View>
      </View>
    );
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const nextIndex = currentIndex === slides.length - 1 ? 0 : currentIndex + 1;
      try {
        slidesRef.current?.scrollToIndex({ 
          index: nextIndex, 
          animated: true,
          viewPosition: 0.5 
        });
      } catch (error) {
        console.log('Auto-scroll error:', error);
      }
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const Pagination = () => {
    return (
      <View style={styles.paginationContainer}>
        {slides.map((_, index) => {
          const inputRange = [(index - 1) * width, index * width, (index + 1) * width];

          const scale = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.2, 1],
            extrapolate: 'clamp',
          });

          const scaleX = scrollX.interpolate({
            inputRange,
            outputRange: [1, 2.5, 1],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.4, 1, 0.4],
            extrapolate: 'clamp',
          });

          return (
            <Animated.View
              key={index.toString()}
              style={[
                styles.dot,
                {
                  opacity,
                  transform: [{ scale }],
                  backgroundColor: index === currentIndex ? COLORS.PRIMARY : COLORS.GRAY + '40',
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
      
      {/* Header with gradient background */}
      <View style={styles.headerContainer}>
        <View style={styles.headerGradient} />
        <SafeAreaView style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>ElAt</Text>
            {/* Logo shadow kaldırıldı */}
          </View>
          <Text style={styles.welcomeText}>Komşuluk Uygulaması</Text>
          <Text style={styles.subtitle}>Çevrende yaşayanlarla bağlan</Text>
        </SafeAreaView>
      </View>

      <AnimatedFlatList
        ref={slidesRef}
        data={slides}
        renderItem={renderSlide}
        keyExtractor={(item) => item.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: true }
        )}
        onViewableItemsChanged={viewableItemsChanged}
        viewabilityConfig={viewConfig}
        scrollEventThrottle={32}
        initialNumToRender={1}
        maxToRenderPerBatch={1}
        windowSize={3}
        removeClippedSubviews={true}
        contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
      />

      <Pagination />

      {/* Bottom buttons with floating design */}
      <SafeAreaView style={styles.bottomContainer}>
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.registerButton}
            onPress={() => navigation.navigate('Register')}
            activeOpacity={0.8}
          >
            <View style={styles.buttonGradient} />
            <Text style={styles.registerButtonText}>✨ Hemen Başla</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => navigation.navigate('Login')}
            activeOpacity={0.7}
          >
            <Text style={styles.loginButtonText}>Zaten hesabım var</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafbff',
  },
  
  // Header Styles
  headerContainer: {
    position: 'relative',
    paddingBottom: Sizes.spacing.xl,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: getSize(180, 200),
    backgroundColor: COLORS.PRIMARY,
    borderBottomLeftRadius: getSize(30, 35),
    borderBottomRightRadius: getSize(30, 35),
    opacity: 0.1,
  },
  header: {
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing.l,
    paddingTop: Sizes.spacing.xl,
    paddingBottom: Sizes.spacing.l,
  },
  logoContainer: {
    position: 'relative',
    width: getSize(90, 100),
    height: getSize(90, 100),
    borderRadius: getSize(45, 50),
    backgroundColor: COLORS.WHITE,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Sizes.spacing.l,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  logoShadow: {
    display: 'none', // Gradient kullanılmıyor
  },
  logo: {
    fontSize: getFontSize(32, 36),
    fontWeight: 'bold',
    color: COLORS.PRIMARY,
    letterSpacing: 2,
  },
  welcomeText: {
    fontSize: getFontSize(26, 30),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: Sizes.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: getFontSize(16, 18),
    textAlign: 'center',
    color: COLORS.GRAY,
    lineHeight: getSize(22, 25),
    opacity: 0.8,
  },
  slideContainer: {
    width,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: Sizes.spacing.l,
    paddingVertical: Sizes.spacing.m,
    borderRadius: getSize(25, 30),
  },
  slideContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Sizes.spacing.l,
  },
  iconWrapper: {
    position: 'relative',
    marginBottom: Sizes.spacing.xl,
  },
  iconContainer: {
    width: getSize(120, 140),
    height: getSize(120, 140),
    borderRadius: getSize(60, 70),
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 15,
    elevation: 8,
  },
  iconGlow: {
    position: 'absolute',
    width: getSize(140, 160),
    height: getSize(140, 160),
    borderRadius: getSize(70, 80),
    top: -10,
    left: -10,
    zIndex: -1,
    opacity: 0.3,
  },
  iconText: {
    fontSize: getFontSize(50, 60),
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: Sizes.spacing.s,
  },
  slideTitle: {
    fontSize: getFontSize(24, 28),
    fontWeight: 'bold',
    color: COLORS.BLACK,
    marginBottom: Sizes.spacing.m,
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  slideDescription: {
    fontSize: getFontSize(16, 18),
    color: COLORS.GRAY,
    textAlign: 'center',
    lineHeight: getSize(24, 28),
    paddingHorizontal: Sizes.spacing.s,
    opacity: 0.9,
  },
  
  // Pagination Styles
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: Sizes.spacing.l,
  },
  dot: {
    width: getSize(12, 14),
    height: getSize(12, 14),
    borderRadius: getSize(6, 7),
    backgroundColor: COLORS.PRIMARY,
    marginHorizontal: Sizes.spacing.xs,
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  
  // Button Styles
  bottomContainer: {
    backgroundColor: COLORS.WHITE,
    paddingTop: Sizes.spacing.l,
    borderTopLeftRadius: getSize(25, 30),
    borderTopRightRadius: getSize(25, 30),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  buttons: {
    paddingHorizontal: Sizes.spacing.l,
    paddingBottom: Sizes.spacing.l,
    gap: Sizes.spacing.m,
  },
  registerButton: {
    position: 'relative',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: THEME.BORDER_RADIUS.LARGE,
    height: getSize(56, 60),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: COLORS.PRIMARY,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  buttonGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  registerButtonText: {
    color: COLORS.WHITE,
    fontSize: getFontSize(18, 20),
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  loginButton: {
    backgroundColor: 'transparent',
    borderRadius: THEME.BORDER_RADIUS.LARGE,
    height: getSize(50, 54),
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: COLORS.GRAY,
    fontSize: getFontSize(16, 18),
    fontWeight: '600',
    opacity: 0.8,
  },
});