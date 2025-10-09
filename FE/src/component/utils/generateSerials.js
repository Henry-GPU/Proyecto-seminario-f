export function generateSerials({ prefix, start, end, size, purchaseDate, isSingle, isNormal }) {
  const fill = (num) => prefix + num.toString().padStart(size - prefix.length, '0');
  
  if (!isSingle && !isNormal)
    return Array.from({ length: end - start + 1 }, (_, i) => ({
      serialNumber: fill(start + i),
      purchaseDate
    }));

  if (!isSingle && isNormal)
    return Array.from({ length: end - start + 1 }, (_, i) => ({
      serialNumber: `${prefix}${start + i}`,
      purchaseDate
    }));

  if (isSingle && isNormal)
    return [{ serialNumber: prefix, purchaseDate }];

  if (isSingle && !isNormal)
    return [{ serialNumber: fill(end), purchaseDate }];

  return [];
}
