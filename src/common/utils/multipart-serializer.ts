export function multipartSerializer(body: Record<string, unknown>): FormData {
  const fd = new FormData();

  function appendFormData(data: unknown, parentKey?: string) {
    if (data instanceof File || data instanceof Blob) {
      if (!parentKey) throw new Error('FormData key is required');
      fd.append(parentKey, data);
    } else if (Array.isArray(data)) {
      data.forEach((item, idx) => {
        const key = parentKey ? `${parentKey}[${idx}]` : String(idx);
        appendFormData(item, key);
      });
    } else if (typeof data === 'object' && data !== null) {
      Object.entries(data).forEach(([k, v]) => {
        const key = parentKey ? `${parentKey}[${k}]` : k;
        appendFormData(v, key);
      });
    } else if (typeof data !== 'undefined' && parentKey) {
      fd.append(parentKey, data == null ? '' : data.toString());
    }
  }

  appendFormData(body);

  return fd;
}
