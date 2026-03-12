import { useConverterForm } from '../../viewmodels';

export function ConverterFrame() {
  const { onChange } = useConverterForm();
  return (
    <div>
      <input
        type="file"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        onChange={onChange}
      />
    </div>
  );
}
