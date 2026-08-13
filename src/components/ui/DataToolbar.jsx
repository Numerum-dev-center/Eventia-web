import { Search } from "lucide-react";

function DataToolbar({ value, onChange, placeholder = "Rechercher…", countLabel, children }) {
  return (
    <div className="apple-data-toolbar">
      <label className="apple-data-search">
        <Search size={16} />
        <span className="sr-only">Rechercher</span>
        <input type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
      </label>
      <div className="apple-data-toolbar-meta">
        {countLabel && <span>{countLabel}</span>}
        {children}
      </div>
    </div>
  );
}

export default DataToolbar;
