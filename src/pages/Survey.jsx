import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Heart, MessageCircle, Send, ArrowLeft } from 'lucide-react';
import './Survey.css';

const Survey = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const surveyQuestions = [
    {
      id: 'overall',
      type: 'rating',
      question: 'How would you rate your overall shopping experience?',
      description: 'Your feedback helps us create better experiences for everyone.',
      icon: '⭐'
    },
    {
      id: 'website',
      type: 'rating',
      question: 'How easy was it to navigate our website?',
      description: 'We want to make sure finding products is effortless.',
      icon: '💻'
    },
    {
      id: 'products',
      type: 'rating',
      question: 'How satisfied are you with the product selection?',
      description: 'Your input helps us stock the products you love.',
      icon: '🛍️'
    },
    {
      id: 'checkout',
      type: 'rating',
      question: 'How smooth was the checkout process?',
      description: 'We are always working to make purchasing faster and easier.',
      icon: '💳'
    },
    {
      id: 'recommend',
      type: 'yesno',
      question: 'Would you recommend TechHub to friends and family?',
      description: 'Your recommendation means the world to us!',
      icon: '❤️'
    },
    {
      id: 'improvements',
      type: 'text',
      question: 'What could we improve to make your experience even better?',
      description: 'Your suggestions help us grow and improve.',
      icon: '💡',
      placeholder: 'Share your thoughts with us...'
    },
    {
      id: 'features',
      type: 'multiple',
      question: 'Which features would you like to see added to our website?',
      description: 'Help us prioritize what matters most to you.',
      icon: '🚀',
      options: [
        'Mobile App',
        'Wishlist Feature',
        'Product Reviews',
        'Live Chat Support',
        'Loyalty Program',
        'Same Day Delivery',
        'Virtual Try-On',
        'Price Alerts'
      ]
    },
    {
      id: 'communication',
      type: 'multiple',
      question: 'How would you prefer to hear about new products and offers?',
      description: 'We want to stay connected in the way that works best for you.',
      icon: '📧',
      options: [
        'Email Newsletter',
        'SMS Notifications',
        'Push Notifications',
        'Social Media',
        'In-App Notifications',
        'None - I prefer to browse on my own'
      ]
    }
  ];

  const handleAnswer = (questionId, answer) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (currentStep < surveyQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Simulate survey submission
    setTimeout(() => {
      setIsSubmitted(true);
    }, 1000);
  };

  const renderQuestion = (question) => {
    switch (question.type) {
      case 'rating':
        return (
          <div className="rating-question">
            <div className="rating-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  className={`star-btn ${answers[question.id] === star ? 'active' : ''}`}
                  onClick={() => handleAnswer(question.id, star)}
                >
                  <Star size={32} fill={answers[question.id] >= star ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
            <div className="rating-labels">
              <span>Poor</span>
              <span>Fair</span>
              <span>Good</span>
              <span>Very Good</span>
              <span>Excellent</span>
            </div>
          </div>
        );

      case 'yesno':
        return (
          <div className="yesno-question">
            <button
              className={`yesno-btn ${answers[question.id] === 'yes' ? 'active' : ''}`}
              onClick={() => handleAnswer(question.id, 'yes')}
            >
              <Heart size={24} />
              Yes, definitely!
            </button>
            <button
              className={`yesno-btn ${answers[question.id] === 'no' ? 'active' : ''}`}
              onClick={() => handleAnswer(question.id, 'no')}
            >
              <MessageCircle size={24} />
              Not sure yet
            </button>
          </div>
        );

      case 'text':
        return (
          <div className="text-question">
            <textarea
              value={answers[question.id] || ''}
              onChange={(e) => handleAnswer(question.id, e.target.value)}
              placeholder={question.placeholder}
              rows={4}
            />
          </div>
        );

      case 'multiple':
        return (
          <div className="multiple-question">
            {question.options.map((option) => (
              <label key={option} className="checkbox-option">
                <input
                  type="checkbox"
                  checked={answers[question.id]?.includes(option) || false}
                  onChange={(e) => {
                    const currentAnswers = answers[question.id] || [];
                    if (e.target.checked) {
                      handleAnswer(question.id, [...currentAnswers, option]);
                    } else {
                      handleAnswer(question.id, currentAnswers.filter(a => a !== option));
                    }
                  }}
                />
                <span className="checkmark"></span>
                {option}
              </label>
            ))}
          </div>
        );

      default:
        return null;
    }
  };

  if (isSubmitted) {
    return (
      <div className="survey-page">
        <div className="survey-container">
          <div className="survey-complete">
            <div className="complete-icon">
              <Heart size={64} />
            </div>
            <h1>Thank You for Your Feedback!</h1>
            <p>Your insights help us create better experiences for everyone. We truly appreciate you taking the time to share your thoughts with us.</p>
            
            <div className="complete-actions">
              <Link to="/" className="btn btn-primary">
                Return to Home
              </Link>
              <Link to="/products" className="btn btn-outline">
                Continue Shopping
              </Link>
            </div>
            
            <div className="feedback-preview">
              <h3>What You've Helped Us With:</h3>
              <div className="feedback-summary">
                <div className="summary-item">
                  <span className="summary-icon">⭐</span>
                  <span>Improving our overall customer experience</span>
                </div>
                <div className="summary-item">
                  <span className="summary-icon">💻</span>
                  <span>Making our website more user-friendly</span>
                </div>
                <div className="summary-item">
                  <span className="summary-icon">🛍️</span>
                  <span>Stocking the products you love</span>
                </div>
                <div className="summary-item">
                  <span className="summary-icon">🚀</span>
                  <span>Adding new features you want</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = surveyQuestions[currentStep];
  const progress = ((currentStep + 1) / surveyQuestions.length) * 100;

  return (
    <div className="survey-page">
      <div className="survey-container">
        {/* Survey Header */}
        <div className="survey-header">
          <Link to="/" className="back-link">
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1>Help Us Improve Your Experience</h1>
          <p>Your feedback is invaluable to us. Take a few minutes to share your thoughts and help us create an even better shopping experience for everyone.</p>
        </div>

        {/* Progress Bar */}
        <div className="survey-progress">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
          <div className="progress-text">
            Question {currentStep + 1} of {surveyQuestions.length}
          </div>
        </div>

        {/* Question Card */}
        <div className="question-card">
          <div className="question-header">
            <div className="question-icon">{currentQuestion.icon}</div>
            <div className="question-content">
              <h2>{currentQuestion.question}</h2>
              <p>{currentQuestion.description}</p>
            </div>
          </div>

          <div className="question-body">
            {renderQuestion(currentQuestion)}
          </div>

          {/* Navigation */}
          <div className="question-navigation">
            <button
              className="btn btn-outline"
              onClick={handlePrevious}
              disabled={currentStep === 0}
            >
              Previous
            </button>
            
            <div className="step-indicators">
              {surveyQuestions.map((_, index) => (
                <div
                  key={index}
                  className={`step-dot ${index === currentStep ? 'active' : ''} ${index < currentStep ? 'completed' : ''}`}
                  onClick={() => setCurrentStep(index)}
                />
              ))}
            </div>

            {currentStep === surveyQuestions.length - 1 ? (
              <button
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={!answers[currentQuestion.id]}
              >
                <Send size={16} />
                Submit Survey
              </button>
            ) : (
              <button
                className="btn btn-primary"
                onClick={handleNext}
                disabled={!answers[currentQuestion.id]}
              >
                Next Question
              </button>
            )}
          </div>
        </div>

        {/* Survey Benefits */}
        <div className="survey-benefits">
          <h3>Why Your Feedback Matters</h3>
          <div className="benefits-grid">
            <div className="benefit-item">
              <div className="benefit-icon">🎯</div>
              <h4>Personalized Experience</h4>
              <p>Help us tailor our offerings to your preferences</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🚀</div>
              <h4>Better Features</h4>
              <p>Your suggestions directly influence our development roadmap</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">💝</div>
              <h4>Exclusive Rewards</h4>
              <p>Survey participants get early access to new features</p>
            </div>
            <div className="benefit-item">
              <div className="benefit-icon">🌍</div>
              <h4>Community Impact</h4>
              <p>Your feedback helps improve the experience for all customers</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey; 