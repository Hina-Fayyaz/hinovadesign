// Sample editorial copy for the preview. Replace with Hinova's approved posts before public launch.
export type BlogPost = {
  id: string;
  category: string;
  title: string;
  image: string;
  imageAlt: string;
  introduction: string;
  sections: { heading: string; text: string }[];
  takeaway: string;
};

export const blogPosts: BlogPost[] = [
  {
    id: "start-with-the-learning",
    category: "Course planning",
    title: "A clearer course starts with a better plan",
    image: "/images/agency/planning-together.webp",
    imageAlt: "Two women mapping a plan with notes and a laptop",
    introduction: "A folder full of ideas is a useful beginning. Turning those ideas into a course starts with deciding what learners need to do, and how each part of the course will help them get there.",
    sections: [
      { heading: "Begin with one practical outcome", text: "Describe what someone should be able to do after learning with you. For a coaching programme, that might mean applying a reflection method independently. For an education project, it might mean explaining a concept and using it in a new situation." },
      { heading: "Give each lesson a purpose", text: "Group your ideas into a sequence. For every lesson, note the main idea, an example and an opportunity to practise. Move interesting extras into optional resources so the main path stays clear." },
      { heading: "Try the journey before building it", text: "Walk through your outline as a learner. Look for missing instructions, repeated explanations and leaps in difficulty. It is easier to reshape an outline than to re-record a finished course." },
    ],
    takeaway: "Write the learning outcome at the top of your outline. Keep asking how each lesson helps someone reach it.",
  },
  {
    id: "expertise-into-practice",
    category: "Learning design",
    title: "Turn your expertise into learning that lasts",
    image: "/images/agency/reviewing-resources.webp",
    imageAlt: "Two colleagues reviewing information on a tablet",
    introduction: "Your experience is the starting point. A learning experience gives people a way to work with that knowledge, try it for themselves and decide how to use it in their own context.",
    sections: [
      { heading: "Make your thinking visible", text: "Choose a familiar problem and explain how you approach it. Share the questions you ask and the decisions you make. A worked example can help learners see the steps that feel automatic to you." },
      { heading: "Create space to try", text: "Follow the explanation with a small task. Ask learners to make a decision, complete a short exercise or apply the idea to their own project. Give the task a clear purpose and a manageable scope." },
      { heading: "Help learners review their work", text: "Include a model response, a checklist or a few reflection prompts. Show what to look for, while leaving room for different answers where the situation calls for judgment." },
    ],
    takeaway: "Choose one explanation in your course and pair it with one practical activity and a way to reflect.",
  },
  {
    id: "resources-with-a-purpose",
    category: "Resource design",
    title: "Make every workbook page earn its place",
    image: "/images/agency/creative-process.webp",
    imageAlt: "Designers reviewing printed materials and a color palette",
    introduction: "A workbook can be a useful companion to a course, workshop or coaching session. Start by deciding how someone will use it: to prepare, practise, reflect or take a next step.",
    sections: [
      { heading: "Give the page one clear job", text: "Decide what the learner should do on each page. Write a short instruction that names the action. If a page asks for several unrelated tasks, consider separating them." },
      { heading: "Design for the response", text: "Leave space that fits the activity. A brief reflection needs a different layout from a planning exercise. Consider whether people will print the resource, complete it on a laptop or read it on a phone." },
      { heading: "Keep the visual language consistent", text: "Use a small set of heading styles, labels and prompts. Check text contrast and reading order. Review the exported file as well as the original design, including any editable fields or links." },
    ],
    takeaway: "Test one page with someone unfamiliar with the resource. Ask what they think they need to do next.",
  },
  {
    id: "prepare-your-project-brief",
    category: "Project planning",
    title: "What to bring to your first design conversation",
    image: "/images/agency/design-workspace.webp",
    imageAlt: "A creative workspace with a computer and printed color palettes",
    introduction: "You do not need a finished brief before talking about a course or resource project. A few useful details can help turn that first conversation into a practical next step.",
    sections: [
      { heading: "Describe the people and the purpose", text: "Explain who the project is for, what they already know and what you hope they will be able to do. Mention where and how they will use the materials." },
      { heading: "Gather what you already have", text: "Bring an outline, presentation, workbook, syllabus or recording. Note which pieces are ready to use and which still need development. A small representative sample is a useful starting point." },
      { heading: "Name the delivery needs", text: "Share your preferred format, platform, timing and review process. If a decision is still open, say so. Agreeing on the open questions is part of planning the work." },
    ],
    takeaway: "Start with your audience, your intended outcome and a sample of your current materials.",
  },
  {
    id: "course-platform-checklist",
    category: "Platform setup",
    title: "Walk through your course as a learner",
    image: "/images/agency/online-learning.webp",
    imageAlt: "A woman joining a group video meeting on her computer",
    introduction: "Once your lessons are uploaded, take time to experience the course from the learner’s side. Follow the same path someone will take when they arrive for the first time.",
    sections: [
      { heading: "Check the first few steps", text: "Use a test learner account to check access, the welcome message and the route to the first lesson. Make sure the instructions explain where to begin and how to get help." },
      { heading: "Review the lesson experience", text: "Open videos, captions, downloads and activities. Check that file names make sense and links go to the intended place. Try the experience on both a phone and a larger screen." },
      { heading: "Follow the journey to the end", text: "Check the order of lessons, any completion steps and the closing message. Remove draft text and unused files. Keep a short list of checks to repeat when the course changes." },
    ],
    takeaway: "Set aside a complete learner walkthrough before you invite your first group into the course.",
  },
  {
    id: "refresh-existing-materials",
    category: "Content development",
    title: "A thoughtful refresh for the materials you have",
    image: "/images/agency/collaborative-workspace.webp",
    imageAlt: "Colleagues reviewing their work on laptops in a shared workspace",
    introduction: "An existing presentation or resource can hold a lot of useful work. Before redesigning it, review what still serves the learner and where the experience needs attention.",
    sections: [
      { heading: "Review the content first", text: "Read the materials against the current learning goal. Mark content to keep, update, move or remove. Ask the subject expert to check examples and explanations that may need revision." },
      { heading: "Look at the sequence", text: "Check whether each section builds on what comes before it. Add a short introduction where context is missing, and make the instructions for activities explicit." },
      { heading: "Then refine the design", text: "Bring headings, spacing, images and document styles into a consistent system. Check the final format where learners will actually use it, including print if that is part of the plan." },
    ],
    takeaway: "Review purpose and content before polishing the layout. Keep the parts that already work well.",
  },
];
