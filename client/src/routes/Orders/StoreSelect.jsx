import { useState, useRef, useEffect } from "react";

export default function StoreSelect({ stores, onChange }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const ref = useRef(null);

  const filteredStores = stores.filter(store =>
    store?.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  function selectStore(store) {
    setSelected(store);
    setQuery("");
    setOpen(false);
    onChange?.(store);
  }

  function clear() {
    setSelected(null);
    setQuery("");
    onChange?.(null);
  }

  return (
    <div ref={ref} className="relative w-80">

      {/* Chip */}
      {selected && (
        <div className="flex items-center mb-2 inline-flex bg-blue-100 text-blue-800 rounded-full px-3 py-1 text-sm">
          <span className="truncate max-w-[200px]" title={selected}>
            {selected}
          </span>
          <button
            onClick={clear}
            className="ml-2 text-blue-500 hover:text-blue-700"
          >
            ×
          </button>
        </div>
      )}

      {/* Input */}
      <div
        className="flex items-center gap-2 border border-gray-300 rounded-lg px-3 py-2 bg-white shadow-sm focus-within:ring-2 focus-within:ring-blue-400"
        onClick={() => setOpen(true)}
      >
        <input
          value={query}
          onFocus={() => setOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          placeholder="Filter by store..."
          className="flex-1 outline-none text-sm"
        />

        {selected && (
          <button
            onClick={clear}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        )}
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-56 overflow-y-auto">
          {filteredStores.length === 0 && (
            <div className="p-3 text-sm text-gray-500">
              No stores found
            </div>
          )}

          {filteredStores.map(store => (
            <div
              key={store}
              onClick={() => selectStore(store)}
              title={store}
              className="px-3 py-2 cursor-pointer hover:bg-blue-50 truncate text-sm"
            >
              {store}
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
