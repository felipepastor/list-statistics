import rawFileContent from "~/data/searchResults.json";

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
  query?: string,
  page?: number,
  pageSize?: number
): Promise<{ results: SearchResult[]; totalResults: number }> {
  const data = rawFileContent;

  const filteredResults =
    data?.items?.filter((item: SearchResult) =>
      item.title.toLowerCase().includes(query?.toLocaleLowerCase() || "")
    ) ?? [];

  const totalResults = filteredResults.length;

  if (page && pageSize) {
    // Calculate start and end index for the slice method
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const storedResults = filteredResults.slice(startIndex, endIndex);
    return { results: storedResults, totalResults };
  }

  return { results: filteredResults, totalResults };
}
