import { useState } from 'react'

function App() {
  const [bookList, setBookList] = useState(`The Great Gatsby by F. Scott Fitzgerald
To Kill a Mockingbird by Harper Lee
Nonexistent Book by Unknown Author`);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // In a real implementation, this would be a call to our backend
    // For now, we'll just simulate processing
    setTimeout(() => {
      setResults({
        success: true,
        downloadUrl: '#',
        report: {
          total: 3,
          successful: 2,
          failed: 1,
          items: [
            { title: 'The Great Gatsby by F. Scott Fitzgerald', status: 'success', format: 'EPUB' },
            { title: 'To Kill a Mockingbird by Harper Lee', status: 'success', format: 'PDF' },
            { title: 'Nonexistent Book by Unknown Author', status: 'failed', reason: 'Not found' }
          ]
        }
      });
      setIsProcessing(false);
    }, 2000);
  };

  return (
    <div className="app-container">
      <div className="content-container">
        <header className="app-header">
          <h1 className="app-title">
            <span className="text-indigo-500">EZ</span>LibGen
          </h1>
          <p className="app-subtitle">Simple Library Genesis Interface</p>
        </header>

        <main className="main-card">
          {!results ? (
            <div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">Enter Book List</h2>
              <p className="text-gray-600 mb-6">
                Paste a list of books in the format: <span className="font-mono bg-gray-100 px-2 py-1 rounded-md text-indigo-600">[Title] by [Author]</span>, one book per line.
              </p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="book-list" className="block text-sm font-medium text-gray-700 mb-2">Book List</label>
                  <textarea
                    id="book-list"
                    className="book-textarea"
                    value={bookList}
                    onChange={(e) => setBookList(e.target.value)}
                    placeholder="Enter one book per line in the format: Title by Author"
                    required
                  ></textarea>
                </div>
                
                <button 
                  type="submit" 
                  className={isProcessing ? "submit-button-processing" : "submit-button"}
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg className="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Start Download
                    </span>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-gray-800">Download Results</h2>
              
              <div className="success-banner">
                <div className="flex items-center">
                  <svg className="h-6 w-6 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <p className="text-green-700 font-medium text-lg">Your archive is ready!</p>
                </div>
                <a 
                  href={results.downloadUrl} 
                  className="download-button"
                  download
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download .zip
                </a>
              </div>
              
              <div className="summary-container">
                <h3 className="summary-title">Summary</h3>
                <div className="summary-stats">
                  <div className="stat-total">
                    Total: {results.report.total}
                  </div>
                  <div className="stat-success">
                    Success: {results.report.successful}
                  </div>
                  <div className="stat-failed">
                    Failed: {results.report.failed}
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="summary-title">Details</h3>
                <div className="results-table-container">
                  <table className="results-table">
                    <thead className="table-header">
                      <tr>
                        <th className="table-header-cell">Book</th>
                        <th className="table-header-cell">Status</th>
                        <th className="table-header-cell">Format</th>
                      </tr>
                    </thead>
                    <tbody className="table-body">
                      {results.report.items.map((item, index) => (
                        <tr key={index} className="hover:bg-gray-50 transition-colors">
                          <td className="table-cell-title">{item.title}</td>
                          <td className="table-cell">
                            {item.status === 'success' ? (
                              <span className="status-success">
                                <svg className="inline-block h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                </svg>
                                Success
                              </span>
                            ) : (
                              <span className="status-failed">
                                <svg className="inline-block h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                                Failed
                              </span>
                            )}
                          </td>
                          <td className="table-cell">
                            {item.format ? (
                              <span className="px-3 py-1 inline-flex text-sm leading-5 font-medium rounded-md bg-gray-100 text-gray-800">
                                {item.format}
                              </span>
                            ) : (
                              item.reason && (
                                <span className="text-red-500 font-medium">
                                  {item.reason}
                                </span>
                              )
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              
              <button 
                onClick={() => setResults(null)} 
                className="back-button"
              >
                <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
                </svg>
                Start a new search
              </button>
            </div>
          )}
        </main>
        
        <footer className="app-footer">
          <p>EZLibGen Interface - Simplified access to Library Genesis</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
