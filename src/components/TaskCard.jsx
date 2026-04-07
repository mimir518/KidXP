export default function TaskCard({ task, onComplete }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[24px] border border-amber-900/10 p-4 shadow-soft transition ${
        task.done ? 'bg-emerald-50' : 'bg-white'
      }`}
    >
      <div className="absolute right-3 top-3 rounded-full border border-amber-900/10 bg-amber-50 px-2 py-0.5 text-[10px] text-amber-700">
        {task.done ? '已盖章' : '进行中'}
      </div>

      <div className="pr-14">
        <p className="text-[17px] font-semibold leading-6 text-ink">{task.title}</p>
        <p className="mt-1 text-sm text-slate-500">完成可获得 {task.points} 积分</p>
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-500">📝 今日任务</div>
        <button
          type="button"
          onClick={() => onComplete(task.id)}
          disabled={task.done}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition active:scale-95 ${
            task.done ? 'bg-slate-200 text-slate-500' : 'bg-ok text-white shadow-sm'
          }`}
        >
          {task.done ? '已完成' : '完成任务'}
        </button>
      </div>
    </div>
  )
}
