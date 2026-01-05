'use client'

import { Globe } from 'lucide-react'
import { useLanguage } from '@/lib/language-context'
import type { Language } from '@/lib/translations'

export function LanguageSwitcher() {
    const { language, setLanguage } = useLanguage()

    const languages: { code: Language; name: string; nativeName: string }[] = [
        { code: 'en', name: 'English', nativeName: 'English' },
        { code: 'am', name: 'Amharic', nativeName: 'አማርኛ' },
        { code: 'om', name: 'Oromo', nativeName: 'Afaan Oromoo' },
    ]

    return (
        <div className="relative group">
            <button className="flex items-center gap-2 px-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 rounded-lg transition-all border border-white border-opacity-20">
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">
                    {languages.find(l => l.code === language)?.nativeName}
                </span>
            </button>

            <div className="absolute right-0 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 bg-white rounded-lg shadow-xl border border-gray-200 min-w-[180px] z-50">
                {languages.map((lang) => (
                    <button
                        key={lang.code}
                        onClick={() => setLanguage(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors first:rounded-t-lg last:rounded-b-lg ${language === lang.code ? 'bg-blue-50 text-blue-600 font-semibold' : 'text-gray-700'
                            }`}
                    >
                        <span className="text-2xl">{lang.code === 'en' ? '🇬🇧' : lang.code === 'am' ? '🇪🇹' : '🇪🇹'}</span>
                        <div className="text-left">
                            <div className="text-sm">{lang.nativeName}</div>
                            <div className="text-xs text-gray-500">{lang.name}</div>
                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}
