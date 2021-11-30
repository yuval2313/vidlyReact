import _ from "lodash";
import { toast } from "react-toastify";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  return _(items).slice(startIndex).take(pageSize).value();
}

export function paginationUtilities(
  items,
  currentPage,
  pageSize,
  searchQueries, // array of query objects: { path, search }
  sortColumn,
  setItems,
  setCurrentPage,
  deleteByIdService
) {
  function handlePageOverCount() {
    const { totalCount } = getPagedData();
    const pageCount = Math.ceil(totalCount / pageSize);
    if (currentPage > pageCount) setCurrentPage(pageCount);
  }

  function handleSearch(setSearchQuery) {
    return (searchQuery) => {
      setCurrentPage(1);
      return setSearchQuery(searchQuery);
    };
  }

  async function handleDelete(item) {
    const filteredItems = items.filter((i) => i._id !== item._id);
    setItems(filteredItems);
    try {
      await deleteByIdService(item._id);
    } catch (ex) {
      const { response } = ex;
      if (response) toast.error(`${response.status} - ${response.data}`);
      setItems(items);
    }
  }

  function getFilteredData(items) {
    let filteredItems = [...items];
    searchQueries.forEach((query) => {
      filteredItems = query.search
        ? filteredItems.filter((i) =>
            _.get(i, query.path).match(new RegExp(`^${query.search}`, "i"))
          )
        : filteredItems;
    });
    return filteredItems;
  }

  function getPagedData(preFilteredItems = items) {
    const filteredItems = getFilteredData(preFilteredItems);

    const sortedItems = _.orderBy(
      filteredItems,
      [sortColumn.path],
      [sortColumn.order]
    );

    const pagedItems = paginate(sortedItems, currentPage, pageSize);

    return { totalCount: filteredItems.length, pagedItems };
  }

  return {
    handlePageOverCount,
    handleSearch,
    handleDelete,
    getFilteredData,
    getPagedData,
  };
}
