# 🧠 Expert System: Evaluating Information Credibility (ENSA Fès)

This project is a **Prolog-based expert system** developed as part of an academic assignment at **ENSA Fès**. It aims to **assess the credibility of information** by analyzing multiple factors such as the source, the author, citations, and language style.

## 🌐 Web Interface

To make the system accessible and user-friendly, we developed a **web-based interface** using **Node.js** (for the backend) and **React** (for the frontend). The interface allows users to:

- Enter or select information to be evaluated
- View detailed results of the credibility analysis
- Understand how each factor contributes to the final decision

The backend communicates with the Prolog engine to process the expert logic and returns the evaluation results to the frontend.

## 🔍 Key Features

- Evaluate the **credibility of information**
- Analyze:
  - **Source reliability**
  - **Author reputation and writing style**
  - **Citation count**
  - **Emotional tone** of the language
- Get **explanations and scoring breakdown**
- Accessible through a modern **web interface**

## 📊 Scoring Criteria

Each piece of information is evaluated based on the following weighted criteria:

- **Source**: 45%
- **Author**: 25%
- **Citations**: 20%
- **Language Style**: 10%

## 🧠 Example Prolog Usage

```prolog
?- evaluate_info("transition_energy_morocco", Credibility, S1, S2, S3, S4, Total, Explanation).
```

## Output
**Credibility = "Credible"** with individual scores and detailed explanation.

---

## 📁 Knowledge Base Overview
- `source/2`: Information sources and their credibility levels  
- `author/2`: Authors and their reputation  
- `uses_style/2`: Writing styles (formal, biased, etc.)  
- `has_references/1`: Whether the author includes references  
- `source_provides/3`: Mapping between authors, sources, and information  
- `has_citations/2`: Citation count for each information item  
- `emotional_language/2`: Emotional content of the text  
- `information/2`: Info ID and titles  

Scoring logic based on weighted rules.

---

## 🚀 Technologies Used
- **Prolog** – Core expert system logic (SWI-Prolog)  
- **Node.js** – Backend API connecting the frontend and Prolog  
- **React.js** – Frontend interface for user interaction  
- **Express.js** – Web server for handling Prolog queries  

---

## 🧪 How to Use
1. Clone the repository.  
2. Start the backend server (Node.js + SWI-Prolog integration).  
3. Run the frontend (React).  
4. Interact with the system through the website:  
   - Enter information details  
   - Submit evaluation request  
   - View scoring and result  

---

## 👨‍🎓 Authors
Developed by :
- **Mohamed EL Mostafi**  
- **Mohamed El Hasnaoui**
- **Oussama Lamrabet**  