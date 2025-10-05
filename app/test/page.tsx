export default function TestPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-8">TEST PAGE - NOVÝ UI</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⭐</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Points</h3>
              <p className="text-white/70 text-sm">Earn rewards daily</p>
              <div className="mt-4">
                <span className="text-3xl font-bold text-white">56.7K</span>
                <p className="text-xs text-white/60">Total Points</p>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500/20 to-emerald-500/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🏆</span>
              </div>
              <div className="bg-green-500/30 rounded-lg px-3 py-1 mb-4 inline-block">
                <span className="text-green-300 text-xs font-semibold">2nd Place</span>
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Weekly Challenge</h3>
              <p className="text-white/70 text-sm mb-4">$10k USDC prize pool</p>
              <div className="flex justify-center">
                <div className="w-2 h-2 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 backdrop-blur-md border border-white/20 rounded-xl p-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-white/70 text-sm">Ends on Oct 5, 2025</span>
              </div>
              <h3 className="text-white font-bold text-lg mb-2">Prediction Market</h3>
              <p className="text-white/70 text-sm mb-4">Will Skadi reach 150M users by Oct 5?</p>
              <div className="text-right">
                <span className="text-2xl font-bold text-white">99.85%</span>
                <p className="text-xs text-white/60">Confidence</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-white mb-6">All Trending Markets</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6">
              <h3 className="text-white font-semibold mb-4">$BTC above $107,648.69 on Oct 6?</h3>
              <div className="text-center mb-4">
                <span className="text-3xl font-bold text-blue-400">99.85%</span>
                <p className="text-white/60 text-sm">Chance</p>
              </div>
              <div className="flex gap-2 justify-center">
                <button className="px-4 py-2 bg-green-500/20 text-green-300 rounded hover:bg-green-500/30 transition-colors">
                  YES
                </button>
                <button className="px-4 py-2 bg-red-500/20 text-red-300 rounded hover:bg-red-500/30 transition-colors">
                  NO
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
