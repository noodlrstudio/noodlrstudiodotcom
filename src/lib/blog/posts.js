export const posts = [
  {
    number: 1,
    slug: 'audio-routing-before-and-after',
    date: '2026-11-16',
    title: 'What happens when you move one audio cable?',
    summary: 'We traced a cable edit through Noodlr Board’s audio engine. In a 128-route test, the old router made 256 connection calls. The new one made two.',
    topic: 'Audio engineering'
  }
];

export const formatDate = (/** @type {string} */ date) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
