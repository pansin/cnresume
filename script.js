import { resumeData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();
    populateData();
    setupNavigation();
    setupScrollAnimation();
    setupMobileMenu();
});

function formatText(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong class="text-blue-400 font-semibold">$1</strong>')
        .replace(/\*(.*?)\*/g, '<em class="text-gray-400 not-italic">$1</em>');
}

function createSectionTitle(title) {
    return `<h2 class="text-2xl font-bold text-white mb-8 tracking-wide">${title}</h2>`;
}

function populateData() {

    const summarySection = document.getElementById('summary');
    summarySection.innerHTML = `
        ${createSectionTitle(resumeData.summary.title)}
        <p class="text-gray-300 leading-relaxed">${formatText(resumeData.summary.content)}</p>
    `;


    const competenciesSection = document.getElementById('competencies');
    let competenciesHtml = createSectionTitle(resumeData.competencies.title);
    competenciesHtml += '<div class="grid md:grid-cols-2 gap-6">';
    resumeData.competencies.areas.forEach(area => {
        competenciesHtml += `
            <div class="bg-gray-800/50 p-6 rounded-lg border border-gray-700/50">
                <h3 class="font-semibold text-white mb-3">${area.name}</h3>
                <ul class="space-y-2">
                    ${area.skills.map(skill => `<li class="flex items-start"><i data-lucide="chevrons-right" class="w-4 h-4 mr-2 mt-1 text-blue-400 flex-shrink-0"></i><span class="text-gray-400 text-sm">${skill}</span></li>`).join('')}
                </ul>
            </div>
        `;
    });
    competenciesHtml += '</div>';
    competenciesSection.innerHTML = competenciesHtml;


    const experienceSection = document.getElementById('experience');
    let experienceHtml = createSectionTitle(resumeData.experience.title);
    experienceHtml += '<div class="timeline-container"><div class="timeline-line"></div>';
    resumeData.experience.jobs.forEach(job => {
        experienceHtml += `
            <div class="timeline-item">
                <div class="timeline-dot"></div>
                <div class="timeline-item-content">
                    <div class="bg-gray-800/50 rounded-lg p-6 border border-gray-700/50 transition-shadow duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                        <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-2">
                            <h3 class="text-lg font-bold text-white">${job.role}</h3>
                            <p class="text-sm text-gray-400 sm:text-right mt-1 sm:mt-0">${job.period}</p>
                        </div>
                        <p class="text-md font-semibold text-blue-400 mb-4">${job.company}</p>
                        <p class="text-gray-400 mb-4">${formatText(job.description)}</p>
                        <ul class="space-y-3">
                            ${job.achievements.map(ach => `<li class="flex items-start"><i data-lucide="star" class="w-4 h-4 mr-3 mt-1 text-yellow-400 flex-shrink-0"></i><span class="text-gray-300">${formatText(ach)}</span></li>`).join('')}
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });
    experienceHtml += '</div>';
    experienceSection.innerHTML = experienceHtml;


    const projectSection = document.getElementById('project');
    let projectHtml = createSectionTitle(resumeData.project.title);
    projectHtml += `
        <div class="bg-gray-800/50 rounded-lg p-8 border border-gray-700/50">
            <h3 class="text-xl font-bold text-blue-400 mb-6">${resumeData.project.name}</h3>
            <div class="space-y-6">
            ${resumeData.project.details.map(detail => `
                <div>
                    <h4 class="font-semibold text-white mb-2">${detail.heading}</h4>
                    <p class="text-gray-300 leading-relaxed">${formatText(detail.text)}</p>
                </div>
            `).join('')}
            </div>
        </div>
    `;
    projectSection.innerHTML = projectHtml;
    

    const patentsSection = document.getElementById('patents');
    let patentsHtml = createSectionTitle(resumeData.patents.title);
    patentsHtml += '<div class="space-y-6">';
    resumeData.patents.items.forEach(item => {
        patentsHtml += `
            <div class="flex items-start">
                <i data-lucide="${item.icon}" class="w-8 h-8 mr-4 text-blue-400 flex-shrink-0 mt-1"></i>
                <div>
                    <h3 class="font-semibold text-white mb-1">${item.title}</h3>
                    <p class="text-gray-400">${formatText(item.description)}</p>
                </div>
            </div>
        `;
    });
    patentsHtml += '</div>';
    patentsSection.innerHTML = patentsHtml;


    const leadershipSection = document.getElementById('leadership');
    let leadershipHtml = createSectionTitle(resumeData.leadership.title);
    leadershipHtml += '<div class="space-y-6">';
    resumeData.leadership.items.forEach(item => {
        leadershipHtml += `
            <div class="flex items-start">
                <i data-lucide="${item.icon}" class="w-8 h-8 mr-4 text-blue-400 flex-shrink-0 mt-1"></i>
                <div>
                    <h3 class="font-semibold text-white mb-1">${item.title}</h3>
                    <p class="text-gray-400">${formatText(item.description)}</p>
                </div>
            </div>
        `;
    });
    leadershipHtml += '</div>';
    leadershipSection.innerHTML = leadershipHtml;


    const educationSection = document.getElementById('education');
    let educationHtml = createSectionTitle(resumeData.education.title);
    educationHtml += '<div class="relative education-timeline pl-8">';
    resumeData.education.degrees.forEach(degree => {
        educationHtml += `
            <div class="relative pb-8 education-item">
                <p class="text-sm text-gray-400 mb-1">${degree.period}</p>
                <h3 class="font-semibold text-white">${degree.degree}</h3>
                <p class="text-blue-400">${degree.school}</p>
            </div>
        `;
    });
    educationHtml += '</div>';
    educationSection.innerHTML = educationHtml;
    
    lucide.createIcons();
}

function setupNavigation() {
    const navLinksContainer = document.getElementById('nav-links');
    const sections = document.querySelectorAll('main section');
    const navMapping = {
        'summary': '个人摘要',
        'competencies': '核心能力',
        'experience': '职业经历',
        'project': '项目亮点',
        'patents': '专利与标准',
        'leadership': '社区领导力',
        'education': '教育背景'
    };

    let navHtml = '';
    sections.forEach(section => {
        const sectionId = section.id;
        const sectionName = navMapping[sectionId];
        if (sectionName) {
            navHtml += `
                <li>
                    <a href="#${sectionId}" class="nav-link flex items-center group">
                        <span class="nav-indicator mr-4"></span>
                        <span class="nav-text font-bold">${sectionName}</span>
                    </a>
                </li>
            `;
        }
    });
    navLinksContainer.innerHTML = navHtml;

    const navLinks = document.querySelectorAll('.nav-link');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                document.querySelector('.nav-link.active')?.classList.remove('active');
                document.querySelector(`.nav-link[href="#${id}"]`)?.classList.add('active');
            }
        });
    }, { rootMargin: "-30% 0px -70% 0px", threshold: 0 });

    sections.forEach(section => observer.observe(section));
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            document.querySelector(targetId).scrollIntoView({ behavior: 'smooth' });
             if (window.innerWidth < 1024) {
                document.getElementById('sidebar-nav').classList.add('-translate-x-full');
            }
        });
    });
}

function setupScrollAnimation() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

function setupMobileMenu() {
    const menuButton = document.getElementById('mobile-menu-button');
    const sidebar = document.getElementById('sidebar-nav');
    
    menuButton.addEventListener('click', () => {
        sidebar.classList.toggle('-translate-x-full');
    });

    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024 && !sidebar.contains(e.target) && !menuButton.contains(e.target)) {
            sidebar.classList.add('-translate-x-full');
        }
    });
}
