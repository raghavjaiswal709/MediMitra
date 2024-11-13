import { useState, useRef, useEffect } from "react";
import "./App.css";
import axios from "axios";
import ReactMarkdown from "react-markdown";

function App() {
  const [chatHistory, setChatHistory] = useState([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [generatingAnswer, setGeneratingAnswer] = useState(false);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chatHistory, generatingAnswer]);

  async function generateAnswer(e) {
    e.preventDefault();
    if (!question.trim()) return;

    setGeneratingAnswer(true);
    const currentQuestion = question;
    setQuestion(""); 

    setChatHistory(prev => [...prev, { type: 'question', content: currentQuestion }]);

    try {
      const response = await axios({
        url: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${import.meta.env.VITE_API_GENERATIVE_LANGUAGE_CLIENT}`,
        method: "post",
        data: {
          contents: [{ parts: [{ text: currentQuestion }] }],
        },
      });

      const aiResponse = response.data.candidates[0].content.parts[0].text;
      setChatHistory(prev => [...prev, { type: 'answer', content: aiResponse }]);
      setAnswer(aiResponse);
    } catch (error) {
      console.log(error);
      setAnswer("Apologies, something went wrong. Please try again.");
    }
    setGeneratingAnswer(false);
  }

  return (
    <div className="fixed inset-0 bg-gray-900 text-white">
      <div className="h-full mx-auto flex flex-col px-16">
        <header className=" mb-8 py-4">
          <a href="https://github.com/Vishesh-Pandey/chat-ai" 
             target="_blank" 
             rel="noopener noreferrer"
             className="block">
            <h1 className="text-4xl font-bold text-green-400 hover:text-green-500 transition-colors">
              Medi-Mitra 🏥
            </h1>
          </a>
        </header>

        <div 
          ref={chatContainerRef}
          className="flex-1 overflow-y-auto mb-4 rounded-lg bg-gray-800 shadow-lg p-4 hide-scrollbar"
        >
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6">
              <div className="bg-gray-700 rounded-xl p-8 max-w-2xl">
                <h2 className="text-2xl font-bold text-green-400 mb-4">Welcome to Medi-Mitra! 👩‍⚕️👨‍⚕️</h2>
                <p className="text-gray-300 mb-4">
                  I'm here to assist you with medical queries, health tips, and general wellness advice. You can ask me about:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                  <div className="bg-gray-600 p-4 rounded-lg shadow-sm">
                    <span className="text-green-400">💊</span> Medical Information
                  </div>
                  <div className="bg-gray-600 p-4 rounded-lg shadow-sm">
                    <span className="text-green-400">⚕️</span> Health Tips
                  </div>
                  <div className="bg-gray-600 p-4 rounded-lg shadow-sm">
                    <span className="text-green-400">🩺</span> Symptoms & Diagnosis
                  </div>
                  <div className="bg-gray-600 p-4 rounded-lg shadow-sm">
                    <span className="text-green-400">📋</span> Preventive Care
                  </div>
                </div>
                <p className="text-gray-400 mt-6 text-sm">
                  Type your question below and press Enter or click Send.
                </p>
              </div>
            </div>
          ) : (
            <>
              {chatHistory.map((chat, index) => (
                <div key={index} className={`mb-4 ${chat.type === 'question' ? 'text-right' : 'text-left'}`}>
                  <div className={`inline-block max-w-[80%] p-3 rounded-lg overflow-auto hide-scrollbar ${
                    chat.type === 'question' 
                      ? 'bg-green-600 text-white rounded-br-none'
                      : 'bg-gray-700 text-gray-300 rounded-bl-none'
                  }`}>
                    <ReactMarkdown className="overflow-auto hide-scrollbar">{chat.content}</ReactMarkdown>
                  </div>
                </div>
              ))}
            </>
          )}
          {generatingAnswer && (
            <div className="text-left">
              <div className="inline-block bg-gray-700 p-3 rounded-lg animate-pulse">
                Analyzing...
              </div>
            </div>
          )}
        </div>

        <form onSubmit={generateAnswer} className="bg-gray-800 rounded-lg shadow-lg p-4">
          <div className="flex gap-2">
            <textarea
              required
              className="flex-1 border border-gray-600 bg-gray-700 text-white rounded p-3 focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a medical question..."
              rows="2"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  generateAnswer(e);
                }
              }}
            ></textarea>
            <button
              type="submit"
              className={`px-6 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors ${
                generatingAnswer ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={generatingAnswer}
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
