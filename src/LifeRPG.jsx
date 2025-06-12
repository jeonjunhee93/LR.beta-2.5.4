import React, { useState } from 'react';
import './index.css';

const equipmentSlots = [
  { id: 'head', label: '머리', style: { top: '5%', left: '40%' } },
  { id: 'chest', label: '상의', style: { top: '25%', left: '40%' } },
  { id: 'legs', label: '하의', style: { top: '50%', left: '40%' } },
  { id: 'boots', label: '신발', style: { top: '75%', left: '40%' } },
  { id: 'gloves', label: '장갑', style: { top: '35%', left: '20%' } },
  { id: 'weapon', label: '무기', style: { top: '35%', right: '20%' } },
  { id: 'cloak', label: '망토', style: { top: '20%', right: '40%' } },
  { id: 'belt', label: '허리띠', style: { top: '60%', left: '45%' } },
  { id: 'ring', label: '반지', style: { top: '65%', right: '30%' } },
  { id: 'amulet', label: '목걸이', style: { top: '15%', left: '45%' } },
];

export default function LifeRPG() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [player, setPlayer] = useState({ level: 1, xp: 0, gold: 0 });

  const addTask = () => {
    if (!input.trim()) return;
    setTasks([...tasks, { text: input, done: false }]);
    setInput('');
  };

  const completeTask = (index) => {
    const newTasks = [...tasks];
    if (!newTasks[index].done) {
      newTasks[index].done = true;
      const xpGained = 20;
      const goldGained = 10;
      setPlayer((prev) => ({
        ...prev,
        xp: prev.xp + xpGained,
        gold: prev.gold + goldGained,
        level: Math.floor((prev.xp + xpGained) / 100) + 1
      }));
    }
    setTasks(newTasks);
  };

  return (
    <div>
      <h1>🎮 LR (Life Role-Playing Game)</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="할 일을 입력하세요"
      />
      <button onClick={addTask}>추가</button>
      <p>레벨: {player.level}</p>
      <p>XP: {player.xp}</p>
      <p>골드: {player.gold}</p>

      <ul>
        {tasks.map((t, i) => (
          <li key={i} onClick={() => completeTask(i)} style={{ textDecoration: t.done ? 'line-through' : 'none' }}>
            {t.text}
          </li>
        ))}
      </ul>

      <h2>🧍 장비창</h2>
      <div style={{ position: 'relative', width: 300, height: 500, margin: '1rem auto' }}>
        <img src="/silhouette.png" alt="실루엣" style={{ width: '100%', height: '100%' }} />
        {equipmentSlots.map((slot) => (
          <div
            key={slot.id}
            style={{
              position: 'absolute',
              width: 50,
              height: 50,
              backgroundColor: 'rgba(255,255,255,0.7)',
              border: '1px solid #333',
              borderRadius: 6,
              textAlign: 'center',
              fontSize: 12,
              lineHeight: '50px',
              ...slot.style
            }}
          >
            {slot.label}
          </div>
        ))}
      </div>
    </div>
  );
}