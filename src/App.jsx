import { useMemo, useState } from 'react'
import TaskCard from './components/TaskCard'
import TaskIcon, { iconOptions } from './components/TaskIcon'

const taskColors = [
  '#FFECEC', // 红
  '#FFF3E2', // 橙
  '#FFF9D9', // 黄
  '#ECF9E8', // 绿
  '#E8F9F8', // 青
  '#EAF2FF', // 蓝
  '#F4ECFF', // 紫
  '#F2F3F5', // 灰
]

const initialTasks = [
  {
    id: 't1',
    title: '收玩具',
    points: 5,
    note: '整理自己的玩具',
    icon: 'clean',
    color: '#ECF9E8',
    status: 'todo',
  },
  {
    id: 't2',
    title: '完成作业',
    points: 5,
    note: '今天的作业任务',
    icon: 'homework',
    color: '#EAF2FF',
    status: 'todo',
  },
]

const emptyForm = {
  title: '',
  points: 5,
  note: '',
  icon: 'reward',
  color: '#FFF3E2',
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
      icon: task.icon || 'reward',
      color: task.color || '#FFF3E2',
    })
    setShowTaskModal(true)
  }

  const submitTask = (event) => {
    event.preventDefault()

    const title = form.title.trim()
    const points = Number(form.points)

    if (!title || Number.isNaN(points) || points < 1) {
      return
    }

    if (editingTaskId) {
      setTasks((prev) =>
        prev.map((task) =>
          task.id === editingTaskId
            ? {
                ...task,
                title,
                points,
                note: form.note.trim(),
                icon: form.icon,
                color: form.color,
              }
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

  const handleLongPress = (task) => {
    setActionTask(task)
  }

  const handleDeleteTask = () => {
    if (!actionTask) return
    const shouldDelete = window.confirm('确定要删除这个任务吗？')
    if (shouldDelete) {
      setTasks((prev) => prev.filter((item) => item.id !== actionTask.id))
      setActionTask(null)
    }
  }

  return (
    <main className="mx-auto min-h-screen w-full max-w-md bg-[#F8F4E9] px-4 pb-24 pt-5">
      <section className="relative overflow-hidden rounded-[28px] border border-amber-900/10 bg-white p-5 shadow-[0_12px_28px_rgba(47,35,26,0.08)]">
        <h1 className="pr-24 text-[34px] font-extrabold leading-tight text-[#3A3531]">今天继续加油吧！</h1>

        <div className="mt-4 rounded-[22px] border border-slate-100 bg-[#FCFCFC] p-5">
          <p className="text-[64px] font-black leading-none text-[#D97C3B]">{totalPoints}</p>
          <p className="mt-1 text-[30px] text-slate-600">当前积分</p>
        </div>

        <div className="pointer-events-none absolute right-4 top-5">
          <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#FFDDA6] to-[#F3A75B] shadow-md">
            <span className="text-4xl">🦊</span>
            <span className="absolute -left-3 top-2 text-xl text-[#F5CC55]">✦</span>
            <span className="absolute -left-1 top-8 text-base text-[#F5CC55]">✧</span>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={openCreateModal}
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full border-[3px] border-[#8DAE46] bg-[#90B347] py-3 text-[28px] font-bold text-white shadow-[inset_0_-4px_0_rgba(58,85,18,0.42)]"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#6D8D2D] text-[24px] leading-none">+</span>
        新增任务
      </button>

      <section className="mt-6">
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="text-[40px] font-bold text-[#3A3531]">任务清单</h2>
          <span className="rounded-full border border-amber-900/10 bg-[#FFF2E7] px-4 py-1 text-[24px] text-slate-600">
            {uncompletedTasks.length} 项
          </span>
        </div>

        <div className="space-y-3">
          {uncompletedTasks.length > 0 ? (
            uncompletedTasks.map((task) => (
              <TaskCard key={task.id} task={task} onComplete={completeTask} onLongPress={handleLongPress} />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-amber-900/15 bg-white/70 p-5 text-center text-base text-slate-500">
              太棒了，当前没有未完成任务 🎉
            </div>
          )}
        </div>
      </section>

      <nav className="fixed bottom-0 left-0 right-0 border-t border-amber-900/10 bg-white/95 backdrop-blur">
        <div className="mx-auto grid max-w-md grid-cols-3 px-5 py-2 text-[18px]">
          <button className="rounded-full bg-[#F9E08E] py-2 font-semibold text-amber-900">任务</button>
          <button className="py-2 text-slate-500">奖励</button>
          <button className="py-2 text-slate-500">记录</button>
        </div>
      </nav>

      {showTaskModal ? (
        <div className="fixed inset-0 z-20 flex items-end bg-black/35 p-4">
          <div className="w-full rounded-3xl bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-ink">{editingTaskId ? '编辑任务' : '新增任务'}</h3>
              <button type="button" className="text-slate-500" onClick={closeTaskModal}>
                关闭
              </button>
            </div>

            <form className="space-y-4" onSubmit={submitTask}>
              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">任务名称 *</span>
                <input
                  value={form.title}
                  onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#8BAE3F]"
                  placeholder="例如：整理书桌"
                  required
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">任务积分 *</span>
                <input
                  type="number"
                  min="1"
                  value={form.points}
                  onChange={(e) => setForm((prev) => ({ ...prev, points: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#8BAE3F]"
                  required
                />
              </label>

              <div>
                <span className="mb-1 block text-sm font-medium text-slate-700">小图标（可选）</span>
                <div className="grid grid-cols-6 gap-2">
                  {iconOptions.map((iconName) => (
                    <button
                      key={iconName}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, icon: iconName }))}
                      className={`flex h-11 w-11 items-center justify-center rounded-xl border ${
                        form.icon === iconName
                          ? 'border-[#8BAE3F] bg-[#F2FBE8]'
                          : 'border-slate-200 bg-white'
                      }`}
                      aria-label={`icon-${iconName}`}
                    >
                      <TaskIcon name={iconName} className="text-2xl" />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="mb-1 block text-sm font-medium text-slate-700">卡片颜色（可选）</span>
                <div className="grid grid-cols-8 gap-2">
                  {taskColors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setForm((prev) => ({ ...prev, color }))}
                      className={`h-8 w-8 rounded-full border-2 ${form.color === color ? 'border-slate-700' : 'border-white'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <label className="block">
                <span className="mb-1 block text-sm font-medium text-slate-700">备注 / 详细内容（可选）</span>
                <textarea
                  rows="3"
                  value={form.note}
                  onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
                  className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-[#8BAE3F]"
                  placeholder="例如：睡前 8 点前完成"
                />
              </label>

              <button type="submit" className="w-full rounded-xl bg-[#8BAE3F] py-3 text-base font-semibold text-white">
                {editingTaskId ? '保存修改' : '创建任务'}
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {actionTask ? (
        <div className="fixed inset-0 z-30 flex items-end bg-black/35 p-4" onClick={() => setActionTask(null)}>
          <div className="w-full rounded-3xl bg-white p-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <p className="mb-3 text-center text-sm text-slate-500">对“{actionTask.title}”执行操作</p>
            <div className="space-y-2">
              <button
                type="button"
                className="w-full rounded-xl bg-[#EEF7DD] py-3 text-sm font-semibold text-[#4F6A16]"
                onClick={() => {
                  openEditModal(actionTask)
                  setActionTask(null)
                }}
              >
                编辑
              </button>
              <button
                type="button"
                className="w-full rounded-xl bg-[#FDEAEA] py-3 text-sm font-semibold text-[#B94141]"
                onClick={handleDeleteTask}
              >
                删除
              </button>
              <button
                type="button"
                className="w-full rounded-xl border border-slate-200 py-3 text-sm text-slate-500"
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
