interface String {
  toLowerCase<S extends String>(this: S): Lowercase<S>;
  toUpperCase<S extends String>(this: S): Uppercase<S>;
}
