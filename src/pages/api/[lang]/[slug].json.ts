import fs from "node:fs/promises";
import yaml from 'js-yaml'

export async function getStaticPaths() {
  const modules = await import.meta.glob("/data/**/*.yaml", {as: 'raw'});
  const pages = []
  
  for (const [fileName] of Object.entries(modules)) {
    const match = fileName.match(/.+data\/(.+)\/(.+).yaml/)
    if (!match) continue
      
    const [, lang, slug] = match
    pages.push({ params: { lang, slug } })
  }

  return pages;
}

export async function get({ params }) {
  const { lang, slug } = params;

  const file = await fs.readFile(`data/${lang}/${slug}.yaml`, { encoding: 'utf8' });
  const content = yaml.load(file);

  return {
    body: JSON.stringify(content),
  };
}
