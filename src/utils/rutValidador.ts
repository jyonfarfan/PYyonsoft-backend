/**
 * AUN NO LO VOY A OCUPAR.
 * Normaliza un RUT eliminando puntos y espacios, manteniendo solo números y guión
 * Ejemplo: "12.345.678-9" -> "123456789"
 */
export const normalizeRut = (rut: string): string => {
  return rut
    .replace(/\./g, "")
    .replace(/\s/g, "")
    .replace(/-/g, "")
    .toUpperCase();
};
/**
 * Valida el formato y dígito verificador de un RUT chileno
 * @param rut - RUT en formato normalizado (solo números) o con guión
 * @returns true si el RUT es válido
 */
export const validateRut = (rut: string): boolean => {
  // Normalizar el RUT
  const cleanRut = normalizeRut(rut);

  // Validar longitud (mínimo 7 dígitos + DV, máximo 8 dígitos + DV)
  if (cleanRut.length < 8 || cleanRut.length > 9) {
    return false;
  }

  // Separar cuerpo y dígito verificador
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  // Validar que el cuerpo sean solo números
  if (!/^\d+$/.test(body)) {
    return false;
  }

  // Calcular dígito verificador
  const calculatedDv = calculateDv(body);

  return dv === calculatedDv;
};

/**
 * Calcula el dígito verificador de un RUT
 * Algoritmo Módulo 11
 */
const calculateDv = (rutBody: string): string => {
  let sum = 0;
  let multiplier = 2;

  // Recorrer de derecha a izquierda
  for (let i = rutBody.length - 1; i >= 0; i--) {
    sum += parseInt(rutBody[i]) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const dv = 11 - remainder;

  if (dv === 11) return "0";
  if (dv === 10) return "K";
  return dv.toString();
};

/**
 * Formatea un RUT para almacenamiento en base de datos
 * Convierte "12.345.678-9" o "12345678-9" a "12345678-9"
 */
export const formatRutForDB = (rut: string): string => {
  const cleanRut = normalizeRut(rut);

  if (cleanRut.length < 8 || cleanRut.length > 9) {
    throw new Error("RUT inválido: longitud incorrecta");
  }

  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  return `${body}-${dv}`;
};

/**
 * Formatea un RUT para mostrar al usuario
 * Convierte "123456789" o "12345678-9" a "12.345.678-9"
 */
export const formatRutForDisplay = (rut: string): string => {
  const cleanRut = normalizeRut(rut);
  const body = cleanRut.slice(0, -1);
  const dv = cleanRut.slice(-1);

  // Agregar puntos cada 3 dígitos de derecha a izquierda
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  return `${formattedBody}-${dv}`;
};

// Ejemplo de uso:
// Input del frontend: "12.345.678-9" o "12345678-9"
// Normalizar: "123456789"
// Validar: true/false
// Formato DB: "12345678-9" (10 caracteres)
// Formato Display: "12.345.678-9" (12 caracteres)
