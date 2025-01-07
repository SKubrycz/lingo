import { readFileSync } from "node:fs";
import { join } from "node:path";

export default function readCodesFile() {
  const filePath = join(__dirname, "codes.txt");
  try {
    const data = readFileSync(filePath, "utf8");
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
