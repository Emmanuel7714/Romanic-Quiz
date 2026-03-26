// 1. QUESTIONS ARRAY
let questions = [
    {q:"Being justified by faith, we have what with God?", a:"C", options:["Enmity","Partial peace","Peace","Uncertainty"]},
    {q:"What does the book of Romans contain according to the introduction?", a:"B", options:["Rules for the Gentiles","The gospel of God concerning salvation","A history of Israel","Paul's personal testimony"]},
    {q:"What was Paul’s letter to the Romans written for?", a:"B", options:["To warn them","To explain justification by faith","To rebuke sins","To share his travels"]},
    {q:"What is the theme for the epistle written to the Romans?", a:"C", options:["Redemption of Jews and Gentiles","The ministry of the message of salvation","For therein is the righteousness of God revealed from faith to faith","Ministers of the supernatural covenant"]},
    {q:"What does Paul say he would not have known without the law?", a:"A", options:["Sin","Faith","Grace","Hope"]},
    {q:"Who will be justified before God?", a:"C", options:["Only Jews","Only Gentiles","Everyone who believes","Those who follow the law only"]},
    {q:"What does Paul say about the law?", a:"B", options:["It is bad","It shows sin","It saves","It is optional"]},
    {q:"Abraham believed God, and it was counted to him as what?", a:"C", options:["Faith","Obedience","Righteousness","Sacrifice"]},
    {q:"What does Paul say about boasting?", a:"C", options:["It is encouraged","It is irrelevant","It is excluded","It is optional"]},
    {q:"Romans 1:1 says:", a:"B", options:["I beseech you brethren, writing this epistle to you, even though I dwell behind bars","Paul, a servant of Jesus Christ, called to be an apostle, separated unto the gospel of God","Greetings from the church in Rome","I write to you concerning your sins"]},
    {q:"What leads people to repentance according to Romans 2?", a:"B", options:["Law alone","God’s kindness","Prophets","Tradition"]},
    {q:"How are people justified according to Romans 3?", a:"B", options:["By works","By faith","By ritual","By descent"]},
    {q:"We are buried with Christ through what?", a:"B", options:["Sacrifices","Baptism","Prayers","Confession"]},
    {q:"What is the condition of all humans according to Romans 3?", a:"C", options:["Righteous","Partially righteous","All have sinned","Chosen only"]},
    {q:"Sin shall not have dominion over believers because:", a:"C", options:["We are weak","We must obey","We are in Christ","We are chosen"]},
    {q:"Who is used as an example of justification by faith?", a:"C", options:["Moses","David","Abraham","Peter"]},
    {q:"The wages of sin is:", a:"B", options:["Glory","Death","Life","Forgiveness"]},
    {q:"Between the Jews and the Gentiles, which were under the power of sin before Paul's ministry?", a:"C", options:["Jews","Gentiles","Both","None"]},
    {q:"How are people put right with God according to the passage?", a:"B", options:["By works","By faith","By offering sacrifices","By lineage"]},
    {q:"What should believers do concerning sin?", a:"C", options:["Ignore it","Endure it","Avoid it","Celebrate it"]},
    {q:"What does Paul say about God’s judgment?", a:"C", options:["It is delayed","It is selective","It is righteous","It is optional"]},
    {q:"What dwells in Paul’s flesh?", a:"A", options:["Sin","Holy Spirit","Faith","Love"]},
    {q:"What results from the new life in union with Christ?", a:"C", options:["Confusion","Bondage","Freedom","Uncertainty"]},
    {q:"What does Paul discuss in chapters 5–8?", a:"B", options:["Israelite history","Life in the Spirit","The law","Prophetic visions"]},
    {q:"The law has dominion over a person for how long?", a:"B", options:["Forever","Until death","Until repentance","Until baptism"]},
    {q:"Paul describes a struggle between:", a:"A", options:["Flesh and Spirit","Prophets and Priests","Law and Gentiles","Sin and Salvation"]},
    {q:"What major issue does Paul wrestle with later in the letter?", a:"C", options:["Pride","Obedience","Sin nature","Faith"]},
    {q:"Who delivers us from this body of death?", a:"C", options:["Law","Sin","Jesus Christ","Prophets"]},
    {q:"The promise to Abraham came through what?", a:"B", options:["Works","Faith","Lineage","Sacrifice"]},
    {q:"The good that Paul wants to do, he:", a:"C", options:["Always does","Does not care","Fails to do","Forgets"]}
];

// 2. SHUFFLE FUNCTION
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// 3. RENDER QUESTIONS (Fixed with data-correct attribute)
function renderQuestions() {
    const container = document.getElementById("questions");
    container.innerHTML = "";
    const shuffledQuestions = shuffleArray([...questions]);
    
    shuffledQuestions.forEach((q, i) => {
        const correctValue = q.options[q.a.charCodeAt(0) - 65];
        let html = `
            <div class="question" id="Q${i + 1}" data-correct="${correctValue}">
                <p><strong>${i + 1}. ${q.q}</strong></p>
        `;
        
        q.options.forEach(opt => {
            html += `
                <label>
                    <input type="radio" name="Q${i + 1}" value="${opt}" required> ${opt}
                </label>
            `;
        });
        
        html += `<input type="hidden" name="Answer_Q${i + 1}" value="">`;
        html += `</div>`;
        container.innerHTML += html;
    });
}

// 4. TIMER LOGIC
let timerInterval;
function startTimer(duration) {
    let time = duration, minutes, seconds;
    timerInterval = setInterval(() => {
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        document.getElementById("timer").textContent = `Time Left: ${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
        if (--time < 0) {
            clearInterval(timerInterval);
            document.getElementById("quizForm").submit();
        }
    }, 1000);
}

// 5. START BUTTON EVENT
document.getElementById("startBtn").addEventListener("click", () => {
    const name = document.getElementById("userName").value.trim();
    const group = document.getElementById("userGroup").value;
    
    if (!name || !group) { 
        alert("Please enter your name and select a group leader"); 
        return; 
    }
    
    document.getElementById("landing").style.display = "none";
    document.getElementById("quiz").style.display = "block";
    window.quizUser = { name, group };
    
    renderQuestions();
    startTimer(15 * 60);
    
    // Append user details for FormSubmit
    const form = document.getElementById("quizForm");
    const nameInput = document.createElement("input");
    nameInput.type = "hidden";
    nameInput.name = "STUDENT_NAME";
    nameInput.value = name;
    form.appendChild(nameInput);

    const groupInput = document.createElement("input");
    groupInput.type = "hidden";
    groupInput.name = "GROUP_LEADER";
    groupInput.value = group;
    form.appendChild(groupInput);
});

// 6. FORM SUBMIT EVENT (Calculates score and sends Gmail Report)
document.getElementById("quizForm").addEventListener("submit", function(e) {
    e.preventDefault(); 
    clearInterval(timerInterval);
    
    const form = e.target;
    let score = 0;
    const totalQuestions = questions.length;

    // Calculate score based on the shuffled layout
    const questionContainers = form.querySelectorAll(".question");
    questionContainers.forEach((container) => {
        const questionId = container.id;
        const correctAnswer = container.getAttribute("data-correct");
        const selectedOption = form.querySelector(`input[name="${questionId}"]:checked`);
        
        // Save the chosen answer to the hidden field for the email report
        const hiddenInput = container.querySelector('input[type="hidden"]');
        if (hiddenInput) {
            hiddenInput.value = selectedOption ? selectedOption.value : "No Answer";
        }

        if (selectedOption && selectedOption.value === correctAnswer) {
            score++;
        }
    });

    // Add final score to the email report
    let scoreInput = form.querySelector('input[name="FINAL_SCORE"]');
    if (!scoreInput) {
        scoreInput = document.createElement("input");
        scoreInput.type = "hidden";
        scoreInput.name = "FINAL_SCORE";
        form.appendChild(scoreInput);
    }
    scoreInput.value = `${score} / ${totalQuestions}`;

    // Show result to the student on the screen
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `
        <div style="background: #2563eb; padding: 20px; border-radius: 10px; margin-top: 20px;">
            <h2>Submission Successful!</h2>
            <p><strong>Student:</strong> ${window.quizUser.name}</p>
            <p style="font-size: 24px; color: #facc15;"><strong>Score: ${score} / ${totalQuestions}</strong></p>
            <p>Please wait while we record your results...</p>
        </div>
    `;

    // Final Submission to FormSubmit after 4 seconds
    setTimeout(() => {
        form.method = "POST";
        form.submit();
    }, 4000);
});
                              
