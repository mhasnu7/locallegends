import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, Dimensions } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { Spacing } from '../theme/spacing';
import { Colors, styles as globalStyles } from '../theme/colors';
import { getGalleryByCategoryId, GalleryItem } from '../data/gallery';

const { width } = Dimensions.get('window');
const NUM_COLUMNS = 2;
const ITEM_MARGIN = Spacing.sm;
const ITEM_SIZE = (width - (ITEM_MARGIN * (NUM_COLUMNS + 1))) / NUM_COLUMNS;

type GalleryScreenProps = StackScreenProps<RootStackParamList, 'Gallery'>;

const GalleryScreen: React.FC<GalleryScreenProps> = ({ route }) => {
  const { categoryId, categoryTitle } = route.params;

  const galleryData = getGalleryByCategoryId(categoryId);

  const renderItem = ({ item }: { item: GalleryItem }) => (
    <View style={styles.imageContainer}>
      <Image 
        source={item.image}
        style={styles.image}
      />
      <Text style={styles.captionText}>{item.caption}</Text>
    </View>
  );

  return (
    <View style={globalStyles.container}>
      <Text style={styles.headerText}>{categoryTitle} - Work Gallery</Text>
      {galleryData.length > 0 ? (
        <FlatList
          data={galleryData}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          numColumns={NUM_COLUMNS}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No work samples found yet.</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontSize: Spacing.lg,
    fontWeight: 'bold',
    color: Colors.textPrimary,
    margin: Spacing.md,
  },
  listContainer: {
    paddingHorizontal: ITEM_MARGIN,
    paddingVertical: Spacing.sm,
  },
  imageContainer: {
    flex: 1,
    margin: ITEM_MARGIN / 2,
    backgroundColor: Colors.white,
    borderRadius: Spacing.sm,
    overflow: 'hidden',
    elevation: 3,
  },
  image: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
    resizeMode: 'cover',
  },
  captionText: {
    padding: Spacing.sm,
    fontSize: Spacing.sm,
    color: Colors.textPrimary,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xl,
  },
  emptyText: {
    fontSize: Spacing.md,
    color: Colors.textSecondary,
    textAlign: 'center',
  }
});

export default GalleryScreen;
