import { isBlob, isFile, isPlainObject } from 'es-toolkit';

export const multipartSerializer =
  (nested = false) =>
  (body: Record<string, unknown>): FormData => {
    const fd = new FormData();

    function appendFormData(data: unknown, parentKey?: string) {
      if (isFile(data) || isBlob(data)) {
        if (!parentKey) throw new Error('FormData key is required');
        fd.append(parentKey, data);
      } else if (Array.isArray(data)) {
        if (nested || !parentKey) {
          data.forEach((item, idx) => {
            const key = parentKey ? `${parentKey}[${idx}]` : String(idx);
            appendFormData(item, key);
          });
        } else {
          appendFormData(JSON.stringify(data), parentKey);
        }
      } else if (isPlainObject(data)) {
        if (nested || !parentKey) {
          Object.entries(data).forEach(([k, v]) => {
            const key = parentKey ? `${parentKey}[${k}]` : k;
            appendFormData(v, key);
          });
        } else {
          appendFormData(JSON.stringify(data), parentKey);
        }
      } else if (typeof data !== 'undefined' && parentKey) {
        fd.append(parentKey, data == null ? '' : data.toString());
      }
    }

    appendFormData(body);

    return fd;
  };
