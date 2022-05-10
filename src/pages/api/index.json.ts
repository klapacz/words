import fs from "node:fs/promises";
import yaml from 'js-yaml'
import { getContentPages } from "./[lang]/[slug].json";
import { validateIndex } from "@/schemas";

export async function getIndex() {
  const result = {}

  const file = await fs.readFile(`data/index.yaml`, { encoding: 'utf8' });
  const langs = yaml.load(file);
  
  for (const [, longName] of Object.entries(langs)) {
    result[longName] = {}
  }

  const pages = await getContentPages()

  for (const { lang, slug, content } of pages) {
    const { name } = yaml.load(content)
    result[langs[lang]][name] = `${import.meta.env.PUBLIC_BASE_URL || '/'}api/${lang}/${slug}.json`
  }

  if (!validateIndex(result)) {
    throw new Error(validateIndex.errors?.map(e => e.message).join('\n')); 
  }

  return result 
}

export async function get() {
  const result = await getIndex()

  return {
    body: JSON.stringify(result),
  };
}