import { useState } from "react";
import { Link } from "react-router-dom";

const quizQuestions = [
    { 
        question: "Choosing Your Nomad Mindset", 
        description: "How do you approach your digital nomad journey?",
        options: [
            { text: "I document my journey online to share insights, inspire others, and provide helpful tips for making the transition.", score: 2 },
            { text: "I take time to adjust and understand my new environment before deciding how to engage with others.", score: 1 }
        ]
    },
    { 
        question: "Choosing Your First Destination", 
        description: "What factors are most important in your destination selection?",
        options: [
            { text: "I compare living expenses, ensuring I can maximize my quality of life while keeping costs manageable.", score: 2 },
            { text: "I prioritize factors like infrastructure, healthcare access, and overall stability to ensure a comfortable stay.", score: 1 }
        ]
    },
    { 
        question: "Settling In", 
        description: "How do you find your accommodation?",
        options: [
            { text: "I look for available rentals within expat networks to find places that fit my lifestyle and budget.", score: 2 },
            { text: "I reach out to property managers or landlords directly to explore options that fit my needs.", score: 1 }
        ]
    },
    { 
        question: "Building a Social Life", 
        description: "How do you connect with people in new places?",
        options: [
            { text: "I connect with professionals in coworking spaces, online groups, and local networking events to build relationships.", score: 2 },
            { text: "I explore cultural or community-based activities that interest me and naturally lead to meeting people.", score: 0 }
        ]
    },
    { 
        question: "Your Contribution to the Local Economy", 
        description: "Where do you prefer to spend your money?",
        options: [
            { text: "I prefer convenient and well-reviewed spots with reliable service where I can work and socialize.", score: 2 },
            { text: "I enjoy discovering hidden gems, supporting neighborhood businesses, and experiencing local markets.", score: 0 }
        ]
    },
    { 
        question: "Handling a Visa Crackdown", 
        description: "How would you respond to restrictive visa policy changes?",
        options: [
            { text: "I look into advocacy efforts or petitions from my community to express concerns about how the new rules affect us.", score: 2 },
            { text: "I start researching alternative locations that align with my long-term goals and professional needs.", score: 1 }
        ]
    },
    { 
        question: "A Friend Asks You for Advice on Becoming a Digital Nomad", 
        description: "What guidance would you provide?",
        options: [
            { text: "I offer practical guidance on where to start, what to expect, and how to find a suitable place to live and work.", score: 2 },
            { text: "I encourage them to research deeply, consider potential challenges, and make an informed decision based on their priorities.", score: 1 }
        ]
    },
    { 
        question: "Long-Term Plans", 
        description: "How do you think about your future as a digital nomad?",
        options: [
            { text: "I explore investment opportunities to secure a place for myself while continuing to work remotely.", score: 2 },
            { text: "I keep my options flexible and adapt based on the evolving opportunities and challenges I encounter.", score: 1 }
        ]
    }
];

const results = [
    { 
        threshold: 12, 
        title: "🔴 Displacing a Local", 
        description: "Your lifestyle choices may accelerate gentrification, making it harder for residents to afford housing and maintain their way of life.",
        tips: [
            "Consider engaging more with local communities",
            "Support locally-owned businesses instead of expat hotspots",
            "Be mindful of your economic impact on housing markets"
        ]
    },
    { 
        threshold: 7, 
        title: "🟠 Unintentional Gentrifier", 
        description: "You don't intend to cause harm, but some of your choices contribute to rising costs and displacement.",
        tips: [
            "Learn more about the local economy and culture",
            "Seek opportunities to contribute positively to your host community",
            "Balance expat conveniences with local engagement"
        ]
    },
    { 
        threshold: 0, 
        title: "🔵 Conscious Nomad", 
        description: "You make thoughtful choices, engage with local communities, and minimize unintended consequences.",
        tips: [
            "Keep learning about sustainable travel practices",
            "Share your approach with other nomads",
            "Look for more ways to contribute positively to host communities"
        ]
    }
];

function calculateResult(score) {
    for (const result of results) {
        if (score >= result.threshold) {
            return result;
        }
    }
    return results[results.length - 1];
}

export default function NomadQuiz() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [animation, setAnimation] = useState("");

    const handleOptionSelect = (index) => {
        setSelectedOption(index);
    };

    const handleNextQuestion = () => {
        if (selectedOption === null) return;
        
        setScore(score + quizQuestions[currentQuestion].options[selectedOption].score);
        setAnimation("fadeOut");
        
        setTimeout(() => {
            const nextQuestion = currentQuestion + 1;
            if (nextQuestion < quizQuestions.length) {
                setCurrentQuestion(nextQuestion);
            } else {
                setShowResult(true);
            }
            setSelectedOption(null);
            setAnimation("fadeIn");
        }, 300);
    };

    const resetQuiz = () => {
        setAnimation("fadeOut");
        setTimeout(() => {
            setCurrentQuestion(0);
            setScore(0);
            setShowResult(false);
            setSelectedOption(null);
            setAnimation("fadeIn");
        }, 300);
    };

    return (
        <div className="min-h-screen bg-cream">
            <div className={`max-w-3xl mx-auto px-6 py-20 transition-opacity duration-300 ${animation === "fadeOut" ? "opacity-0" : "opacity-100"}`}>
                <Link to="/" className="inline-block mb-16 text-sm tracking-widest text-stone-600 hover:text-stone-800">
                    ← BACK TO HOME
                </Link>
                
                {!showResult ? (
                    <>
                        <div className="mb-12">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-sm tracking-widest text-stone-600">QUESTION {currentQuestion + 1} OF {quizQuestions.length}</span>
                                <div className="flex-1 mx-8 h-px bg-stone-200">
                                    <div className="bg-stone-400 h-px" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}></div>
                                </div>
                            </div>
                        </div>

                        <h2 className="text-3xl font-light mb-3 tracking-wider text-stone-900">{quizQuestions[currentQuestion].question}</h2>
                        <p className="text-stone-600 mb-10 text-lg font-light">{quizQuestions[currentQuestion].description}</p>
                        
                        <div className="space-y-4 mb-12">
                            {quizQuestions[currentQuestion].options.map((option, index) => (
                                <div 
                                    key={index}
                                    className={`p-6 border transition-all duration-200 cursor-pointer ${
                                        selectedOption === index 
                                            ? "border-stone-400 bg-stone-50" 
                                            : "border-stone-200 hover:border-stone-300"
                                    }`}
                                    onClick={() => handleOptionSelect(index)}
                                >
                                    <div className="flex items-start">
                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-4 mt-1 border ${
                                            selectedOption === index ? "bg-stone-800 border-stone-800" : "bg-white border-stone-300"
                                        }`}>
                                            {selectedOption === index && (
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <p className="text-lg font-light text-stone-800">{option.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button
                            className={`w-full py-4 font-light tracking-widest transition-all duration-200 text-sm ${
                                selectedOption !== null 
                                    ? "bg-stone-900 text-white hover:bg-stone-800" 
                                    : "bg-stone-100 text-stone-400 cursor-not-allowed"
                            }`}
                            onClick={handleNextQuestion}
                            disabled={selectedOption === null}
                        >
                            {currentQuestion === quizQuestions.length - 1 ? "VIEW RESULTS" : "CONTINUE"}
                        </button>
                    </>
                ) : (
                    <div>
                        <h2 className="text-4xl font-light mb-12 tracking-wider text-stone-900">{calculateResult(score).title}</h2>
                        <div className="p-8 bg-stone-50 mb-12 border border-stone-200">
                            <p className="text-lg font-light mb-6 text-stone-800">{calculateResult(score).description}</p>
                            <p className="text-sm tracking-widest text-stone-500">SCORE: {score} / {quizQuestions.length * 2}</p>
                        </div>
                        
                        <div className="mb-12">
                            <h3 className="text-xl font-light mb-8 tracking-wider text-stone-800">RECOMMENDATIONS</h3>
                            <ul className="space-y-6">
                                {calculateResult(score).tips.map((tip, index) => (
                                    <li key={index} className="flex items-center text-lg font-light text-stone-700">
                                        <div className="w-1 h-1 mr-4 rounded-full bg-stone-400"></div>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="space-y-4">
                            <button
                                className="w-full py-4 bg-stone-900 text-white hover:bg-stone-800 transition duration-200 text-sm tracking-widest"
                                onClick={resetQuiz}
                            >
                                RETAKE QUIZ
                            </button>
                            <Link
                                to="/"
                                className="block w-full py-4 text-center border border-stone-300 text-stone-800 hover:bg-stone-50 transition duration-200 text-sm tracking-widest"
                            >
                                BACK TO HOME
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}