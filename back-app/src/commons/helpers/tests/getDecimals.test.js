const getNumberAndDecimal = require('./../getDecimal');

describe('getNumberAndDecimal', () => {
  test('should return the correct number and decimal for an integer input', () => {
    const result = getNumberAndDecimal(42);
    expect(result).toEqual({ number: 42, decimal: 0 });
  });

  test('should return the correct number and decimal for a float input with one decimal place', () => {
    const result = getNumberAndDecimal(42.5);
    expect(result).toEqual({ number: 42, decimal: 50 });
  });

  test('should return the correct number and decimal for a float input with two decimal places', () => {
    const result = getNumberAndDecimal(42.75);
    expect(result).toEqual({ number: 42, decimal: 75 });
  });

  test('should return the correct number and decimal for a float input with more than two decimal places', () => {
    const result = getNumberAndDecimal(42.123);
    expect(result).toEqual({ number: 42, decimal: 12 });
  });

  test('should handle negative numbers correctly', () => {
    const result = getNumberAndDecimal(-42.75);
    expect(result).toEqual({ number: -42, decimal: 75 });
  });

  test('should handle zero correctly', () => {
    const result = getNumberAndDecimal(0);
    expect(result).toEqual({ number: 0, decimal: 0 });
  });

  test('should handle small decimals correctly', () => {
    const result = getNumberAndDecimal(0.04);
    expect(result).toEqual({ number: 0, decimal: 4 });
  });

  test('should handle large numbers correctly, rounded number', () => {
    const result = getNumberAndDecimal(123456789.987654321);
    expect(result).toEqual({ number: 123456789, decimal: 99 });
  });
});
