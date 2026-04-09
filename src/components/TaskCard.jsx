import { useRef } from 'react'
import TaskIcon from './TaskIcon'

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
      className="w-full rounded-3xl border border-amber-900/10 bg-white p-4 text-left shadow-[0_6px_18px_rgba(34,24,16,0.08)] transition active:scale-[0.99]"
      style={{ backgroundColor: task.color || '#FFFFFF' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-start gap-3">
          <span className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/80 shadow-inner">
            <TaskIcon name={task.icon} className="text-[26px]" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-xl font-bold text-ink">{task.title}</p>
            {task.note ? <p className="mt-1 truncate text-sm text-slate-500">{task.note}</p> : null}
          </div>
        </div>
        <p className="shrink-0 pt-0.5 text-3xl font-extrabold text-[#D97C3B]">+{task.points}</p>
      </div>
    </button>
  )
}
