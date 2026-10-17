export type BodyBlock =
  | { readonly type: 'text'; readonly content: string }
  | { readonly type: 'heading'; readonly content: string; readonly id: string }
  | { readonly type: 'code'; readonly content: string; readonly lang: string };

const FENCE = '```';
const HEADING_PREFIX = '## ';
const WORDS_PER_MINUTE = 200;

function toUniqueId(text: string, used: Map<string, number>): string {
  const base = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '') || 'section';
  const count = (used.get(base) ?? 0) + 1;
  used.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}

/** Splits a post body into text, `## heading` and fenced code blocks. */
export function parseBlogBody(body: string): BodyBlock[] {
  const blocks: BodyBlock[] = [];
  const usedIds = new Map<string, number>();
  const lines = body.split('\n');
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmed = line.trim();

    if (trimmed.startsWith(FENCE)) {
      const lang = trimmed.replace(/```/g, '').trim();
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith(FENCE)) {
        codeLines.push(lines[i]);
        i++;
      }
      blocks.push({ type: 'code', content: codeLines.join('\n'), lang });
      i++;
    } else if (trimmed.startsWith(HEADING_PREFIX)) {
      const content = trimmed.replace(/^##\s*/, '');
      blocks.push({ type: 'heading', content, id: toUniqueId(content, usedIds) });
      i++;
    } else if (trimmed === '') {
      i++;
    } else {
      const paragraph = [line];
      i++;
      while (
        i < lines.length &&
        lines[i].trim() !== '' &&
        !lines[i].trim().startsWith(FENCE) &&
        !lines[i].trim().startsWith(HEADING_PREFIX)
      ) {
        paragraph.push(lines[i]);
        i++;
      }
      blocks.push({ type: 'text', content: paragraph.join('\n') });
    }
  }

  return blocks;
}

export function estimateReadMinutes(body: string): number {
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WORDS_PER_MINUTE));
}