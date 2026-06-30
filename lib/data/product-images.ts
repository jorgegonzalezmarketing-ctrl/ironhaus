/**
 * Imágenes comerciales (fotos de stock libres de Pexels) asignadas a cada
 * producto por tipo de máquina. Son fotos reales para que el cliente visualice
 * la tienda; se reemplazan fácilmente desde el panel (campo "URL de imagen")
 * por las fotos propias de Crea Fitness cuando estén disponibles.
 *
 * Mapa: id de producto -> URL de la foto.
 */
const Q = "?auto=compress&cs=tinysrgb&fit=crop&w=1000&h=1000";
const px = (id: number) =>
  `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg${Q}`;

export const productImages: Record<string, string> = {
  // Cardio
  "p-001": px(5411023), // Trotadora comercial
  "p-002": px(4853861), // Elíptica
  "p-003": px(36080210), // Bicicleta spinning
  "p-004": px(7689285), // Remo de aire
  // Musculación
  "p-005": px(4716814), // Multiestación
  "p-006": px(6628962), // Press de pecho
  "p-007": px(9545914), // Prensa de piernas
  "p-008": px(9545909), // Polea dorsal
  // Peso libre
  "p-009": px(4793211), // Discos bumper
  "p-010": px(4047134), // Barra olímpica
  "p-011": px(7743320), // Mancuernas hexagonales
  "p-012": px(4793245), // Banco ajustable
  // CrossFit
  "p-013": px(7187881), // Power rack
  "p-014": px(32384930), // Kettlebells
  "p-015": px(4944427), // Cajón pliométrico
  "p-016": px(6739958), // Wall ball
  // Accesorios
  "p-017": px(3916766), // Bandas de resistencia
  "p-018": px(4488752), // Piso de caucho
  "p-019": px(4716817), // Rack de mancuernas
  // Comercial
  "p-020": px(29224211), // Pack gimnasio comercial (interior)
  "p-021": px(3757957), // Trotadora curva
  // Home gym
  "p-022": px(4464780), // Smith funcional
  "p-023": px(4853853), // Bicicleta de aire
  "p-024": px(3931367), // Mancuernas ajustables
};
