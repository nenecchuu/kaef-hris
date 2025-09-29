import { add, differenceInCalendarYears, format, sub } from "date-fns";

/**
 * Get menu based on user type
 *
 * @param {{menu: Object, userType: number}} props
 */
export function getMenu({ menu, userType }) {
  return (
    Object.entries(menu)
      // filter menu based on user type
      .filter(
        ([key, item]) =>
          key.startsWith("sub_menu") ||
          (!key.startsWith("sub_menu") && item.allow.includes(userType)),
      )
      // map submenu, which has been filtered based on user type
      .map(([key, item]) => {
        if (key.startsWith("sub_menu")) {
          const newMenu = Object.entries(item.menu).filter(([, subItem]) =>
            subItem.allow.includes(userType),
          );

          return [key, { ...item, menu: newMenu }];
        }

        return [key, item];
      })
      // filter out any submenu that doesn't have menu
      .filter(
        ([key, item]) =>
          !key.startsWith("sub_menu") ||
          (key.startsWith("sub_menu") && item.menu.length > 0),
      )
  );
}

/**
 * Get menu for supervisor
 *
 * @param {{menu: Object, isSupervisor: boolean}} props
 */
export function getSupervisorMenu({ menu, isSupervisor }) {
  return menu
    .filter(
      ([, item]) =>
        !item.supervisorOnly || (item.supervisorOnly && isSupervisor),
    )
    .map(([key, item]) => {
      if (key.startsWith("sub_menu")) {
        return [
          key,
          {
            ...item,
            menu: item.menu.filter(
              ([, subItem]) =>
                !subItem.supervisorOnly ||
                (subItem.supervisorOnly && isSupervisor),
            ),
          },
        ];
      }

      return [key, item];
    })
    .filter(
      ([key, item]) =>
        !key.startsWith("sub_menu") ||
        (key.startsWith("sub_menu") && item.menu.length > 0),
    );
}

/**
 * @param {{ apply: (arg0: any, arg1: any[]) => void; }} func
 * @param {number} limit
 */
export function throttle(func, limit) {
  let lastFunc;
  let lastRan;

  return function (/** @type {any} */ ...args) {
    if (!lastRan) {
      func.apply(null, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(
        () => {
          if (Date.now() - lastRan >= limit) {
            func.apply(null, args);
            lastRan = Date.now();
          }
        },
        limit - (Date.now() - lastRan),
      );
    }
  };
}

/**
 * @param {string} path
 */
export function basePath(path) {
  return import.meta.env.VITE_APP_URL + path;
}

/**
 * @param {Promise<import("axios").AxiosResponse<any, any>>} callback
 */
export async function artificialDelay(callback, duration = 800) {
  const [response] = await Promise.allSettled([
    callback,
    new Promise((resolve) => {
      setTimeout(resolve, duration);
    }),
  ]);

  if (response.status === "rejected") {
    throw response.reason;
  }

  return response.value;
}

/**
 * @param {any[]} items
 */
export function fakeIds(items) {
  return items.map((item, itemIdx) => ({ ...item, id: itemIdx + 1 }));
}

/**
 * @param {number | bigint} num
 * @param {number=} decimals
 * @param {string=} locale
 */
export function formatNumber(num, decimals = 0, locale = "id") {
  // create a new NumberFormat object with the desired locale
  const formatter = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
  });

  // return the formatted number
  return formatter.format(num);
}

/**
 * @param {string} date The date string format should have the pattern of 'dd/MM/yyyy'
 * @returns string with 'yyyy-MM-dd' pattern
 */
export function formatSearchParamsDateValue(date) {
  const parts = date.split("/");

  return `${parts[2]}-${parts[1]}-${parts[0]}`;
}

/**
 * The method helper to download blob with axios
 * @param {*} response
 * @param {string} blobType
 * @param {string} fileName
 */
export function arrayBufferResponse(response, blobType, fileName) {
  // BE endpoint sends a readable stream of bytes
  const byteArray = new Uint8Array(response);

  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const newBlob = new Blob([byteArray], {
    type: blobType,
  });

  const url = window.URL.createObjectURL(newBlob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", fileName);
  document.body.appendChild(link);
  link.click();
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(url);
  }, 100);
}

/**
 * @param {string} fileName
 * @param {number} maxLength
 */
export function truncateMiddle(fileName, maxLength = 31) {
  if (fileName.length <= maxLength) {
    return fileName;
  }
  let truncatedName = fileName.substring(0, maxLength / 2 - 2);
  truncatedName += "...";
  truncatedName += fileName.substring(fileName.length - maxLength / 2 + 1);

  return truncatedName;
}

export function getYearlyReview(date) {
  return format(
    sub(
      add(date, {
        years: differenceInCalendarYears(date, new Date()),
      }),
      { days: 1 },
    ),
    "dd MMMM",
  );
}
