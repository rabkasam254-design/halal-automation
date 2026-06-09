export default function Footer() {
  return (
    <footer className="relative border-t border-white/[0.05] py-12">
      <div className="max-w-6xl mx-auto px-5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-green-600/20 border border-green-600/30 flex items-center justify-center text-sm">
              ☪
            </div>
            <span className="text-lg font-bold">
              <span className="text-green-500">Halal</span>
              <span className="text-white font-medium">AI</span>
            </span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <a href="#features" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Возможности</a>
            <a href="#pricing" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">Тарифы</a>
            <a href="#faq" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">FAQ</a>
            <a
              href="https://t.me/halalai_bot"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-green-400 text-sm transition-colors"
            >
              @halalai_bot
            </a>
          </div>

          {/* Halal badge */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-600/10 border border-green-600/15 text-green-500 text-xs">
            ☪ Принципы халяль
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-white/[0.04] text-center text-gray-600 text-xs">
          © 2026 HalalAI Automation. Все права защищены.
        </div>
      </div>
    </footer>
  )
}
