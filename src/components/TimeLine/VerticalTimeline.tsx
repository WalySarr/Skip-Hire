import React from "react";
import type { TimelineProps } from "../../types/types";

const VerticalTimeline: React.FC<TimelineProps> = ({
  skips,
  formatDate,
  calculateTotalPrice,
  selectedSkips,
  toggleSelection,
}) => (
  <div className="vertical-timeline">
    <div className="timeline-line"></div>
    {skips.map((skip, index) => (
      <React.Fragment key={skip.id}>
        <div
          className={`timeline-item ${
            selectedSkips.includes(skip.id) ? "selected" : ""
          }`}
          style={{ "--delay": index * 0.1 + "s" } as React.CSSProperties}
          onClick={() => toggleSelection(skip.id)}
        >
          <div className="timeline-dot">
            <div className="dot-pulse"></div>
          </div>

          <div className="timeline-content">
            <div className="skip-header">
              <span className="skip-size">{skip.size} Yard Skip</span>
              <span className="skip-price">
                £{calculateTotalPrice(skip).toFixed(2)}
              </span>
            </div>

            <div className="skip-details">
              <div className="detail-row">
                <span className="detail-label">Hire Period:</span>
                <span className="detail-value">
                  {skip.hire_period_days} days
                </span>
              </div>

              <div className="tags-container">
                <span
                  className={`tag ${
                    skip.allowed_on_road ? "road-allowed" : "road-not-allowed"
                  }`}
                >
                  {skip.allowed_on_road ? "On Road" : "Not Allowed On The Road"}
                </span>
                <span
                  className={`tag ${
                    skip.allows_heavy_waste ? "waste-heavy" : "waste-light"
                  }`}
                >
                  {skip.allows_heavy_waste ? "Heavy" : "Light"}
                </span>
              </div>
            </div>

            <div className="skip-footer">
              <span className="update-date">
                Updated: {formatDate(skip.updated_at)}
              </span>
            </div>
          </div>
        </div>

        {index < skips.length - 1 && <div className="timeline-connector"></div>}
      </React.Fragment>
    ))}
  </div>
);

export default VerticalTimeline;
