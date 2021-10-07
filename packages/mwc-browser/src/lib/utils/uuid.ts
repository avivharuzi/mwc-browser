export const uuid = (): string => {
  const chars = '0123456789abcdef'.split('');
  const uuid = new Array(32);
  uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
  uuid[14] = '4';
  for (let i = 0; i < 36; i++) {
    if (!uuid[i]) {
      const r = 0 | (Math.random() * 16);
      uuid[i] = chars[i === 19 ? (r & 0x3) | 0x8 : r & 0xf];
    }
  }
  return uuid.join('');
};
