const generateUniqueRandomNumbers = (count, min, max) => { // N° de Pokes consumidos , ID min , ID max
    const numbers = new Set();
    
    while (numbers.size < count) {
      const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
      numbers.add(randomNum);
    }
    
    return Array.from(numbers);
  };

function getRandomElements(array, n) {
  if (n > array.length) {
    throw new Error("n no puede ser mayor que el tamaño del array");
  }

  const result = [];
  const copy = [...array]; // Crear una copia del array original

  for (let i = 0; i < n; i++) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    result.push(copy[randomIndex]); // Añadir el elemento aleatorio al resultado
    copy.splice(randomIndex, 1);   // Remover el elemento para evitar repeticiones
  }

  return result;
}
  
 export  {generateUniqueRandomNumbers, getRandomElements}