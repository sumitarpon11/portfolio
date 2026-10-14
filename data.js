/* ===== EDIT ONLY THIS FILE to change your portfolio content ===== */
const DATA = {
  name: "Arpon Kumar Sarkar Sumit",
  short: "Sumit",
  tagline: "CSE student at IUBAT, Dhaka. I build deep learning models that read ultrasound images, and I make them explain their decisions.",
  roles: ["medical image analysis", "explainable AI", "ultrasound deep learning", "problem solving in C and C++", "web back ends"],

  stats: [
    { value: 3, label: "Projects built" },
    { value: 2, label: "Thesis projects" },
    { value: 1, label: "Research focus: ultrasound" }
  ],

  about: [
    "I'm a Bachelor of Computer Science and Engineering student at the International University of Business Agriculture and Technology (IUBAT) in Dhaka, Bangladesh. My undergraduate research is in medical image analysis, with a focus on ultrasound imaging, deep learning and explainable AI.",
    "I care about models that clinicians can question, not only models with high accuracy. I enjoy critical thinking and problem solving, and I practice competitive programming on Codeforces in C and C++.",
    "I love learning new technology, and I enjoy math and physics because they teach me to reason from first principles. Outside research I build web back ends."
  ],

  skills: {
    "Machine learning": ["Deep learning", "Medical image analysis", "Explainable AI", "Radiomics", "Vision Mamba", "Image segmentation"],
    "Programming": ["C", "C++", "Python", "Data structures & algorithms", "Competitive programming", "PHP", "MySQL"],
    "Web & tools": ["HTML", "CSS", "JavaScript", "Git & GitHub", "XAMPP"],
    "Strengths & interests": ["Critical thinking", "Problem solving", "Mathematics", "Physics", "Learning new technology"]
  },

  education: [
    {
      title: "BCSE, Computer Science & Engineering",
      place: "International University of Business Agriculture and Technology (IUBAT), Dhaka",
      text: "Undergraduate degree in progress. Thesis work on ultrasound image analysis with deep learning and explainable ML."
    }
    // Add SSC / HSC here: { title: "HSC", place: "Your college", text: "Years and result" }
  ],

  projects: [
    {
      title: "PlaneForge",
      category: "Research",
      tag: "Thesis project",
      summary: "A dual-decoder Vision Mamba that classifies the ultrasound scan plane and segments the organ in one pass.",
      details: "PlaneForge shares one Vision Mamba encoder between two decoders. One decoder predicts which anatomical plane the ultrasound frame shows. The other segments the organ. Training both tasks together lets the model use plane context to improve segmentation.",
      tech: ["Vision Mamba", "Classification", "Segmentation", "Python"],
      github: "https://github.com/sumitarpon11/planeforge",
      demo: ""
    },
    {
      title: "Liver abnormality detection in ultrasound",
      category: "Research",
      tag: "Thesis project",
      summary: "Hybrid texture and radiomics features with explainable ML to detect liver abnormalities.",
      details: "This project extracts texture and radiomics features from liver ultrasound images and trains machine learning classifiers on them. Explainability methods show which features drive each prediction, so the result can be checked by a clinician.",
      tech: ["Radiomics", "Texture analysis", "Explainable ML", "Python"],
      github: "https://github.com/sumitarpon11/liver-radiomics",
      demo: ""
    },
    {
      title: "School management system back end",
      category: "Web",
      tag: "Renaissance Public High School project",
      summary: "A PHP and MySQL back end that powers a school management front end.",
      details: "A back end built with PHP and MySQL on XAMPP. It serves data to the school management front end for the Renaissance Public High School project.",
      tech: ["PHP", "MySQL", "XAMPP"],
      github: "https://github.com/sumitarpon11/school-management-backend",
      demo: ""
    }
  ],

  achievements: [
    "Undergraduate researcher in medical image analysis and explainable AI",
    "Active Codeforces participant, working toward a higher rating"
    // Add real awards, certificates and contest results here
  ],

  contact: {
    email: "arponsarkersumit@gmail.com",
    links: [
      { label: "GitHub", url: "https://github.com/sumitarpon11" },
      { label: "LinkedIn", url: "https://www.linkedin.com/in/sumit-sarker-753183355/" },
      { label: "Codeforces", url: "https://codeforces.com/profile/5UM97" }
    ]
  }
};
