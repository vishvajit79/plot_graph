export function getFromStorage(key) {
  if (!key) {
    return null;
  }

  try {
    const valueStr = localStorage.getItem(key);
    if(valueStr) {
      return JSON.parse(valueStr);
    }
    return null;
  }
  catch (err) {
    return null;
  }
}

export function setIntStorage(key, obj) {
  if(!key) { 
    // eslint-disable-next-line no-console
    console.error('Error: Key is missing');
  }

  try {
    localStorage.setItem(key, JSON.stringify(obj));
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
    
  }
}
