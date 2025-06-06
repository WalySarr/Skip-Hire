Skip Hire Timeline Component
Overview
This React component displays available skips in a responsive timeline format. It fetches skip data from an API and presents it in either a horizontal layout for desktop or vertical layout for mobile devices. Users can select multiple skips and see a summary of their selection.

Key Features
Responsive design (mobile/desktop layouts)

Skip selection functionality

Real-time price calculation

Loading states and error handling

Clean, modern UI with smooth animations

Component Structure
The project is organized into several focused components:

1. Timeline.tsx (Main Component)
Manages the core logic including:

Data fetching from API

Responsive layout detection

State management (selected skips, loading, errors)

Price calculation and date formatting

Rendering the appropriate timeline view

2. HorizontalTimeline.tsx
Renders the desktop-optimized timeline with:

Horizontal card layout

Animated timeline dots

Skip details display

Selection highlighting

3. VerticalTimeline.tsx
Renders the mobile-optimized timeline with:

Vertical card stacking

Connectors between items

Mobile-friendly information hierarchy

Touch-friendly selection

4. LoadingSpinner.tsx
Displays a loading state with:

CSS spinner animation

Loading message

5. ErrorMessage.tsx
Handles error states with:

Error icon

Custom error message

Retry button

6. types.ts
Contains TypeScript type definitions:

Skip interface for API data

TimelineProps for component props

Technical Approach
Responsive Design:

Uses window resize event listener

768px breakpoint for mobile/desktop switch

Different components for each layout

Data Management:

Fetches data from REST API on component mount

Stores skip data in React state

Calculates total price (including VAT)

User Interaction:

Toggle selection with visual feedback

Selected items summary panel

Remove items from selection

Performance:

CSS animations for smooth transitions

Efficient rendering with React.memo pattern

Conditional rendering of components

Getting Started
Prerequisites
Node.js (v14+)

React (v17+)

Axios (for API calls)

Installation
Create a new React app:

bash
npx create-react-app skip-timeline
cd skip-timeline
Install dependencies:

bash
npm install axios
Add component files to src/components/Timeline/

Import the main component:

jsx
// App.js
import Timeline from './components/Timeline/Timeline';
Customization
API Endpoint:

Modify the URL in Timeline.tsx:

jsx
const response = await axios.get("https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft");
Styling:

Edit Timeline.css for visual customization

Modify breakpoint in resize handler:

jsx
setIsMobile(window.innerWidth < 768);
Content:

Update headers and labels in the JSX files

Modify date formatting in formatDate function

Best Practices
Type Safety:

Strict TypeScript interfaces for props and state

Type checking for API responses

Component Separation:

Single Responsibility Principle

Reusable sub-components

Error Handling:

Graceful error states

User-friendly error messages

Retry mechanism

Accessibility:

Semantic HTML structure

Sufficient color contrast

Interactive elements properly labeled

Future Improvements
Add pagination for large skip lists

Implement sorting/filtering options

Add animations for selection changes

Integrate with a state management library (Redux/Zustand)

Add tests using React Testing Library

This component demonstrates modern React patterns with TypeScript, responsive design principles, and clean component architecture. The separation into focused files enhances maintainability and allows for easier collaboration.

