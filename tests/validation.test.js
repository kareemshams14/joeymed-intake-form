import { test, expect } from '@jest/globals';
import { 
  isValidEmail, 
  isValidPhone, 
  isValidFloridaZip, 
  isValidAge,
  isValidTravelDates,
  formatCurrency,
  getRecommendedUpsells
} from '../src/lib/validation';

// Email validation tests
test('Email validation', () => {
  expect(isValidEmail('test@example.com')).toBe(true);
  expect(isValidEmail('test.name@example.co.uk')).toBe(true);
  expect(isValidEmail('test+label@example.com')).toBe(true);
  expect(isValidEmail('invalid-email')).toBe(false);
  expect(isValidEmail('invalid@')).toBe(false);
  expect(isValidEmail('@example.com')).toBe(false);
  expect(isValidEmail('')).toBe(false);
});

// Phone validation tests
test('Phone validation', () => {
  expect(isValidPhone('(123) 456-7890')).toBe(true);
  expect(isValidPhone('123-456-7890')).toBe(true);
  expect(isValidPhone('1234567890')).toBe(true);
  expect(isValidPhone('+1 123-456-7890')).toBe(true);
  expect(isValidPhone('123')).toBe(false);
  expect(isValidPhone('123-456-789')).toBe(false);
  expect(isValidPhone('abcdefghij')).toBe(false);
  expect(isValidPhone('')).toBe(false);
});

// Florida ZIP code validation tests
test('Florida ZIP code validation', () => {
  expect(isValidFloridaZip('32000')).toBe(true);
  expect(isValidFloridaZip('33156')).toBe(true);
  expect(isValidFloridaZip('34999')).toBe(true);
  expect(isValidFloridaZip('30123')).toBe(true);
  expect(isValidFloridaZip('35000')).toBe(false);
  expect(isValidFloridaZip('12345')).toBe(false);
  expect(isValidFloridaZip('3212')).toBe(false);
  expect(isValidFloridaZip('')).toBe(false);
});

// Age validation tests
test('Age validation', () => {
  const today = new Date();
  
  // 18 years ago
  const eighteenYearsAgo = new Date(today);
  eighteenYearsAgo.setFullYear(today.getFullYear() - 18);
  
  // 17 years ago
  const seventeenYearsAgo = new Date(today);
  seventeenYearsAgo.setFullYear(today.getFullYear() - 17);
  
  // 30 years ago
  const thirtyYearsAgo = new Date(today);
  thirtyYearsAgo.setFullYear(today.getFullYear() - 30);
  
  expect(isValidAge(eighteenYearsAgo.toISOString().split('T')[0])).toBe(true);
  expect(isValidAge(thirtyYearsAgo.toISOString().split('T')[0])).toBe(true);
  expect(isValidAge(seventeenYearsAgo.toISOString().split('T')[0])).toBe(false);
});

// Travel dates validation tests
test('Travel dates validation', () => {
  const today = new Date();
  
  // Tomorrow
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  
  // Next week
  const nextWeek = new Date(today);
  nextWeek.setDate(today.getDate() + 7);
  
  // Yesterday
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);
  
  expect(isValidTravelDates(
    tomorrow.toISOString().split('T')[0],
    nextWeek.toISOString().split('T')[0]
  )).toBe(true);
  
  expect(isValidTravelDates(
    yesterday.toISOString().split('T')[0],
    nextWeek.toISOString().split('T')[0]
  )).toBe(false);
  
  expect(isValidTravelDates(
    nextWeek.toISOString().split('T')[0],
    tomorrow.toISOString().split('T')[0]
  )).toBe(false);
});

// Currency formatting tests
test('Currency formatting', () => {
  expect(formatCurrency(0)).toBe('$0.00');
  expect(formatCurrency(10)).toBe('$10.00');
  expect(formatCurrency(10.5)).toBe('$10.50');
  expect(formatCurrency(1000)).toBe('$1,000.00');
  expect(formatCurrency(1234567.89)).toBe('$1,234,567.89');
});

// Upsell recommendations tests
test('Upsell recommendations', () => {
  // Weight Loss
  const weightLossUpsells = getRecommendedUpsells('weight-loss', 'male');
  expect(weightLossUpsells.length).toBeGreaterThan(0);
  expect(weightLossUpsells.some(p => p.id === 'vitamin-b12')).toBe(true);
  
  // Erectile Dysfunction
  const edUpsells = getRecommendedUpsells('erectile-dysfunction', 'male');
  expect(edUpsells.length).toBeGreaterThan(0);
  expect(edUpsells.some(p => p.id === 'testosterone-booster')).toBe(true);
  
  // Sexual Health (Female)
  const shUpsells = getRecommendedUpsells('sexual-health', 'female');
  expect(shUpsells.length).toBeGreaterThan(0);
  expect(shUpsells.some(p => p.id === 'hormone-test')).toBe(true);
  
  // No treatment selected
  const noTreatmentUpsells = getRecommendedUpsells(null, 'male');
  expect(noTreatmentUpsells.length).toBe(0);
});
