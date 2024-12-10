const generateUniqueRandomNumbers = (count, min, max) => {
    const numbers = new Set();
    
    while (numbers.size < count) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(randomNum);
    }
    
    return Array.from(numbers);
  };
  
 export default generateUniqueRandomNumbers