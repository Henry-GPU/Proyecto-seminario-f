export function validateSerialForm({ purchaseDate, prefix, start, end, isSingle }) {
  if (!purchaseDate) return "Debe seleccionar una fecha de compra.";
  if (!prefix.trim()) return "El prefijo o número de serie es obligatorio.";
  if (!isSingle && (start > end)) return "El número de inicio no puede ser mayor al final.";
  if (!isSingle && (end < 0 || start < 0)) return "Los valores de inicio y fin deben ser positivos.";
  return null;
}
