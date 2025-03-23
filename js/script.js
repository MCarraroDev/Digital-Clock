const $ = (selector) => {
    return document.querySelector(selector);
}

const hour = $(".hour");
const dot = $(".dot");
const min = $(".min");
const week = $(".week");
let showDot = true;

function update() {
    showDot = !showDot;
    const now = new Date();

    if (showDot) {
        dot.classList.add("invisible");
    } else {
        dot.classList.remove("invisible");
    }
    hour.textContent = String(now.getHours())
        .padStart(2, "0");
    min.textContent = String(now.getMinutes())
        .padStart(2, "0");

    Array.from(week.children).forEach(ele => {
        ele.classList.remove("active");
    });
    
    // Convert Sunday (0) to 6, and shift other days by -1
    const dayIndex = now.getDay() === 0 ? 6 : now.getDay() - 1;
    week.children[dayIndex].classList.add("active");
};

update()

setInterval(update, 500)