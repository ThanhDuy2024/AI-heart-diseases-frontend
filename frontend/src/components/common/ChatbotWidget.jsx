import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  MessageCircle, Send, Bot, User, X,
  Heart, AlertTriangle, Sparkles, ChevronRight
} from 'lucide-react';
import { CHATBOT_SUGGESTIONS, MOCK_CHAT_RESPONSES } from '../../utils/constants';

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
    className={`flex gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
  >
    <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
      isUser
        ? 'bg-gradient-to-br from-secondary to-secondary-dark'
        : 'bg-gradient-to-br from-primary to-primary-dark'
    }`}>
      {isUser ? <User className="w-3.5 h-3.5 text-white" /> : <Bot className="w-3.5 h-3.5 text-white" />}
    </div>
    <div className={`max-w-[80%] ${isUser ? 'text-right' : ''}`}>
      <div className={`inline-block px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed whitespace-pre-line ${
        isUser
          ? 'bg-secondary text-white rounded-tr-md'
          : 'bg-white border border-border text-text-primary rounded-tl-md shadow-sm'
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
    className="flex gap-2.5"
  >
    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
      <Bot className="w-3.5 h-3.5 text-white" />
    </div>
    <div className="bg-white border border-border rounded-2xl rounded-tl-md px-3.5 py-2.5 shadow-sm">
      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-bounce"
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════ */
/*  CHATBOT WIDGET (Floating)                         */
/* ═══════════════════════════════════════════════════ */
const ChatbotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Xin chào! 👋 Tôi là HeartAI Assistant, trợ lý AI chuyên về sức khỏe tim mạch.\n\nTôi có thể giúp bạn:\n• Giải thích kết quả dự đoán\n• Tư vấn về sức khỏe tim mạch\n• Trả lời câu hỏi về bệnh tim\n\nHãy đặt câu hỏi cho tôi!',
      isUser: false,
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
      // Focus input when chat opens
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = (text) => {
    const msg = text || input.trim();
    if (!msg || isTyping) return;

    const userMsg = { id: Date.now(), text: msg, isUser: true };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const aiText = getAIResponse(msg);
      const aiMsg = { id: Date.now() + 1, text: aiText, isUser: false };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);

      // If chat is closed, increment unread
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    }, 1200 + Math.random() * 800);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const showSuggestions = messages.length <= 1 && !isTyping;

  return (
    <>
      {/* ─── Chat Window ─── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-4 sm:right-6 z-[9998] w-[360px] sm:w-[400px] max-h-[min(600px,calc(100vh-8rem))] flex flex-col bg-background rounded-2xl shadow-2xl border border-border overflow-hidden"
            style={{ boxShadow: '0 25px 60px -12px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)' }}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-gradient-to-r from-primary to-primary-dark text-white flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">HeartAI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-[11px] text-white/80">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Đóng chatbot"
              >
                <X className="w-4.5 h-4.5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4" style={{ minHeight: '280px' }}>
              {messages.map((msg) => (
                <MessageBubble key={msg.id} message={msg.text} isUser={msg.isUser} />
              ))}

              <AnimatePresence>
                {isTyping && <TypingIndicator />}
              </AnimatePresence>

              <div ref={messagesEndRef} />

              {/* Suggested Questions */}
              {showSuggestions && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="space-y-2 pt-1"
                >
                  <p className="text-[11px] text-text-muted flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Câu hỏi gợi ý
                  </p>
                  <div className="space-y-1.5">
                    {CHATBOT_SUGGESTIONS.slice(0, 4).map((q, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(q)}
                        className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-white border border-border text-[12px] text-text-primary hover:border-secondary hover:bg-secondary/5 transition-all text-left"
                      >
                        <ChevronRight className="w-3.5 h-3.5 text-secondary flex-shrink-0" />
                        <span className="line-clamp-1">{q}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>

            {/* Disclaimer */}
            <div className="px-3 flex-shrink-0">
              <div className="px-2.5 py-1.5 rounded-t-lg bg-yellow-50 border border-b-0 border-yellow-200 flex items-center gap-1.5">
                <AlertTriangle className="w-3 h-3 text-yellow-600 flex-shrink-0" />
                <p className="text-[10px] text-yellow-700 leading-tight">
                  AI chỉ hỗ trợ tham khảo, không thay thế tư vấn bác sĩ.
                </p>
              </div>
            </div>

            {/* Input Area */}
            <div className="px-3 pb-3 flex-shrink-0">
              <div className="flex items-end gap-2 bg-white border border-border rounded-xl p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-secondary/30 focus-within:border-secondary transition-all">
                <textarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Hỏi về sức khỏe tim mạch..."
                  rows={1}
                  className="flex-1 resize-none px-2.5 py-2 text-[13px] text-text-primary placeholder-text-muted outline-none bg-transparent max-h-24"
                  style={{ minHeight: '36px' }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!input.trim() || isTyping}
                  className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed transition-all active:scale-95 flex-shrink-0"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Floating Button ─── */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 sm:right-6 z-[9999] w-14 h-14 rounded-full bg-gradient-to-br from-primary to-primary-dark text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 group"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isOpen ? 'Đóng chatbot' : 'Mở chatbot'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Unread Badge */}
        <AnimatePresence>
          {unreadCount > 0 && !isOpen && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500 text-white text-[10px] font-bold flex items-center justify-center ring-2 ring-white"
            >
              {unreadCount}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Ring */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-primary/30 animate-ping opacity-30 pointer-events-none" />
        )}
      </motion.button>
    </>
  );
};

export default ChatbotWidget;
