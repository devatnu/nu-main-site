export interface Project {
  slug: string;
  title: string;
  tag: string;
  description: string;
  stats: { value: string; label: string }[];
  previewImage: string;
  previewRadius: string;
  brand: string;
  accent: string;
  context: string;
  problem: string;
  approach: { heading: string; body: string }[];
  impact: string;
  keyInsight: string;
}

export const projects: Project[] = [
  {
    slug: "kuber",
    title: "Kuber — AI-Enabled Wealth Experience",
    tag: "Wealth · Fintech · Concept to Launch",
    description:
      "Designed an AI-powered wealth experience that replaced fund selection with goal-based plans and natural language discovery. Concept to launch — 17.9% increase in investment inflows.",
    stats: [
      { value: "↑17.9%", label: "investment inflows" },
      { value: "NLP", label: "discovery layer" },
      { value: "Concept →", label: "launch in one sprint" },
    ],
    previewImage: "/problem_cards/preview/preview_1.png",
    previewRadius: "32px",
    brand: "Wealth",
    accent: "#F59E0B",
    context:
      "Bachatt targets 30Cr+ self-employed Indians earning ₹30–70K/month — most of whom have never invested. I defined the product concept and designed Kuber end-to-end, working across product, engineering, and business.",
    problem:
      "Users wanted their money to grow but couldn't get started. Mutual funds felt overwhelming — too many options, no guidance on what to pick, how much to invest, or for how long. Even motivated users hit decision paralysis and abandoned the flow. Money stayed idle in savings accounts.",
    approach: [
      {
        heading: "Kuber Plans",
        body: "Expert-curated, goal-based investment packages (e.g. \"₹10,100 in 100 days\", \"First ₹1L Wealth Builder\") that bundle fund selection, SIP amounts, and tenure into a single decision. Users invest in an outcome, not a fund.",
      },
      {
        heading: "Kuber AI",
        body: "A natural language discovery layer where users ask things like \"best SIP for long term\" or \"low risk plans\" and get contextual recommendations with explanations. Replaced browsing dozens of funds with a conversation.",
      },
      {
        heading: "Plan-based mental model",
        body: "Restructured the entire investment architecture around Plan → Investments → SIP/One-time. This gave users progress tracking, flexible funding, and clarity on where every rupee goes.",
      },
    ],
    impact:
      "17.9% increase in investment inflows. Kuber plans became the primary entry point for guided investing. Shifted Bachatt from a savings tool to a guided wealth-building platform.",
    keyInsight:
      "For first-time investors, the barrier isn't access to financial products — it's the absence of a guided path. By replacing fund selection with goal selection, and layering AI-powered discovery on top, Kuber made investing feel like following a plan rather than making a bet.",
  },
  {
    slug: "enabling-mf-underserved-india",
    title: "Enabling Mutual Funds for Underserved India",
    tag: "Instant FD · Fintech · Daily Savings Platform",
    description:
      "Redesigned mutual fund investing around daily micro-SIPs for users earning ₹30-70K/month. 12% of active investors adopted daily/weekly SIP behaviour — a cohort that didn't exist before.",
    stats: [
      { value: "₹50/day", label: "minimum SIP" },
      { value: "12%", label: "daily SIP adoption" },
      { value: "New cohort", label: "of investors created" },
    ],
    previewImage: "/problem_cards/preview/preview_2.png",
    previewRadius: "20px",
    brand: "Insta FD",
    accent: "#10B981",
    context:
      "Bachatt's core users — small business owners, shopkeepers, first-time investors earning ₹30–70K/month — don't save the way traditional investment platforms assume. I led the design of the daily investing experience end-to-end.",
    problem:
      "Three barriers kept this population out of mutual funds. Minimum investments assumed ₹1,000–5,000 monthly — too high for people who save in small daily increments. Income was irregular — daily or weekly, making monthly SIP commitments unrealistic. And mutual funds carried a psychological tag: \"this is for wealthy, financially literate people.\" Users wanted their money to grow but every existing product told them they weren't ready.",
    approach: [
      {
        heading: "Daily micro-SIPs",
        body: "Starting at ₹50/day. Removed the commitment anxiety of large monthly amounts. Small enough to feel like spare change, consistent enough to compound.",
      },
      {
        heading: "Reframed positioning",
        body: "Shifted the language from \"mutual fund investing\" to \"daily wealth-building habits.\" This wasn't a branding exercise — it changed how users understood the product. The mental shift from \"I need a lot of money to invest\" to \"I can put away ₹50 today\" unlocked first-time investors.",
      },
      {
        heading: "Stripped-down onboarding",
        body: "Two decisions only: how much per day, and which plan fits your goal. Fund selection complexity was fully abstracted behind curated options.",
      },
    ],
    impact:
      "12% of active investors adopted daily/weekly SIP behaviour. Created a new cohort of high-frequency investors that didn't exist before. Daily SIP became the default entry point for first-time investors on the platform.",
    keyInsight:
      "For underserved investors, the biggest barrier isn't access to investment products — it's how those products are structured. By aligning investing with real-life savings behaviour, Bachatt made mutual fund investing accessible to everyday earners.",
  },
  {
    slug: "milestones-rewards",
    title: "Milestones & Rewards — Informed customer retention",
    tag: "Bachatt · Retention · Behavioural Retention",
    description:
      "Built a behavioural incentive system that rewarded users for understanding their investments, not just making them. Improved D7 retention and portfolio engagement over two months.",
    stats: [
      { value: "D7", label: "Retention improved" },
      { value: "3-week", label: "Engagement lift" },
      { value: "Awareness", label: "Informed Rewards" },
    ],
    previewImage: "/problem_cards/preview/preview_4.png",
    previewRadius: "32px",
    brand: "Bachatt",
    accent: "#F59E0B",
    context:
      "Bachatt had solid acquisition numbers but struggled with post-onboarding drop-off. Users who signed up weren't coming back. I led the design of a behavioural incentive system to reward financial awareness and learning, turning passive sign-ups into engaged, returning users.",
    problem:
      "Most fintech reward systems incentivise transactions — spend more, earn more. But Bachatt's users were early-stage savers, not high-frequency transactors. A transaction-based reward model excluded the very users the product was built for. The challenge: how do you reward behaviour that builds long-term financial health, not just short-term spending?",
    approach: [
      {
        heading: "Action-based rewards",
        body: "Designed a milestone system tied to meaningful financial actions — completing a financial health check, setting a savings goal, reading an explainer, or investing for the first time. Each action unlocked a visible reward, making learning and awareness feel tangible.",
      },
      {
        heading: "Financial milestones",
        body: "Created a milestone map that guided users from passive account holders to active savers. Each milestone built on the previous one, creating a natural progression path that rewarded consistency over volume.",
      },
      {
        heading: "Awareness over gamification",
        body: "Deliberately avoided points-and-badges gamification, which can feel hollow. Instead, rewards were tied to real financial knowledge — users earned benefits by understanding their money, not just moving it around. This kept the experience aligned with Bachatt's mission.",
      },
    ],
    impact:
      "D7 retention improved measurably post-launch. Users who engaged with the milestones system showed a 3-week engagement lift compared to those who didn't. The awareness-driven reward model became a differentiator — giving Bachatt a retention tool that competitors with transaction-based rewards couldn't replicate for their user segment.",
    keyInsight:
      "Retention isn't built by rewarding what users already do — it's built by rewarding what you want them to do next. For early-stage savers, that meant making financial awareness feel rewarding before a single rupee was invested.",
  },
  {
    slug: "gold-and-silver",
    title: "Gold & Silver — Precious Metals Investing",
    tag: "Metal · Fintech · New Product Line",
    description:
      "Designed a precious metals product with dynamic basket rebalancing, live rates, and expert insights. Opened a new user cohort that trusts gold over equity.",
    stats: [
      { value: "5", label: "investment modes" },
      { value: "Dynamic", label: "portfolio rebalancing" },
      { value: "Live", label: "rates & expert insights" },
    ],
    previewImage: "/problem_cards/preview/preview_3.png",
    previewRadius: "20px",
    brand: "Bachatt",
    accent: "#D97706",
    context:
      "After a year of research, Bachatt split its single wealth product into segmented offerings based on user goals — high-growth equity, stable FD-like returns, and precious metals. I designed Gold & Silver as a standalone product from concept to launch.",
    problem:
      "Users wanted exposure to gold and silver — assets they culturally trust — but had no way to invest intelligently. They didn't know when to shift between gold and silver, how much to allocate to each, or how market movements should change their strategy. Existing platforms offered gold funds as a static line item. No guidance, no rebalancing, no context.",
    approach: [
      {
        heading: "Flexible investment modes",
        body: "Users choose how they want to invest: daily SIP, weekly, monthly, lump sum, or hold in baskets. Same flexibility model proven across Bachatt's other products, applied to a new asset class.",
      },
      {
        heading: "Dynamic baskets with active rebalancing",
        body: "The key differentiator. Instead of static gold/silver allocation, baskets are actively rebalanced based on market trends and predictive analysis. Users get the benefit of expert portfolio management without making manual decisions.",
      },
      {
        heading: "Contextual intelligence layer",
        body: "Daily market news that impacts gold/silver prices, expert analysis videos, advisor guidance, and 1–2 year outlook recommendations. Live rates at point of investment so users always know what they're buying at. Turned a passive holding into an informed, engaged experience.",
      },
    ],
    impact:
      "Expanded Bachatt's product surface from mutual funds into precious metals — opening a new user cohort that trusts gold over equity. Dynamic rebalancing became the core differentiator against static gold fund offerings in the market.",
    keyInsight:
      "Gold and silver aren't just investment assets in India — they're cultural anchors of financial trust. By designing an intelligent layer on top of that existing trust, Bachatt turned passive gold buyers into active, informed precious metals investors.",
  },
  {
    slug: "loans-underserved-india",
    title: "Insta Loans - for Underserved\nIndia",
    tag: "Loans · Fintech · Lending Product",
    description:
      "Designed a trust-first lending experience for self-employed users with no credit history. ₹2Cr+ disbursed in week one.",
    stats: [
      { value: "₹2Cr+", label: "disbursed in week 1" },
      { value: "3", label: "lending partners onboarded" },
      { value: "First-time", label: "borrower focused" },
    ],
    previewImage: "/problem_cards/preview/preview_6.png",
    previewRadius: "32px",
    brand: "Bachatt",
    accent: "#EF4444",
    context:
      "Bachatt's users — small business owners, shopkeepers, self-employed earners — had stable income but no access to formal credit. No salary slips, no credit history, no chance with traditional lenders. I designed the lending experience from discovery to disbursement.",
    problem:
      "Three barriers kept these users locked out of formal credit. Access — traditional lenders rejected them for lacking credit histories, despite real repayment ability. Complexity — loan applications were documentation-heavy and intimidating for first-time borrowers. Trust — users feared hidden charges and unclear terms from digital platforms, so they defaulted to informal borrowing at worse rates with zero transparency.",
    approach: [
      {
        heading: "Use-case-led discovery",
        body: "Instead of \"apply for a loan,\" users see why a loan makes sense — business expansion, emergency needs, personal expenses. Reframed lending from a financial product into a contextual tool.",
      },
      {
        heading: "Full repayment transparency upfront",
        body: "Loan amount, tenure, monthly EMI, and total payable shown before the user commits to anything. No buried terms. For a trust-skeptical audience, seeing the complete picture before applying was the unlock.",
      },
      {
        heading: "Guided step-by-step application",
        body: "Eligibility check, document submission, and confirmation broken into small, approachable steps. Designed so a first-time borrower never hits a screen where they don't understand what's being asked or why.",
      },
    ],
    impact:
      "₹2Cr+ loan amount disbursed in the first week of launch. Scaling with lending partners including Muthoot, Hero FinCorp, and Prefr for larger ticket sizes.",
    keyInsight:
      "For underserved users, the barrier to borrowing isn't just access to credit — it's confidence in the system offering it. By designing for clarity and trust first, digital lending becomes a reliable financial tool rather than a confusing or risky experience.",
  },
  {
    slug: "festive-one-time-investments",
    title: "Supercharge inflows with one-Time Investments",
    tag: "Bachatt · Revenue · Behavioural Design",
    description:
      "Turned cultural savings moments into investment triggers with contextually-timed nudges. Daily inflows jumped 15.5% lift.",
    stats: [
      { value: "15.5%", label: "lift in daily inflows" },
      { value: "₹3.12L", label: "peak daily inflow" },
      { value: "Cultural", label: "timing nudges" },
    ],
    previewImage: "/problem_cards/preview/preview_7.png",
    previewRadius: "32px",
    brand: "Bachatt",
    accent: "#F97316",
    context:
      "Bachatt's inflow was almost entirely SIP-driven. Surplus cash from festival bonuses, seasonal income, and business profits had no structured capture point. I designed the one-time investment experience around culturally-timed financial behaviour.",
    problem:
      "Users had money to invest beyond their SIPs — especially around festivals and auspicious occasions — but the product gave them no reason to act on it. Investing was framed as a purely financial action. Meanwhile, in India, Diwali means prosperity purchases, Akshaya Tritiya means buying gold, wedding season means deploying savings. The product was ignoring the strongest natural investment triggers its users already had.",
    approach: [
      {
        heading: "Contextual prompts, not banners",
        body: "\"Invest this Diwali for your future wealth\" and \"Akshaya Tritiya: add gold to your portfolio\" surfaced at the right moments — after SIP setup, inside the dashboard, during festival windows. Timed to intent, not just visibility.",
      },
      {
        heading: "Stripped-down one-time flow",
        body: "Curated options, predefined amounts, minimal steps. A user with surplus cash could deploy it in under a minute without comparing funds.",
      },
      {
        heading: "Emotion-driven framing",
        body: "Messaging shifted from returns language to prosperity, family security, and wealth-building milestones. Matched the emotional register users were already in during festivals.",
      },
    ],
    impact:
      "Daily investment inflow increased from ₹2.7L to ₹3.12L — a 15.5% lift. Captured a surplus cash moment that previously had zero product surface. By aligning product design with real-world financial behaviour, the feature helped capture investment moments that were previously missed.",
    keyInsight:
      "Investment behaviour isn't purely rational. In India, financial decisions are deeply connected to culture, rituals, and timing. By aligning investment opportunities with moments when users are naturally willing to deploy money, Bachatt increased inflows without increasing friction.",
  },
  {
    slug: "merchant-delivery",
    title: "Merchant Delivery - E-Rickshaw Logistics",
    tag: "BatterSmart · Merchant · MVP Launch",
    description:
      "Led design of a three-sided logistics platform for e-rickshaw goods delivery — merchant app, driver app, and central monitor. Shipped a tested MVP across 3 states in 12 weeks.",
    stats: [
      { value: "3 states", label: "MVP launch" },
      { value: "12-week", label: "sprint cycle" },
      { value: "Non-tech", label: "user-first design" },
    ],
    previewImage: "/problem_cards/preview/preview_5.png",
    previewRadius: "32px",
    brand: "Battery Smart",
    accent: "#22C55E",
    context:
      "With 15M+ electric rickshaws on Indian roads — 83% of the three-wheeler market — Battery Smart saw an opportunity to build a structured delivery platform. I led design across the merchant app, supervised driver app and CMS design, and co-planned development across 6 sprints with a team of 3 PMs, 2 designers, and 8 developers.",
    problem:
      "Merchants and small businesses needed to transport goods across cities but had no reliable, affordable system. E-rickshaw drivers were already doing informal deliveries — but with no order management, no scheduling, no payment tracking, and no verification. Both sides operated on trust and phone calls. The users on both ends — merchants and rickshaw drivers — were not tech-savvy, used small-screen devices, and had zero tolerance for complex flows.",
    approach: [
      {
        heading: "Component-first architecture",
        body: "Built a local design library derived from Battery Smart's parent design system before designing any flows. Cards with single primary actions, minimal cognitive load, error states handled within every component set. Designed for small devices — directional interfaces, never more than one decision per screen.",
      },
      {
        heading: "Frictionless merchant onboarding",
        body: "Three steps: OTP verification, basic details, done. Guest users could place orders without signing up. Removed non-mandatory fields after field research showed users were filling everything and dropping off at ambiguous inputs.",
      },
      {
        heading: "Seamless order creation",
        body: "Auto-picked addresses via Google Maps, content type/weight/value entry, driver availability slots, payment choice (wallet or cash with driver-side OTP verification). A generic status component handled order failures, cancellations, and reopened orders — one flexible system across all states.",
      },
      {
        heading: "Field-research-driven iteration",
        body: "After Phase 1 release, the product team did field visits to gather feedback, then redesigned flows to strip unnecessary steps before subsequent deployments.",
      },
    ],
    impact:
      "Shipped a tested MVP across 3 states within the 12-week sprint cycle. Released to first users via coupon campaign. Post-launch field research led to flow refinements that reduced onboarding friction. Phase 2 scoped for automated slot allocation and driver income visualisation.",
    keyInsight:
      "Designing for non-tech-savvy users in operational logistics requires field visits, not assumptions. Every removed field and simplified interaction came from watching real merchants and drivers struggle with interfaces that seemed obvious on a designer's screen.",
  },
  {
    slug: "banking-medical-practitioners",
    title: "Banking\nfor Medical Practitioners",
    tag: "Cure · Healthtech x Fintech · Berlin",
    description:
      "Redesigned onboarding for a vertical neobank serving German medical practitioners. Moved compliance steps post-entry — let users in first, verify later.",
    stats: [
      { value: "↓ Drop-off", label: "faster onboarding" },
      { value: "2FA", label: "security system" },
      { value: "AI", label: "practice metrics" },
    ],
    previewImage: "/problem_cards/preview/preview_8.png",
    previewRadius: "28px",
    brand: "Cure Finance",
    accent: "#0EA5E9",
    context:
      "Cure Finance is a vertical neobank for doctors and dentists in Germany — one platform for practice finances, expense management, and tax forecasting. I worked in a globally distributed team of 4 designers, 18 developers, and 2 product owners. My role covered onboarding, the 2FA system, design system maintenance, and guiding other designers on the team.",
    problem:
      "The existing onboarding flow had massive drop-offs. Creating a bank account required tax verification and government-assigned KYC — steps that couldn't be removed for regulatory reasons. Users who hit a compliance flag at any stage were simply blocked, losing them entirely. The onboarding process was too long, too rigid, and too punishing for a user who just wanted to explore the platform.",
    approach: [
      {
        heading: "Three-step onboarding, reduced to two",
        body: "Split the flow into personal details, tax verification, and KYC. After focus group testing, removed the tax stage from onboarding entirely — moved it to in-product profile completion. Users could enter the platform and look around before committing to the full verification process.",
      },
      {
        heading: "Progressive profile completion",
        body: "Created a task-based profile system where mandatory items (needed for bank account creation) were clearly marked, but non-mandatory details could be filled at the user's pace. Forms opened as side-peek panels consistent with the product's interaction pattern.",
      },
      {
        heading: "Reusable 2FA component system",
        body: "Designed a common authentication component set used across onboarding, PIN generation, and every transaction-recording process. Built to security guidelines with no workarounds. Security communicated as a value, not friction.",
      },
      {
        heading: "AI-powered financial dashboard",
        body: "Designed the home view with practice income graphs, liquidity forecasts, and tax predictions. The intelligent liquidity forecast used AI tailored to medical practice payment cycles. Practice metrics computed individual profitability scores from payment flows, income, and expenses — connecting to every data vertical in the product.",
      },
    ],
    impact:
      "Onboarding time reduced significantly by removing tax verification from the initial flow. Launched live with volunteered medical practitioners after friends-and-family testing. Phase 1 shipped: new onboarding, multi-card accounts, enhanced profile completion with reward system. 2FA component became foundational infrastructure reused across all transactional flows.",
    keyInsight:
      "In regulated financial products, you can't remove compliance steps — but you can rethink when they happen. By letting users into the platform before completing verification, Cure Finance turned a rigid, punishing onboarding into a progressive trust-building experience. The user sees value first, then commits to the process.",
  },
  {
    slug: "goal-based-investing",
    title: "Goal-Based Investing",
    tag: "Bachatt · Fintech · Behavioural Architecture",
    description:
      "Flipped the investment entry point from 'how much?' to 'what for?' — connecting every SIP to a life goal with smart recommendations and progress tracking.",
    stats: [
      { value: "Goal-first", label: "investment flow" },
      { value: "Smart SIP", label: "recommendation" },
      { value: "↑ Retention", label: "via milestones" },
    ],
    previewImage: "/problem_cards/preview/preview_9.png",
    previewRadius: "32px",
    brand: "Bachatt",
    accent: "#8B5CF6",
    context:
      "Users were investing through SIPs but without direction — picking arbitrary amounts with no sense of what they were building toward. I designed the goal-based investing system to connect every rupee to a real-life outcome.",
    problem:
      "Users would set up a ₹500 or ₹1,000 monthly SIP without knowing what it would get them, how long it would take, or whether the amount was enough. Investing felt abstract — disconnected from anything tangible. Without a visible objective, users were more likely to pause or withdraw early. The product was helping people invest, but not helping them understand why.",
    approach: [
      {
        heading: "Goal selection as the starting point",
        body: "Users pick a life goal first: child education, retirement, wedding savings, buying gold, emergency fund. This single reframe turned the investment flow from a financial transaction into a personal commitment.",
      },
      {
        heading: "Smart SIP recommendation",
        body: "Once a goal is set, the system calculates the required investment, recommends a SIP amount, and projects the timeline. \"Child Education Fund ₹5L → ₹6,500/month for 5 years.\" Users never have to do financial math — the product does the planning.",
      },
      {
        heading: "Visual progress tracking",
        body: "Each goal becomes a live dashboard showing current progress, remaining amount, and time left. Investing stops being a recurring debit and starts feeling like movement toward something real.",
      },
      {
        heading: "Goal completion moments",
        body: "Milestone celebrations when users hit targets or significant progress points. Reinforces positive financial behaviour and creates a loop — finish one goal, set the next.",
      },
    ],
    impact:
      "Transformed investing from an abstract recurring action into a purpose-driven journey. Users gained clarity on what their money was doing and why, reducing early withdrawals and SIP pauses. Goal-based plans became a key retention and engagement mechanism on the platform.",
    keyInsight:
      "People are far more motivated to save when the outcome is meaningful. By connecting investments to life goals instead of abstract returns, the product transformed investing from a financial habit into a personal journey — and users who see progress toward something real are far less likely to quit.",
  },
  {
    slug: "jio-offer-store-revamp",
    title: "Jio Offer Store Revamp",
    tag: "Jio Engage · Jio Platforms · Design System Migration",
    description:
      "Led the design system migration for Jio Engage's offer store, winnings, and profile across a 560M+ subscriber ecosystem. Co-trained an 8-designer team on the new library.",
    stats: [
      { value: "560M+", label: "subscriber ecosystem" },
      { value: "12", label: "verticals rolled out" },
      { value: "Team", label: "training co-led" },
    ],
    previewImage: "/problem_cards/preview/preview_10.png",
    previewRadius: "32px",
    brand: "Jio Engage",
    accent: "#7C3AED",
    context:
      "Jio Engage is the gamification and digital marketing arm of Jio — India's largest telecom network with 560M+ subscribers. A new organisation-wide design system was introduced across all 12 product verticals. I picked up the offer store revamp and served as vice captain of a two-person squad responsible for training our 8-designer team on the new library.",
    problem:
      "The offer store, winnings, profile, and coupons sections were built on legacy design patterns — inconsistent layouts, fragmented component usage, and no alignment with the new system. Beyond visual inconsistency, the existing flows had usability gaps: offer details were buried, redemption steps weren't clear, and the profile section gave users no meaningful overview of their engagement or earnings.",
    approach: [
      {
        heading: "Design system adoption and team training",
        body: "Studied the new library in depth, then co-led weekly training sessions with practice tests for the team. Built fluency before touching any production files — the system included a Figma plugin for theme application, grid standards (3 rows × 9 columns for card components), and standardised interaction patterns like bottom sheets.",
      },
      {
        heading: "Offer store restructure",
        body: "Redesigned the offer vault with clearer hierarchy: banner area for ad partners (inherited constraint), offer cards with bottom-sheet detail views replacing full-page transitions, and a streamlined play-to-earn flow (play game → win Jio Coins → redeem offer). Every interaction mapped to the new component library.",
      },
      {
        heading: "Winnings and redemption clarity",
        body: "Rebuilt offer cards with a three-layer structure: icon and header on top, expiry and code in the middle, action buttons at the bottom. Made the copy-and-redeem flow immediate — users could see the code and act on it without navigating away.",
      },
      {
        heading: "Profile as engagement dashboard",
        body: "Consolidated total coins earned, active campaigns, available offers, and winnings into a single-page view. Gave users a reason to return — not just to redeem but to understand their engagement status across the Jio ecosystem.",
      },
    ],
    impact:
      "Launched updated designs in the next release cycle. Products visually unified under one design family for the first time across the Jio Engage suite. New component standards became the foundation for all subsequent feature development. Team training model adopted as reference for other verticals migrating to the same system.",
    keyInsight:
      "A design system migration is only as good as the team's fluency with it. By investing in structured training before touching production files, the team shipped a revamp that wasn't just visually consistent but architecturally sound — built on components that would hold up as the product evolved.",
  },
];

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
