function SearchBar({ search, setSearch }) {
  return (
    <div className="mb-4">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search todos..."
        className="w-full p-2 border rounded"
      />
    </div>
  );
}

export default SearchBar;
