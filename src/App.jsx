import { useMemo, useState } from 'react'
import PetBadge from './components/PetBadge'
import TaskCard from './components/TaskCard'

const initialTasks = [
  { id: 't1', title: '整理书包', points: 5, done: false },
  { id: 't2', title: '阅读 20 分钟', points: 8, done: false },
  { id: 't3', title: '饭后整理桌面', points: 6, done: false },
]

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [taskName, setTaskName] = useState('')
  const [taskPoints, setTaskPoints] = useState(5)
  const [animatePoints, setAnimatePoints] = useState(false)

  const points = useMemo(
    () => tasks.filter((task) => task.done).reduce((sum, task) => sum + task.points, 0),
    [tasks],
  )

  const completeTask = (id) => {
    setTasks((prev) => prev.map((task) => (task.id === id && !task.done ? { ...task, done: true } : task)))
    setAnimatePoints(true)
    setTimeout(() => setAnimatePoints(false), 360)
  }

  const addTask = (event) => {
    event.preventDefault()
    if (!taskName.trim() || Number(taskPoints) < 1) return

    setTasks((prev) => [
      {
        id: crypto.randomUUID(),
        title: taskName.trim(),
        points: Number(taskPoints),
        done: false,
      },
      ...prev,
    ])

    setTaskName('')
    setTaskPoints(5)
  }

  const doneCount = tasks.filter((task) => task.done).length

  const deleteTask = (id) => {
    setTasks((prev) => prev.filter((task) => task.id !== id))
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-[#F8F4E9] px-4 pb-10 pt-5">
      <header className="rounded-[28px] border border-amber-900/10 bg-[#F9F2B8] p-5 shadow-soft">
        <div className="mb-4">
          <h1 className="text-2xl font-bold text-ink">今天也要加油呀！</h1>
        </div>

        <div className="rounded-2xl border border-amber-900/10 bg-white/80 p-4">
          <p className="text-xs text-slate-500">当前积分</p>
          <p className={`text-4xl font-bold text-ink ${animatePoints ? 'animate-pop' : ''}`}>{points}</p>
          <div className="mt-2 flex items-center gap-2 text-xs text-slate-500">
            <span>已完成 {doneCount} 项</span>
            <span>•</span>
            <span>待完成 {tasks.length - doneCount} 项</span>
          </div>
        </div>
      </header>

      <section className="mt-4 rounded-[24px] border border-amber-900/10 bg-[#FFE5C8] p-4 shadow-soft">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold text-ink">新任务卡片</h2>
          <div className="flex items-center gap-1.5">
            <PetBadge type="fox" active />
            <PetBadge type="cat" />
          </div>
        </div>

        <form className="space-y-3" onSubmit={addTask}>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full rounded-2xl border border-amber-900/10 bg-white px-3 py-2.5 text-sm outline-none ring-2 ring-transparent placeholder:text-slate-400 focus:ring-warn"
            placeholder="输入任务名称（如：收玩具）"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={taskPoints}
              onChange={(e) => setTaskPoints(e.target.value)}
              className="w-24 rounded-2xl border border-amber-900/10 bg-white px-3 py-2 text-sm outline-none ring-2 ring-transparent focus:ring-warn"
            />
            <span className="text-sm text-amber-900/70">积分</span>
            <button
              type="submit"
              className="ml-auto rounded-full bg-warn px-4 py-2 text-sm font-semibold text-white transition active:scale-95"
            >
              添加任务
            </button>
          </div>
        </form>
      </section>

      <section className="mt-4 space-y-3 pb-20">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-semibold text-ink">任务清单</h2>
          <span className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-500 shadow-sm">{tasks.length} 项</span>
        </div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={completeTask} onDelete={deleteTask} />
        ))}
      </section>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-amber-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-3 px-5 py-2 text-xs">
          <button className="rounded-full bg-[#F9F2B8] py-2 font-semibold text-amber-900">任务</button>
          <button className="py-2 text-slate-500">奖励</button>
          <button className="py-2 text-slate-500">记录</button>
        </div>
      </nav>
    </main>
  )
}
