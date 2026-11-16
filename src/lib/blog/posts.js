export const posts = [
  {
    number: 1,
    slug: 'audio-routing-before-and-after',
    date: '2026-11-16',
    title: 'How Noodlr reconnects one audio cable',
    summary: 'In a 128-route test, changing one audio cable took 256 connection calls before the routing update and two after it.',
    topic: 'Audio engineering'
  }
];

export const formatDate = (/** @type {string} */ date) =>
  new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' }).format(new Date(date));
