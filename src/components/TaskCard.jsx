import { useRef } from 'react'

const LONG_PRESS_MS = 550

export default function TaskCard({ task, onToggleComplete, onLongPress }) {
  const timerRef = useRef(null)
  const longPressedRef = useRef(false)

  const startLongPress = () => {
    clearTimeout(timerRef.current)
    longPressedRef.current = false
    timerRef.current = window.setTimeout(() => {
      longPressedRef.current = true
      onLongPress(task)
    }, LONG_PRESS_MS)
  }

  const cancelLongPress = () => {
    clearTimeout(timerRef.current)
  }

  const handleClick = () => {
    if (longPressedRef.current) {
      longPressedRef.current = false
      return
    }
    onToggleComplete(task.id)
  }

  const handleContextMenu = (event) => {
    event.preventDefault()
    onLongPress(task)
  }

  return (
    <button
      type="button"
      className={`w-full rounded-[24px] border border-amber-900/10 bg-white p-4 text-left shadow-soft transition active:scale-[0.99] ${
        task.done ? 'bg-emerald-50/70' : ''
      }`}
      onClick={handleClick}
      onTouchStart={startLongPress}
      onTouchEnd={cancelLongPress}
      onTouchCancel={cancelLongPress}
      onMouseDown={startLongPress}
      onMouseUp={cancelLongPress}
      onMouseLeave={cancelLongPress}
      onContextMenu={handleContextMenu}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 text-xl font-black ${
              task.done
                ? 'border-emerald-500 bg-emerald-100 text-emerald-700'
                : 'border-slate-300 bg-slate-100 text-slate-400'
            }`}
          >
            {task.done ? '✓' : '•'}
          </div>
          <div className="min-w-0">
            <p className={`truncate text-[28px] leading-none font-bold ${task.done ? 'text-emerald-700' : 'text-ink'}`}>
              {task.title}
            </p>
            <p className="mt-1 text-sm text-slate-500">点击卡片完成 / 长按管理</p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[32px] font-extrabold leading-none text-amber-700">+{task.points}</p>
          <p className="text-sm text-amber-700/80">积分</p>
        </div>
      </div>
    </button>
  )
}
