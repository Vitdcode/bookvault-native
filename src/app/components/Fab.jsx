import * as React from "react";
import { Animated, Easing } from "react-native";
import { FAB, Portal, PaperProvider, useTheme } from "react-native-paper";
import { useAppContext } from "../context/context";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

const Fab = ({ book }) => {
  const [state, setState] = React.useState({ open: false });
  const rotateAnim = React.useRef(new Animated.Value(0)).current;

  const onStateChange = ({ open }) => setState({ open });
  const { open } = state;
  const theme = useTheme();
  const { isLiked, setIsLiked } = useAppContext();
  const { isBookmarked, setIsBookmarked } = useAppContext();
  const { review, setReview } = useAppContext();

  return (
    <Portal>
      <FAB.Group
        open={open}
        visible
        fabStyle={{ backgroundColor: useTheme().colors.secondary }}
        color="black"
        icon={open ? "close" : "pencil"}
        actions={[
          {
            icon: !isLiked ? "thumb-up-outline" : "thumb-up",
            size: 32,
            color: theme.colors.primary,
            label: !isLiked ? "Like" : "Remove like",
            onPress: () => setIsLiked(!isLiked),
          },
          {
            icon: !isBookmarked ? "bookmark-outline" : "bookmark-check",
            size: 40,
            color: theme.colors.primary,
            label: !isBookmarked ? "Bookmark" : "Remove bookmark",
            onPress: () => setIsBookmarked(!isBookmarked),
          },
        ]}
        onStateChange={onStateChange}
        onPress={() => {
          if (open) {
            // do something if the speed dial is open
          }
        }}
      />
    </Portal>
  );
};

export default Fab;
