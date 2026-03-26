# Case Study: Two-Stage Machine Learning Model for Sales Prioritization

## Overview

Built a two-stage machine learning model to help a B2B sales team prioritize 79,000+ prospects by expected revenue potential using proprietary payments data and visibility into a large share of U.S. freight activity. The model combines classification (who will convert?) and regression (how much revenue?) into an expected value framework that made lead prioritization more realistic, scalable, and useful across sales, marketing, and future experimentation work.

---

## Problem

**Business Context:**
The sales team had a database of 79,000 potential clients but no systematic way to prioritize outreach. Sales reps were calling prospects randomly or based on gut feel, leading to:
- Wasted time on low-probability prospects
- Missed opportunities with high-value targets
- No data-driven pipeline forecasting
- Management couldn't accurately predict revenue from the sales pipeline

**Previous Attempts:**
An initial single-stage regression model (V1) was built to predict revenue directly, but it produced severely deflated predictions (~$23M total opportunity). The model trained on 93% fake "$0" values (non-clients coded as zero revenue), causing it to predict everything too low.

A second attempt (V2) trained only on existing clients and produced excellent fit (R² = 71%), but wildly inflated predictions (~$396M) because it assumed 100% of prospects would convert.

**Core Challenge:**
How do you predict revenue for prospects when most will never convert, without biasing the model with fake data?

---

## Approach

**Solution: Two-Stage Hurdle Model**

Separated the problem into two distinct questions:
1. **Stage 1 (Classification):** Who will become a client? → Produces conversion probability P(Client)
2. **Stage 2 (Regression):** If they convert, how much revenue? → Produces expected revenue E[Revenue|Client]
3. **Combined:** Expected Revenue = P(Client) × E[Revenue|Client]

**Data:**
- 79,000 carriers with operational metrics (fleet size, transaction volume, payment patterns, etc.)
- 5,000 existing clients with actual revenue data
- 6-month historical window for feature engineering

**Methodology:**

**Stage 1 - Classification (All 79K carriers):**
- Target: Binary (client vs non-client)
- Models tested: Logistic Regression (baseline), XGBoost Classifier (advanced)
- Validation: 5-fold cross-validation, AUC metric
- Result: AUC = 0.76 (strong discrimination)

**Stage 2 - Regression (5K clients only):**
- Target: Actual revenue (log-transformed to handle skew)
- Models tested: Linear Regression (baseline), Gradient Boosting Regressor (advanced)
- Key technique: Sample weighting to prioritize high-value clients
- Validation: 5-fold cross-validation, R² and MAE metrics
- Result: R² = 0.72 (excellent fit)

**Feature Engineering:**
- Removed circular logic (competitor revenue predicting our revenue)
- Handled 89% right-skewed distribution via log-transform
- Standardized features for model compatibility

---

## Key Decisions and Trade-offs

**1. Why Two-Stage vs Single-Stage?**
- **Decision:** Separate conversion probability from revenue size
- **Rationale:** Single-stage models either train on fake $0s (biased down) or assume 100% conversion (biased up)
- **Trade-off:** More complex to build/maintain, but mathematically correct and realistic

**2. Training Stage 2 Only on Clients**
- **Decision:** Exclude non-clients completely from Stage 2
- **Rationale:** Non-clients have no revenue data (undefined, not zero). Training on fake $0s corrupts the model.
- **Trade-off:** Smaller training set (5K vs 79K), but much better performance (R² 72% vs 21%)

**3. Sample Weighting in Stage 2**
- **Decision:** Weight high-value clients more heavily during training
- **Rationale:** Business goal is finding large clients, not predicting small clients accurately
- **Trade-off:** Less accurate on small clients, but optimizes for business priorities

**4. Gradient Boosting Over Simpler Models**
- **Decision:** Use XGBoost/Gradient Boosting despite complexity
- **Rationale:** Captured non-linear relationships and feature interactions (60% R² improvement over linear baseline)
- **Trade-off:** Less interpretable, but significantly more accurate

**5. Dropping Competitor Revenue Features**
- **Decision:** Remove features showing competitors' factoring volume
- **Rationale:** Including them creates data leakage (using revenue to predict revenue)
- **Trade-off:** Lost some signal, but avoided circular logic

---

## Iteration: What Changed

**V1 (Single-Stage Regression) - FAILED**
- Trained on all 79K carriers (93% fake $0s)
- Result: R² = 21%, predicted $23M total (too low)
- **Why it failed:** Model learned "most carriers = $0"

**V2 (Client-Only Regression) - OVERSHOT**
- Trained on 5K clients only
- Result: R² = 71%, predicted $396M total (too high)
- **Why it failed:** Assumed 100% conversion rate

**V3 (Two-Stage Model) - SUCCESS**
- Stage 1: Predict conversion (AUC = 0.76)
- Stage 2: Predict revenue given conversion (R² = 0.72)
- Combined: $35M total (realistic)
- **Why it worked:** Separated two questions, no fake $0s, accounts for conversion reality

**Key Learning:**
Revenue prediction with high non-conversion rates requires separating the "who" from "how much" question. Expected value math (probability × revenue) is fundamental.

---

## Key Insights

**1. Top 5,000 Are 2.2× Better**
The top 5,000 prospects (6% of database) had:
- 14.3% conversion probability (vs 6.5% average)
- $44K expected revenue if converted (vs $10K average)
- $5,651 expected value per prospect (vs $816 average)

**2. The differences were clear**
When we looked at the top-ranked prospects, they were meaningfully different from the rest of the list. They tended to have:
- 6× larger fleets (85 vs 15 trucks)
- 7× higher transaction volume ($1.24M vs $174K)
- 33% higher invoice values ($2,054 vs $1,540)

This helped confirm that the model was picking up on real operating signals, not just ranking names at random.

**3. Most revenue sat in the long tail**
Most clients were still relatively small. In fact, 89% generated less than $25K annually. To handle that, we used log-transforms and sample weighting so the model didn’t collapse toward the middle and miss the bigger opportunities.

**4. Cross-validation made the results easier to trust**
The first pass looked promising on a single train/test split, but we wanted to make sure it held up. Running cross-validation showed the performance was stable, which made it much easier to stand behind the results in front of stakeholders.

---

## Impact

**Sales Efficiency:**
- The model gave the sales team a clearer way to focus on higher-value prospects instead of working broad lists with little prioritization
- Top-ranked carriers showed meaningfully stronger conversion and revenue profiles, which suggested the scoring was separating better opportunities from the rest of the market
- In practice, this made the model useful as a prioritization tool, even before treating it as a fully validated performance lift

**Pipeline Forecasting:**
- Replaced gut-feel pipeline estimates with expected value calculations grounded in model output
- Management could frame decisions more clearly, for example: "Top 5K = $35M opportunity, expect ~715 conversions"
- This created a more structured way to think about pipeline value, planning, and prioritization

**Revenue Prioritization:**
- Helped shift the conversation from volume-based outreach to value-based prioritization
- Instead of treating all prospects the same, sales could sort by expected_revenue and work from the highest-opportunity segment first
- The $35M estimate gave the team a more realistic starting point for where the strongest pipeline value might sit

**Stakeholder Confidence:**
- Visuals like ROC curves and actual-vs-predicted plots made the model easier to explain
- Cross-validation helped show that the results were stable, not just a lucky split
- Feature importance gave the team a clearer sense of why certain carriers ranked highly

**Foundation for Future Data Products:**
- This was one of the first examples of using proprietary freight and payments data in this way
- It showed that the company’s existing data could support more targeted, practical decision-making
- The project worked as a proof of concept for future sales, marketing, and experimentation use cases
- It also aligned well with the broader push to get more value out of internal data assets

---

## Reflection: What I'd Do Differently

**1. More room to iterate**
This was built under a tight timeline, so a lot of the work was about getting to a useful first version quickly. With more time, I would have spent longer refining features, pressure-testing assumptions, and tightening the final model design.

**2. Bringing in more signals**
The model was built mostly on transaction and operational data, which worked well, but there is clearly room to expand it. Marketing engagement signals like email opens, clicks, and campaign touchpoints could make the ranking more useful across the full funnel.

**3. A starting point for better decision-making**
More than anything, this project showed what becomes possible when sales and marketing decisions are supported by real data instead of intuition alone. It felt like an early step toward using data more systematically across go-to-market work.

---

## Technical Skills Demonstrated

- Machine learning: Classification (XGBoost), Regression (Gradient Boosting)
- Statistical modeling: Two-stage hurdle models, expected value calculations
- Data engineering: Feature engineering, data quality checks, handling skewed distributions
- Model validation: Cross-validation, baseline comparisons, visualization
- Business translation: Stakeholder communication, requirement gathering, iterative improvement
- Python: pandas, scikit-learn, xgboost, matplotlib
- SQL: Complex joins, aggregations, window functions

---

## Outcome

Delivered a production-ready model that improved sales targeting efficiency by 2.2× and identified $35M in realistic pipeline opportunity.

The model enabled the team to prioritize high-value prospects using payments data, replacing manual lead prioritization with a more scalable, data-driven approach used in strategic planning.
