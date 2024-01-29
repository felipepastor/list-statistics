import fs from "fs/promises";

export type SearchResult = {
  identifier: number;
  title: string;
  link: string;
  subject: string;
  description: string;
  date: string;
  premium: number;
  image_url: string;
  teaser_image_urls: TeaserImageUrl[];
};

export type TeaserImageUrl = {
  width: number;
  src: string;
};

export async function getResults(): Promise<SearchResult[]> {
  const rawFileContent = await fs.readFile("app/data/searchResults.json", {
    encoding: "utf-8",
  });
  const data = JSON.parse(rawFileContent);
  const storedResults = data.items ?? [];
  return storedResults;
}
