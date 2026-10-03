# Project Charter
## Vehicle Tax Payment System — Prototype
### Vehicle Tax Payment System (VTPS) — Prototype

---

## 1. Project Overview

| Item | Content |
|---|---|
| **Project Name** | Vehicle Tax Payment System Prototype |
| **Project Code** | VTPS-2026-001 |
| **Version** | 1.0 |
| **Date** | September 15, 2026 |
| **Project Engineer** | Muhammad Nebukhadnezar Manthoufani |
| **Duration** | September 2026 - December 2026 (3 months) |
| **Status** | Prototype / Simulation |
| **Budget** | IDR 0 (open-source tools) |

---

## 2. Background & Objectives

### 2.1 Personal Experience — My Own Story

**This project was born from my own lived experience.**

I have a younger brother studying at a university in Java. She
lives in Java, but our family lives in Pekanbaru, Sumatra.
The vehicle tax for the car she owns **can only be paid at
the SAMSAT office in Pekanbaru** — the city of registration.

Every year, we faced the following problems:

| # | Problem | What Actually Happened |
|---|---|---|
| 1 | Cannot pay outside registration city | My brother is in Java, but payment must be in Pekanbaru |
| 2 | Only the owner can process | I couldn't pay on her behalf — she must handle it herself |
| 3 | Must call my brother back from Java | Either she skips class to come home, or I prepare power-of-attorney documents |
| 4 | Document preparation takes time | Power of attorney, KTP copy, original STNK, etc. |
| 5 | SAMSAT office only opens on weekdays | Conflicts with work and study |
| 6 | No visibility on progress | After payment, we can't verify if SAMSAT and Polri have updated the record |

**One year, to pay my sister's vehicle tax, I experienced:**

- 3 days of preparation (collecting documents)
- 2 visits to SAMSAT (the first was rejected due to incomplete documents)
- 8 hours of total waiting time
- Phone calls and document exchanges with my brother (Java ⇄ Sumatra)
- Total time to complete payment: **2 weeks**

**This is still a reality in Indonesia in 2026.**

### 2.2 Root Cause

From this experience, I identified the following root problems:

```
Root Problem: Vehicle tax payment is bound to "place" and "person"
    │
    ├── Geographic Constraint: Only at the SAMSAT of registration
    ├── Procedural Constraint: Only the registered owner can process
    └── Information Constraint: No visibility on status
```

### 2.3 Objectives

1. **Pay from anywhere** — Remove geographic constraint
2. **Minimal identity verification** — Plate + STNK + chassis number
3. **Multi-channel payment** — QRIS, Virtual Account, E-wallet
4. **Real-time status** — Sync confirmation to SAMSAT & Polri
5. **Persistent transaction history** — Payment proof storage

### 2.4 Expected Impact

| Stakeholder | Current State | After Improvement |
|---|---|---|
| My family | Must call brother back | Can pay from anywhere |
| Other families | Same problem | Same solution available |
| SAMSAT | Crowded counters | Reduced workload |
| Polri | Delayed data updates | Real-time sync |
| Bapenda | Revenue leakage risk | Improved transparency |

---

## 3. Scope

### 3.1 In Scope

- ✅ Frontend web application (React + TypeScript)
- ✅ Vehicle data simulation (dummy data)
- ✅ Polri/Bapenda/Dukcapil API simulation
- ✅ Multi-channel payment (QRIS, VA, E-wallet)
- ✅ Transaction history (localStorage)
- ✅ Print-ready e-TBPKP

### 3.2 Out of Scope

- ❌ Production backend API
- ❌ Real payment gateway integration
- ❌ Biometric authentication (face matching)
- ❌ 5-year tax (license plate renewal)
- ❌ Production deployment

### 3.3 Rationale

This project is a **portfolio prototype**. Access to real government
APIs requires a formal agreement. Additionally, under **UU PDP
No. 27/2022 (Personal Data Protection Law)**, real data usage must
be avoided.

---

## 4. Stakeholders

| Stakeholder | Role | Interest | Influence |
|---|---|---|---|
| My brother (real user) | End user | Payment convenience | Highest |
| My family | Proxy payer | Reduced burden | High |
| General taxpayers | End user | Payment convenience | High |
| SAMSAT | Tax data provider | Accuracy & revenue | High |
| Korlantas Polri | Vehicle data provider | Data validity | High |
| Bapenda | Revenue management | Local revenue | Medium |
| Dukcapil | Identity verification | PDP compliance | Medium |
| Payment gateway | Payment processing | Transaction security | Medium |

### Stakeholder Analysis

```
Influence
  High │  Brother    SAMSAT    Polri
       │  Family    Bapenda
       │
  Med  │            Dukcapil  PaymentGW
       │
  Low  │
       └──────────────────────
          Low     Med     High   Interest
```

---

## 5. Success Criteria

### 5.1 Technical Success Criteria

| # | Criteria | Target | Measurement |
|---|---|---|---|
| 1 | Number of pages | 5 pages | Implementation check |
| 2 | Payment methods | 3+ types | Implementation check |
| 3 | Search simulation time | < 2 seconds | Measurement |
| 4 | Data persistence | Across sessions | localStorage check |
| 5 | Print support | e-TBPKP | Print preview check |
| 6 | PDP compliance | No real data | Code review |

### 5.2 Personal Success Criteria

| # | Criteria | Meaning |
|---|---|---|
| 1 | My brother can actually use it | Proof of practicality |
| 2 | Family burden is reduced | Solving the original experience |
| 3 | Becomes reference for others | Social value |

---

## 6. Risk Management

### 6.1 Risk Register

| # | Risk | Probability | Impact | Mitigation |
|---|---|---|---|---|
| R1 | Government API unavailable | High | High | Use dummy data |
| R2 | PDP regulation strict | High | High | No real data |
| R3 | Scope creep | Medium | Medium | Limit to prototype |
| R4 | Data format differences | Medium | Medium | Adapter pattern |
| R5 | Lack of generality | Medium | Low | Generic design |
| R6 | Schedule delay | Medium | Low | Prioritization |

### 6.2 Key Risks Detail

#### R1: Government API unavailable
- **Description:** Polri/Bapenda API unavailable without formal agreement
- **Mitigation:** Simulate all features with dummy data
- **Contingency:** Design for future API replacement

#### R2: PDP regulation
- **Description:** Strict data handling under Personal Data Protection Law
- **Mitigation:** No real data, dummy data only
- **Contingency:** Apply data minimization principle

---

## 7. Constraints

| Type | Constraint |
|---|---|
| Time | 3 months (part-time) |
| Team | 1 person (solo project) |
| Budget | IDR 0 (open-source only) |
| Regulation | UU PDP No. 27/2022 |
| Regulation | Perpres 95/2018 (SPBE) |
| Technology | React + TypeScript |
| Data | Dummy data only |

---

## 8. Schedule

### 8.1 Milestones

| Phase | Period | Deliverable |
|---|---|---|
| Phase 1: Design | Week 1-2 | Charter, BPMN, Architecture |
| Phase 2: Implementation | Week 3-8 | React app (5 pages) |
| Phase 3: Testing | Week 9-10 | Full feature testing |
| Phase 4: Documentation | Week 11-12 | SRS, README, article |

### 8.2 Gantt Chart

```
Week: 1  2  3  4  5  6  7  8  9 10 11 12
    ├──┴──┤
Design  ████
       ├─────┴─────┴─────┴─────┤
Implementation   ████████████████
                            ├──┴──┤
Testing                        ████
                                ├──┴──┤
Documentation                      ████
```

---

## 9. Deliverables

### 9.1 Technical Deliverables

| # | Deliverable | Format |
|---|---|---|
| D1 | Web application | React + TypeScript |
| D2 | Source code | GitHub repository |
| D3 | Deployed app | Vercel URL |

### 9.2 Documentation Deliverables

| # | Deliverable | Format |
|---|---|---|
| D4 | Project Charter | Markdown |
| D5 | BPMN diagram | PNG |
| D6 | System architecture | PNG |
| D7 | API contract | Markdown |
| D8 | SRS | Markdown |
| D9 | README | Markdown |
| D10 | Project article | LinkedIn / Medium |

---

## 10. Approval

| Role | Name | Signature | Date |
|---|---|---|---|
| Project Engineer | Muhammad Nebukhadnezar Manthoufani | _______ | 2026-09-15 |

---

## Appendix

### A. Personal Experience Detail

**In 2025, to pay my sister's vehicle tax, I experienced:**

| Day | Event | Duration |
|---|---|---|
| Day 1 | Contacted , checked required documents | 1 hour |
| Day 2-3 | Collected documents (KTP, STNK, power of attorney) | 2 days |
| Day 4 | Visited SAMSAT (1st) — rejected due to incomplete documents | 3 hours |
| Day 5 | Re-prepared documents | 2 hours |
| Day 6 | Visited SAMSAT (2nd) — payment completed | 5 hours |
| **Total** | | **~2 weeks** |

**This experience is the origin of this project.**

### B. Glossary

| Term | Meaning |
|---|---|
| PKB | Vehicle Tax |
| SWDKLLJ | Mandatory Traffic Accident Insurance |
| NRKB | Vehicle Registration Number |
| TBPKP | Electronic Payment Proof |
| SAMSAT | One-Stop Vehicle Tax Administration |
| Bapenda | Regional Revenue Agency |
| UU PDP | Personal Data Protection Law |
| SPBE | Electronic-Based Government System |

### C. References

1. UU No. 27 Tahun 2022 tentang Perlindungan Data Pribadi
2. Perpres No. 95 Tahun 2018 tentang SPBE
3. PMBOK Guide 7th Edition
4. Samsat Digital Nasional (SIGNAL) Documentation

### D. Role as Project Engineer

Through this project, I demonstrated the following Project Engineer skills:

- ✅ **Problem definition from personal experience**
- ✅ **Project definition** — background, objectives, scope
- ✅ **Stakeholder management** — 8 institutions
- ✅ **Risk management** — Risk register with mitigation
- ✅ **Schedule management** — 4 phases, 12 weeks
- ✅ **Quality management** — Success criteria definition
- ✅ **Documentation** — 10 deliverables
- ✅ **Regulatory compliance** — UU PDP, SPBE

---

**Document Version:** 1.0
**Last Updated:** 2026-09-15
**Author:** Muhammad Nebukhadnezar Manthoufani
**Contact:** mhdnebukhadnezarmanthoufani@gmail.com
