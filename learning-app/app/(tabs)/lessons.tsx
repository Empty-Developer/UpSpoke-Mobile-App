import { Colors } from '@/constants/theme';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSpeakingListeningStats } from '@/hooks/use-speaking-listening-stats';
import { useFocusEffect } from 'expo-router';
import { useCallback } from 'react';

export default function LessonsContent() {
  const colors = Colors['light'];
  const [loaded] = useFonts({
    GeistMono: require('@/assets/fonts/Geist-Regular.ttf'),
  });
  const { stats, loading, refresh } = useSpeakingListeningStats();

  useFocusEffect(
    useCallback(() => {
      /*
      add it to the dependencies array
      so that, if necessary, the
      function is redrawn or a new
      function is create
    */
      refresh();
    }, [refresh])
  );

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* header */}
      <View style={styles.container}>
        <View
          style={[styles.header, { borderBottomColor: Colors.borderColor }]}
        >
          <TouchableOpacity>
            <Text style={styles.headerTitle}>Week</Text>
            <Text
              style={
                (styles.headerSubtitle, { color: Colors.subduedTextColor })
              }
            >
              В обзоре
            </Text>
          </TouchableOpacity>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.starIcon}>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>
                  {loading ? '-' : Math.floor(stats?.minutesSpoken ?? 0)}
                </Text>
                <Ionicons
                  name="arrow-up"
                  size={14}
                  color="#34C759"
                  style={{ marginLeft: 2 }}
                />
                <Text style={styles.statChangePositive}>{Math.floor(stats?.weeklyChange.spoken ?? 0)}</Text>
              </View>
              <Text
                style={[styles.statLabel, { color: Colors.subduedTextColor }]}
              >
                Время общения
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={[
              styles.headerSeparator,
              { backgroundColor: Colors.borderColor },
            ]}
          ></View>

          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.starIcon}>
              <View style={styles.statValueContainer}>
                <Text style={styles.statValue}>{loading ? '-' : Math.floor(stats?.minutesListened ?? 0)}</Text>
                <Ionicons
                  name="arrow-up"
                  size={14}
                  color="#34C759"
                  style={{ marginLeft: 2 }}
                />
                <Text style={styles.statChangePositive}>{Math.floor(stats?.weeklyChange.listened ?? 0)}</Text>
              </View>
              <Text
                style={[styles.statLabel, { color: Colors.subduedTextColor }]}
              >
                Время прослушивания
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: -2,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statItem: {
    alignItems: 'center',
  },
  statValueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 2,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  statChangePositive: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#34C759', // Green for positive change
  },
  statLabel: {
    fontSize: 11,
    fontWeight: '600',
    marginTop: -2,
  },
  headerSeparator: {
    width: 1,
    height: 24,
    marginRight: -8, // Adjust spacing
  },
  scrollContainer: {
    paddingTop: 24,
    paddingBottom: 48,
    paddingHorizontal: 20,
  },
  chapterContainer: {
    marginBottom: 24,
  },
  chapterHeader: {
    marginBottom: 24,
  },
  chapterNumberText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#8e8e93',
    textTransform: 'uppercase',
  },
  chapterTitleText: {
    marginTop: 4,
  },
  lessonsWrapper: {
    gap: 20,
  },
  lessonNodeContainer: {
    minHeight: 80,
    justifyContent: 'center',
  },
  lessonBubble: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 24,
    borderWidth: 2,
    width: '80%',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },
  lessonTextContainer: {
    flex: 1,
  },
  lessonTitle: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
    marginBottom: 6,
  },
  completionStarsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    marginRight: 3,
  },
  extraCountText: {
    marginLeft: 4,
    fontSize: 14,
    fontWeight: 'bold',
  },
  practiceChapterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 24,
    marginBottom: 24,
    alignSelf: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  practiceChapterButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
