import { FiMapPin, FiBriefcase, FiArrowRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./CompanyCard.css";

function CompanyCard({ company }) {
  const navigate = useNavigate();

  return (
    <div className="col-12 col-md-6 col-lg-4 mb-4">
      <div className="company-card card h-100">
        <div className="card-body">
          <div className="company-avatar">
            {company.name.charAt(0)}
          </div>
          <h5 className="company-name">{company.name}</h5>
          <div className="company-meta">
            <span className="meta-item">
              <FiMapPin size={14} />
              {company.location}
            </span>
            <span className="meta-item">
              <FiBriefcase size={14} />
              {company.industry}
            </span>
          </div>
          <button
            className="btn-view-detail"
            onClick={() => navigate(`/company/${company.id}`)}
          >
            View Details <FiArrowRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCard;