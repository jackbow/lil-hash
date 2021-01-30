import adverbs from './lists/adverbs.js';
import adjectives from './lists/adjectives.js';
import nouns from './lists/nouns.js';
import simple from './lists/simple-words.js';

const random_from = (arr) => arr[Math.floor(arr.length * Math.random())];
const random_any = () =>
  random_from([random_from(adverbs), random_from(adjectives), random_from(nouns), random_from(simple)]);
const random_phrase = (n = 1, sep = '-') => {
  if (n === 1) return random_any();
  const odd = n % 2 === 0;
  let phrase = [random_from(nouns)];
  while (--n > 0) {
    if (n % 2 === (odd ? 1 : 0)) {
      phrase.push(random_from(adjectives));
    } else {
      phrase.push(random_from(adverbs));
    }
  }
  return phrase.reverse().join(sep);
};

export default random_phrase;
