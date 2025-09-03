const mongoose = require("mongoose");
const LoveLanguageQuestion = require("../models/LoveLanguageQuestion");

mongoose.connect("mongodb://127.0.0.1:27017/CareMate", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const questions = [
  
  {
    questionText: "I feel truly appreciated when my partner genuinely praises something I did.",
    options: [
      { text: "Yes, words of affirmation mean a lot to me", value: "Words of Affirmation" },
      { text: "I feel loved in other ways", value: "Quality Time" },
    ],
  },
  {
    questionText: "I feel cared for when my partner helps me without me asking.",
    options: [
      { text: "Yes, acts of service show love", value: "Acts of Service" },
      { text: "I feel closer through shared experiences", value: "Quality Time" },
    ],
  },
  {
    questionText: "I feel most connected when we spend focused, uninterrupted time together.",
    options: [
      { text: "Absolutely, quality time matters most", value: "Quality Time" },
      { text: "I prefer thoughtful gestures", value: "Acts of Service" },
    ],
  },
  {
    questionText: "A gentle touch or hug from my partner makes me feel truly loved.",
    options: [
      { text: "Yes, physical touch is important", value: "Physical Touch" },
      { text: "I feel loved in other ways", value: "Words of Affirmation" },
    ],
  },
  {
    questionText: "When my partner expresses encouragement, I feel deeply valued.",
    options: [
      { text: "Yes, words of affirmation resonate with me", value: "Words of Affirmation" },
      { text: "I feel loved through acts or time", value: "Acts of Service" },
    ],
  },
  {
    questionText: "I feel most cared for when my partner notices small ways to help me.",
    options: [
      { text: "Yes, acts of service make me feel loved", value: "Acts of Service" },
      { text: "I feel loved in shared moments", value: "Quality Time" },
    ],
  },
  {
    questionText: "Having meaningful conversations with my partner makes me feel emotionally close.",
    options: [
      { text: "Yes, quality time strengthens our bond", value: "Quality Time" },
      { text: "I feel loved through actions or touch", value: "Acts of Service" },
    ],
  },
  {
    questionText: "A warm embrace or holding hands comforts me more than words.",
    options: [
      { text: "Yes, physical touch is my love language", value: "Physical Touch" },
      { text: "I feel loved through encouragement", value: "Words of Affirmation" },
    ],
  },
  {
    questionText: "When my partner acknowledges my effort sincerely, it makes me feel cherished.",
    options: [
      { text: "Yes, words of affirmation touch me deeply", value: "Words of Affirmation" },
      { text: "I feel loved in shared experiences", value: "Quality Time" },
    ],
  },
  {
    questionText: "I feel most appreciated when my partner takes initiative to make my day easier.",
    options: [
      { text: "Yes, acts of service mean a lot to me", value: "Acts of Service" },
      { text: "I feel loved through intentional time together", value: "Quality Time" },
    ],
  },
  {
    questionText: "Physical closeness, like a reassuring touch, makes me feel emotionally secure.",
    options: [
      { text: "Yes, physical touch is essential", value: "Physical Touch" },
      { text: "I feel loved through kind words", value: "Words of Affirmation" },
    ],
  },
  {
    questionText: "Spending a quiet evening together, fully present with each other, makes me feel valued.",
    options: [
      { text: "Yes, quality time nurtures our connection", value: "Quality Time" },
      { text: "I feel loved through thoughtful gestures", value: "Acts of Service" },
    ],
  },



];

async function seed() {
  try {
    await LoveLanguageQuestion.deleteMany({});
    await LoveLanguageQuestion.insertMany(questions);
    console.log("✅ Love Language Questions Seeded!");
  } catch (err) {
    console.error("❌ Error seeding:", err);
  } finally {
    mongoose.disconnect();
  }
}

seed();
