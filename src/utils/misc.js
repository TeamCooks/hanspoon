export const excludeTags = (content) => content.replace(/<[^>]*>/g, '');

export const camelCase = (data) => data.toString().replace(/\s\w/g, (match) => match.toUpperCase().trim());
