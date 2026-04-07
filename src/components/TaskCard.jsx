import { useRef, useState } from 'react'

const SWIPE_THRESHOLD = 90

export default function TaskCard({ task, onComplete, onDelete }) {
  const startX = useRef(0)
  const [deltaX, setDeltaX] = useState(0)
  const [isStamped, setIsStamped] = useState(false)

  const onTouchStart = (event) => {
    if (isStamped) return
    startX.current = event.touches[0].clientX
  }

  const onTouchMove = (event) => {
    if (isStamped) return
    const currentX = event.touches[0].clientX
    setDeltaX(currentX - startX.current)
  }

  const onTouchEnd = () => {
    if (isStamped) return

    if (deltaX > SWIPE_THRESHOLD) {
      setIsStamped(true)
      setDeltaX(0)
      window.setTimeout(() => {
        onComplete(task.id, task.points)
      }, 420)
      return
    }

    if (deltaX < -SWIPE_THRESHOLD) {
      const shouldDelete = window.confirm(`确认删除任务「${task.title}」吗？`)
      if (shouldDelete) onDelete(task.id)
    }

    setDeltaX(0)
  }

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-amber-900/10 bg-white">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-4 text-xs font-semibold">
        <span className="rounded-full bg-emerald-100 px-2 py-1 text-emerald-700">右滑完成</span>
        <span className="rounded-full bg-rose-100 px-2 py-1 text-rose-700">左滑删除</span>
      </div>

      <div
        className="relative flex min-h-[92px] items-center justify-between rounded-[24px] border border-amber-900/10 bg-white px-4 py-3 transition"
        style={{ transform: `translateX(${Math.max(-120, Math.min(120, deltaX))}px)` }}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <div className="flex-1 pr-4">
          <p className="text-[20px] font-semibold leading-7 text-ink">{task.title}</p>
        </div>

        <div className="shrink-0 text-right">
          <p className="text-[28px] font-bold leading-none text-amber-700">{task.points}</p>
          <p className="mt-1 text-[11px] text-slate-500">积分</p>
        </div>

        {isStamped && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-white/35">
            <div className="animate-stamp rounded-full border-4 border-rose-500 px-5 py-2 text-xl font-extrabold tracking-[0.2em] text-rose-500">
              完成
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
