const iconMap = {
  clean: '🧹',
  homework: '✏️',
  read: '📚',
  exercise: '⚽',
  wash: '🫧',
  sleep: '🛏️',
  piano: '🎹',
  paint: '🎨',
  plant: '🪴',
  pet: '🐶',
  timer: '⏰',
  reward: '🎁',
}

export const iconOptions = Object.keys(iconMap)

export default function TaskIcon({ name = 'reward', className = 'text-xl' }) {
  return <span className={className}>{iconMap[name] || iconMap.reward}</span>
}
