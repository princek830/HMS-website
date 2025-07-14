const translations = {
    en: {
        title: "Hospital Management System",
        features: ["Patient Registration", "Appointment Scheduling", "Medical Records Management", "Billing and Insurance Processing"],
        mission: "To provide high-quality healthcare services to our community with compassion and respect.",
        testimonials: [
            "\"The care I received was exceptional!\" - Monisha Singha",
            "\"I highly recommend this hospital!\" - Krishna"
        ],
        latestNews: [
            "New health guidelines released on January 1, 2025.",
            "Our hospital received the Best Healthcare Provider award!",
            "Free health check-up camp on March 15, 2025."
        ],
        team: [
            "Dr. Rp Gupta - Chief Medical Officer",
            "Dr. Ak Bansal - Head of Surgery"
        ]
    },
    hi: {
        title: "अस्पताल प्रबंधन प्रणाली",
        features: ["रोगी पंजीकरण", "अपॉइंटमेंट शेड्यूलिंग", "चिकित्सा रिकॉर्ड प्रबंधन", "बिलिंग और बीमा प्रसंस्करण"],
        mission: "हमारे समुदाय को सहानुभूति और सम्मान के साथ उच्च गुणवत्ता वाली स्वास्थ्य सेवा प्रदान करना।",
        testimonials: [
            "\"मुझे जो देखभाल मिली वह असाधारण थी!\" - मोनिशा सिंहा",
            "\"मैं इस अस्पताल की अत्यधिक सिफारिश करता हूँ!\" - कृष्ण
        ],
        latestNews: [
            "1 जनवरी, 2025 को नए स्वास्थ्य दिशानिर्देश जारी किए गए।",
            "हमारे अस्पताल को सर्वश्रेष्ठ स्वास्थ्य सेवा प्रदाता का पुरस्कार मिला!",
            "15 मार्च, 2025 को मुफ्त स्वास्थ्य जांच शिविर।"
        ],
        team: [
            "डॉ. आरपी गुप्ता - मुख्य चिकित्सा अधिकारी",
            "डॉ. एक बंसल - सर्जरी के प्रमुख"
        ]
    },
};

function changeLanguage() {
    const selectedLanguage = document.getElementById('language').value;
    document.getElementById('title').textContent = translations[selectedLanguage].title;

    // Update Features
    const featuresList = document.getElementById('features-list');
    featuresList.innerHTML = '';
    translations[selectedLanguage].features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Update Mission
    document.getElementById('mission').textContent = translations[selectedLanguage].mission;

    // Update Testimonials
    const testimonialsDiv = document.getElementById('testimonials');
    testimonialsDiv.innerHTML = '';
    translations[selectedLanguage].testimonials.forEach(testimonial => {

const userLang = navigator.language || navigator.userLanguage;
if (userLang.startsWith("hi")) {
  // Switch your website content to Hindi
}
