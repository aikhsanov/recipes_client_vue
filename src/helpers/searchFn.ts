export default async function searchFn({
  val,
  route,
  apiMethod = 'getAllFiltered',
  filters,
}: {
  val?: string;
  route: any;
  apiMethod?: string;
  filters?: {} | null;
}) {
  const data: object = filters
    ? { filters }
    : {
        filters: { title: `LIKE(${val})` },
      };
  return await route[apiMethod](data);
}
