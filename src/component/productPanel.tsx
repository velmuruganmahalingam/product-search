import { useState } from 'react'
import { Settings, Product } from '../types/productData'
import '../style.css'

interface Props {
  current: Settings
  onSave: (s: Settings) => void
  onClose: () => void
}

const availableFields: (keyof Product)[] = ['title', 'description', 'price', 'category']

export function SettingsPanel({ current, onSave, onClose }: Props) {
  const [settings, setSettings] = useState(current)

  const handleFieldChange = (field: keyof Settings, value: any) => {
    setSettings(prev => ({ ...prev, [field]: value }))
  }

  const toggleFieldSelection = (field: keyof Product) => {
    const isSelected = settings.fields.includes(field)
    const updatedFields = isSelected ? settings.fields.filter(f => f !== field) : [...settings.fields, field]
    setSettings(prev => ({ ...prev, fields: updatedFields }))
  }

  return (
    <div className="settings-modal">
      <div className="settings-container">
        <h2 className="settings-heading">Configure Search Options</h2>

        <div className="settings-group">
          <div className="settings-group-label">Searchable Fields</div>
          {availableFields.map(field => (
            <label key={field} className="settings-checkbox">
              <input
                type="checkbox"
                checked={settings.fields.includes(field)}
                onChange={() => toggleFieldSelection(field)}
              />
              {field}
            </label>
          ))}
        </div>

        <div className="settings-group">
          <label className="settings-checkbox">
            <input
              type="checkbox"
              checked={settings.caseSensitive}
              onChange={e => handleFieldChange('caseSensitive', e.target.checked)}
            />
            Enable Case Sensitivity
          </label>
          <label className="settings-checkbox">
            <input
              type="checkbox"
              checked={settings.exact}
              onChange={e => handleFieldChange('exact', e.target.checked)}
            />
            Exact Match Search
          </label>
        </div>

        <div className="settings-group">
          <label className="settings-select-label">Max Results to Display</label>
          <select
            value={settings.max}
            onChange={e => handleFieldChange('max', Number(e.target.value))}
            className="settings-select"
          >
            {[10, 20, 50].map(limit => (
              <option key={limit} value={limit}>{limit}</option>
            ))}
          </select>
        </div>

        <div className="settings-footer">
          <button onClick={onClose} className="settings-action-btn">Cancel</button>
          <button onClick={() => onSave(settings)} className="settings-action-btn">Save</button>
        </div>
      </div>
    </div>
  )
}
