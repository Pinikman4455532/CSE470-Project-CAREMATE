import { getRandomMessage } from "../api/messageApi";

export const fetchMessageByMood = async (mood, setMessage) => {
  try {
    const data = await getRandomMessage(mood);
    setMessage(data.text);
  } catch (error) {
    setMessage("Oops! Something went wrong.");
    console.error(error);
  }
};
