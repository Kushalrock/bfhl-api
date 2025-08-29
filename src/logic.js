function buildUserId(fullName, dobDDMMYYYY) {
  const slug = (fullName || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "_");
  return `${slug}_${dobDDMMYYYY}`;
}

function isIntegerLike(str) {
  return /^-?\d+$/.test(str);
}

function isAlphaOnly(str) {
  return /^[A-Za-z]+$/.test(str);
}

function extractLetters(str) {
  return (str.match(/[A-Za-z]/g) || []);
}

function alternatingCapsFromReversed(chars) {
  const rev = [...chars].reverse();
  return rev
    .map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase()))
    .join("");
}

function processData(data) {
  const even_numbers = [];
  const odd_numbers = [];
  const alphabets = [];
  const special_characters = [];
  const letterBag = [];
  let sum = 0;

  for (const item of data) {
    const raw = typeof item === "string" ? item.trim() : String(item);

    if (typeof item === "string") {
      letterBag.push(...extractLetters(raw));
    }

    if (isIntegerLike(raw)) {
      const n = parseInt(raw, 10);
      (Math.abs(n) % 2 === 0 ? even_numbers : odd_numbers).push(raw);
      sum += n;
    } else if (isAlphaOnly(raw)) {
      alphabets.push(raw.toUpperCase());
    } else {
      special_characters.push(raw);
    }
  }

  const concat_string = alternatingCapsFromReversed(letterBag);

  return {
    even_numbers,
    odd_numbers,
    alphabets,
    special_characters,
    sum: String(sum),
    concat_string
  };
}

module.exports = { buildUserId, processData };
