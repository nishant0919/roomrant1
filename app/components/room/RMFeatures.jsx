import React from "react";

function RMFeatures({ data }) {
  return (
    <div className="w-full">
      <h2 className="text-xl font-bold mb-2">Features</h2>
      {/* make a table  */}
      <table className="table-auto w-full">
        <tbody>
          <tr>
            <td className="border px-4 py-2">Type</td>
            <td className="border px-4 py-2">{data.type}</td>
          </tr>
          <tr>
            <td className="border px-4 py-2">Rent (Per Month)</td>
            <td className="border px-4 py-2">${data.rent}</td>
          </tr>
          {data.features.map((feature, index) => (
            <tr key={index}>
              <td className="border capitalize px-4 py-2">{feature}</td>
              <td className="border px-4 py-2">Yes</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RMFeatures;
