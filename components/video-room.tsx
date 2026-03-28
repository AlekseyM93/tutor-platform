'use client';

import { useEffect, useMemo, useState } from 'react';
import { Room, RoomEvent } from 'livekit-client';

type Props = {
  roomName: string;
  userName: string;
};

export function VideoRoom({ roomName, userName }: Props) {
  const [status, setStatus] = useState('Подключение еще не началось');
  const [error, setError] = useState<string | null>(null);

  const room = useMemo(
    () =>
      new Room({
        adaptiveStream: true,
        dynacast: true
      }),
    []
  );

  useEffect(() => {
    let mounted = true;

    async function connect() {
      try {
        setStatus('Запрашиваем токен комнаты...');
        const response = await fetch('/api/livekit/token', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ roomName, userName })
        });

        if (!response.ok) throw new Error('Не удалось получить токен');

        const data = (await response.json()) as { token: string; wsUrl: string };

        setStatus('Подключаемся к LiveKit...');

        room.on(RoomEvent.Connected, () => setStatus('Подключено к комнате'));
        room.on(RoomEvent.Disconnected, () => setStatus('Отключено от комнаты'));

        await room.connect(data.wsUrl, data.token);
        await room.localParticipant.enableCameraAndMicrophone();

        if (mounted) setStatus('Камера и микрофон включены');
      } catch (e) {
        const message = e instanceof Error ? e.message : 'Неизвестная ошибка';
        setError(message);
        setStatus('Ошибка подключения');
      }
    }

    void connect();

    return () => {
      mounted = false;
      void room.disconnect();
    };
  }, [room, roomName, userName]);

  return (
    <div className="card p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-theme text-xl font-bold">Видеокомната</h3>
          <p className="text-theme-muted text-sm">Комната: {roomName}</p>
        </div>
        <span className="badge">{status}</span>
      </div>

      <div className="grid min-h-[320px] place-items-center rounded-2xl border border-dashed border-white/15 bg-black/20 p-6 text-center">
        <div>
          <div className="text-theme text-lg font-semibold">Интерфейс LiveKit на уровне SDK</div>
          <p className="text-theme-muted mt-2 max-w-xl text-sm">
            Для продакшена добавьте сетку участников, чат, выбор устройств, демонстрацию экрана,
            индикаторы записи и удобный сценарий переподключения.
          </p>
          {error ? <p className="mt-4 text-red-300">{error}</p> : null}
        </div>
      </div>
    </div>
  );
}
