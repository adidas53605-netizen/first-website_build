notepad website
import { useState, useEffect } from "react";

const questions = [
  {
    id: 1,
    topic: "Lists",
    code: `fruits = ["apple", "banana", "cherry"]
print(fruits[1])`,
    question: "What does this print?",
    options: ["apple", "banana", "cherry", "1"],
    answer: "banana",
    explanation: "List indexes start at 0. So index [1] is the second item — 'banana'."
  },
  {
    id: 2,
    topic: "Lists",
    code: `nums = [10, 20, 30, 40]
nums.append(50)
print(len(nums))`,
    question: "What is printed?",
    options: ["4", "5", "50", "Error"],
    answer: "5",
    explanation: ".append() adds one item to the end of the list. The list now has 5 items, so len() returns 5."
  },
  {
    id: 3,
    topic: "Lists",
    code: `colors = ["red", "green", "blue"]
print(colors[-1])`,
    question: "What does this print?",
    options: ["red", "green", "blue", "Error"],
    answer: "blue",
    explanation: "Negative indexes count from the end. -1 is always the last item."
  },
  {
    id: 4,
    topic: "Dicts",
    code: `person = {"name": "Alice", "age": 25}
print(person["name"])`,
    question: "What is the output?",
    options: ["Alice", "name", "25", "Error"],
    answer: "Alice",
    explanation: "Dictionaries use keys to look up values. 'name' maps to 'Alice'."
  },
  {
    id: 5,
    topic: "Dicts",
    code: `scores = {"math": 90, "english": 85}
scores["science"] = 78
print(len(scores))`,
    question: "What does len() return?",
    options: ["2", "3", "78", "Error"],
    answer: "3",
    explanation: "Adding a new key 'science' grows the dict to 3 entries. len() counts key-value pairs."
  },
  {
    id: 6,
    topic: "Dicts",
    code: `data = {"x": 1, "y": 2}
print("z" in data)`,
    question: "What is printed?",
    options: ["True", "False", "None", "Error"],
    answer: "False",
    explanation: "The 'in' keyword checks if a key exists in a dict. 'z' is not a key here, so it's False."
  },
  {
    id: 7,
    topic: "Sets",
    code: `nums = {1, 2, 2, 3, 3, 3}
print(len(nums))`,
    question: "What does this print?",
    options: ["6", "3", "1", "Error"],
    answer: "3",
    explanation: "Sets automatically remove duplicates. {1, 2, 2, 3, 3, 3} becomes {1, 2, 3} — just 3 unique items."
  },
  {
    id: 8,
    topic: "Sets",
    code: `a = {1, 2, 3}
b = {3, 4, 5}
print(a | b)`,
    question: "What does | produce?",
    options: ["{3}", "{1, 2, 3, 4, 5}", "{1, 2, 4, 5}", "Error"],
    answer: "{1, 2, 3, 4, 5}",
    explanation: "| is the union operator — it combines both sets, keeping all unique elements."
  },
  {
    id: 9,
    topic: "Mixed",
    code: `inventory = {"apples": 5, "bananas": 3}
items = list(inventory.keys())
print(items[0])`,
    question: "What is printed?",
    options: ["5", "apples", "bananas", "Error"],
    answer: "apples",
    explanation: ".keys() returns the dict's keys. list() converts them so we can index them. Index [0] is 'apples'."
  },
  {
    id: 10,
    topic: "Mixed",
    code: `cart = ["apple", "banana", "apple", "cherry"]
unique = set(cart)
print(len(unique))`,
    question: "What does len(unique) return?",
    options: ["4", "3", "2", "1"],
    answer: "3",
    explanation: "Converting a list to a set removes duplicates. 'apple' appears twice, so we get 3 unique items."
  }
];

const topicColors = {
  Lists: { bg: "#0d2137", border: "#1f6feb", text: "#58a6ff" },
  Dicts: { bg: "#1a1a0d", border: "#9e6a03", text: "#e3b341" },
  Sets: { bg: "#0d2a0d", border: "#238636", text: "#3fb950" },
  Mixed: { bg: "#1a0d2a", border: "#8957e5", text: "#bc8cff" }
};

export default function DataStructuresQuiz() {
  const [shuffled] = useState(() => [...questions].sort(() => Math.random() - 0.5));
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [confirmed, setConfirmed] = useState(false);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [history, setHistory] = useState([]);
  const [animKey, setAnimKey] = useState(0);

  const q = shuffled[current];
  const tc = topicColors[q?.topic] || topicColors.Mixed;
  const total = shuffled.length;

  function handleSelect(opt) {
    if (!confirmed) setSelected(opt);
  }

  function handleConfirm() {
    if (!selected) return;
    const correct = selected === q.answer;
    setConfirmed(true);
    if (correct) setScore(s => s + 1);
    setHistory(h => [...h, { topic: q.topic, correct }]);
  }

  function handleNext() {
    if (current + 1 >= total) { setDone(true); return; }
    setCurrent(c => c + 1);
    setSelected(null);
    setConfirmed(false);
    setAnimKey(k => k + 1);
  }

  function restart() {
    setCurrent(0); setSelected(null); setConfirmed(false);
    setScore(0); setDone(false); setHistory([]); setAnimKey(k => k + 1);
  }

  const pct = total ? Math.round((score / total) * 100) : 0;
  const topicStats = ["Lists", "Dicts", "Sets", "Mixed"].map(t => ({
    t,
    correct: history.filter(h => h.topic === t && h.correct).length,
    total: history.filter(h => h.topic === t).length,
    c: topicColors[t]
  })).filter(ts => ts.total > 0);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#faf7f2",
      fontFamily: "'Georgia', serif",
      color: "#1a1a1a",
      padding: "0"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />

      {/* Top bar */}
      <div style={{
        background: "#1a1a1a",
        padding: "14px 32px",
        display: "flex", alignItems: "center", justifyContent: "space-between"
      }}>
        <div style={{ fontFamily: "'Playfair Display', serif", color: "#faf7f2", fontSize: 18, letterSpacing: 1 }}>
          Python · Data Structures
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {shuffled.map((_, i) => (
            <div key={i} style={{
              width: 8, height: 8, borderRadius: "50%",
              background: i < current ? "#3fb950" : i === current ? "#e3b341" : "#333"
            }} />
          ))}
        </div>
        <div style={{ fontFamily: "'IBM Plex Mono', monospace", color: "#e3b341", fontSize: 14 }}>
          {score}/{current} ✓
        </div>
      </div>

      <div style={{ maxWidth: 680, margin: "0 auto", padding: "40px 24px" }}>
        {!done ? (
          <div key={animKey} style={{ animation: "slideIn 0.35s cubic-bezier(0.4,0,0.2,1)" }}>

            {/* Topic badge */}
            <div style={{ marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{
                display: "inline-block",
                background: tc.bg,
                border: `1px solid ${tc.border}`,
                color: tc.text,
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 11,
                letterSpacing: 2,
                padding: "4px 12px",
                borderRadius: 20,
                textTransform: "uppercase"
              }}>{q.topic}</div>
              <div style={{ color: "#999", fontSize: 13, fontFamily: "'IBM Plex Mono', monospace" }}>
                Q{current + 1} of {total}
              </div>
            </div>

            {/* Question */}
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: 22,
              lineHeight: 1.4,
              marginBottom: 24,
              color: "#1a1a1a"
            }}>{q.question}</div>

            {/* Code block */}
            <div style={{
              background: "#1a1a1a",
              borderRadius: 10,
              overflow: "hidden",
              marginBottom: 28,
              boxShadow: "0 4px 24px rgba(0,0,0,0.15)"
            }}>
              <div style={{
                background: "#111",
                padding: "8px 16px",
                display: "flex", alignItems: "center", gap: 8,
                borderBottom: "1px solid #333"
              }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#ff5f57" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#febc2e" }} />
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#28c840" }} />
                <span style={{ fontSize: 11, color: "#666", marginLeft: 8, fontFamily: "'IBM Plex Mono', monospace" }}>
                  {q.topic.toLowerCase()}_quiz.py
                </span>
              </div>
              <pre style={{
                margin: 0,
                padding: "22px 24px",
                fontFamily: "'IBM Plex Mono', monospace",
                fontSize: 15, lineHeight: 1.8,
                color: "#79c0ff",
                overflowX: "auto"
              }}>{q.code}</pre>
            </div>

            {/* Options */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 20 }}>
              {q.options.map(opt => {
                const isSel = selected === opt;
                const isCorrect = opt === q.answer;
                let bg = "#fff", border = "#ddd", color = "#1a1a1a", shadow = "none";
                if (confirmed) {
                  if (isCorrect) { bg = "#f0fff4"; border = "#238636"; color = "#1a4a1a"; }
                  else if (isSel) { bg = "#fff5f5"; border = "#f85149"; color = "#5a1a1a"; }
                } else if (isSel) {
                  bg = "#f0f7ff"; border = tc.border; color = "#1a1a1a";
                  shadow = `0 0 0 3px ${tc.bg}`;
                }
                return (
                  <button key={opt} onClick={() => handleSelect(opt)} style={{
                    background: bg, border: `2px solid ${border}`,
                    borderRadius: 8, padding: "14px 16px",
                    color, cursor: confirmed ? "default" : "pointer",
                    fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 14, textAlign: "left",
                    transition: "all 0.18s ease",
                    boxShadow: shadow,
                    display: "flex", alignItems: "center", gap: 8
                  }}>
                    {confirmed && isCorrect && <span style={{ color: "#238636" }}>✓</span>}
                    {confirmed && isSel && !isCorrect && <span style={{ color: "#f85149" }}>✗</span>}
                    {opt}
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {confirmed && (
              <div style={{
                background: selected === q.answer ? "#f0fff4" : "#fffbf0",
                border: `1px solid ${selected === q.answer ? "#238636" : "#e3b341"}`,
                borderLeft: `4px solid ${selected === q.answer ? "#238636" : "#e3b341"}`,
                borderRadius: 8, padding: "14px 18px",
                marginBottom: 20, fontSize: 14, lineHeight: 1.7,
                fontFamily: "'Georgia', serif", color: "#333"
              }}>
                <strong>{selected === q.answer ? "✓ Correct!" : `✗ The answer is: ${q.answer}`}</strong>
                {" "}{q.explanation}
              </div>
            )}

            {/* CTA */}
            {!confirmed ? (
              <button onClick={handleConfirm} disabled={!selected} style={{
                width: "100%", padding: "15px",
                background: selected ? "#1a1a1a" : "#eee",
                border: "none", borderRadius: 8,
                color: selected ? "#faf7f2" : "#999",
                fontSize: 14, fontWeight: "bold",
                cursor: selected ? "pointer" : "not-allowed",
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: 2, transition: "all 0.2s"
              }}>CHECK ANSWER</button>
            ) : (
              <button onClick={handleNext} style={{
                width: "100%", padding: "15px",
                background: "#1a1a1a",
                border: "none", borderRadius: 8,
                color: "#e3b341", fontSize: 14, fontWeight: "bold",
                cursor: "pointer",
                fontFamily: "'IBM Plex Mono', monospace",
                letterSpacing: 2
              }}>{current + 1 >= total ? "SEE RESULTS →" : "NEXT →"}</button>
            )}
          </div>
        ) : (
          /* Results */
          <div style={{ animation: "slideIn 0.4s ease" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, marginBottom: 6 }}>
              {pct >= 80 ? "Excellent work! 🎉" : pct >= 60 ? "Good effort! 📈" : "Keep going! 🌱"}
            </div>
            <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 14, color: "#666", marginBottom: 32 }}>
              You scored {score} out of {total} ({pct}%)
            </div>

            {/* Topic breakdown */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, marginBottom: 16 }}>Breakdown by topic</div>
              {topicStats.map(ts => (
                <div key={ts.t} style={{
                  display: "flex", alignItems: "center", gap: 14,
                  marginBottom: 12
                }}>
                  <div style={{
                    width: 70, fontFamily: "'IBM Plex Mono', monospace",
                    fontSize: 11, color: ts.c.text,
                    background: ts.c.bg, border: `1px solid ${ts.c.border}`,
                    padding: "3px 8px", borderRadius: 12,
                    textAlign: "center"
                  }}>{ts.t}</div>
                  <div style={{ flex: 1, height: 8, background: "#eee", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{
                      height: "100%",
                      width: `${ts.total ? (ts.correct / ts.total) * 100 : 0}%`,
                      background: ts.c.border, borderRadius: 4,
                      transition: "width 0.8s ease"
                    }} />
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 13, color: "#666", width: 40 }}>
                    {ts.correct}/{ts.total}
                  </div>
                </div>
              ))}
            </div>

            <button onClick={restart} style={{
              width: "100%", padding: "15px",
              background: "#1a1a1a", border: "none", borderRadius: 8,
              color: "#e3b341", fontSize: 14, fontWeight: "bold",
              cursor: "pointer", fontFamily: "'IBM Plex Mono', monospace", letterSpacing: 2
            }}>TRY AGAIN</button>
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: none; } }
        button:hover:not(:disabled) { opacity: 0.88; }
      `}</style>
    </div>
  );
}
