import React, { useEffect, useState } from "react";

const VendorPage = () => {
  const [vendors, setVendors] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");

  const fetchVendors = async (currentPage) => {
    try {
      const response = await fetch(
        `http://127.0.0.1:5000/vendors?page=${currentPage}&per_page=5`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setVendors(data.vendors);
        setPagination(data.meta);
      } else {
        setError(data.error || "Failed to fetch vendors.");
      }
    } catch (err) {
      console.error("Error fetching vendors:", err);
      setError("An error occurred while fetching vendors.");
    }
  };

  useEffect(() => {
    fetchVendors(page);
  }, [page]);

  const handleNextPage = () => {
    if (pagination.has_next) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (pagination.has_prev) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className="vendor-page">
      <h2 className="text-2xl font-bold mb-4">Vendors</h2>
      {error && <p className="error-message">{error}</p>}
      {!error && vendors.length > 0 ? (
        <>
          <table>
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  ID
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Name
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Email
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Phone Number
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                  Farm Name
                </th>
              </tr>
            </thead>
            <tbody>
              {vendors.map((vendor) => (
                <tr key={vendor.id} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {vendor.id}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {vendor.name}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {vendor.email}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {vendor.phone_number || "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-600">
                    {vendor.farm_name || "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination-controls">
            <button onClick={handlePrevPage} disabled={!pagination.has_prev}>
              Previous
            </button>
            <span>
              Page {pagination.current_page} of {pagination.total_pages}
            </span>
            <button onClick={handleNextPage} disabled={!pagination.has_next}>
              Next
            </button>
          </div>
        </>
      ) : (
        !error && <p>No vendors available.</p>
      )}
    </div>
  );
};

export default VendorPage;
