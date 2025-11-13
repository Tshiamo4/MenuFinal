# TasteHub - Menu Management Application

An expert React Native mobile application for managing menus in restaurants. Users can easily create, manage, filter, and analyze menu items with TasteHub.

## Features

### Home Tab
-**Dashboard Overview**: See the entire menu at a glance;

**Price Analytics**: Determine and show the average prices for each course type (Starter, Main, Dessert);

**Complete Menu Display**: Review every menu item with comprehensive details;

**Real-time Statistics**: Update dynamically when items are added or removed.

### Add Tab
-**Easy Item Creation**: Include menu items with price, name, course, and description; 

**Course Selection**: Utilize simple chip buttons to select the type of course;

**Form Validation**: Ensure all fields are filled out;

**Item Management**: View and remove existing items straight from the Add tab.

### Filter Tab
- **Smart Filtering**: Sort menu items according to the type of course -
  
-  **Result Counter**: View the number of items that meet your filter criteria.
  
-  **Clear Display**: See the filtered results in a neat card layout.
   
-   **Quick Reset**: Simply press the "All" button to reset the filters.

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI
- Expo Go app (for mobile testing)

### Installation

1. **Clone or create the project**
```bash
   npx create-expo-app TasteHub
   cd TasteHub
```

2. **Install dependencies**
```bash
   npm install
   # or
   yarn install
```

3. **Replace App.tsx with the TasteHub code**
   - Copy the entire TasteHub code into your `App.tsx` file

4. **Start the development server**
```bash
   npx expo start
```

5. **Run on your device**
   - Scan the QR code with Expo Go app (Android/iOS)
   - Or press `a` for Android emulator
   - Or press `i` for iOS simulator

## Usage Guide

### Adding Menu Items

1. Navigate to the **Add** tab using the bottom navigation
2. Fill in the following fields:
   - **Item Name**: Enter the dish name (e.g., "Caesar Salad")
   - **Course Type**: Select Starter, Main, or Dessert
   - **Description**: Provide a brief description of the dish
   - **Price**: Enter the price in ZAR (South African Rand)
3. Tap **✓ Add to Menu** button
4. Item will be added and form will reset for next entry

### Managing Items

- Scroll down in the **Add** tab to see "Manage Items" section
- Each item displays name, course, and price
- Tap **Delete** button to remove an item from the menu
- Confirmation alert will appear before deletion

### Viewing Statistics

1. Go to the **Home** tab
2. View the total item count in the featured card
3. Check **Price Averages by Course** section to see:
   - Average price for each course
   - Number of items in each course
4. Scroll down to see all menu items

### Filtering Menu

1. Navigate to the **Filter** tab
2. Select a course filter:
   - **All**: Show all items (default)
   - **Starter**: Show only starters
   - **Main**: Show only main courses
   - **Dessert**: Show only desserts
3. View filtered results below
4. See result count: "Showing X of Y items"

## Design Features

### Color Scheme
- **Primary**: `#e74c3c` (Red) - Action buttons and accents
- **Success**: `#27ae60` (Green) - Add button
- **Background**: `#f8f9fa` (Light Gray)
- **Cards**: `#ffffff` (White)
- **Text**: `#1a1a1a` (Dark Gray)

### UI Components
- **Bottom Navigation**: Tab-based navigation for easy access
- **Cards**: Clean, modern card design for menu items
- **Chips**: Interactive pill-shaped buttons for selections
- **Empty States**: Friendly messages with emojis when no data exists

## Data Structure

### MenuItem Type
```typescript
type MenuItemType = {
  id: string;           // Unique identifier (timestamp)
  name: string;         // Item name
  course: string;       // Course type (Starter/Main/Dessert)
  description: string;  // Item description
  price: number;        // Price in ZAR
};
```

## Technical Details

### Built With
- **React Native** - Mobile framework
- **Expo** - Development platform
- **TypeScript** - Type safety
- **React Hooks** - State management (useState)

### Key Components
- `SafeAreaView` - Safe rendering on all devices
- `ScrollView` - Scrollable content areas
- `TouchableOpacity` - Interactive buttons
- `TextInput` - Form inputs
- `Alert` - Native alerts for confirmations

### State Management
- Single component with `useState` hooks
- No external state management libraries
- Simple and efficient data flow

## Troubleshooting

### App not loading?
```bash
# Clear cache and restart
npx expo start --clear
```

### Invalid price error?
- Ensure you're entering numbers only
- Use numeric keyboard on mobile
- Don't include currency symbols

### Items not appearing?
- Check that all form fields are filled
- Verify price is a positive number
- Ensure you tapped "Add to Menu" button

## Platform Support

-  iOS
-  Android
-  Expo Go
-  Bare React Native workflow compatible

## Future Enhancements

Potential features for future versions:
- [ ] Data persistence (AsyncStorage/SQLite)
- [ ] Image upload for menu items
- [ ] Edit existing items
- [ ] Export menu as PDF
- [ ] Multiple currency support
- [ ] Search functionality
- [ ] Sort options (price, name, course)
- [ ] Dark mode support
- [ ] Multi-language support

## License

This project is open source and available for educational purposes.

## Developer Notes

### Code Structure
- Single-file application for simplicity
- Modular render functions for each tab
- Inline styles using StyleSheet API
- TypeScript for type safety

### Performance Considerations
- Efficient re-renders with proper key props
- Optimized list rendering
- Minimal dependencies

### Customization
You can easily customize:
- Color scheme (modify StyleSheet constants)
- Course types (update course arrays)
- Currency symbol (change "R" to your currency)
- Layout spacing and sizing

## Contributing

Feel free to fork, modify, and use this project for your own purposes. Suggestions and improvements are welcome!

## Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the Usage Guide
3. Ensure all dependencies are installed correctly
4. Verify you're using a compatible Expo SDK version

---

**Built with a lot of stress(lol) for restaurant owners and menu managers**

Version: 1.0.0  
Last Updated: November 2024
