# <img src="https://ik.imagekit.io/chaitanya/bot.png?updatedAt=1731575288184" style="height: 30px;">  Medi-Mitra

Medi-Mitra is a virtual medical assistant designed to provide friendly, knowledgeable responses to health-related inquiries. Acting as a supportive healthcare chatbot, it helps users understand symptoms, provides wellness tips, and explains basic medical concepts in an accessible, supportive way. This project is ideal for role-playing scenarios where users can get general health guidance.

## Preview

![App Screenshot](https://ik.imagekit.io/chaitanya/medimitra?updatedAt=1731574800464)

## Features

- **Medical Q&A**: Answers questions on symptoms, wellness, and general healthcare.
- **Doctor Roleplay**: Responds with a knowledgeable, friendly tone similar to a doctor’s.
- **Focused Topic Responses**: Only answers medical questions, responding with a predefined message for other topics.
- **Auto-Scroll**: Chat auto-scrolls to the latest message, enhancing usability.
  
## Built With

- **React**: For building the user interface.
- **Axios**: For making HTTP requests to the Generative Language model.
- **React-Markdown**: For displaying markdown-formatted responses.
- **Tailwind CSS**: For easy and responsive styling.

## Authors

- [@raghavjaiswal709](https://github.com/raghavjaiswal709) 
- [@Chaitanya-Pratap-Singh](https://github.com/Chaitanya-Pratap-Singh)
- [@Sookeyy-12](https://github.com/Sookeyy-12)
- [@SuperPowered-Cat](https://github.com/SuperPowered-Cat)

## Acknowledgements

- [Medi-Mitra Original Concept](https://github.com/sayan112207/MediMitra)

## Environment Variables

To run this project, add the following variables to your `.env` file:

```plaintext
# API key for the Generative Language model
VITE_API_GENERATIVE_LANGUAGE_CLIENT

# Prompt to set the model’s behavior and tone
VITE_MEDICAL_ASSISTANT_PROMPT
```

## Installation and Setup

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/Medi-Mitra.git
   cd Medi-Mitra
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Add Environment Variables**

   Create a `.env` file in the project root and add the variables as shown above.

4. **Run the App**

   ```bash
   npm run dev
   ```

5. **Open in Browser**

   Go to `http://localhost:5173` to see Medi-Mitra in action!

## Usage

1. Type a health-related question in the input box.
2. Medi-Mitra will respond with helpful information and wellness tips.
3. For non-medical queries, Medi-Mitra will remind you that it is focused on healthcare topics.

## Folder Structure

- **src/App.js**: Main React component with the chat UI and API request handling.
- **src/App.css**: Custom styles for the app layout.
- **public**: Contains the favicon and any other static assets.
  

## License

This project is licensed under the [MIT License](LICENSE).

---