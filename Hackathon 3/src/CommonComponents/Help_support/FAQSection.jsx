import React, { useState } from 'react';
import './FAQSection.css'; // Don't forget to create this CSS file for styling
import ContactForm from './ContactForm';
import ChatSystem from './ChatSystem';

const FAQSection = () => {
  const faqs = [
    {
      question: 'How do I activate my new SIM card?',
      answer: 'You can activate your SIM card by calling our customer service or visiting one of our stores.'
    },
    {
      question: 'What are the available data plans?',
      answer: 'We offer a variety of data plans to suit your needs. You can find detailed information on our website.'
    },
    {
      question: 'How can I check my remaining balance?',
      answer: 'To check your remaining balance, dial *123# on your phone and follow the instructions.'
    },
    {
      question: 'How do I troubleshoot network connectivity issues?',
      answer: 'If you are experiencing network issues, try restarting your phone or toggling Airplane mode on and off. If the problem persists, contact our support.'
    },
    {
      question: 'Can I keep my current phone number when switching to your service?',
      answer: 'Yes, you can typically keep your current phone number when switching to our service. Contact our support to initiate the number porting process.'
    },
    {
      question: 'How can I pay my bill online?',
      answer: 'You can pay your bill online through our website by logging into your account and accessing the payment options.'
  },
    
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const handleQuestionClick = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="faq-section">
      <div className="faq-content">
      <h2>Frequently Asked Questions</h2>
        <ul className="faq-list">
          {faqs.map((faq, index) => (
            <li key={index}>
              <div
                className={`faq-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => handleQuestionClick(index)}
              >
                <h5>{faq.question}</h5>
                {activeIndex === index && <p>{faq.answer}</p>}
              </div>
            </li>
          ))}
        </ul>
        <ContactForm />
      </div>
      <div className="faq-side-panel">
        <ChatSystem />
      </div>
    </div>
  );
};

export default FAQSection;