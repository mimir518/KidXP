const iconDefs = {
  tidy: (
    <path d="M8 10h8M10 7h4m-7 8h10a2 2 0 0 0 2-2V9l-3-3H8a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2Z" />
  ),
  homework: (
    <>
      <path d="M8 6h8l2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z" />
      <path d="M14 6v3h3" />
    </>
  ),
  reading: (
    <>
      <path d="M4 7.5c2.5-1.7 5.3-1.7 8 0v10c-2.7-1.7-5.5-1.7-8 0v-10Z" />
      <path d="M20 7.5c-2.5-1.7-5.3-1.7-8 0v10c2.7-1.7 5.5-1.7 8 0v-10Z" />
    </>
  ),
  sport: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M7 9c3 1 7 1 10 0M7 15c3-1 7-1 10 0M12 5c1 3 1 11 0 14" />
    </>
  ),
  cleaning: (
    <>
      <path d="M7 5h10M9 5v4l-3 8h12l-3-8V5" />
      <path d="M10 12h4" />
    </>
  ),
  pet: (
    <>
      <path d="M8.5 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm7 0a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" />
      <path d="M6 16c1.5-1.5 3.2-2.2 6-2.2s4.5.7 6 2.2" />
    </>
  ),
  plant: (
    <>
      <path d="M12 19V9" />
      <path d="M12 11c-3 0-5-2-5-5 3 0 5 2 5 5Zm0 2c3 0 5-2 5-5-3 0-5 2-5 5Z" />
    </>
  ),
  music: (
    <>
      <path d="M15 6v9a2.5 2.5 0 1 1-2-2.45V7l7-1v7a2.5 2.5 0 1 1-2-2.45V5l-3 .43Z" />
    </>
  ),
  draw: (
    <>
      <path d="m7 17 1.8-5L16 4.8a1.6 1.6 0 0 1 2.2 0l1 1a1.6 1.6 0 0 1 0 2.2L12 15.2 7 17Z" />
      <path d="M14.8 6.2 18 9.4" />
    </>
  ),
  routine: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8v4l2.6 2" />
    </>
  ),
  star: (
    <path d="m12 5 2 4.1 4.5.6-3.2 3.1.8 4.4L12 15l-4.1 2.2.8-4.4L5.5 9.7l4.5-.6L12 5Z" />
  ),
  reward: (
    <>
      <path d="M12 7v12" />
      <path d="M6 11h12v8H6z" />
      <path d="M6 11V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
    </>
  ),
}

export const iconOptions = Object.keys(iconDefs)

export default function TaskIcon({ name = 'star', className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {iconDefs[name] || iconDefs.star}
    </svg>
  )
}
