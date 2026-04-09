import { useMemo, useState } from 'react'
import PetBadge from './components/PetBadge'
import TaskCard from './components/TaskCard'

const initialTasks = [
  { id: 't1', title: '收玩具', points: 5, done: false },
  { id: 't2', title: '完成作业', points: 5, done: false },
]

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [taskName, setTaskName] = useState('')
  const [taskPoints, setTaskPoints] = useState(5)
  const [animatePoints, setAnimatePoints] = useState(false)

  const [manageTask, setManageTask] = useState(null)
  const [isEditing, setIsEditing] = useState(false)
  const [editTitle, setEditTitle] = useState('')
  const [editPoints, setEditPoints] = useState(1)

  const points = useMemo(
    () => tasks.filter((task) => task.done).reduce((sum, task) => sum + task.points, 0),
    [tasks],
  )

  const toggleComplete = (id) => {
    setTasks((prev) => {
      const before = prev.find((task) => task.id === id)
      const next = prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task))
      if (before && !before.done) {
        setAnimatePoints(true)
        setTimeout(() => setAnimatePoints(false), 360)
      }
      return next
    })
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

  const openManageDialog = (task) => {
    setManageTask(task)
    setIsEditing(false)
  }

  const closeDialog = () => {
    setManageTask(null)
    setIsEditing(false)
  }

  const deleteTask = () => {
    if (!manageTask) return
    setTasks((prev) => prev.filter((task) => task.id !== manageTask.id))
    closeDialog()
  }

  const beginEdit = () => {
    if (!manageTask) return
    setEditTitle(manageTask.title)
    setEditPoints(manageTask.points)
    setIsEditing(true)
  }

  const submitEdit = (event) => {
    event.preventDefault()
    if (!manageTask || !editTitle.trim() || Number(editPoints) < 1) return

    setTasks((prev) =>
      prev.map((task) =>
        task.id === manageTask.id
          ? { ...task, title: editTitle.trim(), points: Number(editPoints) }
          : task,
      ),
    )

    closeDialog()
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-[#F8F4E9] px-4 pb-24 pt-5">
      <header className="rounded-[28px] border border-amber-900/10 bg-[#F9F2B8] p-5 shadow-soft">
        <h1 className="text-2xl font-bold text-ink">今天继续加油吧！</h1>

        <div className="mt-4 rounded-2xl border border-amber-900/10 bg-white/80 p-4">
          <p className={`text-5xl font-extrabold text-amber-600 ${animatePoints ? 'animate-pop' : ''}`}>{points}</p>
          <p className="text-lg text-slate-500">当前积分</p>
        </div>
      </header>

      <section className="mt-4 rounded-[24px] border border-amber-900/10 bg-[#A9C95A] p-4 shadow-soft">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">新增任务</h2>
          <div className="flex items-center gap-1.5">
            <PetBadge type="fox" active />
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
            <span className="text-sm text-white">积分</span>
            <button
              type="submit"
              className="ml-auto rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#6E8D28] transition active:scale-95"
            >
              + 新增任务
            </button>
          </div>
        </form>
      </section>

      <section className="mt-5 space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-2xl font-bold text-ink">任务清单</h2>
          <span className="rounded-full border border-amber-900/10 bg-white px-3 py-1 text-sm text-slate-500">{tasks.length} 项</span>
        </div>

        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} onToggleComplete={toggleComplete} onLongPress={openManageDialog} />
        ))}
      </section>

      {manageTask && (
        <div className="fixed inset-0 z-50 flex items-end bg-black/30 p-4" onClick={closeDialog}>
          <div className="w-full rounded-3xl bg-white p-4 shadow-soft" onClick={(event) => event.stopPropagation()}>
            <p className="text-base font-semibold text-ink">管理任务：{manageTask.title}</p>

            {!isEditing ? (
              <div className="mt-4 space-y-2">
                <button
                  type="button"
                  className="w-full rounded-2xl bg-amber-50 py-3 text-left text-sm font-semibold text-amber-800"
                  onClick={beginEdit}
                >
                  修改任务
                </button>
                <button
                  type="button"
                  className="w-full rounded-2xl bg-rose-50 py-3 text-left text-sm font-semibold text-rose-700"
                  onClick={deleteTask}
                >
                  删除任务
                </button>
                <button
                  type="button"
                  className="w-full rounded-2xl bg-slate-100 py-3 text-sm font-medium text-slate-600"
                  onClick={closeDialog}
                >
                  取消
                </button>
              </div>
            ) : (
              <form className="mt-4 space-y-3" onSubmit={submitEdit}>
                <input
                  value={editTitle}
                  onChange={(event) => setEditTitle(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2"
                />
                <input
                  type="number"
                  min="1"
                  value={editPoints}
                  onChange={(event) => setEditPoints(event.target.value)}
                  className="w-full rounded-2xl border border-slate-200 px-3 py-2"
                />
                <div className="flex gap-2">
                  <button type="submit" className="flex-1 rounded-2xl bg-[#A9C95A] py-2 font-semibold text-white">
                    保存修改
                  </button>
                  <button type="button" className="flex-1 rounded-2xl bg-slate-100 py-2" onClick={closeDialog}>
                    取消
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <nav className="fixed bottom-0 left-0 right-0 border-t border-amber-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-3 px-5 py-2 text-xs">
          <button className="rounded-full bg-[#F9E39B] py-2 font-semibold text-[#6E8D28]">任务</button>
          <button className="py-2 text-slate-500">奖励</button>
          <button className="py-2 text-slate-500">记录</button>
        </div>
      </nav>
    </main>
  )
}
