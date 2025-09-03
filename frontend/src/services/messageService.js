export async function generateMessage(mood) {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return { error: "User not logged in" };
  const { email } = JSON.parse(storedUser);

  try {
    const response = await fetch("http://localhost:5000/api/messages/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, mood }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Backend error:", errorData);
      return { error: errorData.error };
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Frontend fetch error:", err);
    return { error: "Failed to fetch message" };
  }
}
