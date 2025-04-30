import { useMemo, useState } from 'react'
import { Settings } from '../types/productData'
import { ProductPanel } from './productPanel'
import { products } from '../data/Product'
import '../style.css'

const defaultSearchSettings: Settings = {
    fields: ['title', 'description'],
    caseSensitive: false,
    exact: false,
    max: 20
}

const retrieveSettings = (): Settings => {
    try {
        const storedSettings = localStorage.getItem('search-settings')
        return storedSettings ? JSON.parse(storedSettings) : defaultSearchSettings
    } catch {
        return defaultSearchSettings
    }
}

export function ProductSearchPage() {
    const [searchText, setSearchText] = useState('')
    const [searchSettings, setSearchSettings] = useState<Settings>(retrieveSettings)
    const [openModal, setOpenModal] = useState(false)

    const handleSettingsSave = (newSettings: Settings) => {
        localStorage.setItem('search-settings', JSON.stringify(newSettings))
        setSearchSettings(newSettings)
        setOpenModal(false)
    }

    const filteredProducts = useMemo(() => {
        const toCompare = (value: string) => searchSettings.caseSensitive ? value : value.toLowerCase()
        const comparedText = toCompare(searchText)

        if (!searchText) return products.slice(0, searchSettings.max)

        return products.filter(value => {
            return searchSettings.fields.some(field => {
                const productValue = String(value[field])
                const comparedProductValue = toCompare(productValue)

                if (searchSettings.exact) {
                    return comparedProductValue === comparedText
                } else {
                    return comparedProductValue.includes(comparedText)
                }
            })
        }).slice(0, searchSettings.max)
    }, [searchText, searchSettings])

    return (
        <div className="search-page-container">
            <div className="search-input-container">
                <input
                    className="search-input"
                    value={searchText}
                    onChange={e => setSearchText(e.target.value)}
                    placeholder="Search products"
                />
                <button
                    className="settings-button"
                    onClick={() => setOpenModal(true)}
                >
                    Settings
                </button>
            </div>

            {/* Show the settings panel below the search box */}
            {openModal && (
                <div className="settings-panel">
                    <ProductPanel
                        current={searchSettings}
                        onSave={handleSettingsSave}
                        onClose={() => setOpenModal(false)}
                    />
                </div>
            )}

            <div className="product-grid">
                {filteredProducts.map(product => (
                    <div key={product.id} className="product-card">
                        <div className="product-title">{product.title}</div>
                        <div className="product-description">{product.description}</div>
                        <div className="product-price">${product.price}</div>
                        <div className="product-category">{product.category}</div>
                    </div>
                ))}
            </div>
        </div>
    )
}


