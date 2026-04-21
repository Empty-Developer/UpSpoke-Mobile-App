import { getWeeklyStats } from '@/lib/speakingListeningStats';
import { useCallback, useEffect, useState } from 'react';

interface WeeklyStats {
  minutesSpoken: number;
  minutesListened: number;
  weeklyChange: {
    spoken: number;
    listened: number;
  };
}

export const useSpeakingListeningStats = () => {
  const [stats, setStats] = useState<WeeklyStats>({
    minutesSpoken: 0,
    minutesListened: 0,
    weeklyChange: {spoken: 0, listened: 0}
  });
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    setLoading(true)
    try {
      const weeklyStats = await getWeeklyStats();

      if (weeklyStats) {
        setStats(weeklyStats);
      }
    } catch (error) {
      // console.error('Failed to load speaking/listening stats: ', error);
      console.log("Failed to load speaking/listening stats: ", error)
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, []);

  return { stats, loading, refresh };
};
