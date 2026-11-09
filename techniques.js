// ===============================
// STUDY TECHNIQUES INFORMATION
// ===============================

const techniques = {

    "Pomodoro Technique": {
        title: "Pomodoro Technique",
        content: `
        <p>Study for <strong>25 minutes</strong> followed by a <strong>5-minute break</strong>.</p>

        <h4>Benefits</h4>
        <ul>
            <li>✔ Improves focus</li>
            <li>✔ Prevents burnout</li>
            <li>✔ Increases productivity</li>
        </ul>

        <h4>Example</h4>
        <p>Study Mathematics for 25 minutes, then take a 5-minute break before continuing.</p>
        `
    },

    "Active Recall": {
        title: "Active Recall",
        content: `
        <p>Instead of rereading notes, test yourself without looking at the answers.</p>

        <h4>Benefits</h4>
        <ul>
            <li>✔ Strengthens memory</li>
            <li>✔ Improves understanding</li>
        </ul>

        <h4>Example</h4>
        <p>Close your Biology notes and explain the process of photosynthesis from memory.</p>
        `
    },

    "Feynman Technique": {
        title: "Feynman Technique",
        content: `
        <p>Explain a topic using simple language as if teaching someone else.</p>

        <h4>Benefits</h4>
        <ul>
            <li>✔ Finds weak areas</li>
            <li>✔ Makes concepts easier to understand</li>
        </ul>

        <h4>Example</h4>
        <p>Teach your friend how chemical bonding works using simple words.</p>
        `
    },

    "Spaced Repetition": {
        title: "Spaced Repetition",
        content: `
        <p>Review information over increasing intervals.</p>

        <h4>Benefits</h4>
        <ul>
            <li>✔ Long-term memory</li>
            <li>✔ Better exam preparation</li>
        </ul>

        <h4>Schedule</h4>
        <p>Review on Day 1, Day 3, Day 7 and Day 14.</p>
        `
    },

    "Mind Mapping": {
        title: "Mind Mapping",
        content: `
        <p>Create a visual diagram that connects ideas together.</p>

        <h4>Benefits</h4>
        <ul>
            <li>✔ Easier revision</li>
            <li>✔ Organises information clearly</li>
        </ul>
        `
    },

    "Blurting": {
        title: "Blurting",
        content: `
        <p>Write everything you remember before checking your notes.</p>

        <h4>Benefits</h4>
        <ul>
            <li>✔ Identifies weak topics</li>
            <li>✔ Improves recall</li>
        </ul>
        `
    }

};

// ===============================
// GET MODAL ELEMENTS
// ===============================

const cards = document.querySelectorAll(".tech-card");
const modal = document.getElementById("techModal");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const closeBtn = document.querySelector(".close");

// ===============================
// OPEN MODAL
// ===============================

cards.forEach(card=>{

    card.addEventListener("click",()=>{

        const title = card.querySelector("h2").innerText;

        modalTitle.innerHTML = techniques[title].title;
        modalBody.innerHTML = techniques[title].content;

        modal.style.display="flex";

    });

});

// ===============================
// CLOSE MODAL
// ===============================

closeBtn.addEventListener("click",()=>{

    modal.style.display="none";

});

window.addEventListener("click",(e)=>{

    if(e.target==modal){

        modal.style.display="none";

    }

});