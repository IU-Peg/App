import { number } from 'card-validator';
import Constants from 'expo-constants';

type CreditCardType = {
  niceType: string;
  type: string;
  patterns: number[] | [number[]];
  gaps: number[];
  lengths: number[];
  code: {
    size: number;
    name: string;
  };
  matchStrength?: number;
};

const auxiliaries = {
  limitLength: (string: string, maxLength: number): string =>
    string.substr(0, maxLength),
  removeNonNumber: (string: string): string => string.replace(/[^\d]/g, ''),
  addGaps: (string: string, gaps: number[]) => {
    const offsets = [0].concat(gaps).concat([string.length]);

    return offsets
      .map((end, index) => {
        if (index === 0) return '';
        const start = offsets[index - 1];
        return string.substr(start, end - start);
      })
      .filter(part => part !== '')
      .join(' ');
  },
  removeLeadingSpaces: (string: string) => string.replace(/^\s+/g, ''),
};

const formatCardNumber = (cardNumber: string): string => {
  const card: CreditCardType =
    number(number).card || Constants.manifest.extra.fallBackCard;
  const numberSanitized = auxiliaries.removeNonNumber(cardNumber);
  const maxLength = card.lengths[card.lengths.length - 1];
  const lengthSanitized = auxiliaries.limitLength(numberSanitized, maxLength);
  const formatted = auxiliaries.addGaps(lengthSanitized, card.gaps);
  return formatted;
};

const formatExpiringDate = (text: string): string => {
  const sanitized = auxiliaries.limitLength(
    auxiliaries.removeNonNumber(text),
    4,
  );
  if (sanitized.match(/^[2-9]$/)) {
    return `0${sanitized}`;
  }
  if (sanitized.length > 2) {
    return `${sanitized.substr(0, 2)}/${sanitized.substr(2, sanitized.length)}`;
  }
  return sanitized;
};

export { formatExpiringDate, formatCardNumber };
