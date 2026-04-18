import { Colors } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/utils/supabase';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { toast } from 'sonner-native';

const { width } = Dimensions.get('window');

interface Feature {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
}

interface Plan {
  id: string;
  name: string;
  price: string;
  period: string;
  billingCycle: string;
  features: string[];
  recommended?: boolean;
  savings?: string;
}

const features: Feature[] = [
  {
    icon: 'book-outline',
    title: 'Расширенная программа обучения',
    description:
      'Получите доступ к самой передовой в мире программе обучения разговорной речи',
  },
  {
    icon: 'trending-up-outline',
    title: 'Устранение ошибок',
    description:
      'Индивидуальные уроки, направленные на исправление ваших типичных ошибок',
  },
  {
    icon: 'bulb-outline',
    title: 'Индивидуальный словарный запас',
    description:
      'Изучайте словарный запас, подобранный с учетом ваших интересов',
  },
  {
    icon: 'people-outline',
    title: 'Ситуационные ролевые игры',
    description: 'Практикуйте реальные разговоры',
  },
  {
    icon: 'mic-outline',
    title: 'Тренер по произношению',
    description: 'Получайте мгновенную обратную связь по своему произношению',
  },
  {
    icon: 'analytics-outline',
    title: 'Отчеты о прогрессе',
    description:
      'Отслеживайте свой путь обучения с помощью подробной аналитики',
  },
];

const plans: { annual: Plan; monthly: Plan } = {
  annual: {
    id: 'premium_annual',
    name: 'Premium',
    price: '799.00',
    period: 'на год',
    billingCycle: 'Ежегодная оплата',
    features: ['7-дневная бесплатная пробная версия', 'Отмена в любое время'],
    recommended: true,
    savings: 'Сэкономьте 40%',
  },
  monthly: {
    id: 'premium_monthly',
    name: 'Premium',
    price: '199.00',
    period: 'в месяц',
    billingCycle: 'Ежемесячный расчет',
    features: ['7-дневная бесплатная пробная версия', 'Отмена в любое время'],
  },
};

export function Paywall({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        <LinearGradient
          colors={['#13140C', '#13140C']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.gradient}
          locations={[0, 0.4, 1]}
        />
        {/* Header */}
        <View style={styles.header}>
          <Pressable style={styles.closeButton} onPress={onClose}>
            <Ionicons name="close" size={24} color={'#fff'} />
          </Pressable>
          <Text style={styles.headerTitle}>Premium!</Text>
          <Text style={styles.headerSpacer} />
        </View>
        {/* main */}
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.introSection}>
            <Text style={styles.title}>
              Используют уже <Text style={styles.highlight}>more </Text>people
            </Text>
            <View style={styles.subtitleView}>
              <Text style={styles.subtitle}>
                Мы используем для изучения Convo!
              </Text>
            </View>
          </View>

          {/* cards */}
          <View style={styles.featuresContainer}>
            {features.map((features, index) => (
              <View key={index} style={styles.featureCard}>
                <View style={styles.featureIcon}>
                  <Ionicons
                    name={features.icon}
                    size={24}
                    color={'#fff'}
                  />
                </View>
                <Text style={styles.featureTitle}>{features.title}</Text>
                <Text style={styles.featureDescription}>
                  {features.description}
                </Text>
              </View>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1A2E1B',
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(256, 256, 256, .1)',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  headerSpacer: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  introSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 4,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  highlight: {
    color: '#C5D8C5',
  },
  subtitleView: {
    alignItems: 'center',
    marginBottom: 32,
    paddingHorizontal: 15,
    borderRadius: 20,
    paddingVertical: 10,
    backgroundColor: '#C5D8C5',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 17,
    fontWeight: '600',
    color: '#000',
    textAlign: 'center',
  },
  featuresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  featureCard: {
    width: (width - 52) / 2,
    backgroundColor: '#FE6869',
    borderRadius: 34,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1.5,
  },
  featureIcon: {
    width: 48,
    height: 48,
    borderRadius: 100,
    backgroundColor: '#131313',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    borderWidth: 1,
  },
  featureTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
    fontWeight: '500',
    color: 'rgba(0, 0, 0, 0.85)',
    lineHeight: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    backgroundColor: 'rgba(26, 26, 46, 0.6)',
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    gap: 8,
  },
  toggleButtonActive: {
    backgroundColor: '#fff',
  },
  toggleText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(255, 255, 255, 0.9)',
  },
  toggleTextActive: {
    color: '#1a1a2e',
  },
  savingsBadge: {
    backgroundColor: '#34C759',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  savingsText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#fff',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    borderWidth: 2,
    borderColor: Colors.primaryAccentColor,
  },
  recommendedBadge: {
    position: 'absolute',
    top: -12,
    alignSelf: 'center',
    backgroundColor: Colors.primaryAccentColor,
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  recommendedText: {
    fontSize: 11,
    fontWeight: '800',
    color: '#fff',
    letterSpacing: 1,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  planName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a2e',
  },
  planBilling: {
    fontSize: 14,
    color: Colors.subduedTextColor,
    marginTop: 4,
  },
  planPriceContainer: {
    alignItems: 'flex-end',
  },
  planPrice: {
    fontSize: 32,
    fontWeight: '800',
    color: '#1a1a2e',
  },
  planPeriod: {
    fontSize: 14,
    color: Colors.subduedTextColor,
  },
  planFeatures: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
    gap: 12,
  },
  planFeatureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  planFeatureText: {
    fontSize: 14,
    color: '#4b5563',
    fontWeight: '500',
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primaryAccentColor,
    borderRadius: 24,
    paddingVertical: 18,
    paddingHorizontal: 32,
    marginBottom: 12,
    shadowColor: Colors.primaryAccentColor,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  ctaIcon: {
    marginRight: 8,
  },
  ctaText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  footer: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerNote: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 20,
    lineHeight: 18,
  },
  rating: {
    alignItems: 'center',
    marginBottom: 24,
    paddingVertical: 24,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  stars: {
    flexDirection: 'row',
    gap: 4,
    marginBottom: 8,
  },
  ratingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 4,
  },
  ratingSubtext: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  testimonial: {
    backgroundColor: 'rgba(26, 26, 46, 0.7)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  testimonialText: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 22,
    fontStyle: 'italic',
    marginBottom: 12,
  },
  testimonialAuthor: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
  },
  legalLinks: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 20,
  },
  legalLink: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.8)',
    textDecorationLine: 'underline',
  },
  legalSeparator: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
  },
  bottomSpacing: {
    height: 40,
  },
});
