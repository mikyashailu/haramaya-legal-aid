
export default function Dashboard() {
    // Mock data for display
    const cases = [
        { id: '1', client: 'John Doe', topic: 'Housing', status: 'in_progress', lawyer: 'Alice Smith' },
        { id: '2', client: 'Jane Roe', topic: 'Family', status: 'assigned', lawyer: 'Bob Jones' },
        { id: '3', client: 'Richard Roe', topic: 'Employment', status: 'triaged', lawyer: 'Unassigned' },
    ];

    return (
        <div className="p-8">
            <h1 className="text-3xl font-bold mb-6">Lawyer Dashboard</h1>
            <div className="rounded-md border p-4">
                <table className="min-w-full text-left text-sm">
                    <thead className="border-b font-medium">
                        <tr>
                            <th className="p-4">Case ID</th>
                            <th className="p-4">Client</th>
                            <th className="p-4">Topic</th>
                            <th className="p-4">Status</th>
                            <th className="p-4">Assigned Lawyer</th>
                            <th className="p-4">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cases.map((c) => (
                            <tr key={c.id} className="border-b hover:bg-muted/50">
                                <td className="p-4 font-mono">{c.id}</td>
                                <td className="p-4">{c.client}</td>
                                <td className="p-4">{c.topic}</td>
                                <td className="p-4">
                                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transiton-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${c.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                                            c.status === 'assigned' ? 'bg-green-100 text-green-800' :
                                                'bg-yellow-100 text-yellow-800'
                                        }`}>
                                        {c.status}
                                    </span>
                                </td>
                                <td className="p-4">{c.lawyer}</td>
                                <td className="p-4">
                                    <button className="text-blue-600 hover:underline">View</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
