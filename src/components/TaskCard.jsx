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
    if (!longPressedRef.current && task.status === 'todo') onComplete(task.id)
  }

  const isCompleting = task.status === 'completing'

  return (
    <button
      type="button"
      onClick={handleClick}
      onMouseDown={startPress}
      onMouseUp={endPress}
      onMouseLeave={endPress}
      onTouchStart={startPress}
      onTouchEnd={endPress}
      className={`w-full rounded-[24px] border p-4 text-left shadow-[0_6px_18px_rgba(70,57,34,0.08)] transition-all duration-500 active:scale-[0.995] ${
        isCompleting ? 'border-[#CFE2B0] bg-[#F2F8E8] opacity-75' : 'border-[#E6E0D6] bg-[#FEFCFA]'
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <span
            className="mt-0.5 flex h-12 w-12 shrink-0 items-center justify-center rounded-full"
            style={{ backgroundColor: iconBgMap[task.icon] || '#ECECEC', color: iconColorMap[task.icon] || '#6C6C6C' }}
          >
            <TaskIcon name={task.icon} className="h-7 w-7" />
          </span>
          <div className="min-w-0">
            <p className="text-[20px] font-bold leading-tight text-[#2F3540]">{task.title}</p>
            {task.note ? <p className="mt-1 text-[14px] text-[#6B7280]">{task.note}</p> : null}
          </div>
        </div>
        <div className="text-right">
          <p className="pt-1 text-[22px] font-bold text-[#D97A34]">+{task.points} 积分</p>
          {isCompleting ? <p className="mt-1 text-xs text-[#6F8E32]">完成中...</p> : null}
        </div>
      </div>
    </button>
  )
}
