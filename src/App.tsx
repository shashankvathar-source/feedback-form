import React, { useState } from 'react';
import './App.css';

function App() {
  const [ratings, setRatings] = useState({
    question1: null,
    question2: null,
    question3: null,
    question4: null,
    question5: null
  });

  const [feedback, setFeedback] = useState({
    feedback1: '',
    feedback2: '',
    feedback3: '',
    feedback4: '',
    feedback5: ''
  });

  const ratingOptions = [
    { value: 'very-satisfied', emoji: '😀', label: 'Very Satisfied' },
    { value: 'satisfied', emoji: '🙂', label: 'Satisfied' },
    { value: 'neutral', emoji: '😐', label: 'Neutral' },
    { value: 'unsatisfied', emoji: '🙁', label: 'Unsatisfied' },
    { value: 'very-unsatisfied', emoji: '😡', label: 'Very Unsatisfied' }
  ];

  const questions = [
    "How effectively does the teacher explain concepts and make them easy to understand?",
    "How well does the teacher maintain student interest and encourage active participation in class?",
    "How approachable and open is the teacher when students have questions or doubts?",
    "How useful and constructive is the feedback the teacher provides to support your learning?",
    "Overall, how satisfied are you with the teacher's quality of instruction?"
  ];

  const handleOptionClick = (questionId, value, label) => {
    // Create Instagram-style floating emoji bubbles
    createFloatingEmojiBubbles(value);
    
    // Update rating
    setRatings(prev => ({
      ...prev,
      [questionId]: { value, label }
    }));

    // Show custom alert
    showCustomAlert(`You selected: ${label}`);
  };

  const createFloatingEmojiBubbles = (selectedValue) => {
    const selectedOption = ratingOptions.find(option => option.value === selectedValue);
    if (!selectedOption) return;

    const emoji = selectedOption.emoji;
    const container = document.body;

    // Create multiple floating emoji bubbles for Instagram effect
    for (let i = 0; i < 8; i++) {
      const bubble = document.createElement('div');
      bubble.textContent = emoji;
      bubble.className = 'floating-emoji-bubble';
      
      // Random starting position near center of screen
      const startX = window.innerWidth / 2 + (Math.random() - 0.5) * 200;
      const startY = window.innerHeight / 2 + (Math.random() - 0.5) * 200;
      
      bubble.style.cssText = `
        position: fixed;
        left: ${startX}px;
        top: ${startY}px;
        font-size: ${window.innerWidth < 768 ? '3rem' : '4rem'};
        pointer-events: none;
        z-index: 1000;
        animation: floatingBubble${i} ${2.5 + Math.random() * 1.5}s ease-out forwards;
        opacity: 1;
      `;
      
      container.appendChild(bubble);
      
      // Remove after animation
      setTimeout(() => {
        if (container.contains(bubble)) {
          container.removeChild(bubble);
        }
      }, 4000);
    }
  };

  const showCustomAlert = (message) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center';
    
    const alertBox = document.createElement('div');
    alertBox.className = 'bg-gradient-to-r from-blue-500 to-purple-500 text-white p-6 rounded-2xl shadow-2xl text-center font-bold text-lg animate-bounce';
    alertBox.textContent = message;
    
    overlay.appendChild(alertBox);
    document.body.appendChild(overlay);
    
    setTimeout(() => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    }, 2000);
    
    overlay.addEventListener('click', () => {
      if (document.body.contains(overlay)) {
        document.body.removeChild(overlay);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let message = '🎓 Teacher Feedback Submitted! 🎓\n\n';
    
    questions.forEach((question, index) => {
      const questionKey = `question${index + 1}`;
      const feedbackKey = `feedback${index + 1}`;
      
      if (ratings[questionKey] || feedback[feedbackKey].trim()) {
        message += `Q${index + 1}: ${question}\n`;
        if (ratings[questionKey]) {
          message += `Rating: ${ratings[questionKey].label} ${ratingOptions.find(opt => opt.value === ratings[questionKey].value)?.emoji}\n`;
        }
        if (feedback[feedbackKey].trim()) {
          message += `Feedback: ${feedback[feedbackKey].trim()}\n`;
        }
        message += '\n';
      }
    });
    
    if (Object.values(ratings).every(r => !r) && Object.values(feedback).every(f => !f.trim())) {
      message = 'Please provide some feedback before submitting!';
    }
    
    showCustomAlert(message);
  };

  const RatingButton = ({ option, questionId, isSelected }) => (
    <button
      type="button"
      onClick={() => handleOptionClick(questionId, option.value, option.label)}
      className={`
        px-4 py-3 rounded-full font-semibold text-sm transition-all duration-300
        border-2 border-white hover:scale-105 hover:shadow-lg
        ${isSelected 
          ? 'bg-white text-blue-600 shadow-lg scale-105' 
          : 'bg-transparent text-white hover:bg-white hover:bg-opacity-20'
        }
      `}
    >
      {option.label}
    </button>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-6 md:p-10">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-2">
            🎓 Teacher Feedback Form
          </h1>
          <p className="text-gray-600 text-lg">Help us improve our teaching quality with your valuable feedback!</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {questions.map((question, index) => {
            const questionKey = `question${index + 1}`;
            const feedbackKey = `feedback${index + 1}`;
            
            return (
              <div key={questionKey} className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl p-6 md:p-8 shadow-xl">
                <h2 className="text-white text-lg md:text-xl font-bold text-center mb-6 drop-shadow-lg">
                  {index + 1}. {question}
                </h2>
                
                <div className="flex justify-center gap-2 md:gap-4 mb-6 flex-wrap">
                  {ratingOptions.map((option) => (
                    <RatingButton
                      key={option.value}
                      option={option}
                      questionId={questionKey}
                      isSelected={ratings[questionKey]?.value === option.value}
                    />
                  ))}
                </div>

                {/* Show selected emoji */}
                {ratings[questionKey] && (
                  <div className="text-center mb-4">
                    <span className="text-4xl md:text-5xl animate-bounce">
                      {ratingOptions.find(opt => opt.value === ratings[questionKey].value)?.emoji}
                    </span>
                  </div>
                )}

                <div className="flex items-center mb-4">
                  <div className="flex-1 h-0.5 bg-white opacity-30"></div>
                  <span className="px-4 text-white font-bold bg-white bg-opacity-20 rounded-full text-sm">
                    Additional Comments
                  </span>
                  <div className="flex-1 h-0.5 bg-white opacity-30"></div>
                </div>

                <textarea
                  value={feedback[feedbackKey]}
                  onChange={(e) => setFeedback(prev => ({ ...prev, [feedbackKey]: e.target.value }))}
                  className="w-full h-24 md:h-32 p-4 rounded-2xl border-none bg-white bg-opacity-90 
                             resize-none text-gray-800 placeholder-gray-500 focus:outline-none 
                             focus:ring-4 focus:ring-white focus:ring-opacity-50 focus:bg-white
                             transition-all duration-300 shadow-inner"
                  placeholder="Share your thoughts about this aspect of teaching..."
                />
              </div>
            );
          })}

          {/* Submit Button */}
          <div className="text-center pt-4">
            <button
              type="submit"
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold 
                         py-4 px-8 md:py-5 md:px-12 rounded-full text-lg md:text-xl 
                         shadow-2xl hover:shadow-3xl hover:-translate-y-2 hover:scale-105
                         transition-all duration-300 transform active:scale-95
                         focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50"
            >
              📝 Submit Teacher Feedback
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-8 text-gray-500 text-sm">
          <p>Your feedback helps us create better learning experiences! 🌟</p>
        </div>
      </div>
    </div>
  );
}

export default App;