const STORAGE_KEY = "life-command-center-v1";
const FILE_DB = "life-command-center-files";
const CREDENTIAL_VAULT_KEY = "fahimos-credential-vault-v1";
const VAULT_KDF_ITERATIONS = 310000;
const RECOVERY_STATE_KEY = "fahimos-last-recoverable-state-v1";
const DUPLICATE_CLEANUP_BACKUP_KEY = "fahimos_duplicate_cleanup_backup";
const LAYOUT_V4_KEY = "fahimos_layout_v4";
const LAYOUT_BACKUP_V4_KEY = "fahimos_layout_backup_v4";
const THEME_V4_KEY = "fahimos_theme_v4";
const LIVE_THEME_V4_KEY = "fahimos_live_theme_v4";
const HIDDEN_WIDGETS_V4_KEY = "fahimos_hidden_widgets_v4";
const CUSTOMIZE_V4_KEY = "fahimos_customize_v4";

const prayers = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
const salahGuide = {
  Fajr: { obligatory: 2, sunnahBefore: 2, sunnahAfter: 0, recitation: "Recite aloud in both obligatory rak'ahs." },
  Dhuhr: { obligatory: 4, sunnahBefore: 4, sunnahAfter: 2, recitation: "Recite quietly in all four obligatory rak'ahs." },
  Asr: { obligatory: 4, sunnahBefore: 4, sunnahAfter: 0, recitation: "Recite quietly in all four obligatory rak'ahs." },
  Maghrib: { obligatory: 3, sunnahBefore: 0, sunnahAfter: 2, recitation: "Recite aloud in the first two obligatory rak'ahs and quietly in the third." },
  Isha: { obligatory: 4, sunnahBefore: 0, sunnahAfter: 2, recitation: "Recite aloud in the first two obligatory rak'ahs and quietly in the last two. Witr follows later." }
};
const islamicToolkitWisdom = [
  "The most beloved deeds to Allah are those maintained consistently, even when small.",
  "Make intention before action: worship, service, learning, and honest provision can reinforce one another.",
  "A strong Muslim repairs mistakes quickly, protects people from harm, and keeps returning to Allah."
];
const quranVerses = [
  { ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "So surely with hardship comes ease.", ref: "Quran 94:5" },
  { ar: "وَقُل رَّبِّ زِدْنِي عِلْمًا", en: "And say, My Lord, increase me in knowledge.", ref: "Quran 20:114" },
  { ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", en: "Surely in the remembrance of Allah do hearts find comfort.", ref: "Quran 13:28" },
  { ar: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", en: "Whoever is mindful of Allah, He will make a way out for them.", ref: "Quran 65:2" },
  { ar: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", en: "Allah does not require of any soul more than what it can afford.", ref: "Quran 2:286" }
];

const quranVerseBank = [
  { ar: "فَإِنَّ مَعَ الْعُسْرِ يُسْرًا", en: "So surely with hardship comes ease.", ref: "Quran 94:5" },
  { ar: "وَقُل رَّبِّ زِدْنِي عِلْمًا", en: "And say, My Lord, increase me in knowledge.", ref: "Quran 20:114" },
  { ar: "أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ", en: "Surely in the remembrance of Allah do hearts find comfort.", ref: "Quran 13:28" },
  { ar: "وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا", en: "Whoever is mindful of Allah, He will make a way out for them.", ref: "Quran 65:2" },
  { ar: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا", en: "Allah does not require of any soul more than what it can afford.", ref: "Quran 2:286" }
];

const surahs = [
  "Al-Fatihah الفاتحة","Al-Baqarah البقرة","Ali Imran آل عمران","An-Nisa النساء","Al-Maidah المائدة","Al-Anam الأنعام","Al-Araf الأعراف","Al-Anfal الأنفال","At-Tawbah التوبة","Yunus يونس","Hud هود","Yusuf يوسف","Ar-Rad الرعد","Ibrahim إبراهيم","Al-Hijr الحجر","An-Nahl النحل","Al-Isra الإسراء","Al-Kahf الكهف","Maryam مريم","Taha طه","Al-Anbiya الأنبياء","Al-Hajj الحج","Al-Muminun المؤمنون","An-Nur النور","Al-Furqan الفرقان","Ash-Shuara الشعراء","An-Naml النمل","Al-Qasas القصص","Al-Ankabut العنكبوت","Ar-Rum الروم","Luqman لقمان","As-Sajdah السجدة","Al-Ahzab الأحزاب","Saba سبأ","Fatir فاطر","Ya-Sin يس","As-Saffat الصافات","Sad ص","Az-Zumar الزمر","Ghafir غافر","Fussilat فصلت","Ash-Shuraa الشورى","Az-Zukhruf الزخرف","Ad-Dukhan الدخان","Al-Jathiyah الجاثية","Al-Ahqaf الأحقاف","Muhammad محمد","Al-Fath الفتح","Al-Hujurat الحجرات","Qaf ق","Adh-Dhariyat الذاريات","At-Tur الطور","An-Najm النجم","Al-Qamar القمر","Ar-Rahman الرحمن","Al-Waqiah الواقعة","Al-Hadid الحديد","Al-Mujadila المجادلة","Al-Hashr الحشر","Al-Mumtahanah الممتحنة","As-Saff الصف","Al-Jumuah الجمعة","Al-Munafiqun المنافقون","At-Taghabun التغابن","At-Talaq الطلاق","At-Tahrim التحريم","Al-Mulk الملك","Al-Qalam القلم","Al-Haqqah الحاقة","Al-Maarij المعارج","Nuh نوح","Al-Jinn الجن","Al-Muzzammil المزمل","Al-Muddaththir المدثر","Al-Qiyamah القيامة","Al-Insan الإنسان","Al-Mursalat المرسلات","An-Naba النبأ","An-Naziat النازعات","Abasa عبس","At-Takwir التكوير","Al-Infitar الانفطار","Al-Mutaffifin المطففين","Al-Inshiqaq الانشقاق","Al-Buruj البروج","At-Tariq الطارق","Al-Ala الأعلى","Al-Ghashiyah الغاشية","Al-Fajr الفجر","Al-Balad البلد","Ash-Shams الشمس","Al-Layl الليل","Ad-Duha الضحى","Ash-Sharh الشرح","At-Tin التين","Al-Alaq العلق","Al-Qadr القدر","Al-Bayyinah البينة","Az-Zalzalah الزلزلة","Al-Adiyat العاديات","Al-Qariah القارعة","At-Takathur التكاثر","Al-Asr العصر","Al-Humazah الهمزة","Al-Fil الفيل","Quraysh قريش","Al-Maun الماعون","Al-Kawthar الكوثر","Al-Kafirun الكافرون","An-Nasr النصر","Al-Masad المسد","Al-Ikhlas الإخلاص","Al-Falaq الفلق","An-Nas الناس"
].map((name, index) => ({ number: index + 1, name }));
const quranSurahCache = new Map();

const javaModules = [
  { title: "1. Setup and First Program", body: "Install a JDK, understand files, classes, main method, printing, comments, and how Java runs from source code to bytecode.", code: "public class Main {\n  public static void main(String[] args) {\n    System.out.println(\"Assalamu alaikum, Java!\");\n  }\n}", practice: "Change the message, print your name, school, favorite subject, and today's study goal.", project: "Make a personal introduction program with 5 printed lines." },
  { title: "2. Variables, Types, and Operators", body: "Learn int, double, boolean, char, String, assignment, arithmetic, comparison, and logical operators.", code: "int minutes = 45;\ndouble gpa = 3.8;\nboolean studiedToday = true;\nString subject = \"Math\";\nSystem.out.println(subject + \": \" + minutes + \" minutes\");", practice: "Create variables for income, expense, and balance. Print the result.", project: "Build a tiny money calculator." },
  { title: "3. Input and Strings", body: "Use Scanner, read user input, combine strings, compare strings correctly, and format output.", code: "import java.util.Scanner;\n\nScanner input = new Scanner(System.in);\nSystem.out.print(\"Name: \");\nString name = input.nextLine();\nSystem.out.println(\"Welcome, \" + name);", practice: "Ask for name, age, school, and goal. Print a profile card.", project: "Build a profile form in the console." },
  { title: "4. If, Else, and Switch", body: "Make decisions with if, else if, else, nested conditions, switch expressions, and boolean logic.", code: "int score = 88;\nif (score >= 90) {\n  System.out.println(\"A\");\n} else if (score >= 80) {\n  System.out.println(\"B\");\n} else {\n  System.out.println(\"Keep working\");\n}", practice: "Write logic that checks if a prayer, assignment, or workout is complete.", project: "Build a grade letter calculator." },
  { title: "5. Loops", body: "Use for, while, do-while, break, continue, counters, accumulators, and nested loops.", code: "for (int day = 1; day <= 7; day++) {\n  System.out.println(\"Day \" + day + \": study Java\");\n}", practice: "Print a 7-day study schedule with a loop.", project: "Build a habit streak counter." },
  { title: "6. Methods", body: "Create reusable logic with parameters, return values, overloads, scope, and clean method names.", code: "static double average(double a, double b, double c) {\n  return (a + b + c) / 3;\n}", practice: "Write methods for average, tax, and minutes-to-hours.", project: "Refactor your grade calculator into methods." },
  { title: "7. Arrays and ArrayList", body: "Store multiple values, loop over collections, add/remove values, and search lists.", code: "import java.util.ArrayList;\nArrayList<String> tasks = new ArrayList<>();\ntasks.add(\"Read Quran\");\ntasks.add(\"Study Java\");\nSystem.out.println(tasks);", practice: "Create a list of assignments and print unfinished ones.", project: "Build a to-do list console app." },
  { title: "8. Object-Oriented Java", body: "Understand classes, objects, fields, constructors, methods, encapsulation, and why OOP helps organize bigger apps.", code: "class Task {\n  String title;\n  boolean done;\n\n  Task(String title) {\n    this.title = title;\n  }\n}", practice: "Create Student, Assignment, and Workout classes.", project: "Build a school planner using objects." },
  { title: "9. Inheritance and Interfaces", body: "Learn extends, implements, polymorphism, abstract classes, interfaces, and when to use each.", code: "interface Trackable {\n  void markDone();\n}\n\nclass Prayer implements Trackable {\n  public void markDone() {\n    System.out.println(\"Prayer completed\");\n  }\n}", practice: "Create a Trackable interface for tasks, prayers, and workouts.", project: "Build a tracker system with shared behavior." },
  { title: "10. Exceptions and Files", body: "Handle errors with try/catch, read and write files, and protect programs from crashing.", code: "try {\n  int result = 10 / 0;\n} catch (ArithmeticException error) {\n  System.out.println(\"Cannot divide by zero\");\n}", practice: "Catch invalid input in your calculator.", project: "Save and load notes from a text file." },
  { title: "11. Collections and Maps", body: "Use HashMap, HashSet, sorting, searching, and choosing the right data structure.", code: "import java.util.HashMap;\nHashMap<String, Integer> scores = new HashMap<>();\nscores.put(\"Math\", 95);\nSystem.out.println(scores.get(\"Math\"));", practice: "Map subject names to grades.", project: "Build a report-card tracker." },
  { title: "12. Final Projects", body: "Combine everything into real projects: planner, budget tracker, quiz app, library system, or habit tracker.", code: "// Capstone idea:\n// Classes: User, Task, Assignment, Transaction\n// Features: add, list, mark done, save, load", practice: "Pick one app and write the class list before coding.", project: "Build a console FahimOS in Java." }
];

const successLearningSignals = [
  "Learn Java syntax first: variables, input, if/else, loops, methods. Do not skip practice.",
  "Build your web foundation: HTML structure, CSS layout, responsive design, then JavaScript DOM.",
  "Practice Git every week: commit small changes, write clear messages, push to GitHub.",
  "Use active recall: close the video, explain the concept, then code it without looking.",
  "Study databases next: tables, primary keys, joins, SQL queries, and clean data thinking.",
  "Learn backend basics: HTTP, APIs, JSON, authentication, environment variables, and errors.",
  "Learn frontend basics: components, state, forms, validation, loading states, and accessibility.",
  "Turn every lesson into a mini project. Watching is not learning until your hands build.",
  "Read documentation after tutorials. Tutorials show the road; docs teach independence.",
  "Master debugging: read the error, isolate the line, reproduce it, test one fix at a time.",
  "Use spaced repetition: review yesterday, last week, and last month before adding more.",
  "Learn deployment: GitHub Pages for static sites, then Vercel/Netlify for full-stack apps."
];

const successCareerSignals = [
  "Career path: Java fundamentals -> JavaScript -> React -> Node or Spring Boot -> SQL -> portfolio.",
  "Your portfolio should prove skill: planner app, budget tracker, Quran tracker, class scheduler, API dashboard.",
  "Become reliable first. Show up on time, finish small work, document what you built.",
  "Build public proof: one GitHub commit, one README improvement, one deployed project each week.",
  "Learn communication: explain what the app does, what problem it solves, and what you improved.",
  "Stack credentials smartly: school work, Coursera, LinkedIn Learning, Bro Code, freeCodeCamp, projects.",
  "Practice interviews early: arrays, strings, loops, maps, OOP, SQL joins, and project explanations.",
  "Choose a lane for 90 days: full-stack developer. Ignore shiny distractions until the basics are strong.",
  "Your advantage is consistency. Two focused hours daily for a year beats random all-night sessions.",
  "Network with proof: share a project link, ask for feedback, then improve it.",
  "Track money and time because successful people protect both.",
  "Respect comes from competence, calm behavior, clean promises, and repeated execution."
];

const successProjectSignals = [
  "Build a Java grade calculator with input, if/else, methods, and clean output.",
  "Build a weekly class scheduler that repeats classes automatically by weekday.",
  "Build a budget tracker with bills, due dates, paid status, and monthly totals.",
  "Build a Quran reading tracker with surah progress, reflection notes, and reminders.",
  "Build a workout tracker with start/end time, duration, and weekly streaks.",
  "Build a flashcard app for Java terms, Quran vocabulary, and school notes.",
  "Build a full-stack tasks app: frontend form, backend API, database, login, deploy.",
  "Build a portfolio homepage with your projects, screenshots, GitHub links, and resume.",
  "Build a weather/news dashboard using APIs and loading/error states.",
  "Build a habit analytics page that shows streaks, missed days, and recovery plans.",
  "Build a PDF export/history feature for your planner data.",
  "Build a ChatGPT command assistant that turns natural language into saved tasks."
];

const frontIslamicReminders = [
  { type: "Quran", text: "Indeed, with hardship comes ease.", ref: "Quran 94:6" },
  { type: "Quran", text: "And say: My Lord, increase me in knowledge.", ref: "Quran 20:114" },
  { type: "Quran", text: "Verily, in the remembrance of Allah do hearts find rest.", ref: "Quran 13:28" },
  { type: "Quran", text: "Allah does not burden a soul beyond what it can bear.", ref: "Quran 2:286" },
  { type: "Hadith", text: "The most beloved deeds to Allah are those done consistently, even if small.", ref: "Sahih meaning" },
  { type: "Hadith", text: "Tie your camel and trust in Allah.", ref: "Hadith meaning" },
  { type: "Reminder", text: "Protect salah first, then build the rest of the day around discipline.", ref: "Daily faith system" },
  { type: "Reminder", text: "Make intention before study: learn to serve, provide, and become useful.", ref: "Niyyah reset" }
];

const developerLessonTracks = {
  fullstack: [
    {
      title: "HTML Structure and Semantic Layout",
      body: "Learn how real pages are organized before chasing frameworks. Your goal is clean sections, forms, buttons, navigation, and readable content.",
      steps: ["Build one page with header, main, sections, and footer.", "Use labels for every input.", "Validate the page with a browser and fix spacing."],
      practice: "Create a personal dashboard skeleton with Home, Money, Health, Study, and Faith sections."
    },
    {
      title: "CSS Layout, Responsive Grids, and Polish",
      body: "Master grid, flexbox, spacing, typography, color variables, hover states, and mobile breakpoints.",
      steps: ["Make a three-column grid that becomes one column on phone.", "Use CSS variables for colors.", "Check text never overflows buttons or cards."],
      practice: "Restyle one section of FahimOS using one clean grid and two accent colors."
    },
    {
      title: "JavaScript DOM and Local Storage",
      body: "This is where your website becomes alive. Learn querySelector, events, rendering arrays, and saving data in localStorage.",
      steps: ["Render a list from an array.", "Add, edit, delete, and save items.", "Reload the page and confirm data stays."],
      practice: "Build a mini class schedule list with add, save, and delete."
    },
    {
      title: "Async JavaScript and APIs",
      body: "Learn fetch, JSON, loading states, errors, and how websites talk to real data sources.",
      steps: ["Fetch a public API.", "Show loading text first.", "Handle failed network requests clearly."],
      practice: "Create a weather widget with fallback text when the API is unavailable."
    },
    {
      title: "React Components and State",
      body: "React helps organize bigger apps. Learn components, props, state, controlled forms, and reusable UI.",
      steps: ["Convert a card into a component.", "Pass title and content as props.", "Use state for editable form values."],
      practice: "Rebuild the task card as a React component in a separate practice project."
    },
    {
      title: "Backend APIs with Node or Spring Boot",
      body: "A backend stores and protects real data. Learn routes, controllers, validation, auth, and database access.",
      steps: ["Create GET and POST endpoints.", "Validate request data.", "Return useful status codes and messages."],
      practice: "Make an API endpoint that creates an assignment from JSON."
    }
  ],
  java: [],
  projects: [
    {
      title: "Portfolio Project 1: Planner System",
      body: "Turn FahimOS into proof of skill: saved state, tabs, dashboard summaries, responsive layout, and PDF export.",
      steps: ["Write a README with features.", "Add screenshots.", "Deploy to GitHub Pages."],
      practice: "Commit one polished UI improvement and explain it in the README."
    },
    {
      title: "Portfolio Project 2: Budget and Debt Tracker",
      body: "Build a focused money app with bills, payoff plans, monthly totals, and exportable reports.",
      steps: ["Model bills and payments.", "Calculate payoff time.", "Show monthly cashflow with warnings."],
      practice: "Add a debt payoff chart or table to your Money Hub."
    },
    {
      title: "Portfolio Project 3: School Scheduler",
      body: "Create repeating classes by day, start date, end date, assignments, and important deadlines.",
      steps: ["Create recurring class rules.", "Generate this week's events.", "Highlight the next class."],
      practice: "Make one class repeat every Monday and Wednesday between two dates."
    },
    {
      title: "Portfolio Project 4: Quran Study Tracker",
      body: "Build a faith-centered tracker with reading logs, reflections, reminders, and progress by surah.",
      steps: ["Track surah, ayah range, minutes, and reflection.", "Show streaks.", "Add daily verse focus."],
      practice: "Add one saved reflection and display it on the dashboard."
    }
  ],
  career: [
    {
      title: "90-Day Developer Foundation",
      body: "For 90 days, prioritize HTML, CSS, JavaScript, Java basics, GitHub, and one deployed project.",
      steps: ["Study 60-90 minutes daily.", "Build one visible thing weekly.", "Review mistakes every Sunday."],
      practice: "Create a weekly checklist: lesson, build, commit, deploy, review."
    },
    {
      title: "Proof Beats Claims",
      body: "Employers and clients trust visible proof. Your GitHub, deployed projects, README files, and explanations must show your growth.",
      steps: ["Keep project names clear.", "Add screenshots and feature lists.", "Explain what you learned."],
      practice: "Improve one README today with setup steps and screenshots."
    },
    {
      title: "Interview Basics",
      body: "Practice arrays, strings, loops, maps, OOP, SQL joins, HTTP, and project explanation.",
      steps: ["Solve one easy coding problem.", "Explain one project out loud.", "Write one STAR story."],
      practice: "Explain FahimOS: problem, users, features, technical choices, and next upgrade."
    }
  ]
};
developerLessonTracks.java = javaModules.map((module) => ({
  title: module.title,
  body: module.body,
  steps: ["Read the concept.", "Type the code by hand.", "Change it into your own mini example."],
  practice: `${module.practice} Mini project: ${module.project}`
}));

const motivationBank = [
  "Win the next half hour. Do not negotiate with the whole day.",
  "Discipline becomes easier when your environment is already prepared.",
  "You do not need a perfect day. You need a faithful return to the plan.",
  "One prayer, one page, one assignment, one workout. Stack the basics.",
  "Your future self is built through repeated ordinary choices."
];

const extraMotivations = [
  "Make the next action so small that excuses look silly.",
  "A clean desk and a clear intention can rescue an entire day.",
  "You are not behind forever. You are one honest plan away from moving again.",
  "Study like someone is depending on your future competence.",
  "Protect your salah, then build everything else around it.",
  "When motivation is low, make the system carry you.",
  "Do the boring basics until they become your advantage.",
  "You do not need to feel ready to begin.",
  "The phone can wait. Your future cannot.",
  "A focused hour can beat an anxious day.",
  "Your habits are quiet votes for the person you are becoming.",
  "Make discipline normal, not dramatic.",
  "If you slipped, return fast. The return is part of the training.",
  "Today does not need to be perfect to count.",
  "One page, one problem, one prayer, one clean choice.",
  "The work you avoid is often the work that changes your confidence.",
  "You can rest after you make the next right move.",
  "Be loyal to the plan you made when your mind was clear.",
  "Track it, improve it, repeat it.",
  "Small consistency beats emotional intensity."
];

const starterBills = [
  { paid: false, name: "BOA Auto Loan", amount: "400", due: "28", category: "Car", note: "Monthly auto loan" },
  { paid: false, name: "Progressive Insurance", amount: "438.32", due: "15", category: "Insurance", note: "Car insurance" },
  { paid: false, name: "T-Mobile", amount: "344.49", due: "28", category: "Phone", note: "Phone bill" },
  { paid: false, name: "Spectrum Internet", amount: "59.99", due: "9", category: "Internet", note: "Home internet" },
  { paid: false, name: "Gas / Transportation", amount: "400", due: "Weekly", category: "Car", note: "Approx $100 weekly" },
  { paid: false, name: "Food", amount: "200", due: "Monthly", category: "Food", note: "Monthly food budget" },
  { paid: false, name: "Miscellaneous", amount: "500", due: "Monthly", category: "Misc", note: "Gas/minor fixes/random expenses" },
  { paid: false, name: "Xbox", amount: "9", due: "21", category: "Subscription", note: "Monthly" },
  { paid: false, name: "iCloud", amount: "2.99", due: "5", category: "Subscription", note: "Monthly" },
  { paid: false, name: "ChatGPT Plus", amount: "22", due: "Monthly", category: "Subscription", note: "Monthly" },
  { paid: false, name: "Amex #1", amount: "120", due: "23", category: "Credit Card", note: "Minimum" },
  { paid: false, name: "Amex #2", amount: "100", due: "2", category: "Credit Card", note: "Minimum" },
  { paid: false, name: "Discover", amount: "150", due: "20", category: "Credit Card", note: "Minimum" },
  { paid: false, name: "Citi", amount: "80", due: "20", category: "Credit Card", note: "Minimum" },
  { paid: false, name: "Capital One #1", amount: "50", due: "14", category: "Credit Card", note: "Minimum" },
  { paid: false, name: "Capital One #2", amount: "50", due: "10", category: "Credit Card", note: "Minimum" },
  { paid: false, name: "Capital One #3", amount: "50", due: "14", category: "Credit Card", note: "Minimum" },
  { paid: false, name: "Capital One #4", amount: "50", due: "10", category: "Credit Card", note: "Minimum" },
  { paid: false, name: "Reach Financial", amount: "302.14", due: "Biweekly", category: "Loan", note: "$151.07 biweekly" },
  { paid: false, name: "Affirm #1", amount: "30.97", due: "27", category: "Loan", note: "Monthly" },
  { paid: false, name: "Affirm #2", amount: "195", due: "28", category: "Loan", note: "Monthly" }
];

const starterBillChecklist = [
  { text: "Check due dates", done: false },
  { text: "Pay urgent bills", done: false },
  { text: "Mark paid", done: false }
];

const powerPrinciples = [
  "Control your reactions. A calm face gives you time to think.",
  "Protect your reputation by doing what you said you would do.",
  "Do not announce every plan. Build quietly and show results.",
  "Use timing. The right action at the right moment beats rushing.",
  "Make yourself useful. Skills create leverage.",
  "Avoid unnecessary arguments. Win through progress, not noise.",
  "Learn people's incentives before you judge their behavior.",
  "Guard your attention because attention is power.",
  "Be disciplined with words. Say less, mean more.",
  "Turn setbacks into information, then adjust the plan."
];

const famousQuotes = [
  "Discipline is choosing between what you want now and what you want most. - Abraham Lincoln",
  "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
  "The secret of getting ahead is getting started. - Mark Twain",
  "It always seems impossible until it is done. - Nelson Mandela",
  "He who has a why can bear almost any how. - Friedrich Nietzsche",
  "We are what we repeatedly do. Excellence, then, is not an act, but a habit. - Aristotle"
];

const islamicQuotes = [
  "Indeed, with hardship comes ease. - Quran 94:6",
  "And say: My Lord, increase me in knowledge. - Quran 20:114",
  "Allah does not burden a soul beyond what it can bear. - Quran 2:286",
  "The most beloved deeds to Allah are those done consistently, even if small. - Hadith",
  "Tie your camel and trust in Allah. - Hadith meaning",
  "Verily, in the remembrance of Allah do hearts find rest. - Quran 13:28"
];

const characterWisdom = [
  { type: "Kindness", text: "Be kind without becoming weak. Mercy and boundaries can exist together.", source: "Character principle" },
  { type: "Politeness", text: "Speak calmly, listen fully, and disagree without humiliating anyone.", source: "Social intelligence" },
  { type: "Respect", text: "Respect grows when your words, timing, promises, and actions match.", source: "Personal conduct" },
  { type: "Intelligence", text: "Before reacting, ask what is true, what matters, and what action improves the situation.", source: "Clear thinking" },
  { type: "Genius Habit", text: "Break difficult problems into smaller testable parts, then improve one part at a time.", source: "Problem solving" },
  { type: "Discipline", text: "Make the correct action easier to start than the distraction.", source: "Environment design" },
  { type: "Humility", text: "Confidence says you can learn it. Humility says you still have more to learn.", source: "Growth principle" },
  { type: "Leadership", text: "Correct privately, appreciate publicly, and take responsibility when the plan fails.", source: "Leadership principle" },
  { type: "Wisdom", text: "Do not make permanent decisions while controlled by temporary emotions.", source: "Decision rule" },
  { type: "Self-Control", text: "The strongest response is often the one chosen after a deliberate pause.", source: "Emotional intelligence" }
];

const powerLaws = [
  "Law 1: Protect respect. Do not make authority feel small.",
  "Law 2: Choose allies carefully. Loyalty matters, but incentives matter too.",
  "Law 3: Do not reveal every plan before it is ready.",
  "Law 4: Say less when emotions are high.",
  "Law 5: Guard your reputation through consistent action.",
  "Law 6: Be visible for your work, not your drama.",
  "Law 7: Learn from others, but take responsibility for the result.",
  "Law 8: Pull opportunities through value instead of begging for attention.",
  "Law 9: Win through results more than arguments.",
  "Law 10: Stay away from people who normalize chaos.",
  "Law 11: Build skills people depend on.",
  "Law 12: Use honesty strategically: clear, calm, and timed well.",
  "Law 13: Appeal to what people care about, not only what you want.",
  "Law 14: Listen deeply before trusting fully.",
  "Law 15: Finish problems completely when possible.",
  "Law 16: Create space. Scarcity makes your time valuable.",
  "Law 17: Stay unpredictable in effort, but reliable in character.",
  "Law 18: Do not isolate yourself from useful feedback.",
  "Law 19: Know who you are dealing with before reacting.",
  "Law 20: Do not commit your future to every temporary emotion.",
  "Law 21: Let people underestimate you while you build.",
  "Law 22: Step back when a fight wastes your mission.",
  "Law 23: Concentrate force on one priority at a time.",
  "Law 24: Practice social intelligence without losing your values.",
  "Law 25: Recreate yourself through habits and proof.",
  "Law 26: Keep your hands clean: avoid messy shortcuts.",
  "Law 27: Give people a hopeful standard to follow.",
  "Law 28: Act with boldness after thinking clearly.",
  "Law 29: Plan to the end before starting.",
  "Law 30: Make hard work look calm by preparing early.",
  "Law 31: Give yourself options before choosing.",
  "Law 32: Speak to people's dreams, but stay grounded in truth.",
  "Law 33: Learn each person's pressure point: fear, pride, need, or goal.",
  "Law 34: Carry yourself with dignity before asking for respect.",
  "Law 35: Master timing. Right action at the wrong time fails.",
  "Law 36: Stop chasing what does not respect you.",
  "Law 37: Use visuals, environment, and presentation to strengthen your message.",
  "Law 38: Think independently, but do not perform rebellion for attention.",
  "Law 39: Stay calm when others want you emotional.",
  "Law 40: Do not be bought by small favors that cost your freedom.",
  "Law 41: Respect mentors, but do not live as their shadow.",
  "Law 42: Remove the source of repeated disorder.",
  "Law 43: Win hearts through understanding and usefulness.",
  "Law 44: Mirror behavior to understand it, not to become fake.",
  "Law 45: Change gradually enough that people can follow.",
  "Law 46: Do not appear perfect. Stay human and improving.",
  "Law 47: Know when to stop after a win.",
  "Law 48: Stay adaptable. Rigidity breaks under pressure."
];

function wisdomReminderBank() {
  return [
    ...quranVerses.map((item) => ({ category: "quran", type: "Quran", text: item.en, source: item.ref })),
    ...frontIslamicReminders.map((item) => ({ category: /hadith/i.test(item.type) ? "hadith" : "islamic", type: item.type, text: item.text, source: item.ref })),
    ...islamicQuotes.map((text) => ({ category: "islamic", type: "Islamic Wisdom", text, source: "Faith reminder" })),
    ...famousQuotes.map((text) => ({ category: "famous", type: "Famous Quote", text, source: "Curated wisdom library" })),
    ...powerPrinciples.map((text) => ({ category: "discipline", type: "Mindset Principle", text, source: "Strategic character" })),
    ...powerLaws.map((text) => ({ category: "discipline", type: "Power Law", text, source: "Use ethically, never for manipulation" })),
    ...characterWisdom.map((item) => ({ category: "life", ...item }))
  ];
}

const motivationRecommendations = {
  books: [
    { title: "Atomic Habits", creator: "James Clear", note: "Build systems, not random motivation.", url: "https://www.google.com/search?q=Atomic+Habits+James+Clear" },
    { title: "Deep Work", creator: "Cal Newport", note: "Train focus for school, coding, and career.", url: "https://www.google.com/search?q=Deep+Work+Cal+Newport" },
    { title: "Can't Hurt Me", creator: "David Goggins", note: "Mental toughness and discipline under pressure.", url: "https://www.google.com/search?q=Can%27t+Hurt+Me+David+Goggins" },
    { title: "The 7 Habits of Highly Effective People", creator: "Stephen R. Covey", note: "Personal leadership and long-term principles.", url: "https://www.google.com/search?q=7+Habits+of+Highly+Effective+People" },
    { title: "The Compound Effect", creator: "Darren Hardy", note: "Small daily choices becoming big results.", url: "https://www.google.com/search?q=The+Compound+Effect+Darren+Hardy" },
    { title: "Don't Believe Everything You Think", creator: "Joseph Nguyen", note: "Calm your mind and reduce overthinking.", url: "https://www.google.com/search?q=Don%27t+Believe+Everything+You+Think+Joseph+Nguyen" }
  ],
  movies: [
    { title: "The Pursuit of Happyness", creator: "2006", note: "Persistence when life is heavy.", url: "https://www.google.com/search?q=The+Pursuit+of+Happyness" },
    { title: "Rocky", creator: "1976", note: "Underdog discipline and training energy.", url: "https://www.google.com/search?q=Rocky+movie" },
    { title: "The Social Network", creator: "2010", note: "Startup ambition, coding, and consequences.", url: "https://www.google.com/search?q=The+Social+Network+movie" },
    { title: "Coach Carter", creator: "2005", note: "Standards, school, discipline, and respect.", url: "https://www.google.com/search?q=Coach+Carter" },
    { title: "Good Will Hunting", creator: "1997", note: "Talent, healing, and choosing direction.", url: "https://www.google.com/search?q=Good+Will+Hunting" },
    { title: "Limitless", creator: "2011", note: "Use the energy as a reminder to build real habits.", url: "https://www.google.com/search?q=Limitless+movie" }
  ],
  songs: [
    { title: "Lose Yourself", creator: "Eminem", note: "High intensity focus mode.", url: "https://www.youtube.com/results?search_query=Lose+Yourself+Eminem" },
    { title: "Hall of Fame", creator: "The Script ft. will.i.am", note: "Big goal energy without overthinking.", url: "https://www.youtube.com/results?search_query=Hall+of+Fame+The+Script" },
    { title: "Stronger", creator: "Kanye West", note: "Workout and comeback mindset.", url: "https://www.youtube.com/results?search_query=Stronger+Kanye+West" },
    { title: "Remember the Name", creator: "Fort Minor", note: "Discipline and work ethic.", url: "https://www.youtube.com/results?search_query=Remember+the+Name+Fort+Minor" },
    { title: "Dreams and Nightmares", creator: "Meek Mill", note: "Use for a hard reset and energy spike.", url: "https://www.youtube.com/results?search_query=Dreams+and+Nightmares+Meek+Mill" },
    { title: "Till I Collapse", creator: "Eminem", note: "Training mode when you need intensity.", url: "https://www.youtube.com/results?search_query=Till+I+Collapse+Eminem" }
  ],
  podcasts: [
    { title: "The Huberman Lab", creator: "Andrew Huberman", note: "Sleep, focus, dopamine, health, learning.", url: "https://www.youtube.com/results?search_query=Huberman+Lab+motivation+focus" },
    { title: "The Diary of a CEO", creator: "Steven Bartlett", note: "Business, mindset, growth, self-awareness.", url: "https://www.youtube.com/results?search_query=Diary+of+a+CEO+best+episodes" },
    { title: "The Ed Mylett Show", creator: "Ed Mylett", note: "Confidence, habits, and high standards.", url: "https://www.youtube.com/results?search_query=Ed+Mylett+Show+motivation" },
    { title: "Impact Theory", creator: "Tom Bilyeu", note: "Learning, discipline, and mental performance.", url: "https://www.youtube.com/results?search_query=Impact+Theory+motivation" },
    { title: "Muslim Central", creator: "Islamic lectures", note: "Faith reminders and Islamic motivation.", url: "https://muslimcentral.com/" },
    { title: "Lex Fridman Podcast", creator: "Lex Fridman", note: "Tech, AI, programming, and deep thinking.", url: "https://www.youtube.com/results?search_query=Lex+Fridman+programming+AI" }
  ]
};

const fallbackNewsItems = [
  "US brief: check public safety, weather, economy, education, and major policy updates.",
  "World brief: scan conflicts, elections, markets, climate events, and technology changes.",
  "Sports brief: check NBA, NFL, MLB, soccer, combat sports, and major tournament headlines."
];

const fallbackSportsNewsItems = [
  "NBA watch: scores, injuries, trades, playoff races, and star-player updates.",
  "NFL watch: roster moves, injuries, schedule news, standings, and draft signals.",
  "MLB watch: Yankees, Mets, standings, pitching matchups, trades, and daily scores.",
  "Soccer watch: MLS, Premier League, Champions League, transfers, and international fixtures.",
  "World Cup watch: qualifiers, host cities, stadium updates, squads, and knockout paths.",
  "Club football watch: Real Madrid, Barcelona, Manchester clubs, Chelsea, Liverpool, PSG, Bayern, and transfer movement.",
  "Combat sports watch: UFC, boxing, title fights, weigh-ins, and fight-night results.",
  "UFC next fight watch: main event, venue, city, card order, rankings, and weigh-in news.",
  "Stadium watch: arena changes, host cities, kickoff times, gates, weather, and travel alerts.",
  "Tennis and golf watch: Grand Slams, PGA/LIV movement, leaderboards, and major finals.",
  "Racing watch: Formula 1, NASCAR, qualifying, race strategy, and championship points.",
  "College sports watch: NCAA football, basketball, recruiting, rankings, and tournament alerts.",
  "WNBA and women's sports watch: standings, records, injuries, and major performances.",
  "Global sports watch: cricket, Olympics, track, cycling, and major international tournaments."
];

const fallbackStockItems = [
  "SPY, QQQ, AAPL, MSFT, TSLA: open More Updates if live quotes are blocked by the browser.",
  "Today focus: compare price change, volume, sector news, and broad-market direction.",
  "YTD focus: compare each stock against SPY/QQQ before trusting momentum."
];

const fallbackWeatherItems = [
  "Weather check: review temperature, rain chance, wind, and travel conditions before leaving.",
  "Daily prep: carry water, check jacket/umbrella need, and plan commute time around weather.",
  "More Updates opens a live weather page for your exact current conditions."
];

const lifeRoadmap = [
  { phase: "Today", focus: "Win the next 24 hours", actions: ["Pray on time and write one gratitude note.", "Study or code for one focused block.", "Move your body for 20 minutes.", "Spend less than you planned.", "Sleep with a plan for tomorrow."] },
  { phase: "Next 7 Days", focus: "Build proof", actions: ["Finish one assignment before the due date.", "Complete one Java lesson and one mini project.", "Track every bill and expense.", "Workout 3 times and walk most days.", "Keep your room, files, and planner clean."] },
  { phase: "Next 30 Days", focus: "Become visibly disciplined", actions: ["Publish one GitHub project.", "Create a weekly school/study routine.", "Reduce one bad habit by replacing it with a better action.", "Read one serious book and write notes.", "Review money every Sunday."] },
  { phase: "Next 90 Days", focus: "Level up identity", actions: ["Build a portfolio with 3 projects.", "Learn Java fundamentals, HTML/CSS, JavaScript DOM, and Git.", "Improve sleep, waist, stamina, and strength.", "Pay bills earlier and reduce unnecessary spending.", "Practice calm speech and controlled reactions."] },
  { phase: "1 Year", focus: "Become reliable and valuable", actions: ["Have a strong developer portfolio.", "Maintain prayer, fitness, study, and money systems.", "Build emergency savings and lower debt pressure.", "Earn through skill, not luck.", "Be known as respectful, consistent, and serious."] },
  { phase: "Forever", focus: "Powerful and peaceful life", actions: ["Faith first: keep returning to Allah.", "Health always: protect sleep, food, movement, and mind.", "Skill compounds: keep learning and building.", "Money is a tool: control it before it controls you.", "Respect comes from character, competence, and consistency."] }
];

const lockedLearningSites = [
  { title: "Bro Code", url: "https://www.youtube.com/@BroCodez", note: "Beginner-friendly coding videos", locked: true },
  { title: "freeCodeCamp", url: "https://www.freecodecamp.org/learn/", note: "Full-stack practice", locked: true },
  { title: "The Odin Project", url: "https://www.theodinproject.com/", note: "Web developer path", locked: true },
  { title: "MDN Web Docs", url: "https://developer.mozilla.org/en-US/", note: "HTML, CSS, JavaScript reference", locked: true },
  { title: "roadmap.sh Full Stack", url: "https://roadmap.sh/full-stack", note: "Full-stack roadmap", locked: true },
  { title: "Java Documentation", url: "https://docs.oracle.com/en/java/", note: "Official Java docs", locked: true },
  { title: "W3Schools", url: "https://www.w3schools.com/", note: "Quick syntax examples", locked: true },
  { title: "Coursera", url: "https://www.coursera.org/search?query=full%20stack%20developer", note: "Structured courses", locked: true },
  { title: "LinkedIn Learning", url: "https://www.linkedin.com/learning/search?keywords=full%20stack%20developer", note: "Professional courses", locked: true },
  { title: "GitHub Skills", url: "https://skills.github.com/", note: "Git and GitHub practice", locked: true }
];

const suggestionBank = {
  today: [
    "Start with a 10 minute reset: water, clean desk, open planner.",
    "Pick one task that would make the day feel successful.",
    "Put your phone away for the first study block.",
    "Review your roadmap before choosing tonight's work.",
    "Close the day by writing one lesson and one next step."
  ],
  study: [
    "Use 45 minutes focus plus 10 minutes recap.",
    "Write active recall questions before rereading notes.",
    "Teach the topic out loud in simple words.",
    "Do the hardest assignment while your energy is highest.",
    "Make a mistake list and review it before the next test."
  ],
  life: [
    "Protect sleep like an appointment.",
    "Pair prayer with an existing routine to make consistency easier.",
    "Track spending the same day it happens.",
    "Plan tomorrow before relaxing tonight.",
    "Keep workouts simple enough that you actually repeat them."
  ]
};

const exerciseIdeas = [
  "Before training: drink water, eat a normal meal 1-3 hours beforehand, and arrive with a specific plan.",
  "Warm up for 5 minutes, then use lighter practice sets before the first heavy movement.",
  "Keep 1-3 controlled reps in reserve on most working sets; failure is not required for progress.",
  "Rest 2-3 minutes on heavy compound lifts and 60-90 seconds on smaller accessory movements.",
  "Record weight, sets, reps, energy, and form notes so the next session has a clear target.",
  "If sleep was poor, keep the session but reduce weight or sets instead of forcing a personal record.",
  "When every set reaches the top of its rep range with good form, add the smallest practical weight.",
  "Use walking and incline cardio to support fat loss without exhausting your lifting recovery.",
  "Finish with a short cooldown, water, protein, and a note about what to improve next time.",
  "Sharp pain is a stop signal. Do not train through suspected injury; seek qualified guidance."
];

const workoutWeekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const fixedWorkoutProgram = [
  {
    id: "push",
    defaultDay: "Monday",
    title: "Push",
    subtitle: "Chest, shoulders, triceps",
    tone: "push",
    exercises: [
      ["Warm-up", "5 min treadmill, arm circles, light push-ups x10"],
      ["Barbell Bench Press", "4 sets x 6-8 reps"],
      ["Incline Dumbbell Press", "3 sets x 8-10 reps"],
      ["Seated Dumbbell Shoulder Press", "3 sets x 8-10 reps"],
      ["Lateral Raises", "3 sets x 12-15 reps"],
      ["Cable Tricep Pushdowns", "3 sets x 12 reps"],
      ["Overhead Tricep Extension", "3 sets x 12 reps"],
      ["Plank", "3 sets x 45-60 sec"]
    ]
  },
  {
    id: "pull",
    defaultDay: "Tuesday",
    title: "Pull",
    subtitle: "Back, biceps, posture",
    tone: "pull",
    exercises: [
      ["Lat Pulldown", "4 sets x 8-10 reps"],
      ["Seated Cable Row", "4 sets x 8-10 reps"],
      ["Single Arm Dumbbell Row", "3 sets x 10 each side"],
      ["Face Pulls", "3 sets x 15 reps"],
      ["Barbell Curl", "3 sets x 10 reps"],
      ["Hammer Curl", "3 sets x 12 reps"],
      ["Incline Walk", "15 minutes"]
    ]
  },
  {
    id: "legs",
    defaultDay: "Wednesday",
    title: "Legs",
    subtitle: "Quads, hamstrings, calves, core",
    tone: "legs",
    exercises: [
      ["Barbell Squat", "4 sets x 6-8 reps"],
      ["Leg Press", "3 sets x 10 reps"],
      ["Romanian Deadlift", "3 sets x 10 reps"],
      ["Walking Lunges", "3 sets x 12 each leg"],
      ["Leg Curl", "3 sets x 12 reps"],
      ["Standing Calf Raise", "4 sets x 15 reps"],
      ["Hanging Knee Raises", "3 sets x 15 reps"]
    ]
  },
  {
    id: "upper",
    defaultDay: "Thursday",
    title: "Upper Body Power",
    subtitle: "Strength-focused upper body",
    tone: "upper",
    exercises: [
      ["Bench Press", "3 sets x 5 reps"],
      ["Pull-Ups or Assisted Pull-Ups", "3 sets x maximum controlled reps"],
      ["Dumbbell Shoulder Press", "3 sets x 8 reps"],
      ["Cable Row", "3 sets x 8 reps"],
      ["Barbell Curl", "3 sets x 10 reps"],
      ["Tricep Pushdown", "3 sets x 10 reps"],
      ["Treadmill", "10 minutes"]
    ]
  },
  {
    id: "lower",
    defaultDay: "Friday",
    title: "Lower + Fat Loss",
    subtitle: "Strength, legs, conditioning",
    tone: "lower",
    exercises: [
      ["Deadlift", "4 sets x 5 reps"],
      ["Goblet Squat", "3 sets x 12 reps"],
      ["Leg Press", "3 sets x 12 reps"],
      ["Leg Curl", "3 sets x 12 reps"],
      ["Calf Raise", "4 sets x 15 reps"],
      ["Incline Treadmill", "20 min, speed 3.0-3.5, incline 8-12%"]
    ]
  },
  {
    id: "recovery",
    defaultDay: "Saturday",
    title: "Active Recovery",
    subtitle: "Move without draining recovery",
    tone: "recovery",
    exercises: [
      ["Choose One", "45 min walk, basketball, bike ride, hiking, or light stretching"],
      ["Recovery Check", "Hydrate, eat protein, and keep intensity comfortable"]
    ]
  },
  {
    id: "rest",
    defaultDay: "Sunday",
    title: "Rest + Reset",
    subtitle: "Recovery, meal prep, prayer, planning",
    tone: "rest",
    exercises: [
      ["No Gym", "Let muscles and joints recover"],
      ["Weekly Reset", "Meal prep, prayer, planning, hydration, and early sleep"]
    ]
  }
];

const nutritionDayTemplates = [
  { workout: "Push", morning: "Eggs, oatmeal, berries, and water", midday: "Chicken rice bowl with vegetables", pre: "Banana and Greek yogurt", evening: "Salmon, potatoes, salad", night: "Water; cottage cheese or yogurt if hungry" },
  { workout: "Pull", morning: "Greek yogurt, oats, banana, and nuts", midday: "Turkey or chicken whole-grain wrap with fruit", pre: "Apple and protein shake", evening: "Lean beef or beans, rice, mixed vegetables", night: "Herbal tea and a small protein snack" },
  { workout: "Legs", morning: "Eggs, whole-grain toast, fruit, and water", midday: "Chicken, potatoes, vegetables, and yogurt", pre: "Oats or banana 60-90 minutes before training", evening: "Fish or lean meat, rice, vegetables", night: "Milk or yogurt; prepare tomorrow's food" },
  { workout: "Upper Body Power", morning: "Oatmeal with milk, banana, and eggs", midday: "Tuna or chicken sandwich, salad, fruit", pre: "Greek yogurt with honey", evening: "Chicken pasta with vegetables", night: "Water and a light protein snack" },
  { workout: "Lower + Fat Loss", morning: "Eggs, oats, fruit, and water", midday: "Lean protein, rice, beans, vegetables", pre: "Banana or toast with a small amount of peanut butter", evening: "Chicken or fish, potatoes, large salad", night: "No liquid calories; yogurt if hungry" },
  { workout: "Active Recovery", morning: "Greek yogurt, fruit, oats, and water", midday: "Chicken or bean salad with whole-grain bread", pre: "Fruit and water before activity", evening: "Fish, vegetables, and a moderate rice portion", night: "Tea, water, and meal preparation" },
  { workout: "Rest + Reset", morning: "Eggs, vegetables, toast, and fruit", midday: "Lentil or chicken soup with salad", pre: "Fruit or nuts as needed", evening: "Protein, vegetables, and a smaller carb portion", night: "Hydrate, prep food, and protect sleep" }
];

const presets = {
  light: { bg: "#f6f4ee", card: "#ffffff", text: "#17201c", accent: "#256f5a" },
  calm: { bg: "#eef5f2", card: "#ffffff", text: "#162522", accent: "#2b7a78" },
  midnight: { bg: "#111827", card: "#1f2937", text: "#f8fafc", accent: "#38bdf8" },
  fresh: { bg: "#f3f8ed", card: "#ffffff", text: "#1d241f", accent: "#5b8c37" },
  ocean: { bg: "#e7f7fb", card: "#ffffff", text: "#10252d", accent: "#0f7c8f" },
  rose: { bg: "#fff1f4", card: "#ffffff", text: "#2a161b", accent: "#b63f65" },
  sunrise: { bg: "#fff4df", card: "#ffffff", text: "#241b12", accent: "#c46b25" },
  forest: { bg: "#edf5ed", card: "#ffffff", text: "#132215", accent: "#2f6f3e" },
  lavender: { bg: "#f3efff", card: "#ffffff", text: "#20182e", accent: "#7652b8" },
  obsidian: { bg: "#0b0f14", card: "#151b22", text: "#f2f7fb", accent: "#00d4ff" },
  cyber: { bg: "#090b1a", card: "#14162d", text: "#f6f2ff", accent: "#ff3df2" },
  neon: { bg: "#050816", card: "#111827", text: "#e0f2fe", accent: "#22d3ee" },
  matrix: { bg: "#03120a", card: "#0b1f13", text: "#dcfce7", accent: "#22c55e" },
  ember: { bg: "#160b08", card: "#24110d", text: "#fff7ed", accent: "#f97316" },
  void: { bg: "#050505", card: "#111111", text: "#f5f5f5", accent: "#a855f7" },
  arcticDark: { bg: "#07111f", card: "#101a2b", text: "#e6f7ff", accent: "#38bdf8" },
  plasma: { bg: "#130617", card: "#25102d", text: "#fff1ff", accent: "#fb7185" },
  terminal: { bg: "#06110d", card: "#0e1f18", text: "#ccffdd", accent: "#00ff88" },
  galaxy: { bg: "#0b1026", card: "#151a36", text: "#eef2ff", accent: "#818cf8" },
  wildfire: { bg: "#140907", card: "#29120c", text: "#fff4e6", accent: "#ef4444" },
  acid: { bg: "#08110a", card: "#111f13", text: "#f7ffe6", accent: "#a3e635" },
  quantum: { bg: "#08051a", card: "#171129", text: "#f4f0ff", accent: "#7c3aed" },
  hologram: { bg: "#061522", card: "#102738", text: "#e8fbff", accent: "#67e8f9" },
  eclipse: { bg: "#0f0d12", card: "#1d1821", text: "#fff7fb", accent: "#f43f5e" },
  chrome: { bg: "#101418", card: "#1b2229", text: "#eef2f6", accent: "#94a3b8" },
  auroraNight: { bg: "#06131d", card: "#10212d", text: "#ecfeff", accent: "#2dd4bf" },
  royalShadow: { bg: "#10071f", card: "#1e1233", text: "#faf5ff", accent: "#c084fc" },
  bloodMoon: { bg: "#170707", card: "#2a1010", text: "#fff1f2", accent: "#dc2626" },
  deepSea: { bg: "#02131a", card: "#082631", text: "#e0faff", accent: "#0891b2" },
  graphiteGold: { bg: "#121212", card: "#20201d", text: "#fff8e1", accent: "#d6a63a" },
  solarPunk: { bg: "#08170f", card: "#13251a", text: "#f4ffe8", accent: "#84cc16" }
};

const launcherThemePresets = [
  { id: "fahimNight", name: "Fahim Night", bg: "#020713", card: "#091426", text: "#f4f8ff", active: "#123456", accent: "#33c7ff" },
  { id: "obsidian", name: "Obsidian", bg: "#080b0f", card: "#151a21", text: "#f2f5f8", active: "#29313b", accent: "#8bd8ff" },
  { id: "deepOcean", name: "Abyss", bg: "#031218", card: "#09242d", text: "#e9fbff", active: "#104653", accent: "#35d8c5" },
  { id: "graphite", name: "Carbon", bg: "#101214", card: "#202429", text: "#f8f5ec", active: "#3a4148", accent: "#d5b96f" },
  { id: "cloud", name: "Porcelain", bg: "#eef2f5", card: "#ffffff", text: "#17202a", active: "#dbe4ea", accent: "#246b8f" },
  { id: "sage", name: "Archive", bg: "#e9efec", card: "#fbfdfc", text: "#17231e", active: "#d1dfd8", accent: "#2d7259" }
];

const pageThemePresets = [
  { id: "fahimNight", name: "Fahim Night", bg: "#020713", card: "#091426", text: "#f4f8ff", accent: "#33c7ff", button: "#137fc5", nav: "#07101f" },
  { id: "obsidian", name: "Obsidian", bg: "#080b0f", card: "#151a21", text: "#f2f5f8", accent: "#8bd8ff", button: "#287497", nav: "#10151b" },
  { id: "abyss", name: "Abyss", bg: "#031218", card: "#09242d", text: "#e9fbff", accent: "#35d8c5", button: "#137f79", nav: "#061b22" },
  { id: "carbon", name: "Carbon", bg: "#101214", card: "#202429", text: "#f8f5ec", accent: "#d5b96f", button: "#76632e", nav: "#171a1d" },
  { id: "porcelain", name: "Porcelain", bg: "#eef2f5", card: "#ffffff", text: "#17202a", accent: "#246b8f", button: "#246b8f", nav: "#ffffff" },
  { id: "archive", name: "Archive", bg: "#e9efec", card: "#fbfdfc", text: "#17231e", accent: "#2d7259", button: "#2d7259", nav: "#f8fbf9" }
];

const customizeColorThemes = [
  { id: "oceanBlue", name: "Ocean Blue", bg: "#021827", card: "#082d42", text: "#e8fbff", accent: "#24c8ff", button: "#0ea5e9", nav: "#061b2b" },
  { id: "cyberPurple", name: "Cyber Purple", bg: "#09051f", card: "#1b1238", text: "#f7f1ff", accent: "#b45cff", button: "#7c3aed", nav: "#100928" },
  { id: "emeraldGreen", name: "Emerald Green", bg: "#03150e", card: "#0b2a1d", text: "#ecfff6", accent: "#34d399", button: "#059669", nav: "#061b13" },
  { id: "sunsetOrange", name: "Sunset Orange", bg: "#180a06", card: "#32170f", text: "#fff7ed", accent: "#fb923c", button: "#ea580c", nav: "#24100b" },
  { id: "midnightDark", name: "Midnight Dark", bg: "#020713", card: "#071225", text: "#f5f9ff", accent: "#24c8ff", button: "#137fc5", nav: "#050b16" },
  { id: "roseGold", name: "Rose Gold", bg: "#170b12", card: "#2a1722", text: "#fff5f8", accent: "#f4a7b9", button: "#be5f78", nav: "#21101a" },
  { id: "iceBlue", name: "Ice Blue", bg: "#06131f", card: "#10283d", text: "#eefaff", accent: "#7dd3fc", button: "#0284c7", nav: "#081b2a" },
  { id: "matrixGreen", name: "Matrix Green", bg: "#020d07", card: "#0b1f13", text: "#dcfce7", accent: "#22c55e", button: "#16a34a", nav: "#05140b" },
  { id: "royalBlue", name: "Royal Blue", bg: "#050a1f", card: "#111d46", text: "#f1f5ff", accent: "#4f8cff", button: "#2563eb", nav: "#07102b" },
  { id: "fireRed", name: "Fire Red", bg: "#150506", card: "#2b0d12", text: "#fff1f2", accent: "#ef4444", button: "#dc2626", nav: "#21080b" },
  { id: "galaxyPink", name: "Galaxy Pink", bg: "#11051b", card: "#28133d", text: "#fff1fb", accent: "#ec4899", button: "#db2777", nav: "#190b27" },
  { id: "goldLuxury", name: "Gold Luxury", bg: "#11100b", card: "#242016", text: "#fff8e1", accent: "#f5c451", button: "#a87917", nav: "#17140e" },
  { id: "slateGray", name: "Slate Gray", bg: "#0f172a", card: "#1e293b", text: "#f8fafc", accent: "#94a3b8", button: "#475569", nav: "#111827" },
  { id: "aquaNeon", name: "Aqua Neon", bg: "#031316", card: "#0a2c33", text: "#e6ffff", accent: "#22f7d3", button: "#0eafa5", nav: "#061d22" },
  { id: "coffeeBrown", name: "Coffee Brown", bg: "#130d08", card: "#2a1b11", text: "#fff7ed", accent: "#c08457", button: "#8b5e34", nav: "#1d130c" },
  { id: "whiteGlass", name: "White Glass", bg: "#eef5f8", card: "#ffffff", text: "#12202c", accent: "#1677a8", button: "#1677a8", nav: "#ffffff" },
  { id: "blackGlass", name: "Black Glass", bg: "#020304", card: "#0d1117", text: "#f5f7fb", accent: "#60a5fa", button: "#2563eb", nav: "#06080c" },
  { id: "cityNight", name: "City Night", bg: "#050b18", card: "#101a2e", text: "#f8fbff", accent: "#38bdf8", button: "#0f7fb5", nav: "#07111f" },
  { id: "cleanStudent", name: "Clean Student Mode", bg: "#eff6ff", card: "#ffffff", text: "#172033", accent: "#2563eb", button: "#2563eb", nav: "#f8fbff" },
  { id: "focusMode", name: "Focus Mode", bg: "#07110d", card: "#111f18", text: "#f2fff7", accent: "#84cc16", button: "#4d7c0f", nav: "#09160f" },
  { id: "executiveMode", name: "Executive Mode", bg: "#080b12", card: "#171c27", text: "#f8fafc", accent: "#d6a63a", button: "#8a6a1f", nav: "#10141d" },
  { id: "neonNoir", name: "Neon Noir", bg: "#05030b", card: "#121024", text: "#f8f7ff", accent: "#7dd3fc", button: "#8b5cf6", nav: "#090616" },
  { id: "quantumGlass", name: "Quantum Glass", bg: "#06111f", card: "#10233a", text: "#eef8ff", accent: "#2dd4bf", button: "#0ea5e9", nav: "#071827" },
  { id: "cosmicTeal", name: "Cosmic Teal", bg: "#021314", card: "#082c2f", text: "#edffff", accent: "#5eead4", button: "#0f766e", nav: "#041f22" },
  { id: "solarRoyal", name: "Solar Royal", bg: "#120b05", card: "#241708", text: "#fff8e7", accent: "#f59e0b", button: "#b45309", nav: "#1a1007" },
  { id: "auroraLuxe", name: "Aurora Luxe", bg: "#050b1a", card: "#101936", text: "#f3f8ff", accent: "#a7f3d0", button: "#6366f1", nav: "#091127" },
  { id: "cyberSakura", name: "Cyber Sakura", bg: "#160717", card: "#2b122d", text: "#fff2fb", accent: "#f0abfc", button: "#c026d3", nav: "#210b23" },
  { id: "steelCommand", name: "Steel Command", bg: "#070b12", card: "#151c28", text: "#f2f7fb", accent: "#38bdf8", button: "#334155", nav: "#0d121c" },
  { id: "islamicEmerald", name: "Islamic Emerald", bg: "#02110c", card: "#0b2419", text: "#f0fff7", accent: "#d6b75a", button: "#047857", nav: "#061a12" }
];

const liveThemePresets = [
  "Aurora Lights", "Galaxy Stars", "Matrix Rain", "Neon City Pulse", "Ocean Waves",
  "Rainy Glass Window", "Snowfall Night", "Lightning Storm", "Islamic Geometric Glow",
  "Cyber Grid Motion", "Blue Tech Circuit", "Floating Particles", "Energy Pulse",
  "Fire Embers", "Lava Lamp Motion", "Calm Clouds", "Study Night Desk Glow",
  "Deep Space Nebula", "Royal Gold Motion", "Future Tech Pulse", "Plasma Horizon",
  "Emerald Data Stream", "Moonlit Mosque Glow", "Hologram Grid", "Comet Trails",
  "Calm Rain Pulse", "Chrome Nebula", "Golden Circuit Flow", "Quantum Ocean",
  "Focus Breathing Lights", "Neon Prayer Geometry",
  "Superhero Skyline", "Guardian Shield Pulse", "Cosmic Cape Motion", "Hero Energy Core",
  "Space Warp Drive", "Planet Orbit Stream", "Black Hole Horizon", "Meteor Shower Grid",
  "Time Portal Rings", "Chrono Clockwork", "Future Timeline Flow", "World Map Pulse",
  "Earth Orbit Network", "Global City Signals", "Nature Aurora Forest", "Rainforest Breath",
  "Mountain Sunrise Flow", "Ocean Moon Tide", "Desert Star Wind", "Northern Lights Trail",
  "Solar Flare Arena", "Moon Base Circuit", "Superhero Night Flight", "Hero Thunder Core",
  "Deep Ocean Biolight", "Cloud Kingdom Drift", "Jungle Energy Pulse", "World Clock Network",
  "Time Rift Storm", "Space Elevator Glow", "Northern Snow Aurora", "Cyber Nature Bloom",
  "Cosmic Stadium Lights", "Future Earth Grid", "River Signal Flow", "Starship Window"
].map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), name }));

const layoutPresetOptions = ["Compact Mode", "Student Mode", "Faith Mode", "Money Mode", "Workout Mode", "Minimal Mode", "Executive Mode", "Night Focus Mode"]
  .map((name) => ({ id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""), name }));

const dashboardTheme = {
  bg: "#020713",
  card: "#071225",
  text: "#f5f9ff",
  accent: "#24c8ff"
};

const backgroundGalleryPresets = [
  ["hero-signal", "Superhero", "Hero Signal", "radial-gradient(circle at 22% 30%,#37b9ff55,transparent 28%),linear-gradient(135deg,#030611,#102553 55%,#5b1b7a)"],
  ["guardian-core", "Superhero", "Guardian Core", "radial-gradient(circle at 70% 22%,#ffcf5a66,transparent 25%),linear-gradient(145deg,#080a17,#3b174f 50%,#06385a)"],
  ["hero-skyline", "Superhero", "Hero Skyline", "radial-gradient(circle at 18% 28%,#39d5ff66,transparent 18%),linear-gradient(160deg,#020617 0 42%,#132d6b 43% 45%,#09111f 46% 100%)"],
  ["shield-reactor", "Superhero", "Shield Reactor", "radial-gradient(circle at 50% 48%,#46e7ff 0 4%,#46e7ff33 5% 18%,transparent 19%),repeating-conic-gradient(from 30deg,#07111d 0 12deg,#1f3f8f66 13deg 15deg,#07111d 16deg 30deg)"],
  ["cosmic-cape", "Superhero", "Cosmic Cape", "linear-gradient(120deg,#05060f 0 35%,#7c1d5f 36% 55%,#0c4a6e 56% 100%),radial-gradient(circle at 75% 22%,#facc1566,transparent 18%)"],
  ["velocity-red", "Cars", "Velocity Red", "linear-gradient(115deg,#05070c 0 45%,#ee244a 46% 49%,#101729 50% 100%)"],
  ["electric-road", "Cars", "Electric Road", "repeating-linear-gradient(120deg,#04101b 0 26px,#092b49 27px 29px,#02050a 30px 58px)"],
  ["quantum-lab", "Science", "Quantum Lab", "radial-gradient(circle at 50% 50%,#36f1d044 0 2%,transparent 3% 12%,#419dff22 13% 14%,transparent 15%),#030b17"],
  ["molecule-grid", "Science", "Molecule Grid", "linear-gradient(#00d9ff18 1px,transparent 1px),linear-gradient(90deg,#00d9ff18 1px,transparent 1px),#07111d"],
  ["arena-light", "Sports", "Arena Light", "radial-gradient(ellipse at 50% 0,#ffffff44,transparent 35%),linear-gradient(145deg,#071a24,#0c4939,#07111c)"],
  ["champion-lines", "Sports", "Champion Lines", "repeating-linear-gradient(135deg,#07101f 0 35px,#1d57a5 36px 39px,#07101f 40px 75px)"],
  ["midnight-tiger", "Animals", "Midnight Tiger", "repeating-linear-gradient(115deg,#0a0a0c 0 24px,#d4781633 25px 34px,#0a0a0c 35px 58px)"],
  ["arctic-flight", "Animals", "Arctic Flight", "radial-gradient(ellipse at 70% 20%,#dff8ff66,transparent 20%),linear-gradient(#08233b,#0b5064 60%,#07131f)"],
  ["deep-current", "Ocean", "Deep Current", "radial-gradient(ellipse at 50% 110%,#18d8d866,transparent 45%),linear-gradient(#03101e,#042e55 55%,#020711)"],
  ["coral-neon", "Ocean", "Coral Neon", "radial-gradient(circle at 20% 80%,#ff4f8b55,transparent 22%),radial-gradient(circle at 80% 65%,#23e2d755,transparent 26%),#04111c"],
  ["glass-towers", "Buildings", "Glass Towers", "repeating-linear-gradient(90deg,#07111d 0 42px,#2a8bd533 43px 46px,#02050b 47px 78px)"],
  ["future-city", "Buildings", "Future City", "linear-gradient(170deg,transparent 0 45%,#00ccff22 46% 47%,transparent 48%),linear-gradient(#040714,#12134b)"],
  ["world-lines", "Countries", "World Lines", "radial-gradient(circle at 50% 50%,transparent 0 24%,#33ddbb33 25% 26%,transparent 27% 40%,#33ddbb22 41% 42%,transparent 43%),#06121b"],
  ["city-lights", "Countries", "City Lights", "radial-gradient(circle at 15% 70%,#ffc85766 0 2px,transparent 3px),radial-gradient(circle at 65% 35%,#2ee6ff66 0 2px,transparent 3px),#040713"],
  ["world-command-map", "Countries", "World Command Map", "radial-gradient(circle at 48% 48%,transparent 0 18%,#2dd4bf33 19% 20%,transparent 21% 34%,#38bdf822 35% 36%,transparent 37%),linear-gradient(135deg,#020617,#06233a)"],
  ["global-satellite", "Countries", "Global Satellite", "repeating-linear-gradient(60deg,transparent 0 26px,#22d3ee1f 27px 28px),radial-gradient(circle at 65% 34%,#f8fafc55 0 2px,transparent 3px),#03111f"],
  ["nebula-violet", "Space", "Nebula Violet", "radial-gradient(circle at 30% 35%,#a855f766,transparent 28%),radial-gradient(circle at 75% 65%,#22d3ee44,transparent 25%),#02040d"],
  ["star-command", "Space", "Star Command", "radial-gradient(circle,#ffffff88 0 1px,transparent 2px) 0 0/44px 44px,linear-gradient(135deg,#02040b,#09173d)"],
  ["warp-drive", "Space", "Warp Drive", "repeating-radial-gradient(ellipse at 50% 50%,#ffffff55 0 1px,transparent 2px 20px),linear-gradient(115deg,#02030a,#1d1b4f 52%,#042f4a)"],
  ["black-hole", "Space", "Black Hole", "radial-gradient(circle at 50% 48%,#02030a 0 12%,#f59e0b55 13% 14%,#8b5cf655 15% 18%,transparent 19% 36%),linear-gradient(#01020a,#0f172a)"],
  ["solar-orbit", "Solar System", "Solar Orbit", "radial-gradient(circle at 72% 35%,#ffcf5a 0 3%,#ff8a0044 4% 9%,transparent 10%),radial-gradient(ellipse at 72% 35%,transparent 0 27%,#42c8ff44 28% 29%,transparent 30%),#030610"],
  ["mars-command", "Solar System", "Mars Command", "radial-gradient(circle at 70% 58%,#d35c36 0 14%,#7d2d24 15% 17%,transparent 18%),linear-gradient(#07060c,#24101b)"],
  ["time-portal", "Time", "Time Portal", "repeating-radial-gradient(circle at 50% 50%,transparent 0 22px,#38bdf833 23px 24px,transparent 25px 45px),conic-gradient(from 90deg,#020617,#1e1b4b,#0e7490,#020617)"],
  ["chrono-grid", "Time", "Chrono Grid", "linear-gradient(#facc1518 1px,transparent 1px),linear-gradient(90deg,#facc1518 1px,transparent 1px),radial-gradient(circle at 70% 30%,#38bdf833,transparent 24%),#07111d"],
  ["future-timeline", "Time", "Future Timeline", "linear-gradient(90deg,#22d3ee55 0 2px,transparent 3px),repeating-linear-gradient(120deg,#020617 0 34px,#1d4ed833 35px 37px,#020617 38px 68px)"],
  ["forest-glass", "Nature", "Forest Glass", "radial-gradient(ellipse at 20% 100%,#1ccc7a55,transparent 35%),radial-gradient(ellipse at 80% 90%,#65d46e44,transparent 32%),#04110d"],
  ["aurora-pine", "Nature", "Aurora Pine", "linear-gradient(125deg,transparent 20%,#24e6c944 35%,#8b5cf644 50%,transparent 65%),#03100f"],
  ["storm-peak", "Nature", "Storm Peak", "linear-gradient(145deg,transparent 0 55%,#46647a66 56% 70%,#0d1b27 71%),linear-gradient(#07101c,#17304a)"],
  ["sunset-ridge", "Nature", "Sunset Ridge", "radial-gradient(circle at 70% 30%,#ffcf6a88,transparent 14%),linear-gradient(#301653,#a43b5c 55%,#13122a)"],
  ["rainforest-glow", "Nature", "Rainforest Glow", "radial-gradient(ellipse at 25% 100%,#22c55e66,transparent 36%),radial-gradient(ellipse at 80% 25%,#84cc1644,transparent 25%),linear-gradient(#02120b,#0f2f1f)"],
  ["mountain-sunrise", "Nature", "Mountain Sunrise", "radial-gradient(circle at 72% 22%,#fde68a88,transparent 16%),linear-gradient(150deg,transparent 0 55%,#64748b77 56% 70%,#102033 71%),#08111f"],
  ["ocean-moon-tide", "Nature", "Ocean Moon Tide", "radial-gradient(circle at 76% 18%,#e0f2fe99,transparent 10%),repeating-linear-gradient(170deg,#082f49 0 22px,#0e749044 23px 25px,#03101d 26px 48px)"],
  ["cyber-panther", "Animals", "Cyber Panther", "radial-gradient(circle at 32% 43%,#20d9ff 0 2px,transparent 3px),linear-gradient(135deg,#020307,#10203b)"],
  ["stadium-blue", "Sports", "Stadium Blue", "radial-gradient(ellipse at 50% -10%,#66d9ff66,transparent 42%),repeating-linear-gradient(90deg,#06111e 0 60px,#0e315455 61px 63px)"],
  ["formula-night", "Cars", "Formula Night", "linear-gradient(110deg,#02040a 0 48%,#15b8ff 49% 51%,#25104c 52% 100%)"],
  ["island-signal", "Ocean", "Island Signal", "radial-gradient(ellipse at 50% 105%,#2fd8a066 0 25%,transparent 26%),linear-gradient(#05233e,#087a8d 62%,#04101a)"],
  ["global-command", "Countries", "Global Command", "repeating-radial-gradient(circle at 50% 50%,transparent 0 38px,#37d8ff22 39px 40px),#050b17"],
  ["luxury-command", "Buildings", "Luxury Command", "linear-gradient(135deg,#07080b,#1b1e27 48%,#72572b55 49% 51%,#090b10 52%)"]
].map(([id, category, name, background]) => ({ id, category, name, background }));

const defaultMenuPages = [
  { id: "dashboard", label: "Home", visible: true },
  { id: "life", label: "Life Hub", visible: true },
  { id: "faith", label: "Faith Hub", visible: true },
  { id: "health", label: "Health Hub", visible: true },
  { id: "study", label: "Study Hub", visible: true },
  { id: "money", label: "Money Hub", visible: true },
  { id: "history", label: "History", visible: true },
  { id: "settings", label: "Settings", visible: true }
];

const defaultHomeCards = [
  { id: "overview", label: "Today At A Glance", visible: true },
  { id: "todos", label: "To-Do Lists", visible: true },
  { id: "schedules", label: "Schedules", visible: true },
  { id: "school", label: "Classes Schedule", visible: true },
  { id: "prayer", label: "Prayer Snapshot", visible: true },
  { id: "money", label: "Money + Bills", visible: true },
  { id: "dailyWorkout", label: "Today's Workout Strategy", visible: true },
  { id: "discipline", label: "Discipline Streak", visible: true },
  { id: "sleep", label: "Sleep Summary", visible: true },
  { id: "latestNotes", label: "Daily Notes", visible: true },
  { id: "checklist", label: "Daily Checklist", visible: false },
  { id: "readiness", label: "FahimOS Readiness", visible: false },
  { id: "wins", label: "Recent Wins", visible: false },
  { id: "disciplineScore", label: "Discipline Streak", visible: true },
  { id: "nextStep", label: "Suggested Next Step", visible: false },
  { id: "financialHealth", label: "Financial Health", visible: false },
  { id: "debtProgress", label: "Debt Progress", visible: false },
  { id: "savingsGoal", label: "Savings Goal", visible: false },
  { id: "weeklyReview", label: "Weekly Review", visible: false },
  { id: "focusFuel", label: "Focus Fuel", visible: false },
  { id: "faithMomentum", label: "Faith Momentum", visible: false },
  { id: "monthlyWins", label: "Monthly Wins", visible: false },
  { id: "learningDashboard", label: "Learning Dashboard", visible: false },
  { id: "lifeStatistics", label: "Life Statistics", visible: false },
  { id: "prayerConsistency", label: "Prayer Consistency", visible: false },
  { id: "studySprint", label: "Study Sprint", visible: false }
];

const defaultHomeDock = [
  { id: "dashboard", label: "Home", visible: true },
  { id: "quran", label: "Quran", visible: true },
  { id: "prayer", label: "Prayer", visible: true },
  { id: "workout", label: "Workout", visible: true },
  { id: "money", label: "Money", visible: true },
  { id: "study", label: "School", visible: true },
  { id: "tasks", label: "Tasks", visible: true },
  { id: "assistant", label: "Ask FahimOS", visible: true },
  { id: "more", label: "More", visible: true },
  { id: "life", label: "Life", visible: false },
  { id: "faith", label: "Faith", visible: false },
  { id: "health", label: "Health", visible: false },
  { id: "history", label: "History", visible: false },
  { id: "settings", label: "Settings", visible: false }
];

let state = loadState();
const sessionStoredDate = state.activeDate || todayKey();
let activeDate = todayKey();
let systemDateKey = todayKey();
let currentPage = "dashboard";
let pageStack = [];
let liveLoadStarted = false;
const tileColorSeed = Math.floor(Math.random() * 100000);
let cryptoLoadStarted = false;
let liveClockTimer = null;
let panelLayoutEditMode = false;
let currentDailySignalItem = null;
let faithReminderHidden = false;
let prayerLoadStarted = false;
let adhanSpeaking = false;
let credentialVaultSession = {
  key: null,
  salt: null,
  entries: [],
  visible: false
};
let activeAlarmPopup = null;
const alarmPopupQueue = [];
let pendingAssistantActions = [];
let pendingAssistantMessage = "";
let lastAskFahimAnswer = null;
const billViewState = { search: "", filter: "all", sort: "due" };

function defaultState() {
  return {
    activeDate: todayKey(),
    autoSave: true,
    pageColors: {},
    pageStyles: {},
    pageBrightness: {},
    globalBrightness: 100,
    brightnessEditorPage: "dashboard",
    pageNames: {},
    pageHeaders: {},
    pageHeaderEditorPage: "dashboard",
    panelLayouts: {},
    smartLayout: {
      collapsed: {},
      modeByPage: {},
      focusByPage: {}
    },
    menuSettings: {
      eyebrow: "Command menu",
      title: "Where do you want to go?",
      buttonText: "Command Menu",
      bg: "#eaf4f1",
      card: "#f7fbfa",
      text: "#111917",
      active: "#dcece7",
      accent: "#277754",
      themeId: "sage",
      pages: defaultMenuPages.map((page) => ({ ...page }))
    },
    homeCardSettings: defaultHomeCards.map((card) => ({ ...card })),
    homeCardCollapsed: {},
    homeDockSettings: defaultHomeDock.map((item) => ({ ...item })),
    homeDockVisible: true,
    homeFocusColor: "#2f91ff",
    homeWeatherColor: "#0a88c7",
    homeCalendarColor: "#087f72",
    homeWidgetStyles: {
      focus: { card: "#173566", accent: "#2f91ff", background: "#071225" },
      calendar: { card: "#087f72", accent: "#39e2c4", background: "#071225" }
    },
    homeVisualMode: "metro",
    homeCalendarOffset: 0,
    homeCalendarCollapsed: false,
    homeDashboardCategory: "all",
    lifeHubTab: "goals",
    dailyDuaState: "expanded",
    homeDashboardLayoutVersion: 3,
    lifeDataCollapsed: false,
    lifeStatusCollapsed: false,
    lifeStatusExpanded: false,
    lifeStatusHidden: false,
    dailyWellnessCollapsed: false,
    dailyWellnessHidden: false,
    notificationsRead: {},
    historyView: "pages",
    dailyArchives: {},
    archiveRetentionDays: 90,
    journalDraft: { date: todayKey(), time: "", mood: "Reflective", title: "", text: "", tags: "" },
    journalEntries: [],
    manualWorkoutDraft: { name: "", date: todayKey(), startTime: "", endTime: "", durationMinutes: "", notes: "" },
    devLessonTrack: "fullstack",
    devLessonIndex: 0,
    studyLayout: {
      sections: { signals: false, school: false, developer: false, workspace: false, resources: false, media: true },
      cards: {}
    },
    calculators: {
      financeIncome: "",
      financeExpenses: "",
      financeSavingsGoal: "",
      debtBalance: "",
      debtApr: "",
      debtPayment: "",
      savingsTarget: "",
      savingsMonthly: "",
      savingsCurrent: "",
      extraPayBalance: "",
      extraPayApr: "",
      extraPayCurrent: "",
      extraPayExtra: "",
      minimumBalance: "",
      minimumApr: "",
      minimumPayment: "",
      loanAmount: "",
      loanApr: "",
      loanMonths: "",
      autoPrice: "",
      autoDown: "",
      autoApr: "",
      autoMonths: "",
      refiBalance: "",
      refiOldApr: "",
      refiNewApr: "",
      refiMonths: "",
      curveEssentials: "",
      curveSavings: "",
      curveMonths: "",
      curveContribution: ""
    },
    quoteSeeds: { mindset: 0, famous: 0, islamic: 0, power: 0, wisdom: 0 },
    wisdomCategory: "all",
    favoriteWisdom: [],
    designStudio: {
      backgroundPreset: "none",
      backgroundBlur: 0,
      backgroundOverlay: 42,
      tileSpacing: 16,
      glassIntensity: 65,
      motionLevel: 60
    },
    customizeV4: {
      layoutPreset: "compact-mode",
      spacing: "normal",
      snapToGrid: true,
      gridLines: false,
      lastLayoutChange: null
    },
    liveThemeV4: {
      enabled: false,
      id: "aurora-lights",
      speed: "normal",
      intensity: "medium"
    },
    hiddenWidgetsV4: [],
    nutritionTracker: {
      water: 0,
      protein: "",
      foodLog: "",
      meals: [
        { text: "Protein-rich first meal", done: false },
        { text: "Balanced lunch", done: false },
        { text: "Training fuel or planned snack", done: false },
        { text: "Protein-centered evening meal", done: false }
      ]
    },
    recommendationSeeds: { books: 0, movies: 0, songs: 0, podcasts: 0 },
    history: [],
    reminders: [],
    theme: presets.midnight,
    backgroundScene: "creative",
    days: {},
    tasks: [],
    todoLists: [],
    alarms: [],
    countdowns: [],
    dismissedCountdownId: "",
    money: [],
    savings: {
      monthlyIncome: "",
      targetRate: "20",
      notes: "",
      goals: [
        { id: "emergency", name: "Emergency Fund", target: "3000", current: "0", deadline: "", priority: "Essential", color: "#21d9b5" },
        { id: "car", name: "Car Repairs", target: "1000", current: "0", deadline: "", priority: "High", color: "#2f91ff" },
        { id: "future", name: "Future Opportunity", target: "2000", current: "0", deadline: "", priority: "Growth", color: "#9d64ff" }
      ],
      deposits: [],
      buckets: [
        { name: "Emergency Fund", planned: "200" },
        { name: "Car / Transportation", planned: "100" },
        { name: "Education / Career", planned: "100" },
        { name: "Long-Term Wealth", planned: "100" }
      ],
      strategy: [
        { text: "Pay yourself first on every income day.", done: false },
        { text: "Build one month of essential expenses before nonessential upgrades.", done: false },
        { text: "Keep emergency savings separate from everyday checking.", done: false },
        { text: "Increase the savings rate whenever income increases.", done: false },
        { text: "Review goals and automatic transfers at the end of every month.", done: false }
      ]
    },
    payoffDebts: [
      { name: "Amex #1", balance: "120", apr: "0", minimum: "120", extra: "", strategy: "Snowball", note: "Minimum" },
      { name: "Discover", balance: "150", apr: "0", minimum: "150", extra: "", strategy: "Snowball", note: "Minimum" },
      { name: "Reach Financial", balance: "302.14", apr: "0", minimum: "151.07", extra: "", strategy: "Avalanche", note: "Biweekly payment" }
    ],
    bills: starterBills.map((bill) => ({ ...bill })),
    billChecklist: starterBillChecklist.map((item) => ({ ...item })),
    calendarDraft: {},
    githubDraft: { branch: "main", message: "Upload planner file" },
    assistantApiUrl: "",
    assistantHistory: [],
    askFahimHistory: [],
    completionLog: [],
    classes: [],
    assignments: [],
    importantDates: [],
    academicSemester: {
      term: "Fall",
      academicYear: "",
      school: "",
      program: "",
      startDate: "",
      endDate: "",
      credits: "",
      gpaGoal: "",
      advisor: "",
      status: "Planning",
      notes: ""
    },
    attendanceRecords: [],
    studyBlocks: [],
    javaModule: 0,
    javaNotes: [],
    selectedSurah: 1,
    mapQuery: "New York Public Library",
    schoolStudySpace: "",
    projectStudySpace: "",
    developerStudySpace: "",
    stockExchangeNotes: "",
    marketChartSymbol: "NASDAQ:AAPL",
    marketChartInterval: "D",
    marketSection: "chart",
    marketPortfolio: [],
    favoriteCrypto: [
      { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
      { id: "ethereum", name: "Ethereum", symbol: "ETH" }
    ],
    marketWatchlist: [
      { symbol: "AMEX:SPY", label: "S&P 500 ETF", type: "ETF" },
      { symbol: "NASDAQ:QQQ", label: "Nasdaq 100 ETF", type: "ETF" },
      { symbol: "NASDAQ:AAPL", label: "Apple", type: "Stock" },
      { symbol: "COINBASE:BTCUSD", label: "Bitcoin", type: "Crypto" }
    ],
    liveCrypto: null,
    curveballNotes: "",
    payoffNotes: "",
    creditNotes: "",
    essentialsNotes: "",
    faithNotes: "",
    customLinks: [],
    learningSites: lockedLearningSites.map((site) => ({ ...site })),
    prayerLocation: { city: "New York", country: "United States" },
    prayerTimeFormat: "12",
    prayerTimes: {},
    adhanSettings: {
      enabled: false,
      includeFajrLine: true,
      volume: 1,
      lastTriggered: ""
    },
    homeClockMode: "digital",
    clockHourFormat: "12",
    worldClocks: [
      { label: "New York", zone: "America/New_York" },
      { label: "Dhaka", zone: "Asia/Dhaka" },
      { label: "Makkah", zone: "Asia/Riyadh" },
      { label: "London", zone: "Europe/London" }
    ],
    jummah: {
      mosque: "",
      time: "13:00",
      entryTime: "",
      startTime: "",
      endTime: "",
      notes: "",
      checklist: [
        { text: "Make ghusl and wear clean clothes", done: false },
        { text: "Use good scent and prepare early", done: false },
        { text: "Read Surah Al-Kahf", done: false },
        { text: "Send abundant salawat upon the Prophet", done: false },
        { text: "Leave early and listen quietly to the khutbah", done: false }
      ],
      history: []
    },
    ramadanNotes: "",
    ramadanFasts: [],
    ramadanTaraweehHistory: [],
    dismissedImportantDate: "",
    dismissedBillsDate: "",
    faithToolkit: {
      dhikrCount: 0,
      quranPages: 0,
      sadaqah: 0,
      goodDeeds: [],
      halalHabits: [
        { text: "Guard speech and avoid gossip", done: false },
        { text: "Lower the gaze and protect attention", done: false },
        { text: "Earn, eat, and spend responsibly", done: false }
      ]
    },
    health: {
      sleepTime: "",
      wakeTime: "",
      sleepQuality: "Good",
      sleepActiveStart: "",
      sleepSessions: [],
      notes: "",
      checklist: [
        { text: "Drink water", done: false },
        { text: "Move body", done: false },
        { text: "Sleep on time", done: false }
      ]
    },
    motivationSeed: 0,
    workoutProgramDays: Object.fromEntries(fixedWorkoutProgram.map((item) => [item.id, item.defaultDay])),
    workoutWeeklyRoutine: {
      Monday: "Push", Tuesday: "Pull", Wednesday: "Legs", Thursday: "Push",
      Friday: "Pull", Saturday: "Recovery", Sunday: "Recovery"
    },
    trainingDayFilter: "All",
    workouts: [],
    roadmap: [
      { phase: "Now", text: "Build daily consistency with prayer, school, study, money, and workout tracking.", status: "In progress" },
      { phase: "Next", text: "Create weekly review habits and update goals every Sunday.", status: "Planned" },
      { phase: "Future", text: "Add bigger goals, projects, career plans, and skill milestones.", status: "Planned" }
    ],
    lifeRoadmap: lifeRoadmap.map((item) => ({ ...item, actions: [...item.actions] })),
    files: [],
    profile: {
      name: "",
      preferredname: "",
      role: "",
      email: "",
      phone: "",
      school: "",
      grade: "",
      city: "",
      bio: "",
      goal: "",
      schoolgoal: "",
      fitnessgoal: "",
      financegoal: "",
      faithgoal: "",
      careergoal: "",
      greetingstyle: "dynamic",
      customgreeting: "",
      identities: [],
      customidentity: "",
      dashboardmode: "compact",
      defaultfocus: "All",
      avatar: "",
      avatarsize: 76,
      avatarzoom: 100,
      avatarx: 50,
      avatary: 50
    },
    discipline: { start: "", reason: "", triggers: [], accumulatedMs: 0, resting: false, sessions: [] },
    motivations: []
  };
}

function readJsonKey(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

function designSnapshot() {
  return {
    savedAt: new Date().toISOString(),
    homeCardSettings: state.homeCardSettings,
    homeCardCollapsed: state.homeCardCollapsed,
    panelLayouts: state.panelLayouts,
    smartLayout: state.smartLayout,
    designStudio: state.designStudio,
    customizeV4: state.customizeV4,
    liveThemeV4: state.liveThemeV4,
    hiddenWidgetsV4: state.hiddenWidgetsV4,
    theme: state.theme,
    pageStyles: state.pageStyles,
    pageColors: state.pageColors,
    pageBrightness: state.pageBrightness,
    globalBrightness: state.globalBrightness,
    backgroundScene: state.backgroundScene
  };
}

function writeDesignV4Keys() {
  try {
    localStorage.setItem(LAYOUT_V4_KEY, JSON.stringify({
      homeCardSettings: state.homeCardSettings,
      homeCardCollapsed: state.homeCardCollapsed,
      panelLayouts: state.panelLayouts,
      smartLayout: state.smartLayout,
      customizeV4: state.customizeV4
    }));
    localStorage.setItem(THEME_V4_KEY, JSON.stringify({
      theme: state.theme,
      pageStyles: state.pageStyles,
      pageColors: state.pageColors,
      pageBrightness: state.pageBrightness,
      globalBrightness: state.globalBrightness,
      backgroundScene: state.backgroundScene,
      designStudio: state.designStudio
    }));
    localStorage.setItem(LIVE_THEME_V4_KEY, JSON.stringify(state.liveThemeV4 || defaultState().liveThemeV4));
    localStorage.setItem(HIDDEN_WIDGETS_V4_KEY, JSON.stringify({
      hiddenWidgetsV4: state.hiddenWidgetsV4 || [],
      homeCardSettings: (state.homeCardSettings || []).filter((card) => card.visible === false).map((card) => card.id)
    }));
    localStorage.setItem(CUSTOMIZE_V4_KEY, JSON.stringify({
      customizeV4: state.customizeV4,
      designStudio: state.designStudio
    }));
  } catch {
    // The main app state still saves through STORAGE_KEY; v4 mirrors are best-effort.
  }
}

function backupLayoutV4(reason = "Layout change") {
  try {
    localStorage.setItem(LAYOUT_BACKUP_V4_KEY, JSON.stringify({ reason, ...designSnapshot() }));
    state.customizeV4 = { ...defaultState().customizeV4, ...(state.customizeV4 || {}), lastLayoutChange: reason };
  } catch {
    // Keep data-safe behavior even if storage is full.
  }
}

function loadState() {
  try {
    const loaded = { ...defaultState(), ...JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}") };
    const savedLayoutV4 = readJsonKey(LAYOUT_V4_KEY, {});
    const savedThemeV4 = readJsonKey(THEME_V4_KEY, {});
    const savedLiveV4 = readJsonKey(LIVE_THEME_V4_KEY, {});
    const savedHiddenV4 = readJsonKey(HIDDEN_WIDGETS_V4_KEY, {});
    const savedCustomizeV4 = readJsonKey(CUSTOMIZE_V4_KEY, {});
    if (savedLayoutV4 && typeof savedLayoutV4 === "object") {
      if (Array.isArray(savedLayoutV4.homeCardSettings)) loaded.homeCardSettings = savedLayoutV4.homeCardSettings;
      if (savedLayoutV4.homeCardCollapsed) loaded.homeCardCollapsed = savedLayoutV4.homeCardCollapsed;
      if (savedLayoutV4.panelLayouts) loaded.panelLayouts = savedLayoutV4.panelLayouts;
      if (savedLayoutV4.smartLayout) loaded.smartLayout = savedLayoutV4.smartLayout;
      if (savedLayoutV4.customizeV4) loaded.customizeV4 = savedLayoutV4.customizeV4;
    }
    if (savedThemeV4 && typeof savedThemeV4 === "object") {
      if (savedThemeV4.theme) loaded.theme = savedThemeV4.theme;
      if (savedThemeV4.pageStyles) loaded.pageStyles = savedThemeV4.pageStyles;
      if (savedThemeV4.pageColors) loaded.pageColors = savedThemeV4.pageColors;
      if (savedThemeV4.pageBrightness) loaded.pageBrightness = savedThemeV4.pageBrightness;
      if (savedThemeV4.globalBrightness) loaded.globalBrightness = savedThemeV4.globalBrightness;
      if (savedThemeV4.backgroundScene) loaded.backgroundScene = savedThemeV4.backgroundScene;
      if (savedThemeV4.designStudio) loaded.designStudio = savedThemeV4.designStudio;
    }
    if (savedCustomizeV4?.designStudio) loaded.designStudio = { ...(loaded.designStudio || {}), ...savedCustomizeV4.designStudio };
    if (savedCustomizeV4?.customizeV4) loaded.customizeV4 = { ...(loaded.customizeV4 || {}), ...savedCustomizeV4.customizeV4 };
    if (savedLiveV4 && typeof savedLiveV4 === "object") loaded.liveThemeV4 = savedLiveV4;
    if (Array.isArray(savedHiddenV4?.hiddenWidgetsV4)) loaded.hiddenWidgetsV4 = savedHiddenV4.hiddenWidgetsV4;
    if (!Array.isArray(loaded.bills)) loaded.bills = starterBills.map((bill) => ({ ...bill }));
    if (!Array.isArray(loaded.billChecklist) || loaded.billChecklist.length === 0) loaded.billChecklist = starterBillChecklist.map((item) => ({ ...item }));
    const defaultMenu = defaultState().menuSettings;
    loaded.menuSettings = { ...defaultMenu, ...(loaded.menuSettings || {}) };
    const savedPages = (loaded.menuSettings.pages || []).map((page) => ({
      ...page,
      id: page.id === "home" ? "dashboard" : page.id
    }));
    savedPages.forEach((page) => {
      if (page.id === "study" && page.label === "Developer Study Hub") page.label = "Study Hub";
    });
    loaded.menuSettings.pages = defaultMenuPages.map((page) => ({
      ...page,
      ...(savedPages.find((saved) => saved.id === page.id) || {})
    }));
    const savedHomeCards = loaded.homeCardSettings || [];
    loaded.homeCardSettings = defaultHomeCards.map((card) => ({ ...card, ...(savedHomeCards.find((saved) => saved.id === card.id) || {}) }));
    const savedHomeDock = (loaded.homeDockSettings || []).map((item) => ({
      ...item,
      id: item.id === "home" ? "dashboard" : item.id
    }));
    loaded.homeDockSettings = defaultHomeDock.map((item) => ({ ...item, ...(savedHomeDock.find((saved) => saved.id === item.id) || {}) }));
    loaded.homeDockSettings.forEach((item) => {
      if (item.id === "assistant" && item.label === "AI Assistant") item.label = "Ask FahimOS";
    });
    loaded.homeDockVisible = loaded.homeDockVisible !== false;
    loaded.homeFocusColor = loaded.homeFocusColor || "#2f91ff";
    loaded.homeWeatherColor = loaded.homeWeatherColor || "#0a88c7";
    loaded.homeCalendarColor = loaded.homeCalendarColor || "#087f72";
    loaded.homeWidgetStyles = {
      ...defaultState().homeWidgetStyles,
      ...(loaded.homeWidgetStyles || {}),
      focus: { ...defaultState().homeWidgetStyles.focus, ...(loaded.homeWidgetStyles?.focus || {}) },
      calendar: { ...defaultState().homeWidgetStyles.calendar, ...(loaded.homeWidgetStyles?.calendar || {}) }
    };
    loaded.lifeHubTab = loaded.lifeHubTab || "goals";
    loaded.dailyDuaState = loaded.dailyDuaState || "expanded";
    loaded.homeVisualMode = "metro";
    loaded.homeCalendarCollapsed = !!loaded.homeCalendarCollapsed;
    loaded.homeDashboardCategory = ["all", "faith", "money", "health", "school", "custom"].includes(loaded.homeDashboardCategory) ? loaded.homeDashboardCategory : "all";
    if (Number(loaded.homeDashboardLayoutVersion || 0) < 3) {
      loaded.homeCardCollapsed = Object.fromEntries(defaultHomeCards.map((card) => [card.id, true]));
      loaded.homeDashboardLayoutVersion = 3;
    }
    loaded.pageStyles = loaded.pageStyles && typeof loaded.pageStyles === "object" ? loaded.pageStyles : {};
    loaded.pageBrightness = loaded.pageBrightness && typeof loaded.pageBrightness === "object" ? loaded.pageBrightness : {};
    loaded.globalBrightness = Math.min(100, Math.max(1, Number(loaded.globalBrightness) || 100));
    loaded.brightnessEditorPage = loaded.brightnessEditorPage || "dashboard";
    loaded.pageHeaders = loaded.pageHeaders && typeof loaded.pageHeaders === "object" ? loaded.pageHeaders : {};
    loaded.pageHeaderEditorPage = document.getElementById(loaded.pageHeaderEditorPage) ? loaded.pageHeaderEditorPage : "dashboard";
    loaded.smartLayout = {
      collapsed: { ...(loaded.smartLayout?.collapsed || {}) },
      modeByPage: { ...(loaded.smartLayout?.modeByPage || {}) },
      focusByPage: { ...(loaded.smartLayout?.focusByPage || {}) }
    };
    loaded.profile = { ...defaultState().profile, ...(loaded.profile || {}) };
    loaded.discipline = { ...defaultState().discipline, ...(loaded.discipline || {}) };
    loaded.discipline.sessions = Array.isArray(loaded.discipline.sessions) ? loaded.discipline.sessions : [];
    loaded.profile.avatarsize = Math.min(180, Math.max(56, Number(loaded.profile.avatarsize) || 76));
    loaded.profile.avatarzoom = Math.min(240, Math.max(70, Number(loaded.profile.avatarzoom) || 100));
    loaded.profile.avatarx = Math.min(100, Math.max(0, Number(loaded.profile.avatarx ?? 50)));
    loaded.profile.avatary = Math.min(100, Math.max(0, Number(loaded.profile.avatary ?? 50)));
    loaded.lifeDataCollapsed = !!loaded.lifeDataCollapsed;
    loaded.lifeStatusCollapsed = !!loaded.lifeStatusCollapsed;
    loaded.lifeStatusExpanded = !!loaded.lifeStatusExpanded;
    loaded.dailyWellnessCollapsed = !!loaded.dailyWellnessCollapsed;
    loaded.lifeStatusHidden = !!loaded.lifeStatusHidden;
    loaded.dailyWellnessHidden = !!loaded.dailyWellnessHidden;
    loaded.notificationsRead = loaded.notificationsRead && typeof loaded.notificationsRead === "object" ? loaded.notificationsRead : {};
    loaded.historyView = ["daily", "journal", "pages"].includes(loaded.historyView) ? loaded.historyView : "pages";
    loaded.dailyArchives = loaded.dailyArchives && typeof loaded.dailyArchives === "object" ? loaded.dailyArchives : {};
    loaded.archiveRetentionDays = 90;
    loaded.journalDraft = { ...defaultState().journalDraft, ...(loaded.journalDraft || {}) };
    if (!loaded.journalDraft.text && loaded.essentialsNotes) loaded.journalDraft.text = loaded.essentialsNotes;
    loaded.journalEntries = Array.isArray(loaded.journalEntries) ? loaded.journalEntries : [];
    loaded.manualWorkoutDraft = { ...defaultState().manualWorkoutDraft, ...(loaded.manualWorkoutDraft || {}) };
    loaded.assistantHistory = Array.isArray(loaded.assistantHistory) ? loaded.assistantHistory.slice(0, 30) : [];
    loaded.askFahimHistory = Array.isArray(loaded.askFahimHistory) ? loaded.askFahimHistory.slice(0, 20) : [];
    loaded.completionLog = Array.isArray(loaded.completionLog) ? loaded.completionLog.slice(0, 500) : [];
    loaded.assignments = (loaded.assignments || []).map((item) => ({
      ...item,
      type: item.type || "Assignment",
      className: item.className || ""
    }));
    loaded.academicSemester = { ...defaultState().academicSemester, ...(loaded.academicSemester || {}) };
    loaded.attendanceRecords = Array.isArray(loaded.attendanceRecords) ? loaded.attendanceRecords : [];
    loaded.homeCardSettings = loaded.homeCardSettings.map((card) => card.id === "school"
      ? { ...card, label: "Classes Schedule" }
      : card);
    loaded.homeCardSettings = loaded.homeCardSettings.map((card) => card.id === "latestNotes" && card.label === "Latest Notes"
      ? { ...card, label: "Daily Notes" }
      : card);
    if (loaded.todoLists?.length === 1 && loaded.todoLists[0]?.title === "Personal" && loaded.todoLists[0]?.items?.length === 1 && loaded.todoLists[0].items[0]?.text === "Plan tomorrow") {
      loaded.todoLists = [];
    }
    Object.values(loaded.days || {}).forEach((entry) => {
      const starter = ["Review the plan", "Complete one important task"];
      if (Array.isArray(entry.checklist) && entry.checklist.length === 2 && entry.checklist.every((item, index) => item.text === starter[index] && !item.done)) {
        entry.checklist = [];
      }
    });
    loaded.tasks = (loaded.tasks || []).map((task) => ({ ...task, category: task.category || "General", priority: task.priority || "Medium" }));
    loaded.countdowns = (loaded.countdowns || []).map((countdown, index) => ({
      ...countdown,
      id: countdown.id || `countdown-${index}-${String(countdown.target || "").replace(/\D/g, "") || Date.now()}`,
      completedNotified: !!countdown.completedNotified
    }));
    loaded.dismissedCountdownId = loaded.dismissedCountdownId || "";
    loaded.quoteSeeds = { mindset: 0, famous: 0, islamic: 0, power: 0, wisdom: 0, ...(loaded.quoteSeeds || {}) };
    loaded.wisdomCategory = loaded.wisdomCategory || "all";
    loaded.favoriteWisdom = Array.isArray(loaded.favoriteWisdom) ? loaded.favoriteWisdom : [];
    loaded.designStudio = { ...defaultState().designStudio, ...(loaded.designStudio || {}) };
    loaded.customizeV4 = { ...defaultState().customizeV4, ...(loaded.customizeV4 || {}) };
    loaded.customizeV4.layoutPreset = layoutPresetOptions.some((item) => item.id === loaded.customizeV4.layoutPreset) ? loaded.customizeV4.layoutPreset : "compact-mode";
    loaded.customizeV4.spacing = ["compact", "normal", "wide"].includes(loaded.customizeV4.spacing) ? loaded.customizeV4.spacing : "normal";
    loaded.liveThemeV4 = { ...defaultState().liveThemeV4, ...(loaded.liveThemeV4 || {}) };
    loaded.liveThemeV4.id = liveThemePresets.some((item) => item.id === loaded.liveThemeV4.id) ? loaded.liveThemeV4.id : "aurora-lights";
    loaded.liveThemeV4.speed = ["slow", "normal", "fast"].includes(loaded.liveThemeV4.speed) ? loaded.liveThemeV4.speed : "normal";
    loaded.liveThemeV4.intensity = ["low", "medium", "high"].includes(loaded.liveThemeV4.intensity) ? loaded.liveThemeV4.intensity : "medium";
    loaded.hiddenWidgetsV4 = Array.isArray(loaded.hiddenWidgetsV4) ? loaded.hiddenWidgetsV4 : [];
    loaded.nutritionTracker = { ...defaultState().nutritionTracker, ...(loaded.nutritionTracker || {}) };
    loaded.nutritionTracker.meals = Array.isArray(loaded.nutritionTracker.meals) ? loaded.nutritionTracker.meals : defaultState().nutritionTracker.meals;
    loaded.devLessonTrack = loaded.devLessonTrack || "fullstack";
    loaded.devLessonIndex = Number.isFinite(Number(loaded.devLessonIndex)) ? Number(loaded.devLessonIndex) : 0;
    loaded.studyLayout = {
      sections: { ...defaultState().studyLayout.sections, ...(loaded.studyLayout?.sections || {}) },
      cards: { ...(loaded.studyLayout?.cards || {}) }
    };
    loaded.workoutProgramDays = {
      ...defaultState().workoutProgramDays,
      ...(loaded.workoutProgramDays || {})
    };
    loaded.workoutWeeklyRoutine = { ...defaultState().workoutWeeklyRoutine, ...(loaded.workoutWeeklyRoutine || {}) };
    loaded.trainingDayFilter = workoutWeekdays.includes(loaded.trainingDayFilter) ? loaded.trainingDayFilter : "All";
    loaded.workouts = Array.isArray(loaded.workouts)
      ? loaded.workouts.map((workout) => ({ ...workout, entryType: workout.entryType || "timer" }))
      : [];
    loaded.calculators = { ...defaultState().calculators, ...(loaded.calculators || {}) };
    loaded.marketChartSymbol = loaded.marketChartSymbol || "NASDAQ:AAPL";
    loaded.marketChartInterval = ["5", "15", "60", "D", "W"].includes(String(loaded.marketChartInterval)) ? String(loaded.marketChartInterval) : "D";
    loaded.marketSection = ["chart", "crypto", "portfolio", "strategy", "learn"].includes(loaded.marketSection) ? loaded.marketSection : "chart";
    loaded.marketPortfolio = Array.isArray(loaded.marketPortfolio) ? loaded.marketPortfolio : [];
    loaded.favoriteCrypto = Array.isArray(loaded.favoriteCrypto) && loaded.favoriteCrypto.length
      ? loaded.favoriteCrypto
      : defaultState().favoriteCrypto;
    loaded.marketWatchlist = Array.isArray(loaded.marketWatchlist) && loaded.marketWatchlist.length
      ? loaded.marketWatchlist
      : defaultState().marketWatchlist;
    const defaultSavings = defaultState().savings;
    loaded.savings = { ...defaultSavings, ...(loaded.savings || {}) };
    loaded.savings.goals = Array.isArray(loaded.savings.goals) ? loaded.savings.goals : defaultSavings.goals;
    loaded.savings.deposits = Array.isArray(loaded.savings.deposits) ? loaded.savings.deposits : [];
    loaded.savings.buckets = Array.isArray(loaded.savings.buckets) ? loaded.savings.buckets : defaultSavings.buckets;
    loaded.savings.strategy = Array.isArray(loaded.savings.strategy) ? loaded.savings.strategy : defaultSavings.strategy;
    loaded.jummah = { ...defaultState().jummah, ...(loaded.jummah || {}) };
    loaded.adhanSettings = { ...defaultState().adhanSettings, ...(loaded.adhanSettings || {}) };
    loaded.homeClockMode = ["digital", "analog"].includes(loaded.homeClockMode) ? loaded.homeClockMode : "digital";
    loaded.clockHourFormat = String(loaded.clockHourFormat) === "24" ? "24" : "12";
    loaded.worldClocks = Array.isArray(loaded.worldClocks) && loaded.worldClocks.length ? loaded.worldClocks : defaultState().worldClocks;
    loaded.ramadanFasts = Array.isArray(loaded.ramadanFasts) ? loaded.ramadanFasts : [];
    loaded.ramadanTaraweehHistory = Array.isArray(loaded.ramadanTaraweehHistory) ? loaded.ramadanTaraweehHistory : [];
    loaded.dismissedImportantDate = loaded.dismissedImportantDate || "";
    loaded.dismissedBillsDate = loaded.dismissedBillsDate || "";
    loaded.faithToolkit = {
      ...defaultState().faithToolkit,
      ...(loaded.faithToolkit || {}),
      goodDeeds: Array.isArray(loaded.faithToolkit?.goodDeeds) ? loaded.faithToolkit.goodDeeds : [],
      halalHabits: Array.isArray(loaded.faithToolkit?.halalHabits) ? loaded.faithToolkit.halalHabits : defaultState().faithToolkit.halalHabits
    };
    loaded.jummah.checklist = Array.isArray(loaded.jummah.checklist) ? loaded.jummah.checklist : defaultState().jummah.checklist;
    loaded.jummah.history = Array.isArray(loaded.jummah.history) ? loaded.jummah.history : [];
    loaded.recommendationSeeds = { books: 0, movies: 0, songs: 0, podcasts: 0, ...(loaded.recommendationSeeds || {}) };
    const existingUrls = new Set((loaded.learningSites || []).map((site) => site.url));
    loaded.learningSites = [
      ...lockedLearningSites.filter((site) => !existingUrls.has(site.url)).map((site) => ({ ...site })),
      ...(loaded.learningSites || [])
    ];
    return loaded;
  } catch {
    return defaultState();
  }
}

function preserveRecoverableState() {
  try {
    const previous = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!previous) return;
    const collections = ["tasks", "assignments", "importantDates", "workouts", "journalEntries", "reminders", "alarms", "countdowns", "money", "bills", "customLinks"];
    const reduced = collections.some((key) =>
      Array.isArray(previous[key]) && Array.isArray(state[key]) && state[key].length < previous[key].length
    );
    if (!reduced) return;
    const recoverable = { ...previous, history: [] };
    localStorage.setItem(RECOVERY_STATE_KEY, JSON.stringify({ savedAt: new Date().toISOString(), state: recoverable }));
  } catch {
    // Recovery is best-effort and must never block normal saving.
  }
}

function saveState() {
  state.activeDate = activeDate;
  if (state.autoSave === false) {
    writeDesignV4Keys();
    return;
  }
  syncDailyArchive(activeDate);
  cleanupDailyArchives();
  preserveRecoverableState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  writeDesignV4Keys();
}

function forceSaveState() {
  state.activeDate = activeDate;
  syncDailyArchive(activeDate);
  cleanupDailyArchives();
  preserveRecoverableState();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  writeDesignV4Keys();
}

const duplicateCleanupCollections = [
  "journalEntries", "importantDates", "tasks", "assignments", "workouts",
  "reminders", "bills", "money", "files", "history"
];

function duplicateText(value) {
  return String(value ?? "").trim().toLowerCase().replace(/\s+/g, " ");
}

function duplicateRecordKey(item, category) {
  if (!item || typeof item !== "object") return `${category}|${duplicateText(item)}`;
  const title = item.title || item.name || item.task || item.text || item.workoutName || item.filename || "";
  const date = item.date || item.when || item.due || item.added || item.completedOn || item.start || "";
  const type = item.type || item.category || item.entryType || item.status || "";
  const content = item.entry || item.content || item.notes || item.note || item.description || item.url || "";
  return [category, title, String(date).slice(0, 16), type, content].map(duplicateText).join("|");
}

function duplicateRecordScore(item) {
  if (!item || typeof item !== "object") return duplicateText(item).length;
  return Object.values(item).reduce((score, value) => {
    if (Array.isArray(value)) return score + value.length * 2;
    if (value && typeof value === "object") return score + Object.keys(value).length;
    return score + (duplicateText(value) ? 1 + Math.min(10, duplicateText(value).length / 40) : 0);
  }, 0);
}

function mergeDuplicateRecords(primary, secondary) {
  if (!primary || typeof primary !== "object" || Array.isArray(primary)) return primary;
  const merged = { ...secondary, ...primary };
  Object.keys(secondary || {}).forEach((key) => {
    const current = merged[key];
    const fallback = secondary[key];
    if ((current === "" || current == null) && fallback !== "" && fallback != null) merged[key] = fallback;
    if (Array.isArray(current) && Array.isArray(fallback)) {
      const seen = new Set();
      merged[key] = [...current, ...fallback].filter((value) => {
        const fingerprint = duplicateText(typeof value === "object" ? JSON.stringify(value) : value);
        if (seen.has(fingerprint)) return false;
        seen.add(fingerprint);
        return true;
      });
    }
  });
  return merged;
}

function analyzeDuplicateData() {
  const categories = [];
  duplicateCleanupCollections.forEach((category) => {
    const records = Array.isArray(state[category]) ? state[category] : [];
    const groups = new Map();
    records.forEach((item, index) => {
      const key = duplicateRecordKey(item, category);
      if (!groups.has(key)) groups.set(key, []);
      groups.get(key).push({ item, index });
    });
    const duplicates = [...groups.values()].filter((group) => group.length > 1);
    if (duplicates.length) {
      categories.push({
        category,
        groups: duplicates,
        duplicateCount: duplicates.reduce((sum, group) => sum + group.length - 1, 0)
      });
    }
  });
  return {
    categories,
    duplicateCount: categories.reduce((sum, item) => sum + item.duplicateCount, 0),
    mergeCount: categories.reduce((sum, item) => sum + item.groups.length, 0)
  };
}

function renderDuplicateCleanupPreview(report = analyzeDuplicateData()) {
  const modal = document.querySelector("#duplicateCleanupModal");
  const summary = document.querySelector("#duplicateCleanupSummary");
  const categories = document.querySelector("#duplicateCleanupCategories");
  const confirm = document.querySelector("#confirmDuplicateCleanup");
  if (!modal || !summary || !categories || !confirm) return;
  modal.hidden = false;
  summary.textContent = report.duplicateCount
    ? `Found ${report.duplicateCount} possible duplicate${report.duplicateCount === 1 ? "" : "s"} across ${report.categories.length} data categor${report.categories.length === 1 ? "y" : "ies"}. Review the counts before confirming.`
    : "No duplicate records were found in the main FahimOS collections.";
  categories.innerHTML = "";
  report.categories.forEach((item) => {
    const row = document.createElement("article");
    row.innerHTML = `<span>${escapeHtml(item.category.replace(/([A-Z])/g, " $1"))}</span><strong>${item.duplicateCount} duplicate${item.duplicateCount === 1 ? "" : "s"}</strong><small>${item.groups.length} record group${item.groups.length === 1 ? "" : "s"} can be merged</small>`;
    categories.append(row);
  });
  confirm.disabled = report.duplicateCount === 0;
  confirm.dataset.reportReady = report.duplicateCount ? "true" : "false";
}

function cleanDuplicateData() {
  const report = analyzeDuplicateData();
  if (!report.duplicateCount) return { removed: 0, merged: 0, categories: [] };
  const backup = {
    createdAt: new Date().toISOString(),
    storageKey: STORAGE_KEY,
    before: {},
    removed: {}
  };
  report.categories.forEach(({ category, groups }) => {
    backup.before[category] = structuredClone(state[category]);
    backup.removed[category] = [];
    const duplicateIndexes = new Set();
    const replacements = new Map();
    groups.forEach((group) => {
      const ranked = [...group].sort((a, b) => duplicateRecordScore(b.item) - duplicateRecordScore(a.item) || b.index - a.index);
      const keeper = ranked[0];
      let merged = structuredClone(keeper.item);
      ranked.slice(1).forEach((entry) => {
        merged = mergeDuplicateRecords(merged, entry.item);
        duplicateIndexes.add(entry.index);
        backup.removed[category].push(structuredClone(entry.item));
      });
      replacements.set(keeper.index, merged);
    });
    state[category] = state[category]
      .map((item, index) => replacements.get(index) || item)
      .filter((item, index) => !duplicateIndexes.has(index));
  });
  localStorage.setItem(DUPLICATE_CLEANUP_BACKUP_KEY, JSON.stringify(backup));
  forceSaveState();
  renderAll();
  return { removed: report.duplicateCount, merged: report.mergeCount, categories: report.categories.map((item) => item.category) };
}

function restoreDuplicateCleanupBackup() {
  try {
    const backup = JSON.parse(localStorage.getItem(DUPLICATE_CLEANUP_BACKUP_KEY) || "null");
    if (!backup?.before) return false;
    Object.entries(backup.before).forEach(([category, records]) => {
      if (Array.isArray(records)) state[category] = records;
    });
    forceSaveState();
    renderAll();
    return true;
  } catch {
    return false;
  }
}

function collectStyleText() {
  return [...document.styleSheets].map((sheet) => {
    try {
      return [...sheet.cssRules].map((rule) => rule.cssText).join("\n");
    } catch {
      return "";
    }
  }).join("\n")
    .replace(/url\([^)]*\)/g, "none")
    .replace(/backdrop-filter:[^;{}]+;?/g, "")
    .replace(/filter:[^;{}]+;?/g, "");
}

function prepareScreenshotClone(root) {
  root.querySelectorAll("input, textarea, select").forEach((field) => {
    if (field.tagName === "TEXTAREA") {
      field.textContent = field.value || "";
    } else if (field.tagName === "SELECT") {
      [...field.options].forEach((option) => option.toggleAttribute("selected", option.selected));
    } else {
      field.setAttribute("value", field.value || "");
      if (field.type === "checkbox" || field.type === "radio") field.toggleAttribute("checked", field.checked);
    }
  });
  root.querySelectorAll("[hidden]").forEach((node) => node.remove());
  root.querySelectorAll("script, template").forEach((node) => node.remove());
  root.querySelectorAll("iframe, video, canvas").forEach((node) => {
    const replacement = document.createElement("div");
    replacement.className = "screenshot-placeholder";
    replacement.textContent = node.title || "Preview saved in browser";
    node.replaceWith(replacement);
  });
  return root;
}

async function captureCurrentPageImage(mimeType = "image/jpeg", quality = 0.86) {
  const panel = document.querySelector(".panel.is-visible");
  if (!panel) return "";
  const width = Math.min(1440, Math.max(900, document.querySelector(".main").clientWidth || 1100));
  const stage = document.createElement("div");
  stage.className = "screenshot-stage";
  stage.style.cssText = `position:fixed;left:-12000px;top:0;width:${width}px;background:white;color:#111;padding:24px;font-family:Arial,sans-serif;`;
  const title = document.createElement("div");
  title.className = "screenshot-title";
  title.innerHTML = `<p>Your personal operating system SHAHARIAR FAHIM</p><h1>${pageTitle(currentPage)}</h1><small>Saved ${new Date().toLocaleString()}</small>`;
  stage.append(title, prepareScreenshotClone(panel.cloneNode(true)));
  document.body.append(stage);
  const height = Math.min(9000, Math.max(700, stage.scrollHeight + 48));
  const html = new XMLSerializer().serializeToString(stage);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
      <foreignObject width="100%" height="100%">
        <div xmlns="http://www.w3.org/1999/xhtml">
          <style>
            ${collectStyleText()}
            body, .screenshot-stage { background: #ffffff !important; }
            .screenshot-stage .panel { display: block !important; }
            .screenshot-stage .topbar, .screenshot-stage .save-status-toast { display: none !important; }
            .screenshot-title { margin-bottom: 24px; padding: 22px; border: 1px solid #d8e0dc; border-radius: 22px; background: #f7fbfa; }
            .screenshot-title p { margin: 0 0 6px; font-size: 13px; font-weight: 900; text-transform: uppercase; color: #68736f; }
            .screenshot-title h1 { margin: 0; font-size: 44px; line-height: 1; color: #111917; }
            .screenshot-title small { display: block; margin-top: 8px; color: #68736f; }
            .screenshot-placeholder { min-height: 180px; display: grid; place-items: center; border: 1px dashed #aab5b0; border-radius: 16px; color: #68736f; background: #f7fbfa; }
          </style>
          ${html}
        </div>
      </foreignObject>
    </svg>`;
  document.body.removeChild(stage);
  const svgDataUrl = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
  return new Promise((resolve) => {
    const image = new Image();
    const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, width, height);
      ctx.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
      try {
        resolve(canvas.toDataURL(mimeType, quality));
      } catch {
        resolve(svgDataUrl);
      }
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve(svgDataUrl);
    };
    image.src = url;
  });
}

async function saveSnapshot(label = "") {
  const title = label || pageTitle(currentPage);
  const screenshot = await captureCurrentPageImage();
  if (!screenshot) throw new Error("Screenshot capture failed. Try saving again after the page finishes loading.");
  state.history.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    page: currentPage,
    savedAt: new Date().toLocaleString(),
    screenshot,
    data: JSON.parse(JSON.stringify({
      days: state.days,
      tasks: state.tasks,
      reminders: state.reminders,
      bills: state.bills,
      classes: state.classes,
      assignments: state.assignments,
      health: state.health,
      workouts: state.workouts,
      studyBlocks: state.studyBlocks,
      customLinks: state.customLinks,
      learningSites: state.learningSites
    }))
  });
  state.history = state.history.slice(0, 30);
  try {
    forceSaveState();
  } catch {
    state.history = state.history.slice(0, 10);
    forceSaveState();
  }
  renderHistory();
}

async function saveCurrentPage(label = "") {
  const title = label || `${pageTitle(currentPage)} - ${new Date().toLocaleString()}`;
  const status = document.querySelector("#saveStatus");
  const button = document.querySelector("#savePage");
  if (status) status.textContent = "Capturing full page screenshot...";
  if (button) button.disabled = true;
  try {
    await saveSnapshot(title);
    if (status) status.textContent = `Screenshot saved ${new Date().toLocaleTimeString()} to History.`;
  } catch (error) {
    if (status) status.textContent = error.message || "Screenshot save failed.";
  } finally {
    if (button) button.disabled = false;
  }
}

function buildPrintableCurrentPage() {
  const panel = document.querySelector(".panel.is-visible");
  if (!panel) return null;
  const printable = document.createElement("section");
  printable.id = "printPage";
  printable.className = "print-page";
  const title = document.createElement("div");
  title.className = "print-title";
  title.innerHTML = `<p>Your personal operating system SHAHARIAR FAHIM</p><h1>${pageTitle(currentPage)}</h1><small>Saved ${new Date().toLocaleString()}</small>`;
  printable.append(title, prepareScreenshotClone(panel.cloneNode(true)));
  return printable;
}

function standalonePdfHtml(printable) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>${pageTitle(currentPage)} PDF Copy</title>
  <style>
    ${collectStyleText()}
    body { margin: 0; padding: 28px; background: white !important; color: #111917; font-family: Arial, sans-serif; }
    .print-page { display: block !important; }
    .print-title { margin-bottom: 18px; padding: 18px; border: 1px solid #d8e0dc; border-radius: 14px; background: #f7fbfa; }
    .print-title p { margin: 0 0 6px; color: #68736f; font-size: 11px; font-weight: 900; text-transform: uppercase; }
    .print-title h1 { margin: 0; color: #111917; font-size: 34px; line-height: 1; }
    .print-title small { display: block; margin-top: 7px; color: #68736f; }
    .panel { display: block !important; }
    .card, .hero, .date-card { break-inside: avoid; box-shadow: none !important; }
    button, .hub-strip, .resource-links, .quote-refresh { display: none !important; }
    input, textarea, select { border-color: #cfd8d3 !important; background: white !important; color: #111917 !important; }
  </style>
</head>
<body>
  ${printable.outerHTML}
  <script>window.onload = () => setTimeout(() => window.print(), 250);<\/script>
</body>
</html>`;
}

function savePdfCopyToHistory(printable) {
  const title = `${pageTitle(currentPage)} PDF - ${new Date().toLocaleString()}`;
  state.history.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    page: currentPage,
    savedAt: new Date().toLocaleString(),
    type: "pdf",
    pdfHtml: standalonePdfHtml(printable),
    data: { note: "PDF-ready copy saved. Open it from History and choose Save as PDF." }
  });
  state.history = state.history.slice(0, 30);
  forceSaveState();
  renderHistory();
}

function saveCurrentPagePdf() {
  const status = document.querySelector("#saveStatus");
  const printable = buildPrintableCurrentPage();
  if (!printable) {
    if (status) {
      status.hidden = false;
      status.textContent = "No visible page to save as PDF.";
    }
    return;
  }
  const oldPrint = document.querySelector("#printPage");
  if (oldPrint) oldPrint.remove();
  savePdfCopyToHistory(printable.cloneNode(true));
  (document.querySelector(".app-shell") || document.body).append(printable);
  if (status) {
    status.hidden = false;
    status.textContent = "PDF copy saved in History. Choose Save as PDF in the print window.";
  }
  window.print();
  window.setTimeout(() => {
    printable.remove();
    if (status) {
      status.textContent = "PDF copy saved in History.";
      window.setTimeout(() => status.hidden = true, 2200);
    }
  }, 1200);
}

async function saveCurrentPageImageCopy(format = "png") {
  const status = document.querySelector("#saveStatus");
  const button = document.querySelector("#savePage");
  const normalized = String(format).toLowerCase().includes("jpg") || String(format).toLowerCase().includes("jpeg") ? "jpg" : "png";
  const mime = normalized === "jpg" ? "image/jpeg" : "image/png";
  if (status) {
    status.hidden = false;
    status.textContent = `Capturing ${normalized.toUpperCase()} screenshot...`;
  }
  if (button) button.disabled = true;
  try {
    const imageData = await captureCurrentPageImage(mime, normalized === "jpg" ? 0.9 : 1);
    if (!imageData) throw new Error("Screenshot capture failed. Try again after the page finishes loading.");
    const filename = `${pageTitle(currentPage).replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "").toLowerCase() || "fahimos-page"}-${new Date().toISOString().slice(0, 10)}.${normalized}`;
    const link = document.createElement("a");
    link.href = imageData;
    link.download = filename;
    document.body.append(link);
    link.click();
    link.remove();
    state.history.unshift({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      title: `${pageTitle(currentPage)} ${normalized.toUpperCase()} Screenshot`,
      page: currentPage,
      savedAt: new Date().toLocaleString(),
      type: normalized,
      screenshot: imageData,
      data: { note: `${normalized.toUpperCase()} screenshot saved from FahimOS.` }
    });
    state.history = state.history.slice(0, 30);
    forceSaveState();
    renderHistory();
    if (status) status.textContent = `${normalized.toUpperCase()} screenshot saved and copied to History.`;
  } catch (error) {
    if (status) status.textContent = error.message || "Screenshot save failed.";
  } finally {
    if (button) button.disabled = false;
    if (status) window.setTimeout(() => status.hidden = true, 2600);
  }
}

function askAndSaveCurrentPage() {
  const preference = window.prompt("Save current page as PNG, JPG, or PDF?", "PNG");
  if (!preference) return;
  const normalized = preference.trim().toLowerCase();
  if (normalized === "pdf") {
    saveCurrentPagePdf();
    return;
  }
  if (normalized === "jpg" || normalized === "jpeg" || normalized === "png") {
    saveCurrentPageImageCopy(normalized);
    return;
  }
  alert("Please type PNG, JPG, or PDF.");
}

function setCustomizeMode(mode = "colors") {
  const panel = document.querySelector("#pageAppearancePanel");
  if (!panel) return;
  if (mode === "all") {
    panel.dataset.customizeMode = "all";
    document.querySelector("#customizeColorsMode")?.classList.remove("is-active");
    document.querySelector("#customizeLayoutMode")?.classList.remove("is-active");
    return;
  }
  const selected = mode === "layout" ? "layout" : "colors";
  panel.dataset.customizeMode = selected;
  document.querySelector("#customizeColorsMode")?.classList.toggle("is-active", selected === "colors");
  document.querySelector("#customizeLayoutMode")?.classList.toggle("is-active", selected === "layout");
  const target = selected === "layout" ? "#customizeEditLayout" : "#customizeColorThemes";
  window.setTimeout(() => {
    document.querySelector(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 40);
}

function setupCustomizeCollapsibles() {
  const panel = document.querySelector("#pageAppearancePanel");
  if (!panel || panel.dataset.collapsiblesReady === "true") return;
  panel.dataset.collapsiblesReady = "true";
  panel.querySelectorAll(".customize-section-card").forEach((section, index) => {
    if (section.classList.contains("customize-collapsible-section")) return;
    const heading = section.querySelector(".page-preset-heading");
    const title = heading?.querySelector("span")?.textContent?.trim()
      || heading?.querySelector("strong")?.textContent?.trim()
      || section.id?.replace(/^customize/, "").replace(/([A-Z])/g, " $1").trim()
      || `Customize Section ${index + 1}`;
    const subtitle = heading?.querySelector("small")?.textContent?.trim() || "Open controls for this section.";
    const body = document.createElement("div");
    body.className = "customize-section-body";
    [...section.childNodes].forEach((node) => body.append(node));
    body.querySelector(":scope > .page-preset-heading")?.remove();
    const toggle = document.createElement("button");
    toggle.className = "customize-section-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "true");
    toggle.innerHTML = `<span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(subtitle)}</small></span><b aria-hidden="true">-</b>`;
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") !== "false";
      toggle.setAttribute("aria-expanded", String(!expanded));
      body.hidden = expanded;
      const marker = toggle.querySelector("b");
      if (marker) marker.textContent = expanded ? "+" : "-";
    });
    section.classList.add("customize-collapsible-section");
    section.append(toggle, body);
  });
}

function buildHomeProfilePrintable() {
  const dashboard = document.querySelector("#dashboard");
  const profile = document.querySelector("#profile");
  if (!dashboard || !profile) return null;
  const printable = document.createElement("section");
  printable.id = "printPage";
  printable.className = "print-page combined-profile-report";
  const title = document.createElement("div");
  title.className = "print-title";
  title.innerHTML = `<p>FahimOS personal operating system</p><h1>Home + Profile Report</h1><small>Created ${new Date().toLocaleString()}</small>`;
  const homeSection = document.createElement("section");
  homeSection.className = "combined-report-section";
  homeSection.innerHTML = "<h2>Home Dashboard</h2>";
  homeSection.append(prepareScreenshotClone(dashboard.cloneNode(true)));
  const profileSection = document.createElement("section");
  profileSection.className = "combined-report-section";
  profileSection.innerHTML = "<h2>Profile</h2>";
  profileSection.append(prepareScreenshotClone(profile.cloneNode(true)));
  printable.append(title, homeSection, profileSection);
  return printable;
}

function saveCombinedReportToHistory({ title, type, screenshot = "", pdfHtml = "" }) {
  state.history.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    title,
    page: "profile",
    savedAt: new Date().toLocaleString(),
    type,
    screenshot,
    pdfHtml,
    data: { note: "Combined Home and Profile report." }
  });
  state.history = state.history.slice(0, 30);
  forceSaveState();
  renderHistory();
}

function saveHomeProfilePdf() {
  const printable = buildHomeProfilePrintable();
  if (!printable) return;
  const title = `Home + Profile PDF - ${new Date().toLocaleString()}`;
  saveCombinedReportToHistory({ title, type: "pdf", pdfHtml: standalonePdfHtml(printable) });
  document.body.append(printable);
  window.print();
  window.setTimeout(() => printable.remove(), 1200);
}

async function captureHomeProfileImage() {
  const printable = buildHomeProfilePrintable();
  if (!printable) return "";
  const width = Math.min(1440, Math.max(900, document.querySelector(".main")?.clientWidth || 1100));
  const stage = document.createElement("div");
  stage.className = "screenshot-stage combined-report-stage";
  stage.style.cssText = `position:fixed;left:-12000px;top:0;width:${width}px;background:#fff;color:#111;padding:24px;font-family:Arial,sans-serif;`;
  stage.append(printable);
  document.body.append(stage);
  const height = Math.min(12000, Math.max(900, stage.scrollHeight + 48));
  const html = new XMLSerializer().serializeToString(stage);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}"><foreignObject width="100%" height="100%"><div xmlns="http://www.w3.org/1999/xhtml"><style>${collectStyleText()}
    .screenshot-stage,.combined-profile-report{display:block!important;background:#fff!important;color:#111!important}
    .combined-profile-report .panel{display:block!important}
    .combined-profile-report .home-card-body,.combined-profile-report .smart-tile-body{display:block!important}
    .combined-profile-report .home-card-toggle,.combined-profile-report button{display:none!important}
    .combined-report-section{margin:0 0 28px}.combined-report-section>h2{padding:12px 0;border-bottom:2px solid #1a8fab;color:#111}
  </style>${html}</div></foreignObject></svg>`;
  stage.remove();
  return new Promise((resolve) => {
    const image = new Image();
    const url = URL.createObjectURL(new Blob([svg], { type: "image/svg+xml;charset=utf-8" }));
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const context = canvas.getContext("2d");
      context.fillStyle = "#fff";
      context.fillRect(0, 0, width, height);
      context.drawImage(image, 0, 0);
      URL.revokeObjectURL(url);
      try {
        resolve(canvas.toDataURL("image/jpeg", 0.9));
      } catch {
        resolve("");
      }
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      resolve("");
    };
    image.src = url;
  });
}

async function exportHomeProfileImage() {
  const screenshot = await captureHomeProfileImage();
  if (!screenshot) return;
  const title = `Home + Profile Image - ${new Date().toLocaleString()}`;
  saveCombinedReportToHistory({ title, type: "image", screenshot });
  const link = document.createElement("a");
  link.href = screenshot;
  link.download = `fahimos-home-profile-${todayKey()}.jpg`;
  link.click();
}

function updateAutoSaveButton() {
  const button = document.querySelector("#autoSaveToggle");
  if (!button) return;
  const enabled = state.autoSave !== false;
  button.textContent = enabled ? "Auto-save On" : "Auto-save Off";
  button.classList.toggle("is-off", !enabled);
}

function updatePageLabels() {
  const menu = state.menuSettings || defaultState().menuSettings;
  document.querySelector("#pageChooser").textContent = menu.buttonText || "Command Menu";
  const launcherEyebrow = document.querySelector(".launcher-head .eyebrow");
  const launcherTitle = document.querySelector(".launcher-head h2");
  if (launcherEyebrow) launcherEyebrow.textContent = menu.eyebrow || "Command menu";
  if (launcherTitle) launcherTitle.textContent = menu.title || "Where do you want to go?";
  const nav = document.querySelector(".tabs");
  if (nav) {
    menu.pages?.forEach((page) => {
      const tab = nav.querySelector(`.tab[data-tab="${page.id}"]`);
      if (tab) nav.append(tab);
    });
  }
  document.querySelectorAll(".tab").forEach((tab) => {
    const config = menu.pages?.find((page) => page.id === tab.dataset.tab);
    const label = config?.label || state.pageNames?.[tab.dataset.tab] || tab.querySelector("span:last-child")?.textContent || tab.textContent;
    const icons = {
      dashboard: "\u2302",
      life: "\u25ce",
      faith: "\u263d",
      health: "+",
      study: "\u270e",
      money: "$",
      history: "\u21ba",
      settings: "\u2699"
    };
    tab.replaceChildren();
    const icon = document.createElement("span");
    icon.className = "tab-icon";
    icon.setAttribute("aria-hidden", "true");
    icon.textContent = icons[tab.dataset.tab] || "\u2022";
    const text = document.createElement("span");
    text.textContent = label;
    tab.append(icon, text);
    tab.hidden = config ? config.visible === false : false;
  });
}

function placeLifeDataOnHome() {
  const section = document.querySelector(".life-data-section");
  const lifeHub = document.querySelector("#life");
  const dashboard = document.querySelector("#dashboard");
  const homeCards = dashboard?.querySelector("#homeCards");
  const commandGrid = lifeHub?.querySelector(".life-command-grid");
  const overview = lifeHub?.querySelector(".life-hub-overview-layout");
  if (overview && commandGrid) {
    lifeHub.insertBefore(commandGrid, overview);
    overview.remove();
  }
  if (!section || !dashboard || !homeCards) return;
  section.classList.remove("life-hub-data-section");
  if (section.parentElement !== dashboard || section.previousElementSibling !== homeCards) homeCards.after(section);
}

function arrangeHomeDashboard() {
  const dashboard = document.querySelector("#dashboard");
  const cards = dashboard?.querySelector("#homeCards");
  const commandCards = dashboard?.querySelector(".home-command-cards");
  const wisdom = commandCards?.querySelector(".wisdom-command-card");
  const status = dashboard?.querySelector(".home-status-rail");
  const wellness = dashboard?.querySelector(".daily-wellness-card");
  const right = dashboard?.querySelector(".home-right-dashboard");
  if (cards && status && status.parentElement !== dashboard) cards.after(status);
  dashboard?.querySelector(".home-command-layout")?.classList.remove("wellness-inline");
  if (right) right.hidden = true;
  if (status) status.hidden = true;
  if (wellness) wellness.hidden = true;
  dashboard?.querySelector(".home-upcoming-widget")?.setAttribute("hidden", "");
  applyHomeVisualMode();
}

function applyHomeVisualMode() {
  state.homeVisualMode = "metro";
  document.body.classList.remove("home-view-modern");
  document.body.classList.add("home-view-metro");
}

function normalizeHomeCardOrder() {
  const order = defaultHomeCards.map((card) => card.id);
  const existing = state.homeCardSettings || defaultHomeCards.map((card) => ({ ...card }));
  state.homeCardSettings = [
    ...order.map((id) => ({ ...defaultHomeCards.find((card) => card.id === id), ...(existing.find((card) => card.id === id) || {}) })),
    ...existing.filter((card) => !order.includes(card.id))
  ].filter((card) => card && card.id);
  if (!state.homeChecklistMovedToGlance) {
    state.homeCardSettings = state.homeCardSettings.map((card) => card.id === "checklist" ? { ...card, visible: false } : card);
    state.homeChecklistMovedToGlance = true;
  }
  if (!state.homeDisciplineTrackerReturned) {
    state.homeCardSettings = state.homeCardSettings.map((card) => card.id === "disciplineScore" ? { ...card, label: "Discipline Streak", visible: true } : card);
    state.homeDisciplineTrackerReturned = true;
  }
}

function applyVariedTileColors() {
  const selectors = [
    "#homeCards > [data-home-card]",
    ".home-command-card",
    ".home-command-brief",
    ".home-upcoming-widget",
    ".smart-tile",
    ".faith-widget-tile",
    ".life-command-tile",
    ".study-launch-card",
    ".workout-coach-tile",
    ".health-command-tile",
    ".school-command-card"
  ];
  const tiles = [...document.querySelectorAll(selectors.join(","))];
  let previousTone = -1;
  tiles.forEach((tile, index) => {
    for (let tone = 0; tone < 8; tone += 1) tile.classList.remove(`tile-tone-${tone}`);
    const label = duplicateText(tile.dataset.homeCard || tile.textContent).slice(0, 80);
    let hash = tileColorSeed + index * 17;
    for (let charIndex = 0; charIndex < label.length; charIndex += 1) hash = (hash * 31 + label.charCodeAt(charIndex)) >>> 0;
    let tone = hash % 8;
    if (tone === previousTone) tone = (tone + 3) % 8;
    tile.classList.add(`tile-tone-${tone}`);
    previousTone = tone;
  });
}

function arrangeMoneyPriorities() {
  const money = document.querySelector("#money");
  const main = money?.querySelector(".money-main-priority");
  const stats = main?.querySelector(".stats");
  const ledger = main?.querySelector(".table-wrap");
  const bills = money?.querySelector(".monthly-bills-priority");
  const savings = money?.querySelector(".savings-tool-group");
  if (!main || !stats || !ledger || !bills || !savings) return;
  let cashflow = main.querySelector(".cashflow-priority-panel");
  if (!cashflow) {
    cashflow = document.createElement("section");
    cashflow.className = "cashflow-priority-panel";
    cashflow.innerHTML = `
      <div class="cashflow-priority-heading">
        <div>
          <p class="eyebrow">Cashflow priority</p>
          <h3>Income, Expenses, and Balance</h3>
        </div>
        <button id="addMoneyRow" class="primary-btn compact-action" type="button">Add Transaction</button>
      </div>
    `;
    main.prepend(cashflow);
  }
  cashflow.append(stats, ledger);
  savings.classList.add("savings-vault-feature");
  cashflow.after(bills, savings);
}

function initializeSettingsAccordions() {
  const settings = document.querySelector("#settings");
  if (!settings || settings.dataset.accordionsReady === "true") return;
  const cards = [
    ...settings.querySelectorAll(":scope > article.card"),
    ...settings.querySelectorAll(":scope > .grid > article.card")
  ];
  cards.forEach((card, index) => {
    if (card.closest(".settings-accordion")) return;
    const title = card.querySelector("h3")?.textContent?.trim() || `Settings Section ${index + 1}`;
    const details = document.createElement("details");
    details.className = "settings-accordion";
    details.open = index === 0;
    const summary = document.createElement("summary");
    summary.innerHTML = `<span>${escapeHtml(title)}</span><small>Expand or collapse</small>`;
    const body = document.createElement("div");
    body.className = "settings-accordion-body";
    card.before(details);
    details.append(summary, body);
    body.append(card);
  });
  settings.dataset.accordionsReady = "true";
}

function initializeCustomizeAccordions() {
  const panel = document.querySelector("#pageAppearancePanel");
  if (!panel || panel.dataset.accordionsReady === "true") return;
  const sections = [...panel.querySelectorAll(":scope > .customize-section-card")];
  sections.forEach((section, index) => {
    if (section.querySelector(":scope > .customize-section-toggle")) return;
    const heading = section.querySelector(":scope > .page-preset-heading");
    const title = heading?.querySelector("span")?.textContent?.trim()
      || section.id?.replace(/^customize/i, "").replace(/([A-Z])/g, " $1").trim()
      || `Customize Section ${index + 1}`;
    const subtitle = heading?.querySelector("small")?.textContent?.trim() || "Open controls for this section.";
    const body = document.createElement("div");
    body.className = "customize-section-body";
    const toggle = document.createElement("button");
    toggle.className = "customize-section-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", index < 2 ? "true" : "false");
    toggle.innerHTML = `<span><strong>${escapeHtml(title)}</strong><small>${escapeHtml(subtitle)}</small></span><b aria-hidden="true">${index < 2 ? "-" : "+"}</b>`;
    if (heading) heading.remove();
    [...section.childNodes].forEach((node) => body.append(node));
    section.prepend(toggle, body);
    section.classList.add("customize-collapsible-section");
    section.classList.toggle("is-customize-collapsed", index >= 2);
    body.hidden = index >= 2;
  });
  panel.addEventListener("click", (event) => {
    const toggle = event.target.closest(".customize-section-toggle");
    if (!toggle || !panel.contains(toggle)) return;
    const section = toggle.closest(".customize-collapsible-section");
    const body = section?.querySelector(":scope > .customize-section-body");
    if (!section || !body) return;
    const collapsed = section.classList.toggle("is-customize-collapsed");
    body.hidden = collapsed;
    toggle.setAttribute("aria-expanded", String(!collapsed));
    const icon = toggle.querySelector("b");
    if (icon) icon.textContent = collapsed ? "+" : "-";
  });
  panel.dataset.accordionsReady = "true";
}

function organizeSettingsTabs() {
  const settings = document.querySelector("#settings");
  if (!settings || settings.querySelector(".settings-category-tabs")) return;
  const groups = [
    ["appearance", "Appearance", /theme|brightness|header|colors/i],
    ["widgets", "Widgets & Navigation", /front page|dock|menu/i],
    ["data", "Data & Storage", /data|github|storage/i],
    ["audio", "Audio & Notifications", /audio|notification/i],
    ["account", "Profile & System", /profile|assistant|automation|tools|info/i]
  ];
  const tabs = document.createElement("div");
  tabs.className = "settings-category-tabs";
  groups.forEach(([id, label]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `settings-category-tab${id === "appearance" ? " is-active" : ""}`;
    button.dataset.settingsGroup = id;
    button.textContent = label;
    tabs.append(button);
  });
  settings.querySelector(".section-head")?.after(tabs);
  const accordions = [...settings.querySelectorAll(".settings-accordion")];
  accordions.forEach((details) => {
    const title = details.querySelector("summary span")?.textContent || "";
    const match = groups.find(([, , pattern]) => pattern.test(title));
    details.dataset.settingsGroup = match?.[0] || "account";
  });
  const select = (id) => {
    tabs.querySelectorAll("button").forEach((button) => button.classList.toggle("is-active", button.dataset.settingsGroup === id));
    accordions.forEach((details) => details.hidden = details.dataset.settingsGroup !== id);
  };
  tabs.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-settings-group]");
    if (button) select(button.dataset.settingsGroup);
  });
  select("appearance");
}

function arrangeWorkoutHub() {
  const page = document.querySelector("#workout");
  const strategy = page?.querySelector(".workout-daily-command");
  const navigation = page?.querySelector(".workout-coach-nav");
  const command = page?.querySelector(".workout-command-grid");
  if (!page || !strategy || !navigation || !command) return;
  page.querySelector(".training-system-launcher")?.remove();
  page.querySelector(".section-head")?.after(strategy, navigation, command);
  const guidance = document.querySelector("#workoutGuidance");
  const coachTarget = document.querySelector("#coachCommandContent");
  if (guidance && coachTarget && guidance.parentElement !== coachTarget) coachTarget.append(guidance);
}

function arrangeHealthHub() {
  const health = document.querySelector("#health");
  const layout = health?.querySelector(".health-command-layout");
  if (!health || !layout) return;
  health.querySelector(".health-bottom-widgets")?.remove();
  const main = layout.querySelector(".health-grid");
  const currentRail = layout.querySelector(".health-wellness-rail");
  const metrics = health.querySelector(":scope > .health-metric-grid");
  if (main && currentRail) {
    [...currentRail.children].forEach((item) => main.append(item));
    currentRail.remove();
  }
  if (metrics) {
    metrics.classList.add("health-metric-rail");
    layout.append(metrics);
  }
}

function arrangeFaithHub() {
  const faith = document.querySelector("#faith");
  const grid = faith?.querySelector(".faith-main-command-grid");
  const hero = faith?.querySelector(".faith-command-hero");
  if (!faith || !grid || !hero) return;
  hero.classList.add("faith-dashboard-tile");
  if (hero.parentElement !== grid || hero.previousElementSibling) grid.prepend(hero);
}

function renderLifeHubTabs(tab = state.lifeHubTab || "goals") {
  const life = document.querySelector("#life");
  if (!life) return;
  const selected = life.querySelector(`[data-life-panel="${tab}"]`) ? tab : "goals";
  state.lifeHubTab = selected;
  life.querySelectorAll("[data-life-tab]").forEach((button) => button.classList.toggle("is-active", button.dataset.lifeTab === selected));
  life.querySelectorAll("[data-life-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.lifePanel === selected));
  const railDate = life.querySelector("#lifeRailDate");
  if (railDate) railDate.textContent = new Date(`${activeDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
}

function arrangeSettingsPriority() {
  const settings = document.querySelector("#settings");
  const grid = settings?.querySelector(":scope > .grid");
  if (!grid) return;
  const headerAccordion = [...settings.querySelectorAll(":scope > .settings-accordion")]
    .find((details) => details.querySelector("summary span")?.textContent?.trim() === "Page Header Messages");
  const dataAccordion = [...grid.querySelectorAll(":scope > .settings-accordion")]
    .find((details) => details.querySelector("summary span")?.textContent?.trim() === "Data");
  if (headerAccordion && dataAccordion) dataAccordion.after(headerAccordion);
}

function updateHomeCardSettings() {
  normalizeHomeCardOrder();
  const settings = state.homeCardSettings || defaultHomeCards.map((card) => ({ ...card }));
  const dashboard = document.querySelector("#dashboard");
  const grid = document.querySelector("#homeCards");
  if (!dashboard) return;
  settings.forEach((config) => {
    const card = dashboard.querySelector(`[data-home-card="${config.id}"]`);
    if (!card) return;
    const heading = card.querySelector("h3");
    if (heading) heading.textContent = config.label || defaultHomeCards.find((item) => item.id === config.id)?.label || config.id;
    card.hidden = config.visible === false;
    if (grid) grid.append(card);
  });
  ensureHomeCardCollapse();
  renderHomeLayoutControls();
}

const homeCardPageTargets = {
  overview: "dashboard",
  todos: "todos",
  schedules: "daily",
  school: "study",
  prayer: "faith",
  money: "money",
  latestNotes: "life",
  dailyWorkout: "workout",
  discipline: "discipline",
  sleep: "health",
  checklist: "daily",
  readiness: "lifeDataDetails",
  wins: "life",
  nextStep: "roadmap",
  financialHealth: "money",
  debtProgress: "debtHub",
  savingsGoal: "savingsHub",
  weeklyReview: "life",
  monthlyWins: "life",
  learningDashboard: "study",
  lifeStatistics: "lifeDataDetails",
  disciplineScore: "discipline",
  prayerConsistency: "faith",
  studySprint: "study"
};

function ensureHomeTilePageButton(tileHead, cardId) {
  const target = homeCardPageTargets[cardId];
  if (!tileHead || !target) return;
  let pageButton = tileHead.querySelector(".tile-page-btn");
  if (!pageButton) {
    pageButton = document.createElement("button");
    pageButton.className = "tile-page-btn hub-link";
    pageButton.type = "button";
    pageButton.textContent = "Open";
    pageButton.setAttribute("aria-label", "Open full page");
    tileHead.append(pageButton);
  }
  pageButton.dataset.openTab = target;
  pageButton.title = `Open ${pageTitle(target)}`;
}

function ensureHomeCardCollapse() {
  const grid = document.querySelector("#homeCards");
  if (!grid) return;
  state.homeCardCollapsed = state.homeCardCollapsed || {};
  grid.querySelectorAll("[data-home-card]").forEach((card) => {
    const cardId = card.dataset.homeCard;
    const tileHead = card.querySelector(":scope > .tile-head");
    const tilePreview = card.querySelector(":scope > .tile-preview");
    if (tileHead && tilePreview) {
      ensureHomeTilePageButton(tileHead, cardId);
      const toggle = tileHead.querySelector(".tile-open-btn") || tileHead.querySelector("button");
      if (toggle && !toggle.dataset.homeCollapseBound) {
        toggle.dataset.homeCollapseBound = "true";
        toggle.setAttribute("aria-label", "Expand or collapse dashboard card");
        toggle.addEventListener("click", (event) => {
          event.stopPropagation();
          state.homeCardCollapsed[cardId] = !state.homeCardCollapsed[cardId];
          saveState();
          ensureHomeCardCollapse();
          scheduleHomeMasonry();
        });
      }
      const collapsed = state.homeCardCollapsed[cardId] === true;
      card.classList.toggle("is-collapsed", collapsed);
      tilePreview.hidden = false;
      tilePreview.setAttribute("aria-hidden", "false");
      card.setAttribute("aria-expanded", String(!collapsed));
      if (toggle) {
        toggle.textContent = collapsed ? "Details" : "Close";
        toggle.title = collapsed ? "Expand this tab" : "Collapse this tab";
        toggle.setAttribute("aria-expanded", String(!collapsed));
      }
      return;
    }
    let header = card.querySelector(":scope > .home-card-header");
    const heading = card.querySelector(":scope > h3") || card.querySelector(".home-card-header h3");
    if (!heading) return;
    if (!header) {
      header = document.createElement("div");
      header.className = "home-card-header";
      card.insertBefore(header, heading);
      header.append(heading);
    }
    let toggle = header.querySelector(".home-card-toggle");
    if (!toggle) {
      toggle = document.createElement("button");
      toggle.className = "home-card-toggle";
      toggle.type = "button";
      toggle.setAttribute("aria-label", "Expand or collapse dashboard card");
      toggle.addEventListener("click", (event) => {
        event.stopPropagation();
        state.homeCardCollapsed[cardId] = !state.homeCardCollapsed[cardId];
        saveState();
        ensureHomeCardCollapse();
        scheduleHomeMasonry();
      });
      header.append(toggle);
    }
    const dismiss = card.querySelector(":scope > .home-widget-dismiss, :scope > .home-card-body > .home-widget-dismiss");
    if (dismiss && dismiss.parentElement !== header) header.insertBefore(dismiss, toggle);
    let body = card.querySelector(":scope > .home-card-body");
    if (!body) {
      body = document.createElement("div");
      body.className = "home-card-body";
      header.after(body);
    }
    [...card.children].forEach((child) => {
      if (child.classList.contains("home-card-tools") || child.classList.contains("home-card-header") || child.classList.contains("home-card-body") || child.classList.contains("home-widget-dismiss")) return;
      body.append(child);
    });
    const collapsed = state.homeCardCollapsed[cardId] === true;
    card.classList.toggle("is-collapsed", collapsed);
    body.hidden = false;
    body.setAttribute("aria-hidden", "false");
    card.setAttribute("aria-expanded", String(!collapsed));
    toggle.textContent = collapsed ? "Open" : "Close";
    toggle.title = collapsed ? "Expand this tab" : "Collapse this tab";
    toggle.setAttribute("aria-expanded", String(!collapsed));
  });
  scheduleHomeMasonry();
}

function scheduleHomeMasonry() {
  window.requestAnimationFrame(() => layoutHomeMasonry());
}

function layoutHomeMasonry() {
  const grid = document.querySelector("#homeCards");
  if (!grid) return;
  const styles = window.getComputedStyle(grid);
  const row = Number.parseFloat(styles.getPropertyValue("grid-auto-rows")) || 8;
  const gap = Number.parseFloat(styles.getPropertyValue("row-gap")) || 8;
  grid.querySelectorAll(":scope > [data-home-card]:not([hidden])").forEach((card) => {
    card.style.gridRowEnd = "auto";
    const height = card.getBoundingClientRect().height;
    const span = Math.max(12, Math.ceil((height + gap) / (row + gap)));
    card.style.gridRowEnd = `span ${span}`;
  });
}

function renderHomeLayoutControls() {
  const grid = document.querySelector("#homeCards");
  if (!grid) return;
  document.querySelectorAll(".home-card-tools").forEach((tools) => tools.remove());
  grid.querySelectorAll("[data-home-card]").forEach((card) => {
    card.draggable = false;
    card.classList.remove("is-dragging");
    card.ondragstart = null;
    card.ondragover = null;
    card.ondrop = null;
    card.ondragend = null;
  });
  grid.classList.toggle("is-editing", panelLayoutEditMode);
  const settings = state.homeCardSettings || defaultHomeCards.map((card) => ({ ...card }));
  settings.forEach((config, index) => {
    const card = grid.querySelector(`[data-home-card="${config.id}"]`);
    if (!card || config.visible === false) return;
    if (!panelLayoutEditMode) return;
    card.draggable = true;
    card.ondragstart = (event) => {
      event.dataTransfer.setData("text/plain", config.id);
      event.dataTransfer.effectAllowed = "move";
      card.classList.add("is-dragging");
    };
    card.ondragover = (event) => {
      event.preventDefault();
      event.dataTransfer.dropEffect = "move";
    };
    card.ondrop = (event) => {
      event.preventDefault();
      const draggedId = event.dataTransfer.getData("text/plain");
      const targetId = config.id;
      if (!draggedId || draggedId === targetId) return;
      const from = settings.findIndex((item) => item.id === draggedId);
      const to = settings.findIndex((item) => item.id === targetId);
      if (from < 0 || to < 0) return;
      const [moved] = settings.splice(from, 1);
      settings.splice(to, 0, moved);
      state.homeCardSettings = settings;
      saveState();
      updateHomeCardSettings();
      renderHomeCardSettings();
    };
    card.ondragend = () => {
      card.classList.remove("is-dragging");
      renderHomeLayoutControls();
    };
    const tools = document.createElement("div");
    tools.className = "home-card-tools";
    const handle = document.createElement("span");
    handle.className = "drag-handle";
    handle.innerHTML = "<i></i><i></i><i></i><i></i><i></i><i></i>";
    handle.title = "Drag to rearrange";
    handle.setAttribute("aria-label", "Drag to rearrange");
    const hide = document.createElement("button");
    hide.className = "danger-btn compact-action";
    hide.type = "button";
    hide.textContent = "Hide";
    hide.addEventListener("click", (event) => {
      event.stopPropagation();
      config.visible = false;
      state.homeCardSettings = settings;
      saveState();
      updateHomeCardSettings();
      renderHomeCardSettings();
    });
    tools.append(handle, hide);
    card.prepend(tools);
  });
  const editButton = document.querySelector("#editHomeLayout");
  if (editButton) {
    editButton.classList.toggle("is-active", panelLayoutEditMode);
    editButton.title = panelLayoutEditMode ? "Done editing this page layout" : "Edit this page layout";
  }
}

function layoutCardKey(card, index) {
  const heading = card.querySelector("h3, h2")?.textContent?.trim() || card.id || `card-${index}`;
  return heading.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "") || `card-${index}`;
}

function visiblePanel() {
  return document.querySelector(".panel.is-visible");
}

function panelLayoutContainers(panel) {
  if (!panel) return [];
  const excluded = [
    "form-grid", "schedule-grid", "page-appearance-grid", "status-list",
    "workout-exercise-list", "workout-log-fields", "settings-accordion-body",
    "table-wrap", "calendar-grid", "prayer-cards", "panel-layout-tools",
    "home-card-body", "portfolio-position-fields", "trade-plan-grid",
    "journal-history-fields", "manual-workout-form", "workout-history-fields"
  ];
  const candidates = [
    panel,
    ...panel.querySelectorAll(
      "section, article, details, nav, aside, .grid, [class*='grid'], [class*='strip'], " +
      "[class*='rail'], [class*='nav'], [class*='launcher'], [class*='feature'], " +
      "[class*='workspace'], [class*='dashboard'], [class*='overview'], [class*='actions'], " +
      ".resource-links"
    )
  ];
  return candidates.filter((container) => {
    if (excluded.some((name) => container.classList.contains(name))) return false;
    if (container.closest(".panel-layout-tools")) return false;
    if (container.matches("form, label, table, thead, tbody, tr")) return false;
    const items = panelLayoutItems(container);
    return items.length > 1;
  });
}

function panelLayoutItems(container) {
  if (!container) return [];
  const excludedClasses = [
    "section-head", "topbar", "panel-layout-tools", "home-card-tools",
    "home-card-header", "home-card-body", "suite-heading", "page-appearance-head",
    "launcher-head", "market-terminal-toolbar", "portfolio-position-head",
    "portfolio-position-actions"
  ];
  return [...container.children].filter((child) => {
    if (excludedClasses.some((name) => child.classList.contains(name))) return false;
    if (child.matches("script, style, template, form, label, input, select, textarea, option, table, thead, tbody, tr, th, td")) return false;
    if (child.hidden && !child.dataset.panelLayoutKey) return false;
    if (child.matches("article, section, details, nav, aside, button, a, .card, .money-widget, .resource-tile, .future-widget, .status-pill")) return true;
    if (child.tagName !== "DIV") return false;
    return !!(child.id || [...child.classList].some((name) =>
      /grid|strip|rail|section|command|workspace|dashboard|overview|widget|panel|group|list|cards|tools|hero|summary|feed|timeline/i.test(name)
    ));
  });
}

function panelContainerKey(container, index) {
  if (container.dataset.panelContainerKey) return container.dataset.panelContainerKey;
  const semantic = container.id
    || [...container.classList].find((name) => /grid|strip|rail|nav|links/.test(name))
    || `group-${index + 1}`;
  container.dataset.panelContainerKey = `${semantic}-${index + 1}`;
  return container.dataset.panelContainerKey;
}

function panelItemKey(item, index) {
  if (item.dataset.panelLayoutKey) return item.dataset.panelLayoutKey;
  const heading = item.querySelector("h2, h3, strong")?.textContent?.trim();
  const semantic = item.id
    || item.dataset.openTab
    || item.dataset.homeCard
    || item.dataset.studyCard
    || item.dataset.studySection
    || heading
    || item.textContent?.trim().slice(0, 45)
    || `${item.tagName.toLowerCase()}-${index + 1}`;
  item.dataset.panelLayoutKey = `${String(semantic).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}-${index + 1}`;
  return item.dataset.panelLayoutKey;
}

function bindPointerLayoutDrag(handle, card, panel, layout, gridEntries, sourceContainerKey) {
  handle.onclick = (event) => {
    event.preventDefault();
    event.stopPropagation();
  };
  handle.onpointerdown = (event) => {
    if (!panelLayoutEditMode || event.pointerType === "mouse") return;
    event.preventDefault();
    event.stopPropagation();
    const draggedKey = card.dataset.panelLayoutKey;
    card.classList.add("is-dragging");
    card.style.pointerEvents = "none";
    handle.setPointerCapture?.(event.pointerId);
    const move = (moveEvent) => {
      const beneath = document.elementFromPoint(moveEvent.clientX, moveEvent.clientY);
      const targetItem = beneath?.closest?.("[data-panel-layout-key]");
      const targetGrid = beneath?.closest?.(".panel-layout-dropzone");
      if (!targetGrid || !panel.contains(targetGrid) || card === targetGrid || card.contains(targetGrid)) return;
      if (targetItem && targetItem !== card && targetGrid.contains(targetItem) && !card.contains(targetItem)) {
        targetGrid.insertBefore(card, targetItem);
      } else if (beneath === targetGrid || !targetItem) {
        targetGrid.append(card);
      }
    };
    const finish = () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", finish);
      document.removeEventListener("pointercancel", finish);
      card.style.pointerEvents = "";
      card.classList.remove("is-dragging");
      const targetGrid = card.parentElement?.closest?.(".panel-layout-dropzone");
      const targetContainerKey = targetGrid?.dataset.panelContainerKey;
      if (targetContainerKey) {
        layout.moves[draggedKey] = targetContainerKey;
        Object.keys(layout.order).forEach((keyName) => {
          layout.order[keyName] = (layout.order[keyName] || []).filter((itemKey) => itemKey !== draggedKey);
        });
        [sourceContainerKey, targetContainerKey].filter(Boolean).forEach((containerKey) => {
          const entry = gridEntries.find((item) => item.containerKey === containerKey);
          if (entry) layout.order[containerKey] = panelLayoutItems(entry.grid).map((item) => item.dataset.panelLayoutKey);
        });
        forceSaveState();
      }
      renderPanelLayoutControls();
    };
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", finish, { once: true });
    document.addEventListener("pointercancel", finish, { once: true });
  };
}

function renderPanelLayoutControls() {
  document.body.classList.toggle("layout-edit-mode", panelLayoutEditMode);
  document.querySelectorAll(".panel-layout-tools").forEach((tools) => tools.remove());
  document.querySelectorAll(".drag-handle-overlay").forEach((handle) => handle.remove());
  document.querySelectorAll(".panel-layout-editing").forEach((grid) => grid.classList.remove("panel-layout-editing"));
  document.querySelectorAll(".panel-layout-dropzone").forEach((grid) => {
    grid.classList.remove("panel-layout-dropzone");
    grid.ondragover = null;
    grid.ondrop = null;
  });
  document.querySelectorAll("[data-panel-layout-key]").forEach((card) => {
    card.draggable = false;
    card.classList.remove("is-dragging");
    card.ondragstart = null;
    card.ondragover = null;
    card.ondrop = null;
    card.ondragend = null;
  });
  const panel = visiblePanel();
  if (!panel) return;
  const layout = state.panelLayouts?.[currentPage] || { hidden: {}, order: {}, moves: {}, sizes: {} };
  layout.hidden = layout.hidden || {};
  layout.order = layout.order || {};
  layout.moves = layout.moves || {};
  layout.sizes = layout.sizes || {};
  state.panelLayouts = state.panelLayouts || {};
  state.panelLayouts[currentPage] = layout;
  const grids = panelLayoutContainers(panel);
  const gridEntries = grids.map((grid, gridIndex) => ({
    grid,
    gridIndex,
    containerKey: panelContainerKey(grid, gridIndex)
  }));
  gridEntries.forEach(({ grid }) => {
    panelLayoutItems(grid).forEach((card, index) => panelItemKey(card, index));
  });
  Object.entries(layout.moves).forEach(([itemKey, targetContainerKey]) => {
    const item = panel.querySelector(`[data-panel-layout-key="${CSS.escape(itemKey)}"]`);
    const targetEntry = gridEntries.find((entry) => entry.containerKey === targetContainerKey);
    if (!item || !targetEntry || item === targetEntry.grid || item.contains(targetEntry.grid)) return;
    targetEntry.grid.append(item);
  });
  gridEntries.forEach(({ grid, gridIndex, containerKey }) => {
    const cards = panelLayoutItems(grid);
    cards.forEach((card, index) => panelItemKey(card, index));
    const order = layout.order?.[containerKey] || layout.order?.[gridIndex] || [];
    order.forEach((key) => {
      const card = cards.find((item) => item.dataset.panelLayoutKey === key);
      if (card) grid.append(card);
    });
    grid.classList.toggle("panel-layout-editing", panelLayoutEditMode);
    grid.classList.toggle("panel-layout-dropzone", panelLayoutEditMode);
    if (panelLayoutEditMode) {
      grid.ondragover = (event) => {
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
      };
      grid.ondrop = (event) => {
        if (event.target !== grid) return;
        event.preventDefault();
        event.stopPropagation();
        const draggedKey = event.dataTransfer.getData("text/plain");
        const sourceContainerKey = event.dataTransfer.getData("container-key");
        const dragged = panel.querySelector(`[data-panel-layout-key="${CSS.escape(draggedKey)}"]`);
        if (!dragged || dragged === grid || dragged.contains(grid)) return;
        grid.append(dragged);
        layout.moves[draggedKey] = containerKey;
        Object.keys(layout.order).forEach((keyName) => {
          layout.order[keyName] = (layout.order[keyName] || []).filter((itemKey) => itemKey !== draggedKey);
        });
        if (sourceContainerKey) {
          const sourceEntry = gridEntries.find((entry) => entry.containerKey === sourceContainerKey);
          if (sourceEntry) layout.order[sourceContainerKey] = panelLayoutItems(sourceEntry.grid).map((item) => item.dataset.panelLayoutKey);
        }
        layout.order[containerKey] = panelLayoutItems(grid).map((item) => item.dataset.panelLayoutKey);
        forceSaveState();
        renderPanelLayoutControls();
      };
    }
    panelLayoutItems(grid).forEach((card, index) => {
      const key = panelItemKey(card, index);
      const isHidden = layout.hidden?.[key] === true;
      const size = layout.sizes?.[key] || "medium";
      card.classList.remove("panel-size-small", "panel-size-medium", "panel-size-large", "panel-size-full");
      card.classList.add(`panel-size-${size}`);
      card.hidden = isHidden && !panelLayoutEditMode;
      card.classList.toggle("is-layout-hidden", isHidden && panelLayoutEditMode);
      if (!panelLayoutEditMode) return;
      card.draggable = true;
      card.ondragstart = (event) => {
        event.stopPropagation();
        event.dataTransfer.setData("text/plain", key);
        event.dataTransfer.setData("container-key", containerKey);
        event.dataTransfer.effectAllowed = "move";
        card.classList.add("is-dragging");
      };
      card.ondragover = (event) => {
        event.preventDefault();
        event.stopPropagation();
        event.dataTransfer.dropEffect = "move";
      };
      card.ondrop = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const sourceContainerKey = event.dataTransfer.getData("container-key");
        const draggedKey = event.dataTransfer.getData("text/plain");
        const targetKey = key;
        if (!draggedKey || draggedKey === targetKey) return;
        const dragged = panel.querySelector(`[data-panel-layout-key="${CSS.escape(draggedKey)}"]`);
        const target = panel.querySelector(`[data-panel-layout-key="${CSS.escape(targetKey)}"]`);
        if (!dragged || !target) return;
        if (dragged === grid || dragged.contains(grid) || dragged.contains(target)) return;
        grid.insertBefore(dragged, target);
        layout.moves[draggedKey] = containerKey;
        Object.keys(layout.order).forEach((keyName) => {
          layout.order[keyName] = (layout.order[keyName] || []).filter((itemKey) => itemKey !== draggedKey);
        });
        if (sourceContainerKey) {
          const sourceEntry = gridEntries.find((entry) => entry.containerKey === sourceContainerKey);
          if (sourceEntry) layout.order[sourceContainerKey] = panelLayoutItems(sourceEntry.grid).map((item) => item.dataset.panelLayoutKey);
        }
        layout.order[containerKey] = panelLayoutItems(grid).map((item) => item.dataset.panelLayoutKey);
        forceSaveState();
        renderPanelLayoutControls();
      };
      card.ondragend = () => {
        card.classList.remove("is-dragging");
        renderPanelLayoutControls();
      };
      const tools = document.createElement("div");
      tools.className = "panel-layout-tools";
      const handle = document.createElement("span");
      handle.className = "drag-handle";
      handle.innerHTML = "<i></i><i></i><i></i><i></i><i></i><i></i>";
      handle.title = "Drag to rearrange";
      handle.setAttribute("aria-label", "Drag to rearrange");
      const hide = document.createElement("button");
      hide.className = `${isHidden ? "ghost-btn" : "danger-btn"} compact-action`;
      hide.type = "button";
      hide.textContent = isHidden ? "Show" : "Hide";
      hide.addEventListener("click", (event) => {
        event.stopPropagation();
        layout.hidden[key] = !isHidden;
        saveState();
        renderPanelLayoutControls();
      });
      const sizeControls = document.createElement("span");
      sizeControls.className = "panel-size-controls";
      [
        ["small", "S"],
        ["medium", "M"],
        ["large", "L"],
        ["full", "Full"]
      ].forEach(([value, label]) => {
        const sizeButton = document.createElement("button");
        sizeButton.type = "button";
        sizeButton.textContent = label;
        sizeButton.className = value === size ? "is-active" : "";
        sizeButton.title = `Resize to ${value}`;
        sizeButton.addEventListener("click", (event) => {
          event.preventDefault();
          event.stopPropagation();
          layout.sizes[key] = value;
          forceSaveState();
          renderPanelLayoutControls();
        });
        sizeControls.append(sizeButton);
      });
      if (card.matches("button, a")) {
        handle.classList.add("drag-handle-overlay");
        card.append(handle);
      } else if (card.matches("details") && card.querySelector(":scope > summary")) {
        tools.append(handle, sizeControls, hide);
        card.querySelector(":scope > summary").after(tools);
      } else {
        tools.append(handle, sizeControls, hide);
        card.prepend(tools);
      }
      bindPointerLayoutDrag(handle, card, panel, layout, gridEntries, containerKey);
    });
  });
  const editButton = document.querySelector("#editHomeLayout");
  if (editButton) {
    editButton.classList.toggle("is-active", panelLayoutEditMode);
    const label = panelLayoutEditMode ? "Finish rearranging this page" : "Edit and rearrange this page";
    editButton.title = label;
    editButton.setAttribute("aria-label", label);
    editButton.textContent = panelLayoutEditMode ? "Finish Layout" : "Edit Layout";
  }
}

function ensureInlineSaveButtons() {
  const deleteButtons = [...document.querySelectorAll(".panel .danger-btn, .panel .icon-btn")]
    .filter((button) => button.id !== "closeLauncher" && !button.classList.contains("has-inline-save"));
  deleteButtons.forEach((button) => {
    const label = button.textContent.trim().toLowerCase();
    const isDelete = label === "x" || label.includes("delete");
    if (!isDelete) return;
    button.classList.add("has-inline-save");
    const save = document.createElement("button");
    save.className = "ghost-btn compact-action inline-save";
    save.type = "button";
    save.textContent = "Save";
    save.addEventListener("click", (event) => {
      event.stopPropagation();
      saveCurrentPage(`${pageTitle(currentPage)} item - ${new Date().toLocaleString()}`);
    });
    button.parentNode.insertBefore(save, button);
  });
}

function todayKey() {
  return localDateKey(new Date());
}

function localDateKey(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function ensureDailyEntry(dateKey) {
  if (!state.days[dateKey]) {
    state.days[dateKey] = {
      top: ["", "", ""],
      checklist: [],
      notes: "",
      schedule: {},
      prayers: Object.fromEntries(prayers.map((name) => [name, { done: false, note: "" }])),
      prayerReflection: "",
      quran: { surah: "", ayah: "", minutes: "", reflection: "" },
      ramadanChecklist: [
        { text: "Wake for suhoor and make intention", done: false },
        { text: "Fast from Fajr to Maghrib", done: false },
        { text: "Complete all five obligatory prayers", done: false },
        { text: "Read Quran with English understanding", done: false },
        { text: "Make morning and evening dhikr", done: false },
        { text: "Give charity or help someone", done: false },
        { text: "Guard speech, eyes, anger, and scrolling", done: false },
        { text: "Break fast with dua and pray Maghrib", done: false },
        { text: "Pray Taraweeh or additional night prayer", done: false },
        { text: "Make sincere tawbah and personal dua", done: false }
      ],
      verseIndex: Math.floor(Math.random() * quranVerses.length)
    };
  }
  return state.days[dateKey];
}

function day() {
  return ensureDailyEntry(activeDate);
}

function cloneArchiveValue(value) {
  return JSON.parse(JSON.stringify(value ?? null));
}

function recordDate(value) {
  if (!value) return "";
  const text = String(value);
  return text.length >= 10 ? text.slice(0, 10) : "";
}

function updateCompletionDate(record, value, completedStatuses) {
  record.status = value;
  if (completedStatuses.includes(value)) {
    record.completedOn = record.completedOn || activeDate || todayKey();
  } else {
    record.completedOn = "";
  }
}

let taskCompletionPopupTimer = null;

function showTaskCompletionPopup(task) {
  const popup = document.querySelector("#taskCompletionPopup");
  if (!popup) return;
  document.querySelector("#taskCompletionTitle").textContent = task.title || "Task completed";
  document.querySelector("#taskCompletionMessage").textContent = `Completed at ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}. The log was saved to History.`;
  popup.hidden = false;
  popup.classList.remove("is-hiding");
  clearTimeout(taskCompletionPopupTimer);
  taskCompletionPopupTimer = setTimeout(() => {
    popup.classList.add("is-hiding");
    setTimeout(() => {
      popup.hidden = true;
      popup.classList.remove("is-hiding");
    }, 180);
  }, 4200);
}

function updateTaskStatus(task, value) {
  const wasDone = task.status === "Done";
  updateCompletionDate(task, value, ["Done"]);
  if (value === "Done" && !wasDone) {
    const completedAt = new Date().toISOString();
    task.completedAt = completedAt;
    state.completionLog = Array.isArray(state.completionLog) ? state.completionLog : [];
    state.completionLog.unshift({
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      type: "Task",
      title: task.title || "Task",
      category: task.category || "General",
      completedOn: task.completedOn || activeDate,
      completedAt,
      due: task.due || "",
      note: task.note || ""
    });
    state.completionLog = state.completionLog.slice(0, 500);
    forceSaveState();
    showTaskCompletionPopup(task);
  } else if (value !== "Done") {
    task.completedAt = "";
  }
}

function assignmentClassControl(item) {
  const names = state.classes.map(normalizeClassItem).map((classItem) => classItem.name).filter(Boolean);
  const options = ["", ...new Set([...names, item.className].filter(Boolean))];
  return select(item.className || "", options, (value) => item.className = value);
}

function buildDailyArchive(dateKey) {
  const daily = ensureDailyEntry(dateKey);
  const tasks = (state.tasks || []).filter((item) => recordDate(item.completedOn) === dateKey || recordDate(item.due) === dateKey);
  const assignments = (state.assignments || []).filter((item) => recordDate(item.completedOn) === dateKey || recordDate(item.due) === dateKey);
  const importantDates = (state.importantDates || []).filter((item) => recordDate(item.completedOn) === dateKey || recordDate(item.when) === dateKey);
  const workouts = (state.workouts || []).filter((item) => recordDate(item.date || item.startedAt || item.savedAt) === dateKey);
  const studyBlocks = (state.studyBlocks || []).filter((item) => recordDate(item.completedOn) === dateKey || recordDate(item.start) === dateKey);
  const journals = (state.journalEntries || []).filter((item) => item.date === dateKey);
  const sleepSessions = (state.health?.sleepSessions || []).filter((item) => recordDate(item.start) === dateKey);
  const completionLog = (state.completionLog || []).filter((item) => recordDate(item.completedOn || item.completedAt) === dateKey);
  const prayersDone = prayers.filter((name) => daily.prayers?.[name]?.done).length;
  const checklist = daily.checklist || [];
  const completedTasks = tasks.filter((item) => item.status === "Done").length;
  const completedAssignments = assignments.filter((item) => ["Submitted", "Graded"].includes(item.status)).length;
  const completedStudy = studyBlocks.filter((item) => item.status === "Done").length;
  const completedWorkouts = workouts.filter((item) => item.done || item.endedAt || item.entryType === "manual").length;
  const checklistDone = checklist.filter((item) => item.done).length;
  const completedTotal = completedTasks + completedAssignments + completedStudy + completedWorkouts + checklistDone + prayersDone;
  const possibleTotal = tasks.length + assignments.length + studyBlocks.length + workouts.length + checklist.length + prayers.length;
  const productivity = possibleTotal ? Math.round(completedTotal / possibleTotal * 100) : 0;
  return {
    date: dateKey,
    updatedAt: new Date().toISOString(),
    day: cloneArchiveValue(daily),
    tasks: cloneArchiveValue(tasks),
    assignments: cloneArchiveValue(assignments),
    importantDates: cloneArchiveValue(importantDates),
    workouts: cloneArchiveValue(workouts),
    studyBlocks: cloneArchiveValue(studyBlocks),
    journalEntries: cloneArchiveValue(journals),
    completionLog: cloneArchiveValue(completionLog),
    wellness: {
      sleepSessions: cloneArchiveValue(sleepSessions),
      healthChecklist: cloneArchiveValue(state.health?.checklist || []),
      sleepTarget: {
        sleepTime: state.health?.sleepTime || "",
        wakeTime: state.health?.wakeTime || "",
        quality: state.health?.sleepQuality || ""
      }
    },
    metrics: {
      prayersDone,
      prayersTotal: prayers.length,
      tasksCompleted: completedTasks,
      tasksTotal: tasks.length,
      assignmentsCompleted: completedAssignments,
      assignmentsTotal: assignments.length,
      workoutsCompleted: completedWorkouts,
      workoutsTotal: workouts.length,
      studySessionsCompleted: completedStudy,
      studySessionsTotal: studyBlocks.length,
      checklistCompleted: checklistDone,
      checklistTotal: checklist.length,
      journalEntries: journals.length,
      productivity
    }
  };
}

function syncDailyArchive(dateKey = activeDate) {
  if (!dateKey) return;
  state.dailyArchives = state.dailyArchives || {};
  state.dailyArchives[dateKey] = buildDailyArchive(dateKey);
}

function cleanupDailyArchives() {
  state.dailyArchives = state.dailyArchives || {};
  const cutoff = new Date();
  cutoff.setHours(0, 0, 0, 0);
  cutoff.setDate(cutoff.getDate() - (Number(state.archiveRetentionDays) || 90));
  Object.keys(state.dailyArchives).forEach((dateKey) => {
    const date = new Date(`${dateKey}T12:00:00`);
    if (!Number.isNaN(date.getTime()) && date < cutoff) delete state.dailyArchives[dateKey];
  });
}

function initializeDailySession() {
  const today = todayKey();
  if (sessionStoredDate) syncDailyArchive(sessionStoredDate);
  activeDate = today;
  ensureDailyEntry(today);
  syncDailyArchive(today);
  cleanupDailyArchives();
  state.pageColors = state.pageColors || {};
  if (!state.pageColors.dashboard || isLightColor(state.pageColors.dashboard)) {
    state.pageColors.dashboard = dashboardTheme.bg;
  }
  state.activeDate = today;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function checkDailyRollover() {
  const today = todayKey();
  if (systemDateKey === today) return;
  syncDailyArchive(activeDate);
  systemDateKey = today;
  activeDate = today;
  ensureDailyEntry(today);
  syncDailyArchive(today);
  cleanupDailyArchives();
  state.activeDate = today;
  currentPage = "dashboard";
  pageStack = [];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  openPanel("dashboard", pageTitle("dashboard", "Home"), document.querySelector("#dayTab"), { skipStack: true });
}

function applyTheme() {
  const savedTheme = state.theme || presets.midnight;
  const theme = savedTheme;
  const menu = safeMenuTheme(state.menuSettings || defaultState().menuSettings);
  const pageStyle = state.pageStyles?.[currentPage] || {};
  const pageColor = pageStyle.bg || state.pageColors?.[currentPage] || theme.bg;
  const cardColor = pageStyle.card || theme.card;
  const textColor = pageStyle.text || theme.text;
  const accentColor = pageStyle.accent || theme.accent;
  const buttonColor = pageStyle.button || accentColor;
  const navColor = pageStyle.nav || cardColor;
  const pageBrightness = Math.min(100, Math.max(1, Number(state.pageBrightness?.[currentPage] ?? state.globalBrightness ?? 100)));
  document.documentElement.style.setProperty("--bg", pageColor);
  document.documentElement.style.setProperty("--home-custom-bg", pageStyle.bg || state.pageColors?.dashboard || theme.bg);
  document.documentElement.style.setProperty("--home-focus-color", state.homeFocusColor || "#2f91ff");
  document.documentElement.style.setProperty("--home-weather-color", state.homeWeatherColor || "#0a88c7");
  document.documentElement.style.setProperty("--home-calendar-color", state.homeCalendarColor || "#087f72");
  const focusStyle = state.homeWidgetStyles?.focus || defaultState().homeWidgetStyles.focus;
  const calendarStyle = state.homeWidgetStyles?.calendar || defaultState().homeWidgetStyles.calendar;
  document.documentElement.style.setProperty("--focus-card-color", focusStyle.card);
  document.documentElement.style.setProperty("--focus-accent-color", focusStyle.accent);
  document.documentElement.style.setProperty("--focus-background-color", focusStyle.background);
  document.documentElement.style.setProperty("--calendar-card-color", calendarStyle.card);
  document.documentElement.style.setProperty("--calendar-accent-color", calendarStyle.accent);
  document.documentElement.style.setProperty("--calendar-background-color", calendarStyle.background);
  document.documentElement.style.setProperty("--card", cardColor);
  document.documentElement.style.setProperty("--text", textColor);
  document.documentElement.style.setProperty("--accent", accentColor);
  document.documentElement.style.setProperty("--primary", accentColor);
  document.documentElement.style.setProperty("--secondary", savedTheme.accent2 || savedTheme.secondary || "#e2a84f");
  document.documentElement.style.setProperty("--surface", cardColor);
  document.documentElement.style.setProperty("--border-color", savedTheme.line || "rgba(127, 148, 170, .22)");
  document.documentElement.style.setProperty("--glow-color", `${accentColor}55`);
  document.documentElement.style.setProperty("--page-button", buttonColor);
  document.documentElement.style.setProperty("--page-nav", navColor);
  document.documentElement.style.setProperty("--page-brightness", String(pageBrightness / 100));
  document.documentElement.style.setProperty("--menu-bg", menu.bg || "#f6f8f5");
  document.documentElement.style.setProperty("--menu-card", menu.card || "#f8fbfa");
  document.documentElement.style.setProperty("--menu-text", menu.text || "#111917");
  document.documentElement.style.setProperty("--menu-active", menu.active || "#dfece8");
  document.documentElement.style.setProperty("--menu-accent", menu.accent || theme.accent);
  const design = { ...defaultState().designStudio, ...(state.designStudio || {}) };
  let uploadedVideo = document.querySelector("#fahimosUploadedVideoBackground");
  if (!uploadedVideo) {
    uploadedVideo = document.createElement("video");
    uploadedVideo.id = "fahimosUploadedVideoBackground";
    uploadedVideo.className = "uploaded-video-background";
    uploadedVideo.autoplay = true;
    uploadedVideo.muted = true;
    uploadedVideo.loop = true;
    uploadedVideo.playsInline = true;
    uploadedVideo.hidden = true;
    document.body.prepend(uploadedVideo);
  }
  document.documentElement.style.setProperty("--dashboard-tile-gap", `${design.tileSpacing}px`);
  document.documentElement.style.setProperty("--dashboard-glass-opacity", String(Math.max(0.2, design.glassIntensity / 100)));
  document.documentElement.style.setProperty("--dashboard-motion", `${Math.max(0, design.motionLevel) / 100}`);
  document.documentElement.style.setProperty("--dashboard-background-blur", `${design.backgroundBlur}px`);
  document.documentElement.style.setProperty("--dashboard-background-overlay", String(design.backgroundOverlay / 100));
  document.documentElement.style.setProperty("--dashboard-background-brightness", String((design.backgroundBrightness ?? 100) / 100));
  document.documentElement.style.setProperty("--dashboard-background-opacity", String((design.backgroundOpacity ?? 100) / 100));
  document.documentElement.style.setProperty("--uploaded-image-background", design.backgroundImage ? `url("${design.backgroundImage}")` : "none");
  document.documentElement.style.setProperty("--uploaded-video-opacity", String((design.backgroundVideo ? (design.backgroundOpacity ?? 100) : 0) / 100));
  document.body.dataset.backgroundPreset = design.backgroundPreset || "none";
  document.body.dataset.layoutPreset = state.customizeV4?.layoutPreset || "compact-mode";
  document.body.dataset.layoutSpacing = state.customizeV4?.spacing || "normal";
  const liveTheme = { ...defaultState().liveThemeV4, ...(state.liveThemeV4 || {}) };
  const speedMap = { slow: "28s", normal: "16s", fast: "8s" };
  const intensityMap = { low: "0.16", medium: "0.28", high: "0.42" };
  document.body.classList.toggle("live-theme-enabled", !!liveTheme.enabled);
  document.body.classList.toggle("layout-grid-lines", !!state.customizeV4?.gridLines && panelLayoutEditMode);
  document.body.dataset.liveTheme = liveTheme.id;
  document.documentElement.style.setProperty("--live-theme-speed", speedMap[liveTheme.speed] || speedMap.normal);
  document.documentElement.style.setProperty("--live-theme-opacity", intensityMap[liveTheme.intensity] || intensityMap.medium);
  const galleryPreset = backgroundGalleryPresets.find((item) => `gallery-${item.id}` === design.backgroundPreset);
  document.documentElement.style.setProperty("--gallery-background", galleryPreset?.background || "none");
  if (uploadedVideo) {
    uploadedVideo.src = design.backgroundVideo || "";
    uploadedVideo.hidden = !design.backgroundVideo;
  }
  document.body.dataset.scene = state.backgroundScene || "creative";
  document.querySelector("#quickBackground").value = pageColor;
  document.querySelector("#bgColor").value = savedTheme.bg;
  document.querySelector("#cardColor").value = savedTheme.card;
  document.querySelector("#textColor").value = savedTheme.text;
  document.querySelector("#accentColor").value = savedTheme.accent;
  setColorValue("#menuBgColor", menu.bg);
  setColorValue("#launcherColor", menu.bg);
  setColorValue("#menuCardColor", menu.card);
  setColorValue("#menuTextColor", menu.text);
  setColorValue("#menuActiveColor", menu.active);
  setColorValue("#homeBackgroundColor", state.pageColors?.dashboard || dashboardTheme.bg);
  setColorValue("#homeFocusColor", state.homeFocusColor || "#2f91ff");
  setColorValue("#homeWeatherColor", state.homeWeatherColor || "#0a88c7");
  setColorValue("#homeCalendarColor", state.homeCalendarColor || "#087f72");
  setColorValue("#settingsFocusColor", state.homeFocusColor || "#2f91ff");
  setColorValue("#pageCardColor", cardColor);
  setColorValue("#pageButtonColor", buttonColor);
  setColorValue("#pageNavColor", navColor);
  setColorValue("#pageTextColor", textColor);
  setColorValue("#pageAccentColor", accentColor);
  const appearanceName = document.querySelector("#appearancePageName");
  if (appearanceName) appearanceName.textContent = pageTitle(currentPage);
  const designFields = {
    dashboardTileSpacing: design.tileSpacing,
    dashboardGlass: design.glassIntensity,
    dashboardMotion: design.motionLevel,
    dashboardBackgroundBlur: design.backgroundBlur,
    dashboardBackgroundOverlay: design.backgroundOverlay,
    dashboardBackgroundBrightness: design.backgroundBrightness ?? 100,
    dashboardBackgroundOpacity: design.backgroundOpacity ?? 100
  };
  Object.entries(designFields).forEach(([id, value]) => {
    const field = document.querySelector(`#${id}`);
    if (field && document.activeElement !== field) field.value = String(value);
  });
  document.querySelectorAll("[data-background-preset]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.backgroundPreset === design.backgroundPreset);
  });
  renderPageThemePresets();
  renderCustomizeThemeGrid();
  renderLiveThemeControls();
  renderLayoutPresetControls();
  renderHiddenWidgetManager();
}

function renderBackgroundGallery() {
  const wrap = document.querySelector("#aiBackgroundGallery");
  const category = document.querySelector("#backgroundGalleryCategory")?.value || "all";
  if (!wrap) return;
  wrap.innerHTML = "";
  backgroundGalleryPresets
    .filter((item) => category === "all" || item.category === category)
    .forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.dataset.backgroundPreset = `gallery-${item.id}`;
      button.style.background = item.background;
      button.classList.toggle("is-active", state.designStudio?.backgroundPreset === `gallery-${item.id}`);
      button.innerHTML = `<span>${escapeHtml(item.name)}</span><small>${escapeHtml(item.category)} theme</small><b>Apply Theme</b>`;
      wrap.append(button);
    });
}

function applyGalleryTheme(presetId) {
  const item = backgroundGalleryPresets.find((entry) => `gallery-${entry.id}` === presetId);
  if (!item) return;
  const palettes = {
    Superhero: ["#030611", "#101d3a", "#f6fbff", "#31c8ff"],
    Cars: ["#07090e", "#171d29", "#fff7f8", "#ff355d"],
    Science: ["#031018", "#0b2630", "#edffff", "#32e6cf"],
    Sports: ["#07130f", "#173229", "#f4fff8", "#40d98b"],
    Animals: ["#0d1209", "#222d18", "#fbffe9", "#9bd44c"],
    Ocean: ["#02131d", "#083143", "#e8fbff", "#27c6e8"],
    Buildings: ["#0c0d11", "#242831", "#fff8e9", "#d9b45f"],
    Countries: ["#07101d", "#142741", "#f4f8ff", "#4cb8ff"],
    Space: ["#050617", "#17152f", "#f9f4ff", "#9d6cff"],
    "Solar System": ["#080910", "#242033", "#fff8e8", "#f7b84b"],
    Nature: ["#06130d", "#173125", "#f1fff6", "#43d58c"]
  };
  const [bg, card, text, accent] = palettes[item.category] || palettes.Space;
  state.theme = { bg, card, text, accent };
  state.designStudio = { ...defaultState().designStudio, ...(state.designStudio || {}), backgroundPreset: presetId };
  state.pageStyles = {};
  state.pageColors = {};
  applyTheme();
  forceSaveState();
}

function renderBrightnessSettings() {
  const pageSelect = document.querySelector("#brightnessPage");
  const slider = document.querySelector("#brightnessControl");
  const output = document.querySelector("#brightnessOutput");
  if (!pageSelect || !slider || !output) return;
  const panels = [...document.querySelectorAll(".panel[id]")];
  if (pageSelect.options.length !== panels.length) {
    pageSelect.innerHTML = "";
    panels.forEach((panel) => {
      const option = document.createElement("option");
      option.value = panel.id;
      option.textContent = pageTitle(panel.id, panel.id);
      pageSelect.append(option);
    });
  }
  const selected = document.getElementById(state.brightnessEditorPage) ? state.brightnessEditorPage : "dashboard";
  state.brightnessEditorPage = selected;
  pageSelect.value = selected;
  const value = Math.min(100, Math.max(1, Number(state.pageBrightness?.[selected] ?? state.globalBrightness ?? 100)));
  slider.value = String(value);
  output.textContent = `${value}%`;
}

function applyBrightnessValue(value, syncAll = false) {
  const normalized = Math.min(100, Math.max(1, Number(value) || 100));
  state.pageBrightness = state.pageBrightness || {};
  if (syncAll) {
    state.globalBrightness = normalized;
    document.querySelectorAll(".panel[id]").forEach((panel) => {
      state.pageBrightness[panel.id] = normalized;
    });
  } else {
    const selected = state.brightnessEditorPage || "dashboard";
    state.pageBrightness[selected] = normalized;
  }
  applyTheme();
  forceSaveState();
  renderBrightnessSettings();
  const status = document.querySelector("#brightnessStatus");
  if (status) status.textContent = syncAll
    ? `Brightness synchronized at ${normalized}% across every page.`
    : `${pageTitle(state.brightnessEditorPage)} now uses ${normalized}% brightness only.`;
}

function applyLauncherTheme(theme) {
  state.menuSettings = {
    ...(state.menuSettings || defaultState().menuSettings),
    bg: theme.bg,
    card: theme.card,
    text: theme.text,
    active: theme.active,
    accent: theme.accent,
    themeId: theme.id || "custom"
  };
  applyTheme();
  forceSaveState();
  renderLauncherThemeSwatches();
}

function renderLauncherThemeSwatches() {
  const wrap = document.querySelector("#launcherThemeSwatches");
  if (!wrap) return;
  wrap.innerHTML = "";
  launcherThemePresets.forEach((theme) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "launcher-theme-swatch";
    button.classList.toggle("is-active", state.menuSettings?.themeId === theme.id);
    button.style.setProperty("--swatch-bg", theme.bg);
    button.style.setProperty("--swatch-card", theme.card);
    button.style.setProperty("--swatch-text", theme.text);
    button.style.setProperty("--swatch-accent", theme.accent);
    button.style.setProperty("--swatch-line", mixHexColors(theme.card, theme.text, 0.18));
    button.title = `Use ${theme.name}`;
    button.innerHTML = `<span aria-hidden="true"></span><strong>${escapeHtml(theme.name)}</strong>`;
    button.addEventListener("click", () => applyLauncherTheme(theme));
    wrap.append(button);
  });
}

function applyPageThemePreset(theme) {
  state.pageStyles = state.pageStyles || {};
  state.pageColors = state.pageColors || {};
  state.pageStyles[currentPage] = {
    bg: theme.bg,
    card: theme.card,
    text: theme.text,
    accent: theme.accent,
    button: theme.button || theme.accent,
    nav: theme.nav || theme.card,
    presetId: theme.id
  };
  state.pageColors[currentPage] = theme.bg;
  state.backgroundScene = "plain";
  applyTheme();
  forceSaveState();
  const status = document.querySelector("#pageAppearanceStatus");
  if (status) status.textContent = "Changes currently apply only to this page.";
}

function renderPageThemePresets() {
  const wrap = document.querySelector("#pageThemePresets");
  if (!wrap) return;
  const activePreset = state.pageStyles?.[currentPage]?.presetId;
  wrap.innerHTML = "";
  pageThemePresets.forEach((theme) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "page-theme-preset";
    button.classList.toggle("is-active", activePreset === theme.id);
    button.style.setProperty("--preset-bg", theme.bg);
    button.style.setProperty("--preset-card", theme.card);
    button.style.setProperty("--preset-accent", theme.accent);
    button.style.setProperty("--preset-text", theme.text);
    button.title = `Apply ${theme.name} to ${pageTitle(currentPage)}`;
    button.setAttribute("aria-label", button.title);
    button.innerHTML = `<span aria-hidden="true"><i></i></span><small>${escapeHtml(theme.name)}</small>`;
    button.addEventListener("click", () => applyPageThemePreset(theme));
    wrap.append(button);
  });
}

function applyCustomizeColorTheme(theme) {
  if (!theme) return;
  backupLayoutV4(`Theme changed to ${theme.name}`);
  state.theme = {
    bg: theme.bg,
    card: theme.card,
    text: theme.text,
    accent: theme.accent,
    accent2: theme.button || theme.accent,
    line: mixHexColors(theme.card, theme.text, 0.16)
  };
  state.pageStyles = state.pageStyles || {};
  state.pageColors = state.pageColors || {};
  document.querySelectorAll(".panel[id]").forEach((panel) => {
    state.pageStyles[panel.id] = {
      bg: theme.bg,
      card: theme.card,
      text: theme.text,
      accent: theme.accent,
      button: theme.button || theme.accent,
      nav: theme.nav || theme.card,
      presetId: theme.id
    };
    state.pageColors[panel.id] = theme.bg;
  });
  state.backgroundScene = "plain";
  setCustomizeStatus(`${theme.name} applied across FahimOS.`);
  applyTheme();
  forceSaveState();
}

function renderCustomizeThemeGrid() {
  const wrap = document.querySelector("#customizeThemeGrid");
  if (!wrap) return;
  const activePreset = state.pageStyles?.[currentPage]?.presetId || "";
  wrap.innerHTML = "";
  const seenThemes = new Set();
  customizeColorThemes.filter((theme) => {
    const key = `${theme.id || ""}:${theme.name || ""}`.toLowerCase();
    if (seenThemes.has(key)) return false;
    seenThemes.add(key);
    return true;
  }).forEach((theme) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "customize-theme-tile";
    button.classList.toggle("is-active", activePreset === theme.id || state.theme?.accent === theme.accent);
    button.style.setProperty("--theme-bg", theme.bg);
    button.style.setProperty("--theme-card", theme.card);
    button.style.setProperty("--theme-accent", theme.accent);
    button.style.setProperty("--theme-button", theme.button || theme.accent);
    button.innerHTML = `
      <span class="theme-preview" aria-hidden="true"><i></i><i></i><i></i></span>
      <strong>${escapeHtml(theme.name)}</strong>
      <small>Global color system</small>
    `;
    button.addEventListener("click", () => applyCustomizeColorTheme(theme));
    wrap.append(button);
  });
}

function renderLiveThemeControls() {
  const enabled = document.querySelector("#liveThemeEnabled");
  const select = document.querySelector("#liveThemeSelect");
  const speed = document.querySelector("#liveThemeSpeed");
  const intensity = document.querySelector("#liveThemeIntensity");
  if (!select) return;
  if (select.options.length !== liveThemePresets.length) {
    select.innerHTML = "";
    liveThemePresets.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name;
      select.append(option);
    });
  }
  const liveTheme = { ...defaultState().liveThemeV4, ...(state.liveThemeV4 || {}) };
  if (enabled && document.activeElement !== enabled) enabled.checked = !!liveTheme.enabled;
  if (document.activeElement !== select) select.value = liveTheme.id;
  if (speed && document.activeElement !== speed) speed.value = liveTheme.speed;
  if (intensity && document.activeElement !== intensity) intensity.value = liveTheme.intensity;
}

function renderLayoutPresetControls() {
  const select = document.querySelector("#layoutPresetSelect");
  const spacing = document.querySelector("#layoutSpacingSelect");
  const snap = document.querySelector("#layoutSnapGrid");
  const grid = document.querySelector("#layoutGridLines");
  if (select && select.options.length !== layoutPresetOptions.length) {
    select.innerHTML = "";
    layoutPresetOptions.forEach((item) => {
      const option = document.createElement("option");
      option.value = item.id;
      option.textContent = item.name;
      select.append(option);
    });
  }
  const customize = { ...defaultState().customizeV4, ...(state.customizeV4 || {}) };
  if (select && document.activeElement !== select) select.value = customize.layoutPreset;
  if (spacing && document.activeElement !== spacing) spacing.value = customize.spacing;
  if (snap && document.activeElement !== snap) snap.checked = !!customize.snapToGrid;
  if (grid && document.activeElement !== grid) grid.checked = !!customize.gridLines;
}

function syncHiddenWidgetsV4() {
  const hidden = new Set(Array.isArray(state.hiddenWidgetsV4) ? state.hiddenWidgetsV4 : []);
  (state.homeCardSettings || []).forEach((item) => {
    if (item && item.visible === false) hidden.add(`home:${item.id}`);
  });
  state.hiddenWidgetsV4 = [...hidden];
}

function renderHiddenWidgetManager() {
  const wrap = document.querySelector("#hiddenWidgetManager");
  if (!wrap) return;
  syncHiddenWidgetsV4();
  const hiddenHome = (state.homeCardSettings || []).filter((item) => item.visible === false);
  const hiddenCustom = (state.hiddenWidgetsV4 || []).filter((id) => !id.startsWith("home:"));
  if (!hiddenHome.length && !hiddenCustom.length) {
    wrap.innerHTML = `<div class="empty-state compact-empty">No hidden widgets. Your dashboard is fully visible.</div>`;
    return;
  }
  wrap.innerHTML = `
    <div class="hidden-widget-list">
      ${hiddenHome.map((item) => `
        <article class="hidden-widget-row">
          <span>${escapeHtml(item.label || item.id)}</span>
          <button class="ghost-btn compact-action" type="button" data-restore-home-widget="${escapeHtml(item.id)}">Restore</button>
        </article>
      `).join("")}
      ${hiddenCustom.map((id) => `
        <article class="hidden-widget-row">
          <span>${escapeHtml(id.replace(/^widget:/, ""))}</span>
          <button class="ghost-btn compact-action" type="button" data-restore-custom-widget="${escapeHtml(id)}">Restore</button>
        </article>
      `).join("")}
    </div>
    <button id="restoreAllHiddenWidgetsInline" class="primary-btn compact-action" type="button">Restore All Widgets</button>
  `;
}

function setCustomizeStatus(message) {
  const status = document.querySelector("#customizeV4Status") || document.querySelector("#pageAppearanceStatus");
  if (status) status.textContent = message;
}

function confirmDesignOnlyReset() {
  return confirm("This will reset layout/design only. Your saved data will stay safe.");
}

function resetHomepageLayoutOnly() {
  backupLayoutV4("Homepage layout reset");
  state.homeCardSettings = defaultHomeCards.map((card) => ({ ...card }));
  state.homeCardCollapsed = {};
  state.smartLayout = {};
  syncHiddenWidgetsV4();
  setCustomizeStatus("Homepage layout reset. Your saved data stayed safe.");
  renderAll();
  forceSaveState();
}

function resetAllWidgetSizesOnly() {
  backupLayoutV4("Widget sizes reset");
  state.panelLayouts = {};
  state.smartLayout = {};
  setCustomizeStatus("Widget sizes reset across visual layout only.");
  renderAll();
  forceSaveState();
}

function restoreAllHiddenWidgetsOnly() {
  backupLayoutV4("Hidden widgets restored");
  state.homeCardSettings = (state.homeCardSettings || defaultHomeCards).map((item) => ({ ...item, visible: true }));
  state.hiddenWidgetsV4 = [];
  setCustomizeStatus("All hidden widgets restored.");
  renderAll();
  forceSaveState();
}

function resetThemeOnly() {
  backupLayoutV4("Theme reset");
  state.theme = { ...dashboardTheme };
  state.pageStyles = {};
  state.pageColors = {};
  state.backgroundScene = "space";
  setCustomizeStatus("Theme reset only. Data was untouched.");
  applyTheme();
  forceSaveState();
}

function resetLiveThemeOnly() {
  backupLayoutV4("Live theme reset");
  state.liveThemeV4 = { ...defaultState().liveThemeV4 };
  setCustomizeStatus("Live theme reset.");
  applyTheme();
  forceSaveState();
}

function resetDesignOnly() {
  backupLayoutV4("Design reset");
  state.designStudio = { ...defaultState().designStudio };
  state.customizeV4 = { ...defaultState().customizeV4 };
  setCustomizeStatus("Design controls reset. Saved FahimOS data stayed safe.");
  applyTheme();
  forceSaveState();
}

function factoryLayoutResetOnly() {
  backupLayoutV4("Factory visual layout reset");
  state.designStudio = { ...defaultState().designStudio };
  state.customizeV4 = { ...defaultState().customizeV4 };
  state.liveThemeV4 = { ...defaultState().liveThemeV4 };
  state.homeCardSettings = defaultHomeCards.map((card) => ({ ...card }));
  state.homeCardCollapsed = {};
  state.panelLayouts = {};
  state.smartLayout = {};
  state.hiddenWidgetsV4 = [];
  setCustomizeStatus("Factory layout reset complete. No saved life data was deleted.");
  renderAll();
  forceSaveState();
}

function undoLastLayoutChange() {
  const backup = readJsonKey(LAYOUT_BACKUP_V4_KEY, null);
  if (!backup?.snapshot) {
    setCustomizeStatus("No layout backup found yet.");
    return;
  }
  const snapshot = backup.snapshot;
  state.theme = snapshot.theme || state.theme;
  state.pageStyles = snapshot.pageStyles || state.pageStyles;
  state.pageColors = snapshot.pageColors || state.pageColors;
  state.homeCardSettings = snapshot.homeCardSettings || state.homeCardSettings;
  state.homeCardCollapsed = snapshot.homeCardCollapsed || state.homeCardCollapsed;
  state.panelLayouts = snapshot.panelLayouts || state.panelLayouts;
  state.smartLayout = snapshot.smartLayout || state.smartLayout;
  state.designStudio = snapshot.designStudio || state.designStudio;
  state.liveThemeV4 = snapshot.liveThemeV4 || state.liveThemeV4;
  state.customizeV4 = snapshot.customizeV4 || state.customizeV4;
  state.hiddenWidgetsV4 = snapshot.hiddenWidgetsV4 || state.hiddenWidgetsV4;
  setCustomizeStatus(`Restored last visual backup: ${backup.reason || "layout change"}.`);
  renderAll();
  forceSaveState();
}

function setLauncherThemePanel(open) {
  const panel = document.querySelector("#launcherThemePanel");
  const button = document.querySelector("#toggleLauncherThemes");
  if (!panel || !button) return;
  panel.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
  if (open) renderLauncherThemeSwatches();
}

function setColorValue(selector, value) {
  const el = document.querySelector(selector);
  if (el && value) el.value = value;
}

function applyThemeToAllPages(theme = state.theme || presets.midnight) {
  state.pageStyles = state.pageStyles || {};
  state.pageColors = state.pageColors || {};
  document.querySelectorAll(".panel[id]").forEach((panel) => {
    state.pageStyles[panel.id] = {
      bg: theme.bg,
      card: theme.card,
      text: theme.text,
      accent: theme.accent,
      button: theme.accent,
      nav: theme.card
    };
    state.pageColors[panel.id] = theme.bg;
  });
  state.backgroundScene = "plain";
}

function syncCurrentPageAppearanceToAllPages() {
  const baseTheme = state.theme || presets.midnight;
  const currentStyle = state.pageStyles?.[currentPage] || {};
  const shared = {
    bg: currentStyle.bg || state.pageColors?.[currentPage] || baseTheme.bg,
    card: currentStyle.card || baseTheme.card,
    text: currentStyle.text || baseTheme.text,
    accent: currentStyle.accent || baseTheme.accent,
    button: currentStyle.button || currentStyle.accent || baseTheme.accent,
    nav: currentStyle.nav || currentStyle.card || baseTheme.card,
    presetId: currentStyle.presetId || "synced"
  };
  state.theme = { bg: shared.bg, card: shared.card, text: shared.text, accent: shared.accent };
  state.pageStyles = state.pageStyles || {};
  state.pageColors = state.pageColors || {};
  document.querySelectorAll(".panel[id]").forEach((panel) => {
    state.pageStyles[panel.id] = { ...shared };
    state.pageColors[panel.id] = shared.bg;
  });
  state.backgroundScene = "plain";
  applyTheme();
  forceSaveState();
  const status = document.querySelector("#pageAppearanceStatus");
  if (status) status.textContent = "This complete color setup is now synchronized across every page.";
}

function bindTabs() {
  document.querySelectorAll(".tab").forEach((button) => {
    button.addEventListener("click", () => openPanel(button.dataset.tab, button.textContent, button));
  });
}

function normalizePageId(pageId) {
  return pageId === "home" ? "dashboard" : pageId;
}

function isLightColor(value) {
  let hex = String(value || "").trim().replace("#", "");
  if (/^[0-9a-f]{3}$/i.test(hex)) hex = hex.split("").map((character) => character.repeat(2)).join("");
  if (!/^[0-9a-f]{6}$/i.test(hex)) return false;
  const channels = [0, 2, 4].map((offset) => parseInt(hex.slice(offset, offset + 2), 16) / 255);
  const luminance = 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
  return luminance > 0.72;
}

function normalizeHexColor(value, fallback = "#111111") {
  let hex = String(value || "").trim().replace("#", "");
  if (/^[0-9a-f]{3}$/i.test(hex)) hex = hex.split("").map((character) => character.repeat(2)).join("");
  return /^[0-9a-f]{6}$/i.test(hex) ? `#${hex.toLowerCase()}` : fallback;
}

function mixHexColors(first, second, weight = 0.5) {
  const a = normalizeHexColor(first).slice(1);
  const b = normalizeHexColor(second).slice(1);
  const amount = Math.max(0, Math.min(1, Number(weight) || 0));
  const channels = [0, 2, 4].map((offset) =>
    Math.round(parseInt(a.slice(offset, offset + 2), 16) * (1 - amount) + parseInt(b.slice(offset, offset + 2), 16) * amount)
  );
  return `#${channels.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`;
}

function readableTextColor(background) {
  return isLightColor(background) ? "#111820" : "#f7fbff";
}

function colorLuminance(value) {
  const hex = normalizeHexColor(value).slice(1);
  const channels = [0, 2, 4].map((offset) => {
    const channel = parseInt(hex.slice(offset, offset + 2), 16) / 255;
    return channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
}

function colorContrast(first, second) {
  const high = Math.max(colorLuminance(first), colorLuminance(second));
  const low = Math.min(colorLuminance(first), colorLuminance(second));
  return (high + 0.05) / (low + 0.05);
}

function menuThemeFromBackground(background) {
  const bg = normalizeHexColor(background, "#020713");
  const light = isLightColor(bg);
  const text = readableTextColor(bg);
  return {
    bg,
    card: mixHexColors(bg, light ? "#ffffff" : "#ffffff", light ? 0.86 : 0.09),
    text,
    active: mixHexColors(bg, light ? "#1d6b8f" : "#4bdcff", light ? 0.14 : 0.22),
    accent: light ? "#176f9c" : "#45d9ff"
  };
}

function safeMenuTheme(menu) {
  const bg = normalizeHexColor(menu?.bg, "#eaf4f1");
  const generated = menuThemeFromBackground(bg);
  let card = normalizeHexColor(menu?.card, generated.card);
  const requestedText = normalizeHexColor(menu?.text, readableTextColor(card));
  const candidates = [requestedText, "#111820", "#f7fbff"];
  let text = candidates.find((candidate) =>
    colorContrast(candidate, card) >= 4.5 && colorContrast(candidate, bg) >= 4.5
  );
  if (!text) {
    card = generated.card;
    text = readableTextColor(card);
  }
  let active = normalizeHexColor(menu?.active, generated.active);
  if (colorContrast(text, active) < 4.5) active = generated.active;
  return {
    ...menu,
    bg,
    card,
    text,
    active,
    accent: normalizeHexColor(menu?.accent, isLightColor(bg) ? "#176f9c" : "#45d9ff")
  };
}

function startupPageId() {
  const rawHash = decodeURIComponent(window.location.hash.slice(1)).trim();
  const requested = normalizePageId(rawHash || "dashboard");
  const valid = !!document.getElementById(requested)?.classList.contains("panel");
  const pageId = valid ? requested : "dashboard";
  if (rawHash !== pageId) {
    window.history.replaceState(null, "", `#${pageId}`);
  }
  return pageId;
}

function pageTitle(tabId, fallback) {
  tabId = normalizePageId(tabId);
  const menuLabel = state.menuSettings?.pages?.find((page) => page.id === tabId)?.label;
  return state.pageNames?.[tabId] || menuLabel || fallback || document.querySelector(`#${tabId}`)?.querySelector("h2")?.textContent || "Planner";
}

function defaultPageHeader(pageId) {
  const profileName = profileDisplayName().split(/\s+/)[0] || "Shahariar";
  return {
    headline: pageId === "dashboard" ? "" : `Welcome back, ${profileName}`,
    subtitle: pageId === "dashboard"
      ? "Command your faith, study, health, money, and discipline from one place."
      : pageTitle(pageId),
    visible: true,
    uppercase: pageId !== "dashboard",
    alignment: "left",
    size: pageId === "dashboard" ? 58 : 48
  };
}

function pageHeaderConfig(pageId = currentPage) {
  return { ...defaultPageHeader(pageId), ...(state.pageHeaders?.[pageId] || {}) };
}

function applyPageHeader() {
  const config = pageHeaderConfig(currentPage);
  const topbarCopy = document.querySelector(".topbar > div:first-child");
  const greeting = document.querySelector(".topbar-greeting");
  const title = document.querySelector("#pageTitle");
  const homeIntro = document.querySelector(".home-command-intro");
  document.documentElement.style.setProperty("--page-header-size", `${Number(config.size) || 48}px`);
  document.body.dataset.headerAlign = config.alignment || "left";
  document.body.classList.toggle("page-header-lowercase", !config.uppercase);
  document.body.classList.toggle("page-header-hidden", config.visible === false);
  if (topbarCopy) topbarCopy.hidden = currentPage !== "dashboard" && config.visible === false;
  if (greeting && currentPage !== "dashboard") greeting.textContent = config.headline || defaultPageHeader(currentPage).headline;
  if (title && currentPage !== "dashboard") title.textContent = config.subtitle || pageTitle(currentPage);
  if (homeIntro) homeIntro.hidden = currentPage === "dashboard" && config.visible === false;
  if (currentPage === "dashboard") {
    const dashboardGreeting = document.querySelector("#dashboardGreeting");
    const motivation = document.querySelector("#motivationText");
    if (dashboardGreeting && config.headline) dashboardGreeting.textContent = config.headline;
    if (motivation) motivation.textContent = config.subtitle || defaultPageHeader("dashboard").subtitle;
  }
}

function renderPageHeaderSettings() {
  const selectPage = document.querySelector("#pageHeaderPage");
  if (!selectPage) return;
  const panels = [...document.querySelectorAll(".panel[id]")];
  const selected = document.getElementById(state.pageHeaderEditorPage) ? state.pageHeaderEditorPage : "dashboard";
  if (selectPage.options.length !== panels.length) {
    selectPage.innerHTML = "";
    panels.forEach((panel) => {
      const option = document.createElement("option");
      option.value = panel.id;
      option.textContent = pageTitle(panel.id, panel.id);
      selectPage.append(option);
    });
  }
  selectPage.value = selected;
  const config = pageHeaderConfig(selected);
  const headline = document.querySelector("#pageHeaderHeadline");
  const subtitle = document.querySelector("#pageHeaderSubtitle");
  const visible = document.querySelector("#pageHeaderVisible");
  const uppercase = document.querySelector("#pageHeaderUppercase");
  const alignment = document.querySelector("#pageHeaderAlignment");
  const size = document.querySelector("#pageHeaderSize");
  const sizeOutput = document.querySelector("#pageHeaderSizeOutput");
  if (headline) headline.value = config.headline;
  if (subtitle) subtitle.value = config.subtitle;
  if (visible) visible.checked = config.visible !== false;
  if (uppercase) uppercase.checked = config.uppercase !== false;
  if (alignment) alignment.value = config.alignment || "left";
  if (size) size.value = String(config.size || 48);
  if (sizeOutput) sizeOutput.textContent = `${config.size || 48}px`;
}

function openPanel(tabId, title, activeButton, options = {}) {
  tabId = normalizePageId(tabId);
  if (tabId !== currentPage && !options.skipStack) pageStack.push(currentPage);
  currentPage = tabId;
  document.querySelectorAll(".tab").forEach((tab) => tab.classList.remove("is-active"));
  document.querySelectorAll(".panel").forEach((panel) => panel.classList.remove("is-visible"));
  if (activeButton) activeButton.classList.add("is-active");
  const panel = document.querySelector(`#${tabId}`);
  if (panel) panel.classList.add("is-visible");
  if (options.syncHash !== false && window.location.hash !== `#${tabId}`) {
    window.history.replaceState(null, "", `#${tabId}`);
  }
  document.body.classList.toggle("is-home-page", tabId === "dashboard");
  if (tabId === "dashboard") {
    requestAnimationFrame(() => window.scrollTo({ top: 0, left: 0, behavior: "auto" }));
  }
  updateHeaderHubIdentity(tabId);
  document.querySelector("#pageTitle").textContent = pageTitle(tabId, title);
  const backButton = document.getElementById("backHome");
  if (backButton) backButton.hidden = tabId === "dashboard";
  const visibleBack = document.getElementById("backButton");
  if (visibleBack) visibleBack.hidden = tabId === "dashboard";
  document.querySelector("#pageLauncher").hidden = true;
  const notificationsPanel = document.querySelector("#notificationsPanel");
  if (notificationsPanel) notificationsPanel.hidden = true;
  document.querySelector("#notificationsButton")?.setAttribute("aria-expanded", "false");
  const appearancePanel = document.querySelector("#pageAppearancePanel");
  if (appearancePanel) appearancePanel.hidden = true;
  document.querySelector("#openPageAppearance")?.setAttribute("aria-expanded", "false");
  renderAll();
  applyPageHeader();
  renderPanelLayoutControls();
}

const hubIdentityMap = {
  dashboard: {
    pages: ["dashboard"],
    glyph: "\u2302",
    subtitle: "Personal Operating System"
  },
  life: {
    pages: ["life", "daily", "calendar", "tasks", "todos", "reminders", "alarms", "countdown", "files", "maps", "worldClock", "weatherCenter", "roadmap", "profile", "savedUrls", "credentials"],
    glyph: "\u25ce",
    subtitle: "Life Hub - Home"
  },
  faith: {
    pages: ["faith", "prayer", "quran", "jummah", "ramadan", "adhan", "islamicToolkit"],
    glyph: "\u263d",
    subtitle: "Faith Hub - Home"
  },
  health: {
    pages: ["health", "healthWellness", "nutritionStrategy", "workout", "manualWorkout", "workoutHistory", "trainingSystem", "discipline"],
    glyph: "+",
    subtitle: "Health Hub - Home"
  },
  study: {
    pages: ["study", "school", "schoolClasses", "schoolAssignments", "schoolDates", "schoolTasks", "academicSemester", "studySignals", "studyDeveloper", "studyWorkspace", "studyResources", "studyMedia", "java", "suggestions"],
    glyph: "\u270e",
    subtitle: "Study Hub - Home"
  },
  money: {
    pages: ["money", "bills", "billStrategy", "savingsHub", "moneyCalculators", "creditHub", "stockExchange", "payoffCalculators", "loanCalculators", "curveballMoney", "payoffDatasheet"],
    glyph: "$",
    subtitle: "Money Hub - Home"
  },
  history: {
    pages: ["history", "lifeDataDetails"],
    glyph: "\u21ba",
    subtitle: "History Hub - Home"
  },
  settings: {
    pages: ["settings", "github"],
    glyph: "\u2699",
    subtitle: "Settings Hub - Home"
  }
};

function updateHeaderHubIdentity(pageId = currentPage) {
  pageId = normalizePageId(pageId);
  const button = document.querySelector("#homeButton");
  const glyph = document.querySelector("#hubHomeGlyph");
  const subtitle = document.querySelector("#hubHomeSubtitle");
  if (!button || !glyph || !subtitle) return;
  const entry = Object.entries(hubIdentityMap).find(([, config]) => config.pages.includes(pageId))
    || ["dashboard", hubIdentityMap.dashboard];
  const [hub, config] = entry;
  button.dataset.hub = hub;
  glyph.textContent = config.glyph;
  subtitle.textContent = config.subtitle;
  button.title = pageId === "dashboard" ? "Home" : `Return Home from ${config.subtitle.replace(" - Home", "")}`;
}

function input(value, onInput, attrs = {}) {
  const el = document.createElement("input");
  el.value = value || "";
  Object.assign(el, attrs);
  el.addEventListener("input", () => {
    onInput(el.value);
    saveState();
    renderDashboard();
  });
  return el;
}

function select(value, options, onChange) {
  const el = document.createElement("select");
  options.forEach((option) => {
    const item = document.createElement("option");
    item.value = option;
    item.textContent = option;
    el.append(item);
  });
  el.value = value;
  el.addEventListener("change", () => {
    onChange(el.value);
    saveState();
    renderAll();
  });
  return el;
}

function renderDashboard() {
  const d = day();
  const date = new Date(`${activeDate}T12:00:00`);
  const dayName = date.toLocaleDateString(undefined, { weekday: "long" });
  const fullDate = date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const hour = new Date().getHours();
  const profileName = String(state.profile?.name || "Shahariar").trim() || "Shahariar";
  const displayName = profileDisplayName().split(/\s+/)[0];
  const todayLabel = document.querySelector("#todayLabel");
  document.body.classList.toggle("is-home-page", document.querySelector("#dashboard").classList.contains("is-visible"));
  if (todayLabel) todayLabel.textContent = `Your personal operating system ${profileName.toUpperCase()}`;
  if (document.querySelector("#dashboard").classList.contains("is-visible")) document.querySelector("#pageTitle").textContent = dayName;
  updateLiveClock(fullDate);
  document.querySelector("#dashboardGreeting").textContent = profileGreeting();
  document.querySelector("#motivationText").textContent = "Command your faith, study, health, money, and discipline from one place.";
  const homeProfileMeta = document.querySelector("#homeProfileMeta");
  if (homeProfileMeta) {
    const profileMeta = [
      state.profile?.role,
      state.profile?.school,
      state.profile?.goal,
      ...(state.profile?.identities || []).slice(0, 3)
    ].map((item) => String(item || "").trim()).filter(Boolean);
    homeProfileMeta.innerHTML = profileMeta.length
      ? profileMeta.map((item) => `<span>${escapeHtml(item)}</span>`).join("")
      : `<span>Complete your Profile to personalize FahimOS.</span>`;
  }
  renderHeroSystemPulse();
  const topbarGreeting = document.querySelector(".topbar-greeting");
  if (topbarGreeting) topbarGreeting.textContent = `Welcome back, ${displayName}`;
  const profileWelcome = document.querySelector("#homeProfileWelcome");
  const profileInitials = document.querySelector("#homeProfileInitials");
  const profileGoal = document.querySelector("#homeProfileGoal");
  if (profileWelcome) profileWelcome.textContent = `Welcome back, ${displayName}`;
  if (profileInitials) profileInitials.textContent = profileName.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "SF";
  if (profileGoal) profileGoal.textContent = state.profile?.goal || "Set your profile and primary goal in Settings.";

  const top = document.querySelector("#topThree");
  if (top) {
    top.innerHTML = "";
    fillStatus("#topThree", d.top.filter(Boolean).length
      ? d.top.filter(Boolean).map((text) => ({ text, source: "Schedule", page: "daily" }))
      : [{ text: "No priorities set. Open Schedule to add them.", source: "Schedule", page: "daily" }]);
  }

  const prayersDone = prayers.filter((name) => d.prayers[name]?.done).length;
  const prayerProgress = document.querySelector("#prayerSnapshotProgress");
  const prayerProgressBar = document.querySelector("#prayerSnapshotProgressBar");
  if (prayerProgress) prayerProgress.textContent = `${prayersDone} of ${prayers.length} completed`;
  if (prayerProgressBar) prayerProgressBar.style.width = `${prayersDone / prayers.length * 100}%`;
  const snap = document.querySelector("#prayerSnapshot");
  snap.innerHTML = "";
  const nextPrayer = nextPrayerSnapshot();
  const isFridayDashboard = date.getDay() === 5;
  const jummahDone = (state.jummah?.history || []).some((item) => item.date === activeDate);
  prayers.forEach((name, index) => {
    const row = document.createElement("button");
    row.type = "button";
    const isNext = nextPrayer?.name === name;
    const done = !!d.prayers[name]?.done;
    row.className = `prayer-snapshot-tile${done ? " is-complete" : ""}${isNext ? " is-next" : ""}`;
    row.style.setProperty("--prayer-index", index);
    const countdown = isNext && Number.isFinite(nextPrayer.minutes)
      ? nextPrayer.minutes <= 0 ? "Now" : `in ${Math.floor(nextPrayer.minutes / 60)}h ${nextPrayer.minutes % 60}m`
      : state.prayerTimes?.timings?.[name] || "";
    row.innerHTML = `
      <span class="prayer-snapshot-icon" aria-hidden="true">${done ? "✓" : isNext ? "●" : "☽"}</span>
      <span><small>${["Dawn", "Midday", "Afternoon", "Sunset", "Night"][index]}${isNext ? " · Next" : ""}</small><strong>${name}</strong><em>${escapeHtml(salahGuide[name]?.obligatory || "")} fard rak'ahs${countdown ? ` · ${escapeHtml(countdown)}` : ""}</em></span>
      <b>${done ? "Completed" : "Pending"}</b>`;
    row.classList.add("source-row");
    row.addEventListener("click", () => openPanel("prayer", "Prayer Tracker"));
    snap.append(row);
  });
  if (isFridayDashboard) {
    const jummah = document.createElement("button");
    jummah.type = "button";
    jummah.className = `prayer-snapshot-tile is-jummah${jummahDone ? " is-complete" : ""}`;
    jummah.innerHTML = `<span class="prayer-snapshot-icon" aria-hidden="true">J</span><span><small>Friday priority</small><strong>Jummah</strong><em>${state.jummah?.time || "Protect the khutbah and salah"}</em></span><b>${jummahDone ? "Completed" : "Pending"}</b>`;
    jummah.addEventListener("click", () => openPanel("jummah", "Jummah Tracker"));
    snap.append(jummah);
  }
  renderPrayerGlance();

  const checklist = document.querySelector("#dailyChecklist");
  checklist.innerHTML = "";
  renderHomeChecklistMatrix(d.checklist);
  const dailyNotesDisplay = document.querySelector("#dailyNotesDisplay");
  if (dailyNotesDisplay) dailyNotesDisplay.textContent = d.notes || "No notes yet. Open Schedule to write notes.";

  renderDailySignal();
  renderHomeCommandCards();
  renderLifeData();
  updateLifeDataCollapse();
  updateHomeDock();
  renderHomeSummary();
  renderHomeMonthCalendar();
  applyHomeDashboardCategory();
  renderNotifications();
}

function applyHomeDashboardCategory() {
  state.homeDashboardCategory = "all";
  document.querySelectorAll("#homeCards > [data-home-card]").forEach((card) => {
    card.classList.remove("is-category-hidden");
  });
  const select = document.querySelector("#homeDashboardView");
  if (select && select.value !== "all") select.value = "all";
}

function openWidgetColorPopover(trigger, target) {
  const popover = document.querySelector("#widgetColorPopover");
  if (!popover || !trigger) return;
  const style = state.homeWidgetStyles?.[target] || defaultState().homeWidgetStyles[target];
  popover.dataset.target = target;
  setColorValue("#widgetCardColor", style.card);
  setColorValue("#widgetAccentColor", style.accent);
  setColorValue("#widgetBackgroundColor", style.background);
  popover.hidden = false;
  const rect = trigger.getBoundingClientRect();
  const width = Math.min(250, window.innerWidth - 24);
  popover.style.width = `${width}px`;
  popover.style.left = `${Math.max(12, Math.min(window.innerWidth - width - 12, rect.right - width))}px`;
  popover.style.top = `${Math.min(window.innerHeight - 220, rect.bottom + 8)}px`;
}

function updateActiveWidgetColor(key, value) {
  const popover = document.querySelector("#widgetColorPopover");
  const target = popover?.dataset.target;
  if (!target || !state.homeWidgetStyles?.[target]) return;
  state.homeWidgetStyles[target][key] = value;
  if (key === "accent") {
    if (target === "focus") state.homeFocusColor = value;
    if (target === "calendar") state.homeCalendarColor = value;
  }
  applyTheme();
  forceSaveState();
}

function setupDailyDuaPanel() {
  const section = document.querySelector("#dailyDuaCenter");
  if (!section || section.dataset.enhanced === "true") return;
  section.dataset.enhanced = "true";
  const heading = section.querySelector(".suite-heading");
  const grid = section.querySelector(".faith-dua-grid");
  if (!heading || !grid) return;
  const controls = document.createElement("div");
  controls.className = "dua-panel-controls";
  controls.innerHTML = `<button data-dua-state="expanded" type="button">Expanded</button><button data-dua-state="collapsed" type="button">Collapsed</button><button data-dua-state="pinned" type="button">Pinned</button>`;
  heading.append(controls);
  const applyState = () => {
    const selected = state.dailyDuaState || "expanded";
    section.dataset.state = selected;
    grid.hidden = selected === "collapsed";
    controls.querySelectorAll("button").forEach((button) => button.classList.toggle("is-active", button.dataset.duaState === selected));
  };
  controls.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-dua-state]");
    if (!button) return;
    state.dailyDuaState = button.dataset.duaState;
    forceSaveState();
    applyState();
  });
  applyState();
}

function renderHomeMonthCalendar() {
  const grid = document.querySelector("#homeMonthCalendarGrid");
  const label = document.querySelector("#homeCalendarLabel");
  if (!grid || !label) return;
  const card = document.querySelector(".calendar-command-card");
  card?.classList.remove("is-collapsed");
  const base = new Date(`${activeDate}T12:00:00`);
  label.textContent = base.toLocaleDateString(undefined, { month: "long", year: "numeric" });

  const activityByDate = new Map();
  const addActivity = (value, type) => {
    const key = String(value || "").slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return;
    const bucket = activityByDate.get(key) || [];
    bucket.push(type);
    activityByDate.set(key, bucket);
  };
  (state.importantDates || []).forEach((item) => addActivity(item.when, "date"));
  (state.assignments || []).forEach((item) => addActivity(item.due || item.dueDate, "school"));
  (state.reminders || []).forEach((item) => addActivity(item.date || item.when, "reminder"));
  getMonthBillEvents(activeDate)
    .forEach((item) => addActivity(item.date || item.dateKey, "bill"));

  const weekStart = new Date(base);
  const mondayOffset = (base.getDay() + 6) % 7;
  weekStart.setDate(base.getDate() - mondayOffset);
  grid.innerHTML = "";
  for (let index = 0; index < 7; index += 1) {
    const date = new Date(weekStart);
    date.setDate(weekStart.getDate() + index);
    const dateKey = localDateKey(date);
    const activity = activityByDate.get(dateKey) || [];
    const dayCell = document.createElement("span");
    dayCell.className = "calendar-widget-day";
    dayCell.classList.toggle("is-today", dateKey === todayKey());
    dayCell.classList.toggle("is-active", dateKey === activeDate);
    dayCell.innerHTML = `<small>${date.toLocaleDateString(undefined, { weekday: "narrow" })}</small><strong>${date.getDate()}</strong><i class="${activity.length ? "has-activity" : ""}"></i>`;
    grid.append(dayCell);
  }
  const monthEnd = new Date(base.getFullYear(), base.getMonth() + 1, 0);
  const upcomingCount = [...activityByDate.entries()].filter(([dateKey]) => {
    const date = new Date(`${dateKey}T12:00:00`);
    return date >= base && date <= monthEnd;
  }).reduce((total, [, items]) => total + items.length, 0);
  const count = document.querySelector("#homeCalendarEventCount");
  if (count) count.textContent = upcomingCount
    ? `${upcomingCount} upcoming item${upcomingCount === 1 ? "" : "s"} this month`
    : "No upcoming items this month";
}

function renderPrayerGlance() {
  const wrap = document.querySelector("#prayerGlance");
  const progress = document.querySelector("#prayerGlanceProgress");
  if (!wrap || !progress) return;
  const daily = day();
  const active = new Date(`${activeDate}T12:00:00`);
  const isFriday = active.getDay() === 5;
  const jummahDone = (state.jummah?.history || []).some((item) => item.date === activeDate);
  const items = prayers.map((name) => ({ name, done: !!daily.prayers?.[name]?.done, page: "prayer" }));
  if (isFriday) items.push({ name: "Jummah", done: jummahDone, page: "jummah" });
  const completed = items.filter((item) => item.done).length;
  progress.textContent = `${completed} of ${items.length}`;
  wrap.innerHTML = "";
  items.forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `prayer-glance-item${item.done ? " is-complete" : ""}${item.name === "Jummah" ? " is-jummah" : ""}`;
    button.innerHTML = `<span>${item.name === "Jummah" ? "J" : "&#9789;"}</span><strong>${escapeHtml(item.name)}</strong><small>${item.done ? "Completed" : "Open"}</small>`;
    button.addEventListener("click", () => openPanel(item.page, item.name === "Jummah" ? "Jummah Tracker" : "Prayer Tracker"));
    wrap.append(button);
  });
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(Number(value) || 0)));
}

function lifeDataMetric(id, label, value, detail, page, color, bars = []) {
  return { id, label, value: clampPercent(value), detail, page, color, bars };
}

function getLifeDataMetrics() {
  const d = day();
  const prayersDone = prayers.filter((name) => d.prayers?.[name]?.done).length;
  const faithPercent = prayers.length ? prayersDone / prayers.length * 100 : 0;

  const studyItems = [
    ...(state.assignments || []).map((item) => ["Submitted", "Graded"].includes(item.status)),
    ...(state.studyBlocks || []).map((item) => item.status === "Done"),
    ...(state.tasks || []).map((item) => item.status === "Done")
  ];
  const studyDone = studyItems.filter(Boolean).length;
  const studyPercent = studyItems.length ? studyDone / studyItems.length * 100 : 0;

  const sevenDaysAgo = Date.now() - 7 * 86400000;
  const recentWorkouts = (state.workouts || []).filter((item) => {
    const stamp = item.endedAt || item.startedAt || (item.date ? `${item.date}T12:00:00` : "");
    return stamp && new Date(stamp).getTime() >= sevenDaysAgo && !!item.endedAt;
  });
  const workoutPercent = recentWorkouts.length / 5 * 100;

  const bills = state.bills || [];
  const billsPaid = bills.filter((bill) => bill.paid).length;
  const moneyPercent = bills.length ? billsPaid / bills.length * 100 : 0;

  const streakDays = Math.max(0, Math.floor(disciplineElapsedMs() / 86400000));
  const disciplinePercent = streakDays / 30 * 100;

  const careerItems = state.roadmap || [];
  const careerDone = careerItems.filter((item) => item.status === "Done").length;
  const careerInProgress = careerItems.filter((item) => item.status === "In progress").length;
  const careerPercent = careerItems.length ? (careerDone + careerInProgress * 0.5) / careerItems.length * 100 : 0;

  return [
    lifeDataMetric("faith", "Faith", faithPercent, `${prayersDone} of ${prayers.length} prayers complete`, "prayer", "#21e6d5", [3, 5, 4, 5, 4, prayersDone, prayersDone]),
    lifeDataMetric("study", "Study", studyPercent, `${studyDone} of ${studyItems.length || 0} tracked items complete`, "study", "#2f91ff", [2, 4, 3, 5, 4, studyDone, 3]),
    lifeDataMetric("workout", "Workout", workoutPercent, `${recentWorkouts.length} of 5 sessions this week`, "workout", "#ffbd19", [4, 3, 2, 3, 4, recentWorkouts.length, 1]),
    lifeDataMetric("money", "Money", moneyPercent, `${billsPaid} of ${bills.length} bills marked paid`, "money", "#ff6535", [2, 3, 4, 5, 4, billsPaid, 2]),
    lifeDataMetric("discipline", "Discipline", disciplinePercent, `${streakDays} days toward the next 30-day milestone`, "discipline", "#9d64ff", [2, 3, 4, 3, 5, 4, Math.min(streakDays, 6)]),
    lifeDataMetric("career", "Career", careerPercent, `${careerDone} done, ${careerInProgress} in progress`, "roadmap", "#2aa7ff", [2, 3, 4, 6, 3, 4, careerDone + careerInProgress])
  ];
}

function renderLifeData() {
  const wrap = document.querySelector("#lifeDataGrid");
  if (!wrap) return;
  const metrics = getLifeDataMetrics();
  wrap.innerHTML = "";
  metrics.forEach((metric) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "life-data-card";
    card.style.setProperty("--metric-color", metric.color);
    const radius = 30;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference * (1 - metric.value / 100);
    const maxBar = Math.max(1, ...metric.bars);
    card.innerHTML = `
      <span class="life-data-card-head"><strong><i aria-hidden="true">${metric.label.charAt(0)}</i>${metric.label}</strong><small>Open</small></span>
      <span class="life-data-visual">
        <svg class="life-data-ring" viewBox="0 0 72 72" aria-hidden="true">
          <circle cx="36" cy="36" r="${radius}"></circle>
          <circle class="life-data-ring-value" cx="36" cy="36" r="${radius}" style="stroke-dasharray:${circumference};stroke-dashoffset:${offset}"></circle>
        </svg>
        <span class="life-data-number">${metric.value}<small>%</small></span>
      </span>
      <span class="life-data-detail">${metric.detail}</span>
      <span class="life-data-bars" aria-hidden="true">${metric.bars.map((bar) => `<i style="height:${Math.max(14, bar / maxBar * 100)}%"></i>`).join("")}</span>
    `;
    card.addEventListener("click", () => openPanel(metric.page, pageTitle(metric.page)));
    wrap.append(card);
  });
  renderLifeStatus(metrics);
  const updated = document.querySelector("#lifeDataUpdated");
  if (updated) updated.textContent = `Updated ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
}

function renderLifeStatus(metrics) {
  const wrap = document.querySelector("#lifeStatusList");
  if (!wrap) return;
  wrap.innerHTML = "";
  metrics.forEach((metric) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "life-status-row";
    button.style.setProperty("--metric-color", metric.color);
    button.title = `${metric.label}: ${metric.value}%`;
    button.innerHTML = `
      <span class="life-status-icon" aria-hidden="true">${metric.label.charAt(0)}</span>
      <span class="life-status-copy">
        <span><strong>${metric.label}</strong><b>${metric.value}%</b></span>
        <i><em style="width:${metric.value}%"></em></i>
      </span>
      <span class="life-status-spark" aria-hidden="true">${metric.bars.map((bar) => `<i style="height:${Math.max(16, bar / Math.max(1, ...metric.bars) * 100)}%"></i>`).join("")}</span>
    `;
    button.addEventListener("click", () => openPanel(metric.page, pageTitle(metric.page)));
    wrap.append(button);
  });
  updateLifeStatusCollapse();
  renderDailyWellnessOverview(metrics);
}

function renderDailyWellnessOverview(metrics = getLifeDataMetrics()) {
  const wrap = document.querySelector("#dailyWellnessInsights");
  const panel = document.querySelector(".daily-wellness-card");
  const toggle = document.querySelector("#toggleDailyWellness");
  if (!wrap || !panel || !toggle) return;
  panel.hidden = !!state.dailyWellnessHidden;
  const metric = (id) => metrics.find((item) => item.id === id)?.value || 0;
  const latestSleep = state.health?.sleepSessions?.[0];
  const sleepMs = latestSleep ? new Date(latestSleep.end) - new Date(latestSleep.start) : 0;
  const openTasks = (state.tasks || []).filter((item) => item.status !== "Done" && (!item.due || item.due <= activeDate)).length;
  const prayersDone = prayers.filter((name) => day().prayers?.[name]?.done).length;
  const insights = [
    { icon: "SL", label: "Sleep", value: sleepMs ? formatDuration(sleepMs) : "Not logged", tone: sleepMs >= 7 * 3600000 ? "good" : "watch" },
    { icon: "PR", label: "Prayer", value: `${prayersDone}/${prayers.length} complete`, tone: prayersDone === prayers.length ? "good" : "steady" },
    { icon: "TK", label: "Open work", value: `${openTasks} ${openTasks === 1 ? "task" : "tasks"}`, tone: openTasks > 5 ? "watch" : "steady" },
    { icon: "ST", label: "Study", value: `${metric("study")}% progress`, tone: metric("study") >= 60 ? "good" : "steady" },
    { icon: "WO", label: "Workout", value: `${metric("workout")}% consistency`, tone: metric("workout") >= 50 ? "good" : "steady" }
  ];
  wrap.innerHTML = insights.map((item) => `
    <div class="daily-wellness-insight is-${item.tone}">
      <span>${item.icon}</span>
      <div><small>${item.label}</small><strong>${item.value}</strong></div>
    </div>
  `).join("");
  const collapsed = !!state.dailyWellnessCollapsed;
  panel.classList.toggle("is-collapsed", collapsed);
  toggle.textContent = collapsed ? "+" : "\u2212";
  toggle.setAttribute("aria-expanded", String(!collapsed));
  toggle.title = collapsed ? "Expand Daily Wellness Overview" : "Collapse Daily Wellness Overview";
}

function recentDateKeys(days = 7) {
  return Array.from({ length: days }, (_, index) => {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() - (days - 1 - index));
    return localDateKey(date);
  });
}

function metricWeeklyActivity(metricId, dateKey) {
  const dateDay = state.days?.[dateKey];
  if (metricId === "faith") return prayers.filter((name) => dateDay?.prayers?.[name]?.done).length;
  if (metricId === "study") {
    const assignmentCount = state.assignments.filter((item) => String(item.due || "").slice(0, 10) === dateKey && ["Submitted", "Graded"].includes(item.status)).length;
    const blockCount = state.studyBlocks.filter((item) => String(item.start || "").slice(0, 10) === dateKey && item.status === "Done").length;
    const taskCount = state.tasks.filter((item) => item.category === "School" && item.due === dateKey && item.status === "Done").length;
    return assignmentCount + blockCount + taskCount;
  }
  if (metricId === "workout") return state.workouts.filter((item) => {
    const key = item.date || String(item.startedAt || "").slice(0, 10);
    return key === dateKey && (item.entryType === "manual" || item.endedAt || item.done);
  }).length;
  if (metricId === "money") {
    const transactionCount = state.money.filter((item) => item.date === dateKey).length;
    const savingsCount = state.savings?.deposits?.filter((item) => item.date === dateKey).length || 0;
    return transactionCount + savingsCount;
  }
  if (metricId === "discipline") {
    const start = state.discipline?.start ? String(state.discipline.start).slice(0, 10) : "";
    return start && dateKey >= start ? 1 : 0;
  }
  if (metricId === "career") {
    return state.roadmap.filter((item) => item.completedOn === dateKey || item.updatedOn === dateKey).length;
  }
  return 0;
}

function renderLifeDataDetails() {
  const wrap = document.querySelector("#lifeDataDetailGrid");
  if (!wrap) return;
  const metrics = getLifeDataMetrics();
  const dates = recentDateKeys(7);
  const sourceLabels = {
    faith: "Five daily prayer records",
    study: "Assignments, completed study blocks, and school tasks",
    workout: "Completed timer and manual workout logs",
    money: "Transactions, bills, and savings activity",
    discipline: "Current discipline streak",
    career: "Roadmap progress and milestones"
  };
  wrap.innerHTML = "";
  metrics.forEach((metric) => {
    const values = dates.map((dateKey) => metricWeeklyActivity(metric.id, dateKey));
    const max = Math.max(1, ...values);
    const card = document.createElement("article");
    card.className = "life-data-detail-card";
    card.style.setProperty("--metric-color", metric.color);
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    card.innerHTML = `
      <div class="life-data-detail-head">
        <div><p>${sourceLabels[metric.id]}</p><h3>${metric.label}</h3></div>
        <button type="button">Open ${metric.label}</button>
      </div>
      <div class="life-data-detail-body">
        <div class="life-data-large-ring">
          <svg viewBox="0 0 120 120" aria-hidden="true">
            <circle cx="60" cy="60" r="${radius}"></circle>
            <circle class="value" cx="60" cy="60" r="${radius}" style="stroke-dasharray:${circumference};stroke-dashoffset:${circumference * (1 - metric.value / 100)}"></circle>
          </svg>
          <strong>${metric.value}<small>%</small></strong>
        </div>
        <div class="life-data-week">
          <div class="life-data-week-bars">${values.map((value, index) => `<span><i style="height:${value ? Math.max(12, value / max * 100) : 3}%"></i><small>${new Date(`${dates[index]}T12:00:00`).toLocaleDateString(undefined, { weekday: "short" }).slice(0, 1)}</small></span>`).join("")}</div>
          <p>${metric.detail}</p>
        </div>
      </div>
    `;
    card.querySelector("button").addEventListener("click", () => openPanel(metric.page, pageTitle(metric.page)));
    wrap.append(card);
  });
}

function updateLifeStatusCollapse() {
  const panel = document.querySelector(".home-status-rail");
  const toggle = document.querySelector("#toggleLifeStatus");
  const expand = document.querySelector("#expandLifeStatus");
  if (!panel || !toggle || !expand) return;
  panel.hidden = !!state.lifeStatusHidden;
  const collapsed = !!state.lifeStatusCollapsed;
  const expanded = !!state.lifeStatusExpanded && !collapsed;
  panel.classList.toggle("is-collapsed", collapsed);
  panel.classList.toggle("is-expanded", expanded);
  toggle.textContent = collapsed ? "+" : "\u2212";
  toggle.setAttribute("aria-expanded", String(!collapsed));
  toggle.title = collapsed ? "Expand Life Status" : "Collapse Life Status";
  expand.setAttribute("aria-pressed", String(expanded));
  expand.textContent = expanded ? "\u2198" : "\u2197";
  expand.title = expanded ? "Restore Life Status" : "Expand Life Status";
}

function parsePrayerMinutes(value) {
  const match = String(value || "").match(/(\d{1,2}):(\d{2})/);
  if (!match) return null;
  return Number(match[1]) * 60 + Number(match[2]);
}

function formatPrayerDisplayTime(value) {
  const match = String(value || "").match(/(\d{1,2}):(\d{2})/);
  if (!match) return value || "--";
  const hour24 = Number(match[1]);
  const minute = match[2];
  if (state.prayerTimeFormat === "24") return `${String(hour24).padStart(2, "0")}:${minute}`;
  const hour12 = ((hour24 + 11) % 12) + 1;
  return `${hour12}:${minute} ${hour24 >= 12 ? "PM" : "AM"}`;
}

function updatePrayerTimeFormatButtons() {
  const format = state.prayerTimeFormat === "24" ? "24" : "12";
  document.querySelector("#prayerTimeFormat12")?.classList.toggle("is-active", format === "12");
  document.querySelector("#prayerTimeFormat24")?.classList.toggle("is-active", format === "24");
  document.querySelectorAll("[data-prayer-time-format]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.prayerTimeFormat === format);
  });
}

const adhanPhraseGroups = [
  { repeats: 4, ar: "الله أكبر", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest." },
  { repeats: 2, ar: "أشهد أن لا إله إلا الله", transliteration: "Ashhadu an la ilaha illa Allah", meaning: "I bear witness that there is no deity worthy of worship except Allah." },
  { repeats: 2, ar: "أشهد أن محمدًا رسول الله", transliteration: "Ashhadu anna Muhammadan Rasul Allah", meaning: "I bear witness that Muhammad is the Messenger of Allah." },
  { repeats: 2, ar: "حي على الصلاة", transliteration: "Hayya 'ala-s-salah", meaning: "Come to prayer." },
  { repeats: 2, ar: "حي على الفلاح", transliteration: "Hayya 'ala-l-falah", meaning: "Come to success." },
  { repeats: 2, fajrOnly: true, ar: "الصلاة خير من النوم", transliteration: "As-salatu khayrun min an-nawm", meaning: "Prayer is better than sleep." },
  { repeats: 2, ar: "الله أكبر", transliteration: "Allahu Akbar", meaning: "Allah is the Greatest." },
  { repeats: 1, ar: "لا إله إلا الله", transliteration: "La ilaha illa Allah", meaning: "There is no deity worthy of worship except Allah." }
];

function activeAdhanPhrases(prayerName = "") {
  const includeFajr = prayerName === "Fajr" && state.adhanSettings?.includeFajrLine !== false;
  return adhanPhraseGroups.flatMap((group) => {
    if (group.fajrOnly && !includeFajr) return [];
    return Array.from({ length: group.repeats }, () => ({ ...group }));
  });
}

function renderAdhan() {
  state.adhanSettings = { ...defaultState().adhanSettings, ...(state.adhanSettings || {}) };
  const status = document.querySelector("#adhanAudioStatus");
  const enable = document.querySelector("#enableAdhanAudio");
  const fajr = document.querySelector("#adhanFajrLine");
  if (status) status.textContent = state.adhanSettings.enabled
    ? "Prayer-time Adhan is enabled on this device."
    : "Adhan audio is off.";
  if (enable) enable.textContent = state.adhanSettings.enabled ? "Audio On" : "Audio Off";
  const permission = document.querySelector("#adhanDevicePermission");
  const settingsAudio = document.querySelector("#settingsAdhanAudio");
  if (permission) permission.checked = !!state.adhanSettings.enabled;
  if (settingsAudio) settingsAudio.checked = !!state.adhanSettings.enabled;
  if (fajr) fajr.checked = state.adhanSettings.includeFajrLine !== false;
  const lines = document.querySelector("#adhanLines");
  if (!lines) return;
  lines.innerHTML = "";
  adhanPhraseGroups.forEach((group) => {
    const row = document.createElement("article");
    row.className = `adhan-line${group.fajrOnly ? " is-fajr" : ""}`;
    row.innerHTML = `
      <span>${group.repeats}&times;</span>
      <div><strong lang="ar" dir="rtl">${group.ar}</strong><b>${escapeHtml(group.transliteration)}</b><p>${escapeHtml(group.meaning)}</p></div>
      ${group.fajrOnly ? "<small>Fajr only</small>" : ""}`;
    lines.append(row);
  });
}

function stopAdhanAudio() {
  if ("speechSynthesis" in window) window.speechSynthesis.cancel();
  adhanSpeaking = false;
}

function playAdhan(prayerName = "") {
  if (!("speechSynthesis" in window)) {
    alert("This browser does not provide device speech audio.");
    return;
  }
  stopAdhanAudio();
  const phrases = activeAdhanPhrases(prayerName);
  const utterance = new SpeechSynthesisUtterance(phrases.map((item) => item.ar).join("،   "));
  const voices = window.speechSynthesis.getVoices();
  utterance.voice = voices.find((voice) => /^ar/i.test(voice.lang)) || null;
  utterance.lang = utterance.voice?.lang || "ar-SA";
  utterance.rate = 0.72;
  utterance.pitch = 0.92;
  utterance.volume = Math.min(1, Math.max(0, Number(state.adhanSettings?.volume ?? 1)));
  utterance.onstart = () => adhanSpeaking = true;
  utterance.onend = () => adhanSpeaking = false;
  utterance.onerror = () => adhanSpeaking = false;
  window.speechSynthesis.speak(utterance);
}

function showAdhanPopup(prayerName, time) {
  const popup = document.querySelector("#adhanPopup");
  if (!popup) return;
  document.querySelector("#adhanPopupTitle").textContent = `${prayerName} Adhan`;
  document.querySelector("#adhanPopupTime").textContent = `${time || "Now"} - prepare for the obligatory prayer.`;
  popup.dataset.prayer = prayerName;
  popup.hidden = false;
  if (state.adhanSettings?.enabled) playAdhan(prayerName);
}

function dismissAdhanPopup() {
  const popup = document.querySelector("#adhanPopup");
  if (popup) popup.hidden = true;
  stopAdhanAudio();
}

function checkPrayerTimeAdhan() {
  const timings = state.prayerTimes?.timings;
  if (!timings) return;
  const now = new Date();
  let current = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
  if (state.prayerTimes?.timezone) {
    try {
      const parts = new Intl.DateTimeFormat("en-GB", {
        timeZone: state.prayerTimes.timezone,
        hour: "2-digit",
        minute: "2-digit",
        hourCycle: "h23"
      }).formatToParts(now);
      current = `${parts.find((part) => part.type === "hour")?.value}:${parts.find((part) => part.type === "minute")?.value}`;
    } catch {
      // Use the device time when the returned timezone is unavailable.
    }
  }
  const prayerName = prayers.find((name) => String(timings[name] || "").slice(0, 5) === current);
  if (!prayerName) return;
  const triggerKey = `${todayKey()}-${prayerName}-${current}`;
  if (state.adhanSettings?.lastTriggered === triggerKey) return;
  state.adhanSettings = { ...defaultState().adhanSettings, ...(state.adhanSettings || {}), lastTriggered: triggerKey };
  forceSaveState();
  showAdhanPopup(prayerName, timings[prayerName]);
}

function renderHomeCommandCards() {
  const d = day();
  const nextPrayer = nextPrayerSnapshot();
  const minutesUntil = nextPrayer?.minutes ?? null;
  const prayerName = document.querySelector("#homeNextPrayerName");
  const prayerCountdown = document.querySelector("#homeNextPrayerCountdown");
  const prayerProgress = document.querySelector("#homePrayerProgress");
  if (prayerName) prayerName.textContent = nextPrayer
    ? nextPrayer.name === "Jummah"
      ? `Jummah - ${nextPrayer.time || state.jummah?.time || "Friday"}`
      : `${nextPrayer.name} - ${salahGuide[nextPrayer.name]?.obligatory || ""} fard rak'ahs`
    : "Prayer times";
  if (prayerCountdown) {
    if (!nextPrayer) prayerCountdown.textContent = "Open Faith Hub to load live times";
    else if (minutesUntil < 60) prayerCountdown.textContent = `in ${minutesUntil} min`;
    else prayerCountdown.textContent = `in ${Math.floor(minutesUntil / 60)} hr ${minutesUntil % 60} min`;
  }
  if (prayerProgress) prayerProgress.style.width = `${nextPrayer ? Math.max(8, 100 - Math.min(100, minutesUntil / 240 * 100)) : 8}%`;

  const taskItems = (state.tasks || []).filter((item) => !item.due || item.due <= activeDate);
  const assignmentItems = (state.assignments || []).filter((item) => !item.due || String(item.due).slice(0, 10) <= activeDate);
  const total = taskItems.length + assignmentItems.length;
  const completed = taskItems.filter((item) => item.status === "Done").length
    + assignmentItems.filter((item) => ["Submitted", "Graded"].includes(item.status)).length;
  const percent = total ? clampPercent(completed / total * 100) : 0;
  const focusCount = document.querySelector("#homeFocusCount");
  const focusCompleted = document.querySelector("#homeFocusCompleted");
  const focusPriority = document.querySelector("#homeFocusPriority");
  const focusRing = document.querySelector("#homeFocusRing");
  if (focusCount) focusCount.textContent = `${Math.max(0, total - completed)} ${total - completed === 1 ? "Task" : "Tasks"}`;
  if (focusCompleted) focusCompleted.textContent = `${completed} completed`;
  if (focusPriority) {
    const priorityRank = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
    const priorities = [
      ...(state.tasks || [])
        .filter((item) => item.status !== "Done")
        .map((item) => ({ title: item.title || "Untitled task", priority: item.priority || "Medium", due: item.due || "" })),
      ...(state.assignments || [])
        .filter((item) => !["Submitted", "Graded"].includes(item.status))
        .map((item) => ({ title: item.title || item.text || "Untitled assignment", priority: item.priority || "Medium", due: item.due || "" }))
    ].sort((a, b) => (priorityRank[b.priority] || 0) - (priorityRank[a.priority] || 0) || String(a.due).localeCompare(String(b.due)));
    const major = priorities.find((item) => ["Urgent", "High"].includes(item.priority)) || priorities[0];
    focusPriority.textContent = major ? `${major.priority}: ${major.title}` : "No urgent priority";
    focusPriority.title = major?.title || "No urgent priority";
  }
  if (focusRing) {
    focusRing.style.setProperty("--focus-percent", `${percent * 3.6}deg`);
    focusRing.querySelector("b").textContent = `${percent}%`;
  }
}

function updateLifeDataCollapse() {
  const section = document.querySelector(".life-data-section");
  const toggle = document.querySelector("#toggleLifeData");
  if (!section || !toggle) return;
  const collapsed = !!state.lifeDataCollapsed;
  section.classList.toggle("is-collapsed", collapsed);
  toggle.textContent = collapsed ? "+" : "\u2212";
  toggle.setAttribute("aria-expanded", String(!collapsed));
  toggle.title = collapsed ? "Expand Life Data" : "Collapse Life Data";
}

function homeDockNode(id) {
  if (id === "assistant") return document.querySelector("#homeDockAssistant");
  if (id === "more") return document.querySelector("#homeDockMore");
  const dock = document.querySelector(".home-bottom-dock");
  let button = dock?.querySelector(`[data-open-tab="${id}"]`);
  if (!button && dock && document.getElementById(id)) {
    button = document.createElement("button");
    button.className = "hub-link";
    button.type = "button";
    button.dataset.openTab = id;
    const icon = document.createElement("span");
    const icons = {
      life: "\u25ce",
      faith: "\u263d",
      health: "+",
      history: "\u21ba",
      settings: "\u2699"
    };
    icon.textContent = icons[id] || "\u2022";
    button.append(icon);
    button.addEventListener("click", () => openPanel(id, pageTitle(id)));
    dock.insertBefore(button, document.querySelector("#manageHomeDock") || document.querySelector("#hideHomeDock"));
  }
  return button;
}

function updateHomeDock() {
  const dock = document.querySelector(".home-bottom-dock");
  if (!dock) return;
  const visible = state.homeDockVisible !== false;
  dock.hidden = !visible;
  document.body.classList.toggle("is-dock-visible", visible);
  const showButton = document.querySelector("#showHomeDock");
  if (showButton) showButton.hidden = visible;
  const visibilityToggle = document.querySelector("#showHomeDockToggle");
  if (visibilityToggle) visibilityToggle.checked = visible;
  const settings = state.homeDockSettings || defaultHomeDock.map((item) => ({ ...item }));
  settings.forEach((item) => {
    const button = homeDockNode(item.id);
    if (!button) return;
    button.hidden = item.visible === false;
    const icon = button.querySelector("span");
    [...button.childNodes].filter((node) => node.nodeType === Node.TEXT_NODE).forEach((node) => node.remove());
    button.append(document.createTextNode(item.label || defaultHomeDock.find((entry) => entry.id === item.id)?.label || item.id));
    if (icon && icon.parentNode !== button) button.prepend(icon);
    dock.insertBefore(button, document.querySelector("#manageHomeDock") || document.querySelector("#hideHomeDock"));
  });
  dock.querySelectorAll("[data-open-tab]").forEach((button) => {
    button.classList.toggle("is-active", normalizePageId(button.dataset.openTab) === currentPage);
  });
}

function generatedWisdomReminder(index, category = "life") {
  const categoryParts = {
    discipline: {
      type: "Discipline",
      openings: ["Choose disciplined action", "Protect the standard", "Train consistency", "Lead yourself first", "Keep the promise"],
      actions: ["finish the next useful task", "remove one distraction", "do the difficult minimum", "act before mood changes", "repeat the right behavior"],
      outcomes: ["self-respect becomes earned", "momentum survives hard days", "your attention becomes stronger", "confidence follows evidence", "the habit becomes reliable"]
    },
    success: {
      type: "Success",
      openings: ["Build quiet competence", "Play the long game", "Create useful value", "Prepare beyond the minimum", "Make progress visible"],
      actions: ["improve one valuable skill", "solve one real problem", "finish what you started", "ask for useful feedback", "measure the next milestone"],
      outcomes: ["opportunity has a reason to find you", "your work becomes difficult to ignore", "small advantages compound", "your reputation gains substance", "the path becomes clearer"]
    },
    gratitude: {
      type: "Gratitude",
      openings: ["Notice what remains", "Begin with gratitude", "Count the quiet blessings", "Honor today's provision", "Pause before asking for more"],
      actions: ["name one blessing", "thank one person", "use what you already have", "serve someone nearby", "protect one peaceful moment"],
      outcomes: ["contentment becomes stronger", "your perspective becomes wider", "ordinary moments regain value", "generosity becomes easier", "the day feels less empty"]
    },
    patience: {
      type: "Patience",
      openings: ["Move with patience", "Do not rush the lesson", "Stay steady under pressure", "Let timing mature", "Respond after clarity"],
      actions: ["take the next calm step", "wait before reacting", "keep working without panic", "separate facts from fear", "trust steady preparation"],
      outcomes: ["clarity grows", "mistakes become less expensive", "your character stays intact", "pressure loses control", "better decisions become possible"]
    },
    life: {
      type: "Life Advice",
      openings: ["Think clearly", "Protect your character", "Build quiet competence", "Choose a useful direction", "Return to what matters"],
      actions: ["ask one better question", "keep one promise", "finish one useful task", "speak with calm respect", "learn from one mistake"],
      outcomes: ["clarity grows", "trust compounds", "confidence becomes earned", "your future becomes stronger", "problems become manageable"]
    },
    positive: {
      type: "Positive Word",
      openings: ["Stay hopeful", "Choose courage", "Speak life into the day", "Begin again", "Carry light"],
      actions: ["take one clean step", "notice one good thing", "encourage yourself with truth", "replace one harsh thought", "move with steady optimism"],
      outcomes: ["energy returns", "your mind gets lighter", "the next step feels possible", "gratitude becomes natural", "confidence grows quietly"]
    },
    power: {
      type: "Power Law",
      openings: ["Use power with ethics", "Protect your leverage", "Master timing", "Stay calm and observant", "Build strategic value"],
      actions: ["say less and prepare more", "create options before choosing", "avoid emotional negotiations", "make your work useful", "guard your reputation"],
      outcomes: ["respect becomes durable", "chaos loses influence", "people trust your steadiness", "your choices stay free", "opportunity has a reason to return"]
    },
    planning: {
      type: "Life Planning",
      openings: ["Plan the next phase", "Design tomorrow early", "Build the roadmap", "Think in systems", "Choose the next milestone"],
      actions: ["write the next three moves", "schedule the most important block", "remove one unnecessary commitment", "connect faith, health, study, and money", "review the cost of the plan"],
      outcomes: ["the day becomes easier to command", "your goals become visible", "wasted motion decreases", "progress becomes trackable", "your future becomes less random"]
    },
    quran: {
      type: "Quran Reminder",
      openings: ["Return to Allah's words", "Let revelation reset the heart", "Read with humility", "Use the ayah as guidance", "Pause with the Quran"],
      actions: ["reflect on one verse", "turn one meaning into action", "ask Allah for understanding", "recite slowly before rushing", "write one lesson"],
      outcomes: ["the heart finds direction", "faith becomes practical", "knowledge turns into character", "worship becomes more present", "the day gains barakah"]
    },
    hadith: {
      type: "Hadith Reminder",
      openings: ["Follow prophetic character", "Practice mercy with strength", "Keep deeds consistent", "Choose sincere action", "Live the Sunnah in small ways"],
      actions: ["make one deed sincere", "treat someone with patience", "guard the tongue", "repair one mistake", "choose consistency over display"],
      outcomes: ["character becomes worship", "small deeds become meaningful", "relationships become cleaner", "discipline becomes spiritual", "your actions carry sincerity"]
    },
    famous: {
      type: "Famous Quote",
      openings: ["Remember the old lesson", "Let proven wisdom guide you", "Borrow courage from history", "Learn from great minds", "Use the quote as a mirror"],
      actions: ["start before perfect conditions", "repeat the small effort", "act with purpose", "choose the hard useful thing", "measure the lesson in action"],
      outcomes: ["momentum begins", "the impossible becomes smaller", "habits shape identity", "effort compounds", "the idea becomes proof"]
    }
  };
  const parts = categoryParts[category] || categoryParts.life;
  const openings = parts.openings;
  const actions = parts.actions;
  const outcomes = parts.outcomes;
  const contexts = [
    "today", "before the next decision", "when energy is low", "when nobody is watching", "during a difficult week",
    "before reacting", "at the start of the day", "after a mistake", "when progress feels slow", "before asking for more",
    "while learning", "while building your future", "under pressure", "when plans change", "when comfort is tempting",
    "in your relationships", "in your studies", "in your work", "in your worship", "before sleep"
  ];
  const closings = [
    "Return to the next right action.", "Keep the standard simple and repeatable.", "Let evidence replace empty confidence.",
    "A calm response is still a strong response.", "Small honest progress counts.", "Protect tomorrow with today's decision.",
    "Do not trade direction for temporary comfort.", "Use the lesson instead of carrying the shame.", "Make the useful choice easier to repeat.",
    "Your private habits eventually become public results.", "Do the minimum that keeps momentum alive.", "Clarity follows action.",
    "Consistency is a form of self-respect.", "Prepare quietly, then execute clearly.", "Leave room for rest without abandoning the mission.",
    "Choose what strengthens faith, health, skill, and character.", "Measure progress without becoming controlled by numbers.",
    "A delayed result is not a wasted effort.", "Speak less, observe more, and act with purpose.", "Finish the day with a clean return to the plan."
  ];
  return {
    category,
    type: parts.type,
    text: `${openings[index % openings.length]} ${contexts[(index * 11) % contexts.length]}: ${actions[(index * 3) % actions.length]}, and ${outcomes[(index * 7) % outcomes.length]}. ${closings[(index * 13) % closings.length]}`,
    source: "FahimOS 10,000+ wisdom engine"
  };
}

function renderDailySignal() {
  const signal = document.querySelector(".daily-signal");
  if (!signal) return;
  signal.hidden = faithReminderHidden;
  if (faithReminderHidden) return;
  const bank = wisdomReminderBank();
  const daySeed = Math.floor(new Date(`${activeDate}T12:00:00`).getTime() / 86400000);
  const sequence = Math.max(0, Number(state.quoteSeeds?.wisdom || 0));
  const category = state.wisdomCategory || "all";
  const filtered = category === "all" ? bank : bank.filter((item) => item.category === category);
  const generatedCategories = ["discipline", "success", "gratitude", "patience", "life", "positive", "power", "planning", "quran", "hadith", "famous"];
  const generatedCategory = category === "all"
    ? generatedCategories[(daySeed + sequence) % generatedCategories.length]
    : generatedCategories.includes(category) ? category : "life";
  const item = filtered.length && sequence % 4 !== 3
    ? filtered[(daySeed + sequence) % filtered.length]
    : generatedWisdomReminder(daySeed + sequence, generatedCategory);
  currentDailySignalItem = item;
  document.querySelector("#dailySignalType").textContent = item.type;
  const signalText = document.querySelector("#dailySignalText");
  if (signalText) {
    signalText.textContent = item.text;
    signalText.title = item.text;
    signalText.dataset.length = item.text.length > 150 ? "long" : item.text.length > 95 ? "medium" : "short";
  }
  document.querySelector("#dailySignalSource").textContent = item.source;
  const nextButton = document.querySelector("#nextDailySignal");
  if (nextButton) nextButton.textContent = "\u21bb";
  const content = document.querySelector(".daily-signal-content");
  content.classList.remove("is-refreshing");
  void content.offsetWidth;
  content.classList.add("is-refreshing");
  const progress = document.querySelector(".daily-signal-progress span");
  if (progress) {
    progress.style.animation = "none";
    void progress.offsetWidth;
    progress.style.animation = "";
  }
  const categoryControl = document.querySelector("#wisdomCategory");
  if (categoryControl && categoryControl.value !== category) categoryControl.value = category;
  const favorite = document.querySelector("#favoriteDailySignal");
  if (favorite) {
    const key = `${item.type}|${item.text}`;
    const isFavorite = (state.favoriteWisdom || []).some((entry) => `${entry.type}|${entry.text}` === key);
    favorite.textContent = isFavorite ? "\u2605" : "\u2606";
    favorite.classList.toggle("is-favorite", isFavorite);
  }
}

function advanceDailySignal() {
  if (faithReminderHidden) return;
  state.quoteSeeds = state.quoteSeeds || {};
  state.quoteSeeds.wisdom = (state.quoteSeeds.wisdom || 0) + 1;
  saveState();
  renderDailySignal();
}

function updateLiveClock(dateLabel = "") {
  const date = new Date(`${activeDate}T12:00:00`);
  const fullDate = dateLabel || date.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
  const now = new Date();
  const clock = document.querySelector("#homeDayLabel");
  if (clock) clock.textContent = fullDate;
  const heroTime = document.querySelector("#homeHeroTime");
  if (heroTime) heroTime.textContent = formatClockTime(now, false);
  const heroAnalogTime = document.querySelector("#heroAnalogTime");
  const heroAnalogClock = document.querySelector(".hero-analog-clock");
  const heroClockLocation = document.querySelector("#heroClockLocation");
  if (heroAnalogTime) heroAnalogTime.textContent = formatClockTime(now, true);
  if (heroClockLocation) {
    const weatherText = state.liveWeather?.items?.[0]?.text || "";
    const location = weatherText.includes(":") ? weatherText.split(":")[0].trim() : "";
    heroClockLocation.textContent = location || "Queens, NY";
  }
  if (heroAnalogClock) {
    const month = now.getMonth();
    const hour = now.getHours();
    const season = month <= 1 || month === 11 ? "winter" : month <= 4 ? "spring" : month <= 7 ? "summer" : "fall";
    const timePhase = hour >= 5 && hour < 12 ? "morning" : hour >= 12 && hour < 17 ? "day" : hour >= 17 && hour < 21 ? "evening" : "night";
    heroAnalogClock.dataset.season = season;
    heroAnalogClock.dataset.timePhase = timePhase;
    heroAnalogClock.style.setProperty("--hero-second-angle", `${now.getSeconds() * 6}deg`);
    heroAnalogClock.style.setProperty("--hero-minute-angle", `${now.getMinutes() * 6 + now.getSeconds() * 0.1}deg`);
    heroAnalogClock.style.setProperty("--hero-hour-angle", `${(now.getHours() % 12) * 30 + now.getMinutes() * 0.5}deg`);
    heroAnalogClock.style.setProperty("--hero-month-angle", `${month * 30 + now.getDate()}deg`);
  }
  const digital = document.querySelector("#digitalClockTime");
  const period = document.querySelector("#digitalClockPeriod");
  if (digital) digital.textContent = formatClockTime(now, true);
  if (period) period.textContent = now.toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  updateAnalogClock(now);
  updateHomeClockMode(now);
  renderWorldClocks(now);
}

function formatClockTime(date, includeSeconds = true, timeZone = undefined) {
  return date.toLocaleTimeString(undefined, {
    timeZone,
    hour: "2-digit",
    minute: "2-digit",
    ...(includeSeconds ? { second: "2-digit" } : {}),
    hour12: state.clockHourFormat !== "24"
  });
}

function updateAnalogClock(now = new Date()) {
  const clock = document.querySelector(".analog-clock");
  if (!clock) return;
  const seconds = now.getSeconds();
  const minutes = now.getMinutes();
  const hours = now.getHours() % 12;
  clock.style.setProperty("--second-angle", `${seconds * 6}deg`);
  clock.style.setProperty("--minute-angle", `${minutes * 6 + seconds * 0.1}deg`);
  clock.style.setProperty("--hour-angle", `${hours * 30 + minutes * 0.5}deg`);
  clock.style.setProperty("--solar-minute-angle", `${minutes * 6 + seconds * 0.1}deg`);
  clock.style.setProperty("--solar-hour-angle", `${hours * 30 + minutes * 0.5}deg`);
  const title = document.querySelector("#analogTimeTitle");
  const date = document.querySelector("#analogDate");
  if (title) title.textContent = formatClockTime(now, true);
  if (date) date.textContent = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric", year: "numeric" });
}

function updateHomeClockMode(now = new Date()) {
  const digitalFace = document.querySelector("#homeDigitalClockFace");
  const analogFace = document.querySelector("#homeAnalogClockFace");
  const label = document.querySelector("#homeClockModeLabel");
  const analogMode = state.homeClockMode === "analog";
  if (digitalFace) digitalFace.hidden = analogMode;
  if (analogFace) {
    analogFace.hidden = !analogMode;
    analogFace.style.setProperty("--mini-second-angle", `${now.getSeconds() * 6}deg`);
    analogFace.style.setProperty("--mini-minute-angle", `${now.getMinutes() * 6 + now.getSeconds() * 0.1}deg`);
    analogFace.style.setProperty("--mini-hour-angle", `${(now.getHours() % 12) * 30 + now.getMinutes() * 0.5}deg`);
  }
  if (label) label.textContent = analogMode ? "Analog mode" : "Digital mode";
  document.querySelector("#useDigitalClock")?.classList.toggle("primary-btn", !analogMode);
  document.querySelector("#useDigitalClock")?.classList.toggle("ghost-btn", analogMode);
  document.querySelector("#useAnalogClock")?.classList.toggle("primary-btn", analogMode);
  document.querySelector("#useAnalogClock")?.classList.toggle("ghost-btn", !analogMode);
}

const worldClockCityShortcuts = [
  { label: "New York", country: "United States", zone: "America/New_York" },
  { label: "Queens", country: "United States", zone: "America/New_York" },
  { label: "Los Angeles", country: "United States", zone: "America/Los_Angeles" },
  { label: "Chicago", country: "United States", zone: "America/Chicago" },
  { label: "London", country: "United Kingdom", zone: "Europe/London" },
  { label: "Paris", country: "France", zone: "Europe/Paris" },
  { label: "Metz", country: "France", zone: "Europe/Paris" },
  { label: "France", country: "France", zone: "Europe/Paris" },
  { label: "Dhaka", country: "Bangladesh", zone: "Asia/Dhaka" },
  { label: "Makkah", country: "Saudi Arabia", zone: "Asia/Riyadh" },
  { label: "Dubai", country: "United Arab Emirates", zone: "Asia/Dubai" },
  { label: "Tokyo", country: "Japan", zone: "Asia/Tokyo" },
  { label: "Toronto", country: "Canada", zone: "America/Toronto" },
  { label: "Sydney", country: "Australia", zone: "Australia/Sydney" }
];

function zoneCityLabel(zone = "") {
  return String(zone).split("/").pop()?.replaceAll("_", " ") || zone;
}

function worldClockZoneSuggestions() {
  const fallback = ["America/New_York", "America/Chicago", "America/Los_Angeles", "Europe/London", "Europe/Paris", "Asia/Dhaka", "Asia/Riyadh", "Asia/Dubai", "Asia/Tokyo"];
  const zones = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : fallback;
  return [
    ...worldClockCityShortcuts,
    ...zones.map((zone) => ({ label: zoneCityLabel(zone), country: String(zone).split("/")[0] || "", zone }))
  ].filter((item, index, array) => array.findIndex((other) => other.zone === item.zone && other.label === item.label) === index);
}

function findWorldClockSuggestion(query) {
  const needle = String(query || "").trim().toLowerCase();
  if (!needle) return null;
  const suggestions = worldClockZoneSuggestions();
  return suggestions.find((item) => {
    const haystack = [item.label, item.country, item.zone].join(" ").toLowerCase();
    return haystack === needle || String(item.label || "").toLowerCase() === needle || String(item.zone || "").toLowerCase() === needle;
  }) || suggestions.find((item) => [item.label, item.country, item.zone].some((value) => String(value || "").toLowerCase().startsWith(needle)))
    || suggestions.find((item) => [item.label, item.country, item.zone].some((value) => String(value || "").toLowerCase().includes(needle)));
}

function applyWorldClockSuggestion(query, requireStrongMatch = false) {
  const suggestion = findWorldClockSuggestion(query);
  if (!suggestion) return null;
  const needle = String(query || "").trim().toLowerCase();
  const strong = !requireStrongMatch
    || needle.length >= 3
    || String(suggestion.label || "").toLowerCase() === needle
    || String(suggestion.zone || "").toLowerCase() === needle;
  if (!strong) return null;
  const labelField = document.querySelector("#worldClockLabel");
  const countryField = document.querySelector("#worldClockCountry");
  const zoneField = document.querySelector("#worldClockZone");
  if (labelField && !labelField.value.trim()) labelField.value = suggestion.label;
  if (countryField) countryField.value = suggestion.country || countryField.value;
  if (zoneField) zoneField.value = suggestion.zone || zoneField.value;
  return suggestion;
}

function renderWorldClocks(now = new Date()) {
  const wrap = document.querySelector("#worldClockGrid");
  if (!wrap) return;
  wrap.innerHTML = "";
  const query = document.querySelector("#worldClockSearch")?.value.trim().toLowerCase() || "";
  (state.worldClocks || []).forEach((clock, index) => {
    if (query && ![clock.label, clock.country, clock.zone].some((value) => String(value || "").toLowerCase().includes(query))) return;
    const card = document.createElement("article");
    card.className = "world-clock-card";
    let time = "--:--";
    let date = clock.zone;
    let hour = now.getHours();
    try {
      time = formatClockTime(now, true, clock.zone);
      date = now.toLocaleDateString(undefined, { timeZone: clock.zone, weekday: "short", month: "short", day: "numeric" });
      hour = Number(new Intl.DateTimeFormat(undefined, { timeZone: clock.zone, hour: "2-digit", hour12: false }).format(now));
    } catch {
      date = "Invalid time zone";
    }
    const period = hour >= 6 && hour < 18 ? "Daylight" : "Night";
    card.classList.add(period === "Daylight" ? "is-day" : "is-night");
    card.innerHTML = `
      <div class="world-clock-orb" aria-hidden="true"><span></span></div>
      <div class="world-clock-copy">
        <span>${escapeHtml(clock.label || clock.zone)}</span>
        <strong>${escapeHtml(time)}</strong>
        <small>${escapeHtml([clock.country, date].filter(Boolean).join(" - "))}</small>
        <em>${escapeHtml(clock.zone || "")}</em>
      </div>
      <div class="world-clock-actions">
        <b>${period}</b>
        <button class="icon-btn" type="button" aria-label="Remove ${escapeHtml(clock.label || "world clock")}">x</button>
      </div>`;
    card.querySelector("button").addEventListener("click", () => {
      state.worldClocks.splice(index, 1);
      forceSaveState();
      renderWorldClocks();
    });
    wrap.append(card);
  });
}

function populateWorldClockZones() {
  const list = document.querySelector("#worldClockZones");
  if (list && !list.children.length) {
    const fallback = ["America/New_York", "America/Chicago", "America/Los_Angeles", "Europe/London", "Asia/Dhaka", "Asia/Riyadh", "Asia/Dubai", "Asia/Tokyo"];
    const zones = typeof Intl.supportedValuesOf === "function" ? Intl.supportedValuesOf("timeZone") : fallback;
    zones.forEach((zone) => {
      const option = document.createElement("option");
      option.value = zone;
      option.label = zone.replaceAll("_", " ").replace("/", " / ");
      list.append(option);
    });
  }
  const cityList = document.querySelector("#worldClockCitySuggestions");
  if (cityList && !cityList.children.length) {
    worldClockZoneSuggestions().slice(0, 600).forEach((item) => {
      const option = document.createElement("option");
      option.value = item.label;
      option.label = `${item.country ? `${item.country} - ` : ""}${item.zone}`;
      cityList.append(option);
    });
  }
  const countryList = document.querySelector("#worldClockCountries");
  if (!countryList || countryList.children.length) return;
  const codes = "AD AE AF AG AI AL AM AO AR AS AT AU AW AX AZ BA BB BD BE BF BG BH BI BJ BL BM BN BO BQ BR BS BT BV BW BY BZ CA CC CD CF CG CH CI CK CL CM CN CO CR CU CV CW CX CY CZ DE DJ DK DM DO DZ EC EE EG EH ER ES ET FI FJ FK FM FO FR GA GB GD GE GF GG GH GI GL GM GN GP GQ GR GS GT GU GW GY HK HM HN HR HT HU ID IE IL IM IN IO IQ IR IS IT JE JM JO JP KE KG KH KI KM KN KP KR KW KY KZ LA LB LC LI LK LR LS LT LU LV LY MA MC MD ME MF MG MH MK ML MM MN MO MP MQ MR MS MT MU MV MW MX MY MZ NA NC NE NF NG NI NL NO NP NR NU NZ OM PA PE PF PG PH PK PL PM PN PR PS PT PW PY QA RE RO RS RU RW SA SB SC SD SE SG SH SI SJ SK SL SM SN SO SR SS ST SV SX SY SZ TC TD TF TG TH TJ TK TL TM TN TO TR TT TV TW TZ UA UG UM US UY UZ VA VC VE VG VI VN VU WF WS YE YT ZA ZM ZW".split(" ");
  const displayNames = typeof Intl.DisplayNames === "function" ? new Intl.DisplayNames(undefined, { type: "region" }) : null;
  codes.map((code) => ({ code, name: displayNames?.of(code) || code }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach(({ code, name }) => {
      const option = document.createElement("option");
      option.value = name;
      option.label = code;
      countryList.append(option);
    });
}

function updateClockFormatButtons() {
  const is24 = state.clockHourFormat === "24";
  document.querySelector("#use12HourClock")?.classList.toggle("primary-btn", !is24);
  document.querySelector("#use12HourClock")?.classList.toggle("ghost-btn", is24);
  document.querySelector("#use24HourClock")?.classList.toggle("primary-btn", is24);
  document.querySelector("#use24HourClock")?.classList.toggle("ghost-btn", !is24);
}

function initializeFloatingWidgetDrag() {
  document.querySelectorAll(".home-alert-float").forEach((widget) => {
    if (widget.dataset.dragReady === "true") return;
    widget.dataset.dragReady = "true";
    let drag = null;
    widget.addEventListener("pointerdown", (event) => {
      if (event.target.closest("button, a, input")) return;
      const rect = widget.getBoundingClientRect();
      drag = { x: event.clientX - rect.left, y: event.clientY - rect.top };
      widget.setPointerCapture?.(event.pointerId);
    });
    widget.addEventListener("pointermove", (event) => {
      if (!drag) return;
      const left = Math.max(6, Math.min(window.innerWidth - widget.offsetWidth - 6, event.clientX - drag.x));
      const top = Math.max(76, Math.min(window.innerHeight - widget.offsetHeight - 84, event.clientY - drag.y));
      widget.style.left = `${left}px`;
      widget.style.top = `${top}px`;
      widget.style.right = "auto";
    });
    widget.addEventListener("pointerup", () => {
      drag = null;
    });
    widget.addEventListener("pointercancel", () => {
      drag = null;
    });
  });
}

function openDetailModal(mode, signal = "") {
  const modal = document.querySelector("#detailModal");
  const analog = document.querySelector("#analogClockView");
  const detail = document.querySelector("#signalDetailView");
  if (!modal || !analog || !detail) return;
  modal.hidden = false;
  analog.hidden = mode !== "clock";
  detail.hidden = mode !== "signal";
  if (mode === "clock") updateAnalogClock();
  if (mode === "signal") renderSignalDetail(signal);
}

function closeDetailModal() {
  const modal = document.querySelector("#detailModal");
  if (modal) modal.hidden = true;
}

const signalConfig = {
  weather: {
    eyebrow: "Weather Pulse",
    title: "Live Conditions",
    items: () => state.liveWeather?.items || fallbackWeatherItems.map((text) => ({ text, source: "Built-in weather brief", page: "" })),
    refresh: refreshLiveWeather,
    more: "https://weather.com/weather/today/"
  },
  news: {
    eyebrow: "News Signal",
    title: "World, US + Sports",
    items: () => state.liveNews?.items || fallbackNewsItems.map((text) => ({ text, source: "Built-in news brief", page: "" })),
    refresh: refreshLiveNews,
    more: "https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en"
  },
  stocks: {
    eyebrow: "Market Signal",
    title: "Market Pulse",
    items: () => state.liveStocks?.items || fallbackStockItems.map((text) => ({ text, source: "Built-in market brief", page: "" })),
    refresh: refreshLiveStocks,
    more: "https://finance.yahoo.com/markets/stocks/"
  }
};

function renderSignalDetail(signal) {
  const config = signalConfig[signal];
  if (!config) return;
  document.querySelector("#detailEyebrow").textContent = config.eyebrow;
  document.querySelector("#detailTitle").textContent = config.title;
  fillStatus("#detailItems", [
    ...config.items(),
    { text: `Last updated: ${new Date().toLocaleString()}`, source: "Planner", page: "" }
  ]);
  const refresh = document.querySelector("#detailRefresh");
  const more = document.querySelector("#detailMore");
  refresh.onclick = async () => {
    await config.refresh();
    renderSignalDetail(signal);
  };
  more.onclick = () => openExternal(config.more);
}

function renderLifeRoadmap() {
  const wrap = document.querySelector("#lifeRoadmapList");
  if (!wrap) return;
  wrap.innerHTML = "";
  state.lifeRoadmap = Array.isArray(state.lifeRoadmap) && state.lifeRoadmap.length
    ? state.lifeRoadmap
    : lifeRoadmap.map((item) => ({ ...item, actions: [...item.actions] }));
  state.lifeRoadmap.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "life-roadmap-card";
    const number = document.createElement("span");
    number.textContent = String(index + 1).padStart(2, "0");
    const body = document.createElement("div");
    const actions = document.createElement("textarea");
    actions.rows = 5;
    actions.value = (item.actions || []).join("\n");
    actions.addEventListener("input", () => {
      item.actions = actions.value.split("\n").map((line) => line.trim()).filter(Boolean);
      saveState();
    });
    const del = document.createElement("button");
    del.className = "danger-btn compact-action";
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      state.lifeRoadmap.splice(index, 1);
      saveState();
      renderLifeRoadmap();
    });
    body.append(
      input(item.phase, (value) => item.phase = value, { placeholder: "Phase" }),
      input(item.focus, (value) => item.focus = value, { placeholder: "Focus" }),
      actions,
      del
    );
    card.append(number, body);
    wrap.append(card);
  });
}

function openLifeRoadmap() {
  renderLifeRoadmap();
  document.querySelector("#lifeRoadmapModal").hidden = false;
}

function closeLifeRoadmap() {
  document.querySelector("#lifeRoadmapModal").hidden = true;
}

function renderHomeSummary() {
  const openTasks = state.tasks.filter((task) => (task.status || "Backlog") !== "Done").slice(0, 4);
  const assignments = state.assignments
    .filter((item) => (item.status || "Not started") !== "Submitted" && (item.status || "Not started") !== "Graded")
    .slice(0, 4);
  const importantDates = (state.importantDates || [])
    .filter((item) => (item.status || "Upcoming") !== "Done")
    .sort((a, b) => new Date(a.when || "2999-12-31") - new Date(b.when || "2999-12-31"))
    .slice(0, 3);
  const normalizedClasses = state.classes.map(normalizeClassItem);
  const todaysClasses = normalizedClasses.filter(classOccursOnActiveDate);
  const classItems = (todaysClasses.length ? todaysClasses : normalizedClasses).slice(0, 3);
  const upcomingBills = getRollingBillEvents(activeDate, 10);
  const paidBills = state.bills.filter((bill) => bill.paid).slice(0, 3);
  const reminders = state.reminders.filter((reminder) => (reminder.status || "Open") !== "Done").slice(0, 3);
  const latestSleep = state.health?.sleepSessions?.[0];
  const latestSleepMs = latestSleep ? new Date(latestSleep.end) - new Date(latestSleep.start) : 0;

  renderTodayAtGlance({ openTasks, reminders, importantDates, upcomingBills });
  renderHomeGlanceGrid([
    { icon: "CAL", label: "Schedules", value: homeScheduleItems().length, meta: "saved today", page: "daily" },
    { icon: "TSK", label: "Tasks", value: openTasks.length, meta: "open", page: "tasks" },
    { icon: "REM", label: "Reminder", value: reminders.length, meta: "open", page: "reminders" },
    { icon: "DATE", label: "Important Dates", value: importantDates.length, meta: "upcoming", page: "schoolDates" },
    { icon: "$", label: "Upcoming Bills", value: upcomingBills.filter((item) => !item.paid).length, meta: "next 10 days", page: "bills" },
    { icon: "SLP", label: "Sleep", value: latestSleep ? formatDetailedDuration(latestSleepMs) : "--", meta: latestSleep ? sleepRating(latestSleepMs) : "No saved sleep", page: "health" }
  ]);
  renderHomeScheduleSummary();
  renderHomeSchoolMatrix({ classes: classItems, assignments });
  renderHomeMoneyMatrix(upcomingBills, paidBills);
  renderHomeImportantDates(importantDates);
  renderHomeCommandBrief();
  renderHomeUpcomingDates();
  renderHomeNotesFeed();
  renderHomeSleepSummary();
  renderHomeFitnessSummary();
  renderHiddenHomeWidgets();
  renderLiveCards();
  updateHomeCardSettings();
}

function renderGlanceList(selector, items, emptyTitle, emptyText) {
  const wrap = document.querySelector(selector);
  if (!wrap) return;
  wrap.innerHTML = "";
  if (!items.length) {
    wrap.innerHTML = `<div class="glance-empty"><span>+</span><div><strong>${escapeHtml(emptyTitle)}</strong><small>${escapeHtml(emptyText)}</small></div></div>`;
    return;
  }
  items.slice(0, 4).forEach((item) => {
    const row = document.createElement("div");
    row.className = `glance-data-row${item.done ? " is-done" : ""}${item.urgent ? " is-urgent" : ""}`;
    row.innerHTML = `<span>${escapeHtml(item.icon || "•")}</span><div><strong>${escapeHtml(item.title)}</strong><small>${escapeHtml(item.meta || "")}</small></div>${item.badge ? `<b>${escapeHtml(item.badge)}</b>` : ""}`;
    wrap.append(row);
  });
}

function renderTodayAtGlance({ openTasks = [], reminders = [], importantDates = [], upcomingBills = [] } = {}) {
  const daily = day();
  const dateLabel = document.querySelector("#todayGlanceDate");
  if (dateLabel) dateLabel.textContent = new Date(`${activeDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "long", month: "short", day: "numeric" });
  renderGlanceList(
    "#dailyChecklistGlance",
    (daily.checklist || []).map((item) => ({ icon: item.done ? "✓" : "○", title: item.text || "Checklist item", meta: item.done ? "Completed" : "Not completed", done: item.done })),
    "No checklist items yet",
    "Open Schedule to add your first daily action."
  );
  renderGlanceList(
    "#homeScheduleGlance",
    homeScheduleItems().map(([time, item]) => ({ icon: formatTime(time).slice(0, 5), title: item.task || item.title || "Scheduled block", meta: item.status || "Open", done: item.status === "Done" })),
    "No schedule saved",
    "Plan a time block in your Schedule."
  );
  renderGlanceList(
    "#homeTasksGlance",
    openTasks.map((item) => ({ icon: item.priority?.slice(0, 1) || "T", title: item.title || item.text || "Task", meta: [item.priority || "Medium", item.due ? relativeDateLabel(item.due) : ""].filter(Boolean).join(" · "), urgent: ["Urgent", "High"].includes(item.priority) })),
    "No open tasks",
    "Your task list is clear."
  );
  renderGlanceList(
    "#homeRemindersGlance",
    reminders.map((item) => ({ icon: "R", title: item.title || item.text || "Reminder", meta: item.when ? relativeDateLabel(item.when) : item.note || "Open" })),
    "No reminders",
    "Add a reminder when something needs attention."
  );
  renderGlanceList(
    "#homeDatesGlance",
    importantDates.map((item) => ({ icon: "D", title: item.title || "Important date", meta: [relativeDateLabel(item.when), item.className || item.type].filter(Boolean).join(" · "), urgent: dayDistance(item.when) <= 1 })),
    "No important dates",
    "Add exams, deadlines, and events in School Command."
  );
  renderGlanceList(
    "#homeBillsGlance",
    upcomingBills.filter((item) => !item.paid).map((item) => ({ icon: "$", title: item.name || "Bill", meta: `${money(Number(item.amount || 0))} · ${relativeDateLabel(item.dateKey)}`, urgent: dayDistance(item.dateKey) <= 2 })),
    "No bills due soon",
    "The next 10 days are clear."
  );
  const sessions = (state.health?.sleepSessions || []).slice().sort((a, b) => new Date(b.end || 0) - new Date(a.end || 0));
  const latestSleep = sessions[0];
  const sleepMs = latestSleep ? new Date(latestSleep.end) - new Date(latestSleep.start) : 0;
  renderGlanceList(
    "#homeSleepGlance",
    latestSleep ? [{ icon: "Zz", title: formatDetailedDuration(sleepMs), meta: `${sleepRating(sleepMs)} · Goal 7–8 hours`, urgent: sleepMs < 7 * 3600000 }] : [],
    "No sleep logged",
    "Start and stop the Sleep Tracker to build recovery history."
  );
  renderPrayerGlance();
}

function relativeDateLabel(value) {
  const distance = dayDistance(value);
  if (distance === null) return "Date not set";
  if (distance < 0) return `${Math.abs(distance)} day${Math.abs(distance) === 1 ? "" : "s"} overdue`;
  if (distance === 0) return "Today";
  if (distance === 1) return "Tomorrow";
  return `In ${distance} days`;
}

function homeCommandBriefItems() {
  const dateKey = activeDate || todayKey();
  const important = (state.importantDates || [])
    .filter((item) => (item.status || "Upcoming") !== "Done" && String(item.when || "").slice(0, 10) === dateKey)
    .sort((a, b) => String(a.when || "").localeCompare(String(b.when || "")))[0];
  const prayer = nextPrayerSnapshot();
  const bill = getRollingBillEvents(dateKey, 45).find((item) => !item.paid);
  const workout = workoutPlanForDate(dateKey);
  const priorityOrder = { urgent: 0, high: 1, medium: 2, low: 3 };
  const task = (state.tasks || [])
    .filter((item) => (item.status || "Backlog") !== "Done")
    .sort((a, b) => (priorityOrder[duplicateText(a.priority)] ?? 4) - (priorityOrder[duplicateText(b.priority)] ?? 4) || String(a.due || "9999").localeCompare(String(b.due || "9999")))[0];
  const assignment = (state.assignments || [])
    .filter((item) => !["submitted", "graded", "done"].includes(duplicateText(item.status)))
    .sort((a, b) => String(a.due || "9999").localeCompare(String(b.due || "9999")))[0];
  return [
    { icon: "DATE", label: "Important date", value: important?.title || "Nothing due today", meta: important ? important.note || important.type || "Calendar" : "Calendar clear", tone: important ? "danger" : "success", page: "schoolDates" },
    { icon: "MAS", label: "Next prayer", value: prayer?.name || "Prayer times not loaded", meta: prayer ? `${prayer.time} · ${prayer.minutes} min` : "Open Faith Hub", tone: "faith", page: "faith" },
    { icon: "$", label: "Next bill", value: bill?.name || "No unpaid bill found", meta: bill ? `${money(Number(bill.amount || 0))} · ${relativeDateLabel(bill.dateKey)}` : "Money Hub is clear", tone: bill && dayDistance(bill.dateKey) <= 2 ? "warning" : "money", page: "bills" },
    { icon: "FIT", label: "Today’s workout", value: workout?.title || "Recovery / open training", meta: workout?.subtitle || "Review Workout Coach", tone: "workout", page: "workout" },
    { icon: "TSK", label: "Priority task", value: task?.title || task?.text || "No open priority task", meta: task ? `${task.priority || "Medium"}${task.due ? ` · ${relativeDateLabel(task.due)}` : ""}` : "Add one focused task", tone: task && ["urgent", "high"].includes(duplicateText(task.priority)) ? "danger" : "task", page: "tasks" },
    { icon: "SCH", label: "Upcoming assignment", value: assignment?.title || "No open assignment", meta: assignment ? `${assignment.className || "School"}${assignment.due ? ` · ${relativeDateLabel(assignment.due)}` : ""}` : "School Command is clear", tone: assignment && dayDistance(assignment.due) <= 2 ? "warning" : "school", page: "schoolAssignments" }
  ];
}

function renderHomeCommandBrief() {
  const wrap = document.querySelector("#homeCommandBriefGrid");
  if (!wrap) return;
  wrap.innerHTML = "";
  homeCommandBriefItems().forEach((item) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `command-brief-row tone-${item.tone || "default"}`;
    button.innerHTML = `<span>${escapeHtml(item.icon)}</span><div><small>${escapeHtml(item.label)}</small><strong>${escapeHtml(item.value)}</strong><em>${escapeHtml(item.meta)}</em></div><b aria-hidden="true">&rarr;</b>`;
    button.addEventListener("click", () => openPanel(item.page, pageTitle(item.page)));
    wrap.append(button);
  });
}

function renderHomeUpcomingDates() {
  const wrap = document.querySelector("#homeUpcomingDates");
  if (!wrap) return;
  const items = (state.importantDates || [])
    .filter((item) => (item.status || "Upcoming") !== "Done" && (!item.when || String(item.when).slice(0, 10) >= todayKey()))
    .sort((a, b) => String(a.when || "9999").localeCompare(String(b.when || "9999")))
    .slice(0, 3);
  wrap.innerHTML = "";
  if (!items.length) {
    wrap.innerHTML = `<button class="home-upcoming-empty" type="button"><span>+</span><div><strong>No upcoming dates</strong><small>Add an exam, deadline, or event in School Command.</small></div></button>`;
    wrap.querySelector("button").addEventListener("click", () => openPanel("schoolDates", pageTitle("schoolDates")));
    return;
  }
  items.forEach((item) => {
    const button = document.createElement("button");
    const distance = dayDistance(item.when);
    button.type = "button";
    button.className = `home-upcoming-item${distance <= 1 ? " is-urgent" : distance <= 7 ? " is-soon" : ""}`;
    button.innerHTML = `<span>${new Date(item.when).toLocaleDateString(undefined, { month: "short", day: "numeric" })}</span><div><strong>${escapeHtml(item.title || "Important date")}</strong><small>${escapeHtml(item.className || item.type || "Event")}</small></div><b>${escapeHtml(relativeDateLabel(item.when))}</b>`;
    button.addEventListener("click", () => openPanel("schoolDates", pageTitle("schoolDates")));
    wrap.append(button);
  });
}

function homeScheduleItems() {
  return Object.entries(day().schedule || {})
    .filter(([, item]) => String(item?.task || item?.title || "").trim())
    .sort(([a], [b]) => a.localeCompare(b));
}

function renderHomeScheduleSummary() {
  const wrap = document.querySelector("#homeScheduleSummary");
  if (!wrap) return;
  wrap.innerHTML = "";
  const items = homeScheduleItems();
  homeMatrixHeader(wrap, "Today's timeline", items.length, "saved schedule blocks", items.length ? Math.min(100, items.filter(([, item]) => item.status === "Done").length / items.length * 100) : 0);
  const grid = document.createElement("div");
  grid.className = "home-matrix-grid schedule-tile-grid";
  (items.length ? items : [["", { task: "No schedule saved yet", status: "Open", empty: true }]]).slice(0, 6).forEach(([time, item]) => {
    grid.append(homeMatrixTile({
      icon: time || "+",
      kicker: item.empty ? "Schedule" : formatTime(time),
      title: item.task || item.title || "Scheduled block",
      meta: item.empty ? "Open Schedule and save your first block" : `${item.status || "Open"} on ${new Date(`${activeDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "long" })}`,
      stateName: item.empty ? "Empty" : item.status || "Open",
      tone: item.status === "Done" ? "green" : "blue",
      page: "daily"
    }));
  });
  wrap.append(grid);
}

function renderHomeGlanceGrid(items) {
  const wrap = document.querySelector("#homeOverview");
  if (!wrap) return;
  wrap.innerHTML = "";
  items.forEach((item) => {
    const card = document.createElement("button");
    card.type = "button";
    card.className = "home-glance-item";
    card.innerHTML = `<span>${escapeHtml(item.icon)}</span><div><small>${escapeHtml(item.label)}</small><strong>${escapeHtml(String(item.value))}</strong><em>${escapeHtml(item.meta)}</em></div>`;
    card.addEventListener("click", () => openPanel(item.page, pageTitle(item.page)));
    wrap.append(card);
  });
}

function dayDistance(value) {
  const target = new Date(value);
  if (Number.isNaN(target.getTime())) return null;
  return Math.ceil((target.getTime() - Date.now()) / 86400000);
}

function renderHomeImportantDates(items = []) {
  const grid = document.querySelector("#homeImportantDates");
  if (grid) {
    grid.innerHTML = "";
    (items.length ? items : [{ title: "No important dates scheduled", type: "Clear calendar", when: "" }]).forEach((item) => {
      const cell = document.createElement("div");
      const distance = item.when ? dayDistance(item.when) : null;
      cell.innerHTML = `<small>${escapeHtml(item.type || "Important")}</small><strong>${escapeHtml(item.title || "Important date")}</strong><span>${distance === null ? "Add a date in School Command" : distance <= 0 ? "Today" : `${distance} day${distance === 1 ? "" : "s"} away`}</span>`;
      grid.append(cell);
    });
  }
  const popup = document.querySelector("#homeImportantDatePopup");
  if (popup) popup.hidden = true;
}

function renderHomeBillsCountdown(items = []) {
  const next = items.find((item) => !item.paid);
  const popup = document.querySelector("#homeBillsCountdown");
  if (!popup) return;
  const key = next ? `${next.name}|${next.dateKey}` : "";
  popup.hidden = !next || state.dismissedBillsDate === key;
  if (!next) return;
  const distance = dayDistance(next.date);
  document.querySelector("#homeBillsCountdownTitle").textContent = `${next.name} - ${money(Number(next.amount || 0))}`;
  document.querySelector("#homeBillsCountdownMessage").textContent = `Due ${next.dateLabel}. Open Money Hub to review or mark it paid.`;
  document.querySelector("#homeBillsCountdownTime").textContent = distance <= 0 ? "Due today" : `${distance} day${distance === 1 ? "" : "s"} remaining`;
  popup.dataset.recordKey = key;
}

function trimmedPreview(text, max = 140) {
  const value = String(text || "").trim();
  if (!value) return "";
  return value.length > max ? `${value.slice(0, max)}...` : value;
}

function latestNotes() {
  const d = day();
  const journal = (state.motivations || []).find((entry) => typeof entry === "object" && entry.text?.trim());
  const structuredNotes = [
    ...(Array.isArray(state.notes) ? state.notes : []),
    ...(Array.isArray(state.journalEntries) ? state.journalEntries : [])
  ].map((item) => {
    const title = item.title || item.name || item.label || "Saved Note";
    const text = item.text || item.entry || item.note || item.body || item.content || "";
    const source = item.tags?.length ? `Tags: ${Array.isArray(item.tags) ? item.tags.join(", ") : item.tags}` : "Saved Notes";
    return text ? { text: `${title}: ${trimmedPreview(text)}`, source, page: "life" } : "";
  }).filter(Boolean);
  return [
    ["Daily Notes", d.notes, "Schedule", "daily"],
    ["Prayer Reflection", d.prayerReflection, "Faith / Prayer", "prayer"],
    ["Quran Reflection", d.quran?.reflection, "Faith / Quran", "quran"],
    ["Health Notes", state.health?.notes, "Health", "health"],
    ["School Study", state.schoolStudySpace, "Study", "study"],
    ["Projects", state.projectStudySpace, "Study / Projects", "study"],
    ["Developer Skills", state.developerStudySpace, "Study / Skills", "study"],
    ["Life Quick Notes", state.essentialsNotes, "Life / Quick Notes", "life"],
    ["Faith", state.faithNotes, "Faith", "faith"],
    ["Latest Journal", journal?.text, "Life / Journal", "motivation"]
  ].map(([label, text, source, page]) => {
    const preview = trimmedPreview(text);
    return preview ? { text: `${label}: ${preview}`, source, page } : "";
  }).filter(Boolean).concat(structuredNotes)
    .filter((item, index, array) => array.findIndex((other) => other.text === item.text && other.source === item.source) === index);
}

function renderHomeNotesFeed() {
  fillStatus("#homeNotesFeed", latestNotes().slice(0, 8));
}

function renderLiveCards() {
  fillStatus("#homeWeather", state.liveWeather?.error
    ? [{ text: "Live weather is unavailable. Open Weather Center and press Refresh Weather.", source: "Open-Meteo", page: "weatherCenter" }]
    : state.liveWeather?.items || [{ text: "Loading real-time weather...", source: "Open-Meteo", page: "" }]);
  fillStatus("#homeNews", state.liveNews?.items || [{ text: "Loading latest World + US headlines...", source: "Google News", page: "" }]);
  fillStatus("#homeStocks", state.liveStocks?.items || [{ text: "Loading market snapshot...", source: "Yahoo Finance", page: "" }]);
  if (!liveLoadStarted) {
    liveLoadStarted = true;
    refreshLiveWeather();
    refreshLiveNews();
    refreshLiveStocks();
  }
}

function openExternal(url) {
  window.open(url, "_blank", "noopener,noreferrer");
}

async function fetchTextWithFallback(urls) {
  let lastError;
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const text = await response.text();
      if (text.trim()) return text;
    } catch (error) {
      lastError = error;
    }
  }
  throw lastError || new Error("Feed unavailable");
}

async function fetchNewsRssItems(label, rss, limit = 1) {
  try {
    const text = await fetchTextWithFallback([
      `https://api.allorigins.win/raw?url=${encodeURIComponent(rss)}`,
      rss
    ]);
    const xml = new DOMParser().parseFromString(text, "text/xml");
    const items = [...xml.querySelectorAll("item")].slice(0, limit).map((item) => ({
      text: `${label}: ${item.querySelector("title")?.textContent || "Latest headline"}`,
      source: "Google News",
      page: ""
    }));
    if (items.length) return items;
  } catch {
    // Try the JSON bridge below.
  }
  const json = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`).then((res) => res.json());
  return (json.items || []).slice(0, limit).map((item) => ({
    text: `${label}: ${item.title || "Latest headline"}`,
    source: "RSS news",
    page: ""
  }));
}

function getWeatherPosition() {
  return new Promise((resolve) => {
    if (!navigator.geolocation) {
      resolve({ lat: 40.7282, lon: -73.7949, label: "Queens, NY" });
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;
        const inQueensArea = lat >= 40.49 && lat <= 40.81 && lon >= -73.97 && lon <= -73.69;
        const inNycArea = lat >= 40.45 && lat <= 40.95 && lon >= -74.3 && lon <= -73.65;
        resolve({ lat, lon, label: inQueensArea ? "Queens, NY" : inNycArea ? "New York City" : "Current area" });
      },
      () => resolve({ lat: 40.7282, lon: -73.7949, label: "Queens, NY" }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 600000 }
    );
  });
}

async function refreshLiveWeather() {
  try {
    fillStatus("#homeWeather", ["Refreshing weather..."]);
    const loc = await getWeatherPosition();
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${loc.lat}&longitude=${loc.lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max&temperature_unit=fahrenheit&wind_speed_unit=mph&timezone=auto`;
    const data = await fetch(url).then((res) => res.json());
    const current = data.current || {};
    const daily = data.daily || {};
    state.liveWeather = {
      updated: new Date().toLocaleString(),
      error: false,
      items: [
        { text: `${loc.label}: ${Math.round(current.temperature_2m)} F, feels ${Math.round(current.apparent_temperature)} F`, source: "Open-Meteo", page: "" },
        { text: `Humidity ${current.relative_humidity_2m}% | Wind ${Math.round(current.wind_speed_10m || 0)} mph`, source: "Open-Meteo", page: "" },
        { text: `Today: high ${Math.round(daily.temperature_2m_max?.[0] || 0)} F, low ${Math.round(daily.temperature_2m_min?.[0] || 0)} F, rain chance ${daily.precipitation_probability_max?.[0] || 0}%`, source: "Open-Meteo", page: "" }
      ]
    };
  } catch {
    state.liveWeather = {
      updated: new Date().toLocaleString(),
      error: true,
      items: []
    };
  }
  saveState();
  renderLiveCards();
  renderClockWeather();
}

async function refreshLiveNews() {
  try {
    fillStatus("#homeNews", ["Refreshing US, world, sports, and broadcast headlines..."]);
    const feeds = [
      ["Top", "https://news.google.com/rss?hl=en-US&gl=US&ceid=US:en"],
      ["US", "https://news.google.com/rss/headlines/section/topic/n?hl=en-US&gl=US&ceid=US:en"],
      ["World", "https://news.google.com/rss/headlines/section/topic/w?hl=en-US&gl=US&ceid=US:en"],
      ["Politics", "https://news.google.com/rss/search?q=US%20politics%20White%20House%20Congress%20election%20policy&hl=en-US&gl=US&ceid=US:en"],
      ["Sports", "https://news.google.com/rss/headlines/section/topic/s?hl=en-US&gl=US&ceid=US:en"],
      ["NBA", "https://news.google.com/rss/search?q=NBA%20basketball%20scores%20trades%20injuries&hl=en-US&gl=US&ceid=US:en"],
      ["NFL", "https://news.google.com/rss/search?q=NFL%20football%20scores%20injuries%20trades&hl=en-US&gl=US&ceid=US:en"],
      ["MLB", "https://news.google.com/rss/search?q=MLB%20baseball%20scores%20Yankees%20Mets&hl=en-US&gl=US&ceid=US:en"],
      ["Soccer", "https://news.google.com/rss/search?q=soccer%20MLS%20Premier%20League%20Champions%20League&hl=en-US&gl=US&ceid=US:en"],
      ["World Cup", "https://news.google.com/rss/search?q=FIFA%20World%20Cup%20soccer%20qualifiers%20stadium%20city&hl=en-US&gl=US&ceid=US:en"],
      ["Club Soccer", "https://news.google.com/rss/search?q=football%20club%20news%20transfers%20Real%20Madrid%20Barcelona%20Manchester%20Liverpool%20PSG&hl=en-US&gl=US&ceid=US:en"],
      ["Combat", "https://news.google.com/rss/search?q=UFC%20boxing%20MMA%20fight%20news&hl=en-US&gl=US&ceid=US:en"],
      ["UFC Next", "https://news.google.com/rss/search?q=next%20UFC%20fight%20card%20venue%20city%20stadium&hl=en-US&gl=US&ceid=US:en"],
      ["Boxing", "https://news.google.com/rss/search?q=boxing%20next%20fight%20card%20venue%20city&hl=en-US&gl=US&ceid=US:en"],
      ["Tennis", "https://news.google.com/rss/search?q=tennis%20Grand%20Slam%20ATP%20WTA%20news&hl=en-US&gl=US&ceid=US:en"],
      ["Golf", "https://news.google.com/rss/search?q=golf%20PGA%20major%20leaderboard%20news&hl=en-US&gl=US&ceid=US:en"],
      ["Cricket", "https://news.google.com/rss/search?q=cricket%20world%20cup%20ICC%20news&hl=en-US&gl=US&ceid=US:en"],
      ["F1", "https://news.google.com/rss/search?q=Formula%201%20F1%20racing%20news&hl=en-US&gl=US&ceid=US:en"],
      ["Traffic", "https://news.google.com/rss/search?q=Queens%20NYC%20traffic%20MTA%20subway%20road%20closures%20commute&hl=en-US&gl=US&ceid=US:en"],
      ["Local Alert", "https://news.google.com/rss/search?q=Queens%20New%20York%20public%20safety%20police%20crime%20alerts&hl=en-US&gl=US&ceid=US:en"],
      ["CNN", "http://rss.cnn.com/rss/cnn_topstories.rss"],
      ["Fox News", "https://moxie.foxnews.com/google-publisher/latest.xml"],
      ["NBC News", "https://feeds.nbcnews.com/nbcnews/public/news"],
      ["BBC", "https://feeds.bbci.co.uk/news/world/rss.xml"],
      ["NPR", "https://feeds.npr.org/1001/rss.xml"],
      ["CBS News", "https://www.cbsnews.com/latest/rss/main"],
      ["ABC News", "https://abcnews.go.com/abcnews/topstories"],
      ["AP", "https://feeds.apnews.com/apf-topnews"]
    ];
    const feedResults = await Promise.allSettled(feeds.map(([label, rss]) => fetchNewsRssItems(label, rss, ["Top", "US", "World", "Sports"].includes(label) ? 2 : 1)));
    const allItems = feedResults.flatMap((result) => result.status === "fulfilled" ? result.value : []);
    const sportsLabels = new Set(["Sports", "NBA", "NFL", "MLB", "Soccer", "World Cup", "Club Soccer", "Combat", "UFC Next", "Boxing", "Tennis", "Golf", "Cricket", "F1"]);
    const sports = allItems.filter((item) => sportsLabels.has(String(item.text || "").split(":")[0])).slice(0, 20);
    const items = allItems.slice(0, 18);
    state.liveNews = {
      updated: new Date().toLocaleString(),
      items: items.length ? items : [{ text: "Open More Updates for latest headlines.", source: "Google News", page: "" }],
      sports: sports.length ? sports : fallbackSportsNewsItems.map((text) => ({ text, source: "Built-in sports brief", page: "" }))
    };
  } catch {
    state.liveNews = {
      items: fallbackNewsItems.map((text) => ({ text, source: "Built-in news brief", page: "" })),
      sports: fallbackSportsNewsItems.map((text) => ({ text, source: "Built-in sports brief", page: "" }))
    };
  }
  saveState();
  renderLiveCards();
  renderHeroSystemPulse();
  renderNewsCenter();
}

async function fetchStock(symbol) {
  const url = `https://query1.finance.yahoo.com/v8/finance/chart/${symbol}?range=ytd&interval=1d`;
  const result = await fetch(url).then((res) => res.json());
  const chart = result.chart.result[0];
  if (!chart) throw new Error("Missing chart");
  const meta = chart.meta;
  const closes = (chart.indicators.quote[0].close || []).filter((value) => typeof value === "number");
  const last = meta.regularMarketPrice || closes[closes.length - 1];
  const previous = meta.chartPreviousClose || closes[closes.length - 2] || last;
  const first = closes[0] || previous;
  if (!Number.isFinite(last)) throw new Error("Missing price");
  const dayChange = previous ? ((last - previous) / previous) * 100 : 0;
  const ytdChange = first ? ((last - first) / first) * 100 : 0;
  return `${symbol}: $${last.toFixed(2)} | today ${dayChange >= 0 ? "+" : ""}${dayChange.toFixed(2)}% | YTD ${ytdChange >= 0 ? "+" : ""}${ytdChange.toFixed(2)}%`;
}

async function fetchStockFromStooq(symbol) {
  const stooqSymbol = `${symbol.toLowerCase()}.us`;
  const year = new Date().getFullYear();
  const today = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  const quoteCsv = await fetchTextWithFallback([
    `https://stooq.com/q/l/?s=${stooqSymbol}&f=sd2t2ohlcv&h&e=csv`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://stooq.com/q/l/?s=${stooqSymbol}&f=sd2t2ohlcv&h&e=csv`)}`
  ]);
  const quoteRows = quoteCsv.trim().split(/\r?\n/);
  const quote = quoteRows[1]?.split(",") || [];
  const close = Number(quote[6]);
  if (!Number.isFinite(close)) throw new Error("Missing Stooq price");
  const histCsv = await fetchTextWithFallback([
    `https://stooq.com/q/d/l/?s=${stooqSymbol}&d1=${year}0101&d2=${today}&i=d`,
    `https://api.allorigins.win/raw?url=${encodeURIComponent(`https://stooq.com/q/d/l/?s=${stooqSymbol}&d1=${year}0101&d2=${today}&i=d`)}`
  ]);
  const rows = histCsv.trim().split(/\r?\n/).slice(1).map((line) => line.split(","));
  const first = Number(rows[0]?.[4]) || close;
  const previous = Number(rows[rows.length - 2]?.[4]) || close;
  const dayChange = previous ? ((close - previous) / previous) * 100 : 0;
  const ytdChange = first ? ((close - first) / first) * 100 : 0;
  return `${symbol}: $${close.toFixed(2)} | today ${dayChange >= 0 ? "+" : ""}${dayChange.toFixed(2)}% | YTD ${ytdChange >= 0 ? "+" : ""}${ytdChange.toFixed(2)}%`;
}

async function fetchStockLive(symbol) {
  try {
    return await fetchStock(symbol);
  } catch {
    return fetchStockFromStooq(symbol);
  }
}

async function refreshLiveStocks() {
  try {
    fillStatus("#homeStocks", ["Refreshing stocks..."]);
    const symbols = ["SPY", "QQQ", "AAPL", "MSFT", "TSLA"];
    const rows = await Promise.all(symbols.map(fetchStockLive));
    state.liveStocks = { updated: new Date().toLocaleString(), items: rows.map((text) => ({ text, source: "Yahoo Finance / Stooq", page: "" })) };
  } catch {
    state.liveStocks = {
      items: fallbackStockItems.map((text) => ({ text, source: "Built-in market brief", page: "" }))
    };
  }
  saveState();
  renderLiveCards();
  renderStockExchange();
}

function formatDuration(ms) {
  if (!ms || ms < 0) return "0h 0m";
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  return `${hours}h ${minutes}m`;
}

function formatDetailedDuration(ms) {
  if (!ms || ms < 0) return "0h 0m 0s";
  const hours = Math.floor(ms / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${hours}h ${minutes}m ${seconds}s`;
}

function sleepDurationMs(startTime, endTime) {
  if (!startTime || !endTime) return 0;
  const [startHour, startMinute] = startTime.split(":").map(Number);
  const [endHour, endMinute] = endTime.split(":").map(Number);
  if ([startHour, startMinute, endHour, endMinute].some(Number.isNaN)) return 0;
  const start = new Date();
  start.setHours(startHour, startMinute, 0, 0);
  const end = new Date(start);
  end.setHours(endHour, endMinute, 0, 0);
  if (end <= start) end.setDate(end.getDate() + 1);
  return end - start;
}

function sleepRating(ms) {
  if (!ms) return "No sleep recorded";
  const hours = ms / 3600000;
  if (hours < 4) return "Worst - severe sleep shortage";
  if (hours < 7) return "Bad - below the 7-hour minimum";
  if (hours < 8) return "Good - reached 7 hours";
  if (hours <= 9) return "Best - strong 8-hour recovery";
  if (hours <= 10) return "Good - long recovery sleep";
  return "Not good - more than 10 hours";
}

function workoutDuration(item) {
  if (Number(item?.manualDurationMinutes) > 0) return formatDuration(Number(item.manualDurationMinutes) * 60000);
  if (!item?.startedAt || !item?.endedAt) return "";
  const ms = new Date(item.endedAt) - new Date(item.startedAt);
  return ms > 0 ? formatDuration(ms) : "";
}

function workoutTimeRange(item) {
  if (!item?.startedAt) return "Not started yet";
  const start = new Date(item.startedAt).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  if (!item.endedAt) return `Started at ${start}`;
  const end = new Date(item.endedAt).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  return `${start} - ${end}`;
}

function workoutClockParts(item) {
  const start = item?.startedAt ? new Date(item.startedAt) : null;
  const end = item?.endedAt ? new Date(item.endedAt) : null;
  return {
    date: item?.date || (start && !Number.isNaN(start.getTime()) ? localDateKey(start) : todayKey()),
    startTime: start && !Number.isNaN(start.getTime()) ? start.toTimeString().slice(0, 5) : "",
    endTime: end && !Number.isNaN(end.getTime()) ? end.toTimeString().slice(0, 5) : ""
  };
}

function manualWorkoutTiming(date, startTime, endTime, overrideMinutes = "") {
  const override = Number(overrideMinutes || 0);
  if (!date) return { error: "Choose a workout date." };
  if (!startTime || !endTime) {
    if (override > 0) return { durationMinutes: override, startedAt: "", endedAt: "" };
    return { error: "Enter both start and end times, or provide a duration override." };
  }
  const start = new Date(`${date}T${startTime}:00`);
  let end = new Date(`${date}T${endTime}:00`);
  if (end <= start) end.setDate(end.getDate() + 1);
  const calculated = Math.round((end - start) / 60000);
  if (calculated <= 0 || calculated > 12 * 60) return { error: "The time range is invalid or longer than 12 hours." };
  return {
    durationMinutes: override > 0 ? override : calculated,
    startedAt: start.toISOString(),
    endedAt: end.toISOString(),
    overnight: localDateKey(start) !== localDateKey(end)
  };
}

function renderHomeSleepSummary() {
  const sessions = state.health?.sleepSessions || [];
  const latest = sessions[0];
  const wrap = document.querySelector("#homeSleepSummary");
  if (!wrap) return;
  if (!latest) {
    wrap.innerHTML = `<div class="sleep-summary-empty"><strong>No sleep summary yet.</strong><small>Save a sleep session in Health Hub to see recovery data here.</small></div>`;
    return;
  }
  const latestMs = new Date(latest.end) - new Date(latest.start);
  fillStatus("#homeSleepSummary", [
    { text: `${formatDetailedDuration(latestMs)} slept - ${sleepRating(latestMs)}`, source: "Health / Sleep", page: "health" }
  ]);
}

function renderHomeFitnessSummary() {
  const elapsed = disciplineElapsedMs();
  renderHomeWorkoutStrategy();
  const executive = document.querySelector("#homeDisciplineExecutive");
  const executiveNote = document.querySelector("#homeDisciplineExecutiveNote");
  const executiveBar = document.querySelector("#homeDisciplineExecutiveBar");
  if (executive) executive.textContent = elapsed > 0 ? formatStreak(elapsed) : "No streak started";
  if (executiveNote) executiveNote.textContent = state.discipline?.resting ? "Rest mode is active." : state.discipline?.reason || "Start, rest, or save progress in Discipline.";
  if (executiveBar) {
    const days = elapsed ? Math.min(30, Math.floor(elapsed / 86400000)) : 0;
    executiveBar.style.width = `${Math.max(4, Math.round(days / 30 * 100))}%`;
  }
  fillStatus("#homeDisciplineStreak", [
    elapsed > 0 ? { text: `Current streak: ${formatStreak(elapsed)}${state.discipline?.resting ? " (resting)" : ""}`, source: "Health / Discipline", page: "discipline" } : { text: "No discipline streak started yet.", source: "Health / Discipline", page: "discipline" },
    state.discipline?.reason ? { text: `Reason: ${trimmedPreview(state.discipline.reason, 110)}`, source: "Health / Discipline", page: "discipline" } : ""
  ].filter(Boolean));
}

function renderHomeWorkoutStrategy() {
  const wrap = document.querySelector("#homeDailyWorkout");
  if (!wrap) return;
  const plan = workoutPlanForDate();
  const logs = workoutLogsForDate();
  const hour = new Date().getHours();
  const currentPart = hour < 10 ? "Morning" : hour < 15 ? "Afternoon" : hour < 19 ? "Evening" : hour < 23 ? "Night" : "Late Night";
  const guidance = [
    ["Morning", "Hydrate, eat protein, and confirm today's training window."],
    ["Afternoon", `Fuel the session and prepare for ${plan.title}.`],
    ["Evening", plan.id === "rest" ? "Take a recovery walk and stretch." : `Complete ${plan.title}, then record sets and reps.`],
    ["Night", "Eat a balanced recovery meal and review the workout log."],
    ["Late Night", "Protect sleep. Train only if it will not damage tomorrow's recovery."]
  ];
  const exercises = (plan.exercises || []).slice(0, 4)
    .map((exercise) => `<span><b>${escapeHtml(exercise[0] || "Exercise")}</b><small>${escapeHtml(exercise[1] || "")}</small></span>`)
    .join("");
  const logSummary = logs.length
    ? logs.slice(0, 3).map((item) => `<span class="workout-home-log"><b>${escapeHtml(item.program || item.text || "Workout")}</b><small>${escapeHtml(workoutDuration(item) || workoutTimeRange(item))}</small></span>`).join("")
    : `<span class="workout-home-empty"><b>No workout logged today.</b><small>Open Workout Coach when you start or finish the session.</small></span>`;
  wrap.innerHTML = `
    <div class="workout-home-command">
      <header><div><small>Scheduled today</small><strong>${escapeHtml(plan.title)}</strong><p>${escapeHtml(plan.subtitle || "Follow the planned session.")}</p></div><span>${escapeHtml(state.workoutProgramDays[plan.id] || plan.defaultDay || "")}</span></header>
      <div class="workout-daypart-grid">${guidance.map(([label, text]) => `<article class="${label === currentPart ? "is-current" : ""}"><small>${label}</small><p>${escapeHtml(text)}</p></article>`).join("")}</div>
      <div class="workout-home-exercises">${exercises}</div>
      <div class="workout-home-logs"><small>Today's log</small>${logSummary}</div>
    </div>
  `;
}

function renderHiddenHomeWidgets() {
  const completedTasks = (state.tasks || []).filter((item) => item.status === "Done").length;
  const completedPrayers = prayers.filter((name) => day().prayers?.[name]?.done).length;
  const recentWorkouts = (state.workouts || []).filter((item) => item.endedAt || item.date).slice(0, 7).length;
  const sleepSessions = state.health?.sleepSessions || [];
  const sleepHours = sleepSessions.length
    ? Math.max(0, (new Date(sleepSessions[0].end) - new Date(sleepSessions[0].start)) / 3600000)
    : 0;
  const readiness = Math.max(0, Math.min(100, Math.round(
    completedPrayers / 5 * 30
    + Math.min(25, completedTasks * 5)
    + Math.min(25, recentWorkouts * 5)
    + Math.min(20, sleepHours / 8 * 20)
  )));
  const readinessWrap = document.querySelector("#homeReadinessWidget");
  if (readinessWrap) readinessWrap.innerHTML = `
    <div class="readiness-orbit" style="--readiness:${readiness}%"><strong>${readiness}%</strong><small>ready</small></div>
    <p>${readiness >= 75 ? "Strong operating position. Protect the next focused block." : readiness >= 45 ? "Stable foundation. Complete one priority to raise momentum." : "Rebuild the basics: prayer, sleep, one task, and a short movement block."}</p>
  `;

  const wins = [
    ...(state.completionLog || []).slice(0, 3).map((item) => item.title || item.text || "Completed action"),
    ...(state.journalEntries || []).filter((item) => /win|grateful|accomplish/i.test(`${item.title} ${item.tags}`)).slice(0, 2).map((item) => item.title)
  ].filter(Boolean).slice(0, 4);
  const winsWrap = document.querySelector("#homeWinsWidget");
  if (winsWrap) winsWrap.innerHTML = wins.length
    ? wins.map((item) => `<span class="hidden-widget-row"><b>&#10003;</b>${escapeHtml(item)}</span>`).join("")
    : `<div class="hidden-widget-empty"><strong>No wins saved yet.</strong><small>Complete a task or record a journal win.</small></div>`;

  const priorityWeight = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
  const nextTask = (state.tasks || [])
    .filter((item) => item.status !== "Done")
    .sort((a, b) => (priorityWeight[b.priority] || 0) - (priorityWeight[a.priority] || 0)
      || String(a.due || "9999").localeCompare(String(b.due || "9999")))[0];
  const nextAssignment = (state.assignments || [])
    .filter((item) => !["Submitted", "Graded"].includes(item.status))
    .sort((a, b) => String(a.due || "9999").localeCompare(String(b.due || "9999")))[0];
  const nextWrap = document.querySelector("#homeNextStepWidget");
  if (nextWrap) {
    const candidate = nextTask
      ? { title: nextTask.title || "Open task", meta: `${nextTask.priority || "Medium"} priority`, page: "tasks" }
      : nextAssignment
        ? { title: nextAssignment.title || "Assignment", meta: nextAssignment.due ? `Due ${new Date(nextAssignment.due).toLocaleString()}` : "Set a due date", page: "schoolAssignments" }
        : { title: "Choose one meaningful action", meta: "Your system is clear", page: "life" };
    nextWrap.innerHTML = `<button class="hidden-next-action hub-link" data-open-tab="${candidate.page}" type="button"><span>&#8594;</span><strong>${escapeHtml(candidate.title)}</strong><small>${escapeHtml(candidate.meta)}</small></button>`;
  }

  const openBills = (state.bills || []).filter((bill) => !bill.paid);
  const debtItems = (state.debts || state.payoffData || []).filter(Boolean);
  const savingsTotal = (state.savingsGoals || []).reduce((total, item) => total + Number(item.current || item.saved || 0), 0);
  const savingsTarget = (state.savingsGoals || []).reduce((total, item) => total + Number(item.target || 0), 0);
  const studyMinutes = (state.studyBlocks || []).reduce((total, item) => total + Number(item.minutes || 0), 0);
  const monthKey = activeDate.slice(0, 7);
  const monthlyCompletions = (state.completionLog || []).filter((item) => String(item.date || item.completedAt || "").startsWith(monthKey));
  const hiddenContent = {
    homeFinancialHealthWidget: `<strong>${openBills.length} unpaid bill${openBills.length === 1 ? "" : "s"}</strong><small>${openBills.length ? "Review due dates and protect cash flow." : "Bills are currently clear."}</small>`,
    homeDebtProgressWidget: `<strong>${debtItems.length ? `${debtItems.length} tracked accounts` : "No debt data saved"}</strong><small>Open Money Hub to review balances and payoff strategy.</small>`,
    homeSavingsGoalWidget: `<strong>${savingsTarget ? `${Math.round(savingsTotal / savingsTarget * 100)}% funded` : "No savings target yet"}</strong><small>${savingsTarget ? `${formatMoney(savingsTotal)} of ${formatMoney(savingsTarget)}` : "Create a goal in Savings Vault."}</small>`,
    homeWeeklyReviewWidget: `<strong>${completedTasks} tasks completed</strong><small>${recentWorkouts} recent workout records and ${completedPrayers}/5 prayers today.</small>`,
    homeFocusFuelWidget: `<strong>${nextTask?.title || "One focused block"}</strong><small>${nextTask ? `${nextTask.priority || "Medium"} priority. Work 25 minutes, then log progress.` : "Pick one meaningful task and protect a clean study sprint."}</small>`,
    homeFaithMomentumWidget: `<strong>${completedPrayers}/5 salah complete</strong><small>${completedPrayers >= 5 ? "Daily prayer sequence complete. Keep dhikr and gratitude alive." : "Return to the next prayer and keep the day anchored."}</small>`,
    homeMonthlyWinsWidget: `<strong>${monthlyCompletions.length} recorded wins</strong><small>Completed work logged during ${new Date(`${activeDate}T12:00:00`).toLocaleDateString(undefined, { month: "long" })}.</small>`,
    homeLearningDashboardWidget: `<strong>${studyMinutes ? `${studyMinutes} study minutes planned` : "No study sprint saved"}</strong><small>Use Study Hub to start the next focused block.</small>`,
    homeLifeStatisticsWidget: `<strong>${state.tasks.length + state.assignments.length + state.journalEntries.length} active records</strong><small>Tasks, assignments, and journal entries in your system.</small>`,
    homeDisciplineScoreWidget: `<strong>${readiness}% operating score</strong><small>Built from prayer, completed work, training, and sleep.</small>`,
    homePrayerConsistencyWidget: `<strong>${completedPrayers}/5 prayers complete</strong><small>Return to the next salah and keep the sequence alive.</small>`,
    homeStudySprintWidget: `<strong>${nextAssignment?.title || "Choose a learning target"}</strong><small>${nextAssignment?.due ? `Due ${new Date(nextAssignment.due).toLocaleDateString()}` : "Open Study Hub to plan a focused sprint."}</small>`
  };
  Object.entries(hiddenContent).forEach(([id, html]) => {
    const element = document.querySelector(`#${id}`);
    if (element) element.innerHTML = html;
  });
}

function workoutPlanForDate(dateKey = activeDate) {
  const weekday = new Date(`${dateKey}T12:00:00`).toLocaleDateString(undefined, { weekday: "long" });
  const routineName = state.workoutWeeklyRoutine?.[weekday];
  if (routineName) {
    const routineMap = {
      Push: "push", Pull: "pull", Legs: "legs", Recovery: "recovery",
      "Upper Body Power": "upper", "Lower + Fat Loss": "lower", Rest: "rest"
    };
    const routinePlan = fixedWorkoutProgram.find((session) => session.id === routineMap[routineName]);
    if (routinePlan) return routinePlan;
  }
  return fixedWorkoutProgram.find((session) => state.workoutProgramDays[session.id] === weekday)
    || fixedWorkoutProgram.find((session) => session.defaultDay === weekday)
    || fixedWorkoutProgram[0];
}

function workoutLogsForDate(dateKey = activeDate) {
  return (state.workouts || []).filter((item) => {
    if (item.date) return item.date === dateKey;
    if (item.startedAt) return new Date(item.startedAt).toISOString().slice(0, 10) === dateKey;
    return false;
  });
}

function workoutTimelineItems(dateKey = activeDate) {
  const items = [];
  workoutLogsForDate(dateKey).forEach((item) => {
    const name = item.program || item.text || "Workout";
    if (item.startedAt) {
      items.push({
        at: new Date(item.startedAt),
        text: `${new Date(item.startedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - Started ${name}`
      });
    }
    if (item.endedAt) {
      items.push({
        at: new Date(item.endedAt),
        text: `${new Date(item.endedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - Finished ${name} (${workoutDuration(item)})`
      });
    }
    if (item.savedAt && !item.endedAt) {
      items.push({
        at: new Date(item.savedAt),
        text: `${new Date(item.savedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })} - Saved ${name} log`
      });
    }
  });
  return items.sort((a, b) => a.at - b.at).map((item) => item.text);
}

function renderDailyWorkoutSummary(selector, compact = false) {
  const plan = workoutPlanForDate();
  const timeline = workoutTimelineItems();
  const firstExercise = plan.exercises[0]?.[0] || "Recovery";
  const secondExercise = plan.exercises[1]?.[0] || "Plan tomorrow";
  const items = [
    { text: `Active day strategy: ${state.workoutProgramDays[plan.id] || plan.defaultDay} - ${plan.title} - ${plan.subtitle}`, source: "Health / Workout Coach", page: "workout" },
    { text: `Training strategy: start with ${firstExercise}${secondExercise ? `, then ${secondExercise}` : ""}.`, source: "Training System", page: "trainingSystem" }
  ];
  if (timeline.length) items.push(...timeline.slice(compact ? -2 : -5).map((text) => ({ text, source: "Today's workout log", page: "workout" })));
  else items.push({ text: "Today's log: no workout activity recorded yet.", source: "Workout Log", page: "workout" });
  fillStatus(selector, items);
}

function daysInMonth(year, monthIndex) {
  return new Date(year, monthIndex + 1, 0).getDate();
}

function billDueDatesForMonth(bill, dateLike = activeDate) {
  const base = new Date(`${dateLike}T12:00:00`);
  const year = base.getFullYear();
  const month = base.getMonth();
  const due = String(bill.due || bill.dueDay || "").trim().toLowerCase();
  const lastDay = daysInMonth(year, month);
  const makeItem = (dayNumber) => {
    const date = new Date(year, month, Math.min(Math.max(dayNumber, 1), lastDay), 12, 0, 0);
    return {
      ...bill,
      date,
      dateKey: date.toISOString().slice(0, 10),
      dateLabel: date.toLocaleDateString(undefined, { month: "short", day: "numeric" })
    };
  };

  if (/^\d+$/.test(due)) return [makeItem(Number(due))];
  if (due.includes("weekly")) return [1, 8, 15, 22, 29].filter((dayNumber) => dayNumber <= lastDay).map(makeItem);
  if (due.includes("biweekly")) return [1, 15, 29].filter((dayNumber) => dayNumber <= lastDay).map(makeItem);
  if (due.includes("monthly")) return [makeItem(1)];
  return [makeItem(1)];
}

function getMonthBillEvents(dateLike = activeDate) {
  return state.bills
    .flatMap((bill) => billDueDatesForMonth(bill, dateLike))
    .sort((a, b) => a.date - b.date || String(a.name).localeCompare(String(b.name)));
}

function getUpcomingBills(dateLike = activeDate, limit = 8) {
  const base = new Date(`${dateLike}T00:00:00`);
  const nextMonth = new Date(`${dateLike}T12:00:00`);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  return [...getMonthBillEvents(dateLike), ...getMonthBillEvents(localDateKey(nextMonth))]
    .filter((item) => item.date >= base)
    .sort((a, b) => a.date - b.date)
    .slice(0, limit);
}

function getRollingBillEvents(dateLike = activeDate, days = 10) {
  const base = new Date(`${dateLike}T00:00:00`);
  const end = new Date(base);
  end.setDate(end.getDate() + Math.max(1, days) - 1);
  const monthKeys = new Set();
  for (const cursor = new Date(base); cursor <= end; cursor.setMonth(cursor.getMonth() + 1, 1)) {
    monthKeys.add(localDateKey(cursor));
  }
  return [...monthKeys]
    .flatMap((key) => getMonthBillEvents(key))
    .filter((item) => item.date >= base && item.date <= end)
    .sort((a, b) => a.date - b.date || String(a.name).localeCompare(String(b.name)));
}

function getPastDueBills(dateLike = activeDate, daysBack = 45) {
  const base = new Date(`${dateLike}T00:00:00`);
  const start = new Date(base);
  start.setDate(start.getDate() - daysBack);
  const monthKeys = new Set([localDateKey(start), dateLike]);
  const middle = new Date(start);
  middle.setMonth(middle.getMonth() + 1);
  monthKeys.add(localDateKey(middle));
  return [...monthKeys]
    .flatMap((key) => getMonthBillEvents(key))
    .filter((item) => !item.paid && item.date < base && item.date >= start)
    .sort((a, b) => b.date - a.date);
}

function billNotificationId(item, kind = "upcoming") {
  return `${kind}|${item.name}|${item.dateKey}`;
}

function buildNotifications() {
  const upcoming = getRollingBillEvents(todayKey(), 10).filter((item) => !item.paid);
  const pastDueByBill = new Map();
  getPastDueBills(todayKey(), 45).forEach((item) => {
    if (!pastDueByBill.has(item.name)) pastDueByBill.set(item.name, item);
  });
  const pastDue = [...pastDueByBill.values()];
  const importantDates = (state.importantDates || [])
    .filter((item) => (item.status || "Upcoming") !== "Done" && (!item.when || dayDistance(item.when) >= 0) && dayDistance(item.when) <= 14)
    .map((item) => ({
      id: `date|${duplicateText(item.title)}|${String(item.when || "").slice(0, 16)}`,
      section: "Important Dates",
      kind: item.type || "Important date",
      title: item.title || "Important date",
      message: `${relativeDateLabel(item.when)}${item.className ? ` · ${item.className}` : ""}`,
      urgency: dayDistance(item.when) <= 0 ? "urgent" : "upcoming",
      page: "schoolDates"
    }));
  const tasks = (state.tasks || [])
    .filter((item) => (item.status || "Backlog") !== "Done" && item.due && dayDistance(item.due) <= 3)
    .map((item) => ({
      id: `task|${duplicateText(item.title || item.text)}|${String(item.due).slice(0, 10)}`,
      section: "Tasks",
      kind: item.priority || "Task",
      title: item.title || item.text || "Task",
      message: relativeDateLabel(item.due),
      urgency: dayDistance(item.due) <= 0 ? "urgent" : "upcoming",
      page: "tasks"
    }));
  const school = (state.assignments || [])
    .filter((item) => !["submitted", "graded", "done"].includes(duplicateText(item.status)) && item.due && dayDistance(item.due) <= 7)
    .map((item) => ({
      id: `school|${duplicateText(item.title)}|${String(item.due).slice(0, 10)}`,
      section: "School",
      kind: item.className || item.type || "Assignment",
      title: item.title || "Assignment",
      message: relativeDateLabel(item.due),
      urgency: dayDistance(item.due) <= 1 ? "urgent" : "upcoming",
      page: "schoolAssignments"
    }));
  const latestSleep = (state.health?.sleepSessions || []).slice().sort((a, b) => new Date(b.end || 0) - new Date(a.end || 0))[0];
  const sleepHours = latestSleep ? (new Date(latestSleep.end) - new Date(latestSleep.start)) / 3600000 : null;
  const health = sleepHours !== null && sleepHours < 7 ? [{
    id: `health|sleep|${String(latestSleep.end || latestSleep.date || "").slice(0, 10)}`,
    section: "Health",
    kind: "Recovery",
    title: "Sleep below target",
    message: `${sleepHours.toFixed(1)} hours logged. Your target is 7–8 hours.`,
    urgency: sleepHours < 4 ? "urgent" : "upcoming",
    page: "health"
  }] : [];
  const workout = workoutPlanForDate(todayKey());
  const workoutDone = (state.workouts || []).some((item) => String(item.date || item.start || "").slice(0, 10) === todayKey());
  const workoutAlerts = workout && !workoutDone ? [{
    id: `workout|${todayKey()}|${duplicateText(workout.title)}`,
    section: "Workout",
    kind: "Today’s training",
    title: workout.title || "Workout plan",
    message: workout.subtitle || "Open Workout Coach for today’s strategy.",
    urgency: "upcoming",
    page: "workout"
  }] : [];
  return [
    ...importantDates,
    ...pastDue.map((item) => ({ id: billNotificationId(item, "past-due"), section: "Bills", kind: "Past due", title: item.name, message: `${item.name} was due ${item.dateLabel}. ${money(Number(item.amount || 0))}`, urgency: "urgent", page: "bills" })),
    ...upcoming.map((item) => ({ id: billNotificationId(item), section: "Bills", kind: "Upcoming bill", title: item.name, message: `${item.name} is due ${item.dateLabel}. ${money(Number(item.amount || 0))}`, urgency: dayDistance(item.dateKey) <= 1 ? "urgent" : "upcoming", page: "bills" })),
    ...tasks,
    ...school,
    ...health,
    ...workoutAlerts
  ];
}

function renderNotifications() {
  const list = document.querySelector("#notificationsList");
  const badge = document.querySelector("#notificationBadge");
  if (!list || !badge) return;
  const notifications = buildNotifications();
  const unread = notifications.filter((item) => !state.notificationsRead?.[item.id]);
  badge.hidden = unread.length === 0;
  badge.textContent = unread.length > 99 ? "99+" : String(unread.length);
  badge.classList.toggle("is-urgent", unread.some((item) => item.urgency === "urgent"));
  badge.classList.toggle("is-upcoming", unread.length > 0 && !unread.some((item) => item.urgency === "urgent"));
  list.innerHTML = "";
  if (!notifications.length) {
    list.innerHTML = `<div class="notification-empty"><strong>You're caught up.</strong><span>No urgent dates, bills, tasks, school, health, or workout alerts.</span></div>`;
    return;
  }
  const sections = ["Important Dates", "Bills", "Tasks", "School", "Health", "Workout"];
  sections.forEach((sectionName) => {
    const items = notifications.filter((item) => item.section === sectionName);
    if (!items.length) return;
    const section = document.createElement("section");
    section.className = "notification-section";
    section.innerHTML = `<div class="notification-section-title"><strong>${escapeHtml(sectionName)}</strong><span>${items.length}</span></div>`;
    items.forEach((notification) => {
      const isRead = !!state.notificationsRead?.[notification.id];
      const row = document.createElement("article");
      row.className = `notification-item is-${notification.urgency || "upcoming"}${isRead ? " is-read" : " is-unread"}`;
      row.innerHTML = `
        <span class="notification-dot" aria-hidden="true"></span>
        <button class="notification-open" type="button"><small>${escapeHtml(notification.kind)}</small><strong>${escapeHtml(notification.title)}</strong><p>${escapeHtml(notification.message)}</p></button>
        <button class="${isRead ? "ghost-btn" : "primary-btn"} compact-action notification-read" type="button">${isRead ? "Read" : "Mark Read"}</button>`;
      row.querySelector(".notification-open").addEventListener("click", () => {
        state.notificationsRead = state.notificationsRead || {};
        state.notificationsRead[notification.id] = true;
        forceSaveState();
        document.querySelector("#notificationsPanel").hidden = true;
        openPanel(notification.page, pageTitle(notification.page));
      });
      row.querySelector(".notification-read").addEventListener("click", () => {
        state.notificationsRead = state.notificationsRead || {};
        state.notificationsRead[notification.id] = true;
        forceSaveState();
        renderNotifications();
      });
      section.append(row);
    });
    list.append(section);
  });
}

function normalizeStatusItem(item) {
  return typeof item === "string" ? { text: item, source: "", page: "" } : item;
}

function fillStatus(selector, items) {
  const wrap = document.querySelector(selector);
  if (!wrap) return;
  wrap.innerHTML = "";
  const list = items.length ? items : ["Nothing set yet."];
  list.map(normalizeStatusItem).forEach((item) => {
    const row = document.createElement("div");
    row.className = "status-pill";
    row.innerHTML = `<span>${item.text}</span>${item.source ? `<small>Source: ${item.source}</small>` : ""}`;
    if (item.page) {
      row.classList.add("source-row");
      row.title = `Open ${item.source || item.page}`;
      row.addEventListener("click", () => openPanel(item.page, pageTitle(item.page)));
    }
    wrap.append(row);
  });
}

function homeMatrixHeader(wrap, eyebrow, value, label, progress = 0) {
  const header = document.createElement("div");
  header.className = "home-matrix-header";
  header.innerHTML = `
    <div><small>${escapeHtml(eyebrow)}</small><strong>${escapeHtml(String(value))}</strong><span>${escapeHtml(label)}</span></div>
    <div class="home-matrix-orbit" style="--matrix-progress:${clampPercent(progress)}%"><b>${clampPercent(progress)}%</b></div>
  `;
  wrap.append(header);
}

function homeMatrixTile({ icon, kicker, title, meta, stateName, tone = "blue", page }) {
  const tile = document.createElement("button");
  tile.type = "button";
  tile.className = `home-matrix-tile tone-${tone}`;
  tile.innerHTML = `
    <span class="home-matrix-icon" aria-hidden="true">${escapeHtml(icon)}</span>
    <span class="home-matrix-copy">
      <small>${escapeHtml(kicker)}</small>
      <strong>${escapeHtml(title)}</strong>
      <span>${escapeHtml(meta)}</span>
    </span>
    <b class="home-matrix-state">${escapeHtml(stateName)}</b>
  `;
  if (page) tile.addEventListener("click", () => openPanel(page, pageTitle(page)));
  return tile;
}

function renderHomeChecklistMatrix(items = []) {
  const wrap = document.querySelector("#dailyChecklist");
  if (!wrap) return;
  wrap.innerHTML = "";
  const completed = items.filter((item) => item.done).length;
  const percent = items.length ? completed / items.length * 100 : 0;
  homeMatrixHeader(wrap, "Daily completion", `${completed}/${items.length}`, "habits secured", percent);
  const grid = document.createElement("div");
  grid.className = "home-matrix-grid checklist-tile-grid";
  const list = items.length ? items : [{ text: "No checklist items yet", done: false, empty: true }];
  list.slice(0, 8).forEach((item, index) => {
    grid.append(homeMatrixTile({
      icon: item.done ? "✓" : String(index + 1).padStart(2, "0"),
      kicker: item.done ? "Completed" : item.empty ? "Schedule" : "Pending protocol",
      title: item.text || "Checklist item",
      meta: item.done ? "Locked into today's record" : item.empty ? "Add your first daily action" : "Open Schedule to complete",
      stateName: item.done ? "Done" : "Open",
      tone: item.done ? "green" : "cyan",
      page: "daily"
    }));
  });
  wrap.append(grid);
}

function renderHomeSchoolMatrix({ classes = [], assignments = [] }) {
  const wrap = document.querySelector("#homeSchoolTasks");
  if (!wrap) return;
  wrap.innerHTML = "";
  const total = classes.length + assignments.length;
  const urgent = assignments.filter((item) => /high|urgent/i.test(item.priority || "")).length;
  homeMatrixHeader(wrap, "Class schedules + coursework", total, urgent ? `${urgent} high-priority deadline${urgent === 1 ? "" : "s"}` : "linked academic records", total ? Math.min(100, total * 14) : 0);
  const grid = document.createElement("div");
  grid.className = "home-matrix-grid school-tile-grid";
  const schoolItems = [
    ...classes.map((item) => ({
      icon: "C", kicker: "Class", title: item.name || "Class",
      meta: `${classScheduleSummary(item)}${classOccursOnActiveDate(item) ? " · Today" : ""}`,
      stateName: classOccursOnActiveDate(item) ? "Live" : "Scheduled", tone: "cyan", page: "schoolClasses"
    })),
    ...assignments.map((item) => ({
      icon: item.type === "Presentation" ? "P" : item.type === "Homework" ? "H" : "A",
      kicker: `${item.type || "Assignment"} | ${item.priority || "Medium"}`, title: item.title || item.text || "Assignment",
      meta: `${item.className || "Class not linked"}${item.due ? ` | Due ${new Date(item.due).toLocaleString([], { dateStyle: "medium", timeStyle: item.due.includes("T") ? "short" : undefined })}` : " | No due date"}`,
      stateName: item.status || "Open", tone: /high|urgent/i.test(item.priority || "") ? "red" : "violet", page: "schoolAssignments"
    }))
  ];
  (schoolItems.length ? schoolItems : [{
    icon: "+", kicker: "School Command", title: "No classes or coursework", meta: "Add a class, assignment, homework, or presentation", stateName: "Clear", tone: "cyan", page: "study"
  }]).slice(0, 8).forEach((item) => grid.append(homeMatrixTile(item)));
  wrap.append(grid);
}

function renderHomeMoneyMatrix(upcoming = [], paid = []) {
  const wrap = document.querySelector("#homeMoneyBills");
  if (!wrap) return;
  wrap.innerHTML = "";
  const unpaid = upcoming.filter((item) => !item.paid);
  const upcomingTotal = unpaid.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const allBills = state.bills || [];
  const paidPercent = allBills.length ? allBills.filter((item) => item.paid).length / allBills.length * 100 : 0;
  homeMatrixHeader(wrap, "Cash-flow radar", money(upcomingTotal), `${unpaid.length} upcoming obligation${unpaid.length === 1 ? "" : "s"}`, paidPercent);
  const grid = document.createElement("div");
  grid.className = "home-matrix-grid money-tile-grid";
  const billItems = [
    ...upcoming.map((item) => {
      const distance = dayDistance(item.date);
      const urgency = item.paid ? "green" : distance <= 2 ? "red" : distance <= 7 ? "amber" : "blue";
      return {
        icon: "$", kicker: item.paid ? "Payment cleared" : distance <= 0 ? "Due today" : `${distance} day${distance === 1 ? "" : "s"} remaining`,
        title: item.name || "Bill", meta: `${item.dateLabel} · ${item.category || "Monthly bill"}`,
        stateName: money(Number(item.amount || 0)), tone: urgency, page: "bills"
      };
    }),
    ...paid.map((item) => ({
      icon: "✓", kicker: "Paid", title: item.name || "Bill",
      meta: item.category || "Monthly bill", stateName: money(Number(item.amount || 0)), tone: "green", page: "bills"
    }))
  ];
  (billItems.length ? billItems : [{
    icon: "$", kicker: "Money Hub", title: "No bills scheduled", meta: "Add monthly bills to activate the radar", stateName: "Clear", tone: "green", page: "bills"
  }]).slice(0, 8).forEach((item) => grid.append(homeMatrixTile(item)));
  wrap.append(grid);
}

function editableItem(item, onChange, onDelete) {
  const wrap = document.createElement("div");
  wrap.className = "editable-item";
  const check = document.createElement("input");
  check.type = "checkbox";
  check.checked = !!item.done;
  check.addEventListener("change", () => {
    onChange({ done: check.checked });
    saveState();
  });
  const text = input(item.text, (value) => onChange({ text: value }), { placeholder: "Task" });
  const del = document.createElement("button");
  del.className = "icon-btn";
  del.type = "button";
  del.textContent = "x";
  del.addEventListener("click", onDelete);
  wrap.append(check, text, del);
  return wrap;
}

function renderSchedule() {
  const grid = document.querySelector("#scheduleGrid");
  grid.innerHTML = "";
  renderDailyFocusEditor();
  const scheduleDate = new Date(`${activeDate}T12:00:00`);
  const header = document.createElement("div");
  header.className = "calendar-day-header";
  header.innerHTML = `
    <div>
      <span>${scheduleDate.toLocaleDateString(undefined, { weekday: "short" })}</span>
      <strong>${scheduleDate.getDate()}</strong>
    </div>
    <p>${scheduleDate.toLocaleDateString(undefined, { month: "long", year: "numeric" })}</p>
  `;
  grid.append(header);
  for (let hour = 5; hour <= 23; hour++) {
    for (let minute of [0, 30]) {
      const key = `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
      const item = day().schedule[key] || {};
      const status = item.status || "Open";
      const row = document.createElement("div");
      row.className = `schedule-row calendar-event-row status-${status.toLowerCase()}`;
      const end = new Date(`2000-01-01T${key}:00`);
      end.setMinutes(end.getMinutes() + 30);
      const endKey = end.toTimeString().slice(0, 5);
      row.innerHTML = `
        <div class="time-label">
          <strong>${formatTime(key)}</strong>
          <span>${formatTime(endKey)}</span>
        </div>
      `;
      const eventCard = document.createElement("div");
      eventCard.className = "calendar-event-card";
      eventCard.append(input(item.task || "", (value) => {
        day().schedule[key] = { ...(day().schedule[key] || {}), task: value };
      }, { placeholder: "Add title, class, workout, prayer, study block..." }));
      const meta = document.createElement("div");
      meta.className = "calendar-event-meta";
      meta.append(select(status, ["Open", "Doing", "Done", "Skipped"], (value) => {
        day().schedule[key] = { ...(day().schedule[key] || {}), status: value };
      }));
      eventCard.append(meta);
      row.append(eventCard);
      grid.append(row);
    }
  }
}

function renderDailyFocusEditor() {
  const d = day();
  const topEditor = document.querySelector("#topThreeEditor");
  if (topEditor) {
    topEditor.innerHTML = "";
    d.top.forEach((item, index) => {
      topEditor.append(input(item, (value) => d.top[index] = value, { placeholder: `Priority ${index + 1}` }));
    });
  }
  const checklistEditor = document.querySelector("#dailyChecklistEditor");
  if (checklistEditor) {
    checklistEditor.innerHTML = "";
    d.checklist.forEach((item, index) => checklistEditor.append(editableItem(item, (patch) => {
      d.checklist[index] = { ...d.checklist[index], ...patch };
    }, () => {
      d.checklist.splice(index, 1);
      saveState();
      renderDailyFocusEditor();
      renderDashboard();
    })));
  }
}

function renderTasks() {
  const board = document.querySelector("#taskBoard");
  if (!board) return;
  board.innerHTML = "";
  const columns = ["Backlog", "Doing", "Done"];
  columns.forEach((status) => {
    const card = document.createElement("article");
    card.className = "card";
    card.innerHTML = `<h3>${status}</h3>`;
    const columnTasks = state.tasks.filter((task) => (task.status || "Backlog") === status);
    if (!columnTasks.length) {
      const empty = document.createElement("div");
      empty.className = "data-empty-state";
      empty.innerHTML = `<strong>No ${status.toLowerCase()} tasks.</strong><span>${status === "Backlog" ? "No tasks added yet." : `Move a task here when it is ${status.toLowerCase()}.`}</span>`;
      card.append(empty);
    }
    columnTasks.forEach((task) => {
        const realIndex = state.tasks.indexOf(task);
        const row = document.createElement("div");
        row.className = `task-card${status === "Done" ? " is-completed-task" : ""}`;
        if (status === "Done") {
          const completedBadge = document.createElement("div");
          completedBadge.className = "task-done-badge";
          completedBadge.innerHTML = `<span aria-hidden="true">&#10003;</span><strong>Completed</strong><small>${task.completedAt ? new Date(task.completedAt).toLocaleString() : task.completedOn || "Saved"}</small>`;
          row.append(completedBadge);
        }
        row.append(input(task.title, (value) => task.title = value, { placeholder: "Task title" }));
        row.append(input(task.due, (value) => task.due = value, { type: "date" }));
        row.append(select(task.priority || "Medium", ["Low", "Medium", "High", "Urgent"], (value) => task.priority = value));
        row.append(select(task.status || "Backlog", columns, (value) => updateTaskStatus(task, value)));
        row.append(input(task.note, (value) => task.note = value, { placeholder: "Notes" }));
        const del = document.createElement("button");
        del.className = "danger-btn";
        del.textContent = "Delete";
        del.addEventListener("click", () => {
          state.tasks.splice(realIndex, 1);
          saveState();
          renderTasks();
        });
        row.append(del);
        card.append(row);
      });
    board.append(card);
  });
}

function renderTodos() {
  const wrap = document.querySelector("#todoLists");
  if (!wrap) return;
  wrap.innerHTML = "";
  if (!state.todoLists.length) {
    const empty = document.createElement("article");
    empty.className = "card data-empty-state";
    empty.innerHTML = "<strong>No to-do lists added yet.</strong><span>Create a list when you are ready to organize personal actions.</span>";
    wrap.append(empty);
  }
  state.todoLists.forEach((list, listIndex) => {
    const card = document.createElement("article");
    card.className = "card";
    card.append(input(list.title, (value) => list.title = value, { placeholder: "List name" }));
    const items = document.createElement("div");
    list.items.forEach((item, itemIndex) => {
      items.append(editableItem(item, (patch) => {
        list.items[itemIndex] = { ...list.items[itemIndex], ...patch };
      }, () => {
        list.items.splice(itemIndex, 1);
        saveState();
        renderTodos();
      }));
    });
    const addItem = document.createElement("button");
    addItem.className = "ghost-btn";
    addItem.textContent = "Add Item";
    addItem.addEventListener("click", () => {
      list.items.push({ text: "", done: false });
      saveState();
      renderTodos();
    });
    const delList = document.createElement("button");
    delList.className = "danger-btn";
    delList.textContent = "Delete List";
    delList.addEventListener("click", () => {
      state.todoLists.splice(listIndex, 1);
      saveState();
      renderTodos();
    });
    card.append(items, addItem, delList);
    wrap.append(card);
  });
  renderHomeTodoSummary();
}

function renderHomeTodoSummary() {
  const items = (state.todoLists || []).flatMap((list) =>
    (list.items || []).map((item) => ({ ...item, listTitle: list.title || "To-Do" }))
  );
  const openItems = items.filter((item) => !item.done);
  fillStatus("#homeTodoSummary", openItems.length
    ? openItems.slice(0, 5).map((item) => ({
        text: `${item.listTitle}: ${item.text || "Untitled item"}`,
        source: "Life Hub / To-Do Lists",
        page: "todos"
      }))
    : [{ text: "No open to-do items.", source: "Life Hub / To-Do Lists", page: "todos" }]);
}

function renderAlarms() {
  const wrap = document.querySelector("#alarmList");
  if (!wrap) return;
  wrap.innerHTML = "";
  state.alarms.forEach((alarm, index) => {
    const card = document.createElement("article");
    card.className = "card";
    card.append(input(alarm.time, (value) => alarm.time = value, { type: "time" }));
    card.append(input(alarm.message || alarm.label, (value) => alarm.message = value, { placeholder: "Alarm message" }));
    card.append(select(alarm.enabled ? "On" : "Off", ["On", "Off"], (value) => alarm.enabled = value === "On"));
    const status = document.createElement("p");
    status.className = "muted";
    status.textContent = alarm.lastFired ? `Last fired: ${alarm.lastFired}` : "Waiting for time.";
    const del = document.createElement("button");
    del.className = "danger-btn";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      state.alarms.splice(index, 1);
      saveState();
      renderAlarms();
    });
    card.append(status, del);
    wrap.append(card);
  });
}

function renderReminders() {
  const wrap = document.querySelector("#reminderList");
  if (!wrap) return;
  wrap.innerHTML = "";
  if (!state.reminders.length) {
    const empty = document.createElement("article");
    empty.className = "card data-empty-state";
    empty.innerHTML = "<strong>No reminders added yet.</strong><span>Add a reminder when something needs your attention later.</span>";
    wrap.append(empty);
  }
  state.reminders.forEach((reminder, index) => {
    const card = document.createElement("article");
    card.className = "task-card";
    card.append(
      input(reminder.title, (value) => reminder.title = value, { placeholder: "Reminder" }),
      input(reminder.when, (value) => reminder.when = value, { type: "datetime-local" }),
      select(reminder.status || "Open", ["Open", "Done"], (value) => reminder.status = value),
      input(reminder.note, (value) => reminder.note = value, { placeholder: "Note" })
    );
    const del = document.createElement("button");
    del.className = "danger-btn";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      state.reminders.splice(index, 1);
      saveState();
      renderReminders();
    });
    card.append(del);
    wrap.append(card);
  });
}

function renderCountdowns() {
  const wrap = document.querySelector("#countdownList");
  if (!wrap) return;
  wrap.innerHTML = "";
  const summary = document.querySelector("#countdownSummary");
  const countdowns = state.countdowns || [];
  if (summary) {
    const now = Date.now();
    const upcoming = countdowns.filter((item) => item.target && new Date(item.target).getTime() > now);
    const today = upcoming.filter((item) => askDaysFromToday(item.target) === 0).length;
    const week = upcoming.filter((item) => {
      const days = askDaysFromToday(item.target);
      return days !== null && days >= 0 && days <= 7;
    }).length;
    const next = upcoming.sort((a, b) => new Date(a.target) - new Date(b.target))[0];
    summary.innerHTML = `
      <article><span>ALL</span><strong>${countdowns.length}</strong><small>Total countdowns</small></article>
      <article><span>24H</span><strong>${today}</strong><small>Due today</small></article>
      <article><span>7D</span><strong>${week}</strong><small>This week</small></article>
      <article><span>NEXT</span><strong>${escapeHtml(next?.title || "None")}</strong><small>${escapeHtml(next ? formatCountdown(next.target) : "No active target")}</small></article>
    `;
  }
  if (!countdowns.length) {
    wrap.innerHTML = `
      <article class="countdown-empty-state">
        <span aria-hidden="true">&#9203;</span>
        <strong>No countdowns yet.</strong>
        <small>Add graduation, semester end, exams, assignments, bills, birthdays, holidays, vacation, personal goals, or a custom target.</small>
      </article>
      <div class="countdown-template-grid" aria-label="Countdown quick templates">
        ${[
          ["Graduation", "Graduation Countdown", 365, "Track the long finish line."],
          ["Semester End", "Semester End Countdown", 90, "Keep the school term visible."],
          ["Final Exam", "Final Exam Countdown", 30, "Prepare before pressure hits."],
          ["Assignment", "Assignment Countdown", 7, "Protect homework deadlines."],
          ["Bill Due", "Bill Due Countdown", 10, "See payments before they surprise you."],
          ["Personal Goal", "Personal Goal Countdown", 21, "Build momentum toward a target."],
          ["Birthday", "Birthday Countdown", 60, "Remember important people."],
          ["Custom", "Custom Countdown", 1, "Create any timer you need."]
        ].map(([type, title, days, description]) => `
          <button class="countdown-template-card" type="button" data-countdown-template="${escapeHtml(type)}" data-countdown-title="${escapeHtml(title)}" data-countdown-days="${days}">
            <span>${escapeHtml(type.slice(0, 2).toUpperCase())}</span>
            <strong>${escapeHtml(title)}</strong>
            <small>${escapeHtml(description)}</small>
          </button>
        `).join("")}
      </div>
    `;
    wrap.querySelectorAll("[data-countdown-template]").forEach((button) => {
      button.addEventListener("click", () => {
        const daysAhead = Math.max(1, Number(button.dataset.countdownDays || 1));
        const target = new Date(Date.now() + daysAhead * 86400000);
        target.setHours(9, 0, 0, 0);
        state.countdowns.push({
          id: `countdown-${Date.now()}`,
          title: button.dataset.countdownTitle || "New countdown",
          type: button.dataset.countdownTemplate || "Custom",
          target: toCountdownInputValue(target),
          note: "",
          completedNotified: false
        });
        state.dismissedCountdownId = "";
        saveState();
        renderCountdowns();
      });
    });
    renderHomeCountdown();
    return;
  }
  const typeOptions = ["Graduation", "Semester End", "Final Exam", "Assignment", "Bill Due", "Birthday", "Holiday", "Vacation", "Personal Goal", "Custom"];
  countdowns.forEach((countdown, index) => {
    countdown.id = countdown.id || `countdown-${Date.now()}-${index}`;
    countdown.type = countdown.type || inferCountdownType(countdown.title || countdown.note || "");
    const card = document.createElement("article");
    const diff = countdown.target ? new Date(countdown.target).getTime() - Date.now() : NaN;
    const totalWindow = Math.max(1, 30 * 86400000);
    const progress = Number.isFinite(diff) ? Math.max(0, Math.min(100, 100 - (diff / totalWindow * 100))) : 0;
    const days = askDaysFromToday(countdown.target);
    card.className = `countdown-command-card ${days !== null && days < 0 ? "is-past" : days !== null && days <= 3 ? "is-urgent" : ""}`;
    const title = input(countdown.title, (value) => {
      countdown.title = value;
      countdown.type = inferCountdownType(value || countdown.note || countdown.type);
    }, { placeholder: "Goal or deadline" });
    const type = select(countdown.type || "Custom", typeOptions, (value) => countdown.type = value);
    const target = input(countdown.target, (value) => {
      countdown.target = value;
      countdown.completedNotified = false;
      if (state.dismissedCountdownId === countdown.id) state.dismissedCountdownId = "";
    }, { type: "datetime-local" });
    const note = input(countdown.note || "", (value) => countdown.note = value, { placeholder: "Notes or why this matters" });
    const output = document.createElement("div");
    output.className = "countdown-output countdown-flip-output";
    output.innerHTML = `<strong>${escapeHtml(formatCountdown(countdown.target))}</strong><small>${escapeHtml(countdown.type || "Custom Countdown")}</small>`;
    const progressBar = document.createElement("div");
    progressBar.className = "countdown-progress";
    progressBar.style.setProperty("--countdown-progress", `${Math.round(progress)}%`);
    progressBar.innerHTML = "<i></i>";
    const del = document.createElement("button");
    del.className = "danger-btn";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      if (state.dismissedCountdownId === countdown.id) state.dismissedCountdownId = "";
      state.countdowns.splice(index, 1);
      saveState();
      renderCountdowns();
    });
    const fields = document.createElement("div");
    fields.className = "countdown-field-grid";
    fields.append(labeledControl("Title", title), labeledControl("Type", type), labeledControl("Target", target), labeledControl("Note", note));
    const actions = document.createElement("div");
    actions.className = "countdown-actions";
    actions.innerHTML = `<span>${days === null ? "No date" : days < 0 ? `${Math.abs(days)} days overdue` : days === 0 ? "Today" : days <= 7 ? "This week" : days <= 31 ? "This month" : "This year"}</span>`;
    actions.append(del);
    card.append(output, progressBar, fields, actions);
    wrap.append(card);
  });
  renderHomeCountdown();
}

function toCountdownInputValue(date) {
  const value = date instanceof Date ? date : new Date(date);
  if (Number.isNaN(value.getTime())) return "";
  const offset = value.getTimezoneOffset() * 60000;
  return new Date(value.getTime() - offset).toISOString().slice(0, 16);
}

function inferCountdownType(text = "") {
  const value = String(text).toLowerCase();
  if (value.includes("graduation")) return "Graduation";
  if (value.includes("semester")) return "Semester End";
  if (value.includes("final") || value.includes("exam")) return "Final Exam";
  if (value.includes("assignment") || value.includes("homework") || value.includes("project")) return "Assignment";
  if (value.includes("bill") || value.includes("payment")) return "Bill Due";
  if (value.includes("birthday")) return "Birthday";
  if (value.includes("holiday")) return "Holiday";
  if (value.includes("vacation") || value.includes("trip")) return "Vacation";
  if (value.includes("goal")) return "Personal Goal";
  return "Custom";
}

function updateCountdownDisplays() {
  document.querySelectorAll(".countdown-command-card .countdown-output").forEach((output, index) => {
    const strong = output.querySelector("strong");
    if (strong) strong.textContent = formatCountdown(state.countdowns[index]?.target);
    else output.textContent = formatCountdown(state.countdowns[index]?.target);
  });
  renderHomeCountdown();
  checkCountdownCompletions();
}

function activeCountdown() {
  return (state.countdowns || [])
    .filter((countdown) => countdown.target && new Date(countdown.target).getTime() > Date.now())
    .sort((a, b) => new Date(a.target) - new Date(b.target))[0] || null;
}

function renderHomeCountdown() {
  const popup = document.querySelector("#homeCountdownPopup");
  if (!popup) return;
  const countdown = activeCountdown();
  const isHome = currentPage === "dashboard";
  const dismissed = countdown && state.dismissedCountdownId === countdown.id;
  popup.hidden = !isHome || !countdown || dismissed;
  if (!countdown || popup.hidden) return;
  document.querySelector("#homeCountdownTitle").textContent = countdown.title || "Countdown";
  document.querySelector("#homeCountdownTime").textContent = formatCountdown(countdown.target);
  popup.dataset.countdownId = countdown.id;
}

function checkCountdownCompletions() {
  const now = Date.now();
  let changed = false;
  (state.countdowns || []).forEach((countdown) => {
    if (!countdown.target || countdown.completedNotified) return;
    const target = new Date(countdown.target).getTime();
    if (Number.isNaN(target) || target > now) return;
    countdown.completedNotified = true;
    changed = true;
    queueAlarmPopup({
      message: `${countdown.title || "Countdown"} has ended.`,
      label: "Timer ended",
      time: new Date(target).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }),
      countdown: true
    });
  });
  if (changed) forceSaveState();
}

function formatCountdown(target) {
  if (!target) return "Set a date and time.";
  const diff = new Date(target).getTime() - Date.now();
  if (Number.isNaN(diff)) return "Invalid date.";
  if (diff <= 0) return "Time reached.";
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  const minutes = Math.floor((diff % 3600000) / 60000);
  const seconds = Math.floor((diff % 60000) / 1000);
  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

function formatTime(key) {
  const [h, m] = key.split(":").map(Number);
  const hour = ((h + 11) % 12) + 1;
  return `${hour}:${String(m).padStart(2, "0")} ${h >= 12 ? "PM" : "AM"}`;
}

function renderPrayer() {
  const cards = document.querySelector("#prayerCards");
  cards.innerHTML = "";
  prayers.forEach((name) => {
    const data = day().prayers[name] || { done: false, note: "" };
    const card = document.createElement("article");
    card.className = `card prayer-card ${data.done ? "done" : ""}`;
    const title = document.createElement("h3");
    title.textContent = `${name} - ${salahGuide[name].obligatory} fard rak'ahs`;
    const liveTime = document.createElement("p");
    liveTime.className = "muted prayer-live-time";
    liveTime.textContent = state.prayerTimes?.timings?.[name]
      ? `Live time: ${formatPrayerDisplayTime(state.prayerTimes.timings[name])}`
      : "Live time not loaded yet.";
    const done = document.createElement("label");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = data.done;
    check.addEventListener("change", () => {
      data.done = check.checked;
      day().prayers[name] = data;
      saveState();
      renderAll();
    });
    done.append("Completed", check);
    card.append(title, liveTime, done, input(data.note, (value) => data.note = value, { placeholder: "Time / note" }));
    cards.append(card);
  });
  renderSalahInstructions();
}

function renderSalahInstructions() {
  const selector = document.querySelector("#salahInstructionPrayer");
  const wrap = document.querySelector("#salahInstructionContent");
  if (!selector || !wrap) return;
  const name = selector.value || "Fajr";
  const guide = salahGuide[name];
  const witr = name === "Isha" ? `
    <section class="witr-guide"><small>Witr after Isha</small><strong>Common practice: 1 or 3 odd-numbered rak'ahs</strong><p>In a common three-rak'ah practice, recite Al-Fatihah and another surah in every rak'ah. Reports mention Al-A'la, Al-Kafirun, and Al-Ikhlas, but no specific surah is required. Details and the placement of Qunoot differ by school, so follow trusted local guidance.</p></section>
    <section class="witr-qunut"><small>Dua Qunoot</small><strong lang="ar" dir="rtl">اللهم اهدني فيمن هديت، وعافني فيمن عافيت، وتولني فيمن توليت، وبارك لي فيما أعطيت، وقني شر ما قضيت</strong><p><b>Transliteration:</b> Allahumma ihdini fiman hadayt, wa 'afini fiman 'afayt, wa tawallani fiman tawallayt, wa barik li fima a'tayt, wa qini sharra ma qadayt.</p><p><b>Meaning:</b> O Allah, guide me among those You have guided, grant me well-being among those You have granted well-being, take me into Your care, bless what You have given me, and protect me from the evil of what You have decreed.</p></section>
  ` : "";
  wrap.innerHTML = `
    <section><small>Obligatory</small><strong>${guide.obligatory} rak'ahs</strong><p>${guide.recitation}</p></section>
    <section><small>Established sunnah</small><strong>${guide.sunnahBefore} before / ${guide.sunnahAfter} after</strong><p>Follow a trusted local scholar for school-specific details.</p></section>
    <section><small>Every rak'ah</small><strong>Standing, recitation, bowing, two prostrations</strong><p>Begin with intention and takbir. Recite Al-Fatihah in every rak'ah; add another surah in the first two.</p></section>
    <section><small>Quality rules</small><strong>Purity, time, qiblah, covering, calm movement</strong><p>Learn wudu, avoid rushing, pause in each posture, complete tashahhud, and finish with salam.</p></section>
    ${witr}
  `;
}

function renderIslamicToolkit() {
  const wrap = document.querySelector("#islamicToolkitGrid");
  if (!wrap) return;
  const toolkit = state.faithToolkit;
  const prayerDone = prayers.filter((name) => day().prayers[name]?.done).length;
  const wisdomBlock = Math.floor(Date.now() / (30 * 60 * 1000));
  const wisdom = islamicToolkitWisdom[(wisdomBlock + Number(toolkit.dhikrCount || 0)) % islamicToolkitWisdom.length];
  const nextFriday = nextFridayDate();
  const daysToFriday = Math.max(0, Math.ceil((nextFriday - new Date()) / 86400000));
  wrap.innerHTML = `
    <button class="islamic-tool hub-link" data-open-tab="prayer" type="button"><span>&#128332;</span><small>Prayer completion</small><strong>${prayerDone}/5 completed</strong></button>
    <button class="islamic-tool hub-link" data-open-tab="quran" type="button"><span>Q</span><small>Quran reading</small><strong>${Number(toolkit.quranPages || 0)} pages today</strong></button>
    <article class="islamic-tool interactive"><span>&#9673;</span><small>Dhikr counter</small><strong>${Number(toolkit.dhikrCount || 0)}</strong><div><button data-dhikr-add type="button">+1</button><button data-dhikr-reset type="button">Reset</button></div></article>
    <article class="islamic-tool"><span>&#10022;</span><small>Dua of the day</small><strong>Rabbana atina fid-dunya hasanah wa fil-akhirati hasanah wa qina 'adhab an-nar.</strong></article>
    <article class="islamic-tool"><span>&#10077;</span><small>Islamic reminder</small><strong>Speak good or remain silent. Let character confirm what worship teaches.</strong></article>
    <button class="islamic-tool hub-link" data-open-tab="jummah" type="button"><span>J</span><small>Jummah reminder</small><strong>${daysToFriday ? `${daysToFriday} days until Friday` : "Jummah is today"}</strong></button>
    <button class="islamic-tool hub-link" data-open-tab="ramadan" type="button"><span>&#9789;</span><small>Ramadan command</small><strong>${state.ramadanFasts.length} fasts recorded</strong></button>
    <article class="islamic-tool interactive"><span>+</span><small>Good deeds tracker</small><strong>${toolkit.goodDeeds.length} recorded</strong><div><button data-good-deed type="button">Record a good deed</button></div></article>
    <article class="islamic-tool interactive"><span>$</span><small>Sadaqah tracker</small><strong>${money(Number(toolkit.sadaqah || 0))}</strong><div><button data-sadaqah-add type="button">Add amount</button></div></article>
    <article class="islamic-tool halal-habit-tool"><span>&#10003;</span><small>Halal habit tracker</small><div id="halalHabitList"></div></article>
    <article class="islamic-tool scholar-wisdom"><span>W</span><small>Scholar wisdom</small><strong>${escapeHtml(wisdom)}</strong></article>
  `;
  wrap.querySelector("[data-dhikr-add]")?.addEventListener("click", () => {
    toolkit.dhikrCount = Number(toolkit.dhikrCount || 0) + 1;
    saveState();
    renderIslamicToolkit();
  });
  wrap.querySelector("[data-dhikr-reset]")?.addEventListener("click", () => {
    toolkit.dhikrCount = 0;
    saveState();
    renderIslamicToolkit();
  });
  wrap.querySelector("[data-good-deed]")?.addEventListener("click", () => {
    const deed = prompt("What good deed did you complete?");
    if (!deed?.trim()) return;
    toolkit.goodDeeds.unshift({ text: deed.trim(), date: todayKey() });
    forceSaveState();
    renderIslamicToolkit();
  });
  wrap.querySelector("[data-sadaqah-add]")?.addEventListener("click", () => {
    const amount = Number(prompt("Sadaqah amount"));
    if (!Number.isFinite(amount) || amount <= 0) return;
    toolkit.sadaqah = Number(toolkit.sadaqah || 0) + amount;
    forceSaveState();
    renderIslamicToolkit();
  });
  const habits = wrap.querySelector("#halalHabitList");
  toolkit.halalHabits.forEach((habit, index) => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="checkbox" ${habit.done ? "checked" : ""}><span>${escapeHtml(habit.text)}</span>`;
    label.querySelector("input").addEventListener("change", (event) => {
      toolkit.halalHabits[index].done = event.target.checked;
      saveState();
    });
    habits.append(label);
  });
}

function renderQuran() {
  const d = day();
  if (d.verseDate !== activeDate) {
    const dailySeed = Number(activeDate.replace(/\D/g, "")) || 0;
    d.verseIndex = dailySeed % quranVerseBank.length;
    d.verseDate = activeDate;
    saveState();
  }
  const verse = quranVerseBank[d.verseIndex % quranVerseBank.length];
  document.querySelector("#verseArabic").textContent = verse.ar;
  document.querySelector("#verseEnglish").textContent = verse.en;
  document.querySelector("#verseRef").textContent = verse.ref;
  setField("#quranSurah", d.quran.surah, (value) => d.quran.surah = value);
  setField("#quranAyah", d.quran.ayah, (value) => d.quran.ayah = value);
  setField("#quranMinutes", d.quran.minutes, (value) => d.quran.minutes = value);
  setField("#quranReflection", d.quran.reflection, (value) => d.quran.reflection = value);

  const selector = document.querySelector("#surahSelect");
  if (selector && selector.options.length === 0) {
    surahs.forEach((surah) => {
      const option = document.createElement("option");
      option.value = String(surah.number);
      option.textContent = `${surah.number}. ${surah.name}`;
      selector.append(option);
    });
  }
  if (selector) {
    selector.value = String(state.selectedSurah || 1);
    selector.onchange = () => {
      state.selectedSurah = Number(selector.value);
      saveState();
      renderQuran();
      loadSelectedSurahText();
    };
  }
  const selected = surahs[(state.selectedSurah || 1) - 1] || surahs[0];
  const quranUrl = `https://quran.com/${selected.number}`;
  const videoUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${selected.name} tafsir English`)}`;
  const study = document.querySelector("#surahStudy");
  if (study && !study.dataset.loadedSurah) {
    study.innerHTML = `<div class="empty-state"><strong>${selected.number}. ${escapeHtml(selected.name)}</strong><small>Press Load Surah to display the complete Arabic text with English meaning.</small></div>`;
  }
  document.querySelector("#quranComLink").href = quranUrl;
  document.querySelector("#quranVideoLink").href = videoUrl;
  document.querySelector("#quranTeacherSteps").innerHTML = `
    <div class="quran-daily-steps">
      <span><b>01</b><strong>Listen</strong><small>Hear the selected passage carefully.</small></span>
      <span><b>02</b><strong>Understand</strong><small>Read the English meaning and trusted explanation.</small></span>
      <span><b>03</b><strong>Record</strong><small>Save minutes, ayahs, and one personal reflection.</small></span>
    </div>
  `;
}

async function loadSelectedSurahText() {
  const selectedNumber = Number(state.selectedSurah || document.querySelector("#surahSelect")?.value || 1);
  const selected = surahs[selectedNumber - 1] || surahs[0];
  const wrap = document.querySelector("#surahStudy");
  const status = document.querySelector("#surahLoadStatus");
  if (!wrap || !status) return;
  status.textContent = `Loading ${selected.number}. ${selected.name}...`;
  wrap.innerHTML = `<div class="surah-reader-loading">Loading Arabic and English text...</div>`;
  try {
    let editions = quranSurahCache.get(selectedNumber);
    if (!editions) {
      const response = await fetch(`https://api.alquran.cloud/v1/surah/${selectedNumber}/editions/quran-uthmani,en.sahih`);
      if (!response.ok) throw new Error("Quran service unavailable");
      const payload = await response.json();
      editions = Array.isArray(payload.data) ? payload.data : [];
      if (editions.length < 2) throw new Error("Incomplete Quran response");
      quranSurahCache.set(selectedNumber, editions);
    }
    const arabic = editions.find((edition) => edition.edition?.language === "ar") || editions[0];
    const english = editions.find((edition) => edition.edition?.language === "en") || editions[1];
    const englishByNumber = new Map((english.ayahs || []).map((ayah) => [ayah.numberInSurah, ayah.text]));
    wrap.dataset.loadedSurah = String(selectedNumber);
    wrap.innerHTML = (arabic.ayahs || []).map((ayah) => `
      <article class="surah-ayah-row">
        <span>${ayah.numberInSurah}</span>
        <p class="surah-arabic" lang="ar" dir="rtl">${escapeHtml(ayah.text)}</p>
        <p class="surah-english">${escapeHtml(englishByNumber.get(ayah.numberInSurah) || "")}</p>
      </article>
    `).join("");
    status.textContent = `${arabic.ayahs?.length || 0} ayahs loaded. Arabic appears first, followed by English meaning.`;
  } catch (error) {
    wrap.dataset.loadedSurah = "";
    wrap.innerHTML = `<div class="empty-state"><strong>Full text could not load.</strong><small>Check your connection, then try again. The Arabic + English external reader remains available.</small></div>`;
    status.textContent = "Unable to load the selected surah right now.";
  }
}

function renderFaith() {
  if (!state.prayerLocation) state.prayerLocation = { city: "New York", country: "United States" };
  setField("#prayerCity", state.prayerLocation.city || "", (value) => state.prayerLocation.city = value);
  setField("#prayerCountry", state.prayerLocation.country || "", (value) => state.prayerLocation.country = value);
  const next = nextPrayerSnapshot();
  const completed = prayers.filter((name) => day().prayers?.[name]?.done).length;
  const activeIsFriday = new Date(`${activeDate}T12:00:00`).getDay() === 5;
  const jummahCompleted = (state.jummah?.history || []).some((item) => item.date === activeDate);
  const faithCompleted = completed + (activeIsFriday && jummahCompleted ? 1 : 0);
  const faithTotal = activeIsFriday ? 6 : 5;
  const heroDate = document.querySelector("#faithHeroDate");
  const heroProgress = document.querySelector("#faithHeroProgress");
  const heroNext = document.querySelector("#faithHeroNextPrayer");
  const heroCountdown = document.querySelector("#faithHeroCountdown");
  if (heroDate) heroDate.textContent = new Date(`${activeDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  if (heroProgress) heroProgress.textContent = `${faithCompleted} / ${faithTotal}${activeIsFriday ? " incl. Jummah" : ""}`;
  if (heroNext) heroNext.textContent = next ? `${next.name} at ${formatPrayerDisplayTime(next.time)}` : "Load today's live prayer times";
  if (heroCountdown) {
    heroCountdown.textContent = next
      ? next.minutes < 60 ? `${next.minutes} min` : `${Math.floor(next.minutes / 60)} hr ${next.minutes % 60} min`
      : "Not loaded";
  }
  renderRealPrayerTimes();
  if (state.prayerTimes?.fetchedOn !== todayKey() && !prayerLoadStarted) {
    prayerLoadStarted = true;
    loadPrayerTimes().finally(() => {
      prayerLoadStarted = false;
    });
  }
}

function nextFridayDate(from = new Date()) {
  const next = new Date(from);
  const daysUntilFriday = (5 - next.getDay() + 7) % 7;
  next.setDate(next.getDate() + daysUntilFriday);
  next.setHours(12, 0, 0, 0);
  return next;
}

function renderJummah() {
  if (!state.jummah) state.jummah = defaultState().jummah;
  const now = new Date();
  const isFriday = now.getDay() === 5;
  const nextFriday = nextFridayDate(now);
  const completedToday = state.jummah.history.some((item) => item.date === todayKey());
  document.querySelector("#jummahStatusTitle").textContent = completedToday
    ? "Jummah completed today."
    : isFriday ? "Today is Friday: protect Jummah." : "Prepare now for the next Jummah.";
  document.querySelector("#jummahStatusText").textContent = isFriday
    ? "Arrange school, Uber Eats, commute, and errands around the khutbah. Leave early so work does not make you miss it."
    : `Next Friday is ${nextFriday.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" })}.`;
  const diff = Math.max(0, nextFriday.getTime() - now.getTime());
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff % 86400000) / 3600000);
  document.querySelector("#jummahCountdown").innerHTML = `<strong>${isFriday ? "Today" : `${days}d ${hours}h`}</strong><span>Until Friday noon</span>`;

  const checklist = document.querySelector("#jummahChecklist");
  checklist.innerHTML = "";
  state.jummah.checklist.forEach((item, index) => checklist.append(editableItem(item, (patch) => {
    state.jummah.checklist[index] = { ...state.jummah.checklist[index], ...patch };
  }, () => {
    state.jummah.checklist.splice(index, 1);
    saveState();
    renderJummah();
  })));
  setField("#jummahMosque", state.jummah.mosque || "", (value) => state.jummah.mosque = value);
  setField("#jummahTime", state.jummah.time || "13:00", (value) => state.jummah.time = value);
  setField("#jummahEntryTime", state.jummah.entryTime || "", (value) => state.jummah.entryTime = value);
  setField("#jummahStartTime", state.jummah.startTime || "", (value) => state.jummah.startTime = value);
  setField("#jummahEndTime", state.jummah.endTime || "", (value) => state.jummah.endTime = value);
  setField("#jummahNotes", state.jummah.notes || "", (value) => state.jummah.notes = value);
  const history = document.querySelector("#jummahHistory");
  if (history) {
    history.innerHTML = "";
    if (!state.jummah.history.length) {
      history.innerHTML = `<div class="empty-state"><strong>No Jummah records saved yet.</strong><small>Save today's Jummah entry to build your Friday history.</small></div>`;
    }
    state.jummah.history.slice(0, 12).forEach((item) => {
      const row = document.createElement("article");
      row.className = "jummah-history-card";
      row.innerHTML = `
        <div>
          <small>${escapeHtml(item.date || "Friday")}</small>
          <strong>${escapeHtml(item.mosque || "Jummah completed")}</strong>
          <span>${escapeHtml([item.time ? `Khutbah ${item.time}` : "", item.entryTime ? `Entry ${item.entryTime}` : "", item.startTime || item.endTime ? `${item.startTime || "--"}-${item.endTime || "--"}` : ""].filter(Boolean).join(" • ") || "Time not saved")}</span>
          <p>${escapeHtml(item.notes || "No khutbah note saved.")}</p>
        </div>
        <button class="danger-btn compact-action" data-delete-jummah="${escapeHtml(item.date)}" type="button">Delete</button>
      `;
      row.querySelector("[data-delete-jummah]")?.addEventListener("click", () => deleteJummahEntry(item.date));
      history.append(row);
    });
  }
}

function saveJummahEntry() {
  state.jummah = { ...defaultState().jummah, ...(state.jummah || {}) };
  state.jummah.history = Array.isArray(state.jummah.history) ? state.jummah.history : [];
  const entry = {
    date: todayKey(),
    mosque: state.jummah.mosque || "",
    time: state.jummah.time || "",
    entryTime: state.jummah.entryTime || "",
    startTime: state.jummah.startTime || "",
    endTime: state.jummah.endTime || "",
    notes: state.jummah.notes || "",
    savedAt: new Date().toISOString()
  };
  const existingIndex = state.jummah.history.findIndex((item) => item.date === entry.date);
  if (existingIndex >= 0) state.jummah.history[existingIndex] = { ...state.jummah.history[existingIndex], ...entry };
  else state.jummah.history.unshift(entry);
  saveState();
  renderJummah();
  renderDashboard();
}

function deleteJummahEntry(date = todayKey()) {
  if (!state.jummah?.history?.length) return;
  const index = state.jummah.history.findIndex((item) => item.date === date);
  if (index < 0) return;
  if (!confirm(`Delete Jummah record for ${date}?`)) return;
  state.jummah.history.splice(index, 1);
  saveState();
  renderJummah();
  renderDashboard();
}

function renderRamadan() {
  const hijri = state.prayerTimes?.hijri;
  const isRamadan = String(hijri?.month?.number || "") === "9";
  const title = document.querySelector("#ramadanStatusTitle");
  const text = document.querySelector("#ramadanStatusText");
  if (hijri) {
    title.textContent = isRamadan
      ? `Ramadan ${hijri.year}: Day ${hijri.day}`
      : `Today is ${hijri.day} ${hijri.month?.en || "Hijri month"} ${hijri.year}`;
    text.textContent = isRamadan
      ? "Ramadan Mode is active. Follow today's worship checklist and protect the fast."
      : "Ramadan Mode is ready. Update times as Ramadan approaches; the Hijri calendar and local prayer times will update through the prayer-time service.";
  } else {
    title.textContent = "Load live Ramadan and Hijri timing information.";
    text.textContent = "Set your city and country in Faith Hub, then press Update Ramadan Times.";
  }
  const timings = state.prayerTimes?.timings || {};
  fillStatus("#ramadanLiveTimes", [
    `Suhoor ends before Fajr: ${timings.Fajr || "--"}`,
    `Iftar begins at Maghrib: ${timings.Maghrib || "--"}`,
    `Isha: ${timings.Isha || "--"}`,
    state.prayerTimes?.date ? `Timing date: ${state.prayerTimes.date}` : "Live timing date not loaded."
  ]);
  const fastProgress = document.querySelector("#ramadanFastProgress");
  if (fastProgress) {
    const completedToday = state.ramadanFasts.includes(todayKey());
    fastProgress.textContent = `${state.ramadanFasts.length} day${state.ramadanFasts.length === 1 ? "" : "s"} recorded${completedToday ? " - today complete" : ""}`;
  }
  const checklist = document.querySelector("#ramadanChecklist");
  const d = day();
  if (!Array.isArray(d.ramadanChecklist)) d.ramadanChecklist = defaultState().days?.[activeDate]?.ramadanChecklist || [
    { text: "Wake for suhoor and make intention", done: false },
    { text: "Fast from Fajr to Maghrib", done: false },
    { text: "Complete all five obligatory prayers", done: false },
    { text: "Read Quran with English understanding", done: false },
    { text: "Make dhikr, charity, tawbah, and dua", done: false },
    { text: "Pray Taraweeh or additional night prayer", done: false }
  ];
  checklist.innerHTML = "";
  d.ramadanChecklist.forEach((item, index) => checklist.append(editableItem(item, (patch) => {
    d.ramadanChecklist[index] = { ...d.ramadanChecklist[index], ...patch };
  }, () => {
    d.ramadanChecklist.splice(index, 1);
    saveState();
    renderRamadan();
  })));
  setField("#ramadanNotes", state.ramadanNotes || "", (value) => state.ramadanNotes = value);
  const taraweehHistory = state.ramadanTaraweehHistory || [];
  const taraweehToday = taraweehHistory.find((item) => item.date === activeDate);
  setField("#taraweehRakah", taraweehToday?.rakah || "", (value) => {
    const record = state.ramadanTaraweehHistory.find((item) => item.date === activeDate);
    if (record) record.rakah = value;
  });
  setField("#taraweehLocation", taraweehToday?.location || "", (value) => {
    const record = state.ramadanTaraweehHistory.find((item) => item.date === activeDate);
    if (record) record.location = value;
  });
  setField("#taraweehNotes", taraweehToday?.notes || "", (value) => {
    const record = state.ramadanTaraweehHistory.find((item) => item.date === activeDate);
    if (record) record.notes = value;
  });
  const taraweehBadge = document.querySelector("#taraweehStatusBadge");
  const taraweehButton = document.querySelector("#markTaraweehComplete");
  if (taraweehBadge) taraweehBadge.textContent = taraweehToday ? `${taraweehToday.rakah || "Taraweeh"} rak'ahs recorded` : "Not recorded";
  if (taraweehButton) taraweehButton.textContent = taraweehToday ? "Update Tonight's Taraweeh" : "Mark Taraweeh Complete";
  const taraweehPercent = Math.min(100, taraweehHistory.length / 30 * 100);
  const taraweehProgress = document.querySelector("#taraweehProgressBar");
  if (taraweehProgress) taraweehProgress.style.width = `${taraweehPercent}%`;
  const taraweehSummary = document.querySelector("#taraweehHistorySummary");
  if (taraweehSummary) taraweehSummary.textContent = taraweehHistory.length
    ? `${taraweehHistory.length} night${taraweehHistory.length === 1 ? "" : "s"} recorded. Keep the worship honest and consistent.`
    : "No Taraweeh nights recorded yet.";
  renderHijriCalendar(hijri);
  const savedList = document.querySelector("#taraweehSavedList");
  if (savedList) {
    savedList.innerHTML = "";
    taraweehHistory.slice(0, 12).forEach((item) => {
      const row = document.createElement("article");
      row.innerHTML = `<div><small>${escapeHtml(item.date)}</small><strong>${escapeHtml(item.rakah || "8")} rak'ahs</strong><span>${escapeHtml(item.location || "Location not set")}</span></div><p>${escapeHtml(item.notes || "No reflection saved.")}</p><div class="taraweeh-row-actions"><button class="ghost-btn compact-action" data-edit-taraweeh="${escapeHtml(item.date)}" type="button">Update</button><button class="danger-btn compact-action" data-delete-taraweeh="${escapeHtml(item.date)}" type="button">Delete</button></div>`;
      row.querySelector("[data-edit-taraweeh]")?.addEventListener("click", () => {
        activeDate = item.date;
        updateDateInput();
        renderRamadan();
        document.querySelector("#taraweehRakah")?.focus();
      });
      row.querySelector("[data-delete-taraweeh]")?.addEventListener("click", () => deleteTaraweehRecord(item.date));
      savedList.append(row);
    });
  }
}

function renderHijriCalendar(hijri) {
  const months = [
    ["Muharram", "Muharram"], ["Safar", "Safar"], ["Rabi al-Awwal", "Rabi I"], ["Rabi al-Thani", "Rabi II"],
    ["Jumada al-Awwal", "Jumada I"], ["Jumada al-Thani", "Jumada II"], ["Rajab", "Rajab"], ["Sha'ban", "Shaban"],
    ["Ramadan", "Ramadan"], ["Shawwal", "Shawwal"], ["Dhu al-Qadah", "Dhul Qadah"], ["Dhu al-Hijjah", "Dhul Hijjah"]
  ];
  const grid = document.querySelector("#hijriMonthGrid");
  const view = document.querySelector("#hijriCalendarView");
  const current = Number(hijri?.month?.number || 0);
  if (grid) {
    grid.innerHTML = "";
    months.forEach(([name, short], index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = `hijri-month-card${index + 1 === current ? " is-current" : ""}`;
      card.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${name}</strong><small>${short}</small>`;
      card.addEventListener("click", () => {
        if (view) view.innerHTML = `<strong>${name}</strong><p>Month ${index + 1} of the Hijri year. Use trusted local moon-sighting guidance for exact month boundaries.</p>`;
      });
      grid.append(card);
    });
  }
  const badge = document.querySelector("#hijriCurrentMonth");
  if (badge) badge.textContent = hijri ? `${hijri.day} ${hijri.month?.en || ""} ${hijri.year}` : "Load prayer times";
  if (view) view.innerHTML = hijri
    ? `<strong>Today: ${escapeHtml(String(hijri.day))} ${escapeHtml(hijri.month?.en || "Hijri month")} ${escapeHtml(String(hijri.year))}</strong><p>The Hijri date updates with live prayer-time data.</p>`
    : "<strong>Hijri date not loaded.</strong><p>Load prayer times in Faith Hub to update the calendar.</p>";
}

function saveTaraweehRecord() {
  state.ramadanTaraweehHistory = Array.isArray(state.ramadanTaraweehHistory) ? state.ramadanTaraweehHistory : [];
  let record = state.ramadanTaraweehHistory.find((item) => item.date === activeDate);
  if (!record) {
    record = { id: `${Date.now()}`, date: activeDate, rakah: "", location: "", notes: "", completedAt: "" };
    state.ramadanTaraweehHistory.unshift(record);
  }
  record.rakah = document.querySelector("#taraweehRakah")?.value || record.rakah || "8";
  record.location = document.querySelector("#taraweehLocation")?.value || "";
  record.notes = document.querySelector("#taraweehNotes")?.value || "";
  record.completedAt = new Date().toISOString();
  forceSaveState();
  renderRamadan();
}

function deleteTaraweehRecord(date) {
  if (!date) return;
  if (!confirm(`Delete Taraweeh record for ${date}?`)) return;
  state.ramadanTaraweehHistory = (state.ramadanTaraweehHistory || []).filter((item) => item.date !== date);
  forceSaveState();
  renderRamadan();
}

function renderRealPrayerTimes() {
  const wrap = document.querySelector("#realPrayerTimes");
  if (!wrap) return;
  updatePrayerTimeFormatButtons();
  wrap.innerHTML = "";
  const times = state.prayerTimes?.timings;
  if (!times) {
    fillStatus("#realPrayerTimes", ["Press Load Prayer Times to fetch current local prayer times."]);
    return;
  }
  ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"].forEach((name) => {
    const row = document.createElement("div");
    row.className = "status-pill";
    row.innerHTML = `<strong>${name}</strong><span>${formatPrayerDisplayTime(times[name])}</span>`;
    wrap.append(row);
  });
  if (state.prayerTimes.date) {
    const note = document.createElement("p");
    note.className = "muted";
    note.textContent = `Updated for ${state.prayerLocation.city}, ${state.prayerLocation.country} on ${state.prayerTimes.date}.`;
    wrap.append(note);
  }
}

async function loadPrayerTimes() {
  const city = state.prayerLocation?.city || "New York";
  const country = state.prayerLocation?.country || "United States";
  const wrap = document.querySelector("#realPrayerTimes");
  if (wrap) fillStatus("#realPrayerTimes", ["Loading prayer times..."]);
  try {
    const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=2`;
    const response = await fetch(url);
    const json = await response.json();
    if (!response.ok || !json.data?.timings) throw new Error("Could not load prayer times.");
    state.prayerTimes = {
      date: json.data.date?.readable || new Date().toLocaleDateString(),
      timings: json.data.timings,
      hijri: json.data.date?.hijri || null,
      timezone: json.data.meta?.timezone || "",
      fetchedOn: todayKey()
    };
    saveState();
    renderRealPrayerTimes();
    renderRamadan();
    renderDashboard();
  } catch (error) {
    fillStatus("#realPrayerTimes", [`Prayer times unavailable: ${error.message}`]);
  }
}

function setField(selector, value, onInput) {
  const el = document.querySelector(selector);
  if (document.activeElement !== el) el.value = value || "";
  el.oninput = () => {
    onInput(el.value);
    if (el.tagName === "TEXTAREA") autoGrow(el);
    saveState();
  };
}

function renderSuggestions() {
  fillList("#todaySuggestions", randomPick(suggestionBank.today, 4));
  fillList("#studySuggestions", randomPick(suggestionBank.study, 4));
  fillList("#lifeSuggestions", randomPick(suggestionBank.life, 4));
}

function randomPick(items, count) {
  return [...items].sort(() => Math.random() - 0.5).slice(0, count);
}

function fillList(selector, items) {
  const list = document.querySelector(selector);
  list.innerHTML = "";
  items.forEach((text) => {
    const li = document.createElement("li");
    li.textContent = text;
    list.append(li);
  });
}

function renderMotivation() {
  const allMotivations = [...motivationBank, ...extraMotivations];
  const motivation = state.motivationSeed < allMotivations.length
    ? allMotivations[state.motivationSeed]
    : buildGeneratedMotivation();
  const dayIndex = new Date(activeDate).getDate();
  const mindset = powerPrinciples[(dayIndex + (state.quoteSeeds?.mindset || 0)) % powerPrinciples.length];
  const famous = famousQuotes[(dayIndex + (state.quoteSeeds?.famous || 0)) % famousQuotes.length];
  const islamic = islamicQuotes[(dayIndex + (state.quoteSeeds?.islamic || 0)) % islamicQuotes.length];
  const powerStart = (dayIndex + (state.quoteSeeds?.power || 0)) % powerLaws.length;
  document.querySelector("#motivationPageText").textContent = motivation;
  document.querySelector("#motivationPageMindset").textContent = mindset;
  document.querySelector("#motivationPageFamous").textContent = famous;
  document.querySelector("#motivationPageIslamic").textContent = islamic;
  fillStatus("#motivationPowerLaws", Array.from({ length: 6 }, (_, index) => powerLaws[(powerStart + index) % powerLaws.length]));
  state.recommendationSeeds = { books: 0, movies: 0, songs: 0, podcasts: 0, ...(state.recommendationSeeds || {}) };
  renderRecommendationList("#bookRecommendations", motivationRecommendations.books, state.recommendationSeeds.books);
  renderRecommendationList("#movieRecommendations", motivationRecommendations.movies, state.recommendationSeeds.movies);
  renderRecommendationList("#songRecommendations", motivationRecommendations.songs, state.recommendationSeeds.songs);
  renderRecommendationList("#podcastRecommendations", motivationRecommendations.podcasts, state.recommendationSeeds.podcasts);
}

function renderRecommendationList(selector, items, offset = 0) {
  const wrap = document.querySelector(selector);
  if (!wrap) return;
  wrap.innerHTML = "";
  const rotated = items.map((_, index) => items[(index + offset) % items.length]).slice(0, 4);
  rotated.forEach((item) => {
    const card = document.createElement("a");
    card.className = "recommendation-item";
    card.href = item.url;
    card.target = "_blank";
    card.rel = "noreferrer";
    card.innerHTML = `
      <strong>${item.title}</strong>
      <span>${item.creator}</span>
      <p>${item.note}</p>
    `;
    wrap.append(card);
  });
}

function cleanCommandValue(value = "") {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function extractAfterKeyword(text, keyword) {
  const match = text.match(new RegExp(`${keyword}\\s+(.+?)(?=\\s+(?:class|due|priority|status|note|room|teacher|days|time|amount|category|when|mood|tags|date|from|to|goal|method|type|title)\\b|$)`, "i"));
  return cleanCommandValue(match?.[1] || "");
}

function parseAssistantDate(text) {
  const lower = text.toLowerCase();
  const isoDate = text.match(/\b(20\d{2}-\d{2}-\d{2})(?:[ t](\d{1,2}:\d{2}))?\b/i);
  if (isoDate) return isoDate[2] ? `${isoDate[1]}T${isoDate[2]}` : isoDate[1];
  const timeMatch = text.match(/\b(\d{1,2})(?::(\d{2}))?\s*(am|pm)\b/i);
  const date = new Date();
  if (lower.includes("tomorrow")) date.setDate(date.getDate() + 1);
  if (lower.includes("next week")) date.setDate(date.getDate() + 7);
  if (timeMatch) {
    let hour = Number(timeMatch[1]);
    const minute = Number(timeMatch[2] || 0);
    const period = timeMatch[3].toLowerCase();
    if (period === "pm" && hour < 12) hour += 12;
    if (period === "am" && hour === 12) hour = 0;
    date.setHours(hour, minute, 0, 0);
    return date.toISOString().slice(0, 16);
  }
  if (lower.includes("tomorrow") || lower.includes("next week")) return date.toISOString().slice(0, 10);
  return "";
}

function parseClassDays(text) {
  const dayPattern = "(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)";
  const range = text.match(new RegExp(`(?:from\\s+)?${dayPattern}\\s*(?:to|through|-|until)\\s*${dayPattern}`, "i"));
  if (range) return { startDay: normalizeWeekDay(range[1]), endDay: normalizeWeekDay(range[2]), selectedDays: [], dayMode: "Day range" };
  const days = [...text.matchAll(new RegExp(dayPattern, "ig"))].map((match) => normalizeWeekDay(match[1])).filter(Boolean);
  const uniqueDays = weekDays.filter((day) => days.includes(day));
  return { startDay: uniqueDays[0] || "", endDay: uniqueDays[1] || uniqueDays[0] || "", selectedDays: uniqueDays, dayMode: uniqueDays.length > 1 ? "Selected days" : "Day range" };
}

function parseClassTimes(text) {
  const timePattern = "(\\d{1,2}(?::\\d{2})?\\s*(?:am|pm))";
  const range = text.match(new RegExp(`(?:from\\s+)?${timePattern}\\s*(?:to|through|-|until)\\s*${timePattern}`, "i"));
  if (range) return { startTime: range[1], endTime: range[2] };
  const times = [...text.matchAll(new RegExp(timePattern, "ig"))].map((match) => match[1]);
  return { startTime: times[0] || "", endTime: times[1] || "" };
}

function parseClassRecurrence(text) {
  const lower = text.toLowerCase();
  if (/\bdaily\b|\bevery day\b/.test(lower)) return "Daily";
  if (/\bmonthly\b|\bevery month\b/.test(lower)) return "Monthly";
  if (/\bone time\b|\bonce\b/.test(lower)) return "One time";
  return "Weekly";
}

function parseClassDateWindow(text) {
  const start = text.match(/\b(?:starts?|begin|begins|starting)\s+(?:on\s+)?(20\d{2}-\d{2}-\d{2})/i);
  const end = text.match(/\b(?:ends?|until|through)\s+(?:on\s+)?(20\d{2}-\d{2}-\d{2})/i);
  return { startsOn: start?.[1] || "", endsOn: end?.[1] || "" };
}

function titleFromCommand(text, removeWords = []) {
  let value = text.replace(/^(please\s+)?add\s+(a\s+|an\s+|new\s+)?(class|assignment|task|reminder|bill|workout)\b/i, "");
  removeWords.forEach((word) => {
    value = value.replace(new RegExp(`\\s+${word}\\s+.+?(?=\\s+(?:class|due|priority|status|note|room|teacher|days|time|amount|category|when)\\b|$)`, "ig"), "");
  });
  value = value.replace(/\b(20\d{2}-\d{2}-\d{2})(?:[ t]\d{1,2}:\d{2})?\b/g, "");
  value = value.replace(/\b(tomorrow|next week)\b/ig, "");
  value = value.replace(/\b\d{1,2}(?::\d{2})?\s*(am|pm)\b/ig, "");
  return cleanCommandValue(value) || "New item";
}

function runAssistantCommand(rawCommand) {
  const command = cleanCommandValue(rawCommand);
  const lower = command.toLowerCase();
  if (!command) return { text: "Write a command first.", page: "", actions: [] };

  if (/\bclass\b/.test(lower) && /\badd\b/.test(lower)) {
    const parsedDays = parseClassDays(command);
    const parsedTimes = parseClassTimes(command);
    const parsedDates = parseClassDateWindow(command);
    const recurrence = parseClassRecurrence(command);
    const args = {
      name: titleFromCommand(command, ["time", "room", "teacher", "days", "from"]),
      recurrence,
      dayMode: parsedDays.dayMode,
      startDay: parsedDays.startDay,
      endDay: parsedDays.endDay,
      selectedDays: parsedDays.selectedDays,
      startsOn: parsedDates.startsOn || activeDate,
      endsOn: parsedDates.endsOn,
      monthlyDay: recurrence === "Monthly" ? String(new Date(`${parsedDates.startsOn || activeDate}T12:00:00`).getDate()) : "",
      startTime: parsedTimes.startTime,
      endTime: parsedTimes.endTime,
      time: extractAfterKeyword(command, "time") || `${parsedTimes.startTime}${parsedTimes.endTime ? ` - ${parsedTimes.endTime}` : ""}`.trim(),
      room: extractAfterKeyword(command, "room"),
      teacher: extractAfterKeyword(command, "teacher"),
      days: extractAfterKeyword(command, "days") || `${parsedDays.startDay}${parsedDays.endDay && parsedDays.endDay !== parsedDays.startDay ? ` - ${parsedDays.endDay}` : ""}`.trim()
    };
    return { text: `Ready to add ${args.name} to School Command.`, page: "study", actions: [{ name: "add_class", arguments: args }], source: "local" };
  }

  if (/\bassignment\b/.test(lower) && /\badd\b/.test(lower)) {
    const courseworkType = ["Homework", "Presentation", "Project", "Paper", "Lab"].find((type) => lower.includes(type.toLowerCase())) || "Assignment";
    const args = {
      title: titleFromCommand(command, ["class", "due", "priority", "status", "note"]),
      type: courseworkType,
      className: extractAfterKeyword(command, "class"),
      due: extractAfterKeyword(command, "due") || parseAssistantDate(command),
      priority: cleanCommandValue(extractAfterKeyword(command, "priority") || "Medium").replace(/^./, (char) => char.toUpperCase()),
      status: extractAfterKeyword(command, "status") || "Not started",
      note: extractAfterKeyword(command, "note")
    };
    return { text: `Ready to add assignment: ${args.title}.`, page: "study", actions: [{ name: "add_assignment", arguments: args }], source: "local" };
  }

  if (/\btask\b/.test(lower) && /\badd\b/.test(lower)) {
    const args = {
      title: titleFromCommand(command, ["due", "priority", "status", "note"]),
      due: extractAfterKeyword(command, "due") || parseAssistantDate(command) || activeDate,
      priority: extractAfterKeyword(command, "priority") || "Medium",
      status: extractAfterKeyword(command, "status") || "Backlog",
      note: extractAfterKeyword(command, "note"),
      category: /\bschool\b/.test(lower) ? "School" : "General"
    };
    return { text: `Ready to add task: ${args.title}.`, page: "tasks", actions: [{ name: "add_task", arguments: args }], source: "local" };
  }

  if (/\breminder\b/.test(lower) && /\badd\b/.test(lower)) {
    const args = {
      text: titleFromCommand(command, ["when", "note"]),
      when: extractAfterKeyword(command, "when") || parseAssistantDate(command) || new Date(Date.now() + 3600000).toISOString().slice(0, 16),
      status: "Open",
      note: extractAfterKeyword(command, "note")
    };
    return { text: `Ready to add reminder: ${args.text}.`, page: "reminders", actions: [{ name: "add_reminder", arguments: args }], source: "local" };
  }

  if (/\bbill\b/.test(lower) && /\badd\b/.test(lower)) {
    const amountMatch = command.match(/\$?\b(\d+(?:\.\d{1,2})?)\b/);
    const args = {
      name: titleFromCommand(command, ["amount", "due", "category", "note"]),
      amount: extractAfterKeyword(command, "amount") || amountMatch?.[1] || "",
      due: extractAfterKeyword(command, "due") || "",
      category: extractAfterKeyword(command, "category") || "Bill",
      note: extractAfterKeyword(command, "note")
    };
    return { text: `Ready to add bill: ${args.name}.`, page: "bills", actions: [{ name: "add_bill", arguments: args }], source: "local" };
  }

  if (/\bworkout\b/.test(lower) && /\badd\b/.test(lower)) {
    const args = { text: titleFromCommand(command, ["note"]), note: extractAfterKeyword(command, "note") };
    return { text: `Ready to add workout: ${args.text}.`, page: "workout", actions: [{ name: "add_workout", arguments: args }], source: "local" };
  }

  if (/\bprayer\b/.test(lower) && /\b(mark|complete|done)\b/.test(lower)) {
    const prayer = prayers.find((name) => lower.includes(name.toLowerCase()));
    if (prayer) return { text: `Ready to mark ${prayer} complete.`, page: "faith", actions: [{ name: "mark_prayer_done", arguments: { prayer, note: extractAfterKeyword(command, "note") } }], source: "local" };
  }

  if (/\bjournal\b/.test(lower) && /\badd\b/.test(lower)) {
    const titleMatch = command.match(/\btitled?\s+(.+?)(?::|\s+mood\b|\s+tags\b|$)/i);
    const mood = extractAfterKeyword(command, "mood") || "Reflective";
    const tags = extractAfterKeyword(command, "tags");
    const text = cleanCommandValue(command.split(":").slice(1).join(":")) || cleanCommandValue(command.replace(/^(please\s+)?add\s+(a\s+)?journal\s+entry/i, ""));
    return {
      text: "Ready to save a journal entry.",
      page: "life",
      actions: [{ name: "add_journal_entry", arguments: { title: titleMatch?.[1] || "Journal Entry", text, mood, tags, date: activeDate } }],
      source: "local"
    };
  }

  if (/\b(mark|set)\b.*\bbill\b.*\bpaid\b/.test(lower)) {
    const name = cleanCommandValue(command.replace(/\b(mark|set|bill|paid|as)\b/ig, " "));
    return { text: `Ready to mark ${name || "the matching bill"} paid.`, page: "bills", actions: [{ name: "mark_bill_paid", arguments: { name } }], source: "local" };
  }

  if (/\b(plan today|next three actions|open tasks)\b/.test(lower)) {
    const openTasks = (state.tasks || []).filter((item) => !/done|complete/i.test(item.status || "")).slice(0, 3);
    const openAssignments = (state.assignments || []).filter((item) => !/done|complete/i.test(item.status || "")).slice(0, 2);
    const unpaidBills = (state.bills || []).filter((item) => !item.paid).slice(0, 2);
    const priorities = [
      ...openAssignments.map((item) => `Assignment: ${item.title}${item.due ? ` due ${item.due}` : ""}`),
      ...openTasks.map((item) => `Task: ${item.title}${item.due ? ` due ${item.due}` : ""}`),
      ...unpaidBills.map((item) => `Bill: ${item.name}${item.due ? ` due ${item.due}` : ""}`)
    ].slice(0, 3);
    return {
      text: priorities.length ? `Today's next actions: ${priorities.join("; ")}.` : "No open task, assignment, or bill priority is recorded. Add the next concrete action, then schedule a focused work block.",
      page: "dashboard",
      actions: [],
      source: "local"
    };
  }

  if (/\b(study plan|study planner|developer learning)\b/.test(lower)) {
    const assignment = (state.assignments || []).find((item) => !/done|complete/i.test(item.status || ""));
    const studyBlock = (state.studyBlocks || []).find((item) => !/done|complete/i.test(item.status || ""));
    const className = normalizeClassItem((state.classes || [])[0] || {}).name;
    const steps = [
      assignment ? `Finish ${assignment.title}${assignment.due ? ` before ${assignment.due}` : ""}` : `Review the next lesson for ${className || "your priority class"}`,
      studyBlock ? `Complete the planned block: ${studyBlock.subject || "Study"} ${studyBlock.topic || ""}`.trim() : "Create one 60-90 minute deep-work block",
      "End with 20 minutes of full-stack or Java practice and record what you built"
    ];
    return { text: `Study plan: ${steps.join("; ")}.`, page: "study", actions: [], source: "local" };
  }

  if (/\b(money review|unpaid bills|savings goals)\b/.test(lower)) {
    const unpaid = (state.bills || []).filter((item) => !item.paid);
    const unpaidTotal = unpaid.reduce((sum, item) => sum + Number(item.amount || 0), 0);
    const saved = (state.savings?.deposits || []).reduce((sum, item) => sum + (item.type === "Withdrawal" ? -1 : 1) * Number(item.amount || 0), 0);
    return {
      text: `Money review: ${unpaid.length} unpaid bill${unpaid.length === 1 ? "" : "s"} totaling ${money(unpaidTotal)}; recorded savings balance ${money(saved)}. Pay the nearest due bill first, protect minimum payments, then move a fixed amount to the highest-priority savings goal.`,
      page: "money",
      actions: [],
      source: "local"
    };
  }

  if (/\b(wellness check|health.*sleep|discipline.*workout)\b/.test(lower)) {
    const latestSleep = state.health?.sleepSessions?.[0];
    const sleepText = latestSleep ? `${latestSleep.quality || "recorded"} sleep` : "no sleep session recorded";
    const workout = (state.workouts || []).find((item) => item.date === activeDate || recordDate(item.startedAt) === activeDate);
    const prayerDone = prayers.filter((name) => day().prayers?.[name]?.done).length;
    return {
      text: `Wellness check: ${sleepText}, ${workout ? "today's workout is recorded" : "no workout is recorded today"}, and ${prayerDone}/5 prayers are complete. Protect the next prayer, drink water, eat a protein-centered meal, and complete either the planned workout or a 20-minute busy-day minimum.`,
      page: "health",
      actions: [],
      source: "local"
    };
  }

  return {
    text: "The local assistant could not confidently structure that request. Connect the secure Assistant API for planning, summaries, and broader multi-step commands.",
    page: "",
    actions: [],
    source: "local"
  };
}

function showAssistantResult(result) {
  fillStatus("#assistantResult", [{ text: result.text, source: "GPT Assistant", page: result.page }]);
}

const assistantActionMeta = {
  add_class: { icon: "CL", label: "Add class", page: "study" },
  add_assignment: { icon: "AS", label: "Add assignment", page: "study" },
  add_task: { icon: "TK", label: "Add task", page: "tasks" },
  add_reminder: { icon: "RM", label: "Add reminder", page: "reminders" },
  add_bill: { icon: "$", label: "Add bill", page: "bills" },
  mark_bill_paid: { icon: "PD", label: "Mark bill paid", page: "bills" },
  add_workout: { icon: "WO", label: "Add workout", page: "workout" },
  add_manual_workout: { icon: "MW", label: "Save manual workout", page: "workoutHistory" },
  add_journal_entry: { icon: "JR", label: "Save journal entry", page: "history" },
  create_study_block: { icon: "SB", label: "Create study block", page: "studyWorkspace" },
  create_daily_schedule: { icon: "SC", label: "Create schedule blocks", page: "schedule" },
  add_todo_item: { icon: "TD", label: "Add to-do", page: "todos" },
  add_important_date: { icon: "DT", label: "Add important date", page: "importantDates" },
  add_alarm: { icon: "AL", label: "Add alarm", page: "alarms" },
  add_countdown: { icon: "CD", label: "Add countdown", page: "countdowns" },
  add_money_transaction: { icon: "TX", label: "Add money transaction", page: "money" },
  add_savings_goal: { icon: "SG", label: "Add savings goal", page: "savings" },
  add_savings_deposit: { icon: "SD", label: "Add savings deposit", page: "savings" },
  add_learning_site: { icon: "LS", label: "Add learning site", page: "learningSites" },
  add_roadmap_step: { icon: "RD", label: "Add roadmap step", page: "settings" },
  update_profile: { icon: "PF", label: "Update profile", page: "settings" },
  mark_prayer_done: { icon: "PR", label: "Complete prayer", page: "faith" },
  add_quran_reflection: { icon: "QR", label: "Save Quran reflection", page: "quran" },
  log_sleep: { icon: "SL", label: "Log sleep", page: "health" }
};

function assistantActionSummary(action) {
  const args = action?.arguments || {};
  const preferred = args.title || args.name || args.text || args.subject || args.prayer || args.surah || args.label || args.phase;
  const details = Object.entries(args)
    .filter(([, value]) => value !== "" && value !== undefined && value !== null)
    .slice(0, 4)
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(", ") : value}`)
    .join(" | ");
  return preferred ? `${preferred}${details ? ` - ${details}` : ""}` : details || "No additional details";
}

function renderAssistantPreview(result) {
  pendingAssistantActions = Array.isArray(result.actions) ? result.actions : [];
  pendingAssistantMessage = result.text || "";
  const panel = document.querySelector("#assistantPreview");
  const list = document.querySelector("#assistantPreviewList");
  if (!panel || !list) return;
  if (!pendingAssistantActions.length) {
    panel.hidden = true;
    return;
  }
  panel.hidden = false;
  document.querySelector("#assistantPreviewCount").textContent = `${pendingAssistantActions.length} action${pendingAssistantActions.length === 1 ? "" : "s"}`;
  document.querySelector("#assistantPreviewMessage").textContent = pendingAssistantMessage || "Review these changes before saving.";
  list.innerHTML = "";
  pendingAssistantActions.forEach((action) => {
    const meta = assistantActionMeta[action.name] || { icon: "AI", label: action.name.replaceAll("_", " "), page: "dashboard" };
    const item = document.createElement("article");
    item.className = "assistant-preview-item";
    item.innerHTML = `<span aria-hidden="true">${escapeHtml(meta.icon)}</span><div><strong>${escapeHtml(meta.label)}</strong><small>${escapeHtml(assistantActionSummary(action))}</small></div>`;
    list.append(item);
  });
}

function clearAssistantPreview() {
  pendingAssistantActions = [];
  pendingAssistantMessage = "";
  const panel = document.querySelector("#assistantPreview");
  if (panel) panel.hidden = true;
}

function addAssistantHistory(command, status, detail) {
  state.assistantHistory = Array.isArray(state.assistantHistory) ? state.assistantHistory : [];
  state.assistantHistory.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    command: cleanCommandValue(command),
    status,
    detail: cleanCommandValue(detail),
    createdAt: new Date().toISOString()
  });
  state.assistantHistory = state.assistantHistory.slice(0, 30);
  forceSaveState();
  renderAssistantHistory();
}

function renderAssistantHistory() {
  const wrap = document.querySelector("#assistantHistoryList");
  const count = document.querySelector("#assistantHistoryCount");
  if (!wrap || !count) return;
  const entries = Array.isArray(state.assistantHistory) ? state.assistantHistory : [];
  count.textContent = String(entries.length);
  wrap.innerHTML = "";
  if (!entries.length) {
    wrap.innerHTML = '<div class="assistant-command-empty">No AI activity yet.</div>';
    return;
  }
  entries.slice(0, 8).forEach((entry) => {
    const item = document.createElement("article");
    item.className = "assistant-history-item";
    const when = entry.createdAt ? new Date(entry.createdAt).toLocaleString([], { dateStyle: "short", timeStyle: "short" }) : "";
    item.innerHTML = `<strong>${escapeHtml(entry.command || entry.detail || "Assistant action")}</strong><small>${escapeHtml(`${entry.status || "Ready"}${when ? ` | ${when}` : ""}${entry.detail ? ` | ${entry.detail}` : ""}`)}</small>`;
    wrap.append(item);
  });
}

const assistantCommandSuggestions = [
  { group: "School", icon: "CL", title: "Add a class", command: "Add class Java Programming Monday Wednesday from 9:00 AM to 10:15 AM room B12 teacher Khan starts 2026-06-08 ends 2026-12-20" },
  { group: "School", icon: "AS", title: "Add an assignment", command: "Add assignment Java final project due 2026-06-20 18:00 class Java priority high note submit source code and report" },
  { group: "School", icon: "DT", title: "Add an important date", command: "Add important date Java final exam for class Java on 2026-06-25 10:00 type Exam note bring student ID" },
  { group: "School", icon: "SB", title: "Create a study block", command: "Create a study block for Java arrays from 2026-06-08 19:00 to 2026-06-08 20:30 goal finish practice problems method Deep Work" },
  { group: "Planning", icon: "TK", title: "Add a task", command: "Add task finish portfolio due 2026-06-10 status Backlog note deploy to GitHub" },
  { group: "Planning", icon: "TD", title: "Add a to-do item", command: "Add buy groceries to my Personal to-do list" },
  { group: "Planning", icon: "RM", title: "Add a reminder", command: "Add reminder call the advisor tomorrow at 3:00 PM note ask about fall registration" },
  { group: "Planning", icon: "SC", title: "Create a daily schedule", command: "Create my schedule tomorrow: Java study at 9:00, gym at 11:00, lunch at 13:00, assignments at 14:00" },
  { group: "Planning", icon: "AL", title: "Add an alarm", command: "Add alarm at 07:00 labeled Wake up for Fajr and class" },
  { group: "Planning", icon: "CD", title: "Add a countdown", command: "Add countdown named Java Final Project targeting 2026-06-20 18:00" },
  { group: "Money", icon: "BL", title: "Add a bill", command: "Add bill Spectrum Internet amount 59.99 due 9 category Internet note monthly bill" },
  { group: "Money", icon: "PD", title: "Mark a bill paid", command: "Mark Spectrum Internet bill paid" },
  { group: "Money", icon: "TX", title: "Add a transaction", command: "Add expense transaction 45.50 today category Gas note Uber Eats driving" },
  { group: "Money", icon: "SG", title: "Create a savings goal", command: "Add savings goal Emergency Fund target 5000 current 400 deadline 2026-12-31 priority Essential" },
  { group: "Money", icon: "SD", title: "Record a savings deposit", command: "Add a 150 savings deposit today to Emergency Fund note weekly transfer" },
  { group: "Health", icon: "WO", title: "Add a workout", command: "Add workout Push Day note bench press, incline dumbbell press, shoulder press, and triceps" },
  { group: "Health", icon: "MW", title: "Log a completed workout", command: "Save manual workout Push Day on 2026-06-06 from 18:00 to 19:10 note completed all working sets" },
  { group: "Health", icon: "SL", title: "Log sleep", command: "Log sleep from 2026-06-05 23:30 to 2026-06-06 07:15 note woke up rested" },
  { group: "Life", icon: "JR", title: "Add a journal entry", command: "Add journal entry titled Weekly Reflection: I stayed consistent with prayer and study, but I need to improve sleep and planning." },
  { group: "Life", icon: "RD", title: "Add a roadmap step", command: "Add roadmap step phase Next: Build and publish three full-stack portfolio projects status Planned" },
  { group: "Life", icon: "PF", title: "Update profile", command: "Update my profile city New York school City Tech goal Become a full-stack developer" },
  { group: "Study", icon: "LS", title: "Add a learning site", command: "Add learning site freeCodeCamp URL https://www.freecodecamp.org/learn note full-stack practice" },
  { group: "Faith", icon: "PR", title: "Mark a prayer complete", command: "Mark Asr prayer done note prayed on time" },
  { group: "Faith", icon: "QR", title: "Add a Quran reflection", command: "Add Quran reflection Surah Al-Asr ayah 1-3 minutes 15 reflection Value time, faith, good deeds, truth, and patience." },
  { group: "Multi-step", icon: "AI", title: "Plan and create several items", command: "Add my Java class Monday and Wednesday from 9:00 to 10:15, add the final project due 2026-06-20 at 18:00 with high priority, and remind me one day before at 18:00." }
];

const assistantInformationGuide = [
  {
    hub: "School Command",
    icon: "SC",
    purpose: "Classes, assignments, important dates, school tasks, and study blocks.",
    fields: ["Class: name, professor, days, start time, end time, room, start date, end date", "Assignment: title, class, due date, due time, priority, note", "Important date: title, class, type, date, time, note", "School task: task, due date, status, note"],
    template: "Add class [name] [days] from [start time] to [end time] room [location] teacher [professor] starts [YYYY-MM-DD] ends [YYYY-MM-DD]"
  },
  {
    hub: "Life Hub",
    icon: "LF",
    purpose: "Tasks, reminders, schedules, alarms, countdowns, journal entries, links, and roadmap steps.",
    fields: ["Task: title, due date, status, note, School or General classification", "Reminder: title, date, time, note", "Journal: title, date, time, mood, entry, tags", "Saved URL: name, complete https:// URL, note"],
    template: "Add task [title] due [YYYY-MM-DD] status [Backlog/In Progress/Done] note [details]"
  },
  {
    hub: "Faith Hub",
    icon: "FH",
    purpose: "Prayer completion, Quran reading, reflections, Jummah, and Ramadan records.",
    fields: ["Prayer: prayer name, completion status, optional note", "Quran: surah, ayah range, minutes, reflection", "Jummah: mosque, khutbah time, completion, notes", "Ramadan: fast status, Quran progress, prayer and daily notes"],
    template: "Add Quran reflection Surah [name] ayah [range] minutes [number] reflection [lesson and action]"
  },
  {
    hub: "Health Hub",
    icon: "HL",
    purpose: "Sleep, health notes, wellness habits, nutrition, discipline, and workouts.",
    fields: ["Sleep: sleep time, wake time, quality, optional notes", "Workout: name, date, start time, end time or duration, exercises, sets, reps, notes", "Health note: date, energy, meals, water, mood, symptoms", "Discipline: start date, reason, trigger notes"],
    template: "Add workout [name] date [YYYY-MM-DD] from [start time] to [end time] exercises [exercise, sets x reps] note [energy and progress]"
  },
  {
    hub: "Study Hub",
    icon: "ST",
    purpose: "Self-directed learning, developer lessons, resources, projects, and focused study sessions.",
    fields: ["Study block: topic, date, start time, end time, goal, method", "Learning site: title, complete URL, purpose", "Developer progress: track, lesson, status, project note", "Java note: lesson or topic, note, completion"],
    template: "Create a study block for [topic] from [YYYY-MM-DD HH:MM] to [YYYY-MM-DD HH:MM] goal [result] method [method]"
  },
  {
    hub: "Money Hub",
    icon: "$",
    purpose: "Transactions, bills, savings goals, deposits, budgets, debt, and payoff planning.",
    fields: ["Transaction: income or expense, amount, date, category, note", "Bill: name, amount, due day or frequency, category, note", "Savings goal: name, target, current amount, deadline, priority", "Debt: creditor, balance, APR, minimum payment, due date"],
    template: "Add expense transaction [amount] on [YYYY-MM-DD] category [category] note [details]"
  },
  {
    hub: "History Hub",
    icon: "HS",
    purpose: "Saved page copies, journal history, daily archives, and previous activity.",
    fields: ["Use explicit Save actions to create permanent records", "Journal entries need date, time, mood, title, entry, and tags", "Daily activity is archived by its original date", "Use search dates and keywords to find older records"],
    template: "Add journal entry titled [title] mood [mood] tags [tags]: [complete entry]"
  },
  {
    hub: "Settings Hub",
    icon: "SE",
    purpose: "Profile, themes, page headers, dock, menus, autosave, import, export, and assistant connection.",
    fields: ["Profile: name, phone, email, school, major, city, emergency contact, goal, bio", "Appearance: background, accent, card, text, button, and navigation colors", "Assistant: backend API endpoint only; never place a private API key in browser code", "Data: export before reset or major changes"],
    template: "Update my profile city [city] school [school] goal [goal]"
  }
];

function renderAssistantInformationGuide() {
  const wrap = document.querySelector("#assistantInformationList");
  if (!wrap) return;
  wrap.innerHTML = "";
  assistantInformationGuide.forEach((guide) => {
    const details = document.createElement("details");
    details.className = "assistant-information-card";
    const summary = document.createElement("summary");
    summary.innerHTML = `<span aria-hidden="true">${escapeHtml(guide.icon)}</span><div><strong>${escapeHtml(guide.hub)}</strong><small>${escapeHtml(guide.purpose)}</small></div>`;
    const body = document.createElement("div");
    body.className = "assistant-information-body";
    const heading = document.createElement("h4");
    heading.textContent = "Information to include";
    const list = document.createElement("ul");
    guide.fields.forEach((field) => {
      const item = document.createElement("li");
      item.textContent = field;
      list.append(item);
    });
    const template = document.createElement("code");
    template.textContent = guide.template;
    const use = document.createElement("button");
    use.type = "button";
    use.className = "primary-btn compact-action";
    use.textContent = "Use This Template";
    use.addEventListener("click", () => {
      const commandBox = document.querySelector("#assistantCommand");
      commandBox.value = guide.template;
      autoGrow(commandBox);
      setAssistantInformationOpen(false);
      commandBox.focus();
    });
    body.append(heading, list, template, use);
    details.append(summary, body);
    wrap.append(details);
  });
}

function setAssistantInformationOpen(open) {
  const panel = document.querySelector("#assistantInformationPanel");
  const button = document.querySelector("#showInformationGuide");
  if (!panel || !button) return;
  panel.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
  if (open) {
    setAssistantSuggestionsOpen(false);
    renderAssistantInformationGuide();
  }
}

function renderAssistantCommandSuggestions(filter = "") {
  const wrap = document.querySelector("#assistantSuggestionList");
  if (!wrap) return;
  const query = String(filter || "").trim().toLowerCase();
  const matches = assistantCommandSuggestions.filter((item) =>
    [item.group, item.title, item.command].join(" ").toLowerCase().includes(query)
  );
  wrap.innerHTML = "";
  if (!matches.length) {
    const empty = document.createElement("div");
    empty.className = "assistant-command-empty";
    empty.textContent = "No matching commands. Try school, money, workout, prayer, or schedule.";
    wrap.append(empty);
    return;
  }
  [...new Set(matches.map((item) => item.group))].forEach((group) => {
    const section = document.createElement("section");
    section.className = "assistant-command-group";
    const heading = document.createElement("h4");
    heading.textContent = group;
    section.append(heading);
    matches.filter((item) => item.group === group).forEach((item) => {
      const button = document.createElement("button");
      button.type = "button";
      button.className = "assistant-command-option";
      button.innerHTML = `<span aria-hidden="true">${item.icon}</span><div><strong>${item.title}</strong><small>${item.command}</small></div>`;
      button.addEventListener("click", () => {
        const commandBox = document.querySelector("#assistantCommand");
        commandBox.value = item.command;
        autoGrow(commandBox);
        document.querySelector("#assistantSuggestionPanel").hidden = true;
        document.querySelector("#showCommandSuggestions").setAttribute("aria-expanded", "false");
        commandBox.focus();
      });
      section.append(button);
    });
    wrap.append(section);
  });
}

function setAssistantSuggestionsOpen(open) {
  const panel = document.querySelector("#assistantSuggestionPanel");
  const button = document.querySelector("#showCommandSuggestions");
  if (!panel || !button) return;
  panel.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
  if (open) {
    setAssistantInformationOpen(false);
    const search = document.querySelector("#assistantSuggestionSearch");
    renderAssistantCommandSuggestions(search?.value || "");
    setTimeout(() => search?.focus(), 40);
  }
}

function assistantEndpoint() {
  const configured = String(state.assistantApiUrl || "").trim();
  if (configured) return configured;
  return window.location.protocol === "file:" ? "" : "/api/assistant";
}

function assistantSnapshot() {
  const profile = state.profile || {};
  const currentDay = day();
  return {
    activeDate,
    currentTime: new Date().toISOString(),
    profile: {
      name: profile.name || "Shahariar",
      city: profile.city || "",
      school: profile.school || "",
      grade: profile.grade || "",
      goal: profile.goal || ""
    },
    classes: state.classes.map(normalizeClassItem).slice(0, 12),
    assignments: state.assignments.slice(0, 12),
    tasks: state.tasks.slice(0, 12),
    bills: state.bills.map((bill) => ({ name: bill.name, amount: bill.amount, due: bill.due, paid: bill.paid })).slice(0, 30),
    reminders: state.reminders.slice(0, 12),
    studyBlocks: state.studyBlocks.slice(0, 8),
    today: {
      prayers: currentDay.prayers,
      schedule: currentDay.schedule,
      quran: currentDay.quran
    },
    recentWorkouts: (state.workouts || []).slice(0, 8).map((item) => ({
      name: item.text || item.program || "",
      date: item.date || recordDate(item.startedAt),
      durationMinutes: item.manualDurationMinutes || "",
      done: !!item.done
    })),
    savings: {
      goals: (state.savings?.goals || []).slice(0, 8),
      recentDeposits: (state.savings?.deposits || []).slice(0, 8)
    },
    privacy: "Credential vault, master password, phone, email, and private notes are excluded."
  };
}

async function runSmartAssistantCommand(command) {
  const endpoint = assistantEndpoint();
  if (!endpoint) return runAssistantCommand(command);
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ command, snapshot: assistantSnapshot() })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Assistant API failed.");
    return {
      text: data.message || data.rawText || "Assistant finished.",
      page: data.actions?.[0] ? (assistantActionMeta[data.actions[0].name]?.page || "dashboard") : "dashboard",
      actions: data.actions || [],
      source: "api"
    };
  } catch (error) {
    const fallback = runAssistantCommand(command);
    return {
      text: `Secure AI endpoint unavailable; local command planning was used. ${fallback.text}`,
      page: fallback.page,
      actions: fallback.actions || [],
      source: "local",
      error: error.message
    };
  }
}

function applyAssistantActions(actions) {
  const applied = [];
  actions.forEach((action) => {
    const args = action.arguments || {};
    switch (action.name) {
      case "add_class": {
        const item = normalizeClassItem({
          name: args.name,
          recurrence: args.recurrence || "Weekly",
          dayMode: args.dayMode || (args.selectedDays?.length ? "Selected days" : "Day range"),
          startDay: args.startDay,
          endDay: args.endDay,
          selectedDays: args.selectedDays || [],
          startsOn: args.startsOn || activeDate,
          endsOn: args.endsOn || "",
          monthlyDay: args.monthlyDay || "",
          startTime: args.startTime || "",
          endTime: args.endTime || "",
          room: args.room || "",
          teacher: args.teacher || ""
        });
        syncClassLegacyFields(item);
        state.classes.push(item);
        applied.push("class");
        break;
      }
      case "add_assignment":
        state.assignments.push({ title: args.title || "New assignment", type: args.type || "Assignment", className: args.className || "", due: args.due || "", priority: args.priority || "Medium", status: args.status || "Not started", note: args.note || "" });
        applied.push("assignment");
        break;
      case "add_task":
        state.tasks.push({ title: args.title || "New task", due: args.due || activeDate, priority: args.priority || "Medium", status: args.status || "Backlog", note: args.note || "", category: args.category || "General" });
        applied.push("task");
        break;
      case "add_reminder":
        state.reminders.push({ text: args.text || "Reminder", when: args.when || "", status: args.status || "Open", note: args.note || "" });
        applied.push("reminder");
        break;
      case "add_bill":
        state.bills.push({ paid: false, name: args.name || "New bill", amount: args.amount || "", due: args.due || "", category: args.category || "Bill", note: args.note || "" });
        applied.push("bill");
        break;
      case "mark_bill_paid": {
        const bill = state.bills.find((item) => String(item.name || "").toLowerCase().includes(String(args.name || "").toLowerCase()));
        if (bill) {
          bill.paid = true;
          applied.push("bill paid");
        }
        break;
      }
      case "add_workout":
        state.workouts.push({ text: args.text || "Workout", note: args.note || "", startedAt: "", endedAt: "", done: false });
        applied.push("workout");
        break;
      case "add_manual_workout": {
        const timing = manualWorkoutTiming(args.date || activeDate, args.startTime || "", args.endTime || "", args.durationMinutes || "");
        if (timing.error) break;
        state.workouts.unshift({
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          entryType: "manual",
          text: args.name || "Manual Workout",
          program: args.name || "Manual Workout",
          date: args.date || activeDate,
          startedAt: timing.startedAt,
          endedAt: timing.endedAt,
          manualDurationMinutes: timing.durationMinutes,
          note: args.notes || "",
          done: true,
          savedAt: new Date().toISOString()
        });
        applied.push("manual workout");
        break;
      }
      case "add_journal_entry": {
        const now = new Date();
        state.journalEntries.unshift({
          id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
          date: args.date || activeDate,
          time: args.time || now.toTimeString().slice(0, 5),
          mood: args.mood || "Reflective",
          title: args.title || "Journal Entry",
          text: args.text || "",
          tags: Array.isArray(args.tags) ? args.tags : String(args.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean),
          savedAt: now.toISOString()
        });
        applied.push("journal");
        break;
      }
      case "create_study_block":
        state.studyBlocks.push({ subject: args.subject || "Study", topic: args.topic || "", start: args.start || "", end: args.end || "", goal: args.goal || "", method: args.method || "Deep Work", status: "Planned" });
        applied.push("study block");
        break;
      case "create_daily_schedule":
        (args.items || []).forEach((item) => {
          if (item.time) day().schedule[item.time] = { title: item.title || "Planned block", status: item.status || "Open", note: item.note || "" };
        });
        applied.push("schedule");
        break;
      case "add_todo_item": {
        const title = args.listTitle || "Personal";
        let list = state.todoLists.find((item) => String(item.title || "").toLowerCase() === String(title).toLowerCase());
        if (!list) {
          list = { title, items: [] };
          state.todoLists.push(list);
        }
        list.items.push({ text: args.text || "New to-do", done: false });
        applied.push("to-do");
        break;
      }
      case "add_important_date":
        state.importantDates = state.importantDates || [];
        state.importantDates.push({ title: args.title || "Important date", className: args.className || "", when: args.when || "", type: args.type || "Deadline", status: "Upcoming", note: args.note || "" });
        applied.push("important date");
        break;
      case "add_alarm":
        state.alarms.push({ time: args.time || "09:00", label: args.label || "Alarm", enabled: true });
        applied.push("alarm");
        break;
      case "add_countdown":
        state.countdowns.push({ title: args.title || "Countdown", target: args.target || "", note: "" });
        applied.push("countdown");
        break;
      case "add_money_transaction":
        state.money.push({ date: args.date || activeDate, type: args.type || "Expense", category: args.category || "", amount: args.amount || "", note: args.note || "" });
        applied.push("money");
        break;
      case "add_savings_goal":
        state.savings.goals.push({
          id: savingsId(),
          name: args.name || "Savings Goal",
          target: args.target || "",
          current: args.current || "",
          deadline: args.deadline || "",
          priority: args.priority || "Growth",
          color: args.color || "#21d9b5"
        });
        applied.push("savings goal");
        break;
      case "add_savings_deposit": {
        const goal = state.savings.goals.find((item) => String(item.name || "").toLowerCase().includes(String(args.goalName || "").toLowerCase()));
        state.savings.deposits.unshift({
          id: savingsId(),
          date: args.date || activeDate,
          goalId: goal?.id || "",
          type: args.type || "Deposit",
          amount: args.amount || "",
          note: args.note || ""
        });
        applied.push("savings deposit");
        break;
      }
      case "add_learning_site":
        state.learningSites.push({ title: args.title || "Learning site", url: args.url || "https://", note: args.note || "", locked: false });
        applied.push("learning site");
        break;
      case "add_roadmap_step":
        state.roadmap.push({ phase: args.phase || "Next", text: args.text || "New roadmap step", status: args.status || "Planned" });
        applied.push("roadmap");
        break;
      case "update_profile":
        state.profile = { ...(state.profile || {}), ...Object.fromEntries(Object.entries(args).filter(([, value]) => value !== undefined && value !== "")) };
        applied.push("profile");
        break;
      case "mark_prayer_done": {
        const prayerName = prayers.find((name) => name.toLowerCase() === String(args.prayer || "").toLowerCase());
        if (prayerName) {
          day().prayers[prayerName] = { ...(day().prayers[prayerName] || {}), done: true, note: args.note || day().prayers[prayerName]?.note || "" };
          applied.push("prayer");
        }
        break;
      }
      case "add_quran_reflection":
        day().quran = { ...day().quran, surah: args.surah || day().quran.surah, ayah: args.ayah || day().quran.ayah, minutes: args.minutes || day().quran.minutes, reflection: args.reflection || day().quran.reflection };
        applied.push("quran");
        break;
      case "log_sleep": {
        const start = new Date(args.start);
        const end = new Date(args.end);
        if (!Number.isFinite(start.getTime()) || !Number.isFinite(end.getTime()) || end <= start) break;
        const quality = sleepRating(end - start);
        state.health.sleepSessions.unshift({ start: start.toISOString(), end: end.toISOString(), quality, note: args.note || "" });
        state.health.sleepQuality = quality;
        state.health.sleepTime = start.toTimeString().slice(0, 5);
        state.health.wakeTime = end.toTimeString().slice(0, 5);
        applied.push("sleep log");
        break;
      }
      default:
        break;
    }
  });
  if (applied.length) {
    saveState();
    renderAll();
  }
  return applied;
}

const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const classRepeatOptions = ["Daily", "Weekly", "Monthly", "One time"];
const classDayModes = ["Day range", "Selected days"];

function normalizeClassItem(item) {
  const value = typeof item === "string" ? { name: item } : { ...item };
  const parsedRange = parseStoredClassDays(value.days || "");
  const startDay = value.startDay || parsedRange.startDay || "";
  const endDay = value.endDay || parsedRange.endDay || startDay || "";
  const selectedDays = Array.isArray(value.selectedDays) && value.selectedDays.length
    ? value.selectedDays.map(normalizeWeekDay).filter(Boolean)
    : parsedRange.selectedDays.length ? parsedRange.selectedDays : (startDay ? [startDay] : []);
  return {
    name: value.name || "New Class",
    recurrence: value.recurrence || "Weekly",
    dayMode: value.dayMode || (selectedDays.length > 1 && startDay === endDay ? "Selected days" : "Day range"),
    startDay,
    endDay,
    selectedDays,
    startsOn: value.startsOn || "",
    endsOn: value.endsOn || "",
    monthlyDay: value.monthlyDay || "",
    startTime: value.startTime || value.time?.match(/\d{1,2}:\d{2}\s*(?:AM|PM)?|\d{1,2}\s*(?:AM|PM)/i)?.[0] || "",
    endTime: value.endTime || "",
    room: value.room || "",
    teacher: value.teacher || "",
    status: value.status || "Active",
    days: value.days || "",
    time: value.time || ""
  };
}

function parseStoredClassDays(daysText) {
  const text = String(daysText || "");
  const dayMatches = weekDays.filter((dayName) => new RegExp(`\\b${dayName.slice(0, 3)}\\w*\\b`, "i").test(text));
  const range = text.match(/\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b\s*(?:to|through|-|until)\s*\b(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Mon|Tue|Wed|Thu|Fri|Sat|Sun)\b/i);
  if (range) return { startDay: normalizeWeekDay(range[1]), endDay: normalizeWeekDay(range[2]), selectedDays: [] };
  return { startDay: dayMatches[0] || "", endDay: dayMatches[0] || "", selectedDays: dayMatches };
}

function normalizeWeekDay(value) {
  return weekDays.find((dayName) => dayName.toLowerCase().startsWith(String(value || "").slice(0, 3).toLowerCase())) || "";
}

function classDayRange(classItem) {
  if (classItem.dayMode === "Selected days" && classItem.selectedDays?.length) {
    return weekDays.filter((dayName) => classItem.selectedDays.includes(dayName));
  }
  const start = weekDays.findIndex((dayName) => dayName === normalizeWeekDay(classItem.startDay));
  const end = weekDays.findIndex((dayName) => dayName === normalizeWeekDay(classItem.endDay || classItem.startDay));
  if (start < 0) return classItem.days ? [classItem.days] : [];
  if (end < 0 || end === start) return [weekDays[start]];
  if (end > start) return weekDays.slice(start, end + 1);
  return [...weekDays.slice(start), ...weekDays.slice(0, end + 1)];
}

function classTimeLabel(classItem) {
  if (classItem.startTime && classItem.endTime) return `${classItem.startTime} - ${classItem.endTime}`;
  return classItem.startTime || classItem.time || "Time not set";
}

function classScheduleSummary(classItem) {
  const repeat = classItem.recurrence || "Weekly";
  const days = repeat === "Daily"
    ? "Every day"
    : repeat === "Monthly"
      ? `Monthly${classItem.monthlyDay ? ` on day ${classItem.monthlyDay}` : ""}`
      : repeat === "One time"
        ? "One time"
        : classDayRange(classItem).join(", ") || classItem.days || "Days not set";
  const dateWindow = [
    classItem.startsOn ? `starts ${classItem.startsOn}` : "",
    classItem.endsOn ? `ends ${classItem.endsOn}` : ""
  ].filter(Boolean).join(", ");
  return `${repeat} | ${days} | ${classTimeLabel(classItem)}${dateWindow ? ` | ${dateWindow}` : ""}`;
}

function classOccursOnActiveDate(classItem) {
  const date = new Date(`${activeDate}T12:00:00`);
  if (classItem.startsOn && activeDate < classItem.startsOn) return false;
  if (classItem.endsOn && activeDate > classItem.endsOn) return false;
  if (classItem.recurrence === "Daily") return true;
  if (classItem.recurrence === "Monthly") {
    const monthlyDay = Number(classItem.monthlyDay || new Date(`${classItem.startsOn || activeDate}T12:00:00`).getDate());
    return date.getDate() === monthlyDay;
  }
  if (classItem.recurrence === "One time") return !classItem.startsOn || activeDate === classItem.startsOn;
  const dayName = date.toLocaleDateString(undefined, { weekday: "long" });
  return classDayRange(classItem).some((day) => dayName.toLowerCase().startsWith(String(day).slice(0, 3).toLowerCase()));
}

function defaultClassItem() {
  return {
    name: "New Class",
    recurrence: "Weekly",
    dayMode: "Day range",
    startDay: "Monday",
    endDay: "Monday",
    selectedDays: ["Monday"],
    startsOn: activeDate,
    endsOn: "",
    monthlyDay: "",
    startTime: "09:00",
    endTime: "10:00",
    time: "09:00 - 10:00",
    room: "",
    teacher: "",
    status: "Active",
    days: "Monday"
  };
}

function syncClassLegacyFields(classItem) {
  classItem.selectedDays = classItem.selectedDays?.length ? classItem.selectedDays : classDayRange(classItem);
  classItem.days = classItem.recurrence === "Weekly" ? classDayRange(classItem).join(", ") : classScheduleSummary(classItem);
  classItem.time = classTimeLabel(classItem);
  if (classItem.recurrence === "Monthly" && !classItem.monthlyDay) {
    classItem.monthlyDay = String(new Date(`${classItem.startsOn || activeDate}T12:00:00`).getDate());
  }
}

function classAdvancedEditor(classItem) {
  const fragment = document.createDocumentFragment();
  const summary = document.createElement("p");
  summary.className = "muted class-summary";
  summary.textContent = classScheduleSummary(classItem);

  const recurrence = select(classItem.recurrence || "Weekly", classRepeatOptions, (value) => {
    classItem.recurrence = value;
    syncClassLegacyFields(classItem);
  });
  const dayMode = select(classItem.dayMode || "Day range", classDayModes, (value) => {
    classItem.dayMode = value;
    syncClassLegacyFields(classItem);
  });

  const selectedDays = document.createElement("div");
  selectedDays.className = "weekday-picker";
  weekDays.forEach((dayName) => {
    const label = document.createElement("label");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = (classItem.selectedDays || []).includes(dayName);
    check.addEventListener("change", () => {
      const set = new Set(classItem.selectedDays || []);
      if (check.checked) set.add(dayName);
      else set.delete(dayName);
      classItem.selectedDays = weekDays.filter((day) => set.has(day));
      if (!classItem.startDay && classItem.selectedDays[0]) classItem.startDay = classItem.selectedDays[0];
      if (!classItem.endDay && classItem.selectedDays[0]) classItem.endDay = classItem.selectedDays[0];
      syncClassLegacyFields(classItem);
      saveState();
      renderSchool();
      renderStudy();
      renderDashboard();
    });
    label.append(check, document.createTextNode(dayName.slice(0, 3)));
    selectedDays.append(label);
  });

  fragment.append(
    input(classItem.name, (value) => classItem.name = value, { placeholder: "Class name" }),
    labeledControl("Repeats", recurrence),
    labeledControl("Day format", dayMode),
    labeledControl("From day", select(classItem.startDay || "", ["", ...weekDays], (value) => {
      classItem.startDay = value;
      syncClassLegacyFields(classItem);
    })),
    labeledControl("To day", select(classItem.endDay || "", ["", ...weekDays], (value) => {
      classItem.endDay = value;
      syncClassLegacyFields(classItem);
    })),
    labeledControl("Or choose exact days", selectedDays),
    labeledControl("Starts on", input(classItem.startsOn || "", (value) => classItem.startsOn = value, { type: "date" })),
    labeledControl("Ends on", input(classItem.endsOn || "", (value) => classItem.endsOn = value, { type: "date" })),
    labeledControl("Monthly day", input(classItem.monthlyDay || "", (value) => classItem.monthlyDay = value, { type: "number", min: "1", max: "31", placeholder: "1-31" })),
    labeledControl("Start time", input(classItem.startTime, (value) => {
      classItem.startTime = value;
      syncClassLegacyFields(classItem);
    }, { type: "time" })),
    labeledControl("End time", input(classItem.endTime, (value) => {
      classItem.endTime = value;
      syncClassLegacyFields(classItem);
    }, { type: "time" })),
    input(classItem.room, (value) => classItem.room = value, { placeholder: "Room / online link" }),
    input(classItem.teacher, (value) => classItem.teacher = value, { placeholder: "Teacher / professor" }),
    labeledControl("Status", select(classItem.status || "Active", ["Active", "Upcoming", "Completed", "Dropped"], (value) => classItem.status = value)),
    summary
  );
  return fragment;
}

function labeledControl(labelText, control) {
  const label = document.createElement("label");
  label.className = "class-control-label";
  label.append(document.createTextNode(labelText), control);
  return label;
}

function refreshMotivationSection(section = "all") {
  state.recommendationSeeds = { books: 0, movies: 0, songs: 0, podcasts: 0, ...(state.recommendationSeeds || {}) };
  state.quoteSeeds = { mindset: 0, famous: 0, islamic: 0, power: 0, ...(state.quoteSeeds || {}) };
  if (section === "motivation" || section === "all") state.motivationSeed = (state.motivationSeed || 0) + 1;
  if (section === "mindset" || section === "all") state.quoteSeeds.mindset = (state.quoteSeeds.mindset || 0) + 1;
  if (section === "famous" || section === "all") state.quoteSeeds.famous = (state.quoteSeeds.famous || 0) + 1;
  if (section === "islamic" || section === "all") state.quoteSeeds.islamic = (state.quoteSeeds.islamic || 0) + 1;
  if (section === "power" || section === "all") state.quoteSeeds.power = (state.quoteSeeds.power || 0) + 6;
  if (["books", "movies", "songs", "podcasts"].includes(section)) state.recommendationSeeds[section] = (state.recommendationSeeds[section] || 0) + 1;
  if (section === "all") {
    Object.keys(state.recommendationSeeds).forEach((key) => {
      state.recommendationSeeds[key] = (state.recommendationSeeds[key] || 0) + 1;
    });
  }
  saveState();
  renderMotivation();
  renderDashboard();
}

function setAllHomeCardsCollapsed(collapsed) {
  state.homeCardCollapsed = state.homeCardCollapsed || {};
  (state.homeCardSettings || defaultHomeCards).forEach((card) => {
    state.homeCardCollapsed[card.id] = collapsed;
  });
  saveState();
  ensureHomeCardCollapse();
}

function autoGrow(element) {
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight + 2}px`;
}

function buildGeneratedMotivation() {
  const starts = ["Win the next block", "Return to the plan", "Choose discipline", "Protect your focus", "Make the next move"];
  const middles = ["even if the mood is not there", "because your future needs proof", "before distraction gets louder", "with one clean action", "and keep it simple"];
  const ends = ["then stack another small win.", "then write down what changed.", "then let momentum build.", "then come back stronger.", "then repeat without drama."];
  const seed = state.motivationSeed || Date.now();
  return `${starts[seed % starts.length]} ${middles[(seed * 3) % middles.length]}, ${ends[(seed * 7) % ends.length]}`;
}

function renderJava() {
  const modules = document.querySelector("#javaModuleList");
  if (!modules) return;
  modules.innerHTML = "";
  javaModules.forEach((module, index) => {
    const button = document.createElement("button");
    button.className = `module-button ${state.javaModule === index ? "is-active" : ""}`;
    button.type = "button";
    button.textContent = module.title;
    button.addEventListener("click", () => {
      state.javaModule = index;
      saveState();
      renderJava();
    });
    modules.append(button);
  });

  const lesson = javaModules[state.javaModule || 0];
  document.querySelector("#javaLessonTitle").textContent = lesson.title;
  document.querySelector("#javaLessonBody").innerHTML = `<p>${lesson.body}</p>`;
  document.querySelector("#javaLessonCode").textContent = lesson.code;
  document.querySelector("#javaPractice").textContent = lesson.practice;
  document.querySelector("#javaProject").textContent = lesson.project;
  document.querySelector("#javaVideoLink").href = `https://www.youtube.com/results?search_query=${encodeURIComponent(`${lesson.title} Java tutorial`)}`;

  const list = document.querySelector("#javaNotes");
  list.innerHTML = "";
  state.javaNotes.forEach((item, index) => list.append(editableItem(item, (patch) => {
    state.javaNotes[index] = { ...state.javaNotes[index], ...patch };
  }, () => {
    state.javaNotes.splice(index, 1);
    saveState();
    renderJava();
  })));
}

function renderMoney() {
  const body = document.querySelector("#moneyRows");
  body.innerHTML = "";
  state.money.forEach((row, index) => {
    const tr = document.createElement("tr");
    ["date", "type", "category", "amount", "note"].forEach((key) => {
      const td = document.createElement("td");
      if (key === "type") td.append(select(row.type || "Expense", ["Expense", "Income"], (value) => row.type = value));
      else td.append(input(row[key] || "", (value) => row[key] = value, { type: key === "amount" ? "number" : key === "date" ? "date" : "text" }));
      tr.append(td);
    });
    const td = document.createElement("td");
    const del = document.createElement("button");
    del.className = "icon-btn";
    del.textContent = "x";
    del.addEventListener("click", () => {
      state.money.splice(index, 1);
      saveState();
      renderMoney();
    });
    td.append(del);
    tr.append(td);
    body.append(tr);
  });
  const income = state.money.filter((r) => r.type === "Income").reduce((sum, r) => sum + Number(r.amount || 0), 0);
  const expense = state.money.filter((r) => r.type !== "Income").reduce((sum, r) => sum + Number(r.amount || 0), 0);
  document.querySelector("#incomeTotal").textContent = money(income);
  document.querySelector("#expenseTotal").textContent = money(expense);
  document.querySelector("#balanceTotal").textContent = money(income - expense);
  renderCalculators();
}

function savingsId() {
  return `saving-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function savingsGoalBalance(goal) {
  const ledgerTotal = (state.savings.deposits || [])
    .filter((entry) => entry.goalId === goal.id)
    .reduce((sum, entry) => sum + (entry.type === "Withdrawal" ? -1 : 1) * Number(entry.amount || 0), 0);
  return Math.max(0, Number(goal.current || 0) + ledgerTotal);
}

function savingsMonthKey(value = activeDate) {
  return String(value || todayKey()).slice(0, 7);
}

function renderSavingsHub() {
  const goalList = document.querySelector("#savingsGoalList");
  if (!goalList) return;
  state.savings = state.savings || defaultState().savings;
  state.savings.goals = Array.isArray(state.savings.goals) ? state.savings.goals : [];
  state.savings.deposits = Array.isArray(state.savings.deposits) ? state.savings.deposits : [];
  state.savings.buckets = Array.isArray(state.savings.buckets) ? state.savings.buckets : [];
  state.savings.strategy = Array.isArray(state.savings.strategy) ? state.savings.strategy : [];

  const balances = state.savings.goals.map((goal) => savingsGoalBalance(goal));
  const currentTotal = balances.reduce((sum, value) => sum + value, 0);
  const targetTotal = state.savings.goals.reduce((sum, goal) => sum + Number(goal.target || 0), 0);
  const remaining = Math.max(0, targetTotal - currentTotal);
  const percent = targetTotal ? clampPercent(currentTotal / targetTotal * 100) : 0;
  const activeMonth = savingsMonthKey();
  const monthTotal = state.savings.deposits
    .filter((entry) => savingsMonthKey(entry.date) === activeMonth)
    .reduce((sum, entry) => sum + (entry.type === "Withdrawal" ? -1 : 1) * Number(entry.amount || 0), 0);
  const monthlyIncome = Number(state.savings.monthlyIncome || 0);
  const savingsRate = monthlyIncome ? clampPercent(monthTotal / monthlyIncome * 100) : 0;

  document.querySelector("#savingsVaultTotal").textContent = money(currentTotal);
  document.querySelector("#savingsCurrentTotal").textContent = money(currentTotal);
  document.querySelector("#savingsTargetTotal").textContent = money(targetTotal);
  document.querySelector("#savingsMonthTotal").textContent = money(monthTotal);
  document.querySelector("#savingsRate").textContent = `${savingsRate}%`;
  document.querySelector("#savingsOverallPercent").textContent = `${percent}%`;
  document.querySelector("#savingsOverallBar").style.width = `${percent}%`;
  document.querySelector("#savingsOverallRemaining").textContent = `${money(remaining)} remaining across active goals`;
  document.querySelector("#savingsVaultMessage").textContent = percent >= 100
    ? "Your current goals are fully funded. Protect the money and define the next mission."
    : percent >= 50
      ? "You have real momentum. Keep transfers automatic and avoid unnecessary withdrawals."
      : "Build the system first: save on income day, then spend what remains.";

  goalList.innerHTML = "";
  if (!state.savings.goals.length) {
    goalList.innerHTML = '<p class="muted">No savings goals yet. Add a goal to begin tracking progress.</p>';
  }
  state.savings.goals.forEach((goal, index) => {
    if (!goal.id) goal.id = savingsId();
    const balance = savingsGoalBalance(goal);
    const goalTarget = Number(goal.target || 0);
    const goalPercent = goalTarget ? clampPercent(balance / goalTarget * 100) : 0;
    const card = document.createElement("article");
    card.className = "savings-goal";
    card.style.setProperty("--savings-goal-color", goal.color || "#21d9b5");
    card.innerHTML = `
      <div class="savings-goal-head">
        <span class="savings-goal-mark">${String(goal.name || "Goal").charAt(0).toUpperCase()}</span>
        <div><strong>${goal.name || "Savings Goal"}</strong><small>${goal.priority || "Standard"} priority</small></div>
        <b>${goalPercent}%</b>
      </div>
      <div class="savings-goal-progress"><i style="width:${goalPercent}%"></i></div>
      <div class="savings-goal-values"><span>${money(balance)} saved</span><span>${money(Math.max(0, goalTarget - balance))} left</span></div>
      <div class="savings-goal-editor">
        <label>Name<input data-saving-field="name" value="${escapeHtml(goal.name || "")}" type="text"></label>
        <label>Target<input data-saving-field="target" value="${escapeHtml(goal.target || "")}" type="number" min="0" step="0.01"></label>
        <label>Starting saved<input data-saving-field="current" value="${escapeHtml(goal.current || "")}" type="number" min="0" step="0.01"></label>
        <label>Deadline<input data-saving-field="deadline" value="${escapeHtml(goal.deadline || "")}" type="date"></label>
        <label>Priority<select data-saving-field="priority">${["Essential", "High", "Growth", "Flexible"].map((value) => `<option${goal.priority === value ? " selected" : ""}>${value}</option>`).join("")}</select></label>
        <label>Color<input data-saving-field="color" value="${escapeHtml(goal.color || "#21d9b5")}" type="color"></label>
      </div>
      <div class="savings-goal-actions">
        <button class="primary-btn compact-action" data-saving-action="deposit" type="button">Add Deposit</button>
        <button class="danger-btn compact-action" data-saving-action="delete" type="button">Delete</button>
      </div>
    `;
    card.querySelectorAll("[data-saving-field]").forEach((field) => {
      field.addEventListener("change", () => {
        goal[field.dataset.savingField] = field.value;
        saveState();
        renderSavingsHub();
      });
    });
    card.querySelector('[data-saving-action="deposit"]').addEventListener("click", () => {
      state.savings.deposits.unshift({ id: savingsId(), date: activeDate, goalId: goal.id, type: "Deposit", amount: "", note: "" });
      saveState();
      renderSavingsHub();
      document.querySelector("#savingsDepositRows")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    card.querySelector('[data-saving-action="delete"]').addEventListener("click", () => {
      if (!confirm(`Delete the savings goal "${goal.name || "Savings Goal"}"? Its ledger entries will remain available.`)) return;
      state.savings.goals.splice(index, 1);
      saveState();
      renderSavingsHub();
    });
    goalList.append(card);
  });

  renderSavingsDeposits();
  renderSavingsBudget(monthTotal);
  renderSavingsStrategy();
  setField("#savingsNotes", state.savings.notes || "", (value) => state.savings.notes = value);
}

function renderSavingsDeposits() {
  const body = document.querySelector("#savingsDepositRows");
  if (!body) return;
  body.innerHTML = "";
  state.savings.deposits.forEach((entry, index) => {
    const row = document.createElement("tr");
    const dateCell = document.createElement("td");
    dateCell.append(input(entry.date || activeDate, (value) => entry.date = value, { type: "date" }));
    const goalCell = document.createElement("td");
    const goalSelect = document.createElement("select");
    const unassigned = document.createElement("option");
    unassigned.value = "";
    unassigned.textContent = "Unassigned";
    goalSelect.append(unassigned);
    state.savings.goals.forEach((goal) => {
      const option = document.createElement("option");
      option.value = goal.id;
      option.textContent = goal.name || "Savings Goal";
      goalSelect.append(option);
    });
    goalSelect.value = entry.goalId || "";
    goalSelect.addEventListener("change", () => {
      entry.goalId = goalSelect.value;
      saveState();
      renderSavingsHub();
    });
    goalCell.append(goalSelect);
    const typeCell = document.createElement("td");
    typeCell.append(select(entry.type || "Deposit", ["Deposit", "Withdrawal"], (value) => {
      entry.type = value;
      renderSavingsHub();
    }));
    const amountCell = document.createElement("td");
    const amountInput = input(entry.amount || "", (value) => entry.amount = value, { type: "number", min: "0", step: "0.01", placeholder: "0" });
    amountInput.addEventListener("change", renderSavingsHub);
    amountCell.append(amountInput);
    const noteCell = document.createElement("td");
    noteCell.append(input(entry.note || "", (value) => entry.note = value, { placeholder: "Income source or reason" }));
    const actionCell = document.createElement("td");
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "icon-btn";
    remove.textContent = "x";
    remove.addEventListener("click", () => {
      state.savings.deposits.splice(index, 1);
      saveState();
      renderSavingsHub();
    });
    actionCell.append(remove);
    row.append(dateCell, goalCell, typeCell, amountCell, noteCell, actionCell);
    body.append(row);
  });
  if (!state.savings.deposits.length) {
    const row = document.createElement("tr");
    row.innerHTML = '<td colspan="6" class="savings-empty-row">No deposits recorded yet. Add your first savings entry.</td>';
    body.append(row);
  }
}

function renderSavingsBudget(monthTotal) {
  const incomeInput = document.querySelector("#savingsMonthlyIncome");
  const rateInput = document.querySelector("#savingsTargetRate");
  incomeInput.value = state.savings.monthlyIncome || "";
  rateInput.value = state.savings.targetRate || "20";
  incomeInput.onchange = () => {
    state.savings.monthlyIncome = incomeInput.value;
    saveState();
    renderSavingsBudget(monthTotal);
  };
  rateInput.onchange = () => {
    state.savings.targetRate = rateInput.value;
    saveState();
    renderSavingsBudget(monthTotal);
  };
  const income = Number(state.savings.monthlyIncome || 0);
  const targetRate = Math.max(0, Math.min(100, Number(state.savings.targetRate || 0)));
  const targetAmount = income * targetRate / 100;
  const planned = state.savings.buckets.reduce((sum, bucket) => sum + Number(bucket.planned || 0), 0);
  const remaining = Math.max(0, targetAmount - monthTotal);
  const summary = document.querySelector("#savingsBudgetSummary");
  summary.innerHTML = `
    <div><span>Monthly target</span><strong>${money(targetAmount)}</strong></div>
    <div><span>Planned buckets</span><strong>${money(planned)}</strong></div>
    <div><span>Still to save</span><strong>${money(remaining)}</strong></div>
  `;
  const list = document.querySelector("#savingsBucketList");
  list.innerHTML = "";
  state.savings.buckets.forEach((bucket, index) => {
    const row = document.createElement("div");
    row.className = "savings-bucket-row";
    const name = input(bucket.name || "", (value) => bucket.name = value, { placeholder: "Savings bucket" });
    const amount = input(bucket.planned || "", (value) => bucket.planned = value, { type: "number", min: "0", step: "0.01", placeholder: "0" });
    amount.addEventListener("change", () => renderSavingsBudget(monthTotal));
    const remove = document.createElement("button");
    remove.className = "icon-btn";
    remove.type = "button";
    remove.textContent = "x";
    remove.addEventListener("click", () => {
      state.savings.buckets.splice(index, 1);
      saveState();
      renderSavingsBudget(monthTotal);
    });
    row.append(name, amount, remove);
    list.append(row);
  });
}

function renderSavingsStrategy() {
  const list = document.querySelector("#savingsStrategyList");
  list.innerHTML = "";
  state.savings.strategy.forEach((rule, index) => {
    const row = document.createElement("div");
    row.className = `savings-rule${rule.done ? " is-done" : ""}`;
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = !!rule.done;
    check.addEventListener("change", () => {
      rule.done = check.checked;
      saveState();
      renderSavingsStrategy();
    });
    const text = input(rule.text || "", (value) => rule.text = value, { placeholder: "Savings rule" });
    const remove = document.createElement("button");
    remove.className = "icon-btn";
    remove.type = "button";
    remove.textContent = "x";
    remove.addEventListener("click", () => {
      state.savings.strategy.splice(index, 1);
      saveState();
      renderSavingsStrategy();
    });
    row.append(check, text, remove);
    list.append(row);
  });
}

function mountTradingViewWidget(containerId, scriptName, config) {
  const container = document.querySelector(`#${containerId}`);
  if (!container || currentPage !== "stockExchange") return;
  const signature = `${scriptName}:${JSON.stringify(config)}`;
  if (container.dataset.widgetSignature === signature && container.childElementCount) return;
  container.innerHTML = '<div class="tradingview-widget-container__widget"></div>';
  const script = document.createElement("script");
  script.type = "text/javascript";
  script.src = `https://s3.tradingview.com/external-embedding/${scriptName}.js`;
  script.async = true;
  script.textContent = JSON.stringify(config);
  container.append(script);
  container.dataset.widgetSignature = signature;
}

function renderMarketWidgets() {
  if (currentPage !== "stockExchange") return;
  if ((state.marketSection || "chart") === "chart") {
    mountTradingViewWidget("tradingViewChart", "embed-widget-advanced-chart", {
      autosize: true,
      symbol: state.marketChartSymbol || "NASDAQ:AAPL",
      interval: state.marketChartInterval || "D",
      timezone: "America/New_York",
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      calendar: false,
      support_host: "https://www.tradingview.com"
    });
    mountTradingViewWidget("marketOverviewWidget", "embed-widget-market-overview", {
      colorTheme: "dark",
      dateRange: "1D",
      showChart: true,
      locale: "en",
      width: "100%",
      height: "100%",
      tabs: [{
        title: "US Markets",
        symbols: [
          { s: "FOREXCOM:SPXUSD", d: "S&P 500" },
          { s: "FOREXCOM:NSXUSD", d: "Nasdaq 100" },
          { s: "DJ:DJI", d: "Dow 30" },
          { s: "AMEX:IWM", d: "Russell 2000" }
        ]
      }]
    });
  }
  if (state.marketSection === "crypto") {
    mountTradingViewWidget("cryptoMarketWidget", "embed-widget-screener", {
      width: "100%",
      height: "100%",
      defaultColumn: "overview",
      screener_type: "crypto_mkt",
      displayCurrency: "USD",
      colorTheme: "dark",
      locale: "en"
    });
    mountTradingViewWidget("cryptoNewsWidget", "embed-widget-timeline", {
      feedMode: "market",
      market: "crypto",
      isTransparent: false,
      displayMode: "regular",
      width: "100%",
      height: "100%",
      colorTheme: "dark",
      locale: "en"
    });
  }
}

function renderCryptoPrices() {
  const wrap = document.querySelector("#cryptoPriceCards");
  if (!wrap) return;
  const fallback = [
    { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
    { id: "ethereum", name: "Ethereum", symbol: "ETH" },
    { id: "solana", name: "Solana", symbol: "SOL" }
  ];
  const prices = state.liveCrypto?.items?.length ? state.liveCrypto.items : fallback;
  wrap.innerHTML = prices.map((asset) => {
    const change = Number(asset.change);
    const hasPrice = Number.isFinite(Number(asset.price));
    const movementClass = change > 0 ? "is-positive" : change < 0 ? "is-negative" : "";
    return `<article class="crypto-price-card ${movementClass}">
      <span>${escapeHtml(asset.symbol)}</span>
      <strong>${hasPrice ? money(Number(asset.price)) : "Waiting for live data"}</strong>
      <small>${Number.isFinite(change) ? `${change >= 0 ? "+" : ""}${change.toFixed(2)}% today` : escapeHtml(asset.name)}</small>
    </article>`;
  }).join("");
  renderFavoriteCrypto();
}

async function refreshCryptoPrices() {
  try {
    const defaults = [
      { id: "bitcoin", name: "Bitcoin", symbol: "BTC" },
      { id: "ethereum", name: "Ethereum", symbol: "ETH" },
      { id: "solana", name: "Solana", symbol: "SOL" }
    ];
    const definitions = [...defaults, ...(state.favoriteCrypto || [])]
      .filter((item, index, list) => list.findIndex((entry) => entry.id === item.id) === index);
    const ids = definitions.map((item) => item.id).join(",");
    const url = `https://api.coingecko.com/api/v3/simple/price?ids=${encodeURIComponent(ids)}&vs_currencies=usd&include_24hr_change=true&include_last_updated_at=true`;
    const response = await fetch(url, { headers: { accept: "application/json" } });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    state.liveCrypto = {
      updated: new Date().toLocaleString(),
      items: definitions.map((asset) => ({
        ...asset,
        price: Number(data[asset.id]?.usd),
        change: Number(data[asset.id]?.usd_24h_change),
        updatedAt: data[asset.id]?.last_updated_at || 0
      }))
    };
    forceSaveState();
  } catch {
    state.liveCrypto = state.liveCrypto || { items: [] };
  }
  renderCryptoPrices();
}

function renderFavoriteCrypto() {
  const wrap = document.querySelector("#favoriteCryptoCards");
  const updated = document.querySelector("#favoriteCryptoUpdated");
  if (!wrap) return;
  const favorites = state.favoriteCrypto || [];
  const liveItems = state.liveCrypto?.items || [];
  if (updated) updated.textContent = state.liveCrypto?.updated ? `Updated ${state.liveCrypto.updated}` : "Refresh live data";
  wrap.innerHTML = "";
  if (!favorites.length) {
    wrap.innerHTML = `<div class="empty-state"><strong>No favorite crypto yet.</strong><small>Choose an asset above to build your personal watch panel.</small></div>`;
    return;
  }
  favorites.forEach((asset) => {
    const live = liveItems.find((item) => item.id === asset.id) || asset;
    const price = Number(live.price);
    const change = Number(live.change);
    const card = document.createElement("article");
    card.className = `favorite-crypto-card ${change > 0 ? "is-positive" : change < 0 ? "is-negative" : ""}`;
    card.innerHTML = `<span>${escapeHtml(asset.symbol)}</span><div><small>${escapeHtml(asset.name)}</small><strong>${Number.isFinite(price) ? money(price) : "Waiting for live data"}</strong><em>${Number.isFinite(change) ? `${change >= 0 ? "+" : ""}${change.toFixed(2)}% in 24h` : "Refresh to load market movement"}</em></div>`;
    const actions = document.createElement("div");
    const chart = document.createElement("button");
    chart.type = "button";
    chart.textContent = "Chart";
    chart.addEventListener("click", () => {
      state.marketChartSymbol = `COINBASE:${asset.symbol}USD`;
      state.marketSection = "chart";
      forceSaveState();
      renderStockExchange();
    });
    const remove = document.createElement("button");
    remove.type = "button";
    remove.textContent = "Remove";
    remove.addEventListener("click", () => {
      state.favoriteCrypto = favorites.filter((item) => item.id !== asset.id);
      forceSaveState();
      renderFavoriteCrypto();
    });
    actions.append(chart, remove);
    card.append(actions);
    wrap.append(card);
  });
}

function addFavoriteCrypto() {
  const value = document.querySelector("#cryptoFavoriteId")?.value || "";
  const [id, name, symbol] = value.split("|");
  if (!id || !name || !symbol) return;
  state.favoriteCrypto = state.favoriteCrypto || [];
  if (!state.favoriteCrypto.some((item) => item.id === id)) {
    state.favoriteCrypto.push({ id, name, symbol });
    forceSaveState();
  }
  refreshCryptoPrices();
}

function portfolioPositionValue(position) {
  return Number(position.quantity || 0) * Number(position.currentPrice || 0);
}

function renderMarketPortfolio() {
  const list = document.querySelector("#marketPortfolioList");
  const summary = document.querySelector("#marketPortfolioSummary");
  if (!list || !summary) return;
  const positions = Array.isArray(state.marketPortfolio) ? state.marketPortfolio : [];
  const cost = positions.reduce((total, item) => total + Number(item.quantity || 0) * Number(item.averageCost || 0), 0);
  const value = positions.reduce((total, item) => total + portfolioPositionValue(item), 0);
  const gain = value - cost;
  summary.innerHTML = `
    <div><span>Positions</span><strong>${positions.length}</strong></div>
    <div><span>Cost basis</span><strong>${money(cost)}</strong></div>
    <div><span>Tracked value</span><strong>${money(value)}</strong></div>
    <div class="${gain > 0 ? "is-positive" : gain < 0 ? "is-negative" : ""}"><span>Unrealized change</span><strong>${money(gain)}</strong></div>`;
  list.innerHTML = "";
  if (!positions.length) {
    list.innerHTML = '<p class="empty-market-state">No positions saved. Add an asset above to build your private FahimOS portfolio.</p>';
    return;
  }
  positions.forEach((position, index) => {
    const row = document.createElement("article");
    row.className = "portfolio-position";
    const positionCost = Number(position.quantity || 0) * Number(position.averageCost || 0);
    const positionValue = portfolioPositionValue(position);
    const pnl = positionValue - positionCost;
    row.innerHTML = `
      <div class="portfolio-position-head">
        <div><span>${escapeHtml(position.type || "Asset")}</span><strong>${escapeHtml(position.symbol || "Untitled")}</strong></div>
        <div class="${pnl > 0 ? "is-positive" : pnl < 0 ? "is-negative" : ""}"><small>Tracked P/L</small><strong>${money(pnl)}</strong></div>
      </div>
      <div class="portfolio-position-fields">
        <label>Quantity<input data-portfolio-field="quantity" type="number" min="0" step="0.000001" value="${escapeHtml(position.quantity || "")}"></label>
        <label>Average cost<input data-portfolio-field="averageCost" type="number" min="0" step="0.01" value="${escapeHtml(position.averageCost || "")}"></label>
        <label>Current price<input data-portfolio-field="currentPrice" type="number" min="0" step="0.01" value="${escapeHtml(position.currentPrice || "")}"></label>
        <label>Target<input data-portfolio-field="target" type="number" min="0" step="0.01" value="${escapeHtml(position.target || "")}"></label>
        <label>Stop<input data-portfolio-field="stop" type="number" min="0" step="0.01" value="${escapeHtml(position.stop || "")}"></label>
        <label class="portfolio-thesis-field">Thesis<input data-portfolio-field="thesis" type="text" value="${escapeHtml(position.thesis || "")}"></label>
      </div>
      <div class="portfolio-position-actions">
        <button class="ghost-btn compact-action" data-portfolio-chart="${index}" type="button">Open Chart</button>
        <button class="primary-btn compact-action" data-portfolio-save="${index}" type="button">Save Position</button>
        <button class="danger-btn compact-action" data-portfolio-delete="${index}" type="button">Delete</button>
      </div>`;
    list.append(row);
  });
  list.querySelectorAll("[data-portfolio-save]").forEach((button) => {
    button.addEventListener("click", () => {
      const index = Number(button.dataset.portfolioSave);
      const row = button.closest(".portfolio-position");
      row.querySelectorAll("[data-portfolio-field]").forEach((field) => {
        state.marketPortfolio[index][field.dataset.portfolioField] = field.value;
      });
      forceSaveState();
      renderMarketPortfolio();
    });
  });
  list.querySelectorAll("[data-portfolio-delete]").forEach((button) => {
    button.addEventListener("click", () => {
      state.marketPortfolio.splice(Number(button.dataset.portfolioDelete), 1);
      forceSaveState();
      renderMarketPortfolio();
    });
  });
  list.querySelectorAll("[data-portfolio-chart]").forEach((button) => {
    button.addEventListener("click", () => loadMarketSymbol(state.marketPortfolio[Number(button.dataset.portfolioChart)]?.symbol));
  });
}

function normalizeTradingViewSymbol(symbol, type = "Stock") {
  const cleaned = String(symbol || "").trim().toUpperCase();
  if (!cleaned || cleaned.includes(":")) return cleaned;
  if (type === "Crypto") return `COINBASE:${cleaned.replace(/USD(T)?$/, "")}USD`;
  if (type === "ETF") return `AMEX:${cleaned}`;
  return `NASDAQ:${cleaned}`;
}

function loadMarketSymbol(symbol) {
  const normalized = String(symbol || "").trim().toUpperCase();
  if (!normalized) return;
  state.marketChartSymbol = normalized;
  const field = document.querySelector("#marketChartSymbol");
  if (field) field.value = normalized;
  forceSaveState();
  const chart = document.querySelector("#tradingViewChart");
  if (chart) chart.dataset.widgetSignature = "";
  renderMarketWidgets();
}

function renderMarketWatchlist() {
  const wrap = document.querySelector("#marketWatchlist");
  if (!wrap) return;
  wrap.innerHTML = "";
  (state.marketWatchlist || []).forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "market-watchlist-row";
    row.innerHTML = `<button class="market-watchlist-open" type="button"><strong>${escapeHtml(item.symbol)}</strong><span>${escapeHtml(item.label || item.type || "")}</span></button><button class="icon-btn" type="button" aria-label="Delete ${escapeHtml(item.symbol)}">x</button>`;
    row.querySelector(".market-watchlist-open").addEventListener("click", () => loadMarketSymbol(item.symbol));
    row.querySelector(".icon-btn").addEventListener("click", () => {
      state.marketWatchlist.splice(index, 1);
      forceSaveState();
      renderMarketWatchlist();
    });
    wrap.append(row);
  });
}

function calculateTradePlan() {
  const entry = Number(document.querySelector("#strategyEntry")?.value || 0);
  const target = Number(document.querySelector("#strategyTarget")?.value || 0);
  const stop = Number(document.querySelector("#strategyStop")?.value || 0);
  const quantity = Number(document.querySelector("#strategyPositionSize")?.value || 0);
  const output = document.querySelector("#tradeStrategyResult");
  if (!output) return;
  if (!(entry > 0 && target > entry && stop > 0 && stop < entry && quantity > 0)) {
    output.innerHTML = "<strong>Complete the plan first.</strong><span>Target must be above entry, stop must be below entry, and quantity must be greater than zero.</span>";
    return;
  }
  const riskPerUnit = entry - stop;
  const rewardPerUnit = target - entry;
  const ratio = rewardPerUnit / riskPerUnit;
  const maxLoss = riskPerUnit * quantity;
  const possibleGain = rewardPerUnit * quantity;
  const quality = ratio >= 2 ? "Defined setup" : "Weak reward-to-risk";
  output.innerHTML = `
    <div><span>Plan quality</span><strong>${quality}</strong></div>
    <div><span>Reward / risk</span><strong>${ratio.toFixed(2)} : 1</strong></div>
    <div><span>Maximum planned loss</span><strong>${money(maxLoss)}</strong></div>
    <div><span>Potential gain at target</span><strong>${money(possibleGain)}</strong></div>
    <p>Consider an entry only when the thesis, catalyst, liquidity, and invalidation level are clear. Reassess or exit when the thesis breaks; do not move the stop simply to avoid accepting a loss.</p>`;
}

function renderStockExchange() {
  const items = state.liveStocks?.items?.length
    ? state.liveStocks.items
    : fallbackStockItems.map((text) => ({ text, source: "Built-in market brief", page: "" }));
  fillStatus("#stockExchangeSnapshot", [
    ...items,
    { text: `Last checked: ${state.liveStocks?.updated || "Open Refresh Market Info for current data."}`, source: "Market page", page: "" }
  ]);
  const updated = document.querySelector("#marketLastUpdated");
  if (updated) updated.textContent = state.liveStocks?.updated || "Built-in brief";
  fillStatus("#stockTermList", [
    "Stock: a small ownership share in a company.",
    "ETF: a basket of stocks traded like one stock.",
    "Index: a group measurement, like S&P 500 or Nasdaq.",
    "YTD: year-to-date performance since January 1.",
    "Volume: how many shares traded during the period.",
    "Volatility: how strongly price moves up and down."
  ]);
  setField("#stockExchangeNotes", state.stockExchangeNotes || "", (value) => state.stockExchangeNotes = value);
  const symbol = document.querySelector("#marketChartSymbol");
  const interval = document.querySelector("#marketChartInterval");
  if (symbol) symbol.value = state.marketChartSymbol || "NASDAQ:AAPL";
  if (interval) interval.value = state.marketChartInterval || "D";
  renderCryptoPrices();
  renderMarketPortfolio();
  renderMarketWatchlist();
  renderMarketWorkspaceTabs();
  requestAnimationFrame(renderMarketWidgets);
  if (currentPage === "stockExchange" && !cryptoLoadStarted) {
    cryptoLoadStarted = true;
    refreshCryptoPrices();
  }
}

function renderMarketWorkspaceTabs() {
  const selected = state.marketSection || "chart";
  document.querySelectorAll("[data-market-view]").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.marketView === selected);
  });
  document.querySelectorAll("[data-market-panel]").forEach((panel) => {
    panel.hidden = panel.dataset.marketPanel !== selected;
  });
  if (selected === "chart" || selected === "crypto") requestAnimationFrame(renderMarketWidgets);
}

function renderCreditHub() {
  setField("#creditNotes", state.creditNotes || "", (value) => state.creditNotes = value);
}

function calculatorNumber(key) {
  return Number(state.calculators?.[key] || 0);
}

function setCalculatorField(id) {
  const inputEl = document.querySelector(`#${id}`);
  if (!inputEl) return;
  inputEl.value = state.calculators?.[id] || "";
  inputEl.oninput = () => {
    state.calculators = state.calculators || {};
    state.calculators[id] = inputEl.value;
    saveState();
  };
}

function renderCalculators() {
  state.calculators = state.calculators || {};
  [
    "financeIncome",
    "financeExpenses",
    "financeSavingsGoal",
    "debtBalance",
    "debtApr",
    "debtPayment",
    "savingsTarget",
    "savingsMonthly",
    "savingsCurrent",
    "extraPayBalance",
    "extraPayApr",
    "extraPayCurrent",
    "extraPayExtra",
    "minimumBalance",
    "minimumApr",
    "minimumPayment",
    "loanAmount",
    "loanApr",
    "loanMonths",
    "autoPrice",
    "autoDown",
    "autoApr",
    "autoMonths",
    "refiBalance",
    "refiOldApr",
    "refiNewApr",
    "refiMonths",
    "curveEssentials",
    "curveSavings",
    "curveMonths",
    "curveContribution"
  ].forEach(setCalculatorField);
  calculateFinance();
  calculateDebtPayoff();
  calculateSavingsTarget();
  calculatePayoffSuite();
  calculateLoanSuite();
  calculateCurveball();
}

function payoffMonths(balance, aprPercent, payment) {
  const apr = Number(aprPercent || 0) / 100 / 12;
  let remaining = Number(balance || 0);
  const pay = Number(payment || 0);
  if (!remaining || !pay) return { months: 0, interest: 0, impossible: true };
  if (apr > 0 && pay <= remaining * apr) return { months: Infinity, interest: Infinity, impossible: true };
  let months = 0;
  let interest = 0;
  while (remaining > 0 && months < 720) {
    const charge = remaining * apr;
    interest += charge;
    remaining = Math.max(0, remaining + charge - pay);
    months += 1;
  }
  return { months, interest, impossible: months >= 720 };
}

function calculatePayoffSuite() {
  const balance = calculatorNumber("extraPayBalance");
  const apr = calculatorNumber("extraPayApr");
  const current = calculatorNumber("extraPayCurrent");
  const extra = calculatorNumber("extraPayExtra");
  const base = payoffMonths(balance, apr, current);
  const boosted = payoffMonths(balance, apr, current + extra);
  fillStatus("#extraPayResult", balance && current ? [
    `Current payoff: ${base.impossible ? "Needs higher payment" : `${base.months} months, ${money(base.interest)} interest`}`,
    `With extra: ${boosted.impossible ? "Needs higher payment" : `${boosted.months} months, ${money(boosted.interest)} interest`}`,
    !base.impossible && !boosted.impossible ? `Time saved: ${Math.max(0, base.months - boosted.months)} months` : "Increase payment until principal goes down."
  ] : ["Enter balance, APR, current payment, and extra payment."]);

  const minimumBalance = calculatorNumber("minimumBalance");
  const minimumApr = calculatorNumber("minimumApr");
  const minimumPayment = calculatorNumber("minimumPayment");
  const minPlan = payoffMonths(minimumBalance, minimumApr, minimumPayment);
  fillStatus("#minimumResult", minimumBalance && minimumPayment ? [
    minPlan.impossible ? "Warning: minimum payment may not reduce principal." : `Minimum payoff estimate: ${minPlan.months} months`,
    minPlan.impossible ? "Try paying more than interest charged each month." : `Estimated interest: ${money(minPlan.interest)}`,
    "Use the datasheet to compare all debts together."
  ] : ["Enter balance, APR, and minimum payment."]);

  const debts = Array.isArray(state.payoffDebts) ? state.payoffDebts : [];
  const snowball = debts.slice().sort((a, b) => Number(a.balance || 0) - Number(b.balance || 0))[0];
  const avalanche = debts.slice().sort((a, b) => Number(b.apr || 0) - Number(a.apr || 0))[0];
  fillStatus("#strategyResult", [
    snowball ? `Snowball first: ${snowball.name} (${money(Number(snowball.balance || 0))})` : "Add debts in Payoff Datasheet.",
    avalanche ? `Avalanche first: ${avalanche.name} (${Number(avalanche.apr || 0)}% APR)` : "Highest APR strategy appears after debts are added.",
    "Snowball helps motivation. Avalanche usually saves interest."
  ]);
}

function monthlyPayment(principal, aprPercent, months) {
  const amount = Number(principal || 0);
  const totalMonths = Number(months || 0);
  const rate = Number(aprPercent || 0) / 100 / 12;
  if (!amount || !totalMonths) return 0;
  if (!rate) return amount / totalMonths;
  return amount * (rate * Math.pow(1 + rate, totalMonths)) / (Math.pow(1 + rate, totalMonths) - 1);
}

function calculateLoanSuite() {
  const loanPay = monthlyPayment(calculatorNumber("loanAmount"), calculatorNumber("loanApr"), calculatorNumber("loanMonths"));
  fillStatus("#loanPaymentResult", loanPay ? [
    `Monthly payment: ${money(loanPay)}`,
    `Total paid: ${money(loanPay * calculatorNumber("loanMonths"))}`,
    `Total interest: ${money((loanPay * calculatorNumber("loanMonths")) - calculatorNumber("loanAmount"))}`
  ] : ["Enter loan amount, APR, and months."]);

  const financed = Math.max(0, calculatorNumber("autoPrice") - calculatorNumber("autoDown"));
  const autoPay = monthlyPayment(financed, calculatorNumber("autoApr"), calculatorNumber("autoMonths"));
  fillStatus("#autoLoanResult", autoPay ? [
    `Amount financed: ${money(financed)}`,
    `Monthly auto payment: ${money(autoPay)}`,
    `Total loan cost: ${money(autoPay * calculatorNumber("autoMonths"))}`
  ] : ["Enter car price, down payment, APR, and months."]);

  const oldPay = monthlyPayment(calculatorNumber("refiBalance"), calculatorNumber("refiOldApr"), calculatorNumber("refiMonths"));
  const newPay = monthlyPayment(calculatorNumber("refiBalance"), calculatorNumber("refiNewApr"), calculatorNumber("refiMonths"));
  fillStatus("#refiResult", oldPay && newPay ? [
    `Old payment estimate: ${money(oldPay)}`,
    `New payment estimate: ${money(newPay)}`,
    `Monthly difference: ${money(oldPay - newPay)}`
  ] : ["Enter balance, old APR, new APR, and months left."]);
}

function calculateCurveball() {
  const target = calculatorNumber("curveEssentials") * (calculatorNumber("curveMonths") || 3);
  const remaining = Math.max(0, target - calculatorNumber("curveSavings"));
  const months = calculatorNumber("curveContribution") > 0 ? Math.ceil(remaining / calculatorNumber("curveContribution")) : null;
  fillStatus("#curveballResult", [
    `Emergency target: ${money(target)}`,
    `Still needed: ${money(remaining)}`,
    months !== null ? `Timeline: ${months} month${months === 1 ? "" : "s"}` : "Add monthly contribution to see timeline."
  ]);
  setField("#curveballNotes", state.curveballNotes || "", (value) => state.curveballNotes = value);
}

function renderPayoffDatasheet() {
  const body = document.querySelector("#payoffDebtRows");
  if (!body) return;
  state.payoffDebts = Array.isArray(state.payoffDebts) ? state.payoffDebts : [];
  body.innerHTML = "";
  state.payoffDebts.forEach((debt, index) => {
    const tr = document.createElement("tr");
    [["name", "text"], ["balance", "number"], ["apr", "number"], ["minimum", "number"], ["extra", "number"]].forEach(([key, type]) => {
      const td = document.createElement("td");
      td.append(input(debt[key] || "", (value) => debt[key] = value, { type, placeholder: key }));
      tr.append(td);
    });
    const strategyTd = document.createElement("td");
    strategyTd.append(select(debt.strategy || "Snowball", ["Snowball", "Avalanche", "Manual", "Pause"], (value) => debt.strategy = value));
    tr.append(strategyTd);
    const noteTd = document.createElement("td");
    noteTd.append(input(debt.note || "", (value) => debt.note = value, { placeholder: "Note" }));
    tr.append(noteTd);
    const actionTd = document.createElement("td");
    const del = document.createElement("button");
    del.className = "icon-btn";
    del.type = "button";
    del.textContent = "x";
    del.addEventListener("click", () => {
      state.payoffDebts.splice(index, 1);
      saveState();
      renderPayoffDatasheet();
      calculatePayoffSuite();
    });
    actionTd.append(del);
    tr.append(actionTd);
    body.append(tr);
  });
  const totalDebt = state.payoffDebts.reduce((sum, debt) => sum + Number(debt.balance || 0), 0);
  const totalMinimum = state.payoffDebts.reduce((sum, debt) => sum + Number(debt.minimum || 0), 0);
  const highestApr = state.payoffDebts.reduce((max, debt) => Math.max(max, Number(debt.apr || 0)), 0);
  document.querySelector("#payoffTotalDebt").textContent = money(totalDebt);
  document.querySelector("#payoffTotalMinimum").textContent = money(totalMinimum);
  document.querySelector("#payoffHighestApr").textContent = `${highestApr.toFixed(2)}%`;
  const snowball = state.payoffDebts.slice().sort((a, b) => Number(a.balance || 0) - Number(b.balance || 0));
  const avalanche = state.payoffDebts.slice().sort((a, b) => Number(b.apr || 0) - Number(a.apr || 0));
  fillStatus("#payoffStrategyList", [
    snowball[0] ? `Snowball next: ${snowball[0].name} - ${money(Number(snowball[0].balance || 0))}` : "Add your first debt.",
    avalanche[0] ? `Avalanche next: ${avalanche[0].name} - ${Number(avalanche[0].apr || 0)}% APR` : "APR strategy appears after debts are added.",
    `Total minimum pressure: ${money(totalMinimum)} per month`,
    "Best habit: pay minimums on all debts, then attack one target with every extra dollar."
  ]);
  setField("#payoffNotes", state.payoffNotes || "", (value) => state.payoffNotes = value);
}

function calculateFinance() {
  const income = calculatorNumber("financeIncome");
  const expenses = calculatorNumber("financeExpenses");
  const goal = calculatorNumber("financeSavingsGoal");
  const free = income - expenses;
  const months = goal > 0 && free > 0 ? Math.ceil(goal / free) : null;
  fillStatus("#financeResult", [
    `Monthly cash left: ${money(free)}`,
    free >= 0 ? `Suggested save amount: ${money(Math.max(0, free * 0.5))}` : `Shortfall: ${money(Math.abs(free))}`,
    months ? `Goal timeline: about ${months} month${months === 1 ? "" : "s"}` : "Add a savings goal and positive cashflow to see timeline."
  ]);
}

function calculateDebtPayoff() {
  const balance = calculatorNumber("debtBalance");
  const apr = calculatorNumber("debtApr") / 100 / 12;
  const payment = calculatorNumber("debtPayment");
  if (!balance || !payment) {
    fillStatus("#debtResult", ["Enter balance and payment to estimate payoff.", "Pay more than minimum whenever possible."]);
    return;
  }
  if (apr > 0 && payment <= balance * apr) {
    fillStatus("#debtResult", ["Payment is too low to reduce principal.", "Increase payment or lower interest."]);
    return;
  }
  let remaining = balance;
  let months = 0;
  let interest = 0;
  while (remaining > 0 && months < 600) {
    const charge = remaining * apr;
    interest += charge;
    remaining = Math.max(0, remaining + charge - payment);
    months += 1;
  }
  fillStatus("#debtResult", [
    `Payoff time: ${months} month${months === 1 ? "" : "s"}`,
    `Estimated interest: ${money(interest)}`,
    `Estimated total paid: ${money(balance + interest)}`
  ]);
}

function calculateSavingsTarget() {
  const target = calculatorNumber("savingsTarget");
  const monthly = calculatorNumber("savingsMonthly");
  const current = calculatorNumber("savingsCurrent");
  const remaining = Math.max(0, target - current);
  const months = monthly > 0 ? Math.ceil(remaining / monthly) : null;
  fillStatus("#savingsResult", [
    `Remaining: ${money(remaining)}`,
    months !== null ? `Timeline: ${months} month${months === 1 ? "" : "s"}` : "Add monthly saving to see timeline.",
    months !== null ? `Target month: ${new Date(new Date().setMonth(new Date().getMonth() + months)).toLocaleDateString(undefined, { month: "long", year: "numeric" })}` : "Build the habit before increasing the target."
  ]);
}

function money(value) {
  return new Intl.NumberFormat(undefined, { style: "currency", currency: "USD" }).format(value);
}

function billIntelligence(bill, dateLike = activeDate) {
  const today = new Date(`${dateLike}T00:00:00`);
  const nextMonth = new Date(`${dateLike}T12:00:00`);
  nextMonth.setMonth(nextMonth.getMonth() + 1);
  const events = [
    ...billDueDatesForMonth(bill, dateLike),
    ...billDueDatesForMonth(bill, localDateKey(nextMonth))
  ].sort((a, b) => a.date - b.date);
  const next = events.find((item) => item.date >= today) || events[events.length - 1];
  const lastCurrent = events.filter((item) => item.date < today && item.date.getMonth() === today.getMonth()).at(-1);
  const recurring = /weekly|biweekly/i.test(String(bill.due || ""));
  const event = recurring ? next : (lastCurrent || next);
  const days = event ? Math.floor((event.date - today) / 86400000) : null;
  let status = "upcoming";
  if (bill.paid) status = "paid";
  else if (days !== null && days < 0) status = "overdue";
  else if (days !== null && days <= 3) status = "due-soon";
  return {
    event,
    days,
    status,
    dueLabel: event?.dateLabel || String(bill.due || "Not set"),
    statusLabel: status === "paid" ? "Paid" : status === "overdue" ? "Overdue" : status === "due-soon" ? "Due Soon" : "Upcoming",
    daysLabel: bill.paid ? "Completed" : days === null ? "Date not set" : days < 0 ? `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue` : days === 0 ? "Due today" : `${days} day${days === 1 ? "" : "s"} remaining`
  };
}

function renderBillLedgerRow(body, bill, index) {
  const intelligence = billIntelligence(bill);
  const tr = document.createElement("tr");
  tr.className = `bill-ledger-row is-${intelligence.status}`;
  const nameTd = document.createElement("td");
  nameTd.dataset.label = "Bill Name";
  const nameWrap = document.createElement("div");
  nameWrap.className = "bill-name-cell";
  const paid = document.createElement("input");
  paid.type = "checkbox";
  paid.checked = bill.paid;
  paid.setAttribute("aria-label", `Mark ${bill.name || "bill"} paid`);
  paid.addEventListener("change", () => {
    bill.paid = paid.checked;
    forceSaveState();
    renderBills();
    renderDashboard();
    renderCalendar();
  });
  const name = input(bill.name || "", (value) => bill.name = value, { type: "text", placeholder: "Bill name" });
  nameWrap.append(paid, name);
  nameTd.append(nameWrap);

  const amountTd = document.createElement("td");
  amountTd.dataset.label = "Amount";
  amountTd.append(input(bill.amount || "", (value) => bill.amount = value, { type: "number", min: "0", step: "0.01", placeholder: "0.00" }));

  const dueTd = document.createElement("td");
  dueTd.dataset.label = "Due Date";
  const dueWrap = document.createElement("div");
  dueWrap.className = "bill-due-cell";
  dueWrap.append(input(bill.due || "", (value) => bill.due = value, { type: "text", placeholder: "1-31, weekly, monthly" }));
  const dueDate = document.createElement("small");
  dueDate.textContent = intelligence.event ? intelligence.event.date.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" }) : "No calendar date";
  dueWrap.append(dueDate);
  dueTd.append(dueWrap);

  const daysTd = document.createElement("td");
  daysTd.dataset.label = "Days Remaining";
  daysTd.innerHTML = `<strong class="bill-days is-${intelligence.status}">${escapeHtml(intelligence.daysLabel)}</strong>`;

  const statusTd = document.createElement("td");
  statusTd.dataset.label = "Status";
  statusTd.innerHTML = `<span class="bill-status-badge is-${intelligence.status}">${escapeHtml(intelligence.statusLabel)}</span>`;

  const actionsTd = document.createElement("td");
  actionsTd.dataset.label = "Actions";
  const actions = document.createElement("div");
  actions.className = "bill-row-actions";
  const details = document.createElement("button");
  details.className = "ghost-btn compact-action";
  details.type = "button";
  details.textContent = "Details";
  const save = document.createElement("button");
  save.className = "primary-btn compact-action";
  save.type = "button";
  save.textContent = "Save";
  save.addEventListener("click", () => {
    forceSaveState();
    renderBills();
    renderDashboard();
    renderCalendar();
  });
  const del = document.createElement("button");
  del.className = "icon-btn";
  del.classList.add("has-inline-save");
  del.type = "button";
  del.textContent = "x";
  del.setAttribute("aria-label", `Delete ${bill.name || "bill"}`);
  del.addEventListener("click", () => {
    state.bills.splice(index, 1);
    forceSaveState();
    renderBills();
    renderDashboard();
    renderCalendar();
  });
  actions.append(details, save, del);
  actionsTd.append(actions);
  tr.append(nameTd, amountTd, dueTd, daysTd, statusTd, actionsTd);

  const detailRow = document.createElement("tr");
  detailRow.className = "bill-detail-row";
  detailRow.hidden = true;
  const detailTd = document.createElement("td");
  detailTd.colSpan = 6;
  const detailGrid = document.createElement("div");
  detailGrid.className = "bill-detail-grid";
  const categoryLabel = document.createElement("label");
  categoryLabel.append("Category", input(bill.category || "", (value) => bill.category = value, { type: "text", placeholder: "Insurance, loan, utilities..." }));
  const noteLabel = document.createElement("label");
  noteLabel.append("Note", input(bill.note || "", (value) => bill.note = value, { type: "text", placeholder: "Payment details or reminder" }));
  detailGrid.append(categoryLabel, noteLabel);
  detailTd.append(detailGrid);
  detailRow.append(detailTd);
  details.addEventListener("click", () => {
    detailRow.hidden = !detailRow.hidden;
    details.textContent = detailRow.hidden ? "Details" : "Close";
  });
  body.append(tr, detailRow);
}

function renderBills() {
  const body = document.querySelector("#billRows");
  if (!body) return;
  state.bills = state.bills.map((bill) => ({
    paid: !!bill.paid,
    name: bill.name || bill.bill || "",
    amount: bill.amount || "",
    due: bill.due || bill.dueDay || "",
    category: bill.category || "",
    note: bill.note || ""
  })).sort(compareBillsByDue);
  const total = state.bills.reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
  const paid = state.bills.filter((bill) => bill.paid).reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
  const paidCount = state.bills.filter((bill) => bill.paid).length;
  const dueWeekCount = state.bills.filter((bill) => {
    const item = billIntelligence(bill);
    return !bill.paid && item.days !== null && item.days >= 0 && item.days <= 7;
  }).length;
  document.querySelector("#billCount").textContent = String(state.bills.length);
  document.querySelector("#billTotal").textContent = money(total);
  document.querySelector("#billPaid").textContent = money(paid);
  document.querySelector("#billRemaining").textContent = money(total - paid);
  document.querySelector("#billPaidCount").textContent = `${paidCount} bill${paidCount === 1 ? "" : "s"} completed`;
  document.querySelector("#billDueWeek").textContent = String(dueWeekCount);
  const paidPercent = total ? Math.round(paid / total * 100) : 0;
  const upcoming = getRollingBillEvents(activeDate, 10).filter((item) => !item.paid);
  const pastDueMap = new Map();
  getPastDueBills(activeDate, 45).forEach((item) => {
    if (!pastDueMap.has(item.name)) pastDueMap.set(item.name, item);
  });
  const pastDue = [...pastDueMap.values()];
  const next = upcoming[0];
  const nextLabel = next ? `${next.name} · ${next.dateLabel}` : "No unpaid bill scheduled";
  const nextAmount = next ? money(Number(next.amount || 0)) : money(0);
  const headline = document.querySelector("#billCommandHeadline");
  const message = document.querySelector("#billCommandMessage");
  if (headline) headline.textContent = next ? `${next.name} is the next payment target.` : "Your current bill queue is clear.";
  if (message) message.textContent = next
    ? `${nextAmount} due ${next.dateLabel}. ${money(total - paid)} remains across the monthly bill plan.`
    : `${money(paid)} is marked paid. Add or review bills to build the next payment plan.`;
  const nextDays = next ? Math.max(0, Math.floor((next.date - new Date(`${activeDate}T00:00:00`)) / 86400000)) : null;
  document.querySelector("#billNextName").textContent = next?.name || "No unpaid bill scheduled";
  document.querySelector("#billNextMeta").textContent = next ? `${next.category || "Monthly bill"} payment is the closest upcoming obligation.` : "Your payment queue is clear.";
  document.querySelector("#billNextCountdown").textContent = nextDays === null ? "--" : nextDays === 0 ? "Today" : `${nextDays}d`;
  document.querySelector("#billNextAmount").textContent = nextAmount;
  document.querySelector("#billNextDate").textContent = next ? `Due ${next.date.toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" })}` : "No due date";
  document.querySelector("#billCashflowPercent").textContent = `${paidPercent}%`;
  document.querySelector("#billCashflowPaid").style.width = `${paidPercent}%`;
  document.querySelector("#billCashflowPaidLabel").textContent = money(paid);
  document.querySelector("#billCashflowRemainingLabel").textContent = money(total - paid);
  const commandRing = document.querySelector("#billCommandRing");
  if (commandRing) {
    commandRing.style.setProperty("--bill-progress", `${paidPercent}%`);
    commandRing.querySelector("b").textContent = `${paidPercent}%`;
  }
  const hubNext = document.querySelector("#moneyHubNextBill");
  const hubRemaining = document.querySelector("#moneyHubBillsRemaining");
  if (hubNext) hubNext.textContent = nextLabel;
  if (hubRemaining) hubRemaining.textContent = money(total - paid);
  const hubOrbit = document.querySelector("#moneyHubBillOrbit");
  if (hubOrbit) {
    hubOrbit.style.setProperty("--bill-progress", `${paidPercent}%`);
    hubOrbit.querySelector("b").textContent = `${paidPercent}%`;
  }
  const priorityGrid = document.querySelector("#billPriorityGrid");
  if (priorityGrid) {
    priorityGrid.innerHTML = "";
    const queue = [
      ...pastDue.map((item) => ({ ...item, isPastDue: true })),
      ...upcoming
    ];
    const miniCount = document.querySelector("#billPriorityMiniCount");
    if (miniCount) miniCount.textContent = String(queue.length);
    const largestAmount = Math.max(0, ...queue.map((item) => Number(item.amount || 0)));
    (queue.length ? queue.slice(0, 6) : [{ name: "No unpaid bills in the rolling 10-day window", amount: 0, dateLabel: "Clear", category: "Payment queue" }]).forEach((item, index) => {
      const card = document.createElement("button");
      card.type = "button";
      const isLargest = queue.length > 1 && Number(item.amount || 0) === largestAmount;
      card.className = `bill-priority-card${index === 0 ? " is-next" : ""}${item.isPastDue ? " is-past-due" : ""}${isLargest ? " is-largest" : ""}`;
      const timing = item.date ? askDaysFromToday(localDateKey(item.date)) : null;
      const timingLabel = item.isPastDue ? "Past due" : timing === 0 ? "Due today" : timing > 0 ? `${timing}d remaining` : escapeHtml(item.category || "Bill");
      card.innerHTML = `<span>${item.isPastDue ? "!" : String(index + 1).padStart(2, "0")}</span><div><small>${isLargest ? "Largest upcoming" : timingLabel}</small><strong>${escapeHtml(item.name || "Bill")}</strong><p>${escapeHtml(item.dateLabel || "Date not set")}</p></div><b>${money(Number(item.amount || 0))}</b>`;
      card.addEventListener("click", () => document.querySelector("#billRows")?.scrollIntoView({ behavior: "smooth", block: "center" }));
      priorityGrid.append(card);
    });
  }

  const billSearch = document.querySelector("#billSearch");
  const billFilter = document.querySelector("#billStatusFilter");
  const billSort = document.querySelector("#billSort");
  if (billSearch && document.activeElement !== billSearch) billSearch.value = billViewState.search;
  if (billFilter) billFilter.value = billViewState.filter;
  if (billSort) billSort.value = billViewState.sort;
  const normalizedSearch = billViewState.search.trim().toLowerCase();
  const filtered = state.bills.map((bill, index) => ({ bill, index, intelligence: billIntelligence(bill) }))
    .filter(({ bill, intelligence }) => {
      const matchesSearch = !normalizedSearch || [bill.name, bill.category, bill.note, bill.due].some((value) => String(value || "").toLowerCase().includes(normalizedSearch));
      if (!matchesSearch) return false;
      if (billViewState.filter === "paid") return bill.paid;
      if (billViewState.filter === "unpaid") return !bill.paid;
      if (billViewState.filter === "week") return !bill.paid && intelligence.days !== null && intelligence.days >= 0 && intelligence.days <= 7;
      if (billViewState.filter === "overdue") return intelligence.status === "overdue";
      return true;
    });
  filtered.sort((a, b) => {
    if (billViewState.sort === "amount-desc") return Number(b.bill.amount || 0) - Number(a.bill.amount || 0);
    if (billViewState.sort === "amount-asc") return Number(a.bill.amount || 0) - Number(b.bill.amount || 0);
    if (billViewState.sort === "name") return String(a.bill.name).localeCompare(String(b.bill.name));
    return (a.intelligence.event?.date || Infinity) - (b.intelligence.event?.date || Infinity);
  });
  body.innerHTML = "";
  filtered.forEach(({ bill, index }) => renderBillLedgerRow(body, bill, index));
  const empty = document.querySelector("#billEmptyState");
  if (empty) empty.hidden = filtered.length > 0;
  renderNotifications();

  const checklist = document.querySelector("#billChecklist");
  checklist.innerHTML = "";
  state.billChecklist.forEach((item, index) => checklist.append(editableItem(item, (patch) => {
    state.billChecklist[index] = { ...state.billChecklist[index], ...patch };
  }, () => {
    state.billChecklist.splice(index, 1);
    saveState();
    renderBills();
  })));
  renderBillStrategyInsights();
}

function renderBillStrategyInsights() {
  const upcomingWrap = document.querySelector("#billStrategyUpcoming");
  const overdueWrap = document.querySelector("#billStrategyPastDue");
  const priorityWrap = document.querySelector("#billStrategyPriority");
  if (!upcomingWrap && !overdueWrap && !priorityWrap) return;
  const upcoming = getRollingBillEvents(activeDate, 10).filter((item) => !item.paid).slice(0, 6);
  const overdue = getPastDueBills(activeDate, 90).filter((item) => !item.paid).slice(0, 6);
  const renderItems = (wrap, items, emptyText) => {
    if (!wrap) return;
    wrap.innerHTML = "";
    if (!items.length) {
      wrap.innerHTML = `<div class="empty-state"><strong>${escapeHtml(emptyText)}</strong><small>Your saved bill data remains available in Monthly Bills.</small></div>`;
      return;
    }
    items.forEach((item) => {
      const row = document.createElement("article");
      const date = item.date instanceof Date ? item.date : new Date(item.date || item.dateKey);
      const distance = Number.isNaN(date.getTime()) ? null : dayDistance(date);
      row.innerHTML = `<span>${distance === null ? "--" : distance < 0 ? `${Math.abs(distance)}d late` : distance === 0 ? "Today" : `${distance}d`}</span><div><strong>${escapeHtml(item.name || "Bill")}</strong><small>${escapeHtml(item.dateLabel || date.toLocaleDateString())}</small></div><b>${money(Number(item.amount || 0))}</b>`;
      wrap.append(row);
    });
  };
  renderItems(upcomingWrap, upcoming, "No unpaid bills in the next 10 days.");
  renderItems(overdueWrap, overdue, "No past-due bills.");
  if (priorityWrap) {
    const total = state.bills.reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
    const remaining = state.bills.filter((bill) => !bill.paid).reduce((sum, bill) => sum + Number(bill.amount || 0), 0);
    priorityWrap.innerHTML = `
      <article><span>Review</span><div><strong>${state.bills.length} monthly obligations</strong><small>${money(remaining)} remaining from ${money(total)}</small></div></article>
      <article><span>Adjust</span><div><strong>${overdue.length ? "Resolve overdue items first" : "Protect the next due date"}</strong><small>Review subscriptions, minimum payments, and buffer cash.</small></div></article>
    `;
  }
}

function compareBillsByDue(a, b) {
  const rank = (bill) => {
    const due = String(bill.due || "").trim().toLowerCase();
    if (/^\d+$/.test(due)) return Number(due);
    if (due.includes("weekly")) return 32;
    if (due.includes("biweekly")) return 33;
    if (due.includes("monthly")) return 34;
    return 35;
  };
  return rank(a) - rank(b) || String(a.name).localeCompare(String(b.name));
}

function renderSchool() {
  const attendance = document.querySelector("#attendanceList");
  attendance.innerHTML = "";
  state.classes = state.classes.map(normalizeClassItem);
  state.classes.forEach((classItem, index) => {
    const card = document.createElement("div");
    card.className = "task-card";
    const attended = document.createElement("label");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.checked = !!day()[`class-${index}-attended`];
    check.addEventListener("change", () => {
      day()[`class-${index}-attended`] = check.checked;
      saveState();
    });
    attended.append("Attended today", check);
    card.append(
      classAdvancedEditor(classItem),
      attended
    );
    const del = document.createElement("button");
    del.className = "danger-btn";
    del.textContent = "Delete Class";
    del.addEventListener("click", () => {
      state.classes.splice(index, 1);
      saveState();
      renderSchool();
      renderStudy();
      renderDashboard();
    });
    card.append(del);
    attendance.append(card);
  });

  const assignments = document.querySelector("#assignmentList");
  assignments.innerHTML = "";
  state.assignments.forEach((item, index) => {
    const card = document.createElement("div");
    card.className = "task-card";
    card.append(
      input(item.title || item.text, (value) => item.title = value, { placeholder: "Assignment title" }),
      select(item.type || "Assignment", ["Assignment", "Homework", "Presentation", "Project", "Paper", "Lab"], (value) => item.type = value),
      assignmentClassControl(item),
      input(item.due, (value) => item.due = value, { type: "datetime-local" }),
      select(item.priority || "Medium", ["Low", "Medium", "High", "Urgent"], (value) => item.priority = value),
      select(item.status || "Not started", ["Not started", "Working", "Submitted", "Graded"], (value) => updateCompletionDate(item, value, ["Submitted", "Graded"])),
      input(item.note, (value) => item.note = value, { placeholder: "Instructions, rubric, link, reminder" })
    );
    const del = document.createElement("button");
    del.className = "danger-btn";
    del.textContent = "Delete Assignment";
    del.addEventListener("click", () => {
      state.assignments.splice(index, 1);
      saveState();
      renderSchool();
    });
    card.append(del);
    assignments.append(card);
  });
}

function studyDurationMinutes(start, end) {
  if (!start || !end) return "";
  const minutes = Math.round((new Date(end) - new Date(start)) / 60000);
  return Number.isFinite(minutes) && minutes > 0 ? `${minutes} minutes` : "";
}

function renderStudySystem() {
  document.querySelector("#studySystem").innerHTML = `
    <ol>
      <li><strong>Preview:</strong> spend 5 minutes reading headings and goals.</li>
      <li><strong>Focus:</strong> study for 25-50 minutes with your phone away.</li>
      <li><strong>Active recall:</strong> close notes and answer from memory.</li>
      <li><strong>Practice:</strong> solve problems, code, or write until mistakes appear.</li>
      <li><strong>Review:</strong> write what you missed and schedule the next review.</li>
    </ol>
  `;
}

function rotatingSignal(list, offset = 0) {
  if (!list.length) return "";
  const now = new Date();
  const tenMinuteBlock = Math.floor(now.getTime() / 600000);
  const activeDaySeed = Math.floor(new Date(`${activeDate}T12:00:00`).getTime() / 86400000);
  return list[(tenMinuteBlock + activeDaySeed + offset) % list.length];
}

function renderStudyFutureWidgets() {
  const java = javaModules[state.javaModule || 0];
  const nextAssignment = state.assignments
    .filter((item) => (item.status || "Not started") !== "Submitted" && (item.status || "Not started") !== "Graded")
    .sort((a, b) => new Date(a.due || "2999-12-31") - new Date(b.due || "2999-12-31"))[0];
  const openStudyBlock = state.studyBlocks.find((block) => (block.status || "Planned") !== "Done");
  fillStatus("#studyFutureNext", [
    { text: rotatingSignal(successLearningSignals), source: "Success learning system", page: "study" },
    { text: `Java next: ${java?.title || "Java fundamentals"} - ${java?.practice || "code one small exercise today"}`, source: "Complete Java", page: "java" }
  ]);
  fillStatus("#studyFutureCareer", [
    { text: rotatingSignal(successCareerSignals, 3), source: "Powerful life roadmap", page: "roadmap" },
    { text: nextAssignment ? `School priority: ${nextAssignment.title || "Assignment"}${nextAssignment.due ? ` due ${new Date(nextAssignment.due).toLocaleString()}` : ""}` : "No urgent assignment found. Use the next block for portfolio proof.", source: "Study Hub", page: "study" }
  ]);
  fillStatus("#studyFutureProject", [
    { text: rotatingSignal(successProjectSignals, 7), source: "Project builder", page: "java" },
    { text: openStudyBlock ? `Next study block: ${openStudyBlock.subject || "Study"} - ${openStudyBlock.topic || openStudyBlock.goal || "finish one clear task"}` : "After building, push one improvement to GitHub and write what changed.", source: "Developer habit", page: "github" }
  ]);
}

function renderDevLessonCoach() {
  const title = document.querySelector("#devLessonTitle");
  if (!title) return;
  const track = developerLessonTracks[state.devLessonTrack] ? state.devLessonTrack : "fullstack";
  const lessons = developerLessonTracks[track] || developerLessonTracks.fullstack;
  const index = ((Number(state.devLessonIndex) || 0) % lessons.length + lessons.length) % lessons.length;
  const lesson = lessons[index];
  document.querySelectorAll(".dev-track-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.devTrack === track);
  });
  title.textContent = lesson.title;
  document.querySelector("#devLessonBody").textContent = lesson.body;
  const steps = document.querySelector("#devLessonSteps");
  steps.innerHTML = "";
  lesson.steps.forEach((step, stepIndex) => {
    const tile = document.createElement("div");
    tile.className = "lesson-step-tile";
    tile.innerHTML = `<span>${stepIndex + 1}</span><p>${step}</p>`;
    steps.append(tile);
  });
  fillStatus("#devLessonPractice", [
    { text: lesson.practice, source: "Study Hub lesson coach", page: "study" },
    { text: `Track: ${track}. Lesson ${index + 1} of ${lessons.length}. Click Next Lesson for the next one.`, source: "Built-in roadmap", page: "study" }
  ]);
}

function renderStudy() {
  const wrap = document.querySelector("#studyBlocks");
  wrap.innerHTML = "";
  renderStudySchoolPanels();
  state.studyBlocks.forEach((block, index) => {
    const card = document.createElement("article");
    card.className = "task-card";
    const duration = document.createElement("p");
    duration.className = "muted";
    duration.textContent = studyDurationMinutes(block.start, block.end) || "Set start and end time.";
    card.append(
      input(block.subject, (value) => block.subject = value, { placeholder: "Subject" }),
      input(block.topic, (value) => block.topic = value, { placeholder: "Topic / chapter" }),
      input(block.start, (value) => block.start = value, { type: "datetime-local" }),
      input(block.end, (value) => block.end = value, { type: "datetime-local" }),
      input(block.goal, (value) => block.goal = value, { placeholder: "Goal" }),
      select(block.method || "Pomodoro", ["Pomodoro", "Deep Work", "Practice Problems", "Active Recall", "Review"], (value) => block.method = value),
      select(block.status || "Planned", ["Planned", "In progress", "Done"], (value) => updateCompletionDate(block, value, ["Done"])),
      duration
    );
    const del = document.createElement("button");
    del.className = "danger-btn";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      state.studyBlocks.splice(index, 1);
      saveState();
      renderStudy();
    });
    card.append(del);
    wrap.append(card);
  });
  renderStudySystem();
  renderStudyFutureWidgets();
  renderDevLessonCoach();
  renderLearningSites();
  setField("#schoolStudySpace", state.schoolStudySpace || "", (value) => state.schoolStudySpace = value);
  setField("#projectStudySpace", state.projectStudySpace || "", (value) => state.projectStudySpace = value);
  setField("#developerStudySpace", state.developerStudySpace || "", (value) => state.developerStudySpace = value);
  applyStudyLayoutState();
}

function setStudySectionCollapsed(zone, collapsed) {
  const key = zone.dataset.studySection;
  if (!key) return;
  state.studyLayout.sections[key] = collapsed;
  zone.classList.toggle("is-collapsed", collapsed);
  const toggle = zone.querySelector(":scope > .study-zone-head .study-zone-toggle");
  if (toggle) {
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.title = `${collapsed ? "Expand" : "Collapse"} ${zone.querySelector(":scope > .study-zone-head h3")?.textContent || "section"}`;
    toggle.querySelector("span").textContent = collapsed ? "Expand" : "Collapse";
    toggle.querySelector("strong").textContent = collapsed ? "+" : "\u2212";
  }
}

function setStudyCardCollapsed(card, collapsed) {
  const key = card.dataset.studyCard;
  if (!key) return;
  state.studyLayout.cards[key] = collapsed;
  card.classList.toggle("is-collapsed", collapsed);
  const toggle = card.querySelector(":scope > .study-card-header .study-card-toggle");
  if (toggle) {
    toggle.setAttribute("aria-expanded", String(!collapsed));
    toggle.title = `${collapsed ? "Expand" : "Collapse"} ${card.querySelector(":scope > .study-card-header h3")?.textContent || "card"}`;
    toggle.textContent = collapsed ? "+" : "\u2212";
  }
}

function applyStudyLayoutState() {
  document.querySelectorAll("#study .study-zone[data-study-section]").forEach((zone) => {
    setStudySectionCollapsed(zone, !!state.studyLayout.sections[zone.dataset.studySection]);
  });
  document.querySelectorAll("#study .study-collapsible-card[data-study-card]").forEach((card) => {
    setStudyCardCollapsed(card, !!state.studyLayout.cards[card.dataset.studyCard]);
  });
}

function initializeStudyLayout() {
  document.querySelectorAll("#study .study-zone[data-study-section]").forEach((zone) => {
    const toggle = zone.querySelector(":scope > .study-zone-head .study-zone-toggle");
    toggle?.addEventListener("click", () => {
      setStudySectionCollapsed(zone, !zone.classList.contains("is-collapsed"));
      forceSaveState();
    });
  });

  document.querySelectorAll("#study .study-collapsible-card[data-study-card]").forEach((card) => {
    if (card.dataset.studyEnhanced === "true") return;
    const title = card.querySelector(":scope > h3");
    if (!title) return;
    const header = document.createElement("div");
    header.className = "study-card-header";
    const body = document.createElement("div");
    body.className = "study-card-body";
    [...card.childNodes].forEach((node) => {
      if (node !== title) body.append(node);
    });
    const toggle = document.createElement("button");
    toggle.className = "study-card-toggle";
    toggle.type = "button";
    toggle.setAttribute("aria-expanded", "true");
    toggle.textContent = "\u2212";
    toggle.addEventListener("click", () => {
      setStudyCardCollapsed(card, !card.classList.contains("is-collapsed"));
      forceSaveState();
    });
    header.append(title, toggle);
    card.append(header, body);
    card.dataset.studyEnhanced = "true";
  });

  document.querySelector("#expandStudySections")?.addEventListener("click", () => {
    document.querySelectorAll("#study .study-zone[data-study-section]").forEach((zone) => setStudySectionCollapsed(zone, false));
    document.querySelectorAll("#study .study-collapsible-card[data-study-card]").forEach((card) => setStudyCardCollapsed(card, false));
    forceSaveState();
  });
  document.querySelector("#collapseStudySections")?.addEventListener("click", () => {
    document.querySelectorAll("#study .study-zone[data-study-section]").forEach((zone) => setStudySectionCollapsed(zone, true));
    document.querySelectorAll("#study .study-collapsible-card[data-study-card]").forEach((card) => setStudyCardCollapsed(card, true));
    forceSaveState();
  });
  applyStudyLayoutState();
}

function restructureStudyHub() {
  const schoolZone = document.querySelector("#study .school-zone");
  const destinations = {
    classes: "#schoolClassesDetail",
    assignments: "#schoolAssignmentsDetail",
    dates: "#schoolDatesDetail",
    tasks: "#schoolTasksDetail"
  };
  Object.entries(destinations).forEach(([key, selector]) => {
    const card = schoolZone?.querySelector(`[data-study-card="${key}"]`);
    const destination = document.querySelector(selector);
    if (card && destination && !destination.contains(card)) {
      card.classList.remove("study-collapsible-card");
      destination.append(card);
    }
  });
  schoolZone?.remove();
  [
    [".signal-zone", "#studySignalsDetail"],
    [".developer-zone", "#studyDeveloperDetail"],
    [".learning-zone", "#studyWorkspaceDetail"],
    [".resource-zone", "#studyResourcesDetail"],
    [".media-zone", "#studyMediaDetail"]
  ].forEach(([sourceSelector, destinationSelector]) => {
    const source = document.querySelector(`#study ${sourceSelector}`);
    const destination = document.querySelector(destinationSelector);
    if (source && destination && !destination.contains(source)) {
      source.classList.remove("study-zone");
      source.querySelector(":scope > .study-zone-head .study-zone-toggle")?.remove();
      destination.append(source);
    }
  });
  document.querySelector("#expandStudySections")?.remove();
  document.querySelector("#collapseStudySections")?.remove();
}

function renderStudySchoolPanels() {
  const classWrap = document.querySelector("#studyClassList");
  const assignmentWrap = document.querySelector("#studyAssignmentList");
  const importantDateWrap = document.querySelector("#studyImportantDates");
  const taskWrap = document.querySelector("#studyTaskList");
  if (!state.importantDates) state.importantDates = [];
  if (classWrap) {
    classWrap.innerHTML = "";
    state.classes = state.classes.map(normalizeClassItem);
    state.classes.forEach((classItem, index) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.append(classAdvancedEditor(classItem));
      const del = document.createElement("button");
      del.className = "danger-btn";
      del.textContent = "Delete Class";
      del.addEventListener("click", () => {
        state.classes.splice(index, 1);
        saveState();
        renderStudySchoolPanels();
        renderSchool();
        renderDashboard();
      });
      card.append(del);
      classWrap.append(card);
    });
  }
  if (assignmentWrap) {
    assignmentWrap.innerHTML = "";
    state.assignments.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "task-card";
      card.append(
        input(item.title || item.text, (value) => item.title = value, { placeholder: "Assignment title" }),
        select(item.type || "Assignment", ["Assignment", "Homework", "Presentation", "Project", "Paper", "Lab"], (value) => item.type = value),
        assignmentClassControl(item),
        input(item.due, (value) => item.due = value, { type: "datetime-local" }),
        select(item.priority || "Medium", ["Low", "Medium", "High", "Urgent"], (value) => item.priority = value),
        select(item.status || "Not started", ["Not started", "Working", "Submitted", "Graded"], (value) => updateCompletionDate(item, value, ["Submitted", "Graded"])),
        input(item.note, (value) => item.note = value, { placeholder: "Notes / link" })
      );
      const del = document.createElement("button");
      del.className = "danger-btn";
      del.textContent = "Delete Assignment";
      del.addEventListener("click", () => {
        state.assignments.splice(index, 1);
        saveState();
        renderStudySchoolPanels();
        renderSchool();
        renderDashboard();
      });
      card.append(del);
      assignmentWrap.append(card);
    });
  }
  if (importantDateWrap) {
    importantDateWrap.innerHTML = "";
    state.importantDates
      .sort((a, b) => new Date(a.when || "2999-12-31") - new Date(b.when || "2999-12-31"))
      .forEach((item) => {
        const index = state.importantDates.indexOf(item);
        const card = document.createElement("div");
        card.className = "task-card important-date-card";
        const timing = document.createElement("p");
        timing.className = "muted";
        timing.textContent = item.when ? new Date(item.when).toLocaleString() : "Set date and time.";
        card.append(
          input(item.title, (value) => item.title = value, { placeholder: "Exam, registration, presentation..." }),
          input(item.className, (value) => item.className = value, { placeholder: "Class / category" }),
          input(item.when, (value) => item.when = value, { type: "datetime-local" }),
          select(item.type || "Exam", ["Exam", "Quiz", "Presentation", "Registration", "Meeting", "Deadline", "Other"], (value) => item.type = value),
          select(item.status || "Upcoming", ["Upcoming", "Prepared", "Done"], (value) => updateCompletionDate(item, value, ["Done"])),
          input(item.note, (value) => item.note = value, { placeholder: "What to prepare / bring / submit" }),
          timing
        );
        const del = document.createElement("button");
        del.className = "danger-btn";
        del.textContent = "Delete Date";
        del.addEventListener("click", () => {
          const deletedKey = `${item.title || ""}|${item.when || ""}`;
          state.importantDates.splice(index, 1);
          if (state.dismissedImportantDate === deletedKey) state.dismissedImportantDate = "";
          forceSaveState();
          renderStudySchoolPanels();
          renderSchool();
          renderDashboard();
        });
        card.append(del);
        importantDateWrap.append(card);
      });
  }
  if (taskWrap) {
    taskWrap.innerHTML = "";
    state.tasks.filter((task) => task.category === "School").forEach((task) => {
      const index = state.tasks.indexOf(task);
      const card = document.createElement("div");
      card.className = "task-card";
      card.append(
        input(task.title, (value) => task.title = value, { placeholder: "Task title" }),
        input(task.due, (value) => task.due = value, { type: "date" }),
        select(task.priority || "Medium", ["Low", "Medium", "High", "Urgent"], (value) => task.priority = value),
        select(task.status || "Backlog", ["Backlog", "Doing", "Done"], (value) => updateTaskStatus(task, value)),
        input(task.note, (value) => task.note = value, { placeholder: "Task notes" })
      );
      const del = document.createElement("button");
      del.className = "danger-btn";
      del.textContent = "Delete Task";
      del.addEventListener("click", () => {
        state.tasks.splice(index, 1);
        saveState();
        renderStudySchoolPanels();
        renderTasks();
        renderDashboard();
      });
      card.append(del);
      taskWrap.append(card);
    });
  }
  renderSchoolCommandSummary();
}

function renderSchoolCommandSummary() {
  const openAssignments = state.assignments.filter((item) => !["Submitted", "Graded"].includes(item.status || "Not started"));
  const upcomingDates = state.importantDates
    .filter((item) => item.status !== "Done")
    .sort((a, b) => new Date(a.when || "2999-12-31") - new Date(b.when || "2999-12-31"));
  const schoolTasks = state.tasks.filter((task) => task.category === "School" && task.status !== "Done");
  const nextClass = state.classes.map(normalizeClassItem)[0];
  const nextAssignment = openAssignments.slice().sort((a, b) => new Date(a.due || "2999-12-31") - new Date(b.due || "2999-12-31"))[0];
  const nextDate = upcomingDates[0];
  const nextTask = schoolTasks.slice().sort((a, b) => String(a.due || "2999-12-31").localeCompare(String(b.due || "2999-12-31")))[0];
  const values = [
    ["#schoolClassCount", state.classes.length, "#schoolClassPreview", nextClass ? `${nextClass.name || "Class"} with ${nextClass.teacher || "professor not set"}` : "No classes scheduled."],
    ["#schoolAssignmentCount", openAssignments.length, "#schoolAssignmentPreview", nextAssignment ? `${nextAssignment.title || "Assignment"}${nextAssignment.due ? ` due ${new Date(nextAssignment.due).toLocaleDateString()}` : ""}` : "No open assignments."],
    ["#schoolDateCount", upcomingDates.length, "#schoolDatePreview", nextDate ? `${nextDate.title || "Important date"}${nextDate.when ? ` on ${new Date(nextDate.when).toLocaleDateString()}` : ""}` : "No upcoming dates."],
    ["#schoolTaskCount", schoolTasks.length, "#schoolTaskPreview", nextTask ? nextTask.title || "School task" : "No school tasks."]
  ];
  values.forEach(([countSelector, count, previewSelector, preview]) => {
    const countNode = document.querySelector(countSelector);
    const previewNode = document.querySelector(previewSelector);
    if (countNode) countNode.textContent = count;
    if (previewNode) previewNode.textContent = preview;
  });
  const semester = state.academicSemester || defaultState().academicSemester;
  const attendance = semesterAttendanceMetrics();
  const examCount = upcomingDates.filter((item) => /exam|test|midterm|final/i.test(`${item.type || ""} ${item.title || ""}`)).length;
  const snapshot = {
    academicSnapshotGpa: semester.gpaGoal ? `GPA goal ${semester.gpaGoal}` : "GPA not set",
    academicSnapshotClasses: state.classes.length,
    academicSnapshotDue: openAssignments.length,
    academicSnapshotExams: examCount,
    academicSnapshotAttendance: attendance.rate === null ? "--" : `${attendance.rate}%`
  };
  Object.entries(snapshot).forEach(([id, value]) => {
    const node = document.querySelector(`#${id}`);
    if (node) node.textContent = value;
  });
  renderAcademicSemesterSummary();
}

function semesterAttendanceMetrics() {
  const records = Array.isArray(state.attendanceRecords) ? state.attendanceRecords : [];
  const attended = records.filter((record) => ["Present", "Late"].includes(record.status)).length;
  const absent = records.filter((record) => record.status === "Absent").length;
  const excused = records.filter((record) => record.status === "Excused").length;
  const counted = attended + absent;
  return {
    records,
    attended,
    absent,
    excused,
    rate: counted ? Math.round((attended / counted) * 100) : null
  };
}

function renderAcademicSemesterSummary() {
  const semester = state.academicSemester || defaultState().academicSemester;
  const metrics = semesterAttendanceMetrics();
  const termPreview = document.querySelector("#semesterTermPreview");
  const attendancePreview = document.querySelector("#semesterAttendancePreview");
  if (termPreview) termPreview.textContent = semester.academicYear ? `${semester.term} ${semester.academicYear}` : "Set up";
  if (attendancePreview) {
    attendancePreview.textContent = metrics.rate === null
      ? "Add your current term and track attendance."
      : `${metrics.rate}% attendance across ${metrics.records.length} saved record${metrics.records.length === 1 ? "" : "s"}.`;
  }
}

function renderAcademicSemester() {
  const semester = state.academicSemester = { ...defaultState().academicSemester, ...(state.academicSemester || {}) };
  state.attendanceRecords = Array.isArray(state.attendanceRecords) ? state.attendanceRecords : [];
  const fields = {
    semesterTerm: "term",
    semesterAcademicYear: "academicYear",
    semesterSchool: "school",
    semesterProgram: "program",
    semesterStartDate: "startDate",
    semesterEndDate: "endDate",
    semesterCredits: "credits",
    semesterGpaGoal: "gpaGoal",
    semesterAdvisor: "advisor",
    semesterStatus: "status",
    semesterNotes: "notes"
  };
  Object.entries(fields).forEach(([id, key]) => {
    const field = document.querySelector(`#${id}`);
    if (field && field.value !== String(semester[key] ?? "")) field.value = semester[key] ?? "";
  });

  const title = document.querySelector("#semesterHeroTitle");
  const meta = document.querySelector("#semesterHeroMeta");
  const termName = [semester.term, semester.academicYear].filter(Boolean).join(" ");
  if (title) title.textContent = termName || "Set up your current term";
  if (meta) {
    meta.textContent = [
      semester.program || "Program not set",
      semester.school || "School not set",
      semester.status || "Planning"
    ].join(" · ");
  }
  const metrics = semesterAttendanceMetrics();
  const creditsStat = document.querySelector("#semesterCreditsStat");
  const classesStat = document.querySelector("#semesterClassesStat");
  const attendanceStat = document.querySelector("#semesterAttendanceStat");
  if (creditsStat) creditsStat.textContent = semester.credits || "0";
  if (classesStat) classesStat.textContent = state.classes.length;
  if (attendanceStat) attendanceStat.textContent = metrics.rate === null ? "No records" : `${metrics.rate}%`;

  const classSelect = document.querySelector("#semesterAttendanceClass");
  if (classSelect) {
    const current = classSelect.value;
    const names = state.classes.map(normalizeClassItem).map((item) => item.name).filter(Boolean);
    classSelect.innerHTML = names.length
      ? names.map((name) => `<option value="${escapeHtml(name)}">${escapeHtml(name)}</option>`).join("")
      : `<option value="General class">General class</option>`;
    if (names.includes(current)) classSelect.value = current;
  }
  const dateInput = document.querySelector("#semesterAttendanceDate");
  if (dateInput && !dateInput.value) dateInput.value = activeDate;

  const summary = document.querySelector("#semesterAttendanceSummary");
  if (summary) {
    summary.innerHTML = `
      <div><span>Attendance rate</span><strong>${metrics.rate === null ? "—" : `${metrics.rate}%`}</strong></div>
      <div><span>Present / Late</span><strong>${metrics.attended}</strong></div>
      <div><span>Absent</span><strong>${metrics.absent}</strong></div>
      <div><span>Excused</span><strong>${metrics.excused}</strong></div>
    `;
  }
  const count = document.querySelector("#semesterAttendanceCount");
  if (count) count.textContent = `${metrics.records.length} record${metrics.records.length === 1 ? "" : "s"}`;

  const recordsWrap = document.querySelector("#semesterAttendanceRecords");
  if (recordsWrap) {
    recordsWrap.innerHTML = "";
    const records = state.attendanceRecords.slice().sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
    if (!records.length) {
      recordsWrap.innerHTML = `<div class="semester-empty-state"><span>AT</span><strong>No attendance records yet</strong><p>Choose a class, date, and status above to create your first record.</p></div>`;
    } else {
      records.forEach((record) => {
        const originalIndex = state.attendanceRecords.indexOf(record);
        const card = document.createElement("article");
        card.className = `semester-attendance-record status-${String(record.status || "present").toLowerCase().replace(/\s+/g, "-")}`;
        card.innerHTML = `
          <div class="attendance-record-icon">${record.status === "Absent" ? "A" : record.status === "Late" ? "L" : record.status === "Excused" ? "E" : "P"}</div>
          <div>
            <small>${escapeHtml(record.date ? new Date(`${record.date}T12:00:00`).toLocaleDateString() : "Date not set")}</small>
            <strong>${escapeHtml(record.className || "General class")}</strong>
            <p>${escapeHtml(record.note || "No additional note.")}</p>
          </div>
          <span class="attendance-status-chip">${escapeHtml(record.status || "Present")}</span>
        `;
        const del = document.createElement("button");
        del.className = "danger-btn compact-action";
        del.type = "button";
        del.textContent = "Delete";
        del.addEventListener("click", () => {
          state.attendanceRecords.splice(originalIndex, 1);
          forceSaveState();
          renderAcademicSemester();
          renderAcademicSemesterSummary();
        });
        card.append(del);
        recordsWrap.append(card);
      });
    }
  }
  renderAcademicSemesterSummary();
}

function renderLearningSites() {
  const wrap = document.querySelector("#learningSites");
  if (!wrap) return;
  wrap.innerHTML = "";
  state.learningSites.filter((site) => !site.locked).forEach((site) => {
    const index = state.learningSites.indexOf(site);
    const row = document.createElement("div");
    row.className = "resource-edit-card";
    row.append(
      input(site.title, (value) => site.title = value, { placeholder: "Site name" }),
      input(site.url, (value) => site.url = value, { placeholder: "https://..." }),
      input(site.note, (value) => site.note = value, { placeholder: "How this helps" })
    );
    const actions = document.createElement("div");
    actions.className = "resource-links";
    const open = document.createElement("a");
    open.className = "ghost-btn";
    open.textContent = "Open";
    open.href = site.url || "#";
    open.target = "_blank";
    open.rel = "noreferrer";
    const del = document.createElement("button");
    del.className = "danger-btn";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      state.learningSites.splice(index, 1);
      saveState();
      renderLearningSites();
    });
    actions.append(open, del);
    row.append(actions);
    wrap.append(row);
  });
  if (!wrap.children.length) {
    const empty = document.createElement("p");
    empty.className = "muted";
    empty.textContent = "Add your own learning sites here.";
    wrap.append(empty);
  }
}

function setResourceTab(tabName = "core") {
  document.querySelectorAll(".resource-tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.resourceTab === tabName);
  });
  document.querySelectorAll(".resource-panel").forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.resourcePanel === tabName);
  });
}

function renderHealth() {
  if (!state.health) state.health = defaultState().health;
  if (!Array.isArray(state.health.sleepSessions)) state.health.sleepSessions = [];
  setField("#sleepTime", state.health.sleepTime || "", (value) => {
    state.health.sleepTime = value;
    updatePlannedSleepQuality();
  });
  setField("#wakeTime", state.health.wakeTime || "", (value) => {
    state.health.wakeTime = value;
    updatePlannedSleepQuality();
  });
  setField("#healthNotes", state.health.notes || "", (value) => state.health.notes = value);
  const latestSleep = state.health.sleepSessions[0];
  const latestSleepMs = latestSleep ? new Date(latestSleep.end) - new Date(latestSleep.start) : sleepDurationMs(state.health.sleepTime, state.health.wakeTime);
  state.health.sleepQuality = sleepRating(latestSleepMs);
  const quality = document.querySelector("#sleepQuality");
  if (quality) quality.value = state.health.sleepQuality;
  const checklist = document.querySelector("#healthChecklist");
  checklist.innerHTML = "";
  state.health.checklist.forEach((item, index) => checklist.append(editableItem(item, (patch) => {
    state.health.checklist[index] = { ...state.health.checklist[index], ...patch };
    if (Object.prototype.hasOwnProperty.call(patch, "done")) requestAnimationFrame(renderHealth);
  }, () => {
    state.health.checklist.splice(index, 1);
    saveState();
    renderHealth();
  })));
  const completedHealthItems = state.health.checklist.filter((item) => item.done).length;
  const healthPercent = state.health.checklist.length ? Math.round(completedHealthItems / state.health.checklist.length * 100) : 0;
  const healthScore = document.querySelector("#healthChecklistScore");
  const healthProgress = document.querySelector("#healthChecklistProgress");
  if (healthScore) healthScore.textContent = `${healthPercent}%`;
  if (healthProgress) healthProgress.style.width = `${healthPercent}%`;
  const dailyScore = document.querySelector("#healthDailyScore");
  const sleepMetric = document.querySelector("#healthSleepMetric");
  const workoutMetric = document.querySelector("#healthWorkoutMetric");
  if (dailyScore) dailyScore.textContent = `${healthPercent}%`;
  if (sleepMetric) sleepMetric.textContent = latestSleep ? `${formatDuration(latestSleepMs)} - ${sleepRating(latestSleepMs)}` : "Not logged";
  if (workoutMetric) {
    const plan = workoutPlanForDate();
    const completedToday = (state.workouts || []).some((item) => item.done && String(item.date || item.endedAt || "").slice(0, 10) === activeDate);
    workoutMetric.textContent = completedToday ? "Completed today" : `${plan.title} planned`;
  }
  renderSleepTracker();
  renderNutritionPlan();
}

function renderNutritionPlan() {
  const tracker = state.nutritionTracker = { ...defaultState().nutritionTracker, ...(state.nutritionTracker || {}) };
  const water = document.querySelector("#nutritionWaterValue");
  const protein = document.querySelector("#nutritionProtein");
  const foodLog = document.querySelector("#nutritionFoodLog");
  const mealScore = document.querySelector("#nutritionMealScore");
  const mealWrap = document.querySelector("#nutritionMealChecklist");
  const trainingMeal = document.querySelector("#nutritionTrainingMeal");
  if (water) water.textContent = `${Number(tracker.water || 0)} cups`;
  if (protein && document.activeElement !== protein) protein.value = tracker.protein || "";
  if (foodLog && document.activeElement !== foodLog) foodLog.value = tracker.foodLog || "";
  if (mealWrap) {
    mealWrap.innerHTML = "";
    tracker.meals.forEach((meal, index) => {
      const label = document.createElement("label");
      const check = document.createElement("input");
      check.type = "checkbox";
      check.checked = !!meal.done;
      check.addEventListener("change", () => {
        tracker.meals[index].done = check.checked;
        forceSaveState();
        renderNutritionPlan();
      });
      label.append(check, document.createTextNode(meal.text));
      mealWrap.append(label);
    });
  }
  const completedMeals = tracker.meals.filter((meal) => meal.done).length;
  if (mealScore) mealScore.textContent = `${completedMeals} / ${tracker.meals.length} complete`;
  const plan = workoutPlanForDate();
  if (trainingMeal) trainingMeal.textContent = `${plan.title}: ${nutritionWorkoutGuidance(plan.title)}`;
  const wrap = document.querySelector("#nutrition30DayPlan");
  if (!wrap) return;
  wrap.innerHTML = "";
  nutritionDayTemplates.concat(nutritionDayTemplates, nutritionDayTemplates, nutritionDayTemplates, nutritionDayTemplates.slice(0, 2))
    .slice(0, 30)
    .forEach((plan, index) => {
      const details = document.createElement("details");
      details.className = "nutrition-day-card";
      details.open = index === 0;
      const summary = document.createElement("summary");
      summary.innerHTML = `
        <span>Day ${index + 1}</span>
        <strong>${plan.workout}</strong>
        <small>${index % 7 < 5 ? "Training fuel + recovery" : "Recovery nutrition"}</small>
        <b aria-hidden="true">+</b>
      `;
      const body = document.createElement("div");
      body.className = "nutrition-day-body";
      [
        ["Morning", plan.morning],
        ["Lunch", plan.midday],
        ["Pre-workout / Snack", plan.pre],
        ["Dinner / Post-workout", plan.evening],
        ["Night", plan.night]
      ].forEach(([label, meal]) => {
        const row = document.createElement("div");
        row.innerHTML = `<span>${label}</span><p>${meal}</p>`;
        body.append(row);
      });
      const training = document.createElement("div");
      training.className = "nutrition-workout-match";
      training.innerHTML = `<span>Workout match</span><strong>${plan.workout}</strong><p>${nutritionWorkoutGuidance(plan.workout)}</p>`;
      body.append(training);
      details.append(summary, body);
      wrap.append(details);
    });
}

function nutritionWorkoutGuidance(workout) {
  const guidance = {
    Push: "Use a normal carb serving before training and protein afterward to support chest, shoulder, and triceps recovery.",
    Pull: "Fuel rows and pulldowns with steady carbs; prioritize protein and water after the session.",
    Legs: "This is a demanding day. Eat the larger carb portions around training and do not skip the post-workout meal.",
    "Upper Body Power": "Keep meals predictable, train after a balanced meal or snack, and recover with protein plus carbohydrates.",
    "Lower + Fat Loss": "Fuel the strength work first. The incline walk supports calorie expenditure; it does not require starving afterward.",
    "Active Recovery": "Use moderate portions, consistent protein, vegetables, fruit, and plenty of water.",
    "Rest + Reset": "Keep protein high, reduce unnecessary snacks, prepare food, and use sleep to complete the training week."
  };
  return guidance[workout] || "Eat balanced meals, hydrate, and adjust portions to your activity.";
}

function renderSleepTracker() {
  const active = state.health?.sleepActiveStart;
  fillStatus("#sleepTimerStatus", [
    active ? `Running since ${new Date(active).toLocaleString()}` : "Sleep timer is not running."
  ]);
  const sessions = state.health?.sleepSessions || [];
  const wrap = document.querySelector("#sleepResults");
  if (!wrap) return;
  wrap.innerHTML = "";
  if (!sessions.length) {
    wrap.innerHTML = `<div class="sleep-empty-state">No sleep sessions saved yet.</div>`;
    return;
  }
  sessions.slice(0, 7).forEach((session) => {
    const durationMs = new Date(session.end) - new Date(session.start);
    const row = document.createElement("article");
    row.className = "sleep-history-row";
    row.innerHTML = `<div><small>${new Date(session.start).toLocaleDateString()}</small><strong>${formatDuration(durationMs)}</strong><span>${sleepRating(durationMs)}</span></div><button class="danger-btn compact-action" type="button">Delete</button>`;
    row.querySelector("button").addEventListener("click", () => {
      state.health.sleepSessions.splice(state.health.sleepSessions.indexOf(session), 1);
      forceSaveState();
      renderHealth();
      renderDashboard();
    });
    wrap.append(row);
  });
}

function saveManualSleepEntry() {
  if (!state.health) state.health = defaultState().health;
  const sleepTime = state.health.sleepTime;
  const wakeTime = state.health.wakeTime;
  const durationMs = sleepDurationMs(sleepTime, wakeTime);
  if (!sleepTime || !wakeTime || durationMs <= 0) {
    alert("Choose a valid sleep time and wake time first.");
    return;
  }
  const start = new Date(`${activeDate}T${sleepTime}:00`);
  const end = new Date(`${activeDate}T${wakeTime}:00`);
  if (end <= start) end.setDate(end.getDate() + 1);
  state.health.sleepSessions.unshift({
    start: start.toISOString(),
    end: end.toISOString(),
    quality: sleepRating(end - start),
    entryType: "manual"
  });
  state.health.sleepQuality = sleepRating(end - start);
  forceSaveState();
  renderHealth();
  renderDashboard();
}

function updatePlannedSleepQuality() {
  const plannedMs = sleepDurationMs(state.health?.sleepTime, state.health?.wakeTime);
  state.health.sleepQuality = sleepRating(plannedMs);
  const quality = document.querySelector("#sleepQuality");
  if (quality) quality.value = state.health.sleepQuality;
}

function startSleep() {
  if (!state.health) state.health = defaultState().health;
  state.health.sleepActiveStart = new Date().toISOString();
  saveState();
  renderHealth();
  renderDashboard();
}

function stopSleep() {
  if (!state.health?.sleepActiveStart) return;
  const end = new Date();
  const start = new Date(state.health.sleepActiveStart);
  state.health.sleepSessions.unshift({
    start: start.toISOString(),
    end: end.toISOString(),
    quality: sleepRating(end - start)
  });
  state.health.sleepQuality = sleepRating(end - start);
  state.health.sleepActiveStart = "";
  state.health.sleepTime = start.toTimeString().slice(0, 5);
  state.health.wakeTime = end.toTimeString().slice(0, 5);
  saveState();
  renderHealth();
  renderDashboard();
}

function renderHubNotes() {
  state.journalDraft = { ...defaultState().journalDraft, ...(state.journalDraft || {}) };
  setField("#journalDate", state.journalDraft.date || activeDate, (value) => state.journalDraft.date = value);
  setField("#journalTime", state.journalDraft.time || new Date().toTimeString().slice(0, 5), (value) => state.journalDraft.time = value);
  setField("#journalTitle", state.journalDraft.title || "", (value) => state.journalDraft.title = value);
  setField("#essentialsNotes", state.journalDraft.text || "", (value) => {
    state.journalDraft.text = value;
    state.essentialsNotes = value;
  });
  setField("#journalTags", state.journalDraft.tags || "", (value) => state.journalDraft.tags = value);
  const mood = document.querySelector("#journalMood");
  if (mood) {
    mood.value = state.journalDraft.mood || "Reflective";
    mood.onchange = () => {
      state.journalDraft.mood = mood.value;
      saveState();
    };
  }
  setField("#faithNotes", state.faithNotes || "", (value) => state.faithNotes = value);
  renderHeroJournalPulse();
}

function renderHeroJournalPulse() {
  const input = document.querySelector("#heroJournalText");
  const preview = document.querySelector("#heroJournalPreview");
  if (input && document.activeElement !== input) input.value = state.journalDraft?.text || "";
  const latest = (state.journalEntries || [])[0];
  if (preview) preview.textContent = latest
    ? `${latest.title || "Reflection"} · ${latest.date || ""} · ${String(latest.text || "").slice(0, 95)}${String(latest.text || "").length > 95 ? "..." : ""}`
    : "No reflection saved today.";
}

function renderHeroSystemPulse() {
  const message = document.querySelector("#heroPulseMessage");
  const status = document.querySelector("#heroPulseStatus");
  if (!message || !status) return;
  const d = day();
  const prayersDone = prayers.filter((name) => d.prayers?.[name]?.done).length;
  const openTasks = (state.tasks || []).filter((task) => !task.done).length;
  const nextBill = getUpcomingBills(activeDate, 12).find((item) => !item.paid);
  const workout = workoutPlanForDate();
  const signals = [
    `${prayersDone}/5 prayers complete`,
    `${openTasks} open task${openTasks === 1 ? "" : "s"}`,
    nextBill ? `${nextBill.name} is the next bill` : "Bills are clear",
    `${workout.title} is today's training plan`,
    "FahimOS is monitoring your active day"
  ];
  message.textContent = signals.join("  •  ");
  status.textContent = openTasks || prayersDone < 5 ? "SYSTEM ACTIVE" : "DAY COMPLETE";
}

function renderHeroSystemPulse() {
  const message = document.querySelector("#heroPulseMessage");
  const status = document.querySelector("#heroPulseStatus");
  if (!message || !status) return;
  const now = new Date();
  window.fahimPulseSeed ??= Math.floor(Math.random() * 10000);
  const nextBill = getUpcomingBills(activeDate, 12).find((item) => !item.paid);
  const dueBills = getUpcomingBills(activeDate, 7).filter((item) => !item.paid).slice(0, 3);
  const openTasks = (state.tasks || []).filter((task) => !task.done && !task.completed);
  const urgentTasks = openTasks
    .filter((task) => {
      const due = String(task.due || task.date || "").slice(0, 10);
      return due && due <= activeDate;
    })
    .slice(0, 3);
  const nextAssignment = [...(state.assignments || [])]
    .filter((item) => !item.done)
    .sort((a, b) => String(a.due || "").localeCompare(String(b.due || "")))[0];
  const newsItems = state.liveNews?.items?.length ? state.liveNews.items : fallbackNewsItems.map((text) => ({ text }));
  const sportsItems = state.liveNews?.sports?.length ? state.liveNews.sports : fallbackSportsNewsItems.map((text) => ({ text }));
  const news = newsItems[window.fahimPulseSeed % Math.max(1, newsItems.length)]?.text || "Latest US + world headlines loading";
  const sports = sportsItems[(window.fahimPulseSeed + 5) % Math.max(1, sportsItems.length)]?.text || "Sports headlines loading";
  const weather = state.liveWeather?.items?.[0]?.text || fallbackWeatherItems[window.fahimPulseSeed % Math.max(1, fallbackWeatherItems.length)];
  const findPulseTopic = (items, pattern, fallback) => items.find((item) => pattern.test(String(item.text || "")))?.text || fallback;
  const politics = findPulseTopic(newsItems, /politic|election|congress|white house|court|policy|government/i, "Politics watch: scan policy, election, court, and city updates.");
  const soccer = findPulseTopic(sportsItems, /soccer|football|world cup|mls|premier|champions|club soccer/i, "Soccer watch: club, World Cup, and transfer headlines are monitored.");
  const ufc = findPulseTopic(sportsItems, /ufc|mma|combat|fight|boxing/i, "UFC watch: next fight card, venue, and weigh-in updates are monitored.");
  const nba = findPulseTopic(sportsItems, /nba|basketball|knicks|nets|lakers|celtics/i, "NBA watch: scores, trades, injuries, and standings are monitored.");
  const cricket = findPulseTopic(sportsItems, /cricket|icc|t20|odi|test match/i, "Cricket watch: ICC, T20, ODI, and test updates are monitored.");
  const traffic = findPulseTopic(newsItems, /traffic|transit|mta|subway|road|bridge|tunnel|commute|delay/i, "Traffic watch: check nearby routes, MTA, and road delays before leaving.");
  const safety = findPulseTopic(newsItems, /crime|shooting|police|public safety|nypd|alert|incident/i, "Safety watch: no verified urgent local incident is connected; check trusted alerts for emergencies.");
  const creativeSignals = [
    "Heartbeat stable: protect one clean focus block",
    "Command scan: faith, school, health, money, discipline online",
    "Discipline pulse: one useful action beats overthinking",
    "Planner signal: choose the next visible step and execute",
    "Focus lane active: silence noise, finish one priority",
    "Life OS check: return to the plan with calm pressure",
    "Signal sweep: remove one distraction and finish one real task",
    "Mission line: prayer first, plan second, action third",
    "Life radar: bills, classes, health, and habits are being monitored",
    "Focus heartbeat: small consistent wins compound quietly",
    "Command rhythm: review, decide, execute, record",
    "Discipline scan: today only needs the next clean choice",
    "Momentum alert: do one hard thing before comfort wins",
    "Audio pulse: move with rhythm, then return to focused execution",
    "Signal art: the day is alive, but your next action stays simple",
    "Night drive mode: calm pressure, clean choices, steady progress",
    "Future self ping: protect the habits that make tomorrow easier",
    "Heartbeat lane: breathe, decide, act, and record the win",
    "Music wave active: let energy support discipline, not replace it",
    "Radar sweep: find the smallest useful task and complete it now",
    "Neon command line: faith anchored, ambition directed, focus awake",
    "ECG mode: stay alive to the mission, not the mood",
    "Bassline signal: build quietly, repeat relentlessly",
    "Orbit check: the day is moving, keep your center fixed",
    "Thunder pulse: take the action you keep postponing",
    "Data rain: every saved task, prayer, bill, and note becomes intelligence",
    "Starship scan: school, workout, money, and worship aligned",
    "Cinematic mode: make the next scene disciplined",
    "Deep space pulse: slow mind, sharp action",
    "Worldline update: one decision can redirect the entire day",
    "Nature signal: recover well so effort stays sustainable",
    "Time-rift alert: the next 30 minutes matters",
    "Lightning check: remove friction, then move fast"
  ];
  const signals = [
    `WEATHER: ${weather}`,
    urgentTasks.length ? `TASK ALERT: ${urgentTasks.map((task) => task.title || task.text || "priority task").join(", ")}` : "TASK ALERT: no due task alert saved",
    dueBills.length ? `BILLS DUE: ${dueBills.map((bill) => `${bill.name} ${bill.dateLabel || bill.dueLabel || ""}`.trim()).join(", ")}` : "BILLS DUE: no urgent bill in the next 7 days",
    `BREAKING US + WORLD NEWS: ${news}`,
    `POLITICS: ${politics}`,
    `SPORTS CENTER: ${sports}`,
    `SOCCER: ${soccer}`,
    `UFC: ${ufc}`,
    `NBA: ${nba}`,
    `CRICKET: ${cricket}`,
    `TRAFFIC: ${traffic}`,
    `LOCAL SAFETY: ${safety}`,
    creativeSignals[window.fahimPulseSeed % creativeSignals.length],
    `New York command feed refreshed ${now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`,
    nextBill ? `Money watch: ${nextBill.name} is the next bill` : "Money watch: no urgent bill detected",
    nextAssignment ? `School watch: ${nextAssignment.title || "assignment"} is next` : "School watch: no saved assignment alert",
    "Click System Active for the full Life Hub News Center"
  ];
  message.textContent = signals.join("  •  ");
  status.textContent = "SYSTEM ACTIVE";
}

const heroFxModes = [
  { key: "deep-ocean", label: "Deep Ocean Pulse", className: "hero-fx-deep-ocean", pulse: "sonar" },
  { key: "rocket", label: "Rocket Flyby", className: "hero-fx-rocket", pulse: "space" },
  { key: "lion", label: "Lion Hunt", className: "hero-fx-lion", pulse: "radar" },
  { key: "tiger", label: "Tiger Roar", className: "hero-fx-tiger", pulse: "wave" },
  { key: "bear", label: "Bear Honey Cave", className: "hero-fx-bear", pulse: "cinema" },
  { key: "eclipse", label: "Solar Eclipse", className: "hero-fx-eclipse", pulse: "solar" },
  { key: "black-hole", label: "Black Hole Gravity", className: "hero-fx-black-hole", pulse: "orbit" },
  { key: "ocean-waves", label: "Ocean Waves", className: "hero-fx-ocean-waves", pulse: "wave" },
  { key: "superman", label: "Superman Speed Flight", className: "hero-fx-superman", pulse: "hyper" },
  { key: "batman", label: "Batman Gotham Night", className: "hero-fx-batman", pulse: "thunder" },
  { key: "bird-nature", label: "Bird View Nature", className: "hero-fx-bird-nature", pulse: "cinema" },
  { key: "galaxy-orbit", label: "Galaxy Orbit", className: "hero-fx-galaxy-orbit", pulse: "orbit" },
  { key: "thunder-storm", label: "Thunder Storm", className: "hero-fx-thunder-storm", pulse: "thunder" },
  { key: "neon-data", label: "Neon Data Rain", className: "hero-fx-neon-data", pulse: "data" },
  { key: "scientific-grid", label: "Scientific Grid", className: "hero-fx-scientific-grid", pulse: "scanner" },
  { key: "dna-helix", label: "DNA Helix", className: "hero-fx-dna-helix", pulse: "matrix" },
  { key: "cyber-city", label: "Cyber City", className: "hero-fx-cyber-city", pulse: "data" },
  { key: "volcano", label: "Volcano Energy", className: "hero-fx-volcano", pulse: "hyper" },
  { key: "aurora", label: "Aurora Sky", className: "hero-fx-aurora", pulse: "nebula" },
  { key: "meteor", label: "Meteor Shower", className: "hero-fx-meteor", pulse: "space" },
  { key: "quantum", label: "Quantum Particles", className: "hero-fx-quantum", pulse: "orbit" },
  { key: "radar-scan", label: "Radar Scan", className: "hero-fx-radar-scan", pulse: "radar" },
  { key: "sonar-wave", label: "Sonar Wave", className: "hero-fx-sonar-wave", pulse: "sonar" },
  { key: "solar-system", label: "Solar System", className: "hero-fx-solar-system", pulse: "solar" },
  { key: "space-nebula", label: "Space Nebula", className: "hero-fx-space-nebula", pulse: "cinema" },
  { key: "wifi-grid", label: "WiFi Signal Grid", className: "hero-fx-wifi-grid", pulse: "scanner" },
  { key: "internet-core", label: "Internet Signal Core", className: "hero-fx-internet-core", pulse: "data" },
  { key: "hacker-code", label: "Hacker Code Stream", className: "hero-fx-hacker-code", pulse: "matrix" },
  { key: "bangladesh-flag", label: "Bangladesh Flag", className: "hero-fx-bangladesh-flag", pulse: "wave" },
  { key: "usa-flag", label: "USA Flag", className: "hero-fx-usa-flag", pulse: "wave" },
  { key: "flower-field", label: "Flower Field", className: "hero-fx-flower-field", pulse: "cinema" },
  { key: "neon-garden", label: "Neon Garden", className: "hero-fx-neon-garden", pulse: "nebula" },
  { key: "digital-mosque", label: "Digital Mosque Glow", className: "hero-fx-digital-mosque", pulse: "sonar" },
  { key: "city-network", label: "City Network", className: "hero-fx-city-network", pulse: "data" },
  { key: "jellyfish-ocean", label: "Under Ocean Jellyfish", className: "hero-fx-jellyfish-ocean", pulse: "sonar" },
  { key: "gotham-signal", label: "Gotham Bat Signal", className: "hero-fx-gotham-signal", pulse: "thunder" },
  { key: "soccer-field", label: "Soccer Field", className: "hero-fx-soccer-field", pulse: "wave" },
  { key: "lyric-wave", label: "Lyric Wave", className: "hero-fx-lyric-wave", pulse: "equalizer" },
  { key: "starship-orbit", label: "Starship Orbit", className: "hero-fx-starship-orbit", pulse: "space" },
  { key: "nebula-garden", label: "Nebula Flower Garden", className: "hero-fx-nebula-garden", pulse: "nebula" }
];

const HERO_FX_STORAGE_KEY = "fahimos_home_hero_fx_v1";

function savedHeroFxKey() {
  try {
    return localStorage.getItem(HERO_FX_STORAGE_KEY) || "";
  } catch (error) {
    return "";
  }
}

function saveHeroFxKey(key) {
  try {
    localStorage.setItem(HERO_FX_STORAGE_KEY, key);
  } catch (error) {
    // Visual preference only; ignore storage failures.
  }
}

let currentHeroFxIndex = heroFxModes.findIndex((mode) => mode.key === (savedHeroFxKey() || "space-nebula"));
if (currentHeroFxIndex < 0) currentHeroFxIndex = heroFxModes.findIndex((mode) => mode.key === "space-nebula");
let heroFxLabelTimer = null;

function applyHeroFxMode(mode, restart = false) {
  const hero = document.querySelector(".home-command-hero");
  const pulse = document.querySelector(".hero-live-pulse");
  if (!hero || !pulse || !mode) return;
  const pulseStyles = [...new Set(heroFxModes.map((item) => item.pulse))];
  hero.classList.remove(...heroFxModes.map((item) => item.className), "hero-fx-restart");
  pulse.classList.remove(...pulseStyles.map((style) => `pulse-mode-${style}`));
  hero.classList.add(mode.className);
  pulse.classList.add(`pulse-mode-${mode.pulse}`);
  hero.dataset.heroFx = mode.key;
  pulse.dataset.pulseStyle = mode.pulse;
  saveHeroFxKey(mode.key);
  const styleLabel = document.querySelector("#heroPulseStyleLabel");
  if (styleLabel) styleLabel.textContent = mode.label;
  if (restart) {
    void hero.offsetWidth;
    hero.classList.add("hero-fx-restart");
    const fxButton = document.querySelector("#heroPulseStyleButton");
    if (fxButton) {
      fxButton.classList.add("is-showing-fx-name");
      clearTimeout(heroFxLabelTimer);
      heroFxLabelTimer = setTimeout(() => fxButton.classList.remove("is-showing-fx-name"), 1800);
    }
  }
}

function randomizeHeroPulseStyle(forceNext = false) {
  if (currentHeroFxIndex < 0) currentHeroFxIndex = 0;
  if (forceNext) {
    currentHeroFxIndex = (currentHeroFxIndex + 1) % heroFxModes.length;
    window.fahimPulseSeed = Math.floor(Math.random() * 10000);
    renderHeroSystemPulse();
  }
  applyHeroFxMode(heroFxModes[currentHeroFxIndex], forceNext);
}

function setHeroFxMode(key, restart = true) {
  const index = heroFxModes.findIndex((mode) => mode.key === key || mode.pulse === key);
  if (index < 0) return;
  currentHeroFxIndex = index;
  window.fahimPulseSeed = Math.floor(Math.random() * 10000);
  renderHeroSystemPulse();
  applyHeroFxMode(heroFxModes[currentHeroFxIndex], restart);
}

const heroEmojiStreamPool = [
  "😀", "😎", "🤩", "🥳", "😊", "🙂", "😇", "🤓", "🫡", "💪", "🙏", "🤲", "❤️", "💙", "💚", "💜", "💛", "🧡", "🩷", "✨", "⭐", "🌟", "💫", "⚡", "🔥",
  "🌸", "🌺", "🌻", "🌼", "🌷", "🌹", "🍀", "🌿", "🍃", "🍁", "🌲", "🌴", "☁", "🌧", "⛈", "🌈", "❄", "💧", "🌊",
  "☀", "🌙", "🌕", "🌑", "🪐", "🌍", "🌎", "🌏", "🌌", "☄", "🚀", "🛸", "🛰", "🔭", "🧭", "🧬", "⚛", "💎", "🔮",
  "🦁", "🐯", "🐅", "🐆", "🦍", "🦖", "🦕", "🕷", "🦅", "🦉", "🦋", "🐝", "🐬", "🐋", "🦈", "🐘", "🦒", "🐎", "🦌", "🐺", "🐻",
  "🏎", "🚗", "🚙", "🚕", "🚓", "🚑", "🚒", "🚐", "🚚", "🚛", "🏍", "🛵", "🚲", "🚁", "✈", "🛩", "🚂", "🚆", "🚇",
  "🦸", "🦹", "🦇", "🕸", "🛡", "⚔", "🗡", "🎭", "🥷", "👑", "🧤", "🧪", "🧠", "🤖", "👾", "🎮", "🎧", "🎵", "🎶", "🎼",
  "⚽", "🏀", "🏈", "⚾", "🎾", "🏏", "🥊", "🥋", "🏆", "🥇", "🎯", "📚", "💻", "⌨", "🖥", "📡", "📶", "🔋", "🔐", "🕌", "☪", "📿"
];

const heroSignalStreamPool = [
  "AI", "OS", "SYNC", "NEWS", "FOCUS", "PRAYER", "SCHOOL", "MONEY", "HEALTH", "LIFE",
  "UPLINK", "RADAR", "ORBIT", "FLOW", "NOVA", "PULSE", "BEACON", "READY", "SIGNAL",
  "2026", "NYC", "QUEENS", "SYSTEM", "COMMAND", "DATA"
];

let heroEmojiStreamTimer = null;

function spawnHeroEmojiBurst(count = 2) {
  const pulse = document.querySelector(".home-command-intro .hero-live-pulse");
  if (!pulse || window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;
  const existing = pulse.querySelectorAll(".pulse-random-emoji");
  existing.forEach((node, index) => {
    if (index < existing.length - 10) node.remove();
  });
  for (let index = 0; index < count; index += 1) {
    const item = document.createElement("span");
    item.className = "pulse-random-emoji";
    const isSignal = Math.random() > 0.78;
    item.textContent = isSignal
      ? heroSignalStreamPool[Math.floor(Math.random() * heroSignalStreamPool.length)]
      : heroEmojiStreamPool[Math.floor(Math.random() * heroEmojiStreamPool.length)];
    const isFeature = isSignal || Math.random() > 0.72;
    const size = isFeature ? 1.4 + Math.random() * 2.4 : 0.54 + Math.random() * 1.7;
    const duration = 46 + Math.random() * 56;
    const delay = Math.random() * 7;
    item.style.setProperty("--emoji-top", `${6 + Math.random() * 82}%`);
    item.style.setProperty("--emoji-size", `${size}rem`);
    item.style.setProperty("--emoji-duration", `${duration}s`);
    item.style.setProperty("--emoji-delay", `${delay}s`);
    item.style.setProperty("--emoji-rotate", `${Math.random() * 44 - 22}deg`);
    item.style.setProperty("--emoji-opacity", `${0.18 + Math.random() * 0.42}`);
    if (isFeature) item.classList.add("is-feature-emoji");
    if (isSignal) item.classList.add("is-signal-chip");
    pulse.append(item);
    window.setTimeout(() => item.remove(), (duration + delay + 1) * 1000);
  }
}

function startHeroEmojiStream() {
  if (heroEmojiStreamTimer) return;
  spawnHeroEmojiBurst(3);
  heroEmojiStreamTimer = window.setInterval(() => spawnHeroEmojiBurst(1 + Math.floor(Math.random() * 2)), 13500);
}

function renderEssentialsDoc() {
  const shell = document.querySelector("#essentials");
  if (!shell) return;
  const weatherText = state.liveWeather?.items?.[0]?.text || "Queens, NY weather is ready when live data loads.";
  const openTasks = (state.tasks || []).filter((task) => !task.done && !task.completed);
  const completedTasks = (state.tasks || []).filter((task) => task.done || task.completed).length;
  const nextBills = getUpcomingBills(activeDate, 10).filter((bill) => !bill.paid);
  const nextBill = nextBills[0];
  const nextPrayer = nextPrayerSnapshot();
  const scheduleItems = homeScheduleItems().slice(0, 3);
  const notes = latestNotes().slice(0, 6);
  const workout = workoutPlanForDate(activeDate);
  const sleepLogs = [...(state.sleepLogs || []), ...(state.sleepSessions || []), ...(state.health?.sleepLogs || [])].filter(Boolean);
  const sleep = sleepLogs[sleepLogs.length - 1];
  const newsItems = state.liveNews?.items?.length ? state.liveNews.items : fallbackNewsItems.map((text) => ({ text }));
  const sportsItems = state.liveNews?.sports?.length ? state.liveNews.sports : fallbackSportsNewsItems.map((text) => ({ text }));
  const dueAssignments = (state.assignments || []).filter((item) => !item.done).slice(0, 3);
  const cards = [
    ["Today At A Glance", "Date, focus, next prayer, bills, and open work.", "dashboard", `${openTasks.length} tasks open`],
    ["To-Do Lists", "Open work and routines for the active day.", "todos", `${openTasks.length} open`],
    ["Daily Checklist", "Daily habits and execution checkpoints.", "daily", `${completedTasks}/${Math.max(1, state.tasks?.length || 0)} complete`],
    ["Schedules", "Saved blocks for school, work, prayer, and errands.", "daily", scheduleItems[0]?.title || "No schedule saved yet"],
    ["Class Schedules", "Class times, rooms, professors, and assignment alerts only.", "study", dueAssignments[0]?.title || `${state.classes?.length || 0} saved classes`],
    ["Prayer Snapshot", "Next prayer, completion, and faith rhythm.", "faith", nextPrayer ? `${nextPrayer.name} next` : "Load prayer times"],
    ["Money + Bills", "Upcoming payments and bill awareness.", "money", nextBill ? `${nextBill.name} due next` : "No urgent bill"],
    ["Today's Workout", "Active training plan, food support, and workout log shortcut.", "workout", workout?.title || "Recovery / plan day"],
    ["Discipline", "Streak, focus, and self-control tracking.", "discipline", state.discipline?.active ? "Streak active" : "No streak started"],
    ["Daily Notes", "Recent reflections, notes, and journal entries.", "life", notes[0]?.text?.replace(/:.*/, "") || "No recent note"],
    ["Reminders", "Upcoming reminders and important dates.", "daily", `${state.reminders?.length || 0} reminders`],
    ["Health Overview", "Sleep, water, recovery, and wellness signals.", "health", sleep ? formatDetailedDuration(sleep.duration || 0) : "No sleep logged"]
  ];
  const livePulse = document.querySelector("#essentialsLivePulse");
  if (livePulse) {
    livePulse.innerHTML = [
      ["Weather", weatherText],
      ["Important", openTasks.length ? `${openTasks.length} tasks open` : "No open task alert"],
      ["Bills", nextBill ? `${nextBill.name} due ${nextBill.dateLabel || nextBill.dueLabel || ""}` : "No bill due soon"],
      ["Awareness", "Drink water, review prayer, protect one focus block"],
      ["News", newsItems[0]?.text || "News loading"],
      ["Traffic", newsItems.find((item) => /traffic|mta|transit|road|commute/i.test(item.text || ""))?.text || "Check routes before leaving"]
    ].map(([label, text]) => `<article><small>${escapeHtml(label)}</small><strong>${escapeHtml(text)}</strong></article>`).join("");
  }
  const categories = document.querySelector("#essentialsNewsCategories");
  if (categories) {
    const picks = [
      ["Top News", newsItems[0]?.text],
      ["Politics", newsItems.find((item) => /politic|election|congress|white house/i.test(item.text || ""))?.text],
      ["Sports", sportsItems[0]?.text],
      ["Soccer", sportsItems.find((item) => /soccer|football|world cup|club/i.test(item.text || ""))?.text],
      ["UFC", sportsItems.find((item) => /ufc|mma|fight|boxing/i.test(item.text || ""))?.text],
      ["NBA", sportsItems.find((item) => /nba|basketball/i.test(item.text || ""))?.text],
      ["Cricket", sportsItems.find((item) => /cricket|icc|t20/i.test(item.text || ""))?.text],
      ["Local Alert", newsItems.find((item) => /local|crime|police|safety|traffic/i.test(item.text || ""))?.text]
    ];
    categories.innerHTML = picks.map(([label, text]) => `<button class="essentials-news-chip hub-link" data-open-tab="newsCenter" type="button"><small>${escapeHtml(label)}</small><span>${escapeHtml(text || "Open News Center for details.")}</span></button>`).join("");
  }
  const weatherCard = document.querySelector("#essentialsWeatherCard");
  if (weatherCard) weatherCard.innerHTML = `<small>Live Weather</small><h3>${escapeHtml(weatherText.replace(/^Weather:\s*/i, ""))}</h3><p>Hourly forecast and severe-weather awareness live in the Life Hub weather tools.</p><button class="secondary-button hub-link" data-open-tab="weather">Open Weather</button>`;
  const overviewCard = document.querySelector("#essentialsOverviewCard");
  if (overviewCard) overviewCard.innerHTML = `<small>Today's Overview</small><h3>${openTasks.length} tasks · ${nextBills.length} bills · ${dueAssignments.length} school items</h3><p>FahimOS is reading saved tasks, bills, classes, sleep, journal, and workout data.</p><button class="secondary-button hub-link" data-open-tab="dashboard">Open Dashboard</button>`;
  const systemCard = document.querySelector("#essentialsSystemCard");
  if (systemCard) systemCard.innerHTML = `<small>System Status</small><h3>Auto-save ${state.autoSave ? "On" : "Off"}</h3><p>Data stays in this browser. Essentials Doc does not change storage keys.</p><button class="secondary-button hub-link" data-open-tab="settings">Open Settings</button>`;
  const prayerCard = document.querySelector("#essentialsPrayerCard");
  if (prayerCard) prayerCard.innerHTML = `<small>Next Prayer</small><h3>${nextPrayer ? `${escapeHtml(nextPrayer.name)} · ${escapeHtml(nextPrayer.time || "")}` : "Prayer times not loaded"}</h3><p>${nextPrayer?.remaining || "Open Faith Hub to load live prayer timing."}</p><button class="secondary-button hub-link" data-open-tab="faith">Open Faith</button>`;
  const actions = document.querySelector("#essentialsQuickActions");
  if (actions) {
    actions.innerHTML = "";
    [
      ["Add Task", "tasks"], ["Add Note", "life"], ["Add Event", "calendar"], ["Start Focus", "daily"],
      ["Log Workout", "workout"], ["Log Expense", "money"], ["New Journal", "life"], ["Daily Checklist", "daily"]
    ].forEach(([label, tab], index) => {
      actions.insertAdjacentHTML("beforeend", `<button class="essentials-action hub-link" data-open-tab="${tab}" type="button"><b>${String(index + 1).padStart(2, "0")}</b>${escapeHtml(label)}</button>`);
    });
  }
  const grid = document.querySelector("#essentialsCards");
  if (grid) {
    const workoutExercises = (workout?.exercises || []).slice(0, 4).map(([name, detail]) => `<li><strong>${escapeHtml(name)}</strong><span>${escapeHtml(detail)}</span></li>`).join("");
    grid.innerHTML = cards.map(([title, body, tab, stat], index) => {
      const isWorkout = title === "Today's Workout";
      const isSchool = title === "Class Schedules";
      const details = isWorkout
        ? `<ul class="essentials-workout-list">${workoutExercises || "<li><strong>Recovery</strong><span>Prayer, meal prep, walking, and planning.</span></li>"}</ul><div class="essentials-card-meta"><span>Food: protein + water before training</span><span>Log: record sets, reps, notes</span></div>`
        : isSchool
          ? `<ul class="essentials-workout-list">${(state.classes || []).slice(0, 2).map((item) => `<li><strong>${escapeHtml(item.name || item.title || "Class")}</strong><span>${escapeHtml([item.schedule, item.professor, item.room].filter(Boolean).join(" • ") || "Schedule details not saved")}</span></li>`).join("") || "<li><strong>No class schedule saved</strong><span>Add classes in Study Hub.</span></li>"}${dueAssignments.slice(0, 2).map((item) => `<li><strong>${escapeHtml(item.title || "Assignment")}</strong><span>${escapeHtml([item.className || item.class, item.due].filter(Boolean).join(" • ") || "Assignment due date not saved")}</span></li>`).join("")}</ul>`
        : `<div class="essentials-card-meta"><span>${escapeHtml(stat)}</span><span>Open page for edits</span></div>`;
      return `
      <article class="essentials-mini-card hub-link tone-${index % 8}" data-open-tab="${escapeHtml(tab)}" role="button" tabindex="0">
        <small>${escapeHtml(stat)}</small>
        <h3>${escapeHtml(title)}</h3>
        <p>${escapeHtml(body)}</p>
        ${details}
        <button class="secondary-button hub-link" type="button" data-open-tab="${escapeHtml(tab)}">Open</button>
      </article>
    `;
    }).join("");
  }
  setupEssentialsDocCollapsibles();
}

function setupEssentialsDocCollapsibles() {
  const sections = [
    ["#essentialsLivePulse", "Live Pulse", "Weather, bills, alerts, and command signals."],
    ["#essentialsNewsCategories", "News Categories", "Top news, politics, sports, local alerts, and traffic."],
    [".essentials-motivation-strip", "Motivation Track", "Heartbeat, rocket, and command motivation."],
    [".essentials-main-grid", "Main Dashboard Row", "Weather, overview, system status, and prayer."],
    ["#essentialsQuickActions", "Quick Actions", "Fast links into FahimOS tools."],
    ["#essentialsCards", "Command Cards", "Detailed cards connected to the main hubs."]
  ];
  let collapsed = {};
  try {
    collapsed = JSON.parse(localStorage.getItem("fahimos_essentials_collapsed_v1") || "{}") || {};
  } catch (error) {
    collapsed = {};
  }
  sections.forEach(([selector, title, summary], index) => {
    const target = document.querySelector(`#essentials ${selector}`);
    if (!target) return;
    const key = selector.replace(/[^a-z0-9]+/gi, "-").replace(/^-|-$/g, "") || `section-${index}`;
    target.classList.add("essentials-collapse-target");
    target.classList.toggle("is-collapsed", !!collapsed[key]);
    let toggle = target.previousElementSibling;
    if (!toggle || !toggle.classList.contains("essentials-collapse-toggle")) {
      toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "essentials-collapse-toggle";
      target.parentElement.insertBefore(toggle, target);
    }
    toggle.dataset.essentialsTarget = key;
    toggle.innerHTML = `<span><small>${escapeHtml(summary)}</small><strong>${escapeHtml(title)}</strong></span><b>${collapsed[key] ? "+" : "-"}</b>`;
    toggle.onclick = () => {
      const nextCollapsed = !target.classList.contains("is-collapsed");
      target.classList.toggle("is-collapsed", nextCollapsed);
      collapsed[key] = nextCollapsed;
      toggle.querySelector("b").textContent = nextCollapsed ? "+" : "-";
      try {
        localStorage.setItem("fahimos_essentials_collapsed_v1", JSON.stringify(collapsed));
      } catch (error) {
        // Visual preference only; ignore storage failures.
      }
    };
  });
}

function renderNewsCenter() {
  const lead = document.querySelector("#newsCenterLead");
  const updated = document.querySelector("#newsCenterUpdated");
  const list = document.querySelector("#newsCenterList");
  const sportsList = document.querySelector("#newsCenterSportsList");
  if (!lead || !updated || !list) return;
  const items = state.liveNews?.items?.length
    ? state.liveNews.items
    : fallbackNewsItems.map((text) => ({ text, source: "Built-in news brief", page: "" }));
  const sports = state.liveNews?.sports?.length
    ? state.liveNews.sports
    : fallbackSportsNewsItems.map((text) => ({ text, source: "Built-in sports brief", page: "" }));
  lead.textContent = items[0]?.text || "No live news loaded yet.";
  updated.textContent = state.liveNews?.updated ? `Updated ${state.liveNews.updated}` : "Refreshes every 15 minutes";
  list.innerHTML = items.slice(0, 10).map((item, index) => `
    <article class="news-center-card">
      <span>${index === 0 ? "TOP" : String(index + 1).padStart(2, "0")}</span>
      <div>
        <strong>${escapeHtml(item.text || "News update")}</strong>
        <small>${escapeHtml(item.source || "News feed")}</small>
      </div>
      <button class="ghost-btn compact-action" type="button" data-news-source="${index}">Open</button>
    </article>
  `).join("");
  list.querySelectorAll("[data-news-source]").forEach((button) => {
    button.addEventListener("click", () => openExternal("https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en"));
  });
  if (sportsList) {
    sportsList.innerHTML = sports.slice(0, 12).map((item, index) => {
      const category = String(item.text || "Sports").split(":")[0] || "Sports";
      const detail = String(item.text || "Sports update").replace(/^[^:]+:\s*/, "");
      return `
        <article class="sports-news-card">
          <span>${escapeHtml(category.slice(0, 4).toUpperCase())}</span>
          <div>
            <strong>${escapeHtml(detail)}</strong>
            <small>${escapeHtml(item.source || "Sports news")}</small>
          </div>
          <button class="ghost-btn compact-action" type="button" data-sports-news="${index}">Open</button>
        </article>
      `;
    }).join("");
    sportsList.querySelectorAll("[data-sports-news]").forEach((button) => {
      button.addEventListener("click", () => openExternal("https://news.google.com/search?q=sports&hl=en-US&gl=US&ceid=US:en"));
    });
  }
}

function saveHeroJournalReflection() {
  const input = document.querySelector("#heroJournalText");
  const text = String(input?.value || "").trim();
  if (!text) {
    input?.focus();
    return;
  }
  const now = new Date();
  state.journalEntries.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: localDateKey(now),
    time: now.toTimeString().slice(0, 5),
    mood: "Reflective",
    title: "Today's Journal Pulse",
    text,
    tags: ["home", "reflection"],
    savedAt: now.toISOString()
  });
  state.journalDraft = { ...defaultState().journalDraft, date: localDateKey(now), time: now.toTimeString().slice(0, 5) };
  state.essentialsNotes = "";
  forceSaveState();
  renderHubNotes();
  renderJournalHistory();
  renderHomeNotesFeed();
  renderEssentialsDoc();
}

function saveJournalEntry() {
  const draft = state.journalDraft || {};
  if (!String(draft.text || "").trim()) {
    alert("Write a journal entry before saving.");
    document.querySelector("#essentialsNotes")?.focus();
    return;
  }
  const now = new Date();
  state.journalEntries.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    date: draft.date || localDateKey(now),
    time: draft.time || now.toTimeString().slice(0, 5),
    mood: draft.mood || "Reflective",
    title: String(draft.title || "").trim() || "Untitled Journal Entry",
    text: String(draft.text || "").trim(),
    tags: String(draft.tags || "").split(",").map((tag) => tag.trim()).filter(Boolean),
    savedAt: now.toISOString()
  });
  state.journalDraft = { ...defaultState().journalDraft, date: localDateKey(now), time: now.toTimeString().slice(0, 5) };
  state.essentialsNotes = "";
  forceSaveState();
  renderHubNotes();
  renderJournalHistory();
  renderHomeNotesFeed();
  renderEssentialsDoc();
  state.historyView = "journal";
  setHistoryView("journal");
}

function setHistoryView(view) {
  const selected = ["daily", "journal", "pages"].includes(view) ? view : "pages";
  state.historyView = selected;
  document.querySelectorAll(".history-tab").forEach((button) => button.classList.toggle("is-active", button.dataset.historyTab === selected));
  document.querySelector("#dailyHistoryPanel")?.classList.toggle("is-active", selected === "daily");
  document.querySelector("#savedPageHistoryPanel")?.classList.toggle("is-active", selected === "pages");
  document.querySelector("#journalHistoryPanel")?.classList.toggle("is-active", selected === "journal");
}

function dailyHistoryDateRange(period, referenceDate) {
  if (period === "all") return { start: "", end: "" };
  const reference = new Date(`${referenceDate || todayKey()}T12:00:00`);
  if (period === "week") {
    const dayIndex = (reference.getDay() + 6) % 7;
    const start = new Date(reference);
    start.setDate(reference.getDate() - dayIndex);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);
    return { start: localDateKey(start), end: localDateKey(end) };
  }
  if (period === "month") {
    return {
      start: localDateKey(new Date(reference.getFullYear(), reference.getMonth(), 1, 12)),
      end: localDateKey(new Date(reference.getFullYear(), reference.getMonth() + 1, 0, 12))
    };
  }
  const key = localDateKey(reference);
  return { start: key, end: key };
}

function renderDailyHistory() {
  const wrap = document.querySelector("#dailyHistoryList");
  const summary = document.querySelector("#dailyHistorySummary");
  if (!wrap || !summary) return;
  const dateInput = document.querySelector("#dailyHistoryDate");
  if (dateInput && !dateInput.value) dateInput.value = activeDate || todayKey();
  const period = document.querySelector("#dailyHistoryPeriod")?.value || "day";
  const referenceDate = dateInput?.value || todayKey();
  const range = dailyHistoryDateRange(period, referenceDate);
  const archives = Object.values(state.dailyArchives || {})
    .filter((item) => (!range.start || item.date >= range.start) && (!range.end || item.date <= range.end))
    .sort((a, b) => b.date.localeCompare(a.date));
  const totals = archives.reduce((acc, item) => {
    const metrics = item.metrics || {};
    acc.tasks += metrics.tasksCompleted || 0;
    acc.assignments += metrics.assignmentsCompleted || 0;
    acc.workouts += metrics.workoutsCompleted || 0;
    acc.study += metrics.studySessionsCompleted || 0;
    acc.prayers += metrics.prayersDone || 0;
    acc.journals += metrics.journalEntries || 0;
    acc.productivity += metrics.productivity || 0;
    return acc;
  }, { tasks: 0, assignments: 0, workouts: 0, study: 0, prayers: 0, journals: 0, productivity: 0 });
  summary.innerHTML = `
    <article><span>Days</span><strong>${archives.length}</strong></article>
    <article><span>Tasks</span><strong>${totals.tasks}</strong></article>
    <article><span>Assignments</span><strong>${totals.assignments}</strong></article>
    <article><span>Workouts</span><strong>${totals.workouts}</strong></article>
    <article><span>Study sessions</span><strong>${totals.study}</strong></article>
    <article><span>Average productivity</span><strong>${archives.length ? Math.round(totals.productivity / archives.length) : 0}%</strong></article>
  `;
  wrap.innerHTML = "";
  if (!archives.length) {
    const empty = document.createElement("article");
    empty.className = "card";
    empty.textContent = "No automatic daily archive is available for this period yet.";
    wrap.append(empty);
    return;
  }
  archives.forEach((archive) => {
    const metrics = archive.metrics || {};
    const card = document.createElement("details");
    card.className = "daily-history-card";
    const heading = document.createElement("summary");
    heading.innerHTML = `
      <span><small>${new Date(`${archive.date}T12:00:00`).toLocaleDateString(undefined, { weekday: "long" })}</small><strong>${new Date(`${archive.date}T12:00:00`).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" })}</strong></span>
      <b>${metrics.productivity || 0}%</b>
    `;
    const grid = document.createElement("div");
    grid.className = "daily-history-metrics";
    [
      ["Prayer", `${metrics.prayersDone || 0}/${metrics.prayersTotal || prayers.length}`],
      ["Tasks", `${metrics.tasksCompleted || 0}/${metrics.tasksTotal || 0}`],
      ["Assignments", `${metrics.assignmentsCompleted || 0}/${metrics.assignmentsTotal || 0}`],
      ["Workout", `${metrics.workoutsCompleted || 0}/${metrics.workoutsTotal || 0}`],
      ["Study", `${metrics.studySessionsCompleted || 0}/${metrics.studySessionsTotal || 0}`],
      ["Journal", String(metrics.journalEntries || 0)]
    ].forEach(([label, value]) => {
      const item = document.createElement("span");
      item.innerHTML = `<small>${label}</small><strong>${value}</strong>`;
      grid.append(item);
    });
    const details = document.createElement("div");
    details.className = "daily-history-details";
    details.append(
      historySection("Tasks", archive.tasks),
      historySection("Completion Log", archive.completionLog),
      historySection("Assignments", archive.assignments),
      historySection("Important School Dates", archive.importantDates),
      historySection("Workout Logs", archive.workouts),
      historySection("Study Sessions", archive.studyBlocks),
      historySection("Journal Entries", archive.journalEntries),
      historySection("Wellness", archive.wellness)
    );
    card.append(heading, grid, details);
    wrap.append(card);
  });
}

function exportDailyHistory() {
  syncDailyArchive(activeDate);
  cleanupDailyArchives();
  const payload = {
    exportedAt: new Date().toISOString(),
    retentionDays: state.archiveRetentionDays || 90,
    dailyArchives: state.dailyArchives || {}
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `fahimos-daily-history-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function renderJournalHistory() {
  const wrap = document.querySelector("#journalHistoryList");
  if (!wrap) return;
  const keyword = String(document.querySelector("#journalHistorySearch")?.value || "").trim().toLowerCase();
  const exactDate = document.querySelector("#journalHistoryDate")?.value || "";
  const entries = (state.journalEntries || [])
    .filter((entry) => !exactDate || entry.date === exactDate)
    .filter((entry) => {
      if (!keyword) return true;
      return [entry.title, entry.text, entry.mood, ...(entry.tags || [])].join(" ").toLowerCase().includes(keyword);
    })
    .sort((a, b) => `${b.date}T${b.time || "00:00"}`.localeCompare(`${a.date}T${a.time || "00:00"}`));
  wrap.innerHTML = "";
  if (!entries.length) {
    const empty = document.createElement("article");
    empty.className = "card";
    empty.textContent = keyword || exactDate ? "No journal entries match these filters." : "No journal entries saved yet.";
    wrap.append(empty);
    return;
  }
  entries.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "card journal-history-card";
    const meta = document.createElement("div");
    meta.className = "journal-history-meta";
    meta.innerHTML = `<span>${entry.date || "No date"} at ${entry.time || "No time"}</span><strong>${entry.mood || "No mood"}</strong>`;
    const date = input(entry.date || "", () => {}, { type: "date" });
    const time = input(entry.time || "", () => {}, { type: "time" });
    const mood = document.createElement("select");
    ["Calm", "Focused", "Grateful", "Happy", "Tired", "Stressed", "Reflective"].forEach((value) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = value;
      mood.append(option);
    });
    mood.value = entry.mood || "Reflective";
    const title = input(entry.title || "", (value) => entry.title = value, { placeholder: "Journal title" });
    title.className = "journal-history-title";
    const text = document.createElement("textarea");
    text.rows = 7;
    text.value = entry.text || "";
    text.addEventListener("input", () => {
      entry.text = text.value;
      saveState();
    });
    const tags = input((entry.tags || []).join(", "), (value) => entry.tags = value.split(",").map((tag) => tag.trim()).filter(Boolean), { placeholder: "Tags" });
    const actions = document.createElement("div");
    actions.className = "resource-links";
    const save = document.createElement("button");
    save.type = "button";
    save.className = "primary-btn compact-action";
    save.textContent = "Save Changes";
    save.addEventListener("click", () => {
      entry.date = date.value;
      entry.time = time.value;
      entry.mood = mood.value;
      entry.savedAt = new Date().toISOString();
      forceSaveState();
      renderJournalHistory();
    });
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "danger-btn compact-action";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      if (!confirm("Delete this journal entry?")) return;
      state.journalEntries.splice(state.journalEntries.indexOf(entry), 1);
      forceSaveState();
      renderJournalHistory();
    });
    actions.append(save, remove);
    const entryFields = document.createElement("div");
    entryFields.className = "journal-history-fields";
    entryFields.append(
      labeledControl("Date", date),
      labeledControl("Time", time),
      labeledControl("Mood", mood)
    );
    card.append(meta, entryFields, title, text, tags, actions);
    wrap.append(card);
  });
}

function renderLife() {
  const links = document.querySelector("#customLinks");
  const preview = document.querySelector("#savedUrlsPreview");
  const summary = document.querySelector("#savedUrlsSummary");
  if (summary) {
    const count = state.customLinks.length;
    summary.textContent = count ? `${count} saved ${count === 1 ? "link" : "links"}` : "No links saved yet.";
  }
  if (preview) {
    preview.innerHTML = "";
    state.customLinks.slice(0, 3).forEach((link) => {
      const item = document.createElement("span");
      item.textContent = link.title || link.url || "Untitled link";
      preview.append(item);
    });
    if (state.customLinks.length > 3) {
      const more = document.createElement("span");
      more.textContent = `+${state.customLinks.length - 3} more`;
      preview.append(more);
    }
  }
  if (links) {
    links.innerHTML = "";
    if (!state.customLinks.length) {
      const empty = document.createElement("article");
      empty.className = "card saved-url-empty";
      empty.innerHTML = "<strong>No saved URLs yet.</strong><span>Use Add URL to create your personal link library.</span>";
      links.append(empty);
      return;
    }
    state.customLinks.forEach((link, index) => {
      const row = document.createElement("div");
      row.className = "task-card saved-url-row";
      row.append(
        input(link.title, (value) => link.title = value, { placeholder: "Link name" }),
        input(link.url, (value) => link.url = value, { placeholder: "https://..." })
      );
      const save = document.createElement("button");
      save.className = "primary-btn";
      save.textContent = "Save";
      save.addEventListener("click", () => {
        forceSaveState();
        renderLife();
      });
      const open = document.createElement("a");
      open.className = "ghost-btn";
      open.textContent = "Open";
      open.href = link.url || "#";
      open.target = "_blank";
      open.rel = "noreferrer";
      const del = document.createElement("button");
      del.className = "danger-btn";
      del.textContent = "Delete";
      del.addEventListener("click", () => {
        state.customLinks.splice(index, 1);
        saveState();
        renderLife();
      });
      row.append(save, open, del);
      links.append(row);
    });
  }
}

let historyTypeFilter = "all";

function historyItemType(item = {}) {
  if (item.type === "pdf" || item.pdfHtml || String(item.mimeType || "").includes("pdf")) return "pdf";
  if (item.screenshot || String(item.type || "").match(/image|png|jpe?g|webp/i) || String(item.mimeType || "").startsWith("image/")) return "image";
  return "text";
}

function historyItemSize(item = {}) {
  const source = item.screenshot || item.pdfHtml || item.text || item.notes || "";
  if (!source) return "Size unavailable";
  const bytes = Math.round(String(source).length * 0.75);
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}

function historyItemDescription(item = {}) {
  const type = historyItemType(item);
  if (item.data?.note) return String(item.data.note);
  if (type === "pdf") return "PDF-ready page copy preserved in FahimOS History.";
  if (type === "image") return "Full-page visual capture saved from FahimOS.";
  return item.notes || item.description || "Saved FahimOS record with structured page details.";
}

function historyDataSummaries(item = {}) {
  const groups = [
    ["Tasks", item.data?.tasks],
    ["Bills", item.data?.bills],
    ["Classes", item.data?.classes],
    ["Assignments", item.data?.assignments],
    ["Health", item.data?.health],
    ["Workout Logs", item.data?.workouts],
    ["Study Blocks", item.data?.studyBlocks],
    ["Links", item.data?.customLinks]
  ];
  return groups.map(([label, value]) => {
    let detail = "No captured records";
    if (Array.isArray(value)) detail = `${value.length} record${value.length === 1 ? "" : "s"}`;
    else if (value && typeof value === "object") detail = `${Object.keys(value).length} saved field${Object.keys(value).length === 1 ? "" : "s"}`;
    else if (value) detail = String(value);
    return { label, detail };
  });
}

function historyPdfUrl(item) {
  return item.pdfHtml ? URL.createObjectURL(new Blob([item.pdfHtml], { type: "text/html" })) : "";
}

function openHistoryPreview(item) {
  const modal = document.querySelector("#historyPreviewModal");
  const body = document.querySelector("#historyPreviewBody");
  const details = document.querySelector("#historyPreviewDetails");
  if (!modal || !body || !details) return;
  const type = historyItemType(item);
  document.querySelector("#historyPreviewTitle").textContent = item.title || "Saved Copy";
  body.innerHTML = "";
  if (type === "pdf" && item.pdfHtml) {
    const object = document.createElement("object");
    const url = historyPdfUrl(item);
    object.data = url;
    object.type = "text/html";
    object.innerHTML = "<p>PDF preview unavailable. Use Open or Download.</p>";
    object.addEventListener("load", () => window.setTimeout(() => URL.revokeObjectURL(url), 60000), { once: true });
    body.append(object);
  } else if (type === "image" && item.screenshot) {
    const image = document.createElement("img");
    image.src = item.screenshot;
    image.alt = `${item.title || "Saved copy"} preview`;
    body.append(image);
  } else {
    const note = document.createElement("div");
    note.className = "history-text-preview";
    note.innerHTML = `<strong>${escapeHtml(item.title || "Saved record")}</strong><p>${escapeHtml(historyItemDescription(item))}</p>`;
    body.append(note);
  }
  details.innerHTML = "";
  [
    ["Name", item.title || "Untitled saved copy"],
    ["Type", type === "pdf" ? "PDF-ready copy" : type === "image" ? "Image / screenshot" : "Text / notes"],
    ["Saved date", item.savedAt || "Unknown"],
    ["Size", historyItemSize(item)],
    ["Source page", pageTitle(item.page, item.page || "Unknown")],
    ["Details", historyItemDescription(item)]
  ].forEach(([label, value]) => {
    const row = document.createElement("span");
    row.innerHTML = `<small>${escapeHtml(label)}</small><strong>${escapeHtml(String(value))}</strong>`;
    details.append(row);
  });
  modal.hidden = false;
}

function downloadHistoryItem(item) {
  const type = historyItemType(item);
  const anchor = document.createElement("a");
  if (type === "pdf" && item.pdfHtml) {
    anchor.href = historyPdfUrl(item);
    anchor.download = `${String(item.title || "fahimos-pdf-copy").replace(/[^\w-]+/g, "-")}.html`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(anchor.href), 60000);
    return;
  }
  if (item.screenshot) {
    anchor.href = item.screenshot;
    anchor.download = `${String(item.title || "fahimos-screenshot").replace(/[^\w-]+/g, "-")}.${item.screenshot.startsWith("data:image/svg+xml") ? "svg" : "jpg"}`;
    anchor.click();
  }
}

function renderHistory() {
  const wrap = document.querySelector("#historyList");
  if (!wrap) return;
  wrap.innerHTML = "";
  const query = document.querySelector("#historySearch")?.value.trim().toLowerCase() || "";
  const items = (state.history || []).filter((item) => {
    const type = historyItemType(item);
    const matchesType = historyTypeFilter === "all" || type === historyTypeFilter;
    const haystack = [item.title, item.savedAt, item.page, type, historyItemDescription(item)].join(" ").toLowerCase();
    return matchesType && (!query || haystack.includes(query));
  });
  const visibleCount = document.querySelector("#historyVisibleCount");
  if (visibleCount) visibleCount.textContent = String(items.length);
  if (!items.length) {
    const empty = document.createElement("article");
    empty.className = "history-empty-state";
    empty.innerHTML = `<strong>No saved copies found.</strong><span>${state.history?.length ? "Change the search or file-type filter." : "Use the PDF button in the header to create your first saved copy."}</span>`;
    wrap.append(empty);
    renderDailyHistory();
    renderJournalHistory();
    setHistoryView(state.historyView || "pages");
    return;
  }
  items.forEach((item) => {
    const originalIndex = state.history.indexOf(item);
    const type = historyItemType(item);
    const card = document.createElement("article");
    card.className = `history-preview-card history-type-${type}`;
    const preview = document.createElement("button");
    preview.className = "history-card-preview";
    preview.type = "button";
    preview.setAttribute("aria-label", `Preview ${item.title || "saved copy"}`);
    if (item.screenshot) {
      const image = document.createElement("img");
      image.className = "history-shot";
      image.src = item.screenshot;
      image.alt = `${item.title} screenshot`;
      preview.append(image);
    } else if (type === "pdf") {
      preview.innerHTML = `<span class="history-file-glyph">PDF</span><small>Click to preview the saved page copy</small>`;
    } else {
      preview.innerHTML = `<span class="history-file-glyph">TXT</span><small>${escapeHtml(historyItemDescription(item))}</small>`;
    }
    preview.addEventListener("click", () => openHistoryPreview(item));
    const content = document.createElement("div");
    content.className = "history-card-content";
    content.innerHTML = `
      <div class="history-card-title"><span>${type === "pdf" ? "PDF" : type === "image" ? "IMAGE" : "TEXT"}</span><small>${escapeHtml(item.savedAt || "Date unavailable")}</small></div>
      <h3>${escapeHtml(item.title || "Untitled saved copy")}</h3>
      <p>${escapeHtml(historyItemDescription(item))}</p>
      <div class="history-card-facts">
        <span><small>Source</small><strong>${escapeHtml(pageTitle(item.page, item.page || "Unknown"))}</strong></span>
        <span><small>Size</small><strong>${escapeHtml(historyItemSize(item))}</strong></span>
      </div>
    `;
    const details = document.createElement("details");
    details.className = "history-readable-details";
    details.innerHTML = "<summary>Captured details</summary>";
    const detailGrid = document.createElement("div");
    historyDataSummaries(item).forEach(({ label, detail }) => {
      const row = document.createElement("span");
      row.innerHTML = `<strong>${escapeHtml(label)}</strong><small>${escapeHtml(detail)}</small>`;
      detailGrid.append(row);
    });
    details.append(detailGrid);
    const actions = document.createElement("div");
    actions.className = "history-card-actions";
    const previewButton = document.createElement("button");
    previewButton.className = "primary-btn compact-action";
    previewButton.textContent = "Preview";
    previewButton.addEventListener("click", () => openHistoryPreview(item));
    const open = document.createElement("button");
    open.className = "ghost-btn compact-action";
    open.textContent = "Open";
    open.addEventListener("click", () => {
      if (type === "pdf") openSavedPdfCopy(item);
      else if (item.screenshot) window.open(item.screenshot, "_blank", "noopener,noreferrer");
      else openHistoryPreview(item);
    });
    const download = document.createElement("button");
    download.className = "ghost-btn compact-action";
    download.textContent = "Download";
    download.disabled = !item.screenshot && !item.pdfHtml;
    download.addEventListener("click", () => downloadHistoryItem(item));
    const del = document.createElement("button");
    del.className = "danger-btn compact-action";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
      state.history.splice(originalIndex, 1);
      forceSaveState();
      renderHistory();
    });
    actions.append(previewButton, open, download, del);
    content.append(details, actions);
    card.append(preview, content);
    wrap.append(card);
  });
  renderDailyHistory();
  renderJournalHistory();
  setHistoryView(state.historyView || "pages");
}

function openSavedPdfCopy(item) {
  if (!item.pdfHtml) return;
  const blob = new Blob([item.pdfHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const win = window.open(url, "_blank", "noopener,noreferrer");
  window.setTimeout(() => URL.revokeObjectURL(url), 60000);
  if (!win) alert("Popup blocked. Allow popups for this file to open the saved PDF copy.");
}

function historySection(title, value) {
  const section = document.createElement("div");
  section.className = "history-section";
  const heading = document.createElement("h4");
  heading.textContent = title;
  const summary = document.createElement("p");
  if (Array.isArray(value)) summary.textContent = `${value.length} saved record${value.length === 1 ? "" : "s"}.`;
  else if (value && typeof value === "object") summary.textContent = `${Object.keys(value).length} saved field${Object.keys(value).length === 1 ? "" : "s"}.`;
  else summary.textContent = value ? String(value) : "No saved data.";
  section.append(heading, summary);
  return section;
}

function renderMenuSettings() {
  const menu = state.menuSettings || defaultState().menuSettings;
  setField("#menuEyebrowInput", menu.eyebrow || "", (value) => {
    menu.eyebrow = value;
    state.menuSettings = menu;
    updatePageLabels();
  });
  setField("#menuTitleInput", menu.title || "", (value) => {
    menu.title = value;
    state.menuSettings = menu;
    updatePageLabels();
  });
  setField("#menuButtonInput", menu.buttonText || "", (value) => {
    menu.buttonText = value;
    state.menuSettings = menu;
    updatePageLabels();
  });

  const wrap = document.querySelector("#menuPageSettings");
  if (!wrap) return;
  wrap.innerHTML = "";
  menu.pages.forEach((page, index) => {
    const row = document.createElement("div");
    row.className = "menu-setting-row";
    const visible = document.createElement("input");
    visible.type = "checkbox";
    visible.checked = page.visible !== false;
    visible.addEventListener("change", () => {
      page.visible = visible.checked;
      saveState();
      updatePageLabels();
    });
    const label = input(page.label, (value) => {
      page.label = value;
      updatePageLabels();
    }, { placeholder: "Page label" });
    const up = document.createElement("button");
    up.className = "ghost-btn compact-action";
    up.type = "button";
    up.textContent = "Up";
    up.disabled = index === 0;
    up.addEventListener("click", () => {
      [menu.pages[index - 1], menu.pages[index]] = [menu.pages[index], menu.pages[index - 1]];
      state.menuSettings = menu;
      saveState();
      updatePageLabels();
      renderMenuSettings();
    });
    const down = document.createElement("button");
    down.className = "ghost-btn compact-action";
    down.type = "button";
    down.textContent = "Down";
    down.disabled = index === menu.pages.length - 1;
    down.addEventListener("click", () => {
      [menu.pages[index + 1], menu.pages[index]] = [menu.pages[index], menu.pages[index + 1]];
      state.menuSettings = menu;
      saveState();
      updatePageLabels();
      renderMenuSettings();
    });
    row.append(visible, label, up, down);
    wrap.append(row);
  });
}

function renderHomeCardSettings() {
  const settings = state.homeCardSettings || defaultHomeCards.map((card) => ({ ...card }));
  state.homeCardSettings = settings;
  const wrap = document.querySelector("#homeCardSettings");
  if (!wrap) return;
  wrap.innerHTML = "";
  settings.forEach((card, index) => {
    const row = document.createElement("div");
    row.className = "menu-setting-row";
    const visible = document.createElement("input");
    visible.type = "checkbox";
    visible.checked = card.visible !== false;
    visible.addEventListener("change", () => {
      card.visible = visible.checked;
      saveState();
      updateHomeCardSettings();
    });
    const label = input(card.label, (value) => {
      card.label = value;
      updateHomeCardSettings();
    }, { placeholder: "Front page card label" });
    const up = document.createElement("button");
    up.className = "ghost-btn compact-action";
    up.type = "button";
    up.textContent = "Up";
    up.disabled = index === 0;
    up.addEventListener("click", () => {
      [settings[index - 1], settings[index]] = [settings[index], settings[index - 1]];
      saveState();
      updateHomeCardSettings();
      renderHomeCardSettings();
    });
    const down = document.createElement("button");
    down.className = "ghost-btn compact-action";
    down.type = "button";
    down.textContent = "Down";
    down.disabled = index === settings.length - 1;
    down.addEventListener("click", () => {
      [settings[index + 1], settings[index]] = [settings[index], settings[index + 1]];
      saveState();
      updateHomeCardSettings();
      renderHomeCardSettings();
    });
    row.append(visible, label, up, down);
    wrap.append(row);
  });
}

function renderHomeDockSettings() {
  const settings = state.homeDockSettings || defaultHomeDock.map((item) => ({ ...item }));
  state.homeDockSettings = settings;
  const wrap = document.querySelector("#homeDockSettings");
  if (!wrap) return;
  const dedicatedHomeToggle = document.querySelector("#showHomeDockToggle");
  if (dedicatedHomeToggle) dedicatedHomeToggle.checked = state.homeDockVisible !== false;
  wrap.innerHTML = "";
  settings.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "menu-setting-row dock-setting-row";
    const visible = document.createElement("input");
    visible.type = "checkbox";
    visible.checked = item.visible !== false;
    visible.addEventListener("change", () => {
      item.visible = visible.checked;
      forceSaveState();
      updateHomeDock();
    });
    const label = input(item.label || "", (value) => {
      item.label = value;
      updateHomeDock();
    }, { placeholder: "Quick navigation label" });
    const up = document.createElement("button");
    up.className = "ghost-btn compact-action";
    up.type = "button";
    up.textContent = "\u2191";
    up.title = "Move up";
    up.disabled = index === 0;
    up.addEventListener("click", () => {
      [settings[index - 1], settings[index]] = [settings[index], settings[index - 1]];
      saveState();
      updateHomeDock();
      renderHomeDockSettings();
    });
    const down = document.createElement("button");
    down.className = "ghost-btn compact-action";
    down.type = "button";
    down.textContent = "\u2193";
    down.title = "Move down";
    down.disabled = index === settings.length - 1;
    down.addEventListener("click", () => {
      [settings[index + 1], settings[index]] = [settings[index], settings[index + 1]];
      saveState();
      updateHomeDock();
      renderHomeDockSettings();
    });
    row.append(visible, label, up, down);
    wrap.append(row);
  });
}

function renderWorkout() {
  const todayPlan = workoutPlanForDate();
  renderWeeklyRoutineEditor();
  const todayTitle = document.querySelector("#todayWorkoutTitle");
  const todaySummary = document.querySelector("#todayWorkoutSummary");
  const todayChecklist = document.querySelector("#todayWorkoutChecklist");
  if (todayTitle) {
    const weekday = new Date(`${activeDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "long" });
    todayTitle.textContent = `${weekday}: ${todayPlan.title}`;
  }
  if (todaySummary) {
    todaySummary.textContent = `${todayPlan.subtitle}. Follow the prescribed order, record your work, and adjust effort to your sleep, energy, and available time.`;
  }
  if (todayChecklist) {
    todayChecklist.innerHTML = "";
    todayPlan.exercises.slice(0, 5).forEach(([name, prescription], index) => {
      const step = document.createElement("div");
      step.innerHTML = `<span>${index + 1}</span><strong>${name}</strong><small>${prescription}</small>`;
      todayChecklist.append(step);
    });
  }
  renderWorkoutVideoSuggestions(todayPlan);
  const timeline = workoutTimelineItems();
  const plannedTimeline = [
    {
      text: `Today's plan: ${todayPlan.title} - ${todayPlan.subtitle}.`,
      source: "Training System",
      page: "trainingSystem"
    },
    ...todayPlan.exercises.slice(0, 3).map(([name, prescription], index) => ({
      text: `Step ${index + 1}: ${name} - ${prescription}`,
      source: "Today's Plan",
      page: "workout"
    }))
  ];
  fillStatus("#workoutHourlyTimeline", timeline.length
    ? timeline.map((text) => ({ text, source: "Workout Log", page: "workout" }))
    : plannedTimeline);

  const program = document.querySelector("#workoutProgram");
  program.innerHTML = "";
  const orderedProgram = fixedWorkoutProgram
    .slice()
    .sort((a, b) => workoutWeekdays.indexOf(state.workoutProgramDays[a.id]) - workoutWeekdays.indexOf(state.workoutProgramDays[b.id]));
  const filteredProgram = state.trainingDayFilter === "All"
    ? orderedProgram
    : orderedProgram.filter((session) => state.workoutProgramDays[session.id] === state.trainingDayFilter);
  renderTrainingWeekNav(orderedProgram, filteredProgram);
  if (!filteredProgram.length) {
    const empty = document.createElement("div");
    empty.className = "training-empty-day";
    empty.innerHTML = `<strong>No workout assigned to ${state.trainingDayFilter}.</strong><span>Select All Days, then assign a program to this weekday.</span>`;
    program.append(empty);
  }
  filteredProgram.forEach((session) => {
      const card = document.createElement("article");
      card.className = `card workout-program-card workout-tone-${session.tone}`;
      const head = document.createElement("div");
      head.className = "workout-program-card-head";
      const identity = document.createElement("div");
      identity.innerHTML = `<p class="eyebrow">${session.subtitle}</p><h3>${session.title}</h3>`;
      const dayLabel = document.createElement("label");
      dayLabel.className = "workout-day-control";
      dayLabel.innerHTML = "<span>Assigned day</span>";
      const daySelect = document.createElement("select");
      workoutWeekdays.forEach((weekday) => {
        const option = document.createElement("option");
        option.value = weekday;
        option.textContent = weekday;
        daySelect.append(option);
      });
      daySelect.value = state.workoutProgramDays[session.id] || session.defaultDay;
      daySelect.addEventListener("change", () => {
        state.workoutProgramDays[session.id] = daySelect.value;
        forceSaveState();
        renderWorkout();
      });
      dayLabel.append(daySelect);
      head.append(identity, dayLabel);
      const list = document.createElement("div");
      list.className = "workout-exercise-list";
      session.exercises.forEach(([name, prescription], index) => {
        const row = document.createElement("div");
        row.className = "workout-exercise-row";
        row.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><strong>${name}</strong><small>${prescription}</small>`;
        list.append(row);
      });
      card.append(head, list);
      program.append(card);
    });

  const log = document.querySelector("#workoutLog");
  log.innerHTML = "";
  if (!state.workouts.length) {
    const empty = document.createElement("div");
    empty.className = "workout-empty-state";
    empty.innerHTML = "<strong>No workout sessions recorded yet.</strong><span>Add a log, choose the program day, then record exercises, sets, reps, and notes.</span>";
    log.append(empty);
  }
  state.workouts.forEach((item, index) => {
    item.text = item.text || "Workout Session";
    item.program = item.program || "Push";
    item.exercise = item.exercise || "";
    item.sets = item.sets || "";
    item.reps = item.reps || "";
    item.weight = item.weight || "";
    item.note = item.note || "";
    item.date = item.date || todayKey();
    const card = document.createElement("div");
    card.className = "workout-log-card";
    const fields = document.createElement("div");
    fields.className = "workout-log-fields";
    const makeField = (labelText, key, attrs = {}) => {
      const label = document.createElement("label");
      label.innerHTML = `<span>${labelText}</span>`;
      const field = document.createElement("input");
      Object.assign(field, attrs);
      field.value = item[key] || "";
      field.addEventListener("input", () => {
        item[key] = field.value;
        saveState();
      });
      label.append(field);
      return label;
    };
    const programLabel = document.createElement("label");
    programLabel.innerHTML = "<span>Workout performed</span>";
    const programSelect = document.createElement("select");
    fixedWorkoutProgram.forEach((session) => {
      const option = document.createElement("option");
      option.value = session.title;
      option.textContent = session.title;
      programSelect.append(option);
    });
    programSelect.value = item.program;
    programSelect.addEventListener("change", () => {
      item.program = programSelect.value;
      item.text = programSelect.value;
      saveState();
      renderDashboard();
    });
    programLabel.append(programSelect);
    fields.append(
      makeField("Date", "date", { type: "date" }),
      programLabel,
      makeField("Exercise / work completed", "exercise", { placeholder: "Bench press, full Push session..." }),
      makeField("Sets", "sets", { type: "number", min: "0", placeholder: "4" }),
      makeField("Reps", "reps", { placeholder: "6-8" }),
      makeField("Weight", "weight", { placeholder: "135 lb or bodyweight" })
    );
    const notesLabel = document.createElement("label");
    notesLabel.className = "workout-notes-field";
    notesLabel.innerHTML = "<span>Side notes</span>";
    const notes = document.createElement("textarea");
    notes.rows = 3;
    notes.placeholder = "Form, energy, pain, personal record, what to improve next time...";
    notes.value = item.note;
    notes.addEventListener("input", () => {
      item.note = notes.value;
      saveState();
    });
    notesLabel.append(notes);
    const meta = document.createElement("div");
    meta.className = "workout-time-meta";
    const duration = workoutDuration(item);
    meta.innerHTML = `<strong>${workoutTimeRange(item)}</strong><span>${duration ? `Duration: ${duration}` : "Duration logs after you end the workout."}</span>`;
    const actions = document.createElement("div");
    actions.className = "resource-links";
    const start = document.createElement("button");
    start.className = "primary-btn compact-action";
    start.type = "button";
    start.textContent = item.startedAt && !item.endedAt ? "Restart" : "Start";
    start.addEventListener("click", () => {
      item.startedAt = new Date().toISOString();
      item.endedAt = "";
      item.done = false;
      saveState();
      renderWorkout();
      renderDashboard();
    });
    const end = document.createElement("button");
    end.className = "ghost-btn compact-action";
    end.type = "button";
    end.textContent = "End";
    end.disabled = !item.startedAt || !!item.endedAt;
    end.addEventListener("click", () => {
      item.endedAt = new Date().toISOString();
      item.done = true;
      saveState();
      renderWorkout();
      renderDashboard();
    });
    const save = document.createElement("button");
    save.className = "ghost-btn compact-action";
    save.type = "button";
    save.textContent = "Save";
    save.addEventListener("click", () => {
      item.text = item.program || item.text;
      item.savedAt = new Date().toISOString();
      forceSaveState();
      const status = document.querySelector("#workoutSaveStatus");
      if (status) status.textContent = `Saved ${new Date(item.savedAt).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
      renderWorkout();
      renderDashboard();
    });
    const del = document.createElement("button");
    del.className = "danger-btn compact-action";
    del.type = "button";
    del.textContent = "Delete";
    del.addEventListener("click", () => {
    state.workouts.splice(index, 1);
    saveState();
    renderWorkout();
      renderDashboard();
    });
    actions.append(start, end, save, del);
    card.append(fields, notesLabel, meta, actions);
    log.append(card);
  });
  const ideas = document.querySelector("#exerciseIdeas");
  ideas.innerHTML = "";
  const dailyIdeas = [
    `Follow today's ${todayPlan.title} exercise order and record each working set.`,
    ...exerciseIdeas.slice(0, 4)
  ];
  dailyIdeas.forEach((idea) => {
    const p = document.createElement("p");
    p.className = "status-pill";
    p.textContent = idea;
    ideas.append(p);
  });
}

function renderWeeklyRoutineEditor() {
  const wrap = document.querySelector("#trainingWeeklyRoutine");
  if (!wrap) return;
  wrap.innerHTML = "";
  const choices = ["Push", "Pull", "Legs", "Upper Body Power", "Lower + Fat Loss", "Recovery", "Rest"];
  workoutWeekdays.forEach((weekday) => {
    const row = document.createElement("label");
    row.innerHTML = `<span>${weekday}</span>`;
    const selectNode = document.createElement("select");
    choices.forEach((choice) => selectNode.append(new Option(choice, choice)));
    selectNode.value = state.workoutWeeklyRoutine?.[weekday] || defaultState().workoutWeeklyRoutine[weekday];
    selectNode.addEventListener("change", () => {
      state.workoutWeeklyRoutine[weekday] = selectNode.value;
      forceSaveState();
      renderWorkout();
      renderDashboard();
    });
    row.append(selectNode);
    wrap.append(row);
  });
}

function renderManualWorkout() {
  const draft = state.manualWorkoutDraft || defaultState().manualWorkoutDraft;
  state.manualWorkoutDraft = draft;
  const updateStatus = () => {
    const timing = manualWorkoutTiming(draft.date || activeDate, draft.startTime, draft.endTime, draft.durationMinutes);
    fillStatus("#manualWorkoutStatus", timing.error
      ? [timing.error]
      : [
          `Duration: ${formatDuration(timing.durationMinutes * 60000)}`,
          timing.overnight ? "This workout ends after midnight and is recorded as an overnight session." : "The time range is valid."
        ]);
  };
  setField("#manualWorkoutName", draft.name || "", (value) => draft.name = value);
  setField("#manualWorkoutDate", draft.date || activeDate, (value) => {
    draft.date = value;
    updateStatus();
  });
  setField("#manualWorkoutStart", draft.startTime || "", (value) => {
    draft.startTime = value;
    updateStatus();
  });
  setField("#manualWorkoutEnd", draft.endTime || "", (value) => {
    draft.endTime = value;
    updateStatus();
  });
  setField("#manualWorkoutDuration", draft.durationMinutes || "", (value) => {
    draft.durationMinutes = value;
    updateStatus();
  });
  setField("#manualWorkoutNotes", draft.notes || "", (value) => draft.notes = value);
  updateStatus();
}

function saveManualWorkout() {
  const draft = state.manualWorkoutDraft || {};
  const timing = manualWorkoutTiming(draft.date || activeDate, draft.startTime, draft.endTime, draft.durationMinutes);
  if (timing.error) {
    fillStatus("#manualWorkoutStatus", [timing.error]);
    return;
  }
  const now = new Date();
  state.workouts.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    entryType: "manual",
    text: String(draft.name || "").trim() || "Manual Workout",
    program: String(draft.name || "").trim() || "Manual Workout",
    date: draft.date || activeDate,
    startedAt: timing.startedAt,
    endedAt: timing.endedAt,
    manualDurationMinutes: timing.durationMinutes,
    note: String(draft.notes || "").trim(),
    done: true,
    savedAt: now.toISOString()
  });
  state.manualWorkoutDraft = { ...defaultState().manualWorkoutDraft, date: activeDate };
  forceSaveState();
  renderManualWorkout();
  renderWorkout();
  renderWorkoutHistory();
  renderDashboard();
  fillStatus("#manualWorkoutStatus", [`Manual workout saved at ${now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}.`]);
}

function renderWorkoutHistory() {
  const wrap = document.querySelector("#workoutHistoryList");
  if (!wrap) return;
  wrap.innerHTML = "";
  const records = (state.workouts || []).slice().sort((a, b) => {
    const aStamp = a.endedAt || a.startedAt || `${a.date || ""}T00:00:00`;
    const bStamp = b.endedAt || b.startedAt || `${b.date || ""}T00:00:00`;
    return String(bStamp).localeCompare(String(aStamp));
  });
  if (!records.length) {
    const empty = document.createElement("article");
    empty.className = "card";
    empty.textContent = "No workout history yet.";
    wrap.append(empty);
    return;
  }
  records.forEach((item) => {
    const parts = workoutClockParts(item);
    const card = document.createElement("article");
    card.className = "card workout-history-card";
    card.innerHTML = `<div class="workout-history-head"><span>${item.entryType === "manual" ? "Manual" : "Timer"}</span><strong>${workoutDuration(item) || "Duration not recorded"}</strong></div>`;
    const name = input(item.program || item.text || "", (value) => {
      item.program = value;
      item.text = value;
    }, { placeholder: "Workout name" });
    const date = input(parts.date, () => {}, { type: "date" });
    const start = input(parts.startTime, () => {}, { type: "time" });
    const end = input(parts.endTime, () => {}, { type: "time" });
    const duration = input(item.manualDurationMinutes || "", () => {}, { type: "number", min: "1", step: "1", placeholder: "Duration override" });
    const notes = document.createElement("textarea");
    notes.rows = 4;
    notes.value = item.note || "";
    notes.placeholder = "Workout notes";
    const fields = document.createElement("div");
    fields.className = "form-grid workout-history-fields";
    [
      ["Workout name", name],
      ["Date", date],
      ["Start time", start],
      ["End time", end],
      ["Duration override (minutes)", duration]
    ].forEach(([labelText, field]) => fields.append(labeledControl(labelText, field)));
    const actions = document.createElement("div");
    actions.className = "resource-links";
    const save = document.createElement("button");
    save.type = "button";
    save.className = "primary-btn compact-action";
    save.textContent = "Save Changes";
    save.addEventListener("click", () => {
      const timing = manualWorkoutTiming(date.value, start.value, end.value, duration.value);
      if (timing.error) {
        alert(timing.error);
        return;
      }
      item.date = date.value;
      item.startedAt = timing.startedAt;
      item.endedAt = timing.endedAt;
      item.manualDurationMinutes = timing.durationMinutes;
      item.note = notes.value;
      item.done = true;
      item.savedAt = new Date().toISOString();
      forceSaveState();
      renderWorkoutHistory();
      renderWorkout();
      renderDashboard();
    });
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "danger-btn compact-action";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      if (!confirm("Delete this workout record?")) return;
      state.workouts.splice(state.workouts.indexOf(item), 1);
      forceSaveState();
      renderWorkoutHistory();
      renderWorkout();
      renderDashboard();
    });
    actions.append(save, remove);
    card.append(fields, labeledControl("Notes", notes), actions);
    wrap.append(card);
  });
}

function renderTrainingWeekNav(orderedProgram, filteredProgram) {
  const nav = document.querySelector("#trainingWeekNav");
  if (!nav) return;
  nav.innerHTML = "";
  ["All", ...workoutWeekdays].forEach((weekday) => {
    const session = weekday === "All"
      ? null
      : orderedProgram.find((item) => state.workoutProgramDays[item.id] === weekday);
    const button = document.createElement("button");
    button.type = "button";
    button.className = `training-day-button${state.trainingDayFilter === weekday ? " is-active" : ""}`;
    button.innerHTML = weekday === "All"
      ? "<strong>All</strong><small>Full week</small>"
      : `<strong>${weekday.slice(0, 3)}</strong><small>${session?.title || "Open"}</small>`;
    button.addEventListener("click", () => {
      state.trainingDayFilter = weekday;
      forceSaveState();
      renderWorkout();
    });
    nav.append(button);
  });
  const title = document.querySelector("#trainingViewTitle");
  const meta = document.querySelector("#trainingViewMeta");
  const count = document.querySelector("#trainingPlanCount");
  if (title) title.textContent = state.trainingDayFilter === "All" ? "Complete Training Week" : `${state.trainingDayFilter} Focus`;
  if (meta) {
    meta.textContent = state.trainingDayFilter === "All"
      ? "Review the full week or select one day for a focused plan."
      : filteredProgram.length ? `${filteredProgram[0].title}: ${filteredProgram[0].subtitle}` : "No workout is assigned to this day.";
  }
  if (count) count.textContent = `${filteredProgram.length} ${filteredProgram.length === 1 ? "plan" : "plans"}`;
}

function renderWorkoutVideoSuggestions(plan) {
  const wrap = document.querySelector("#workoutVideoSuggestions");
  if (!wrap) return;
  wrap.innerHTML = "";
  const tutorialExercises = plan.exercises
    .filter(([name]) => !/warm-up|choose one|recovery check|no gym|weekly reset|treadmill|incline walk/i.test(name))
    .slice(0, 3);
  const suggestions = tutorialExercises.map(([name, prescription]) => ({
    label: "Form Tutorial",
    title: name,
    note: prescription,
    url: `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} proper form tutorial beginner`)}`
  }));
  suggestions.push(
    {
      label: "Workout Motivation",
      title: "Start The Session",
      note: "Short gym motivation. Watch briefly, then train.",
      url: "https://www.youtube.com/results?search_query=short+gym+workout+motivation+discipline"
    },
    {
      label: "Consistency",
      title: "Discipline Over Mood",
      note: "Build the habit on busy school and work days.",
      url: "https://www.youtube.com/results?search_query=fitness+discipline+consistency+motivation"
    }
  );
  suggestions.forEach((item) => {
    const link = document.createElement("a");
    link.className = "workout-video-link";
    link.href = item.url;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.innerHTML = `
      <span class="workout-video-play" aria-hidden="true">PLAY</span>
      <span class="workout-video-copy">
        <small>${item.label}</small>
        <strong>${item.title}</strong>
        <em>${item.note}</em>
      </span>
      <b aria-hidden="true">OPEN</b>
    `;
    wrap.append(link);
  });
}

function renderRoadmap() {
  const list = document.querySelector("#roadmapList");
  list.innerHTML = "";
  state.roadmap.forEach((item, index) => {
    const row = document.createElement("div");
    row.className = "roadmap-item";
    row.append(input(item.phase, (value) => item.phase = value, { placeholder: "Phase" }));
    row.append(input(item.text, (value) => item.text = value, { placeholder: "Roadmap step" }));
    row.append(select(item.status || "Planned", ["Planned", "In progress", "Done"], (value) => item.status = value));
    const del = document.createElement("button");
    del.className = "icon-btn";
    del.textContent = "x";
    del.addEventListener("click", () => {
      state.roadmap.splice(index, 1);
      saveState();
      renderRoadmap();
    });
    row.append(del);
    list.append(row);
  });
}

function renderFiles() {
  const list = document.querySelector("#fileList");
  list.innerHTML = "";
  state.files.forEach((file, index) => {
    const row = document.createElement("div");
    row.className = "file-row";
    const meta = document.createElement("div");
    meta.innerHTML = `<strong>${file.name}</strong><small>${file.type || "file"} • ${file.added ? new Date(file.added).toLocaleString() : "Saved"}</small>`;
    const view = document.createElement("button");
    view.className = "ghost-btn";
    view.textContent = "View";
    view.addEventListener("click", () => viewFile(file));
    const download = document.createElement("button");
    download.className = "ghost-btn";
    download.textContent = "Download";
    download.addEventListener("click", () => downloadFile(file));
    const del = document.createElement("button");
    del.className = "icon-btn";
    del.textContent = "x";
    del.addEventListener("click", async () => {
      await deleteFileData(file.id);
      state.files.splice(index, 1);
      saveState();
      renderFiles();
      document.querySelector("#fileViewer").textContent = "Choose a file to preview it here.";
    });
    row.append(meta, view, download, del);
    list.append(row);
  });
}

async function downloadFile(file) {
  const data = file.data || await getFileData(file.id);
  if (!data) return;
  const link = document.createElement("a");
  link.href = data;
  link.download = file.name;
  link.click();
}

function renderCalendar() {
  const draft = state.calendarDraft || {};
  setField("#calTitle", draft.title || "", (value) => draft.title = value);
  setField("#calLocation", draft.location || "", (value) => draft.location = value);
  setField("#calStart", draft.start || "", (value) => draft.start = value);
  setField("#calEnd", draft.end || "", (value) => draft.end = value);
  setField("#calDetails", draft.details || "", (value) => draft.details = value);
  state.calendarDraft = draft;
  renderBillCalendar();
  renderCalendarMonth();
  renderSavedCalendarEvents();
}

function calendarLocalEvents() {
  return (state.importantDates || []).filter((item) => item.source === "calendar" || item.calendarEvent);
}

function renderCalendarMonth() {
  const grid = document.querySelector("#calendarMonthGrid");
  const title = document.querySelector("#calendarMonthTitle");
  if (!grid || !title) return;
  const base = new Date(`${activeDate}T12:00:00`);
  const month = new Date(base.getFullYear(), base.getMonth() + Number(state.calendarMonthOffset || 0), 1);
  const year = month.getFullYear();
  const monthIndex = month.getMonth();
  const days = new Date(year, monthIndex + 1, 0).getDate();
  title.textContent = month.toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const eventsByDate = new Map();
  const addEvent = (dateValue, label, type) => {
    const key = String(dateValue || "").slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(key)) return;
    const list = eventsByDate.get(key) || [];
    list.push({ label, type });
    eventsByDate.set(key, list);
  };
  (state.importantDates || []).forEach((item) => addEvent(item.when, item.title || "Important date", item.source === "calendar" ? "event" : "date"));
  (state.assignments || []).forEach((item) => addEvent(item.due, item.title || "Assignment", "school"));
  getMonthBillEvents(`${year}-${String(monthIndex + 1).padStart(2, "0")}-01`).forEach((item) => addEvent(item.date || item.dateKey, item.name, "bill"));
  grid.innerHTML = "";
  for (let blank = 0; blank < month.getDay(); blank += 1) {
    const spacer = document.createElement("span");
    spacer.className = "calendar-month-day is-blank";
    grid.append(spacer);
  }
  for (let number = 1; number <= days; number += 1) {
    const key = `${year}-${String(monthIndex + 1).padStart(2, "0")}-${String(number).padStart(2, "0")}`;
    const events = eventsByDate.get(key) || [];
    const cell = document.createElement("button");
    cell.type = "button";
    cell.className = "calendar-month-day";
    cell.classList.toggle("is-today", key === todayKey());
    cell.classList.toggle("is-active", key === activeDate);
    cell.innerHTML = `<strong>${number}</strong><span>${events.slice(0, 3).map((item) => `<i class="is-${item.type}" title="${escapeHtml(item.label)}"></i>`).join("")}</span>${events.length ? `<small>${events.length}</small>` : ""}`;
    cell.title = events.length ? events.map((item) => item.label).join("\n") : "No saved events";
    cell.addEventListener("click", () => {
      activeDate = key;
      state.activeDate = key;
      forceSaveState();
      renderCalendarMonth();
    });
    grid.append(cell);
  }
}

function renderSavedCalendarEvents() {
  const wrap = document.querySelector("#savedCalendarEvents");
  const count = document.querySelector("#calendarEventCount");
  if (!wrap) return;
  const events = calendarLocalEvents().slice().sort((a, b) => String(a.when || "").localeCompare(String(b.when || "")));
  if (count) count.textContent = `${events.length} event${events.length === 1 ? "" : "s"}`;
  wrap.innerHTML = "";
  if (!events.length) {
    wrap.innerHTML = `<div class="empty-state"><strong>No calendar events saved yet.</strong><small>Create an event above. It will appear here and in Smart Calendar.</small></div>`;
    return;
  }
  events.forEach((item) => {
    const row = document.createElement("article");
    row.className = "calendar-event-row";
    row.innerHTML = `<span class="calendar-event-date">${item.when ? new Date(item.when).toLocaleString() : "Date not set"}</span><div><strong>${escapeHtml(item.title || "Calendar event")}</strong><small>${escapeHtml([item.location, item.note].filter(Boolean).join(" | ") || "Saved event")}</small></div>`;
    const remove = document.createElement("button");
    remove.className = "danger-btn compact-action";
    remove.type = "button";
    remove.textContent = "Delete";
    remove.addEventListener("click", () => {
      const index = state.importantDates.indexOf(item);
      if (index >= 0) state.importantDates.splice(index, 1);
      forceSaveState();
      renderCalendar();
      renderDashboard();
    });
    row.append(remove);
    wrap.append(row);
  });
}

function saveCalendarEvent() {
  const draft = state.calendarDraft || {};
  if (!String(draft.title || "").trim() || !draft.start) {
    alert("Add an event title and start date first.");
    return false;
  }
  state.importantDates = state.importantDates || [];
  state.importantDates.push({
    title: String(draft.title).trim(),
    className: draft.location || "",
    location: draft.location || "",
    when: draft.start,
    end: draft.end || "",
    type: "Event",
    status: "Upcoming",
    note: draft.details || "",
    source: "calendar",
    calendarEvent: true,
    createdAt: new Date().toISOString()
  });
  forceSaveState();
  return true;
}

function renderBillCalendar() {
  const wrap = document.querySelector("#billCalendarList");
  if (!wrap) return;
  const monthName = new Date(`${activeDate}T12:00:00`).toLocaleDateString(undefined, { month: "long", year: "numeric" });
  const events = getMonthBillEvents(activeDate);
  wrap.innerHTML = "";
  const unpaidTotal = events.filter((event) => !event.paid).reduce((sum, event) => sum + Number(event.amount || 0), 0);
  const heading = document.createElement("div");
  heading.className = "bill-calendar-summary";
  heading.innerHTML = `<span><small>Calendar month</small><strong>${escapeHtml(monthName)}</strong></span><span><small>Scheduled items</small><strong>${events.length}</strong></span><span><small>Remaining</small><strong>${money(unpaidTotal)}</strong></span>`;
  wrap.append(heading);
  const grid = document.createElement("div");
  grid.className = "bill-calendar-event-grid";
  events.forEach((event) => {
    const row = document.createElement("article");
    const distance = dayDistance(event.date);
    row.className = `bill-calendar-event${event.paid ? " is-paid" : distance < 0 ? " is-overdue" : distance <= 3 ? " is-due-soon" : ""}`;
    row.innerHTML = `<span>${escapeHtml(event.dateLabel)}</span><div><strong>${escapeHtml(event.name || "Bill")}</strong><small>${escapeHtml(event.category || "Monthly bill")}</small></div><b>${money(Number(event.amount || 0))}</b><em>${event.paid ? "Paid" : distance < 0 ? `${Math.abs(distance)} days overdue` : distance === 0 ? "Due today" : `In ${distance} days`}</em>`;
    grid.append(row);
  });
  if (!events.length) grid.innerHTML = `<div class="empty-state"><strong>No bills scheduled.</strong><small>Add a due date in Monthly Bills to build this calendar.</small></div>`;
  wrap.append(grid);
}

function googleDate(value) {
  if (!value) return "";
  return new Date(value).toISOString().replace(/[-:]|\.\d{3}/g, "");
}

function buildCalendarLink() {
  const draft = state.calendarDraft || {};
  const dates = draft.start && draft.end ? `${googleDate(draft.start)}/${googleDate(draft.end)}` : "";
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: draft.title || "Planner event",
    details: draft.details || "",
    location: draft.location || ""
  });
  if (dates) params.set("dates", dates);
  const url = `https://calendar.google.com/calendar/render?${params.toString()}`;
  document.querySelector("#calendarEventLink").href = url;
  document.querySelector("#calendarEventLink").textContent = "Open New Event";
  return url;
}

function renderGithub() {
  const draft = state.githubDraft || { branch: "main", message: "Upload planner file" };
  state.githubDraft = draft;
  setField("#ghOwner", draft.owner || "", (value) => draft.owner = value);
  setField("#ghRepo", draft.repo || "", (value) => draft.repo = value);
  setField("#ghBranch", draft.branch || "main", (value) => draft.branch = value);
  setField("#ghPath", draft.path || "", (value) => draft.path = value);
  setField("#ghMessage", draft.message || "Upload planner file", (value) => draft.message = value);
}

function readFileAsBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(",")[1]);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

async function uploadGithubFile() {
  const status = document.querySelector("#githubStatus");
  const file = document.querySelector("#ghFile").files[0];
  const draft = state.githubDraft || {};
  const token = document.querySelector("#ghToken").value.trim();
  if (!file || !draft.owner || !draft.repo || !draft.path || !token) {
    status.textContent = "Missing file, owner, repo, path, or token.";
    return;
  }
  status.textContent = "Uploading...";
  try {
    const content = await readFileAsBase64(file);
    const url = `https://api.github.com/repos/${draft.owner}/${draft.repo}/contents/${encodeURIComponent(draft.path).replaceAll("%2F", "/")}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: draft.message || `Upload ${file.name}`,
        content,
        branch: draft.branch || "main"
      })
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || "GitHub upload failed");
    status.innerHTML = `Uploaded. <a href="${result.content.html_url}" target="_blank" rel="noreferrer">Open file on GitHub</a>`;
  } catch (error) {
    status.textContent = error.message;
  }
}

function renderMaps() {
  const query = state.mapQuery || "New York Public Library";
  setField("#mapQuery", query, (value) => state.mapQuery = value);
  const url = `https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`;
  const external = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
  document.querySelector("#mapFrame").src = url;
  document.querySelector("#externalMapLink").href = external;
}

function renderDiscipline() {
  if (!state.discipline) state.discipline = { start: "", reason: "", triggers: [], accumulatedMs: 0, resting: false, sessions: [] };
  setField("#disciplineReason", state.discipline.reason || "", (value) => state.discipline.reason = value);
  const started = state.discipline.start ? new Date(state.discipline.start) : null;
  document.querySelector("#disciplineTimer").textContent = formatStreak(disciplineElapsedMs());
  document.querySelector("#disciplineStarted").textContent = started
    ? `Active since ${started.toLocaleString()}`
    : state.discipline.resting
      ? "Resting. Your saved current progress is protected."
      : Number(state.discipline.accumulatedMs || 0) > 0
        ? "Paused progress is ready to continue or save."
        : "Start today and protect your focus.";
  const startButton = document.querySelector("#startDiscipline");
  const restButton = document.querySelector("#restDiscipline");
  const stopButton = document.querySelector("#stopDiscipline");
  if (startButton) startButton.textContent = started ? "Running" : Number(state.discipline.accumulatedMs || 0) > 0 ? "Resume" : "Start";
  if (restButton) restButton.disabled = !started;
  if (stopButton) stopButton.disabled = disciplineElapsedMs() <= 0;
  const metricGrid = document.querySelector("#disciplineMetricGrid");
  if (metricGrid) {
    const sessions = state.discipline.sessions || [];
    const currentDays = Math.floor(disciplineElapsedMs() / 86400000);
    const bestDays = Math.max(currentDays, 0, ...sessions.map((session) => Math.floor(Number(session.durationMs || 0) / 86400000)));
    const prayersDone = prayers.filter((name) => day().prayers?.[name]?.done).length;
    const workoutDone = workoutLogsForDate(activeDate).some((item) => item.done || item.endedAt || item.entryType === "manual");
    const schoolDone = state.tasks.filter((item) => item.category === "School" && item.status === "Done").length;
    const schoolTotal = state.tasks.filter((item) => item.category === "School").length;
    const latestSleep = (state.sleepSessions || []).slice().sort((a, b) => new Date(b.date || b.savedAt || 0) - new Date(a.date || a.savedAt || 0))[0];
    const sleepHours = Number(latestSleep?.hours || latestSleep?.durationHours || 0);
    const billsPaid = state.bills.filter((item) => item.paid).length;
    const scoreParts = [
      prayersDone / 5,
      workoutDone ? 1 : 0,
      schoolTotal ? schoolDone / schoolTotal : 0,
      sleepHours ? Math.min(1, sleepHours / 8) : 0,
      state.bills.length ? billsPaid / state.bills.length : 0,
      disciplineElapsedMs() > 0 ? 1 : 0
    ];
    const score = Math.round(scoreParts.reduce((sum, value) => sum + value, 0) / scoreParts.length * 100);
    const metrics = [
      ["FLAME", "Current streak", `${currentDays} days`, Math.min(100, currentDays * 10), "streak"],
      ["BEST", "Best streak", `${bestDays} days`, Math.min(100, bestDays * 10), "best"],
      ["PRAY", "Prayer consistency", `${prayersDone}/5`, prayersDone / 5 * 100, "faith"],
      ["FIT", "Workout consistency", workoutDone ? "Complete" : "Open", workoutDone ? 100 : 0, "workout"],
      ["STUDY", "Study consistency", schoolTotal ? `${schoolDone}/${schoolTotal}` : "No tasks", schoolTotal ? schoolDone / schoolTotal * 100 : 0, "study"],
      ["FOCUS", "No-fap streak", `${currentDays} days`, Math.min(100, currentDays * 10), "focus"],
      ["SLEEP", "Sleep discipline", sleepHours ? `${sleepHours.toFixed(1)}h` : "No log", sleepHours ? Math.min(100, sleepHours / 8 * 100) : 0, "sleep"],
      ["MONEY", "Money discipline", state.bills.length ? `${billsPaid}/${state.bills.length}` : "No bills", state.bills.length ? billsPaid / state.bills.length * 100 : 0, "money"]
    ];
    metricGrid.innerHTML = metrics.map(([icon, label, value, progress, tone]) => `
      <article class="discipline-metric ${tone}" style="--metric-progress:${Math.round(progress)}%">
        <span>${icon}</span><div><small>${label}</small><strong>${value}</strong><i><b></b></i></div>
      </article>`).join("");
  }
  const notes = document.querySelector("#triggerNotes");
  notes.innerHTML = "";
  state.discipline.triggers.forEach((item, index) => notes.append(editableItem(item, (patch) => {
    state.discipline.triggers[index] = { ...state.discipline.triggers[index], ...patch };
  }, () => {
    state.discipline.triggers.splice(index, 1);
    saveState();
    renderDiscipline();
  })));
  const history = document.querySelector("#disciplineProgressHistory");
  const count = document.querySelector("#disciplineSessionCount");
  const sessions = state.discipline.sessions || [];
  if (count) count.textContent = `${sessions.length} session${sessions.length === 1 ? "" : "s"}`;
  if (history) {
    history.innerHTML = "";
    if (!sessions.length) {
      history.innerHTML = `<div class="empty-state"><strong>No saved progress yet.</strong><small>Use Stop + Save when you finish a discipline period.</small></div>`;
    } else {
      sessions.slice(0, 12).forEach((session) => {
        const sessionIndex = sessions.indexOf(session);
        const row = document.createElement("article");
        row.innerHTML = `<span>&#10003;</span><div><strong>${formatStreak(Number(session.durationMs || 0))}</strong><small>${new Date(session.savedAt).toLocaleString()}${session.reason ? ` | ${escapeHtml(session.reason)}` : ""}</small></div>`;
        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "danger-btn compact-action";
        remove.textContent = "Delete";
        remove.addEventListener("click", () => {
          if (!confirm("Delete this saved discipline progress entry?")) return;
          state.discipline.sessions.splice(sessionIndex, 1);
          forceSaveState();
          renderDiscipline();
        });
        row.append(remove);
        history.append(row);
      });
    }
  }
}

function updateDisciplineTimer() {
  const timer = document.querySelector("#disciplineTimer");
  if (timer) timer.textContent = formatStreak(disciplineElapsedMs());
}

function disciplineElapsedMs() {
  const accumulated = Number(state.discipline?.accumulatedMs || 0);
  if (!state.discipline?.start) return accumulated;
  const started = new Date(state.discipline.start).getTime();
  return accumulated + Math.max(0, Date.now() - started);
}

function formatStreak(ms) {
  const days = Math.floor(ms / 86400000);
  const hours = Math.floor((ms % 86400000) / 3600000);
  const minutes = Math.floor((ms % 3600000) / 60000);
  const seconds = Math.floor((ms % 60000) / 1000);
  return `${days} days ${hours}h ${minutes}m ${seconds}s`;
}

function checkAlarms() {
  const now = new Date();
  const current = now.toTimeString().slice(0, 5);
  const today = localDateKey(now);
  state.alarms.forEach((alarm, index) => {
    if (alarm.enabled && alarm.time === current && alarm.firedDate !== today) {
      alarm.firedDate = today;
      alarm.lastFired = now.toLocaleString();
      forceSaveState();
      queueAlarmPopup(alarm, index);
      renderAlarms();
    }
  });
}

function queueAlarmPopup(alarm, index = -1) {
  alarmPopupQueue.push({ alarm, index });
  if (!activeAlarmPopup) showNextAlarmPopup();
}

function showNextAlarmPopup() {
  const next = alarmPopupQueue.shift();
  if (!next) {
    activeAlarmPopup = null;
    return;
  }
  activeAlarmPopup = next;
  const popup = document.querySelector("#alarmPopup");
  const now = new Date();
  document.querySelector("#alarmPopupMessage").textContent = next.alarm.message || next.alarm.label || "Your alarm is ready.";
  document.querySelector("#alarmPopupTime").textContent = next.alarm.time || now.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  document.querySelector("#alarmPopupDate").textContent = now.toLocaleDateString(undefined, { weekday: "long", month: "long", day: "numeric" });
  popup.hidden = false;
  document.body.classList.add("alarm-is-ringing");
  document.querySelector("#dismissAlarmPopup")?.focus();
  if (navigator.vibrate) navigator.vibrate([250, 120, 250, 120, 500]);
  playAlarmTone();
}

function playAlarmTone() {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const context = new AudioContextClass();
    [0, 0.32, 0.64].forEach((delay, index) => {
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = index % 2 ? 740 : 880;
      gain.gain.setValueAtTime(0.0001, context.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.18, context.currentTime + delay + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + delay + 0.24);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(context.currentTime + delay);
      oscillator.stop(context.currentTime + delay + 0.26);
    });
    setTimeout(() => context.close(), 1200);
  } catch {
    // The visual alarm remains available if browser audio is blocked.
  }
}

function closeAlarmPopup() {
  const popup = document.querySelector("#alarmPopup");
  if (popup) popup.hidden = true;
  document.body.classList.remove("alarm-is-ringing");
  activeAlarmPopup = null;
  showNextAlarmPopup();
}

function snoozeActiveAlarm() {
  if (!activeAlarmPopup) return;
  const alarm = activeAlarmPopup.alarm;
  if (alarm.countdown) {
    closeAlarmPopup();
    return;
  }
  const snoozeTime = new Date(Date.now() + 5 * 60000);
  alarm.time = snoozeTime.toTimeString().slice(0, 5);
  alarm.firedDate = "";
  alarm.enabled = true;
  alarm.lastFired = `Snoozed until ${snoozeTime.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}`;
  forceSaveState();
  renderAlarms();
  closeAlarmPopup();
}

function tickTimers() {
  checkDailyRollover();
  updateLiveClock();
  checkPrayerTimeAdhan();
  updateCountdownDisplays();
  updateDisciplineTimer();
  if (state.health?.sleepActiveStart) {
    fillStatus("#sleepTimerStatus", [`Running: ${formatDuration(Date.now() - new Date(state.health.sleepActiveStart).getTime())}`]);
    renderHomeSleepSummary();
  }
  if (document.querySelector("#dashboard")?.classList.contains("is-visible")) renderHomeFitnessSummary();
  checkAlarms();
}

async function viewFile(file) {
  const viewer = document.querySelector("#fileViewer");
  viewer.innerHTML = "";
  const data = file.data || await getFileData(file.id);
  if (!data) {
    viewer.textContent = "This file could not be loaded from browser storage.";
    return;
  }
  if (file.type.includes("pdf")) {
    const iframe = document.createElement("iframe");
    iframe.src = data;
    viewer.append(iframe);
  } else if (file.type.startsWith("image/")) {
    const img = document.createElement("img");
    img.src = data;
    img.alt = file.name;
    viewer.append(img);
  } else if (file.type.startsWith("text/") || file.name.endsWith(".md")) {
    fetch(data).then((res) => res.text()).then((text) => {
      const pre = document.createElement("pre");
      pre.textContent = text;
      viewer.append(pre);
    });
  } else {
    viewer.textContent = "This file type is saved, but preview is only available for PDF, images, and text.";
  }
}

function profileDisplayName() {
  return String(state.profile?.preferredname || state.profile?.name || "Shahariar").trim() || "Shahariar";
}

function profileGreeting() {
  const name = profileDisplayName().split(/\s+/)[0];
  if (state.profile?.customgreeting?.trim()) return state.profile.customgreeting.trim().replace(/\{name\}/gi, name);
  if (state.profile?.greetingstyle === "welcome") return `Welcome back, ${name}`;
  if (state.profile?.greetingstyle === "command") return `Ready to command your day, ${name}?`;
  const hour = new Date().getHours();
  return `${hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening"}, ${name}`;
}

function renderProfile() {
  ["Name", "PreferredName", "Role", "Phone", "Email", "School", "Grade", "City", "Goal", "Bio", "SchoolGoal", "FitnessGoal", "FinanceGoal", "FaithGoal", "CareerGoal", "CustomGreeting", "CustomIdentity"].forEach((key) => {
    const id = `#profile${key}`;
    setField(id, state.profile[key.toLowerCase()] || "", (value) => {
      state.profile[key.toLowerCase()] = value;
      renderDashboard();
      renderProfileIdentity();
    });
  });
  setField("#profileGreetingStyle", state.profile.greetingstyle || "dynamic", (value) => {
    state.profile.greetingstyle = value;
    renderDashboard();
  });
  setField("#profileDashboardMode", state.profile.dashboardmode || "compact", (value) => {
    state.profile.dashboardmode = value;
    state.smartLayout.modeByPage.dashboard = value;
    forceSaveState();
    enhanceSmartTileSystem();
  });
  setField("#profileDefaultFocus", state.profile.defaultfocus || "All", (value) => {
    state.profile.defaultfocus = value;
  });
  document.querySelectorAll(".profile-identity").forEach((inputNode) => {
    inputNode.checked = (state.profile.identities || []).includes(inputNode.value);
  });
  const avatarControls = {
    profileAvatarSize: ["avatarsize", 76, " px"],
    profileAvatarZoom: ["avatarzoom", 100, "%"],
    profileAvatarX: ["avatarx", 50, "%"],
    profileAvatarY: ["avatary", 50, "%"]
  };
  Object.entries(avatarControls).forEach(([id, [key, fallback, suffix]]) => {
    const control = document.querySelector(`#${id}`);
    const value = Number(state.profile[key] ?? fallback);
    if (control) control.value = String(value);
    const output = document.querySelector(`#${id}Value`);
    if (output) output.textContent = `${value}${suffix}`;
  });
  renderProfileIdentity();
}

function renderProfileIdentity() {
  const name = profileDisplayName();
  const initials = name.split(/\s+/).slice(0, 2).map((part) => part[0]).join("").toUpperCase() || "SF";
  const headerInitials = document.querySelector("#globalProfileInitials");
  const headerButton = document.querySelector("#globalProfileButton");
  const preview = document.querySelector("#profileAvatarPreview");
  if (headerInitials) headerInitials.textContent = state.profile.avatar ? "" : initials;
  if (headerButton) {
    headerButton.classList.toggle("has-profile-image", !!state.profile.avatar);
    headerButton.style.setProperty("--profile-avatar-image", state.profile.avatar ? `url("${state.profile.avatar}")` : "none");
    headerButton.style.setProperty("--profile-avatar-size", `${Number(state.profile.avatarzoom || 100)}%`);
    headerButton.style.setProperty("--profile-avatar-position", `${Number(state.profile.avatarx ?? 50)}% ${Number(state.profile.avatary ?? 50)}%`);
    headerButton.style.backgroundImage = state.profile.avatar ? `url("${state.profile.avatar}")` : "";
    headerButton.style.backgroundSize = `${Number(state.profile.avatarzoom || 100)}%`;
    headerButton.style.backgroundPosition = `${Number(state.profile.avatarx ?? 50)}% ${Number(state.profile.avatary ?? 50)}%`;
  }
  if (preview) {
    preview.textContent = state.profile.avatar ? "" : initials;
    preview.style.backgroundImage = state.profile.avatar ? `url("${state.profile.avatar}")` : "";
    const size = Math.min(180, Math.max(56, Number(state.profile.avatarsize || 76)));
    preview.style.width = `${size}px`;
    preview.style.height = `${size}px`;
    preview.style.flexBasis = `${size}px`;
    preview.style.backgroundSize = `${Number(state.profile.avatarzoom || 100)}%`;
    preview.style.backgroundPosition = `${Number(state.profile.avatarx ?? 50)}% ${Number(state.profile.avatary ?? 50)}%`;
  }
}

function vaultBytesToBase64(bytes) {
  let binary = "";
  const array = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  for (let index = 0; index < array.length; index += 0x8000) {
    binary += String.fromCharCode(...array.subarray(index, index + 0x8000));
  }
  return btoa(binary);
}

function vaultBase64ToBytes(value) {
  const binary = atob(String(value || ""));
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function credentialVaultEnvelope() {
  try {
    const parsed = JSON.parse(localStorage.getItem(CREDENTIAL_VAULT_KEY) || "null");
    return parsed?.version === 1 ? parsed : null;
  } catch {
    return null;
  }
}

async function deriveCredentialVaultKey(password, salt) {
  if (!window.crypto?.subtle) throw new Error("Browser encryption is unavailable. Open FahimOS through localhost or HTTPS.");
  const material = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: VAULT_KDF_ITERATIONS, hash: "SHA-256" },
    material,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

async function encryptCredentialVault(entries, key, salt) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const plaintext = new TextEncoder().encode(JSON.stringify({ entries, check: "FahimOS Vault" }));
  const ciphertext = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, plaintext);
  localStorage.setItem(CREDENTIAL_VAULT_KEY, JSON.stringify({
    version: 1,
    algorithm: "AES-GCM",
    kdf: "PBKDF2-SHA256",
    iterations: VAULT_KDF_ITERATIONS,
    salt: vaultBytesToBase64(salt),
    iv: vaultBytesToBase64(iv),
    ciphertext: vaultBytesToBase64(ciphertext),
    updatedAt: new Date().toISOString()
  }));
}

async function decryptCredentialVault(envelope, key) {
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: vaultBase64ToBytes(envelope.iv) },
    key,
    vaultBase64ToBytes(envelope.ciphertext)
  );
  const payload = JSON.parse(new TextDecoder().decode(plaintext));
  if (payload.check !== "FahimOS Vault" || !Array.isArray(payload.entries)) throw new Error("Invalid vault");
  return payload.entries;
}

function clearCredentialComposer() {
  ["credentialService", "credentialUrl", "credentialUsername", "credentialPassword", "credentialNotes"].forEach((id) => {
    const field = document.querySelector(`#${id}`);
    if (field) field.value = "";
  });
  credentialVaultSession.editingId = "";
  const save = document.querySelector("#saveCredentialEntry");
  if (save) save.textContent = "Save Encrypted Login";
}

async function createOrUnlockCredentialVault() {
  const password = document.querySelector("#vaultMasterPassword")?.value || "";
  const confirmPassword = document.querySelector("#vaultMasterConfirm")?.value || "";
  const status = document.querySelector("#vaultUnlockStatus");
  const envelope = credentialVaultEnvelope();
  if (password.length < 10) {
    if (status) status.textContent = "Use at least 10 characters for the master password.";
    return;
  }
  try {
    if (!envelope && password !== confirmPassword) throw new Error("Master password confirmation does not match.");
    const salt = envelope ? vaultBase64ToBytes(envelope.salt) : crypto.getRandomValues(new Uint8Array(16));
    const key = await deriveCredentialVaultKey(password, salt);
    const entries = envelope ? await decryptCredentialVault(envelope, key) : [];
    if (!envelope) await encryptCredentialVault(entries, key, salt);
    credentialVaultSession = { key, salt, entries, visible: false, editingId: "" };
    document.querySelector("#vaultMasterPassword").value = "";
    document.querySelector("#vaultMasterConfirm").value = "";
    if (status) status.textContent = "";
    renderCredentialVault();
  } catch (error) {
    if (status) status.textContent = envelope
      ? "Unable to unlock. Check the master password."
      : error.message;
  }
}

async function persistCredentialVault() {
  if (!credentialVaultSession.key || !credentialVaultSession.salt) return;
  await encryptCredentialVault(credentialVaultSession.entries, credentialVaultSession.key, credentialVaultSession.salt);
}

function lockCredentialVault() {
  credentialVaultSession = { key: null, salt: null, entries: [], visible: false, editingId: "" };
  clearCredentialComposer();
  renderCredentialVault();
}

async function saveCredentialEntry() {
  if (!credentialVaultSession.key) return;
  const service = document.querySelector("#credentialService")?.value.trim() || "";
  const username = document.querySelector("#credentialUsername")?.value || "";
  const password = document.querySelector("#credentialPassword")?.value || "";
  if (!service || !username || !password) {
    alert("Website or app, username, and password are required.");
    return;
  }
  const record = {
    id: credentialVaultSession.editingId || `credential-${Date.now()}-${crypto.getRandomValues(new Uint32Array(1))[0]}`,
    service,
    url: document.querySelector("#credentialUrl")?.value.trim() || "",
    username,
    password,
    notes: document.querySelector("#credentialNotes")?.value.trim() || "",
    updatedAt: new Date().toISOString()
  };
  const existingIndex = credentialVaultSession.entries.findIndex((entry) => entry.id === record.id);
  if (existingIndex >= 0) credentialVaultSession.entries[existingIndex] = record;
  else credentialVaultSession.entries.unshift(record);
  await persistCredentialVault();
  clearCredentialComposer();
  renderCredentialVault();
}

function editCredentialEntry(entry) {
  credentialVaultSession.editingId = entry.id;
  document.querySelector("#credentialService").value = entry.service || "";
  document.querySelector("#credentialUrl").value = entry.url || "";
  document.querySelector("#credentialUsername").value = entry.username || "";
  document.querySelector("#credentialPassword").value = entry.password || "";
  document.querySelector("#credentialNotes").value = entry.notes || "";
  document.querySelector("#saveCredentialEntry").textContent = "Update Encrypted Login";
  document.querySelector("#credentialService").focus();
}

function maskedCredential(value) {
  return value ? "\u2022".repeat(Math.max(10, Math.min(20, String(value).length))) : "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022";
}

function safeCredentialUrl(value) {
  if (!value) return "";
  try {
    const url = new URL(value);
    return ["http:", "https:"].includes(url.protocol) ? url.href : "";
  } catch {
    try {
      return new URL(`https://${value}`).href;
    } catch {
      return "";
    }
  }
}

function renderCredentialEntries() {
  const wrap = document.querySelector("#credentialList");
  if (!wrap || !credentialVaultSession.key) return;
  const query = document.querySelector("#credentialSearch")?.value.trim().toLowerCase() || "";
  const entries = credentialVaultSession.entries.filter((entry) =>
    !query || [entry.service, entry.url, entry.username, entry.notes].some((value) => String(value || "").toLowerCase().includes(query))
  );
  const count = document.querySelector("#credentialCount");
  if (count) count.textContent = `${credentialVaultSession.entries.length} saved ${credentialVaultSession.entries.length === 1 ? "login" : "logins"}`;
  wrap.innerHTML = "";
  if (!entries.length) {
    wrap.innerHTML = `<p class="vault-empty-state">${query ? "No encrypted records match this search." : "No credentials saved yet."}</p>`;
    return;
  }
  entries.forEach((entry) => {
    const card = document.createElement("article");
    card.className = "credential-card";
    const visible = credentialVaultSession.visible;
    const safeUrl = safeCredentialUrl(entry.url);
    card.innerHTML = `
      <div class="credential-card-head">
        <div><span>${escapeHtml(entry.service || "Login")}</span><small>${escapeHtml(entry.url || "Private record")}</small></div>
        <span class="credential-lock-state">${visible ? "Visible" : "Encrypted view"}</span>
      </div>
      <div class="credential-private-fields">
        <div><small>Username / email</small><strong>${escapeHtml(visible ? entry.username : maskedCredential(entry.username))}</strong></div>
        <div><small>Password</small><strong>${escapeHtml(visible ? entry.password : maskedCredential(entry.password))}</strong></div>
      </div>
      ${entry.notes ? `<p>${escapeHtml(entry.notes)}</p>` : ""}
      <div class="credential-card-actions">
        ${safeUrl ? `<a class="ghost-btn compact-action" href="${escapeHtml(safeUrl)}" target="_blank" rel="noreferrer">Open Site</a>` : ""}
        <button class="ghost-btn compact-action" data-vault-edit type="button">Edit</button>
        <button class="danger-btn compact-action" data-vault-delete type="button">Delete</button>
      </div>`;
    card.querySelector("[data-vault-edit]").addEventListener("click", () => editCredentialEntry(entry));
    card.querySelector("[data-vault-delete]").addEventListener("click", async () => {
      if (!confirm(`Delete the encrypted login for ${entry.service}?`)) return;
      credentialVaultSession.entries = credentialVaultSession.entries.filter((item) => item.id !== entry.id);
      await persistCredentialVault();
      renderCredentialEntries();
    });
    wrap.append(card);
  });
}

function renderCredentialVault() {
  const envelope = credentialVaultEnvelope();
  const unlocked = !!credentialVaultSession.key;
  const lockedView = document.querySelector("#vaultLockedView");
  const unlockedView = document.querySelector("#vaultUnlockedView");
  const actions = document.querySelector("#vaultUnlockedActions");
  if (!lockedView || !unlockedView) return;
  lockedView.hidden = unlocked;
  unlockedView.hidden = !unlocked;
  if (actions) actions.hidden = !unlocked;
  const title = document.querySelector("#vaultLockTitle");
  const message = document.querySelector("#vaultLockMessage");
  const confirmLabel = document.querySelector("#vaultConfirmLabel");
  const unlock = document.querySelector("#unlockCredentialVault");
  const reset = document.querySelector("#resetCredentialVault");
  if (!unlocked) {
    if (title) title.textContent = envelope ? "Unlock your encrypted vault" : "Create your encrypted vault";
    if (message) message.textContent = envelope
      ? "Enter your master password to decrypt credentials for this session."
      : "Choose a strong master password. FahimOS never stores it and cannot recover it.";
    if (confirmLabel) confirmLabel.hidden = !!envelope;
    if (unlock) unlock.textContent = envelope ? "Unlock Vault" : "Create Encrypted Vault";
    if (reset) reset.hidden = !envelope;
    return;
  }
  const visibility = document.querySelector("#toggleVaultVisibility");
  if (visibility) {
    visibility.classList.toggle("is-visible", credentialVaultSession.visible);
    visibility.title = credentialVaultSession.visible ? "Hide saved credentials" : "Show saved credentials";
    visibility.setAttribute("aria-label", visibility.title);
  }
  renderCredentialEntries();
}

function resetCredentialVault() {
  if (!confirm("Reset this encrypted vault? Existing saved logins in the vault will be permanently deleted.")) return;
  localStorage.removeItem(CREDENTIAL_VAULT_KEY);
  lockCredentialVault();
  const status = document.querySelector("#vaultUnlockStatus");
  if (status) status.textContent = "Vault reset. Create a new master password to begin.";
}

function restoreLastDeletedState() {
  const status = document.querySelector("#historyRecoveryStatus");
  try {
    const recovery = JSON.parse(localStorage.getItem(RECOVERY_STATE_KEY) || "null");
    if (!recovery?.state) {
      if (status) status.textContent = "No recoverable deletion is available.";
      return;
    }
    state = { ...defaultState(), ...recovery.state };
    activeDate = todayKey();
    localStorage.removeItem(RECOVERY_STATE_KEY);
    forceSaveState();
    renderAll();
    if (status) status.textContent = `Restored data saved on ${new Date(recovery.savedAt).toLocaleString()}.`;
  } catch {
    if (status) status.textContent = "The recovery copy could not be restored.";
  }
}

const askFahimCommands = [
  "What bill is due next?",
  "Show upcoming bills",
  "Show past due bills",
  "What bills are unpaid?",
  "How much debt remains?",
  "Show my classes this week",
  "What assignments are due?",
  "Any overdue assignments?",
  "What tasks are overdue?",
  "Show today's tasks",
  "What is my schedule today?",
  "What is tomorrow's schedule?",
  "Show this week's schedule",
  "What workout do I have today?",
  "Show workout log",
  "How did I sleep this week?",
  "Did I sleep enough?",
  "When is the next prayer?",
  "Show prayer snapshot",
  "Show Ramadan status",
  "Show weather now",
  "Show US and world news",
  "Show crypto watchlist",
  "What should I focus on today?",
  "What am I forgetting?",
  "How am I doing this week?",
  "Show school priorities",
  "Show priority recommendations",
  "What should I do next?",
  "Show readiness score",
  "Show recent journal entries",
  "What was I doing last week?",
  "Daily briefing",
  "Today's mission",
  "Add bill",
  "Add schedule",
  "Add task",
  "Add workout log",
  "Add sleep log",
  "Add journal",
  "Help"
];

const askFahimQuickCommands = [
  "What should I focus on today?",
  "What am I forgetting?",
  "What bill is due next?",
  "What workout do I have today?",
  "What tasks are overdue?",
  "Show my classes this week",
  "How much debt remains?",
  "When is the next prayer?",
  "How did I sleep this week?"
];

function askEmptyResult(title = "No saved data") {
  return {
    title,
    summary: "No saved data yet. Add something first.",
    badge: "Empty",
    cards: []
  };
}

function askCard(icon, title, meta = "", badge = "", tone = "", page = "") {
  return { icon, title, meta, badge, tone, page };
}

function askDateValue(value) {
  if (!value) return null;
  const date = new Date(String(value).length === 10 ? `${value}T12:00:00` : value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function askDateLabel(value, includeTime = false) {
  const date = askDateValue(value);
  if (!date) return "Date not set";
  return date.toLocaleString(undefined, includeTime
    ? { dateStyle: "medium", timeStyle: "short" }
    : { dateStyle: "medium" });
}

function askDaysFromToday(value) {
  const date = askDateValue(value);
  if (!date) return null;
  const today = new Date(`${todayKey()}T00:00:00`);
  date.setHours(0, 0, 0, 0);
  return Math.round((date - today) / 86400000);
}

function askBillResult(query) {
  const pastDue = query.includes("past due");
  const unpaid = query.includes("unpaid");
  let items = [];
  if (pastDue) {
    const unique = new Map();
    getPastDueBills(todayKey(), 90).forEach((item) => {
      if (!unique.has(item.name)) unique.set(item.name, item);
    });
    items = [...unique.values()];
  } else if (unpaid) {
    items = getUpcomingBills(todayKey(), Math.max(12, state.bills.length * 2)).filter((item) => !item.paid);
  } else {
    items = getUpcomingBills(todayKey(), 12).filter((item) => !item.paid);
    if (query.includes("next")) items = items.slice(0, 1);
  }
  if (!items.length) return askEmptyResult(pastDue ? "Past Due Bills" : "Bills");
  return {
    title: pastDue ? "Past Due Bills" : query.includes("next") ? "Next Bill Due" : "Upcoming Bills",
    summary: `${items.length} unpaid bill${items.length === 1 ? "" : "s"} found.`,
    badge: pastDue ? "Attention" : "Money",
    cards: items.slice(0, 10).map((item) => {
      const days = askDaysFromToday(item.dateKey);
      const timing = days === null ? item.dateLabel : days < 0 ? `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue` : days === 0 ? "Due today" : `${days} day${days === 1 ? "" : "s"} remaining`;
      return askCard("$", item.name || "Bill", `${money(Number(item.amount || 0))} | Due ${item.dateLabel} | ${timing}`, item.paid ? "Paid" : "Unpaid", days !== null && days < 0 ? "danger" : days !== null && days <= 2 ? "warning" : "", "bills");
    })
  };
}

function askDebtResult() {
  const debts = (state.payoffDebts || []).filter((item) => Number(item.balance || 0) > 0);
  if (!debts.length) return askEmptyResult("Debt Summary");
  const total = debts.reduce((sum, item) => sum + Number(item.balance || 0), 0);
  return {
    title: "Debt Summary",
    summary: `${money(total)} remaining across ${debts.length} debt account${debts.length === 1 ? "" : "s"}.`,
    badge: "Finance",
    cards: debts.map((item) => askCard("$", item.name || "Debt", `${money(Number(item.balance || 0))} remaining | Minimum ${money(Number(item.minimum || 0))}`, item.strategy || "Payoff plan", Number(item.balance || 0) > 1000 ? "warning" : "", "payoff"))
  };
}

function askAssignmentTone(item) {
  const days = askDaysFromToday(item.due);
  if (days === null) return "";
  if (days < 0 || days <= 2) return "danger";
  if (days <= 7) return "warning";
  return "success";
}

function askSchoolResult(query) {
  if (query.includes("class")) {
    const classes = (state.classes || []).map(normalizeClassItem).filter((item) => item.status !== "Inactive");
    if (!classes.length) return askEmptyResult("Class Schedules This Week");
    return {
      title: "Class Schedules This Week",
      summary: `${classes.length} saved class${classes.length === 1 ? "" : "es"}.`,
      badge: "School",
      cards: classes.map((item) => askCard("CLS", item.name, `${classScheduleSummary(item)}${item.teacher ? ` | ${item.teacher}` : ""}${item.room ? ` | ${item.room}` : ""}`, item.status || "Active", "", "schoolClasses"))
    };
  }
  const overdueOnly = query.includes("overdue");
  const open = (state.assignments || [])
    .filter((item) => !["Submitted", "Graded", "Done"].includes(item.status))
    .filter((item) => !overdueOnly || (askDaysFromToday(item.due) !== null && askDaysFromToday(item.due) < 0))
    .sort((a, b) => (askDateValue(a.due)?.getTime() || Infinity) - (askDateValue(b.due)?.getTime() || Infinity));
  if (!open.length) return askEmptyResult(overdueOnly ? "Overdue Assignments" : "Assignments Due");
  return {
    title: overdueOnly ? "Overdue Assignments" : "Assignments Due",
    summary: `${open.length} open school item${open.length === 1 ? "" : "s"} found.`,
    badge: "School",
    cards: open.slice(0, 10).map((item) => {
      const days = askDaysFromToday(item.due);
      const timing = days === null ? "No due date" : days < 0 ? `${Math.abs(days)} day${Math.abs(days) === 1 ? "" : "s"} overdue` : days === 0 ? "Due today" : `${days} day${days === 1 ? "" : "s"} remaining`;
      return askCard("ASN", item.title || item.text || "Assignment", `${item.className || "Class not linked"} | ${askDateLabel(item.due, String(item.due || "").includes("T"))} | ${timing}`, item.priority || item.status || "Open", askAssignmentTone(item), "schoolAssignments");
    })
  };
}

function askTaskResult(query) {
  const overdueOnly = query.includes("overdue");
  const todayOnly = query.includes("today") || query.includes("need to do");
  const priority = { Urgent: 4, High: 3, Medium: 2, Low: 1 };
  const tasks = (state.tasks || [])
    .filter((item) => item.status !== "Done")
    .filter((item) => {
      const due = String(item.due || "").slice(0, 10);
      if (overdueOnly) return due && due < todayKey();
      if (todayOnly) return !due || due <= todayKey();
      return true;
    })
    .sort((a, b) => (priority[b.priority] || 0) - (priority[a.priority] || 0) || String(a.due || "9999").localeCompare(String(b.due || "9999")));
  if (!tasks.length) return askEmptyResult(overdueOnly ? "Overdue Tasks" : "Today's Tasks");
  return {
    title: overdueOnly ? "Overdue Tasks" : "Today's Tasks",
    summary: `${tasks.length} open task${tasks.length === 1 ? "" : "s"}, ordered by priority.`,
    badge: "Tasks",
    cards: tasks.slice(0, 12).map((item) => askCard("TSK", item.title || item.text || "Task", `${item.category || "General"} | ${item.due ? `Due ${askDateLabel(item.due, String(item.due).includes("T"))}` : "No due date"}`, item.priority || "Medium", overdueOnly || (item.due && String(item.due).slice(0, 10) < todayKey()) ? "danger" : /urgent|high/i.test(item.priority || "") ? "warning" : "", "tasks"))
  };
}

function scheduleEntriesForDate(dateKey) {
  const schedule = state.days?.[dateKey]?.schedule || {};
  return Object.entries(schedule)
    .filter(([, item]) => String(item?.task || item?.title || "").trim())
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([time, item]) => ({ dateKey, time, ...item }));
}

function askScheduleResult(query) {
  const today = new Date(`${todayKey()}T12:00:00`);
  const dates = [];
  if (query.includes("tomorrow")) {
    today.setDate(today.getDate() + 1);
    dates.push(localDateKey(today));
  } else if (query.includes("week")) {
    for (let index = 0; index < 7; index += 1) {
      const date = new Date(today);
      date.setDate(today.getDate() + index);
      dates.push(localDateKey(date));
    }
  } else {
    dates.push(todayKey());
  }
  const items = dates.flatMap(scheduleEntriesForDate);
  if (!items.length) return askEmptyResult(query.includes("week") ? "This Week's Schedule" : query.includes("tomorrow") ? "Tomorrow's Schedule" : "Today's Schedule");
  return {
    title: query.includes("week") ? "This Week's Schedule" : query.includes("tomorrow") ? "Tomorrow's Schedule" : "Today's Schedule",
    summary: `${items.length} saved schedule block${items.length === 1 ? "" : "s"}.`,
    badge: "Schedule",
    cards: items.slice(0, 14).map((item) => askCard("CAL", item.task || item.title, `${askDateLabel(item.dateKey)} | ${item.time || "Time not set"}`, item.status || "Open", item.status === "Done" ? "success" : "", "daily"))
  };
}

function askWorkoutResult(query) {
  const logsOnly = query.includes("log");
  const plan = workoutPlanForDate(todayKey());
  const logs = (state.workouts || []).slice().sort((a, b) => new Date(b.savedAt || b.endedAt || b.startedAt || b.date || 0) - new Date(a.savedAt || a.endedAt || a.startedAt || a.date || 0));
  if (logsOnly) {
    if (!logs.length) return askEmptyResult("Workout Log");
    return {
      title: "Recent Workout Log",
      summary: `${logs.length} recorded workout${logs.length === 1 ? "" : "s"}.`,
      badge: "Workout",
      cards: logs.slice(0, 8).map((item) => askCard("FIT", item.program || item.name || item.text || "Workout", `${workoutTimeRange(item)}${workoutDuration(item) ? ` | ${workoutDuration(item)}` : ""}`, item.entryType === "manual" ? "Manual" : "Timer", item.endedAt ? "success" : "", "workoutHistory"))
    };
  }
  if (!plan) return askEmptyResult("Today's Training");
  const exercises = (plan.exercises || []).slice(0, 6);
  return {
    title: "Today's Training",
    summary: `${plan.title} - ${plan.subtitle || "Follow the planned session."}`,
    badge: "Workout",
    cards: exercises.length
      ? exercises.map((exercise, index) => askCard("FIT", exercise[0] || `Exercise ${index + 1}`, exercise[1] || "Complete with controlled form", `Step ${index + 1}`, "", "workout"))
      : [askCard("FIT", plan.title, plan.subtitle || "Recovery and preparation", "Today", "", "workout")]
  };
}

function askSleepResult() {
  const sessions = (state.health?.sleepSessions || []).slice().sort((a, b) => new Date(b.end || b.start || 0) - new Date(a.end || a.start || 0)).slice(0, 7);
  if (!sessions.length) return askEmptyResult("Sleep This Week");
  const durations = sessions.map((item) => Math.max(0, new Date(item.end) - new Date(item.start))).filter(Boolean);
  const average = durations.length ? durations.reduce((sum, value) => sum + value, 0) / durations.length : 0;
  return {
    title: "Sleep This Week",
    summary: `Average ${formatDuration(average)}. Goal: 7-8 hours nightly. ${sleepRating(average)}`,
    badge: average >= 7 * 3600000 && average <= 9 * 3600000 ? "On target" : "Needs attention",
    cards: sessions.map((item) => {
      const duration = Math.max(0, new Date(item.end) - new Date(item.start));
      return askCard("SLP", askDateLabel(item.end || item.start), `${formatDuration(duration)} | ${sleepRating(duration)}`, duration >= 7 * 3600000 && duration <= 9 * 3600000 ? "Good" : "Review", duration < 7 * 3600000 || duration > 10 * 3600000 ? "warning" : "success", "health");
    })
  };
}

function nextPrayerSnapshot() {
  const timings = state.prayerTimes?.timings || {};
  const now = new Date();
  const currentMinutes = now.getHours() * 60 + now.getMinutes();
  const isFriday = now.getDay() === 5;
  const jummahMinutes = parsePrayerMinutes(state.jummah?.time || "");
  const rows = prayers
    .map((name) => ({ name, time: timings[name], minutes: parsePrayerMinutes(timings[name]) }))
    .filter((item) => item.minutes !== null)
    .map((item) => (isFriday && item.name === "Dhuhr" && jummahMinutes !== null
      ? { name: "Jummah", time: state.jummah?.time || item.time, minutes: jummahMinutes, isJummah: true }
      : item));
  if (!rows.length) return null;
  let next = rows.find((item) => item.minutes >= currentMinutes);
  let minutes = next ? next.minutes - currentMinutes : null;
  if (!next) {
    next = rows[0];
    minutes = (24 * 60 - currentMinutes) + next.minutes;
  }
  return { ...next, minutes };
}

function askFaithResult(query) {
  if (query.includes("ramadan")) {
    const hijri = state.prayerTimes?.hijri;
    const fasts = (state.ramadanFasts || []).length;
    const taraweeh = (state.ramadanTaraweehHistory || []).length;
    return {
      title: "Ramadan Status",
      summary: hijri ? `${hijri.day || ""} ${hijri.month?.en || hijri.month || ""} ${hijri.year || ""}`.trim() : "Live Hijri status is not loaded yet.",
      badge: "Faith",
      cards: [
        askCard("FAST", "Fasting Tracker", `${fasts} fast${fasts === 1 ? "" : "s"} recorded`, "Ramadan", "", "ramadan"),
        askCard("NITE", "Taraweeh Tracker", `${taraweeh} night record${taraweeh === 1 ? "" : "s"} saved`, "Night prayer", "", "ramadan")
      ]
    };
  }
  const next = nextPrayerSnapshot();
  const daily = ensureDailyEntry(todayKey());
  const completed = prayers.filter((name) => daily.prayers?.[name]?.done).length;
  if (query.includes("snapshot")) {
    return {
      title: "Prayer Snapshot",
      summary: `${completed} of 5 mandatory prayers completed today.`,
      badge: "Faith",
      cards: prayers.map((name) => askCard("MAS", name, state.prayerTimes?.timings?.[name] ? `Prayer time ${state.prayerTimes.timings[name]}` : "Live time not loaded", daily.prayers?.[name]?.done ? "Complete" : "Open", daily.prayers?.[name]?.done ? "success" : "", "prayer"))
    };
  }
  if (!next) return askEmptyResult("Next Prayer");
  return {
    title: "Next Prayer",
    summary: `${next.name} is next in ${Math.floor(next.minutes / 60) ? `${Math.floor(next.minutes / 60)}h ` : ""}${next.minutes % 60}m.`,
    badge: "Faith",
    cards: [askCard("MAS", next.name, `Prayer time ${next.time}`, `${completed}/5 complete`, "", "faith")]
  };
}

function askJournalResult(query) {
  const entries = (state.journalEntries || []).slice().sort((a, b) => new Date(`${b.date || ""}T${b.time || "00:00"}`) - new Date(`${a.date || ""}T${a.time || "00:00"}`));
  if (query.includes("last week")) {
    const since = new Date();
    since.setDate(since.getDate() - 7);
    const recentEntries = entries.filter((item) => askDateValue(item.date) >= since);
    const archives = Object.entries(state.dailyArchives || {}).filter(([date]) => askDateValue(date) >= since);
    if (!recentEntries.length && !archives.length) return askEmptyResult("Last Week");
    return {
      title: "Last Week",
      summary: `${recentEntries.length} journal entr${recentEntries.length === 1 ? "y" : "ies"} and ${archives.length} daily archive${archives.length === 1 ? "" : "s"}.`,
      badge: "Life",
      cards: [
        ...recentEntries.slice(0, 5).map((item) => askCard("JRN", item.title || "Journal Entry", `${askDateLabel(item.date)} | ${item.mood || "Mood not set"} | ${trimmedPreview(item.text, 90)}`, item.tags || "Journal", "", "history")),
        ...archives.slice(-3).reverse().map(([date, archive]) => askCard("LOG", askDateLabel(date), `${(archive.tasks || []).length} tasks | ${(archive.assignments || []).length} assignments | ${(archive.workouts || []).length} workouts`, "Daily archive", "", "history"))
      ]
    };
  }
  if (!entries.length) return askEmptyResult("Recent Journal Entries");
  return {
    title: "Recent Journal Entries",
    summary: `${entries.length} saved journal entr${entries.length === 1 ? "y" : "ies"}.`,
    badge: "Journal",
    cards: entries.slice(0, 8).map((item) => askCard("JRN", item.title || "Untitled Entry", `${askDateLabel(item.date)}${item.time ? ` at ${item.time}` : ""} | ${item.mood || "Mood not set"} | ${trimmedPreview(item.text, 100)}`, item.tags || "Journal", "", "history"))
  };
}

function askWeatherResult() {
  const items = state.liveWeather?.items || [];
  if (!items.length || state.liveWeather?.error) {
    return {
      title: "Weather Command",
      summary: "Live weather is not loaded yet. Open Weather Center and refresh conditions.",
      badge: "Weather",
      cards: [askCard("WX", "Weather Center", "Open Life Hub weather tools for live local conditions.", "Open", "", "weatherCenter")]
    };
  }
  return {
    title: "Live Weather",
    summary: `Updated ${state.liveWeather.updated || "recently"}.`,
    badge: "Weather",
    cards: items.slice(0, 6).map((item, index) => askCard(index === 0 ? "WX" : "SKY", item.text || "Weather update", item.source || "Open-Meteo", "Live", "", "weatherCenter"))
  };
}

function askNewsResult() {
  const items = state.liveNews?.items || fallbackNewsItems.map((text) => ({ text, source: "Built-in news brief" }));
  return {
    title: "US + World Brief",
    summary: "Quick briefing from the FahimOS news lane. Open More Updates for live headlines.",
    badge: "News",
    cards: items.slice(0, 8).map((item, index) => askCard(index === 0 ? "US" : "WRLD", item.text || "News update", item.source || "News", "Brief", "", item.page || ""))
  };
}

function askCryptoResult() {
  const favorites = state.favoriteCrypto || [];
  const live = state.liveCrypto?.items || [];
  const source = favorites.length ? favorites : live.slice(0, 5);
  if (!source.length) return askEmptyResult("Crypto Watchlist");
  return {
    title: "Crypto Watchlist",
    summary: state.liveCrypto?.updated ? `Market data updated ${state.liveCrypto.updated}.` : "Refresh Market Command for live movement.",
    badge: "Market",
    cards: source.slice(0, 8).map((asset) => {
      const item = live.find((entry) => entry.id === asset.id) || asset;
      const price = Number(item.price);
      const change = Number(item.change);
      return askCard(asset.symbol || "CR", asset.name || "Crypto asset", `${Number.isFinite(price) ? money(price) : "Waiting for live price"}${Number.isFinite(change) ? ` | ${change >= 0 ? "+" : ""}${change.toFixed(2)}% today` : ""}`, "Watch", Number.isFinite(change) && change < 0 ? "warning" : "", "stockExchange");
    })
  };
}

function askReadinessResult() {
  const d = day();
  const prayersDone = prayers.filter((name) => d.prayers?.[name]?.done).length;
  const openTasks = (state.tasks || []).filter((task) => !task.done).length;
  const sleep = (state.health?.sleepSessions || []).slice().sort((a, b) => new Date(b.end || 0) - new Date(a.end || 0))[0];
  const sleepHours = sleep ? Number(sleep.durationMs || 0) / 3600000 : 0;
  const score = Math.max(0, Math.min(100, Math.round((prayersDone / 5) * 35 + (openTasks ? 10 : 25) + (sleepHours >= 7 && sleepHours <= 8 ? 25 : sleepHours ? 12 : 5) + 15)));
  return {
    title: "FahimOS Readiness",
    summary: `Current readiness score: ${score}%.`,
    badge: `${score}%`,
    cards: [
      askCard("FA", "Faith", `${prayersDone}/5 prayers complete`, prayersDone === 5 ? "Strong" : "Continue", "", "faith"),
      askCard("TK", "Open Work", `${openTasks} open task${openTasks === 1 ? "" : "s"}`, openTasks ? "Action" : "Clear", openTasks ? "warning" : "", "tasks"),
      askCard("SL", "Sleep", sleep ? formatDuration(sleep.durationMs || 0) : "No sleep session logged", sleepHours >= 7 && sleepHours <= 8 ? "Good" : "Review", sleepHours && sleepHours < 6 ? "warning" : "", "health")
    ]
  };
}

function askDailyBriefing() {
  const nextBill = getUpcomingBills(todayKey(), 10).find((item) => !item.paid);
  const nextPrayer = nextPrayerSnapshot();
  const schedule = scheduleEntriesForDate(todayKey());
  const overdueTasks = (state.tasks || []).filter((item) => item.status !== "Done" && item.due && String(item.due).slice(0, 10) < todayKey());
  const plan = workoutPlanForDate(todayKey());
  const sleep = (state.health?.sleepSessions || []).slice().sort((a, b) => new Date(b.end || 0) - new Date(a.end || 0))[0];
  const important = (state.importantDates || []).filter((item) => (item.status || "Upcoming") !== "Done" && (!item.when || String(item.when).slice(0, 10) >= todayKey())).sort((a, b) => String(a.when || "9999").localeCompare(String(b.when || "9999")))[0];
  const cards = [
    nextBill ? askCard("$", nextBill.name, `${money(Number(nextBill.amount || 0))} | Due ${nextBill.dateLabel}`, "Next bill", askDaysFromToday(nextBill.dateKey) <= 2 ? "warning" : "", "bills") : askCard("$", "Bills", "No upcoming unpaid bills found.", "Clear", "success", "bills"),
    nextPrayer ? askCard("MAS", nextPrayer.name, `${nextPrayer.time} | In ${nextPrayer.minutes} minutes`, "Next prayer", "", "faith") : askCard("MAS", "Prayer times", "Load live prayer times in Faith Hub.", "Not loaded", "", "faith"),
    askCard("CAL", schedule[0]?.task || schedule[0]?.title || "Today's schedule", schedule.length ? `${schedule.length} block${schedule.length === 1 ? "" : "s"} saved | First at ${schedule[0].time}` : "No schedule saved today.", "Schedule", "", "daily"),
    askCard("TSK", "Overdue tasks", `${overdueTasks.length} overdue task${overdueTasks.length === 1 ? "" : "s"}.`, overdueTasks.length ? "Attention" : "Clear", overdueTasks.length ? "danger" : "success", "tasks"),
    askCard("FIT", plan?.title || "Workout", plan?.subtitle || "No workout plan available.", "Training", "", "workout"),
    sleep ? askCard("SLP", "Latest sleep", `${formatDuration(new Date(sleep.end) - new Date(sleep.start))} | ${sleepRating(new Date(sleep.end) - new Date(sleep.start))}`, "Recovery", "", "health") : askCard("SLP", "Sleep", "No sleep log saved yet.", "Not logged", "", "health"),
    important ? askCard("DATE", important.title || "Important date", `${askDateLabel(important.when, String(important.when || "").includes("T"))} | ${important.note || important.type || "Important"}`, "Upcoming", askDaysFromToday(important.when) <= 2 ? "warning" : "", "schoolDates") : askCard("DATE", "Important dates", "No upcoming important date found.", "Clear", "success", "schoolDates")
  ];
  return { title: "Daily Briefing", summary: "Your highest-value signals for today.", badge: "Mission", cards };
}

function askFocusRecommendationResult() {
  const briefing = askDailyBriefing();
  const candidates = (briefing.cards || []).map((card) => {
    const text = `${card.title} ${card.meta} ${card.badge}`.toLowerCase();
    let weight = 1;
    if (/overdue|due today|attention|unpaid|next prayer|urgent|high/.test(text)) weight += 4;
    if (/bill|assignment|task|prayer|workout/.test(text)) weight += 2;
    if (/clear|no upcoming|no schedule/.test(text)) weight -= 2;
    return { ...card, weight };
  }).sort((a, b) => b.weight - a.weight);
  const top = candidates.slice(0, 5);
  return {
    title: "Today’s Focus Recommendation",
    summary: top.length ? "FahimOS ranked your strongest next moves from saved data." : "No saved signals yet. Add tasks, bills, classes, or prayers first.",
    badge: "Focus",
    cards: top.map((item, index) => askCard(String(index + 1).padStart(2, "0"), item.title, item.meta, index === 0 ? "Do first" : item.badge, item.tone, item.page))
  };
}

function askForgettingResult() {
  const cards = [];
  const overdueTasks = (state.tasks || []).filter((item) => item.status !== "Done" && item.due && String(item.due).slice(0, 10) < todayKey());
  const assignmentsDueSoon = (state.assignments || []).filter((item) => !["Submitted", "Graded", "Done"].includes(item.status) && askDaysFromToday(item.due) !== null && askDaysFromToday(item.due) <= 7);
  const billsDueSoon = getUpcomingBills(todayKey(), 7).filter((item) => !item.paid);
  const d = day();
  const openPrayers = prayers.filter((name) => !d.prayers?.[name]?.done);
  const noJournalToday = !(state.journalEntries || []).some((item) => item.date === todayKey());
  if (overdueTasks.length) cards.push(askCard("TSK", "Overdue tasks", `${overdueTasks.length} task${overdueTasks.length === 1 ? "" : "s"} past due.`, "Fix now", "danger", "tasks"));
  if (assignmentsDueSoon.length) cards.push(askCard("SCH", "Assignments due soon", `${assignmentsDueSoon.length} assignment${assignmentsDueSoon.length === 1 ? "" : "s"} within 7 days.`, "School", "warning", "schoolAssignments"));
  if (billsDueSoon.length) cards.push(askCard("$", "Bills due soon", `${billsDueSoon.length} bill${billsDueSoon.length === 1 ? "" : "s"} in the next 7 days.`, "Money", "warning", "bills"));
  if (openPrayers.length) cards.push(askCard("MAS", "Open prayers", `${openPrayers.join(", ")} still open today.`, "Faith", "", "faith"));
  if (noJournalToday) cards.push(askCard("JRN", "Journal reflection", "No journal entry saved today.", "Reflect", "", "life"));
  if (!cards.length) cards.push(askCard("OK", "Nothing urgent detected", "Your saved tasks, bills, assignments, prayers, and journal look clear from current data.", "Good standing", "success", "dashboard"));
  return { title: "What You Might Be Forgetting", summary: "A local scan of reminders, school, bills, faith, tasks, and journal records.", badge: "Memory", cards };
}

function askWeekReviewResult() {
  const since = new Date(`${todayKey()}T00:00:00`);
  since.setDate(since.getDate() - 6);
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(since);
    date.setDate(since.getDate() + index);
    return localDateKey(date);
  });
  const archives = state.dailyArchives || {};
  const taskDone = (state.tasks || []).filter((item) => item.status === "Done" && days.includes(String(item.completedOn || item.due || "").slice(0, 10))).length;
  const workouts = (state.workouts || []).filter((item) => days.includes(String(item.date || item.startedAt || item.savedAt || "").slice(0, 10))).length;
  const journals = (state.journalEntries || []).filter((item) => days.includes(item.date)).length;
  const prayerDone = days.reduce((sum, date) => {
    const daily = state.days?.[date] || archives[date] || {};
    return sum + prayers.filter((name) => daily.prayers?.[name]?.done).length;
  }, 0);
  const score = Math.min(100, Math.round((taskDone * 8) + (workouts * 12) + (journals * 8) + (prayerDone / 35 * 40)));
  return {
    title: "This Week’s Performance",
    summary: `Weekly operating score: ${score}%. Based only on saved activity from the last 7 days.`,
    badge: `${score}%`,
    cards: [
      askCard("TSK", "Tasks completed", `${taskDone} completed task${taskDone === 1 ? "" : "s"}`, "Work", taskDone ? "success" : "", "tasks"),
      askCard("FIT", "Workout consistency", `${workouts} workout log${workouts === 1 ? "" : "s"}`, "Training", workouts >= 3 ? "success" : "warning", "workoutHistory"),
      askCard("MAS", "Prayer tracking", `${prayerDone}/35 tracked prayers complete`, "Faith", prayerDone >= 25 ? "success" : "", "faith"),
      askCard("JRN", "Journal reflection", `${journals} saved journal entr${journals === 1 ? "y" : "ies"}`, "Life", journals ? "success" : "", "history")
    ]
  };
}

function askHelpResult() {
  return {
    title: "What Ask FahimOS Can Do",
    summary: "Ask naturally. FahimOS reads your locally saved browser data and never invents missing records.",
    badge: "Help",
    cards: [
      askCard("$", "Money", "Next bill, unpaid bills, past due bills, and debt summary.", "Try: What bill is due next?"),
      askCard("SCH", "School and Schedule", "Classes, assignments, homework, and saved schedules.", "Try: Show my classes this week"),
      askCard("TSK", "Tasks", "Today's work, overdue items, and priority sorting.", "Try: What tasks are overdue?"),
      askCard("FIT", "Health and Workout", "Today's training, workout history, and weekly sleep.", "Try: How did I sleep this week?"),
      askCard("MAS", "Faith", "Next prayer, prayer snapshot, and Ramadan status.", "Try: When is the next prayer?"),
      askCard("JRN", "Life", "Recent journal entries, last-week activity, and daily briefings.", "Try: Daily briefing")
    ]
  };
}

function handleFahimCommand(rawQuery) {
  const query = String(rawQuery || "").trim().toLowerCase().replace(/[?!.]+$/g, "");
  if (!query) return askHelpResult();
  if (query.includes("focus on today") || query.includes("priority recommendation") || query.includes("school priorities")) return askFocusRecommendationResult();
  if (query.includes("forgetting") || query.includes("what am i forgetting")) return askForgettingResult();
  if (query.includes("how am i doing this week") || query.includes("weekly review") || query.includes("this week performance")) return askWeekReviewResult();
  if (query.includes("daily briefing") || query.includes("how am i doing today") || query.includes("today's mission") || query.includes("todays mission")) return askDailyBriefing();
  if (query.includes("bill")) return askBillResult(query);
  if (query.includes("debt")) return askDebtResult();
  if (query.includes("class") || query.includes("assignment") || query.includes("homework")) return askSchoolResult(query);
  if (query.includes("task") || query.includes("need to do")) return askTaskResult(query);
  if (query.includes("schedule")) return askScheduleResult(query);
  if (query.includes("workout") || query.includes("training")) return askWorkoutResult(query);
  if (query.includes("sleep")) return askSleepResult();
  if (query.includes("prayer") || query.includes("ramadan") || query.includes("faith")) return askFaithResult(query);
  if (query.includes("weather")) return askWeatherResult();
  if (query.includes("news") || query.includes("world") || query.includes("us brief")) return askNewsResult();
  if (query.includes("crypto") || query.includes("bitcoin") || query.includes("market")) return askCryptoResult();
  if (query.includes("readiness") || query.includes("score") || query.includes("do next")) return askReadinessResult();
  if (query.includes("journal") || query.includes("write recently") || query.includes("last week")) return askJournalResult(query);
  if (query === "help" || query.includes("what can you do") || query.includes("command")) return askHelpResult();
  return {
    title: "Command Not Recognized",
    summary: "Try a more specific request about bills, debt, school, tasks, schedules, workouts, sleep, prayer, journal entries, or your daily briefing.",
    badge: "Help",
    cards: askHelpResult().cards.slice(0, 4)
  };
}

function askQuickAction(query) {
  const normalized = String(query || "").trim().toLowerCase().replace(/[?!.]+$/g, "");
  const actions = {
    "add bill": { page: "bills", label: "Monthly Bills" },
    "add schedule": { page: "daily", label: "Schedule" },
    "add task": { page: "tasks", label: "Tasks" },
    "add workout log": { page: "workout", label: "Workout Log" },
    "add sleep log": { page: "health", label: "Sleep Tracker" },
    "add journal": { page: "life", label: "Journal" }
  };
  return actions[normalized] || null;
}

function askAnswerText(result) {
  return [
    result.title,
    result.summary,
    ...(result.cards || []).map((card) => `${card.title}: ${card.meta}${card.badge ? ` (${card.badge})` : ""}`)
  ].filter(Boolean).join("\n");
}

function renderAskFahimResult(result) {
  const wrap = document.querySelector("#askFahimResults");
  if (!wrap) return;
  lastAskFahimAnswer = result;
  wrap.innerHTML = "";
  const head = document.createElement("div");
  head.className = "ask-result-head";
  head.innerHTML = `<div><h3>${escapeHtml(result.title || "Ask FahimOS")}</h3><p>${escapeHtml(result.summary || "")}</p></div><span class="ask-result-badge">${escapeHtml(result.badge || "FahimOS")}</span>`;
  wrap.append(head);
  if (!result.cards?.length) return;
  const grid = document.createElement("div");
  grid.className = "ask-result-grid";
  result.cards.forEach((item) => {
    const card = document.createElement("article");
    card.className = `ask-result-card${item.tone ? ` is-${item.tone}` : ""}`;
    card.innerHTML = `<span class="ask-result-icon">${escapeHtml(item.icon || "OS")}</span><div><strong>${escapeHtml(item.title || "Result")}</strong>${item.meta ? `<small>${escapeHtml(item.meta)}</small>` : ""}${item.badge ? `<span>${escapeHtml(item.badge)}</span>` : ""}</div>`;
    if (item.page) {
      const button = document.createElement("button");
      button.className = "ghost-btn compact-action";
      button.type = "button";
      button.textContent = "Open";
      button.addEventListener("click", () => {
        closeAskFahim();
        openPanel(item.page, pageTitle(item.page));
      });
      card.querySelector("div").append(button);
    }
    grid.append(card);
  });
  wrap.append(grid);
}

function saveAskFahimHistory(query, result) {
  state.askFahimHistory = Array.isArray(state.askFahimHistory) ? state.askFahimHistory : [];
  state.askFahimHistory.unshift({
    query,
    answer: askAnswerText(result),
    title: result.title,
    at: new Date().toISOString()
  });
  state.askFahimHistory = state.askFahimHistory.slice(0, 20);
  forceSaveState();
  renderAskFahimHistory();
}

function renderAskFahimHistory() {
  const wrap = document.querySelector("#askFahimHistory");
  const count = document.querySelector("#askFahimHistoryCount");
  if (!wrap || !count) return;
  const history = state.askFahimHistory || [];
  count.textContent = `${history.length} saved`;
  wrap.innerHTML = "";
  if (!history.length) {
    wrap.innerHTML = `<span class="muted">No recent commands yet.</span>`;
    return;
  }
  history.slice(0, 10).forEach((item) => {
    const button = document.createElement("button");
    button.className = "ask-history-command";
    button.type = "button";
    button.innerHTML = `<strong>${escapeHtml(item.query)}</strong><small>${escapeHtml(item.at ? new Date(item.at).toLocaleString() : "")}</small>`;
    button.addEventListener("click", () => {
      document.querySelector("#askFahimInput").value = item.query;
      runAskFahim(item.query);
    });
    wrap.append(button);
  });
}

function renderAskFahimInsights() {
  const wrap = document.querySelector("#askFahimInsightRail");
  if (!wrap) return;
  const focus = askFocusRecommendationResult().cards?.[0];
  const forgetting = askForgettingResult().cards?.[0];
  const week = askWeekReviewResult();
  const items = [
    ["Priority", focus?.title || "Add tasks", focus?.meta || "Ask what to focus on today.", "What should I focus on today?"],
    ["Memory", forgetting?.title || "Nothing urgent", forgetting?.meta || "Ask what you might be forgetting.", "What am I forgetting?"],
    ["Week", week.badge || "0%", week.summary || "Review your saved weekly signals.", "How am I doing this week?"]
  ];
  wrap.innerHTML = items.map(([label, title, detail, command]) => `
    <button class="ask-insight-card" type="button" data-ask-command="${escapeHtml(command)}">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(title)}</strong>
      <small>${escapeHtml(detail)}</small>
    </button>
  `).join("");
}

function renderAskSuggestions(value = "") {
  const wrap = document.querySelector("#askFahimSuggestions");
  if (!wrap) return;
  const words = String(value || "").toLowerCase().split(/\s+/).filter(Boolean);
  const matches = askFahimCommands.filter((command) => words.every((word) => command.toLowerCase().includes(word))).slice(0, 7);
  wrap.innerHTML = "";
  (matches.length ? matches : askFahimQuickCommands).forEach((command) => {
    const button = document.createElement("button");
    button.className = "ask-command-chip";
    button.type = "button";
    button.textContent = command;
    button.addEventListener("click", () => {
      document.querySelector("#askFahimInput").value = command;
      runAskFahim(command);
    });
    wrap.append(button);
  });
}

function renderHomeAskFahimChips() {
  const wrap = document.querySelector("#homeAskFahimChips");
  if (!wrap) return;
  wrap.innerHTML = "";
  askFahimQuickCommands.forEach((command) => {
    const button = document.createElement("button");
    button.className = "ask-command-chip";
    button.type = "button";
    button.textContent = command;
    button.addEventListener("click", () => {
      openAskFahim(command);
      runAskFahim(command);
    });
    wrap.append(button);
  });
}

function runAskFahim(rawQuery) {
  const query = String(rawQuery || "").trim();
  if (!query) {
    renderAskFahimResult(askHelpResult());
    return;
  }
  const action = askQuickAction(query);
  if (action) {
    const result = {
      title: `Open ${action.label}`,
      summary: `Taking you to ${action.label} so you can add a new record.`,
      badge: "Quick action",
      cards: [askCard("GO", action.label, "Use the existing FahimOS form. Your saved data will remain compatible.", "Open now", "", action.page)]
    };
    renderAskFahimResult(result);
    saveAskFahimHistory(query, result);
    window.setTimeout(() => {
      closeAskFahim();
      openPanel(action.page, pageTitle(action.page));
    }, 450);
    return;
  }
  const result = handleFahimCommand(query);
  renderAskFahimResult(result);
  saveAskFahimHistory(query, result);
}

function openAskFahim(query = "") {
  const modal = document.querySelector("#askFahimModal");
  const inputField = document.querySelector("#askFahimInput");
  if (!modal || !inputField) return;
  modal.hidden = false;
  inputField.value = query;
  renderAskSuggestions(query);
  renderAskFahimHistory();
  renderAskFahimInsights();
  window.setTimeout(() => inputField.focus(), 40);
}

function closeAskFahim() {
  const modal = document.querySelector("#askFahimModal");
  if (modal) modal.hidden = true;
}

function renderClockWeather() {
  const wrap = document.querySelector("#clockWeatherData");
  const updated = document.querySelector("#clockWeatherUpdated");
  const homeWeather = document.querySelector("#homeClockWeather");
  const homeUpdated = document.querySelector("#homeClockWeatherUpdated");
  const homeWeatherBar = document.querySelector("#homeWeatherBarText");
  const homeWeatherBarUpdated = document.querySelector("#homeWeatherBarUpdated");
  const weather = state.liveWeather;
  if (homeWeather) {
    homeWeather.textContent = weather?.error
      ? "Live weather unavailable"
      : weather?.items?.[0]?.text || "Loading weather...";
  }
  if (homeUpdated) {
    homeUpdated.textContent = weather?.error
      ? "Open Weather Center to refresh"
      : weather?.updated ? `Updated ${weather.updated}` : "Open Weather Center for details";
  }
  if (homeWeatherBar) {
    homeWeatherBar.textContent = weather?.error
      ? "Weather is temporarily unavailable. Open Weather Center to retry."
      : weather?.items?.[0]?.text || "Loading current local conditions...";
  }
  if (homeWeatherBarUpdated) {
    homeWeatherBarUpdated.textContent = weather?.updated ? `Updated ${weather.updated}` : "Open Weather Center";
  }
  if (!wrap || !updated) return;
  wrap.innerHTML = "";
  if (!weather?.items?.length || weather.error) {
    updated.textContent = weather?.error ? "Live weather is unavailable. Check your connection and refresh." : "Connecting to Open-Meteo...";
    const empty = document.createElement("article");
    empty.className = "clock-weather-metric";
    empty.innerHTML = `<span>Weather status</span><strong>${weather?.error ? "Unable to load live conditions." : "Loading your current conditions..."}</strong>`;
    wrap.append(empty);
    return;
  }
  updated.textContent = `Updated ${weather.updated || new Date().toLocaleString()} | Source: Open-Meteo`;
  weather.items.forEach((item, index) => {
    const card = document.createElement("article");
    card.className = "clock-weather-metric";
    card.innerHTML = `<span>${["Current conditions", "Air and wind", "Today's forecast"][index] || "Weather"}</span><strong>${escapeHtml(item.text || item)}</strong>`;
    wrap.append(card);
  });
}

function renderAssistantSettings() {
  setField("#assistantApiUrl", state.assistantApiUrl || "", (value) => state.assistantApiUrl = value);
}

function bindStaticControls() {
  renderBackgroundGallery();
  restructureStudyHub();
  initializeStudyLayout();
  initializeSettingsAccordions();
  initializeCustomizeAccordions();
  arrangeSettingsPriority();
  organizeSettingsTabs();
  arrangeMoneyPriorities();
  arrangeWorkoutHub();
  arrangeHealthHub();
  arrangeFaithHub();
  arrangeHomeDashboard();
  initializeFloatingWidgetDrag();
  document.querySelector("#notificationsButton")?.addEventListener("click", () => {
    const panel = document.querySelector("#notificationsPanel");
    if (!panel) return;
    panel.hidden = !panel.hidden;
    document.querySelector("#notificationsButton")?.setAttribute("aria-expanded", String(!panel.hidden));
    renderNotifications();
  });
  document.querySelector("#closeNotifications")?.addEventListener("click", () => {
    document.querySelector("#notificationsPanel").hidden = true;
    document.querySelector("#notificationsButton")?.setAttribute("aria-expanded", "false");
  });
  document.querySelector("#markAllNotificationsRead")?.addEventListener("click", () => {
    state.notificationsRead = state.notificationsRead || {};
    buildNotifications().forEach((item) => state.notificationsRead[item.id] = true);
    forceSaveState();
    renderNotifications();
  });
  document.querySelector("#openNotificationsFromSettings")?.addEventListener("click", () => {
    document.querySelector("#notificationsPanel").hidden = false;
    document.querySelector("#notificationsButton")?.setAttribute("aria-expanded", "true");
    renderNotifications();
  });
  document.querySelector("#openCommandBriefNotifications")?.addEventListener("click", () => {
    document.querySelector("#notificationsPanel").hidden = false;
    document.querySelector("#notificationsButton")?.setAttribute("aria-expanded", "true");
    renderNotifications();
  });
  document.querySelector("#openUpcomingDates")?.addEventListener("click", () => openPanel("schoolDates", pageTitle("schoolDates")));
  document.querySelector("#previewDuplicateCleanup")?.addEventListener("click", () => renderDuplicateCleanupPreview());
  const closeDuplicateCleanup = () => {
    const modal = document.querySelector("#duplicateCleanupModal");
    if (modal) modal.hidden = true;
  };
  document.querySelector("#closeDuplicateCleanup")?.addEventListener("click", closeDuplicateCleanup);
  document.querySelector("#cancelDuplicateCleanup")?.addEventListener("click", closeDuplicateCleanup);
  document.querySelector("#confirmDuplicateCleanup")?.addEventListener("click", () => {
    const result = cleanDuplicateData();
    const summary = document.querySelector("#duplicateCleanupSummary");
    const categories = document.querySelector("#duplicateCleanupCategories");
    if (summary) summary.textContent = `Removed ${result.removed} duplicate${result.removed === 1 ? "" : "s"} and merged ${result.merged} record group${result.merged === 1 ? "" : "s"}. A reversible backup was saved.`;
    if (categories) categories.innerHTML = result.categories.length
      ? result.categories.map((category) => `<article><span>${escapeHtml(category.replace(/([A-Z])/g, " $1"))}</span><strong>Cleaned</strong><small>Newest, most complete record retained</small></article>`).join("")
      : `<div class="notification-empty">No duplicate records required cleanup.</div>`;
    document.querySelector("#confirmDuplicateCleanup").disabled = true;
  });
  document.querySelector("#restoreDuplicateCleanup")?.addEventListener("click", () => {
    if (!localStorage.getItem(DUPLICATE_CLEANUP_BACKUP_KEY)) {
      alert("No duplicate-cleanup backup is available yet.");
      return;
    }
    if (!confirm("Restore the data collections saved before the last duplicate cleanup?")) return;
    alert(restoreDuplicateCleanupBackup() ? "The duplicate-cleanup backup was restored." : "The backup could not be restored.");
  });
  document.querySelector("#unlockCredentialVault")?.addEventListener("click", createOrUnlockCredentialVault);
  document.querySelector("#lockCredentialVault")?.addEventListener("click", lockCredentialVault);
  document.querySelector("#resetCredentialVault")?.addEventListener("click", resetCredentialVault);
  document.querySelector("#openVaultHelp")?.addEventListener("click", () => {
    const help = document.querySelector("#vaultHelpText");
    if (help) help.hidden = !help.hidden;
  });
  document.querySelector("#saveCredentialEntry")?.addEventListener("click", saveCredentialEntry);
  document.querySelector("#credentialSearch")?.addEventListener("input", renderCredentialEntries);
  document.querySelector("#toggleVaultVisibility")?.addEventListener("click", () => {
    credentialVaultSession.visible = !credentialVaultSession.visible;
    renderCredentialVault();
  });
  document.querySelectorAll(".field-eye-toggle").forEach((button) => {
    button.addEventListener("click", () => {
      const field = document.querySelector(`#${button.dataset.passwordTarget}`);
      if (!field) return;
      const visible = field.type === "password";
      field.type = visible ? "text" : "password";
      button.classList.toggle("is-visible", visible);
      button.setAttribute("aria-label", visible ? "Hide password" : "Show password");
    });
  });
  ["vaultMasterPassword", "vaultMasterConfirm"].forEach((id) => {
    document.querySelector(`#${id}`)?.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      createOrUnlockCredentialVault();
    });
  });
  document.querySelector("#salahInstructionPrayer")?.addEventListener("change", renderSalahInstructions);
  document.querySelector("#closeTaskCompletionPopup")?.addEventListener("click", () => {
    clearTimeout(taskCompletionPopupTimer);
    const popup = document.querySelector("#taskCompletionPopup");
    if (popup) popup.hidden = true;
  });
  document.querySelector("#dismissBillsCountdown")?.addEventListener("click", () => {
    const popup = document.querySelector("#homeBillsCountdown");
    state.dismissedBillsDate = popup?.dataset.recordKey || "";
    saveState();
    if (popup) popup.hidden = true;
  });
  document.querySelector("#showBillsPopup")?.addEventListener("click", () => {
    state.dismissedBillsDate = "";
    forceSaveState();
    renderHomeSummary();
  });
  document.querySelector("#saveSchedule")?.addEventListener("click", () => {
    day().scheduleSavedAt = new Date().toISOString();
    forceSaveState();
    renderDashboard();
    const button = document.querySelector("#saveSchedule");
    if (button) {
      button.textContent = "Schedule Saved";
      window.setTimeout(() => button.textContent = "Save Schedule", 1400);
    }
  });
  document.querySelector("#historyBackupData")?.addEventListener("click", saveCurrentPagePdf);
  document.querySelector("#historyScreenshotPage")?.addEventListener("click", () => saveCurrentPage(`${pageTitle(currentPage)} screenshot - ${new Date().toLocaleString()}`));
  document.querySelector("#restoreLastDeleted")?.addEventListener("click", restoreLastDeletedState);
  document.querySelector("#markRamadanFast")?.addEventListener("click", () => {
    if (!state.ramadanFasts.includes(todayKey())) state.ramadanFasts.push(todayKey());
    forceSaveState();
    renderRamadan();
  });
  document.querySelector("#resetRamadanFasts")?.addEventListener("click", () => {
    if (!confirm("Reset the Ramadan fasting tracker? This only clears the fasting tracker records.")) return;
    state.ramadanFasts = [];
    forceSaveState();
    renderRamadan();
    renderIslamicToolkit();
  });
  document.querySelector("#markTaraweehComplete")?.addEventListener("click", saveTaraweehRecord);
  document.querySelectorAll("[data-prayer-time-format]").forEach((button) => {
    button.addEventListener("click", () => {
      state.prayerTimeFormat = button.dataset.prayerTimeFormat === "24" ? "24" : "12";
      forceSaveState();
      renderFaith();
      renderPrayer();
      renderDashboard();
    });
  });
  const scrollTopButton = document.querySelector("#scrollTopButton");
  if (scrollTopButton) {
    const toggleScrollTop = () => scrollTopButton.classList.toggle("is-visible", window.scrollY > 420);
    scrollTopButton.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    window.addEventListener("scroll", toggleScrollTop, { passive: true });
    toggleScrollTop();
  }
  document.querySelector("#homeButton").addEventListener("click", () => {
    pageStack = [];
    openPanel("dashboard", pageTitle("dashboard", "Home"), document.querySelector("#dayTab"), { skipStack: true });
  });
  document.querySelector("#backButton").addEventListener("click", () => {
    const previous = pageStack.pop() || "dashboard";
    const button = document.querySelector(`.tab[data-tab="${previous}"]`);
    openPanel(previous, pageTitle(previous), button, { skipStack: true });
  });
  document.querySelector("#savePage").addEventListener("click", saveCurrentPagePdf);
  document.querySelector("#settingsSavePagePng")?.addEventListener("click", () => saveCurrentPageImageCopy("png"));
  document.querySelector("#settingsSavePageJpg")?.addEventListener("click", () => saveCurrentPageImageCopy("jpg"));
  document.querySelector("#autoSaveToggle").addEventListener("click", () => {
    state.autoSave = state.autoSave === false;
    updateAutoSaveButton();
    forceSaveState();
  });
  document.querySelector("#pageChooser").addEventListener("click", () => {
    document.querySelector("#pageLauncher").hidden = false;
  });
  document.querySelector("#openPageAppearance")?.addEventListener("click", () => {
    const panel = document.querySelector("#pageAppearancePanel");
    if (!panel) return;
    panel.hidden = !panel.hidden;
    document.querySelector("#openPageAppearance")?.setAttribute("aria-expanded", String(!panel.hidden));
    if (!panel.hidden) {
      setupCustomizeCollapsibles();
      setCustomizeMode("all");
    }
    applyTheme();
  });
  document.querySelector("#openLayoutCenter")?.addEventListener("click", () => {
    const panel = document.querySelector("#pageAppearancePanel");
    if (!panel) return;
    panel.hidden = false;
    document.querySelector("#openPageAppearance")?.setAttribute("aria-expanded", "true");
    setupCustomizeCollapsibles();
    setCustomizeMode("layout");
    applyTheme();
  });
  document.querySelector("#customizeColorsMode")?.addEventListener("click", () => setCustomizeMode("colors"));
  document.querySelector("#customizeLayoutMode")?.addEventListener("click", () => setCustomizeMode("layout"));
  document.querySelector("#closePageAppearance")?.addEventListener("click", () => {
    document.querySelector("#pageAppearancePanel").hidden = true;
    document.querySelector("#openPageAppearance")?.setAttribute("aria-expanded", "false");
  });
  document.querySelector("#toggleHiddenWidgetManager")?.addEventListener("click", (event) => {
    event.stopPropagation();
    const button = document.querySelector("#toggleHiddenWidgetManager");
    const body = document.querySelector("#hiddenWidgetManagerBody");
    if (!button || !body) return;
    const expanded = button.getAttribute("aria-expanded") !== "false";
    button.setAttribute("aria-expanded", String(!expanded));
    body.hidden = expanded;
    const marker = button.querySelector("b");
    if (marker) marker.textContent = expanded ? "+" : "-";
  });
  document.querySelector("#customizeScrollTop")?.addEventListener("click", () => {
    document.querySelector("#pageAppearancePanel")?.scrollTo({ top: 0, behavior: "smooth" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  randomizeHeroPulseStyle();
  document.querySelector("#heroPulseStyleButton")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    randomizeHeroPulseStyle(true);
  });
  document.querySelector("#heroPulseMessage")?.addEventListener("animationiteration", () => {
    window.fahimPulseSeed = Math.floor(Math.random() * 10000);
    renderHeroSystemPulse();
  });
  document.querySelector("#essentialsButton")?.addEventListener("click", () => {
    openPanel("essentials", "Essentials Doc");
    renderEssentialsDoc();
  });
  document.querySelector("#profileScrollTop")?.addEventListener("click", () => {
    document.querySelector("#profile")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.querySelector("#resetPageAppearance")?.addEventListener("click", () => {
    state.pageStyles = state.pageStyles || {};
    delete state.pageStyles[currentPage];
    if (currentPage !== "dashboard") delete state.pageColors[currentPage];
    applyTheme();
    forceSaveState();
  });
  document.querySelector("#syncPageAppearance")?.addEventListener("click", syncCurrentPageAppearanceToAllPages);
  document.querySelector("#backgroundGalleryCategory")?.addEventListener("change", renderBackgroundGallery);
  document.querySelector("#aiBackgroundGallery")?.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-background-preset]");
    if (!button) return;
    applyGalleryTheme(button.dataset.backgroundPreset);
    renderBackgroundGallery();
  });
  document.querySelectorAll("[data-background-preset]").forEach((button) => {
    button.addEventListener("click", () => {
      state.designStudio = { ...defaultState().designStudio, ...(state.designStudio || {}), backgroundPreset: button.dataset.backgroundPreset };
      applyTheme();
      forceSaveState();
    });
  });
  [
    ["dashboardTileSpacing", "tileSpacing"],
    ["dashboardGlass", "glassIntensity"],
    ["dashboardMotion", "motionLevel"],
    ["dashboardBackgroundBlur", "backgroundBlur"],
    ["dashboardBackgroundOverlay", "backgroundOverlay"],
    ["dashboardBackgroundBrightness", "backgroundBrightness"],
    ["dashboardBackgroundOpacity", "backgroundOpacity"]
  ].forEach(([id, key]) => {
    document.querySelector(`#${id}`)?.addEventListener("input", (event) => {
      backupLayoutV4(`${key} changed`);
      state.designStudio = { ...defaultState().designStudio, ...(state.designStudio || {}), [key]: Number(event.target.value) };
      applyTheme();
      forceSaveState();
    });
  });
  const updateLiveTheme = (patch) => {
    backupLayoutV4("Live theme changed");
    state.liveThemeV4 = { ...defaultState().liveThemeV4, ...(state.liveThemeV4 || {}), ...patch };
    applyTheme();
    forceSaveState();
  };
  document.querySelector("#liveThemeEnabled")?.addEventListener("change", (event) => updateLiveTheme({ enabled: event.target.checked }));
  document.querySelector("#liveThemeSelect")?.addEventListener("change", (event) => updateLiveTheme({ id: event.target.value }));
  document.querySelector("#liveThemeSpeed")?.addEventListener("change", (event) => updateLiveTheme({ speed: event.target.value }));
  document.querySelector("#liveThemeIntensity")?.addEventListener("change", (event) => updateLiveTheme({ intensity: event.target.value }));
  const updateCustomizeV4 = (patch, reason = "Layout preference changed") => {
    backupLayoutV4(reason);
    state.customizeV4 = { ...defaultState().customizeV4, ...(state.customizeV4 || {}), ...patch };
    applyTheme();
    forceSaveState();
  };
  document.querySelector("#layoutPresetSelect")?.addEventListener("change", (event) => updateCustomizeV4({ layoutPreset: event.target.value }, "Layout preset changed"));
  document.querySelector("#layoutSpacingSelect")?.addEventListener("change", (event) => updateCustomizeV4({ spacing: event.target.value }, "Layout spacing changed"));
  document.querySelector("#layoutSnapGrid")?.addEventListener("change", (event) => updateCustomizeV4({ snapToGrid: event.target.checked }, "Snap to grid changed"));
  document.querySelector("#layoutGridLines")?.addEventListener("change", (event) => updateCustomizeV4({ gridLines: event.target.checked }, "Grid lines changed"));
  const readBackgroundFile = (event, key) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      backupLayoutV4(`${key} uploaded`);
      state.designStudio = { ...defaultState().designStudio, ...(state.designStudio || {}), [key]: reader.result, backgroundPreset: key === "backgroundImage" ? "uploaded-image" : "uploaded-video" };
      applyTheme();
      forceSaveState();
      setCustomizeStatus(`${key === "backgroundImage" ? "Image" : "Video"} background uploaded and saved locally.`);
    });
    reader.readAsDataURL(file);
  };
  document.querySelector("#backgroundImageUpload")?.addEventListener("change", (event) => readBackgroundFile(event, "backgroundImage"));
  document.querySelector("#backgroundVideoUpload")?.addEventListener("change", (event) => readBackgroundFile(event, "backgroundVideo"));
  document.querySelector("#hiddenWidgetManager")?.addEventListener("click", (event) => {
    const homeRestore = event.target.closest("[data-restore-home-widget]");
    const customRestore = event.target.closest("[data-restore-custom-widget]");
    if (homeRestore) {
      backupLayoutV4("Hidden widget restored");
      const id = homeRestore.dataset.restoreHomeWidget;
      state.homeCardSettings = (state.homeCardSettings || defaultHomeCards).map((item) => item.id === id ? { ...item, visible: true } : item);
      state.hiddenWidgetsV4 = (state.hiddenWidgetsV4 || []).filter((item) => item !== `home:${id}`);
      renderAll();
      forceSaveState();
    }
    if (customRestore) {
      backupLayoutV4("Hidden widget restored");
      const id = customRestore.dataset.restoreCustomWidget;
      state.hiddenWidgetsV4 = (state.hiddenWidgetsV4 || []).filter((item) => item !== id);
      applyTheme();
      forceSaveState();
    }
    if (event.target.closest("#restoreAllHiddenWidgetsInline")) restoreAllHiddenWidgetsOnly();
  });
  document.querySelector("#undoLayoutChange")?.addEventListener("click", undoLastLayoutChange);
  document.querySelector("#resetHomepageLayoutV4")?.addEventListener("click", () => { if (confirmDesignOnlyReset()) resetHomepageLayoutOnly(); });
  document.querySelector("#resetWidgetSizesV4")?.addEventListener("click", () => { if (confirmDesignOnlyReset()) resetAllWidgetSizesOnly(); });
  document.querySelector("#restoreHiddenWidgetsV4")?.addEventListener("click", () => { if (confirmDesignOnlyReset()) restoreAllHiddenWidgetsOnly(); });
  document.querySelector("#resetThemeOnlyV4")?.addEventListener("click", () => { if (confirmDesignOnlyReset()) resetThemeOnly(); });
  document.querySelector("#resetLiveThemeOnlyV4")?.addEventListener("click", () => { if (confirmDesignOnlyReset()) resetLiveThemeOnly(); });
  document.querySelector("#resetDesignOnlyV4")?.addEventListener("click", () => { if (confirmDesignOnlyReset()) resetDesignOnly(); });
  document.querySelector("#factoryLayoutResetV4")?.addEventListener("click", () => { if (confirmDesignOnlyReset()) factoryLayoutResetOnly(); });
  document.querySelector("#toggleLauncherThemes")?.addEventListener("click", () => {
    const open = document.querySelector("#toggleLauncherThemes").getAttribute("aria-expanded") !== "true";
    setLauncherThemePanel(open);
  });
  document.querySelector("#closeLauncherThemes")?.addEventListener("click", () => setLauncherThemePanel(false));
  document.querySelector("#launcherColor")?.addEventListener("input", (event) => {
    applyLauncherTheme({ ...menuThemeFromBackground(event.target.value), id: "custom" });
  });
  document.querySelector("#pageHeaderPage")?.addEventListener("change", (event) => {
    state.pageHeaderEditorPage = event.target.value;
    forceSaveState();
    renderPageHeaderSettings();
  });
  const updateSelectedPageHeader = (field, value) => {
    const pageId = state.pageHeaderEditorPage || "dashboard";
    state.pageHeaders = state.pageHeaders || {};
    state.pageHeaders[pageId] = { ...pageHeaderConfig(pageId), [field]: value };
    forceSaveState();
    if (pageId === currentPage) applyPageHeader();
  };
  document.querySelector("#pageHeaderHeadline")?.addEventListener("input", (event) => updateSelectedPageHeader("headline", event.target.value));
  document.querySelector("#pageHeaderSubtitle")?.addEventListener("input", (event) => updateSelectedPageHeader("subtitle", event.target.value));
  document.querySelector("#pageHeaderVisible")?.addEventListener("change", (event) => updateSelectedPageHeader("visible", event.target.checked));
  document.querySelector("#pageHeaderUppercase")?.addEventListener("change", (event) => updateSelectedPageHeader("uppercase", event.target.checked));
  document.querySelector("#pageHeaderAlignment")?.addEventListener("change", (event) => updateSelectedPageHeader("alignment", event.target.value));
  document.querySelector("#pageHeaderSize")?.addEventListener("input", (event) => {
    updateSelectedPageHeader("size", Number(event.target.value));
    const output = document.querySelector("#pageHeaderSizeOutput");
    if (output) output.textContent = `${event.target.value}px`;
  });
  document.querySelector("#resetPageHeader")?.addEventListener("click", () => {
    const pageId = state.pageHeaderEditorPage || "dashboard";
    state.pageHeaders = state.pageHeaders || {};
    delete state.pageHeaders[pageId];
    forceSaveState();
    renderPageHeaderSettings();
    if (pageId === currentPage) {
      renderDashboard();
      applyPageHeader();
    }
  });
  document.querySelector("#viewLifeAnalytics")?.addEventListener("click", () => {
    openPanel("lifeDataDetails", "Life Data Details");
  });
  document.querySelector(".life-data-section")?.addEventListener("click", (event) => {
    if (event.target.closest("button, .life-data-card")) return;
    openPanel("lifeDataDetails", "Life Data Details");
  });
  document.querySelector(".life-data-section")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPanel("lifeDataDetails", "Life Data Details");
    }
  });
  document.querySelector("#toggleLifeStatus")?.addEventListener("click", () => {
    state.lifeStatusCollapsed = !state.lifeStatusCollapsed;
    if (state.lifeStatusCollapsed) state.lifeStatusExpanded = false;
    forceSaveState();
    updateLifeStatusCollapse();
  });
  document.querySelector("#expandLifeStatus")?.addEventListener("click", () => {
    state.lifeStatusExpanded = !state.lifeStatusExpanded;
    state.lifeStatusCollapsed = false;
    forceSaveState();
    updateLifeStatusCollapse();
  });
  document.querySelector("#toggleDailyWellness")?.addEventListener("click", () => {
    state.dailyWellnessCollapsed = !state.dailyWellnessCollapsed;
    forceSaveState();
    renderDailyWellnessOverview();
  });
  document.querySelector("#hideLifeStatus")?.addEventListener("click", () => {
    state.lifeStatusHidden = true;
    forceSaveState();
    arrangeHomeDashboard();
  });
  document.querySelector("#hideDailyWellness")?.addEventListener("click", () => {
    state.dailyWellnessHidden = true;
    forceSaveState();
    arrangeHomeDashboard();
  });
  document.querySelector("#showHiddenHomeWidgets")?.addEventListener("click", () => {
    state.lifeStatusHidden = false;
    state.dailyWellnessHidden = false;
    const dismissable = [...document.querySelectorAll("[data-hide-home-widget]")].map((button) => button.dataset.hideHomeWidget);
    state.homeCardSettings = (state.homeCardSettings || defaultHomeCards.map((card) => ({ ...card }))).map((card) =>
      dismissable.includes(card.id) || defaultHomeCards.find((item) => item.id === card.id)?.visible === false
        ? { ...card, visible: true }
        : card
    );
    forceSaveState();
    arrangeHomeDashboard();
    renderDashboard();
  });
  document.querySelector("#hideHomeWidgets")?.addEventListener("click", () => {
    const dismissable = [...document.querySelectorAll("[data-hide-home-widget]")].map((button) => button.dataset.hideHomeWidget);
    state.homeCardSettings = (state.homeCardSettings || defaultHomeCards.map((card) => ({ ...card }))).map((card) =>
      dismissable.includes(card.id) ? { ...card, visible: false } : card
    );
    forceSaveState();
    arrangeHomeDashboard();
    renderDashboard();
    updateHomeCardSettings();
  });
  document.querySelectorAll("[data-hide-home-widget]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = button.dataset.hideHomeWidget;
      const config = (state.homeCardSettings || []).find((item) => item.id === id);
      if (config) config.visible = false;
      forceSaveState();
      updateHomeCardSettings();
      arrangeHomeDashboard();
      scheduleHomeMasonry();
    });
  });
  document.querySelector("#showLifeStatusSetting")?.addEventListener("change", (event) => {
    state.lifeStatusHidden = !event.target.checked;
    forceSaveState();
    arrangeHomeDashboard();
  });
  document.querySelector("#showDailyWellnessSetting")?.addEventListener("change", (event) => {
    state.dailyWellnessHidden = !event.target.checked;
    forceSaveState();
    arrangeHomeDashboard();
  });
  const setAdhanEnabled = (enabled) => {
    state.adhanSettings.enabled = enabled;
    forceSaveState();
    renderAdhan();
  };
  document.querySelector("#adhanDevicePermission")?.addEventListener("change", (event) => setAdhanEnabled(event.target.checked));
  document.querySelector("#settingsAdhanAudio")?.addEventListener("change", (event) => setAdhanEnabled(event.target.checked));
  document.querySelector("#clearNotificationReadState")?.addEventListener("click", () => {
    state.notificationsRead = {};
    forceSaveState();
    renderNotifications();
  });
  document.querySelector("#homeDockAssistant")?.addEventListener("click", () => {
    openAskFahim();
  });
  document.querySelector("#homeDockMore")?.addEventListener("click", () => {
    document.querySelector("#pageLauncher").hidden = false;
  });
  document.querySelector("#manageHomeDock")?.addEventListener("click", () => {
    openPanel("settings", pageTitle("settings", "Settings"));
    requestAnimationFrame(() => {
      document.querySelector("#homeDockSettings")?.closest(".card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  });
  document.querySelector("#openWorkoutGuidance")?.addEventListener("click", () => {
    openPanel("coachCommand", "Coach Command");
    const guidance = document.querySelector("#workoutGuidance");
    const firstGroup = guidance?.querySelector("details");
    if (firstGroup) firstGroup.open = true;
  });
  document.querySelector("#closeAskFahim")?.addEventListener("click", closeAskFahim);
  document.querySelector("#askFahimModal")?.addEventListener("click", (event) => {
    if (event.target.id === "askFahimModal") closeAskFahim();
  });
  document.querySelector("#askFahimForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    runAskFahim(document.querySelector("#askFahimInput")?.value);
  });
  document.querySelector("#homeAskFahimForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = document.querySelector("#homeAskFahimInput")?.value || "";
    openAskFahim(query);
    runAskFahim(query);
  });
  document.querySelector("#askFahimInput")?.addEventListener("input", (event) => renderAskSuggestions(event.target.value));
  document.querySelector("#askDailyBriefingButton")?.addEventListener("click", () => runAskFahim("Daily briefing"));
  document.querySelector("#askFahimInsightRail")?.addEventListener("click", (event) => {
    const button = event.target.closest("[data-ask-command]");
    if (!button) return;
    document.querySelector("#askFahimInput").value = button.dataset.askCommand || "";
    runAskFahim(button.dataset.askCommand || "");
  });
  document.querySelector("#copyAskFahimAnswer")?.addEventListener("click", async () => {
    const button = document.querySelector("#copyAskFahimAnswer");
    if (!lastAskFahimAnswer) {
      if (button) button.textContent = "No Answer Yet";
      window.setTimeout(() => { if (button) button.textContent = "Copy Answer"; }, 1200);
      return;
    }
    try {
      await navigator.clipboard.writeText(askAnswerText(lastAskFahimAnswer));
      if (button) button.textContent = "Copied";
    } catch {
      if (button) button.textContent = "Copy Failed";
    }
    window.setTimeout(() => { if (button) button.textContent = "Copy Answer"; }, 1200);
  });
  document.querySelector("#clearAskFahimChat")?.addEventListener("click", () => {
    lastAskFahimAnswer = null;
    state.askFahimHistory = [];
    forceSaveState();
    const results = document.querySelector("#askFahimResults");
    if (results) results.innerHTML = `<div class="ask-fahim-empty"><strong>Chat cleared.</strong><p>Ask FahimOS a new question when you are ready.</p></div>`;
    renderAskFahimHistory();
  });
  document.querySelector("#openGptAutomation")?.addEventListener("click", () => {
    closeAskFahim();
    document.querySelector("#assistantDrawer").hidden = false;
    renderAssistantHistory();
    window.setTimeout(() => document.querySelector("#assistantCommand")?.focus(), 50);
  });
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openAskFahim();
    }
    if (event.key === "Escape" && !document.querySelector("#askFahimModal")?.hidden) closeAskFahim();
  });
  document.querySelector("#refreshClockWeather")?.addEventListener("click", refreshLiveWeather);
  document.querySelector("#closeAssistant")?.addEventListener("click", () => {
    document.querySelector("#assistantDrawer").hidden = true;
  });
  document.querySelector("#assistantDrawer")?.addEventListener("click", (event) => {
    if (event.target.id === "assistantDrawer") document.querySelector("#assistantDrawer").hidden = true;
  });
  document.querySelector("#runAssistantCommand")?.addEventListener("click", async () => {
    const command = document.querySelector("#assistantCommand").value;
    clearAssistantPreview();
    fillStatus("#assistantResult", ["Thinking and preparing automation..."]);
    const result = await runSmartAssistantCommand(command);
    showAssistantResult(result);
    renderAssistantPreview(result);
    if (!result.actions?.length) addAssistantHistory(command, result.source === "api" ? "Answered" : "Not applied", result.text);
  });
  document.querySelector("#assistantCommand")?.addEventListener("keydown", async (event) => {
    if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
      event.preventDefault();
      clearAssistantPreview();
      fillStatus("#assistantResult", ["Thinking and preparing automation..."]);
      const result = await runSmartAssistantCommand(event.target.value);
      showAssistantResult(result);
      renderAssistantPreview(result);
      if (!result.actions?.length) addAssistantHistory(event.target.value, result.source === "api" ? "Answered" : "Not applied", result.text);
    }
  });
  document.querySelector("#applyAssistantActions")?.addEventListener("click", () => {
    if (!pendingAssistantActions.length) return;
    const command = document.querySelector("#assistantCommand")?.value || "";
    const applied = applyAssistantActions(pendingAssistantActions);
    const detail = applied.length ? `Saved ${applied.join(", ")}.` : "No valid changes were applied.";
    showAssistantResult({ text: detail, page: assistantActionMeta[pendingAssistantActions[0]?.name]?.page || "dashboard" });
    addAssistantHistory(command, applied.length ? "Applied" : "Skipped", detail);
    clearAssistantPreview();
  });
  document.querySelector("#cancelAssistantActions")?.addEventListener("click", () => {
    const command = document.querySelector("#assistantCommand")?.value || "";
    addAssistantHistory(command, "Cancelled", "Proposed changes were not saved.");
    clearAssistantPreview();
    fillStatus("#assistantResult", ["Proposed changes cancelled. Nothing was saved."]);
  });
  document.querySelector("#clearAssistantCommand")?.addEventListener("click", () => {
    document.querySelector("#assistantCommand").value = "";
    clearAssistantPreview();
    fillStatus("#assistantResult", ["Ready for a command."]);
  });
  document.querySelector("#showCommandSuggestions")?.addEventListener("click", () => {
    const isOpen = document.querySelector("#showCommandSuggestions").getAttribute("aria-expanded") === "true";
    setAssistantSuggestionsOpen(!isOpen);
  });
  document.querySelector("#closeCommandSuggestions")?.addEventListener("click", () => setAssistantSuggestionsOpen(false));
  document.querySelector("#showInformationGuide")?.addEventListener("click", () => {
    const isOpen = document.querySelector("#showInformationGuide").getAttribute("aria-expanded") === "true";
    setAssistantInformationOpen(!isOpen);
  });
  document.querySelector("#closeInformationGuide")?.addEventListener("click", () => setAssistantInformationOpen(false));
  document.querySelector("#assistantSuggestionSearch")?.addEventListener("input", (event) => {
    renderAssistantCommandSuggestions(event.target.value);
  });
  document.querySelectorAll(".assistant-example").forEach((button) => {
    button.addEventListener("click", () => {
      document.querySelector("#assistantCommand").value = button.textContent.trim();
      autoGrow(document.querySelector("#assistantCommand"));
    });
  });
  document.querySelectorAll(".assistant-workflow").forEach((button) => {
    button.addEventListener("click", () => {
      const commandBox = document.querySelector("#assistantCommand");
      commandBox.value = button.dataset.assistantPrompt || "";
      autoGrow(commandBox);
      commandBox.focus();
    });
  });
  document.querySelector("#closeLauncher").addEventListener("click", () => {
    setLauncherThemePanel(false);
    document.querySelector("#pageLauncher").hidden = true;
  });
  document.querySelector("#pageLauncher").addEventListener("click", (event) => {
    if (event.target.id === "pageLauncher") {
      setLauncherThemePanel(false);
      document.querySelector("#pageLauncher").hidden = true;
    }
  });
  document.querySelector("#activeDate").value = activeDate;
  document.querySelector("#activeDate").addEventListener("change", (event) => {
    syncDailyArchive(activeDate);
    activeDate = event.target.value || todayKey();
    ensureDailyEntry(activeDate);
    syncDailyArchive(activeDate);
    saveState();
    renderAll();
  });
  document.querySelector("#editHomeLayout")?.addEventListener("click", () => {
    backupLayoutV4(panelLayoutEditMode ? "Edit mode closed" : "Edit mode opened");
    panelLayoutEditMode = !panelLayoutEditMode;
    setCustomizeStatus(panelLayoutEditMode ? "Edit Mode Active: drag, resize, hide, and rearrange visual sections." : "Edit Mode Off: handles and grid controls are hidden.");
    applyTheme();
    renderPanelLayoutControls();
    forceSaveState();
  });
  document.querySelector("#dailyNotes").addEventListener("input", (event) => {
    day().notes = event.target.value;
    autoGrow(event.target);
    saveState();
  });
  document.querySelector("#prayerReflection")?.addEventListener("input", (event) => {
    day().prayerReflection = event.target.value;
    autoGrow(event.target);
    saveState();
  });
  document.querySelector("#addChecklist").addEventListener("click", () => {
    day().checklist.push({ text: "", done: false });
    saveState();
    renderDailyFocusEditor();
    renderDashboard();
  });
  document.querySelector("#clearSchedule").addEventListener("click", () => {
    if (confirm("Clear this day's schedule?")) {
      day().schedule = {};
      saveState();
      renderSchedule();
    }
  });
  document.querySelector("#resetPrayers").addEventListener("click", () => {
    day().prayers = Object.fromEntries(prayers.map((name) => [name, { done: false, note: "" }]));
    saveState();
    renderAll();
  });
  document.querySelector("#newVerse").addEventListener("click", () => {
    day().verseIndex = (day().verseIndex + 1) % quranVerseBank.length;
    day().verseDate = activeDate;
    saveState();
    renderQuran();
  });
  document.querySelector("#loadSelectedSurah")?.addEventListener("click", loadSelectedSurahText);
  document.querySelector("#addTask").addEventListener("click", () => {
    state.tasks.push({ title: "New task", status: "Backlog", priority: "Medium", due: activeDate, note: "", category: "General" });
    saveState();
    renderTasks();
  });
  document.querySelector("#addTodoList").addEventListener("click", () => {
    state.todoLists.push({ title: "New List", items: [] });
    saveState();
    renderTodos();
  });
  document.querySelector("#addAlarm").addEventListener("click", () => {
    state.alarms.push({ time: "07:00", message: "Time to move.", enabled: true });
    saveState();
    renderAlarms();
  });
  document.querySelector("#testAlarmPopup")?.addEventListener("click", () => {
    queueAlarmPopup({ time: new Date().toTimeString().slice(0, 5), message: "This is how your alarm popup will appear.", enabled: true });
  });
  document.querySelector("#dismissAlarmPopup")?.addEventListener("click", closeAlarmPopup);
  document.querySelector("#snoozeAlarmPopup")?.addEventListener("click", snoozeActiveAlarm);
  document.querySelector("#addReminder").addEventListener("click", () => {
    const soon = new Date(Date.now() + 3600000).toISOString().slice(0, 16);
    state.reminders.push({ title: "New reminder", when: soon, status: "Open", note: "" });
    saveState();
    renderReminders();
  });
  document.querySelector("#addCountdown").addEventListener("click", () => {
    const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 16);
    state.countdowns.push({ id: `countdown-${Date.now()}`, title: "New countdown", target: tomorrow, completedNotified: false });
    state.dismissedCountdownId = "";
    saveState();
    renderCountdowns();
  });
  document.querySelector("#dismissHomeCountdown")?.addEventListener("click", () => {
    state.dismissedCountdownId = document.querySelector("#homeCountdownPopup")?.dataset.countdownId || "";
    forceSaveState();
    renderHomeCountdown();
  });
  document.querySelector("#openHomeCountdown")?.addEventListener("click", () => openPanel("countdown", "Countdowns"));
  document.querySelector("#refreshSuggestions").addEventListener("click", renderSuggestions);
  document.querySelector("#expandHomeCards")?.addEventListener("click", () => setAllHomeCardsCollapsed(false));
  document.querySelector("#collapseHomeCards")?.addEventListener("click", () => setAllHomeCardsCollapsed(true));
  document.querySelectorAll(".home-view-mode").forEach((button) => {
    button.addEventListener("click", () => {
      state.homeVisualMode = button.dataset.homeView;
      forceSaveState();
      applyHomeVisualMode();
    });
  });
  document.querySelectorAll(".dashboard-category-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.homeDashboardCategory = button.dataset.dashboardCategory;
      forceSaveState();
      applyHomeDashboardCategory();
    });
  });
  document.querySelector("#homeDashboardView")?.addEventListener("change", (event) => {
    state.homeDashboardCategory = event.target.value;
    forceSaveState();
    applyHomeDashboardCategory();
  });
  document.querySelector("#toggleLifeData")?.addEventListener("click", () => {
    state.lifeDataCollapsed = !state.lifeDataCollapsed;
    saveState();
    updateLifeDataCollapse();
  });
  document.querySelector("#homeFocusColor")?.addEventListener("click", (event) => event.stopPropagation());
  document.querySelector("#homeFocusColor")?.addEventListener("input", (event) => {
    event.stopPropagation();
    state.homeFocusColor = event.target.value;
    applyTheme();
    saveState();
  });
  document.querySelector("#homeWeatherColor")?.addEventListener("click", (event) => event.stopPropagation());
  document.querySelector("#homeWeatherColor")?.addEventListener("input", (event) => {
    event.stopPropagation();
    state.homeWeatherColor = event.target.value;
    applyTheme();
    forceSaveState();
  });
  document.querySelector("#homeCalendarColor")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
  });
  document.querySelector("#homeCalendarColor")?.addEventListener("input", (event) => {
    event.stopPropagation();
    state.homeCalendarColor = event.target.value;
    applyTheme();
    forceSaveState();
  });
  document.querySelectorAll(".widget-color-trigger").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      openWidgetColorPopover(button, button.dataset.widgetColorTarget);
    });
  });
  document.querySelector("#closeWidgetColorPopover")?.addEventListener("click", () => {
    document.querySelector("#widgetColorPopover").hidden = true;
  });
  document.querySelector("#widgetCardColor")?.addEventListener("input", (event) => updateActiveWidgetColor("card", event.target.value));
  document.querySelector("#widgetAccentColor")?.addEventListener("input", (event) => updateActiveWidgetColor("accent", event.target.value));
  document.querySelector("#widgetBackgroundColor")?.addEventListener("input", (event) => updateActiveWidgetColor("background", event.target.value));
  document.querySelector("#saveHeroJournal")?.addEventListener("click", saveHeroJournalReflection);
  document.querySelector("#heroJournalText")?.addEventListener("input", (event) => {
    state.journalDraft = { ...defaultState().journalDraft, ...(state.journalDraft || {}), text: event.target.value };
    state.essentialsNotes = event.target.value;
    saveState();
  });
  document.querySelector("#openHeroJournal")?.addEventListener("click", () => {
    state.lifeHubTab = "journal";
    forceSaveState();
    openPanel("life", pageTitle("life", "Life Hub"));
    renderLifeHubTabs("journal");
  });
  document.querySelector("#life")?.addEventListener("click", (event) => {
    const tab = event.target.closest("[data-life-tab]");
    const jump = event.target.closest("[data-life-tab-jump]");
    const selected = tab?.dataset.lifeTab || jump?.dataset.lifeTabJump;
    if (!selected) return;
    state.lifeHubTab = selected;
    forceSaveState();
    renderLifeHubTabs(selected);
  });
  document.querySelector(".focus-command-card")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPanel("tasks", pageTitle("tasks", "Tasks"));
    }
  });
  document.querySelector("#closeDailySignal")?.addEventListener("click", () => {
    faithReminderHidden = true;
    renderDailySignal();
  });
  document.querySelector("#wisdomCategory")?.addEventListener("click", (event) => event.stopPropagation());
  document.querySelector("#wisdomCategory")?.addEventListener("change", (event) => {
    state.wisdomCategory = event.target.value;
    state.quoteSeeds.wisdom = 0;
    forceSaveState();
    renderDailySignal();
  });
  document.querySelector("#favoriteDailySignal")?.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!currentDailySignalItem) return;
    state.favoriteWisdom = state.favoriteWisdom || [];
    const key = `${currentDailySignalItem.type}|${currentDailySignalItem.text}`;
    const index = state.favoriteWisdom.findIndex((item) => `${item.type}|${item.text}` === key);
    if (index >= 0) state.favoriteWisdom.splice(index, 1);
    else state.favoriteWisdom.unshift({ ...currentDailySignalItem, savedAt: new Date().toISOString() });
    forceSaveState();
    renderDailySignal();
  });
  document.querySelector("#nextDailySignal")?.addEventListener("click", advanceDailySignal);
  document.querySelector("#saveJournalEntry")?.addEventListener("click", saveJournalEntry);
  document.querySelector("#openJournalHistory")?.addEventListener("click", () => {
    state.historyView = "journal";
    forceSaveState();
  });
  document.querySelectorAll(".history-tab").forEach((button) => {
    button.addEventListener("click", () => {
      setHistoryView(button.dataset.historyTab);
      saveState();
    });
  });
  document.querySelector("#dailyHistoryPeriod")?.addEventListener("change", renderDailyHistory);
  document.querySelector("#dailyHistoryDate")?.addEventListener("change", renderDailyHistory);
  document.querySelector("#exportDailyHistory")?.addEventListener("click", exportDailyHistory);
  document.querySelector("#journalHistorySearch")?.addEventListener("input", renderJournalHistory);
  document.querySelector("#journalHistoryDate")?.addEventListener("change", renderJournalHistory);
  document.querySelector("#resetJournalFilters")?.addEventListener("click", () => {
    document.querySelector("#journalHistorySearch").value = "";
    document.querySelector("#journalHistoryDate").value = "";
    renderJournalHistory();
  });
  document.querySelector("#historySearch")?.addEventListener("input", renderHistory);
  document.querySelectorAll(".history-type-filter").forEach((button) => {
    button.addEventListener("click", () => {
      historyTypeFilter = button.dataset.historyType || "all";
      document.querySelectorAll(".history-type-filter").forEach((item) => item.classList.toggle("is-active", item === button));
      renderHistory();
    });
  });
  document.querySelector("#closeHistoryPreview")?.addEventListener("click", () => {
    document.querySelector("#historyPreviewModal").hidden = true;
  });
  document.querySelector("#historyPreviewModal")?.addEventListener("click", (event) => {
    if (event.target.id === "historyPreviewModal") event.currentTarget.hidden = true;
  });
  document.querySelector("#focusPrayerTimes")?.addEventListener("click", () => {
    document.querySelector(".faith-prayer-command")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });
  document.querySelector("#focusDailyDua")?.addEventListener("click", () => {
    document.querySelector("#dailyDuaCenter")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.querySelector("#focusFaithNotes")?.addEventListener("click", () => {
    document.querySelector(".faith-notes-card")?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => document.querySelector("#faithNotes")?.focus(), 350);
  });
  document.querySelector("#openWorkoutVideos")?.addEventListener("click", () => {
    document.querySelector("#workoutVideoSuggestions")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.querySelector("#openDailyWorkoutSuggestions")?.addEventListener("click", () => {
    document.querySelector("#exerciseIdeas")?.scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.querySelectorAll("[data-refresh-motivation]").forEach((button) => {
    button.addEventListener("click", () => refreshMotivationSection(button.dataset.refreshMotivation));
  });
  document.querySelector("#homeNotesCard")?.addEventListener("click", () => {
    if (panelLayoutEditMode) return;
    openPanel("daily", "Schedule");
    setTimeout(() => document.querySelector("#dailyNotes")?.focus(), 80);
  });
  document.querySelector("#refreshWeather")?.addEventListener("click", refreshLiveWeather);
  document.querySelector("#refreshNews")?.addEventListener("click", refreshLiveNews);
  document.querySelector("#refreshLifeNews")?.addEventListener("click", refreshLiveNews);
  document.querySelector("#refreshStocks")?.addEventListener("click", refreshLiveStocks);
  document.querySelector("#openWeatherMore")?.addEventListener("click", () => openExternal("https://weather.com/weather/today/"));
  document.querySelector("#openNewsMore")?.addEventListener("click", () => openExternal("https://news.google.com/topstories?hl=en-US&gl=US&ceid=US:en"));
  document.querySelector("#openStocksMore")?.addEventListener("click", () => openExternal("https://finance.yahoo.com/markets/stocks/"));
  document.querySelector("#digitalClock")?.addEventListener("click", () => openDetailModal("clock"));
  document.querySelector("#digitalClock")?.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") openDetailModal("clock");
  });
  document.querySelector("#closeDetailModal")?.addEventListener("click", closeDetailModal);
  document.querySelector("#detailModal")?.addEventListener("click", (event) => {
    if (event.target.id === "detailModal") closeDetailModal();
  });
  document.querySelector("#lifeRoadmapButton")?.addEventListener("click", openLifeRoadmap);
  document.querySelector("#addLifeRoadmapItem")?.addEventListener("click", () => {
    state.lifeRoadmap = Array.isArray(state.lifeRoadmap) ? state.lifeRoadmap : [];
    state.lifeRoadmap.push({ phase: "New Phase", focus: "Define the focus", actions: ["Add one clear action."] });
    saveState();
    renderLifeRoadmap();
  });
  document.querySelector("#closeLifeRoadmap")?.addEventListener("click", closeLifeRoadmap);
  document.querySelector("#lifeRoadmapModal")?.addEventListener("click", (event) => {
    if (event.target.id === "lifeRoadmapModal") closeLifeRoadmap();
  });
  document.querySelectorAll(".signal-widget").forEach((widget) => {
    const open = () => openDetailModal("signal", widget.dataset.signal);
    widget.addEventListener("click", (event) => {
      if (event.target.closest("button, a")) return;
      open();
    });
    widget.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") open();
    });
  });
  document.querySelectorAll(".study-future-widget").forEach((widget) => {
    widget.addEventListener("click", () => openPanel(widget.dataset.openTab || "study", pageTitle(widget.dataset.openTab || "study")));
  });
  document.querySelector("#motivationPageRefresh").addEventListener("click", () => refreshMotivationSection("all"));
  document.addEventListener("click", (event) => {
    const dismissWidget = event.target.closest("[data-hide-home-widget]");
    if (dismissWidget) {
      const id = dismissWidget.dataset.hideHomeWidget;
      const config = (state.homeCardSettings || []).find((item) => item.id === id);
      if (config) config.visible = false;
      dismissWidget.closest("[data-home-card]")?.setAttribute("hidden", "");
      forceSaveState();
      updateHomeCardSettings();
      return;
    }
    const scrollTarget = event.target.closest("[data-scroll-target]");
    if (scrollTarget) {
      event.preventDefault();
      event.stopPropagation();
      document.querySelector(`#${CSS.escape(scrollTarget.dataset.scrollTarget)}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    const button = event.target.closest(".hub-link");
    if (!button?.dataset.openTab) return;
    openPanel(button.dataset.openTab, button.textContent);
  });
  document.querySelector("#addJavaNote").addEventListener("click", () => {
    state.javaNotes.push({ text: "Java note: ", done: false });
    saveState();
    renderJava();
  });
  document.querySelector("#openMapSearch").addEventListener("click", () => {
    saveState();
    renderMaps();
  });
  document.querySelector("#startDiscipline").addEventListener("click", () => {
    if (!state.discipline.start) {
      state.discipline.start = new Date().toISOString();
      state.discipline.resting = false;
      forceSaveState();
      renderDiscipline();
    }
  });
  document.querySelector("#restDiscipline")?.addEventListener("click", () => {
    if (!state.discipline.start) return;
    state.discipline.accumulatedMs = disciplineElapsedMs();
    state.discipline.start = "";
    state.discipline.resting = true;
    forceSaveState();
    renderDiscipline();
    renderDashboard();
  });
  document.querySelector("#stopDiscipline")?.addEventListener("click", () => {
    const durationMs = disciplineElapsedMs();
    if (durationMs <= 0) return;
    state.discipline.sessions = state.discipline.sessions || [];
    state.discipline.sessions.unshift({
      durationMs,
      reason: state.discipline.reason || "",
      savedAt: new Date().toISOString()
    });
    state.discipline.start = "";
    state.discipline.accumulatedMs = 0;
    state.discipline.resting = false;
    forceSaveState();
    renderDiscipline();
    renderDashboard();
  });
  document.querySelector("#resetDiscipline").addEventListener("click", () => {
    if (confirm("Reset the current streak without deleting saved progress history?")) {
      state.discipline.start = "";
      state.discipline.accumulatedMs = 0;
      state.discipline.resting = false;
      forceSaveState();
      renderDiscipline();
      renderDashboard();
    }
  });
  document.querySelector("#addTriggerNote").addEventListener("click", () => {
    state.discipline.triggers.push({ text: "Trigger and replacement action", done: false });
    saveState();
    renderDiscipline();
  });
  document.querySelector("#addHealthChecklist").addEventListener("click", () => {
    state.health.checklist.push({ text: "New health habit", done: false });
    saveState();
    renderHealth();
  });
  document.querySelector("#startSleep").addEventListener("click", startSleep);
  document.querySelector("#stopSleep").addEventListener("click", stopSleep);
  document.querySelector("#saveManualSleep")?.addEventListener("click", saveManualSleepEntry);
  document.querySelector("#addFavoriteCrypto")?.addEventListener("click", addFavoriteCrypto);
  document.querySelector("#nutritionWaterMinus")?.addEventListener("click", () => {
    state.nutritionTracker.water = Math.max(0, Number(state.nutritionTracker.water || 0) - 1);
    forceSaveState();
    renderNutritionPlan();
  });
  document.querySelector("#nutritionWaterPlus")?.addEventListener("click", () => {
    state.nutritionTracker.water = Number(state.nutritionTracker.water || 0) + 1;
    forceSaveState();
    renderNutritionPlan();
  });
  document.querySelector("#nutritionProtein")?.addEventListener("input", (event) => {
    state.nutritionTracker.protein = event.target.value;
    saveState();
  });
  document.querySelector("#nutritionFoodLog")?.addEventListener("input", (event) => {
    state.nutritionTracker.foodLog = event.target.value;
    saveState();
  });
  document.querySelector("#addLearningSite").addEventListener("click", () => {
    state.learningSites.push({ title: "New site", url: "https://", note: "", locked: false });
    saveState();
    renderLearningSites();
    setResourceTab("custom");
  });
  document.querySelectorAll(".resource-tab").forEach((button) => {
    button.addEventListener("click", () => setResourceTab(button.dataset.resourceTab));
  });
  document.querySelector("#loadPrayerTimes").addEventListener("click", loadPrayerTimes);
  document.querySelector("#enableAdhanAudio")?.addEventListener("click", () => {
    state.adhanSettings.enabled = !state.adhanSettings.enabled;
    forceSaveState();
    renderAdhan();
    if (state.adhanSettings.enabled) playAdhan("");
    else stopAdhanAudio();
  });
  document.querySelector("#testAdhanAudio")?.addEventListener("click", () => playAdhan("Fajr"));
  document.querySelector("#stopAdhanAudio")?.addEventListener("click", stopAdhanAudio);
  document.querySelector("#adhanFajrLine")?.addEventListener("change", (event) => {
    state.adhanSettings.includeFajrLine = event.target.checked;
    forceSaveState();
  });
  document.querySelector("#dismissAdhanPopup")?.addEventListener("click", dismissAdhanPopup);
  document.querySelector("#replayAdhan")?.addEventListener("click", () => {
    playAdhan(document.querySelector("#adhanPopup")?.dataset.prayer || "");
  });
  document.querySelector("#openAdhanCenter")?.addEventListener("click", () => {
    dismissAdhanPopup();
    openPanel("adhan", "Adhan Center");
  });
  document.querySelector("#useDigitalClock")?.addEventListener("click", () => {
    state.homeClockMode = "digital";
    forceSaveState();
    updateHomeClockMode();
  });
  document.querySelector("#useAnalogClock")?.addEventListener("click", () => {
    state.homeClockMode = "analog";
    forceSaveState();
    updateHomeClockMode();
  });
  document.querySelector("#use12HourClock")?.addEventListener("click", () => {
    state.clockHourFormat = "12";
    forceSaveState();
    updateClockFormatButtons();
    updateLiveClock();
  });
  document.querySelector("#use24HourClock")?.addEventListener("click", () => {
    state.clockHourFormat = "24";
    forceSaveState();
    updateClockFormatButtons();
    updateLiveClock();
  });
  document.querySelector("#worldClockSearch")?.addEventListener("input", (event) => {
    applyWorldClockSuggestion(event.target.value, true);
    renderWorldClocks();
  });
  document.querySelector("#addWorldClock")?.addEventListener("click", () => {
    const searchValue = document.querySelector("#worldClockSearch")?.value.trim() || "";
    const suggestion = applyWorldClockSuggestion(searchValue);
    const zone = document.querySelector("#worldClockZone")?.value.trim() || suggestion?.zone || "";
    const label = document.querySelector("#worldClockLabel")?.value.trim()
      || suggestion?.label
      || zone?.split("/").pop()?.replaceAll("_", " ")
      || zone;
    if (!zone || state.worldClocks.some((clock) => clock.zone === zone)) return;
    try {
      new Intl.DateTimeFormat(undefined, { timeZone: zone }).format();
    } catch {
      alert("Choose a valid time zone from the city/time-zone suggestions.");
      return;
    }
    state.worldClocks.push({ label, country: document.querySelector("#worldClockCountry")?.value.trim() || suggestion?.country || "", zone });
    document.querySelector("#worldClockSearch").value = "";
    document.querySelector("#worldClockLabel").value = "";
    document.querySelector("#worldClockCountry").value = "";
    document.querySelector("#worldClockZone").value = "";
    forceSaveState();
    renderWorldClocks();
  });
  document.querySelector("#refreshRamadanTimes")?.addEventListener("click", loadPrayerTimes);
  document.querySelector("#markJummahComplete")?.addEventListener("click", () => {
    state.jummah = state.jummah || defaultState().jummah;
    const existing = state.jummah.history.find((item) => item.date === todayKey());
    if (!existing) {
      state.jummah.history.unshift({
        date: todayKey(),
        mosque: state.jummah.mosque || "",
        time: state.jummah.time || "",
        entryTime: state.jummah.entryTime || "",
        startTime: state.jummah.startTime || "",
        endTime: state.jummah.endTime || "",
        notes: state.jummah.notes || ""
      });
    } else {
      Object.assign(existing, {
        mosque: state.jummah.mosque || existing.mosque || "",
        time: state.jummah.time || existing.time || "",
        entryTime: state.jummah.entryTime || existing.entryTime || "",
        startTime: state.jummah.startTime || existing.startTime || "",
        endTime: state.jummah.endTime || existing.endTime || "",
        notes: state.jummah.notes || existing.notes || ""
      });
    }
    state.jummah.checklist = state.jummah.checklist.map((item) => ({ ...item, done: true }));
    saveState();
    renderJummah();
  });
  document.querySelector("#saveJummahEntry")?.addEventListener("click", saveJummahEntry);
  document.querySelector("#deleteJummahEntry")?.addEventListener("click", () => deleteJummahEntry(todayKey()));
  document.querySelector("#clearHistory").addEventListener("click", () => {
    if (confirm("Clear saved history copies?")) {
      state.history = [];
      forceSaveState();
      renderHistory();
    }
  });
  document.querySelector("#addCustomLink").addEventListener("click", () => {
    state.customLinks.push({ title: "New link", url: "https://" });
    saveState();
    renderLife();
  });
  document.querySelectorAll(".theme-scene").forEach((button) => {
    button.addEventListener("click", () => {
      state.backgroundScene = button.dataset.scene;
      applyTheme();
      saveState();
    });
  });
  document.querySelector("#addMoneyRow").addEventListener("click", () => {
    state.money.push({ date: activeDate, type: "Expense", category: "", amount: "", note: "" });
    saveState();
    renderMoney();
  });
  const addSavingsGoal = () => {
    state.savings.goals.push({
      id: savingsId(),
      name: "New Savings Goal",
      target: "",
      current: "",
      deadline: "",
      priority: "Growth",
      color: "#21d9b5"
    });
    saveState();
    renderSavingsHub();
  };
  document.querySelector("#addSavingsGoal")?.addEventListener("click", addSavingsGoal);
  document.querySelector("#addSavingsGoalInline")?.addEventListener("click", addSavingsGoal);
  document.querySelector("#addSavingsDeposit")?.addEventListener("click", () => {
    state.savings.deposits.unshift({
      id: savingsId(),
      date: activeDate,
      goalId: state.savings.goals[0]?.id || "",
      type: "Deposit",
      amount: "",
      note: ""
    });
    saveState();
    renderSavingsHub();
  });
  document.querySelector("#addSavingsBucket")?.addEventListener("click", () => {
    state.savings.buckets.push({ name: "New Savings Bucket", planned: "" });
    saveState();
    renderSavingsHub();
  });
  document.querySelector("#addSavingsStrategy")?.addEventListener("click", () => {
    state.savings.strategy.push({ text: "New savings rule", done: false });
    saveState();
    renderSavingsHub();
  });
  document.querySelector("#runFinanceCalc")?.addEventListener("click", () => {
    calculateFinance();
    saveState();
  });
  document.querySelector("#runDebtCalc")?.addEventListener("click", () => {
    calculateDebtPayoff();
    saveState();
  });
  document.querySelector("#runSavingsCalc")?.addEventListener("click", () => {
    calculateSavingsTarget();
    saveState();
  });
  document.querySelector("#runPayoffSuite")?.addEventListener("click", () => {
    calculatePayoffSuite();
    saveState();
  });
  document.querySelector("#runLoanSuite")?.addEventListener("click", () => {
    calculateLoanSuite();
    saveState();
  });
  document.querySelector("#runCurveballCalc")?.addEventListener("click", () => {
    calculateCurveball();
    saveState();
  });
  document.querySelector("#addPayoffDebt")?.addEventListener("click", () => {
    state.payoffDebts = Array.isArray(state.payoffDebts) ? state.payoffDebts : [];
    state.payoffDebts.push({ name: "New debt", balance: "", apr: "", minimum: "", extra: "", strategy: "Snowball", note: "" });
    saveState();
    renderPayoffDatasheet();
    calculatePayoffSuite();
  });
  document.querySelector("#refreshStockExchange")?.addEventListener("click", async () => {
    await Promise.allSettled([refreshLiveStocks(), refreshCryptoPrices()]);
    renderMarketWidgets();
  });
  document.querySelectorAll("[data-market-view]").forEach((button) => {
    button.addEventListener("click", () => {
      state.marketSection = button.dataset.marketView;
      forceSaveState();
      renderMarketWorkspaceTabs();
    });
  });
  document.querySelector("#loadMarketChart")?.addEventListener("click", () => {
    state.marketChartInterval = document.querySelector("#marketChartInterval")?.value || "D";
    loadMarketSymbol(document.querySelector("#marketChartSymbol")?.value);
  });
  document.querySelector("#marketChartInterval")?.addEventListener("change", (event) => {
    state.marketChartInterval = event.target.value;
    forceSaveState();
    document.querySelector("#tradingViewChart")?.removeAttribute("data-widget-signature");
    renderMarketWidgets();
  });
  document.querySelectorAll("[data-market-symbol]").forEach((button) => {
    button.addEventListener("click", () => loadMarketSymbol(button.dataset.marketSymbol));
  });
  document.querySelector("#addMarketWatchlist")?.addEventListener("click", () => {
    const type = document.querySelector("#watchlistType")?.value || "Stock";
    const symbol = normalizeTradingViewSymbol(document.querySelector("#watchlistSymbol")?.value, type);
    if (!symbol) return;
    state.marketWatchlist = state.marketWatchlist || [];
    if (!state.marketWatchlist.some((item) => item.symbol === symbol)) {
      state.marketWatchlist.push({
        symbol,
        label: document.querySelector("#watchlistLabel")?.value.trim() || symbol,
        type
      });
    }
    document.querySelector("#watchlistSymbol").value = "";
    document.querySelector("#watchlistLabel").value = "";
    forceSaveState();
    renderMarketWatchlist();
  });
  document.querySelector("#addPortfolioPosition")?.addEventListener("click", () => {
    const type = document.querySelector("#portfolioType")?.value || "Stock";
    const symbol = normalizeTradingViewSymbol(document.querySelector("#portfolioSymbol")?.value, type);
    if (!symbol) return;
    state.marketPortfolio = state.marketPortfolio || [];
    state.marketPortfolio.unshift({
      symbol,
      type,
      quantity: document.querySelector("#portfolioQuantity")?.value || "",
      averageCost: document.querySelector("#portfolioAverageCost")?.value || "",
      currentPrice: document.querySelector("#portfolioCurrentPrice")?.value || "",
      target: document.querySelector("#portfolioTarget")?.value || "",
      stop: document.querySelector("#portfolioStop")?.value || "",
      thesis: document.querySelector("#portfolioThesis")?.value.trim() || "",
      createdAt: new Date().toISOString()
    });
    ["portfolioSymbol", "portfolioQuantity", "portfolioAverageCost", "portfolioCurrentPrice", "portfolioTarget", "portfolioStop", "portfolioThesis"].forEach((id) => {
      const field = document.querySelector(`#${id}`);
      if (field) field.value = "";
    });
    forceSaveState();
    renderMarketPortfolio();
  });
  document.querySelector("#calculateTradePlan")?.addEventListener("click", calculateTradePlan);
  const addBillRecord = () => {
    state.bills.push({ paid: false, name: "New bill", amount: "", due: "", category: "", note: "" });
    saveState();
    renderBills();
  };
  document.querySelector("#addBill")?.addEventListener("click", addBillRecord);
  document.querySelector("#addBillLedger")?.addEventListener("click", addBillRecord);
  document.querySelector("#billSearch")?.addEventListener("input", (event) => {
    billViewState.search = event.target.value;
    renderBills();
    const field = document.querySelector("#billSearch");
    if (field) {
      field.focus();
      field.setSelectionRange(field.value.length, field.value.length);
    }
  });
  document.querySelector("#billStatusFilter")?.addEventListener("change", (event) => {
    billViewState.filter = event.target.value;
    renderBills();
  });
  document.querySelector("#billSort")?.addEventListener("change", (event) => {
    billViewState.sort = event.target.value;
    renderBills();
  });
  document.querySelector("#addBillChecklist").addEventListener("click", () => {
    state.billChecklist.push({ text: "New bill step", done: false });
    saveState();
    renderBills();
  });
  document.querySelector("#openGoogleCalendar").addEventListener("click", () => {
    window.open("https://calendar.google.com/calendar/u/0/r", "_blank", "noopener,noreferrer");
  });
  document.querySelector("#createCalendarLink").addEventListener("click", () => {
    const url = buildCalendarLink();
    if (saveCalendarEvent()) {
      renderCalendar();
      renderDashboard();
      window.open(url, "_blank", "noopener,noreferrer");
    }
  });
  document.querySelector("#calendarMonthPrev")?.addEventListener("click", () => {
    state.calendarMonthOffset = Number(state.calendarMonthOffset || 0) - 1;
    saveState();
    renderCalendarMonth();
  });
  document.querySelector("#calendarMonthNext")?.addEventListener("click", () => {
    state.calendarMonthOffset = Number(state.calendarMonthOffset || 0) + 1;
    saveState();
    renderCalendarMonth();
  });
  document.querySelector("#calendarMonthToday")?.addEventListener("click", () => {
    state.calendarMonthOffset = 0;
    activeDate = todayKey();
    state.activeDate = activeDate;
    saveState();
    renderCalendarMonth();
  });
  document.querySelector("#uploadGithubFile").addEventListener("click", uploadGithubFile);
  document.querySelector("#addClass").addEventListener("click", () => {
    state.classes.push(defaultClassItem());
    saveState();
    renderSchool();
    renderStudy();
  });
  document.querySelector("#addAssignment").addEventListener("click", () => {
    state.assignments.push({ title: "New assignment", type: "Assignment", className: "", due: "", priority: "Medium", status: "Not started", note: "" });
    saveState();
    renderSchool();
    renderStudy();
  });
  document.querySelector("#addClassFromStudy")?.addEventListener("click", () => {
    state.classes.push(defaultClassItem());
    saveState();
    renderSchool();
    renderStudy();
    renderDashboard();
  });
  document.querySelector("#addAssignmentFromStudy")?.addEventListener("click", () => {
    state.assignments.push({ title: "New assignment", type: "Assignment", className: "", due: "", priority: "Medium", status: "Not started", note: "" });
    saveState();
    renderSchool();
    renderStudy();
    renderDashboard();
  });
  document.querySelector("#addImportantDateFromStudy")?.addEventListener("click", () => {
    if (!state.importantDates) state.importantDates = [];
    const start = new Date();
    start.setHours(start.getHours() + 24, 0, 0, 0);
    state.importantDates.push({ title: "Important date", className: "", when: start.toISOString().slice(0, 16), type: "Exam", status: "Upcoming", note: "" });
    saveState();
    renderStudy();
    renderDashboard();
  });
  document.querySelector("#addTaskFromStudy")?.addEventListener("click", () => {
    state.tasks.push({ title: "New school task", status: "Backlog", priority: "Medium", due: activeDate, note: "", category: "School" });
    saveState();
    renderTasks();
    renderStudy();
    renderDashboard();
  });
  document.querySelector("#addStudyBlock").addEventListener("click", () => {
    const start = new Date();
    const end = new Date(start.getTime() + 50 * 60000);
    state.studyBlocks.push({ subject: "", topic: "", start: start.toISOString().slice(0, 16), end: end.toISOString().slice(0, 16), goal: "", method: "Pomodoro", status: "Planned" });
    saveState();
    renderStudy();
  });
  document.querySelector("#addClassFromDetail")?.addEventListener("click", () => {
    state.classes.push(defaultClassItem());
    saveState();
    renderSchool();
    renderStudy();
  });
  document.querySelector("#addAssignmentFromDetail")?.addEventListener("click", () => {
    state.assignments.push({ title: "New assignment", type: "Assignment", className: "", due: "", priority: "Medium", status: "Not started", note: "" });
    saveState();
    renderSchool();
    renderStudy();
  });
  document.querySelector("#addDateFromDetail")?.addEventListener("click", () => {
    state.importantDates.push({ title: "Important date", className: "", when: "", type: "Exam", status: "Upcoming", note: "" });
    saveState();
    renderStudy();
  });
  document.querySelector("#addSchoolTaskFromDetail")?.addEventListener("click", () => {
    state.tasks.push({ title: "New school task", status: "Backlog", priority: "Medium", due: activeDate, note: "", category: "School" });
    saveState();
    renderTasks();
    renderStudy();
    renderDashboard();
  });
  document.querySelector("#openAcademicSemester")?.addEventListener("click", () => {
    openPanel("academicSemester", "Academic Semester Info");
  });
  const semesterFields = {
    semesterTerm: "term",
    semesterAcademicYear: "academicYear",
    semesterSchool: "school",
    semesterProgram: "program",
    semesterStartDate: "startDate",
    semesterEndDate: "endDate",
    semesterCredits: "credits",
    semesterGpaGoal: "gpaGoal",
    semesterAdvisor: "advisor",
    semesterStatus: "status",
    semesterNotes: "notes"
  };
  Object.entries(semesterFields).forEach(([id, key]) => {
    document.querySelector(`#${id}`)?.addEventListener("input", (event) => {
      state.academicSemester = { ...defaultState().academicSemester, ...(state.academicSemester || {}), [key]: event.target.value };
      saveState();
      renderAcademicSemesterSummary();
      const status = document.querySelector("#semesterSaveStatus");
      if (status) status.textContent = state.autoSave ? "Changes autosaved in this browser." : "Unsaved changes. Select Save Semester to store them.";
    });
  });
  document.querySelector("#saveAcademicSemester")?.addEventListener("click", () => {
    forceSaveState();
    renderAcademicSemester();
    const status = document.querySelector("#semesterSaveStatus");
    if (status) status.textContent = `Semester saved ${new Date().toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })}.`;
  });
  document.querySelector("#addSemesterAttendance")?.addEventListener("click", () => {
    const className = document.querySelector("#semesterAttendanceClass")?.value || "General class";
    const date = document.querySelector("#semesterAttendanceDate")?.value || activeDate;
    const status = document.querySelector("#semesterAttendanceStatus")?.value || "Present";
    const noteInput = document.querySelector("#semesterAttendanceNote");
    state.attendanceRecords.push({
      id: `attendance-${Date.now()}`,
      className,
      date,
      status,
      note: noteInput?.value.trim() || "",
      savedAt: new Date().toISOString()
    });
    if (noteInput) noteInput.value = "";
    forceSaveState();
    renderAcademicSemester();
  });
  document.querySelectorAll(".dev-track-tab").forEach((button) => {
    button.addEventListener("click", () => {
      state.devLessonTrack = button.dataset.devTrack;
      state.devLessonIndex = 0;
      saveState();
      renderDevLessonCoach();
    });
  });
  document.querySelector("#devLessonRefresh")?.addEventListener("click", () => {
    state.devLessonIndex = (Number(state.devLessonIndex) || 0) + 1;
    saveState();
    renderDevLessonCoach();
  });
  document.querySelector("#addWorkout").addEventListener("click", () => {
    const todayName = new Date(`${activeDate}T12:00:00`).toLocaleDateString(undefined, { weekday: "long" });
    const planned = fixedWorkoutProgram.find((session) => state.workoutProgramDays[session.id] === todayName) || fixedWorkoutProgram[0];
    state.workouts.unshift({
      text: planned.title,
      program: planned.title,
      exercise: "",
      sets: "",
      reps: "",
      weight: "",
      note: "",
      date: activeDate,
      startedAt: "",
      endedAt: "",
      done: false,
      entryType: "timer"
    });
    forceSaveState();
    renderWorkout();
  });
  document.querySelector("#endActiveWorkout")?.addEventListener("click", () => {
    const active = state.workouts.find((item) => item.startedAt && !item.endedAt);
    if (!active) {
      alert("No active workout is running. Start a workout from the log first.");
      return;
    }
    active.endedAt = new Date().toISOString();
    active.done = true;
    active.savedAt = active.endedAt;
    active.date = active.date || active.endedAt.slice(0, 10);
    forceSaveState();
    renderWorkout();
    renderDashboard();
  });
  document.querySelector("#saveManualWorkout")?.addEventListener("click", saveManualWorkout);
  document.querySelector("#addRoadmapItem").addEventListener("click", () => {
    state.roadmap.push({ phase: "New", text: "", status: "Planned" });
    saveState();
    renderRoadmap();
  });
  document.querySelector("#fileUpload").addEventListener("change", handleFiles);
  document.querySelector("#exportData").addEventListener("click", exportData);
  document.querySelector("#importData").addEventListener("change", importData);
  document.querySelector("#globalProfileButton")?.addEventListener("click", () => openPanel("profile", "Profile Command"));
  document.querySelector("#globalSettingsButton")?.addEventListener("click", () => openPanel("settings", "Settings"));
  document.querySelector("#profileExportData")?.addEventListener("click", saveHomeProfilePdf);
  document.querySelector("#profileScreenshot")?.addEventListener("click", exportHomeProfileImage);
  document.querySelector("#profileImportData")?.addEventListener("change", importProfileHomeData);
  document.querySelector("#homeCalendarPrev")?.addEventListener("click", () => {
    state.homeCalendarOffset = Number(state.homeCalendarOffset || 0) - 1;
    forceSaveState();
    renderHomeMonthCalendar();
  });
  document.querySelector("#homeCalendarNext")?.addEventListener("click", () => {
    state.homeCalendarOffset = Number(state.homeCalendarOffset || 0) + 1;
    forceSaveState();
    renderHomeMonthCalendar();
  });
  document.querySelector("#resetVisibleLayout")?.addEventListener("click", () => {
    if (!confirm("Reset the visible Home and Profile layouts? Your profile information and all saved records will remain unchanged.")) return;
    state.smartLayout = defaultState().smartLayout;
    state.homeCardSettings = defaultHomeCards.map((card) => ({ ...card }));
    state.homeCardCollapsed = {};
    delete state.panelLayouts.dashboard;
    delete state.panelLayouts.profile;
    forceSaveState();
    renderAll();
  });
  document.querySelector("#profileAvatarUpload")?.addEventListener("change", (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      state.profile.avatar = reader.result;
      forceSaveState();
      renderProfileIdentity();
      renderDashboard();
    };
    reader.readAsDataURL(file);
  });
  document.querySelector("#removeProfileAvatar")?.addEventListener("click", () => {
    state.profile.avatar = "";
    forceSaveState();
    renderProfileIdentity();
    renderDashboard();
  });
  [
    ["profileAvatarSize", "avatarsize"],
    ["profileAvatarZoom", "avatarzoom"],
    ["profileAvatarX", "avatarx"],
    ["profileAvatarY", "avatary"]
  ].forEach(([id, key]) => {
    document.querySelector(`#${id}`)?.addEventListener("input", (event) => {
      state.profile[key] = Number(event.target.value);
      const suffix = key === "avatarsize" ? " px" : "%";
      const output = document.querySelector(`#${id}Value`);
      if (output) output.textContent = `${event.target.value}${suffix}`;
      renderProfileIdentity();
      saveState();
    });
  });
  document.querySelectorAll(".profile-identity").forEach((inputNode) => {
    inputNode.addEventListener("change", () => {
      state.profile.identities = [...document.querySelectorAll(".profile-identity:checked")].map((item) => item.value);
      forceSaveState();
      renderDashboard();
    });
  });
  document.querySelector("#resetAll").addEventListener("click", () => {
    if (confirm("Reset all saved data?")) {
      localStorage.removeItem(STORAGE_KEY);
      state = defaultState();
      activeDate = todayKey();
      renderAll();
    }
  });
  ["bgColor", "cardColor", "textColor", "accentColor"].forEach((id) => {
    document.querySelector(`#${id}`)?.addEventListener("input", (event) => {
      const key = id === "bgColor" ? "bg" : id.replace("Color", "");
      state.theme[key] = event.target.value;
      applyThemeToAllPages(state.theme);
      applyTheme();
      forceSaveState();
    });
  });
  document.querySelector("#applyThemeEverywhere")?.addEventListener("click", () => {
    applyThemeToAllPages(state.theme);
    applyTheme();
    forceSaveState();
  });
  document.querySelector("#brightnessPage")?.addEventListener("change", (event) => {
    state.brightnessEditorPage = event.target.value;
    forceSaveState();
    renderBrightnessSettings();
  });
  document.querySelector("#brightnessControl")?.addEventListener("input", (event) => {
    const output = document.querySelector("#brightnessOutput");
    if (output) output.textContent = `${event.target.value}%`;
  });
  document.querySelectorAll("[data-brightness]").forEach((button) => {
    button.addEventListener("click", () => {
      const slider = document.querySelector("#brightnessControl");
      if (slider) slider.value = button.dataset.brightness;
      const output = document.querySelector("#brightnessOutput");
      if (output) output.textContent = `${button.dataset.brightness}%`;
    });
  });
  document.querySelector("#savePageBrightness")?.addEventListener("click", () => {
    applyBrightnessValue(document.querySelector("#brightnessControl")?.value, false);
  });
  document.querySelector("#syncBrightnessAll")?.addEventListener("click", () => {
    applyBrightnessValue(document.querySelector("#brightnessControl")?.value, true);
  });
  document.querySelector("#resetBrightness")?.addEventListener("click", () => {
    const selected = state.brightnessEditorPage || "dashboard";
    state.pageBrightness = state.pageBrightness || {};
    delete state.pageBrightness[selected];
    if (!Object.keys(state.pageBrightness).length) state.globalBrightness = 100;
    forceSaveState();
    applyTheme();
    renderBrightnessSettings();
    const status = document.querySelector("#brightnessStatus");
    if (status) status.textContent = `${pageTitle(selected)} brightness reset to the default.`;
  });
  const pageColorFields = {
    quickBackground: "bg",
    pageCardColor: "card",
    pageButtonColor: "button",
    pageNavColor: "nav",
    pageTextColor: "text",
    pageAccentColor: "accent"
  };
  Object.entries(pageColorFields).forEach(([id, key]) => {
    document.querySelector(`#${id}`)?.addEventListener("input", (event) => {
      state.pageStyles = state.pageStyles || {};
      state.pageStyles[currentPage] = { ...(state.pageStyles[currentPage] || {}), [key]: event.target.value };
      delete state.pageStyles[currentPage].presetId;
      if (key === "bg") {
        state.pageColors[currentPage] = event.target.value;
        state.backgroundScene = "plain";
      }
      const status = document.querySelector("#pageAppearanceStatus");
      if (status) status.textContent = "Changes currently apply only to this page.";
      applyTheme();
      forceSaveState();
    });
  });
  [
    ["menuBgColor", "bg"],
    ["menuCardColor", "card"],
    ["menuTextColor", "text"],
    ["menuActiveColor", "active"]
  ].forEach(([id, key]) => {
    document.querySelector(`#${id}`).addEventListener("input", (event) => {
      state.menuSettings[key] = event.target.value;
      applyTheme();
      saveState();
    });
  });
  document.querySelector("#resetMenuSettings").addEventListener("click", () => {
    state.menuSettings = defaultState().menuSettings;
    saveState();
    renderMenuSettings();
    updatePageLabels();
    applyTheme();
  });
  document.querySelector("#resetHomeCards").addEventListener("click", () => {
    state.homeCardSettings = defaultHomeCards.map((card) => ({ ...card }));
    saveState();
    renderHomeCardSettings();
    updateHomeCardSettings();
  });
  document.querySelector("#resetHomeDock")?.addEventListener("click", () => {
    state.homeDockSettings = defaultHomeDock.map((item) => ({ ...item }));
    state.homeDockVisible = true;
    forceSaveState();
    updateHomeDock();
    renderHomeDockSettings();
  });
  document.querySelector("#showHomeDockToggle")?.addEventListener("change", (event) => {
    state.homeDockVisible = event.target.checked;
    forceSaveState();
    updateHomeDock();
  });
  document.querySelector("#hideHomeDock")?.addEventListener("click", () => {
    state.homeDockVisible = false;
    forceSaveState();
    updateHomeDock();
  });
  document.querySelector("#showHomeDock")?.addEventListener("click", () => {
    state.homeDockVisible = true;
    forceSaveState();
    updateHomeDock();
  });
  document.querySelector("#homeBackgroundColor")?.addEventListener("input", (event) => {
    state.pageColors.dashboard = event.target.value;
    applyTheme();
    saveState();
  });
  document.querySelector("#settingsFocusColor")?.addEventListener("input", (event) => {
    state.homeFocusColor = event.target.value;
    applyTheme();
    saveState();
  });
  document.querySelector("#softMode").addEventListener("click", () => setPreset("calm"));
  document.querySelector("#focusMode").addEventListener("click", () => setPreset("midnight"));
  document.querySelectorAll(".preset").forEach((button) => button.addEventListener("click", () => setPreset(button.dataset.mode)));
}

function openFileDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(FILE_DB, 1);
    request.onupgradeneeded = () => request.result.createObjectStore("files");
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function putFileData(id, data) {
  const db = await openFileDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("files", "readwrite");
    tx.objectStore("files").put(data, id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

async function getFileData(id) {
  const db = await openFileDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("files", "readonly");
    const request = tx.objectStore("files").get(id);
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function deleteFileData(id) {
  const db = await openFileDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction("files", "readwrite");
    tx.objectStore("files").delete(id);
    tx.oncomplete = resolve;
    tx.onerror = () => reject(tx.error);
  });
}

function handleFiles(event) {
  [...event.target.files].forEach((file) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const id = `${Date.now()}-${crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(16).slice(2)}`;
      await putFileData(id, reader.result);
      state.files.push({ id, name: file.name, type: file.type || "application/octet-stream", added: new Date().toISOString() });
      saveState();
      renderFiles();
    };
    reader.readAsDataURL(file);
  });
  event.target.value = "";
}

function setPreset(name) {
  state.theme = { ...presets[name] };
  applyThemeToAllPages(state.theme);
  applyTheme();
  forceSaveState();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `fahimos-2-${todayKey()}.json`;
  link.click();
  URL.revokeObjectURL(link.href);
}

function importData(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    state = { ...defaultState(), ...JSON.parse(reader.result) };
    state.dailyArchives = state.dailyArchives && typeof state.dailyArchives === "object" ? state.dailyArchives : {};
    activeDate = todayKey();
    ensureDailyEntry(activeDate);
    currentPage = "dashboard";
    pageStack = [];
    forceSaveState();
    openPanel("dashboard", pageTitle("dashboard", "Home"), document.querySelector("#dayTab"), { skipStack: true });
  };
  reader.readAsText(file);
}

function importProfileHomeData(event) {
  const file = event.target.files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => {
    try {
      if (file.type.startsWith("image/")) {
        state.profile.avatar = String(reader.result || "");
      } else {
        const imported = JSON.parse(String(reader.result || "{}"));
        const source = imported.state || imported;
        if (source.profile) state.profile = { ...defaultState().profile, ...state.profile, ...source.profile };
        if (Array.isArray(source.homeCardSettings)) state.homeCardSettings = source.homeCardSettings;
        if (source.homeCardCollapsed && typeof source.homeCardCollapsed === "object") state.homeCardCollapsed = source.homeCardCollapsed;
        if (source.panelLayouts?.dashboard) state.panelLayouts.dashboard = source.panelLayouts.dashboard;
        if (source.panelLayouts?.profile) state.panelLayouts.profile = source.panelLayouts.profile;
      }
      forceSaveState();
      renderAll();
    } catch {
      alert("This file could not be imported. Choose a profile image or a valid FahimOS backup.");
    } finally {
      event.target.value = "";
    }
  };
  if (file.type.startsWith("image/")) reader.readAsDataURL(file);
  else reader.readAsText(file);
}

function smartTileIcon(title = "", pageId = "") {
  const text = `${pageId} ${title}`.toLowerCase();
  if (/prayer|salah|faith|quran|jummah|islamic|adhan/.test(text)) return "\u263d";
  if (/bill|money|debt|saving|finance|payment/.test(text)) return "$";
  if (/workout|training|exercise|fitness/.test(text)) return "W";
  if (/sleep|health|recovery|water|food|energy/.test(text)) return "+";
  if (/class|school|assignment|exam|semester|study|learning|career/.test(text)) return "\u270e";
  if (/note|journal|brain/.test(text)) return "N";
  if (/calendar|date|schedule/.test(text)) return "\u25a6";
  if (/task|checklist|reminder/.test(text)) return "\u2713";
  if (/profile|account|identity|goal/.test(text)) return "P";
  if (/theme|background|layout|setting/.test(text)) return "\u2699";
  return "\u25c8";
}

function smartTileCategory(title = "", pageId = "") {
  const text = `${pageId} ${title}`.toLowerCase();
  if (/prayer|salah|faith|quran|jummah|islamic|adhan/.test(text)) return "Faith";
  if (/bill|money|debt|saving|finance|payment/.test(text)) return "Money";
  if (/workout|training|exercise/.test(text)) return "Workout";
  if (/sleep|health|recovery|water|food|energy|discipline/.test(text)) return "Health";
  if (/class|school|assignment|exam|semester|study|learning|career/.test(text)) return "School";
  return "General";
}

function smartTileTargets(panel) {
  return [];
}

function smartTileTitle(tile, index) {
  const classTitles = [
    ["school-command-priority", "School Command"],
    ["study-launch-section", "Learning & Career"],
    ["faith-command-hero", "Adhan & Prayer Times"],
    ["faith-category-grid", "Faith Foundation & Prayer Library"],
    ["faith-prayer-command", "Prayer Tracking System"],
    ["faith-feature-launchers", "Islamic Knowledge"],
    ["faith-dua-center", "Daily Du'a"],
    ["health-command-hero", "Health & Execution Insights"],
    ["health-command-layout", "Body, Mind & Discipline"],
    ["health-bottom-widgets", "Nutrition & Daily Wellness"],
    ["workout-command-grid", "Workout Command"],
    ["money-command-layout", "Money Command"]
  ];
  const classTitle = classTitles.find(([className]) => tile.classList.contains(className))?.[1];
  return tile.dataset.smartTitle
    || tile.querySelector(":scope > .smart-tile-head strong")?.textContent?.trim()
    || classTitle
    || tile.querySelector(":scope > h2, :scope > h3, :scope > header h3, :scope .suite-heading h3, :scope .card-heading-row h3, :scope .section-head h2")?.textContent?.trim()
    || `Section ${index + 1}`;
}

function smartTileSummary(tile, title) {
  if (tile.dataset.smartSummary) return tile.dataset.smartSummary;
  const text = tile.querySelector(":scope > p, :scope > small, :scope header small, :scope .muted")?.textContent?.trim();
  return text && text !== title ? text.slice(0, 110) : `Open ${title} for details and actions.`;
}

function setSmartTileCollapsed(tile, collapsed, persist = true) {
  const body = tile.querySelector(":scope > .smart-tile-body");
  const toggle = tile.querySelector(":scope > .smart-tile-head .smart-tile-toggle");
  tile.classList.toggle("is-smart-collapsed", collapsed);
  tile.setAttribute("aria-expanded", String(!collapsed));
  if (body) body.hidden = collapsed;
  if (toggle) {
    toggle.textContent = collapsed ? "+" : "\u2212";
    toggle.title = collapsed ? "Expand section" : "Collapse section";
    toggle.setAttribute("aria-expanded", String(!collapsed));
  }
  if (persist && tile.dataset.smartKey) {
    state.smartLayout.collapsed[tile.dataset.smartKey] = collapsed;
    forceSaveState();
  }
}

function enhanceSmartTile(tile, panel, index) {
  const pageId = panel.id || currentPage;
  const title = smartTileTitle(tile, index);
  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || String(index);
  const key = tile.dataset.smartKey || `${pageId}:${slug}:${index}`;
  tile.dataset.smartKey = key;
  tile.dataset.smartCategory = tile.dataset.smartCategory || smartTileCategory(title, pageId);
  tile.classList.add("smart-tile", `smart-tone-${(index % 8) + 1}`);
  if (tile.dataset.smartEnhanced !== "true") {
    const head = document.createElement("div");
    head.className = "smart-tile-head";
    head.innerHTML = `<span class="smart-tile-icon" aria-hidden="true">${smartTileIcon(title, pageId)}</span><span class="smart-tile-copy"><strong>${escapeHtml(title)}</strong><small>${escapeHtml(smartTileSummary(tile, title))}</small></span><span class="smart-tile-status">${escapeHtml(tile.dataset.smartStatus || "Ready")}</span><button class="smart-tile-toggle" type="button" aria-label="Expand or collapse ${escapeHtml(title)}"></button>`;
    const body = document.createElement("div");
    body.className = "smart-tile-body";
    [...tile.children].forEach((child) => body.append(child));
    tile.append(head, body);
    head.querySelector(".smart-tile-toggle").addEventListener("click", (event) => {
      event.stopPropagation();
      setSmartTileCollapsed(tile, !tile.classList.contains("is-smart-collapsed"));
    });
    tile.dataset.smartEnhanced = "true";
  }
  const mode = state.smartLayout.modeByPage[pageId] || (pageId === "dashboard" ? state.profile?.dashboardmode || "compact" : "compact");
  const saved = state.smartLayout.collapsed[key];
  setSmartTileCollapsed(tile, saved === undefined ? mode === "compact" : !!saved, false);
}

function smartFocusMatches(tile, focus) {
  if (!focus || focus === "All") return true;
  const title = tile.querySelector(":scope > .smart-tile-head strong")?.textContent || "";
  return tile.dataset.smartCategory === focus || title === focus;
}

function applySmartPageMode(panel) {
  const mode = state.smartLayout.modeByPage[panel.id] || (panel.id === "dashboard" ? state.profile?.dashboardmode || "compact" : "compact");
  const focus = state.smartLayout.focusByPage[panel.id] || "All";
  panel.classList.toggle("smart-compact-mode", mode === "compact");
  panel.classList.toggle("smart-full-mode", mode === "full");
  smartTileTargets(panel).forEach((tile) => {
    tile.hidden = !smartFocusMatches(tile, focus);
  });
  const toolbar = panel.querySelector(":scope > .smart-page-toolbar, .home-command-main > .smart-page-toolbar");
  toolbar?.querySelectorAll("[data-smart-mode]").forEach((button) => button.classList.toggle("is-active", button.dataset.smartMode === mode));
  const focusSelect = toolbar?.querySelector(".smart-focus-select");
  if (focusSelect) focusSelect.value = [...focusSelect.options].some((option) => option.value === focus) ? focus : "All";
}

function ensureSmartPageToolbar(panel) {
  if (panel.id === "dashboard") return;
  if (!smartTileTargets(panel).length) return;
  if (panel.querySelector(":scope > .smart-page-toolbar, .home-command-main > .smart-page-toolbar")) return;
  const toolbar = document.createElement("div");
  toolbar.className = "smart-page-toolbar";
  toolbar.innerHTML = `<div><span class="smart-toolbar-icon">\u25c8</span><strong>Page View</strong></div><div class="smart-toolbar-actions"><select class="smart-focus-select" aria-label="Focus on one category"><option>All</option></select><button data-smart-mode="compact" type="button">Compact</button><button data-smart-mode="full" type="button">Full</button><button data-smart-action="expand" type="button">Expand All</button><button data-smart-action="collapse" type="button">Collapse All</button></div>`;
  const tiles = smartTileTargets(panel);
  const choices = panel.id === "dashboard" ? ["Faith", "School", "Money", "Health", "Workout"] : [...new Set(tiles.map((tile, index) => smartTileTitle(tile, index)))].slice(0, 20);
  const selectNode = toolbar.querySelector(".smart-focus-select");
  choices.forEach((choice) => selectNode.append(new Option(choice, choice)));
  toolbar.addEventListener("click", (event) => {
    const modeButton = event.target.closest("[data-smart-mode]");
    const actionButton = event.target.closest("[data-smart-action]");
    if (modeButton) {
      state.smartLayout.modeByPage[panel.id] = modeButton.dataset.smartMode;
      if (panel.id === "dashboard") state.profile.dashboardmode = modeButton.dataset.smartMode;
      smartTileTargets(panel).forEach((tile) => setSmartTileCollapsed(tile, modeButton.dataset.smartMode === "compact", false));
      forceSaveState();
      applySmartPageMode(panel);
    }
    if (actionButton) {
      const collapsed = actionButton.dataset.smartAction === "collapse";
      smartTileTargets(panel).forEach((tile) => {
        setSmartTileCollapsed(tile, collapsed, false);
        state.smartLayout.collapsed[tile.dataset.smartKey] = collapsed;
      });
      forceSaveState();
    }
  });
  selectNode.addEventListener("change", () => {
    state.smartLayout.focusByPage[panel.id] = selectNode.value;
    forceSaveState();
    applySmartPageMode(panel);
  });
  if (panel.id === "dashboard") {
    const main = panel.querySelector(".home-command-main");
    main?.querySelector(".home-executive-brief, .today-glance-dashboard")?.before(toolbar);
  } else {
    panel.querySelector(":scope > .section-head")?.after(toolbar);
  }
}

function enhanceSettingsDetails() {
  document.querySelectorAll("#settings details.settings-accordion").forEach((details, index) => {
    const title = details.querySelector("summary span")?.textContent || `Settings ${index + 1}`;
    const key = `settings:details:${title.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    if (state.smartLayout.collapsed[key] !== undefined) details.open = !state.smartLayout.collapsed[key];
    if (details.dataset.smartToggleBound !== "true") {
      details.addEventListener("toggle", () => {
        state.smartLayout.collapsed[key] = !details.open;
        forceSaveState();
      });
      details.dataset.smartToggleBound = "true";
    }
  });
}

function enhanceCommandCollapsibleCards() {
  state.smartLayout = state.smartLayout || defaultState().smartLayout;
  state.smartLayout.collapsed = state.smartLayout.collapsed || {};
  const selectors = [
    "#profile .profile-command-grid > .card",
    "#pageAppearancePanel .customize-section-card"
  ];
  document.querySelectorAll(selectors.join(",")).forEach((card, index) => {
    if (card.dataset.commandCollapseReady === "true") return;
    const heading = card.querySelector(":scope > h3, :scope > .customize-section-title, :scope > .customize-mode-head");
    if (!heading) return;
    const headingText = heading.textContent.trim().replace(/\s+/g, " ") || `Section ${index + 1}`;
    const key = `command-card:${card.closest(".panel, aside")?.id || "customize"}:${headingText.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "command-card-collapse";
    toggle.textContent = state.smartLayout.collapsed[key] ? "+" : "-";
    toggle.setAttribute("aria-label", "Expand or collapse this section");
    toggle.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      state.smartLayout.collapsed[key] = !state.smartLayout.collapsed[key];
      card.classList.toggle("is-command-collapsed", state.smartLayout.collapsed[key]);
      toggle.textContent = state.smartLayout.collapsed[key] ? "+" : "-";
      forceSaveState();
    });
    heading.append(toggle);
    card.classList.add("command-collapsible-card");
    card.classList.toggle("is-command-collapsed", Boolean(state.smartLayout.collapsed[key]));
    card.dataset.commandCollapseReady = "true";
  });
}

function enhanceSmartTileSystem() {
  state.smartLayout = state.smartLayout || defaultState().smartLayout;
  document.querySelectorAll(".panel").forEach((panel) => {
    smartTileTargets(panel).forEach((tile, index) => enhanceSmartTile(tile, panel, index));
    ensureSmartPageToolbar(panel);
    applySmartPageMode(panel);
  });
  enhanceSettingsDetails();
  enhanceCommandCollapsibleCards();
}

function renderAll() {
  placeLifeDataOnHome();
  arrangeMoneyPriorities();
  arrangeHomeDashboard();
  arrangeWorkoutHub();
  arrangeHealthHub();
  arrangeFaithHub();
  renderLifeHubTabs();
  setupDailyDuaPanel();
  document.querySelector("#activeDate").value = activeDate;
  document.querySelector("#dailyNotes").value = day().notes || "";
  const prayerReflection = document.querySelector("#prayerReflection");
  if (prayerReflection) prayerReflection.value = day().prayerReflection || "";
  updateAutoSaveButton();
  updatePageLabels();
  applyTheme();
  updateHeaderHubIdentity(currentPage);
  renderDashboard();
  renderSchedule();
  renderTasks();
  renderTodos();
  renderAlarms();
  renderReminders();
  renderCountdowns();
  renderPrayer();
  renderAdhan();
  renderQuran();
  renderFaith();
  renderIslamicToolkit();
  renderJummah();
  renderRamadan();
  renderSuggestions();
  renderMotivation();
  renderJava();
  renderMoney();
  renderSavingsHub();
  renderStockExchange();
  renderCreditHub();
  renderPayoffDatasheet();
  renderBills();
  renderCalendar();
  renderGithub();
  renderSchool();
  renderStudy();
  renderAcademicSemester();
  renderHealth();
  renderHubNotes();
  renderLife();
  renderHistory();
  renderMenuSettings();
  renderPageHeaderSettings();
  renderBrightnessSettings();
  renderHomeCardSettings();
  renderHomeDockSettings();
  updateHomeDock();
  renderWorkout();
  renderManualWorkout();
  renderWorkoutHistory();
  renderLifeDataDetails();
  renderRoadmap();
  renderFiles();
  renderMaps();
  renderNewsCenter();
  renderEssentialsDoc();
  renderDiscipline();
  renderProfile();
  renderCredentialVault();
  populateWorldClockZones();
  updateClockFormatButtons();
  renderClockWeather();
  renderHomeAskFahimChips();
  renderAskFahimHistory();
  renderAskSuggestions();
  renderAssistantSettings();
  renderNotifications();
  const showStatus = document.querySelector("#showLifeStatusSetting");
  const showWellness = document.querySelector("#showDailyWellnessSetting");
  if (showStatus) showStatus.checked = !state.lifeStatusHidden;
  if (showWellness) showWellness.checked = !state.dailyWellnessHidden;
  applyPageHeader();
  document.querySelectorAll("textarea").forEach(autoGrow);
  ensureInlineSaveButtons();
  renderPanelLayoutControls();
  applyVariedTileColors();
  enhanceSmartTileSystem();
}

initializeDailySession();
bindTabs();
bindStaticControls();
const startupPage = startupPageId();
openPanel(
  startupPage,
  pageTitle(startupPage, startupPage === "dashboard" ? "Home" : undefined),
  document.querySelector(`.tab[data-tab="${startupPage}"]`),
  { skipStack: true }
);
setInterval(tickTimers, 1000);
setInterval(() => refreshMotivationSection("all"), 600000);
setInterval(advanceDailySignal, 45000);
setInterval(renderStudyFutureWidgets, 600000);
setInterval(renderIslamicToolkit, 15 * 60 * 1000);
setInterval(() => {
  refreshLiveWeather();
  refreshLiveNews();
  refreshLiveStocks();
}, 15 * 60 * 1000);
startHeroEmojiStream();
