"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, ChefHat, User } from "lucide-react";

type Message = {
  id: string;
  text: string;
  sender: "user" | "bot";
};

// Initial welcome message
const initialMessages: Message[] = [
  {
    id: "1",
    text: "Hello! Welcome to FoodHub. How can I help you today?",
    sender: "bot",
  },
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newUserMessage: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Mock AI response logic
    setTimeout(() => {
      const lowerInput = inputValue.toLowerCase();
      let response = "I can help you find the best meals! What are you craving today? You can ask me about our food, categories, delivery, or special offers.";
      
      if (lowerInput.includes("menu") || lowerInput.includes("food") || lowerInput.includes("meal") || lowerInput.includes("order") || lowerInput.includes("dish")) {
        response = "We have top-rated items like our Signature Beef Burger, Classic Margherita Pizza, and Fresh Sushi Platters! Check out the Meals page to explore our full menu.";
      } else if (lowerInput.includes("category") || lowerInput.includes("categories") || lowerInput.includes("type")) {
        response = "Our popular food categories include Fast Food, Italian, Asian Cuisine, Healthy Salads, and Desserts. You can easily browse them in our Categories section on the homepage!";
      } else if (lowerInput.includes("delivery") || lowerInput.includes("track") || lowerInput.includes("time") || lowerInput.includes("fee")) {
        response = "We offer fast delivery usually within 30-45 minutes! Our standard delivery fee is $2.99, but delivery is FREE for all orders over $30. You can also track your driver in real-time from your dashboard.";
      } else if (lowerInput.includes("discount") || lowerInput.includes("offer") || lowerInput.includes("promo") || lowerInput.includes("deal")) {
        response = "We frequently have special offers! Be sure to check our homepage and download our mobile app to get notifications about exclusive discounts.";
      } else if (lowerInput.includes("contact") || lowerInput.includes("support") || lowerInput.includes("help") || lowerInput.includes("issue")) {
        response = "If you need assistance, you can reach our support team by visiting the Contact page, or by calling our hotline at 1-800-FOODHUB.";
      } else if (lowerInput.includes("hello") || lowerInput.includes("hi") || lowerInput.includes("hey")) {
        response = "Hello again! How can I make your FoodHub experience better today?";
      } else if (lowerInput.includes("vegan") || lowerInput.includes("vegetarian") || lowerInput.includes("halal") || lowerInput.includes("gluten")) {
        response = "Yes, we cater to various dietary preferences including vegetarian, vegan, and gluten-free! You can easily filter for these options on our Meals page.";
      }

      const newBotMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "bot",
      };

      setMessages((prev) => [...prev, newBotMessage]);
      setIsTyping(false);
    }, 1500); // 1.5s simulated delay
  };

  return (
    <>
      {/* Floating Action Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all z-50 flex items-center justify-center group"
            aria-label="Open chat"
          >
            <ChefHat className="w-6 h-6 group-hover:scale-110 transition-transform" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] h-[500px] max-h-[80vh] bg-background border rounded-2xl shadow-2xl flex flex-col z-50 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-primary text-primary-foreground">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-background/20 rounded-full">
                  <ChefHat className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">FoodHub Assistant</h3>
                  <p className="text-xs text-primary-foreground/80">Online</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-background/20 rounded-full transition-colors"
                aria-label="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/30">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div className={`flex max-w-[80%] gap-2 ${message.sender === "user" ? "flex-row-reverse" : "flex-row"}`}>
                    <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground border"
                    }`}>
                      {message.sender === "user" ? <User className="w-4 h-4" /> : <ChefHat className="w-4 h-4" />}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-sm ${
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground rounded-tr-sm"
                          : "bg-background border shadow-sm rounded-tl-sm text-foreground"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                   <div className="flex max-w-[80%] gap-2 flex-row">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-muted text-foreground border flex items-center justify-center mt-1">
                      <ChefHat className="w-4 h-4" />
                    </div>
                    <div className="p-4 rounded-2xl bg-background border shadow-sm rounded-tl-sm flex items-center gap-1">
                      <motion.div
                        className="w-1.5 h-1.5 bg-foreground/50 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-foreground/50 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-1.5 h-1.5 bg-foreground/50 rounded-full"
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-background border-t flex items-center gap-2"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-muted px-4 py-2.5 rounded-full text-sm outline-none focus:ring-2 focus:ring-primary/50 transition-all text-foreground placeholder:text-muted-foreground"
              />
              <button
                type="submit"
                disabled={!inputValue.trim() || isTyping}
                className="p-2.5 bg-primary text-primary-foreground rounded-full hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
