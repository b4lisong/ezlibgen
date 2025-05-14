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
          <h1 className="app-title">EZLibGen</h1>
          <p className="app-subtitle">Simple Library Genesis Interface</p>
        </header>

        <main className="main-card">
          {!results ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Enter Book List</h2>
              <p className="text-gray-600 mb-4">
                Paste a list of books in the format: <span className="font-mono bg-gray-100 px-2 py-1 rounded">[Title] by [Author]</span>, one book per line.
              </p>
              
              <form onSubmit={handleSubmit}>
                <textarea
                  className="book-textarea"
                  value={bookList}
                  onChange={(e) => setBookList(e.target.value)}
                  required
                ></textarea>
                
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
                  ) : 'Start Download'}
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h2 className="text-xl font-semibold mb-4">Download Results</h2>
              
              <div className="success-banner">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-green-700">Your archive is ready!</p>
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
              
              <div>
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
                        <tr key={index}>
                          <td className="table-cell-title">{item.title}</td>
                          <td className="table-cell">
                            {item.status === 'success' ? (
                              <span className="status-success">
                                Success
                              </span>
                            ) : (
                              <span className="status-failed">
                                Failed
                              </span>
                            )}
                          </td>
                          <td className="table-cell">
                            {item.format || (item.reason && <span className="text-red-500">{item.reason}</span>)}
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
                ← Start a new search
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
