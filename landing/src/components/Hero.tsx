export default function Hero() {
  return (
    <section className="relative py-28 md:py-36 text-center overflow-hidden">
      {/* Subtle top glow */}
      <div className="absolute inset-x-0 top-0 h-px geometric-line" />
      <div className="absolute left-1/2 -translate-x-1/2 top-0 w-96 h-96 bg-green-600/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto px-5 z-10">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-600/10 border border-green-600/20 text-green-400 text-sm font-medium mb-8">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          Халяль. AI. Автоматизация.
        </div>

        {/* Heading */}
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-white mb-6 max-w-4xl mx-auto">
          AI-автоматизация<br />
          для{' '}
          <span className="text-gradient">халяль-бизнеса</span>
        </h1>

        {/* Subheading */}
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Telegram-боты, AI-контент, CRM и учёт — всё, чтобы ваш халяль-бизнес
          работал <strong className="text-gray-300 font-medium">24/7</strong> без лишних затрат.
        </p>

        {/* Actions */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a
            href="#pricing"
            className="px-8 py-3.5 rounded-xl bg-green-600 hover:bg-green-500 text-white font-semibold text-base transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-green-900/40"
          >
            Выбрать тариф
          </a>
          <a
            href="https://t.me/halalai_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3.5 rounded-xl bg-white/5 border border-white/10 text-white font-semibold text-base transition-all hover:bg-white/10 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.562 8.069l-2.022 9.531c-.145.658-.537.818-1.084.508l-3-2.21-1.447 1.394c-.16.16-.295.295-.605.295l.213-3.053 5.56-5.023c.242-.213-.054-.333-.373-.12L6.72 14.051l-2.952-.924c-.643-.204-.657-.643.136-.953l11.527-4.446c.537-.194 1.006.13.131.341z"/>
            </svg>
            Telegram бот
          </a>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-14 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Без риба (процентов)
          </div>
          <div className="w-px h-4 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Первая неделя бесплатно
          </div>
          <div className="w-px h-4 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> Запуск от 3 дней
          </div>
          <div className="w-px h-4 bg-white/10 hidden sm:block" />
          <div className="flex items-center gap-1.5">
            <span className="text-green-500">✓</span> RU / UZ / KZ / EN
          </div>
        </div>
      </div>
    </section>
  )
}
