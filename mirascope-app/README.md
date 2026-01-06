MiraScope is an AI-powered feedback summarization web application that helps you analyze CSV-based user feedback. It automatically extracts sentiment, identifies top themes using TF-IDF, and generates AI-driven insights using Google Gemini. The results are visualized with charts and can be exported as a PDF.

FEATURES
* Upload CSV file containing user feedback.
* Parsing using Papaparse instead of simply using .split(',').
* Sentiment analysis using VADER.
* Themes extraction using TF-IDF(natural).
* AI-generated summary,suggestion and quotes using Google Gemini-2.5-flash.
* Bar Chart & Pie Chart visualisation using chart.js
* Dark mode support.
* Export summary as PDF report.

TECH-STACK

- FRONTED
* React(Vite)
* chart.js
* Papaparse
* html2canvas & jsPDF
* VADER Sentiment

-BACKEND
* Express.js
* TF-IDF(Natural)
* CORS & dotenv
* Google Gemini API

PROJECT STRUCTURE

/frontend
├─ components/
│ ├─ FileUpload.jsx
│ ├─ Summary.jsx
│ ├─ Bar.jsx
│ ├─ Pie.jsx
│ ├─ SentimentAnalysis.js
│ ├─ ExtractThemes.js
│ └─ GetInsights.js
├─ styling/
│ └─ App.css
|- main.jsx
└─ App.jsx

/backend
├─ themes.js
└─ server.js

APPLICATION FLOW

1. Upload CSV File containing headers.
2. This CSV file is parsed using PAPAPARSE.
3. This parsed data with rating goes to VADER for sentiment analysis.
4. And parsed data without ratings goes to TF-IDF for extracting top themes.
5. Now these top is passed through GEMINI API for AI summary,representative quotes and suggested actions.
6. Sentiment data sent to form Bar Chart showing scores.
7. TopThemes data sent to form Pie Chart showing tfidf values for each themes.
8. All these are presented on a page with AI summary and Bar and Pie chart.
9. This Analysis can be exported as PDF report.


BAR-CHART
- shows sentiment distribution (very negative -> very positive).

PIE-CHART
- shows TF-IDF weights of top 5 themes.

DARK MODE 
- Toggle dark mode from the Summary view.It applies styles dynamically without reloading the page.

ABOUT BUTTON
- click on this to know about this.

EXPORT PDF
- Click Download PDF to export the entire summary, charts, and themes into a multi-page PDF.

FUTURE IMPROVEMENTS
- working on history section which shows previosly summarised CSV file. And also shows the corresponding tabular form of CSV file.Both can be downloaded again.
- sign-up feature to save summarising history of different users.
- Better Theme Clusttering using K-MEANS.