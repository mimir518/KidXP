const petMap = {
  fox: { face: '🦊', name: '小狐' },
  bear: { face: '🐻', name: '小熊' },
  cat: { face: '🐱', name: '小猫' },
}

export default function PetBadge({ type = 'fox', active = false }) {
  const pet = petMap[type] || petMap.fox

  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs transition ${
        active
          ? 'border-amber-900/25 bg-amber-100 text-amber-900'
          : 'border-slate-200 bg-white text-slate-500'
      }`}
    >
      <span>{pet.face}</span>
      <span>{pet.name}</span>
    </div>
  )
}
