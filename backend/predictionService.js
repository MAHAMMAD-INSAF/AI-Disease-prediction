import axios from "axios";

export async function getMedicalPredictions(symptoms) {
  const prompt = `
    Based on the following symptoms: "${symptoms}", provide a medical prediction.
    The response should be a JSON object with the following structure:
    {
      "diseases": [
        {
          "disease": "Name of Disease",
          "accuracy": percentage,
          "description": "A brief description of the disease.",
          "severity": "mild, moderate, or severe",
          "recoveryTime": "Estimated recovery time, e.g., '1-2 weeks'",
          "medications": [{ "name": "Medication Name", "dosage": "e.g., 500mg twice a day", "purpose": "Purpose of medication" }],
          "diet": ["Dietary recommendation 1", "Dietary recommendation 2"],
          "precautions": ["Precaution 1", "Precaution 2"]
        },
        ...
      ],
      "recommendations": "General recommendations and advice."
    }
    List at least two possible diseases with their accuracy.
  `;

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "amazon/nova-2-lite-v1:free",
        messages: [
          { role: "system", content: "You are a helpful medical assistant that provides predictions in JSON format." },
          { role: "user", content: prompt }
        ],
        response_format: { type: "json_object" }
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.DEEPMED_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    let content = response.data?.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("Invalid response structure from OpenRouter API");
    }

    // Remove markdown code blocks if present
    content = content.replace(/^```json\s*/, '').replace(/\s*```$/, '');

    // The actual prediction is a JSON string inside the response, so we need to parse it.
    return JSON.parse(content);
  } catch (error) {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error("OpenRouter API Error Response:", error.response.data);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("OpenRouter API Request Error:", error.message);
    }
    // Return fallback dummy data for development
    return {
      diseases: [{ disease: "Flu", accuracy: 85 }, { disease: "Common Cold", accuracy: 70 }],
      recommendations: "Rest and drink fluids."
    };
  }
}