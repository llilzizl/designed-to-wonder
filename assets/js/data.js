/* ==========================================================
   Designed to Wonder: site content
   ----------------------------------------------------------
   All the cards on the site are built from these lists by
   JavaScript, so new content is added here, not in the HTML.

   To add a new launch, shaper, post or project: copy one
   object, paste it at the end of its list and change the text.

   Facts were checked on 23 October 2026. Each launch keeps a
   link to its source so it can be checked again later.
   ========================================================== */
(function (root) {
  'use strict';

  /* ---------- T-Minus: tech launches ----------
     date      exact launch date (gives a live countdown)
     window    used when only a rough time frame is known
     confirmed false means it is only reported, not announced */
  var launches = [
    {
      id: 'iphone-duo',
      name: 'Apple iPhone Duo',
      maker: 'Apple',
      category: 'phones',
      date: '2026-10-23T08:00:00+01:00',
      confirmed: true,
      summary: 'Apple\'s first foldable iPhone. It opens from a 5.4 inch phone into a 7.6 inch mini tablet, with the new A20 Pro chip inside.',
      detail: 'Starts at $1,999 in the US. Pre-orders opened on 16 October 2026.',
      tags: ['foldable', 'iphone', 'apple'],
      source: { label: 'MacRumors', url: 'https://www.macrumors.com/2026/09/09/apple-announces-foldable-iphone-duo/' }
    },
    {
      id: 'apple-homeview',
      name: 'Apple HomeView',
      maker: 'Apple',
      category: 'smart-home',
      date: '2026-11-13T08:00:00+00:00',
      confirmed: true,
      summary: 'A smart home screen for your kitchen counter or wall. Control lights and locks, see your calendar and make video calls.',
      detail: 'Announced on 13 October 2026 at $299 in the US.',
      tags: ['smart home', 'siri', 'display'],
      source: { label: 'Gadget Hacks', url: 'https://apple.gadgethacks.com/news/apple-smart-home-event-2026-prices-and-release-dates/' }
    },
    {
      id: 'gta-6',
      name: 'Grand Theft Auto VI',
      maker: 'Rockstar Games',
      category: 'gaming',
      date: '2026-11-19T00:00:00+00:00',
      confirmed: true,
      summary: 'One of the most anticipated games ever made, set in a modern version of Vice City.',
      detail: 'Launches on PlayStation 5 and Xbox Series X|S. A PC version is expected later.',
      tags: ['game', 'playstation', 'xbox'],
      source: { label: 'PCWorld', url: 'https://www.pcworld.com/article/3052217/gta-6s-release-date-confirmed-for-real-this-time-seriously.html' }
    },
    {
      id: 'tesla-cybercab',
      name: 'Tesla Cybercab',
      maker: 'Tesla',
      category: 'cars',
      window: 'Customer deliveries targeted by the end of 2026',
      confirmed: true,
      summary: 'A two seat robotaxi with no steering wheel and no pedals. It has been giving paid rides in Austin, Texas since 4 September 2026.',
      detail: 'US safety regulators opened an investigation into the car in September 2026, so the timeline could move.',
      tags: ['self driving', 'robotaxi', 'electric'],
      source: { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Tesla_Cybercab' }
    },
    {
      id: '1x-neo',
      name: '1X NEO',
      maker: '1X',
      category: 'robots',
      window: 'First home deliveries planned for 2026',
      confirmed: true,
      summary: 'A soft, lightweight humanoid robot designed to help with chores around the home.',
      detail: 'Early access costs $20,000, or $499 a month as a subscription.',
      tags: ['humanoid', 'home robot', 'chores'],
      source: { label: 'heise online', url: 'https://heise.de/-11287205' }
    },
    {
      id: 'googlebook',
      name: 'Googlebook',
      maker: 'Google',
      category: 'laptops',
      window: 'First laptops expected late 2026',
      confirmed: true,
      summary: 'The next generation of Chromebook, joining Android and ChromeOS together into one laptop system.',
      detail: 'Announced at Google I/O in May 2026. Google says they will sit at the premium end of the market.',
      tags: ['laptop', 'android', 'chromeos'],
      source: { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Googlebook' }
    },
    {
      id: 'artemis-3',
      name: 'NASA Artemis III',
      maker: 'NASA',
      category: 'space',
      window: 'No earlier than late 2027',
      confirmed: true,
      summary: 'Astronauts will test docking with the new SpaceX and Blue Origin moon landers while orbiting Earth.',
      detail: 'The first crewed Moon landing of the programme has moved to Artemis IV, planned for around 2028.',
      tags: ['moon', 'astronauts', 'nasa'],
      source: { label: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Artemis_III' }
    },
    {
      id: 'apple-glasses',
      name: 'Apple AI glasses',
      maker: 'Apple',
      category: 'wearables',
      window: 'Reported for WWDC 2027',
      confirmed: false,
      summary: 'Glasses with cameras, speakers and AI, but no screen, to rival Meta\'s Ray-Ban glasses.',
      detail: 'Apple has not announced these. Reports say they could be shown at WWDC 2027.',
      tags: ['glasses', 'ai', 'apple'],
      source: { label: 'MacRumors', url: 'https://www.macrumors.com/guide/upcoming-apple-products/' }
    },
    {
      id: 'apple-tabletop-robot',
      name: 'Apple tabletop robot',
      maker: 'Apple',
      category: 'robots',
      window: 'Reported for 2027',
      confirmed: false,
      summary: 'A home display on a thin robotic arm that can turn to face you, reported to cost around $1,000.',
      detail: 'Apple has not announced this. It is a rumour from supply chain reports.',
      tags: ['robot', 'home', 'apple'],
      source: { label: 'MacRumors', url: 'https://www.macrumors.com/guide/upcoming-apple-products/' }
    }
  ];

  var launchCategories = [
    { id: 'all', label: 'All' },
    { id: 'phones', label: 'Phones' },
    { id: 'robots', label: 'Robots' },
    { id: 'cars', label: 'Cars' },
    { id: 'space', label: 'Space' },
    { id: 'gaming', label: 'Gaming' },
    { id: 'smart-home', label: 'Smart home' },
    { id: 'laptops', label: 'Laptops' },
    { id: 'wearables', label: 'Wearables' }
  ];

  /* ---------- The Shapers: people who shaped tech ---------- */
  var shapers = [
    {
      id: 'steve-jobs',
      name: 'Steve Jobs',
      initials: 'SJ',
      category: 'product',
      role: 'Co-founder of Apple',
      years: '1955 to 2011',
      oneLiner: 'Turned computers from beige boxes into personal, beautiful tools that anyone could use.',
      quote: 'Design is not just what it looks like and feels like. Design is how it works.',
      timeline: [
        { year: '1976', text: 'Starts Apple with Steve Wozniak in California.' },
        { year: '1984', text: 'Launches the Macintosh, one of the first popular computers with a mouse and pictures on screen.' },
        { year: '1986', text: 'Buys the company that becomes Pixar, later home of Toy Story.' },
        { year: '1997', text: 'Returns to Apple when it is close to running out of money.' },
        { year: '2001', text: 'Launches the iPod: "1,000 songs in your pocket".' },
        { year: '2007', text: 'Introduces the iPhone, a phone, an iPod and an internet device in one.' }
      ],
      lesson: 'Start with the experience you want the customer to have, then work back to the technology.'
    },
    {
      id: 'mira-murati',
      name: 'Mira Murati',
      initials: 'MM',
      category: 'ai',
      role: 'Founder of Thinking Machines Lab',
      years: 'Born 1988',
      oneLiner: 'A product leader who went from building electric cars to leading the team behind ChatGPT.',
      quote: '',
      timeline: [
        { year: '1988', text: 'Born in Vlorë, Albania. Later studies engineering at Dartmouth in the US.' },
        { year: '2013', text: 'Joins Tesla as a product manager on the Model X.' },
        { year: '2018', text: 'Joins OpenAI after working on augmented reality at Leap Motion.' },
        { year: '2022', text: 'Becomes OpenAI\'s chief technology officer and leads work on ChatGPT, DALL-E and Sora.' },
        { year: '2024', text: 'Leaves OpenAI to start something of her own.' },
        { year: '2025', text: 'Launches Thinking Machines Lab, and releases its first product, Tinker, in October.' }
      ],
      lesson: 'You do not need to start as a coder to lead technology. Product thinking, asking what people need, is a superpower.'
    },
    {
      id: 'tim-berners-lee',
      name: 'Tim Berners-Lee',
      initials: 'TB',
      category: 'inventor',
      role: 'Inventor of the World Wide Web',
      years: 'Born 1955',
      oneLiner: 'A British scientist who invented the web, then gave it to the world for free.',
      quote: 'This is for everyone.',
      timeline: [
        { year: '1989', text: 'Proposes a system for sharing documents at CERN, the physics lab in Switzerland.' },
        { year: '1990', text: 'Writes the first web browser and the first web server.' },
        { year: '1991', text: 'The first website goes public. It explains what the web is.' },
        { year: '1994', text: 'Founds the W3C, the group that writes web standards. Its HTML validator checks this site.' },
        { year: '2004', text: 'Knighted by Queen Elizabeth II for services to the internet.' },
        { year: '2012', text: 'Tweets "This is for everyone" live from the London Olympics opening ceremony.' }
      ],
      lesson: 'Giving an idea away can make it bigger than keeping it. Open standards let everyone build.'
    },
    {
      id: 'ada-lovelace',
      name: 'Ada Lovelace',
      initials: 'AL',
      category: 'pioneer',
      role: 'The first computer programmer',
      years: '1815 to 1852',
      oneLiner: 'Wrote what is often called the first computer program, a hundred years before modern computers existed.',
      quote: 'The Analytical Engine weaves algebraical patterns just as the Jacquard-loom weaves flowers and leaves.',
      timeline: [
        { year: '1815', text: 'Born in London, daughter of the poet Lord Byron.' },
        { year: '1833', text: 'Meets Charles Babbage and sees his calculating machine.' },
        { year: '1843', text: 'Publishes notes on Babbage\'s Analytical Engine, including step by step instructions for the machine.' },
        { year: '1843', text: 'Imagines that machines could one day make music and art, not just do sums.' },
        { year: 'Today', text: 'Ada Lovelace Day celebrates women in science every October.' }
      ],
      lesson: 'Imagination is a technical skill. She saw what machines could become before they were even built.'
    }
  ];

  var shaperCategories = [
    { id: 'all', label: 'All' },
    { id: 'product', label: 'Product' },
    { id: 'ai', label: 'AI' },
    { id: 'inventor', label: 'Inventors' },
    { id: 'pioneer', label: 'Pioneers' }
  ];

  /* ---------- Client Side: the client journey ---------- */
  var journeyStages = [
    {
      id: 'discover',
      label: 'Discover',
      apple: 'Apple Stores put every product out on tables to pick up and try. Nothing is behind glass, so you can picture it in your life before you buy.',
      chair: 'Clients find me on Instagram and TikTok. Real photos of real clients do the same job as Apple\'s tables: they let people see the result before they commit.',
      tech: 'A portfolio page with real photos, clear prices and fast loading. If a page takes too long, people leave before they ever see your work.'
    },
    {
      id: 'book',
      label: 'Book',
      apple: 'You can book a Genius Bar appointment or a free Today at Apple session in a few taps on your phone, at any time of day.',
      chair: 'Clients should be able to book at midnight when they finally decide, not wait for me to reply to a message the next morning.',
      tech: 'Online booking with live availability and a deposit taken at the same time. My Les Braid It booking site does this with Supabase and Stripe.'
    },
    {
      id: 'arrive',
      label: 'Arrive',
      apple: 'Staff greet you at the door and check you in on an iPhone. There is no queue and no counter between you and them.',
      chair: 'A confirmation and a reminder with the address, what to bring and how to prep the hair means clients arrive calm and ready.',
      tech: 'Automatic confirmation emails and reminders. They cut no shows and save me from sending the same message again and again.'
    },
    {
      id: 'experience',
      label: 'Experience',
      apple: 'The Genius explains what they are doing as they fix your device, so you leave understanding it, not just holding it.',
      chair: 'A consultation first, then I explain tension, length and time as I go. Clients relax when they know what is happening.',
      tech: 'Client notes saved to their account, so I remember sensitive edges, favourite lengths and past styles without asking again.'
    },
    {
      id: 'leave',
      label: 'Leave',
      apple: 'You can pay anywhere in the store on a staff member\'s phone, and the receipt arrives by email. Even the box is designed to feel special.',
      chair: 'Easy payment, a photo of the finished style and written aftercare. The last minute is what clients remember and tell friends about.',
      tech: 'An emailed receipt and an aftercare page they can come back to. Clear and kind, like a thank you note.'
    },
    {
      id: 'return',
      label: 'Return',
      apple: 'Your iPhone, Mac and Watch all work together, so the next Apple product feels like the natural choice.',
      chair: 'A gentle reminder when the style is due a refresh, and their details saved so rebooking is quick.',
      tech: 'Member accounts and one click rebooking. The easiest journey is the one people choose again.'
    }
  ];

  var journeyChecklist = [
    'Real photos of my work are easy to find',
    'Prices are clear before someone books',
    'Clients can book online at any time',
    'A booking confirmation is sent automatically',
    'A reminder is sent before the appointment',
    'Aftercare advice is given in writing',
    'It is easy to leave a review or tag me',
    'Rebooking takes one click'
  ];

  /* ---------- Wonder Why: question and answer posts ----------
     Every section has a standard version and a simple version.
     The "Explain it simply" switch swaps between them. */
  var posts = [
    {
      slug: 'why-ai-cant-replace-humans',
      question: 'Wonder why AI can\'t replace humans?',
      category: 'ai',
      date: '2026-10-23',
      issue: 1,
      featured: true,
      intro: 'Every week there is a new headline about AI taking jobs. So I asked myself the question properly, as someone who writes code and also stands behind a styling chair every weekend.',
      sections: [
        {
          heading: 'First, what AI is actually good at',
          standard: 'AI tools are brilliant at patterns. They learn from huge amounts of text, images and data, then predict what is most likely to come next. That is why they can draft an email, suggest a hairstyle from a photo or summarise a meeting in seconds. For tasks with clear rules and lots of examples, they are fast and often very good.',
          simple: 'AI is a super fast pattern spotter. It has seen so many examples that it can guess what usually comes next, like finishing your sentence or sorting your photos.'
        },
        {
          heading: 'Where it runs out of road',
          standard: 'Predicting is not the same as understanding. AI has no body, no lived experience and nothing at stake. It has never been nervous before an interview or proud after finishing something hard. It can describe empathy in perfect sentences, but it cannot feel responsible for another person, and responsibility is what people are really trusting when they hand you their problem.',
          simple: 'AI can talk about feelings, but it does not have any. It has never been nervous, proud or tired. So it can miss what really matters to the person in front of it.'
        },
        {
          heading: 'A lesson from my chair',
          standard: 'In my braiding chair, some technical parts could one day be helped by tech. But clients trust me because I notice the tension is too tight before they say it, I remember their edges were sensitive last time, and I know when to chat and when to let them rest. That is judgement, memory and care working together, and it is earned over many appointments.',
          simple: 'When I braid hair, I watch how my client feels, remember what she told me last time and change what I do. A machine could copy the steps. Trust takes a person.'
        },
        {
          heading: 'So what will actually change?',
          standard: 'A better question than "will AI replace humans?" is "which tasks will it take, and what will we do with the time?" Booking, reminders, stock orders and first drafts are already being automated. The people who do well will use AI for the repetitive parts and put more of themselves into the human parts: taste, ethics, relationships and taking responsibility.',
          simple: 'AI will take over some boring jobs, like sending reminders. That gives people more time for the parts only people can do: caring, being creative together and deciding what is right.'
        }
      ],
      closing: 'What is one part of your work or school day you would never hand over to AI?'
    },
    {
      slug: 'why-phones-are-starting-to-fold',
      question: 'Wonder why phones are starting to fold?',
      category: 'phones',
      date: '2026-10-23',
      issue: 1,
      featured: false,
      intro: 'Apple\'s first foldable iPhone landed today. Folding phones are not new, so why is everyone talking about them now?',
      sections: [
        {
          heading: 'The problem: big screens, small pockets',
          standard: 'We watch films, edit photos and run businesses on our phones, so we want bigger screens. But a phone still has to fit in a pocket and be used with one hand. A folding phone tries to be both: a normal phone when closed and a small tablet when open.',
          simple: 'People want big screens, but phones need to fit in pockets. A folding phone is small when shut and big when open, like a book.'
        },
        {
          heading: 'Why now?',
          standard: 'Screens made from flexible OLED can now bend thousands of times, and hinges have become slimmer and stronger. Samsung released its first Galaxy Fold in 2019. Apple waited, and on 23 October 2026 released the iPhone Duo, with a 5.4 inch outside screen and a 7.6 inch inside screen. When Apple joins, a niche idea often goes mainstream.',
          simple: 'Screens can now bend without breaking, and the hinges are stronger. Samsung made folding phones first, and now Apple has made one too, which usually means lots more people will try them.'
        },
        {
          heading: 'What it means for websites',
          standard: 'A website might now be opened on a narrow phone screen, then stretch to a wide one halfway through reading. That is exactly why responsive design matters. This site uses CSS media queries and flexible grids, and I test it at many screen sizes so it stays readable however the screen changes.',
          simple: 'If a screen can change size while you are reading, the website has to change shape too. Building sites that stretch and shrink nicely is called responsive design.'
        }
      ],
      closing: 'Would you fold, or stay flat?'
    },
    {
      slug: 'why-robots-are-moving-into-our-homes',
      question: 'Wonder why robots are moving into our homes?',
      category: 'robots',
      date: '2026-10-23',
      issue: 1,
      featured: false,
      intro: 'For years home robots meant a vacuum that bumps into the sofa. Now companies are building robots with arms, legs and AI. What changed?',
      sections: [
        {
          heading: 'What counts as a home robot?',
          standard: 'A home robot is a machine that can sense the space around it and do physical jobs, like tidying, fetching or folding. The newest ones are humanoid, shaped like a person, because our homes are already built for human hands and heights.',
          simple: 'A home robot is a machine that can move around your house and help with jobs. Some are now shaped like people, because houses are built for people.'
        },
        {
          heading: 'Why now?',
          standard: 'AI models can now understand instructions in everyday language, and batteries, motors and sensors have improved. The company 1X is taking orders for its NEO humanoid at $20,000, or $499 a month, with first home deliveries planned for 2026.',
          simple: 'Robots can now understand normal speech, and their parts have got better. One home robot, called NEO, is planned to arrive in homes in 2026.'
        },
        {
          heading: 'The questions we should ask',
          standard: 'A robot in your home has cameras and microphones in your most private space. Before buying one, it is worth asking who can see that data, what happens if it makes a mistake and whether it is really cheaper than the help it replaces. Curiosity and caution can go together.',
          simple: 'A home robot can see and hear inside your house. So it is smart to ask who sees that information and what happens if the robot gets something wrong.'
        }
      ],
      closing: 'Would you let a robot fold your laundry?'
    }
  ];

  var postCategories = [
    { id: 'all', label: 'All' },
    { id: 'ai', label: 'AI' },
    { id: 'phones', label: 'Phones' },
    { id: 'robots', label: 'Robots' }
  ];

  /* ---------- Built by Lilian: portfolio projects ---------- */
  var projects = [
    {
      id: 'les-braid-it-booking',
      name: 'Les Braid It booking site',
      status: 'Live',
      type: 'Full booking system',
      summary: 'A booking website for my hair business, Les Braid It. Clients browse styles, choose add ons, pick a date and time and pay a deposit, all online.',
      features: [
        'Services sorted and filtered by category',
        'Add ons, date and time selection',
        'Member login with a personal dashboard',
        'Custom style requests',
        'Deposits paid securely with Stripe',
        'Admin dashboard to manage bookings',
        'Before and after slider and neon sparkle effects'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Supabase', 'Stripe'],
      image: 'assets/images/built-card-les-braid-it-booking-home.webp',
      imageAlt: 'The Les Braid It booking site home page, with a pink halftone banner reading Express yourself, don\'t repress yourself',
      liveUrl: 'https://llilzizl.github.io/les-braid-it-booking/',
      repoUrl: 'https://github.com/llilzizl/les-braid-it-booking'
    },
    {
      id: 'designed-to-wonder',
      name: 'Designed to Wonder',
      status: 'Live',
      type: 'Interactive tech publication',
      summary: 'This site. A home for my thoughts on how tech is changing our future, and proof of what I can build with JavaScript.',
      features: [
        'Content built from data with JavaScript',
        'Live launch countdowns with filters and search',
        'Interactive client journey map and score',
        'Explain it simply mode and reading progress',
        'Watchlist and votes saved in the browser',
        'Validated forms with clear feedback',
        'Automated tests with Jest'
      ],
      tech: ['HTML', 'CSS', 'JavaScript', 'Jest'],
      image: 'assets/images/built-card-designed-to-wonder-home.webp',
      imageAlt: 'The Designed to Wonder home page, with the pixel 2 logo glowing purple and blue on black',
      liveUrl: 'https://llilzizl.github.io/designed-to-wonder/',
      repoUrl: 'https://github.com/llilzizl/designed-to-wonder'
    },
    {
      id: 'les-braid-it-portfolio',
      name: 'Les Braid It portfolio',
      status: 'Live',
      type: 'First website',
      summary: 'My first website: a three page portfolio for Les Braid It, built with HTML and CSS only. It is where this journey started.',
      features: [
        'Three pages with clear navigation',
        'Portfolio grouped by style',
        'Two separate enquiry forms for classes and collaborations',
        'Colour contrast checked against WCAG AA'
      ],
      tech: ['HTML', 'CSS'],
      image: 'assets/images/built-card-les-braid-it-portfolio-home.webp',
      imageAlt: 'The first Les Braid It portfolio home page, with the heading It\'s more than just hair',
      liveUrl: 'https://llilzizl.github.io/les-braid-it-portfolio/',
      repoUrl: 'https://github.com/llilzizl/les-braid-it-portfolio'
    }
  ];

  var data = {
    launches: launches,
    launchCategories: launchCategories,
    shapers: shapers,
    shaperCategories: shaperCategories,
    journeyStages: journeyStages,
    journeyChecklist: journeyChecklist,
    posts: posts,
    postCategories: postCategories,
    projects: projects
  };

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = data;
  } else {
    root.DTW = root.DTW || {};
    root.DTW.data = data;
  }
}(this));
