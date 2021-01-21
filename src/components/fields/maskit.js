export function masker(value, mask, masked = true, tokens) {
  value = value || ""
  mask = mask || ""
  var iMask = 0
  var iValue = 0
  var output = ""
  var cMask
  while (iMask < mask.length && iValue < value.length) {
    cMask = mask[iMask]
    var masker = tokens[cMask]
    var cValue = value[iValue]
    if (masker && !masker.escape) {
      if (masker.pattern.test(cValue)) {
        output += masker.transform ? masker.transform(cValue) : cValue
        iMask++
      }
      iValue++
    } else {
      if (masker && masker.escape) {
        iMask++ // take the next mask char and treat it as char
        cMask = mask[iMask]
      }
      if (masked) output += cMask
      if (cValue === cMask) iValue++ // user typed the same char
      iMask++
    }
  }

  // fix mask that ends with a char: (#)
  var restOutput = ""
  while (iMask < mask.length && masked) {
    cMask = mask[iMask]
    if (tokens[cMask]) {
      restOutput = ""
      break
    }
    restOutput += cMask
    iMask++
  }

  return output + restOutput
}

export const tokens = {
  "#": { pattern: /\d/ },
  X: { pattern: /[0-9a-zA-Z]/ },
  S: { pattern: /[a-zA-Z]/ },
  A: { pattern: /[a-zA-Z]/, transform: v => v.toLocaleUpperCase() },
  a: { pattern: /[a-zA-Z]/, transform: v => v.toLocaleLowerCase() },
  "!": { escape: true }
}
