// Haramaya University Legal Aid Centers - Actual Locations

export interface LegalAidCenter {
    id: number
    name: string
    zone: string
    region: string
    type: 'district_court' | 'high_court' | 'prison' | 'regional'
    lat: number
    lng: number
}

export const haramayaLegalAidCenters: LegalAidCenter[] = [
    // East Harar Zone - District Courts
    { id: 1, name: 'East Harar Babile Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.22, lng: 42.34 },
    { id: 2, name: 'East Harar Badeno Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.15, lng: 42.25 },
    { id: 3, name: 'East Harar Chinaksen Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.48, lng: 43.35 },
    { id: 4, name: 'East Harar Dadar Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.33, lng: 41.45 },
    { id: 5, name: 'East Harar Fedis Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.08, lng: 42.07 },
    { id: 6, name: 'East Harar Girawa Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.23, lng: 42.15 },
    { id: 7, name: 'East Harar Gola Oda Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.18, lng: 41.95 },
    { id: 8, name: 'East Harar Goro Gutu Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.68, lng: 42.55 },
    { id: 9, name: 'East Harar Gutu Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.45, lng: 42.38 },
    { id: 10, name: 'East Harar Haramaya Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.41, lng: 42.03 },
    { id: 11, name: 'East Harar Haro Maya Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.42, lng: 42.04 },
    { id: 12, name: 'East Harar Jarso Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.55, lng: 42.48 },
    { id: 13, name: 'East Harar Kersa Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.12, lng: 42.28 },
    { id: 14, name: 'East Harar Kombolcha Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.28, lng: 41.72 },
    { id: 15, name: 'East Harar Kurfa Chele Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.32, lng: 42.68 },
    { id: 16, name: 'East Harar Malka Balo Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.52, lng: 42.18 },
    { id: 17, name: 'East Harar Metu Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.38, lng: 41.88 },
    { id: 18, name: 'East Harar Meta Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.25, lng: 42.42 },
    { id: 19, name: 'East Harar Midega Tola Legal Aid Center', zone: 'East Harar', region: 'Oromia', type: 'district_court', lat: 9.62, lng: 42.32 },

    // West Hara Zone - District Courts
    { id: 20, name: 'West Hara Badessa Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.05, lng: 40.78 },
    { id: 21, name: 'West Hara Boke Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.15, lng: 40.85 },
    { id: 22, name: 'West Hara Chiro (Nari) Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.08, lng: 40.87 },
    { id: 23, name: 'West Hara Darolebu Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 8.95, lng: 40.65 },
    { id: 24, name: 'West Hara Doba Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.12, lng: 40.92 },
    { id: 25, name: 'West Hara Gemechis Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.18, lng: 40.72 },
    { id: 26, name: 'West Hara Guba Korik Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.22, lng: 41.05 },
    { id: 27, name: 'West Hara Habro Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.32, lng: 40.58 },
    { id: 28, name: 'West Hara Kuni Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.28, lng: 40.48 },
    { id: 29, name: 'West Hara Masela Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.38, lng: 40.38 },
    { id: 30, name: 'West Hara Mieso Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.24, lng: 40.75 },
    { id: 31, name: 'West Hara Tulo Legal Aid Center', zone: 'West Hara', region: 'Oromia', type: 'district_court', lat: 9.42, lng: 40.95 },

    // Harari Region - Regional Centers
    { id: 32, name: 'Harari Reg Amir Nur Legal Aid Center', zone: 'Harari', region: 'Harari', type: 'regional', lat: 9.32, lng: 42.14 },
    { id: 33, name: 'Harari Reg Abadir Legal Aid Center', zone: 'Harari', region: 'Harari', type: 'regional', lat: 9.31, lng: 42.12 },
    { id: 34, name: 'Harari Reg Shenkor Legal Aid Center', zone: 'Harari', region: 'Harari', type: 'regional', lat: 9.30, lng: 42.13 },
    { id: 35, name: "Harari Reg Jin'Eala Legal Aid Center", zone: 'Harari', region: 'Harari', type: 'regional', lat: 9.33, lng: 42.15 },
    { id: 36, name: 'Harari Reg Jugol Legal Aid Center', zone: 'Harari', region: 'Harari', type: 'regional', lat: 9.31, lng: 42.13 },
    { id: 37, name: 'Harari Reg Hakim Legal Aid Center', zone: 'Harari', region: 'Harari', type: 'regional', lat: 9.32, lng: 42.11 },
    { id: 38, name: 'Harari Reg Sofi Legal Aid Center', zone: 'Harari', region: 'Harari', type: 'regional', lat: 9.30, lng: 42.12 },
    { id: 39, name: 'Harari Reg Erer Legal Aid Center', zone: 'Harari', region: 'Harari', type: 'regional', lat: 9.34, lng: 42.14 },
    { id: 40, name: 'Harari Reg Dire-Teyara Legal Aid Center', zone: 'Harari', region: 'Harari', type: 'regional', lat: 9.29, lng: 42.11 },

    // High Courts
    { id: 41, name: 'East Harar Haramaya High Court', zone: 'East Harar', region: 'Oromia', type: 'high_court', lat: 9.41, lng: 42.03 },
    { id: 42, name: 'West Hara Chiro Town High Court', zone: 'West Hara', region: 'Oromia', type: 'high_court', lat: 9.08, lng: 40.87 },
    { id: 43, name: 'Harari Reg Harar City High Court', zone: 'Harari', region: 'Harari', type: 'high_court', lat: 9.31, lng: 42.12 },

    // Prison Administration Centers
    { id: 44, name: 'East Harar Aweday Town Prison Adm', zone: 'East Harar', region: 'Oromia', type: 'prison', lat: 9.45, lng: 42.08 },
    { id: 45, name: 'East Harar Deder Town Prison Adm', zone: 'East Harar', region: 'Oromia', type: 'prison', lat: 9.33, lng: 41.45 },
    { id: 46, name: 'West Hara Gelemso Town Prison Adm', zone: 'West Hara', region: 'Oromia', type: 'prison', lat: 9.18, lng: 40.52 },
    { id: 47, name: 'West Hara Bedessa Town Prison Adm', zone: 'West Hara', region: 'Oromia', type: 'prison', lat: 9.05, lng: 40.78 },
    { id: 48, name: 'West Hara Mieso Town Prison Adm', zone: 'West Hara', region: 'Oromia', type: 'prison', lat: 9.24, lng: 40.75 },
    { id: 49, name: 'Harari Reg Harar City Prison Adm', zone: 'Harari', region: 'Harari', type: 'prison', lat: 9.31, lng: 42.13 },
]

// Major cities in Oromia and Harari for location selection
export const oromiaHarariCities = [
    { name: 'Harar', region: 'Harari', lat: 9.31, lng: 42.12 },
    { name: 'Haramaya', region: 'Oromia', lat: 9.41, lng: 42.03 },
    { name: 'Chiro', region: 'Oromia', lat: 9.08, lng: 40.87 },
    { name: 'Mieso', region: 'Oromia', lat: 9.24, lng: 40.75 },
    { name: 'Gelemso', region: 'Oromia', lat: 9.18, lng: 40.52 },
    { name: 'Bedessa', region: 'Oromia', lat: 9.05, lng: 40.78 },
    { name: 'Aweday', region: 'Oromia', lat: 9.45, lng: 42.08 },
    { name: 'Deder', region: 'Oromia', lat: 9.33, lng: 41.45 },
    { name: 'Babile', region: 'Oromia', lat: 9.22, lng: 42.34 },
    { name: 'Chinaksen', region: 'Oromia', lat: 9.48, lng: 43.35 },
    { name: 'Fedis', region: 'Oromia', lat: 9.08, lng: 42.07 },
    { name: 'Girawa', region: 'Oromia', lat: 9.23, lng: 42.15 },
    { name: 'Goro Gutu', region: 'Oromia', lat: 9.68, lng: 42.55 },
    { name: 'Kersa', region: 'Oromia', lat: 9.12, lng: 42.28 },
    { name: 'Kombolcha', region: 'Oromia', lat: 9.28, lng: 41.72 },
]
