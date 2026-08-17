<!-- .slide: class="title-slide" -->
# Beyond Individual Power
<div class="subtitle">Information-Theoretic Bounds on Collective Power</div>
<div class="author">Jaime Ruiz Serra</div>
<div class="mentors" style="font-size: 0.6em; margin-bottom: 12px; font-style: italic; opacity: 0.85;">Mentored by Jobst Heitzig and Tomáš Gavenčiak</div>
<div class="date">PIBBSS Mid-Program Presentation<br>9 July 2026</div>

---

## Agenda

- Motivation
- Information-theoretic empowerment
- Capability-based power
- Preliminary results
- Towards coalitional notions of power
- Closing thoughts

---

## Motivation: Preventing Systemic Disempowerment

<ul>
  <li class="fragment"><b>Instrumental convergence</b>: seek power, resources, and self-preservation</li>
  <li class="fragment"><b>Gradual disempowerment</b>: competitive pressures drive incremental yield of control over critical societal loops (economy, infrastructure, governance)</li>
  <li class="fragment"><b>Collective leverage</b>: collective action can resist higher powers (unions, revolts). However, centralized AI can automate away labor leverage and control information/coordination channels</li>
  <li class="fragment"><b>"Divide and Rule"</b>: an AI could maximize individual micro-choices while dismantling capacity for collective coordination. Metrics focused purely on <i>individual</i> agency are blind to this</li>
  <li class="fragment"><b>Distributed power</b>: we need formal metrics of coalitional, distributed power to detect systemic (dis)empowerment before it becomes irreversible</li>
</ul>

---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## I. Information-Theoretic Empowerment

---

## Information-Theoretic Empowerment [Klyubin et al., 2005]

<div class="block"> 
  <div class="block-title">Empowerment</div> 
  <div class="block-content">
    A goal-agnostic metric; maximizes the set of future reachable, distinguishable states.
    $$\mathfrak{E}(s) = \sup_{p} \mathbb{I}(A; S' \mid s)$$ <!-- .element: class="fragment" -->
  </div>
</div>

The metric can be used as an objective for agents, e.g. 
  $$\pi^*(a \mid s) = \arg\max_{a} \mathbb{E}_{s'\sim s, a} [\mathfrak{E}(s')]$$ <!-- .element: class="fragment" -->

---

## Replication of [Capdepuy et al., 2007]

<div class="video-slide-container">
  <div class="first-col">
    <video src="img/experiment3_simulation_totalistic_20260617.1911.mp4" autoplay loop muted onclick="this.paused ? this.play() : this.pause(); this.blur();" tabindex="-1" style="cursor: pointer;"></video>
  </div>
  <div class="second-col">
    <ul>
      <li class="fragment">Toroidal grid world</li>
      <li class="fragment">Observe the <i>count</i> of agents within $7\times 7$ neighbourhood</li>
      <li class="fragment">$\mathcal{A} = \{\texttt{up}, \texttt{down}, \texttt{right}, \texttt{left}, \texttt{stay}\}$</li>
      <li class="fragment">Collisions if moving into the same cell</li>
    </ul>
  </div>
</div>

---

## Gridworld Extension

<div class="video-slide-container">
  <div class="first-col">
    <video src="img/experiment3_altruistic_simulation_totalistic_20260622.1457.mp4" autoplay loop muted onclick="this.paused ? this.play() : this.pause(); this.blur();" tabindex="-1" style="cursor: pointer;"></video>
  </div>
  <div class="second-col">
     Two kinds of agents: 
     <ul>
      <li class="fragment"> <span style="color: rgb(129, 35, 131);">self-interested agents</span> maximise their own empowerment</li>
      <li class="fragment"> <span style="color: rgb(80, 176, 50);">altruistic agents</span> maximise the empowerment of those in their neighbourhood</li>
     </ul>
  </div>
</div>

---

## Gridworld Extension (II)

<div class="video-slide-container">
  <div class="first-col">
    <video src="img/experiment3_altruistic_simulation_totalistic_20260622.1136.mp4" autoplay loop muted onclick="this.paused ? this.play() : this.pause(); this.blur();" tabindex="-1" style="cursor: pointer;"></video>
  </div>
  <div class="second-col">
     Two kinds of agents: 
     <ul>
      <li> <span style="color: rgb(129, 35, 131);">self-interested agents</span> maximise their own empowerment</li>
      <li> <span style="color: rgb(80, 176, 50);"><u>spiteful</u> agents</span> minimise the empowerment of others</li>
     </ul>
  </div>
</div>


---

## Multi-Agent Capacity Region

<div class="video-slide-container" style="align-items: flex-start;">
<div class="first-col">
<canvas class="region-canvas" width="900" height="900" style="background: #fff; cursor: crosshair; border: 1px solid #ccc; width: 100%; height: auto; border-radius: 8px;"></canvas>
</div>
<div class="second-col" style="font-size: 0.8em; padding-top: 0px;">
<p>Empowerment (capacity, $C$) bounds realized influence (rate, $R \le C$) over a <i>Multiple Access Channel</i> [Capdepuy et al., 2012]</p>
<div class="fragment" style="margin-bottom: 0.4em;">Why it's useful:
  <ul>
    <li>Separates <strong>potential</strong> control ($C$) from <strong>realized</strong> control ($R$)</li>
    <li>Pentagon bounds capture independent capacity vs. joint capacity, $R_A + R_B \le \mathbb{I}(A,B; S)$</li>
    <li><strong>Corner deficit</strong> $\mathbb{I}(A; B \mid S)$ quantifies environmental <strong>interference and collisions</strong></li>
  </ul>
</div>

<!-- Dashboard metrics -->
<div class="dashboard" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 0.7em; margin-top: 15px;">
<div class="metric-box" style="background: #f9f9f9; padding: 5px 8px; border-left: 3px solid #cc0000; border-radius: 0 3px 3px 0; min-width: 0;">
<div style="font-size: 0.75em; text-transform: uppercase; color: #666; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Rate A (R<sub>A</sub>)</div>
<div class="valRA" style="font-size: 1.0em; font-weight: bold; color: #111; font-family: monospace;">0.00 bits</div>
</div>
<div class="metric-box" style="background: #f9f9f9; padding: 5px 8px; border-left: 3px solid #00aa00; border-radius: 0 3px 3px 0; min-width: 0;">
<div style="font-size: 0.75em; text-transform: uppercase; color: #666; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Rate B (R<sub>B</sub>)</div>
<div class="valRB" style="font-size: 1.0em; font-weight: bold; color: #111; font-family: monospace;">0.00 bits</div>
</div>
<div class="metric-box" style="background: #f9f9f9; padding: 5px 8px; border-left: 3px solid #0066cc; border-radius: 0 3px 3px 0; min-width: 0;">
<div style="font-size: 0.75em; text-transform: uppercase; color: #666; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Sum (R<sub>A</sub>+R<sub>B</sub>)</div>
<div class="valOverall" style="font-size: 1.0em; font-weight: bold; color: #111; font-family: monospace;">0.00 bits</div>
</div>
<div class="metric-box" style="background: #f9f9f9; padding: 5px 8px; border-left: 3px solid #8800cc; border-radius: 0 3px 3px 0; min-width: 0;">
<div style="font-size: 0.75em; text-transform: uppercase; color: #666; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Magnitude</div>
<div class="valMag" style="font-size: 1.0em; font-weight: bold; color: #111; font-family: monospace;">0.00 bits</div>
</div>
</div>
</div>
</div>


---

## Multi-Agent Capacity Region (II)

<div class="video-slide-container" style="align-items: flex-start;">
<div class="first-col">
<canvas class="region-canvas" width="900" height="900" style="background: #fff; cursor: crosshair; border: 1px solid #ccc; width: 100%; height: auto; border-radius: 8px;"></canvas>
</div>
<div class="second-col" style="font-size: 0.8em; padding-top: 0px;">
<div class="fragment">How to extend it:
  <ul>
    <li>Standard MAC assumes independent transmitters in a fixed channel.</li>
    <li>Coordinating via time-sharing restricts the region (inner pentagon).</li>
    <li>We need a framework where active cooperation <strong>restructures the channel itself</strong> to yield synergistic collective empowerment.</li>
  </ul>
</div>

<!-- Dashboard metrics -->
<div class="dashboard" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; font-size: 0.7em; margin-top: 15px;">
<div class="metric-box" style="background: #f9f9f9; padding: 5px 8px; border-left: 3px solid #cc0000; border-radius: 0 3px 3px 0; min-width: 0;">
<div style="font-size: 0.75em; text-transform: uppercase; color: #666; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Rate A (R<sub>A</sub>)</div>
<div class="valRA" style="font-size: 1.0em; font-weight: bold; color: #111; font-family: monospace;">0.00 bits</div>
</div>
<div class="metric-box" style="background: #f9f9f9; padding: 5px 8px; border-left: 3px solid #00aa00; border-radius: 0 3px 3px 0; min-width: 0;">
<div style="font-size: 0.75em; text-transform: uppercase; color: #666; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Rate B (R<sub>B</sub>)</div>
<div class="valRB" style="font-size: 1.0em; font-weight: bold; color: #111; font-family: monospace;">0.00 bits</div>
</div>
<div class="metric-box" style="background: #f9f9f9; padding: 5px 8px; border-left: 3px solid #0066cc; border-radius: 0 3px 3px 0; min-width: 0;">
<div style="font-size: 0.75em; text-transform: uppercase; color: #666; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Sum (R<sub>A</sub>+R<sub>B</sub>)</div>
<div class="valOverall" style="font-size: 1.0em; font-weight: bold; color: #111; font-family: monospace;">0.00 bits</div>
</div>
<div class="metric-box" style="background: #f9f9f9; padding: 5px 8px; border-left: 3px solid #8800cc; border-radius: 0 3px 3px 0; min-width: 0;">
<div style="font-size: 0.75em; text-transform: uppercase; color: #666; font-weight: bold; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">Magnitude</div>
<div class="valMag" style="font-size: 1.0em; font-weight: bold; color: #111; font-family: monospace;">0.00 bits</div>
</div>
</div>
</div>
</div>


---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## II. Capability-Based Power Objective

---

## Capability-Based Power [Heitzig & Potham, 2025]

<ul>
  <li class="fragment">The world is in state $s \in \mathcal{S}$, we have a world model e.g. $p(s' \mid s, a)$</li>
  <li class="fragment">A human $h \in \mathcal{H}$ could have goal $g \in \mathcal{G}_h$</li>
  <li class="fragment">What kind of <b>objective</b> could we give an AI so that its policy ($\pi_r$) increases the power of humans $\mathcal{H}$?</li>
  <li class="fragment">Need to consider humans' bounded rationality ($\pi_h$) and social norms</li>
  <li class="fragment">Axiomatic construction based on <b>capabilities approach</b> to power, <b>welfare theory</b>, <b>social choice theory</b> (with some RL flavour)</li>
</ul>


---

## Capability-Based Power: Goals to Social Power

<table class="power-table">
  <!-- Level 3: Present Aggregate Power -->
  <tr class="fragment" data-fragment-index="2">
    <td><div class="power-block bg-p"><strong>Present Aggregate Power</strong><br>$P(s)$</div></td>
    <td class="eq-cell">$$P(s) = -\log_2 \sum_{h \in \mathcal{H}} 2^{-\xi I_h(s)}$$</td>
  </tr>

  <!-- Transition 2->3 -->
  <tr class="arrow-row fragment" data-fragment-index="2">
    <td>
      <div class="arrow-container">
        <span class="arrow-symbol">↑</span>
        <span class="arrow-text">Social Aggr. ($\xi > 0$)</span>
      </div>
    </td>
    <td></td>
  </tr>

  <!-- Level 2: Individual Human Power -->
  <tr class="fragment" data-fragment-index="1">
    <td><div class="power-block bg-i"><strong>Individual Human Power</strong><br>$I_h(s)$</div></td>
    <td class="eq-cell">$$I_h(s) = \log_2 \sum_{g \in \mathcal{G}_h} C_h(s, g \mid \pi)^\zeta$$</td>
  </tr>

  <!-- Transition 1->2 -->
  <tr class="arrow-row fragment" data-fragment-index="1">
    <td>
      <div class="arrow-container">
        <span class="arrow-symbol">↑</span>
        <span class="arrow-text">Goal Aggr. ($\zeta > 1$)</span>
      </div>
    </td>
    <td></td>
  </tr>

  <!-- Level 1: Goal-Attainment Capability -->
  <tr>
    <td><div class="power-block bg-c"><strong>Goal-Attainment Capability</strong><br>$C_h(s, g \mid \pi)$</div></td>
    <td class="eq-cell">$$C_h(s, g \mid \pi) = \mathbf{1}_{(s \in g)} + \mathbf{1}_{(s \notin g \cup S^\top)}\; \gamma_h \; \mathbb{E}_{s' \sim \pi, s} [C_h(s', g\mid \pi)]$$</td>
  </tr>
</table>


---

## Capability-Based Power: Time and Uncertainty

<table class="power-table">
  <!-- Level 5: Long-Term Power -->
  <tr class="fragment" data-fragment-index="2">
    <td><div class="power-block bg-l"><strong>Long-Term Power</strong><br>$L(s_t)$</div></td>
    <td class="eq-cell">$$L(s_t) = -\log_2 \left( \mathbb{E}_{s_{\ge t}} \left[ 2^{-\rho T(s_{\ge t})} \right] \right)^{1/\rho}$$</td>
  </tr>

  <!-- Transition 4->5 -->
  <tr class="arrow-row fragment" data-fragment-index="2">
    <td>
      <div class="arrow-container">
        <span class="arrow-symbol">↑</span>
        <span class="arrow-text">Uncertainty Aggr. ($\rho > 0$)</span>
      </div>
    </td>
    <td></td>
  </tr>

  <!-- Level 4: Trajectory Power -->
  <tr class="fragment" data-fragment-index="1">
    <td><div class="power-block bg-t"><strong>Trajectory Power</strong><br>$T(s_{\ge t})$</div></td>
    <td class="eq-cell">$$T(s_{\ge t}) = -\log_2 \sum_{u \ge t} \gamma_r^{u-t} 2^{-\eta P(s_u)}$$</td>
  </tr>

  <!-- Transition 3->4 -->
  <tr class="arrow-row fragment" data-fragment-index="1">
    <td>
      <div class="arrow-container">
        <span class="arrow-symbol">↑</span>
        <span class="arrow-text">Time Aggr. ($\gamma_r, \eta > 0$)</span>
      </div>
    </td>
    <td></td>
  </tr>

  <!-- Level 3: Present Aggregate Power -->
  <tr>
    <td><div class="power-block bg-p"><strong>Present Aggregate Power</strong><br>$P(s)$</div></td>
    <td class="eq-cell">$$P(s) = -\log_2 \sum_{h \in \mathcal{H}} 2^{-\xi I_h(s)}$$</td>
  </tr>
</table>


---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## III. Preliminary Results

---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## PR1. Effective Semantic Control

---

## Effective Semantic Control

<div>
Empowerment $\mathfrak{E}(S)=\max_{p(A)}\mathbb{I}(A;S'|S)$ measures the raw bandwidth of the agent's actions. 
</div>

<div class="fragment" style="margin-top: 15px;">
An agent's true capability is measured by Effective Semantic Control:
$$\mathbb{C}_{\text{eff}}(S):=\mathbb{I}(G;S'|S)$$
This measures how effectively the physical state $S'$ acts as a sensor of the human's intent $G$.
</div>

---

## Subadditivity Bound

<div>
By the Data Processing Inequality, mutual information cannot increase along the Markov chain $G \rightarrow A \rightarrow S'$.
</div>

<div class="fragment">
Thus, effective semantic control is strictly bounded by the channel capacity of the realized policy $p_\pi(A\mid S) = \sum_g p(G=g)\pi(A\mid G=g, S)$:
$$\mathbb{C}_{\text{eff}}(S) = \mathbb{I}(G; S' \mid S) \le \mathbb{I}_{p_\pi}(A; S' \mid S) \le \sup_{p(A)} \mathbb{I}(A; S' \mid S) = \mathfrak{E}(S)$$
</div>

<div class="fragment" style="margin-top: 10px;">
The gap decomposes into exact information-theoretic penalties:
$$\mathfrak{E}(S)-\mathbb{C}_{\text{eff}}(S)=\Delta_{\text{rationality}}+\Delta_{\text{semantic}}$$
</div>

<ul class="fragment">
    <li><strong>Bounded rationality:</strong> Capacity lost due to suboptimal policy $p_\pi(A|S)$.</li>
    <li><strong>Semantic coarse-graining:</strong> Excess action entropy altering states without providing information about goal $G$.</li>
</ul>

---

## Equivocation Minimisation

<div>
Effective Semantic Control measures how well the future state predicts latent intent:
$$\mathbb{C}_{\text{eff}}(S) = \mathbb{I}(G; S' \mid S) = \mathbb{H}(G \mid S) - \mathbb{H}(G \mid S', S)$$
</div>

<div class="fragment" style="margin-top: 15px;">
Under MaxEnt, prior uncertainty is constant, $\mathbb{H}(G \mid S) = \log_2 |\mathcal{G}_h|$. 
</div>

<div class="fragment" style="margin-top: 15px;">
Maximization of control reduces strictly to the minimization of <b>equivocation</b>:
$$\arg\max_{\pi_r} \mathbb{C}_{\text{eff}}(S) \equiv \arg\min_{\pi_r} \mathbb{H}(G \mid S', S)$$
</div>

<ul class="fragment">
    <li>The environment state $S'$ must act as a high-fidelity sensor of $G$.</li>
    <li>Uncertainty regarding the human's true goal must vanish once $S'$ is observed.</li>
</ul>

---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## PR2. $I_h(S)$ as Surrogate for Effective Semantic Control

---

## Fano's Bound: $I_h(S)$ as Surrogate for $\mathbb{C}_\mathrm{eff}(S)$

<div>
If an observer infers goal $g$ from $s'$ under a uniform prior, 
  <span class="fragment"> the probability of a correct guess is the average goal-attainment capability $\bar{C}(s) = \frac{1}{|\mathcal{G}_h|} \sum_{g \in \mathcal{G}_h} C_h(s, g)$.</span>
  <span class="fragment"> The probability of error is ${\color{orange}P_e} = 1 - \bar{C}(s)$.</span>
</div>

<div class="fragment" style="margin-top: 10px;">
With $\zeta=1$, $I_h(s)$ maps the power metric directly to average capability:
$$\bar{C}(s) = 2^{I_h(s) - \log_2 |\mathcal{G}_h|}$$
</div>

<div class="fragment" style="margin-top: 15px;">
<strong>Fano's Inequality</strong> bounds equivocation by the probability of error:
$$\mathbb{H}(G \mid S', S) \le \mathbb{H}(\mathrm{Ber}({\color{orange}P_e})) + {\color{orange}P_e} \log_2(|\mathcal{G}_h|-1)$$
</div>

<div class="fragment" style="margin-top: 15px;">
<strong>Consequence:</strong>
Maximizing $I_h(S) \implies \bar{C}(S) \to 1 \implies {\color{orange}P_e} \to 0 \implies$ tighter bound $\implies \mathbb{H}(G \mid S', S) \to 0 \implies \mathbb{C}_{\text{eff}}(S) \to \mathbb{H}(G \mid S)$ (i.e., maximised)
</div>

---


## Resolving the Upper-Bound Paradox

<div>
Heitzig and Potham [2025] claim $I_h(s)\ge\mathfrak{E}^\zeta(s)$. This disagrees with the DPI limit 
$$\mathbb{C}_{\text{eff}}(s) = \mathbb{I}(G;S'\mid s) \le \sup_{p(A)} \mathbb{I}(A;S'\mid s) = \mathfrak{E}(s)$$
</div>

<div class="fragment">
<strong>Critique:</strong>
They sum maximum conditional probabilities across independent states,
$$I_h(s)=\log_2\sum_{s'}(\max_a p(s'\mid a))^\zeta$$
circumventing the action distribution constraint $\sum p(a)=1$.
</div>

<div class="fragment" style="margin-top: 15px;">
Restoring bounded policy constraints restores the true limit: $I_h(s)\le\mathfrak{E}(s)$.
</div>



---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## PR3. Variational Interpretation

---


## Goal-Attainment Capability: Variational Interpretation

<div class="fragment">
The goal-attainment capability measure
$$C_h(s,g)=\mathbf{1}_{(s\in g)}+\mathbf{1}_{(s\notin g\cup S^\top)}\;\gamma_h\;\mathbb{E}_{s'\sim\pi,s}[C_h(s',g)],$$
</div>
<div class="fragment">
can be framed as an "affinity score" for the state-goal pair $(s,g)$,
</div>

<div class="fragment">
from which we define an <strong>energy function</strong> $E(s,g)$ with
$$\exp(-\zeta E(s,g))=\exp(\zeta\log C(s,g))=C(s,g)^\zeta$$
</div>

<div class="fragment" style="margin-top: 15px;">
Define a <strong>likelihood</strong> and a uniform <strong>prior</strong> over goals:
$$p(S=s\mid G=g)=\frac{C(s,g)^\zeta}{Z_0(g)}=\frac{C(s,g)^\zeta}{\sum_{s\in\mathcal{S}}C(s,g)^\zeta}\;,\qquad\; p(G=g)=\frac{1}{|\mathcal{G}_h|}$$
</div>

---

## Goal-Attainment Capability: Variational Interpretation (II)

<div>
The <b>joint</b> distribution is
$$p(s,g)=p(s\mid g)p(g)=\left(\frac{C(s,g)^\zeta}{Z_0(g)}\right)\left(\frac{1}{|\mathcal{G}_h|}\right)=\frac{C(s,g)^\zeta}{Z_0(g)|\mathcal{G}_h|}$$
</div>

<div class="fragment" style="margin-top: 15px;">
The <strong>exact posterior</strong> is
$$p(g\mid s) = \frac{p(s\mid g)p(g)}{\sum_{g'\in\mathcal{G}_h}p(s\mid g')p(g')} = \frac{\frac{C(s,g)^\zeta}{\class{fragment highlight-red}{Z_0(g)}}}{\sum_{g'\in\mathcal{G}_h}\frac{C(s,g')^\zeta}{\class{fragment highlight-red}{Z_0(g')}}}$$
</div>

<div class="fragment" style="margin-top: 15px;">
We employ a tempered Gibbs <strong>variational posterior</strong> family,
$$q(G=g\mid s)\equiv p_\zeta(g\mid s)=\frac{C(s,g)^\zeta}{\sum_{g\in\mathcal{G}_h}C(s,g)^\zeta}=\frac{C(s,g)^\zeta}{Z_\zeta(s)}$$
</div>

---

## Active Inference: Variational Free Energy

<div style="font-size: 0.9em;">
The <strong>Variational Free Energy (VFE)</strong> evaluates the surprisal of a state $s$ given a variational posterior $q$ over goals:
<div style="text-align: center; margin: 10px 0;">
  $\displaystyle \mathbb{F}[s, q] = \mathbb{E}_{q} \left[ \log_2 q(g\mid s) - \log_2 p(s, g) \right]$
  <span class="fragment">$\displaystyle = \mathbb{E}_{q} \left[ \log_2 \left( \frac{C(s,g)^\zeta}{Z_\zeta(s)} \right) - \log_2 \left( \frac{C(s,g)^\zeta}{Z_0(g) |\mathcal{G}_h|} \right) \right]$</span>
</div>
</div>

<div class="fragment" style="margin-top: 15px; font-size: 0.9em;">
The capability terms $C(s,g)^\zeta$ cancel out,
$$
\begin{aligned}
\mathbb{F}[s, q] 
&= \mathbb{E}_{q} \left[ -\log_2 Z_\zeta(s) + \log_2 |\mathcal{G}_h| + \log_2 Z_0(g) \right] \\
&= -\log_2 Z_\zeta(s) + \mathbb{E}_q[\log_2 Z_0(g)] + \log_2 |\mathcal{G}_h| \\
\end{aligned}
$$
</div>

---

## Active Inference: Variational Free Energy (II)

<div style="font-size: 0.9em;">
$$
\begin{aligned}
\mathbb{F}[s, q] 
&= \mathbb{E}_{q} \left[ -\log_2 Z_\zeta(s) + \log_2 |\mathcal{G}_h| + \log_2 Z_0(g) \right] \\
&= -\log_2 Z_\zeta(s) + \mathbb{E}_q[\log_2 Z_0(g)] + \log_2 |\mathcal{G}_h| \\
\end{aligned}
$$
</div>

<div class="fragment" style="margin-top: 15px; font-size: 0.9em;">
Recall the <strong>individual human power</strong> metric is (by definition) equal to the log-partition function
$$I_h(s) := \log_2 \sum_{g \in \mathcal{G}_h} C_h(s, g \mid \pi)^\zeta = \log_2 Z_\zeta(s)$$
</div>

<div class="fragment" style="font-size: 0.9em;">
<strong>Result:</strong> Minimizing VFE is mathematically identical to maximizing $I_h(s)$.
$$
\mathbb{F}[s, q] = -I_h(s) + \text{Const.}
$$
</div>


---

## Active Inference: Expected Free Energy

<div>
<strong>Variational Free Energy (VFE)</strong> evaluates a fixed, <em>observed</em> state $s$.
</div>

<div class="fragment" style="margin-top: 15px;">
<strong>Expected Free Energy (EFE)</strong> evaluates the average surprisal for the <em>expected, future</em> state $s' \sim q(\cdot \mid \pi)$. 
</div>

<div class="fragment" style="margin-top: 15px;">
Integrating VFE over the predictive posterior yields the planning objective $\mathbb{G}[\pi]$:
$$
\mathbb{G}[\pi] = \mathbb{E}_{s'\sim q(\cdot\mid\pi)}\left[ F(s') \right] = \mathbb{E}_{s'\sim q(\cdot\mid\pi)}\left[-I_h(s')\right]+\text{Const.}
$$
</div>

<div class="fragment" style="margin-top: 25px;">
  <b>Speculative interpretation:</b> An Active Inference agent that models others' goals will inherently act to maximize their power?
</div>


---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## IV. Towards Coalitional Notions of Power

---

## Multi-Agent Setup

<ul>
  <li class="fragment"><strong>Environment</strong>: A stochastic game form with $p(s' \mid s, a_1, \dots, a_k)$, $s \in \mathcal{S}$, $a \in \mathcal{A}$</li>
  <li class="fragment"><strong>Coalitions</strong>: subsets of agents $K \subseteq N$ that coordinate actions $A_K = \prod_{i \in K} A_i$.</li>
  <li class="fragment"><strong>Complement</strong>: The remaining agents $N \setminus K$ choose actions $A_{N \setminus K}$.</li>
  <li class="fragment"><strong>Information flow</strong>: The power of a coalition can be viewed through two metrics:
    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 15px; font-size: 0.9em; padding: 0 50px;">
      <div style="text-align: center; flex: 1;">
        <strong>Information-Theoretic</strong>
        $$\mathfrak{E}(K; s) = \sup_{p(A_K)} \mathbb{I}(A_K; S' \mid s)$$
      </div>
      <div style="text-align: center; flex: 1;">
        <strong>Capabilities-Based</strong>
        $$I_K(s) = \log_2 \sum_{g \in \mathcal{G}_K} C(s, g \mid \pi)^\zeta$$
      </div>
    </div>
  </li>
  <li class="fragment">Both $\mathfrak{E}$ and $I_K$ depend on the policies of both the coalition $\pi_K$ and the complement $\pi_{N\setminus K}$.</li>
</ul>

---

## Core Question

<div class="text-center" style="font-size: 1.1em; margin-bottom: 10px;">
  <i>Is the empowerment of a group<br>additive, subadditive, or superadditive<br>in the empowerments of its members?</i>
</div>

<p class="fragment" style="margin-top: 15px;">This question is <strong>ill-posed</strong> until three modeling choices are fixed:</p>
<ul>
  <li class="fragment"><strong>Complement convention</strong>: What do the non-members do while you measure the coalition? (passive? adversarial? best-case?)</li>
  <li class="fragment"><strong>Coordination class</strong>: Can the members correlate their actions, or do they act independently?</li>
  <li class="fragment"><strong>Loop assumption</strong>: Open-loop action sequences vs. closed-loop state feedback.</li>
</ul>


<!-- 
---
## Open Problems

<ul style="margin-top: 15px;">
  <li class="fragment"><strong>Goal set definition</strong>: In Attainable Agency, who defines the set of goals $\mathcal{G}_h$? (Chris)</li>
  <li class="fragment"><strong>Powerless blockers</strong>: An agent $A$ with zero power might block an agent $B$ who has power. Does empowerment fully capture this "power over" dynamic? (Junior)</li>
  <li class="fragment"><strong>Adversarial settings</strong>: What happens when two AIs each want to empower their respective human groups in a zero-sum environment?</li>
  <li class="fragment"><strong>Open vs closed loop</strong>: Does superadditivity hold when agents can react to the state trajectory? (A major open problem for the closed-loop convention).</li>
</ul> -->

---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## V. Reflection and Next Steps

---

## Process Reflection

Looking back at the first half of the fellowship:

<ul style="margin-top: 15px;">
  <li class="fragment"><strong>Beginning</strong>: I started broad, exploring existing simulations and metrics.</li>
  <li class="fragment"><strong>Gap</strong>: The literature lacks a rigorous, set-theoretic approach to coalitional empowerment.</li>
  <li class="fragment"><strong>Focus</strong>: Shifting to formal foundations (coordination costs, loop assumptions, superadditivity theorems) sets up the remainder of the fellowship to produce rigorous, principled results.</li>
</ul>

---

## Current Work in Progress

Formalizing these choices, and exploring the resulting regimes of coalitional power:
<ul>
  <li class="fragment"><strong>Adversarial ("guaranteed") empowerment</strong> might always be superadditive? (cf. classical game theory).</li>
  <li class="fragment">Under a <strong>passive complement</strong>, we might see
    <ul>
      <li class="fragment"><strong>Superadditive</strong>: Kernel synergy (e.g., two-key locks).</li>
      <li class="fragment"><strong>Additive</strong>: Decoupled subsystems.</li>
      <li class="fragment"><strong>Subadditive</strong>: Shared bandwidth or congestion.</li>
    </ul>
  </li>
</ul>

<div class="fragment">
  <b>Ultimate goal:</b> Formalize how coordination costs and misalignment deflate this theoretical collective power in practice.
</div>

<!-- 
---
## Next Steps

Focus for the coming weeks:

<ul style="margin-top: 15px;">
  <li class="fragment"><strong>Analytical work</strong>: Formalize coalitional power and superadditivity.</li>
  <li class="fragment"><strong>Empirical work</strong>: Build synthetic environments (lock-key, gridworlds) to test coordination boundaries.</li>
</ul> -->

---


<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## Question time