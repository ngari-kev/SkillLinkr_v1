import React, { useState, useEffect } from "react";
import Header from "../Header";
import Footer from "./Footer";
import SearchBar from "../SearchBar";
import { authenticatedFetch } from "../../utils/api";

const Marketplace = () => {
  const [users, setUsers] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTotalPages, setSearchTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const itemsPerPage = 4;

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  /**
   * @function fetchUsers
   * Asynchronously fetches all users from the API
   * Updates users state and handles loading/error states
   */
  const fetchUsers = async (page = 1) => {
    setLoading(true);
    try {
      const response = await authenticatedFetch(
        `https://skilllinkr.ngarikev.tech/api/users/all?page=${page}&per_page=${itemsPerPage}`,
      );

      if (!response.ok) {
        throw new Error("Failed to fetch users");
      }

      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.total_pages);
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  /**
   * @function handlePageChange
   * @param {number} page - value of current page
   * Handles switching from one page to another
   */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchUsers(page);
    window.scrollTo(0, 0); // Scroll to top when page changes
  };

  /**
   * @function handleSearch
   * @param {string} searchQuery - Comma-separated list of skills to search for
   * @param {boolean} matchAll - Whether to match all skills or any skill
   * Performs search based on skills and updates search results
   */
  const handleSearch = async (searchQuery, matchAll) => {
    if (!searchQuery.trim()) {
      setIsSearchActive(false);
      setSearchResults([]);
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
        `https://skilllinkr.ngarikev.tech/api${endpoint}?skills=${skills}&page=1&per_page=${itemsPerPage}`,
      );

      if (!response.ok) {
        throw new Error("Search failed");
      }

      const data = await response.json();
      console.log("Search results: ", data);
      setSearchResults(data.users || []);
      setSearchTotalPages(data.total_pages);
      setCurrentPage(1);
    } catch (err) {
      setError("Failed to perform search");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const currentData = isSearchActive ? searchResults : users;
  const totalPagesToShow = isSearchActive ? searchTotalPages : totalPages;

  /**
   * @function paginate
   * @param {number} pageNumber - Page number to navigate to
   * Updates currentPage state for pagination
   */
  // const paginate = (pageNumber) => setCurrentPage(pageNumber);

  /**
   * @function handleResetSearch
   * Resets search state and results
   */
  const handleResetSearch = () => {
    setIsSearchActive(false);
    setSearchResults([]);
    setCurrentPage(1);
  };

  return (
    <>
      <Header />
      <section className="py-20 bg-white min-h-screen">
        <div className="container mx-auto px-4">
          <h3 className="text-4xl text-sky-900 font-bold mb-8 text-center">
            Marketplace
          </h3>

          <SearchBar onSearch={handleSearch} />

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

          {loading && (
            <div className="flex justify-center items-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-900"></div>
            </div>
          )}

          {error && (
            <div className="text-red-500 text-center my-4 p-4 bg-red-50 rounded">
              {error}
            </div>
          )}

          {!loading && currentData.length === 0 ? (
            <div className="text-center text-sky-900 py-8">
              {isSearchActive
                ? "No users found matching your search criteria"
                : "No users available"}
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {currentData.map((user) => (
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
                            className={`px-2 py-1 rounded-full text-sm ${
                              isSearchActive &&
                              user.matching_skills?.includes(
                                skill.name.toLowerCase(),
                              )
                                ? "bg-green-200 text-green-800"
                                : "bg-sky-200 text-sky-800"
                            }`}
                          >
                            {skill.name}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/*Pagination Controls */}
              {totalPagesToShow > 1 && (
                <div className="flex justify-center items-center space-x-2 py-8">
                  <button
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded ${
                      currentPage === 1
                        ? "bg-sky-300 cursor-not-allowed"
                        : "bg-sky-600 text-white hover:bg-sky-700"
                    }`}
                  >
                    First
                  </button>

                  {Array.from({ length: totalPagesToShow }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => handlePageChange(i + 1)}
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
                    onClick={() => handlePageChange(totalPagesToShow)}
                    disabled={currentPage === totalPagesToShow}
                    className={`px-4 py-2 rounded ${
                      currentPage === totalPagesToShow
                        ? "bg-sky-300 cursor-not-allowed"
                        : "bg-sky-600 text-white hover:bg-sky-700"
                    }`}
                  >
                    Last
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Marketplace;
