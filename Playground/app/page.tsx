'use client'

import { useRouter } from 'next/navigation'
import { Scale, Users, Building2, MapPin } from 'lucide-react'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/lib/language-context'
import { translations } from '@/lib/translations'

export default function Home() {
    const router = useRouter()
    const { language } = useLanguage()
    const t = translations[language]

    return (
        <main className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjA1IiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-30"></div>

            {/* Language Switcher */}
            <div className="absolute top-6 right-6 z-50">
                <LanguageSwitcher />
            </div>

            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-16">
                {/* Logo & Title */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full mb-6 shadow-2xl">
                        <Scale className="w-14 h-14 text-blue-600" />
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
                        {t.appName}
                    </h1>
                    <p className="text-xl md:text-2xl text-blue-200 mb-4">{t.tagline}</p>
                    <div className="bg-white bg-opacity-10 backdrop-blur-md rounded-xl p-4 max-w-2xl mx-auto border border-white border-opacity-20">
                        <p className="text-sm md:text-base text-blue-100">{t.organizationName}</p>
                    </div>
                </div>

                {/* Main CTAs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-12">
                    <button
                        onClick={() => router.push('/intake')}
                        className="group bg-white hover:bg-blue-50 rounded-2xl shadow-2xl p-8 transition-all transform hover:scale-105"
                    >
                        <div className="bg-gradient-to-br from-blue-500 to-purple-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                            <Users className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.needHelp}</h2>
                        <p className="text-gray-600 mb-4">{t.needHelpDesc}</p>
                        <div className="text-blue-600 font-semibold flex items-center gap-2">
                            {t.submitRequest} →
                        </div>
                    </button>

                    <button
                        onClick={() => router.push('/login')}
                        className="group bg-white hover:bg-blue-50 rounded-2xl shadow-2xl p-8 transition-all transform hover:scale-105"
                    >
                        <div className="bg-gradient-to-br from-green-500 to-teal-600 w-16 h-16 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-6 transition-transform">
                            <Building2 className="w-8 h-8 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{t.staffPortal}</h2>
                        <p className="text-gray-600 mb-4">{t.staffPortalDesc}</p>
                        <div className="text-green-600 font-semibold flex items-center gap-2">
                            {t.login} →
                        </div>
                    </button>
                </div>

                {/* Features */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
                    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-6 text-white">
                        <MapPin className="w-10 h-10 mb-4 text-blue-300" />
                        <h3 className="text-lg font-semibold mb-2">{t.proximityMatching}</h3>
                        <p className="text-sm text-blue-200">{t.proximityMatchingDesc}</p>
                    </div>

                    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-6 text-white">
                        <Scale className="w-10 h-10 mb-4 text-purple-300" />
                        <h3 className="text-lg font-semibold mb-2">{t.freeServices}</h3>
                        <p className="text-sm text-blue-200">{t.freeServicesDesc}</p>
                    </div>

                    <div className="bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-xl p-6 text-white">
                        <Users className="w-10 h-10 mb-4 text-green-300" />
                        <h3 className="text-lg font-semibold mb-2">{t.nationwideCoverage}</h3>
                        <p className="text-sm text-blue-200">{t.nationwideCoverageDesc}</p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-16 text-center text-blue-200 text-sm">
                    <p>{t.footer}</p>
                </div>
            </div>
        </main>
    )
}
