import xlsx from 'xlsx';

export const make2DSheet = async (file: File) => {
  const workbook = xlsx.read(file, { type: 'buffer' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const data = xlsx.utils.sheet_to_json(sheet);
  return data;
};
