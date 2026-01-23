type SwitchCaseProps<T extends PropertyKey> = {
  value: T;
  caseBy: Partial<Record<T, React.ReactNode>>;
  defaultComponent?: React.ReactNode;
};

export function SwitchCase<T extends PropertyKey>({
  value,
  caseBy,
  defaultComponent = null,
}: SwitchCaseProps<T>) {
  const hasCase = Object.prototype.hasOwnProperty.call(caseBy, value);

  if (hasCase) {
    return <>{caseBy[value]}</>;
  }

  return <>{defaultComponent}</>;
}
