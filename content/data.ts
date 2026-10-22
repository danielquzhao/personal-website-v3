import type { StaticImageData } from "next/image";
import type { Photo } from "@/components/photo-carousel";

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
import algonquin from "@/assets/photos/algonquin.jpg";
import beach from "@/assets/photos/beach.jpg";
import courtyard from "@/assets/photos/courtyard.jpg";
import elkIsland from "@/assets/photos/elk-island.jpg";
import montBlanc from "@/assets/photos/mont-blanc.jpg";
import rainbow from "@/assets/photos/rainbow.jpg";
import triathlon from "@/assets/photos/triathlon.jpg";
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

// Home page photo carousel, between the intro and Experience. Put images in assets/photos/,
// import them above, and list them here in order. The carousel hides itself while this is empty.
export const photos: Photo[] = [
  {
    src: courtyard,
    alt: "A garden courtyard in front of a glass-fronted house in Liaoning, China, with the low sun through the trees",
    caption: "Liaoning, China",
  },
  {
    src: beach,
    alt: "Waves on a sandy beach in Da Nang, Vietnam, at golden hour, with hazy mountains in the distance",
    caption: "Da Nang, Vietnam",
  },
  {
    src: triathlon,
    alt: "Daniel running through the finish arch at the Great White North Triathlon in Stony Plain",
    caption: "The Great White North Triathlon",
    // Portrait photo: keep the FINISH banner and Daniel in the wide frame.
    position: "50% 48%",
  },
  {
    src: elkIsland,
    alt: "Green northern lights over a still lake in Elk Island National Park, reflected in the water behind a silhouetted island of trees",
    caption: "Elk Island National Park",
    // Tall photo: centre on the tree line, with the aurora above and its reflection below.
    position: "50% 46%",
  },
  {
    src: rainbow,
    alt: "A double rainbow over a suburban street after the rain, with someone lying on the wet road",
    caption: "A beautiful rainbow",
    position: "50% 65%",
  },
  {
    src: montBlanc,
    alt: "A green alpine valley seen from a high pass on the Tour du Mont Blanc, with jagged peaks and a winding trail",
    caption: "The Tour du Mont Blanc",
    // Trim empty sky rather than the valley.
    position: "50% 70%",
  },
  {
    src: algonquin,
    alt: "Daniel and another hiker on a lookout in Algonquin Park, over a lake and autumn forest at sunset",
    caption: "Algonquin Park",
    position: "50% 60%",
  },
];

export type Experience = {
  company: string;
  role: string;
  href: string;
  logo: StaticImageData;
  // Tile color behind the logo, matching each brand.
  tint: string;
  // Logo box size in px inside its tile, for logos that look too big or small at the default.
  logoSize?: number;
  // Optional wide image revealed behind the row on hover; falls back to a glow in `tint`.
  banner?: StaticImageData;
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
  // Not shown on the site; only used to order projects newest first.
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
    tagline: "Piano score editor with an AI composing partner",
    cover: chordcraft,
    date: "August 2026",
    stack: [
      "React",
      "TypeScript",
      "VexFlow",
      "Tone.js",
      "FastAPI",
      "PostgreSQL",
      "Redis",
      "LangGraph",
      "Claude",
    ],
    links: [
      { label: "GitHub", href: "https://github.com/danielquzhao/chordcraft" },
      { label: "usechordcraft.vercel.app", href: "https://usechordcraft.vercel.app" },
    ],
    body: [
      { type: "h", text: "Overview" },
      {
        type: "p",
        text: "ChordCraft is a piano score editor with a composing partner, like Cursor for sheet music. Select a few bars, describe the change you want, and review the AI's edit note by note before it lands. Only the bars you picked ever change.",
      },
      { type: "h", text: "Editing by describing it" },
      {
        type: "p",
        text: "Press ⌘K on a selection, or ask in the chat panel, and the edit comes back as a diff right on the staff: drafted notes in blue, the notes they replace in dashed orange. You can listen to it, then accept or reject the whole edit. I used blue and orange instead of green and red so the diff reads for colour-blind users too. Every accepted edit becomes a version you can undo or restore.",
      },
      {
        type: "p",
        text: "Pause at the end of a phrase and it suggests the next bar, shown faintly until you press Tab. You can start from a blank page, a chord progression, or an imported MusicXML or MIDI file.",
      },
      { type: "h", text: "The agent" },
      {
        type: "p",
        text: "Edits run through a LangGraph agent on Claude. It sees the selection plus two bars of context on either side, and edits through strict tools that map one-to-one to score operations (add, remove or update a note, set a chord). Anything outside the selection is rejected, and every tool call returns precise errors the model can act on.",
      },
      {
        type: "code",
        lang: "Agent flow",
        code: `context → model ⇄ tools → validate ─pass─▶ proposal
             ▲                │ fail (≤ 2 repairs)
             └────────────────┘`,
      },
      {
        type: "p",
        text: "Before you see anything, a deterministic music checker in Python reviews the edit. Bars whose rhythm doesn't add up, or chords wider than a hand can reach, go back to the model to repair, at most twice. Out-of-range notes, parallel fifths and odd spellings are flagged as warnings alongside the proposal.",
      },
      { type: "h", text: "Architecture" },
      {
        type: "p",
        text: "The front end is React and TypeScript, with VexFlow drawing the notation and Tone.js handling playback. Behind it, FastAPI queues each edit as a job in Redis. A worker runs the agent and publishes every step, which streams to the browser over server-sent events, so you watch the edit take shape and a dropped connection picks up where it left off. Scores, revisions and edit jobs live in PostgreSQL, with sign-in through Supabase.",
      },
    ],
  },
];

// Newest first.
export const projects = projectList.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
