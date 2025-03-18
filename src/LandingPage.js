import { QRCodeSVG } from "qrcode.react";
import { Link } from "react-router-dom";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-cream">
            <div className="max-w-6xl mx-auto px-6 py-20">
                {/* Hero Section */}
                <div className="mb-32">
                    <h1 className="text-6xl font-light tracking-widest text-stone-900 mb-4">
                        EMIGRATION FROM THE US:
                    </h1>
                    <div className="flex justify-between items-end">
                        <h2 className="text-6xl font-light tracking-widest text-stone-900">
                            DIGITAL NOMADS
                        </h2>
                        <p className="text-xl font-light tracking-widest text-stone-600">
                            TERRA NAGAI
                        </p>
                    </div>
                </div>

                {/* Quiz Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20">
                    <div className="space-y-8">
                        <h3 className="text-2xl font-light tracking-wider text-stone-800">
                            DISCOVER YOUR IMPACT
                        </h3>
                        <p className="text-lg font-light leading-relaxed text-stone-600">
                            Take this quiz to understand how your digital nomad choices affect local communities and learn ways to minimize unintended consequences.
                        </p>
                        <Link 
                            to="/quiz" 
                            className="inline-block px-8 py-3 border border-stone-300 text-stone-800 hover:bg-stone-100 transition duration-200 text-sm tracking-widest"
                        >
                            TAKE THE QUIZ
                        </Link>
                    </div>

                    <div className="bg-white p-8 border border-stone-200">
                        <p className="text-sm font-light tracking-wider text-stone-600 mb-6">
                            SCAN TO TAKE THE QUIZ ON YOUR MOBILE DEVICE
                        </p>
                        <div className="flex justify-center">
                            <QRCodeSVG
                                value={window.location.href + "quiz"}
                                size={200}
                                level="H"
                                includeMargin={true}
                                className="border border-stone-200 p-2"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 