const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dns = require('dns');
const Blog = require('../models/Blog');

dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const posts = [
  {
    title: 'Debugging the Invisible Input: Tracing a Bug Across Five Components in an Angular App',
    slug: 'debugging-invisible-input-angular',
    excerpt: 'A case study in root-cause analysis over quick patches — tracing a silent form bug through five different components in a multi-tenant Angular app.',
    body: `A case study in root-cause analysis over quick patches.

## The Setup

I was working on an Angular application with a fairly typical multi-tenant hierarchy: Partners, who manage their own Customers, alongside Direct Customers who deal with the platform directly. A single "Add User" component was responsible for handling all three cases through three boolean @Input() flags:

\`\`\`typescript
@Input() FromPartner: boolean = false;
@Input() FromCustomer: boolean = false;
@Input() FromPartnerCustomer: boolean = false;
\`\`\`

The task sounded simple: add Partner and Customer dropdowns to the "Add User" form. Select a Partner, its Customers load. Select a Customer, the company details auto-fill. It didn't stay simple.

## Bug #1: The Category List Never Changed

Selecting a Partner correctly loaded that partner's customers, but the "User Category" dropdown kept showing generic categories no matter what was selected. I traced the logic and found a method that correctly mapped selection to the right category — but it was never called. It existed in the file, fully written, completely disconnected from the change handlers that should have triggered it.

Fix: a single call added to the end of both change handlers. Root cause: dead code that looked complete but never ran.

## Bug #2: Fields Editable When They Should Be Locked

For "Partner Customer" and "Direct Customer" users, dropdowns were supposed to be locked. Instead, they were fully editable. The disable logic in the component was correct — which meant the input flags weren't actually true when they should have been.

Tracing the binding chain, this shared component was reused in five different places across the app. Each parent was passing (or not passing) the context flags differently — one template only passed two of the three flags, two templates passed no context flags at all, and one hardcoded a flag to false.

Root cause: a shared component with three mutually-exclusive modes is only as reliable as every single call site that instantiates it. One missing binding in one of five places silently downgrades the component to its default behavior — no error, no warning, just quietly wrong data reaching production.

## Bug #3: The Priority Bug

If a specific partner (ID 0, a special "platform" partner) was selected and one of its own customers was also selected, the category list still showed the wrong category. The condition checked partnerId === 0 and returned early, before ever checking whether a customer was also selected.

Fix: nest the customer check inside the branch instead of treating it as a separate early return.

## Bug #4: Stale Field Values on Deselect

Selecting a Customer correctly filled in related fields. But deselecting it left the old values sitting in the form. The handler used conditional assignment — it only set the value when data existed, never cleared it.

Fix: replace conditional assignment with an unconditional setValue(value ?? ''), applied consistently across all related fields and both branches.

## Bug #5: A Field That Could Never Be Fixed in the Frontend

A field simply never appeared when a Partner was selected. Before touching the component again, I checked the actual API response — and the field genuinely wasn't there. The frontend logic was completely correct; it was checking for a property the backend never sent.

Fix: no frontend fix exists for missing data. I flagged it back to the backend team with the exact missing field name and the shape of sibling fields that were present, as reference.

## What This Taught Me

1. When a fix "doesn't work," check whether your code even ran. Four separate times, the code I wrote was already correct — the bug was that a condition upstream meant that code path never executed at all.

2. Shared components need every call site audited, not just one. Codebase-wide search on the component selector was more useful than staring at the component's own source.

3. if without an else is a silent bug waiting for a deselect event. If there's no code path that clears a field, it holds stale data forever.

4. Not every bug is yours to fix. Confirming that a field was missing at the API layer — and saying so plainly — closed the loop faster than any frontend workaround would have.`,
    tags: ['Angular', 'Debugging', 'Root Cause Analysis'],
    published: true,
    createdAt: new Date('2026-01-15')
  },
  {
    title: 'Case Study: The Silent Form Control That Wasn\'t There',
    slug: 'silent-form-control-ngif-angular',
    excerpt: 'A ticket status update that reported success but silently failed to save — traced down to a lesser-known Angular gotcha with *ngIf and form controls.',
    body: `## The Bug

In a ticket-management system, selecting a new status on the "Edit Ticket" screen and clicking Submit showed a success message — but the database always kept the old status. No error, no exception, no console warning.

## Investigation — Layer by Layer

Step 1 — Confirming the symptom: First I confirmed this wasn't a display issue — the actual update API call was sending the wrong status value.

Step 2 — Tracing the data flow: I traced the full chain from dropdown selection, through the form control, to the save function and the API call. Every step looked correct in isolation.

Step 3 — The real breakthrough: Logging the form control directly, this.ticketForm.get('status') returned null — even though the control was clearly defined in the form's initial setup.

Step 4 — Root cause: The status field in the template was wrapped in a condition:

\`\`\`html
<div *ngIf="!selectedTicket?.id || isView">
  <mat-select formControlName="status">...</mat-select>
</div>
\`\`\`

Angular's *ngIf directive, when it destroys an element with a formControlName, also removes that control from the parent FormGroup entirely. On load, selectedTicket.id is undefined so *ngIf is true and the control is created. Once the async API call populates the ticket data, *ngIf turns false, and Angular removes the field — along with permanently deleting the control from the form.

## The Fix

\`\`\`html
<!-- Before: -->
<div *ngIf="!selectedTicket?.id || isView">

<!-- Fix: -->
<div [hidden]="selectedTicket?.id && !isView">
\`\`\`

*ngIf destroys the element and its form control. [hidden] only applies CSS (display: none) — the element and control stay alive, just visually hidden.

## Why This Was Critical

1. Silent failure — no error or exception, easy to miss even in QA testing
2. Data integrity risk — users believed their update saved successfully when it hadn't
3. A lesser-known framework gotcha — under-documented Angular behavior that can trap developers who haven't hit it before
4. Misleading symptom location — the root cause lived in how a field was conditionally rendered, not in the "obvious" save logic

## Key Takeaway

Whenever a formControlName or ngModel-bound element inside *ngIf toggles visibility at runtime, and preserving that field's value matters — use [hidden] instead of *ngIf.`,
    tags: ['Angular', 'Forms', 'Debugging'],
    published: true,
    createdAt: new Date('2026-02-22')
  },
  {
    title: 'Debugging a CORS Error That Wasn\'t Really About CORS',
    slug: 'cors-error-not-about-cors',
    excerpt: 'A "CORS policy blocked this request" error in production turned out to have nothing to do with CORS configuration itself — here\'s how I traced it back to an environment variable.',
    body: `## The Symptom

Every API call from the frontend started failing with the classic browser error:

\`\`\`
Access to XMLHttpRequest has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
\`\`\`

The instinctive reaction is to assume the CORS middleware configuration itself is wrong. In this case, that assumption was wrong.

## Ruling Things Out

First, I confirmed the backend server was actually running and reachable. Next, I inspected the actual response headers using a request that explicitly sent an Origin header. The Access-Control-Allow-Origin header was simply missing — even though the CORS middleware was configured with what looked like the correct allowed origin.

## The Actual Root Cause

The CORS configuration branched on an environment flag:

\`\`\`javascript
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL]
  : ['http://localhost:4200'];
\`\`\`

The .env file had NODE_ENV=production set — left over from an earlier deployment test — while the app was actually being run and tested locally on a different port. The code was correctly following its own logic; it just wasn't the logic the local environment needed.

## The Fix

The immediate fix was setting NODE_ENV=development locally. The more durable fix was to stop branching CORS origins on NODE_ENV entirely, and instead read a single explicit environment variable listing allowed origins directly:

\`\`\`javascript
const allowedOrigins = process.env.FRONTEND_URLS
  ? process.env.FRONTEND_URLS.split(',').map(url => url.trim())
  : ['http://localhost:4200'];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
\`\`\`

This removes the implicit dependency on NODE_ENV matching the actual environment, and makes allowed origins explicit and easy to update per environment without touching code.

## Key Takeaway

A CORS error in the browser console is a symptom, not a diagnosis. It means the response didn't include the right header — it doesn't tell you why. Checking the raw response headers directly, rather than trusting the browser's summary message, is usually the fastest way to find out which one it actually is.`,
    tags: ['Node.js', 'CORS', 'DevOps'],
    published: true,
    createdAt: new Date('2026-03-4')
  }
];

  async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    for (const post of posts) {
      const exists = await Blog.findOne({ slug: post.slug });

      if (exists) {
        await Blog.updateOne({ slug: post.slug }, post);
      } else {
        await Blog.create(post);
      }

      // Bypass Mongoose middleware entirely — timestamps plugin silently
      // strips createdAt from $set on query-based updates, so use the
      // native driver collection directly to force it through.
      await Blog.collection.updateOne(
        { slug: post.slug },
        { $set: { createdAt: post.createdAt } }
      );

      console.log('Synced:', post.title, '→', post.createdAt);
    }

    console.log('Blog posts uploaded to database successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

seed();