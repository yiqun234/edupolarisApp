import { Colors } from '@/constants/Colors';
import { useOnboarding } from '@/context/OnboardingContext';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Circle, Line, Svg } from 'react-native-svg';

const StepIndicator = ({ currentStep }: { currentStep: number }) => {
  const steps = ['BASIC INFORMATION', 'ACADEMIC GOALS', 'SELF REFLECTION'];
  return (
    <View style={styles.stepContainer}>
      <Svg height="40" width="100%">
        <Line x1="15%" y1="10" x2="85%" y2="10" stroke={Colors.light.progressBackground} strokeWidth="2" />
        <Line x1="15%" y1="10" x2={`${15 + 35 * (currentStep - 1)}%`} y2="10" stroke={Colors.light.progressTint} strokeWidth="4" />
        {steps.map((_step, index) => (
          <Circle
            key={index}
            cx={`${15 + 35 * index}%`}
            cy="10"
            r={index < currentStep ? 8 : 6}
            fill={index < currentStep ? Colors.light.progressTint : Colors.light.progressBackground}
            stroke={index === 0 && currentStep > 0 ? '#fff' : 'transparent'}
            strokeWidth={2}
          />
        ))}
      </Svg>
      <View style={styles.stepLabels}>
        {steps.map((step, index) => (
          <Text key={index} style={[styles.stepLabel, index < currentStep && styles.stepLabelActive]}>
            {step}
          </Text>
        ))}
      </View>
    </View>
  );
};

const InfoCard = ({ text }: { text: string }) => (
    <View style={styles.infoCard}>
        <Ionicons name="megaphone-outline" size={24} color={Colors.light.progressTint} />
        <Text style={styles.infoText}>{text}</Text>
    </View>
);

const QuestionCard = ({ question }: { question: string }) => (
    <View style={styles.questionCard}>
        <Text style={styles.questionText}>{question}</Text>
        <Ionicons name="pencil-outline" size={20} color={Colors.light.icon} />
    </View>
);


export default function OnboardingScreen() {
  const { completeOnboarding } = useOnboarding();

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Welcome to Ask Eddie</Text>
      </View>
      <StepIndicator currentStep={2} />
      <InfoCard text="Fill in as much information as possible. It will be used for providing personalized guidance. You can update it anytime through conversations with Eddie or edit on the dashboard." />
      <QuestionCard question="What are your favorite academic subjects? What do you like the most about the subjects?" />
      <QuestionCard question="What academic subjects do you find to be the most challenging? What aspects are challenging?" />
      <QuestionCard question="What majors are you intended in pursuing at college?" />
      <QuestionCard question="Do you have any colleges you desire to attend at this moment?" />
      
      <TouchableOpacity style={styles.completeButton} onPress={completeOnboarding}>
        <Text style={styles.completeButtonText}>Complete Onboarding</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.light.cardBackground,
        padding: 16,
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        color: Colors.light.text,
    },
    stepContainer: {
        marginBottom: 24,
    },
    stepLabels: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '5%',
    },
    stepLabel: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Colors.light.secondaryText,
        textAlign: 'center',
    },
    stepLabelActive: {
        color: Colors.light.progressTint,
    },
    infoCard: {
        flexDirection: 'row',
        backgroundColor: Colors.light.background,
        borderRadius: 12,
        padding: 16,
        marginBottom: 24,
        alignItems: 'center',
    },
    infoText: {
        flex: 1,
        marginLeft: 12,
        color: Colors.light.secondaryText,
        lineHeight: 20,
    },
    questionCard: {
        backgroundColor: Colors.light.background,
        borderRadius: 12,
        padding: 16,
        marginBottom: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    questionText: {
        flex: 1,
        fontSize: 16,
        color: Colors.light.text,
        lineHeight: 22,
        paddingRight: 16,
    },
    completeButton: {
        backgroundColor: Colors.light.progressTint,
        borderRadius: 12,
        padding: 16,
        alignItems: 'center',
        marginTop: 24,
    },
    completeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
}); 