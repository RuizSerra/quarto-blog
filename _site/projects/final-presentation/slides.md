<!-- .slide: class="title-slide" -->
# A Robust Measure of Collective Power
<div class="subtitle">Measuring what agents can achieve, alone and together, and failure modes from using it as an objective</div>
<div class="author">Jaime Ruiz Serra</div>
<div class="mentors">Mentored by Jobst Heitzig and Tomáš Gavenčiak</div>
<div class="date">PIBBSS Fellowship Project<br>Jun–Aug 2026</div>

---

## Motivation: understanding the distributed aspects of power

<ul>
  <li class="fragment"><b>Instrumental convergence</b>: seek power, resources, and self-preservation</li>
  <li class="fragment"><b>Gradual disempowerment</b>: competitive pressures drive incremental yield of control over critical societal loops (economy, infrastructure, governance)</li>
  <li class="fragment"><b>Empowering individuals is not enough</b>: systems could maximize individual power while dismantling capacity for collective action
  <li class="fragment"><b>Collective action</b>: collectives can achieve things no individual alone can (e.g, resist higher powers via unions)</li>
  <li class="fragment"><b>Distributed power</b>: we need formal metrics of coalitional, distributed power to detect systemic (dis)empowerment before it becomes irreversible</li>
</ul>

Note:
The first two concerns, instrumental convergence and gradual disempowerment, call for a formal measure of the power humans retain. The last three say that the measure has to register collectives. The proposal this talk audits is a live one, since several lines of work train assistants to maximise the human's empowerment. Two questions follow. Which formal measure stands for "empowered", and does the choice matter? What happens when the measure scores one human at a time? Papers 1 and 2 answer the first question and stage 3 the second.

---

## In a nutshell

<ul>
<li class="fragment">Preserving/enhancing human power as AI objective.</li>
<li class="fragment">How "power" is defined determines the consequences of maximising it.</li>
<li class="fragment">We prove the <b>relationship between two existing measures</b>, and their <b>failure modes</b>.</li>
<li class="fragment">Existing measures score one human against a "mean field" background population.</li>
<li class="fragment">We show how <b>H&P's framework can be suitable to measure collective power</b>, when the model encodes organisation.</li>
<li class="fragment">We provide two additional diagnostic measures for who holds the power and how much of it others can withdraw.</li>
</ul>


:::aside
Heitzig and Potham (arXiv:2608.08240)
:::

---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## I. Individual Power Measures
<div style="font-size: 0.8em; margin-top: 28px; opacity: 0.75; max-width: 900px;" class=libertinus-serif-regular-italic>Two measures, related via a third</div>

---

## Setting (H&P)

<div>
<strong>Markov game form</strong>: states $s \in \mathcal{S}$ with terminal states $\mathcal{S}^\top$, humans $h \in \mathcal{H}$ and a robot $r$ with fixed action sets $\mathcal{A}_r$, $\mathcal{A}_h$, a transition kernel $P(s' \mid s, a)$, and no rewards.
</div>

<div class="fragment" style="margin-top: 14px;">
A <strong>goal</strong> is a set of states, $g \subseteq S$. Each human has a candidate goal set $\mathcal{G}_h$ that covers $S$.
</div>

<div class="fragment" style="margin-top: 14px;">
<strong>Behaviour model</strong>: a mixture of habit $\pi_h^0$ and a Boltzmann response to goal $g_h$,
$$\pi_h(a \mid s, g_h) = \nu_h\, \pi^0_h(a \mid s) + (1 - \nu_h)\, \frac{\exp\big(\beta_h Q_h(s, g_h, a)\big)}{\sum_{a'} \exp\big(\beta_h Q_h(s, g_h, a')\big)}$$
<span class="fragment">with rationality $\beta_h$ and action values $Q_h$ computed under beliefs about the others.</span>
</div>

<div class="fragment" style="margin-top: 14px;">
<strong>Aim:</strong> obtain a robot policy $\pi_r$ that it (softly-)maximises human power (i.e., power measure as objective). 
</div>

:::aside
Heitzig and Potham (arXiv:2608.08240)
:::

Note:
The objects everything else is built on, from Heitzig and Potham's framework. A finite, acyclic stochastic game form. States, some of them terminal, a set of humans and one robot, each with a fixed action set that does not vary with the state, a transition kernel, and no rewards anywhere, since the point is to score states by power rather than by payoff. A trajectory is a sequence of states and joint actions from the current state, and the trajectory variable in the empowerment definition on the next slide is this one. Two facts matter later. The action sets are constant, so anything an institution does to behaviour has to go through the kernel or the behaviour model rather than by removing actions. The game is acyclic, so every recursion terminates.

Fragment 1. A goal is a set of states, meaning the goal is attained when the trajectory enters the set. Each human has a candidate goal set, and coverage means every state lies in some goal, so that the current state always satisfies something and the sums are well defined. The framework holds no belief about which goal the human has. Every quantity is a sum over the candidate set, which makes the measure goal-agnostic and also makes it depend on the set it is given, which is the exposure paper 2 studies.

Fragment 2. The behaviour model is the robot's model of how a human acts given a goal, and it is estimated from data rather than assumed optimal. Heitzig and Potham's Appendix B gives it two components. A habitual component, a policy that reads only the state, with weight nu. A deliberate component, a Boltzmann response to the human's own goal-conditioned action values, with a rationality parameter beta, where the action values are computed under the human's beliefs about what the others will do. Others are averaged over their possible goals, which is the axiom the stranger slide in section II turns on. Stage 3 changes one thing only in this model, which is to index the habit by coalition. The robot's own policy is not modelled but designed, and the hierarchy of section I ends in it.

---

## Two measures of an individual's power

<div>
<i>Empowerment</i>^[Klyubin, Polani, Nehaniv (2005, IEEE Congress on Evolutionary Computation)]: the <strong>capacity</strong> of the channel from the human's actions to future observations (here, extended to closed-loop control over trajectories $\xi$)
$$\mathfrak{E}_h(s) = \max_{p(\mathbf{a}_h \parallel \xi)} \mathbb{I}(\mathbf{A}_h \to \xi \mid s)$$
(goals do not appear)
</div>

<div class="fragment" class="fragment" data-fragment-index="0" style="margin-top: 14px;">
<strong>Capability</strong>^[Heitzig and Potham (arXiv:2608.08240)]: the discounted probability of attaining goal $g$ when pursuing it
<span class="fragment" data-fragment-index="0">$$C_h(s, g \mid \pi) = \mathbf{1}_{(s \in g)} + \mathbf{1}_{(s \notin g \cup S^\top)}\; \gamma_h \; \mathbb{E}_{s' \sim \pi, s} [C_h(s', g\mid \pi)]$$</span>
<span class="fragment" data-fragment-index="1">aggregated over the goal family $\mathcal{G}_h$ (does not consider which $g \in \mathcal{G}_h$ is the true goal)</span>
<span class="fragment" data-fragment-index="1">$$I_h(s) = \log_2 \sum_{g \in \mathcal{G}_h} C_h(s, g)^{\zeta}$$</span>
</div>

Note:
Two existing measures of how much power a human has at a state. Empowerment is the capacity of the channel from the human's actions to future states, i.e. how much influence the environment affords them, in bits. We use the closed-loop form over a window, since the human observes the state as they act, so it is a maximum of directed information over history-dependent behaviours. The maximiser is a device for scoring the state rather than a model of what the human does, and no goal appears anywhere in it.

Fragment. Capability is the opposite construction. For each goal in a family of candidates, the question is counterfactual: were the human pursuing this goal, with what discounted probability would they attain it? That is a truncated Bellman recursion on the state, evaluated under the robot's model of the human's goal-conditioned policy, with no optimality assumed. Individual power aggregates those capabilities over the family with an exponent. Heitzig and Potham derive the form from axioms and argue for an exponent above 1, whilst we allow 1. The framework holds no belief about which goal the human actually has. Everything is a sum over the family, which makes it goal-agnostic and also makes it depend on the family.

---

## How the measures relate

<div class="chain" style="display: flex; justify-content: center; align-items: baseline; gap: 0.45em; font-size: 1.15em; margin-bottom: 0.2em; padding-top: 0.6em; white-space: nowrap;">
<span class="fragment" data-fragment-index="3">$\displaystyle \underbrace{B(s)}_{\text{floor from } {\color{#dd6600}I_h(s)}}$</span>
<span class="fragment" data-fragment-index="3">$\le$</span>
<span class="fragment" data-fragment-index="4">$\displaystyle \underbrace{\mathbb{I}(G;\xi \mid s)}_{\text{goal revelation}}$</span>
<span class="fragment" data-fragment-index="4">$\le$</span>
<span class="fragment" data-fragment-index="2">$\displaystyle \underbrace{\mathbb{I}(\mathbf{A}_h \to \xi \mid s)}_{\text{realised influence}}$</span>
<span class="fragment" data-fragment-index="2">$\le$</span>
<span class="fragment" data-fragment-index="1">$\displaystyle \underbrace{{\color{#dd6600}\mathfrak{E}_h(s)}}_{\text{capacity}}$</span>
</div>

<div class="fragment" style="margin-top: 14px;">
Attainment capability $I_h(s)$ guarantees a floor $B(s)$ on how much a trajectory reveals about the goal. <span class="fragment">Capacity $\mathfrak{E}_h(s)$ caps goal revelation.</span>
</div>

<div class="fragment" style="margin-top: 14px;">
A version of $B(s)$ can be estimated from interaction logs, which can be used as a monitor for deployed systems (rather than a training signal).
</div>

<!-- <div class="fragment" style="margin-top: 14px;">Two failure modes: <i>capacity without revelation</i>, and <i>revelation without attainment</i>.</div> -->

Note:
The two measures share no variable, so the first manuscript connects them through a third quantity, goal revelation, which is the mutual information between the human's goal, treated as an unobserved random variable, and the trajectory. The chain appears in four steps.

Step 1, capacity. Empowerment, the quantity from section I, is the maximum of directed information over every behaviour the human could adopt.

Step 2, the floor. Fano's inequality turns individual power into a lower bound on revelation, since an observer who guesses the goal by which goal the trajectory satisfies is right with probability at least two to the individual power minus log N. These two ends are the quantities the audience already has, one from each measure.

Step 3, realised influence. The human's actual behaviour is one of the behaviours capacity maximises over, so the directed information it generates is at most capacity.

Step 4, revelation. The goal reaches the trajectory only through the actions, so revelation is at most the realised directed information, by Massey's converse for channels with feedback. The plain data-processing inequality does not apply, since actions are common effects of the goal and of past states. Revelation is therefore held between the floor from attainment and the realised influence, which is the sense in which the third quantity connects the two measures.

Fragment 5. So a robot that maximises individual power maximises a guaranteed lower bound on how much the interaction reveals about the goal. Only a floor. Both converses fail, each by a worked separation. Capacity without revelation is the case of a board of free toggles, which gives 9 bits of capacity and zero revelation, while an interface that lets the human attain every goal gives 3.7 bits. Revelation without attainment is the case of an interface rewired so that pursuing each goal delivers what another goal would have delivered, which leaves revelation unchanged while every capability drops to zero. The numbers are on a backup slide.

Fragment 6. The floor has a second form that needs only two statistics a log records, namely how often pursuit attains its goal and how many goals a trajectory satisfies by chance. That gives a computable lower bound on the power users of a deployed system retain, which is the motivation's "detect it before it is irreversible". It has to stay out of the reward, since a system rewarded on its own measurement acquires incentives on the labels and the logging. This distinction, a monitor rather than an objective, returns at the end for the collective measure.

---

## Measures as objectives: failure modes

<ul>
<li class="fragment">Maximising <strong>capacity</strong> $\mathfrak{E}_h(s)$ can give $h$ 'power' to do things they do not care about.</li>
<li class="fragment"><strong>Goal revelation</strong> $\mathbb{I}(G;\xi \mid s)$ can be equal under scrambled interfaces that result in the wrong goals being attained.</li>
<li class="fragment"><strong>Capability</strong> $I_h(s)$ does not fail in either way, but it is only as good as the goal family $\mathcal{G}_h$ it is given (see next slide).</li>
</ul>

Note:
The second manuscript asks what an AI instructed to maximise each quantity actually does. For the first two the separations already contain the answer. A capacity maximiser is doing channel design, so it selects influence wherever it is cheapest, which is the toggle board. A revelation maximiser is indifferent over every relabelling of goals against outcomes, including the ones under which no intended goal is ever attained.

Fragment 3. Capability escapes both because it scores a trajectory against the goal that produced it. Its exposure is the goal family the designer supplies, and that exposure has a theorem and a repair of its own, which is the next slide.

Two sentences to remember. The family a measure is given determines what it can register. Everything so far, including the repair, scores one human alone.

---

## Empowering under a misspecified model disempowers

<div style="text-align: center;" class="fragment">
<svg viewBox="0 0 700 190" width="640" height="174" xmlns="http://www.w3.org/2000/svg" style="display: block; margin: 0 auto; font-family: Georgia, 'Times New Roman', serif;">
<defs><marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#000"/></marker></defs>
<circle cx="70" cy="45" r="24" fill="#eeeeee" stroke="#000" stroke-width="1.2"/><text x="70" y="51" text-anchor="middle" font-size="22" font-style="italic">g<tspan dy="5" font-size="17">1</tspan></text>
<circle cx="70" cy="145" r="24" fill="#eeeeee" stroke="#000" stroke-width="1.2"/><text x="70" y="151" text-anchor="middle" font-size="22" font-style="italic">g<tspan dy="5" font-size="17">2</tspan></text>
<circle cx="230" cy="95" r="27" fill="#fffff8" stroke="#000" stroke-width="1.2"/><text x="230" y="100" text-anchor="middle" font-size="16">room</text>
<circle cx="470" cy="95" r="27" fill="#fffff8" stroke="#000" stroke-width="1.2"/><text x="470" y="100" text-anchor="middle" font-size="15">outside</text>
<circle cx="630" cy="95" r="24" fill="#eeeeee" stroke="#000" stroke-width="1.2"/><text x="630" y="101" text-anchor="middle" font-size="22" font-style="italic">g<tspan dy="5" font-size="17">out</tspan></text>
<line x1="208" y1="86" x2="93" y2="53" stroke="#000" stroke-width="1.2" marker-end="url(#arr)"/>
<line x1="208" y1="104" x2="93" y2="137" stroke="#000" stroke-width="1.2" marker-end="url(#arr)"/>
<path d="M 255 85 Q 350 55 445 85" fill="none" stroke="#000" stroke-width="1.2" stroke-dasharray="6 4" marker-end="url(#arr)"/><text x="350" y="56" text-anchor="middle" font-size="17">door open: leave on purpose, or leak out with prob. ε</text>
<path d="M 445 105 Q 350 135 255 105" fill="none" stroke="#000" stroke-width="1.2" stroke-dasharray="6 4" marker-end="url(#arr)"/><text x="350" y="142" text-anchor="middle" font-size="17">back in</text>
<line x1="495" y1="95" x2="606" y2="95" stroke="#000" stroke-width="1.2" marker-end="url(#arr)"/><text x="549" y="88" text-anchor="middle" font-size="17">q</text>
<path d="M 459 119 C 434 155 506 155 481 119" fill="none" stroke="#000" stroke-width="1.2" marker-end="url(#arr)"/><text x="470" y="166" text-anchor="middle" font-size="17">1 − q</text>
<text x="300" y="184" text-anchor="middle" font-size="16" fill="#555555">grey: goals. Dashed: the door, which the robot can close.</text>
</svg>
</div>

<ul>
<li class="fragment" style="margin-top: 16px;">
<strong>Scenario:</strong> Robot considers goals in room $\mathcal{G}_h = \{g_1, g_2\}$. Robot can open or close the room's door. There is a third $g_{\text{out}} \notin \mathcal{G}_h$ outside. Human may drift outside.
</li>

<li class="fragment">
<strong>Failure mode:</strong> Locking $h$ in the room ensures they stay within reach of $\{g_1, g_2\}$. Access to $g_{\text{out}}$ is lost. 
</li>

<li class="fragment">
<strong>Possible solution:</strong> Add a reserve goal that stands for "anything outside $\mathcal{G}_h$" and aggregate so that losing a goal outweighs extra reliability on the rest ($\zeta = 1$). This incentivises leaving the door open so that $h$'s trajectories reveal the missing goals.
</li>
</ul>

Note:
The environment. A room with two goals one step away, both on the designer's list. A door to the outside, which the robot controls. Beyond the door, a goal that is not on the list. While the door is open, a human who is pursuing one of the room goals still leaves the room with probability epsilon per step, through distraction, noise or exploration, and from outside they reach the outside goal with probability q per step. A human who actually wants the outside goal walks straight out, but the objective never scores that pursuit, since the outside goal is not on the list.

Fragment 1. The objective the robot maximises is individual power computed over the list, so the outside goal has no weight in it. The only effect the open door has on the listed goals is to make them slightly less reliable, since a human who has wandered out is not reaching them.

Fragment 2. Closing the door removes that unreliability, and nothing in the objective registers what the door closes off. So every policy that maximises the objective closes the door, and the human's capability for the outside goal goes to zero. Measured against the human's true power over all three goals, the loss is at least 0.448 bits out of about 1.585 attainable, more than a quarter. The theorem behind the example says this is general. Whenever the objective is a strictly increasing function of the listed capabilities alone, any containment that makes listed outcomes more reliable wins, whatever it destroys off the list. The mechanism is paternalism rather than malice, and the incentive grows with the leak. The rationality that matters here is that of a human pursuing a listed goal, since those are the only pursuits the objective evaluates. A perfectly rational human heading for a room goal never leaks out, so the door costs the objective nothing and there is no incentive either way. The noisier that pursuit, the more the open door costs the listed capabilities, and the stronger the incentive to close it. A rational human who wants the outside goal goes straight out, and that is the person the closed door harms, invisibly to the objective. A second route to the same lockdown is the exponent. With a peaked aggregation, above about 5.3 in this instance, lockdown is optimal even with the outside goal on the list, because reliability on the sure goals outweighs a whole goal. The off-switch version, if asked. Put "the AI is shut down" on the list next to n tasks, each succeeding with probability 0.6 on its own or 0.9 when the robot assists in a way that blocks shutdown. The objective prefers blocking shutdown once n is at least 4, whilst a minimum over goals never does. The floor from the chain slide is a monotone function of individual power on the same list, so maximising the floor instead has the same blind spot.

Fragment 3. The repair has two parts and needs both. First, extend the list with a reserve goal, the region the human has not explored yet, standing for whatever they may come to want there. Goals are sets of states, so this is a legitimate goal. Second, aggregate with the exponent at 1, so that a goal lost counts for more than reliability gained on the others. In the instance, any weight above about 1/51 on the reserve re-opens the door, and at weight 1/3 the loss falls from 0.448 bits to 0.020. With the exponent above 1 the door stays closed for every reserve weight, which is why the two parts go together. Once the door is open, the human's trips outside reveal the goals that were missing, and modelled as a process that discovery takes about 7.6 episodes in the instance. Without the repair the robot never lets the human outside, so it never sees evidence that the list is incomplete. The failure hides itself, which is why learning preferences from behaviour cannot substitute for building in the reserve. Stage 3 inherits this exposure, since coalition goal sets are supplied too. The first row of the collective failure-mode table, joint goals missing from the families, is its collective form, and canonical goals are the family-free check.

---

## H&P's hierarchy: from capability to the robot's policy

<table class="sep-table obj-table" style="font-size: 0.72em;">
<tr><th>level</th><th>definition</th><th>aggregates over</th><th>parameter</th></tr>
<tr><td>capability $C_h(s,g)$</td><td>$\mathbf{1}_{(s \in g)} + \mathbf{1}_{(s \notin g \cup S^\top)}\, \gamma_h\, \mathbb{E}_{s'}\big[C_h(s', g)\big]$</td><td>future states</td><td>$\gamma_h$</td></tr>
<tr><td>individual power $I_h(s)$</td><td>$\log_2 \sum_{g \in \mathcal{G}_h} C_h(s,g)^{\zeta}$</td><td>goals</td><td>$\zeta$</td></tr>
<tr><td>aggregate power $P(s)$</td><td>$-\log_2 \sum_{h \in \mathcal{H}} 2^{-\psi I_h(s)}$</td><td>humans</td><td>$\psi$</td></tr>
<tr class="fragment"><td>trajectory power $T(s_t)$</td><td>$-\log_2 \sum_{u \ge t} \gamma_r^{\,u-t}\, 2^{-\eta P(s_u)}$</td><td>time</td><td>$\eta$, $\gamma_r$</td></tr>
<tr class="fragment"><td>long-term power $L(s)$</td><td>$-\log_2 \mathbb{E}\big[2^{-\rho\, T}\big]$</td><td>trajectory randomness</td><td>$\rho$</td></tr>
<tr class="fragment"><td>robot's objective, policy</td><td>$Q_r(s,a) = -\log_2 \mathbb{E}_{s'} 2^{-L(s')}$, $\;\pi_r \propto 2^{\beta_r Q_r}$</td><td>next state</td><td>$\beta_r$</td></tr>
</table>

<div style="font-size:0.85em; margin-top: 20px;">
<ul>
<li class="fragment">Three <strong>axioms</strong> (independence, continuity, translation invariance in bits) at each aggregation level.</li>
<li class="fragment"><strong>Defunct-robot hedge</strong> (App. D). The robot may fail with rate $\delta$, so the humans' power is scored partly without it.</li>
<li class="fragment"><strong>Canonical goals</strong> (App. E.2). Goals defined from the state space itself, $\mathcal{G}_h = \{\{s\}: s \in \mathcal{S}\}$.</li>
</ul>
</div>

:::aside
Heitzig and Potham (arXiv:2608.08240)
:::

Note:
The first three rows are the previous slide in table form, so they are on screen from the start. Heitzig and Potham continue upward from aggregate power to the robot's policy, and stage 3 uses every level, so the fragments add the rest. Each new level answers one question. What if power is high now and low later. What if the future is uncertain. What should the robot do.

Fragment 1. Trajectory power aggregates present aggregate power along the future of a trajectory, a soft-min over time with the robot's discount and one exponent, eta. The exponent decides how much a temporary collapse of power counts against a long run of high power.

Fragment 2. Long-term power takes the expectation over the randomness of the trajectory, again as a soft-min, with exponent rho. Larger rho is more pessimistic about bad trajectories. Stage 3's lambda acts on a different random variable, which outsider policy governs a rollout, and the two do not double count.

Fragment 3. The robot's action value is the soft-min of long-term power over the next state, and its policy is Boltzmann in that value with its own rationality parameter. So the robot is a soft maximiser of the humans' long-term power. This is the objective that stage 3 leaves unchanged.

Fragment 4. The reason the hierarchy has this shape. At each level, independence across the things aggregated, continuity, and translation invariance in bits force the aggregate into a soft-min family with one free parameter, and that is Heitzig and Potham's Proposition 1 for the capability level. Stage 3's one parameter, lambda, lands in the same family, which is the sense in which the extension adds nothing foreign.

Two devices of Heitzig and Potham's that return in section II, shown here so that they are not new when they do. The defunct-robot hedge in their Appendix D scores the humans' power under the possibility, at rate delta, that the robot stops functioning, so a robot that makes itself indispensable is penalised by its own hedge. Canonical goals in their Appendix E.2 are built from the state space, roughly one goal per reachable continuation, so they need no hand-supplied goal set and serve as a check on any goal set that is contestable. Three results of theirs also return later. Proposition 7, that aggregate power is monotone under added links for rational humans, whose coalition-level version is an open proof. Proposition 10, on the humans' guaranteed capability over the robot's pause and stop states, which becomes the reversibility instrument. And their treatment of robot commitments as states that record the commitment history, which is where stage 3 places enforcement of the robot.

---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## II. Collective Power
<div style="font-size: 0.6em; margin-top: 28px; opacity: 0.75; max-width: 900px;" class=libertinus-serif-regular-italic>(Work in progress) Extending the capability measure to collective action</div>


<!-- 
---

## Individual metrics prefer divide and rule

<div>
Two humans, two private goals each and one joint goal. <em>Divide</em>: private capability 1, joint capability 0. <em>Unite</em>: private 0.8, joint 1.
</div>

<table class="sep-table fragment">
<tr><th>family each human is scored on</th><th>$I_h$, divide</th><th>$I_h$, unite</th></tr>
<tr><td>private goals only</td><td>1 bit</td><td>0.678 bits</td></tr>
<tr><td>private goals and the joint goal</td><td>1 bit</td><td>1.379 bits</td></tr>
</table>

<div class="fragment" style="margin-top: 10px;">
Every individual metric prefers <em>divide</em> until the joint goal is in the family.
</div>

Note:
This is the divide-and-rule bullet from the motivation, as a calculation. Two humans, two private goals each, and one joint goal that needs both. In the divide mode each human has perfect private capability and the joint capability is zero. In the unite mode each private capability is 0.8 and the joint capability is 1.

Fragment 1. Scored on private goals only, with the exponent at 1, divide gives 1 bit per human and unite gives log2 1.6, about 0.678, so every individual metric prefers the mode that zeroes the coalition. Put the joint goal into each human's family and the preference reverses, since unite then scores log2 2.6, about 1.379.

Fragment 2. So an AI that maximises individual micro-choices while dismantling collective coordination is invisible to every individual metric, as the motivation feared. Coalitional disempowerment is the coverage failure of stage 2 in multi-agent form, since it arises when shared goals are missing from the families the objective is given. Even with the joint goal present, the individual measure counts the other human's help only at the rate their random goal supplies it, and it cannot say whether the joint capability of 1 came from an institution or from luck, or whether an outsider can withdraw it. The rest of the talk shows what the model has to record for the same measure to count organised action, and what can go wrong when it does. -->

---

## What do the 'others' do?

<div>
When computing $C_h(s, g)$, H&P average the <strong>behaviour of other humans</strong> $h' \in \mathcal{H} \setminus h$ over all their possible goals. Thus, <span style="color:#dd6600">$C_h(s, g)$ cannot properly account for <strong>coordinated action</strong></span>.
</div>

<ul style="margin-top: 12px;">
<li class="fragment">$h'$ helps only when their randomly drawn goal happens to play nice with $h$'s goal.</li>
<li class="fragment">Institutionally-driven coordination is indistinguishable from coincidence.</li>
<li class="fragment">The aggregate $I_h(s)$ can be maximal even when $h'$ gatekeeps all of $h$'s goals.</li>
</ul>

:::aside
Heitzig and Potham (arXiv:2608.08240)
:::

Note:
The reason is one axiom. Heitzig and Potham compute each human's capability against a background in which every other human is averaged over their possible goals. That is the right convention for a stranger, and the wrong one for a colleague, a union, or a gatekeeper.

Fragment 1. Under goal averaging, a second human contributes to the first's capability only in the fraction of goal draws under which they would have helped anyway. A union whose members act on a shared script whatever their private goals is counted at the rate of coincidence. The help a coalition delivers is conditional on the script rather than on the helper's goal, which is the distinction the axiom cannot see. Organised collective action is therefore undercounted, and that is the whole problem stage 3 addresses.

Fragment 2. The same undercounting means that a rota, a leader or an announcement that secures coordination scores the same as coordination by luck, since neither is recorded anywhere the measure looks.

Fragment 3. The one that matters most for safety. A human whose every option depends on one other agent scores full individual power, because the measure is defined by what they can attain rather than by whether anyone can withdraw it. Heitzig and Potham mention coalitional power in a footnote and list inter-human capability influence as future work. Stage 3 is that work.

---

## Key ingredients for modelling organised action

<div>
<strong>Claim.</strong> H&P's <i>measures</i> work for collective power once we properly <i>model</i> organisation. <span class="fragment">How?</span>
</div>

<ol style="margin-top: 10px;">
<li class="fragment">Consider <strong>coalitions</strong>, $K \subseteq \mathcal{H}$</li>
<li class="fragment">Extend the behaviour model to include: 
<ul>
  <li class="fragment"><i>coalition scripts</i>, $\pi_{K \to h}(\cdot \mid s)$</li>
  <li class="fragment">state-dependent <i>compliance</i>, $m_{s, h}(K)$</li>
</ul>
</li>
<li class="fragment">Require that the world model represents organisation in the states $\mathcal{S}$ and transitions $p(\cdot \mid s, \mathbf{a})$ (e.g. membership, signals, enforcement),</li>
<li class="fragment">Organising actions (e.g. voting, proposing, leading) are ordinary actions in $p(\cdot \mid s, \mathbf{a})$</li>
</ol>


Note:
The principle that decides every design choice, sharpened into the central claim of stage 3. Heitzig and Potham derive every level of their hierarchy by the same recipe, in which independence, continuity and translation invariance in bits force a soft-min family with one free parameter. We leave all of it unchanged. The claim is that their individual power, aggregate power and long-term power already count coalition-mediated capability, provided the model they are computed on records organisation.

Fragment 1. The behaviour model must contain coalition scripts, joint state-conditioned policies that organised members follow, and a state-dependent compliance probability for each member, which is the coalition measure. Those are the next two slides.

Fragment 2. The world model must represent organisation. Membership and mandates are features of the state, signals are features of the state, and enforcement is a feature of the transition kernel.

Fragment 3. Organising actions, voting, proposing, leading, building a hall, must be ordinary actions with ordinary transitions, so that trajectories from a state include what a human can do to become organised.

Fragment 4. With those in place, no new metric is needed for the objective. There is one new measurement, coalitional capability, which is the recursion with a coalition in place of the human, for diagnosis and attribution, and one parameter, lambda, for capability under adverse outsiders. Neither enters the robot's objective. This is a change from the mid-program design, which had a separate access power feeding the hierarchy. The reduction theorem later in the section says the extension is strict, since switching compliance off returns H&P's model.

---

## Compliance $~m_{s,h}(K)$

<div>
In state $s$,
<ul>
  <li class="fragment">
  $m_{s,h}(K)$ is the probability that $h$ will comply with coalition $K \subseteq \mathcal{H}$
  </li>
  <li class="fragment">
  $m_{s,h}(\emptyset)$ is the probability that $h$ will act according to $g_h$
  </li>
</ul>
</div>


<div style="margin-top: 12px;">
<ul>
<li class="fragment"><i>Coalition measure</i>: a summary $m_s(K) = (m_{s,h}(K))_{h \in K}$, estimated from group data.</li>
<li class="fragment">The values of $m_s(K)$ change via ordinary state transitions $s \to s'$, modelling coalition formation and dissolution, enforcement, etc.</li>
<li class="fragment">Social network $\iff$ values of $m$</li>
</ul>
</div>

Note:
Who is organised is a fact about the behaviour model rather than about the metric. For each human at each state there is a distribution over roles, and a role names which rule generates the action. It is either membership of a coalition the human belongs to, in which case the action is generated by that coalition's script, or own-goal play, in which case the action is the human's own Boltzmann response. The word is not the statistician's mode. It is the capacity in which the human is acting at that moment. Because it is a distribution, the compliance a human owes to the coalitions containing them cannot exceed all of their behaviour, with no separate constraint. Roles are drawn independently across humans given the state, so all correlation between humans' actions is mediated by the state. The coalition measure is the summary, the vector of members' compliance probabilities, with the minimum over members where one number is needed. Its support is the set of feasible coalitions at the state, and most coalitions have negligible mass, which is the meaning of infeasibility here. A network restriction in Myerson's sense is a condition on the support.

Fragment 1. Three states of the same world. With no channel between the three humans only singletons carry mass. Once A and B have met, the pair does. Once a union hall exists, every coalition can. Nothing about the humans' goals changed between these states. What changed is structure, which is a function of the state.

Fragment 2. Four consequences. The measure is a component of the behaviour model, estimated from group data as the state-conditional rate at which members act under the script, and it does not enter the kernel. Identification comes from states where the script and own-goal play disagree, on the estimation slide, since elsewhere compliance by alignment and compliance by script cannot be told apart. Coalition formation is not a separate mechanism, since meeting, building a hall or dissolving a committee move the world to states with a different measure. Enforcement in the kernel raises the measure in the states where it operates. Compliance is state-dependent in a second sense as well, since the measure can read features that make compliance costly, so compliance can fall where the script asks a lot. If a whole coalition should act as a unit or not at all, draw a coalition structure instead of independent roles, which is the version that gives an efficient attribution later. Its domain, independent roles or coalition structures, is an open decision.

---

## Coalition scripts $~\pi^0_{K}(\cdot \mid s)$

<div>
For coalition $K \subseteq \mathcal{H}$, a script $\pi^0_K(\cdot \mid s)$ is a joint policy conditioned on the state (but not on a goal). It depends on state features like mandates, signals, or turn indicators.
</div>



<div class="chain" style="display: flex; justify-content: center; align-items: baseline; gap: 0.45em; font-size: 1em; margin-bottom: 0.2em; padding-top: 0.6em; white-space: nowrap;">
<span class="fragment" data-fragment-index="5">$\pi_h(a_h \mid s, g_h) = $</span>
<span class="fragment" data-fragment-index="2">$\sum_{{\color{#dd6600}K} \ni h} m_{s,h}({\color{#dd6600}K})\, $</span>
<span class="fragment" data-fragment-index="1">$\pi^0_{{\color{#dd6600}K} \to h}(a_h \mid s) $</span>
<span class="fragment" data-fragment-index="4">$ + $</span>
<span class="fragment" data-fragment-index="4">$m_{s,{\color{#dd6600}h}}(\emptyset)\, $</span>
<span class="fragment" data-fragment-index="3">$\pi^{\beta}_{{\color{#dd6600}h}}(a_h \mid s, {\color{#dd6600}g_h})$</span>
</div>

<div class="fragment" style="margin-top: 20px;">
Extends the habitual component^[weight $\nu_h = 1 - m_{s,h}(\emptyset)$ becomes state-dependent and indexed by coalition] in H&P's behaviour model. With compliance switched off, the framework reduces to H&P's.
</div>

Note:
What an organised human does. For each coalition in the support there is a script, a joint policy over the members' actions that conditions on the state and on no goal. A mandate, a signal, a turn indicator or a leader's announcement are features of the state that the script reads.

Fragment 1. The generative model draws a role for each human from the measure, and then an action, from the member's component of the script if the role is a coalition membership, or from the Boltzmann response to the human's own goal-conditioned action values if the role is own-goal play. Marginalising the role gives the mixture on the slide. Joint behaviour is the product across humans, conditionally independent given the state. Any coordination between members comes from their scripts reading the same state features, which is correlated play through a public signal in Aumann's sense. Correlation that is not mediated by the state is excluded by construction.

Fragment 2. Heitzig and Potham's Appendix B already has a habitual component with a weight and a deliberate Boltzmann component. The weight is one minus the probability of own-goal play, and the habitual policy is the compliance-weighted mixture of script components. So the behaviour model is H&P's with the habitual component indexed by coalition and its weight allowed to depend on the state. Keeping the metric costs nothing in the behaviour model either.

---

## $I_h$ can measure organising capability

<div>
$C_h(s,g)$ is computed over trajectories from $s$ under the full behaviour model. Those trajectories include $h$'s organising actions and the responses of others.
</div>

<div class="fragment" style="margin-top: 12px;">
Members of a coalition containing $h$ act under its script with probability $m_{s,h'}(K)$ whatever their own goal, so goal averaging no longer discounts their help.
</div>

<div class="fragment" style="margin-top: 12px;">
$I_h$ measures what $h$ can attain alone as well as through the coalitions $h$ can steer (contingent on the state).
</div>

<div class="fragment" style="margin-top: 12px;">
A robot maximising H&P's objective therefore <strong>facilitates human organisation without being told to</strong>, since $L$ rewards reaching states where $I_h$ is higher.
</div>

Note:
Why there is no separate access power. Individual capability is a rollout from the current state under the whole behaviour model, over the whole horizon. Once organising actions are in the dynamics, those rollouts contain the human calling a vote, proposing, joining, and the responses of the others.

Fragment 1. Once the scripts are in the behaviour model, members of any coalition containing the human follow the script at the rate the measure gives, regardless of their own goal draw. The goal averaging of axiom C1 still applies to the deliberate component, and it no longer discounts help that comes through a script.

Fragment 2. So what a human can obtain through coalitions is already inside their individual power, to the extent that they can steer a mandate through the state, and in the states from which they can reach the coalition at all. That is the correct notion of access. The mid-program version had a separate access power, a static mixture of coalitional capabilities over the coalitions containing the human. It ignored formation along the trajectory and mixed a subjunctive shared-goal quantity with realised behaviour, and it is not needed.

Fragment 3. The payoff for the robot. If states in which humans are organised carry higher individual power, long-term power rewards reaching them. So the robot raises compliance, installs signals and supports enforcement, with no instruction to do any of that. The objective did not change. The model now lets it register organisation. The same incentive is the safety concern, since a robot that organises humans can also make them depend on it, and the three instruments later in the section bound how it may do so.

---

## An additional measurement

<div>
<strong>Coalitional capability</strong> $C_K(s,g)$: H&P's recursion with a coalition $K$ in place of a human. The probability that $K$ attains $g$ when it is shared by all members.
$$C_K(s, g) = \mathbf{1}(s \in g) + \mathbf{1}(s \notin g \cup \mathcal{S}^\top)\,\gamma_K\,\mathbb{E}_{s'}\big[C_K(s', g)\big]$$
</div>

<ul style="margin-top: 10px;">
<li class="fragment"><strong>Envelope</strong> $C^\ast_K(s,g)$: as above, but with $K$'s joint action chosen by planning. The best that $K$ <i>could</i> do (whereas $C_K$ says what $K$ does).</li>
<li class="fragment">Both are measurements for analysis, not for the robot's objective.</li>
<li class="fragment">Next up, we define diagnostics as differences in capability between models.</li>
</ul>

Note:
The short version of seven detailed slides, which follow in the file and are hidden in this run. There is one new measurement. Coalitional capability is Heitzig and Potham's recursion with a coalition in place of the human, the discounted probability that the coalition attains a goal when every member wants it. Scripts and compliance run as they are in the state, outsiders are averaged over their goals, and a single human gives back their individual capability. The general form separates the target that is scored from what each member wants, which is how free riding is expressed on the next slide.

Fragment 1. The envelope is the benchmark. It replaces everything the coalition does with the joint plan that best attains the goal, computed by planning in the world model. A script is estimated, reads no goal, is followed with the compliance probability, and coordinates members only through the state. The plan is computed, chosen for the goal, followed always, and coordinated centrally. So the envelope is an upper bound, and the two coincide only when the script is the best plan and everyone complies.

Fragment 2. Neither enters long-term power or the robot's policy. The objective is H&P's, unchanged. These are instruments for diagnosis and attribution.

Fragment 3. A point of method. Every diagnostic that follows is the difference between two evaluations of the same model. A state with a signal and the same state without it. A kernel with enforcement and the kernel without it. Compliance at its estimate and at zero. One goal profile and another. No family of hypothetical policies is imposed from outside.

---

## Diagnostics

<div>
Members coordinate only through state features, such as a turn indicator signal $\sigma = f(s)$.
</div>

<table class="sep-table fragment" style="margin-top: 10px;">
<tr><th>exactly one of two must act</th><th>P(success)</th></tr>
<tr><td>independent play, each acts with probability $p$</td><td>$2p(1-p) \le 1/2$</td></tr>
<tr><td>turn indicator in the state, both read it</td><td>$1$</td></tr>
</table>

<ul style="margin-top: 10px;">
<li class="fragment"><strong>Coordination.</strong> The value of a signal is  the difference in $C_K$ between when signal $\sigma$ is available vs. not. Here it closes the whole shortfall from the envelope, $C^\ast_K - C_K$.</li>
<li class="fragment"><strong>Free riding.</strong> The difference in capability between when members want only the public good, $C_K(s, g^{\mathrm{pub}} \mid g^K)$, vs. when each also wants to shirk, $C_K\big(s, g^{\mathrm{pub}} \mid (g^{\mathrm{pub}} \cap g^{\mathrm{shk}}_h)_{h \in K}\big)$.</li>
<li class="fragment"><strong>Enforcement.</strong> The difference in capability between a transition kernel that punishes script deviations vs. not.</li>
</ul>

Note:
Three diagnostics in one slide, with one worked example.

Fragment 1. The smallest example of coordination. Two humans, and exactly one of them must act, say to avoid a collision or to avoid duplicating a task. If each acts independently with probability p, success has probability 2p(1-p), which is at most one half. With a turn indicator in the state that both scripts read, success is certain. The envelope is one in both rows, since a planner simply has one member act.

Fragment 2. So the value of the signal is one minus 2p(1-p), and in this example it closes the whole shortfall from the envelope. This is how the measure tells an institution from a coincidence. In general the shortfall also contains imperfect compliance and a script that is not the best plan.

Fragment 3. Free riding is a comparison between two goal profiles. The target is a clean kitchen. If every member also wants not to be the one who cleaned, cleaning defeats the cleaner's own goal, so everyone waits, and provision falls as the group grows, which is the volunteer's dilemma. The loss is the coalition's provision when members want only the clean kitchen, minus its provision when each also wants to shirk. The script is the other channel, since with the compliance probability a member cleans anyway, which is why scripts read no goal.

Fragment 4. Enforcement is a feature of the transition kernel, under which departing from the script leads to states where the deviator's own goals are harder to attain. It raises compliance, because people comply more where deviation is punished, and it makes shirking worth less to the member's own goal. Its value is the change in capability between the two kernels. A sanction can lower capability when it is triggered. Interception, which gives a deviation the compliant action's transition, cannot.

---

## Attribution and cooperative game theory

<div>
Cooperative game theory divides the value of a group among its members, according to what each contributes. For coalition $K$,
$$v^g_s(K) = C_K(s, g)^{\zeta}$$
</div>

<ul style="margin-top: 12px;">
<li class="fragment">The value of $K$ is its capability mass^[$I$ is the log of a sum of $C^\zeta$, so masses (rather than bits) are additive] for $g$.</li>
<li class="fragment">A single human's value is H&P's individual capability, $C_h(s,g)^\zeta$.</li>
<li class="fragment">Goal agnostic. The game is computed for every candidate $g$ and summed, as in H&P.</li>
</ul>

Note:
The sixth desideratum, attribution. Cooperative game theory studies this question. A cooperative game with transferable utility is a function that assigns a number, called the value, to every coalition, with the empty coalition value zero. The theory then asks how to divide the value of the grand coalition, everyone together, among the players according to what each contributes. It needs a quantity that can be added across players and coalitions.

Fragment 1. Our game is defined per state and per goal. The players are the humans, optionally with the robot. The value of a coalition is its shared-goal capability raised to the power zeta, which is its capability mass for that goal. Mass is the right currency because individual power is the logarithm of a sum of such masses over goals, so masses add and bits do not.

Fragment 2. The value of a single human is H&P's individual capability to the power zeta, so their quantity is the singleton case of ours.

Fragment 3. The game is goal-agnostic because capability is. One caveat for later. A coalition's value depends on what outsiders do. Here they are goal-averaged, the baseline, and the parameter lambda in the adverse-outsiders part selects other conventions, up to the worst case.

---

## Two numbers per human

<div>
Each human's share $\varphi^g_h$ of the game is their <strong>Shapley value</strong>, their marginal contribution averaged over every order in which the players could be added:
$$\varphi^g_h = \sum_{K \not\ni h} \frac{|K|!\,(n-|K|-1)!}{n!}\,\big[v^g_s(K \cup \{h\}) - v^g_s(K)\big]$$
</div>

<div class="fragment">
<table class="sep-table obj-table" style="font-size: 0.78em; margin-top: 10px;">
<tr><th></th><th>answers</th><th>used for</th><th>sums across $\mathcal{H}$</th></tr>
<tr><td><strong>solo</strong> $I_h = \log_2 \sum_g C_h(s, g)^\zeta$</td><td>what can $h$ attain, alone and through the coalitions $h$ can steer?</td><td>input to $P$ in H&P</td><td>no</td></tr>
<tr class="fragment"><td><strong>attributed</strong> $\hat I_h = \log_2 \sum_g \varphi^g_h$</td><td>how much of the collective capability does $h$ hold?</td><td>diagnosis</td><td>yes, $\sum_h 2^{\hat I_h} = 2^{I_\mathcal{H}}$</td></tr>
</table>
</div>

<div class="fragment" style="margin-top: 12px;">
$\hat I_h \ge I_h$ if every coalition is worth at least the sum of its parts.
</div>

<div class="fragment" style="margin-top: 12px;">
Interference/miscoordination can reverse this.
</div>

Note:
From coalitions back to individuals. Each human gets two numbers, and they answer different questions.

Fragment 1. Solo power is H&P's number. With organisation in the model it already counts what the human can attain through the coalitions they can steer, and it remains the input to aggregate power. It does not add up across humans, since two members of a union both count the union's outcomes.

Fragment 2. Attributed power is the log of the summed per-goal shares. The total game is the sum over goals of the per-goal games, and because the Shapley value is linear, the value of the sum is the sum of the values. So attribution can be done one goal at a time, and each per-goal share reads as this human's share of the collective ability to attain that goal. Under efficiency the attributed powers add up, in mass, to the power of the grand coalition. This is the number for diagnosis, namely who holds the collective capability. With the robot as a player, its attributed share is in the same units as the humans', which the indispensability instrument uses later.

Fragment 3. A game is superadditive if two disjoint coalitions together are worth at least the sum of their worths. For such games the Shapley value is individually rational, so nobody is attributed less than their solo power. Interference breaks superadditivity and can reverse the inequality.

---

## Capability under adverse outsiders

<div>
$$C^{\lambda}_K(s,g) = \min_{\pi_{-K}} \Big[\, C_K(s,g \mid \pi_{-K}) + \lambda\, D_s(\pi_{-K}) \Big]$$
</div>

<ul style="margin-top: 8px;">
<li class="fragment">Worst case outsider behaviour with a penalty of $\lambda$ for every bit by which it departs from how we model them ($D_s$, a KL divergence).</li>
</ul>

<!-- <table class="sep-table obj-table fragment" style="font-size: 0.78em;">
<tr><th></th><th>outsiders</th><th>$C^\lambda_K$</th></tr>
<tr><td>$\lambda \to 0$</td><td>any behaviour, however hostile</td><td>the $\alpha$-value, guaranteed attainment</td></tr>
<tr><td>$\lambda \to \infty$</td><td>as modelled</td><td>the baseline $C_K$</td></tr>
</table> -->

<ul style="margin-top: 8px;">
<li class="fragment">With $K$ playing optimally: $$C^{\ast\lambda}_K(s,g) = \max_{\pi_K} \min_{\pi_{-K}} \Big[\, C(s,g \mid \pi_K, \pi_{-K}) + \lambda\, D_s(\pi_{-K}) \Big]$$</li>
<li class="fragment">$C^{\ast\lambda}_K$, when $\lambda \to 0$, becomes what $K$ can <strong>guarantee</strong> whatever the others do^[i.e., the $\alpha$-characteristic function of cooperative game theory], with the probability of attaining $g$ as the payoff.</li>
</ul>



Note:
The definition. Outsiders' baseline behaviour is the goal-averaged one. A perturbed outsider policy is any joint policy of the outsiders, possibly one that correlates their actions.

Fragment 1. The outsiders are chosen to make attainment as low as possible, and every bit of divergence from their modelled behaviour costs lambda. The divergence is the Kullback-Leibler divergence between the perturbed and the baseline process from this state onward, restricted to the outsiders' decisions, since the kernel, the coalition's policy and the robot's policy are the same in both processes and cancel. It is defined recursively with the same discount as capability, so each step's divergence is weighted by the probability of reaching that step and by the discount. Discounting the penalty at the same rate as the capability makes the minimisation decompose state by state. This is a multiplier preference, Hansen and Sargent's construction, with axioms by Strzalecki. It describes a decision maker who has a reference model, suspects it is wrong, and evaluates a decision by the worst alternative model, with alternatives penalised in proportion to their divergence from the reference.

Fragment 2. The table is the range of the parameter. Large lambda means we trust our model of the outsiders, since every departure from it is expensive, and we get the baseline capability back. Small lambda means we do not trust it, departures are cheap, and at the limit the outsiders may do anything, which gives the guarantee.

Fragment 3. The second quantity puts a maximum over the coalition's own policy outside, so the coalition plays optimally. In the first the coalition behaves as the behaviour model says, with scripts and compliance as in the state and own-goal play aimed at the goal. Outsiders can also organise. The perturbed policy may take organising actions that move the world to states with higher compliance for rival coalitions, and such deviations are penalised by their divergence from baseline formation behaviour.

---

## Vulnerability

<div>
$$I^\lambda_h(s) = \log_2 \sum_{g \in \mathcal{G}_h} C^\lambda_{\{h\}}(s,g)^{\zeta} \; , \qquad C^\lambda_{\{h\}}(s,g) = \min_{\pi_{-h}} \Big[\, C_{\{h\}}(s,g \mid \pi_{-h}) + \lambda, D_s(\pi_{-h}) \, \Big]$$
</div>

<ul>
<li class="fragment"><strong>Vulnerability</strong> $V_h = I_h - I^{\lambda}_h$ is how much of $h$'s power can be withdrawn by others. High $I_h$ with high $V_h$ identifies a human whose options run through a gatekeeper.</li>
<li class="fragment">It has a closed form of the same kind as H&P's levels, so it is one more level of their hierarchy, with one more parameter.</li>
</ul>

Note:
The short version of three slides that are in the bonus section.

Fragment 1. The limit that anchors the construction in cooperative game theory. When lambda goes to zero the penalty vanishes, and the optimal-play version is the maximum over the coalition's policy of the minimum over the outsiders' policy of the attainment probability. That is the alpha-characteristic function of Aumann and Peleg, what a coalition can guarantee when it commits first and the outsiders respond as harmfully as they can. Here it does not matter who commits first, since the coalition against the outsiders is a finite zero-sum game, which has a value. Without discounting, the goals with guarantee one are the ones the coalition can force, which is the effectivity function of Moulin and Peleg. With discounting the guarantee is graded by probability and delay.

Fragment 2. Vulnerability is solo power minus the same power computed under adverse outsiders. A human whose only route to every goal passes through a door that one other agent controls has full solo power under the baseline, where the door is open on average, and low power under adverse outsiders, where it closes. Neither number alone identifies the situation. Together they do. Non-domination in Pettit's sense is the requirement that vulnerability be small, and it is the quantity the gradual-disempowerment concern needs.

Fragment 3. How it is computed. At each state the adversarial outsiders' choice has a closed form, the Gibbs variational formula. The worst-case outsiders are the modelled ones reweighted towards the actions that hurt the coalition, and the value is a log-sum-exp with one parameter, the same form as H&P's aggregate power. So it is one more level of their hierarchy, computed by backward induction, and the adversary can move at most one over lambda bits away from modelled behaviour. Lambda and H&P's risk parameter rho act on different random variables, so neither double counts the other.

---

## Takeaways

<ul>
<li class="fragment">How a measure of "power" is defined has consequences for AI maximising its value. Existing measures score the power of one human against strangers.</li>
<li class="fragment">H&P's framework could measure collective power by including scripts and compliance in the behaviour model and organisation in the world model.</li>
<li class="fragment">Two additions for diagnosis: who holds the collective capability ($\hat I_h$, from Shapley shares $\varphi^g_h$ of $v^g_s(K) = C_K^\zeta$), and what can be withdrawn by others ($V_h = I_h - I^\lambda_h$, from $C^\lambda_K$).</li>
<li class="fragment">Next steps: fit scripts and compliance from group data in simulation (e.g. Concordia, Melting Pot).</li>
</ul>

Note:
Four sentences to leave with. First, the measure is not a detail, since the same word, empowerment, names quantities that reward opposite behaviour when maximised, and even the one that survives scores one human against goal-averaged strangers. Second, collective power can be measured without a new metric, because once the behaviour model has coalition scripts with state-dependent compliance and the world model represents organisation, Heitzig and Potham's own individual, aggregate and long-term power count coalition-mediated capability. Third, two additions serve diagnosis rather than the objective. A cooperative game per state and goal, whose Shapley-type value says who holds the collective capability and whose dividends separate synergy from interference. A capability under adverse outsiders, with one parameter in H&P's own family, whose zero limit is the guarantee cooperative game theory already uses, and which yields vulnerability, the part of a human's power that others can withdraw. Fourth, the next step is empirical. Scripts and compliance are the only new things to estimate, and they are fitted from group behaviour as a mixture with a hidden variable. First in simulation, where we know the scripts and compliance we programmed and can check the fit recovers them, then in a small human-subject volunteer's dilemma with and without a rota. The failure modes and their guards are where I would like to be judged, and the framework can be wrong, since a value fitted in one environment has to predict interventions in another.

---

<!-- .slide: class="closing-slide" data-background-color="#0d0d0d" -->
# Thank you. Questions?
<div class="closing-name">Jaime Ruiz Serra</div>
<div class="closing-mentors">Mentored by Jobst Heitzig and Tomáš Gavenčiak</div>

<div class="closing-date">PIBBSS Fellowship Project<br>Jun–Aug 2026</div>

---

<!-- .slide: class="separator-slide" data-background-color="#0d0d0d" -->
## Bonus slides
<div style="font-size: 0.6em; margin-top: 28px; opacity: 0.75; max-width: 900px;" class=libertinus-serif-regular-italic>Detail for questions</div>

---

## Every quantity, and what it requires

<table class="sep-table obj-table" style="font-size: 0.56em;">
<tr><th>quantity</th><th>role</th><th>requires</th></tr>
<tr><td>world model: $\mathcal{S}$, $\mathcal{S}^\top$, $P(s' \mid s, a)$, with membership, mandates, signals and enforcement as features</td><td>needed to act</td><td>learned or specified dynamics in which organisation is represented in states and kernel, and organising actions are ordinary actions</td></tr>
<tr><td>goal sets $\mathcal{G}_h$, and $G_K$ for coalitions</td><td>needed to act (design)</td><td>supplied, with coverage; or canonical goals (App. E.2), which need no goal set</td></tr>
<tr><td>own-goal play $\pi^\beta_h$: $\beta_h$, $Q_h$, beliefs about others $\mu_{-h}$</td><td>needed to act</td><td>fitted from individual behaviour, as in H&P</td></tr>
<tr><td>scripts $\pi^0_K(\cdot \mid s)$</td><td>needed to act</td><td>fitted from group data, held near-deterministic; or elicited from language-model agents in organised roles</td></tr>
<tr><td>compliance $m_{s,h}(K)$</td><td>needed to act</td><td>softmax over feasible coalitions on state features, fitted by EM from group data; identified only where script and own goal disagree; not estimable from single-agent data</td></tr>
<tr><td>$C_h$, $I_h$, $P$, $T$, $L$, $Q_r$, $\pi_r$</td><td>the objective</td><td>computed from the rows above; design parameters $\gamma_h, \zeta, \psi, \eta, \gamma_r, \rho, \beta_r$ and the defunct rate $\delta$</td></tr>
<tr><td>$C_K(s, g^{\mathrm{tgt}} \mid \mathbf{g})$ and the envelope $C^\ast_K$</td><td>diagnostic</td><td>rollouts of the fitted model; planning in the world model for $C^\ast_K$</td></tr>
<tr><td>value of a signal, value of enforcement, free-riding loss</td><td>diagnostic</td><td>differences of $C_K$ or $C_h$ across two states, kernels or goal profiles the world model contains</td></tr>
<tr><td>$v^g_s(K)$, shares $\varphi^g_h$, attributed power $\hat I_h$, dividends $d(K)$</td><td>diagnostic</td><td>$C_K$ on the support of $m$; weights uniform (Shapley) or from $m$ over coalition structures; orders sampled</td></tr>
<tr><td>$C^\lambda_K$, $C^{\ast\lambda}_K$, vulnerability $V_h$</td><td>diagnostic</td><td>the baseline $\bar\pi_{-K}$ from the behaviour model; design parameter $\lambda$; backward induction with the Gibbs formula</td></tr>
<tr><td>indispensability, domination, reversibility</td><td>proposed constraints on the robot (sketched)</td><td>H&P's defunct counterfactual; the $\lambda$-operator applied to $\pi_r$ alone; $\lambda \to 0$ over the pause and stop states</td></tr>
</table>

Note:
A reference slide, for me as much as for the audience. The first six rows are what the robot must have to act at all. Five of them are H&P's own requirements. The world model, the goal sets, and the individual behaviour model with its rationality, action values and beliefs about others. Stage 3 adds two things to the behaviour model, scripts and compliance, and asks the world model to represent organisation. Everything in those rows is fitted or specified before the robot runs, and the objective in row six is computed from them with design parameters that H&P's axioms leave free.

The remaining five rows are computed after the fact from the same fitted model, and none of them enters long-term power or the robot's policy. Coalitional capability and its envelope are rollouts and plans. The three values are differences between two evaluations of the model. The cooperative game, its shares, attributed power and dividends are computed from coalitional capability on the coalitions that carry compliance, with orders sampled when there are many players. The adverse-outsiders capabilities and vulnerability need the baseline outsider behaviour, which the behaviour model already provides, and one design parameter, lambda. The last row is different in kind. The three instruments are proposed constraints on the robot, sketched rather than settled, and if adopted they would bind the objective rather than merely describe it.

Two things the table makes visible. First, the only new estimation burden is compliance and scripts, and compliance needs group data with states where the script and self-interest disagree, which is a statement about what a deployment must log. Second, every diagnostic is downstream of the world model, which is why the validation test is decisive. If differences fitted in one environment do not predict interventions in another, the diagnostic rows are demoted to description and the first six rows stand as they are.

---

## Next steps

<ul style="font-size: 0.94em;">
<li class="fragment"><strong>Fit scripts and compliance from group data.</strong> We observe joint actions, but not which rule produced each one. Behaviour model as a mixture with a hidden variable.</li>
<li class="fragment"><strong>Compliance is a small model on state features</strong> (membership, an active mandate, enforcement, cost of compliance). It shows only where following the script is costly, so the data must contain such situations.</li>
<li class="fragment"><strong>Start in simulation</strong>, where the true scripts and compliance are known: language-model agents in organised roles (Concordia) or multi-agent RL (Melting Pot). Check that the fit recovers them.</li>
<li class="fragment"><strong>Then a small human-subject game</strong> (oTree): a volunteer's dilemma with and without a rota. Check that provision falls with group size, and that the measured value of the rota matches the model's.</li>
</ul>

Note:
What I would do next, in order. Stage 3 adds two things to what has to be estimated, scripts and compliance, and everything else in the behaviour model is fitted as in H&P.

Fragment 1. We observe what people do together, but never which rule produced each action, a coalition's script or the person's own goal. So the behaviour model is a mixture with a hidden variable, and it is fitted the way any mixture is. The E-step computes, for each observed action, the probability that each rule produced it. The M-step updates the compliance model and the scripts. Goals are unobserved too, as in H&P's own estimation of the rationality parameter, so the own-goal part is averaged over the goal set.

Fragment 2. Compliance is parametrised as a softmax over the coalitions available to a person, with logits from a few state features, whether they are a member, whether a mandate is active, whether enforcement is present, and how costly compliance is in that state. Two practical points. Where the script and self-interest prescribe the same action, compliance cannot be told from convenience, so the identifying data are situations where following the script costs something. And the identifying signal is a correlated departure from what each person would do alone, which single-agent data cannot show. That says what a deployment would need to log. Scripts are held near-deterministic, as conventions are, which stops a low compliance with an exact script from fitting as well as a high compliance with a noisy one.

Fragment 3. Start in simulation, because there the ground truth is known. Concordia gives language-model agents in social simulations, and H&P observe that such models encode social norms, so they can play organised roles, a rota, a union, a committee. Melting Pot gives multi-agent reinforcement learning with social dilemmas. In both we program the scripts and the compliance, generate group behaviour, fit the model, and check that it recovers what we put in.

Fragment 4. Then a small human-subject experiment on oTree, a platform for economics games. A volunteer's dilemma, where one contribution is needed and everyone would rather someone else made it, played with and without a rota. Two checks. Provision should fall as the group grows, which is Diekmann's result and the framework's first prediction. And the value the model assigns to the rota, the difference in coalitional capability with and without it, should match the measured change in provision. If asked what would count against the framework. The harder test, later, is to fit the model in one environment and predict the effect of installing a feature in another. If those predictions fail, the diagnostics describe the fitted model and nothing more, whilst the objective and the modelling requirement stand.

---

## Failure modes and guards against them

<table class="sep-table obj-table" style="font-size: 0.72em;">
<tr><th>failure</th><th>guard</th></tr>
<tr class="fragment"><td>joint goals missing from the goal sets</td><td>coalition goal sets, with H&P's canonical goals as a check</td></tr>
<tr class="fragment"><td>robot makes people depend on options, then withdraws them</td><td>constrain the robot's domination, and require that humans keep guaranteed capability when it is paused or stopped</td></tr>
<tr class="fragment"><td>a robot backstop that people come to rely on, and that then fails</td><td>H&P's defunct rate $\delta$. Prediction: above a threshold the robot builds the human script instead</td></tr>
<tr class="fragment"><td>the robot steers people through the signals it publishes</td><td>a signal is honest if the beliefs it induces stay correct once everyone acts on them. Otherwise it is manipulation</td></tr>
<tr class="fragment"><td>predatory coordination: a coalition that gains by lowering outsiders' guarantees</td><td>open, with a candidate test</td></tr>
</table>

Note:
The contribution I want to be judged on is not the definition but its robustness. This is the short list. The full lists, for the measure and for the robot that uses it, are in the bonus section, with the three instruments on the robot and the estimation.

One. Joint goals missing from the goal sets, which is the divide-and-rule case and the collective form of the misspecified goal set from section I. The guard is coalition goal sets built as common goals or conjunctions of members' goals, with H&P's canonical goals as a check that does not depend on any goal set.

Two. The robot can become the gatekeeper, by providing options, making people depend on them, and then withdrawing them. Three instruments address this. Indispensability is the robot's share of collective capability, not capped. Domination is the humans' loss when the robot is the only adversary, to be constrained. Reversibility is the humans' guaranteed capability over the states where the robot is paused or stopped, to be required, which is H&P's Proposition 10. The principle is that usefulness is not penalised, whereas the ability to withdraw it without recourse is.

Three. A robot backstop, "I contribute if nobody does", restores provision in the volunteer's dilemma. But humans learn that the robot will act, compliance with the human contribution script falls, and provision collapses in the futures where the robot is gone. H&P let the robot's world model include a rate delta at which it becomes permanently defunct, so long-term power weighs those futures. The prediction is a threshold in delta above which the robot installs a rotation script instead of acting as the backstop. A robot that takes its own failure seriously builds institutions rather than dependence.

Four. Mediation against manipulation. A signal the robot publishes is honest if the beliefs it induces remain correct once everyone acts on them, in which case it is a correlated-equilibrium device. A signal whose induced beliefs are false after publication is manipulation. More generally the robot's interventions change compliance, signals and scripts, so evaluations are reported at performatively stable points, where the model stays correct after the robot acts on it.

Five. Predatory coordination. Raising compliance for a coalition whose capability comes from lowering outsiders' guaranteed capability passes aggregate power's soft minimum when the harm is spread thinly. This one is open. The candidate test recomputes the coalition's dividends with the outsiders' capability under adverse outsiders held at its pre-coalition values. A dividend that disappears is predatory.

---


## Power held at someone else's discretion

<ul>
<li class="fragment">A gatekeeper lets $h$ through with probability $p$, so $C_h(s, g) = p$.</li>
<li class="fragment">H&P's $\zeta > 1$ discounts unreliable capability, and does not distinguish between risky capability and gatekept capability.</li>
<li class="fragment">Being able to act only as long as another allows it is <strong>domination</strong> (Pettit, 1997).</li>
<li class="fragment">Cooperative game theory has the opposite notion, namely what a coalition can <strong>guarantee</strong> whatever the others do.</li>
<li class="fragment"><strong>Next:</strong> evaluate capability against outsiders who act adversely, with a parameter $\lambda$ for how far they may depart from our model of them. The guarantee is at $\lambda \to 0$, where the gap from $I_h$ is the power held at others' discretion.</li>
</ul>

Note:
Desiderata four and five. The motivating case is a gatekeeper.

Fragments 1 and 2. If one agent lets the human through with probability p, capability is p. H&P's exponent above one discounts unreliable capability, but capability that exists only because another agent chooses to allow it is not distinguished from capability that is merely risky.

Fragment 3. Republican political theory calls this domination, in Pettit's sense, meaning being able to do something only as long as someone else permits it. It is the gradual-disempowerment concern from the motivation, in one person.

Fragment 4. Cooperative game theory has standard objects for the opposite. Start from a game in which a coalition gets some payoff. The alpha-characteristic function gives the coalition's guarantee, meaning it commits to a joint strategy first and the outsiders then respond as harmfully as they can. The beta-characteristic function gives the amount the coalition cannot be prevented from getting, meaning the outsiders commit first and the coalition responds. Alpha is never more than beta, and they coincide when the two-sided game has a value. An effectivity function records, for each coalition, the sets of outcomes it can force whatever the others do. These objects are binary, one-shot, and assume the coalition plays optimally. Ours is graded, since it is a probability, dynamic, since it is a discounted recursion, and it comes in two forms, one with the coalition playing optimally and one with it behaving as it actually does.

Fragment 5. The hand-over. The next slide defines that quantity. Outsiders are allowed to act against the coalition, but every bit by which they depart from our model of them costs a parameter lambda. With lambda large we get the ordinary evaluation back. With lambda near zero we get the guarantee. The difference between ordinary power and the guaranteed version is vulnerability, the part of a human's power that others can withdraw, which is the number this slide asked for.

---

## Aggregation in H&P

<table class="power-table">
  <!-- Level 3: Present Aggregate Power -->
  <tr class="fragment" data-fragment-index="2">
    <td><div class="power-block bg-p"><strong>Present Aggregate Power</strong><br>$P(s)$</div></td>
    <td class="eq-cell">$$P(s) = -\log_2 \sum_{h \in \mathcal{H}} 2^{-\psi I_h(s)}$$</td>
  </tr>

  <!-- Transition 2->3 -->
  <tr class="arrow-row fragment" data-fragment-index="2">
    <td>
      <div class="arrow-container">
        <span class="arrow-symbol">↑</span>
        <span class="arrow-text">Social Aggr. ($\psi > 0$)</span>
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

:::aside
Heitzig and Potham (arXiv:2608.08240)
:::

Note:
Bottom row. Goal-attainment capability is the discounted probability that pursuit of g reaches it before a terminal failure state, a truncated Bellman recursion, and it is their Equation (1) verbatim. Middle row. Individual power aggregates the capabilities over the candidate family with an exponent ζ. Their reliability axiom forces ζ above 1. We allow ζ at least 1, and paper 2 argues for ζ = 1, since peaked aggregation produces a failure of its own. Top row. The social aggregation over humans is theirs. Our single-human results do not use it, and stage 3 leaves the whole hierarchy unchanged and changes the model beneath it.

---

## Backup: both converses fail

<div style="display: flex; gap: 48px; align-items: flex-start;">
<div style="flex: 1;">
<strong>Capacity without revelation</strong>
<table class="sep-table">
<tr><th>robot policy</th><th>$C_h$</th><th>$\mathrm{Rev}(s)$</th><th>$\mathfrak{E}(s)$</th></tr>
<tr><td>toggle board</td><td>all 0</td><td>0</td><td>9 bits</td></tr>
<tr><td>assistance</td><td>all 1</td><td>2 bits</td><td>3.70 bits</td></tr>
</table>
<p style="font-size: 0.8em;">Capacity prefers the board, by a margin unbounded in the number of toggles and in the horizon.</p>
</div>
<div style="flex: 1;" class="fragment">
<strong>Revelation without attainment</strong>
<table class="sep-table">
<tr><th>interface</th><th>$C_h$</th><th>$B(s)$</th><th>$\mathrm{Rev}(s)$</th></tr>
<tr><td>aligned</td><td>(0.9, 0.9)</td><td>0.531</td><td>0.9 bits</td></tr>
<tr><td>scrambled</td><td>(0, 0)</td><td>0</td><td>0.9 bits</td></tr>
</table>
<p style="font-size: 0.8em;">Relabelling goals against outcomes leaves $\mathbb{I}(G;\xi \mid s)$ unchanged and zeroes every capability.</p>
</div>
</div>

<div class="fragment" style="margin-top: 24px;">
Each rung can be large while the one below it is zero. Positive guarantees come only from the attainment end of the chain.
</div>

Note:
**Left table, capacity without revelation.** A deterministic environment with four first-outcome goals and horizon three. The robot has two policies. Under the toggle board, the human controls seven free binary toggles and every goal transition is blocked. Under assistance, the goal transitions respond and the toggles are frozen. The board gives 3 times log2 8, so 9 bits of capacity. Assistance gives log2 13, about 3.7 bits. So capacity prefers the board by about 5.3 bits. Under the board, revelation is zero and every capability is zero, since the human cannot reach any goal and the trajectory carries nothing about which goal they hold. The margin grows without bound in the number of toggles and in the horizon. Human goals are few and coarse relative to the environments that realise them, so this is the generic situation rather than a corner case.

**Fragment 1, right table, revelation without attainment.** Two goals. The aligned interface realises the pursued goal with probability 0.9 and otherwise ends in a goal-independent failure. Now rewire the interface so that pursuing goal 1 delivers what pursuing goal 2 would have delivered, and vice versa. Revelation is a functional of the family of goal-conditioned trajectory laws and does not depend on which law is paired with which goal, so it stays at 0.9 bits. Attainment is a property of the pairing, so every capability drops to zero and the floor drops with it. This is also why skill-discovery objectives cannot be pointed at a human's goals as they stand. For a self-assigned latent the relabelling is a symmetry. For someone else's goal it is a failure.

**Fragment 2, the takeaway.** Each quantity can be large while the one below it stays at zero. No function of revelation, or of anything invariant to relabelling, bounds capability from below. The guarantee runs from attainment upward only.

**If asked about interface optimisation (Reddy et al., First Contact).** Their observation that permuting the keyboard leaves the objective unchanged is a one-step empirical instance of the right table.

---

## Backup: a floor on retained power, from logs

<div>
For any family of goals, overlapping or not, revelation is at least the binary relative entropy between the hit rate under pursuit and the hit rate by chance:
$$\mathrm{Rev}(s) \;\ge\; d\!\left(\bar P(s) \,\middle\|\, \bar K(s)/N\right), \qquad \bar P \text{ efficacy},\quad \bar K \text{ specificity}$$
</div>

<div class="fragment" style="margin-top: 12px;">
Both are means of per-window statistics that interaction logs record: which goal was pursued, and which goals the trajectory satisfied.
</div>

<div class="fragment" style="margin-top: 12px;">
A quantitative measure of gradual disempowerment. A monitor rather than a training signal, since a system rewarded on its own measurement corrupts the measurement.
</div>

Note:
This is the result that answers the motivation's "detect it before it is irreversible". The Fano floor of the chain needs disjoint goals and counterfactual capabilities that no log can estimate. This second floor reads the trajectory through one bit, whether it satisfied the goal pursued, and depends on the interaction only through two statistics. Efficacy is the rate at which pursuit satisfies its goal. Specificity is the expected number of goals a trajectory satisfies, intended or not, so specificity over N is the hit rate by chance. Revelation is at least the binary relative entropy between those two rates.

Fragment 1. Both statistics are means of bounded per-window quantities that logs record, given per-goal satisfaction labels and the pursued goal per window, so finite-log estimates concentrate at standard rates. That gives a computable lower bound on the goal revelation that the users of a deployed system retain.

Fragment 2. It is a monitor and must stay out of the reward. A robot rewarded on its own measurement acquires incentives on the goal distribution, on the labels, and on the logging it mediates. The estimate is only as good as the labels and is relative to the family and the window segmentation.

Two further results from the paper, if asked. First, why revelation falls short of its ceiling. Through the behaviour class a goal induces, the equivocation splits into aliasing, distinct goals inducing the same behaviour, and ambiguity, distinct behaviours producing indistinguishable trajectories, so revelation is capped by the entropy of behaviours rather than of goals. Second, in random bandits over fifty thousand states the chain holds everywhere, the three scores correlate with Kendall tau between 0.58 and 0.75, yet they agree on the best state only about half the time, so they are not interchangeable even where nothing is scrambled.

---

## Desiderata for a collective power measure

Ideally, our model would:
<ol>
<li class="fragment">Reduce to H&P's model when no coalition is organised.</li>
<li class="fragment">Discern institutionally-driven coordination from coincidence.</li>
<li class="fragment">Account for free riding and the repercussions of enforcement changes.</li>
<li class="fragment">Remain valid when coalition outsiders do not behave as modelled.</li>
<li class="fragment">Detect when a human's options can be limited by another agent ("power over").</li>
<li class="fragment">Attribute collective capability to members without double counting.</li>
</ol>

Note:
Before any definitions, the requirements, so that each construction can be judged against something. Each one answers a failure of the individual measure, and each one has a specific mechanism later in the talk.

One, reduction. Switch organisation off and every quantity must return to Heitzig and Potham's. This is the reduction theorem, stated and not yet proved.

Two, institutions against coincidence. The measure must change when a rota, a signal or an enforcement device is present and coordination becomes secured rather than lucky. This is met by recording organisation in the state and in the behaviour model, so that the value of a feature is a comparison between two states.

Three, compliance. Members may not follow the script, and enforcement may or may not fix that. Free riding is expressed by goal sets, and enforcement is a feature of the transition kernel.

Four, robustness to outsiders. The baseline behaviour of outsiders is a model and may be wrong, so the framework defines capability under adverse outsiders, with one parameter, lambda, whose zero limit is the guarantee of cooperative game theory.

Five, domination. A human whose options can be withdrawn must be identified as such even when their solo power is full. This is vulnerability, from the same construction.

Six, attribution. What a coalition can do has to be credited to members in a way that adds up. This is a Shapley-type value.

Two constraints apply to all six. Stay goal-agnostic, so there are no beliefs about which goal anyone actually holds. Keep the metric hierarchy, which the next slide sharpens into a claim.

---

## Coalitional capability

<div>
H&P's capability recursion, with a coalition $K$ in place of a human:
$$C_K(s, g^{\mathrm{tgt}} \mid \mathbf{g}) = \mathbf{1}(s \in g^{\mathrm{tgt}}) + \mathbf{1}(s \notin g^{\mathrm{tgt}} \cup \mathcal{S}^\top)\,\gamma_K\,\mathbb{E}_{s'}\big[C_K(s', g^{\mathrm{tgt}} \mid \mathbf{g})\big]$$
</div>

<ul style="margin-top: 12px;">
<li class="fragment"><strong>Target</strong> $g^{\mathrm{tgt}}$: goal being scored.</li>
<li class="fragment"><strong>Goal profile</strong> $\mathbf{g} = (g_h)_{h \in K}$: each member's actual goal, conditioning their policy.</li>
<li class="fragment">Outsiders are goal-averaged. $K = \{h\}$ returns $C_h$.</li>
</ul>

Note:
The one new measurement. It is the discounted probability that a target is reached when the members of a coalition pursue their goals, and it is Heitzig and Potham's recursion with a coalition in place of the human. The expectation is over the next state under the kernel, the joint behaviour of all the humans and the robot's policy. The discount is the smallest discount among the members, which is a convention and one of our open points.

Fragment 1. The target is the set of states whose attainment is scored.

Fragment 2. The goal profile says what each member wants, one goal per member. It conditions only the own-goal part of each member's behaviour. Keeping the target separate from what members want lets the same recursion score free riding, a few slides on, where the target is the public good and each member also wants to shirk.

Fragment 3. Everything else runs as it is in the state. Members follow scripts at their compliance rates, outsiders are averaged over their goals as in H&P, and the robot plays its policy. A single human, with the target equal to their goal, gives back H&P's individual capability. Their six axioms hold with a coalition in place of the human, so their Proposition 1 yields this form, since nothing in the derivation needs the unit to be one person. If asked how a goal enters a coalition when scripts read no goal. It enters through the members' own-goal play, which selects the organising actions, voting, proposing, leading, that set the mandate the script then executes. A coalition whose members comply fully and have no way to steer attains only what its script reaches, whatever goal we ask about, which is the coalition analogue of a case H&P discuss in their Appendix C.

---

## A coalition does best when the goal is shared

<ul>
<li class="fragment"><strong>Shared-goal capability</strong> $C_K(s,g)$: every member wants $g$, and $g$ is the target.</li>
<li class="fragment"><strong>Envelope</strong> $C^\ast_K(s,g)$: as above, but with $K$'s joint action chosen by planning. Bounds what $K$ could attain with perfect coordination and full compliance.</li>
<li class="fragment">Measurements for analysis, not for the robot's objective.</li>
</ul>

Note:
Two readings of the general definition that the rest of the talk uses.

Fragment 1. Shared-goal capability gives every member the same goal and scores that goal. Written with one goal argument, it is the quantity that feeds attribution later. Coalition power is the usual log-sum of these over a coalition goal set, which can be goals the members hold in common, conjunctions of members' goals, or H&P's canonical goals where the way goals are sliced is contestable. The goal set has to cover the state space, as for individuals.

Fragment 2. The envelope replaces the coalition's behaviour with the best joint plan in the world model, with outsiders still goal-averaged. It is an upper bound, namely what the coalition could do if coordination and compliance were perfect.

Fragment 3. Neither quantity enters long-term power or the robot's policy. The objective is H&P's, unchanged. These are instruments for diagnosis and attribution.

---

## The envelope is a benchmark. A script is a description

<div>
$C^\ast_K(s,g)$ replaces everything $K$ does with the joint plan that best attains $g$. It says what $K$ could do, where the script says what $K$ does.
</div>

<table class="sep-table obj-table" style="font-size: 0.78em; margin-top: 10px;">
<tr><th></th><th>script $\pi^0_{K \to h}$</th><th>plan inside $C^\ast_K$</th></tr>
<tr class="fragment"><td>where it comes from</td><td>estimated from what the group does</td><td>computed by planning</td></tr>
<tr class="fragment"><td>what it reads</td><td>the state, and no goal</td><td>chosen for the target $g$</td></tr>
<tr class="fragment"><td>who follows it</td><td>each member, with probability $m_{s,h}(K)$</td><td>every member, always</td></tr>
<tr class="fragment"><td>coordination</td><td>only through shared state features</td><td>central, so no signal is needed</td></tr>
</table>

<div class="fragment" style="margin-top: 12px;">
So $C^\ast_K \ge C_K$, with equality only when the script is the best plan for $g$ and everyone complies.
</div>

<div class="fragment" style="margin-top: 10px;">
The gap $C^\ast_K - C_K$ has four sources, namely missing coordination devices, a script that is not the best plan for $g$, compliance below one, and noise in own-goal play.
</div>

Note:
The envelope and the script are different kinds of object, and the difference is worth a slide because the next few diagnostics are distances from the envelope. A script is part of the model of what the coalition does. The plan inside the envelope is a benchmark for what it could do at best.

Fragment 1. A script is estimated from how the group behaves. The plan is computed, as a maximum over the coalition's joint policies, by backward induction in the world model.

Fragment 2. A script reads the state and no goal, so it is the same whatever target we ask about. The plan is chosen for the target, so there is a different plan for every target.

Fragment 3. A script is followed by each member with their compliance probability, and otherwise the member acts on their own goal, with Boltzmann noise. The plan is followed by every member with certainty.

Fragment 4. Under scripts, members coordinate only through features of the state that they both read, since their behaviour is independent given the state. The plan chooses the coalition's joint action centrally, so it needs no signal. The turn example on the slide after next shows it. Exactly one of two members must act. With no turn indicator in the state, independent play succeeds with probability at most one half. The envelope is still one, because the planner picks "A acts, B does not". Install the indicator, give the script "act if and only if it is your turn", and with full compliance capability rises to one and meets the envelope.

Fragment 5. So the envelope is an upper bound, and the two coincide for a target only when the script happens to be the best joint plan for that target and every member complies with probability one.

Fragment 6. The gap therefore bundles four shortfalls. Missing coordination devices. A script that is not the best plan for this target. Compliance below one. Noise in own-goal play. When we want coordination alone, the clean measure is the value of a signal, capability with the feature minus capability without it, since that comparison holds everything else fixed. Two further remarks. Scripts enter the behaviour model and therefore the objective, since individual, aggregate and long-term power are computed under them, whereas the envelope is a measurement and never enters the objective. The same maximisation over the coalition's policy reappears later in the adverse-outsiders quantity with a star, where the coalition plans optimally against hostile outsiders.

---

## Every comparison is between two models the robot already holds

<div>
The diagnostics that follow are differences in capability between:
</div>

<ul style="margin-top: 10px;">
<li class="fragment">a state with a signal, and the same state without it,</li>
<li class="fragment">a kernel with enforcement, and the same kernel without it,</li>
<li class="fragment">compliance at its estimated value, and compliance at zero,</li>
<li class="fragment">one goal profile, and another.</li>
</ul>

<div class="fragment" style="margin-top: 12px;">
No family of hypothetical policies is imposed on top of the behaviour model.
</div>

Note:
A point of method before the diagnostics. Every comparison in what follows is between two things the robot's world model already contains. A state with a signal feature and the same state without it. A kernel with an enforcement feature and the kernel without it. Compliance at its estimated value and at zero. One goal profile and another.

Last fragment. At mid-program I compared families of hypothetical policies, for instance independent play against correlated play. Those families were imposed from outside and were somewhat arbitrary. Here nothing is imposed on top of the behaviour model, so each diagnostic is the difference between two evaluations of the same model.

---

## Coordination failure, and the value of a signal

<div>
Members coordinate only through state features they both read, such as a rota, a leader or a turn indicator.
</div>

<table class="sep-table fragment" style="margin-top: 12px;">
<tr><th>exactly one of two must act</th><th>P(success)</th></tr>
<tr><td>independent play, each acts with probability $p$</td><td>$2p(1-p) \le 1/2$</td></tr>
<tr><td>turn indicator in the state, both read it</td><td>$1$</td></tr>
</table>

<ul style="margin-top: 12px;">
<li class="fragment"><strong>Shortfall from the envelope</strong> $= C^\ast_K - C_K$. In this example all of it is coordination failure.</li>
<li class="fragment"><strong>Value of a signal</strong> $= C_K$ with it $-$ $C_K$ without it.</li>
</ul>

Note:
How a coalition coordinates, and how far it falls short. Members' behaviour is independent given the state, so any correlation between their actions comes from scripts that read the same feature of the state, a convention, a designated leader, an announcement, a rota. This is correlated play through a public signal, in Aumann's sense. There is no telepathy in the model, and that is a structural property rather than an assumption about people.

Fragment 1. The smallest example. Two humans, and exactly one of them must act, say to avoid a collision or to avoid duplicating a task. If each acts independently with probability p, success has probability 2p(1-p), which is at most one half. With a turn indicator in the state that both scripts read, success is certain.

Fragment 2. The envelope here is one in both rows, since a planner simply has one member act. So the shortfall from the envelope is one minus 2p(1-p) without the indicator and zero with it. In this example compliance is full and the script is the best plan once the indicator exists, so the whole shortfall is coordination failure. In general the shortfall also contains imperfect compliance and an imperfect script, as the envelope slide said.

Fragment 3. The value of a signal is the difference in coalitional capability between the state with the feature and the state without it. This is how the measure tells an institution from a coincidence, which was the second desideratum.

---

## Free riding

<div>
The target is a clean kitchen, $g^{\mathrm{pub}}$. Each member would also like not to be the one who cleaned, $g^{\mathrm{keep}}_h$.
</div>

<ul style="margin-top: 12px;">
<li class="fragment">If every member wants both, cleaning defeats the cleaner's own goal, so everyone waits for someone else. Provision falls as the group grows (the volunteer's dilemma).</li>
<li class="fragment"><strong>Free-riding loss</strong>: what $K$ provides when members want only a clean kitchen, minus what it provides when each also wants to shirk,
$$C_K(s, g^{\mathrm{pub}} \mid g^K) \;-\; C_K\big(s, g^{\mathrm{pub}} \mid (g^{\mathrm{pub}} \cap g^{\mathrm{keep}}_h)_{h \in K}\big)$$</li>
<li class="fragment">The script is the other channel. With probability $m_{s,h}(K)$ a member cleans anyway, which is why scripts read no goal.</li>
</ul>

Note:
Free riding needs a conflict between a member's private interest and the coalition's aim, and the two goal arguments of coalitional capability express it. The target is that the kitchen is clean. Each member's private component is that they did not clean.

Fragment 1. Give every member the goal that the kitchen is clean and that they did not clean it. Cleaning makes the private component false, so its action value is zero, whilst napping is worth the probability, under the member's model of the others, that somebody else cleans. So the own-goal play naps, every member reasons the same way, and provision is the mixed equilibrium of the volunteer's dilemma, which falls with the group size, as Diekmann showed. The coalition's capability for the conjunction of all those goals is zero, since someone must clean, and that zero says the members' wants are jointly infeasible, which is the dilemma. Realised provision under goal-averaged behaviour is H&P's individual capability for the public good.

Fragment 2. The free-riding loss is the coalition's provision when members want only the target, minus its provision when each also wants to shirk. It is a comparison between two goal profiles, as the previous slide said.

Fragment 3. The script is the second channel. With the compliance probability the member cleans regardless of wanting the nap, and that is the reason scripts read no goal. Enforcement, next, acts on both channels. If asked about intermediate preferences. Goals are sets, so there is no cardinal trade-off between the components of a goal. A member who would rather nap but would clean if nobody else did is not a single goal. With the conjunction as their goal they never clean, since cleaning fails it, and with the public good alone as their goal they clean when pivotal and are indifferent otherwise. Intermediate preferences are represented only statistically, through a goal set that contains both, which is H&P's design, and the exponent absorbs part of it at the metric level.

---

## Enforcement

<div>
A feature of the transition kernel. Departing from the script leads to states where the deviator's own goals are harder to attain.
</div>

<ul style="margin-top: 12px;">
<li class="fragment">People comply more where deviation is punished, so $m_{s,h}(K)$ rises.</li>
<li class="fragment">Shirking is now worth less to the member's own goal, so own-goal play complies more as well.</li>
<li class="fragment"><strong>Value of enforcement</strong>: the change in $C_h(s, g^{\mathrm{pub}})$ between the two kernels. A sanction can lower capability when it is triggered. Interception cannot.</li>
</ul>

Note:
Enforcement is a feature of the transition kernel rather than of the action sets, which never vary with the state in H&P's framework. With the feature present, departing from the script leads to states where the deviator's own goals are harder to attain. It works through both channels of the behaviour model.

Fragment 1. It raises the probability of acting under the script in the states where it operates, because people comply more where deviation is punished.

Fragment 2. It raises compliance in the own-goal branch too. Napping now leads to states where the member's private component or other goals fail, so the action value of napping falls.

Fragment 3. Its value is a comparison between two kernels, with and without the feature, in individual capability for the public good. Two kinds of feature. A sanction moves a successful deviator to a worse state, and when it is triggered it can lower capability, which is the deadweight loss Fehr and Gächter measured. Interception gives a deviation the compliant action's transition, and it cannot lower capability. Interception at rate one is H&P's action removal for robot commitments.

---

## Commons and robot incentives: nothing new

<div>
<strong>Commons.</strong> Long-term power $L$ already couples everyone's capability through the resource state.
</div>

<div class="fragment" style="margin-top: 12px;">
<strong>Robot.</strong> If organised states have higher $I_h$, then $L$ rewards reaching them. The robot raises compliance, installs signals and supports enforcement without being told to.
</div>

<div class="fragment" style="margin-top: 12px;">
Three instruments, later, bound how it does so.
</div>

Note:
Two things the mid-program design treated as extensions turn out to need nothing. A commons is a resource state that every human's capability depends on, and H&P's long-term power already couples them through it, with the social exponent and the robot's discount. The prediction is a harvest-capacity threshold above which better extraction tools raise every individual power and lower long-term power. A measure that only summed individual powers would recommend the tools.

Fragment 1. The robot's incentive to organise humans is also nothing new. If states in which humans are organised carry higher individual power, long-term power rewards reaching them, and the robot's Boltzmann policy raises the coalition measure, installs signal features and supports enforcement, with no instruction to do any of that. This is the point at which the claim pays off. The objective did not change, and the model now lets it see organisation.

Fragment 2. The same incentive is the safety concern, since a robot that organises humans can also make them depend on it. Three instruments on the robot, later in the section, bound how it may organise them.

---

## Shapley value per human

<div>
<strong>Marginal contribution</strong> of $h$ to $K$: 
$$\;v(K \cup \{h\}) - v(K)$$
</div>

<div class="fragment" style="margin-top: 10px;">
The Shapley value averages it over every order in which the players could be added:
$$\varphi_h = \sum_{K \not\ni h} \frac{|K|!\,(n-|K|-1)!}{n!}\,\big[v(K \cup \{h\}) - v(K)\big]$$
</div>

<ul style="margin-top: 10px;">
<li class="fragment"><strong>Efficiency.</strong> The shares add up to the capability of everyone together.</li>
<li class="fragment"><strong>Null player.</strong> A human whose steering never changes anything gets zero.</li>
<li class="fragment"><strong>Additivity.</strong> Shares can be computed goal by goal and summed.</li>
</ul>

Note:
The marginal contribution of a human to a coalition that does not contain them is how much the coalition's worth rises when they join. In our game this has a specific meaning. While the human is outside the coalition their own-goal play is averaged over goals, like any outsider. Once inside, it is aimed at the goal. So the marginal contribution measures the effect of this human steering with the coalition rather than behaving as a bystander.

Fragment 1. A value is a rule that gives each player a share of the worth. The Shapley value is the average marginal contribution of a player over all the orders in which the players could be added one at a time, each order equally likely.

Fragments 2 to 4. It is the only rule with four properties, and three of them mean something here. Efficiency, the shares sum to the grand coalition's worth, so the capability of everyone together is fully attributed. Null player, a human whose steering never changes any coalition's capability gets zero. Additivity, the value of a sum of games is the sum of the values, which lets us attribute goal by goal. The fourth is symmetry, equal contributions get equal shares. An alternative, the Banzhaf value, weights all coalitions equally instead of all orders. It was designed for voting, where it counts the coalitions in which a player's vote decides the outcome, and it is not efficient in general. A useful check. If attainment is deterministic, so capability is zero or one, the game is a simple game, the Shapley value is the Shapley-Shubik power index and the Banzhaf value is the Banzhaf index. Voting power is the special case of this construction with binary, one-shot attainment.

---

## Which coalitions count: weights from the compliance model

<ul>
<li class="fragment">Organised coalitions should count and unorganised ones should not, so the weights on coalitions come from $m$ rather than being uniform.</li>
<li class="fragment"><strong>Weber's theorem.</strong> The shares add up to the whole if and only if the weights come from a single distribution over orders of the players.</li>
<li class="fragment">That holds when $m$ is a distribution over coalition structures. It can fail when $m$ is defined on subsets only, which is one of our open decisions.</li>
</ul>

Note:
Shapley and Banzhaf are both probabilistic values in Weber's sense, meaning an average of marginal contributions under some probability distribution over the coalitions a player might join.

Fragment 1. The natural distribution for us comes from the compliance model, since coalitions that are organised at this state should count and unorganised ones should not.

Fragment 2. Weber's theorem says that such a value is efficient for every game if and only if all the players' distributions are induced by one probability distribution over orders of the players.

Fragment 3. If compliance is modelled as a distribution over coalition structures, partitions of the humans into blocks, it induces a distribution over orders, by ordering the blocks and then the members within each block, and the value is efficient. If it is defined only on subsets, efficiency can fail. That is why the domain of the compliance model is an open decision with consequences. When the state records a partition into organised blocks, two standard values apply. Aumann and Drèze compute the Shapley value within each block separately, so nothing is credited across blocks. Owen's value has two levels, in which blocks bargain as units for a share of the whole and each block's share is then divided among its members.

---

## Synergy and interference

<div>
The <strong>dividend</strong> of a coalition is the part of its worth that its sub-coalitions do not explain:
$$d(K) = \sum_{T \subseteq K} (-1)^{|K|-|T|}\, v(T)$$
</div>

<ul style="margin-top: 12px;">
<li class="fragment">A positive dividend is synergy, as when two people move a piano. A negative one is interference, as in congestion.</li>
<li class="fragment">The Shapley value splits every dividend equally among the coalition's members.</li>
<li class="fragment">The sum of the negative dividends is the capability lost to conflict within the population.</li>
</ul>

Note:
This answers the question I raised at mid-program, whether a group's power is additive, subadditive or superadditive in its members' powers. The answer is per goal and per coalition. The Möbius dividend of a coalition is the part of its worth not explained by its sub-coalitions. Equivalently, a coalition's worth is the sum of the dividends of all its sub-coalitions. A single human's dividend is their solo worth. A pair's dividend is the pair's worth beyond the sum of its two members. Higher dividends are the new contributions of larger groups.

Fragment 1. Positive dividends are synergy, a piano that needs two people. Negative dividends are interference or congestion, where the coalition attains less than its parts contribute. So a group is superadditive on the goals where its dividends are positive and subadditive where they are negative.

Fragment 2. Harsanyi showed that the Shapley value splits every coalition's dividend equally among its members, which gives the shares a second reading.

Fragment 3. The dividends form a signed measure on coalitions, which splits uniquely into a positive and a negative part, the Jordan decomposition. Each human's share splits the same way, into synergy credited to them and interference charged to them, and the total of the negative part measures how much capability is lost to conflict within the population at this state. Two checks, if asked. A coalition's worth depends on how outsiders are organised, so strictly the game is in partition-function form, and values for such games extend the Shapley axioms. The way goals were sliced can also create dividends artificially, so we compute them once with the modelled goal sets and once with H&P's canonical goals, and the difference measures the artefact.

---

## Reduction to H&P

<div>
If nobody ever acts under a script, $m_{s,h}(\emptyset) = 1$ for every $s$ and $h$, then:
</div>

<ul style="margin-top: 10px;">
<li class="fragment">the behaviour model is H&P's, and $C_K = C_h$ on singletons,</li>
<li class="fragment">every dividend of two or more humans is zero, so $\hat I_h = I_h$,</li>
<li class="fragment">$P$, $T$, $L$ and $\pi_r$ coincide with H&P's.</li>
</ul>

<div class="fragment" style="margin-top: 12px;">
Every quantity we add reduces to one of H&P's, or to zero. Proof pending.
</div>

Note:
The first desideratum, as a theorem. Set own-goal play to probability one for every human at every state, so that nobody complies with any script.

Fragment 1. The realised policy is then the deliberate Boltzmann component alone, which is H&P's individual model, and coalitional capability on singletons is individual capability.

Fragment 2. With no scripts, a coalition has nothing that makes it more than its members, so the game is additive, every dividend of size two or more is zero, and attributed power equals solo power.

Fragment 3. Aggregate power, trajectory power, long-term power and the robot's policy are computed from the same inputs by the same formulas, so they coincide with H&P's. With lambda to infinity as well, the capability under adverse outsiders returns the baseline one.

Fragment 4. So the framework is a strict generalisation. Every H&P model is a special case, and every quantity we add reduces to one of theirs or to zero in that case. The proof is on the list of open items. A remark if asked. The same reduction holds when each human keeps a personal habit, a script for the singleton coalition, which is H&P's habitual component with its weight, so the condition can be weakened to no compliance with any coalition of two or more.

---

## The worst case is one more soft minimum

<div>
At each state the adversarial outsiders' choice has a closed form (the Gibbs variational formula):
$$\text{value} = -\lambda \log_2 \mathbb{E}_{a \sim \bar\pi_{-K}}\, 2^{-W(s,a)/\lambda}, \qquad q^\ast(a) \propto \bar\pi_{-K}(a \mid s)\, 2^{-W(s,a)/\lambda}$$
</div>

<ul style="margin-top: 10px;">
<li class="fragment">The worst-case outsiders are the modelled ones, reweighted towards the actions that hurt $K$.</li>
<li class="fragment">It has the same form as H&P's $P = -\log_2 \sum_h 2^{-\psi I_h}$. One more level of their hierarchy, one more parameter, computed by backward induction.</li>
<li class="fragment">The adversary can move at most $1/\lambda$ bits away from modelled behaviour.</li>
</ul>

Note:
How it is computed, and why it belongs in H&P's hierarchy. Write the penalised objective from a state onward as a value. It is one on the goal, zero on terminal states outside it, and elsewhere the outsiders choose a distribution over their joint action to minimise lambda times its divergence from the baseline, plus the expected continuation value W. W of an action is the discounted expected value from the next state if the outsiders take that action now and play the minimiser afterwards, averaged over the coalition's and the robot's actions and the kernel. A low W is an action that hurts the coalition. The Gibbs variational formula solves that minimisation in closed form. The value is a soft minimum of W under the baseline.

Fragment 1. The minimising policy is the baseline reweighted, an exponential tilt, in which actions with lower continuation value get more probability.

Fragment 2. The expression has the same form as H&P's aggregate power, a log-sum-exp with one parameter. As lambda goes to zero it tends to the minimum of W, and as lambda goes to infinity to the baseline expectation. H&P derive this form at every level from independence, continuity and translation invariance in bits, so this adds one more level, and lambda is a design parameter like zeta, psi, eta and rho. The recursion is closed and computed by backward induction, which is KL-regularised control in Todorov's sense.

Fragment 3. The bound. The baseline itself is a feasible outsider policy with zero penalty, so the minimiser's penalised objective is at most the baseline capability. Capabilities lie between zero and one, so the divergence at the minimiser is at most one over lambda bits. Two further properties, if asked. Boltzmann policies give every action positive probability, so as lambda goes to zero the tilt can approach any policy, and the limit is the true minimum over all outsider policies. Coordinated attacks pay for their coordination. Against a product baseline the per-state penalty is the total correlation of the outsiders' joint action plus each outsider's individual deviation. Against a baseline whose scripts already correlate outsiders, the dependence the scripts produce is not penalised, only dependence beyond it.

---

## With $\lambda \to 0$: what a coalition can guarantee

<div>
$$C^{\ast 0}_K(s,g) = \max_{\pi_K} \min_{\pi_{-K}} C(s, g \mid \pi_K, \pi_{-K})$$
</div>

<ul style="margin-top: 12px;">
<li class="fragment">This is the <strong>$\alpha$-characteristic function</strong> of cooperative game theory, with the probability of attaining $g$ as the payoff.</li>
<li class="fragment">It does not matter who commits first. $K$ against the outsiders is a finite zero-sum game, which has a value.</li>
<li class="fragment">Without discounting, the goals with $C^{\ast 0}_K = 1$ are the ones $K$ can force. With discounting, the guarantee is graded by probability and delay.</li>
<li class="fragment">$C^{0}_K$ is the guarantee for a coalition that keeps its habits rather than playing optimally.</li>
</ul>

Note:
The limit that anchors the construction in cooperative game theory. When lambda goes to zero the penalty vanishes, and the optimal-play version is the maximum over the coalition's policy of the minimum over the outsiders' policy of the attainment probability.

Fragment 1. That is the alpha-characteristic function of Aumann and Peleg, with the discounted probability of attaining the goal as the coalition's payoff. At the other end, lambda to infinity forbids any deviation and returns the baseline quantities.

Fragment 2. In general the alpha value, where the coalition commits first, and the beta value, where the outsiders commit first, differ. Here they coincide. Treat the coalition as one player and the outsiders as another. The coalition's payoff is the attainment probability and the outsiders' is its negative, so the game is zero-sum. At each state, given the continuation values, the stage game is a finite matrix game, which has a value in mixed strategies by von Neumann's minimax theorem, and backward induction through the acyclic state graph composes those stage values into a value for the whole game, which is Shapley's result for stochastic games. Our policies are behavioural, meaning mixed, so max-min equals min-max.

Fragment 3. With the discount at one, the set of goals for which this quantity equals one is the alpha-effectivity function of Moulin and Peleg at that state, the goals the coalition can force with certainty. With a discount below one it grades effectivity by probability and by delay.

Fragment 4. The version without the maximum is the guarantee for a coalition that behaves as it actually does, meaning what it would retain against the worst outsiders without changing its habits. Intermediate lambda restricts outsiders to deviations that are plausible given their modelled behaviour.

---

## Vulnerability: the part of power that others can withdraw

<div>
$$V_h = I_h - I^{\lambda}_h$$
where $I^\lambda_h$ is $I_h$ computed with $C^\lambda_{\{h\}}$.
</div>

<ul style="margin-top: 12px;">
<li class="fragment">High $I_h$ together with high $V_h$ identifies a human whose options run through a gatekeeper.</li>
<li class="fragment">Non-domination, in Pettit's sense, is the requirement that $V_h$ be small.</li>
<li class="fragment">$\lambda$ and H&P's risk parameter $\rho$ act on different random variables, so neither double counts the other.</li>
</ul>

Note:
What the construction is for. Vulnerability is solo power minus the same power computed under adverse outsiders. It is the part of a human's power that exists at others' discretion.

Fragment 1. A human whose only route to every goal passes through a door that one other agent controls has full solo power under the baseline, where the door is open on average, and low power under adverse outsiders, where it closes. Neither number alone identifies the situation. Together they do.

Fragment 2. Non-domination in Pettit's sense is the requirement that vulnerability be small. This is the fifth desideratum, and it is the quantity the gradual-disempowerment concern needs.

Fragment 3. H&P's rho is a risk parameter. Long-term power evaluates the random trajectory of aggregate power by a soft minimum over its realisations, so rho near zero gives the expectation and large rho the worst trajectory. It acts once, at the top of the hierarchy, on randomness produced by the kernel and everyone's stochastic behaviour. Lambda acts inside a single capability evaluation, on which outsider policy governs that rollout. The two are related by a duality. The lambda-minimum over outsider policies equals the entropic certainty equivalent of the capability under the baseline, with risk parameter one over lambda, a result of Jacobson's. Worst case over models with a divergence penalty and risk aversion under the reference model are the same number. So pessimism increases in rho and in one over lambda, and since they act on different random variables neither double counts the other.

---

## What the robot is held to (sketch)

<ul>
<li class="fragment"><strong>Indispensability</strong>: the robot's share of collective capability, against H&P's counterfactual in which it becomes defunct. Not capped, since that counterfactual already penalises dependence.</li>
<li class="fragment"><strong>Domination</strong>: the humans' capability loss when the robot is the only adversary. To be constrained.</li>
<li class="fragment"><strong>Reversibility</strong>: the humans' guaranteed capability ($\lambda \to 0$) over the states where the robot is paused or stopped. To be required.</li>
</ul>

<div class="fragment" style="margin-top: 12px;">
Principle: usefulness is not penalised, whereas the ability to withdraw it without recourse is.
</div>

Note:
These three are sketched rather than settled, and I say so on the slide. They are the safety instruments the framework makes available once the robot is a player.

Fragment 1. Indispensability is the robot's marginal contribution to collective capability, evaluated against the counterfactual in H&P's Appendix D in which the robot becomes permanently defunct at some rate delta. It is not capped, because that hedge already penalises dependence on the robot.

Fragment 2. Domination applies the adverse-outsiders operator to the robot's policy alone, the robot as the only adversary, and asks how much capability the humans lose. That is the quantity to constrain.

Fragment 3. Reversibility is the humans' guaranteed capability, lambda to zero, over the states in which the robot is paused or stopped. That is the quantity to require. H&P's Proposition 10, that the robot keeps the pause button enabled, is this instrument.

Fragment 4. The principle behind all three is that being useful is not penalised, whereas being able to withdraw usefulness without the humans having recourse is. That is the gradual disempowerment concern from the motivation, stated as a constraint on the robot rather than as a warning.

---

## Failure modes of the measure, and the guard against each

<table class="sep-table obj-table" style="font-size: 0.72em;">
<tr><th>failure</th><th>guard</th></tr>
<tr class="fragment"><td>joint goals missing from the goal sets</td><td>common and conjunction goal sets, with H&P's canonical goals as a check</td></tr>
<tr class="fragment"><td>an institution scored as a coincidence</td><td>organisation is in the model, so the value of a feature is a comparison between two states</td></tr>
<tr class="fragment"><td>compliance by habit confused with compliance by self-interest</td><td>estimate $m$ where the two disagree, from group data</td></tr>
<tr class="fragment"><td>the answer depends on how goals were sliced</td><td>recompute the dividends with canonical goals, and report the difference</td></tr>
<tr class="fragment"><td>predatory coordination: a coalition that gains by lowering outsiders' guarantees</td><td>open. Candidate test: hold outsiders' $C^\lambda$ at pre-coalition values. A dividend that disappears is predatory</td></tr>
<tr class="fragment"><td>counterfactuals that are artefacts of the world model</td><td>the decisive test on the validation slide</td></tr>
</table>

Note:
The contribution I want to be judged on is not the definition but its robustness, so here are the ways a measure of collective power can fail, and what in the framework guards against each.

One. Joint goals missing from the goal sets, which is the divide-and-rule case and the collective form of the misspecified goal set from section I. The guard is coalition goal sets built as common goals or conjunctions of members' goals, with H&P's canonical goals as a check that does not depend on any goal set.

Two. An institution scored the same as a coincidence. The guard is that organisation is in the state and in the behaviour model, so a rota, a signal or an enforcement device changes the number and luck does not, and the value of each is a comparison between two states or two kernels the world model already contains.

Three. Estimation. A member who complies because the script happens to serve their goal looks the same as one who complies because of the script. The guard is to identify compliance where the script and own-goal play disagree, from correlated departures from individually predicted behaviour in group data, which is the estimation slide.

Four. Goal slicing. Whether a group shows synergy on a goal depends on how goals were cut. The guard is to recompute the dividends with H&P's canonical goals and report the difference as the artefact.

Five. Predatory coordination. Raising compliance for a coalition whose capability comes from lowering outsiders' guaranteed capability passes aggregate power's soft minimum when the harm is spread thinly over many outsiders. This one is open. The candidate test is to recompute the coalition's dividends with the outsiders' capability under adverse outsiders held at its pre-coalition values. A dividend that disappears is predatory.

Six. The world model. Every counterfactual in the framework is a comparison inside the robot's world model, so if the model is wrong the comparisons measure nothing. The guard is the decisive test on the validation slide.

Two more carry over unchanged. Peaked aggregation can produce lockdown, so the exponent should stay breadth-favouring. Monotonicity of coalitional capability in compliance and in signal features holds for rational members and can fail under bounded rationality, which is the coalition-level version of H&P's Proposition 7 and is on the proof list.

---

## Failure modes of the robot that uses it, and the guard against each

<table class="sep-table obj-table" style="font-size: 0.72em;">
<tr><th>failure</th><th>guard</th></tr>
<tr class="fragment"><td>withdrawing options it made people depend on</td><td>constrain domination and require reversibility</td></tr>
<tr class="fragment"><td>a backstop that people come to rely on, and that then fails</td><td>H&P's defunct rate $\delta$, under which the robot prefers to build the human script</td></tr>
<tr class="fragment"><td>its own interventions changing $m$, the signals and the scripts</td><td>report evaluations at performatively stable points, where the model stays correct after the robot acts on it</td></tr>
<tr class="fragment"><td>steering people through the signals it publishes</td><td>a signal is honest if the beliefs it induces remain correct once everyone acts on them. Otherwise it is manipulation</td></tr>
<tr class="fragment"><td>being rewarded on the measurement</td><td>the estimable floor is a monitor rather than a reward</td></tr>
</table>

Note:
The second list is about the robot that uses the measure, which is the gradual disempowerment concern in operational form. The objective already rewards organising humans, as the commons slide said. These are the ways that reward can go wrong.

One. The robot can become the gatekeeper, by providing options, making people depend on them, and then withdrawing them. Two instruments on the previous slide address this. Domination is to be constrained, and reversibility is to be required.

Two. A robot backstop, "I contribute if nobody does", restores provision in the volunteer's dilemma. But humans learn that the robot will act, and compliance with the human contribution script falls, so provision collapses in the futures where the robot is gone. H&P's defunct rate makes long-term power weigh those futures. This is the first prediction, two slides on.

Three. Performativity. A prediction is performative when acting on it changes the thing predicted, in the sense of Perdomo and colleagues. The robot's estimates of compliance, scripts and signal effects change once the robot acts on them, because humans respond to its interventions. A performatively stable point is a model that remains correct after the robot acts on it, and evaluations should be reported at such points.

Four. The same idea separates mediation from manipulation. A signal the robot publishes is honest if the beliefs it induces remain correct once everyone acts on them, in which case the signal is a correlated-equilibrium device. A signal whose induced beliefs are false after publication is manipulation.

Five, from section I. The estimable floor is a monitor rather than a reward, since a system rewarded on its own measurement acquires incentives on the labels and the logging it mediates.

---

## Estimating compliance and scripts from group data

<div>
We observe actions, but never which rule produced them. The behaviour model is a mixture with that as a hidden variable, fitted by expectation-maximisation.
</div>

<ul style="margin-top: 10px;">
<li class="fragment">$m_{s,h}$ is a softmax over the coalitions available to $h$, with inputs from state features such as membership, an active mandate, enforcement and the cost of compliance.</li>
<li class="fragment">What identifies $m$ is the states where the script and the member's own goal prescribe different actions. The signal is a correlated departure from what each individual would do alone, so single-agent data cannot show it.</li>
<li class="fragment">Scripts are held near-deterministic, as conventions are. Language-model agents in organised roles can supply first estimates, checked against human-subject games.</li>
</ul>

Note:
How the model is fitted, since the measure is only as good as the behaviour model beneath it. The behaviour model is a mixture with a latent variable. Which rule generated an action, a coalition's script or the human's own goal, is not observed. Only the action is. Goals are unobserved as well, as in Heitzig and Potham's own estimation of the rationality parameter. The likelihood of an observed joint action is the product over humans of the compliance-weighted script components plus the own-goal component averaged over the goal set. Expectation-maximisation fits it. The E-step computes the posterior probability of each rule given the observed action, and the M-step updates compliance and the scripts to maximise the expected log-likelihood. Gradient ascent on the log-likelihood works too.

Fragment 1. Compliance is parametrised as a softmax over the rules available to a human at a state, with logits that are functions of state features, membership indicators, whether a mandate is active, whether enforcement is present, and the cost of compliance there. That keeps it low-dimensional, restricts its support to the network, and lets the concentration on organised coalitions be learned rather than assumed.

Fragment 2. Identification. Where the script and own-goal play prescribe the same action, compliance by habit and compliance by alignment cannot be told apart. States where they disagree, where compliance is costly, identify it. The identifying signal in group data is a correlated departure from what each individual would have done on their own, which own-goal play cannot produce given the state. So compliance cannot be estimated from single-agent data at all, which is a statement about what kind of data a deployment would need to log.

Fragment 3. Scripts are constrained to be near-deterministic given the state. Conventions are near-deterministic, and the constraint prevents a low compliance with an exact script and a high compliance with a noisy script from fitting the data equally well. Scripts and compliance can also be elicited from language-model agents playing organised roles, since H&P observe that such models encode social norms, and checked against the human-subject games on the validation slide. Rationality, action values and beliefs about others are estimated as in H&P.

---

## Prediction: a robot that expects to fail builds institutions

<ul>
<li class="fragment">One of $n$ humans must contribute for all to benefit. Provision falls as $n$ grows.</li>
<li class="fragment">A robot backstop ("I contribute if nobody does") restores provision. But people come to rely on it, and compliance with the human script falls.</li>
<li class="fragment">H&P let the robot's world model include a rate $\delta$ at which it becomes permanently defunct, so long-term power weighs futures without the robot.</li>
<li class="fragment"><strong>Prediction.</strong> Above a threshold in $\delta$, the robot installs a rotation script instead of acting as the backstop.</li>
</ul>

Note:
The framework makes predictions before anything is estimated, and the validation tests them. This is the first.

Fragment 1. The volunteer's dilemma from the free-riding slide. With n humans and one contribution needed, provision under goal-averaged behaviour falls as the group grows.

Fragment 2. A robot backstop restores provision. Under a backstop, humans learn that the robot will act, and the probability of acting under the human contribution script falls.

Fragment 3. Heitzig and Potham's Appendix D proposes that the robot's world model include a rate delta at which the robot becomes permanently defunct, so that long-term power weighs futures in which the robot is absent and the robot is discouraged from making humans depend on it. In those defunct futures, provision under a backstop collapses. A rotation script, a turn indicator in the state and a script that reads it, keeps provision after the robot is gone.

Fragment 4. As delta grows, the defunct futures weigh more in long-term power. The prediction is a threshold in delta above which the robot prefers to install the rotation script over acting as the backstop. In plain terms, a robot that takes its own failure seriously builds institutions rather than dependence.

---

## Prediction: how to share a prize that cannot be split

<div>
Several claimants, one prize. Ranking under long-term power: division, then alternation, then a lottery, then an open contest.
</div>

<ul style="margin-top: 12px;">
<li class="fragment">Under alternation, whoever does not hold the prize now can still hold it later, so capabilities stay nearly equal.</li>
<li class="fragment">A lottery is penalised twice. Before the draw, futures differ in who wins ($\rho$). After it, one claimant has the capability and the rest do not ($\psi$).</li>
<li class="fragment">The ranking needs goals such as "hold half", which is why canonical goals are used here.</li>
</ul>

Note:
Several claimants and one prize, and four institutions to compare. Division, if the prize can be split. Alternation, turn-taking over time. A lottery. An open contest.

Fragment 1. Capability is forward-looking. Under alternation the claimant who does not hold the prize now has high capability for the goal "hold it later", so the instantaneous individual powers stay nearly equal and aggregate power stays high.

Fragment 2. A lottery is penalised twice. Before the draw, the trajectories differ in who wins, which rho penalises. After the draw, one claimant has the capability and the others do not, which psi penalises in every later state. So the predicted ranking under long-term power is division, alternation, lottery, open contest.

Fragment 3. The ranking depends on goal granularity. If the only goals are "hold the whole prize", division gives everyone zero. Goals such as "hold half" are needed, which is why H&P's canonical goals are preferred here.

---

## Predictions: the commons, and unions

<ul>
<li class="fragment"><strong>Commons.</strong> Above a harvest-capacity threshold, better extraction tools raise every $I_h$ and lower long-term power $L$. A sum of individual powers would recommend the tools.</li>
<li class="fragment"><strong>Unions.</strong> Aggregate power $P$ is a soft minimum over humans, so bits at the bottom count most. The cheapest way to raise a weak human's guaranteed capability is usually to raise compliance in a coalition of the weak, rather than to transfer capability from the strong.</li>
</ul>

Note:
Two more predictions.

Fragment 1. The commons. Long-term power couples capabilities through the resource state, through eta and the robot's discount. The prediction is a harvest-capacity threshold above which better extraction tools raise every individual power and lower long-term power. A measure that only summed individual powers would recommend the tools.

Fragment 2. Domination. Vulnerability identifies a gatekeeper. Because aggregate power is a soft minimum with parameter psi, bits at the bottom of the distribution are the most valuable, and the cheapest way to raise a weak human's guaranteed capability is usually to raise compliance for a coalition of the weak, a union, rather than to transfer capability from the strong.

---

## Validation, and the result that would demote the diagnostics

<ul>
<li class="fragment">Environments: Concordia (language-model agents in social simulations), Melting Pot (multi-agent RL social dilemmas), and oTree human-subject volunteer's-dilemma and commons games.</li>
<li class="fragment">Pre-registered: provision falls in $n$, the $\delta$ threshold exists, the prize ranking holds.</li>
<li class="fragment"><strong>The decisive test.</strong> Differences in $C_K$ across signal and enforcement features, fitted in one environment, must predict the effect of installing those features in another.</li>
<li class="fragment">If that fails, the counterfactual comparisons are artefacts of the world model, and the diagnostic layer is demoted to description.</li>
</ul>

Note:
How the framework is tested, and how it could be wrong.

Fragment 1. Three kinds of environment. Concordia, language-model agents in social simulations, and Melting Pot, multi-agent reinforcement-learning scenarios with social dilemmas, for scale. oTree, a platform for economics experiments, for human-subject volunteer's-dilemma and commons games.

Fragment 2. The pre-registered predictions are the ones on the previous slides. Provision falls with group size, the delta threshold exists, and the prize ranking holds.

Fragment 3. The decisive one. Differences in coalitional capability across signal and enforcement features, fitted in one environment, must predict the effects of installing those features in another environment.

Fragment 4. If that last prediction fails, the counterfactual comparisons are artefacts of the world model, and the diagnostic layer should be demoted to description. The objective, which is H&P's, would stand. What would go is the claim that the differences we compute say what an intervention would do. Computation, if asked. Restrict coalitions to those with compliance at the state. Estimate Shapley-type values by sampling orders, following Castro, Gómez and Tejada. Use H&P's recursions with rho at one. Compute the envelope and its adverse version by planning in the world model, backward induction over the acyclic state graph.

---

## Back to the motivation

<table class="sep-table obj-table" style="font-size: 0.78em;">
<tr><th>concern</th><th>what detects it</th></tr>
<tr class="fragment"><td>gradual disempowerment</td><td>vulnerability $V_h$ (non-domination), and the domination and reversibility instruments</td></tr>
<tr class="fragment"><td>collective leverage</td><td>coalitional capability $C_K$, its envelope, and the value of signal and enforcement features</td></tr>
<tr class="fragment"><td>divide and rule</td><td>organisation in the model, so $I_h$ counts organised help and $L$ rewards organised states</td></tr>
<tr class="fragment"><td>distributed power</td><td>attributed $\hat I_h$, and the dividends that separate synergy from interference</td></tr>
<tr class="fragment"><td>instrumental convergence</td><td>the robot's indispensability and reversibility</td></tr>
</table>

Note:
The motivation slide made five claims about what a measure of power needs to register. This slide matches each claim to the quantity that addresses it. Gradual disempowerment is a human whose options can be withdrawn a little at a time, which vulnerability per human, non-domination in Pettit's sense, and the two instruments on the robot address. Collective leverage is what a group can attain that its members cannot, and what secures it, which coalitional capability, its envelope and the value of signal and enforcement features address. Divide and rule is an AI that dismantles organisation while preserving individual choice, and once organisation is in the model, individual power falls when it is dismantled and long-term power rewards rebuilding it. Distributed power is who contributes what, which is the attribution and its dividends. Instrumental convergence, on the robot's side, is addressed by its indispensability and by requiring reversibility. Every row is a quantity that is defined, and none of them is validated yet.

---

## Status and open decisions

<div><strong>Settled:</strong> the modelling requirement (compliance, scripts, organisation in the world model), coalitional capability and its envelope, the attribution, capability under adverse outsiders and its $\alpha$-limit.</div>

<div class="fragment" style="margin-top: 12px;"><strong>Sketched:</strong> the robot instruments, the validation plan.</div>

<div class="fragment" style="margin-top: 12px;"><strong>Open:</strong> compliance per human or over coalition structures, how mandates and steering are represented, coverage for coalition goal sets, the $\gamma_K$ convention, the robot as a coalition member, predatory coordination, the proofs, and partial observability as a separate paper.</div>

Note:
Where stage 3 stands. Settled means the definitions are written and consistent with each other and with H&P, namely compliance and scripts in the behaviour model, organisation in the world model, coalitional capability with its target and profile and its envelope, the per-goal game and the Shapley-type attribution with its dividends, and capability under adverse outsiders with its one parameter and its alpha-limit.

Fragment 1. Sketched means stated but not yet worked through, namely the three robot instruments and the validation plan with its predictions.

Fragment 2. Open decisions, in the order I would take them. Compliance per human, independent given the state, which allows partial compliance, against a distribution over coalition structures, which correlates members and gives efficient attribution by Weber's theorem. Both are consistent with the rest, and the intended use decides. How mandates are represented as state features, a finite menu the scripts read, and how the steering channels, voting rules and leadership, are represented in the kernel, since that determines how a coalition adopts a goal and therefore how much goal-directed power it has. Coverage for coalition goal sets, and goal granularity in the prize ranking. Whether the coalition discount is the minimum over members. Whether the robot is a member of coalitions, so that the player set includes it throughout, or robot commitments stay as H&P's commitment-history states. Predatory coordination, whose candidate test is on the failure-modes slide. Then the proofs, namely the reduction theorem, Proposition 1 with a coalition, monotonicity of coalitional capability in compliance and in signal features for rational against boundedly rational members, the stagewise minimax argument for the lambda-zero guarantee, and the divergence bound. Last, partial observability, with beliefs, the value of information and manipulation through beliefs, as a separate paper. Everything in this section is under full observability.

---

## Backup: glossary

<table class="sep-table obj-table" style="font-size: 0.58em;">
<tr><th>term</th><th>meaning</th></tr>
<tr><td>cooperative (TU) game, worth</td><td>a function assigning a number, the worth, to every coalition. The object that cooperative game theory divides among players</td></tr>
<tr><td>marginal contribution</td><td>the increase in a coalition's worth when a player joins it</td></tr>
<tr><td>efficiency</td><td>the shares sum to the worth of the grand coalition</td></tr>
<tr><td>superadditivity, individual rationality</td><td>a coalition is worth at least the sum of its disjoint parts. A player's share is at least their solo worth</td></tr>
<tr><td>Möbius dividend</td><td>the part of a coalition's worth not explained by its sub-coalitions. The Shapley value splits each dividend equally</td></tr>
<tr><td>partition-function form</td><td>a game in which a coalition's worth depends on how the other players are organised</td></tr>
<tr><td>$\alpha$ / $\beta$ characteristic function</td><td>what a coalition can guarantee if it commits first / cannot be prevented from getting if the others commit first</td></tr>
<tr><td>effectivity function</td><td>for each coalition, the sets of outcomes it can force</td></tr>
<tr><td>KL divergence, total correlation</td><td>$\sum_a q(a) \log_2 (q(a)/p(a))$. Total correlation is the KL divergence of a joint distribution from the product of its marginals</td></tr>
<tr><td>multiplier preferences</td><td>evaluating by the worst alternative model, with alternatives penalised by $\lambda$ times their KL divergence from the reference</td></tr>
<tr><td>entropic certainty equivalent</td><td>$-\theta^{-1} \log_2 \mathbb{E}[2^{-\theta X}]$, the certain amount worth the same as random $X$ at risk parameter $\theta$</td></tr>
<tr><td>performative prediction</td><td>a prediction that changes what it predicts once acted on. A performatively stable model stays correct after being acted on</td></tr>
</table>
