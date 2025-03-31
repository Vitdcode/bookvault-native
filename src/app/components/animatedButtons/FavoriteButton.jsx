import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Animated, Easing } from "react-native";
import { useState, useRef } from "react";
import { useTheme } from "react-native-paper";

const FavoriteButton = () => {
  const theme = useTheme();
  const [isFavorited, setIsFavorited] = useState(false); // Track favorite state
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation value (0 to 1)

  // Handle press and animate
  const handlePress = () => {
    const newValue = !isFavorited;
    setIsFavorited(newValue);
    Animated.timing(fadeAnim, {
      toValue: newValue ? 1 : 0, // 1 for favorited, 0 for unfavorited
      duration: 300, // 300ms transition
      easing: Easing.ease, // Smooth easing
      useNativeDriver: true, // Use native driver for opacity
    }).start();
  };

  // Opacity for unfavorited icon (fades out when favorited)
  const unfavoritedOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0], // 1 (visible) to 0 (hidden)
  });

  // Opacity for favorited icon (fades in when favorited)
  const favoritedOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1], // 0 (hidden) to 1 (visible)
  });

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ position: "relative", width: 40, height: 40 }}>
        {/* Unfavorited Icon (favorite-border) */}
        <Animated.View
          style={{
            position: "absolute",
            opacity: unfavoritedOpacity,
          }}
        >
          <MaterialIcons name="favorite-border" size={40} color="#915a5a" />
        </Animated.View>
        {/* Favorited Icon (favorite) */}
        <Animated.View
          style={{
            position: "absolute",
            opacity: favoritedOpacity,
          }}
        >
          <MaterialIcons name="favorite" size={40} color="#a64242" />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default FavoriteButton;
