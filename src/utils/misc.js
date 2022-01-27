export const excludeTags = (content) => content.replace(/<[^>]*>/g, '');

export const camelCase = (data) => data.toString().replace(/\s\w/g, (match) => match.toUpperCase().trim());

export const sentenceIntoParagraph = (content, key, className) =>
  content.split('. ').map((text, index, texts) => (
    <p key={key + index} className={className}>
      {text + (index < texts.length - 1 ? '.' : '')}
    </p>
  ));
