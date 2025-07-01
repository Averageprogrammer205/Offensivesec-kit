# How to Write a Good Bug Bounty Report

*The Most Important Skill Besides Actually Finding the Bug*
## Table of Contents
1. [Description](#description)
2. [Steps to Reproduce](#steps-to-reproduce)
3. [Proof of Concept](#proof-of-concept-poc)
4. [Impact Explanation](#impact-explanation)
5. [Suggested Fix or Mitigation](#suggested-fix-or-mitigation)
6. [Common Mistakes to Avoid](#common-mistakes-to-avoid)
7. [Summary and Final Checks](#summary-and-final-checks)
8. [Studying a Bug Bounty Report: SSRF Example](#studying-a-bug-bounty-report-ssrf-example)
    - [1. Summary / Introduction](#1-summary--introduction)
    - [2. Dissecting an Effective Description](#2-dissecting-an-effective-description)
    - [3. Steps to Reproduce: Flexible Yet Precise](#3-steps-to-reproduce-flexible-yet-precise)
    - [3. Why This Proof of Concept Stands Out](#3-why-this-proof-of-concept-stands-out)
    - [4. Suggested Fix / Mitigation](#4-suggested-fix--mitigation)
    - [5. Impact Explanation](#5-impact-explanation)
    - [6. Final Notes](#6-final-notes)

> **🔗 Check out the full website version of this guide here: [https://Averageprogrammer205.github.io/Offensivesec-kit/How-to-report-bugs](https://Averageprogrammer205.github.io/Offensivesec-kit/How-to-report-bugs)**


As a bug bounty hunter, your job isn’t just to find vulnerabilities, it’s to clearly explain them too.

And while finding bugs might sound like the “hard part,” the truth is writing a solid report is just as important. A good report helps the triage team quickly understand what’s wrong, how to reproduce it, and why it matters. That means *faster* responses, *fewer* misunderstandings, and *way better odds of getting paid.*

**In fact, your ability to explain the bug often decides whether you get rewarded at all. So knowing how to report properly is not a side skill. It’s half the game.**

This guide will walk you through writing *clear*, *valid*, and *professional* bug reports, the kind that get attention, not ignored.


---

## Description

**This section explains what the bug *actually is*, how it works, and why it’s even a problem.**

While the “Steps to Reproduce” walks them through *how* to trigger the bug, the Description makes sure they understand *what the core issue is*. Without it, you're just giving directions to a mystery destination.

A strong description shows that:
- You understand the technical root cause.
- You aren't just repeating payloads—you know what broke.
- You're helping the dev/triager mentally process the situation.

### 📌 What to Include in the Description:

1. **What the bug is, clearly and simply**  
   Example:  
   > The application fails to validate redirect URLs, allowing open redirection via the `next` parameter on the login page.

2. **How the bug works under the hood**  
   Even if you don’t have source code access, explain the logic flaw.  
   > This happens because the server blindly redirects users to any value of the `next` parameter, without checking if it points to a trusted domain.

3. **Any conditions or requirements**  
   Tell them if the bug only happens under certain situations (e.g., must be logged in, must have a certain role, etc.)

4. **Optional but strong: Explain the root security principle that’s violated**  
   Tie it back to the OWASP category, if applicable. 
   > This is a violation of the "Unvalidated Redirects and Forwards" issue, as described in OWASP Top 10 (A10).

---

## Steps to Reproduce

This is the most *critical* part of your report.  
Even if the bug is valid, a messy or unclear reproduction section can lead to your report being misunderstood, rejected, or underpaid, and we absolutely don't want that.
If you don't have a clear step by step guide to reproduce a bug, you don't have a report.


Our goal in this part is to **make it so that anyone, even someone unfamiliar with the target, can reproduce the bug step-by-step**. This makes the Triage Team's job of fixing the bug easier.

### ✅ What to Do:

1. **Be specific and complete**  
   Write exactly what to click, where to go, what data to enter.  
   Here's an example: instead of just telling them "Go to the login page", tell them *how to go to the login page*. Think of it like guiding someone through the bug over your shoulder.

2. **Number each step**  
   Always use a clean, ordered list or bullet points; don't make them feel like they are reading a wiki.
   Triage teams don't read blocks of text.

3. **Include test data or payloads**  
   If you entered malicious input, give the exact string you used.  
   Example:  
   ```
   "><script>alert(1)</script>
   ```

4. **State what *should* happen vs. what *actually* happens**  
   Example:
   > Expected: The system rejects the input with a validation error. (what is supposed to happen.)
   > Actual: The payload executes, and a popup appears. (what actually happened)
   This is how you present a bug. In fact, this is the definition of a bug.

---

## Proof of Concept (PoC)

(Quick heads-up: Don’t confuse the PoC with the Steps to Reproduce. The steps to reproduce exist *so that the Triage Team knows exactly how to trigger the bug, step by step*, while the Proof of Concept *shows the Triage Team concrete technical evidence that the bugs exist and can be exploited*. They are similar but **serve different purposes**.)

The proof of concept is really just undeniable proof that the bug exists and is *something*. It's important to know that the Proof of Concept can vary wildly depending on your bug. Let's say your bug is a simple info leak; maybe your Proof of Concept could be just an HTTP request/response showing exposed data.

Or maybe it's an XSS; then your Proof of Concept might just be the exact payload and a screenshot/video of the alert popup. It can also even be a script if your bug is complex (in that case, you have to include how the script should be executed and the requirements to execute it).

### 🧾 Advice for Presenting a PoC:

1. **Use screenshots/videos:**
    This is a powerful way to present your PoC. You can screenshot a request, a payload, or show a video of multiple pieces of evidence.

2. **Show a command or a script:**
    This is another powerful way to present a proof of concept. Although a script is *typically not always needed* (commands are way more common), if it's a complex bug, a script can really help the Triage team and *will* make your report clearer. Don't keep the developers guessing.

3. **Show raw HTTP requests and responses:**  
    If your bug involves web requests, include the exact HTTP request and response that demonstrate the vulnerability. This helps the triage team see the technical details and reproduce the issue accurately.

4. **Redact or blur sensitive information in evidence**  
    When sharing screenshots or videos, make sure to hide any personal data, credentials, or other sensitive details that are not relevant to the bug itself.

5. **Keep it concise and relevant**  
    Only include information that directly demonstrates the vulnerability. Avoid unnecessary details that could distract from the main issue.

6. **Label and describe your evidence**  
    Add brief captions or explanations to screenshots, videos, or code snippets so the reviewer knows exactly what they’re looking at and why it matters.


---

## Impact Explanation

**This is where you show *why* the bug matters.**  
If you found a bug, and did what we discussed earlier, that would mean that the triage team knows *what* the bug is, now our goal is *convince them it’s worth fixing, and worth paying for.*


### 💥 What Makes a Strong Impact Section:

1. **Tie it to real harm**  
   Can the attacker access sensitive data? Escalate privileges? Take over accounts? Steal money? Show why the bug is scary and dangerous.

2. **Use severity language properly**  
   - *Critical*: Full account takeover, remote code execution, unauthenticated data breach.  
   - *High*: Authenticated sensitive info access, privilege escalation, major logic bypass.  
   - *Medium*: Partial information leak, CSRF with impact, authenticated issues.  
   - *Low*: Minor bugs, limited scope or preconditions required.

3. **Never drop vague potential, prove the path**  
   Don’t say “this could lead to X” unless you explain *how*. Impact should feel inevitable, not hypothetical.


### 🧠 Bonus Tip: Think like the attacker

If you’re not sure how to describe impact, ask yourself :
- "If I was a black hat, what could I pull off with this?"
- "Could this lead to account takeover, data theft, system abuse, or loss of control?"



### Example:

> **Impact:**  
> This vulnerability allows an unauthenticated attacker to access any user’s booking details, including full pickup/drop-off addresses, phone numbers, and fare history. This can be exploited to track users in real-time, violating privacy and potentially enabling stalking or physical harm.

---

## Suggested Fix or Mitigation

This part isn’t just about proving you can break things. It’s about showing that you understand how systems *should* work, and that you’re willing to help improve them.

You’re not expected to know the exact code behind the scenes. But *giving a thoughtful fix makes your report easier to act on*, and shows you’re thinking like a builder, not just a breaker.

### 🔧 What makes a strong mitigation section

1. **Give a general but relevant fix**  
   If you understand the core issue, suggest how it should be handled. No need to be overly technical.  
   Example:  
   > “Validate ownership on the server before allowing access to this resource.”

2. **Reference trusted security practices**  
   Tying your suggestion to OWASP, secure defaults, or standard protections makes your fix more credible.  
   Example:  
   > “Implement rate limiting on login endpoints to prevent brute-force attacks.”

3. **Don’t give vague advice**  
   Stuff like “secure the code” or “fix the issue” doesn’t help. Be specific or skip it.  
   Example of what *not* to write:  
   > “Just add better protection.”  
   Instead, give something the devs can actually work with.

4. **If you don’t know, say so clearly**  
   It’s okay not to know the exact solution. Just don’t pretend.  
   Example:  
   > “This seems related to backend auth logic, but I don’t have enough visibility to recommend a fix.”

When your fix is thoughtful and actionable, your report stands out. It tells the team: this hacker doesn’t just find problems. They *understand* them.

---

## Common Mistakes to Avoid

Even skilled bug hunters can slip up when writing reports. These common errors reduce your chances of getting recognized or rewarded. Avoid them to keep your reports sharp and effective.

### 1. Missing or unclear reproduction steps  
If you don't make sure that the steps to reproduce a bug are complete and understandable, then the Triage team won't be able to verify it, and that means reduced chances for payout.

### 2. Including unnecessary details  
Only include in your report whats important, don't dump your whole testing process or unecessary details, precision is key.

### 3. Lacking solid proof of concept  
Your report must include concrete evidence—screenshots or requests or scripts that demonstrate the bug clearly. Without proof, the report loses credibility.

### 4. Weak or vague impact description  
Explain precisely what the bug allows an attacker to do. Avoid speculation or “might happen” statements. Show the real risks and consequences.

### 5. Providing vague or generic fixes  
Suggest clear, practical solutions or best practices. Saying “fix your code” is unhelpful. If you can’t propose a fix, say so honestly.

### 6. Poor organization and formatting  
Use clear headings, numbered steps, and concise language. A well-structured report is easier to read and speeds up validation.

---

## Summary and Final Checks

A well-written bug bounty report is more than just a container for a vulnerability—it is a tool that helps the security team understand, verify, and resolve a flaw quickly and confidently.

At this stage, all core sections should be complete: the bug has been clearly explained, reproduction steps are precise, proof of concept is irrefutable, impact is justified, and potential fixes are suggested where appropriate.

Before submission, use the following final checklist to ensure the report meets a high professional standard.

### ✅ Final Report Checklist

- [ ] **The Description clearly explains what the bug is and how it works.**  
      Includes root cause, affected functionality, and technical context.
- [ ] Steps to Reproduce are clear, numbered, and complete.
- [ ] Payloads, test data, and relevant request details are included.
- [ ] Proof of Concept contains strong technical evidence (e.g. screenshot, HTTP request, or script).
- [ ] The Impact section ties the bug to real-world consequences with justified severity.
- [ ] A suggested mitigation or fix is included, or its absence is clearly stated.
- [ ] The report is logically structured, free of unnecessary content or speculation.
- [ ] Formatting is clean, consistent, and readable (headings, bullets, spacing, etc)..


## Studying a Bug Bounty Report: SSRF Example

We’ll analyze each part of a real bug bounty report to see *how* it’s done well and *why* it works. You can add screenshots for each section as proof.

---

## 1. Summary / Introduction

**What the reporter did:**  
- Clearly states the bug: Server-Side Request Forgery (SSRF) in the Lichess game export feature.  
- Explains where it happens and why it’s critical (public endpoints, no authentication).

**Why it works:**  
- Gives a quick, simple overview.  
- Sets expectations for what the report will show.  
## Studying a Bug Bounty Report: SSRF Example


![](images/Eg-summary.png)
---

## 2. Dissecting an Effective Description

The reporter demonstrates masterclass vulnerability description through:

**1. Targeted Technical Focus**  
 
*Notice how they highlight only the relevant code flow:*
- The user-controlled input (`get("players")`)
- The unsafe processing chain (`realPlayerApi.apply`)
- The dangerous outcome (`ws.url(url).get()`)

**2. Strategic Omissions**  
They intentionally exclude:
- Unrelated code sections
- Theoretical attack scenarios
- Personal testing narrative

**3. Clarity Through Constraint**  
The entire technical explanation uses just 3 code snippets and 2 bridging sentences. This forces:
- Every word to serve a purpose
- The reader's attention to stay focused
- Quick comprehension of the core flaw

**What Makes This Work**  
1. **Code-as-Evidence**  
   The snippets are the actual vulnerability pathway.

2. **Minimalist Commentary**  
   The reporter lets the dangerous code patterns speak for themselves.

3. **Logical Flow**  
   Input → Processing → Dangerous Outcome forms a complete "crime scene" picture.

💡 *Pro Tip:*  
Write your description, then cut 30% of the words. This forces essentialism.

![](images/Description.png)


---

## 3. Steps to Reproduce: Flexible Yet Precise

This reporter took an interesting approach by weaving the reproduction steps into the Description section. This works because:

1. **For Simple Bugs:** When the vulnerability is straightforward (like this SSRF), combining description and reproduction can create a more fluid narrative. The reader naturally follows:  
   *"Here's the flawed code → Here's how we exploit it"*

2. **Strategic Variation:**  
   - **Complex bugs:** Always use separate sections (e.g., for multi-step privilege escalations)  
   - **Simple bugs:** Can merge if it improves readability (like this example)  

3. **Why This Works Here:**  
   - Single exploitation method (URL manipulation)  
   - No conditional steps (works 100% reproducibly)  
   - Tight connection between cause and effect  

### 3. Why This Proof of Concept Stands Out

This is where the reporter demonstrates professional-grade evidence collection. Notice how they:

1. **Establish Credibility Upfront**  
   By noting they discovered the bug through source code analysis *and* confirmed it live, the reporter shows they've done both theoretical and practical validation. This dual-verification approach makes triagers immediately take the report seriously.

2. **Structure Evidence Logically**  
   The sequence flows perfectly:  
   - **Discovery context** (source code + live confirmation)  
   - **Reproduction steps** (clear numbered instructions)  
   - **Visual proof** (screenshots of each critical stage)  

4. **Efficiency in Communication**  
   The reporter avoids:  
   - Overloading with redundant images  
   - Leaving gaps between steps  
   - Using unannotated screenshots  

5. **Used Visuals well**
   Masterful use of visuals :
   First step : ![](images/firststep.png)
   The outcome after following the rest of the steps :![](images/Restofsteps.png)

**Key Takeaway:**  
This works because it makes the triager's job effortless - they can validate the bug in under 2 minutes without asking follow-up questions. That's the gold standard.


---

## 4. Suggested Fix / Mitigation

**What the reporter did:**  
- Suggested URL validation, whitelisting, authentication, and IP blocking.  
- Specified the exact code location for the fix.  
- Referred to OWASP CWE for credibility.

**Why it works:**  
- Provides actionable advice, not vague “fix your code.”  
- Shows mindset of builder, not just breaker.  
- Makes triage and dev job easier.


---
## 5. Impact Explanation

**What the reporter did:**  
- Listed real-world consequences: credential theft, internal network scanning, accessing private APIs.  
- Emphasized the risk due to public and unauthenticated endpoints.  
- Used clear, strong language.

**Why it works:**  
- Proves the bug is serious, not theoretical.  
- Justifies high severity and payout potential.  
- Helps triage team understand urgency.


---
## 6. Final Notes

- Report is well-structured and easy to read.  
- Each section covers its purpose fully.  
- Professional tone and no fluff.  

---

**Keep this structure in mind when writing your reports.**  

Clear summaries, solid technical explanations, exact reproduction steps, strong proof, concrete impact, and useful fixes are the keys to success.

---

