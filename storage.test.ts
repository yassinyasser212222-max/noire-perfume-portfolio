import test from 'node:test';
import assert from 'node:assert/strict';
import {
  getEffectiveImage,
  isShowingPlaceholder,
  formatInstagramUrl,
  formatWhatsAppUrl,
} from './storage';
import { PortfolioProject } from '../types/portfolio';

const mockProjectWithDefault: PortfolioProject = {
  id: 'test-project-1',
  title: 'Test Fragrance',
  brand: 'Test Brand',
  fragranceName: 'Test',
  tagline: 'Test Tagline',
  category: 'Test Category',
  year: '2024',
  defaultImage: '/assets/aistudio/test.png',
  description: 'Test description',
  dimensions: '1080 × 1080',
  palette: ['#000', '#fff'],
  credits: {
    artDirection: 'NOIRÉ',
    concept: 'Concept',
    retouching: 'Retouching',
    studio: 'NOIRÉ',
  },
  isPlaceholderDefault: false,
};

const mockProjectPlaceholder: PortfolioProject = {
  ...mockProjectWithDefault,
  id: 'test-project-2',
  defaultImage: null,
  isPlaceholderDefault: true,
};

test('getEffectiveImage returns defaultImage when no custom image exists', () => {
  const result = getEffectiveImage(mockProjectWithDefault, {});
  assert.equal(result, '/assets/aistudio/test.png');
});

test('getEffectiveImage returns customImage over defaultImage when provided', () => {
  const customMap = { 'test-project-1': 'data:image/png;base64,CUSTOM_DATA' };
  const result = getEffectiveImage(mockProjectWithDefault, customMap);
  assert.equal(result, 'data:image/png;base64,CUSTOM_DATA');
});

test('getEffectiveImage returns null for placeholder project without custom upload', () => {
  const result = getEffectiveImage(mockProjectPlaceholder, {});
  assert.equal(result, null);
});

test('isShowingPlaceholder detects whether an image is active', () => {
  assert.equal(isShowingPlaceholder(mockProjectWithDefault, {}), false);
  assert.equal(isShowingPlaceholder(mockProjectPlaceholder, {}), true);
  assert.equal(
    isShowingPlaceholder(mockProjectPlaceholder, { 'test-project-2': 'data:image/jpeg;base64,NEW' }),
    false
  );
});

test('formatInstagramUrl correctly formats handles', () => {
  assert.equal(formatInstagramUrl('noire.studio'), 'https://instagram.com/noire.studio');
  assert.equal(formatInstagramUrl('@noire.studio'), 'https://instagram.com/noire.studio');
  assert.equal(formatInstagramUrl('   @luxury.scents  '), 'https://instagram.com/luxury.scents');
});

test('formatWhatsAppUrl formats phone number digits and optional message', () => {
  assert.equal(formatWhatsAppUrl('+33 1 40 50 60 70'), 'https://wa.me/33140506070');
  assert.equal(
    formatWhatsAppUrl('+1 (555) 019-2834', 'Hello NOIRÉ Studio'),
    'https://wa.me/15550192834?text=Hello%20NOIR%C3%89%20Studio'
  );
});
