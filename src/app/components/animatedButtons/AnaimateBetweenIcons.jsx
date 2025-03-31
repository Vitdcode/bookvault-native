/* import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Animated, Easing } from "react-native";
import { useState, useRef } from "react";

const AnimateIcons = ({ iconName1, iconName2, color1, color2, stateName }) => {
  const [stateName, `set${stateName}`] = useState(false); // Track favorite state
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
      <View style={{ position: "relative", width: 35, height: 35 }}>

        <Animated.View
          style={{
            position: "absolute",
            opacity: unfavoritedOpacity,
          }}
        >
          <MaterialIcons name={iconName1} size={35} color={color1} />
        </Animated.View>
 
        <Animated.View
          style={{
            position: "absolute",
            opacity: favoritedOpacity,
          }}
        >
          <MaterialIcons name={iconName2} size={35} color={color2} />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default AnimateIcons;
 */

/* to be used after api logic is implemented */
