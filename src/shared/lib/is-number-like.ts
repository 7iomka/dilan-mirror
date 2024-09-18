export function isNumberLike(value: unknown) {
  if (typeof value === 'number') {
    return true;
  }

  if (typeof value === 'string') {
    if (value.startsWith('calc(') || value.startsWith('var(')) {
      return true;
    }

    return /[0-9]/.test(value.trim().replace('-', '')[0]);
  }

  return false;
}

export function capitalizeFirst(val: string): string {
  if (val.length === 0) {
    return val;
  }
  if (val.length === 1) {
    return val.toUpperCase();
  }
  return val[0].toUpperCase() + val.substring(1);
}
