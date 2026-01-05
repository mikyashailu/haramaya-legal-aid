'use client'

import { useState } from 'react'
import { MapPin, AlertCircle, CheckCircle2, Navigation, User, MapPinned, Users as UsersIcon, FileText, Scale } from 'lucide-react'
import { haramayaLegalAidCenters, oromiaHarariCities } from '@/lib/legal-aid-centers'
import { calculateDistance } from '@/lib/proximity'
import { LanguageSwitcher } from '@/components/language-switcher'
import { useLanguage } from '@/lib/language-context'
import { translations } from '@/lib/translations'

// Case type mappings
const caseTypesByCategory: Record<string, { value: string; labelKey: string }[]> = {
    criminal: [
        { value: 'theft', labelKey: 'criminalTheft' },
        { value: 'assault', labelKey: 'criminalAssault' },
        { value: 'murder', labelKey: 'criminalMurder' },
        { value: 'drugs', labelKey: 'criminalDrugs' },
        { value: 'fraud', labelKey: 'criminalFraud' },
        { value: 'sexual', labelKey: 'criminalSexual' },
        { value: 'property', labelKey: 'criminalProperty' },
        { value: 'other_criminal', labelKey: 'criminalOther' },
    ],
    family: [
        { value: 'divorce', labelKey: 'familyDivorce' },
        { value: 'custody', labelKey: 'familyCustody' },
        { value: 'support', labelKey: 'familySupport' },
        { value: 'adoption', labelKey: 'familyAdoption' },
        { value: 'inheritance', labelKey: 'familyInheritance' },
        { value: 'marriage', labelKey: 'familyMarriage' },
        { value: 'domestic', labelKey: 'familyDomestic' },
        { value: 'other_family', labelKey: 'familyOther' },
    ],
    civil: [
        { value: 'discrimination', labelKey: 'civilDiscrimination' },
        { value: 'land', labelKey: 'civilLandRights' },
        { value: 'employment', labelKey: 'civilEmployment' },
        { value: 'housing', labelKey: 'civilHousing' },
        { value: 'education', labelKey: 'civilEducation' },
        { value: 'health', labelKey: 'civilHealth' },
        { value: 'other_civil', labelKey: 'civilOther' },
    ],
    business: [
        { value: 'contract', labelKey: 'businessContract' },
        { value: 'partnership', labelKey: 'businessPartnership' },
        { value: 'debt', labelKey: 'businessDebt' },
        { value: 'registration', labelKey: 'businessRegistration' },
        { value: 'tax', labelKey: 'businessTax' },
        { value: 'employment_dispute', labelKey: 'businessEmployment' },
        { value: 'other_business', labelKey: 'businessOther' },
    ],
    insurance: [
        { value: 'claim', labelKey: 'insuranceClaim' },
        { value: 'health_ins', labelKey: 'insuranceHealth' },
        { value: 'life_ins', labelKey: 'insuranceLife' },
        { value: 'property_ins', labelKey: 'insuranceProperty' },
        { value: 'vehicle_ins', labelKey: 'insuranceVehicle' },
        { value: 'other_insurance', labelKey: 'insuranceOther' },
    ],
}

export default function IntakePage() {
    const { language } = useLanguage()
    const t = translations[language]

    const [formData, setFormData] = useState({
        // Personal Information
        firstName: '',
        middleName: '',
        lastName: '',
        gender: '',
        age: '',
        email: '',
        phone: '',
        alternativePhone: '',

        // Location
        city: '',
        region: '',
        woreda: '',
        kebele: '',
        houseNumber: '',

        // Family & Economic
        maritalStatus: '',
        numberOfDependents: '',
        occupation: '',
        incomeLevel: '',

        // Legal Issue
        caseCategory: '',
        caseType: '',
        caseUrgency: '',
        priorLegalHelp: '',
        priorLegalDetails: '',
        description: '',

        consent: false,
    })

    const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number } | null>(null)
    const [nearbyCenters, setNearbyCenters] = useState<any[]>([])
    const [selectedCenter, setSelectedCenter] = useState<any>(null)
    const [submitted, setSubmitted] = useState(false)

    const handleLocationSelect = (location: any) => {
        setFormData({ ...formData, region: location.region, city: location.name })
        setSelectedLocation({ lat: location.lat, lng: location.lng })

        const centersWithDistance = haramayaLegalAidCenters.map(center => ({
            ...center,
            distance: calculateDistance(location.lat, location.lng, center.lat, center.lng)
        })).sort((a, b) => a.distance - b.distance)

        setNearbyCenters(centersWithDistance.slice(0, 5))
        setSelectedCenter(centersWithDistance[0])
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log('Form submitted:', { ...formData, center: selectedCenter })
        setSubmitted(true)
    }

    if (submitted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-8">
                <div className="bg-white rounded-2xl shadow-2xl p-12 max-w-md w-full text-center">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-12 h-12 text-green-600" />
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">{t.requestSubmitted}</h2>
                    <p className="text-gray-600 mb-6">
                        {t.requestSubmittedDesc} <strong>{selectedCenter?.name}</strong>.
                        {t.lawyerAssigned}
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg mb-6">
                        <p className="text-sm text-blue-800">
                            {t.emailConfirmation} <strong>{formData.email}</strong> {t.emailConfirmationEnd}
                        </p>
                    </div>
                    <button
                        onClick={() => setSubmitted(false)}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                    >
                        {t.submitAnother}
                    </button>
                </div>
            </div>
        )
    }

    const currentCaseTypes = formData.caseCategory ? caseTypesByCategory[formData.caseCategory] || [] : []

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
            <div className="absolute top-6 right-6 z-50">
                <LanguageSwitcher />
            </div>

            <div className="max-w-5xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        {t.freeIntakeTitle}
                    </h1>
                    <p className="text-gray-600 text-lg">
                        {t.freeIntakeDesc}
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-8">
                    {/* Section 1: Personal Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</span>
                            <User className="w-5 h-5 text-blue-600" />
                            {t.personalInfo}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.firstName} *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.firstName}
                                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.middleName}</label>
                                <input
                                    type="text"
                                    value={formData.middleName}
                                    onChange={(e) => setFormData({ ...formData, middleName: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.lastName} *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.lastName}
                                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.gender} *</label>
                                <select
                                    required
                                    value={formData.gender}
                                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select...</option>
                                    <option value="male">{t.male}</option>
                                    <option value="female">{t.female}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.age} *</label>
                                <input
                                    required
                                    type="number"
                                    min="0"
                                    max="120"
                                    value={formData.age}
                                    onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.email} *</label>
                                <input
                                    required
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="your@email.com"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.phone} *</label>
                                <input
                                    required
                                    type="tel"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="+251..."
                                />
                            </div>
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.alternativePhone}</label>
                                <input
                                    type="tel"
                                    value={formData.alternativePhone}
                                    onChange={(e) => setFormData({ ...formData, alternativePhone: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    placeholder="+251..."
                                />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Location Details */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</span>
                            <MapPinned className="w-5 h-5 text-blue-600" />
                            {t.locationDetails}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.selectCity} *</label>
                                <select
                                    required
                                    value={formData.city}
                                    onChange={(e) => {
                                        const location = oromiaHarariCities.find(loc => loc.name === e.target.value)
                                        if (location) handleLocationSelect(location)
                                    }}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">{t.chooseCity}</option>
                                    {oromiaHarariCities.map((loc) => (
                                        <option key={loc.name} value={loc.name}>
                                            {loc.name} - {loc.region}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.woreda} *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.woreda}
                                    onChange={(e) => setFormData({ ...formData, woreda: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.kebele} *</label>
                                <input
                                    required
                                    type="text"
                                    value={formData.kebele}
                                    onChange={(e) => setFormData({ ...formData, kebele: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.houseNumber}</label>
                                <input
                                    type="text"
                                    value={formData.houseNumber}
                                    onChange={(e) => setFormData({ ...formData, houseNumber: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                        </div>

                        {nearbyCenters.length > 0 && (
                            <div className="mt-6 bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border border-blue-200">
                                <div className="flex items-center gap-2 mb-4">
                                    <Navigation className="w-5 h-5 text-blue-600" />
                                    <h3 className="font-semibold text-gray-800">{t.nearestCenters}</h3>
                                </div>
                                <div className="space-y-3">
                                    {nearbyCenters.map((center) => (
                                        <div
                                            key={center.id}
                                            onClick={() => setSelectedCenter(center)}
                                            className={`p-4 rounded-lg border-2 cursor-pointer transition ${selectedCenter?.id === center.id
                                                    ? 'border-blue-600 bg-blue-50'
                                                    : 'border-gray-200 bg-white hover:border-blue-300'
                                                }`}
                                        >
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <h4 className="font-semibold text-gray-800">{center.name}</h4>
                                                    <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                                                        <MapPin className="w-4 h-4" />
                                                        {center.zone}, {center.region}
                                                    </p>
                                                    <p className="text-xs text-gray-500 mt-1 capitalize">
                                                        {center.type.replace('_', ' ')}
                                                    </p>
                                                </div>
                                                <div className="text-right">
                                                    <div className="text-lg font-bold text-blue-600">{center.distance} km</div>
                                                    <div className="text-xs text-gray-500">{t.away}</div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Section 3: Family & Economic Information */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</span>
                            <UsersIcon className="w-5 h-5 text-blue-600" />
                            {t.familyInfo}
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.maritalStatus} *</label>
                                <select
                                    required
                                    value={formData.maritalStatus}
                                    onChange={(e) => setFormData({ ...formData, maritalStatus: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select...</option>
                                    <option value="single">{t.single}</option>
                                    <option value="married">{t.married}</option>
                                    <option value="divorced">{t.divorced}</option>
                                    <option value="widowed">{t.widowed}</option>
                                    <option value="separated">{t.separated}</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.numberOfDependents}</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.numberOfDependents}
                                    onChange={(e) => setFormData({ ...formData, numberOfDependents: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.occupation}</label>
                                <input
                                    type="text"
                                    value={formData.occupation}
                                    onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.incomeLevel} *</label>
                                <select
                                    required
                                    value={formData.incomeLevel}
                                    onChange={(e) => setFormData({ ...formData, incomeLevel: e.target.value })}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >
                                    <option value="">Select...</option>
                                    <option value="no_income">{t.noIncome}</option>
                                    <option value="below_1000">{t.below1000}</option>
                                    <option value="1000_3000">{t.between10003000}</option>
                                    <option value="3000_5000">{t.between30005000}</option>
                                    <option value="above_5000">{t.above5000}</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section 4: Legal Issue Details */}
                    <div>
                        <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                            <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</span>
                            <Scale className="w-5 h-5 text-blue-600" />
                            {t.legalIssue}
                        </h2>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.caseCategory} *</label>
                                    <select
                                        required
                                        value={formData.caseCategory}
                                        onChange={(e) => setFormData({ ...formData, caseCategory: e.target.value, caseType: '' })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="">{t.selectCategory}</option>
                                        <option value="criminal">{t.criminalLaw}</option>
                                        <option value="family">{t.familyLaw}</option>
                                        <option value="civil">{t.civilRights}</option>
                                        <option value="business">{t.businessLaw}</option>
                                        <option value="insurance">{t.insuranceLaw}</option>
                                    </select>
                                </div>
                                {formData.caseCategory && (
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">{t.caseType} *</label>
                                        <select
                                            required
                                            value={formData.caseType}
                                            onChange={(e) => setFormData({ ...formData, caseType: e.target.value })}
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                        >
                                            <option value="">{t.selectCaseType}</option>
                                            {currentCaseTypes.map((type) => (
                                                <option key={type.value} value={type.value}>
                                                    {(t as any)[type.labelKey]}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.caseUrgency} *</label>
                                    <select
                                        required
                                        value={formData.caseUrgency}
                                        onChange={(e) => setFormData({ ...formData, caseUrgency: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="">Select...</option>
                                        <option value="normal">{t.urgencyNormal}</option>
                                        <option value="urgent">{t.urgencyUrgent}</option>
                                        <option value="critical">{t.urgencyCritical}</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.priorLegalHelp} *</label>
                                    <select
                                        required
                                        value={formData.priorLegalHelp}
                                        onChange={(e) => setFormData({ ...formData, priorLegalHelp: e.target.value })}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                    >
                                        <option value="">Select...</option>
                                        <option value="yes">{t.yes}</option>
                                        <option value="no">{t.no}</option>
                                    </select>
                                </div>
                            </div>

                            {formData.priorLegalHelp === 'yes' && (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">{t.priorLegalDetails}</label>
                                    <textarea
                                        value={formData.priorLegalDetails}
                                        onChange={(e) => setFormData({ ...formData, priorLegalDetails: e.target.value })}
                                        rows={3}
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    />
                                </div>
                            )}

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{t.description} *</label>
                                <textarea
                                    required
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    rows={6}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                                    placeholder={t.descriptionPlaceholder}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Consent */}
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                            <input
                                required
                                type="checkbox"
                                id="consent"
                                checked={formData.consent}
                                onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                                className="mt-1 w-5 h-5 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                            />
                            <label htmlFor="consent" className="text-sm text-gray-700">
                                <strong>{t.consentTitle}</strong> {t.consentText}
                            </label>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        disabled={!selectedCenter || !formData.consent}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {t.submitLegalAid}
                    </button>

                    {!selectedCenter && formData.city && (
                        <div className="flex items-center gap-2 text-amber-600 text-sm justify-center">
                            <AlertCircle className="w-4 h-4" />
                            {t.pleaseSelectCenter}
                        </div>
                    )}
                </form>
            </div>
        </div>
    )
}
