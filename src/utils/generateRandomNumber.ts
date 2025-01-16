export const generateRandomNumber = (length: number = 6): number => {
  return Math.floor(Math.random() * Math.pow(10, length));
};
