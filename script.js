import * as framerMotion from 'https://esm.run/framer-motion';
import { resumeData } from './resume_data.js';

const { animate, scroll } = framerMotion;

document.addEventListener('DOMContentLoaded', () => {
    populateHeader();
    populateSummary();
    populateCompetencies();
    populateExperience();
    populateEducation();
    populatePatents();
    populateLeadership();
    populateExpertise();
    
    setupInteractions();
    lucide.createIcons();
    runAnimations();

    document.getElementById('current-year').textContent = new Date().getFullYear();
});

function populateHeader() {
    const { name, title, photoUrl, contacts } = resumeData.personalInfo;
    
    const picContainer = document.getElementById('profile-pic-container');
    picContainer.innerHTML = `<img src="${photoUrl}" alt="${name}" class="rounded-full object-cover w-full h-full border-4 border-gold/50 shadow-lg">`;

    const infoContainer = document.getElementById('header-info');
    let contactsHTML = '<div class="flex items-center justify-center md:justify-start gap-6 mt-4">';
    contacts.forEach(contact => {
        if (contact.type === 'wechat') {
            contactsHTML += `
                <div class="flex items-center gap-2 text-text-darker hover:text-gold transition-colors duration-300">
                    <i data-lucide="${contact.icon}" class="w-5 h-5"></i>
                    <span>微信: ${contact.value}</span>
                    <button id="copy-wechat" data-value="${contact.value}" class="p-1 rounded-md hover:bg-white/10" aria-label="复制微信ID">
                        <i data-lucide="copy" class="w-4 h-4"></i>
                    </button>
                </div>`;
        } else if (contact.type === 'email') {
            contactsHTML += `
                <a href="mailto:${contact.value}" class="flex items-center gap-2 text-text-darker hover:text-gold transition-colors duration-300">
                    <i data-lucide="${contact.icon}" class="w-5 h-5"></i>
                    <span>${contact.value}</span>
                </a>`;
        }
    });
    contactsHTML += '</div>';

    infoContainer.innerHTML = `
        <h1 class="text-4xl md:text-5xl font-bold text-text-light">${name}</h1>
        <p class="mt-2 text-xl md:text-2xl text-gold font-medium">${title}</p>
        ${contactsHTML}
    `;
}

function populateSummary() {
    document.getElementById('summary-content').textContent = resumeData.summary;
}

function populateCompetencies() {
    const grid = document.getElementById('competencies-grid');
    let content = '';
    resumeData.competencies.forEach(c => {
        content += `
            <div class="card-bg p-6 rounded-lg shadow-lg hover:shadow-gold/20 hover:-translate-y-1 transition-all duration-300">
                <div class="flex items-center gap-4">
                    <i data-lucide="${c.icon}" class="w-8 h-8 text-gold"></i>
                    <h3 class="text-xl font-bold text-text-light">${c.title}</h3>
                </div>
                <ul class="mt-4 ml-2 space-y-2 text-text-darker list-inside">
                    ${c.skills.map(skill => `<li class="flex items-start"><span class="text-gold mr-2 mt-1.5">&#9656;</span><span>${skill}</span></li>`).join('')}
                </ul>
            </div>
        `;
    });
    grid.innerHTML = content;
}

function populateExperience() {
    const timeline = document.getElementById('experience-timeline');
    let content = '';
    resumeData.experience.forEach(e => {
        content += `
            <div class="relative">
                <div class="timeline-dot"></div>
                <p class="text-sm text-gold font-semibold">${e.dates}</p>
                <h3 class="text-2xl font-bold text-text-light mt-1">${e.company}</h3>
                <p class="text-lg text-text-darker font-medium">${e.role}</p>
                <ul class="mt-4 ml-4 space-y-2 text-text-darker list-disc">
                    ${e.achievements.map(a => `<li>${a}</li>`).join('')}
                </ul>
            </div>
        `;
    });
    timeline.innerHTML = content;
}

function populateEducation() {
    const list = document.getElementById('education-list');
    let content = '';
    resumeData.education.forEach(e => {
        content += `
            <div class="card-bg p-4 rounded-lg flex items-center justify-between flex-wrap gap-2">
                <div>
                    <p class="text-lg font-bold text-text-light">${e.degree}</p>
                    <p class="text-text-darker">${e.school}</p>
                </div>
                <p class="text-gold font-semibold text-sm">${e.dates}</p>
            </div>
        `;
    });
    list.innerHTML = content;
}

function populatePatents() {
    document.getElementById('patents-content').textContent = resumeData.patents.summary;
}

function populateLeadership() {
    const container = document.getElementById('leadership-content');
    let content = '';
    resumeData.leadership.forEach(item => {
        content += `
            <div class="card-bg p-6 rounded-lg">
                <h3 class="text-xl font-bold text-gold">${item.title}</h3>
                <p class="mt-2 text-text-darker">${item.description}</p>
            </div>
        `;
    });
    container.innerHTML = content;
}

function populateExpertise() {
    const container = document.getElementById('expertise-tags');
    let content = '';
    resumeData.expertise.forEach(tag => {
        content += `<span class="bg-secondary text-gold text-sm font-medium px-4 py-2 rounded-full shadow-sm">${tag}</span>`;
    });
    container.innerHTML = content;
}


function setupInteractions() {
    const copyBtn = document.getElementById('copy-wechat');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const valueToCopy = copyBtn.dataset.value;
            navigator.clipboard.writeText(valueToCopy).then(() => {
                showCopyNotification();
            });
        });
    }
}

function showCopyNotification() {
    const notification = document.getElementById('copy-notification');
    notification.style.opacity = '1';
    notification.style.transform = 'translateY(0)';
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(20px)';
    }, 2000);
}


function runAnimations() {
    const sections = document.querySelectorAll('section, header');
    sections.forEach(section => {
        scroll(animate(section, 
            { opacity: [0, 1], y: [30, 0] },
            { duration: 0.8, delay: 0.2 }
        ), {
            target: section,
            offset: ["start end", "end end"]
        });
    });
}
