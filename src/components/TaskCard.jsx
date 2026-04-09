import { useRef } from 'react'
import TaskIcon from './TaskIcon'

const iconBgMap = {
  bag: '#ECF1D6',
  pencil: '#DEE7F4',
}

const iconColorMap = {
  bag: '#6F8E32',
  pencil: '#4E6F94',
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
    if (!longPressedRef.current) onComplete(task.id)
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
      className="w-full rounded-[24px] border border-[#E6E0D6] bg-[#FFFDFC] p-4 text-left shadow-[0_8px_18px_rgba(59,45,25,0.08)] transition active:scale-[0.995]"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: iconBgMap[task.icon] || '#ECECEC', color: iconColorMap[task.icon] || '#6C6C6C' }}
          >
            <TaskIcon name={task.icon} className="h-6 w-6" />
          </span>
          <div className="min-w-0">
            <p className="text-[22px] font-bold leading-tight text-[#373334]">{task.title}</p>
            {task.note ? <p className="mt-1 text-[14px] text-[#6B6765]">{task.note}</p> : null}
          </div>
        </div>
        <p className="pt-1 text-[22px] font-bold text-[#D77A39]">+{task.points} 积分</p>
      </div>
    </button>
  )
}
