# Header Menu Feature Specification

This document outlines the plan for implementing a functional, animated header menu in the top-right corner of the Home screen.

## 1. UI/Navigation Changes

The primary modifications will be in the screen and navigation layers.

*   **[`src/screens/HomeScreen.tsx`](src/screens/HomeScreen.tsx)**:
    *   Modify the header area to include a menu icon (e.g., three-dot or hamburger icon) positioned on the right.
    *   This icon will toggle the visibility of the main menu component using local state.
    *   The menu itself will be rendered as an overlay or absolutely positioned container.

*   **[`src/navigation/AppNavigator.tsx`](src/navigation/AppNavigator.tsx)**:
    *   Ensure routes for 'About Us' and 'Privacy Policy' exist or can be navigated to. If they are not yet implemented, placeholders or simple modal views will be planned.

## 2. Component Breakdown

*   **`HeaderMenu.tsx`** (New):
    *   **Props**: `isVisible`, `onClose`, `services`, `authState`.
    *   **Responsibility**: Main container for the dropdown menu. Handles the entry/exit animations for the entire menu block.
*   **`MenuItem.tsx`** (New):
    *   **Props**: `label`, `onPress`, `animationDelay`.
    *   **Responsibility**: Individual line item in the menu. Handles its own staggered "drop-in" animation using the provided delay.

## 3. State Management (in `HomeScreen.tsx`)

*   **Visibility**: `const [isMenuOpen, setIsMenuOpen] = useState(false)`.
*   **Auth State (Mock)**:
    ```typescript
    const [user, setUser] = useState<{isLoggedIn: boolean, isAdmin: boolean}>({
      isLoggedIn: false, // Toggle to true to test logout
      isAdmin: true,     // Toggle to true to see Admin Login
    });
    ```
*   **Services**: Fetch `SERVICES` from `src/data/services.ts`.

## 4. Animation Strategy

*   **Library**: React Native's built-in `Animated` API.
*   **Menu Drop-in**:
    *   The `HeaderMenu` container will animate `opacity` (0 to 1) and `scale` or `translateY` (-50 to 0).
*   **Staggered Items**:
    *   Each `MenuItem` will receive an index-based delay.
    *   `Animated.timing` will be used to slide items in from the right or fade them in sequentially.
    *   `useNativeDriver: true` will be used for performance.

## 5. Data Dependency & Dynamic Services

*   **Services Layer**: The menu will import `SERVICES` from [`src/data/services.ts`](src/data/services.ts).
*   **New Services**: 'Wholesale Goods Purchase' and 'Vehicle Rental' will be appended to the `SERVICES` array. 
*   **Admin Additions**: Since the component pulls directly from the `SERVICES` export, any new items added to that file (mocking an admin addition) will automatically appear in the menu.

## 6. Implementation Steps

1.  Update `src/data/services.ts` with new service types.
2.  Create `src/components/MenuItem.tsx` with internal `Animated` logic.
3.  Create `src/components/HeaderMenu.tsx` to wrap items and manage the overall dropdown container.
4.  Update `src/screens/HomeScreen.tsx` to include the toggle button and the `HeaderMenu` component.
