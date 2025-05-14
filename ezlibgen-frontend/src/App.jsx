import { useState } from 'react'
import './App.css'

function App() {
  const [bookList, setBookList] = useState('');
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
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <header className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800">EZLibGen</h1>
          <p className="text-gray-600 mt-2">Simple Library Genesis Interface</p>
        </header>

        <main className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
          {!results ? (
            <div>
              <h2 className="text-xl font-semibold mb-4">Enter Book List</h2>
              <p className="text-gray-600 mb-4">
                Paste a list of books in the format: <span className="font-mono bg-gray-100 px-2 py-1 rounded">[Title] by [Author]</span>, one book per line.
              </p>
              
              <form onSubmit={handleSubmit}>
                <textarea
                  className="w-full h-64 p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
                  placeholder="The Great Gatsby by F. Scott Fitzgerald
To Kill a Mockingbird by Harper Lee
Nonexistent Book by Unknown Author"
                  value={bookList}
                  onChange={(e) => setBookList(e.target.value)}
                  required
                ></textarea>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
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
              
              <div className="bg-green-50 border border-green-200 rounded-md p-4 mb-6">
                <div className="flex items-center">
                  <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  <p className="text-green-700">Your archive is ready!</p>
                </div>
                <a 
                  href={results.downloadUrl} 
                  className="mt-3 inline-flex items-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-medium rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                  download
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Download .zip
                </a>
              </div>
              
              <div className="mb-4">
                <h3 className="text-lg font-medium mb-2">Summary</h3>
                <div className="flex space-x-4 text-sm">
                  <div className="bg-gray-100 px-3 py-1 rounded">
                    Total: {results.report.total}
                  </div>
                  <div className="bg-green-100 px-3 py-1 rounded text-green-800">
                    Success: {results.report.successful}
                  </div>
                  <div className="bg-red-100 px-3 py-1 rounded text-red-800">
                    Failed: {results.report.failed}
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-medium mb-2">Details</h3>
                <div className="border rounded-md overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Format</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {results.report.items.map((item, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            {item.status === 'success' ? (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Success
                              </span>
                            ) : (
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                Failed
                              </span>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
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
                className="mt-6 text-blue-600 hover:text-blue-800 font-medium focus:outline-none"
              >
                ← Start a new search
              </button>
            </div>
          )}
        </main>
        
        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>EZLibGen Interface - Simplified access to Library Genesis</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
