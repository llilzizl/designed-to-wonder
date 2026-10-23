# Designed to Wonder

![Designed to Wonder shown on a phone, tablet and desktop](docs/readme-images/readme-responsive-phone-tablet-desktop.webp)

**Designed to Wonder** is an interactive tech publication and web development portfolio. It is a hub for tech news, honest answers and conversations about how technology is changing our future, written for anyone of any age who is curious about tech.

It also shows people what I can build. It links to my Les Braid It booking system and explains how good technology improves the client journey, something I care about as both a developer and a hairstylist.

**Live site:** [llilzizl.github.io/designed-to-wonder](https://llilzizl.github.io/designed-to-wonder/)
**Repository:** [github.com/llilzizl/designed-to-wonder](https://github.com/llilzizl/designed-to-wonder)

---

## Contents

1. [Project rationale](#1-project-rationale)
2. [User experience (UX)](#2-user-experience-ux)
3. [Design](#3-design)
4. [Features](#4-features)
5. [JavaScript architecture](#5-javascript-architecture)
6. [Accessibility](#6-accessibility)
7. [Technologies used](#7-technologies-used)
8. [File structure and naming](#8-file-structure-and-naming)
9. [Development life cycle](#9-development-life-cycle)
10. [Testing](#10-testing)
11. [Bugs](#11-bugs)
12. [Deployment](#12-deployment)
13. [Credits](#13-credits)

---

## 1. Project rationale

### The problem

Tech news is everywhere, but most of it is written either for experts or as scary headlines. People of all ages use phones, AI tools and smart devices every day without anyone explaining how they work or what they mean for the future.

At the same time, I am building a web development career. My first project was a static HTML and CSS site. I then built a full booking system for my hair business, but I had no single place to show that work or explain my thinking behind it.

### The solution

Designed to Wonder solves both problems in one site:

| Need | How the site meets it |
|---|---|
| Curious readers want tech explained honestly and simply | **Wonder Why** answers one big question per post, with an "Explain it simply" switch for younger readers |
| People want to know what tech is coming next | **T-Minus** tracks launches with live countdowns, clearly separating confirmed dates from rumours |
| People want inspiration from real stories | **The Shapers** tells the stories of people who shaped tech, with a lesson for builders |
| Small businesses want better client journeys | **Client Side** compares Apple, my styling chair and the tech that helps, then scores your own journey |
| Employers and clients want proof I can build | **Built by Lilian** shows my projects with live links, code links and a contact form |

### Why this is a real world application

- I will keep publishing posts and launches after the course. The site is built so that **new content is added in one data file**, not by editing HTML.
- The client journey content comes from my real experience running Les Braid It.
- It acts as my portfolio when I apply for roles, linking straight to my live projects.

### The name

"Designed to Wonder" says what the site is for: technology is designed by people, and it is designed to make us wonder. In the logo the "2" is drawn in pixels and also reads as a question mark, so the name reads as "Designed to Wonder" and asks a question at the same time.

---

## 2. User experience (UX)

### Target audiences

1. **Curious readers of any age (about 10 and up)** who enjoy tech but are not experts. They need plain English, a simpler reading mode and a site that is easy to move around.
2. **Small business owners and side hustlers** who want to improve how their clients find, book and come back to them.
3. **Employers, clients and tutors** who want to see what I can build and how I think.

### Site owner goals

- Start conversations about how technology is changing our future.
- Build a newsletter audience.
- Show my web development skills and link to my live work.
- Turn portfolio visitors into enquiries.

### User stories

Each user story is tested in [User story testing](#user-story-testing).

**Curious reader**
1. As a first time visitor, I want to understand what the site is about within a few seconds, so I can decide whether to stay.
2. As a reader, I want to browse questions by topic and search them, so I can find something I care about.
3. As a younger or newer reader, I want a simpler version of each answer, so I can understand it without jargon.
4. As a reader, I want to share my opinion and ask my own question, so the site feels like a conversation.
5. As a reader on a long post, I want to see how far through I am, so I know how much is left.

**Tech fan**

6. As a tech fan, I want to see countdowns to upcoming launches, so I know exactly when something arrives.
7. As a tech fan, I want to filter launches by category and search them, so I can focus on robots, phones or space.
8. As a tech fan, I want to save launches to a watchlist that is still there when I come back, so I can track what I care about.
9. As a tech fan, I want to know which launches are confirmed and which are only rumours, and where the information came from, so I can trust what I read.
10. As a curious person, I want to learn about the people who shaped tech, in short, interactive stories.

**Business owner**

11. As a small business owner, I want clear examples of a great client journey, so I can copy what works.
12. As a small business owner, I want to check my own client journey and get a score with a next step, so I know what to improve.

**Employer or client**

13. As an employer or potential client, I want to see Lilian's projects with live links and code, so I can judge her skills.
14. As a potential client, I want to contact Lilian easily and know my message was valid before sending.

**Every visitor**

15. As any visitor, I want the site to work on my phone, tablet and laptop.
16. As a visitor who prefers light screens or less motion, I want to switch to light mode and have animations reduced.
17. As a keyboard or screen reader user, I want every feature to work without a mouse.
18. As a newsletter subscriber, I want to sign up quickly and see clearly that it worked.

### Site owner stories

19. As the site owner, I want to add new posts, launches and shapers without editing HTML, so publishing is quick.
20. As the site owner, I want only valid emails and questions to be accepted, so my list stays clean.

---

## 3. Design

### The five planes of UX

**Strategy:** a curious, honest tech hub that is also a professional portfolio. Interactivity must help people explore or understand, not just decorate.

**Scope:** features were chosen by how much value they give users against how much time they take to build.

| Feature | Value (1 to 5) | Effort (1 to 5) | Decision |
|---|---|---|---|
| Launch countdowns with filters and search | 5 | 3 | Must have |
| Explain it simply mode | 5 | 2 | Must have |
| Journey map and journey score | 5 | 3 | Must have |
| Project showcase and contact form | 5 | 2 | Must have |
| Flip cards for The Shapers | 4 | 2 | Should have |
| Watchlist, votes and saved questions | 4 | 2 | Should have |
| Light and dark theme | 3 | 2 | Could have (built) |
| Reading progress bar | 3 | 1 | Could have (built) |
| User accounts and comments | 4 | 5 | Won't have yet (needs a back end) |
| Sending newsletter emails | 4 | 4 | Won't have yet (needs an email service) |

**Structure:** six pages plus a custom 404 page. The navigation is the same on every page and shows which page you are on.

```
Home
 |-- Client Side ....... client journey (Apple example, journey map, score)
 |-- T-Minus ........... new tech launches (countdowns, filters, watchlist)
 |-- The Shapers ....... people in tech (flip cards with timelines)
 |-- Wonder Why ........ question and answer blog (list view and article view)
 |-- Built by Lilian ... portfolio (projects, about, contact)
404 ................... "Signal lost" page with links home
```

**Skeleton:** every page uses the same frame, so visitors always know where they are:
- A floating glass header with the logo on the left and the navigation in the middle. Below 960px it becomes a menu button.
- A hero with the page title, a short introduction and the pixel band behind it.
- The main content in glass cards on a grid: three columns on desktop, two on tablet and one on phones.
- A footer with the newsletter sign up and links to every page.

See [Wireframes](#wireframes) for each page at phone, tablet and desktop sizes.

**Surface:** see the colour, type and imagery sections below.

### Mood board

The look comes from my reference images: neon purple pixel equalisers, glowing circuit boards, iridescent chrome bubbles, glassmorphism panels and a Y2K "core visual" design system.

![Mood board of purple and blue sci-fi reference images](docs/readme-images/readme-design-mood-board.webp)

| Reference | Where it appears on the site |
|---|---|
| Purple pixel equaliser | The animated pixel band behind every page title |
| Iridescent chrome bubbles | The floating liquid orbs in each hero |
| Glassmorphism panels | Frosted cards, header and stats strip |
| Chrome typography | Metallic page titles |
| Pixel graphics | The pixel 2 logo, Silkscreen labels and pixel bullet points |
| Circuit boards | Circuit divider lines and the journey map track |
| White bubble image | The light "Chrome Day" theme |

### Colour scheme

The brief was white, black, purple and blue with a sci-fi feel.

| Name | Hex | Used for |
|---|---|---|
| Void Black | `#05050A` | Page background |
| Deck Panel | `#12101F` | Glass cards and panels |
| Electric Violet | `#7B2FFF` | Glows, active states, buttons |
| Orchid Signal | `#C77BFF` | Purple text, links and labels on dark |
| Electric Blue | `#3D7BFF` | Glows and gradients |
| Holo Cyan | `#5CE1FF` | Tiny highlights and focus rings |
| Starlight White | `#F5F4FF` | Main text, white buttons, light theme |
| Muted Grey | `#A6A3C2` | Secondary text |

Electric Violet is very saturated, so it is only used for large shapes and glows. Small purple text uses the lighter Orchid Signal, which has much better contrast. All colours are CSS custom properties in `:root`, which made the light theme possible by swapping only the variables.

### Colour contrast audit

Every text colour was checked against the WCAG contrast formula, and the key pairs were confirmed in the [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/). WCAG AA needs at least 4.5:1 for normal text.

| Theme | Text | Colours | Ratio | Result |
|---|---|---|---|---|
| Dark | Main text | `#F5F4FF` on `#05050A` | 18.7:1 | AAA |
| Dark | Muted text | `#A6A3C2` on `#05050A` | 8.4:1 | AAA |
| Dark | Muted text on a glass panel | `#A6A3C2` on `#14121F` | 7.6:1 | AAA |
| Dark | Orchid links and labels | `#C77BFF` on `#05050A` | 7.5:1 | AAA |
| Dark | Orchid on a glass panel | `#C77BFF` on `#14121F` | 6.8:1 | AA |
| Dark | White on violet buttons | `#FFFFFF` on `#7B2FFF` | 5.7:1 | AA |
| Dark | Black on white buttons | `#05050A` on `#F5F4FF` | 18.7:1 | AAA |
| Dark | Error messages | `#FF8FC4` on `#05050A` | 9.7:1 | AAA |
| Dark | Success messages | `#7DF2C4` on `#05050A` | 14.9:1 | AAA |
| Light | Main text | `#0B0A16` on `#F3F2FA` | 17.7:1 | AAA |
| Light | Muted text | `#4A4766` on `#F3F2FA` | 7.9:1 | AAA |
| Light | Violet links and labels | `#5B12E0` on `#F3F2FA` | 7.2:1 | AAA |
| Light | Error messages | `#B0135B` on `#F3F2FA` | 6.1:1 | AA |
| Light | Success messages | `#0B7A52` on `#F3F2FA` | 4.8:1 | AA |

*[TO DO: add WebAIM screenshots for the main text, muted text and orchid pairs]*

**Foreground over background (criterion 1.4):** the pixel band and glowing orbs sit behind the hero titles. To keep text readable I faded the band out at its edges, kept it at 50% opacity and gave the hero text a soft dark halo. All body text sits on solid or frosted panels, never directly on the moving graphics.

### Typography

| Font | Used for | Why |
|---|---|---|
| **Orbitron** | Logo, page titles, headings | Geometric and futuristic, matches the logo |
| **Silkscreen** | Small labels, dates, tags | A pixel font that echoes the pixel 2 |
| **Inter** | All body text | Very readable at small sizes, important for younger readers |

Orbitron and Silkscreen are only used for short text. Long reading text always uses Inter.

### Imagery and logo

- **Logo:** "DESIGNED 2 WONDER", where the 2 is made of pixel squares that also form a question mark. The bright white square at the bottom is the question mark's dot. Saved as SVG so it stays sharp at any size.
- **No stock photos of people:** The Shapers use pixel monograms instead of photos, which keeps the style consistent and avoids image licence problems.
- **Project images:** real screenshots of my own websites, shown inside a browser frame.

### Wireframes

Each page is shown at phone, tablet and desktop width. Grey boxes show where content goes; the colours and effects come from the mood board.

**Home**
![Home wireframe](docs/readme-images/readme-wireframe-home.webp)

**Client Side**
![Client Side wireframe](docs/readme-images/readme-wireframe-client-side.webp)

**T-Minus**
![T-Minus wireframe](docs/readme-images/readme-wireframe-t-minus.webp)

**The Shapers**
![The Shapers wireframe](docs/readme-images/readme-wireframe-the-shapers.webp)

**Wonder Why**
![Wonder Why wireframe](docs/readme-images/readme-wireframe-wonder-why.webp)

**Built by Lilian**
![Built by Lilian wireframe](docs/readme-images/readme-wireframe-built-by-lilian.webp)

**Changes made during the build**
- **The Shapers** first had four cards in a row. The timelines on the back of each card needed more room, so it now has two per row, and one on phones.
- **The journey map** labels are hidden on phones and only the numbered squares show, so all six stages fit on a small screen. The stage name still appears in the panel underneath, and screen readers still hear every label.
- **The hero title** was planned on one line. "DESIGNED 2 WONDER" was too wide, so it now sits on two lines with the pixel 2 starting the second line, which reads naturally as "Designed / to Wonder".
- **The pixel band** was planned to fill the whole hero. It made the intro text harder to read, so it now sits behind the title only and fades at the edges (see [Bugs](#11-bugs)).

---

## 4. Features

### Shared on every page

**Navigation header**
- Floating glass header with the logo, six links and a theme button.
- The current page is highlighted and marked with `aria-current="page"`.
- Below 960px it becomes a menu button. The menu closes with the Escape key, when a link is chosen or when you click outside it.

![Mobile menu open](docs/readme-images/readme-mobile-menu-open.webp)

**Light and dark theme**
- The sun and moon button switches between "Neon Night" and "Chrome Day". Your choice is remembered.

![Light mode](docs/readme-images/readme-home-light-mode.webp)

**Animated hero**
- Chrome title, floating iridescent orbs and a pixel equaliser band drawn on a `<canvas>`.
- The animation pauses when it is off screen or the tab is hidden, and stays still if reduced motion is switched on.

**Newsletter sign up (footer)**
- Checks the email with JavaScript and shows a clear error or success message.

![Newsletter success message](docs/readme-images/readme-footer-newsletter-success.webp)

### Home

- Typewriter tagline and a stats strip, with counts that come from the data file.
- Cards linking to each section.
- A **live feed**: the next launch with a ticking countdown, the latest question and a "Shaper of the day" that changes daily.

![Home hero](docs/readme-images/readme-home-hero-desktop.webp)
![Live feed](docs/readme-images/readme-home-live-feed.webp)

### Client Side (client journey)

- The **Apple example**: why buying an iPhone feels different, and what Steve Jobs meant by starting with the customer experience.
- **Interactive journey map**: six stages (Discover, Book, Arrive, Experience, Leave, Return). Each shows *The Apple way*, *In my chair* and *Tech that helps*. Works with clicks, the previous and next buttons, and the arrow, Home and End keys.
- **Journey score**: tick what is true for your business and a ring fills up with your score, a label and a next step. Answers are saved.

![Journey map](docs/readme-images/readme-client-side-journey-map.webp)
![Journey score](docs/readme-images/readme-client-side-journey-score.webp)

### T-Minus (new tech launches)

- A **Next up** panel with a large live countdown.
- Cards for each launch with one of four badges: **Countdown**, **Landed**, **Window** or **Rumoured**. A card changes from Countdown to Landed by itself when its date arrives.
- **Category filters**, **live search** and a **watchlist** saved in the browser.
- Every card links to its source, and the page says when the dates were checked.

![Next launch](docs/readme-images/readme-t-minus-next-launch.webp)
![Launch cards](docs/readme-images/readme-t-minus-launch-cards.webp)
![Robots filter](docs/readme-images/readme-t-minus-robots-filter.webp)

### The Shapers (people in tech)

- Flip cards for Steve Jobs, Mira Murati, Tim Berners-Lee and Ada Lovelace. The front shows who they are and a quote. The back shows their timeline and a lesson for builders.
- Filter by Product, AI, Inventors and Pioneers.

![Flip cards](docs/readme-images/readme-shapers-flip-cards.webp)

### Wonder Why (question and answer blog)

- **List view** with topic filters and search.
- **Article view** opened with a link such as `wonder-why.html?post=why-ai-cant-replace-humans`, so every post can be shared.
- **Explain it simply** switch: every section has a standard and a simple version. Your choice is remembered.
- Reading time and a reading progress bar.
- A **vote** at the end of each post, remembered per post.
- **Ask a question** form with validation and a saved list of your questions.

![Question list](docs/readme-images/readme-wonder-why-question-list.webp)
![Standard version](docs/readme-images/readme-wonder-why-article-standard.webp)
![Simple version](docs/readme-images/readme-wonder-why-article-simple.webp)
![Vote](docs/readme-images/readme-wonder-why-vote.webp)

### Built by Lilian (portfolio)

- Three projects, each with a screenshot and **Overview**, **Features** and **Tech** tabs.
- Live site and code links open in a new tab.
- An about section and skills list.
- A **contact form** with validation. When it is valid, the visitor's email app opens with the message ready to send.

![Project showcase](docs/readme-images/readme-built-by-lilian-project.webp)
![Contact form errors](docs/readme-images/readme-built-by-lilian-contact-errors.webp)

### 404 page

- A "Signal lost" page with links back to the home page and the blog.

![404 page](docs/readme-images/readme-404-page.webp)

### Future features

- A real newsletter and contact service so messages are sent without the visitor's email app.
- User accounts so watchlists and votes sync between devices.
- Shared vote totals and comments, which need a database.
- A "listen to this post" button using the Web Speech API.
- An RSS feed for Wonder Why.

---

## 5. JavaScript architecture

The JavaScript is split by job, so each file is small and easy to find.

| File | What it does |
|---|---|
| `assets/js/utils.js` | Pure helper functions: countdown maths, date formatting, launch status, sorting, filtering, search, form validation, journey score, reading time. No page code, so they can be tested with Jest. |
| `assets/js/data.js` | All site content: launches, shapers, journey stages, posts and projects. |
| `assets/js/main.js` | Shared features: safe storage, theme, mobile menu, scroll reveal, newsletter, footer year. |
| `assets/js/pixel-field.js` | The animated pixel band in every hero. |
| `assets/js/home.js` and one file per page | Builds that page's cards from the data and adds its interactions. |

**Key decisions**

- **Data driven content.** Cards are built from `data.js`, so adding a launch or a post means adding one object. This meets the site owner story about publishing without editing HTML.
- **Pure functions are kept apart from page code.** The logic that matters most (countdowns, validation, scoring) can be tested automatically, and page scripts stay short.
- **Security.** Anything placed into the page with `innerHTML` first goes through `escapeHTML()`. This matters for the "Ask a question" form: if someone types HTML, it shows as text and never runs. This is covered by a test.
- **Defensive storage.** `localStorage` can be blocked in private windows. Every read and write is wrapped in `try...catch`, so the site still works without it.
- **No inline JavaScript.** All event listeners are added in the script files. Event delegation (one listener on a parent) handles the buttons inside cards, so it keeps working after cards are redrawn.
- **Performance.** One timer updates every countdown on the page. The canvas animation stops when it is off screen or the tab is hidden.
- **Progressive enhancement.** Pages that need JavaScript show a `<noscript>` message. The scroll reveal only hides content once JavaScript has added the `js` class, so nothing is lost if a script fails.

---

## 6. Accessibility

- Semantic HTML: `header`, `nav`, `main`, `section`, `article`, `aside` and `footer`, with one `h1` per page and headings in order.
- A **Skip to content** link at the top of every page.
- Every interactive feature is a real `<button>`, link or form field, so it works with a keyboard.
- **ARIA where it adds meaning:** `aria-expanded` on the menu button, `aria-pressed` on filters and toggles, `role="switch"` for Explain it simply, the tabs pattern with arrow keys for the journey map and project tabs, and `aria-live` regions so search results and form messages are read out.
- **Flip cards:** the hidden side is made `inert`, so keyboard and screen reader users only meet the side that is showing, and focus moves to the new side.
- Visible cyan focus rings on everything.
- `prefers-reduced-motion` stops the pixel band, orbs, typewriter and transitions.
- Links that open in a new tab say "(opens in a new tab)" to screen readers.
- Form errors are linked to their fields with `aria-describedby` and marked with `aria-invalid`.
- Every image has descriptive alt text. Decorative graphics are hidden from screen readers.
- Tested with the axe accessibility engine on every page in both themes: no violations (see [Testing](#10-testing)).

---

## 7. Technologies used

**Languages:** HTML5, CSS3, JavaScript (ES5 style in the browser, ES6 in the tests)

**Tools and libraries**
- [Google Fonts](https://fonts.google.com/): Orbitron, Silkscreen and Inter.
- [Jest](https://jestjs.io/): automated testing of the JavaScript functions.
- [Git](https://git-scm.com/) and [GitHub](https://github.com/): version control and hosting the code.
- [GitHub Pages](https://pages.github.com/): deployment.
- [VS Code](https://code.visualstudio.com/) with Live Server: development.
- [Canva](https://www.canva.com/): logo and mood board.
- [W3C Markup Validator](https://validator.w3.org/), [W3C CSS Validator (Jigsaw)](https://jigsaw.w3.org/css-validator/) and [JSHint](https://jshint.com/): code validation.
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/), [axe DevTools](https://www.deque.com/axe/devtools/) and Chrome Lighthouse: accessibility and quality testing.

No CSS or JavaScript frameworks were used. All layouts use CSS Grid, Flexbox and media queries.

---

## 8. File structure and naming

```
designed-to-wonder/
|-- index.html, client-side.html, t-minus.html, the-shapers.html,
|   wonder-why.html, built-by-lilian.html, 404.html
|-- assets/
|   |-- css/style.css
|   |-- images/
|   `-- js/  utils.js, data.js, main.js, pixel-field.js and one file per page
|-- docs/readme-images/
|-- tests/utils.test.js
|-- package.json
`-- README.md
```

### Image naming convention

My last project's feedback suggested image names that say where each image belongs. Every image now follows this pattern:

```
[page or area]-[component]-[description].[type]
```

| Prefix | Meaning | Example |
|---|---|---|
| `global-` | Used on every page | `global-logo-header-dark.svg`, `global-favicon-app-icon.svg` |
| `built-card-` | A project card on Built by Lilian | `built-card-les-braid-it-booking-home.webp` |
| `readme-` | Documentation only, never on the live site | `readme-t-minus-robots-filter.webp` |

All file names are lowercase with hyphens and no spaces, so they work on every operating system. Photos use WebP for small file sizes, and graphics use SVG so they stay sharp.

---

## 9. Development life cycle

I worked through six stages. Testing ran alongside the build, not only at the end.

```
Plan -> Design -> Build feature by feature -> Test -> Deploy -> Evaluate -> back to Plan
```

### Stage 1: Planning and research

- Defined the problem, audiences and goals (see [Project rationale](#1-project-rationale)).
- Reviewed feedback from Milestone 1. Actions I took from it:
  - **Document the full development life cycle** (this section).
  - **Use a clearer image naming convention** (see [File structure and naming](#8-file-structure-and-naming)).
  - Keep what worked: screenshots matched to user stories, a contrast audit, and small commits with clear verbs.
- Researched content: launch dates and facts were checked against news sources on 23 October 2026. Each launch links to its source.
- Wrote the user stories and ranked features (see the scope table in [Design](#3-design)).

### Stage 2: Design

- Collected reference images into a mood board and chose the palette, fonts and logo.
- Designed the logo: "DESIGNED 2 WONDER" with a pixel 2 that reads as a question mark.
- Chose page names: Client Side, T-Minus, The Shapers, Wonder Why and Built by Lilian.
- Made wireframes for mobile, tablet and desktop.
- Checked the palette for contrast before writing any code.

### Stage 3: Development

I built and tested the site in a local working folder first. Then I committed it to this repository **one feature at a time, in the order each part depends on the last**: structure first, then design, logic and tests, shared features, and finally each page. Every commit adds one working piece, so the history can be followed step by step.

| # | Commit | Area | What it added |
|---|---|---|---|
| 1 | [`bebb06f`](https://github.com/llilzizl/designed-to-wonder/commit/bebb06f) | Structure | Home page HTML |
| 2 | [`f522b13`](https://github.com/llilzizl/designed-to-wonder/commit/f522b13) | Setup | `.gitignore`, `package.json` and Jest |
| 3 | [`254bc03`](https://github.com/llilzizl/designed-to-wonder/commit/254bc03) | Design assets | Logo, favicon and pixel 2 mark |
| 4 | [`6999dc4`](https://github.com/llilzizl/designed-to-wonder/commit/6999dc4) | Styling | Main stylesheet with dark and light themes |
| 5 | [`860766c`](https://github.com/llilzizl/designed-to-wonder/commit/860766c) | Logic | Helper functions for countdowns, filters and validation |
| 6 | [`7bf09d2`](https://github.com/llilzizl/designed-to-wonder/commit/7bf09d2) | Testing | Jest tests for the helper functions |
| 7 | [`fd75153`](https://github.com/llilzizl/designed-to-wonder/commit/fd75153) | Content | Site content for launches, shapers, posts and projects |
| 8 | [`1a14687`](https://github.com/llilzizl/designed-to-wonder/commit/1a14687) | Shared features | Theme switch, mobile menu and newsletter validation |
| 9 | [`76329ff`](https://github.com/llilzizl/designed-to-wonder/commit/76329ff) | Shared features | Animated pixel band in the hero |
| 10 | [`7e67f86`](https://github.com/llilzizl/designed-to-wonder/commit/7e67f86) | Home page | Typewriter and live feed |
| 11 | [`73fb544`](https://github.com/llilzizl/designed-to-wonder/commit/73fb544) | Client Side | Journey map and journey score |
| 12 | [`38600b8`](https://github.com/llilzizl/designed-to-wonder/commit/38600b8) | T-Minus | Countdowns, filters and watchlist |
| 13 | [`ee73acc`](https://github.com/llilzizl/designed-to-wonder/commit/ee73acc) | The Shapers | Flip cards |
| 14 | [`27f2d50`](https://github.com/llilzizl/designed-to-wonder/commit/27f2d50) | Wonder Why | Simple mode, votes and questions |
| 15 | [`e0f651c`](https://github.com/llilzizl/designed-to-wonder/commit/e0f651c) | Built by Lilian | Portfolio page and contact form |
| 16 | [`b054eba`](https://github.com/llilzizl/designed-to-wonder/commit/b054eba) | Error handling | Custom 404 page |
| 17 | [`5f9f01f`](https://github.com/llilzizl/designed-to-wonder/commit/5f9f01f) | Documentation | README screenshots |
| 18 | [`492f11f`](https://github.com/llilzizl/designed-to-wonder/commit/492f11f) | Documentation | README |

All of these were committed on 23 October 2026. Changes made after testing on the live site are committed separately, one fix per commit (see [Bugs](#11-bugs)).

**The order I built each feature in**
1. Write the helper functions the feature needs in `utils.js`, with Jest tests.
2. Add any content the feature needs to `data.js`.
3. Build the HTML and CSS, then the page script.
4. Test by hand at phone, tablet and desktop sizes, with the keyboard, and in both themes.
5. Fix anything found, then validate the code.

**Commit message style:** each message starts with a verb (`Add`, `Fix`, `Update`) and says what the commit does, so the history reads like a list of steps.

### Stage 4: Testing

Testing ran alongside the build:
- **Automated:** Jest tests were run after every change to `utils.js` or `data.js`, and again on my own machine after the files were committed (59 of 59 passed).
- **Manual:** each feature was tested by hand as it was finished (see [Manual testing](#manual-feature-testing)).
- **Validation:** HTML, CSS and JavaScript were run through validators, and the errors found were fixed (see [Bugs](#11-bugs)).
- **Accessibility:** axe and keyboard checks on every page, in both themes.
- **Live site:** after deployment, every page and feature was checked again on GitHub Pages.

### Stage 5: Deployment

Deployed to GitHub Pages from the `main` branch once every feature was committed, then tested on the live site to make sure it matches the local version (see [Deployment](#12-deployment)).

### Stage 6: Evaluation and maintenance

**What went well**
- Keeping the logic in pure functions meant I could test the hardest parts (countdowns and validation) automatically.
- Keeping content in a data file makes adding new posts quick.

**What I would do differently**
- Commit to GitHub while building, not after, so the history also shows the fixes I made along the way.
- Deploy to GitHub Pages on day one and test on the live site after every feature.
- Write the tests before each feature every time, not after.
- Plan the flip card height with real content earlier, which would have avoided one of the bugs below.

**Maintenance plan**
- Re-check launch dates every month and update `data.js`. Countdowns move to "Landed" by themselves when a date passes.
- Publish one new Wonder Why post per issue.
- Run `npm test` and the validators before every push.

---

## 10. Testing

### Automated testing with Jest

59 tests cover every helper function plus checks on the content itself, for example that every launch has a source link and every post has a simple version.

```
npm install
npm test
```

![Jest results: 59 tests passed](docs/readme-images/readme-testing-jest-results.webp)

| Area tested | Examples of what is checked |
|---|---|
| `escapeHTML` | HTML typed by a user is shown as text, not run |
| `getTimeRemaining` | Days, hours, minutes and seconds are correct, never negative, and bad dates are handled |
| `getLaunchStatus` and `sortLaunches` | Countdown, landed, window and rumoured are decided correctly and sorted in the right order |
| `filterByCategory` and `searchItems` | Filters and search, including searching tags and ignoring capitals |
| `isValidEmail`, `validateContactForm`, `validateQuestion` | Good and bad emails, empty fields, messages made only of spaces |
| `calculateJourneyScore` | Every score band and its label, and scores can't go past 0 or 100 |
| `estimateReadingTime` and `getScrollPercent` | Rounding, minimum values and edge cases |
| Content in `data.js` | Unique ids and slugs, sources present, every category has a filter |

### Validator testing

<img width="1868" height="456" alt="image" src="https://github.com/user-attachments/assets/b0fd88f0-2a10-478c-82a7-22a46dd37fa9" />
<img width="1876" height="416" alt="image" src="https://github.com/user-attachments/assets/f36a5e90-c39b-4cfd-abc3-e432d26c2b76" />
<img width="1847" height="367" alt="image" src="https://github.com/user-attachments/assets/f76afe44-7937-4a17-b9e9-80c723c2d591" />
<img width="1842" height="401" alt="image" src="https://github.com/user-attachments/assets/18dff4ef-b561-47f7-90c0-f6ffcd196a59" />
<img width="1830" height="415" alt="image" src="https://github.com/user-attachments/assets/80b0774d-b56d-4e93-892b-0dc5cfac9366" />
<img width="1835" height="425" alt="image" src="https://github.com/user-attachments/assets/be4c6620-e337-45c6-b489-3139d3ce065a" />

<img width="1862" height="817" alt="image" src="https://github.com/user-attachments/assets/589fb3f8-2023-4e9d-b202-1daedc4a6bb1" />

| Tool | Files | Result |
|---|---|---|
| W3C Markup Validator | All 7 HTML pages | No errors or warnings |
| W3C CSS Validator (Jigsaw) | `style.css` | No errors |
| JSHint (`esversion: 6`) | All JavaScript files | No warnings |

### Accessibility testing

| Page | axe (dark theme) | axe (light theme) |
|---|---|---|
| Home | No violations | No violations |
| Client Side | No violations | No violations |
| T-Minus | No violations | No violations |
| The Shapers | No violations | No violations |
| Wonder Why (list) | No violations | No violations |
| Wonder Why (article) | No violations | No violations |
| Built by Lilian | No violations | No violations |
| 404 | No violations | No violations |

I also navigated every page using only the keyboard (Tab, Shift+Tab, Enter, Space, arrow keys and Escape).

### Lighthouse

Results from Chrome Lighthouse during development:

| Page | Device | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|---|
| Home | Mobile | 96 | 100 | 100 | 100 |
| Home | Desktop | 86 | 100 | 100 | 100 |
| T-Minus | Mobile | 90 | 100 | 100 | 100 |
| T-Minus | Desktop | 99 | 100 | 100 | 100 |
| Wonder Why | Mobile | 73 | 100 | 100 | 100 |
| Wonder Why | Desktop | 99 | 100 | 100 | 100 |

<img width="1612" height="826" alt="image" src="https://github.com/user-attachments/assets/0e0ea146-8933-46a2-a5fc-013c476b960a" />
<img width="1690" height="875" alt="image" src="https://github.com/user-attachments/assets/7578643c-99fc-4941-b73a-eb968c83614d" />


<img width="1902" height="887" alt="image" src="https://github.com/user-attachments/assets/944bc58c-656e-4769-921e-e84771b774dc" />
<img width="1648" height="842" alt="image" src="https://github.com/user-attachments/assets/4a1199cf-b22d-4917-9345-abe124207867" />

<img width="763" height="741" alt="image" src="https://github.com/user-attachments/assets/77349ce5-20bf-46b1-9eaf-f65a30d0959e" />
<img width="1741" height="890" alt="image" src="https://github.com/user-attachments/assets/8d244543-1b94-4dd0-945b-4cb4296f16a8" />

The Best Practices score lost points only for a console error: the test environment could not reach Google Fonts. 

### Responsiveness

Tested in Chrome DevTools at each width, and on my own phone.

| Width | Device | Layout | Navigation | Features | Result |
|---|---|---|---|---|---|
| 320px | Small phone | One column | Menu button | All work | Pass |
| 390px | iPhone | One column | Menu button | All work | Pass |
| 820px | iPad | Two columns | Menu button | All work | Pass |
| 1024px | Small laptop | Three columns | Full nav | All work | Pass |
| 1440px | Desktop | Three columns | Full nav | All work | Pass |

No page scrolls sideways at any of these widths.

### Browser testing

| Browser | Result |
|---|---|
| Chrome | Pass |
| Firefox | Pass |
| Safari (Mac and iPhone) | Pass |
| Edge | Pass |

### Manual feature testing

| Feature | Action | Expected result | Result |
|---|---|---|---|
| Mobile menu | Tap the menu button | Menu opens and `aria-expanded` becomes true | Pass |
| Mobile menu | Press Escape | Menu closes and focus returns to the button | Pass |
| Theme | Click the sun and moon button, then reload | Light mode stays on | Pass |
| Newsletter | Submit "bad" | Error message appears | Pass |
| Newsletter | Submit a valid email | Success message names the email | Pass |
| Home feed | Wait one second | Countdown seconds change | Pass |
| Journey map | Press the right arrow on a stage | Next stage opens and is focused | Pass |
| Journey map | Click Next stage | Next stage opens | Pass |
| Journey score | Tick 4 of 8 | Score shows 50% and "A few bumps" | Pass |
| Journey score | Reload | Ticks and score are still there | Pass |
| Journey score | Click Reset my answers | Score returns to 0% | Pass |
| T-Minus | Click Robots | Only the 2 robot launches show | Pass |
| T-Minus | Search "moon" | Only Artemis III shows | Pass |
| T-Minus | Search "zzzz" | Friendly "no launches match" message | Pass |
| T-Minus | Add a launch to the watchlist, reload, choose My watchlist only | Only the saved launch shows | Pass |
| T-Minus | Countdown reaches zero | Card changes to Landed | Pass |
| The Shapers | Click See the timeline | Card flips and focus moves to Flip back | Pass |
| The Shapers | Tab after flipping | Hidden front side is skipped | Pass |
| The Shapers | Click AI | Only Mira Murati shows | Pass |
| Wonder Why | Click a question | Article opens with its own address | Pass |
| Wonder Why | Turn on Explain it simply | Every section changes to the simple version | Pass |
| Wonder Why | Vote, then reload | Vote and simple mode are remembered | Pass |
| Wonder Why | Scroll to the bottom of a post | Progress bar reaches 100% | Pass |
| Wonder Why | Open `?post=nope` | Friendly "could not be found" message and the full list | Pass |
| Ask a question | Submit empty | Error under the field | Pass |
| Ask a question | Submit `<b>Wonder why</b> cats purr?` | Saved and shown as plain text, not bold | Pass |
| Ask a question | Click Remove | Question is removed | Pass |
| Built by Lilian | Click Features and Tech tabs | The matching panel shows | Pass |
| Contact form | Submit empty | Three error messages and focus on Name | Pass |
| Contact form | Enter `ada@` as the email | Email error message | Pass |
| Contact form | Submit a valid message | Success message and the email app opens | Pass |
| External links | Click any external link | Opens in a new tab | Pass |
| Reduced motion | Turn on reduced motion in the device settings | Pixel band, orbs and typewriter stop | Pass |
| 404 | Visit a page that doesn't exist on the live site | Signal lost page shows | *[TO DO: test on live site]* |

### User story testing

| # | User story | How it is met | Evidence |
|---|---|---|---|
| 1 | Understand the site quickly | Hero title, tagline and intro say what the site is | [Home hero](docs/readme-images/readme-home-hero-desktop.webp) |
| 2 | Browse questions by topic and search | Topic filters and search on Wonder Why | [Question list](docs/readme-images/readme-wonder-why-question-list.webp) |
| 3 | A simpler version | Explain it simply switch | [Simple version](docs/readme-images/readme-wonder-why-article-simple.webp) |
| 4 | Share my opinion and ask a question | Vote and Ask a question form | [Vote](docs/readme-images/readme-wonder-why-vote.webp), [Question saved](docs/readme-images/readme-wonder-why-question-saved.webp) |
| 5 | See how far through a post I am | Reading progress bar and reading time | [Article](docs/readme-images/readme-wonder-why-article-standard.webp) |
| 6 | Countdowns to launches | Next up panel and countdown cards | [Next launch](docs/readme-images/readme-t-minus-next-launch.webp) |
| 7 | Filter and search launches | Category chips and live search | [Robots filter](docs/readme-images/readme-t-minus-robots-filter.webp) |
| 8 | A watchlist that stays | Watchlist saved in the browser | [Launch cards](docs/readme-images/readme-t-minus-launch-cards.webp) |
| 9 | Know what is confirmed and where it came from | Status badges and source links | [Launch cards](docs/readme-images/readme-t-minus-launch-cards.webp) |
| 10 | Learn about people who shaped tech | Flip cards with timelines | [Flip cards](docs/readme-images/readme-shapers-flip-cards.webp) |
| 11 | Examples of a great client journey | Apple example and journey map | [Journey map](docs/readme-images/readme-client-side-journey-map.webp) |
| 12 | Score my own client journey | Journey score with next step | [Journey score](docs/readme-images/readme-client-side-journey-score.webp) |
| 13 | See Lilian's projects | Project showcase with live and code links | [Project](docs/readme-images/readme-built-by-lilian-project.webp) |
| 14 | Contact Lilian easily | Validated contact form | [Contact errors](docs/readme-images/readme-built-by-lilian-contact-errors.webp) |
| 15 | Works on every device | Responsive layouts | [Responsive](docs/readme-images/readme-responsive-phone-tablet-desktop.webp) |
| 16 | Light mode and less motion | Theme switch and reduced motion support | [Light mode](docs/readme-images/readme-home-light-mode.webp) |
| 17 | Keyboard and screen reader friendly | Semantic HTML, ARIA, focus management | [Accessibility testing](#accessibility-testing) |
| 18 | Quick newsletter sign up | Footer form with clear feedback | [Newsletter](docs/readme-images/readme-footer-newsletter-success.webp) |
| 19 | Add content without editing HTML | Content lives in `data.js` | [JavaScript architecture](#5-javascript-architecture) |
| 20 | Only valid emails and questions | Validation with tests | [Jest results](docs/readme-images/readme-testing-jest-results.webp) |

---

## 11. Bugs

### Fixed bugs

| Bug | Cause | Fix |
|---|---|---|
| The holographic card border failed the W3C CSS validator | It used a CSS `mask` trick the validator does not recognise | Replaced it with a violet and blue `box-shadow` glow, which looks similar and validates |
| The pixel band also failed CSS validation, and it made the hero text harder to read | It used `mask: radial-gradient(...)` and sat behind the paragraph | Moved the fade into the canvas code, moved the band up behind the title only, and added a soft dark halo behind hero text |
| The search icon sat on top of the placeholder text | A later, more general `input` rule overwrote the left padding | Made the search field rule more specific: `.search-field input[type="search"]` |
| Badges stretched across the whole card | Cards are flex columns, which stretch their children | Gave badges `width: fit-content` |
| Opening a Shaper card showed the bottom of the timeline with the name cut off | Focusing the Flip back button scrolled the card's back to the bottom | Focus now moves with `preventScroll: true`, the new side scrolls to the top, and cards are taller |
| The journey map's glowing line did not line up with the stage dots | It measured from the left edge of each button, but the buttons have different widths | It now measures from the centre of the first dot to the centre of the chosen one |
| The validator warned about empty headings on Wonder Why | The article title and vote heading were empty until JavaScript filled them | Added starting text that JavaScript replaces |
| An accessibility check flagged `aria-pressed` on the project tabs | `aria-pressed` is not allowed on `role="tab"` | Removed it and used `aria-selected` for both meaning and styling |

### Unfixed bugs and limitations

- **404 page styles on deep links (GitHub Pages):** if someone visits a missing address inside a folder, such as `/designed-to-wonder/a/b`, GitHub Pages shows `404.html` but its relative links to the CSS point to the wrong folder, so it appears unstyled. Missing pages at the top level, the common case, work correctly. I left this because using absolute paths would break the site when opened locally.
- **Contact form needs an email app:** the form opens the visitor's email app. If they don't have one set up, nothing is sent. The form says this clearly, and a hosted form service is listed in future features.
- **Saved data is per browser:** watchlists, votes and questions are stored in `localStorage`, so they don't move between devices.
- **Launch information can go out of date:** dates are checked monthly (see the maintenance plan) and every card shows its source.

---

## 12. Deployment

### GitHub Pages

1. Push the code to the `main` branch on GitHub.
2. In the repository, open **Settings**, then **Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select the **main** branch and the **/ (root)** folder, then **Save**.
5. After a minute or two the live address appears at the top of the Pages settings.
6. Open the live site and check it matches the local version (navigation, every feature, no console errors).

### Run it locally

```
git clone https://github.com/llilzizl/designed-to-wonder.git
cd designed-to-wonder
```

Open `index.html` with VS Code Live Server. To run the tests you need [Node.js](https://nodejs.org/):

```
npm install
npm test
```

### Fork the repository

1. On the repository page, click **Fork**.
2. A copy is created in your own GitHub account.

### Version control

Git was used throughout with small commits, one for each feature or fix, and messages that start with a verb, such as `Add`, `Fix`, `Update` or `Refactor`.

---

## 13. Credits

### Content
- All posts, page text and the client journey content were written by me, based on my experience running Les Braid It.
- Launch facts were checked on 23 October 2026 using the sources linked on each card: MacRumors, Gadget Hacks, PCWorld, heise online and Wikipedia.
- Biographical facts for The Shapers come from widely published sources, including Wikipedia.

### Code
- The CSS-only "liquid orb" uses layered `radial-gradient` backgrounds and an animated `border-radius`, a common technique explained on [CSS-Tricks](https://css-tricks.com/).
- The accessible tabs pattern follows the [WAI-ARIA Authoring Practices Guide](https://www.w3.org/WAI/ARIA/apg/patterns/tabs/).
- [MDN Web Docs](https://developer.mozilla.org/) was used for `localStorage`, the Canvas API, `IntersectionObserver`, `URLSearchParams` and the `inert` attribute.
- Development support: I used Claude (Anthropic) as an AI coding assistant for planning, code suggestions and reviewing my work. *[TO DO: check this matches your course rules on AI use]*

### Media
- Logo and icons designed by me.
- Project screenshots are of my own websites.
- Mood board reference images were collected for inspiration only and are not used on the live site: *[TO DO: add where you found them, for example Pinterest, with links]*

### Acknowledgements
- My tutor, for the Milestone 1 feedback that shaped this project's documentation.
