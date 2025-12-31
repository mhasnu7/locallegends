import { ImageSourcePropType } from 'react-native';

export interface GalleryItem {
  id: string;
  categoryId: string;
  image: ImageSourcePropType;
  caption: string;
}

export const GALLERY_DATA: GalleryItem[] = [
  // Stainless Steel (3)
  {
    id: 'ss1',
    categoryId: '7',
    image: require('../assets/images/SS1.jpg'),
    caption: 'Custom Stainless Steel Railing',
  },
  {
    id: 'ss2',
    categoryId: '7',
    image: require('../assets/images/SS2.jpg'),
    caption: 'Stainless Steel Kitchen Fabrication',
  },
  {
    id: 'ss3',
    categoryId: '7',
    image: require('../assets/images/SS3.jpg'),
    caption: 'SS Balcony Safety Grill',
  },

  // Mild Steel (4)
  {
    id: 'ms1',
    categoryId: '7',
    image: require('../assets/images/MS1.jpg'),
    caption: 'Heavy Duty Mild Steel Gate',
  },
  {
    id: 'ms2',
    categoryId: '7',
    image: require('../assets/images/MS2.jpg'),
    caption: 'MS Staircase Railing',
  },
  {
    id: 'ms3',
    categoryId: '7',
    image: require('../assets/images/MS3.jpg'),
    caption: 'Industrial MS Fabrication Work',
  },
  {
    id: 'ms4',
    categoryId: '7',
    image: require('../assets/images/MS4.jpg'),
    caption: 'Custom MS Window Grill',
  },

  // Aluminium (2)
  {
    id: 'al1',
    categoryId: '7',
    image: require('../assets/images/Aluminium1.jpg'),
    caption: 'Aluminium Window Frame',
  },
  {
    id: 'al2',
    categoryId: '7',
    image: require('../assets/images/Aluminium2.jpg'),
    caption: 'Sliding Aluminium Partition',
  },
];

export const getGalleryByCategoryId = (categoryId: string) => {
  return GALLERY_DATA.filter(item => item.categoryId === categoryId);
};
