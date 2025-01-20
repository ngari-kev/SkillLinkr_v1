import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "./Footer";
import SearchBar from "../SearchBar";
import { authenticatedFetch } from "../../utils/api";

const Marketplace = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await authenticatedFetch(
        "https://skilllinkr.ngarikev.tech/api/users/all",
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users || []);
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (searchQuery, matchAll) => {
    if (!searchQuery.trim()) {
      setIsSearchActive(false);
      return;
    }

    setLoading(true);
    setError(null);
    setIsSearchActive(true);

    try {
      const endpoint = matchAll ? "/skills/search-all" : "/skills/search";
      const skills = searchQuery
        .split(",")
        .map((skill) => skill.trim())
        .join(",");

      const response = await authenticatedFetch(
        `https://skilllinkr.ngarikev.tech/api${endpoint}?skills=${skills}`,
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      setSearchResults(data.users || []);
      setCurrentPage(1);
    } catch (err) {
      setError("Failed to perform search");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentData = isSearchActive ? searchResults : users;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(currentData.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleResetSearch = () => {
    setIsSearchActive(false);
    setSearchResults([]);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <section id="marketplace" className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl text-sky-900 font-bold mb-8 text-center">
            Marketplace
          </h3>

          {/* Search Bar Component */}
          <SearchBar onSearch={handleSearch} />

          {/* Search Active Indicator */}
          {isSearchActive && (
            <div className="flex justify-center mb-4">
              <button
                onClick={handleResetSearch}
                className="text-sky-600 hover:text-sky-800 underline"
              >
                Clear Search Results
              </button>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-900"></div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-red-500 text-center my-4 p-4 bg-red-50 rounded">
              {error}
            </div>
          )}

          {/* Results Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!loading &&
              currentItems.map((user) => (
                <div
                  key={user.id}
                  className="bg-sky-600 shadow-xl rounded-lg p-6"
                >
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-white mb-2">
                      {user.username}
                    </h4>
                    <p className="text-white">{user.email}</p>
                  </div>
                  <div className="mt-4">
                    <h5 className="font-semibold text-white mb-2">Skills:</h5>
                    <div className="flex flex-wrap gap-2">
                      {user.skills?.map((skill, index) => (
                        <span
                          key={index}
                          className="bg-sky-200 text-sky-800 px-2 py-1 rounded-full text-sm"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {/* No Results Message */}
          {!loading && currentItems.length === 0 && (
            <div className="text-center text-sky-900 py-8">
              {isSearchActive
                ? "No users found matching your search criteria"
                : "No users available"}
            </div>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mt-8">
              <button
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-sky-300 cursor-not-allowed"
                    : "bg-sky-600 text-white hover:bg-sky-700"
                }`}
              >
                First
              </button>

              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-sky-600 text-white"
                      : "bg-sky-200 text-sky-900 hover:bg-sky-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() => paginate(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-sky-300 cursor-not-allowed"
                    : "bg-sky-600 text-white hover:bg-sky-700"
                }`}
              >
                Last
              </button>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Marketplace;
