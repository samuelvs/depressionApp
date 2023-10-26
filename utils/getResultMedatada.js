import resultDepressionLevel from './resultDepressionLevel'

const getResultMetadata = (value) => {
  console.log(value);
 if (value > -1) {
      level = 'minimum';
    if (value >= 14 && value <= 19) {
      level = 'light';
    } else if (value >= 20 && value <= 28) {
      level = 'moderate';
    } else if (value >= 29 && value <= 63) {
      level = 'serious';
    }
    
    return {
      name: resultDepressionLevel[level].name, 
      color: resultDepressionLevel[level].color,
      orientation: resultDepressionLevel[level].orientation,
      value: value,
    }
  }
}

export default getResultMetadata;