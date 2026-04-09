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
    color: '#FEFCFA',
    status: 'todo',
  },
  {
    id: 't2',
    title: '完成作业',
    points: 5,
    note: '今天的作业任务',
    icon: 'pencil',
    color: '#FEFCFA',
    status: 'todo',
  },
]

const emptyForm = {
  title: '',
  points: 5,
  note: '',
  icon: 'star',
  color: '#FEFCFA',
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
      color: task.color || '#FEFCFA',
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
    <main className="mx-auto min-h-screen w-full max-w-md bg-[#F6F1E3] px-6 pb-24 pt-6">
      <section className="relative rounded-[28px] border border-[#E9E3DA] bg-[#FCFAF7] p-5 shadow-[0_6px_18px_rgba(70,57,34,0.08)]">
        <h1 className="text-[28px] font-bold text-[#2F3540]">今天继续加油吧！</h1>
        <div className="mt-4 rounded-[24px] border border-[#EEE8E0] bg-[#FEFCFA] p-6">
          <p className="text-[76px] font-black leading-[1] text-[#D97A34]">{totalPoints}</p>
          <p className="mt-2 text-[18px] text-[#6B7280]">当前积分</p>
        </div>

        <div className="pointer-events-none absolute right-5 top-6 flex items-start gap-1">
          <div className="pt-5 text-[#F3CC55]">
            <span className="mr-1 text-lg">✦</span>
            <span className="text-sm">✧</span>
          </div>
          <span className="text-[68px] leading-none">🦊</span>
        </div>
      </section>

      <button
        type="button"
        onClick={openCreateModal}
        className="mt-5 flex w-full items-center justify-center rounded-full border-[2px] border-[#88A53E] bg-[#9DBB4E] py-3 text-[22px] font-semibold text-white shadow-[0_6px_18px_rgba(70,57,34,0.08)]"
      >
        <span className="mr-3 flex h-8 w-8 items-center justify-center rounded-full bg-[#88A53E] text-[22px] leading-none">+</span>
        新增任务
      </button>

      <section className="mt-5">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-[22px] font-semibold text-[#2F3540]">任务清单</h2>
          <span className="rounded-full border border-[#E5DCCD] bg-[#F7ECE0] px-4 py-1 text-[16px] text-[#6B7280]">
            {uncompletedTasks.length} 项
          </span>
        </div>

        <div className="space-y-4">
          {uncompletedTasks.length ? (
            uncompletedTasks.map((task) => <TaskCard key={task.id} task={task} onComplete={completeTask} onLongPress={setActionTask} />)
          ) : (
            <div className="rounded-[24px] border border-dashed border-[#DED5C8] bg-[#FEFCFA] p-6 text-center text-[#6B7280]">
              太棒了，当前没有未完成任务 🎉
            </div>
          )}
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-[#E6DED2] bg-[#FCFAF7]/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-3 px-5 py-1.5 text-[16px]">
          <button className="flex items-center justify-center gap-2 rounded-full bg-[#F0D78A] py-2 font-medium text-[#2F3540]">
            <TaskIcon name="bag" className="h-5 w-5" />任务
          </button>
          <button className="flex items-center justify-center gap-2 py-2 text-[#6B7280]">
            <TaskIcon name="gift" className="h-5 w-5" />奖励
          </button>
          <button className="flex items-center justify-center gap-2 py-2 text-[#6B7280]">
            <TaskIcon name="clock" className="h-5 w-5" />记录
          </button>
        </div>
      </nav>

      {showTaskModal ? (
        <div className="fixed inset-0 z-20 flex items-end bg-black/30 p-4">
          <div className="w-full rounded-[24px] bg-[#FEFCFA] p-5 shadow-[0_6px_18px_rgba(70,57,34,0.08)]">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#2F3540]">{editingTaskId ? '编辑任务' : '新增任务'}</h3>
              <button type="button" className="text-sm text-[#6B7280]" onClick={closeTaskModal}>
                关闭
              </button>
            </div>

            <form className="space-y-4" onSubmit={submitTask}>
              <label className="block">
                <span className="mb-1 block text-sm text-[#6B7280]">任务名称 *</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-xl border border-[#E6DED1] bg-white px-3 py-2 text-sm outline-none focus:border-[#9DBB4E]"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm text-[#6B7280]">任务积分 *</span>
                <input
                  type="number"
                  min="1"
                  value={form.points}
                  onChange={(e) => setForm((prev) => ({ ...prev, points: e.target.value }))}
                  className="w-full rounded-xl border border-[#E6DED1] bg-white px-3 py-2 text-sm outline-none focus:border-[#9DBB4E]"
                  required
                />
              </label>

              <div>
                <span className="mb-1 block text-sm text-[#6B7280]">图标</span>
                <div className="grid grid-cols-8 gap-2">
                  {iconOptions.map((icon) => (
                    <button
                      key={icon}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, icon }))}
                      className={`flex h-10 w-10 items-center justify-center rounded-lg border ${
                        form.icon === icon ? 'border-[#9DBB4E] bg-[#F3F8E7] text-[#88A53E]' : 'border-[#E6DED1] text-[#6B7280]'
                      }`}
                    >
                      <TaskIcon name={icon} className="h-5 w-5" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1 block text-sm text-[#6B7280]">颜色</span>
                <div className="grid grid-cols-8 gap-2">
                  {taskColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, color }))}
                      className={`h-8 w-8 rounded-full border-2 ${form.color === color ? 'border-[#6B7280]' : 'border-white'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm text-[#6B7280]">备注（可选）</span>
                <textarea
                  rows="3"
                  value={form.note}
                  onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
                  className="w-full rounded-xl border border-[#E6DED1] bg-white px-3 py-2 text-sm outline-none focus:border-[#9DBB4E]"
                />
              </label>

              <button type="submit" className="w-full rounded-xl bg-[#9DBB4E] py-3 text-base font-semibold text-white">
                {editingTaskId ? '保存修改' : '创建任务'}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {actionTask ? (
        <div className="fixed inset-0 z-30 flex items-end bg-black/30 p-4" onClick={() => setActionTask(null)}>
          <div className="w-full rounded-[24px] bg-[#FEFCFA] p-4 shadow-[0_6px_18px_rgba(70,57,34,0.08)]" onClick={(e) => e.stopPropagation()}>
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
                className="w-full rounded-xl border border-[#E4DDD1] py-3 text-base text-[#6B7280]"
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
