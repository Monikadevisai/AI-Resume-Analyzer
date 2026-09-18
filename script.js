function analyzeResume() {

    const resume =
        document.getElementById("resumeText").value.toLowerCase();

    const job =
        document.getElementById("jobText").value.toLowerCase();


    if (resume.trim() === "") {

        alert("Please enter your resume.");

        return;
    }


    if (job.trim() === "") {

        alert("Please enter the job description.");

        return;
    }


    /*
       Common technical skills
    */

    const skills = [

        "python",
        "java",
        "javascript",
        "html",
        "css",
        "sql",
        "c",
        "c++",
        "machine learning",
        "deep learning",
        "artificial intelligence",
        "data science",
        "pandas",
        "numpy",
        "tensorflow",
        "pytorch",
        "react",
        "node.js",
        "flask",
        "django",
        "git",
        "github",
        "docker",
        "rest api",
        "mongodb",
        "mysql",
        "excel",
        "power bi",
        "tableau",
        "communication",
        "leadership"
    ];


    /*
       Find skills in resume
    */

    const skillsFound =
        skills.filter(skill =>
            resume.includes(skill)
        );


    /*
       Find skills in job description
    */

    const jobSkills =
        skills.filter(skill =>
            job.includes(skill)
        );


    /*
       Find matching skills
    */

    const matchingSkills =
        skillsFound.filter(skill =>
            jobSkills.includes(skill)
        );


    /*
       Find missing skills
    */

    const missingSkills =
        jobSkills.filter(skill =>
            !skillsFound.includes(skill)
        );


    /*
       JOB MATCH SCORE
    */

    let matchScore = 0;

    if (jobSkills.length > 0) {

        matchScore =
            Math.round(
                (matchingSkills.length /
                jobSkills.length) * 100
            );

    } else {

        matchScore = 50;

    }


    /*
       RESUME SCORE
    */

    let resumeScore = 40;


    if (skillsFound.length >= 3)
        resumeScore += 15;


    if (skillsFound.length >= 6)
        resumeScore += 15;


    if (
        resume.includes("project") ||
        resume.includes("projects")
    )
        resumeScore += 10;


    if (
        resume.includes("education") ||
        resume.includes("b.tech") ||
        resume.includes("degree")
    )
        resumeScore += 10;


    if (resumeScore > 100)
        resumeScore = 100;


    /*
       ATS SCORE
    */

    let atsScore = 50;


    const atsKeywords = [

        "education",
        "skills",
        "project",
        "experience",
        "email",
        "phone",
        "linkedin",
        "github",
        "summary"
    ];


    atsKeywords.forEach(keyword => {

        if (resume.includes(keyword)) {

            atsScore += 5;

        }

    });


    if (atsScore > 100)
        atsScore = 100;


    /*
       DISPLAY SCORES
    */

    document.getElementById("resumeScore")
        .textContent = resumeScore;


    document.getElementById("atsScore")
        .textContent = atsScore;


    document.getElementById("matchScore")
        .textContent = matchScore + "%";


    /*
       SKILLS
    */

    displayTags(
        "skillsFound",
        skillsFound,
        "normal"
    );


    displayTags(
        "matchingSkills",
        matchingSkills,
        "match"
    );


    displayTags(
        "missingSkills",
        missingSkills,
        "missing"
    );


    /*
       SUMMARY
    */

    let summary = "";

    if (matchScore >= 75) {

        summary =
            "Your resume shows strong alignment with the selected job description. You have several relevant skills that match the requirements.";

    }

    else if (matchScore >= 50) {

        summary =
            "Your resume has moderate alignment with the job description. Adding some missing technical skills could improve your job match.";

    }

    else {

        summary =
            "Your resume currently has limited alignment with the selected job description. Focus on the missing skills and relevant projects.";

    }


    document.getElementById("summary")
        .textContent = summary;


    /*
       STRENGTHS
    */

    let strengths = [];


    if (skillsFound.length >= 5) {

        strengths.push(
            "Good number of technical skills detected."
        );

    }


    if (
        resume.includes("project") ||
        resume.includes("projects")
    ) {

        strengths.push(
            "Projects are included in the resume."
        );

    }


    if (
        resume.includes("education") ||
        resume.includes("b.tech")
    ) {

        strengths.push(
            "Educational background is clearly mentioned."
        );

    }


    if (matchingSkills.length > 0) {

        strengths.push(
            "Several skills match the selected job."
        );

    }


    if (strengths.length === 0) {

        strengths.push(
            "Resume content can be improved by adding relevant skills and projects."
        );

    }


    displayList("strengths", strengths);


    /*
       WEAKNESSES
    */

    let weaknesses = [];


    if (missingSkills.length > 0) {

        weaknesses.push(
            "Some important job-specific skills are missing."
        );

    }


    if (!resume.includes("project")) {

        weaknesses.push(
            "Projects section was not clearly detected."
        );

    }


    if (!resume.includes("linkedin")) {

        weaknesses.push(
            "LinkedIn profile was not detected."
        );

    }


    if (!resume.includes("github")) {

        weaknesses.push(
            "GitHub profile was not detected."
        );

    }


    displayList("weaknesses", weaknesses);


    /*
       JOB ROLES
    */

    let roles = [];


    if (
        skillsFound.includes("python") &&
        skillsFound.includes("sql")
    ) {

        roles.push("Python Developer");

        roles.push("Data Analyst");

    }


    if (
        skillsFound.includes("machine learning") ||
        skillsFound.includes("artificial intelligence")
    ) {

        roles.push("Machine Learning Engineer");

        roles.push("AI Engineer");

    }


    if (
        skillsFound.includes("html") &&
        skillsFound.includes("css") &&
        skillsFound.includes("javascript")
    ) {

        roles.push("Frontend Developer");

    }


    if (roles.length === 0) {

        roles.push("Software Developer");

    }


    displayRoles(roles);


    /*
       SUGGESTIONS
    */

    let suggestions = [];


    if (missingSkills.length > 0) {

        suggestions.push(
            "Learn these missing skills: " +
            missingSkills.join(", ")
        );

    }


    if (!resume.includes("github")) {

        suggestions.push(
            "Add your GitHub profile and upload your projects."
        );

    }


    if (!resume.includes("linkedin")) {

        suggestions.push(
            "Add your LinkedIn profile."
        );

    }


    if (!resume.includes("project")) {

        suggestions.push(
            "Add 2-3 relevant projects with clear descriptions."
        );

    }


    suggestions.push(
        "Use keywords from the job description naturally in your resume."
    );


    suggestions.push(
        "Keep your resume concise, readable and achievement-focused."
    );


    displayList("suggestions", suggestions);


    /*
       SHOW RESULTS
    */

    document.getElementById("results")
        .classList.remove("hidden");


    /*
       Scroll to results
    */

    document.getElementById("results")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/*
   DISPLAY TAGS
*/

function displayTags(id, items, type) {

    const container =
        document.getElementById(id);


    container.innerHTML = "";


    if (items.length === 0) {

        container.innerHTML =
            "<span class='tag'>None detected</span>";

        return;

    }


    items.forEach(item => {

        const span =
            document.createElement("span");


        span.className = "tag";


        if (type === "match") {

            span.classList.add("match");

        }


        if (type === "missing") {

            span.classList.add("missing");

        }


        span.textContent = item;


        container.appendChild(span);

    });

}


/*
   DISPLAY LIST
*/

function displayList(id, items) {

    const list =
        document.getElementById(id);


    list.innerHTML = "";


    items.forEach(item => {

        const li =
            document.createElement("li");


        li.textContent = item;


        list.appendChild(li);

    });

}


/*
   DISPLAY JOB ROLES
*/

function displayRoles(roles) {

    const container =
        document.getElementById("jobRoles");


    container.innerHTML = "";


    roles.forEach(role => {

        const div =
            document.createElement("div");


        div.className = "role";


        div.textContent = role;


        container.appendChild(div);

    });

}