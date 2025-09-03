import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/LoveLanguage.css"; // Import CSS for styling

const LoveLanguageQuiz = ({ userId, partnerId }) => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState("");
  const [lastResult, setLastResult] = useState("");

  // Tips for each love language
  const tips = {
    "Words of Affirmation": "Send compliments, encouragement, or heartfelt messages.",
    "Acts of Service": "Help with chores or do something thoughtful for your partner.",
    "Receiving Gifts": "Give small, meaningful gifts from time to time.",
    "Quality Time": "Spend uninterrupted, focused time together.",
    "Physical Touch": "Hugs, holding hands, or gentle touches show love.",
  };

  // Fetch quiz questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/love-language/questions");
        console.log("Fetched questions:", res.data);
        setQuestions(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setQuestions([]);
      }
    };
    fetchQuestions();
  }, []);

  // Fetch last saved result
  useEffect(() => {
    const fetchLastResult = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/love-language/results/${userId}`);
        if (res.data && res.data.length > 0) {
          const latest = res.data[res.data.length - 1];
          setLastResult(latest.result);
        }
      } catch (err) {
        console.error("Error fetching last result:", err);
      }
    };
    if (userId) fetchLastResult();
  }, [userId]);

  const handleChange = (qId, value) => {
    setAnswers({ ...answers, [qId]: value });
  };

  const handleSubmit = async () => {
    if (Object.keys(answers).length !== questions.length) {
      alert("Please answer all questions before submitting!");
      return;
    }

    const counts = {};
    Object.values(answers).forEach((val) => {
      counts[val] = (counts[val] || 0) + 1;
    });

    const topLanguage = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    setResult(topLanguage);

    try {
      await axios.post("http://localhost:5000/api/love-language/submit", {
        userId,
        partnerId,
        result: topLanguage,
      });
      alert("Your result has been saved!");
      setLastResult(topLanguage);
    } catch (err) {
      console.error("Error submitting result:", err);
      alert("Failed to save result. Please try again.");
    }
  };

  return (
    <div className="love-language-quiz">
      <h2>Love Language Quiz❤️</h2>

      {Array.isArray(questions) && questions.length > 0 ? (
        questions.map((q, index) => (
          <div className="question-block" key={q._id}>
            <p>{index + 1}. {q.questionText}</p>
            {q.options.map((opt) => (
              <label key={opt.text}>
                <input
                  type="radio"
                  name={q._id}
                  value={opt.value}
                  onChange={() => handleChange(q._id, opt.value)}
                />
                {` ${opt.text}`}
              </label>
            ))}
          </div>
        ))
      ) : (
        <p>Loading quiz questions...</p>
      )}

      <button onClick={handleSubmit}>Submit</button>

      {result && (
        <div className="result-box">
          <p>Your partner’s love language is: <strong>{result}</strong></p>
          <p>Tip: {tips[result]}</p>
        </div>
      )}

      {lastResult && !result && (
        <div className="result-box">
          <p>Last saved love language: <strong>{lastResult}</strong></p>
          <p>Tip: {tips[lastResult]}</p>
        </div>
      )}
    </div>
  );
};

export default LoveLanguageQuiz;
