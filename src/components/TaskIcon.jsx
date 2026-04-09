const iconDefs = {
  bag: (
    <>
      <rect x="7" y="9" width="10" height="9" rx="2.2" />
      <path d="M9.5 9V7.7A2.5 2.5 0 0 1 12 5.2a2.5 2.5 0 0 1 2.5 2.5V9" />
      <path d="m10.3 13.2 1.2 1.2 2.2-2.4" />
    </>
  ),
  pencil: (
    <>
      <path d="m6 16.7 1.2-3.8 7.8-7.7a1.8 1.8 0 0 1 2.5 0l1.3 1.3a1.8 1.8 0 0 1 0 2.5l-7.8 7.7L7 18z" />
      <path d="m14.5 5.7 3.8 3.8" />
    </>
  ),
  book: (
    <>
      <path d="M5.5 6.5h5.2a2 2 0 0 1 2 2V18a3 3 0 0 0-2.6-1.3H5.5z" />
      <path d="M18.5 6.5h-5.2a2 2 0 0 0-2 2V18a3 3 0 0 1 2.6-1.3h4.6z" />
    </>
  ),
  broom: <path d="M6.5 6.5h5.2l5.8 5.8-2.1 2.1-5.8-5.8V6.5Zm8.9 8.9 2.1 2.1" />,
  ball: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M7.5 9.3c2.8 1.2 6.2 1.2 9 0M7.8 14.8c2.8-1.2 5.6-1.2 8.4 0" />
    </>
  ),
  star: <path d="m12 5.3 2 4 4.4.6-3.2 3.1.8 4.4-3.9-2-3.9 2 .8-4.4L5.6 9.9l4.4-.6z" />,
  gift: (
    <>
      <path d="M6.5 10h11v7.5h-11z" />
      <path d="M12 10v7.5M5.8 7.5h12.4V10H5.8z" />
      <path d="M10.4 7.5c-.9 0-1.7-.7-1.7-1.6s.8-1.6 1.7-1.6c1.3 0 1.6 1 1.6 3.2M13.6 7.5c.9 0 1.7-.7 1.7-1.6s-.8-1.6-1.7-1.6c-1.3 0-1.6 1-1.6 3.2" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="7" />
      <path d="M12 8.4v3.9l2.6 1.6" />
    </>
  ),
}

export const iconOptions = Object.keys(iconDefs)

export default function TaskIcon({ name = 'star', className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}>
      {iconDefs[name] || iconDefs.star}
    </svg>
  )
}
