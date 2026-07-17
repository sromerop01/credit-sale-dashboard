import { Outlet } from 'react-router-dom'

export function AuthShell() {
  return (
    <div className="flex min-h-screen flex-col bg-cream">
      <header className="flex items-center justify-between border-b-2 border-navy px-8 py-4 max-sm:px-4 max-sm:py-3">
        <div className="flex items-center gap-2 text-sm font-bold">
          <div className="flex size-[30px] items-center justify-center rounded-xs bg-cyan text-sm font-bold text-navy">
            C
          </div>
          <span>Credit Sale</span>
        </div>
        {/* <div className="flex gap-4 text-xs font-medium uppercase tracking-[0.06em]">
          <button className="p-0 text-black">English</button>
          <button className="p-0 text-black underline underline-offset-4">
            Español
          </button>
        </div> */}
      </header>

      <main className="flex flex-1">
        <Outlet />
      </main>
    </div>
  )
}
