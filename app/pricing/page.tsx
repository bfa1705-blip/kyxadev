import Header from "@/components/Header";
import HalftoneBackground from "@/components/HalftoneBackground";

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "10 searches per month",
        "Basic search features",
        "Community support",
        "Standard results",
        "Email notifications"
      ],
      buttonText: "Get Started",
      buttonStyle: "secondary"
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For serious investigators",
      features: [
        "Unlimited searches",
        "Advanced search features",
        "Priority support 24/7",
        "Deep scan results",
        "API access",
        "Export data (CSV, JSON)",
        "Custom reports",
        "Advanced filters"
      ],
      popular: true,
      buttonText: "Start Free Trial",
      buttonStyle: "primary"
    },
    {
      name: "Enterprise",
      price: "$99",
      period: "per month",
      description: "For teams and organizations",
      features: [
        "Everything in Pro",
        "Team collaboration (up to 10 users)",
        "Custom integrations",
        "Dedicated account manager",
        "Advanced analytics dashboard",
        "White-label option",
        "SLA guarantee",
        "Custom training"
      ],
      buttonText: "Contact Sales",
      buttonStyle: "secondary"
    }
  ];

  return (
    <>
      <HalftoneBackground />
      <main className="min-h-screen bg-transparent relative z-10">
        <Header />
        <div className="px-4 sm:px-6 lg:px-12 pt-32 pb-16">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold text-white mb-4">
              Simple, <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500">Transparent</span> Pricing
            </h1>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Choose the perfect plan for your OSINT investigation needs. All plans include core features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`group relative bg-zinc-900/50 backdrop-blur-xl border rounded-2xl p-8 transition-all duration-500 hover:scale-105 hover:shadow-2xl ${
                  plan.popular 
                    ? "border-blue-500/50 hover:border-blue-500 shadow-xl shadow-blue-500/10 hover:shadow-blue-500/30" 
                    : "border-zinc-800 hover:border-blue-500/50 hover:shadow-blue-500/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-1.5 rounded-full text-sm font-semibold shadow-lg shadow-blue-500/50 flex items-center gap-2">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <h3 className="text-white text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-gray-400 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-bold text-white">{plan.price}</span>
                    <span className="text-gray-400 text-sm">/ {plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8 min-h-[320px]">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300 text-sm">
                      <svg className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full py-3.5 rounded-xl font-semibold transition-all ${
                  plan.buttonStyle === "primary"
                    ? "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
                    : "bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-600 hover:scale-105"
                }`}>
                  {plan.buttonText}
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-white text-center mb-8">Frequently Asked Questions</h2>
            <div className="space-y-4">
              <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">Can I change plans later?</h3>
                <p className="text-gray-400 text-sm">Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle.</p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-400 text-sm">We accept all major credit cards, PayPal, and wire transfers for Enterprise plans.</p>
              </div>
              <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl p-6">
                <h3 className="text-white font-semibold mb-2">Is there a free trial?</h3>
                <p className="text-gray-400 text-sm">Yes! Pro plan comes with a 14-day free trial. No credit card required.</p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-blue-600/20 via-cyan-600/20 to-purple-600/20 border border-blue-500/30 rounded-2xl p-10 text-center backdrop-blur-xl shadow-2xl">
              <h3 className="text-3xl font-bold text-white mb-3">Need a Custom Solution?</h3>
              <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
                Contact our sales team for enterprise solutions tailored to your organization's specific needs. 
                We offer custom pricing, dedicated support, and specialized features.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50">
                  Contact Sales
                </button>
                <button className="bg-zinc-800 hover:bg-zinc-700 text-white px-8 py-3.5 rounded-xl font-semibold transition-all border border-zinc-700 hover:border-zinc-600">
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
