export default function getBackground(url: string): string {
  if (url.includes("/admin")) {
    return `rgb(245, 248, 255)`;
  } else {
    return `rgb(253, 229, 210)`;
  }
}
