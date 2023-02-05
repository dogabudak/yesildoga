import type { ParsedUrlQuery } from 'querystring';

/**
 * Next.js has no great QueryParam Parsing so we do it ourself (so its typescript conform).
 * @param query - The Nextjs query
 */
export function getQueryParams(query: ParsedUrlQuery): Record<string, string> {
  const keys = Object.keys(query);
  const result: Record<string, string> = {};
  keys.forEach((key) => {
    const value = query[key];
    if (typeof value === 'object') {
      [result[key]] = value;
    } else if (value) {
      result[key] = value;
    }
  });

  return result;
}
