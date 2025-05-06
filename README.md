# Resume Template and Personal Resume

This repository serves two purposes:
1. **Personal Resume**: It contains the resume of Richard Adleta, showcasing his professional experience, skills, and projects.
2. **Template**: It provides a customizable resume template that dynamically populates content from a JSON file. You can use this template to create and host your own resume.

## Project Structure

```
resume-template
├── assets
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   └── scripts.js
├── data
│   └── resume.json
├── index.html
├── README.md
├── LICENSE
└── .gitignore
```

## Getting Started

To use this repository as your own resume or as a template, follow these steps:

### 1. **Clone the Repository**
   - Click on the "Use this template" button on GitHub to create a new repository based on this template.
   - Clone your new repository to your local machine using:
     ```
     git clone https://github.com/your-username/your-repo-name.git
     ```

### 2. **Customize Your Resume**
   - Open the `data/resume.json` file and update the information with your own resume details.
   - Optionally, update the `index.html` file to adjust the layout or add custom elements.

### 3. **Preview Locally**
   - Install dependencies using `npm install`.
   - Start a local server to preview your resume:
     ```
     npm start
     ```
   - Open your browser and navigate to `http://localhost:8080` to view your resume.

### 4. **Set Up GitHub Pages**
   - Push your changes to GitHub.
   - Go to the repository settings on GitHub.
   - Under the "Pages" section, select the main branch as the source for GitHub Pages.
   - Your resume will be available at `https://your-username.github.io/your-repo-name/`.

### 5. **Using the Template**
   - Share your resume link with others or use it for job applications.
   - To create a new resume, repeat the cloning process with this template.

## Features

- Dynamic content loading from `resume.json`.
- Easy customization through CSS and HTML.
- Simple setup for GitHub Pages hosting.
- Fully responsive design.

## License

This project is open-source and available for anyone to use and modify under the MIT License. Enjoy creating your resume!