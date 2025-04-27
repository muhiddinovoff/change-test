// Backend API URL
const API_URL = 'http://localhost:3000';

// Elements
const landingPage = document.getElementById('landingPage');
const creatorOptions = document.getElementById('creatorOptions');
const loginCreatorButton = document.getElementById('loginCreator');
const registerCreatorButton = document.getElementById('registerCreator');
const backToHomeFromCreatorOptions = document.getElementById('backToHomeFromCreatorOptions');
const userIdSection = document.getElementById('userIdSection');
const userIdInput = document.getElementById('userId');
const submitUserIdButton = document.getElementById('submitUserId');
const userIdError = document.getElementById('userIdError');
const backToHomeFromUserId = document.getElementById('backToHomeFromUserId');
const createTestForm = document.getElementById('createTestForm');
const answerKeyForm = document.getElementById('answerKeyForm');
const generatedTestId = document.getElementById('generatedTestId');
const startTimeInput = document.getElementById('startTime');
const endTimeInput = document.getElementById('endTime');
const resultsView = document.getElementById('resultsView');
const resultsList = document.getElementById('resultsList');
const backToHomeFromCreateTest = document.getElementById('backToHomeFromCreateTest');
const userInfoSection = document.getElementById('userInfoSection');
const firstNameInput = document.getElementById('firstName');
const lastNameInput = document.getElementById('lastName');
const submitUserInfoButton = document.getElementById('submitUserInfo');
const userInfoError = document.getElementById('userInfoError');
const backToHomeFromUserInfo = document.getElementById('backToHomeFromUserInfo');
const testIdSection = document.getElementById('testIdSection');
const testIdInput = document.getElementById('testId');
const submitTestIdButton = document.getElementById('submitTestId');
const testIdError = document.getElementById('testIdError');
const timeError = document.getElementById('timeError');
const quizForm = document.getElementById('quizForm');
const submitQuizButton = document.getElementById('submitQuizButton');
const backToHomeFromQuiz = document.getElementById('backToHomeFromQuiz');
const resultScreen = document.getElementById('resultScreen');
const resultSummary = document.getElementById('resultSummary');
const backToHomeFromResult = document.getElementById('backToHomeFromResult');
const createTestButton = document.getElementById('createTest');
const takeTestButton = document.getElementById('takeTest');

// Function to return to landing page
function returnToHome() {
    creatorOptions.classList.add('hidden');
    userIdSection.classList.add('hidden');
    createTestForm.classList.add('hidden');
    userInfoSection.classList.add('hidden');
    testIdSection.classList.add('hidden');
    quizForm.classList.add('hidden');
    resultScreen.classList.add('hidden');
    landingPage.classList.remove('hidden');
}

// Back to home button event listeners
backToHomeFromCreatorOptions.addEventListener('click', returnToHome);
backToHomeFromUserId.addEventListener('click', returnToHome);
backToHomeFromCreateTest.addEventListener('click', returnToHome);
backToHomeFromUserInfo.addEventListener('click', returnToHome);
backToHomeFromTestId.addEventListener('click', returnToHome);
backToHomeFromQuiz.addEventListener('click', returnToHome);
backToHomeFromResult.addEventListener('click', returnToHome);

// Generate unique Test ID
function generateTestId() {
    return 'TEST-' + Math.random().toString(36).substr(2, 9).toUpperCase();
}

// Get current time in Tashkent (UTC+5)
function getTashkentTime() {
    const now = new Date();
    const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
    const tashkentTime = new Date(utcTime + (5 * 3600000)); // UTC+5
    return tashkentTime;
}

// Display test results for creator
async function displayTestResults() {
    resultsList.innerHTML = '';
    const testId = generatedTestId.textContent;
    try {
        const response = await fetch(`${API_URL}/tests/${testId}/results`);
        const results = await response.json();
        if (!response.ok) {
            throw new Error('Failed to fetch results');
        }
        if (results.length === 0) {
            resultsList.innerHTML = '<p class="text-gray-600">Hozircha natijalar yo\'q.</p>';
            return;
        }
        results.forEach(result => {
            resultsList.innerHTML += `
                <div class="bg-white p-6 rounded-lg shadow-md">
                    <p class="text-gray-600">Ism: ${result.firstName} ${result.lastName}, Bal: ${result.score}/75, Natija: ${result.grade}</p>
                </div>
            `;
        });
    } catch (error) {
        resultsList.innerHTML = '<p class="text-red-600">Natijalarni yuklashda xatolik yuz berdi.</p>';
    }
}

// Generate Create Test form
// Questions 1-32 (4 options)
const createQuestions1to32Div = document.getElementById('createQuestions1to32');
for (let i = 1; i <= 32; i++) {
    createQuestions1to32Div.innerHTML += `
        <div class="bg-white p-6 rounded-lg shadow-md fade-in">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Savol ${i} uchun to'g'ri javob</h3>
            <div class="flex space-x-4">
                <div class="answer-option">
                    <input type="radio" id="key${i}A" name="key${i}" value="A">
                    <label for="key${i}A">A</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="key${i}B" name="key${i}" value="B">
                    <label for="key${i}B">B</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="key${i}C" name="key${i}" value="C">
                    <label for="key${i}C">C</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="key${i}D" name="key${i}" value="D">
                    <label for="key${i}D">D</label>
                </div>
            </div>
        </div>
    `;
}

// Questions 33-35 (6 options)
const createQuestions33to35Div = document.getElementById('createQuestions33to35');
for (let i = 33; i <= 35; i++) {
    createQuestions33to35Div.innerHTML += `
        <div class="bg-white p-6 rounded-lg shadow-md fade-in">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Savol ${i} uchun to'g'ri javob</h3>
            <div class="flex space-x-4">
                <div class="answer-option">
                    <input type="radio" id="key${i}A" name="key${i}" value="A">
                    <label for="key${i}A">A</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="key${i}B" name="key${i}" value="B">
                    <label for="key${i}B">B</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="key${i}C" name="key${i}" value="C">
                    <label for="key${i}C">C</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="key${i}D" name="key${i}" value="D">
                    <label for="key${i}D">D</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="key${i}E" name="key${i}" value="E">
                    <label for="key${i}E">E</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="key${i}F" name="key${i}" value="F">
                    <label for="key${i}F">F</label>
                </div>
            </div>
        </div>
    `;
}

// Questions 36-45 (text input for a and b parts)
const createQuestions36to45Div = document.getElementById('createQuestions36to45');
for (let i = 36; i <= 45; i++) {
    createQuestions36to45Div.innerHTML += `
        <div class="bg-white p-6 rounded-lg shadow-md fade-in">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Savol ${i} uchun to'g'ri javob</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-600 mb-1">a) qism:</label>
                    <input type="text" name="key${i}a" placeholder="To'g'ri javobni kiriting" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-answer-option">
                </div>
                <div>
                    <label class="block text-gray-600 mb-1">b) qism:</label>
                    <input type="text" name="key${i}b" placeholder="To'g'ri javobni kiriting" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-answer-option">
                </div>
            </div>
        </div>
    `;
}

// Generate Quiz form
// Questions 1-32 (4 options)
const questions1to32Div = document.getElementById('questions1to32');
for (let i = 1; i <= 32; i++) {
    questions1to32Div.innerHTML += `
        <div class="question bg-white p-6 rounded-lg shadow-md fade-in">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Savol ${i}</h3>
            <div class="flex space-x-4">
                <div class="answer-option">
                    <input type="radio" id="q${i}A" name="q${i}" value="A">
                    <label for="q${i}A">A</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="q${i}B" name="q${i}" value="B">
                    <label for="q${i}B">B</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="q${i}C" name="q${i}" value="C">
                    <label for="q${i}C">C</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="q${i}D" name="q${i}" value="D">
                    <label for="q${i}D">D</label>
                </div>
            </div>
        </div>
    `;
}

// Questions 33-35 (6 options)
const questions33to35Div = document.getElementById('questions33to35');
for (let i = 33; i <= 35; i++) {
    questions33to35Div.innerHTML += `
        <div class="question bg-white p-6 rounded-lg shadow-md fade-in">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Savol ${i}</h3>
            <div class="flex space-x-4">
                <div class="answer-option">
                    <input type="radio" id="q${i}A" name="q${i}" value="A">
                    <label for="q${i}A">A</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="q${i}B" name="q${i}" value="B">
                    <label for="q${i}B">B</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="q${i}C" name="q${i}" value="C">
                    <label for="q${i}C">C</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="q${i}D" name="q${i}" value="D">
                    <label for="q${i}D">D</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="q${i}E" name="q${i}" value="E">
                    <label for="q${i}E">E</label>
                </div>
                <div class="answer-option">
                    <input type="radio" id="q${i}F" name="q${i}" value="F">
                    <label for="q${i}F">F</label>
                </div>
            </div>
        </div>
    `;
}

// Questions 36-45 (text input for a and b parts)
const questions36to45Div = document.getElementById('questions36to45');
for (let i = 36; i <= 45; i++) {
    questions36to45Div.innerHTML += `
        <div class="question bg-white p-6 rounded-lg shadow-md fade-in">
            <h3 class="text-xl font-semibold text-gray-700 mb-4">Savol ${i}</h3>
            <div class="space-y-4">
                <div>
                    <label class="block text-gray-600 mb-1">a) qism:</label>
                    <textarea name="q${i}a" placeholder="Javobingizni kiriting" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-answer-option"></textarea>
                </div>
                <div>
                    <label class="block text-gray-600 mb-1">b) qism:</label>
                    <textarea name="q${i}b" placeholder="Javobingizni kiriting" class="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-answer-option"></textarea>
                </div>
            </div>
        </div>
    `;
}

// Handle Create Test button
createTestButton.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    creatorOptions.classList.remove('hidden');
});

// Handle "Foydalanuvchi Orqali Kirish" button
loginCreatorButton.addEventListener('click', () => {
    creatorOptions.classList.add('hidden');
    userIdSection.classList.remove('hidden');
});

// Handle User ID submission
submitUserIdButton.addEventListener('click', () => {
    const userId = userIdInput.value.trim();
    if (userId === 'Ad1267') {
        userIdSection.classList.add('hidden');
        createTestForm.classList.remove('hidden');
        userIdError.classList.add('hidden');
        // Generate and display Test ID
        const testId = generateTestId();
        generatedTestId.textContent = testId;
        // Show results view
        resultsView.classList.remove('hidden');
        displayTestResults();
    } else {
        userIdError.classList.remove('hidden');
    }
});

// Handle Answer Key submission
answerKeyForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const testId = generatedTestId.textContent;
    const startTime = startTimeInput.value;
    const endTime = endTimeInput.value;

    // Validate start and end times
    if (!startTime || !endTime) {
        alert("Iltimos, testning boshlanish va tugash vaqtini kiriting!");
        return;
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);
    if (startDate >= endDate) {
        alert("Tugash vaqti boshlanish vaqtidan keyin bo'lishi kerak!");
        return;
    }

    const correctAnswers = {};

    // Collect answers for questions 1-35 (multiple choice)
    for (let i = 1; i <= 35; i++) {
        const selected = answerKeyForm.querySelector(`input[name="key${i}"]:checked`);
        if (selected) {
            correctAnswers[`q${i}`] = selected.value;
        }
    }

    // Collect answers for questions 36-45 (text input)
    for (let i = 36; i <= 45; i++) {
        const answerA = answerKeyForm.querySelector(`input[name="key${i}a"]`).value.trim();
        const answerB = answerKeyForm.querySelector(`input[name="key${i}b"]`).value.trim();
        if (answerA) correctAnswers[`q${i}a`] = answerA.toUpperCase();
        if (answerB) correctAnswers[`q${i}b`] = answerB.toUpperCase();
    }

    // Generate scoring for questions 1-32
    const questionIndices = Array.from({ length: 32 }, (_, i) => i + 1);
    const shuffledIndices = questionIndices.sort(() => Math.random() - 0.5);
    const lowScoreQuestions = shuffledIndices.slice(0, 10); // 10 questions at 0.975 points
    const highScoreQuestions = shuffledIndices.slice(10); // 22 questions at 1.65 points

    const scoring = {};
    lowScoreQuestions.forEach(q => { scoring[`q${q}`] = 0.975; });
    highScoreQuestions.forEach(q => { scoring[`q${q}`] = 1.65; });

    // Save to backend
    try {
        const response = await fetch(`${API_URL}/tests`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                testId,
                answers: correctAnswers,
                startTime,
                endTime,
                scoring
            })
        });
        const result = await response.json();
        if (!response.ok) {
            throw new Error(result.error || 'Failed to save test');
        }
        // Show confirmation and return to landing page
        alert(`Javob kaliti ${testId} ID bilan muvaffaqiyatli saqlandi!\nTest vaqti: ${startDate.toLocaleString('uz-UZ')} dan ${endDate.toLocaleString('uz-UZ')} gacha`);
        createTestForm.classList.add('hidden');
        landingPage.classList.remove('hidden');
    } catch (error) {
        alert('Testni saqlashda xatolik yuz berdi: ' + error.message);
    }
});

// Handle Take Test button
takeTestButton.addEventListener('click', () => {
    landingPage.classList.add('hidden');
    userInfoSection.classList.remove('hidden');
});

// Handle User Info submission
submitUserInfoButton.addEventListener('click', () => {
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    if (firstName && lastName) {
        userInfoSection.classList.add('hidden');
        testIdSection.classList.remove('hidden');
        userInfoError.classList.add('hidden');
        // Store user info for quiz submission
        quizForm.dataset.firstName = firstName;
        quizForm.dataset.lastName = lastName;
    } else {
        userInfoError.classList.remove('hidden');
    }
});

// Handle Test ID submission with time validation
submitTestIdButton.addEventListener('click', async () => {
    const testId = testIdInput.value.trim();
    try {
        const response = await fetch(`${API_URL}/tests/${testId}`);
        const testData = await response.json();
        if (!response.ok) {
            throw new Error(testData.error || 'Test not found');
        }

        const { startTime, endTime } = testData;
        const currentTime = getTashkentTime();
        const startDate = new Date(startTime);
        const endDate = new Date(endTime);

        if (currentTime < startDate || currentTime > endDate) {
            timeError.classList.remove('hidden');
            testIdError.classList.add('hidden');
            return;
        }

        testIdSection.classList.add('hidden');
        quizForm.classList.remove('hidden');
        testIdError.classList.add('hidden');
        timeError.classList.add('hidden');
        // Store current Test ID for quiz submission
        quizForm.dataset.testId = testId;
    } catch (error) {
        testIdError.classList.remove('hidden');
        testIdError.textContent = error.message;
        timeError.classList.add('hidden');
    }
});

// Function to check if all questions are answered
function checkAllQuestionsAnswered() {
    let allAnswered = true;

    // Check questions 1-35 (multiple choice)
    for (let i = 1; i <= 35; i++) {
        const selected = quizForm.querySelector(`input[name="q${i}"]:checked`);
        if (!selected) {
            allAnswered = false;
            break;
        }
    }

    // Check questions 36-45 (text input for a and b parts)
    for (let i = 36; i <= 45; i++) {
        const answerA = quizForm.querySelector(`textarea[name="q${i}a"]`).value.trim();
        const answerB = quizForm.querySelector(`textarea[name="q${i}b"]`).value.trim();
        if (!answerA || !answerB) {
            allAnswered = false;
            break;
        }
    }

    // Enable or disable the submit button
    if (allAnswered) {
        submitQuizButton.disabled = false;
        submitQuizButton.classList.remove('opacity-50', 'cursor-not-allowed');
    } else {
        submitQuizButton.disabled = true;
        submitQuizButton.classList.add('opacity-50', 'cursor-not-allowed');
    }
}

// Add event listener to quiz form to check answers on change
quizForm.addEventListener('change', checkAllQuestionsAnswered);
quizForm.addEventListener('input', checkAllQuestionsAnswered);

// Form submission for quiz
quizForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const testId = quizForm.dataset.testId;
    const firstName = quizForm.dataset.firstName;
    const lastName = quizForm.dataset.lastName;

    // Fetch test data from backend
    try {
        const response = await fetch(`${API_URL}/tests/${testId}`);
        const testData = await response.json();
        if (!response.ok) {
            throw new Error(testData.error || 'Test not found');
        }

        const correctAnswers = testData.answers || {};
        const scoring = testData.scoring || {};
        let score = 0;

        // Calculate score for questions 1-32 (multiple choice with varied scoring)
        for (let i = 1; i <= 32; i++) {
            const selected = quizForm.querySelector(`input[name="q${i}"]:checked`);
            if (selected && correctAnswers[`q${i}`] && selected.value === correctAnswers[`q${i}`]) {
                score += scoring[`q${i}`] || 0;
            }
        }

        // Calculate score for questions 33-35 (1.65 points each)
        for (let i = 33; i <= 35; i++) {
            const selected = quizForm.querySelector(`input[name="q${i}"]:checked`);
            if (selected && correctAnswers[`q${i}`] && selected.value === correctAnswers[`q${i}`]) {
                score += 1.65;
            }
        }

        // Calculate score for questions 36-45 (text input, 1.125 for a, 1.275 for b)
        for (let i = 36; i <= 45; i++) {
            const answerA = quizForm.querySelector(`textarea[name="q${i}a"]`).value.trim().toUpperCase();
            const answerB = quizForm.querySelector(`textarea[name="q${i}b"]`).value.trim().toUpperCase();
            if (answerA && correctAnswers[`q${i}a`] && answerA === correctAnswers[`q${i}a`]) {
                score += 1.125;
            }
            if (answerB && correctAnswers[`q${i}b`] && answerB === correctAnswers[`q${i}b`]) {
                score += 1.275;
            }
        }

        // Round score to 2 decimal places for display
        score = Math.round(score * 100) / 100;

        // Calculate grade
        let grade = '';
        if (score >= 70) grade = 'A+';
        else if (score >= 65) grade = 'A';
        else if (score >= 60) grade = 'B+';
        else if (score >= 55) grade = 'B';
        else if (score >= 50) grade = 'C+';
        else if (score >= 45) grade = 'C';
        else grade = 'Sertifikat berilmadi';

        // Submit result to backend
        const resultResponse = await fetch(`${API_URL}/tests/${testId}/results`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ firstName, lastName, score, grade })
        });
        const resultData = await resultResponse.json();
        if (!resultResponse.ok) {
            throw new Error(resultData.error || 'Failed to submit result');
        }

        // Hide the quiz form and show the result screen
        quizForm.classList.add('hidden');
        resultScreen.classList.remove('hidden');

        // Display result summary (only total score and grade)
        resultSummary.innerHTML = `
            <p class="text-2xl font-bold text-indigo-600">Sizning balingiz: ${score}/75</p>
            <p class="text-xl mt-2">Natija: <span class="${grade.includes('Sertifikat') ? 'text-red-600' : 'text-green-600'}">${grade}</span></p>
        `;
    } catch (error) {
        alert('Testni topshirishda xatolik yuz berdi: ' + error.message);
    }
});