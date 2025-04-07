import { useEffect } from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { useAppContext } from "../context/context";
import { BarChart, LineChart } from "react-native-gifted-charts";
import groupBooksByYear from "../functional functions_components/groupBooksByYear";
import { Card, useTheme, Text } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export default function StatisticsScreen() {
  const theme = useTheme();
  const { statisticsData, books } = useAppContext();

  const barChartData = Object.entries(groupBooksByYear(books)).map(([year, entries]) => ({
    label: year,
    value: entries.length,
  }));

  const lineChartData = Object.entries(groupBooksByYear(books)).map(([year, entries]) => ({
    dataPointText: year,
    value: entries.length,
  }));

  return (
    <ScrollView contentContainerStyle={{ gap: 30, paddingBottom: 90 }} style={{}}>
      <View>
        <RandomData />

        <Card
          mode="contained"
          style={{
            borderRadius: 20,
            width: "95%",
            marginHorizontal: "auto",
            marginBlock: 20,
          }}
        >
          <Card.Title
            title="Books read per year linechart"
            titleVariant="titleLarge"
            titleStyle={{ textAlign: "center" }}
            style={{ marginBlock: 15 }}
          />
          <Card.Content style={{ flexDirection: "row", gap: 40 }}>
            <LineChart
              isAnimated
              data={lineChartData}
              height={250}
              showVerticalLines
              spacing={80}
              initialSpacing={0}
              color1={theme.colors.secondary}
              textColor1={theme.colors.textColor}
              dataPointsHeight={10}
              dataPointsWidth={6}
              dataPointsColor1={theme.colors.blue}
              textShiftY={-2}
              textShiftX={5}
              textFontSize={13}
              color={theme.colors.textColor}
              yAxisTextStyle={{
                color: theme.colors.textColor,
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
          </Card.Content>
        </Card>

        <Card
          mode="contained"
          style={{
            borderRadius: 20,
            width: "95%",
            marginHorizontal: "auto",
            marginBlock: 20,
          }}
        >
          <Card.Title
            title="Books read per year barchart"
            titleVariant="titleLarge"
            titleStyle={{ textAlign: "center" }}
            style={{ marginBlock: 15 }}
          />
          <Card.Content style={{ flexDirection: "row", gap: 40 }}>
            <BarChart
              data={barChartData}
              barWidth={30}
              spacing={20}
              roundedTop
              hideRules
              barBorderRadius={4}
              frontColor={theme.colors.secondary}
              yAxisThickness={1}
              xAxisThickness={1}
              yAxisLabelPrefix=""
              yAxisTextStyle={{ color: theme.colors.textColor, fontSize: 12, fontWeight: "bold" }}
              xAxisLabelTextStyle={{ color: theme.colors.textColor }}
              noOfSections={5}
            />
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const RandomData = () => {
  const { statisticsData } = useAppContext();
  const theme = useTheme();
  return (
    <>
      <CardTemplate
        iconName="book-open-variant"
        title="Read books this year"
        statsData={statisticsData.booksReadThisYear}
        theme={theme}
      />

      <CardTemplate
        iconName="bookshelf"
        title="Books read total"
        statsData={statisticsData.booksReadAllYear}
        theme={theme}
      />

      <CardTemplate
        iconName="book-open-page-variant"
        title="Total pages read"
        statsData={statisticsData.pagesReadCount}
        theme={theme}
      />
    </>
  );
};

const CardTemplate = ({ iconName, title, statsData, theme }) => {
  const styles = StyleSheet.create({
    statsContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      width: "100%",
    },
    titleText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
    },
    statsText: {
      fontSize: 20,
      fontWeight: "bold",
      marginBottom: 5,
      color: theme.colors.primary,
    },
    cardStyle: {
      borderRadius: 20,
      width: "95%",
      marginHorizontal: "auto",
      marginBlock: 20,
      padding: 10,
    },
  });

  return (
    <Card mode="contained" style={styles.cardStyle}>
      <Card.Content style={{ justifyContent: "center", alignItems: "center" }}>
        <View style={styles.statsContainer}>
          <MaterialCommunityIcons
            name={iconName}
            size={35}
            color={theme.colors.primary}
            style={{ position: "absolute", left: 0 }}
          />
          <View style={{ alignItems: "center" }}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.statsText}>{statsData}</Text>
          </View>
        </View>
      </Card.Content>
    </Card>
  );
};
