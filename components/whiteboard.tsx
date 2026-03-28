'use client';

import { useState } from 'react';

export function Whiteboard() {
  const [notes, setNotes] = useState('x² + 5x + 6 = 0\nРазложим на множители: (x + 2)(x + 3) = 0');

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold">Интерактивная доска</h3>
          <p className="text-sm text-slate-400">Сейчас это MVP-заглушка для замены на tldraw/Excalidraw.</p>
        </div>
        <span className="badge">whiteboard</span>
      </div>

      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="min-h-[320px] w-full rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm outline-none"
      />
    </div>
  );
}
