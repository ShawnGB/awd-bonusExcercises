const twoSum = (array: number[], total: number): [a: number, b: number] => {
  const hashMap = new Map();

  for (let i = 0; i < array.length; i++) {
    if (hashMap.has(total - array[i])) {
      return [i, hashMap.get(total - array[i])];
    }
    hashMap.set(array[i], i);
  }

  throw new Error("Array dies not provide the answer :)");
};
