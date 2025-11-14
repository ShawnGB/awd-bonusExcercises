// first approach but O(n*m)

import { argv0 } from "process";

const formatOrder = (orderString: string) => {
  //hashmap as reference for lookup
  const menu = [
    "Burger",
    "Fries",
    "Chicken",
    "Pizza",
    "Sandwhich",
    "Onionrings",
    "Milkshake",
    "Coke",
  ];

  // variable to store result
  const result = menu.map((item: string) => {
    var start = 0;
    var count = [];
    const lowerItem = item.toLocaleLowerCase();

    while (start <= orderString.length) {
      const nextIndex = orderString.indexOf(lowerItem, start);
      if (nextIndex === -1) break;

      count.push(item);
      start = nextIndex + lowerItem.length;
    }
    return count;
  });

  return result.flat().join(", ");
};

// second approach

const secondAppraoch = (orderString: string) => {
  // create menu Array

  const menuMap = new Map<string, number>([
    ["Burger", 0],
    ["Fries", 0],
    ["Chicken", 0],
    ["Pizza", 0],
    ["Sandwich", 0],
    ["Onionrings", 0],
    ["Milkshake", 0],
    ["Coke", 0],
  ]);

  // get length of shortes word and length of longest word, create substring of current state to compoare
  const itemLengths = Array.from(menuMap.keys()).map((item) => item.length);
  const shortestItem = Math.min(...itemLengths); // Nutzt Spread-Operator auf Array von Längen
  const longestItem = Math.max(...itemLengths);

  var startIndex = 0;
  var endIndex = shortestItem;

  // go thourgh order substring start at zero and length of shortest word
  // compare to values
  // if match result push substring and start again from index of substring length +1
  // Could make this recursive, Better?
  // if no match increase substing length by 1
  // reapeat until match, assuming no uneccessary characters
  while (startIndex < orderString.length) {
    // need to capitalize the first letter of the substring
    var subsringToMatch = orderString
      .substring(startIndex, endIndex)
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
    if (menuMap.has(subsringToMatch)) {
      const value = menuMap.get(subsringToMatch) as number;
      menuMap.set(subsringToMatch, value + 1);
      startIndex = endIndex;
      endIndex = startIndex + shortestItem;
      continue;
    }
    if (subsringToMatch.length > longestItem || endIndex > orderString.length) {
      throw new Error(
        `No valid menu items found in the string, sanitize input`,
      );
    }
    endIndex++;
  }
  //
  //
  // map out results item* count ... flatten and return
  const result = [...menuMap.entries()]
    .filter(([_, count]) => count > 0)
    .flatMap(([key, count]) => Array(count).fill(key))
    .join(" ");

  return result;
};

//geminissolution ______
//
//
//// Optimierter Ansatz (Beste Praxis)
const optimalApproach = (orderString: string) => {
  const menuItems = [
    "Burger",
    "Fries",
    "Chicken",
    "Pizza",
    "Sandwich", // Korrigiert: war "Sandwhich"
    "Onionrings",
    "Milkshake",
    "Coke",
  ];

  // 1. Erstelle ein Regex-Muster, das alle Items enthält, ignoriere Groß-/Kleinschreibung (i) und suche global (g)
  // Das Muster würde ungefähr so aussehen: /Burger|Fries|Chicken|Pizza|Sandwich|Onionrings|Milkshake|Coke/gi
  const pattern = new RegExp(menuItems.join("|"), "gi");

  // 2. Nutze .matchAll() (oder .match(pattern)) um alle Treffer zu finden
  // .matchAll() gibt einen Iterator zurück, der alle gefundenen Items liefert
  const matches = [...orderString.matchAll(pattern)];

  // 3. Extrahieren der gefundenen Werte und Verknüpfung
  return matches
    .map((match) => match[0]) // match[0] ist der gefundene String (z.B. 'burger' oder 'Fries')
    .join(", ");
};
