export default async function searchFn({
  val,
  route,
  apiMethod = 'getAllFiltered',
  filters,
}: {
  val?: string;
  route: {};
  apiMethod: string;
  filters?: object;
}) {
  const data: object = filters
    ? { filters }
    : {
        filters: { title: `LIKE(${val})` },
      };
  return await route[apiMethod](data);
}
