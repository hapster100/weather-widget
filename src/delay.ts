export const delay = () => new Promise<void>((res) => {
  setTimeout(() => res(), 200 + 200 * Math.random());
});

export const slowFetch = async (url: string) => {
  await delay();
  return fetch(url);
};
