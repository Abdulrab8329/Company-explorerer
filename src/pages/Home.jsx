import { useState, useEffect } from "react";
import companiesData from "../data/companies.json";
import CompanyCard from "../components/CompanyCard";
import Filters from "../components/Filters";
import "./Home.css";

function Home() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const ITEMS_PER_PAGE = 9;

  useEffect(() => {
    const timer = setTimeout(() => {
      setCompanies(companiesData);
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedLocation, selectedIndustry]);

  const locations = [...new Set(companies.map((c) => c.location))].sort();
  const industries = [...new Set(companies.map((c) => c.industry))].sort();

  const filtered = companies.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedLocation ? c.location === selectedLocation : true) &&
      (selectedIndustry ? c.industry === selectedIndustry : true)
    );
  });

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const paginated = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="home-page">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">CompanyExplorer</h1>
          <p className="page-subtitle">Explore top companies from around the world</p>
        </div>

        <Filters
          search={search}
          setSearch={setSearch}
          selectedLocation={selectedLocation}
          setSelectedLocation={setSelectedLocation}
          selectedIndustry={selectedIndustry}
          setSelectedIndustry={setSelectedIndustry}
          locations={locations}
          industries={industries}
        />

        {loading ? (
          <div className="loading-state">
            <div className="spinner-border text-primary" role="status" />
            <p>Loading companies...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="empty-state">
            <p>No companies found matching your filters.</p>
          </div>
        ) : (
          <>
            <p className="result-count">{filtered.length} companies found</p>
            <div className="row">
              {paginated.map((company) => (
                <CompanyCard key={company.id} company={company} />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination-bar">
                <button
                  className="page-btn"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((p) => p - 1)}
                >
                   Prev
                </button>

                <div className="page-numbers">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      className={`page-number ${currentPage === page ? "active" : ""}`}
                      onClick={() => setCurrentPage(page)}
                    >
                      {page}
                    </button>
                  ))}
                </div>

                <button
                  className="page-btn"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((p) => p + 1)}
                >
                  Next 
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Home;