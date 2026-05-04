import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  FiArrowLeft,
  FiBriefcase,
  FiCalendar,
  FiGlobe,
  FiMapPin,
  FiUsers,
} from "react-icons/fi";
import companiesData from "../data/companies.json";
import "./CompanyDetail.css";

function CompanyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    const foundCompany = companiesData.find((item) => item.id === Number(id));
    setCompany(foundCompany || null);
  }, [id]);

  if (!company) {
    return (
      <div className="detail-not-found">
        <p>Company not found.</p>
        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => navigate("/")}
        >
          Back to Directory
        </button>
      </div>
    );
  }

  return (
    <div className="detail-page">
      <div className="container">
        <button className="btn-back" onClick={() => navigate(-1)}>
          <FiArrowLeft size={15} /> Back
        </button>

        <div className="detail-card">
          <div className="detail-avatar">{company.name.charAt(0)}</div>
          <h1 className="detail-name">{company.name}</h1>
          <p className="detail-description">{company.description}</p>

          <div className="detail-meta-grid">
            <div className="detail-meta-item">
              <FiMapPin size={16} />
              <div>
                <span className="meta-label">Location</span>
                <span className="meta-value">{company.location}</span>
              </div>
            </div>

            <div className="detail-meta-item">
              <FiBriefcase size={16} />
              <div>
                <span className="meta-label">Industry</span>
                <span className="meta-value">{company.industry}</span>
              </div>
            </div>

            <div className="detail-meta-item">
              <FiCalendar size={16} />
              <div>
                <span className="meta-label">Founded</span>
                <span className="meta-value">{company.founded}</span>
              </div>
            </div>

            <div className="detail-meta-item">
              <FiUsers size={16} />
              <div>
                <span className="meta-label">Employees</span>
                <span className="meta-value">{company.employees}</span>
              </div>
            </div>

            <div className="detail-meta-item">
              <FiGlobe size={16} />
              <div>
                <span className="meta-label">Website</span>
                <a
                  className="meta-value meta-link"
                  href={company.website}
                  target="_blank"
                  rel="noreferrer"
                >
                  {company.website.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompanyDetail;
