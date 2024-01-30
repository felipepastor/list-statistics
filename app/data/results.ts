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

export async function getResults(
  query = "",
  page = 1,
  pageSize = 10
): Promise<{ results: SearchResult[]; totalResults: number }> {
  const rawFileContent = await fs.readFile("app/data/searchResults.json", {
    encoding: "utf-8",
  });

  const data = JSON.parse(rawFileContent);

  const filteredResults =
    data?.items?.filter((item: SearchResult) =>
      item.title.toLowerCase().includes(query.toLocaleLowerCase())
    ) ?? [];

  const totalResults = filteredResults.length;

  // Calculate start and end index for the slice method
  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const storedResults = filteredResults.slice(startIndex, endIndex);

  return { results: storedResults, totalResults };
}
