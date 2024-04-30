import React from "react";

function RmMap({ address }) {
  return (
    <div className="p-2">
      <iframe
        src={`https://maps.google.com/maps?q=${address}&hl=en&z=14&output=embed`}
        width="600"
        height="450"
        style={{ border: 0 }}
        allowfullscreen=""
        loading="lazy"
      ></iframe>
    </div>
  );
}

export default RmMap;
