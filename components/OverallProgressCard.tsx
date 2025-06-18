import { Colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Circle, Svg } from 'react-native-svg';

const CIRCLE_LENGTH = 1000; // SVG 周长
const R = CIRCLE_LENGTH / (2 * Math.PI); // 半径

function StatItem({ label, value }: { label: string; value: string | number }) {
  return (
    <View style={styles.statItem}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function ProgressBar({ label, value, total }: { label: string; value: number; total: number }) {
    const progress = (value / total) * 100;
    return (
        <View style={styles.progressRow}>
            <Text style={styles.progressLabelText}>{label}</Text>
            <View style={styles.progressBarContainer}>
                <View style={[styles.progressBar, { width: `${progress}%` }]} />
            </View>
            <Text style={styles.progressValueText}>{value}/{total}</Text>
        </View>
    );
}

export default function OverallProgressCard() {
  const percentage = 80;
  const strokeDashoffset = CIRCLE_LENGTH - (CIRCLE_LENGTH * percentage) / 100;

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.cardTitle}>Overall progress</Text>
        <Ionicons name="open-outline" size={24} color={Colors.light.icon} />
      </View>
      <View style={styles.progressContainer}>
        <Svg width={R * 2 + 30} height={R * 2 + 30} viewBox="0 0 200 200">
          <Circle
            cx="100"
            cy="100"
            r="80"
            stroke={Colors.light.progressBackground}
            strokeWidth="15"
            fill="transparent"
          />
          <Circle
            cx="100"
            cy="100"
            r="80"
            stroke={Colors.light.progressTint}
            strokeWidth="15"
            fill="transparent"
            strokeDasharray={CIRCLE_LENGTH}
            strokeDashoffset={strokeDashoffset}
            rotation="-90"
            originX="100"
            originY="100"
            strokeLinecap="round"
          />
        </Svg>
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressPercentage}>{percentage}%</Text>
          <Text style={styles.progressLabel}>Completeness</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.statText}><Text style={{color: '#28a745'}}>2%↑</Text> since last checkin</Text>
        <Text style={styles.statText}><Text style={{color: '#28a745'}}>4%↑</Text> since last month</Text>
      </View>

      <View style={styles.separator} />

      <View style={styles.academicsContainer}>
        <StatItem label="Unweighted GPA" value={3.7} />
        <StatItem label="APs" value={2} />
        <StatItem label="SAT score" value={1510} />
        <StatItem label="ACT score" value="N/A" />
      </View>

      <View style={styles.activitiesContainer}>
        <ProgressBar label="Extracurricular Activities" value={7} total={10} />
        <ProgressBar label="Honors / Awards" value={3} total={5} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.light.cardBackground,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.light.text,
  },
  progressContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  progressTextContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  progressPercentage: {
    fontSize: 48,
    fontWeight: 'bold',
    color: Colors.light.progressTint,
  },
  progressLabel: {
    fontSize: 14,
    color: Colors.light.secondaryText,
  },
  statsContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginTop: 16,
  },
  statText: {
      fontSize: 12,
      color: Colors.light.secondaryText,
  },
  separator: {
    height: 1,
    backgroundColor: Colors.light.progressBackground,
    marginVertical: 24,
  },
  academicsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 24,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: Colors.light.text,
  },
  statLabel: {
    fontSize: 12,
    color: Colors.light.secondaryText,
    marginTop: 4,
  },
  activitiesContainer: {
    // Add styles if needed
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  progressLabelText: {
    flex: 1,
    fontSize: 14,
    color: Colors.light.text,
  },
  progressBarContainer: {
    flex: 2,
    height: 8,
    backgroundColor: Colors.light.progressBackground,
    borderRadius: 4,
    marginHorizontal: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: Colors.light.progressTint,
    borderRadius: 4,
  },
  progressValueText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.light.text,
  }
}); 