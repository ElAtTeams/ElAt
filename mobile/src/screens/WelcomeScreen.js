import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  FlatList,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'react-native';
import { Sizes, getFontSize,getSize } from '../utils/dimensions';

const { width } = Dimensions.get('window');

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

const slides = [
  {
    id: '1',
    title: 'Komşularınla Tanış',
    description: 'Çevrende yaşayan güvenilir komşularınla tanış, yardımlaş ve paylaş.',
    image: { uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  },
  {
    id: '2',
    title: 'Yardım İste',
    description: 'İhtiyacın olduğunda komşularından yardım isteyebilir, karşılıklı destek olabilirsin.',
    image: { uri: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  },
  {
    id: '3',
    title: 'Eşya Paylaş',
    description: 'Kullanmadığın eşyaları komşularınla paylaşabilir, ihtiyacı olanlara destek olabilirsin.',
    image: { uri: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  },
  {
    id: '4',
    title: 'Güvenle İletişim Kur',
    description: 'Güvenli mesajlaşma sistemi ile komşularınla kolayca iletişim kurabilirsin.',
    image: { uri: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=400&q=80' },
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
          <View style={styles.iconContainer}>
            <Image
              source={item.image}
              style={{
                width: getSize(120, 150),
                height: getSize(120, 150),
                borderRadius: getSize(60, 75),
              }}
              resizeMode="cover"
            />
          </View>
          <Text style={styles.slideTitle}>{item.title}</Text>
          <Text style={styles.slideDescription}>{item.description}</Text>
        </Animated.View>
      </View>
    );
  };
  // Otomatik geçiş effecti
  React.useEffect(() => {
    const timer = setInterval(() => {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= slides.length) nextIndex = 0;
      slidesRef.current?.scrollToIndex({ index: nextIndex, animated: true });
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
            outputRange: [1, 1.5, 1],
            extrapolate: 'clamp',
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
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
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.logo}>ElAt</Text>
        <Text style={styles.welcomeText}>ElAt'a hoş geldin!</Text>
        <Text style={styles.subtitle}>Komşularınla yardımlaşmanın en kolay yolu.</Text>
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
      />

      <Pagination />

      <View style={styles.buttons}>
        <TouchableOpacity
          style={styles.registerButton}
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.registerButtonText}>Üye Ol</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.loginButtonText}>Giriş Yap</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { alignItems: 'center', paddingHorizontal: Sizes.spacing.large, paddingTop: Sizes.spacing.large },
  logo: { fontSize: getFontSize(32, 38), fontWeight: 'bold', color: '#1a1a1a', marginBottom: Sizes.spacing.large },
  welcomeText: { fontSize: getFontSize(24, 28), color: '#10b981', marginBottom: Sizes.spacing.small },
  subtitle: { fontSize: getFontSize(16, 18), textAlign: 'center', color: '#666', marginBottom: Sizes.spacing.huge },
  slideContainer: { width, alignItems: 'center', paddingHorizontal: Sizes.spacing.large },
  slideContent: { alignItems: 'center', paddingVertical: Sizes.spacing.large },
  iconContainer: {
    width: getSize(160, 200), height: getSize(160, 200), borderRadius: 999,
    backgroundColor: '#f0fdf4', justifyContent: 'center', alignItems: 'center',
    marginBottom: Sizes.spacing.extraLarge, elevation: 2,
    shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4,
  },
  slideTitle: { fontSize: getFontSize(24, 28), fontWeight: 'bold', color: '#1a1a1a', marginBottom: Sizes.spacing.medium, textAlign: 'center' },
  slideDescription: {
    fontSize: getFontSize(16, 18),
    color: '#666',
    textAlign: 'center',
    lineHeight: getSize(24, 28),
    paddingHorizontal: Sizes.spacing.large,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Sizes.spacing.huge,
    marginBottom: Sizes.spacing.huge,
  },
  dot: {
    width: getSize(8, 10),
    height: getSize(8, 10),
    borderRadius: getSize(4, 5),
    backgroundColor: '#10b981',
    marginHorizontal: Sizes.spacing.xs,
  },
  buttons: { paddingHorizontal: Sizes.spacing.large, paddingBottom: Sizes.spacing.large, gap: Sizes.spacing.small },
  registerButton: { backgroundColor: '#10b981', borderRadius: 12, height: Sizes.buttonHeight.large, justifyContent: 'center', alignItems: 'center' },
  registerButtonText: { color: '#fff', fontSize: getFontSize(16, 18), fontWeight: '600' },
  loginButton: { backgroundColor: '#fff', borderRadius: 12, height: Sizes.buttonHeight.large, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#10b981' },
  loginButtonText: { color: '#10b981', fontSize: getFontSize(16, 18), fontWeight: '600' },
});