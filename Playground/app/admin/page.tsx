'use client'

import { Users, Building2, FileText, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react'

export default function AdminPage() {
    // Mock data for statistics
    const stats = [
        { label: 'Total Users', value: '2,847', change: '+12%', icon: Users, color: 'bg-blue-500' },
        { label: 'Organizations', value: '124', change: '+5%', icon: Building2, color: 'bg-purple-500' },
        { label: 'Active Cases', value: '1,234', change: '+18%', icon: FileText, color: 'bg-green-500' },
        { label: 'Today\'s Intakes', value: '47', change: '+23%', icon: TrendingUp, color: 'bg-orange-500' },
    ]

    // Mock recent users
    const recentUsers = [
        { id: 1, name: 'Sarah Johnson', email: 'sarah.j@example.com', role: 'lawyer', status: 'active', joined: '2025-12-01' },
        { id: 2, name: 'Michael Chen', email: 'mchen@example.com', role: 'intake', status: 'active', joined: '2025-12-02' },
        { id: 3, name: 'Emily Davis', email: 'emily.d@example.com', role: 'admin', status: 'active', joined: '2025-12-03' },
        { id: 4, name: 'Robert Wilson', email: 'rwilson@example.com', role: 'lawyer', status: 'inactive', joined: '2025-12-04' },
    ]

    // Mock recent organizations
    const recentOrgs = [
        { id: 1, name: 'Legal Aid Center Downtown', type: 'center', region: 'Central', status: 'active' },
        { id: 2, name: 'Community Hotspot North', type: 'hotspot', region: 'North', status: 'active' },
        { id: 3, name: 'Justice For All NGO', type: 'ngo', region: 'South', status: 'active' },
    ]

    // Mock audit logs
    const auditLogs = [
        { id: 1, action: 'User Created', user: 'Admin', entity: 'users/2847', time: '2 mins ago' },
        { id: 2, action: 'Case Updated', user: 'Sarah Johnson', entity: 'cases/1234', time: '15 mins ago' },
        { id: 3, action: 'Intake Approved', user: 'Michael Chen', entity: 'intakes/456', time: '1 hour ago' },
        { id: 4, action: 'Organization Modified', user: 'Admin', entity: 'orgs/124', time: '3 hours ago' },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400">Manage users, organizations, and monitor system activity</p>
                </div>

                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {stats.map((stat, idx) => (
                        <div key={idx} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-shadow">
                            <div className="flex items-center justify-between mb-4">
                                <div className={`${stat.color} p-3 rounded-lg`}>
                                    <stat.icon className="w-6 h-6 text-white" />
                                </div>
                                <span className="text-sm font-semibold text-green-600 dark:text-green-400">{stat.change}</span>
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">{stat.value}</h3>
                            <p className="text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                        </div>
                    ))}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Recent Users */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                                <Users className="w-5 h-5" />
                                Recent Users
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentUsers.map((user) => (
                                    <div key={user.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-800 dark:text-white">{user.name}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{user.email}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                                                {user.role}
                                            </span>
                                            {user.status === 'active' ? (
                                                <CheckCircle className="w-5 h-5 text-green-500" />
                                            ) : (
                                                <AlertCircle className="w-5 h-5 text-red-500" />
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors">
                                View All Users →
                            </button>
                        </div>
                    </div>

                    {/* Recent Organizations */}
                    <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                            <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                                <Building2 className="w-5 h-5" />
                                Organizations
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {recentOrgs.map((org) => (
                                    <div key={org.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-slate-800 dark:text-white">{org.name}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">{org.region} Region</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300">
                                                {org.type}
                                            </span>
                                            <CheckCircle className="w-5 h-5 text-green-500" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 text-sm font-medium text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20 rounded-lg transition-colors">
                                View All Organizations →
                            </button>
                        </div>
                    </div>
                </div>

                {/* Audit Logs */}
                <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700">
                    <div className="p-6 border-b border-slate-200 dark:border-slate-700">
                        <h2 className="text-xl font-semibold text-slate-800 dark:text-white flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Recent Activity
                        </h2>
                    </div>
                    <div className="p-6">
                        <div className="space-y-3">
                            {auditLogs.map((log) => (
                                <div key={log.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-50 dark:bg-slate-700/50 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                        <div>
                                            <h3 className="font-semibold text-slate-800 dark:text-white">{log.action}</h3>
                                            <p className="text-sm text-slate-600 dark:text-slate-400">
                                                by <span className="font-medium">{log.user}</span> on <span className="font-mono text-xs">{log.entity}</span>
                                            </p>
                                        </div>
                                    </div>
                                    <span className="text-sm text-slate-500 dark:text-slate-400">{log.time}</span>
                                </div>
                            ))}
                        </div>
                        <button className="w-full mt-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-700/50 rounded-lg transition-colors">
                            View All Logs →
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
