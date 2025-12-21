import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Image,
  TouchableOpacity,
  NativeScrollEvent,
  NativeSyntheticEvent,
} from 'react-native';
import { PROMOTIONS } from '../data/promotions';
import { Colors } from '../theme/colors';
import { Spacing } from '../theme/spacing';

const { width: screenWidth } = Dimensions.get('window');
const CARD_WIDTH = screenWidth * 0.85; 
const CARD_HEIGHT = 160;
const CARD_MARGIN = Spacing.md; 

interface PromotionItemProps {
  item: typeof PROMOTIONS[0];
}

const PromotionItem: React.FC<PromotionItemProps> = ({ item }) => {
  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.9}
        onPress={() => console.log('Promotion pressed:', item.id)}
      >
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textOverlay}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.subtitle}>{item.subtitle}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const PromotionsBanner: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  
  // Auto-slide effect: scrolls to next item every 5 seconds
  useEffect(() => {
    if (PROMOTIONS.length <= 1) return;

    const timer = setInterval(() => {
      const nextIndex = (currentIndex + 1) % PROMOTIONS.length;
      
      flatListRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });
      
      setCurrentIndex(nextIndex);
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIndex]);

  const handleManualScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffsetX / (CARD_WIDTH + CARD_MARGIN));
    
    // Update index to sync with manual swipe and reset the timer
    if (index !== currentIndex && index >= 0 && index < PROMOTIONS.length) {
      setCurrentIndex(index);
    }
  };

  const getItemLayout = (_: any, index: number) => ({
    length: CARD_WIDTH + CARD_MARGIN,
    offset: (CARD_WIDTH + CARD_MARGIN) * index,
    index,
  });

  return (
    <View style={styles.bannerContainer}>
      <FlatList
        ref={flatListRef}
        data={PROMOTIONS}
        renderItem={({ item }) => <PromotionItem item={item} />}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        snapToInterval={CARD_WIDTH + CARD_MARGIN}
        decelerationRate="fast"
        snapToAlignment="start"
        getItemLayout={getItemLayout}
        onMomentumScrollEnd={handleManualScroll}
        onScrollToIndexFailed={(info) => {
          // Fallback if scroll fails (e.g. index not yet rendered)
          flatListRef.current?.scrollToOffset({
            offset: info.averageItemLength * info.index,
            animated: true,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  bannerContainer: {
    marginVertical: Spacing.sm,
    width: '100%',
  },
  listContent: {
    paddingHorizontal: Spacing.md,
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    marginRight: CARD_MARGIN,
    borderRadius: 12,
    backgroundColor: Colors.cardBackground,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  card: {
    flex: 1,
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
  },
  textOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    padding: Spacing.md,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  subtitle: {
    color: '#F0F0F0',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default PromotionsBanner;
