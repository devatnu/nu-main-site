# Myra AI — UI Design Brief for Claude Code

## Overview
Build a chat assistant widget called "Myra" for Nishant's portfolio website. This is the AI concierge that answers visitor questions about Nishant's work, experience, and contact info. It should feel like a native part of the portfolio — not a bolted-on chatbot.

---

## Design References — Take Inspiration From

Look at these for tone, layout, and interaction quality:

1. **Intercom Messenger** — The floating button → sliding panel pattern. Clean, minimal, conversational.
2. **Linear's command palette** — The crisp typography, tight spacing, subtle borders. Professional but not cold.
3. **Raycast AI chat** — How it handles AI responses with smooth streaming text. The typing feel.
4. **ChatGPT's mobile UI** — Message bubbles, input bar, minimal chrome.
5. **Vercel's AI chat components** — Clean message layout, subtle user/assistant distinction.

The vibe is: premium product chat, not customer support widget.

---

## Trigger Button (Closed State)

- Position: Fixed, bottom-right corner, 24px from edges
- Shape: Rounded pill or circle, not a square
- Content: Small sparkle/AI icon + "Ask Myra" text label (desktop), just the icon (mobile)
- Subtle pulse or glow animation on first page load to draw attention — plays once, then stops
- On hover: slight scale up (1.05) with smooth ease
- Color: Match the portfolio's accent colour or use a soft blue that complements the nü logo dots
- Z-index: Above everything

## Chat Panel (Open State)

- **Desktop**: Slides in from bottom-right as a panel (roughly 380px wide × 520px tall). NOT full screen. NOT a modal with overlay. It should feel like a companion panel, not a takeover.
- **Mobile**: Slides up as a bottom sheet, nearly full height (leave ~60px at top to peek the page behind), with a drag handle at top to dismiss.
- **Border radius**: 16px top corners (desktop), 20px top corners (mobile bottom sheet)
- **Shadow**: Subtle elevation shadow — the panel should feel like it floats above the page
- **Background**: Match the site's background colour. If the site is dark, the panel is dark. If light, light. Use the same CSS variables as the rest of the site.

## Panel Layout (Top to Bottom)

### Header
- "Myra" name on the left, styled with slight personality (could use the portfolio's heading font)
- Small "AI" badge or sparkle icon next to the name — signals this is AI, not a person
- Close button (X) on the right — subtle, not aggressive
- Optional: One-line subtitle under the name: "Nishant's AI assistant"
- Thin border or subtle separator below the header

### Message Area (Scrollable)
- Takes up the majority of the panel
- Auto-scrolls to latest message
- Smooth scroll behaviour

**Myra's messages (left-aligned):**
- No avatar needed — just left-aligned text with a subtle background tint (e.g., slightly different from panel bg)
- Rounded bubble: 12px radius, padding 12px 16px
- Text: 14px, regular weight, high contrast
- If Myra's response contains links (LinkedIn, project pages), style them as inline links with the accent colour
- Streaming animation: Text appears word-by-word or in small chunks. While streaming, show a soft blinking cursor at the end of the text.

**Visitor's messages (right-aligned):**
- Right-aligned, accent colour background (solid, not gradient), white text
- Same border radius and padding as Myra's bubbles
- 14px text

**First message (auto-sent on open):**
- Myra sends a greeting immediately when the panel opens:
  "Hey! I'm Myra, Nishant's AI assistant. Ask me anything about his work, experience, or how to get in touch."
- Below the greeting, show 3-4 suggested question chips that the visitor can tap:
  - "Tell me about Nishant"
  - "What has he designed?"
  - "How do I contact him?"
  - "What's he working on now?"
- Chips: Small rounded pills, border style (not filled), tappable. On tap, the chip text gets sent as a message.

**Typing indicator:**
- While waiting for API response, show three animated dots in a Myra-style bubble
- Dots should pulse/bounce gently — not aggressively

**Empty state:**
- If somehow the greeting doesn't load, show: "Ask me anything about Nishant's work" centered in the message area with a subtle opacity

### Input Area (Bottom)
- Fixed at the bottom of the panel, doesn't scroll
- Text input field: Full width, rounded (12px radius), placeholder text: "Ask Myra something..."
- Send button: Icon only (arrow or send icon), appears/activates only when there's text in the field
- The input should have a subtle border that intensifies on focus
- Enter key sends the message
- Shift+Enter for newline (optional, low priority)
- Thin border or separator above the input area

---

## Interaction Details

### Opening Animation
- Button click → panel slides up from bottom-right with a spring ease (not linear, not too bouncy)
- Duration: ~300ms
- Message area fades in slightly after panel is positioned (~100ms delay)

### Closing Animation
- Panel slides down and fades out (~250ms)
- Button reappears in its original position

### Message Send Flow
1. Visitor types message, hits Enter or taps send
2. Message appears immediately in the chat (right-aligned)
3. Typing indicator appears (left-aligned, Myra's side)
4. API call happens
5. Typing indicator replaced by Myra's response, streamed in
6. Suggested follow-up chips appear below Myra's response (optional, nice-to-have)

### Scroll Behaviour
- New messages auto-scroll to bottom
- If visitor has scrolled up to read history, don't auto-scroll (respect their position)
- When they scroll back to bottom, resume auto-scrolling

---

## Responsive Behaviour

### Desktop (>768px)
- Floating panel, bottom-right
- 380px wide, 520px tall (or adjust to fit the site's layout)
- Trigger button: pill shape with "Ask Myra" label + icon

### Mobile (<768px)
- Bottom sheet pattern, slides up from bottom
- Nearly full width (8px margin on sides), ~85vh tall
- Drag handle at top to dismiss
- Trigger button: circle with icon only, slightly larger tap target (56px)
- Input area respects keyboard — when keyboard opens, input stays visible above it

---

## Colour Guidance

Don't hardcode colours. Use the portfolio's existing CSS variables for:
- Background: site's primary and secondary background
- Text: site's primary and secondary text colours
- Accent: site's accent colour (for visitor bubbles, links, send button, chips)
- Borders: site's border colour

Myra's message bubbles should be a slightly elevated surface — one step lighter or darker than the panel background (use the secondary background variable).

---

## Typography

Match the portfolio's type system exactly:
- Message text: 14px, regular weight
- Myra's name in header: 16px, medium weight
- Timestamp (if shown): 11px, muted colour
- Suggested chips: 13px, medium weight

---

## Things to Avoid

- No chatbot avatars or cartoon faces
- No "powered by" branding at the bottom
- No sound effects
- No aggressive animations or attention-grabbing pulses after initial load
- No full-page overlay or dimming when chat opens
- No cookie banners or privacy popups within the chat
- Don't make it look like Crisp, Drift, or Zendesk — this is a portfolio feature, not customer support

---

## Technical Notes

- Use the Anthropic API (Claude Sonnet) client-side — see the Myra Product Doc for full system prompt and knowledge base
- Model: claude-sonnet-4-20250514
- Max tokens: 500 per response
- Chat history: React state (useState or useReducer), resets on page reload
- Rate limit: Max 20 messages per session, show a friendly message when limit is hit ("You've been curious! Feel free to reach out to Nishant directly at [LinkedIn link]")
- Streaming: Use the Anthropic streaming API for the word-by-word text appearance effect

---

## Priority Order for Building

1. Trigger + panel open/close with animation
2. Message layout (Myra left, visitor right) with greeting
3. Input field + send functionality
4. Anthropic API integration with system prompt
5. Streaming text effect
6. Suggested question chips
7. Typing indicator
8. Mobile responsive bottom sheet
9. Rate limiting
10. Polish and edge cases
