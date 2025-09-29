import { format } from "date-fns";
import { id } from "date-fns/locale";

// by providing a default string of 'PP' or any of its variants for `formatStr`
// it will format dates in whichever way is appropriate to the locale
export function formatDate(date: string | null, formatStr = "PPP hh:mm") {
  if (!date) {
    return null;
  }

  return format(new Date(date), formatStr, {
    locale: id,
  });
}

export function formatNumber(num: number, decimals = 0, locale = "id") {
  // create a new NumberFormat object with the desired locale
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
  });

  // return the formatted number
  return formatter.format(num);
}
