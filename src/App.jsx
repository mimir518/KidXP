import { useMemo, useState } from 'react'
import TaskCard from './components/TaskCard'
import TaskIcon, { iconOptions } from './components/TaskIcon'

const taskColors = [
  '#FFEFF0',
  '#FFF3E6',
  '#FFF8DE',
  '#EFF8E8',
  '#EAF8F7',
  '#EDF4FF',
  '#F2EDFF',
  '#F2F3F5',
]

const initialTasks = [
  {
    id: 't1',
    title: '收玩具',
    points: 5,
    note: '整理自己的玩具',
    icon: 'bag',
    color: '#FFFDFC',
    status: 'todo',
  },
  {
    id: 't2',
    title: '完成作业',
    points: 5,
    note: '今天的作业任务',
    icon: 'pencil',
    color: '#FFFDFC',
    status: 'todo',
  },
]

const emptyForm = {
  title: '',
  points: 5,
  note: '',
  icon: 'star',
  color: '#FFFDFC',
}

export default function App() {
  const [tasks, setTasks] = useState(initialTasks)
  const [totalPoints, setTotalPoints] = useState(24)
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [editingTaskId, setEditingTaskId] = useState(null)
  const [actionTask, setActionTask] = useState(null)
  const [form, setForm] = useState(emptyForm)

  const uncompletedTasks = useMemo(() => tasks.filter((task) => task.status === 'todo'), [tasks])

  const closeTaskModal = () => {
    setShowTaskModal(false)
    setEditingTaskId(null)
    setForm(emptyForm)
  }

  const openCreateModal = () => {
    setEditingTaskId(null)
    setForm(emptyForm)
    setShowTaskModal(true)
  }

  const openEditModal = (task) => {
    setEditingTaskId(task.id)
    setForm({
      title: task.title,
      points: task.points,
      note: task.note || '',
      icon: task.icon || 'star',
      color: task.color || '#FFFDFC',
    })
    setShowTaskModal(true)
  }

  const submitTask = (event) => {
    event.preventDefault()
    const title = form.title.trim()
    const points = Number(form.points)
    if (!title || Number.isNaN(points) || points < 1) return

    if (editingTaskId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId
            ? { ...task, title, points, note: form.note.trim(), icon: form.icon, color: form.color }
            : task,
        ),
      )
    } else {
      setTasks((prev) => [
        {
          id: crypto.randomUUID(),
          title,
          points,
          note: form.note.trim(),
          icon: form.icon,
          color: form.color,
          status: 'todo',
        },
        ...prev,
      ])
    }

    closeTaskModal()
  }

  const completeTask = (id) => {
    const target = tasks.find((task) => task.id === id)
    if (!target || target.status !== 'todo') return

    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, status: 'done' } : task)))
    setTotalPoints((prev) => prev + target.points)
  }

  const handleDeleteTask = () => {
    if (!actionTask) return
    const shouldDelete = window.confirm('确定要删除这个任务吗？')
    if (shouldDelete) {
      setTasks((prev) => prev.filter((task) => task.id !== actionTask.id))
      setActionTask(null)
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-[#F5EEDC] px-4 pb-24 pt-6">
      <section className="relative rounded-[24px] border border-[#E4DDD1] bg-[#FFFDFC] p-5 shadow-[0_8px_24px_rgba(70,57,34,0.08)]">
        <h1 className="text-[28px] font-bold text-[#3B3736]">今天继续加油吧！</h1>
        <div className="mt-4 rounded-[24px] border border-[#ECE6DC] bg-[#FFFDFC] p-5">
          <p className="text-[76px] font-black leading-[1] text-[#D97C3B]">{totalPoints}</p>
          <p className="mt-1 text-[18px] text-[#66615F]">当前积分</p>
        </div>

        <div className="pointer-events-none absolute right-6 top-5 flex items-center gap-1">
          <span className="text-xl text-[#F3CC55]">✦</span>
          <span className="text-base text-[#F3CC55]">✧</span>
          <span className="text-[74px]">🦊</span>
        </div>
      </section>

      <button
        type="button"
        onClick={openCreateModal}
        className="mt-5 flex w-full items-center justify-center rounded-full border-[3px] border-[#88A93D] bg-[#95B84B] py-3 text-[24px] font-bold text-white shadow-[inset_0_-4px_0_rgba(86,113,33,0.5)]"
      >
        <span className="mr-3 flex h-9 w-9 items-center justify-center rounded-full bg-[#6E8D2E] text-[26px] leading-none">+</span>
        新增任务
      </button>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-[42px] font-bold text-[#3B3736]">任务清单</h2>
          <span className="rounded-full border border-[#E4D7C8] bg-[#F9ECDF] px-4 py-1 text-[24px] text-[#6F6964]">
            {uncompletedTasks.length} 项
          </span>
        </div>

        <div className="space-y-3">
          {uncompletedTasks.length ? (
            uncompletedTasks.map((task) => <TaskCard key={task.id} task={task} onComplete={completeTask} onLongPress={setActionTask} />)
          ) : (
            <div className="rounded-[24px] border border-dashed border-[#DCD2C3] bg-[#FFFDFC] p-6 text-center text-[#7C7671]">
              太棒了，当前没有未完成任务 🎉
            </div>
          )}
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-[#E3DBCF] bg-[#FFFDFC]/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-3 px-5 py-2 text-[18px]">
          <button className="flex items-center justify-center gap-2 rounded-full bg-[#F6DE95] py-2 font-semibold text-[#403B37]">
            <TaskIcon name="bag" className="h-5 w-5" />任务
          </button>
          <button className="flex items-center justify-center gap-2 py-2 text-[#5A6674]">
            <TaskIcon name="gift" className="h-5 w-5" />奖励
          </button>
          <button className="flex items-center justify-center gap-2 py-2 text-[#5A6674]">
            <TaskIcon name="clock" className="h-5 w-5" />记录
          </button>
        </div>
      </nav>

      {showTaskModal ? (
        <div className="fixed inset-0 z-20 flex items-end bg-black/30 p-4">
          <div className="w-full rounded-[24px] bg-[#FFFDFC] p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#3B3736]">{editingTaskId ? '编辑任务' : '新增任务'}</h3>
              <button type="button" className="text-sm text-[#77706C]" onClick={closeTaskModal}>
                关闭
              </button>
            </div>

            <form className="space-y-4" onSubmit={submitTask}>
              <label className="block">
                <span className="mb-1 block text-sm text-[#58514D]">任务名称 *</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-xl border border-[#E6DED1] bg-white px-3 py-2 text-sm outline-none focus:border-[#9EBA55]"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm text-[#58514D]">任务积分 *</span>
                <input
                  type="number"
                  min="1"
                  value={form.points}
                  onChange={(e) => setForm((prev) => ({ ...prev, points: e.target.value }))}
                  className="w-full rounded-xl border border-[#E6DED1] bg-white px-3 py-2 text-sm outline-none focus:border-[#9EBA55]"
                  required
                />
              </label>

              <div>
                <span className="mb-1 block text-sm text-[#58514D]">图标</span>
                <div className="grid grid-cols-8 gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, icon }))}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                        form.icon === icon ? 'border-[#9EBA55] bg-[#F3F8E7] text-[#6E8D2E]' : 'border-[#E6DED1] text-[#6C6662]'
                      }`}
                    >
                      <TaskIcon name={icon} className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1 block text-sm text-[#58514D]">颜色</span>
                <div className="grid grid-cols-8 gap-2">
                  {taskColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, color }))}
                      className={`h-8 w-8 rounded-full border-2 ${form.color === color ? 'border-[#6E6963]' : 'border-white'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm text-[#58514D]">备注（可选）</span>
                <textarea
                  rows="3"
                  value={form.note}
                  onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
                  className="w-full rounded-xl border border-[#E6DED1] bg-white px-3 py-2 text-sm outline-none focus:border-[#9EBA55]"
                />
              </label>

              <button type="submit" className="w-full rounded-xl bg-[#95B84B] py-3 text-base font-semibold text-white">
                {editingTaskId ? '保存修改' : '创建任务'}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {actionTask ? (
        <div className="fixed inset-0 z-30 flex items-end bg-black/30 p-4" onClick={() => setActionTask(null)}>
          <div className="w-full rounded-[24px] bg-[#FFFDFC] p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full rounded-xl bg-[#EEF6E0] py-3 text-base font-semibold text-[#4C6820]"
                onClick={() => {
                  openEditModal(actionTask)
                  setActionTask(null)
                }}
              >
                编辑任务
              </button>
              <button
                type="button"
                className="w-full rounded-xl bg-[#FCEAEA] py-3 text-base font-semibold text-[#B84A4A]"
                onClick={handleDeleteTask}
              >
                删除任务
              </button>
              <button
                type="button"
                className="w-full rounded-xl border border-[#E4DDD1] py-3 text-base text-[#6F6964]"
                onClick={() => setActionTask(null)}
              >
                取消
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  )
}
