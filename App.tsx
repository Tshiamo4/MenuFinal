import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  StatusBar,
} from 'react-native';

type MenuItemType = {
  id: string;
  name: string;
  course: string;
  description: string;
  price: number;
};

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  
  // Form fields
  const [itemName, setItemName] = useState('');
  const [itemCourse, setItemCourse] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemPrice, setItemPrice] = useState('');
  
  // Filter
  const [filterCourse, setFilterCourse] = useState('');

  const addMenuItem = () => {
    if (!itemName || !itemCourse || !itemDescription || !itemPrice) {
      Alert.alert('Error', 'Please fill all fields');
      return;
    }

    const priceValue = parseFloat(itemPrice);
    if (isNaN(priceValue) || priceValue <= 0) {
      Alert.alert('Error', 'Invalid price');
      return;
    }

    const newItem: MenuItemType = {
      id: Date.now().toString(),
      name: itemName,
      course: itemCourse,
      description: itemDescription,
      price: priceValue,
    };

    setMenuItems([...menuItems, newItem]);
    Alert.alert('Success', 'Item added successfully!');
    
    // Clear form
    setItemName('');
    setItemCourse('');
    setItemDescription('');
    setItemPrice('');
  };

  const deleteMenuItem = (id: string) => {
    setMenuItems(menuItems.filter(item => item.id !== id));
    Alert.alert('Deleted', 'Item removed from menu');
  };

  const calculateAverages = () => {
    const courses = ['Starter', 'Main', 'Dessert'];
    return courses.map(course => {
      const items = menuItems.filter(item => item.course === course);
      const total = items.reduce((sum, item) => sum + item.price, 0);
      const avg = items.length > 0 ? total / items.length : 0;
      return { course, average: avg, count: items.length };
    });
  };

  const getFilteredItems = () => {
    if (filterCourse === '') return menuItems;
    return menuItems.filter(item => item.course === filterCourse);
  };

  // HOME TAB
  const renderHome = () => {
    const averages = calculateAverages();
    
    return (
      <ScrollView style={styles.tabContent}>
        <View style={styles.heroSection}>
          <Text style={styles.heroEmoji}>🍽️</Text>
          <Text style={styles.heroTitle}>TasteHub Menu</Text>
          <Text style={styles.heroSubtitle}>Professional Menu Manager</Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{menuItems.length}</Text>
          <Text style={styles.statLabel}>Total Menu Items</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Price Averages by Course</Text>
          {averages.map(avg => (
            <View key={avg.course} style={styles.avgRow}>
              <View style={styles.avgLeft}>
                <Text style={styles.avgCourse}>{avg.course}</Text>
                <Text style={styles.avgCount}>{avg.count} items</Text>
              </View>
              <Text style={styles.avgPrice}>R{avg.average.toFixed(2)}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>All Menu Items</Text>
          {menuItems.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>📋</Text>
              <Text style={styles.emptyText}>No menu items yet</Text>
              <Text style={styles.emptySubtext}>Add items using the Add tab</Text>
            </View>
          ) : (
            menuItems.map(item => (
              <View key={item.id} style={styles.menuCard}>
                <View style={styles.menuCardHeader}>
                  <Text style={styles.menuCardName}>{item.name}</Text>
                  <Text style={styles.menuCardPrice}>R{item.price.toFixed(2)}</Text>
                </View>
                <Text style={styles.menuCardCourse}>{item.course}</Text>
                <Text style={styles.menuCardDesc}>{item.description}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    );
  };

  // ADD TAB
  const renderAdd = () => {
    return (
      <ScrollView style={styles.tabContent}>
        <View style={styles.formSection}>
          <Text style={styles.formTitle}>Add New Menu Item</Text>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Item Name</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Caesar Salad"
              value={itemName}
              onChangeText={setItemName}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Course Type</Text>
            <View style={styles.chipContainer}>
              <TouchableOpacity
                style={itemCourse === 'Starter' ? styles.chipSelected : styles.chip}
                onPress={() => setItemCourse('Starter')}
              >
                <Text style={itemCourse === 'Starter' ? styles.chipTextSelected : styles.chipText}>
                  Starter
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={itemCourse === 'Main' ? styles.chipSelected : styles.chip}
                onPress={() => setItemCourse('Main')}
              >
                <Text style={itemCourse === 'Main' ? styles.chipTextSelected : styles.chipText}>
                  Main
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={itemCourse === 'Dessert' ? styles.chipSelected : styles.chip}
                onPress={() => setItemCourse('Dessert')}
              >
                <Text style={itemCourse === 'Dessert' ? styles.chipTextSelected : styles.chipText}>
                  Dessert
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.textArea}
              placeholder="Describe the dish..."
              value={itemDescription}
              onChangeText={setItemDescription}
            />
          </View>

          <View style={styles.formGroup}>
            <Text style={styles.label}>Price (ZAR)</Text>
            <TextInput
              style={styles.textInput}
              placeholder="0.00"
              value={itemPrice}
              onChangeText={setItemPrice}
              keyboardType="numeric"
            />
          </View>

          <TouchableOpacity style={styles.addButton} onPress={addMenuItem}>
            <Text style={styles.addButtonText}>✓ Add to Menu</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionHeader}>Manage Items ({menuItems.length})</Text>
          {menuItems.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyText}>No items to manage</Text>
            </View>
          ) : (
            menuItems.map(item => (
              <View key={item.id} style={styles.manageCard}>
                <View style={styles.manageLeft}>
                  <Text style={styles.manageName}>{item.name}</Text>
                  <Text style={styles.manageInfo}>{item.course} • R{item.price.toFixed(2)}</Text>
                </View>
                <TouchableOpacity
                  style={styles.deleteButton}
                  onPress={() => deleteMenuItem(item.id)}
                >
                  <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    );
  };

  // FILTER TAB
  const renderFilter = () => {
    const filteredItems = getFilteredItems();

    return (
      <ScrollView style={styles.tabContent}>
        <View style={styles.filterSection}>
          <Text style={styles.formTitle}>Filter Menu Items</Text>
          
          <View style={styles.chipContainer}>
            <TouchableOpacity
              style={filterCourse === '' ? styles.chipSelected : styles.chip}
              onPress={() => setFilterCourse('')}
            >
              <Text style={filterCourse === '' ? styles.chipTextSelected : styles.chipText}>
                All
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={filterCourse === 'Starter' ? styles.chipSelected : styles.chip}
              onPress={() => setFilterCourse('Starter')}
            >
              <Text style={filterCourse === 'Starter' ? styles.chipTextSelected : styles.chipText}>
                Starter
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={filterCourse === 'Main' ? styles.chipSelected : styles.chip}
              onPress={() => setFilterCourse('Main')}
            >
              <Text style={filterCourse === 'Main' ? styles.chipTextSelected : styles.chipText}>
                Main
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={filterCourse === 'Dessert' ? styles.chipSelected : styles.chip}
              onPress={() => setFilterCourse('Dessert')}
            >
              <Text style={filterCourse === 'Dessert' ? styles.chipTextSelected : styles.chipText}>
                Dessert
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.resultBox}>
            <Text style={styles.resultText}>
              Showing {filteredItems.length} of {menuItems.length} items
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          {filteredItems.length === 0 ? (
            <View style={styles.emptyBox}>
              <Text style={styles.emptyIcon}>🔍</Text>
              <Text style={styles.emptyText}>No items found</Text>
              <Text style={styles.emptySubtext}>Try a different filter</Text>
            </View>
          ) : (
            filteredItems.map(item => (
              <View key={item.id} style={styles.menuCard}>
                <View style={styles.menuCardHeader}>
                  <Text style={styles.menuCardName}>{item.name}</Text>
                  <Text style={styles.menuCardPrice}>R{item.price.toFixed(2)}</Text>
                </View>
                <Text style={styles.menuCardCourse}>{item.course}</Text>
                <Text style={styles.menuCardDesc}>{item.description}</Text>
              </View>
            ))
          )}
        </View>
      </ScrollView>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />
      
      <View style={styles.appContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>TasteHub</Text>
        </View>

        {/* Content Area */}
        <View style={styles.contentArea}>
          {activeTab === 'home' && renderHome()}
          {activeTab === 'add' && renderAdd()}
          {activeTab === 'filter' && renderFilter()}
        </View>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('home')}
          >
            <Text style={activeTab === 'home' ? styles.navIconActive : styles.navIcon}>🏠</Text>
            <Text style={activeTab === 'home' ? styles.navLabelActive : styles.navLabel}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('add')}
          >
            <Text style={activeTab === 'add' ? styles.navIconActive : styles.navIcon}>➕</Text>
            <Text style={activeTab === 'add' ? styles.navLabelActive : styles.navLabel}>Add</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.navItem}
            onPress={() => setActiveTab('filter')}
          >
            <Text style={activeTab === 'filter' ? styles.navIconActive : styles.navIcon}>🔍</Text>
            <Text style={activeTab === 'filter' ? styles.navLabelActive : styles.navLabel}>Filter</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  appContainer: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  contentArea: {
    flex: 1,
  },
  tabContent: {
    flex: 1,
    padding: 16,
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
  },
  heroEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  statBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 16,
  },
  statNumber: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  section: {
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  avgRow: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  avgLeft: {
    flex: 1,
  },
  avgCourse: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  avgCount: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  avgPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  menuCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  menuCardName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1a1a1a',
    flex: 1,
  },
  menuCardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  menuCardCourse: {
    fontSize: 12,
    color: '#666',
    marginBottom: 6,
  },
  menuCardDesc: {
    fontSize: 14,
    color: '#444',
    lineHeight: 20,
  },
  formSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  formTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 20,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#444',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textArea: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    fontSize: 15,
    color: '#1a1a1a',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    height: 100,
    textAlignVertical: 'top',
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  chipSelected: {
    backgroundColor: '#e74c3c',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  chipText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  chipTextSelected: {
    fontSize: 14,
    color: '#fff',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#27ae60',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  manageCard: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  manageLeft: {
    flex: 1,
  },
  manageName: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  manageInfo: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    borderRadius: 6,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  deleteButtonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  filterSection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
  },
  resultBox: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    marginTop: 12,
  },
  resultText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  emptyBox: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 40,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontWeight: '500',
  },
  emptySubtext: {
    fontSize: 13,
    color: '#bbb',
    marginTop: 4,
  },
  bottomNav: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingBottom: 8,
    elevation: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
  },
  navIcon: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 0.5,
  },
  navIconActive: {
    fontSize: 24,
    marginBottom: 4,
    opacity: 1,
  },
  navLabel: {
    fontSize: 11,
    color: '#999',
  },
  navLabelActive: {
    fontSize: 11,
    color: '#e74c3c',
    fontWeight: 'bold',
  },
});





