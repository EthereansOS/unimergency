var Proposal = React.createClass({
    requiredScripts: [
        'spa/bigLoader.jsx'
    ],
    render() {
        return (
            <section>
                <section className="ExpTop">
                    <h1>To Our Dear DFOhub Community</h1>
                    <section className="ExpPar">
                        <p>By now, you are no doubt aware of the issue arising from Uniswap’s frontend routing. <br></br>More info: <a href="https://medium.com/dfohub/a-black-hole-in-uniswap-v2s-front-end-router-is-draining-the-value-of-tokens-26f5a459b5d7" target="_Blank">A Black Hole in Uniswap V2’s Front-End Router Is Draining the Value of Tokens</a>.</p>
                    </section>
                    <section className="ExpPar ExpParV">
                        <p>We are now ready to take action and leave it behind us once and for all.</p>
                    </section>
                    <section className="ExpPar ExpParV">
                        <p><b>You are going to have the chance to vote on our path forward. <br></br><br></br>But first...</b></p>
                    </section>
                    <h2>&#128154; &#128153; Thank You For Your Ongoing Support &#128156; &#128155;</h2>


                    <section className="ExpPar">
                        <p>Throughout this difficult and stressful period, you have demonstrated patience and understanding, and we are grateful. A special thanks to CD, King Shroom, J_Der, Isolating, Suslik, Khonsu, Bbella, JoeGrech and others for helping us explain the problem to Uniswap’s team and bring it to the attention of the wider public.</p>
                    </section>
                    <section className="ExpPar">
                        <p>We want to clarify that this is not a technical problem with smart contracts or anything of that nature. Rather, it is an adverse effect of Uniswap’s centralized design.</p>
                    </section>
                    <section className="ExpPar">
                        <p>They could resolve it by altering their custom routing system and asking the chain to swap via all possible pairs, instead of only via pairs tied to the six tokens they have arbitrarily chosen. (the proof of how could be easy is this friendly Front-end fork for made in 10 min by Ale yesterday: <a href="https://alet89.github.io/uniswap-interface/#/swap">Uniswap Fork</a>) <br></br> This would not only put an end to vampire bot arbitrage, it would also democratize liquidity pools and thus provider fees; if swaps were not forced to route through a small sample of pairs, there would be no incentive to provide liquidity to those pools over others.</p>
                    </section>
                    <section className="ExpPar">
                        <p>So, for now, we are left to our own devices. And we have come up with our own solution.</p>
                    </section>
                    <h2>Our Plan</h2>
                    <section className="ExpPar">
                        <p>Since we published our article, the bots have multiplied and become more sophisticated.  Fortunately, we have figured out a strategy to escape.</p>
                    </section>
                    <section className="ExpPar ExpParV">
                        <p>We need to remove as much liquidity as possible from pairs untied to ETH, and migrate that liquidity to the UniFi-ETH, BUIDL-ETH and ARTE-ETH pairs.</p>
                    </section>
                    <section className="ExpPar">
                        <p>When we developed the $BUIDL, $UniFi and $ARTE smart contracts, we included an emergency function in line with our Responsible approach to DeFi. This function is a Call called <b className="VVVV">“Flash to Wallet”</b> that is perfect for emergency situations like this.</p>
                    </section>
                    <section className="ExpPar">
                        <p>By calling this functionality, we can migrate the funds from current staking contracts—both the rewards and the locked tokens—and send them to others, where stakers can redeem them based on a snapshot that will be taken if the strategy is implemented, following a vote.</p>
                    </section>
                    <section className="ExpPar">
                        <h3><b>And we can do all of this without relying on any centralized third party.</b></h3>
                    </section>
                    <h2>What Does This Mean?</h2>
                    <section className="ExpPar">
                        <p>By allowing users to unstake their positions from Uniswap’s liquidity pools, we can drain all liquidity from the pairs the bots are using to exploit Uniswap’s routing.</p>
                    </section>
                    <section className="ExpPar">
                        <p>Immediately after a <b className="VVVV">YES</b> vote, the liquidity will be removed, executing all of the actions necessary to implement our strategy. Stakers will be able to redeem their positions + redeemable rewards (accrued up until the emergency action execution block) + bonus reward (see below) all in a single transaction, via the UI at <a href="https://unimergency@dfohub.com">https://unimergency@dfohub.com</a>.</p>
                    </section>
                    <section className="ExpPar">
                        <p>The faster we work to do this as a community, the better. To accelerate the transition, we are going to reward each staker who claims their current position within 48 hours with a <b className="VVVV">bonus 50 BUIDL + 0.4 ETH</b> (per each wallet with a contract), taken from the DFOhub wallet.</p>
                    </section>
                    <a href="https://github.com/b-u-i-d-l/unimergency">Github</a>
                    <h2>And Then What?</h2>
                    <section className="ExpPar">
                        <p>To best elude the bots, all newly available staking positions will be tied to ETH pairs, like in the good old days of Uniswap V1. But we have also coded these <b className="VVVV">new Liquidity Mining Contracts (v1.5)</b> with cool new features:</p>
                    </section>
                    <section className="ExpPar ExpParV">
                        <p>Multi-Reward</p>
                    </section>
                    <section className="ExpPar">
                        <p>With the current contracts, DFOs could only reward staking with their own voting tokens. But with the v1.5 contracts, they can reward with any token they hold in their wallet! Don’t worry—if they don’t hold the amount of tokens required to pay out rewards, staking to earn them will not be allowed. Rewards will need to be locked in external contracts, so no one, even by voting, can touch them for the wrong reason.</p>
                    </section>
                    <section className="ExpPar">
                        <p><b>Example:</b> The DFOhub DFO (governed by BUIDL) will be able to reward UniFi-ETH stakers with BUIDL, or BUIDL-ETH stakers with UniFi.</p>
                    </section>

                    <section className="ExpPar ExpParV">
                        <p>Unlock Function</p>
                    </section>

                    <section className="ExpPar">
                        <p>With v1.5 contracts, positions can be unlocked and withdrawn by stakers anytime, as long as they pay back any claimed rewards, all of which will be forfeit in this scenario.</p>
                    </section>

                    <section className="ExpPar">
                        <p><b>Example:</b> Say you stake BUIDL in a three month position, and the total reward is 150 BUIDL. You can withdraw your position whenever you like before the three months is over, but if you’ve already claimed 50 in rewards, you’ll have to pay that back first to do so, and will not be able to earn the rest of the future rewards you otherwise would have.</p>
                    </section>


                    <section className="ExpPar ExpParV">
                        <p>Liquidity Mining Block End</p>
                    </section>

                    <section className="ExpPar">
                        <p>DFOs will be able to set a cutoff in blocks for new positions, so that new ones cannot be opened. Open positions will not be affected.</p>
                    </section>


                    <section className="ExpPar ExpParV">
                        <p>Staker Flash-to-Wallet</p>
                    </section>

                    <section className="ExpPar">
                        <p>This is basically the same as the emergency function we are using to unlock and migrate the liquidity, but it will be available to every single staker. By calling Flash to Wallet, stakers will be able to withdraw their earned rewards to their own personal wallet, but send the LP tokens and future rewards to the DFO wallet for emergency purposes. This way, the DFO can’t force the Flash to Wallet via voting (which could be abused by big holders), and every staker can make the choice for themselves.</p>
                    </section>

                    <section className="ExpPar ExpParV">
                        <p>Disclamer:</p>
                    </section>

                    <section className="ExpPar">
                        <p>Current stakers will be able to redeem the rewards their position has earned (along with their position and extra bonus reward) up to the block when the emergency move was executed (not the total reward they would have accrued by the original end of the staking period). <br></br>This removes any incentive for stakers to maintain their current positions. If they want to continue earning rewards, they can open positions in the new staking contracts.</p>
                    </section>

                    <h2>New Liquidity Mining Rewards</h2>

                    <section className="ExpPar">
                        <p>The new BUIDL, UniFi and ARTE positions will only be for pairs tied with ETH. This is to incentivize liquidity and help ensure we won’t continue to be drained by vampire bots. By disallowing positions tied to pairs that are excluded by Uniswap’s routes, stakers will no longer be deprived of the trading fees they signed up for and which they deserve.</p>
                    </section>

                    <section className="ExpPar">
                        <p>Due to the upcoming DFOhub v0.5 release, and the possible switch from the current voting tokens to new ones of the EthItem standard, these new liquidity mining tiers will all only be three months long. To increase the incentives to stake, they will also give more rewards relative to the old positions (and the new ones that will come after DFOhub v0.5).</p>
                    </section>

                    <section className="ExpPar ExpParV">
                        <p>~~~spoiler start~~~</p>
                    </section>

                    <section className="ExpPar">
                        <p>We will share the DFOhub v0.5 release plan sometime over the next few weeks. With v0.5, DFOs will be rebranded as EPOs (ETH Programmable Organizations) <br></br>v.05 will also come with Liquidity Mining 2.0, which will also be known as Programmable Liquidity Mining and include even more fancy new features.<br></br>These changes will reflect new and improved technology.</p>
                    </section>

                    <section className="ExpPar ExpParV">
                        <p>~~~spoiler end~~~</p>
                    </section>

                    <section className="ExpPar">
                        <p>Due to the fixed inflation swaps with UniFi and ARTE, BUIDL’s circ supply is currently 88,306 less than planned by the fair inflation strategy paper. Of that, 4,450 BUIDL will be sent to the contract that will reward current stakers, and 83,856 will be sent to the DFOhub wallet to increase the available rewards for staking buidl in the new staking contracts.</p>
                    </section>

                    <section className="ExpPar ExpParV">
                        <p>NOTE: New ARTE staking positions will not be available until the release of EthItem, which due to the delay caused by this issue is now expected mid-October.</p>
                    </section>

                    <h2>The New Liquidity Mining Contracts</h2>
                    <section className="ExpPar">
                        <p>All new contracts are for a <b className="VVVV">three month period</b>, and new positions can be opened for up to thirty days after they first become available.</p>
                    </section>

                    <section className="ExpPar ExpParV">
                        <p>BUIDL-ETH Tier</p>
                        <ul>
                        <p>If reward is chosen in <b>BUIDL</b></p>
                        <li><p>- 30% reward</p></li>
                        <li><p>- 36,000 BUIDL total reward</p></li>
                        <li><p>- 120,000 BUIDL max staked simultaneously</p></li>
                        </ul>
                        <ul>
                        <p>If reward is chosen in <b>UniFi</b></p>
                        <li><p>- 50% reward</p></li>
                        <li><p>- 50,000 UniFi total reward</p></li>
                        <li><p>- 100,000 BUIDL max staked simultaneously</p></li>
                        </ul>
                    </section>
                    <section className="ExpPar ExpParV">
                        <p>UniFi-ETH Tier</p>
                        <ul>
                        <p>If reward is chosen in <b>UniFi</b></p>
                        <li><p>- 50% reward</p></li>
                        <li><p>- 50,000 UniFi total reward</p></li>
                        <li><p>- 100,000 UniFi max staked simultaneously</p></li>
                        </ul>
                        <ul>
                        <p>If reward is chosen in <b>BUIDL</b></p>
                        <li><p>- 30% reward</p></li>
                        <li><p>- 30,000 BUIDL total reward</p></li>
                        <li><p>- 100,000 UniFi max staked simultaneously</p></li>
                        </ul>
                    </section>
                    






                    <section className="ExpPar">
                        <p>If reward is chosen in BUIDL</p>
                        <ul>
                        <li><p>30% reward</p></li>
                        </ul>
                    </section>

                    <h2>How to vote?</h2>
                    <section className="ExpPar">
                        <p>buidl holder can vote via the "Vote" section, by clicking "Approve", wait for the Approve Transaction and then by clicking to "Vote"</p>
                        <p>All of the buidl staked to vote are redeemable after the Contest end block via the button "Redeem"</p>
                    </section>
                    <section className="ExpPar">
                        <p>The code of this contest, like that of every experimental DFOhub challenge is available here: <a href="https://github.com/b-u-i-d-l/brand-contest/blob/master/contract/BrandContestV2.sol" target="_blank">Github Repo</a>.</p>
                    </section>
                </section>
            </section>
        );
    }
});