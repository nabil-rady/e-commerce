export default function toKebabCase(str: string): string {
  return str
    .split(" ")
    .map((word) => word.toLowerCase())
    .join("-");
}
