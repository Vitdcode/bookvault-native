import { MaterialCommunityIcons } from "@expo/vector-icons";

const { View } = require("react-native");
const { useTheme, Button } = require("react-native-paper");

const MarkdownControls = ({ review, setReview, selection, setSelection }) => {
  const theme = useTheme();

  const insertAtCursor = (markdownSyntax, cursorOffsetIfNoSelection = null, wrap = true) => {
    const start = selection.start;
    const end = selection.end;
    const selectedText = review.slice(start, end);

    let newText;
    let newCursorStart, newCursorEnd;

    if (selectedText.length > 0 && wrap) {
      // Wrap selected text
      newText =
        review.slice(0, start) + markdownSyntax + selectedText + markdownSyntax + review.slice(end);
      newCursorStart = start + markdownSyntax.length;
      newCursorEnd = newCursorStart + selectedText.length;
    } else {
      // Just insert once (no wrapping) or insert wrapped with empty space
      if (wrap) {
        newText = review.slice(0, start) + markdownSyntax + markdownSyntax + review.slice(end);
        const cursorOffset = cursorOffsetIfNoSelection ?? markdownSyntax.length;
        newCursorStart = start + cursorOffset;
        newCursorEnd = newCursorStart;
      } else {
        newText = review.slice(0, start) + markdownSyntax + review.slice(end);
        newCursorStart = start + markdownSyntax.length;
        newCursorEnd = newCursorStart;
      }
    }

    setReview(newText);
    setSelection({ start: newCursorStart, end: newCursorEnd });
  };

  const handleControls = {
    h2: () => insertAtCursor("## ", null, false),
    h3: () => insertAtCursor("### ", null, false),
    bold: () => insertAtCursor("**", 2, true),
    i: () => insertAtCursor("*", 1, true),
    blockQuote: () => insertAtCursor("> ", null, false),
    bulletPoint: () => insertAtCursor("- ", null, false),
  };

  const buttonControls = [
    {
      btnName: <MaterialCommunityIcons name="format-header-2" size={19} color="white" />,
      onPress: () => handleControls.h2(),
    },
    {
      btnName: <MaterialCommunityIcons name="format-header-3" size={19} color="white" />,
      onPress: () => handleControls.h3(),
    },
    {
      btnName: <MaterialCommunityIcons name="format-bold" size={19} color="white" />,
      onPress: () => handleControls.bold(),
    },
    {
      btnName: <MaterialCommunityIcons name="comment-quote-outline" size={19} color="white" />,
      onPress: () => handleControls.blockQuote(),
    },
    {
      btnName: <MaterialCommunityIcons name="format-list-bulleted" size={19} color="white" />,
      onPress: () => handleControls.bulletPoint(),
    },
  ];

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.colors.lightGray,
        flexWrap: "wrap",
        padding: 8,
        borderRadius: 10,
        alignItems: "center",
        gap: 10,
        elevation: 5,
        marginBottom: 10,
      }}
    >
      {buttonControls.map((button, index) => (
        <Button
          mode="contained"
          buttonColor={theme.colors.blue}
          key={index}
          onPress={button.onPress}
        >
          {button.btnName}
        </Button>
      ))}
    </View>
  );
};

export default MarkdownControls;
