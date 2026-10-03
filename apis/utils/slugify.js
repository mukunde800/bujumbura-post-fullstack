import slugifyLib from 'slugify';

export default function slugify(text) {
  return slugifyLib(text, { lower: true, strict: true, locale: 'fr' });
}