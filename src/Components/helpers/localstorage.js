export function checkConflict(key, value) {
  const dataString = localStorage.getItem(key);
  const data = JSON.parse(dataString);

  if (!data || data.length === 0) {
    return true;
  }
  for (const item of data) {
    if (item.name === value.name) {
      return false;
    }
  }
  return true;
}
