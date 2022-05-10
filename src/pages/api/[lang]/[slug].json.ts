import * as fs from "node:fs/promises";

const dataPageRegex = /.+data\/(.+)\/(.+).yaml/;

export async function getStaticPaths() {
  const modules = await import.meta.glob("../../../../data/**/*.yaml");

  const pages = Object.entries(modules)
    .filter(([fileName]) => dataPageRegex.test(fileName))
    .map(([fileName]) => {
      const [, lang, slug] = fileName.match(dataPageRegex);
      return { params: { lang, slug } };
    });

  return pages;
}

export async function get({ params }) {
  const { lang, slug } = params;

  const file = await fs.readFile(`../../../../data/${lang}/${slug}.yaml`);

  return {
    body: JSON.stringify(params),
  };
}
