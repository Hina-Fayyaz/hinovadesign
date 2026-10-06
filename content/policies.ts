/** Site information. Confirm business-specific terms with the owner before launch. */
export type Policy = {
  title: string;
  lead: string;
  accent: string;
  sections: { title: string; paragraphs: string[] }[];
};
export const policies: Record<string, Policy> = {
  "privacy-policy": {
    title: "Privacy Policy",
    accent: "Your information, handled with care.",
    lead: "This page explains what information you choose to share with Hinova Design through this website and how to contact us about it.",
    sections: [
      { title: "Information you share", paragraphs: [
        "If you email us, book a call, or send an inquiry, you may share your name, email address, project details and any materials you choose to provide. Please avoid sending sensitive personal information through an initial inquiry.",
        "When online submissions are available, the contact and project inquiry forms send the information you enter, and any files you choose, to our form service so we can respond. A confirmation appears only after the service accepts your submission. If the service is unavailable, you can contact us by email."
      ] },
      { title: "How we use it", paragraphs: [
        "We use the information you send to reply to your inquiry, discuss your project, prepare a proposal and, if we work together, deliver the agreed services. We may retain project correspondence as needed for the working relationship, recordkeeping and applicable legal obligations."
      ] },
      { title: "Other services and website data", paragraphs: [
        "Booking a strategy call opens Calendly. The personal portfolio also includes a Vimeo video. Its original project inquiry page loads Google Analytics. These services, your email provider and the website host may process technical or contact information under their own privacy practices. Follow their links to review those practices before using them.",
        "Our website host and, when connected, our form service provider process the information needed to deliver the website and handle inquiries. Basic technical request data may also be used to deliver and secure the site."
      ] },
      { title: "Questions and requests", paragraphs: [
        "To ask about information you have sent us, or to request correction or deletion, email contact@hinovadesign.com. We will review your request in light of our records and applicable requirements. If this page or the website's data practices change, we will update the date shown here."
      ] }
    ]
  },
  "refund-and-cancellation": {
    title: "Refund and Cancellation",
    accent: "Clear project expectations from the start.",
    lead: "Hinova offers custom creative and learning design services. Your approved proposal or signed project agreement sets out the scope, schedule, payment milestones and any project-specific cancellation terms.",
    sections: [
      { title: "Before work begins", paragraphs: [
        "A strategy call or inquiry does not commit you to a paid project. Before production starts, we confirm the deliverables, fee, payment schedule and review stages in writing. Please raise any cancellation or refund questions before accepting the proposal."
      ] },
      { title: "Changing or cancelling a project", paragraphs: [
        "If plans change, email contact@hinovadesign.com as soon as possible. We will confirm the work completed, any agreed commitments already made and the next steps in writing. A pause or change of scope may require a revised timeline and fee."
      ] },
      { title: "Refund requests", paragraphs: [
        "Refunds are reviewed according to the accepted proposal or project agreement, the work already performed, any approved third-party costs and applicable law. We do not apply a blanket refund percentage to every custom project. Nothing on this page limits any rights that cannot be excluded by law."
      ] },
      { title: "Call bookings", paragraphs: [
        "The introductory strategy call is free. If you need to reschedule or cancel, use the instructions in your Calendly confirmation or email us. Any separately paid session will have its own booking terms disclosed before payment."
      ] }
    ]
  },
  "terms-of-service": {
    title: "Terms of Service",
    accent: "A simple way to work together.",
    lead: "These terms describe use of the Hinova Design website. A specific client project is governed by its accepted proposal or signed agreement, which controls if it differs from this page.",
    sections: [
      { title: "Website information", paragraphs: [
        "The website introduces Hinova's services and provides general information. Sending an inquiry or booking a free call does not create a client relationship or guarantee availability, a timeline or a particular outcome. We confirm any paid engagement in writing."
      ] },
      { title: "Project scope and approvals", paragraphs: [
        "For paid work, the proposal or agreement identifies deliverables, client materials, review responsibilities, revisions, fees, deadlines and handover formats. Clients are responsible for checking the accuracy of their subject matter, approvals and any permissions required for materials they provide."
      ] },
      { title: "Content and ownership", paragraphs: [
        "The Hinova name, site design and original website content may not be reused without permission. Ownership and permitted use of custom deliverables are specified in the relevant project agreement. Third-party platforms, fonts and other supplied materials remain subject to their own terms and licenses."
      ] },
      { title: "Links and changes", paragraphs: [
        "This site links to independent services including Calendly and social platforms. We are not responsible for their content or availability. We may revise website information and these terms; the date below identifies the current version. For questions, contact contact@hinovadesign.com."
      ] }
    ]
  }
};
