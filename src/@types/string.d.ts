interface String {
  toLowerCase<S extends string>(this: S): Lowercase<S>;
  toUpperCase<S extends string>(this: S): Uppercase<S>;
}
