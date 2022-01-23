const generateRandomCode = (): number => {
  let code: number;
  do {
    code = Math.floor(Math.random() * 10 ** 4);
  } while (!is4DegitsNumber(code));

  return code;
};

const is4DegitsNumber = (number: number): boolean => {
  return number >= 1000 && number <= 9999;
};

export { generateRandomCode };
