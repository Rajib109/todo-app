function Pagination({ page, pages, setPage }) {
  if (pages <= 1) return null; // no pagination needed if only 1 page

  const handlePrev = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < pages) setPage(page + 1);
  };

  return (
    <div className="flex justify-center gap-2 mt-4">
      <button
        onClick={handlePrev}
        disabled={page === 1}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Prev
      </button>

      <span className="px-3 py-1">
        Page {page} of {pages}
      </span>

      <button
        onClick={handleNext}
        disabled={page === pages}
        className="px-3 py-1 border rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
}

export default Pagination;
