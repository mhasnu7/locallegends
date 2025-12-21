import React, { useState, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Platform,
  Alert,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons'; // Removed
import { REQUESTS, AVAILABLE_FILTERS, Request } from '../data/requests';

// Helper function to map Ionicons names to emojis
// Note: This helper is no longer used for dynamic icon name to emoji mapping directly
// as emojis are hardcoded where needed. Keeping this for reference if dynamic mapping is later desired.
const getEmojiForIconName = (iconName: string): string => {
  switch (iconName) {
    case 'checkmark-circle': return '✅';
    case 'hourglass': return '⏳';
    case 'chevron-down-circle': return '🔽';
    case 'call': return '📞';
    case 'logo-whatsapp': return '📱';
    default: return '❓';
  }
};

// --- Helper Functions ---

const handleCall = (phone: string) => {
  const url = `tel:${phone}`;
  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert('Call Error', 'Cannot open phone dialer.');
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

const handleWhatsApp = (phone: string) => {
  // Format phone number for WhatsApp URI scheme: +[country_code][number]
  const formattedPhone = phone.replace(/[^0-9]/g, '');
  
  // Construct URL safely
  const url = Platform.OS === 'ios'
    ? `whatsapp://send?phone=${formattedPhone}`
    : `whatsapp://send?phone=${formattedPhone}`;

  Linking.canOpenURL(url)
    .then(supported => {
      if (!supported) {
        Alert.alert(
          'WhatsApp Error',
          'WhatsApp is not installed or the number format is incorrect for direct link.'
        );
      } else {
        return Linking.openURL(url);
      }
    })
    .catch(err => console.error('An error occurred', err));
};

// --- Component: Request Card ---

interface RequestCardProps {
  request: Request;
  onToggleStatus: (id: string) => void;
}

const RequestCard: React.FC<RequestCardProps> = React.memo(({ request, onToggleStatus }) => {
  const isDone = request.status === 'Done';
  const statusEmoji = isDone ? '✅' : '⏳'; // Use emoji directly
  const statusColor = isDone ? '#4CAF50' : '#FF9800';
  const providerDisplay = request.provider || 'Unassigned';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.serviceType}>{request.serviceType}</Text>
        <View style={styles.statusContainer}>
          <Text style={[styles.statusEmoji, { color: statusColor }]}>{statusEmoji}</Text>
          <Text style={[styles.statusText, { color: statusColor }]}>{request.status}</Text>
          {/* Status Toggle Button/Dropdown (Feature 2) */}
          <TouchableOpacity
            onPress={() => onToggleStatus(request.id)}
            style={styles.statusToggle}
            accessibilityLabel={`Toggle status for request ${request.id}`}
          >
            <Text style={styles.toggleEmojiIcon}>🔽</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.description}>{request.description}</Text>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Phone:</Text>
        <Text style={styles.detailValue}>{request.phone}</Text>
      </View>

      <View style={styles.detailsRow}>
        <Text style={styles.detailLabel}>Provider:</Text>
        <Text style={styles.detailValue} numberOfLines={1}>{providerDisplay}</Text>
      </View>

      <View style={styles.actionsRow}>
        {/* Feature 4: Call Action */}
        <TouchableOpacity
          style={[styles.actionButton, styles.callButton]}
          onPress={() => handleCall(request.phone)}
        >
          <Text style={styles.actionEmojiIcon}>📞</Text>
          <Text style={styles.actionText}>Call</Text>
        </TouchableOpacity>

        {/* Feature 4: WhatsApp Action */}
        <TouchableOpacity
          style={[styles.actionButton, styles.whatsappButton]}
          onPress={() => handleWhatsApp(request.phone)}
        >
          <Text style={styles.actionEmojiIcon}>📱</Text>
          <Text style={styles.actionText}>WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
});

// --- Main Screen Component ---

const AdminDashboardScreen: React.FC = () => {
  // Initialize state with data from the shared file
  const [requests, setRequests] = useState<Request[]>(REQUESTS);
  const [filter, setFilter] = useState<'All' | string>('All');

  // Feature 3: Filtering Logic
  const filteredRequests = useMemo(() => {
    if (filter === 'All') {
      return requests;
    }
    // Filter by serviceType, which covers all listed services and 'Unlisted'
    return requests.filter(req => req.serviceType === filter);
  }, [requests, filter]);

  // Feature 2: Request Status Management
  const handleToggleStatus = useCallback((id: string) => {
    setRequests(prevRequests =>
      prevRequests.map(req => {
        if (req.id === id) {
          const newStatus: 'Pending' | 'Done' = req.status === 'Pending' ? 'Done' : 'Pending';
          return { ...req, status: newStatus };
        }
        return req;
      })
    );
  }, []);

  // Render item for FlatList
  const renderItem = useCallback(({ item }: { item: Request }) => (
    <RequestCard request={item} onToggleStatus={handleToggleStatus} />
  ), [handleToggleStatus]);

  const renderFilterButtons = () => (
    <View style={styles.filterContainer}>
          {AVAILABLE_FILTERS.map(f => (
            <TouchableOpacity
              key={f}
              style={[
                styles.filterButton,
                filter === f && styles.filterButtonActive,
              ]}
              onPress={() => setFilter(f)}
            >
              <Text
                style={[
                  styles.filterText,
                  filter === f && styles.filterTextActive,
                ]}
              >
                {f}
              </Text>
            </TouchableOpacity>
          ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Admin Dashboard</Text>

        {/* Feature 3: Provider-Wise Filtering */}
        {renderFilterButtons()}

        {/* Feature 1: Display all service requests in a scrollable list */}
        <FlatList
          data={filteredRequests}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={
            <Text style={styles.emptyText}>No requests found for filter: {filter}</Text>
          }
        />
      </View>
    </SafeAreaView>
  );
};

// --- Styles ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f4f8',
  },
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  // Filtering Styles
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 15,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#E0E0E0',
    borderWidth: 1,
    borderColor: '#CCC',
  },
  filterButtonActive: {
    backgroundColor: '#007BFF',
    borderColor: '#0056b3',
  },
  filterText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  filterTextActive: {
    color: '#FFF',
  },
  // List Styles
  listContent: {
    paddingBottom: 20,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  },
  // Card Styles
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
    paddingBottom: 5,
  },
  serviceType: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusEmoji: { // New style for status emoji
    fontSize: 20,
    marginRight: 4,
    lineHeight: 20, // Ensure emoji fits
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    marginRight: 5,
  },
  statusToggle: {
    padding: 2,
  },
  toggleEmojiIcon: { // New style for toggle emoji
    fontSize: 24,
    color: '#007BFF', // Match original color
    lineHeight: 24, // Ensure emoji fits
  },
  description: {
    fontSize: 14,
    color: '#555',
    marginBottom: 10,
  },
  detailsRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    fontWeight: '600',
    color: '#333',
    minWidth: 70,
  },
  detailValue: {
    flex: 1,
    color: '#000',
  },
  // Actions Row (Feature 4)
  actionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#EEE',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
  },
  callButton: {
    backgroundColor: '#28A745', // Green for call
  },
  whatsappButton: {
    backgroundColor: '#25D366', // WhatsApp Green
  },
  actionEmojiIcon: { // New style for action button emojis
    fontSize: 20,
    color: '#FFF', // Match original color
    marginRight: 5,
    lineHeight: 20, // Ensure emoji fits
  },
  actionText: {
    color: '#FFF',
    fontWeight: 'bold',
    // Removed marginLeft as emoji is now a sibling Text component
  },
});

export default AdminDashboardScreen;
