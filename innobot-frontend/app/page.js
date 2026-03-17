// app/page.js

// This is a Next.js Server Component. 
// It fetches data securely on the server BEFORE sending the HTML to the user.
export default async function Home() {

  // 1. Fetch the data from our Node.js backend API
  // 'no-store' forces Next.js to fetch fresh data every time you refresh
  const res = await fetch('http://localhost:5001/api/patients', { cache: 'no-store' });

  // 2. Convert the response back into a usable JavaScript array
  const patients = await res.json();

  // 3. Render the UI using Tailwind CSS for quick, clean styling
  return (
    <main className="min-h-screen bg-slate-50 p-10 font-sans text-gray-800">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">Scraped Quotes</h1>
        <h2 className="text-xl mb-8 text-slate-500">Automated Data Retrieval</h2>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden border border-slate-200">
          <table className="min-w-full text-left border-collapse">
            <thead className="bg-slate-100 border-b border-slate-200">
              <tr>
                <th className="p-4 font-semibold text-slate-700">ID</th>
                <th className="p-4 font-semibold text-slate-700">Author Name</th>
                <th className="p-4 font-semibold text-slate-700">Extracted Text</th>
              </tr>
            </thead>
            <tbody>
              {/* 4. Loop over the data and create a table row for each record */}
              {patients.map((patient) => (
                <tr key={patient.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-slate-600">{patient.id}</td>
                  <td className="p-4 font-medium text-slate-900">{patient.author_name}</td>
                  <td className="p-4 text-slate-600 italic">"{patient.extracted_text}"</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}