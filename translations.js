// Translation system for the portfolio
const translations = {
    en: {
        // Navigation
        nav: {
            home: "Home",
            about: "About",
            skills: "Skills",
            experience: "Experience",
            projects: "Projects",
            contact: "Contact"
        },
        
        // Hero Section
        hero: {
            badge: "Mobile Developer",
            title: "Hi, I'm",
            name: "Ghassen Bouaziz",
            subtitle: "Senior Full-Stack Developer specializing in Mobile Development",
            description: "With nearly 4 years of experience, I specialize in React Native and Flutter development. I've contributed to the creation and publication of more than 12 mobile applications on the App Store and Play Store, including several high-traffic apps.",
            stats: {
                years: "Years Experience",
                apps: "Published Apps",
                satisfaction: "Client Satisfaction"
            },
            actions: {
                viewWork: "View My Work",
                getInTouch: "Get In Touch"
            }
        },
        
        // About Section
        about: {
            title: "About Me",
            subtitle: "Passionate about creating exceptional mobile experiences",
            heading: "Senior Mobile Developer & Full-Stack Expert",
            description1: "I am a senior mobile developer with nearly 4 years of experience, specialized in React Native, with strong Flutter proficiency. I have contributed to the creation and publication of more than 12 mobile applications on the App Store and Play Store, including several high-traffic apps.",
            description2: "Mastering the complete mobile development lifecycle from design to production deployment, I pay particular attention to application performance and user experience. Thanks to my skills in Node.js (back-end) and React.js (front-end), I am able to design high-performance, scalable full-stack solutions perfectly adapted to iOS, Android, and web environments.",
            highlights: {
                performance: {
                    title: "Performance Focused",
                    description: "Optimizing apps for speed and efficiency"
                },
                ai: {
                    title: "AI Integration",
                    description: "Expert in OpenAI and AI-powered features"
                },
                collaboration: {
                    title: "Team Collaboration",
                    description: "Experienced in remote and cross-functional teams"
                }
            }
        },
        
        // Skills Section
        skills: {
            title: "Skills & Technologies",
            subtitle: "Technologies I work with",
            categories: {
                mobile: "Mobile Development",
                fullstack: "Frontend & Backend",
                cloud: "Cloud & AI Services"
            }
        },
        
        // Experience Section
        experience: {
            title: "Professional Experience",
            subtitle: "My career journey",
            positions: {
                leStud: {
                    title: "Full-Stack Developer",
                    company: "Le Stud (Selego)",
                    period: "04/2023 - Present",
                    description: "Participation in several mobile and web projects as a full-stack developer, primarily on React Native, Node.js, and React.js stacks.",
                    responsibilities: [
                        "Development of web dashboards with React.js for user data visualization",
                        "Content administration and access management",
                        "Implementation of error logging and analytics",
                        "Active collaboration with product, design, and QA teams"
                    ]
                },
                ithake: {
                    title: "Mobile Developer",
                    company: "Ithake",
                    period: "01/2024 - 03/2025",
                    description: "Participation in creating the CarteEco application, highlighting ecological impact products/services.",
                    responsibilities: [
                        "Key role in back-end architecture and third-party API integration",
                        "Payment management and mapping integration",
                        "Delivery of scalable and performant solutions",
                        "Production deployment and maintenance"
                    ]
                },
                tifo: {
                    title: "Mobile Developer",
                    company: "Tifo",
                    period: "06/2023 - 01/2024",
                    description: "Development of a sports and financial management application for clubs and associations.",
                    responsibilities: [
                        "Design of modules for team management, dues, notifications, and statistics",
                        "Participation in technical decisions on code structuring",
                        "Collaboration with remote teams in Paris"
                    ]
                },
                genext: {
                    title: "Mobile Developer",
                    company: "Genext IT",
                    period: "07/2021 - 05/2023",
                    description: "Development of several hybrid mobile applications with React Native for various clients.",
                    responsibilities: [
                        "Implementation of CI/CD pipelines and development best practices",
                        "Mentoring of interns and junior developers on concrete projects",
                        "Work on code quality, performance, and automated testing"
                    ]
                }
            }
        },
        
        // Projects Section
        projects: {
            title: "Featured Projects",
            subtitle: "Some of my recent work",
            items: {
                ibitibi: {
                    title: "Ibitibi",
                    description: "AI-personalized educational application (iOS & Android). Educational video streaming platform personalized via AI, targeting young users with complete project lifecycle management.",
                    appStore: "App Store",
                    sourceCode: "Source Code"
                },
                carteEco: {
                    title: "CarteEco (ITHAKE)",
                    description: "Eco-responsible mobile marketplace (iOS & Android). Connecting local associations and users via mobile application with ecological product indexing system.",
                    appStore: "App Store",
                    sourceCode: "Source Code"
                },
                tifo: {
                    title: "Tifo",
                    description: "Mobile application for sports clubs (iOS & Android). Tool for managing members, finances, and sports events with comprehensive team management modules.",
                    appStore: "App Store",
                    sourceCode: "Source Code"
                },
                womensDrive: {
                    title: "Women's Drive",
                    description: "Trip booking application with drivers (iOS). Trip management for targeted clientele via certified drivers with integrated maps and push notifications.",
                    appStore: "App Store",
                    sourceCode: "Source Code"
                },
                fridgee: {
                    title: "Fridgee",
                    description: "Intelligent culinary assistant (iOS & Android). Ingredient management application and AI-powered recipe generation using OpenAI integration.",
                    appStore: "App Store",
                    sourceCode: "Source Code"
                },
                clicStore: {
                    title: "ClicStore",
                    description: "Web and mobile marketplace (iOS & Android). Creation of personalized stores for sellers with complete client interface using Flutter and Material Design.",
                    appStore: "App Store",
                    sourceCode: "Source Code"
                }
            }
        },
        
        // Contact Section
        contact: {
            title: "Get In Touch",
            subtitle: "Let's work together",
            heading: "Let's Connect",
            description: "I'm always interested in new opportunities and exciting projects. Whether you have a question or just want to say hi, feel free to reach out!",
            details: {
                email: "Email",
                phone: "Phone",
                linkedin: "LinkedIn"
            },
            form: {
                name: "Your Name",
                email: "Your Email",
                subject: "Subject",
                message: "Your Message",
                send: "Send Message",
                sending: "Sending...",
                success: "Message sent successfully! I'll get back to you soon.",
                error: "Sorry, there was an error sending your message. Please try again."
            }
        },
        
        // Footer
        footer: {
            copyright: "All rights reserved."
        },
        
        // Download CV
        downloadCV: "Download CV"
    },
    
    fr: {
        // Navigation
        nav: {
            home: "Accueil",
            about: "À propos",
            skills: "Compétences",
            experience: "Expérience",
            projects: "Projets",
            contact: "Contact"
        },
        
        // Hero Section
        hero: {
            badge: "Développeur Mobile",
            title: "Salut, je suis",
            name: "Ghassen Bouaziz",
            subtitle: "Développeur Full-Stack Senior spécialisé dans le Développement Mobile",
            description: "Avec près de 4 ans d'expérience, je me spécialise dans le développement React Native et Flutter. J'ai contribué à la création et publication de plus de 12 applications mobiles sur l'App Store et le Play Store, dont plusieurs applications à fort trafic.",
            stats: {
                years: "Années d'Expérience",
                apps: "Applications Publiées",
                satisfaction: "Satisfaction Client"
            },
            actions: {
                viewWork: "Voir Mon Travail",
                getInTouch: "Me Contacter"
            }
        },
        
        // About Section
        about: {
            title: "À Propos de Moi",
            subtitle: "Passionné par la création d'expériences mobiles exceptionnelles",
            heading: "Développeur Mobile Senior & Expert Full-Stack",
            description1: "Je suis un développeur mobile senior avec près de 4 ans d'expérience, spécialisé en React Native, avec une forte maîtrise de Flutter. J'ai contribué à la création et publication de plus de 12 applications mobiles sur l'App Store et le Play Store, dont plusieurs applications à fort trafic.",
            description2: "Maîtrisant le cycle de vie complet du développement mobile, de la conception au déploiement en production, je porte une attention particulière aux performances de l'application et à l'expérience utilisateur. Grâce à mes compétences en Node.js (back-end) et React.js (front-end), je suis capable de concevoir des solutions full-stack performantes et évolutives parfaitement adaptées aux environnements iOS, Android et web.",
            highlights: {
                performance: {
                    title: "Axé sur les Performances",
                    description: "Optimisation des applications pour la vitesse et l'efficacité"
                },
                ai: {
                    title: "Intégration IA",
                    description: "Expert en OpenAI et fonctionnalités alimentées par l'IA"
                },
                collaboration: {
                    title: "Collaboration d'Équipe",
                    description: "Expérience avec des équipes distantes et interfonctionnelles"
                }
            }
        },
        
        // Skills Section
        skills: {
            title: "Compétences & Technologies",
            subtitle: "Technologies avec lesquelles je travaille",
            categories: {
                mobile: "Développement Mobile",
                fullstack: "Frontend & Backend",
                cloud: "Services Cloud & IA"
            }
        },
        
        // Experience Section
        experience: {
            title: "Expérience Professionnelle",
            subtitle: "Mon parcours professionnel",
            positions: {
                leStud: {
                    title: "Développeur Full-Stack",
                    company: "Le Stud (Selego)",
                    period: "04/2023 - Présent",
                    description: "Participation à plusieurs projets mobiles et web en tant que développeur full-stack, principalement sur les stacks React Native, Node.js et React.js.",
                    responsibilities: [
                        "Développement de tableaux de bord web avec React.js pour la visualisation des données utilisateur",
                        "Administration de contenu et gestion des accès",
                        "Implémentation de la journalisation d'erreurs et d'analytics",
                        "Collaboration active avec les équipes produit, design et QA"
                    ]
                },
                ithake: {
                    title: "Développeur Mobile",
                    company: "Ithake",
                    period: "01/2024 - 03/2025",
                    description: "Participation à la création de l'application CarteEco, mettant en avant les produits/services à impact écologique.",
                    responsibilities: [
                        "Rôle clé dans l'architecture back-end et l'intégration d'APIs tierces",
                        "Gestion des paiements et intégration cartographique",
                        "Livraison de solutions évolutives et performantes",
                        "Déploiement en production et maintenance"
                    ]
                },
                tifo: {
                    title: "Développeur Mobile",
                    company: "Tifo",
                    period: "06/2023 - 01/2024",
                    description: "Développement d'une application de gestion sportive et financière pour clubs et associations.",
                    responsibilities: [
                        "Conception de modules pour la gestion d'équipes, cotisations, notifications et statistiques",
                        "Participation aux décisions techniques sur la structuration du code",
                        "Collaboration avec des équipes distantes à Paris"
                    ]
                },
                genext: {
                    title: "Développeur Mobile",
                    company: "Genext IT",
                    period: "07/2021 - 05/2023",
                    description: "Développement de plusieurs applications mobiles hybrides avec React Native pour divers clients.",
                    responsibilities: [
                        "Implémentation de pipelines CI/CD et bonnes pratiques de développement",
                        "Mentorat d'internes et développeurs juniors sur des projets concrets",
                        "Travail sur la qualité du code, les performances et les tests automatisés"
                    ]
                }
            }
        },
        
        // Projects Section
        projects: {
            title: "Projets en Vedette",
            subtitle: "Quelques-uns de mes travaux récents",
            items: {
                ibitibi: {
                    title: "Ibitibi",
                    description: "Application éducative personnalisée par IA (iOS & Android). Plateforme de streaming vidéo éducative personnalisée via IA, ciblant les jeunes utilisateurs avec gestion complète du cycle de vie du projet.",
                    appStore: "App Store",
                    sourceCode: "Code Source"
                },
                carteEco: {
                    title: "CarteEco (ITHAKE)",
                    description: "Marketplace mobile éco-responsable (iOS & Android). Connectant associations locales et utilisateurs via application mobile avec système d'indexation de produits écologiques.",
                    appStore: "App Store",
                    sourceCode: "Code Source"
                },
                tifo: {
                    title: "Tifo",
                    description: "Application mobile pour clubs sportifs (iOS & Android). Outil de gestion des membres, finances et événements sportifs avec modules complets de gestion d'équipe.",
                    appStore: "App Store",
                    sourceCode: "Code Source"
                },
                womensDrive: {
                    title: "Women's Drive",
                    description: "Application de réservation de trajets avec chauffeurs (iOS). Gestion de trajets pour clientèle ciblée via chauffeurs certifiés avec cartes intégrées et notifications push.",
                    appStore: "App Store",
                    sourceCode: "Code Source"
                },
                fridgee: {
                    title: "Fridgee",
                    description: "Assistant culinaire intelligent (iOS & Android). Application de gestion d'ingrédients et génération de recettes alimentée par IA utilisant l'intégration OpenAI.",
                    appStore: "App Store",
                    sourceCode: "Source Code"
                },
                clicStore: {
                    title: "ClicStore",
                    description: "Marketplace web et mobile (iOS & Android). Création de boutiques personnalisées pour vendeurs avec interface client complète utilisant Flutter et Material Design.",
                    appStore: "App Store",
                    sourceCode: "Code Source"
                }
            }
        },
        
        // Contact Section
        contact: {
            title: "Me Contacter",
            subtitle: "Travaillons ensemble",
            heading: "Connectons-nous",
            description: "Je suis toujours intéressé par de nouvelles opportunités et des projets passionnants. Que vous ayez une question ou que vous souhaitiez simplement dire bonjour, n'hésitez pas à me contacter !",
            details: {
                email: "Email",
                phone: "Téléphone",
                linkedin: "LinkedIn"
            },
            form: {
                name: "Votre Nom",
                email: "Votre Email",
                subject: "Sujet",
                message: "Votre Message",
                send: "Envoyer le Message",
                sending: "Envoi en cours...",
                success: "Message envoyé avec succès ! Je vous répondrai bientôt.",
                error: "Désolé, il y a eu une erreur lors de l'envoi de votre message. Veuillez réessayer."
            }
        },
        
        // Footer
        footer: {
            copyright: "Tous droits réservés."
        },
        
        // Download CV
        downloadCV: "Télécharger CV"
    }
};

// Language management
let currentLanguage = localStorage.getItem('language') || 'en';

function setLanguage(lang) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    updateContent();
    updateLanguageSwitcher();
}

function getTranslation(key) {
    const keys = key.split('.');
    let value = translations[currentLanguage];
    
    for (const k of keys) {
        value = value[k];
        if (value === undefined) {
            console.warn(`Translation missing for key: ${key} in language: ${currentLanguage}`);
            return key;
        }
    }
    
    return value;
}

function updateContent() {
    // Update navigation
    document.querySelectorAll('.nav-link').forEach((link, index) => {
        const keys = ['nav.home', 'nav.about', 'nav.skills', 'nav.experience', 'nav.projects', 'nav.contact'];
        if (keys[index]) {
            link.textContent = getTranslation(keys[index]);
        }
    });

    // Update hero section
    const heroBadge = document.querySelector('.hero-badge span');
    if (heroBadge) heroBadge.textContent = getTranslation('hero.badge');

    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const titleSpan = heroTitle.querySelector('span:first-child');
        const nameSpan = heroTitle.querySelector('.highlight');
        if (titleSpan) titleSpan.textContent = getTranslation('hero.title') + ' ';
        if (nameSpan) nameSpan.textContent = getTranslation('hero.name');
    }

    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) heroSubtitle.textContent = getTranslation('hero.subtitle');

    const heroDescription = document.querySelector('.hero-description');
    if (heroDescription) heroDescription.textContent = getTranslation('hero.description');

    // Update stats labels
    const statLabels = document.querySelectorAll('.stat-label');
    const statKeys = ['hero.stats.years', 'hero.stats.apps', 'hero.stats.satisfaction'];
    statLabels.forEach((label, index) => {
        if (statKeys[index]) {
            label.textContent = getTranslation(statKeys[index]);
        }
    });

    // Update hero buttons
    const heroButtons = document.querySelectorAll('.hero-actions .btn span');
    const buttonKeys = ['hero.actions.viewWork', 'hero.actions.getInTouch'];
    heroButtons.forEach((button, index) => {
        if (buttonKeys[index]) {
            button.textContent = getTranslation(buttonKeys[index]);
        }
    });

    // Update section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    const sectionKeys = ['about.title', 'skills.title', 'experience.title', 'projects.title', 'contact.title'];
    sectionTitles.forEach((title, index) => {
        if (sectionKeys[index]) {
            title.textContent = getTranslation(sectionKeys[index]);
        }
    });

    const sectionSubtitles = document.querySelectorAll('.section-subtitle');
    const subtitleKeys = ['about.subtitle', 'skills.subtitle', 'experience.subtitle', 'projects.subtitle', 'contact.subtitle'];
    sectionSubtitles.forEach((subtitle, index) => {
        if (subtitleKeys[index]) {
            subtitle.textContent = getTranslation(subtitleKeys[index]);
        }
    });

    // Update about section
    const aboutHeading = document.querySelector('.about-text h3');
    if (aboutHeading) aboutHeading.textContent = getTranslation('about.heading');

    const aboutDescriptions = document.querySelectorAll('.about-text p');
    if (aboutDescriptions[0]) aboutDescriptions[0].textContent = getTranslation('about.description1');
    if (aboutDescriptions[1]) aboutDescriptions[1].textContent = getTranslation('about.description2');

    // Update about highlights
    const highlightTitles = document.querySelectorAll('.highlight-item h4');
    const highlightKeys = ['about.highlights.performance.title', 'about.highlights.ai.title', 'about.highlights.collaboration.title'];
    highlightTitles.forEach((title, index) => {
        if (highlightKeys[index]) {
            title.textContent = getTranslation(highlightKeys[index]);
        }
    });

    const highlightDescriptions = document.querySelectorAll('.highlight-item p');
    const highlightDescKeys = ['about.highlights.performance.description', 'about.highlights.ai.description', 'about.highlights.collaboration.description'];
    highlightDescriptions.forEach((desc, index) => {
        if (highlightDescKeys[index]) {
            desc.textContent = getTranslation(highlightDescKeys[index]);
        }
    });

    // Update skills categories
    const skillCategories = document.querySelectorAll('.skill-category h3');
    const skillKeys = ['skills.categories.mobile', 'skills.categories.fullstack', 'skills.categories.cloud'];
    skillCategories.forEach((category, index) => {
        if (skillKeys[index]) {
            category.textContent = getTranslation(skillKeys[index]);
        }
    });

    // Update experience section
    updateExperienceSection();
    
    // Update projects section
    updateProjectsSection();
    
    // Update contact section
    updateContactSection();

    // Update CV download button
    const cvButton = document.querySelector('.cv-download span');
    if (cvButton) cvButton.textContent = getTranslation('downloadCV');

    // Update footer
    const footerText = document.querySelector('.footer-text p');
    if (footerText) {
        footerText.innerHTML = `&copy; 2024 Ghassen Bouaziz. ${getTranslation('footer.copyright')}`;
    }
}

function updateExperienceSection() {
    const experienceItems = document.querySelectorAll('.timeline-content');
    const positionKeys = ['experience.positions.leStud', 'experience.positions.ithake', 'experience.positions.tifo', 'experience.positions.genext'];
    
    experienceItems.forEach((item, index) => {
        if (positionKeys[index]) {
            const key = positionKeys[index];
            const title = item.querySelector('.timeline-header h3');
            const date = item.querySelector('.timeline-date');
            const company = item.querySelector('h4');
            const description = item.querySelector('p');
            const responsibilities = item.querySelectorAll('.timeline-list li');
            
            if (title) title.textContent = getTranslation(`${key}.title`);
            if (date) date.textContent = getTranslation(`${key}.period`);
            if (company) company.textContent = getTranslation(`${key}.company`);
            if (description) description.textContent = getTranslation(`${key}.description`);
            
            responsibilities.forEach((li, respIndex) => {
                const respKey = `${key}.responsibilities.${respIndex}`;
                const translation = getTranslation(respKey);
                if (translation !== respKey) {
                    li.textContent = translation;
                }
            });
        }
    });
}

function updateProjectsSection() {
    const projectCards = document.querySelectorAll('.project-card');
    const projectKeys = ['projects.items.ibitibi', 'projects.items.carteEco', 'projects.items.tifo', 'projects.items.womensDrive', 'projects.items.fridgee', 'projects.items.clicStore'];
    
    projectCards.forEach((card, index) => {
        if (projectKeys[index]) {
            const key = projectKeys[index];
            const title = card.querySelector('h3');
            const description = card.querySelector('p');
            const links = card.querySelectorAll('.project-link');
            
            if (title) title.textContent = getTranslation(`${key}.title`);
            if (description) description.textContent = getTranslation(`${key}.description`);
            
            if (links[0]) links[0].textContent = getTranslation(`${key}.appStore`);
            if (links[1]) links[1].textContent = getTranslation(`${key}.sourceCode`);
        }
    });
}

function updateContactSection() {
    const contactHeading = document.querySelector('.contact-info h3');
    if (contactHeading) contactHeading.textContent = getTranslation('contact.heading');

    const contactDescription = document.querySelector('.contact-info p');
    if (contactDescription) contactDescription.textContent = getTranslation('contact.description');

    // Update contact details
    const contactDetails = document.querySelectorAll('.contact-item h4');
    const detailKeys = ['contact.details.email', 'contact.details.phone', 'contact.details.linkedin'];
    contactDetails.forEach((detail, index) => {
        if (detailKeys[index]) {
            detail.textContent = getTranslation(detailKeys[index]);
        }
    });

    // Update form placeholders
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm textarea');
    const formKeys = ['contact.form.name', 'contact.form.email', 'contact.form.subject', 'contact.form.message'];
    formInputs.forEach((input, index) => {
        if (formKeys[index]) {
            input.placeholder = getTranslation(formKeys[index]);
        }
    });

    // Update submit button
    const submitButton = document.querySelector('#contactForm button span');
    if (submitButton) submitButton.textContent = getTranslation('contact.form.send');
}

function updateLanguageSwitcher() {
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        langToggle.textContent = currentLanguage.toUpperCase();
    }
}

// Initialize translations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    updateContent();
    updateLanguageSwitcher();
});
