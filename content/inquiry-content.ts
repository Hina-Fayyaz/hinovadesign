import type { Audience } from "./index";
export type Field = {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  full?: boolean;
  options?: string[];
};
export type Step = {
  label: string;
  title: string;
  intro: string;
  kind: string;
  name?: string;
  required?: boolean;
  options?: string[][];
  fields?: Field[];
  review?: boolean;
};
export type InquiryConfig = {
  accent: string;
  deepAccent: string;
  audienceLabel: string;
  asideTitle: string;
  asideText: string;
  backHref: string;
  backLabel: string;
  submitLabel: string;
  steps: Step[];
};
export const inquiryConfig: Record<Audience, InquiryConfig> = {
  coaches: {
    accent: "var(--pink)",
    deepAccent: "var(--pink-deep)",
    audienceLabel: "For Coaches",
    asideTitle: "Let’s bring your coaching programme to life.",
    asideText:
      "Tell us about your ideas, your clients and the support you need. We’ll help you find a practical starting point.",
    backHref: "/coaches/",
    backLabel: "Back to Coaches",
    submitLabel: "Submit Project Inquiry",
    steps: [
      {
        label: "Your project",
        title: "What would you like help with?",
        intro:
          "Select everything that applies. The next questions will help us understand the scope.",
        kind: "options",
        name: "services",
        required: true,
        options: [
          [
            "Instructional Design & Course Planning",
            "Shape the learning goals, structure, sequence, activities and assessments.",
          ],
          [
            "Online Course Design & Development",
            "Develop clear lessons, presentations, activities, quizzes and resources.",
          ],
          [
            "Course Platform Setup & Support",
            "Organise and check your course in Kajabi, Thinkific or Teachable.",
          ],
          [
            "Graphic & Document Design",
            "Create branded workbooks, guides, presentations, graphics and fillable PDFs.",
          ],
          ["I’m Not Sure Yet", "Help me work out what my programme needs."],
        ],
      },
      {
        label: "About you",
        title: "Let’s get to know your coaching business.",
        intro:
          "A few details will help us understand your work and personalise our response.",
        kind: "fields",
        fields: [
          {
            name: "first_name",
            label: "First name",
            type: "text",
            placeholder: "Sarah",
            required: true,
          },
          {
            name: "last_name",
            label: "Last name",
            type: "text",
            placeholder: "Johnson",
          },
          {
            name: "email",
            label: "Email address",
            type: "email",
            placeholder: "sarah@yourbrand.com",
            required: true,
          },
          {
            name: "business",
            label: "Business or brand name",
            type: "text",
            placeholder: "The Empowered Coach",
          },
          {
            name: "website",
            label: "Website or social profile",
            type: "url",
            placeholder: "https://yourwebsite.com",
          },
          {
            name: "coach_type",
            label: "What kind of coaching do you offer?",
            type: "text",
            placeholder: "Business, career, wellness…",
          },
        ],
      },
      {
        label: "Your programme",
        title: "Tell us what you have in mind.",
        intro:
          "Your content can be a rough idea, a growing programme or something ready for design.",
        kind: "fields",
        fields: [
          {
            name: "project",
            label: "What are you creating or improving?",
            type: "textarea",
            placeholder:
              "Tell us who it is for, what you want clients to learn or do, and where you need support.",
            required: true,
            full: true,
          },
          {
            name: "readiness",
            label: "How ready is your content?",
            type: "select",
            required: true,
            options: [
              "",
              "I have an idea and need help shaping it",
              "I have notes, recordings or a rough outline",
              "Some of my content is ready",
              "My content is complete and ready for design",
              "I have an existing programme that needs updating",
            ],
          },
          {
            name: "delivery",
            label: "How will clients use it?",
            type: "select",
            options: [
              "",
              "One-to-one coaching",
              "Group coaching",
              "Live workshops",
              "Self-paced learning",
              "A combination",
              "Not sure yet",
            ],
          },
          {
            name: "scope",
            label: "Approximate size",
            type: "text",
            placeholder: "6 modules, 30-page workbook…",
          },
          {
            name: "platform",
            label: "Course platform, if applicable",
            type: "select",
            options: [
              "",
              "Kajabi",
              "Thinkific",
              "Teachable",
              "No platform support needed",
              "I’m not sure yet",
            ],
          },
        ],
      },
      {
        label: "Brand & format",
        title: "How should the programme look and feel?",
        intro:
          "Tell us what is already in place and how the finished resources need to be used.",
        kind: "fields",
        fields: [
          {
            name: "brand_status",
            label: "Do you have brand guidelines?",
            type: "select",
            required: true,
            options: [
              "",
              "Yes — logo, colours and fonts are ready",
              "Partially — I have some brand elements",
              "No — I need help choosing a visual direction",
            ],
          },
          {
            name: "formats",
            label: "What formats do you need?",
            type: "checks",
            full: true,
            options: [
              "Printable PDF",
              "Digital or fillable PDF",
              "Editable Canva files",
              "Editable Word or PowerPoint files",
              "Course platform content",
              "Please recommend",
            ],
          },
          {
            name: "style_links",
            label: "Styles or references you like",
            type: "textarea",
            placeholder:
              "Add a few words or links that show the look and feel you have in mind.",
            full: true,
          },
        ],
      },
      {
        label: "Timing & budget",
        title: "What should we plan around?",
        intro:
          "Approximate details are useful. You can choose “not sure yet” where needed.",
        kind: "fields",
        fields: [
          {
            name: "start_time",
            label: "When would you like to begin?",
            type: "select",
            required: true,
            options: [
              "",
              "As soon as possible",
              "Within a month",
              "In the next few months",
              "I’m exploring options",
            ],
          },
          {
            name: "deadline",
            label: "Launch date or deadline",
            type: "text",
            placeholder: "Include whether it is fixed or flexible",
          },
          {
            name: "budget",
            label: "Estimated budget and currency",
            type: "text",
            placeholder: "For example: $1,500 USD or not sure yet",
            full: true,
          },
        ],
      },
      {
        label: "Final details",
        title: "Anything you’d like us to see?",
        intro:
          "Your materials do not need to be polished. Share whatever helps us understand the starting point.",
        kind: "fields",
        fields: [
          {
            name: "material_links",
            label: "Links to your content or files",
            type: "textarea",
            placeholder: "Course outline, draft content, brand guidelines…",
            full: true,
          },
          {
            name: "final_notes",
            label: "Anything else we should know?",
            type: "textarea",
            placeholder:
              "Add any other details that may help us understand the project.",
            full: true,
          },
        ],
        review: true,
      },
    ],
  },
  educators: {
    accent: "var(--lime)",
    deepAccent: "var(--lime-deep)",
    audienceLabel: "For Educators",
    asideTitle: "Let’s create a better learning experience.",
    asideText:
      "Tell us about your learners, current resources and what you would like to improve. We’ll help shape a focused starting point.",
    backHref: "/educators/",
    backLabel: "Back to Educators",
    submitLabel: "Submit Project Inquiry",
    steps: [
      {
        label: "Your project",
        title: "Where would you like support?",
        intro:
          "Select everything that applies. You can begin with one resource or a wider learning experience.",
        kind: "options",
        name: "services",
        required: true,
        options: [
          [
            "Instructional Design & Course Planning",
            "Align the learning goals, content, sequence, activities and assessments.",
          ],
          [
            "Online Course Design & Development",
            "Develop clear lessons, presentations, activities, quizzes and resources.",
          ],
          [
            "Course Platform Setup & Support",
            "Organise and check your course in Kajabi, Thinkific or Teachable.",
          ],
          [
            "Graphic & Document Design",
            "Create teaching and learner resources, presentations and fillable PDFs.",
          ],
          ["I’m Not Sure Yet", "Help us identify a useful starting point."],
        ],
      },
      {
        label: "About you",
        title: "Tell us about your organisation.",
        intro:
          "This helps us understand your teaching context and contact the right person.",
        kind: "fields",
        fields: [
          {
            name: "first_name",
            label: "First name",
            type: "text",
            placeholder: "Amina",
            required: true,
          },
          {
            name: "last_name",
            label: "Last name",
            type: "text",
            placeholder: "Khan",
          },
          {
            name: "email",
            label: "Email address",
            type: "email",
            placeholder: "amina@school.org",
            required: true,
          },
          {
            name: "organisation",
            label: "Institution, academy or business",
            type: "text",
            placeholder: "Your organisation",
          },
          {
            name: "role",
            label: "Your role",
            type: "text",
            placeholder: "Teacher, founder, programme lead…",
          },
          {
            name: "website",
            label: "Website or organisation profile",
            type: "url",
            placeholder: "https://yourorganisation.org",
          },
        ],
      },
      {
        label: "Learners & goals",
        title: "What would you like to improve?",
        intro:
          "Help us understand what is happening now and what would make the learning experience work better.",
        kind: "fields",
        fields: [
          {
            name: "project",
            label: "Project or learning challenge",
            type: "textarea",
            placeholder:
              "What is happening now, and what would you like teachers or learners to do more easily?",
            required: true,
            full: true,
          },
          {
            name: "learners",
            label: "Who are the learners?",
            type: "text",
            placeholder: "Age group, grade or learning level",
            required: true,
          },
          {
            name: "subject",
            label: "Subject, course or programme",
            type: "text",
            placeholder: "For example: Grade 5 Islamiyat",
          },
          {
            name: "materials",
            label: "What materials do you already have?",
            type: "select",
            options: [
              "",
              "Syllabus or curriculum",
              "Lesson plans",
              "Textbooks or reference content",
              "Teacher and student resources",
              "An existing digital course",
              "We’re starting from an idea",
            ],
          },
          {
            name: "delivery",
            label: "How will the resources be used?",
            type: "select",
            options: [
              "",
              "In the classroom",
              "Online",
              "At home",
              "A blended approach",
              "Not sure yet",
            ],
          },
          {
            name: "scope",
            label: "Approximate scope",
            type: "text",
            placeholder: "One lesson, six-week unit, one grade…",
          },
          {
            name: "framework",
            label: "Curriculum or framework",
            type: "text",
            placeholder: "Name or reference link",
            full: true,
          },
        ],
      },
      {
        label: "Format & access",
        title: "Let’s make the resources fit your setting.",
        intro:
          "The right formats depend on the learners, educators and the conditions in which they will use them.",
        kind: "fields",
        fields: [
          {
            name: "brand_status",
            label: "Do you have brand or document guidelines?",
            type: "select",
            required: true,
            options: [
              "",
              "Yes — we have guidelines to follow",
              "Partially — we have materials to match",
              "No — we need help choosing a visual direction",
            ],
          },
          {
            name: "formats",
            label: "What formats would be useful?",
            type: "checks",
            full: true,
            options: [
              "Printable resources",
              "Digital PDFs",
              "Fillable activities",
              "Editable Word, PowerPoint or Canva files",
              "Online course content",
              "Please recommend",
            ],
          },
          {
            name: "languages",
            label: "Language or languages needed",
            type: "text",
            placeholder: "For example: English and Urdu",
          },
          {
            name: "access_needs",
            label: "Learning or access needs to consider",
            type: "textarea",
            placeholder:
              "Reading level, limited internet, printing constraints, accessibility…",
            full: true,
          },
        ],
      },
      {
        label: "Timing & budget",
        title: "What should we plan around?",
        intro: "Approximate details are enough at this stage.",
        kind: "fields",
        fields: [
          {
            name: "start_time",
            label: "When would you like to begin?",
            type: "select",
            required: true,
            options: [
              "",
              "As soon as possible",
              "Before the next term or cohort",
              "Within the next few months",
              "We’re exploring options",
            ],
          },
          {
            name: "deadline",
            label: "Term date, launch date or deadline",
            type: "text",
            placeholder: "Include whether it is fixed or flexible",
          },
          {
            name: "budget",
            label: "Available budget and currency",
            type: "text",
            placeholder: "For example: $2,000 USD or not confirmed yet",
          },
          {
            name: "platform",
            label: "Course platform, if applicable",
            type: "select",
            options: [
              "",
              "Kajabi",
              "Thinkific",
              "Teachable",
              "No platform support needed",
              "We’re not sure yet",
            ],
          },
        ],
      },
      {
        label: "Final details",
        title: "Share your starting point.",
        intro:
          "Existing materials help us understand what is working and where support may be useful.",
        kind: "fields",
        fields: [
          {
            name: "material_links",
            label: "Links to your syllabus or resources",
            type: "textarea",
            placeholder:
              "Please check that the links allow us to view the files.",
            full: true,
          },
          {
            name: "final_notes",
            label: "Anything else we should know?",
            type: "textarea",
            placeholder:
              "Review process, subject specialists or other project requirements.",
            full: true,
          },
        ],
        review: true,
      },
    ],
  },
};
