/**
 * Internationalization (i18n) Module
 * Handles language detection, switching, and translation for the Essential Oils website
 * 
 * Note: Translations are embedded directly to avoid CORS issues when opening HTML files directly
 */

(function(global) {
    'use strict';

    // Configuration
    const CONFIG = {
        defaultLanguage: 'en',
        supportedLanguages: ['en', 'de', 'fr', 'it', 'es', 'ro'],
        storageKey: 'essentialoils_language'
    };

    // Language name mappings for display
    const LANGUAGE_NAMES = {
        en: '🇬🇧 English',
        de: '🇩🇪 Deutsch',
        fr: '🇫🇷 Français',
        it: '🇮🇹 Italiano',
        es: '🇪🇸 Español',
        ro: '🇷🇴 Română'
    };

    // Browser language to supported language mapping
    const LANGUAGE_MAP = {
        'en': 'en', 'en-US': 'en', 'en-GB': 'en', 'en-AU': 'en', 'en-CA': 'en',
        'de': 'de', 'de-DE': 'de', 'de-AT': 'de', 'de-CH': 'de',
        'fr': 'fr', 'fr-FR': 'fr', 'fr-CA': 'fr', 'fr-CH': 'fr', 'fr-BE': 'fr',
        'it': 'it', 'it-IT': 'it', 'it-CH': 'it',
        'es': 'es', 'es-ES': 'es', 'es-MX': 'es', 'es-AR': 'es', 'es-CO': 'es', 'es-CL': 'es',
        'ro': 'ro', 'ro-RO': 'ro', 'ro-MD': 'ro'
    };

    // Embedded translations
    const TRANSLATIONS = {
        en: {
            "meta": {
                "title": "Essential Oils Guide & Recipes – Your Complete Natural Wellness Companion",
                "description": "Discover 650+ health conditions, 150+ essential oils, and 100+ diffuser blends — now with dedicated Pregnancy, Kids & Cancer Support guides. Your complete guide to natural wellness with expert protocols and smart tracking. Download now!",
                "ogTitle": "Essential Oils Guide & Recipes – Your Complete Natural Wellness Companion",
                "ogDescription": "650+ health conditions • 150+ oils • 100+ blends • new Pregnancy, Kids & Cancer Support guides. The ultimate aromatherapy app for natural wellness. Download free today!",
                "twitterTitle": "Essential Oils Guide & Recipes App",
                "twitterDescription": "650+ health conditions • 150+ oils • 100+ blends • new Pregnancy, Kids & Cancer Support guides. Your complete natural wellness companion."
            },
            "nav": {
                "home": "Home",
                "benefits": "Benefits",
                "health": "Health",
                "howToUse": "How to Use",
                "faq": "FAQ",
                "download": "Download",
                "getTheApp": "Get The App"
            },
            "hero": {
                "headline": "Your Complete Guide to Natural Wellness",
                "subheadline": "Discover 650+ health conditions, 150+ essential oils, and dedicated Pregnancy, Kids & Cancer Support guides — all in one beautifully designed app. Transform your wellness journey today.",
                "downloadAppStore": "Download Free on App Store",
                "downloadAppStoreMobile": "Download Free<br>on App Store",
                "subscribeTips": "Subscribe for Wellness Tips",
                "subscribeTipsMobile": "Subscribe for<br>Wellness Tips"
            },
            "benefits": {
                "section1": {
                    "title": "Find Natural Solutions for 650+ Health Conditions",
                    "description": "From colds and insomnia to anxiety and digestive issues — plus dedicated safety guides for pregnancy, young children, and cancer care — discover medically researched protocols that help you address wellness concerns naturally at every life stage. Each condition includes application methods, safety notes, and expert recommendations.",
                    "highlight": "Stop guessing. Start healing with confidence."
                },
                "section2": {
                    "title": "Expert Knowledge at Your Fingertips",
                    "description": "Access in-depth profiles for 150+ essential oils. Learn therapeutic benefits, safety considerations, and application methods. Whether you're a beginner or experienced enthusiast, find everything you need to use oils safely and effectively.",
                    "highlight": "Your pocket aromatherapy encyclopedia."
                },
                "section3": {
                    "title": "Never Run Out of Your Favorites",
                    "description": "Track your personal oil collection, get smart restock suggestions, and manage your inventory effortlessly. The app learns your usage patterns and reminds you when it's time to replenish, so you're always prepared.",
                    "highlight": "Wellness without the worry."
                },
                "section4": {
                    "title": "Create Perfect Atmospheres",
                    "description": "Access 100+ expert-crafted diffuser blends for focus, calm, energy, sleep, and mood. Save your favorites, create custom blends using your inventory, and transform any space with the power of aromatherapy.",
                    "highlight": "The right blend for every moment."
                },
                "section5": {
                    "title": "Daily Guidance for Your Wellness Journey",
                    "description": "Receive personalized daily oil spotlights, wellness tips, and usage recommendations. Learn new ways to incorporate essential oils into your routine and discover benefits you never knew existed.",
                    "highlight": "Grow your knowledge every day."
                }
            },
            "healthBenefits": {
                "title": "Transform Your Health Naturally",
                "subtitle": "Discover how essential oils can support your wellness journey",
                "cards": {
                    "sleep": {
                        "title": "Better Sleep",
                        "description": "Fall asleep faster and wake refreshed with calming blends like lavender and cedarwood."
                    },
                    "stress": {
                        "title": "Reduced Stress",
                        "description": "Find peace and balance with anxiety-relieving oils like bergamot and ylang ylang."
                    },
                    "focus": {
                        "title": "Enhanced Focus",
                        "description": "Boost concentration and productivity naturally with peppermint and lemon."
                    },
                    "immune": {
                        "title": "Immune Support",
                        "description": "Strengthen your body's natural defenses with tea tree and eucalyptus."
                    },
                    "pain": {
                        "title": "Pain Relief",
                        "description": "Soothe headaches, muscle tension, and discomfort with frankincense and chamomile."
                    },
                    "mood": {
                        "title": "Mood Elevation",
                        "description": "Lift your spirits and combat low moods with citrus oils like orange and grapefruit."
                    }
                }
            },
            "howToUse": {
                "title": "Simple Ways to Use Essential Oils",
                "subtitle": "Easy methods for maximum benefit",
                "methods": {
                    "diffusion": {
                        "title": "Diffusion",
                        "description": "Add 3-5 drops to your diffuser for room-wide benefits. Perfect for creating atmosphere and enjoying aromatherapy throughout your space."
                    },
                    "topical": {
                        "title": "Topical",
                        "description": "Dilute with carrier oil and apply to pulse points, temples, or affected areas. Always perform a patch test first."
                    },
                    "inhalation": {
                        "title": "Inhalation",
                        "description": "Breathe directly from the bottle, use a diffuser, or add to a bowl of hot water for steam inhalation."
                    },
                    "bath": {
                        "title": "Bath",
                        "description": "Add 5-10 drops to a warm bath for relaxation. Mix with Epsom salts or carrier oil before adding to water."
                    }
                }
            },
            "faq": {
                "title": "Frequently Asked Questions",
                "subtitle": "Everything you need to know about essential oils and our app",
                "q1": {
                    "question": "What are essential oils and how do they work?",
                    "answer": "Essential oils are concentrated plant extracts that capture the natural scent and beneficial properties of plants. They work through aromatherapy (inhalation) or topical application, interacting with your body's systems to promote wellness. Each oil contains unique compounds that can support physical and emotional health."
                },
                "q2": {
                    "question": "Are essential oils safe to use internally?",
                    "answer": "Internal use of essential oils should only be done under the guidance of a qualified healthcare professional or certified aromatherapist. While some oils are generally recognized as safe for internal use in small amounts, others can be toxic. Our app provides safety information for each oil, but always consult a professional before internal use."
                },
                "q3": {
                    "question": "How do I choose the right essential oil for my needs?",
                    "answer": "Our app makes it easy! Search from 650+ health conditions to find recommended oils, or browse our database of 150+ essential oils by their benefits. Each oil profile includes therapeutic properties, safety considerations, and recommended uses. Start with popular oils like lavender for relaxation or peppermint for energy."
                },
                "q4": {
                    "question": "What is the difference between pure and synthetic oils?",
                    "answer": "Pure essential oils are 100% natural plant extracts without additives or synthetic compounds. Synthetic oils are laboratory-created fragrances that may smell similar but lack therapeutic benefits. Pure oils are tested for purity and potency, ensuring you get the full wellness benefits. Our app helps you identify quality indicators for each oil."
                },
                "q5": {
                    "question": "Can I use essential oils during pregnancy?",
                    "answer": "Some essential oils should be avoided during pregnancy, especially in the first trimester. Safe options typically include lavender, chamomile, and ylang-ylang when properly diluted. Always consult your healthcare provider before using essential oils during pregnancy. Our app now includes a dedicated Pregnancy Support section with trimester-specific safety notes, dosage guidance, and oils to avoid."
                },
                "q6": {
                    "question": "How should I store my essential oils?",
                    "answer": "Store essential oils in dark glass bottles (amber or cobalt blue) away from direct sunlight and heat. Keep them in a cool, dry place with tightly closed caps. Most oils last 2-5 years when stored properly, though citrus oils have a shorter shelf life of 1-2 years. Our app includes a tracking feature to monitor your oil inventory."
                },
                "q7": {
                    "question": "What is a carrier oil and why do I need one?",
                    "answer": "Carrier oils are neutral plant oils (like coconut, jojoba, or almond oil) used to dilute essential oils before topical application. They \"carry\" the essential oil onto your skin safely, preventing irritation or sensitivity reactions. A typical dilution is 2-3 drops of essential oil per teaspoon of carrier oil for adults."
                },
                "q8": {
                    "question": "Can children use essential oils safely?",
                    "answer": "Yes, but with extra caution. Children's skin is more sensitive, so always use higher dilution ratios (1 drop per tablespoon of carrier oil for ages 2+). Some oils like eucalyptus and peppermint should be avoided for young children. Our app now includes a dedicated Kids Support section with age-specific dosage guidance and safety guidelines for each essential oil."
                },
                "q9": {
                    "question": "How many drops of essential oil should I use?",
                    "answer": "It depends on the use: For diffusing, use 3-5 drops per 100ml of water. For topical application, use a 1-3% dilution (3-6 drops per teaspoon of carrier oil for adults). For baths, use 5-10 drops mixed with a dispersant like Epsom salts. Our app provides specific recommendations for each application method."
                },
                "q10": {
                    "question": "What are the best essential oils for beginners?",
                    "answer": "Great starter oils include: Lavender (relaxation, sleep), Peppermint (energy, headaches), Lemon (mood, cleaning), Tea Tree (skin support, immunity), and Frankincense (overall wellness). These versatile oils have multiple uses and are generally safe when properly diluted. Our app features beginner-friendly guides and recipes."
                },
                "q11": {
                    "question": "How long do essential oils last?",
                    "answer": "Shelf life varies by oil type. Most essential oils last 2-5 years when stored properly. Citrus oils (lemon, orange, grapefruit) have shorter shelf lives of 1-2 years. Woody oils (sandalwood, cedarwood) and some florals can last 6-8 years or more. Our inventory tracking feature helps you monitor freshness dates."
                },
                "q12": {
                    "question": "Can I mix different essential oils together?",
                    "answer": "Absolutely! Blending oils can create synergistic effects and custom aromas. Our app includes 100+ expert-crafted diffuser blends and allows you to create and save your own combinations. Start with simple 2-3 oil blends and follow our blending guidelines for balanced, effective results."
                },
                "q13": {
                    "question": "What's the difference between diffusing and topical application?",
                    "answer": "Diffusing releases oil molecules into the air for inhalation, affecting mood and respiratory system. It's great for ambiance and air purification. Topical application involves applying diluted oils to skin for targeted benefits. Both methods have unique advantages, and our app provides detailed guidance for each approach."
                },
                "q14": {
                    "question": "Are your recommendations based on scientific research?",
                    "answer": "Our database includes information from peer-reviewed research, traditional use, and certified aromatherapy practices. While essential oils offer wellness support, our content is for informational purposes only and not intended to diagnose, treat, or cure any condition. Always consult healthcare professionals for medical concerns."
                },
                "q15": {
                    "question": "How can the Essential Oils app help me?",
                    "answer": "Our app is your complete wellness companion! Access 650+ health conditions with recommended oils, explore 150+ essential oil profiles, discover 100+ diffuser blends, get dedicated safety guidance for pregnancy, kids, and cancer care, track your inventory, receive daily wellness tips, and save your favorite recipes. Download free on iOS and Android to start your natural wellness journey today."
                }
            },
            "testimonials": {
                "title": "Loved by Thousands",
                "subtitle": "Join our community of wellness enthusiasts"
            },
            "download": {
                "title": "Start Your Wellness Journey Today",
                "subtitle": "Download now and get instant access to 650+ health conditions, 150+ oils, and dedicated Pregnancy, Kids & Cancer Support guides",
                "button": "Download Free on App Store",
                "buttonMobile": "Download Free<br>on App Store",
                "appStoreAlt": "Download on App Store",
                "googlePlayAlt": "Get it on Google Play"
            },
            "socialShare": {
                "label": "Share with friends:"
            },
            "subscribe": {
                "title": "Get Weekly Wellness Tips",
                "subtitle": "Subscribe for exclusive promotions, new blend recipes, and expert health tips delivered to your inbox",
                "privacy": "🔒 We respect your privacy. Unsubscribe at any time."
            },
            "footer": {
                "about": {
                    "title": "About Essential Oils Guide & Recipes.",
                    "description": "Essential oils, aromatherapy, and diffuser recipes — all in one smart app to make wellness simple and effective. Expert insights, smart tools, and real-world tips for your natural wellness journey."
                },
                "siteLinks": {
                    "title": "Site links.",
                    "home": "Home",
                    "benefits": "Benefits",
                    "health": "Health",
                    "howToUse": "How to Use",
                    "faq": "FAQ",
                    "download": "Download",
                    "terms": "Terms of Service",
                    "privacy": "Privacy Policy"
                },
                "contact": {
                    "title": "Contact Us.",
                    "description": "Independently developed by Appostu SRL.",
                    "help": "Need help or have a question? Contact us at:"
                },
                "copyright": "© Copyright Essential Oils Guide & Recipes",
                "designBy": "Design by styleshout",
                "disclaimer1": "For informational purposes only. Not intended for medical diagnosis, treatment, cure, or prevention. Statements not evaluated by the Food and Drug Administration.",
                "disclaimer2": "Independently developed by Appostu SRL. This app contains original content and is not affiliated with or endorsed by doTERRA®. doTERRA™ is a trademark of doTERRA Holdings, LLC.",
                "backToTop": "Back to Top"
            },
            "language": {
                "current": "English"
            }
        },
        de: {
            "meta": {
                "title": "Ätherische Öle Guide & Rezepte - Ihr vollständiger Begleiter für natürliches Wohlbefinden",
                "description": "Entdecken Sie 650+ Gesundheitszustände, 150+ ätherische Öle und 100+ Diffuser-Mischungen – jetzt mit eigenen Bereichen für Schwangerschaft, Kinder & Krebs. Ihr vollständiger Leitfaden für natürliches Wohlbefinden mit Expertenprotokollen und intelligenter Nachverfolgung. Jetzt herunterladen!",
                "ogTitle": "Ätherische Öle Guide & Rezepte - Ihr vollständiger Begleiter für natürliches Wohlbefinden",
                "ogDescription": "650+ Gesundheitszustände · 150+ Öle · 100+ Mischungen · neu: Bereiche für Schwangerschaft, Kinder & Krebs. Die ultimative Aromatherapie-App für natürliches Wohlbefinden. Kostenlos herunterladen!",
                "twitterTitle": "Ätherische Öle Guide & Rezepte App",
                "twitterDescription": "650+ Gesundheitszustände · 150+ Öle · 100+ Mischungen · neu: Bereiche für Schwangerschaft, Kinder & Krebs. Ihr vollständiger Begleiter für natürliches Wohlbefinden."
            },
            "nav": {
                "home": "Start",
                "benefits": "Vorteile",
                "health": "Gesundheit",
                "howToUse": "Anwendung",
                "faq": "FAQ",
                "download": "Herunterladen",
                "getTheApp": "App holen"
            },
            "hero": {
                "headline": "Ihr vollständiger Leitfaden für natürliches Wohlbefinden",
                "subheadline": "Entdecken Sie 650+ Gesundheitszustände, 150+ ätherische Öle und eigene Bereiche für Schwangerschaft, Kinder & Krebs - alles in einer wunderschön gestalteten App. Verwandeln Sie Ihre Wellness-Reise noch heute.",
                "downloadAppStore": "Kostenlos im App Store herunterladen",
                "downloadAppStoreMobile": "Kostenlos im<br>App Store herunterladen",
                "subscribeTips": "Für Wellness-Tipps abonnieren",
                "subscribeTipsMobile": "Für Wellness-Tipps<br>abonnieren"
            },
            "benefits": {
                "section1": {
                    "title": "Finden Sie natürliche Lösungen für 650+ Gesundheitszustände",
                    "description": "Von Erkältungen und Schlaflosigkeit bis hin zu Angst und Verdauungsproblemen - plus eigene Sicherheits-Guides für Schwangerschaft, kleine Kinder und die Krebsbegleitung - entdecken Sie medizinisch recherchierte Protokolle, die Ihnen helfen, Wellness-Anliegen in jeder Lebensphase natürlich zu behandeln. Jeder Zustand enthält Anwendungsmethoden, Sicherheitshinweise und Expertenempfehlungen.",
                    "highlight": "Hören Sie auf zu raten. Beginnen Sie mit Zuversicht zu heilen."
                },
                "section2": {
                    "title": "Expertenwissen auf einen Blick",
                    "description": "Greifen Sie auf detaillierte Profile von 150+ ätherischen Ölen zu. Erfahren Sie mehr über therapeutische Vorteile, Sicherheitsüberlegungen und Anwendungsmethoden. Ob Anfänger oder erfahrener Enthusiast - finden Sie alles, was Sie brauchen, um Öle sicher und effektiv zu nutzen.",
                    "highlight": "Ihre Taschen-Aromatherapie-Enzyklopädie."
                },
                "section3": {
                    "title": "Nie wieder ohne Ihre Favoriten",
                    "description": "Verfolgen Sie Ihre persönliche Ölsammlung, erhalten Sie intelligente Nachbestellvorschläge und verwalten Sie Ihr Inventar mühelos. Die App lernt Ihre Verwendungsmuster und erinnert Sie, wenn es Zeit zum Auffüllen ist, damit Sie immer vorbereitet sind.",
                    "highlight": "Wohlbefinden ohne Sorgen."
                },
                "section4": {
                    "title": "Schaffen Sie perfekte Atmosphären",
                    "description": "Greifen Sie auf 100+ von Experten erstellte Diffuser-Mischungen für Konzentration, Ruhe, Energie, Schlaf und Stimmung zu. Speichern Sie Ihre Favoriten, erstellen Sie individuelle Mischungen mit Ihrem Inventar und verwandeln Sie jeden Raum mit der Kraft der Aromatherapie.",
                    "highlight": "Die richtige Mischung für jeden Moment."
                },
                "section5": {
                    "title": "Tägliche Anleitung für Ihre Wellness-Reise",
                    "description": "Erhalten Sie personalisierte tägliche Öl-Highlights, Wellness-Tipps und Anwendungsempfehlungen. Lernen Sie neue Wege, ätherische Öle in Ihre Routine zu integrieren und entdecken Sie Vorteile, von denen Sie nie wussten, dass sie existieren.",
                    "highlight": "Erweitern Sie Ihr Wissen jeden Tag."
                }
            },
            "healthBenefits": {
                "title": "Verwandeln Sie Ihre Gesundheit auf natürliche Weise",
                "subtitle": "Entdecken Sie, wie ätherische Öle Ihre Wellness-Reise unterstützen können",
                "cards": {
                    "sleep": {
                        "title": "Besserer Schlaf",
                        "description": "Schlafen Sie schneller ein und wachen Sie erholt auf mit beruhigenden Mischungen wie Lavendel und Zeder."
                    },
                    "stress": {
                        "title": "Weniger Stress",
                        "description": "Finden Sie Frieden und Balance mit angstlindernden Ölen wie Bergamotte und Ylang-Ylang."
                    },
                    "focus": {
                        "title": "Verbesserte Konzentration",
                        "description": "Steigern Sie Konzentration und Produktivität natürlich mit Pfefferminze und Zitrone."
                    },
                    "immune": {
                        "title": "Immununterstützung",
                        "description": "Stärken Sie die natürlichen Abwehrkräfte Ihres Körpers mit Teebaum und Eukalyptus."
                    },
                    "pain": {
                        "title": "Schmerzlinderung",
                        "description": "Lindern Sie Kopfschmerzen, Muskelverspannungen und Beschwerden mit Weihrauch und Kamille."
                    },
                    "mood": {
                        "title": "Stimmungshebung",
                        "description": "Heben Sie Ihre Stimmung und bekämpfen Sie niedergeschlagene Gefühle mit Zitrusölen wie Orange und Grapefruit."
                    }
                }
            },
            "howToUse": {
                "title": "Einfache Möglichkeiten, ätherische Öle zu verwenden",
                "subtitle": "Einfache Methoden für maximalen Nutzen",
                "methods": {
                    "diffusion": {
                        "title": "Verdunstung",
                        "description": "Geben Sie 3-5 Tropfen in Ihren Diffuser für raumweite Vorteile. Perfekt zum Erstellen von Atmosphäre und Genießen von Aromatherapie in Ihrem Raum."
                    },
                    "topical": {
                        "title": "Topisch",
                        "description": "Verdünnen Sie mit Trägeröl und tragen Sie es auf Pulsstellen, Schläfen oder betroffene Bereiche auf. Führen Sie immer zuerst einen Patch-Test durch."
                    },
                    "inhalation": {
                        "title": "Inhalation",
                        "description": "Atmen Sie direkt aus der Flasche, verwenden Sie einen Diffuser oder geben Sie es in eine Schüssel mit heißem Wasser zur Dampfinhalation."
                    },
                    "bath": {
                        "title": "Bad",
                        "description": "Geben Sie 5-10 Tropfen in ein warmes Bad zur Entspannung. Mischen Sie mit Bittersalz oder Trägeröl, bevor Sie es dem Wasser hinzufügen."
                    }
                }
            },
            "faq": {
                "title": "Häufig gestellte Fragen",
                "subtitle": "Alles, was Sie über ätherische Öle und unsere App wissen müssen",
                "q1": {
                    "question": "Was sind ätherische Öle und wie funktionieren sie?",
                    "answer": "Ätherische Öle sind konzentrierte Pflanzenextrakte, die den natürlichen Duft und die vorteilhaften Eigenschaften von Pflanzen einfangen. Sie wirken durch Aromatherapie (Einatmen) oder topische Anwendung und interagieren mit den Systemen Ihres Körpers, um Wohlbefinden zu fördern. Jedes Öl enthält einzigartige Verbindungen, die die physische und emotionale Gesundheit unterstützen können."
                },
                "q2": {
                    "question": "Sind ätherische Öle sicher für die innere Anwendung?",
                    "answer": "Die innere Anwendung von ätherischen Ölen sollte nur unter Anleitung eines qualifizierten Gesundheitsfachmanns oder zertifizierten Aromatherapeuten erfolgen. Während einige Öle allgemein als sicher für die innere Anwendung in kleinen Mengen anerkannt sind, können andere toxisch sein. Unsere App bietet Sicherheitsinformationen für jedes Öl, aber konsultieren Sie immer einen Fachmann vor der inneren Anwendung."
                },
                "q3": {
                    "question": "Wie wähle ich das richtige ätherische Öl für meine Bedürfnisse?",
                    "answer": "Unsere App macht es einfach! Suchen Sie in 650+ Gesundheitszuständen, um empfohlene Öle zu finden, oder durchsuchen Sie unsere Datenbank von 150+ ätherischen Ölen nach ihren Vorteilen. Jedes Ölprofil enthält therapeutische Eigenschaften, Sicherheitsüberlegungen und empfohlene Anwendungen. Beginnen Sie mit beliebten Ölen wie Lavendel zur Entspannung oder Pfefferminze für Energie."
                },
                "q4": {
                    "question": "Was ist der Unterschied zwischen reinen und synthetischen Ölen?",
                    "answer": "Reine ätherische Öle sind 100% natürliche Pflanzenextrakte ohne Zusätze oder synthetische Verbindungen. Synthetische Öle sind im Labor erstellte Düfte, die ähnlich riechen können, aber keine therapeutischen Vorteile haben. Reine Öle werden auf Reinheit und Wirksamkeit getestet, um sicherzustellen, dass Sie die vollen Wellness-Vorteile erhalten. Unsere App hilft Ihnen, Qualitätsindikatoren für jedes Öl zu identifizieren."
                },
                "q5": {
                    "question": "Kann ich ätherische Öle während der Schwangerschaft verwenden?",
                    "answer": "Einige ätherische Öle sollten während der Schwangerschaft vermieden werden, besonders im ersten Trimester. Sichere Optionen umfassen typischerweise Lavendel, Kamille und Ylang-Ylang bei richtiger Verdünnung. Konsultieren Sie immer Ihren Arzt, bevor Sie ätherische Öle während der Schwangerschaft verwenden. Unsere App bietet jetzt einen eigenen Schwangerschafts-Bereich mit trimesterspezifischen Sicherheitshinweisen, Dosierungsempfehlungen und zu vermeidenden Ölen."
                },
                "q6": {
                    "question": "Wie sollte ich meine ätherischen Öle lagern?",
                    "answer": "Lagern Sie ätherische Öle in dunklen Glasflaschen (bernsteinfarben oder kobaltblau) fern von direktem Sonnenlicht und Hitze. Bewahren Sie sie an einem kühlen, trockenen Ort mit fest verschlossenen Kappen auf. Die meisten Öle halten 2-5 Jahre bei richtiger Lagerung, obwohl Zitrusöle eine kürzere Haltbarkeit von 1-2 Jahren haben. Unsere App enthält eine Nachverfolgungsfunktion zur Überwachung Ihres Ölinventars."
                },
                "q7": {
                    "question": "Was ist ein Trägeröl und warum brauche ich eines?",
                    "answer": "Trägeröle sind neutrale Pflanzenöle (wie Kokos, Jojoba oder Mandelöl), die verwendet werden, um ätherische Öle vor der topischen Anwendung zu verdünnen. Sie 'tragen' das ätherische Öl sicher auf Ihre Haut und verhindern Reizungen oder Empfindlichkeitsreaktionen. Eine typische Verdünnung ist 2-3 Tropfen ätherisches Öl pro Teelöffel Trägeröl für Erwachsene."
                },
                "q8": {
                    "question": "Können Kinder ätherische Öle sicher verwenden?",
                    "answer": "Ja, aber mit extra Vorsicht. Kinderhaut ist empfindlicher, also verwenden Sie immer höhere Verdünnungsverhältnisse (1 Tropfen pro Esslöffel Trägeröl für Kinder ab 2 Jahren). Einige Öle wie Eukalyptus und Pfefferminze sollten für junge Kinder vermieden werden. Unsere App bietet jetzt einen eigenen Kinder-Bereich mit altersspezifischen Dosierungsempfehlungen und Sicherheitsrichtlinien für jedes ätherische Öl."
                },
                "q9": {
                    "question": "Wie viele Tropfen ätherisches Öl sollte ich verwenden?",
                    "answer": "Es hängt von der Verwendung ab: Zum Verdunsten verwenden Sie 3-5 Tropfen pro 100ml Wasser. Für topische Anwendung verwenden Sie eine 1-3%ige Verdünnung (3-6 Tropfen pro Teelöffel Trägeröl für Erwachsene). Für Bäder verwenden Sie 5-10 Tropfen gemischt mit einem Dispergiermittel wie Bittersalz. Unsere App bietet spezifische Empfehlungen für jede Anwendungsmethode."
                },
                "q10": {
                    "question": "Was sind die besten ätherischen Öle für Anfänger?",
                    "answer": "Große Einsteigeröle sind: Lavendel (Entspannung, Schlaf), Pfefferminze (Energie, Kopfschmerzen), Zitrone (Stimmung, Reinigung), Teebaum (Hautunterstützung, Immunität) und Weihrauch (allgemeines Wohlbefinden). Diese vielseitigen Öle haben mehrere Verwendungsmöglichkeiten und sind bei richtiger Verdünnung allgemein sicher. Unsere App bietet anfängerfreundliche Anleitungen und Rezepte."
                },
                "q11": {
                    "question": "Wie lange halten ätherische Öle?",
                    "answer": "Die Haltbarkeit variiert je nach Öltyp. Die meisten ätherischen Öle halten 2-5 Jahre bei richtiger Lagerung. Zitrusöle (Zitrone, Orange, Grapefruit) haben kürzere Haltbarkeiten von 1-2 Jahren. Hölzige Öle (Sandelholz, Zeder) und einige Blütenöle können 6-8 Jahre oder länger halten. Unsere Inventar-Nachverfolgungsfunktion hilft Ihnen, Frischheitsdaten zu überwachen."
                },
                "q12": {
                    "question": "Kann ich verschiedene ätherische Öle mischen?",
                    "answer": "Absolut! Das Mischen von Ölen kann synergetische Effekte und individuelle Aromen erzeugen. Unsere App enthält 100+ von Experten erstellte Diffuser-Mischungen und ermöglicht es Ihnen, eigene Kombinationen zu erstellen und zu speichern. Beginnen Sie mit einfachen 2-3-Öl-Mischungen und folgen Sie unseren Mischrichtlinien für ausgewogene, effektive Ergebnisse."
                },
                "q13": {
                    "question": "Was ist der Unterschied zwischen Verdunsten und topischer Anwendung?",
                    "answer": "Verdunsten setzt Ölmoleküle in die Luft zum Einatmen frei und beeinflusst Stimmung und Atemsystem. Es ist großartig für Atmosphäre und Luftreinigung. Topische Anwendung beinhaltet das Auftragen verdünnter Öle auf die Haut für gezielte Vorteile. Beide Methoden haben einzigartige Vorteile, und unsere App bietet detaillierte Anleitungen für jeden Ansatz."
                },
                "q14": {
                    "question": "Basieren Ihre Empfehlungen auf wissenschaftlicher Forschung?",
                    "answer": "Unsere Datenbank enthält Informationen aus begutachteter Forschung, traditioneller Verwendung und zertifizierten Aromatherapie-Praktiken. Während ätherische Öle Wellness-Unterstützung bieten, dient unser Inhalt nur zu Informationszwecken und ist nicht zur Diagnose, Behandlung oder Heilung gedacht. Konsultieren Sie immer medizinische Fachkräfte bei gesundheitlichen Bedenken."
                },
                "q15": {
                    "question": "Wie kann die Ätherische Öle App mir helfen?",
                    "answer": "Unsere App ist Ihr vollständiger Wellness-Begleiter! Greifen Sie auf 650+ Gesundheitszustände mit empfohlenen Ölen zu, erkunden Sie 150+ Profile ätherischer Öle, entdecken Sie 100+ Diffuser-Mischungen, nutzen Sie eigene Sicherheits-Guides für Schwangerschaft, Kinder und Krebsbegleitung, verfolgen Sie Ihr Inventar, erhalten Sie tägliche Wellness-Tipps und speichern Sie Ihre Lieblingsrezepte. Laden Sie kostenlos auf iOS und Android herunter, um Ihre natürliche Wellness-Reise heute zu beginnen."
                }
            },
            "testimonials": {
                "title": "Geliebt von Tausenden",
                "subtitle": "Treten Sie unserer Gemeinschaft von Wellness-Enthusiasten bei"
            },
            "download": {
                "title": "Beginnen Sie Ihre Wellness-Reise noch heute",
                "subtitle": "Jetzt herunterladen und sofortigen Zugang zu 650+ Gesundheitszuständen, 150+ Ölen und eigenen Guides für Schwangerschaft, Kinder & Krebs erhalten",
                "button": "Kostenlos im App Store herunterladen",
                "buttonMobile": "Kostenlos<br>im App Store herunterladen",
                "appStoreAlt": "Im App Store herunterladen",
                "googlePlayAlt": "Bei Google Play holen"
            },
            "socialShare": {
                "label": "Mit Freunden teilen:"
            },
            "subscribe": {
                "title": "Wöchentliche Wellness-Tipps erhalten",
                "subtitle": "Abonnieren Sie für exklusive Angebote, neue Mischrezepte und Experten-Gesundheitstipps direkt in Ihren Posteingang",
                "privacy": "Wir respektieren Ihre Privatsphäre. Jederzeit abbestellen."
            },
            "footer": {
                "about": {
                    "title": "Über Ätherische Öle Guide & Rezepte.",
                    "description": "Ätherische Öle, Aromatherapie und Diffuser-Rezepte - alles in einer intelligenten App, die Wellness einfach und effektiv macht. Expertenwissen, intelligente Werkzeuge und praktische Tipps für Ihre natürliche Wellness-Reise."
                },
                "siteLinks": {
                    "title": "Seitenlinks.",
                    "home": "Start",
                    "benefits": "Vorteile",
                    "health": "Gesundheit",
                    "howToUse": "Anwendung",
                    "faq": "FAQ",
                    "download": "Herunterladen",
                    "terms": "Nutzungsbedingungen",
                    "privacy": "Datenschutzrichtlinie"
                },
                "contact": {
                    "title": "Kontakt.",
                    "description": "Unabhängig entwickelt von Appostu SRL.",
                    "help": "Brauchen Sie Hilfe oder haben Sie eine Frage? Kontaktieren Sie uns unter:"
                },
                "copyright": "© Copyright Ätherische Öle Guide & Rezepte",
                "designBy": "Design von styleshout",
                "disclaimer1": "Nur zu Informationszwecken. Nicht zur medizinischen Diagnose, Behandlung, Heilung oder Prävention gedacht. Aussagen nicht von der Food and Drug Administration bewertet.",
                "disclaimer2": "Unabhängig entwickelt von Appostu SRL. Diese App enthält originelle Inhalte und ist nicht mit doTERRA® verbunden oder von doTERRA® unterstützt. doTERRA ist eine Marke der doTERRA Holdings, LLC.",
                "backToTop": "Nach oben"
            },
            "language": {
                "current": "Deutsch"
            }
        },
        fr: {
            "meta": {
                "title": "Guide des Huiles Essentielles & Recettes - Votre Compagnon Complet pour le Bien-être Naturel",
                "description": "Découvrez 650+ conditions de santé, 150+ huiles essentielles et 100+ mélanges pour diffuseur — désormais avec des sections dédiées Grossesse, Enfants et Cancer. Votre guide complet pour le bien-être naturel avec des protocoles d'experts et un suivi intelligent. Téléchargez maintenant !",
                "ogTitle": "Guide des Huiles Essentielles & Recettes - Votre Compagnon Complet pour le Bien-être Naturel",
                "ogDescription": "650+ conditions de santé · 150+ huiles · 100+ mélanges · nouveau : sections Grossesse, Enfants et Cancer. L'application d'aromathérapie ultime pour le bien-être naturel. Téléchargement gratuit !",
                "twitterTitle": "Application Guide des Huiles Essentielles & Recettes",
                "twitterDescription": "650+ conditions de santé · 150+ huiles · 100+ mélanges · nouveau : sections Grossesse, Enfants et Cancer. Votre compagnon complet pour le bien-être naturel."
            },
            "nav": {
                "home": "Accueil",
                "benefits": "Avantages",
                "health": "Santé",
                "howToUse": "Utilisation",
                "faq": "FAQ",
                "download": "Télécharger",
                "getTheApp": "Obtenir l'App"
            },
            "hero": {
                "headline": "Votre Guide Complet pour le Bien-être Naturel",
                "subheadline": "Découvrez 650+ conditions de santé, 150+ huiles essentielles et des sections dédiées Grossesse, Enfants et Cancer - le tout dans une application magnifiquement conçue. Transformez votre voyage vers le bien-être dès aujourd'hui.",
                "downloadAppStore": "Télécharger Gratuitement sur l'App Store",
                "downloadAppStoreMobile": "Télécharger Gratuitement<br>sur l'App Store",
                "subscribeTips": "S'abonner aux Conseils Bien-être",
                "subscribeTipsMobile": "S'abonner aux Conseils<br>Bien-être"
            },
            "benefits": {
                "section1": {
                    "title": "Trouvez des Solutions Naturelles pour 650+ Conditions de Santé",
                    "description": "Du rhume et de l'insomnie à l'anxiété et aux problèmes digestifs - avec désormais des guides de sécurité dédiés à la grossesse, aux jeunes enfants et au cancer - découvrez des protocoles recherchés médicalement qui vous aident à aborder naturellement le bien-être à chaque étape de la vie. Chaque condition comprend des méthodes d'application, des notes de sécurité et des recommandations d'experts.",
                    "highlight": "Arrêtez de deviner. Commencez à guérir en toute confiance."
                },
                "section2": {
                    "title": "Une Expertise à Portée de Main",
                    "description": "Accédez à des profils détaillés de 150+ huiles essentielles. Découvrez les bienfaits thérapeutiques, les considérations de sécurité et les méthodes d'application. Que vous soyez débutant ou passionné expérimenté, trouvez tout ce dont vous avez besoin pour utiliser les huiles en toute sécurité et efficacité.",
                    "highlight": "Votre encyclopédie d'aromathérapie de poche."
                },
                "section3": {
                    "title": "Ne Manquez Plus Jamais Vos Favoris",
                    "description": "Suivez votre collection personnelle d'huiles, recevez des suggestions intelligentes de réapprovisionnement et gérez votre inventaire sans effort. L'application apprend vos habitudes d'utilisation et vous rappelle quand il est temps de réapprovisionner, pour que vous soyez toujours prêt.",
                    "highlight": "Le bien-être sans souci."
                },
                "section4": {
                    "title": "Créez des Atmosphères Parfaites",
                    "description": "Accédez à plus de 100 mélanges pour diffuseur créés par des experts pour la concentration, le calme, l'énergie, le sommeil et l'humeur. Sauvegardez vos favoris, créez des mélanges personnalisés avec votre inventaire et transformez n'importe quel espace avec la puissance de l'aromathérapie.",
                    "highlight": "Le bon mélange pour chaque moment."
                },
                "section5": {
                    "title": "Guidance Quotidienne pour Votre Voyage Bien-être",
                    "description": "Recevez des spots d'huiles quotidiens personnalisés, des conseils de bien-être et des recommandations d'utilisation. Découvrez de nouvelles façons d'intégrer les huiles essentielles dans votre routine et explorez des bienfaits dont vous ne soupçonniez pas l'existence.",
                    "highlight": "Faites croître vos connaissances chaque jour."
                }
            },
            "healthBenefits": {
                "title": "Transformez Votre Santé Naturellement",
                "subtitle": "Découvrez comment les huiles essentielles peuvent soutenir votre voyage vers le bien-être",
                "cards": {
                    "sleep": {
                        "title": "Meilleur Sommeil",
                        "description": "Endormez-vous plus rapidement et réveillez-vous reposé avec des mélanges apaisants comme la lavande et le cèdre."
                    },
                    "stress": {
                        "title": "Stress Réduit",
                        "description": "Trouvez paix et équilibre avec des huiles anti-anxiété comme la bergamote et l'ylang-ylang."
                    },
                    "focus": {
                        "title": "Concentration Améliorée",
                        "description": "Boostez concentration et productivité naturellement avec la menthe poivrée et le citron."
                    },
                    "immune": {
                        "title": "Soutien Immunitaire",
                        "description": "Renforcez les défenses naturelles de votre corps avec l'arbre à thé et l'eucalyptus."
                    },
                    "pain": {
                        "title": "Soulagement de la Douleur",
                        "description": "Soulagez les maux de tête, les tensions musculaires et l'inconfort avec l'encens et la camomille."
                    },
                    "mood": {
                        "title": "Élévation de l'Humeur",
                        "description": "Relevez votre moral et combattez les baisses d'humeur avec des huiles d'agrumes comme l'orange et le pamplemousse."
                    }
                }
            },
            "howToUse": {
                "title": "Façons Simples d'Utiliser les Huiles Essentielles",
                "subtitle": "Méthodes simples pour un maximum de bienfaits",
                "methods": {
                    "diffusion": {
                        "title": "Diffusion",
                        "description": "Ajoutez 3-5 gouttes dans votre diffuseur pour des bienfaits dans toute la pièce. Parfait pour créer une atmosphère et profiter de l'aromathérapie dans votre espace."
                    },
                    "topical": {
                        "title": "Application Topique",
                        "description": "Diluez avec une huile de support et appliquez sur les points de pulsation, les tempes ou les zones concernées. Effectuez toujours un test cutané d'abord."
                    },
                    "inhalation": {
                        "title": "Inhalation",
                        "description": "Respirez directement depuis le flacon, utilisez un diffuseur ou ajoutez à un bol d'eau chaude pour une inhalation à la vapeur."
                    },
                    "bath": {
                        "title": "Bain",
                        "description": "Ajoutez 5-10 gouttes dans un bain chaud pour la relaxation. Mélangez avec des sels d'Epsom ou une huile de support avant d'ajouter à l'eau."
                    }
                }
            },
            "faq": {
                "title": "Questions Fréquemment Posées",
                "subtitle": "Tout ce que vous devez savoir sur les huiles essentielles et notre application",
                "q1": {
                    "question": "Que sont les huiles essentielles et comment fonctionnent-elles ?",
                    "answer": "Les huiles essentielles sont des extraits de plantes concentrés qui capturent le parfum naturel et les propriétés bénéfiques des plantes. Elles fonctionnent par l'aromathérapie (inhalation) ou l'application topique, interagissant avec les systèmes de votre corps pour promouvoir le bien-être. Chaque huile contient des composés uniques qui peuvent soutenir la santé physique et émotionnelle."
                },
                "q2": {
                    "question": "Les huiles essentielles sont-elles sûres à utiliser en interne ?",
                    "answer": "L'utilisation interne des huiles essentielles ne doit se faire que sous la direction d'un professionnel de santé qualifié ou d'un aromathérapeute certifié. Bien que certaines huiles soient généralement reconnues comme sûres pour un usage interne en petites quantités, d'autres peuvent être toxiques. Notre application fournit des informations de sécurité pour chaque huile, mais consultez toujours un professionnel avant un usage interne."
                },
                "q3": {
                    "question": "Comment choisir la bonne huile essentielle pour mes besoins ?",
                    "answer": "Notre application facilite la tâche ! Recherchez parmi 650+ conditions de santé pour trouver les huiles recommandées, ou parcourez notre base de données de 150+ huiles essentielles par leurs bienfaits. Chaque profil d'huile comprend les propriétés thérapeutiques, les considérations de sécurité et les utilisations recommandées. Commencez avec des huiles populaires comme la lavande pour la relaxation ou la menthe poivrée pour l'énergie."
                },
                "q4": {
                    "question": "Quelle est la différence entre les huiles pures et synthétiques ?",
                    "answer": "Les huiles essentielles pures sont des extraits de plantes 100% naturels sans additifs ni composés synthétiques. Les huiles synthétiques sont des parfums créés en laboratoire qui peuvent sentir similaire mais manquent de bienfaits thérapeutiques. Les huiles pures sont testées pour leur pureté et leur puissance, vous assurant d'obtenir tous les bienfaits pour le bien-être. Notre application vous aide à identifier les indicateurs de qualité pour chaque huile."
                },
                "q5": {
                    "question": "Puis-je utiliser des huiles essentielles pendant la grossesse ?",
                    "answer": "Certaines huiles essentielles doivent être évitées pendant la grossesse, surtout au premier trimestre. Les options sûres incluent typiquement la lavande, la camomille et l'ylang-ylang lorsqu'elles sont correctement diluées. Consultez toujours votre professionnel de santé avant d'utiliser des huiles essentielles pendant la grossesse. Notre application propose désormais une section Grossesse dédiée avec des notes de sécurité par trimestre, des conseils de dosage et les huiles à éviter."
                },
                "q6": {
                    "question": "Comment dois-je conserver mes huiles essentielles ?",
                    "answer": "Conservez les huiles essentielles dans des flacons en verre foncé (ambre ou bleu cobalt) à l'abri de la lumière directe du soleil et de la chaleur. Gardez-les dans un endroit frais et sec avec des bouchons bien fermés. La plupart des huiles se conservent 2-5 ans lorsqu'elles sont stockées correctement, bien que les huiles d'agrumes aient une durée de vie plus courte de 1-2 ans. Notre application inclut une fonction de suivi pour surveiller votre inventaire d'huiles."
                },
                "q7": {
                    "question": "Qu'est-ce qu'une huile de support et pourquoi en ai-je besoin ?",
                    "answer": "Les huiles de support sont des huiles végétales neutres (comme le coco, le jojoba ou l'huile d'amande) utilisées pour diluer les huiles essentielles avant l'application topique. Elles 'transportent' l'huile essentielle sur votre peau en toute sécurité, prévenant les irritations ou réactions de sensibilité. Une dilution typique est de 2-3 gouttes d'huile essentielle par cuillère à café d'huile de support pour les adultes."
                },
                "q8": {
                    "question": "Les enfants peuvent-ils utiliser les huiles essentielles en toute sécurité ?",
                    "answer": "Oui, mais avec une prudence supplémentaire. La peau des enfants est plus sensible, donc utilisez toujours des ratios de dilution plus élevés (1 goutte par cuillère à soupe d'huile de support pour les 2 ans et plus). Certaines huiles comme l'eucalyptus et la menthe poivrée doivent être évitées pour les jeunes enfants. Notre application propose désormais une section Enfants dédiée avec des conseils de dosage par âge et des consignes de sécurité pour chaque huile essentielle."
                },
                "q9": {
                    "question": "Combien de gouttes d'huile essentielle dois-je utiliser ?",
                    "answer": "Cela dépend de l'utilisation : Pour la diffusion, utilisez 3-5 gouttes pour 100 ml d'eau. Pour l'application topique, utilisez une dilution de 1-3% (3-6 gouttes par cuillère à café d'huile de support pour les adultes). Pour les bains, utilisez 5-10 gouttes mélangées avec un dispersant comme les sels d'Epsom. Notre application fournit des recommandations spécifiques pour chaque méthode d'application."
                },
                "q10": {
                    "question": "Quelles sont les meilleures huiles essentielles pour les débutants ?",
                    "answer": "Les excellentes huiles pour débutants incluent : Lavande (relaxation, sommeil), Menthe poivrée (énergie, maux de tête), Citron (humeur, nettoyage), Arbre à thé (soutien cutané, immunité) et Encens (bien-être général). Ces huiles polyvalentes ont de multiples utilisations et sont généralement sûres lorsqu'elles sont correctement diluées. Notre application propose des guides et des recettes adaptés aux débutants."
                },
                "q11": {
                    "question": "Combien de temps durent les huiles essentielles ?",
                    "answer": "La durée de conservation varie selon le type d'huile. La plupart des huiles essentielles se conservent 2-5 ans lorsqu'elles sont stockées correctement. Les huiles d'agrumes (citron, orange, pamplemousse) ont des durées de conservation plus courtes de 1-2 ans. Les huiles boisées (santal, cèdre) et certaines florales peuvent durer 6-8 ans ou plus. Notre fonction de suivi d'inventaire vous aide à surveiller les dates de fraîcheur."
                },
                "q12": {
                    "question": "Puis-je mélanger différentes huiles essentielles ensemble ?",
                    "answer": "Absolument ! Le mélange d'huiles peut créer des effets synergiques et des arômes personnalisés. Notre application comprend plus de 100 mélanges pour diffuseur créés par des experts et vous permet de créer et sauvegarder vos propres combinaisons. Commencez avec des mélanges simples de 2-3 huiles et suivez nos directives de mélange pour des résultats équilibrés et efficaces."
                },
                "q13": {
                    "question": "Quelle est la différence entre la diffusion et l'application topique ?",
                    "answer": "La diffusion libère des molécules d'huile dans l'air pour l'inhalation, affectant l'humeur et le système respiratoire. C'est génial pour l'ambiance et la purification de l'air. L'application topique implique l'application d'huiles diluées sur la peau pour des bienfaits ciblés. Les deux méthodes ont des avantages uniques, et notre application fournit des conseils détaillés pour chaque approche."
                },
                "q14": {
                    "question": "Vos recommandations sont-elles basées sur la recherche scientifique ?",
                    "answer": "Notre base de données comprend des informations provenant de recherches évaluées par des pairs, d'utilisations traditionnelles et de pratiques d'aromathérapie certifiées. Bien que les huiles essentielles offrent un soutien au bien-être, notre contenu est à titre informatif uniquement et n'est pas destiné à diagnostiquer, traiter ou guérir toute condition. Consultez toujours des professionnels de santé pour les préoccupations médicales."
                },
                "q15": {
                    "question": "Comment l'application Huiles Essentielles peut-elle m'aider ?",
                    "answer": "Notre application est votre compagnon de bien-être complet ! Accédez à 650+ conditions de santé avec les huiles recommandées, explorez 150+ profils d'huiles essentielles, découvrez 100+ mélanges pour diffuseur, profitez de guides de sécurité dédiés à la grossesse, aux enfants et au cancer, suivez votre inventaire, recevez des conseils de bien-être quotidiens et sauvegardez vos recettes favorites. Téléchargez gratuitement sur iOS et Android pour commencer votre voyage de bien-être naturel aujourd'hui."
                }
            },
            "testimonials": {
                "title": "Aimée par des Milliers",
                "subtitle": "Rejoignez notre communauté de passionnés de bien-être"
            },
            "download": {
                "title": "Commencez Votre Voyage Bien-être Aujourd'hui",
                "subtitle": "Téléchargez maintenant et accédez instantanément à 650+ conditions de santé, 150+ huiles et des sections dédiées Grossesse, Enfants et Cancer",
                "button": "Télécharger Gratuitement sur l'App Store",
                "buttonMobile": "Télécharger Gratuitement<br>sur l'App Store",
                "appStoreAlt": "Télécharger sur l'App Store",
                "googlePlayAlt": "Disponible sur Google Play"
            },
            "socialShare": {
                "label": "Partager avec des amis :"
            },
            "subscribe": {
                "title": "Recevez des Conseils Bien-être Hebdomadaires",
                "subtitle": "Abonnez-vous pour des promotions exclusives, de nouvelles recettes de mélanges et des conseils santé d'experts livrés dans votre boîte mail",
                "privacy": "Nous respectons votre vie privée. Désabonnez-vous à tout moment."
            },
            "footer": {
                "about": {
                    "title": "À propos du Guide des Huiles Essentielles & Recettes.",
                    "description": "Huiles essentielles, aromathérapie et recettes pour diffuseur - tout dans une application intelligente qui rend le bien-être simple et efficace. Expertise, outils intelligents et conseils pratiques pour votre voyage de bien-être naturel."
                },
                "siteLinks": {
                    "title": "Liens du site.",
                    "home": "Accueil",
                    "benefits": "Avantages",
                    "health": "Santé",
                    "howToUse": "Utilisation",
                    "faq": "FAQ",
                    "download": "Télécharger",
                    "terms": "Conditions d'Utilisation",
                    "privacy": "Politique de Confidentialité"
                },
                "contact": {
                    "title": "Contactez-nous.",
                    "description": "Développé indépendamment par Appostu SRL.",
                    "help": "Besoin d'aide ou avez une question ? Contactez-nous à :"
                },
                "copyright": "© Copyright Guide des Huiles Essentielles & Recettes",
                "designBy": "Design par styleshout",
                "disclaimer1": "À titre informatif uniquement. Non destiné au diagnostic, traitement, guérison ou prévention médicale. Déclarations non évaluées par la Food and Drug Administration.",
                "disclaimer2": "Développé indépendamment par Appostu SRL. Cette application contient du contenu original et n'est pas affiliée ou approuvée par doTERRA®. doTERRA est une marque de doTERRA Holdings, LLC.",
                "backToTop": "Retour en haut"
            },
            "language": {
                "current": "Français"
            }
        },
        it: {
            "meta": {
                "title": "Guida agli Oli Essenziali e Ricette - Il Tuo Compagno Completo per il Benessere Naturale",
                "description": "Scopri 650+ condizioni di salute, 150+ oli essenziali e 100+ miscele per diffusore — ora con sezioni dedicate Gravidanza, Bambini e Cancro. La tua guida completa per il benessere naturale con protocolli esperti e monitoraggio intelligente. Scarica ora!",
                "ogTitle": "Guida agli Oli Essenziali e Ricette - Il Tuo Compagno Completo per il Benessere Naturale",
                "ogDescription": "650+ condizioni di salute · 150+ oli · 100+ miscele · novità: sezioni Gravidanza, Bambini e Cancro. L'app di aromaterapia definitiva per il benessere naturale. Scarica gratis!",
                "twitterTitle": "App Guida Oli Essenziali e Ricette",
                "twitterDescription": "650+ condizioni di salute · 150+ oli · 100+ miscele · novità: sezioni Gravidanza, Bambini e Cancro. Il tuo compagno completo per il benessere naturale."
            },
            "nav": {
                "home": "Home",
                "benefits": "Vantaggi",
                "health": "Salute",
                "howToUse": "Come Usare",
                "faq": "FAQ",
                "download": "Scarica",
                "getTheApp": "Ottieni l'App"
            },
            "hero": {
                "headline": "La Tua Guida Completa al Benessere Naturale",
                "subheadline": "Scopri 650+ condizioni di salute, 150+ oli essenziali e sezioni dedicate Gravidanza, Bambini e Cancro - tutto in un'app splendidamente progettata. Trasforma il tuo percorso di benessere oggi.",
                "downloadAppStore": "Scarica Gratis sull'App Store",
                "downloadAppStoreMobile": "Scarica Gratis<br>sull'App Store",
                "subscribeTips": "Iscriviti per Consigli Benessere",
                "subscribeTipsMobile": "Iscriviti per Consigli<br>Benessere"
            },
            "benefits": {
                "section1": {
                    "title": "Trova Soluzioni Naturali per 650+ Condizioni di Salute",
                    "description": "Da raffreddori e insonnia ad ansia e problemi digestivi - ora con guide di sicurezza dedicate a gravidanza, bambini piccoli e percorso oncologico - scopri protocolli ricercati medicalmente che ti aiutano ad affrontare naturalmente il benessere in ogni fase della vita. Ogni condizione include metodi di applicazione, note di sicurezza e raccomandazioni esperte.",
                    "highlight": "Smetti di indovinare. Inizia a guarire con fiducia."
                },
                "section2": {
                    "title": "Conoscenze Esperte a Portata di Mano",
                    "description": "Accedi a profili dettagliati di 150+ oli essenziali. Scopri i benefici terapeutici, le considerazioni sulla sicurezza e i metodi di applicazione. Che tu sia un principiante o un appassionato esperto, trova tutto ciò di cui hai bisogno per usare gli oli in modo sicuro ed efficace.",
                    "highlight": "La tua enciclopedia tascabile di aromaterapia."
                },
                "section3": {
                    "title": "Non Rimarrere Mai Senza i Tuoi Preferiti",
                    "description": "Tieni traccia della tua collezione personale di oli, ricevi suggerimenti intelligenti per il rifornimento e gestisci il tuo inventario senza sforzo. L'app impara i tuoi modelli di utilizzo e ti ricorda quando è il momento di rifornirti, così sei sempre preparato.",
                    "highlight": "Benessere senza preoccupazioni."
                },
                "section4": {
                    "title": "Crea Atmosfere Perfette",
                    "description": "Accedi a oltre 100 miscele per diffusore create da esperti per concentrazione, calma, energia, sonno e umore. Salva i tuoi preferiti, crea miscele personalizzate usando il tuo inventario e trasforma qualsiasi spazio con il potere dell'aromaterapia.",
                    "highlight": "La miscela giusta per ogni momento."
                },
                "section5": {
                    "title": "Guidanza Giornaliera per il Tuo Percorso Benessere",
                    "description": "Ricevi spotlights giornalieri personalizzati sugli oli, consigli di benessere e raccomandazioni d'uso. Scopri nuovi modi per incorporare gli oli essenziali nella tua routine ed esplora benefici di cui non sapevi l'esistenza.",
                    "highlight": "Fai crescere le tue conoscenze ogni giorno."
                }
            },
            "healthBenefits": {
                "title": "Trasforma la Tua Salute Naturalmente",
                "subtitle": "Scopri come gli oli essenziali possono supportare il tuo percorso di benessere",
                "cards": {
                    "sleep": {
                        "title": "Sonno Migliore",
                        "description": "Addormentati più velocemente e svegliati riposato con miscele calmanti come lavanda e cedro."
                    },
                    "stress": {
                        "title": "Stress Ridotto",
                        "description": "Trova pace ed equilibrio con oli anti-ansia come bergamotto e ylang-ylang."
                    },
                    "focus": {
                        "title": "Concentrazione Migliorata",
                        "description": "Aumenta concentrazione e produttività naturalmente con menta piperita e limone."
                    },
                    "immune": {
                        "title": "Supporto Immunitario",
                        "description": "Rafforza le difese naturali del tuo corpo con tea tree ed eucalipto."
                    },
                    "pain": {
                        "title": "Sollievo dal Dolore",
                        "description": "Sollieva mal di testa, tensione muscolare e disagio con incenso e camomilla."
                    },
                    "mood": {
                        "title": "Elevazione dell'Umore",
                        "description": "Solleva il tuo spirito e combatti l'umore basso con oli agrumati come arancia e pompelmo."
                    }
                }
            },
            "howToUse": {
                "title": "Modi Semplici per Usare gli Oli Essenziali",
                "subtitle": "Metodi facili per il massimo beneficio",
                "methods": {
                    "diffusion": {
                        "title": "Diffusione",
                        "description": "Aggiungi 3-5 gocce al tuo diffusore per benefici in tutta la stanza. Perfetto per creare atmosfera e godere dell'aromaterapia nel tuo spazio."
                    },
                    "topical": {
                        "title": "Applicazione Topica",
                        "description": "Diluisci con olio vettore e applica sui punti di polso, tempie o aree interessate. Esegui sempre prima un test cutaneo."
                    },
                    "inhalation": {
                        "title": "Inalazione",
                        "description": "Respira direttamente dalla bottiglia, usa un diffusore o aggiungi a una ciotola di acqua calda per inalazione a vapore."
                    },
                    "bath": {
                        "title": "Bagno",
                        "description": "Aggiungi 5-10 gocce a un bagno caldo per il rilassamento. Mescola con sali di Epsom o olio vettore prima di aggiungere all'acqua."
                    }
                }
            },
            "faq": {
                "title": "Domande Frequenti",
                "subtitle": "Tutto quello che devi sapere sugli oli essenziali e la nostra app",
                "q1": {
                    "question": "Cosa sono gli oli essenziali e come funzionano?",
                    "answer": "Gli oli essenziali sono estratti di piante concentrati che catturano il profumo naturale e le proprietà benefiche delle piante. Funzionano attraverso l'aromaterapia (inalazione) o l'applicazione topica, interagendo con i sistemi del tuo corpo per promuovere il benessere. Ogni olio contiene composti unici che possono supportare la salute fisica ed emotiva."
                },
                "q2": {
                    "question": "Gli oli essenziali sono sicuri da usare internamente?",
                    "answer": "L'uso interno degli oli essenziali dovrebbe essere fatto solo sotto la guida di un professionista sanitario qualificato o un aromaterapeuta certificato. Mentre alcuni oli sono generalmente riconosciuti come sicuri per l'uso interno in piccole quantità, altri possono essere tossici. La nostra app fornisce informazioni sulla sicurezza per ogni olio, ma consulta sempre un professionista prima dell'uso interno."
                },
                "q3": {
                    "question": "Come scelgo l'olio essenziale giusto per le mie esigenze?",
                    "answer": "La nostra app rende tutto facile! Cerca tra 650+ condizioni di salute per trovare gli oli raccomandati, o sfoglia il nostro database di 150+ oli essenziali per i loro benefici. Ogni profilo di olio include proprietà terapeutiche, considerazioni sulla sicurezza e usi raccomandati. Inizia con oli popolari come lavanda per il rilassamento o menta piperita per l'energia."
                },
                "q4": {
                    "question": "Qual è la differenza tra oli puri e sintetici?",
                    "answer": "Gli oli essenziali puri sono estratti di piante al 100% naturali senza additivi o composti sintetici. Gli oli sintetici sono fragranze create in laboratorio che possono avere un odore simile ma mancano di benefici terapeutici. Gli oli puri sono testati per purezza e potenza, assicurandoti di ottenere tutti i benefici per il benessere. La nostra app ti aiuta a identificare gli indicatori di qualità per ogni olio."
                },
                "q5": {
                    "question": "Posso usare gli oli essenziali durante la gravidanza?",
                    "answer": "Alcuni oli essenziali dovrebbero essere evitati durante la gravidanza, specialmente nel primo trimestre. Le opzioni sicure tipicamente includono lavanda, camomilla e ylang-ylang quando correttamente diluiti. Consulta sempre il tuo operatore sanitario prima di usare oli essenziali durante la gravidanza. La nostra app include ora una sezione Gravidanza dedicata con note di sicurezza per trimestre, indicazioni sui dosaggi e oli da evitare."
                },
                "q6": {
                    "question": "Come dovrei conservare i miei oli essenziali?",
                    "answer": "Conserva gli oli essenziali in bottiglie di vetro scuro (ambra o blu cobalto) lontano dalla luce solare diretta e dal calore. Tienili in un luogo fresco e asciutto con tappi ben chiusi. La maggior parte degli oli dura 2-5 anni quando conservati correttamente, anche se gli oli agrumati hanno una durata più breve di 1-2 anni. La nostra app include una funzione di tracciamento per monitorare il tuo inventario di oli."
                },
                "q7": {
                    "question": "Cos'è un olio vettore e perché ne ho bisogno?",
                    "answer": "Gli oli vettore sono oli vegetali neutri (come cocco, jojoba o olio di mandorla) usati per diluire gli oli essenziali prima dell'applicazione topica. 'Trasportano' l'olio essenziale sulla tua pelle in sicurezza, prevenendo irritazioni o reazioni di sensibilità. Una diluizione tipica è 2-3 gocce di olio essenziale per cucchiaino di olio vettore per adulti."
                },
                "q8": {
                    "question": "I bambini possono usare gli oli essenziali in sicurezza?",
                    "answer": "Sì, ma con cautela extra. La pelle dei bambini è più sensibile, quindi usa sempre rapporti di diluizione più alti (1 goccia per cucchiaio di olio vettore per età 2+). Alcuni oli come eucalipto e menta piperita dovrebbero essere evitati per i bambini piccoli. La nostra app include ora una sezione Bambini dedicata con indicazioni sui dosaggi per età e linee guida di sicurezza per ogni olio essenziale."
                },
                "q9": {
                    "question": "Quante gocce di olio essenziale dovrei usare?",
                    "answer": "Dipende dall'uso: Per la diffusione, usa 3-5 gocce per 100ml di acqua. Per l'applicazione topica, usa una diluizione 1-3% (3-6 gocce per cucchiaino di olio vettore per adulti). Per i bagni, usa 5-10 gocce mescolate con un disperdente come sali di Epsom. La nostra app fornisce raccomandazioni specifiche per ogni metodo di applicazione."
                },
                "q10": {
                    "question": "Quali sono i migliori oli essenziali per i principianti?",
                    "answer": "Ottimi oli per iniziare includono: Lavanda (rilassamento, sonno), Menta piperita (energia, mal di testa), Limone (umore, pulizia), Tea tree (supporto pelle, immunità) e Incenso (benessere generale). Questi oli versatili hanno molteplici usi e sono generalmente sicuri quando correttamente diluiti. La nostra app presenta guide e ricette adatte ai principianti."
                },
                "q11": {
                    "question": "Quanto durano gli oli essenziali?",
                    "answer": "La durata varia per tipo di olio. La maggior parte degli oli essenziali dura 2-5 anni quando conservati correttamente. Gli oli agrumati (limone, arancia, pompelmo) hanno durate più brevi di 1-2 anni. Gli oli legnosi (sandallo, cedro) e alcuni floreali possono durare 6-8 anni o più. La nostra funzione di tracciamento inventario ti aiuta a monitorare le date di freschezza."
                },
                "q12": {
                    "question": "Posso mescolare diversi oli essenziali insieme?",
                    "answer": "Assolutamente! Mescolare oli può creare effetti sinergici e aromi personalizzati. La nostra app include oltre 100 miscele per diffusore create da esperti e ti permette di creare e salvare le tue combinazioni. Inizia con semplici miscele di 2-3 oli e segui le nostre linee guida per risultati equilibrati ed efficaci."
                },
                "q13": {
                    "question": "Qual è la differenza tra diffusione e applicazione topica?",
                    "answer": "La diffusione rilascia molecole di olio nell'aria per inalazione, influenzando umore e sistema respiratorio. È ottima per atmosfera e purificazione dell'aria. L'applicazione topica comporta l'applicazione di oli diluiti sulla pelle per benefici mirati. Entrambi i metodi hanno vantaggi unici, e la nostra app fornisce indicazioni dettagliate per ogni approccio."
                },
                "q14": {
                    "question": "Le vostre raccomandazioni si basano su ricerca scientifica?",
                    "answer": "Il nostro database include informazioni da ricerca peer-reviewed, uso tradizionale e pratiche di aromaterapia certificate. Mentre gli oli essenziali offrono supporto al benessere, i nostri contenuti sono solo a scopo informativo e non intesi a diagnosticare, trattare o curare alcuna condizione. Consulta sempre professionisti sanitari per preoccupazioni mediche."
                },
                "q15": {
                    "question": "Come può aiutarmi l'app Oli Essenziali?",
                    "answer": "La nostra app è il tuo compagno completo di benessere! Accedi a 650+ condizioni di salute con oli raccomandati, esplora 150+ profili di oli essenziali, scopri 100+ miscele per diffusore, usufruisci di guide di sicurezza dedicate a gravidanza, bambini e percorso oncologico, traccia il tuo inventario, ricevi consigli di benessere giornalieri e salva le tue ricette preferite. Scarica gratis su iOS e Android per iniziare il tuo percorso di benessere naturale oggi."
                }
            },
            "testimonials": {
                "title": "Amata da Migliaia",
                "subtitle": "Unisciti alla nostra comunità di appassionati di benessere"
            },
            "download": {
                "title": "Inizia il Tuo Percorso Benessere Oggi",
                "subtitle": "Scarica ora e ottieni accesso immediato a 650+ condizioni di salute, 150+ oli e sezioni dedicate Gravidanza, Bambini e Cancro",
                "button": "Scarica Gratis sull'App Store",
                "buttonMobile": "Scarica Gratis<br>sull'App Store",
                "appStoreAlt": "Scarica sull'App Store",
                "googlePlayAlt": "Disponibile su Google Play"
            },
            "socialShare": {
                "label": "Condividi con gli amici:"
            },
            "subscribe": {
                "title": "Ricevi Consigli Benessere Settimanali",
                "subtitle": "Iscriviti per promozioni esclusive, nuove ricette di miscele e consigli salute esperti consegnati nella tua casella email",
                "privacy": "Rispettiamo la tua privacy. Cancella l'iscrizione in qualsiasi momento."
            },
            "footer": {
                "about": {
                    "title": "Informazioni su Guida Oli Essenziali e Ricette.",
                    "description": "Oli essenziali, aromaterapia e ricette per diffusore - tutto in un'app intelligente che rende il benessere semplice ed efficace. Competenze esperte, strumenti intelligenti e consigli pratici per il tuo percorso di benessere naturale."
                },
                "siteLinks": {
                    "title": "Link del sito.",
                    "home": "Home",
                    "benefits": "Vantaggi",
                    "health": "Salute",
                    "howToUse": "Come Usare",
                    "faq": "FAQ",
                    "download": "Scarica",
                    "terms": "Termini di Servizio",
                    "privacy": "Politica sulla Privacy"
                },
                "contact": {
                    "title": "Contattaci.",
                    "description": "Sviluppato indipendentemente da Appostu SRL.",
                    "help": "Hai bisogno di aiuto o hai una domanda? Contattaci a:"
                },
                "copyright": "© Copyright Guida Oli Essenziali e Ricette",
                "designBy": "Design di styleshout",
                "disclaimer1": "Solo a scopo informativo. Non inteso per diagnosi, trattamento, cura o prevenzione medica. Dichiarazioni non valutate dalla Food and Drug Administration.",
                "disclaimer2": "Sviluppato indipendentemente da Appostu SRL. Questa app contiene contenuti originali e non è affiliata o approvata da doTERRA®. doTERRA è un marchio di doTERRA Holdings, LLC.",
                "backToTop": "Torna su"
            },
            "language": {
                "current": "Italiano"
            }
        },
        es: {
            "meta": {
                "title": "Guía de Aceites Esenciales y Recetas - Tu Compañero Completo para el Bienestar Natural",
                "description": "Descubre 650+ condiciones de salud, 150+ aceites esenciales y 100+ mezclas para difusor — ahora con secciones dedicadas Embarazo, Niños y Cáncer. Tu guía completa para el bienestar natural con protocolos expertos y seguimiento inteligente. ¡Descarga ahora!",
                "ogTitle": "Guía de Aceites Esenciales y Recetas - Tu Compañero Completo para el Bienestar Natural",
                "ogDescription": "650+ condiciones de salud · 150+ aceites · 100+ mezclas · nuevo: secciones Embarazo, Niños y Cáncer. La aplicación de aromaterapia definitiva para el bienestar natural. ¡Descarga gratis!",
                "twitterTitle": "App Guía de Aceites Esenciales y Recetas",
                "twitterDescription": "650+ condiciones de salud · 150+ aceites · 100+ mezclas · nuevo: secciones Embarazo, Niños y Cáncer. Tu compañero completo para el bienestar natural."
            },
            "nav": {
                "home": "Inicio",
                "benefits": "Beneficios",
                "health": "Salud",
                "howToUse": "Cómo Usar",
                "faq": "FAQ",
                "download": "Descargar",
                "getTheApp": "Obtener la App"
            },
            "hero": {
                "headline": "Tu Guía Completa para el Bienestar Natural",
                "subheadline": "Descubre 650+ condiciones de salud, 150+ aceites esenciales y secciones dedicadas Embarazo, Niños y Cáncer - todo en una aplicación hermosamente diseñada. Transforma tu camino hacia el bienestar hoy.",
                "downloadAppStore": "Descargar Gratis en App Store",
                "downloadAppStoreMobile": "Descargar Gratis<br>en App Store",
                "subscribeTips": "Suscribirse para Consejos de Bienestar",
                "subscribeTipsMobile": "Suscribirse para Consejos<br>de Bienestar"
            },
            "benefits": {
                "section1": {
                    "title": "Encuentra Soluciones Naturales para 650+ Condiciones de Salud",
                    "description": "Desde resfriados e insomnio hasta ansiedad y problemas digestivos - ahora con guías de seguridad dedicadas para el embarazo, los niños pequeños y el acompañamiento oncológico - descubre protocolos investigados médicamente que te ayudan a abordar el bienestar de forma natural en cada etapa de la vida. Cada condición incluye métodos de aplicación, notas de seguridad y recomendaciones de expertos.",
                    "highlight": "Deja de adivinar. Comienza a sanar con confianza."
                },
                "section2": {
                    "title": "Conocimiento Experto al Alcance de tu Mano",
                    "description": "Accede a perfiles detallados de 150+ aceites esenciales. Aprende sobre beneficios terapéuticos, consideraciones de seguridad y métodos de aplicación. Ya seas principiante o entusiasta experimentado, encuentra todo lo que necesitas para usar aceites de forma segura y efectiva.",
                    "highlight": "Tu enciclopedia de aromaterapia de bolsillo."
                },
                "section3": {
                    "title": "Nunca te Quedes sin tus Favoritos",
                    "description": "Rastrea tu colección personal de aceites, obtén sugerencias inteligentes de reabastecimiento y gestiona tu inventario sin esfuerzo. La aplicación aprende tus patrones de uso y te recuerda cuando es momento de reabastecerse, para que siempre estés preparado.",
                    "highlight": "Bienestar sin preocupaciones."
                },
                "section4": {
                    "title": "Crea Atmósferas Perfectas",
                    "description": "Accede a más de 100 mezclas para difusor creadas por expertos para concentración, calma, energía, sueño y estado de ánimo. Guarda tus favoritos, crea mezclas personalizadas usando tu inventario y transforma cualquier espacio con el poder de la aromaterapia.",
                    "highlight": "La mezcla correcta para cada momento."
                },
                "section5": {
                    "title": "Guía Diaria para tu Camino de Bienestar",
                    "description": "Recibe destacados diarios personalizados de aceites, consejos de bienestar y recomendaciones de uso. Descubre nuevas formas de incorporar aceites esenciales en tu rutina y explora beneficios que no sabías que existían.",
                    "highlight": "Haz crecer tu conocimiento cada día."
                }
            },
            "healthBenefits": {
                "title": "Transforma tu Salud Naturalmente",
                "subtitle": "Descubre cómo los aceites esenciales pueden apoyar tu camino de bienestar",
                "cards": {
                    "sleep": {
                        "title": "Mejor Sueño",
                        "description": "Duérmete más rápido y despierta renovado con mezclas calmantes como lavanda y cedro."
                    },
                    "stress": {
                        "title": "Estrés Reducido",
                        "description": "Encuentra paz y equilibrio con aceites anti-ansiedad como bergamota e ylang-ylang."
                    },
                    "focus": {
                        "title": "Concentración Mejorada",
                        "description": "Aumenta concentración y productividad naturalmente con menta y limón."
                    },
                    "immune": {
                        "title": "Soporte Inmunológico",
                        "description": "Fortalece las defensas naturales de tu cuerpo con árbol de té y eucalipto."
                    },
                    "pain": {
                        "title": "Alivio del Dolor",
                        "description": "Alivia dolores de cabeza, tensión muscular y molestias con incienso y manzanilla."
                    },
                    "mood": {
                        "title": "Elevación del Ánimo",
                        "description": "Levanta tu espíritu y combate el ánimo bajo con aceites cítricos como naranja y toronja."
                    }
                }
            },
            "howToUse": {
                "title": "Formas Simples de Usar Aceites Esenciales",
                "subtitle": "Métodos fáciles para máximo beneficio",
                "methods": {
                    "diffusion": {
                        "title": "Difusión",
                        "description": "Añade 3-5 gotas a tu difusor para beneficios en toda la habitación. Perfecto para crear atmósfera y disfrutar de aromaterapia en tu espacio."
                    },
                    "topical": {
                        "title": "Aplicación Tópica",
                        "description": "Diluye con aceite portador y aplica en puntos de pulso, sienes o áreas afectadas. Siempre realiza primero una prueba de parche."
                    },
                    "inhalation": {
                        "title": "Inhalación",
                        "description": "Respira directamente del frasco, usa un difusor o añade a un tazón de agua caliente para inhalación de vapor."
                    },
                    "bath": {
                        "title": "Baño",
                        "description": "Añade 5-10 gotas a un baño tibio para relajación. Mezcla con sales de Epsom o aceite portador antes de añadir al agua."
                    }
                }
            },
            "faq": {
                "title": "Preguntas Frecuentes",
                "subtitle": "Todo lo que necesitas saber sobre aceites esenciales y nuestra aplicación",
                "q1": {
                    "question": "¿Qué son los aceites esenciales y cómo funcionan?",
                    "answer": "Los aceites esenciales son extractos de plantas concentrados que capturan el aroma natural y las propiedades beneficiosas de las plantas. Funcionan a través de aromaterapia (inhalación) o aplicación tópica, interactuando con los sistemas de tu cuerpo para promover el bienestar. Cada aceite contiene compuestos únicos que pueden apoyar la salud física y emocional."
                },
                "q2": {
                    "question": "¿Es seguro usar aceites esenciales internamente?",
                    "answer": "El uso interno de aceites esenciales solo debe hacerse bajo la guía de un profesional de salud calificado o aromaterapeuta certificado. Aunque algunos aceites son generalmente reconocidos como seguros para uso interno en pequeñas cantidades, otros pueden ser tóxicos. Nuestra aplicación proporciona información de seguridad para cada aceite, pero siempre consulta a un profesional antes del uso interno."
                },
                "q3": {
                    "question": "¿Cómo elijo el aceite esencial correcto para mis necesidades?",
                    "answer": "¡Nuestra aplicación lo hace fácil! Busca entre 650+ condiciones de salud para encontrar aceites recomendados, o explora nuestra base de datos de 150+ aceites esenciales por sus beneficios. Cada perfil de aceite incluye propiedades terapéuticas, consideraciones de seguridad y usos recomendados. Comienza con aceites populares como lavanda para relajación o menta para energía."
                },
                "q4": {
                    "question": "¿Cuál es la diferencia entre aceites puros y sintéticos?",
                    "answer": "Los aceites esenciales puros son extractos de plantas 100% naturales sin aditivos ni compuestos sintéticos. Los aceites sintéticos son fragancias creadas en laboratorio que pueden oler similar pero carecen de beneficios terapéuticos. Los aceites puros son probados por pureza y potencia, asegurándote obtener todos los beneficios de bienestar. Nuestra aplicación te ayuda a identificar indicadores de calidad para cada aceite."
                },
                "q5": {
                    "question": "¿Puedo usar aceites esenciales durante el embarazo?",
                    "answer": "Algunos aceites esenciales deben evitarse durante el embarazo, especialmente en el primer trimestre. Las opciones seguras típicamente incluyen lavanda, manzanilla e ylang-ylang cuando se diluyen correctamente. Siempre consulta a tu proveedor de salud antes de usar aceites esenciales durante el embarazo. Nuestra aplicación ahora incluye una sección de Embarazo dedicada con notas de seguridad por trimestre, orientación de dosificación y aceites a evitar."
                },
                "q6": {
                    "question": "¿Cómo debo almacenar mis aceites esenciales?",
                    "answer": "Almacena los aceites esenciales en botellas de vidrio oscuro (ámbar o azul cobalto) lejos de la luz solar directa y calor. Mantenlos en un lugar fresco y seco con tapas bien cerradas. La mayoría de los aceites duran 2-5 años cuando se almacenan correctamente, aunque los aceites cítricos tienen una vida útil más corta de 1-2 años. Nuestra aplicación incluye una función de seguimiento para monitorear tu inventario de aceites."
                },
                "q7": {
                    "question": "¿Qué es un aceite portador y por qué necesito uno?",
                    "answer": "Los aceites portadores son aceites vegetales neutros (como coco, jojoba o aceite de almendra) usados para diluir aceites esenciales antes de la aplicación tópica. 'Transportan' el aceite esencial sobre tu piel de forma segura, previniendo irritación o reacciones de sensibilidad. Una dilución típica es 2-3 gotas de aceite esencial por cucharadita de aceite portador para adultos."
                },
                "q8": {
                    "question": "¿Pueden los niños usar aceites esenciales de forma segura?",
                    "answer": "Sí, pero con precaución extra. La piel de los niños es más sensible, así que siempre usa proporciones de dilución más altas (1 gota por cucharada de aceite portador para mayores de 2 años). Algunos aceites como eucalipto y menta deben evitarse para niños pequeños. Nuestra aplicación ahora incluye una sección de Niños dedicada con orientación de dosificación por edad y pautas de seguridad para cada aceite esencial."
                },
                "q9": {
                    "question": "¿Cuántas gotas de aceite esencial debo usar?",
                    "answer": "Depende del uso: Para difusión, usa 3-5 gotas por 100ml de agua. Para aplicación tópica, usa una dilución del 1-3% (3-6 gotas por cucharadita de aceite portador para adultos). Para baños, usa 5-10 gotas mezcladas con un dispersante como sales de Epsom. Nuestra aplicación proporciona recomendaciones específicas para cada método de aplicación."
                },
                "q10": {
                    "question": "¿Cuáles son los mejores aceites esenciales para principiantes?",
                    "answer": "Excelentes aceites para empezar incluyen: Lavanda (relajación, sueño), Menta (energía, dolores de cabeza), Limón (ánimo, limpieza), Árbol de té (soporte cutáneo, inmunidad) e Incienso (bienestar general). Estos aceites versátiles tienen múltiples usos y son generalmente seguros cuando se diluyen correctamente. Nuestra aplicación presenta guías y recetas para principiantes."
                },
                "q11": {
                    "question": "¿Cuánto duran los aceites esenciales?",
                    "answer": "La vida útil varía por tipo de aceite. La mayoría de los aceites esenciales duran 2-5 años cuando se almacenan correctamente. Los aceites cítricos (limón, naranja, toronja) tienen vidas útiles más cortas de 1-2 años. Los aceites maderosos (sándalo, cedro) y algunos florales pueden durar 6-8 años o más. Nuestra función de seguimiento de inventario te ayuda a monitorear las fechas de frescura."
                },
                "q12": {
                    "question": "¿Puedo mezclar diferentes aceites esenciales juntos?",
                    "answer": "¡Absolutamente! Mezclar aceites puede crear efectos sinérgicos y aromas personalizados. Nuestra aplicación incluye más de 100 mezclas para difusor creadas por expertos y te permite crear y guardar tus propias combinaciones. Comienza con mezclas simples de 2-3 aceites y sigue nuestras directrices para resultados equilibrados y efectivos."
                },
                "q13": {
                    "question": "¿Cuál es la diferencia entre difusión y aplicación tópica?",
                    "answer": "La difusión libera moléculas de aceite en el aire para inhalación, afectando el estado de ánimo y el sistema respiratorio. Es excelente para atmósfera y purificación del aire. La aplicación tópica implica aplicar aceites diluidos en la piel para beneficios específicos. Ambos métodos tienen ventajas únicas, y nuestra aplicación proporciona orientación detallada para cada enfoque."
                },
                "q14": {
                    "question": "¿Sus recomendaciones se basan en investigación científica?",
                    "answer": "Nuestra base de datos incluye información de investigación revisada por pares, uso tradicional y prácticas de aromaterapia certificadas. Aunque los aceites esenciales ofrecen soporte de bienestar, nuestro contenido es solo informativo y no está destinado a diagnosticar, tratar o curar ninguna condición. Siempre consulta a profesionales de salud para preocupaciones médicas."
                },
                "q15": {
                    "question": "¿Cómo puede ayudarme la aplicación de Aceites Esenciales?",
                    "answer": "¡Nuestra aplicación es tu compañero completo de bienestar! Accede a 650+ condiciones de salud con aceites recomendados, explora 150+ perfiles de aceites esenciales, descubre 100+ mezclas para difusor, aprovecha guías de seguridad dedicadas para embarazo, niños y acompañamiento oncológico, rastrea tu inventario, recibe consejos de bienestar diarios y guarda tus recetas favoritas. Descarga gratis en iOS y Android para comenzar tu camino de bienestar natural hoy."
                }
            },
            "testimonials": {
                "title": "Amada por Miles",
                "subtitle": "Únete a nuestra comunidad de entusiastas del bienestar"
            },
            "download": {
                "title": "Comienza tu Camino de Bienestar Hoy",
                "subtitle": "Descarga ahora y obtén acceso instantáneo a 650+ condiciones de salud, 150+ aceites y secciones dedicadas Embarazo, Niños y Cáncer",
                "button": "Descargar Gratis en App Store",
                "buttonMobile": "Descargar Gratis<br>en App Store",
                "appStoreAlt": "Descargar en App Store",
                "googlePlayAlt": "Disponible en Google Play"
            },
            "socialShare": {
                "label": "Compartir con amigos:"
            },
            "subscribe": {
                "title": "Recibe Consejos de Bienestar Semanales",
                "subtitle": "Suscríbete para promociones exclusivas, nuevas recetas de mezclas y consejos de salud expertos entregados en tu bandeja de entrada",
                "privacy": "Respetamos tu privacidad. Cancela la suscripción en cualquier momento."
            },
            "footer": {
                "about": {
                    "title": "Sobre Guía de Aceites Esenciales y Recetas.",
                    "description": "Aceites esenciales, aromaterapia y recetas para difusor - todo en una aplicación inteligente que hace el bienestar simple y efectivo. Conocimiento experto, herramientas inteligentes y consejos prácticos para tu camino de bienestar natural."
                },
                "siteLinks": {
                    "title": "Enlaces del sitio.",
                    "home": "Inicio",
                    "benefits": "Beneficios",
                    "health": "Salud",
                    "howToUse": "Cómo Usar",
                    "faq": "FAQ",
                    "download": "Descargar",
                    "terms": "Términos de Servicio",
                    "privacy": "Política de Privacidad"
                },
                "contact": {
                    "title": "Contáctanos.",
                    "description": "Desarrollado independientemente por Appostu SRL.",
                    "help": "¿Necesitas ayuda o tienes una pregunta? Contáctanos en:"
                },
                "copyright": "© Copyright Guía de Aceites Esenciales y Recetas",
                "designBy": "Diseño por styleshout",
                "disclaimer1": "Solo para fines informativos. No está destinado para diagnóstico, tratamiento, cura o prevención médica. Declaraciones no evaluadas por la Food and Drug Administration.",
                "disclaimer2": "Desarrollado independientemente por Appostu SRL. Esta aplicación contiene contenido original y no está afiliada ni respaldada por doTERRA®. doTERRA es una marca registrada de doTERRA Holdings, LLC.",
                "backToTop": "Volver arriba"
            },
            "language": {
                "current": "Español"
            }
        },
        ro: {
            "meta": {
                "title": "Ghid Uleiuri Esențiale & Rețete - Companionul Tău Complet pentru Bunăstarea Naturală",
                "description": "Descoperă 650+ condiții de sănătate, 150+ uleiuri esențiale și 100+ amestecuri pentru difuzor — acum cu secțiuni dedicate Sarcină, Copii și Cancer. Ghidul tău complet pentru bunăstarea naturală cu protocoale de experți și urmărire inteligentă. Descarcă acum!",
                "ogTitle": "Ghid Uleiuri Esențiale & Rețete - Companionul Tău Complet pentru Bunăstarea Naturală",
                "ogDescription": "650+ condiții de sănătate • 150+ uleiuri • 100+ amestecuri • nou: secțiuni Sarcină, Copii și Cancer. Aplicația definitivă de aromaterapie pentru bunăstarea naturală. Descarcă gratuit!",
                "twitterTitle": "Aplicație Ghid Uleiuri Esențiale & Rețete",
                "twitterDescription": "650+ condiții de sănătate • 150+ uleiuri • 100+ amestecuri • nou: secțiuni Sarcină, Copii și Cancer. Companionul tău complet pentru bunăstarea naturală."
            },
            "nav": {
                "home": "Acasă",
                "benefits": "Beneficii",
                "health": "Sănătate",
                "howToUse": "Cum să Folosești",
                "faq": "Întrebări Frecvente",
                "download": "Descarcă",
                "getTheApp": "Obține Aplicația"
            },
            "hero": {
                "headline": "Ghidul Tău Complet pentru Bunăstarea Naturală",
                "subheadline": "Descoperă 650+ condiții de sănătate, 150+ uleiuri esențiale și secțiuni dedicate Sarcină, Copii și Cancer - totul într-o aplicație frumos proiectată. Transformă-ți călătoria spre bunăstare astăzi.",
                "downloadAppStore": "Descarcă Gratuit pe App Store",
                "downloadAppStoreMobile": "Descarcă Gratuit<br>pe App Store",
                "subscribeTips": "Abonează-te pentru Sfaturi de Bunăstare",
                "subscribeTipsMobile": "Abonează-te pentru Sfaturi<br>de Bunăstare"
            },
            "benefits": {
                "section1": {
                    "title": "Găsește Soluții Naturale pentru 650+ Condiții de Sănătate",
                    "description": "De la răceli și insomnie până la anxietate și probleme digestive - acum cu ghiduri de siguranță dedicate pentru sarcină, copii mici și suportul în cancer - descoperă protocoale cercetate medical care te ajută să abordezi natural bunăstarea în fiecare etapă a vieții. Fiecare condiție include metode de aplicare, note de siguranță și recomandări de experți.",
                    "highlight": "Nu mai ghici. Începe să vindeci cu încredere."
                },
                "section2": {
                    "title": "Cunoștințe de Experți la Îndemână",
                    "description": "Accesează profiluri detaliate pentru 150+ uleiuri esențiale. Învață despre beneficiile terapeutice, considerentele de siguranță și metodele de aplicare. Fie că ești începător sau entuziast experimentat, găsește tot ce ai nevoie pentru a folosi uleiurile în siguranță și eficient.",
                    "highlight": "Enciclopedia ta de aromaterapie din buzunar."
                },
                "section3": {
                    "title": "Nu Rămâne Niciodată Fără Favorite",
                    "description": "Urmărește colecția ta personală de uleiuri, primește sugestii inteligente pentru reaprovizionare și gestionează-ți inventarul fără efort. Aplicația învață tiparele tale de utilizare și îți amintește când e timpul să reaprovizionezi, astfel încât să fii mereu pregătit.",
                    "highlight": "Bunăstare fără griji."
                },
                "section4": {
                    "title": "Creează Atmosfere Perfecte",
                    "description": "Accesează 100+ amestecuri pentru difuzor create de experți pentru concentrare, calm, energie, somn și dispoziție. Salvează favoritele tale, creează amestecuri personalizate folosind inventarul tău și transformă orice spațiu cu puterea aromaterapiei.",
                    "highlight": "Amestecul potrivit pentru fiecare moment."
                },
                "section5": {
                    "title": "Ghidare Zilnică pentru Călătoria Ta de Bunăstare",
                    "description": "Primește spot-uri zilnice personalizate de uleiuri, sfaturi de bunăstare și recomandări de utilizare. Descoperă noi modalități de a încorpora uleiurile esențiale în rutina ta și explorează beneficii de care nu știai că există.",
                    "highlight": "Îți dezvoltă cunoștințele în fiecare zi."
                }
            },
            "healthBenefits": {
                "title": "Transformă-ți Sănătatea Natural",
                "subtitle": "Descoperă cum uleiurile esențiale pot susține călătoria ta de bunăstare",
                "cards": {
                    "sleep": {
                        "title": "Somn Mai Bun",
                        "description": "Adormi mai repede și trezește-te odihnit cu amestecuri calmante ca lavandă și cedru."
                    },
                    "stress": {
                        "title": "Stres Redus",
                        "description": "Găsește pace și echilibru cu uleiuri anti-anxietate ca bergamotă și ylang-ylang."
                    },
                    "focus": {
                        "title": "Concentrare Îmbunătățită",
                        "description": "Crește concentrarea și productivitatea natural cu mentă și lămâie."
                    },
                    "immune": {
                        "title": "Suport Imunitar",
                        "description": "Întărește apărarea naturală a corpului tău cu arbore de ceai și eucalipt."
                    },
                    "pain": {
                        "title": "Ameliorarea Durerii",
                        "description": "Calmează durerile de cap, tensiunea musculară și disconfortul cu tămâie și mușețel."
                    },
                    "mood": {
                        "title": "Elevarea Dispoziției",
                        "description": "Ridica-ți spiritul și combate dispoziția scăzută cu uleiuri citrice ca portocală și grepfrut."
                    }
                }
            },
            "howToUse": {
                "title": "Modalități Simple de a Folosi Uleiurile Esențiale",
                "subtitle": "Metode ușoare pentru beneficii maxime",
                "methods": {
                    "diffusion": {
                        "title": "Difuzare",
                        "description": "Adaugă 3-5 picături în difuzor pentru beneficii în întreaga cameră. Perfect pentru a crea atmosferă și a te bucura de aromaterapie în spațiul tău."
                    },
                    "topical": {
                        "title": "Aplicare Topic",
                        "description": "Diluează cu ulei purtător și aplică pe punctele de puls, tâmple sau zonele afectate. Efectuează întotdeauna mai întâi un test pe piele."
                    },
                    "inhalation": {
                        "title": "Inhalare",
                        "description": "Respiră direct din sticlă, folosește un difuzor sau adaugă într-un bol cu apă caldă pentru inhalare cu aburi."
                    },
                    "bath": {
                        "title": "Baie",
                        "description": "Adaugă 5-10 picături într-o baie caldă pentru relaxare. Amestecă cu săruri Epsom sau ulei purtător înainte de a adăuga în apă."
                    }
                }
            },
            "faq": {
                "title": "Întrebări Frecvente",
                "subtitle": "Tot ce trebuie să știi despre uleiurile esențiale și aplicația noastră",
                "q1": {
                    "question": "Ce sunt uleiurile esențiale și cum funcționează?",
                    "answer": "Uleiurile esențiale sunt extracte concentrate de plante care captează parfumul natural și proprietățile benefice ale plantelor. Funcționează prin aromaterapie (inhalare) sau aplicare topic, interacționând cu sistemele corpului tău pentru a promova bunăstarea. Fiecare ulei conține compuși unici care pot susține sănătatea fizică și emoțională."
                },
                "q2": {
                    "question": "Este sigur să folosesc uleiurile esențiale intern?",
                    "answer": "Utilizarea internă a uleiurilor esențiale trebuie făcută doar sub îndrumarea unui profesionist medical calificat sau a unui aromaterapeut certificat. Deși unele uleiuri sunt recunoscute în general ca sigure pentru utilizare internă în cantități mici, altele pot fi toxice. Aplicația noastră oferă informații de siguranță pentru fiecare ulei, dar consultă întotdeauna un profesionist înainte de utilizarea internă."
                },
                "q3": {
                    "question": "Cum aleg uleiul esențial potrivit pentru nevoile mele?",
                    "answer": "Aplicația noastră face ușor! Caută printre 650+ condiții de sănătate pentru a găsi uleiuri recomandate, sau răsfoiește baza noastră de date de 150+ uleiuri esențiale după beneficiile lor. Fiecare profil de ulei include proprietăți terapeutice, considerente de siguranță și utilizări recomandate. Începe cu uleiuri populare ca lavanda pentru relaxare sau mentă pentru energie."
                },
                "q4": {
                    "question": "Care este diferența dintre uleiurile pure și sintetice?",
                    "answer": "Uleiurile esențiale pure sunt extracte de plante 100% naturale fără aditivi sau compuși sintetici. Uleiurile sintetice sunt fragranțe create în laborator care pot mirosi similar dar lipsesc de beneficii terapeutice. Uleiurile pure sunt testate pentru puritate și potență, asigurându-te că obții toate beneficiile de bunăstare. Aplicația noastră te ajută să identifici indicatorii de calitate pentru fiecare ulei."
                },
                "q5": {
                    "question": "Pot folosi uleiuri esențiale în timpul sarcinii?",
                    "answer": "Unele uleiuri esențiale trebuie evitate în timpul sarcinii, mai ales în primul trimestru. Opțiunile sigure includ de obicei lavanda, mușețelul și ylang-ylang când sunt diluate corect. Consultă întotdeauna medicul tău înainte de a folosi uleiuri esențiale în timpul sarcinii. Aplicația noastră include acum o secțiune Sarcină dedicată, cu note de siguranță pe trimestre, recomandări de dozaj și uleiuri de evitat."
                },
                "q6": {
                    "question": "Cum să-mi păstrez uleiurile esențiale?",
                    "answer": "Păstrează uleiurile esențiale în sticle de sticlă închisă (chihlimbar sau albastru cobalt) departe de lumina directă a soarelui și căldură. Ține-le într-un loc răcoros și uscat cu capace bine închise. Majoritatea uleiurilor țin 2-5 ani când sunt păstrate corect, deși uleiurile citrice au o durată de viață mai scurtă de 1-2 ani. Aplicația noastră include o funcție de urmărire pentru a monitoriza inventarul tău de uleiuri."
                },
                "q7": {
                    "question": "Ce este un ulei purtător și de ce am nevoie de unul?",
                    "answer": "Uleiurile purtătoare sunt uleiuri vegetale neutre (ca nucă de cocos, jojoba sau ulei de migdale) folosite pentru a dilua uleiurile esențiale înainte de aplicare topic. Ele 'transportă' uleiul esențial pe pielea ta în siguranță, prevenind iritații sau reacții de sensibilitate. O diluare tipică este 2-3 picături de ulei esențial per linguriță de ulei purtător pentru adulți."
                },
                "q8": {
                    "question": "Pot copiii folosi uleiurile esențiale în siguranță?",
                    "answer": "Da, dar cu precauție suplimentară. Pielea copiilor este mai sensibilă, așa că folosește întotdeauna rapoarte de diluare mai mari (1 picătură per lingură de ulei purtător pentru vârste de 2+ ani). Unele uleiuri ca eucaliptul și menta trebuie evitate pentru copiii mici. Aplicația noastră include acum o secțiune Copii dedicată, cu recomandări de dozaj pe vârstă și ghiduri de siguranță pentru fiecare ulei esențial."
                },
                "q9": {
                    "question": "Câte picături de ulei esențial să folosesc?",
                    "answer": "Depinde de utilizare: Pentru difuzare, folosește 3-5 picături per 100ml de apă. Pentru aplicare topic, folosește o diluare de 1-3% (3-6 picături per linguriță de ulei purtător pentru adulți). Pentru băi, folosește 5-10 picături amestecate cu un dispersant ca săruri Epsom. Aplicația noastră oferă recomandări specifice pentru fiecare metodă de aplicare."
                },
                "q10": {
                    "question": "Care sunt cele mai bune uleiuri esențiale pentru începători?",
                    "answer": "Uleiuri excelente pentru începători includ: Lavanda (relaxare, somn), Menta (energie, dureri de cap), Lămâia (dispoziție, curățare), Arborele de ceai (suport cutanat, imunitate) și Tămâia (bunăstare generală). Aceste uleiuri versatile au multiple utilizări și sunt în general sigure când sunt diluate corect. Aplicația noastră prezintă ghiduri și rețete pentru începători."
                },
                "q11": {
                    "question": "Cât timp țin uleiurile esențiale?",
                    "answer": "Durata de viață variază după tipul de ulei. Majoritatea uleiurilor esențiale țin 2-5 ani când sunt păstrate corect. Uleiurile citrice (lămâie, portocală, grepfrut) au durate de viață mai scurte de 1-2 ani. Uleiurile lemnoase (santal, cedru) și unele florale pot ține 6-8 ani sau mai mult. Funcția noastră de urmărire a inventarului te ajută să monitorizezi datele de prospețime."
                },
                "q12": {
                    "question": "Pot amesteca diferite uleiuri esențiale împreună?",
                    "answer": "Absolut! Amestecarea uleiurilor poate crea efecte sinergice și arome personalizate. Aplicația noastră include 100+ amestecuri pentru difuzor create de experți și îți permite să creezi și salvezi propriile combinații. Începe cu amestecuri simple de 2-3 uleiuri și urmează ghidurile noastre de amestecare pentru rezultate echilibrate și eficiente."
                },
                "q13": {
                    "question": "Care este diferența dintre difuzare și aplicare topic?",
                    "answer": "Difuzarea eliberează molecule de ulei în aer pentru inhalare, afectând dispoziția și sistemul respirator. Este grozavă pentru atmosferă și purificarea aerului. Aplicarea topic implică aplicarea uleiurilor diluate pe piele pentru beneficii țintite. Ambele metode au avantaje unice, iar aplicația noastră oferă ghidare detaliată pentru fiecare abordare."
                },
                "q14": {
                    "question": "Recomandările voastre se bazează pe cercetare științifică?",
                    "answer": "Baza noastră de date include informații din cercetare revizuită de experți, utilizare tradițională și practici de aromaterapie certificate. Deși uleiurile esențiale oferă suport de bunăstare, conținutul nostru este doar informativ și nu este destinat să diagnosticheze, trateze sau vindece nicio condiție. Consultă întotdeauna profesioniști medicali pentru îngrijorări medicale."
                },
                "q15": {
                    "question": "Cum mă poate ajuta aplicația Uleiuri Esențiale?",
                    "answer": "Aplicația noastră este companionul tău complet de bunăstare! Accesează 650+ condiții de sănătate cu uleiuri recomandate, explorează 150+ profiluri de uleiuri esențiale, descoperă 100+ amestecuri pentru difuzor, beneficiază de ghiduri de siguranță dedicate pentru sarcină, copii și suportul în cancer, urmărește inventarul tău, primește sfaturi de bunăstare zilnice și salvează rețetele tale favorite. Descarcă gratuit pe iOS și Android pentru a începe călătoria ta de bunăstare naturală astăzi."
                }
            },
            "testimonials": {
                "title": "Iubit de Mii",
                "subtitle": "Alătură-te comunității noastre de entuziaști de bunăstare"
            },
            "download": {
                "title": "Începe Călătoria Ta de Bunăstare Astăzi",
                "subtitle": "Descarcă acum și obține acces instant la 650+ condiții de sănătate, 150+ uleiuri și secțiuni dedicate Sarcină, Copii și Cancer",
                "button": "Descarcă Gratuit pe App Store",
                "buttonMobile": "Descarcă Gratuit<br>pe App Store",
                "appStoreAlt": "Descarcă pe App Store",
                "googlePlayAlt": "Disponibil pe Google Play"
            },
            "socialShare": {
                "label": "Distribuie cu prietenii:"
            },
            "subscribe": {
                "title": "Primește Sfaturi de Bunăstare Săptămânale",
                "subtitle": "Abonează-te pentru promoții exclusive, rețete noi de amestecuri și sfaturi de sănătate de experți livrate în inbox-ul tău",
                "privacy": "Respectăm intimitatea ta. Dezabonează-te oricând."
            },
            "footer": {
                "about": {
                    "title": "Despre Ghid Uleiuri Esențiale & Rețete.",
                    "description": "Uleiuri esențiale, aromaterapie și rețete pentru difuzor - totul într-o aplicație inteligentă care face bunăstarea simplă și eficientă. Cunoștințe de experți, unelte inteligente și sfaturi practice pentru călătoria ta de bunăstare naturală."
                },
                "siteLinks": {
                    "title": "Link-uri site.",
                    "home": "Acasă",
                    "benefits": "Beneficii",
                    "health": "Sănătate",
                    "howToUse": "Cum să Folosești",
                    "faq": "Întrebări Frecvente",
                    "download": "Descarcă",
                    "terms": "Termeni de Serviciu",
                    "privacy": "Politica de Confidențialitate"
                },
                "contact": {
                    "title": "Contactează-ne.",
                    "description": "Dezvoltat independent de Appostu SRL.",
                    "help": "Ai nevoie de ajutor sau ai o întrebare? Contactează-ne la:"
                },
                "copyright": "© Copyright Ghid Uleiuri Esențiale & Rețete",
                "designBy": "Design de styleshout",
                "disclaimer1": "Doar în scop informativ. Nu este destinat pentru diagnostic, tratament, vindecare sau prevenire medicală. Declarații neevaluate de Food and Drug Administration.",
                "disclaimer2": "Dezvoltat independent de Appostu SRL. Această aplicație conține conținut original și nu este afiliată sau susținută de doTERRA®. doTERRA™ este o marcă înregistrată a doTERRA Holdings, LLC.",
                "backToTop": "Înapoi sus"
            },
            "language": {
                "current": "Română"
            }
        }
    };

    // State
    let currentLanguage = CONFIG.defaultLanguage;
    let translations = {};
    let isInitialized = false;

    /**
     * Detect user's preferred language
     * Priority: localStorage > browser language > default
     */
    function detectLanguage() {
        // Check localStorage first
        const savedLanguage = localStorage.getItem(CONFIG.storageKey);
        if (savedLanguage && CONFIG.supportedLanguages.includes(savedLanguage)) {
            return savedLanguage;
        }

        // Check browser language
        const browserLang = navigator.language || navigator.userLanguage;
        if (browserLang) {
            const mappedLang = LANGUAGE_MAP[browserLang];
            if (mappedLang && CONFIG.supportedLanguages.includes(mappedLang)) {
                return mappedLang;
            }
            
            // Try matching just the primary language code
            const primaryLang = browserLang.split('-')[0];
            if (CONFIG.supportedLanguages.includes(primaryLang)) {
                return primaryLang;
            }
        }

        // Default to English
        return CONFIG.defaultLanguage;
    }

    /**
     * Get translations for a specific language (from embedded translations)
     */
    function loadTranslations(lang) {
        // Return embedded translations
        if (TRANSLATIONS[lang]) {
            return TRANSLATIONS[lang];
        }
        
        // Fallback to English
        if (lang !== 'en' && TRANSLATIONS['en']) {
            console.log('Falling back to English translations');
            return TRANSLATIONS['en'];
        }
        
        return {};
    }

    /**
     * Get a translation by key path (e.g., 'nav.home')
     */
    function t(keyPath, fallback = '') {
        const keys = keyPath.split('.');
        let value = translations;

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                console.warn(`Translation key not found: ${keyPath}`);
                return fallback || keyPath;
            }
        }

        return value || fallback || keyPath;
    }

    /**
     * Apply translations to all elements with data-i18n attributes
     */
    function applyTranslations() {
        // Translate text content
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = t(key);
            if (translation && translation !== key) {
                element.innerHTML = translation;
            }
        });

        // Translate attributes (title, alt, placeholder, aria-label)
        const attributeTypes = ['title', 'alt', 'placeholder', 'aria-label', 'href', 'content'];
        attributeTypes.forEach(attr => {
            document.querySelectorAll(`[data-i18n-${attr}]`).forEach(element => {
                const key = element.getAttribute(`data-i18n-${attr}`);
                const translation = t(key);
                if (translation && translation !== key) {
                    if (attr === 'content') {
                        element.setAttribute('content', translation);
                    } else {
                        element.setAttribute(attr, translation);
                    }
                }
            });
        });

        // Update page title
        const titleTranslation = t('meta.title');
        if (titleTranslation && titleTranslation !== 'meta.title') {
            document.title = titleTranslation;
        }

        // Update meta description
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            const descTranslation = t('meta.description');
            if (descTranslation && descTranslation !== 'meta.description') {
                metaDesc.setAttribute('content', descTranslation);
            }
        }

        // Update Open Graph tags
        const ogTitle = document.querySelector('meta[property="og:title"]');
        if (ogTitle) {
            const ogTitleTranslation = t('meta.ogTitle');
            if (ogTitleTranslation && ogTitleTranslation !== 'meta.ogTitle') {
                ogTitle.setAttribute('content', ogTitleTranslation);
            }
        }

        const ogDesc = document.querySelector('meta[property="og:description"]');
        if (ogDesc) {
            const ogDescTranslation = t('meta.ogDescription');
            if (ogDescTranslation && ogDescTranslation !== 'meta.ogDescription') {
                ogDesc.setAttribute('content', ogDescTranslation);
            }
        }

        // Update Twitter Card tags
        const twitterTitle = document.querySelector('meta[name="twitter:title"]');
        if (twitterTitle) {
            const twitterTitleTranslation = t('meta.twitterTitle');
            if (twitterTitleTranslation && twitterTitleTranslation !== 'meta.twitterTitle') {
                twitterTitle.setAttribute('content', twitterTitleTranslation);
            }
        }

        const twitterDesc = document.querySelector('meta[name="twitter:description"]');
        if (twitterDesc) {
            const twitterDescTranslation = t('meta.twitterDescription');
            if (twitterDescTranslation && twitterDescTranslation !== 'meta.twitterDescription') {
                twitterDesc.setAttribute('content', twitterDescTranslation);
            }
        }

        // Update HTML lang attribute
        document.documentElement.lang = currentLanguage;

        // Update language switcher current language display
        updateLanguageSwitcher();
    }

    /**
     * Update the language switcher UI to reflect current language
     */
    function updateLanguageSwitcher() {
        // Update current language display
        const currentLangDisplay = document.querySelector('.language-switcher__current');
        if (currentLangDisplay) {
            currentLangDisplay.textContent = LANGUAGE_NAMES[currentLanguage];
        }

        // Update active state in dropdown
        document.querySelectorAll('.language-switcher__dropdown button').forEach(button => {
            const lang = button.getAttribute('data-lang');
            if (lang === currentLanguage) {
                button.classList.add('is-active');
            } else {
                button.classList.remove('is-active');
            }
        });
    }

    /**
     * Set the current language
     */
    function setLanguage(lang) {
        console.log('setLanguage called with:', lang);
        if (!CONFIG.supportedLanguages.includes(lang)) {
            console.warn(`Unsupported language: ${lang}`);
            return Promise.resolve();
        }

        if (lang === currentLanguage && isInitialized) {
            console.log('Language already set, skipping');
            return Promise.resolve(); // Already set
        }

        currentLanguage = lang;
        
        // Save to localStorage
        localStorage.setItem(CONFIG.storageKey, lang);
        console.log('Saved to localStorage:', lang);

        // Load translations (from embedded object instead of fetch)
        translations = loadTranslations(lang);
        console.log('Translations loaded:', Object.keys(translations));

        // Apply translations
        applyTranslations();
        console.log('Translations applied');

        // Dispatch event for other components
        window.dispatchEvent(new CustomEvent('languageChanged', { 
            detail: { language: lang } 
        }));

        return Promise.resolve();
    }

    /**
     * Get current language
     */
    function getLanguage() {
        return currentLanguage;
    }

    /**
     * Get all translations for current language
     */
    function getTranslations() {
        return translations;
    }

    /**
     * Get supported languages
     */
    function getSupportedLanguages() {
        return CONFIG.supportedLanguages.map(lang => ({
            code: lang,
            name: LANGUAGE_NAMES[lang]
        }));
    }

    /**
     * Initialize the language switcher UI
     */
    function initLanguageSwitcher() {
        const switcher = document.querySelector('.language-switcher');
        if (!switcher) return;

        const toggle = switcher.querySelector('.language-switcher__toggle');
        const dropdown = switcher.querySelector('.language-switcher__dropdown');

        if (!toggle || !dropdown) return;

        // Toggle dropdown on click
        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            switcher.classList.toggle('is-open');
            toggle.setAttribute('aria-expanded', switcher.classList.contains('is-open'));
        });

        // Handle language selection
        dropdown.querySelectorAll('button').forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                console.log('Language button clicked:', lang);
                if (lang) {
                    setLanguage(lang);
                    console.log('Language set to:', lang);
                    switcher.classList.remove('is-open');
                    toggle.setAttribute('aria-expanded', 'false');
                }
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!switcher.contains(e.target)) {
                switcher.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Keyboard navigation
        switcher.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                switcher.classList.remove('is-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    }

    /**
     * Initialize the i18n module
     */
    function init() {
        console.log('i18n.init() called');
        // Detect and set language
        const detectedLang = detectLanguage();
        console.log('Detected language:', detectedLang);
        
        // Synchronous initialization (no async needed since we use embedded translations)
        setLanguage(detectedLang);

        // Initialize language switcher
        initLanguageSwitcher();

        isInitialized = true;

        console.log(`i18n initialized with language: ${currentLanguage}`);
    }

    // Public API
    global.i18n = {
        init,
        t,
        setLanguage,
        getLanguage,
        getTranslations,
        getSupportedLanguages,
        applyTranslations
    };

})(window);
