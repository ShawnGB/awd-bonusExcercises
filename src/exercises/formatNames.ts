const formatNames = (namesList: { name: string }[]): string => {
  const namesString = namesList.map((item) => item.name).join(", ");
  const lastIndex = namesString.lastIndexOf(", ");
  return (
    namesString.substring(0, lastIndex) +
    " & " +
    namesString.substring(lastIndex + 3)
  );
};
