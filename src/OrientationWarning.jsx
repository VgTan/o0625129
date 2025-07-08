// src/components/OrientationWarning.jsx
import React, { useEffect, useState } from "react";

const OrientationWarning = () => {
  const [isPortrait, setIsPortrait] = useState(window.innerHeight > window.innerWidth);

  const handleOrientation = () => {
    setIsPortrait(window.innerHeight > window.innerWidth);
  };

  useEffect(() => {
    window.addEventListener("resize", handleOrientation);
    window.addEventListener("orientationchange", handleOrientation);
    return () => {
      window.removeEventListener("resize", handleOrientation);
      window.removeEventListener("orientationchange", handleOrientation);
    };
  }, []);

  return isPortrait ? (
    <div className="orientation-overlay">
      Silakan putar perangkat ke <strong>mode landscape</strong>.
    </div>
  ) : null;
};

export default OrientationWarning;
