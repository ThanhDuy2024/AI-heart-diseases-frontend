import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Send, Plus, Trash2, Bot, User,
  Heart, AlertTriangle, Sparkles, ChevronRight, Menu, X
} from 'lucide-react';
import { CHATBOT_SUGGESTIONS, MOCK_CHAT_RESPONSES } from '../utils/constants';

/* ───── Find best mock response ───── */
const getAIResponse = (message) => {
  const lower = message.toLowerCase();
  if (lower.includes('dấu hiệu') || lower.includes('triệu chứng') || lower.includes('cảnh báo'))
    return MOCK_CHAT_RESPONSES['dấu hiệu'];
  if (lower.includes('cholesterol') || lower.includes('giảm'))
    return MOCK_CHAT_RESPONSES['cholesterol'];
  if (lower.includes('huyết áp') || lower.includes('blood pressure'))
    return MOCK_CHAT_RESPONSES['huyết áp'];
  if (lower.includes('phòng ngừa') || lower.includes('phòng') || lower.includes('ngừa'))
    return MOCK_CHAT_RESPONSES['phòng ngừa'];
  if (lower.includes('bmi') || lower.includes('cân nặng') || lower.includes('béo'))
    return MOCK_CHAT_RESPONSES['bmi'];
  if (lower.includes('thực phẩm') || lower.includes('ăn') || lower.includes('dinh dưỡng'))
    return MOCK_CHAT_RESPONSES['thực phẩm'];
  return MOCK_CHAT_RESPONSES['default'];
};

/* ───── Message Bubble ───── */
const MessageBubble = ({ message, isUser }) => (
  <motion.div
    initial={{ opacity: 0, y: 10, x: isUser ? 10 : -10 }}
    animate={{ opacity: 1, y: 0, x: 0 }}
    transition={{ duration: 0.3 }}
    className={`flex gap-3 ${isUser ? 'flex-row-reverse' : ''}`}
  >
    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
      isUser
        ? 'bg-gradient-to-br from-secondary to-secondary-dark'
        : 'bg-gradient-to-br from-primary to-primary-dark'
    }`}>
      {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-white" />}
    </div>
    <div className={`max-w-[80%] ${isUser ? 'text-right' : ''}`}>
      <div className={`inline-block px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-line ${
        isUser
          ? 'bg-secondary text-white rounded-tr-md'
          : 'bg-white border border-border text-text-primary rounded-tl-md shadow-card'
      }`}>
        {message}
      </div>
    </div>
  </motion.div>
);

/* ───── Typing Indicator ───── */
const TypingIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex gap-3"
  >
    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
      <Bot className="w-4 h-4 text-white" />
    </div>
    <div className="bg-white border border-border rounded-2xl rounded-tl-md px-4 py-3 shadow-card">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════ */
/*  CHATBOT PAGE                                      */
/* ═══════════════════════════════════════════════════ */
const ChatbotPage = () => {
  const [chats, setChats] = useState([
    {
      id: 'chat-1',
      title: 'Cuộc trò chuyện mới',
      messages: [
        { id: 1, text: 'Xin chào! 👋 Tôi là HeartAI Assistant, trợ lý AI chuyên về sức khỏe tim mạch.\n\nTôi có thể giúp bạn:\n• Giải thích kết quả dự đoán\n• Tư vấn về sức khỏe tim mạch\n• Trả lời câu hỏi về bệnh tim\n\nHãy đặt câu hỏi cho tôi!', isUser: false },
      ],
    },
  ]);
  const [activeChatId, setActiveChatId] = useState('chat-1');
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const activeChat = chats.find((c) => c.id === activeChatId);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [activeChat?.messages, isTyping]);

  const handleSend = async (text) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    const userMsg = { id: Date.now(), text: msg, isUser: true };
    setChats((prev) =>
      prev.map((c) =>
        c.id === activeChatId
          ? {
              ...c,
              title: c.messages.length <= 1 ? msg.slice(0, 40) : c.title,
              messages: [...c.messages, userMsg],
            }
          : c
      )
    );
    setInput('');
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiText = getAIResponse(msg);
      const aiMsg = { id: Date.now() + 1, text: aiText, isUser: false };
      setChats((prev) =>
        prev.map((c) =>
          c.id === activeChatId
            ? { ...c, messages: [...c.messages, aiMsg] }
            : c
        )
      );
      setIsTyping(false);
    }, 1200 + Math.random() * 800);
  };

  const handleNewChat = () => {
    const newChat = {
      id: `chat-${Date.now()}`,
      title: 'Cuộc trò chuyện mới',
      messages: [
        { id: 1, text: 'Xin chào! Tôi có thể giúp gì cho bạn về sức khỏe tim mạch?', isUser: false },
      ],
    };
    setChats([newChat, ...chats]);
    setActiveChatId(newChat.id);
    setSidebarOpen(false);
  };

  const handleDeleteChat = (chatId) => {
    if (chats.length <= 1) return;
    const newChats = chats.filter((c) => c.id !== chatId);
    setChats(newChats);
    if (activeChatId === chatId) setActiveChatId(newChats[0].id);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-[calc(100vh-6rem)] lg:h-[calc(100vh-7rem)] bg-background rounded-2xl overflow-hidden shadow-card-lg border border-border">
      {/* ─── Sidebar ─── */}
      <aside className={`
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 fixed lg:relative z-40 w-72 h-full
        bg-gray-900 text-white flex flex-col transition-transform duration-300
      `}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-gray-800">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-sm font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            Cuộc trò chuyện mới
          </button>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.map((chat) => (
            <div
              key={chat.id}
              onClick={() => { setActiveChatId(chat.id); setSidebarOpen(false); }}
              className={`flex items-center justify-between gap-2 px-3 py-2.5 rounded-xl cursor-pointer group transition-colors ${
                chat.id === activeChatId ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-2 min-w-0">
                <MessageCircle className="w-4 h-4 flex-shrink-0 text-gray-400" />
                <span className="text-sm truncate text-gray-300">{chat.title}</span>
              </div>
              {chats.length > 1 && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}
                  className="opacity-0 group-hover:opacity-100 p-1 hover:bg-white/10 rounded-lg transition-all"
                >
                  <Trash2 className="w-3.5 h-3.5 text-gray-400" />
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <Heart className="w-3.5 h-3.5" />
            HeartAI Chatbot v1.0
          </div>
        </div>
      </aside>

      {/* Sidebar Overlay (mobile) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ─── Main Chat Area ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Chat Header */}
        <div className="flex items-center gap-3 px-4 sm:px-6 py-3 border-b border-border bg-white">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-text-primary">HeartAI Assistant</h3>
            <div className="flex items-center gap-1">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
              <span className="text-xs text-text-secondary">Online</span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-6">
          {activeChat?.messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
          ))}

          <AnimatePresence>
            {isTyping && <TypingIndicator />}
          </AnimatePresence>

          <div ref={messagesEndRef} />

          {/* Suggested Questions (show only on start) */}
          {activeChat?.messages.length <= 1 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="space-y-3"
            >
              <p className="text-xs text-text-muted flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Câu hỏi gợi ý
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {CHATBOT_SUGGESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="flex items-center gap-2 px-4 py-3 rounded-xl bg-white border border-border text-sm text-text-primary hover:border-secondary hover:bg-secondary/5 transition-all text-left"
                  >
                    <ChevronRight className="w-4 h-4 text-secondary flex-shrink-0" />
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Disclaimer */}
        <div className="px-4 sm:px-6">
          <div className="px-3 py-2 rounded-t-xl bg-yellow-50 border border-b-0 border-yellow-200 flex items-center gap-2">
            <AlertTriangle className="w-3.5 h-3.5 text-yellow-600 flex-shrink-0" />
            <p className="text-[11px] text-yellow-700">
              AI chỉ hỗ trợ tham khảo, không thay thế tư vấn của bác sĩ chuyên khoa.
            </p>
          </div>
        </div>

        {/* Input Area */}
        <div className="px-4 sm:px-6 pb-4">
          <div className="flex items-end gap-2 bg-white border border-border rounded-2xl p-2 shadow-card focus-within:ring-2 focus-within:ring-secondary/30 focus-within:border-secondary transition-all">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi về sức khỏe tim mạch..."
              rows={1}
              className="flex-1 resize-none px-3 py-2 text-sm text-text-primary placeholder-text-muted outline-none bg-transparent max-h-32"
              style={{ minHeight: '40px' }}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
