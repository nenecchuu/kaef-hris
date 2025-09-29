export function isNotEmpty<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined && value !== "";
}

// https://github.com/sindresorhus/is-plain-obj/blob/main/index.js
export function isPlainObject(value: unknown): value is object {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const prototype = Object.getPrototypeOf(value);

  return (
    (prototype === null ||
      prototype === Object.prototype ||
      Object.getPrototypeOf(prototype) === null) &&
    !(Symbol.toStringTag in value) &&
    !(Symbol.iterator in value)
  );
}

export function validationErrorMap(value: unknown) {
  if (isPlainObject(value)) {
    return new Map<string, string>(
      Object.entries(value).map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(" ") : value,
      ]),
    );
  }

  return null;
}

export function searchParamsToObject(searchParams: URLSearchParams) {
  const entries = [...searchParams];
  const map = new Map<string, string | string[]>();

  // transform search params to object
  // if there are multiple keys, the value needs to be saved inside an array
  // ex: limit=10&page=1&search=aaaa&status=pending&status=accepted => { limit: '10', page: '1', search: 'aaaa', status: ['pending', 'accepted'] }
  entries.map(([key, value]) => {
    if (map.has(key)) {
      const val = map.get(key)!;
      const newVal = Array.isArray(val) ? [...val, value] : [val, value];

      map.set(key, newVal);
    } else {
      map.set(key, value);
    }
  });

  return Object.fromEntries(map.entries());
}

export function formDataToObject(formData: FormData) {
  const entries = [...formData] as [string, string][];
  const map = new Map<string, string | string[]>();

  // transform formData to object
  // if there are multiple keys, the value needs to be saved inside an array
  // ex: { limit: '10', page: '1', search: 'aaaa', status: ['pending', 'accepted'] }
  entries.map(([key, value]) => {
    if (map.has(key)) {
      const val = map.get(key)!;
      const newVal = typeof val === "string" ? [val, value] : [...val, value];

      map.set(key, newVal);
    } else {
      map.set(key, value);
    }
  });

  return Object.fromEntries(map.entries());
}

export function truncateMiddle(fileName: string, maxLength = 31) {
  if (fileName.length <= maxLength) {
    return fileName;
  }
  let truncatedName = fileName.substring(0, maxLength / 2 - 2);
  truncatedName += "...";
  truncatedName += fileName.substring(fileName.length - maxLength / 2 + 1);

  return truncatedName;
}
