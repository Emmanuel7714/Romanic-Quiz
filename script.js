// 1. Array of questions with correct answers explicitly defined
const questions = [
    {q:"Being justified by faith, we have what with God?", a:"Peace", options:["Enmity","Partial peace","Peace","Uncertainty"]},
    {q:"What does the book of Romans contain?", a:"The gospel of God concerning salvation", options:["Rules for the Gentiles","The gospel of God concerning salvation","A history of Israel","Paul's personal testimony"]},
    {q:"What was Paul’s letter to the Romans written for?", a:"To explain justification by faith", options:["To warn them","To explain justification by faith","To rebuke sins","To share his travels"]},
    {q:"What is the theme for the epistle written to the Romans?", a:"For therein is the righteousness of God revealed from faith to faith", options:["Redemption of Jews and Gentiles","The ministry of the message of salvation","For therein is the righteousness of God revealed from faith to faith","Ministers of the supernatural covenant"]},
    {q:"What does Paul say he would not have known without the law?", a:"Sin", options:["Sin","Faith","Grace","Hope"]},
    {q:"Who will be justified before God?", a:"Everyone who believes", options:["Only Jews","Only Gentiles","Everyone who believes","Those who follow the law only"]},
    {q:"What does Paul say about the law?", a:"It shows sin", options:["It is bad","It shows sin","It saves","It is optional"]},
    {q:"Abraham believed God, and it was counted to him as what?", a:"Righteousness", options:["Faith","Obedience","Righteousness","Sacrifice"]},
    {q:"What does Paul say about boasting?", a:"It is excluded", options:["It is encouraged","It is irrelevant","It is excluded","It is optional"]},
    {q:"Romans 1:1 says:", a:"Paul, a servant of Jesus Christ, called to be an apostle, separated unto the gospel of God", options:["I beseech you brethren...","Paul, a servant of Jesus Christ, called to be an apostle, separated unto the gospel of God","Greetings from the church in Rome","I write to you concerning your sins"]},
    {q:"What leads people to repentance according to Romans 2?", a:"God’s kindness", options:["Law alone","God’s kindness","Prophets","Tradition"]},
    {q:"How are people justified according to Romans 3?", a:"By faith", options:["By works","By faith","By ritual","By descent"]},
    {q:"We are buried with Christ through what?", a:"Baptism", options:["Sacrifices","Baptism","Prayers","Confession"]},
    {q:"What is the condition of all humans according to Romans 3?", a:"All have sinned", options:["Righteous","Partially righteous","All have sinned","Chosen only"]},
    {q:"Sin shall not have dominion over believers because:", a:"We are in Christ", options:["We are weak","We must obey","We are in Christ","We are chosen"]},
    {q:"Who is used as an example of justification by faith?", a:"Abraham", options:["Moses","David","Abraham","Peter"]},
    {q:"The wages of sin is:", a:"Death", options:["Glory","Death","Life","Forgiveness"]},
    {q:"Between the Jews and the Gentiles, which were under the power of sin?", a:"Both", options:["Jews","Gentiles","Both","None"]},
    {q:"How are people put right with God?", a:"By faith", options:["By works","By faith","By offering sacrifices","By lineage"]},
    {q:"What should believers do concerning sin?", a:"Avoid it", options:["Ignore it","Endure it","Avoid it","Celebrate it"]},
    {q:"What does Paul say about God’s judgment?", a:"It is righteous", options:["It is delayed","It is selective","It is righteous","It is optional"]},
    {q:"What dwells in Paul’s flesh?", a:"Sin", options:["Sin","Holy Spirit","Faith","Love"]},
    {q:"What results from the new life in union with Christ?", a:"Freedom", options:["Confusion","Bondage","Freedom","Uncertainty"]},
    {q:"What does Paul discuss in chapters 5–8?", a:"Life in the Spirit", options:["Israelite history","Life in the Spirit","The law","Prophetic visions"]},
    {q:"The law has dominion over a person for how long?", a:"Until death", options:["Forever","Until death","Until repentance","Until baptism"]},
    {q:"Paul describes a struggle between:", a:"Flesh and Spirit", options:["Flesh and Spirit","Prophets and Priests","Law and Gentiles","Sin and Salvation"]},
    {q:"What major issue does Paul wrestle with later in the letter?", a:"Sin nature", options:["Pride","Obedience","Sin nature","Faith"]},
    {q:"Who delivers us from this body of death?", a:"Jesus Christ", options:["Law","Sin","Jesus Christ","Prophets"]},
    {q:"The promise to Abraham came through what?", a:"Faith", options:["Works","Faith","Lineage","Sacrifice"]},
    {q:"The good that Paul wants to do, he:", a:"Fails to do", options:["Always does","Does not care","Fails to do","Forgets"]}
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function renderQuestions() {
    const container = document.getElementById("questions");
    container.innerHTML = "";
    const shuffled = shuffleArray([...questions]);
    
    shuffled.forEach((q, i) => {
        let html = `
        <div class="question" data-correct="${q.a}">
            <p>${i + 1}. ${q.q}</p>
            <div class="options">`;
        q.options.forEach(opt => {
            html += `<label><input type="radio" name="q${i}" value="${opt}" required> ${opt}</label>`;
        });
        html += `</div></div>`;
        container.innerHTML += html;
    });
}

let timerInterval;
function startTimer(duration) {
    let time = duration;
    timerInterval = setInterval(() => {
        let min = Math.floor(time / 60);
        let sec = time % 60;
        document.getElementById("timer").textContent = `Time Left: ${min}:${sec < 10 ? '0' + sec : sec}`;
        if (--time < 0) {
            clearInterval(timerInterval);
            document.getElementById("quizForm").dispatchEvent(new Event('submit'));
        }
    }, 1000);
}

document.getElementById("startBtn").addEventListener("click", () => {
    const name = document.getElementById("userName").value.trim();
    const group = document.getElementById("userGroup").value;
    if (!name || !group) { alert("Name and Leader required!"); return; }
    
    document.getElementById("landing").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    window.participantData = { name, group };
    renderQuestions();
    startTimer(15 * 60);
});

document.getElementById("quizForm").addEventListener("submit", function(e) {
    e.preventDefault(); // Stop immediate redirect
    clearInterval(timerInterval);

    let score = 0;
    let missedReport = "";
    const questionDivs = document.querySelectorAll(".question");

    questionDivs.forEach((div) => {
        const questionText = div.querySelector("p").innerText;
        const correctAnswer = div.getAttribute("data-correct");
        const selected = div.querySelector('input[type="radio"]:checked');
        const userAnswer = selected ? selected.value : "No Answer";

        if (userAnswer === correctAnswer) {
            score++;
        } else {
            missedReport += `\n❌ MISSED: ${questionText}\n   - User Answer: ${userAnswer}\n   - Correct: ${correctAnswer}\n`;
        }
    });

    const finalResult = `${score} / ${questions.length}`;
    const fullEmailContent = `
PARTICIPANT: ${window.participantData.name}
GROUP LEADER: ${window.participantData.group}
SCORE: ${finalResult}

--- MISSED QUESTIONS ---
${missedReport || "Perfect score! None missed."}
    `;

    // 1. Update form fields for the email
    const form = e.target;
    // Remove old hidden inputs if they exist
    form.querySelectorAll('.temp-input').forEach(el => el.remove());
    
    // Add new clean data
    const inputs = [
        {name: "Participant", value: window.participantData.name},
        {name: "Leader", value: window.participantData.group},
        {name: "Score", value: finalResult},
        {name: "Graded_Report", value: fullEmailContent}
    ];

    inputs.forEach(item => {
        let input = document.createElement("textarea");
        input.name = item.name;
        input.value = item.value;
        input.style.display = "none";
        input.className = "temp-input";
        form.appendChild(input);
    });

    // 2. Show INSTANT score to the participant
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <h2 style="color: #facc15">Submission Complete!</h2>
        <p style="font-size: 24px">Your Score: <strong>${finalResult}</strong></p>
        <p>Your results are being sent to ${window.participantData.group}.</p>
    `;
    window.scrollTo(0, document.body.scrollHeight);

    // 3. Final send after 3 seconds so they can read their score
    setTimeout(() => { form.submit(); }, 3500);
});
