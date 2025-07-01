# Broken Access Control – Learn It by Hacking It

## Table of Contents
1. What is Access Control?
2. Why It Matters (Real World)
3. Core BAC Vulnerabilities
    - IDOR
    - Role Manipulation ✅
    - Method Tampering
    - Access-Control Headers Abuse
4. Labs & Practice (Live hacking)
5. Reporting Like a Pro (Writeups & Proof)
6. Defense Strategies (For completeness)
7. Final Checklist to Think Like a BAC Hunter

---


## Introduction : What is Access Control 

> **🔗 Check out the full website version of this guide here: (https://Averageprogrammer205.github.io/Offensivesec-kit/Broken-Access-Control)**

**Broken Access Control** is one of the most _abused_, _misunderstood_, and _dangerous_ vulnerability classes. Why? Because **Access Control** is what stops users from doing things they’re not supposed to do — like viewing other people’s data, deleting someone else's account, or acting like an admin.  
If _that_ is broken, a regular user can become unstoppable.

This guide will teach you:

- What BAC really is (beyond textbook definitions),  
- What it can look like in the wild,  
- Where and how to hunt for it like a real attacker,  
- How to test it, prove it, and explain the impact,  
- And how to fix it (yes, fixing matters if you want respect).

We’ll wrap up with real examples and a complete checklist to help you recognize BAC anywhere.

---

## 🧠 What is Broken Access Control?

Access control stops users from doing things they’re not allowed to do. It prevents:

- A regular user from accessing admin functionality  
- A customer from viewing someone else’s data  
- Any low-privilege actor from performing high-privilege actions

It’s the thing that says:  
“You can’t do that.”

**Broken Access Control** is when someone finds a way to bypass that restriction.

When access control fails, users can:

- View or modify other users’ accounts  
- Escalate privileges horizontally or vertically  
- Perform unauthorized business functions like issuing refunds or deleting data reserved for admins  


---

## Core Broken Access Control Vulnerabilities

(To clear out confusion:**Broken Access Control** is a familiy of bugs, BAC by itself is not a bug)

Now that we know what *Access Control* is and Why *Broken Access Control* is dangerous, let's look at the core of BAC vulnerabilities, starting with **IDOR** or **Indirect Object Reference**, 