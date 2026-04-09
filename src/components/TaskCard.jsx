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
      className="w-full rounded-[24px] border border-amber-900/10 bg-white p-4 text-left shadow-[0_8px_22px_rgba(34,24,16,0.08)] transition active:scale-[0.99]"
      style={{ backgroundColor: task.color || '#FFFFFF' }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span className="mt-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF3E0] text-[#668A2A]">
            <TaskIcon name={task.icon} className="h-6 w-6" />
          </span>
          <div>
            <p className="text-[18px] font-bold leading-6 text-ink">{task.title}</p>
            {task.note ? <p className="mt-1 text-sm text-slate-500">{task.note}</p> : null}
          </div>
        </div>
        <p className="pt-1 text-[40px] font-black leading-none text-[#D97C3B]">+{task.points}</p>
      </div>
    </button>
  )
}
