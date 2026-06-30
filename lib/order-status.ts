/** Estados de pedido y sus etiquetas legibles (compartido cliente/servidor). */
export const ORDER_STATUSES = [
  { value: "PENDIENTE", label: "Pendiente" },
  { value: "PAGO_INICIADO", label: "Pago iniciado" },
  { value: "PAGO_APROBADO", label: "Pago aprobado" },
  { value: "PAGO_RECHAZADO", label: "Pago rechazado" },
  { value: "PAGO_CANCELADO", label: "Pago cancelado" },
  { value: "PREPARANDO", label: "Preparando despacho" },
  { value: "DESPACHADO", label: "Despachado" },
  { value: "ENTREGADO", label: "Entregado" },
] as const;

export const orderStatusLabel: Record<string, string> = Object.fromEntries(
  ORDER_STATUSES.map((s) => [s.value, s.label]),
);
