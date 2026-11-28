import { useState } from 'react'
import { toast } from 'sonner'

export function Settings() {
  const [settings, setSettings] = useState({
    userName: 'Maya Chen',
    email: 'maya@example.com',
    workspaceName: 'Acme Studio',
  })

  function updateSetting(event) {
    const { name, value } = event.target
    setSettings((current) => ({ ...current, [name]: value }))
  }

  function saveSettings(event) {
    event.preventDefault()
    toast.success('Settings updated', {
      description: 'These changes are only shown in this page and are not saved to a backend.',
    })
  }

  return (
    <div className="page">
      <div className="page-heading-row">
        <div>
          <span className="eyebrow">YOUR WORKSPACE</span>
          <h1>Settings</h1>
          <p>Update the profile details shown in this demo.</p>
        </div>
      </div>
      <section className="panel settings-panel">
        <form className="settings-form" onSubmit={saveSettings}>
          <label className="form-field">
            <span>User name</span>
            <input name="userName" value={settings.userName} onChange={updateSetting} />
          </label>
          <label className="form-field">
            <span>Email</span>
            <input name="email" type="email" value={settings.email} onChange={updateSetting} />
          </label>
          <label className="form-field">
            <span>Workspace name</span>
            <input name="workspaceName" value={settings.workspaceName} onChange={updateSetting} />
          </label>
          <div className="settings-actions">
            <button className="button button-primary" type="submit">Save changes</button>
          </div>
        </form>
      </section>
    </div>
  )
}
