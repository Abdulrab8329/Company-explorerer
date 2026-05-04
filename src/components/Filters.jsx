import { FiSearch } from "react-icons/fi";
import "./Filters.css";

function Filters({
  search,
  setSearch,
  selectedLocation,
  setSelectedLocation,
  selectedIndustry,
  setSelectedIndustry,
  locations,
  industries,
}) {
  return (
    <div className="filters-bar">
      <div className="search-wrapper">
        <FiSearch className="search-icon" size={16} />
        <input
          type="text"
          className="form-control search-input"
          placeholder="Search by company name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <select
        className="form-select filter-select"
        value={selectedLocation}
        onChange={(e) => setSelectedLocation(e.target.value)}
      >
        <option value="">All Locations</option>
        {locations.map((loc) => (
          <option key={loc} value={loc}>
            {loc}
          </option>
        ))}
      </select>

      <select
        className="form-select filter-select"
        value={selectedIndustry}
        onChange={(e) => setSelectedIndustry(e.target.value)}
      >
        <option value="">All Industries</option>
        {industries.map((ind) => (
          <option key={ind} value={ind}>
            {ind}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Filters;
