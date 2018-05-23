/**
 * THIS FUNCTION GETS THE VALUE USING KEY
 * @param key
 * @returns {*}
 */
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

/**
 * THIS FUNCTION SETS A VALUE TO THE PROVIDED KEY. IF KEY EXISTS THEN IT WILL REPLACE THE VALUE
 * @param key
 * @param obj
 */
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
