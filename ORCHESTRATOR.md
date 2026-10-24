<h1>KisanLens AI — Application Orchestrator</h1>

**Purpose**

Documents how the application's components communicate and how the image-analysis workflow is coordinated.

<hr/>

<h2>Component Responsibilities</h2>

- **Frontend:** HTML, CSS, and JavaScript handle image submission and display results.
- **Backend:** Node.js and Express.js receive requests and coordinate processing.
- **Image Processing:** Multer handles uploaded images in memory.
- **AI Service:** Google Gemini analyzes images and generates diagnostic responses.
- **Deployment:** GitHub stores the source code, and Render hosts the application.

<h2>Application Workflow</h2>

1. The user uploads a crop leaf image.
2. The frontend sends it to the backend.
3. Express.js validates the request, and Multer processes the image.
4. The backend sends the image to Gemini for analysis.
5. The backend processes the response and returns it to the frontend.
6. The frontend displays the diagnosis, symptoms, and remedies.

<h2>Coordination Rules</h2>

- Keep frontend, backend, and AI responsibilities separate.
- Validate inputs and handle errors at each stage.
- Protect API credentials using environment variables.
- Preserve existing routes and response formats when modifying code.

<h2>Testing and Deployment</h2>

Test image uploads, AI responses, invalid files, and API failures after relevant changes. Push updates to GitHub and verify that the latest Render deployment succeeds.

<hr/>

**Maintenance:** Update this document whenever the actual architecture or application workflow changes.