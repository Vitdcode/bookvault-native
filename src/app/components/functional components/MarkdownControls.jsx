const { View } = require("react-native");
const { useTheme, Button } = require("react-native-paper");

const MarkdownControls = ({ review, setReview }) => {
  const theme = useTheme();

  const handleControls = {
    h1: () => setReview(review + "# "),
    h2: () => setReview(review + "## "),
    h3: () => setReview(review + "### "),
    b: () => setReview(review + "**** "),
    i: () => setReview(review + "**"),
  };

  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: theme.colors.secondary,
        padding: 8,
        borderRadius: 10,
        alignItems: "center",
        gap: 10,
        elevation: 5,
        marginBottom: 10,
      }}
    >
      <Button
        onPress={() => {
          handleControls.h1();
        }}
        mode="contained"
        buttonColor={theme.colors.primary}
        /*   style={{ borderWidth: 1, borderColor: "white" }} */
      >
        H1
      </Button>
      <Button
        onPress={() => {
          handleControls.h2();
        }}
        mode="contained"
        buttonColor={theme.colors.primary}
        /*    style={{ borderWidth: 1, borderColor: "white" }} */
      >
        H2
      </Button>
      <Button
        onPress={() => {
          handleControls.h3();
        }}
        mode="contained"
        buttonColor={theme.colors.primary}
        /*   style={{ borderWidth: 1, borderColor: "white" }} */
      >
        H3
      </Button>
      <Button
        onPress={() => {
          handleControls.b();
        }}
        mode="contained"
        buttonColor={theme.colors.primary}
        /*        style={{ borderWidth: 1, borderColor: "white" }} */
      >
        B
      </Button>
      <Button
        onPress={() => {
          handleControls.i();
        }}
        mode="contained"
        buttonColor={theme.colors.primary}
        /*         style={{ borderWidth: 1, borderColor: "white" }} */
      >
        𝐼
      </Button>
    </View>
  );
};

export default MarkdownControls;
