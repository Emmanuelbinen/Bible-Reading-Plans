// Bible books with chapter counts
const bibleBooks = [
            {name: "Genesis", chapters: 50},
            {name: "Exodus", chapters: 40},
            {name: "Leviticus", chapters: 27},
            {name: "Numbers", chapters: 36},
            {name: "Deuteronomy", chapters: 34},
            {name: "Joshua", chapters: 24},
            {name: "Judges", chapters: 21},
            {name: "Ruth", chapters: 4},
            {name: "1 Samuel", chapters: 31},
            {name: "2 Samuel", chapters: 24},
            {name: "1 Kings", chapters: 22},
            {name: "2 Kings", chapters: 25},
            {name: "1 Chronicles", chapters: 29},
            {name: "2 Chronicles", chapters: 36},
            {name: "Ezra", chapters: 10},
            {name: "Nehemiah", chapters: 13},
            {name: "Esther", chapters: 10},
            {name: "Job", chapters: 42},
            {name: "Psalms", chapters: 150},
            {name: "Proverbs", chapters: 31},
            {name: "Ecclesiastes", chapters: 12},
            {name: "Song of Solomon", chapters: 8},
            {name: "Isaiah", chapters: 66},
            {name: "Jeremiah", chapters: 52},
            {name: "Lamentations", chapters: 5},
            {name: "Ezekiel", chapters: 48},
            {name: "Daniel", chapters: 12},
            {name: "Hosea", chapters: 14},
            {name: "Joel", chapters: 3},
            {name: "Amos", chapters: 9},
            {name: "Obadiah", chapters: 1},
            {name: "Jonah", chapters: 4},
            {name: "Micah", chapters: 7},
            {name: "Nahum", chapters: 3},
            {name: "Habakkuk", chapters: 3},
            {name: "Zephaniah", chapters: 3},
            {name: "Haggai", chapters: 2},
            {name: "Zechariah", chapters: 14},
            {name: "Malachi", chapters: 4},
            {name: "Matthew", chapters: 28},
            {name: "Mark", chapters: 16},
            {name: "Luke", chapters: 24},
            {name: "John", chapters: 21},
            {name: "Acts", chapters: 28},
            {name: "Romans", chapters: 16},
            {name: "1 Corinthians", chapters: 16},
            {name: "2 Corinthians", chapters: 13},
            {name: "Galatians", chapters: 6},
            {name: "Ephesians", chapters: 6},
            {name: "Philippians", chapters: 4},
            {name: "Colossians", chapters: 4},
            {name: "1 Thessalonians", chapters: 5},
            {name: "2 Thessalonians", chapters: 3},
            {name: "1 Timothy", chapters: 6},
            {name: "2 Timothy", chapters: 4},
            {name: "Titus", chapters: 3},
            {name: "Philemon", chapters: 1},
            {name: "Hebrews", chapters: 13},
            {name: "James", chapters: 5},
            {name: "1 Peter", chapters: 5},
            {name: "2 Peter", chapters: 3},
            {name: "1 John", chapters: 5},
            {name: "2 John", chapters: 1},
            {name: "3 John", chapters: 1},
            {name: "Jude", chapters: 1},
            {name: "Revelation", chapters: 22}
        ];

// This function will create chapter list with book and chapter references

function createChapterList() {
            const chapters = [];
            bibleBooks.forEach(book => {
                for (let i = 1; i <= book.chapters; i++) {
                    chapters.push(`${book.name} ${i}`);
                }
            });
            return chapters;
        }

        const allChapters = createChapterList();

function generatePlan(days, chaptersPerDay, containerId) {
    try {
        const container = document.getElementById(containerId);
        if (!container) {
            throw new Error(`Container with ID ${containerId} not found`);
        }
        
        let chapterIndex = 0;
        
        for (let day = 1; day <= days; day++) {
            const dayCard = document.createElement('div');
            dayCard.className = 'day-card';
            
            const dayNumber = document.createElement('div');
            dayNumber.className = 'day-number';
            dayNumber.textContent = `Day ${day}`;
            dayCard.appendChild(dayNumber);
            
            const readingList = document.createElement('ul');
            readingList.className = 'reading-list';
            
            let chaptersForDay = chaptersPerDay;
            if (day === days) {
                chaptersForDay = Math.min(chaptersPerDay, allChapters.length - chapterIndex);
            }
            
            const dayProgressBar = document.createElement('div');
            dayProgressBar.className = 'day-progress';
            dayProgressBar.innerHTML = `
                <div class="progress-bar">
                    <div class="progress-bar-fill" id="${containerId}-day-${day}-progress"></div>
                </div>
            `;
            dayCard.appendChild(dayProgressBar);
            
            for (let i = 0; i < chaptersForDay && chapterIndex < allChapters.length; i++) {
                const listItem = document.createElement('li');
                const chapterId = `${containerId}-day-${day}-chapter-${i}`;
                listItem.setAttribute('id', chapterId);
                listItem.textContent = allChapters[chapterIndex];
                
                if (localStorage.getItem(chapterId) === 'completed') {
                    listItem.classList.add('completed');
                }
                
                listItem.addEventListener('click', () => {
                    listItem.classList.toggle('completed');
                    if (listItem.classList.contains('completed')) {
                        localStorage.setItem(chapterId, 'completed');
                    } else {
                        localStorage.removeItem(chapterId);
                    }
                    updateDayProgress(containerId, day);
                    updateOverallProgress(containerId.replace('-content', '')); // Add this line
                });
                
                readingList.appendChild(listItem);
                chapterIndex++;
            }
            
            dayCard.appendChild(readingList);
            container.appendChild(dayCard);
            updateDayProgress(containerId, day);
        }
    } catch (error) {
        console.error('Error generating reading plan:', error);
    }
}


function updateDayProgress(containerId, day) {
    const dayProgressBar = document.getElementById(`${containerId}-day-${day}-progress`);
    const dayChapters = document.querySelectorAll(`#${containerId} li[id^="${containerId}-day-${day}-chapter"]`);
    const completedChapters = document.querySelectorAll(`#${containerId} li[id^="${containerId}-day-${day}-chapter"].completed`).length;
    
    if (dayProgressBar && dayChapters.length > 0) {
        const progress = (completedChapters / dayChapters.length) * 100;
        dayProgressBar.style.width = `${progress}%`;
    }
}

function updateDayProgress(containerId, day) {
    // ...existing updateDayProgress code...
}

function updateOverallProgress(planId) {
    const plan = document.getElementById(`${planId}-content`);
    const dayCards = plan.querySelectorAll('.day-card');
    let completedDays = 0;
    
    // Count completed days
    dayCards.forEach(dayCard => {
        const chapters = dayCard.querySelectorAll('.reading-list li');
        const completedChapters = dayCard.querySelectorAll('.reading-list li.completed');
        if (chapters.length > 0 && chapters.length === completedChapters.length) {
            completedDays++;
        }
    });
    
    // Update progress display
    const totalDays = parseInt(planId.replace('plan', ''));
    const progressSpan = document.getElementById(`${planId}-progress`);
    const progressBar = document.getElementById(`${planId}-bar`);
    
    if (progressSpan && progressBar) {
        progressSpan.textContent = `${completedDays}/${totalDays} days`;
        progressBar.style.width = `${(completedDays / totalDays) * 100}%`;
    }
}

function showPlan(planId) {
    document.querySelectorAll('.plan-section').forEach(plan => {
        plan.classList.remove('active');
    });
    document.getElementById(planId).classList.add('active');
    
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`button[onclick*="${planId}"]`).classList.add('active');
}

// Initialize plans when the page loads
window.addEventListener('load', function() {
    generatePlan(365, 5, 'plan365-content');
    generatePlan(180, 10, 'plan180-content');
    generatePlan(90, 13, 'plan90-content');
});

function updateProgress(containerId, day, chaptersPerDay) {
    // Update day progress
    const dayBar = document.getElementById(`${containerId}-day-${day}-bar`);
    const completedChapters = document.querySelectorAll(`#${containerId} #${containerId}-day-${day}-chapter-${day} .completed`).length;
    const dayProgress = (completedChapters / chaptersPerDay) * 100;
    if (dayBar) {
        dayBar.style.width = `${dayProgress}%`;
    }
    
    // Update overall progress
    const totalDays = parseInt(containerId.replace('plan', ''));
    const completedDays = document.querySelectorAll(`#${containerId} .day-card`).length;
    const progressSpan = document.getElementById(`${containerId}-progress`);
    const totalBar = document.getElementById(`${containerId}-bar`);
    if (progressSpan && totalBar) {
        progressSpan.textContent = `${completedDays}/${totalDays} days`;
        totalBar.style.width = `${(completedDays / totalDays) * 100}%`;
    }
}

// ...existing code...

// Add this function to handle plan switching
function showPlan(planId) {
    // Hide all plans
    document.querySelectorAll('.plan-section').forEach(plan => {
        plan.classList.remove('active');
    });
    // Show selected plan
    document.getElementById(planId).classList.add('active');
    
    // Remove active class from all buttons
    document.querySelectorAll('.plan-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    // Add active class to clicked button
    document.querySelector(`[onclick="showPlan('${planId}')"]`).classList.add('active');
}

// Add initialization code
window.addEventListener('load', function() {
    generatePlan(365, 5, 'plan365-content');
    generatePlan(180, 10, 'plan180-content');
    generatePlan(90, 13, 'plan90-content');
    
    // Initialize overall progress for each plan
    updateOverallProgress('plan365');
    updateOverallProgress('plan180');
    updateOverallProgress('plan90');
});