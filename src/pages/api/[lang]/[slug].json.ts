import fs from "node:fs/promises";
import yaml from 'js-yaml'

export async function getContentPages() {
  const modules = await import.meta.glob("/data/**/*.yaml", {as: 'raw'});
  const pages: { lang: string, slug: string, content: string }[] = []
  
  for (const [fileName, content] of Object.entries(modules)) {
    const match = fileName.match(/.+data\/(.+)\/(.+).yaml/)
    if (!match) continue
      
    const [, lang, slug] = match
    pages.push({ lang, slug, content: content as unknown as string })
  }

  return pages;
}

export async function getStaticPaths() {
  const pages = await getContentPages();

  return pages.map(({ lang, slug }) => ({
    params: { lang, slug },
  }));
}

export async function get({ params }) {
  const { lang, slug } = params;

  const file = await fs.readFile(`data/${lang}/${slug}.yaml`, { encoding: 'utf8' });
  const content = yaml.load(file);

  return {
    body: JSON.stringify(content),
  };
}
