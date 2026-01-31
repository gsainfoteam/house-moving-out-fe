export function multipartSerializer<Body extends Record<string, { toString: () => string }>>(
  body: Body,
) {
  const fd = new FormData();
  Object.entries(body).forEach(([key, value]) =>
    fd.append(key, value instanceof Blob ? value : value.toString()),
  );
  return fd;
}
