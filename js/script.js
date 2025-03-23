const DAYS = {
    it: ['LUN', 'MAR', 'MER', 'GIO', 'VEN', 'SAB', 'DOM'],
    en: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN']
};

let currentLang = 'en';

const $ = (selector) => {
    return document.querySelector(selector);
};

const hour = $('.hour');
const dot = $('.dot');
const min = $('.min');
const week = $('.week');
const langSwitch = $('.lang-switch');
let showDot = true;

langSwitch.addEventListener('click', (e) => {
    if (e.target.tagName === 'SPAN') {
        const newLang = e.target.textContent.toLowerCase();
        if (newLang !== currentLang) {
            currentLang = newLang;
            Array.from(langSwitch.children).forEach(span => {
                if (span.tagName === 'SPAN') {
                    span.classList.toggle('active');
                }
            });
            updateWeekDays();
        }
    }
});

function updateWeekDays() {
    Array.from(week.children).forEach((day, index) => {
        day.textContent = DAYS[currentLang][index];
    });
}

function update() {
    showDot = !showDot;
    const now = new Date();

    if (showDot) {
        dot.classList.add('invisible');
    } else {
        dot.classList.remove('invisible');
    }
    hour.textContent = String(now.getHours()).padStart(2, '0');
    min.textContent = String(now.getMinutes()).padStart(2, '0');

    Array.from(week.children).forEach((i) => {
        i.classList.remove('active');
    });

    // Convert Sunday (0) to 6, and shift other days by -1
    const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
    week.children[dayIndex].classList.add('active');
}

updateWeekDays();
update();

setInterval(update, 750);
