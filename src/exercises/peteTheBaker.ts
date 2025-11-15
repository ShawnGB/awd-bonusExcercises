interface CakeInterface {
  [key: string]: number;
}

const cakes = (recipe: CakeInterface, available: CakeInterface): number => {
  const availableMap = new Map<string, number>(Object.entries(available));

  return (
    Object.entries(recipe).reduce(
      (minCakes, [ingredient, needed]) => {
        const availableAmount = availableMap.get(ingredient) ?? 0;
        const possible = Math.floor(availableAmount / needed);

        if (possible === 0) return 0;

        if (minCakes === null) return possible;

        return Math.min(minCakes, possible);
      },
      null as number | null,
    ) ?? 0
  );
};
