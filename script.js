// ... (Keep your questions array and shuffle functions as they were) ...

document.getElementById("quizForm").addEventListener("submit", function(e) {
    // 1. Stop the form for a split second to calculate
    e.preventDefault(); 
    clearInterval(timerInterval);

    const form = e.target;
    let score = 0;
    let report = "";
    
    // 2. Loop through questions to grade them
    // We use the 'shuffled' array if you rendered it that way, 
    // but here's a reliable way to check the inputs:
    const renderedQuestions = document.querySelectorAll(".question");
    
    renderedQuestions.forEach((div, index) => {
        const questionText = div.querySelector("p").innerText;
        const selected = div.querySelector('input[type="radio"]:checked');
        const userAnswer = selected ? selected.value : "No Answer";
        
        // Find the original question object to check the correct answer
        // This logic assumes you stored the correct answer in the dataset or a local map
        const correctValue = questions.find(q => questionText.includes(q.q)).options[questions.find(q => questionText.includes(q.q)).a.charCodeAt(0)-65];

        if (userAnswer === correctValue) {
            score++;
        } else {
            report += `❌ MISSED: ${questionText}\n   - Your Answer: ${userAnswer}\n   - Correct Answer: ${correctValue}\n\n`;
        }
    });

    // 3. Create the Final Summary for the Email
    const finalScore = `${score} / ${questions.length}`;
    const userName = document.getElementById("userName").value;
    const groupLeader = document.getElementById("userGroup").value;

    // 4. Inject hidden inputs into the form so FormSubmit receives them
    const summaryData = `
        PARTICIPANT: ${userName}
        GROUP LEADER: ${groupLeader}
        TOTAL SCORE: ${finalScore}
        
        --- DETAILED REPORT ---
        ${report || "Perfect Score! No questions missed."}
    `;

    // Add a hidden textarea so the email displays the report clearly
    const hiddenReport = document.createElement("textarea");
    hiddenReport.name = "Full_Quiz_Report";
    hiddenReport.style.display = "none";
    hiddenReport.value = summaryData;
    form.appendChild(hiddenReport);

    // Add a Score field for the email subject/summary
    const hiddenScore = document.createElement("input");
    hiddenScore.type = "hidden";
    hiddenScore.name = "Final_Score";
    hiddenScore.value = finalScore;
    form.appendChild(hiddenScore);

    // 5. Show local result to user before redirecting
    const resultDiv = document.getElementById("result");
    resultDiv.style.display = "block";
    resultDiv.innerHTML = `<h2>Well done, ${userName}!</h2><p>Your Score: ${finalScore}</p><p>Submitting results to your leader...</p>`;

    // 6. Final Submit
    setTimeout(() => {
        form.submit();
    }, 2000); // 2-second delay so user sees their score locally first
});
