import { useMemo, useState } from 'react'
import TaskCard from './components/TaskCard'

const initialTasks = [
  { id: 't1', title: '整理房间 10 分钟', points: 5, done: false },
  { id: 't2', title: '阅读绘本 20 分钟', points: 8, done: false },
  { id: 't3', title: '晚饭后收拾餐桌', points: 6, done: false },
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
    setTasks((prev) => {
      const next = prev.map((task) =>
        task.id === id && !task.done ? { ...task, done: true } : task,
      )
      return next
    })
    setAnimatePoints(true)
    setTimeout(() => setAnimatePoints(false), 350)
  }

  const addTask = (event) => {
    event.preventDefault()
    if (!taskName.trim() || taskPoints < 1) return

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

  return (
    <main className="mx-auto min-h-screen w-full max-w-md px-4 pb-10 pt-5">
      <header className="mb-4 rounded-3xl bg-sky p-5 shadow-soft">
        <p className="text-sm text-slate-600">KidXP · 今日积分</p>
        <h1 className={`mt-1 text-4xl font-bold text-ink ${animatePoints ? 'animate-pop' : ''}`}>
          {points}
        </h1>
        <p className="mt-1 text-xs text-slate-500">完成任务后自动增加积分</p>
      </header>

      <section className="mb-4 rounded-3xl bg-peach p-4 shadow-soft">
        <h2 className="text-lg font-semibold text-ink">创建任务</h2>
        <form className="mt-3 space-y-3" onSubmit={addTask}>
          <input
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full rounded-2xl border-0 bg-white px-3 py-2 text-sm outline-none ring-2 ring-transparent focus:ring-warn"
            placeholder="任务名称（例如：收玩具）"
          />
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="1"
              value={taskPoints}
              onChange={(e) => setTaskPoints(e.target.value)}
              className="w-24 rounded-2xl border-0 bg-white px-3 py-2 text-sm outline-none ring-2 ring-transparent focus:ring-warn"
            />
            <span className="text-sm text-slate-600">积分</span>
            <button
              type="submit"
              className="ml-auto rounded-full bg-warn px-4 py-2 text-sm font-medium text-white transition active:scale-95"
            >
              添加任务
            </button>
          </div>
        </form>
      </section>

      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-lg font-semibold text-ink">今日任务</h2>
          <span className="text-xs text-slate-500">{tasks.filter((t) => !t.done).length} 个待完成</span>
        </div>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onComplete={completeTask} />
        ))}
      </section>
    </main>
  )
}
