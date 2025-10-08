function SortControls({ sort, setSort, order, setOrder }) {
  return (
    <div className="flex gap-2 items-center mb-4">
      <label className="font-medium">Sort by:</label>

      {/* Field selection */}
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value)}
        className="p-2 border rounded-sm"
      >
        <option value="createdAt">Date Created</option>
        <option value="text">Text</option>
      </select>

      {/* Order selection */}
      <select
        value={order}
        onChange={(e) => setOrder(e.target.value)}
        className="p-2 border rounded-sm"
      >
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
  );
}

export default SortControls;
