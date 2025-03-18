import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";

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
        <div className="flex flex-col items-center justify-center min-h-screen bg-amber-50 p-6">
            <div className={`bg-amber-50 max-w-2xl w-full transition-opacity duration-300 ${animation === "fadeOut" ? "opacity-0" : "opacity-100"}`}>
                <div className="flex justify-center mb-8">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-300 to-amber-500 opacity-80"></div>
                </div>
                <h1 className="text-4xl font-light text-center mb-12 tracking-wider text-amber-900">TERRA'S DIGITAL NOMAD QUIZ</h1>
                
                {!showResult ? (
                    <>
                        <div className="mb-10">
                            <div className="flex justify-center items-center mb-4">
                                <span className="text-xs font-light tracking-wider text-amber-700/60">QUESTION {currentQuestion + 1} OF {quizQuestions.length}</span>
                            </div>
                            <div className="w-full bg-amber-100 h-px">
                                <div className="bg-amber-300 h-px" style={{ width: `${((currentQuestion + 1) / quizQuestions.length) * 100}%` }}></div>
                            </div>
                        </div>

                        <h2 className="text-2xl font-light mb-2 tracking-wide text-amber-900">{quizQuestions[currentQuestion].question}</h2>
                        <p className="text-amber-700/70 mb-8 text-sm font-light">{quizQuestions[currentQuestion].description}</p>
                        
                        <div className="space-y-4 mb-10">
                            {quizQuestions[currentQuestion].options.map((option, index) => (
                                <div 
                                    key={index}
                                    className={`p-5 border transition-all duration-200 cursor-pointer ${
                                        selectedOption === index 
                                            ? "border-amber-300 bg-amber-100/50" 
                                            : "border-amber-200 hover:border-amber-300"
                                    }`}
                                    onClick={() => handleOptionSelect(index)}
                                >
                                    <div className="flex items-start">
                                        <div className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 border ${
                                            selectedOption === index ? "bg-amber-400 border-amber-400" : "bg-white border-amber-300"
                                        }`}>
                                            {selectedOption === index && (
                                                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            )}
                                        </div>
                                        <p className="text-sm font-light text-amber-900">{option.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button
                            className={`w-full py-3 font-light tracking-wider transition-all duration-200 text-sm ${
                                selectedOption !== null 
                                    ? "bg-amber-100 text-amber-900 hover:bg-amber-200" 
                                    : "bg-amber-50 text-amber-300 cursor-not-allowed"
                            }`}
                            onClick={handleNextQuestion}
                            disabled={selectedOption === null}
                        >
                            {currentQuestion === quizQuestions.length - 1 ? "VIEW RESULTS" : "CONTINUE"}
                        </button>
                    </>
                ) : (
                    <div className="text-center">
                        <h2 className="text-3xl font-light mb-8 tracking-wide text-amber-900">{calculateResult(score).title}</h2>
                        <div className="p-6 bg-amber-100/50 mb-10 border border-amber-200">
                            <p className="text-sm font-light mb-4 text-amber-900">{calculateResult(score).description}</p>
                            <p className="text-xs font-light text-amber-700/60">YOUR SCORE: {score} / {quizQuestions.length * 2}</p>
                        </div>
                        
                        <div className="mb-10">
                            <h3 className="text-xl font-light mb-6 tracking-wide text-amber-900">RECOMMENDATIONS</h3>
                            <ul className="space-y-4 text-left">
                                {calculateResult(score).tips.map((tip, index) => (
                                    <li key={index} className="flex items-center text-sm font-light text-amber-900">
                                        <div className="w-1 h-1 mr-3 rounded-full bg-amber-400"></div>
                                        {tip}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="mb-10 p-6 bg-white rounded-lg shadow-sm border border-amber-200">
                            <h3 className="text-xl font-light mb-4 tracking-wide text-amber-900">SHARE YOUR RESULT</h3>
                            <p className="text-sm font-light text-amber-700/70 mb-4">Scan this QR code to take the quiz</p>
                            <div className="flex justify-center">
                                <QRCodeSVG
                                    value={window.location.href}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                    className="border border-amber-200 p-2"
                                />
                            </div>
                        </div>
                        
                        <button
                            className="px-6 py-3 bg-amber-100 text-amber-900 hover:bg-amber-200 transition duration-200 text-sm font-light tracking-wider border border-amber-200"
                            onClick={resetQuiz}
                        >
                            RETAKE QUIZ
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}