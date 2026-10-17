import { estimateReadMinutes, parseBlogBody } from './blog-body';

describe('parseBlogBody', () => {
  it('splits text, headings and code blocks', () => {
    const body = ['Intro line', '', '## The fix', 'Explain it', '', '```ts', 'const a = 1;', '```'].join('\n');

    expect(parseBlogBody(body)).toEqual([
      { type: 'text', content: 'Intro line' },
      { type: 'heading', content: 'The fix', id: 'the-fix' },
      { type: 'text', content: 'Explain it' },
      { type: 'code', content: 'const a = 1;', lang: 'ts' },
    ]);
  });

  it('gives repeated headings unique ids', () => {
    const ids = parseBlogBody('## Notes\n\n## Notes')
      .filter((block) => block.type === 'heading')
      .map((block) => block.id);

    expect(ids).toEqual(['notes', 'notes-2']);
  });
});

describe('estimateReadMinutes', () => {
  it('never returns less than one minute', () => {
    expect(estimateReadMinutes('short')).toBe(1);
  });
});