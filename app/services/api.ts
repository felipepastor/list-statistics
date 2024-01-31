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

export async function getStatistics(
  query?: string,
  page?: number,
  pageSize?: number
): Promise<{ results: SearchResult[]; totalResults: number }> {
  const response = await fetch(
    `${process.env.HOST_URL}/api/statistics?searchQuery=${query}&page=${page}&pageSize=${pageSize}`
  );
  const data = await response.json();

  return data;
}

export async function getStatistic(
  id: string
): Promise<{ result: SearchResult }> {
  const response = await fetch(
    `${process.env.HOST_URL}/api/statistic?id=${id}`
  );
  const data = await response.json();

  return data;
}

export async function getFavorites(localStorage: string[]): Promise<{
  results: SearchResult[];
  totalResults: number;
}> {
  const response = await fetch(
    `${window.ENV.HOST_URL}/api/favorites?favorites=${JSON.stringify(
      localStorage
    )}`
  );
  const data = await response.json();

  return data;
}
