import { useRef } from 'react'

const iconMap = {
  bag: '👜',
  book: '📘',
  broom: '🧹',
  workout: '🏃',
  star: '⭐',
  default: '📝',
}

export default function TaskCard({ task, onComplete, onLongPress }) {
  const timerRef = useRef(null)
  const longPressedRef = useRef(false)

  const startPress = () => {
    longPressedRef.current = false
    timerRef.current = setTimeout(() => {
      longPressedRef.current = true
      onLongPress(task)
    }, 550)
  }

  const endPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }

  const handleClick = () => {
    if (!longPressedRef.current) {
      onComplete(task.id)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      className="w-full rounded-[22px] border border-amber-900/10 bg-white p-4 text-left shadow-soft transition active:scale-[0.99]"
      style={{ backgroundColor: task.color || '#FFFFFF' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-full bg-white/70 text-xl">
            {iconMap[task.icon] || iconMap.default}
          </span>
          <div>
            <p className="text-[20px] font-semibold leading-6 text-ink">{task.title}</p>
            {task.note ? <p className="mt-1 text-sm text-slate-600/90 line-clamp-2">{task.note}</p> : null}
          </div>
        </div>
        <p className="text-3xl font-bold leading-none text-[#D97C3B]">+{task.points}</p>
      </div>
    </button>
  )
}
