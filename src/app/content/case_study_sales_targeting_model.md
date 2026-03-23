# Case Study: Two-Stage Machine Learning Model for Sales Prioritization

## Overview

Built a two-stage machine learning model to help a B2B sales team prioritize 79,000+ prospects by expected revenue potential. The model combines classification (who will convert?) and regression (how much revenue?) to produce realistic expected values, replacing manual prioritization and improving targeting efficiency by 2.2×.

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

**1. The 6% Reality**
Average conversion probability across all prospects: 6.5%. This is normal for B2B sales, but stakeholders initially thought it sounded "too low." Education on industry benchmarks was critical.

**2. Top 5,000 Are 2.2× Better**
The top 5,000 prospects (6% of database) had:
- 14.3% conversion probability (vs 6.5% average)
- $44K expected revenue if converted (vs $10K average)
- $5,651 expected value per prospect (vs $816 average)

**3. Model Found Real Patterns**
Feature validation showed top prospects had:
- 6× larger fleets (85 vs 15 trucks)
- 7× higher transaction volume ($1.24M vs $174K)
- 33% higher invoice values ($2,054 vs $1,540)

The model wasn't picking randomly—it identified operationally strong carriers.

**4. Skewness is Real**
89% of clients generated < $25K annually. The model needed log-transforms and sample weighting to avoid just predicting the median for everyone.

**5. Cross-Validation Matters**
Initial results looked great on one train/test split, but cross-validation revealed stability. Without it, stakeholder trust would be lower.

---

## Impact

**Sales Efficiency:**
- **Before:** Sales called 79K prospects randomly at 6.5% conversion
- **After:** Sales focused on 5K prospects at 14.3% conversion
- **Result:** 2.2× better win rate with 94% fewer calls

**Pipeline Forecasting:**
- Replaced "gut feel" with data-driven expected values
- Management could forecast: "Top 5K = $35M opportunity, expect ~715 conversions"
- More accurate budgeting and quota setting

**Revenue Prioritization:**
- $35M realistic opportunity (vs $23M deflated or $396M inflated)
- Sales team could sort by expected_revenue and work top-down
- 55% of total market opportunity concentrated in top 6% of carriers

**Strategic Insights:**
- Identified sweet spot: Medium-large carriers (50-100 trucks, $1-3M revenue)
- Small carriers can't afford the service; very large carriers self-finance
- Model validated this naturally without being told

**Stakeholder Confidence:**
- Visualizations (ROC curves, actual vs predicted plots) built trust
- Cross-validation showed stability (not one-off lucky results)
- Feature importance helped sales understand "why" a carrier scored high

---

## Reflection: What I'd Do Differently

**1. Earlier Stakeholder Education**
I underestimated how "6.5% conversion" would sound to non-technical stakeholders. Should have led with industry benchmarks and framed it as "2× better than random" from day one.

**2. Temporal Validation**
Used random train/test splits, but should have validated on time-based splits (train on old data, test on recent data) to ensure model works on future prospects, not just held-out samples.

**3. Feature Importance Analysis Earlier**
Added it late in the process. Should have included SHAP values or feature importance from the start to help sales understand WHY prospects scored high.

**4. Prediction Intervals**
Only provided point estimates ($35K expected revenue). Should have added confidence intervals ($25K-$50K range) to communicate uncertainty more transparently.

**5. Calibration Check**
Validated that Stage 1 probabilities are well-calibrated (if model says 15%, do 15% actually convert?). Should have added calibration plots to prove probabilities are trustworthy.

**6. Segmentation Strategy**
Could have analyzed model performance by prospect segments (e.g., does it work better on large vs small carriers?). This would inform targeted sales strategies.

**7. Model Monitoring Plan**
Built the model but didn't establish ongoing monitoring (drift detection, retraining cadence). In production, this would be essential.

**8. Simpler Final Deliverable**
Exported a CSV with scores, but sales team wanted a dashboard or integrated CRM tool. The "last mile" of model deployment matters more than I initially thought.

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

Delivered a production-ready model that improved sales targeting efficiency by 2.2×, provided data-driven pipeline forecasting, and identified $35M in realistic opportunity. The two-stage approach solved the "fake $0 problem" that plagued earlier attempts and produced results stakeholders trusted enough to use in strategic planning.