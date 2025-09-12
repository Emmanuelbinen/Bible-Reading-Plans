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
            const container = document.getElementById(containerId);
            container.innerHTML = '';
            
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
                    // Last day - read remaining chapters
                    chaptersForDay = allChapters.length - chapterIndex;
                }
                
                for (let i = 0; i < chaptersForDay && chapterIndex < allChapters.length; i++) {
                    const listItem = document.createElement('li');
                    listItem.textContent = allChapters[chapterIndex];
                    readingList.appendChild(listItem);
                    chapterIndex++;
                }
                
                dayCard.appendChild(readingList);
                container.appendChild(dayCard);
                
                if (chapterIndex >= allChapters.length) break;
            }
        }

        function showPlan(planId) {
            // Hide all plans
            document.querySelectorAll('.plan-section').forEach(section => {
                section.classList.remove('active');
            });
            
            // Remove active class from all buttons
            document.querySelectorAll('.plan-btn').forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Show selected plan
            document.getElementById(planId).classList.add('active');
            
            // Add active class to clicked button
            event.target.classList.add('active');
        }

        // Generate all plans when page loads
        window.addEventListener('load', function() {
            generatePlan(365, 5, 'plan365-content'); // ~3.26 chapters per day, rounded to 5
            generatePlan(180, 10, 'plan180-content'); // ~6.6 chapters per day, rounded to 10
            generatePlan(90, 13, 'plan90-content'); // ~13.2 chapters per day
        });