'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Building2, Users, FileText, Plus, MapPin, UserPlus, BarChart3, LogOut } from 'lucide-react'
import { ethiopianRegions, ethiopianLocations } from '@/lib/proximity'

export default function ManagerDashboard() {
    const router = useRouter()
    const [user, setUser] = useState<any>(null)
    const [activeTab, setActiveTab] = useState('overview')
    const [showCenterModal, setShowCenterModal] = useState(false)
    const [showLawyerModal, setShowLawyerModal] = useState(false)

    // Mock data
    const [centers, setCenters] = useState([
        { id: 1, name: 'Addis Ababa Legal Aid Center', region: 'Addis Ababa', city: 'Addis Ababa', lat: 9.03, lng: 38.74, lawyers: 5, cases: 45, capacity: 100 },
        { id: 2, name: 'Bahir Dar Justice Center', region: 'Amhara', city: 'Bahir Dar', lat: 11.59, lng: 37.39, lawyers: 3, cases: 28, capacity: 60 },
        { id: 3, name: 'Mekelle Legal Support', region: 'Tigray', city: 'Mekelle', lat: 13.50, lng: 39.47, lawyers: 2, cases: 15, capacity: 40 },
    ])

    const [lawyers, setLawyers] = useState([
        { id: 1, name: 'Dr. Abebe Bekele', email: 'abebe@legalaid.et', centerId: 1, centerName: 'Addis Ababa Legal Aid Center', cases: 12, status: 'active' },
        { id: 2, name: 'Ato Kebede Tadesse', email: 'kebede@legalaid.et', centerId: 1, centerName: 'Addis Ababa Legal Aid Center', cases: 8, status: 'active' },
        { id: 3, name: 'W/ro Almaz Tesfaye', email: 'almaz@legalaid.et', centerId: 2, centerName: 'Bahir Dar Justice Center', cases: 10, status: 'active' },
    ])

    const stats = [
        { label: 'Total Centers', value: centers.length, icon: Building2, color: 'bg-blue-500' },
        { label: 'Active Lawyers', value: lawyers.length, icon: Users, color: 'bg-green-500' },
        { label: 'Pending Cases', value: centers.reduce((sum, c) => sum + c.cases, 0), icon: FileText, color: 'bg-orange-500' },
        { label: 'Capacity Utilization', value: '72%', icon: BarChart3, color: 'bg-purple-500' },
    ]

    useEffect(() => {
        const storedUser = localStorage.getItem('user')
        if (storedUser) {
            setUser(JSON.parse(storedUser))
        } else {
            router.push('/login')
        }
    }, [router])

    const handleLogout = () => {
        localStorage.removeItem('user')
        router.push('/login')
    }

    if (!user) return null

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
            {/* Header */}
            <div className="bg-white border-b border-slate-200 shadow-sm">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800">Manager Dashboard</h1>
                            <p className="text-sm text-gray-600">Welcome back, {user?.name}</p>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"
                        >
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white rounded-xl shadow-md p-6 border border-slate-200">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</h3>
                            <p className="text-sm text-gray-600">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-slate-200">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`px-4 py-3 font-medium transition ${activeTab === 'overview'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('centers')}
                        className={`px-4 py-3 font-medium transition ${activeTab === 'centers'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        Centers
                    </button>
                    <button
                        onClick={() => setActiveTab('lawyers')}
                        className={`px-4 py-3 font-medium transition ${activeTab === 'lawyers'
                                ? 'border-b-2 border-blue-600 text-blue-600'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                    >
                        Lawyers
                    </button>
                </div>

                {/* Content */}
                {activeTab === 'centers' && (
                    <div className="bg-white rounded-xl shadow-md border border-slate-200">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Legal Aid Centers</h2>
                            <button
                                onClick={() => setShowCenterModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                            >
                                <Plus className="w-4 h-4" />
                                Add Center
                            </button>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {centers.map((center) => (
                                    <div key={center.id} className="p-4 border border-slate-200 rounded-lg hover:bg-slate-50 transition">
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg text-gray-800">{center.name}</h3>
                                                <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {center.city}, {center.region}
                                                    </span>
                                                    <span>{center.lawyers} Lawyers</span>
                                                    <span>{center.cases} Active Cases</span>
                                                    <span className="text-blue-600 font-medium">
                                                        {Math.round((center.cases / center.capacity) * 100)}% Capacity
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'lawyers' && (
                    <div className="bg-white rounded-xl shadow-md border border-slate-200">
                        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
                            <h2 className="text-xl font-semibold">Lawyer Roster</h2>
                            <button
                                onClick={() => setShowLawyerModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
                            >
                                <UserPlus className="w-4 h-4" />
                                Add Lawyer
                            </button>
                        </div>
                        <div className="p-6">
                            <table className="w-full">
                                <thead className="border-b">
                                    <tr className="text-left">
                                        <th className="pb-3 font-semibold text-gray-700">Name</th>
                                        <th className="pb-3 font-semibold text-gray-700">Email</th>
                                        <th className="pb-3 font-semibold text-gray-700">Center</th>
                                        <th className="pb-3 font-semibold text-gray-700">Cases</th>
                                        <th className="pb-3 font-semibold text-gray-700">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {lawyers.map((lawyer) => (
                                        <tr key={lawyer.id} className="border-b hover:bg-slate-50">
                                            <td className="py-4 font-medium">{lawyer.name}</td>
                                            <td className="py-4 text-gray-600">{lawyer.email}</td>
                                            <td className="py-4 text-gray-600">{lawyer.centerName}</td>
                                            <td className="py-4">{lawyer.cases}</td>
                                            <td className="py-4">
                                                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                                                    {lawyer.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {activeTab === 'overview' && (
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
                            <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                    <div>
                                        <p className="font-medium">New center registered</p>
                                        <p className="text-sm text-gray-600">Hawassa Legal Center added to the system</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                    <div>
                                        <p className="font-medium">Lawyer assigned</p>
                                        <p className="text-sm text-gray-600">Dr. Abebe assigned to 3 new cases</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Modals would go here - simplified for now */}
            {showCenterModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
                        <h3 className="text-xl font-semibold mb-4">Add New Center</h3>
                        <p className="text-gray-600 mb-4">Center registration form would go here</p>
                        <button
                            onClick={() => setShowCenterModal(false)}
                            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}
