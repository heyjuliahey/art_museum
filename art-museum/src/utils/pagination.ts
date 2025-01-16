export const paginate = (
  items: any[],
  currentPage: number,
  postsPerPage: number,
) => {
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  return items.slice(firstPostIndex, lastPostIndex);
};
