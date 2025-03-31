import { TouchableOpacity, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Animated, Easing } from "react-native";
import { useState, useRef } from "react";

const BookMarkButton = () => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handlePress = () => {
    const newValue = !isBookmarked;
    setIsBookmarked(newValue);
    Animated.timing(fadeAnim, {
      toValue: newValue ? 1 : 0,
      duration: 300,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const unBookmarkedOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const bookmarkedOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 1],
  });

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={{ position: "relative", width: 40, height: 40 }}>
        <Animated.View style={{ position: "absolute", opacity: unBookmarkedOpacity }}>
          <MaterialIcons name="bookmark-border" size={40} color="#3e60bd" />
        </Animated.View>
        <Animated.View style={{ position: "absolute", opacity: bookmarkedOpacity }}>
          <MaterialIcons name="bookmark" size={40} color="#3e60bd" />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

export default BookMarkButton;
