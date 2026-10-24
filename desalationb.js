// desalationb.js — Entsalzung für PQ
// PQ schnüffelt via BroadcastChannel, desalationb filtert SALZ vs FRESH
// Reihenfolge: rawPQ → desalationbFilter() → nameFilter(name) → render
// Name kommt NACH desalationb, vor Anzeige

export const SALZ = [
  /OneDrive.*speichern/i,
  /Noch keine Zuschauer/i, // TikTok leer
  /Team löschen/i, // 【entity-Discord¦canonical_name=Discord】 Team delete
  /Popup/i,
  /uno/i,
]

export const FRESH = [
  /D:\\tmp/i,
  /bio\.tel/i,
  /rom\.disk/i,
  /R:\\.*raid/i,
  /ram\.disk/i,
  /EINS/i,
  /FREE/i,
]

export function isStale(tab, now = Date.now(), maxAge = 3000) {
  return now - tab.lastSeen > maxAge
}

export function desalationbFilter(tabs, { removeSelf = true, selfId = null, removeStale = true } = {}) {
  return tabs.filter(t => {
    const isSalt = SALZ.some(rx => rx.test(t.tabId) || rx.test(t.role) || rx.test(t.fingerprint))
    if (isSalt) return false
    if (removeSelf && selfId && t.tabId === selfId) return false
    if (removeStale && isStale(t)) return false
    return true
  })
}

export function nameFilter(tabs, name = "") {
  // HIER kommt Name rein — nach desalationb
  if (!name.trim()) return tabs
  const n = name.toLowerCase()
  return tabs.filter(t =>
    t.tabId.toLowerCase().includes(n) ||
    t.role.toLowerCase().includes(n) ||
    t.fingerprint.toLowerCase().includes(n)
  )
}

export function sniffPipeline(rawTabs, name, opts = {}) {
  const desalted = desalationbFilter(rawTabs, opts)
  const named = nameFilter(desalted, name)
  return { desalted, named, raw: rawTabs }
}
