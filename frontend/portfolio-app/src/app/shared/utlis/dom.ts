/** Hides an <img> that failed to load so the placeholder behind it shows instead. */
export function hideBrokenImage(event: Event): void {
  (event.target as HTMLImageElement).style.display = 'none';
}