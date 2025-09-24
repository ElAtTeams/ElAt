import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import RegisterScreen from '../RegisterScreen';

describe('RegisterScreen', () => {
  it('renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<RegisterScreen navigation={{ navigate: jest.fn() }} />);
    expect(getByPlaceholderText('Ad')).toBeTruthy();
    expect(getByPlaceholderText('Soyad')).toBeTruthy();
    expect(getByPlaceholderText('E-posta adresi')).toBeTruthy();
    expect(getByPlaceholderText('Şifre')).toBeTruthy();
    expect(getByPlaceholderText('Şifre Tekrar')).toBeTruthy();
    expect(getByText('Hesap Oluştur')).toBeTruthy();
  });

  it('shows error on empty submit', () => {
    const { getByText } = render(<RegisterScreen navigation={{ navigate: jest.fn() }} />);
    fireEvent.press(getByText('Hesap Oluştur'));
    expect(getByText(/Lütfen ad ve soyadınızı giriniz.|Lütfen geçerli bir e-posta adresi giriniz.|Şifre en az 6 karakter olmalıdır.|Şifreler eşleşmiyor./)).toBeTruthy();
  });
});