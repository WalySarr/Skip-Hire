// src/components/Timeline/Timeline.tsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Timeline.css";
import type { Skip } from "../../types/types";
import HorizontalTimeline from "./HorizontalTimeline";
import VerticalTimeline from "./VerticalTimeline";
import LoadingSpinner from "./LoadingSpinner";
import ErrorMessage from "./ErrorMessage";

const Timeline: React.FC = () => {
  const [skips, setSkips] = useState<Skip[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [selectedSkips, setSelectedSkips] = useState<number[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft"
        );
        setSkips(response.data);
        setLoading(false);
      } catch (err) {
        setError("Error loading data");
        setLoading(false);
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const calculateTotalPrice = (skip: Skip) => {
    return skip.price_before_vat + skip.vat;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const toggleSkipSelection = (id: number) => {
    setSelectedSkips((prev) =>
      prev.includes(id) ? prev.filter((skipId) => skipId !== id) : [...prev, id]
    );
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="timeline-app">
      <header className="app-header">
        <h1>Available Skips in NR32</h1>
        <p className="subtitle">Choose the skip that fits your needs</p>
      </header>

      <div
        className={`timeline-container ${isMobile ? "vertical" : "horizontal"}`}
      >
        {isMobile ? (
          <VerticalTimeline
            skips={skips}
            formatDate={formatDate}
            calculateTotalPrice={calculateTotalPrice}
            selectedSkips={selectedSkips}
            toggleSelection={toggleSkipSelection}
          />
        ) : (
          <HorizontalTimeline
            skips={skips}
            formatDate={formatDate}
            calculateTotalPrice={calculateTotalPrice}
            selectedSkips={selectedSkips}
            toggleSelection={toggleSkipSelection}
          />
        )}
      </div>

      {selectedSkips.length > 0 && (
        <div className="selection-summary">
          <span className="summary-text">
            Imagery and information shown throughout this website may not
            reflect the exact shape or size specification, colours may vary,
            options and/or accessories may be featured at additional cost. (
            {selectedSkips.length})
          </span>
          <div className="selected-items">
            {skips
              .filter((skip) => selectedSkips.includes(skip.id))
              .map((skip) => (
                <div key={skip.id} className="selected-item">
                  <span>
                    {skip.size} yd³ - £{calculateTotalPrice(skip).toFixed(2)}
                  </span>
                  <button
                    className="remove-btn"
                    onClick={() => toggleSkipSelection(skip.id)}
                  >
                    ×
                  </button>
                </div>
              ))}
          </div>
          <button className="cta-button">Order</button>
        </div>
      )}
    </div>
  );
};

export default Timeline;
