import { CalculateTotalParams } from "./interfaces";

export function calculateTotal({
  quantity,
  produtoPrice,
  selectedAdicionais,
  bebidasTotal,
}: CalculateTotalParams): number {
  const base = produtoPrice;

  const multiplicaveis = ['vai querer bebida?'];
  const isAcompanhamento = (groupTitle?: string) =>
    groupTitle?.toLowerCase().includes('acompanhamento');

  const multiplicavelExtrasTotal = selectedAdicionais
    .filter((a) => multiplicaveis.includes(a.groupTitle?.toLowerCase() || ''))
    .reduce((sum, a) => sum + (a.price || 0), 0);

  const naoMultiplicavelExtrasTotal = selectedAdicionais
    .filter(
      (a) =>
        !multiplicaveis.includes(a.groupTitle?.toLowerCase() || '') &&
        !isAcompanhamento(a.groupTitle)
    )
    .reduce((sum, a) => sum + (a.price || 0), 0);

  const acompanhamentosTotal = selectedAdicionais
    .filter((a) => isAcompanhamento(a.groupTitle))
    .reduce((sum, a) => sum + (a.price || 0), 0);

  const unit = base + multiplicavelExtrasTotal + bebidasTotal;
  const multiplied = unit * quantity;

  return multiplied + naoMultiplicavelExtrasTotal + acompanhamentosTotal;
}
