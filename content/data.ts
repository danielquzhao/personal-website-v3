import type { StaticImageData } from "next/image";

import terra from "@/assets/projects/terra.png";
import terra1 from "@/assets/projects/image-20260112-015711.png";
import terra2 from "@/assets/projects/image-20260112-015810.png";
import notation from "@/assets/projects/notation.png";
import notationArch from "@/assets/projects/image-20260112-024434.png";
import notationRendered from "@/assets/projects/image-20260112-024005.png";
import notationCode from "@/assets/projects/image-20260112-024013.png";
import motionwave from "@/assets/projects/motionwave.png";
import motionwaveLandmarks from "@/assets/projects/image-20260112-031146.png";
import chordcraft from "@/assets/projects/chordcraft.png";
import chordcraftDashboard from "@/assets/projects/image-20260112-033518.png";
import chordcraftSaved from "@/assets/projects/image-20260112-033602.png";
import faireLogo from "@/assets/logos/faire.png";
import cineplexLogo from "@/assets/logos/cineplex.png";
import wargLogo from "@/assets/logos/warg.png";
import wrlLogo from "@/assets/logos/wrl.png";

export const site = {
  name: "Daniel Zhao",
  url: "https://www.danielquzhao.com",
  email: "d86zhao@uwaterloo.ca",
  github: "https://github.com/danielquzhao",
  linkedin: "https://linkedin.com/in/danielquzhao",
  webring: "https://cs.uwatering.com/#https://www.danielquzhao.com",
};

export type Experience = {
  company: string;
  role: string;
  href: string;
  logo: StaticImageData;
  // Tile color behind the logo, matching each brand.
  tint: string;
  // Logo box size in px inside its tile, for logos that look too big or small at the default.
  logoSize?: number;
};

export const experience: Experience[] = [
  {
    company: "Faire",
    role: "Software Engineer Intern",
    href: "https://www.faire.com/",
    logo: faireLogo,
    tint: "#333333",
    logoSize: 11,
  },
  {
    company: "Cineplex Digital Media",
    role: "Software Engineer Intern",
    href: "https://www.cdmexperiences.com/",
    logo: cineplexLogo,
    tint: "#004ccd",
    logoSize: 14,
  },
  {
    company: "Waterloo Aerial Robotics",
    role: "Software Developer",
    href: "https://www.uwarg.com/",
    logo: wargLogo,
    tint: "#e5e7eb",
  },
  {
    company: "Waterloo Reality Labs",
    role: "Software Developer",
    href: "https://uwrealitylabs.com/",
    logo: wrlLogo,
    tint: "#f5f2e8",
  },
];

type Person = { name: string; href: string };

export type Block =
  | { type: "h"; text: string }
  | { type: "p"; text: string }
  | { type: "img"; src: StaticImageData; alt: string }
  | { type: "gallery"; images: { src: StaticImageData; alt: string }[] }
  | { type: "code"; lang: string; code: string }
  | { type: "credits"; intro: string; people: Person[] };

export type Project = {
  slug: string;
  title: string;
  tagline: string;
  cover: StaticImageData;
  date: string;
  event?: string;
  stack: string[];
  links: { label: string; href: string }[];
  body: Block[];
};

const an: Person = { name: "An Tran", href: "https://www.antran.dev/" };

const projectList: Project[] = [
  {
    slug: "terra",
    title: "Terra",
    tagline: "AR Lego building game in real-world locations",
    cover: terra,
    date: "January 2025",
    event: "UofTHacks",
    stack: ["Unity", "C#", "ARCore", "AR Foundation", "ProBuilder"],
    links: [
      { label: "GitHub", href: "https://github.com/danielquzhao/terra" },
      { label: "DoraHacks", href: "https://dorahacks.io/buidl/21685" },
    ],
    body: [
      { type: "h", text: "Overview" },
      {
        type: "p",
        text: "In this project we wanted to change the way people see the world by combining augmented reality with creative building mechanics. Our vision was simple: let anyone build structures in real world spaces using just their phone.",
      },
      { type: "h", text: "Key features" },
      {
        type: "p",
        text: "We designed an intuitive interface where you simply click on your phone screen to add blocks in 3D space. You can view your buildings from any angle and experience life-sized models seamlessly integrated into your environment.",
      },
      {
        type: "gallery",
        images: [
          { src: terra2, alt: "Terra AR gameplay" },
          { src: terra1, alt: "Terra AR gameplay, stacked blocks" },
        ],
      },
      { type: "h", text: "Technical implementation" },
      {
        type: "p",
        text: "We built Terra with Unity and C#, using ARCore and AR Foundation for AR functionality on mobile devices. The core placement system we developed uses raycasting to detect planes and existing blocks, with a grid-snapping system to ensure blocks align correctly.",
      },
      {
        type: "code",
        lang: "C#",
        code: `Vector3 SnapToGrid(Vector3 position)
{
    float x = Mathf.Round(position.x / snapGridSize) * snapGridSize;
    float y = Mathf.Round(position.y / snapGridSize) * snapGridSize;
    float z = Mathf.Round(position.z / snapGridSize) * snapGridSize;
    return new Vector3(x, y, z);
}`,
      },
      {
        type: "p",
        text: "Our placement system handles two scenarios: placing blocks on AR-detected planes (ground, tables, walls) and stacking blocks on top of existing blocks. When you tap, the system first raycasts against existing blocks to enable stacking, then falls back to AR plane detection for new structures. We also added block customization with three color options (blue, red, green), accessible through the UI buttons.",
      },
      {
        type: "credits",
        intro: "Built for UofTHacks 2025 with",
        people: [
          { name: "Yuyeon Kim", href: "https://yuyeon.netlify.app/" },
          { name: "Ching Lam Lau", href: "https://www.chinglamlau.ca/" },
        ],
      },
    ],
  },
  {
    slug: "notation",
    title: "Notation",
    tagline: "PDF to LaTeX converter for mathematical documents",
    cover: notation,
    date: "January 2026",
    stack: ["Ruby on Rails", "React", "TypeScript", "Gemini API", "KaTeX"],
    links: [
      { label: "GitHub", href: "https://github.com/danielquzhao/notation" },
      { label: "mathtolatex.com", href: "https://mathtolatex.com/" },
    ],
    body: [
      { type: "h", text: "Overview" },
      {
        type: "p",
        text: "We built Notation to help users convert scanned documents and images into editable LaTeX. Whether it's mathematical equations, technical papers, or complex formulas, Notation uses AI to intelligently extract content and format it as clean, compilable LaTeX code.",
      },
      { type: "h", text: "Architecture" },
      {
        type: "p",
        text: "The system is split into two main components: a Ruby on Rails API backend and a React frontend built with Vite. The backend handles file processing and LaTeX compilation, while the frontend provides the user interface with real-time rendering using KaTeX and react-pdf.",
      },
      { type: "img", src: notationArch, alt: "Notation system architecture" },
      { type: "h", text: "Content processing pipeline" },
      {
        type: "p",
        text: "When a user uploads a file, the backend determines the MIME type and routes it to the appropriate extraction service: PdfToLatexService for PDFs or ImageToLatexService for images. Both services leverage Google's Gemini 2.5 Flash model for content extraction.",
      },
      {
        type: "code",
        lang: "Ruby",
        code: `def extract_content(file, mime_type)
  case mime_type
  when /pdf/
    PdfToLatexService.new(file).convert
  when /image/
    ImageToLatexService.new(file).convert
  else
    raise "Unsupported file type"
  end
end`,
      },
      {
        type: "p",
        text: "After extraction, the ContentFormattingService processes the raw output to ensure proper LaTeX formatting. The tcolorbox package is used to format notes into visually appealing color-coded boxes.",
      },
      {
        type: "p",
        text: "The compilation endpoint takes LaTeX code and generates a PDF using the LatexCompilationService. We implemented real-time compilation so users can see their documents rendered immediately after extraction. The frontend automatically strips markdown code block markers before sending to the compiler.",
      },
      { type: "h", text: "Frontend" },
      {
        type: "p",
        text: "The React frontend features a dual-pane interface with two tabs: 'Rendered' and 'Raw Code'. Users can toggle between viewing the compiled PDF and inspecting the raw LaTeX source. We used react-pdf for PDF rendering with responsive sizing, and Framer Motion for smooth transitions between states.",
      },
      { type: "img", src: notationRendered, alt: "Notation dashboard, rendered view" },
      { type: "img", src: notationCode, alt: "Notation dashboard, code view" },
      { type: "h", text: "Deployment" },
      {
        type: "p",
        text: "We deployed Notation on Google Cloud Platform using Cloud Run for serverless scaling. The project includes a complete CI/CD pipeline with Google Cloud Build, automatically building and deploying both frontend and backend containers. Docker Compose is available for local development.",
      },
      { type: "credits", intro: "Built with", people: [an] },
    ],
  },
  {
    slug: "motionwave",
    title: "MotionWave",
    tagline: "Hand gesture-controlled musical instrument with AI harmony",
    cover: motionwave,
    date: "September 2025",
    event: "TechTO",
    stack: ["Next.js", "TypeScript", "MediaPipe", "Web Audio API", "Web Workers"],
    links: [
      { label: "GitHub", href: "https://github.com/danielquzhao/motionwave" },
      { label: "Live demo", href: "https://techto25.vercel.app/" },
    ],
    body: [
      { type: "h", text: "Overview" },
      {
        type: "p",
        text: "We wanted to create a musical instrument that anyone could play, regardless of musical background. MotionWave uses your webcam to track your hands: move your dominant hand up and down to control pitch, and use your other hand to adjust volume. A 4-part harmony is generated to accompany your melody in real time.",
      },
      { type: "h", text: "Technical details" },
      {
        type: "p",
        text: "We built the project using Next.js, TypeScript, and Tailwind CSS. The app uses MediaPipe for accurate hand tracking. Then, using the location of your hands, the app controls sound output.",
      },
      {
        type: "p",
        text: "An AI-powered neural network generates real-time 4-part SATB (Soprano, Alto, Tenor, Bass) harmony. This runs in a Web Worker to keep the UI at 60 FPS. When you play a melody note, the worker receives the MIDI pitch and the trained neural network predicts appropriate soprano, alto, tenor, and bass notes that harmonize with your input.",
      },
      { type: "img", src: motionwaveLandmarks, alt: "MotionWave hand landmark visualization" },
      {
        type: "p",
        text: "The model is served as WebAssembly for fast inference, with pre-trained weights loaded at startup. This helps keep latency under 20ms for real-time responsiveness.",
      },
      { type: "credits", intro: "Built for TechTO 2025 with", people: [an] },
    ],
  },
  {
    slug: "chordcraft",
    title: "ChordCraft",
    tagline: "Real-time piano to sheet music converter",
    cover: chordcraft,
    date: "January 2025",
    event: "GeeseHacks",
    stack: ["React", "Node.js", "Express", "MongoDB", "ABCJS"],
    links: [
      { label: "GitHub", href: "https://github.com/danielquzhao/chordcraft" },
      { label: "Live demo", href: "https://chordcraft.onrender.com/" },
    ],
    body: [
      { type: "h", text: "Overview" },
      {
        type: "p",
        text: "We built ChordCraft to allow users to capture their musical ideas before they disappear. The app features a virtual keyboard that responds to keypresses with sound, and instantly converts your playing into ABC notation that renders as sheet music. Everything you create is saved to MongoDB and tied to your account with user authentication.",
      },
      { type: "h", text: "Key features" },
      {
        type: "p",
        text: "ChordCraft features an interactive virtual piano that maps 17 keys to your computer keyboard, including support for chords via a 200ms debounce system. As you play, the app provides real-time sound playback and visual highlights while instantly converting your input into ABC notation.",
      },
      { type: "img", src: chordcraftDashboard, alt: "ChordCraft keyboard and live sheet music" },
      {
        type: "p",
        text: "ABCJS is used to render dynamic sheet music as you play, with measures, clefs, and key signatures. The system also includes full CRUD operations for saving and organizing compositions, protected by user authentication.",
      },
      { type: "img", src: chordcraftSaved, alt: "ChordCraft saved compositions" },
      { type: "h", text: "Backend" },
      {
        type: "p",
        text: "The backend was built with Node.js and Express, utilizing MongoDB with Mongoose for flexible schema design. We implemented full CRUD functionality to manage musical compositions, where pieces are stored with their notation, titles, and descriptions. Each entry is linked to a specific user to ensure data integrity and privacy.",
      },
      {
        type: "p",
        text: "Authentication is handled with JWT tokens validated through custom middleware, which verifies tokens and attaches user information to incoming requests. The frontend communicates with this API via Axios, with error handling and loading states managed through React state.",
      },
      { type: "h", text: "Frontend" },
      {
        type: "p",
        text: "We built the frontend with React and Vite. The keyboard component tracks active keys, held keys, and the current ABC notation string. An AuthContext provides global authentication state, making it easy to check if a user is logged in and protect routes. Toast notifications give feedback for save operations, errors, and authentication events.",
      },
      {
        type: "credits",
        intro: "Built for GeeseHacks 2025 with",
        people: [
          { name: "Ivy Cho", href: "https://www.linkedin.com/in/robloxian/" },
          { name: "Henry Hung", href: "https://www.linkedin.com/in/henry-hung-360857197/" },
          { name: "Ryan Xiao", href: "https://www.linkedin.com/in/ryan-xiaoo/" },
        ],
      },
    ],
  },
];

// Newest first.
export const projects = projectList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
