export default function TaskCard({ task, onComplete }) {
  return (
    <div className="rounded-3xl bg-white p-4 shadow-soft">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-ink">{task.title}</p>
          <p className="mt-1 text-sm text-slate-500">完成可获得 {task.points} 积分</p>
        </div>
        <button
          type="button"
          onClick={() => onComplete(task.id)}
          disabled={task.done}
          className={`rounded-full px-4 py-2 text-sm font-medium transition active:scale-95 ${
            task.done ? 'bg-slate-200 text-slate-500' : 'bg-ok text-white'
          }`}
        >
          {task.done ? '已完成' : '完成任务'}
        </button>
      </div>
    </div>
  )
}
