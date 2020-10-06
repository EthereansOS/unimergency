<img src="https://raw.githubusercontent.com/b-u-i-d-l/unimergency/main/assets/img/vampire1.gif?token=AE365SZTSMB2TPUJEXTBWQS7PSZFK">

### you can vote from here: https://unimergency.dfohub.com

# To Our Dear DFOhub Community

By now, you are no doubt aware of the issue arising from Uniswap’s frontend routing. 

<a href="https://medium.com/dfohub/a-black-hole-in-uniswap-v2s-front-end-router-is-draining-the-value-of-tokens-26f5a459b5d7">A Black Hole in Uniswap V2’s Front-End Router Is Draining the Value of Tokens</a> 

We are now ready to take action and leave it behind us once and for all. 

<b>You are going to have the chance to vote on our path forward. But first...</b>

## Thank You For Your Ongoing Support

Throughout this difficult and stressful period, you have demonstrated patience and understanding, and we are grateful. A special thanks to CD, King Shroom, J_Der, Isolating, Suslik, Khonsu, Bbella, JoeGrech and others for helping us explain the problem to Uniswap’s team and bring it to the attention of the wider public.

We want to clarify that this is not a technical problem with smart contracts or anything of that nature. Rather, it is an adverse effect of Uniswap’s centralized design. 

They could resolve it by altering their custom routing system and asking the chain to swap via all possible pairs, instead of only via pairs tied to the six tokens they have arbitrarily chosen. This would not only put an end to vampire bot arbitrage, it would also democratize liquidity pools and thus provider fees; if swaps were not forced to route through a small sample of pairs, there would be no incentive to provide liquidity to those pools over others.

Unfortunately, Uniswap did not by and large even attempt to understand the problem affecting their protocol, let alone collaborate with us to improve it. 

So, for now, we are left to our own devices. And we have come up with our own solution.


# Our Plan

Since we published our article, the bots have multiplied and become more sophisticated.  Fortunately, we have figured out a strategy to escape. 

<b>We need to remove as much liquidity as possible from pairs untied to ETH, and migrate that liquidity to the UniFi-ETH, BUIDL-ETH and ARTE-ETH pairs.</b>

When we developed the $BUIDL, $UniFi and $ARTE smart contracts, we included an emergency function in line with our Responsible approach to DeFi. This function is a Call called “Flash to Wallet” that is perfect for emergency situations like this.

By calling this functionality, we can migrate the funds from current staking contracts—both the rewards and the locked tokens—and send them to others, where stakers can redeem them based on a snapshot that will be taken if the strategy is implemented, following a vote.

And we can do all of this without relying on any centralized third party. 


## What Does This Mean?

By allowing users to unstake their positions from Uniswap’s liquidity pools, we can drain all liquidity from the pairs the bots are using to exploit Uniswap’s routing.

Immediately after a YES vote, the liquidity will be removed, executing all of the actions necessary to implement our strategy. Stakers will be able to redeem their positions + redeemable rewards (accrued up until the emergency action execution block) + bonus reward (see below) all in a single transaction, via the UI at <a href="https://unimergency.dfohub.com">https://unimergency.dfohub.com</a>.

The faster we work to do this as a community, the better. To accelerate the transition, we are going to reward each staker who claims their current position within 48 hours with a bonus 50 BUIDL + 0.4 ETH (per each wallet with a contract), taken from the DFOhub wallet.


You can find the code here: https://github.com/b-u-i-d-l/unimergency

## And Then What?

To best elude the bots, all newly available staking positions will be tied to ETH pairs, like in the good old days of Uniswap V1. But we have also coded these new Liquidity Mining Contracts (v1.5) with cool new features:


### Multi-Reward
	
With the current contracts, DFOs could only reward staking with their own voting tokens. But with the v1.5 contracts, they can reward with any token they hold in their wallet! Don’t worry—if they don’t hold the amount of tokens required to pay out rewards, staking to earn them will not be allowed. Rewards will need to be locked in external contracts, so no one, even by voting, can touch them for the wrong reason.

#### Example
The DFOhub DFO (governed by BUIDL) will be able to reward UniFi-ETH stakers with BUIDL, or BUIDL-ETH stakers with UniFi.

### Unlock Function

With v1.5 contracts, positions can be unlocked and withdrawn by stakers anytime, as long as they pay back any claimed rewards, all of which will be forfeit in this scenario.

#### Example
Say you stake BUIDL in a three month position, and the total reward is 150 BUIDL. You can withdraw your position whenever you like before the three months is over, but if you’ve already claimed 50 in rewards, you’ll have to pay that back first to do so, and will not be able to earn the rest of the future rewards you otherwise would have.

### Liquidity Mining Block End

DFOs will be able to set a cutoff in blocks for new positions, so that new ones cannot be opened. Open positions will not be affected.

### Staker Flash-to-Wallet

This is basically the same as the emergency function we are using to unlock and migrate the liquidity, but it will be available to every single staker. By calling Flash to Wallet, stakers will be able to withdraw their earned rewards to their own personal wallet, but send the LP tokens and future rewards to the DFO wallet for emergency purposes. This way, the DFO can’t force the Flash to Wallet via voting (which could be abused by big holders), and every staker can make the choice for themselves.


Current stakers will be able to redeem the rewards their position has earned (along with their position and extra bonus reward) up to the block when the emergency move was executed (not the total reward they would have accrued by the original end of the staking period). 

This removes any incentive for stakers to maintain their current positions. If they want to continue earning rewards, they can open positions in the new staking contracts.


## New Liquidity Mining Rewards

The new BUIDL, UniFi and ARTE positions will only be for pairs tied with ETH. This is to incentivize liquidity and help ensure we won’t continue to be drained by vampire bots. By disallowing positions tied to pairs that are excluded by Uniswap’s routes, stakers will no longer be deprived of the trading fees they signed up for and which they deserve.

Due to the upcoming DFOhub v0.5 release, and the possible switch from the current voting tokens to new ones of the EthItem standard, these new liquidity mining tiers will all only be three months long. To increase the incentives to stake, they will also give more rewards relative to the old positions (and the new ones that will come after DFOhub v0.5).

> spoiler start

We will share the DFOhub v0.5 release plan sometime over the next few weeks. With v0.5, DFOs will be rebranded as EPOs (ETH Programmable Organizations)

v.05 will also come with Liquidity Mining 2.0, which will also be known as Programmable Liquidity Mining and include even more fancy new features.

These changes will reflect new and improved technology.

> spoiler end

Due to the fixed inflation swaps with UniFi and ARTE, BUIDL’s circ supply is currently 88,306 less than planned by the fair inflation strategy paper. Of that, 4,450 BUIDL will be sent to the contract that will reward current stakers, and 83,856 will be sent to the DFOhub wallet to increase the available rewards for staking buidl in the new staking contracts.

<b>NOTE: New ARTE staking positions will not be available until the release of EthItem, which due to the delay caused by this issue is now expected mid-October.</b>


## The New Liquidity Mining Contracts

All new contracts are for a three month period, and new positions can be opened for up to thirty days after they first become available.


### BUIDL-ETH Tier

##### If reward is chosen in BUIDL

-30% reward

-36,000 BUIDL total reward

-120,000 BUIDL max staked simultaneously

##### If reward is chosen in UniFi

-50% reward

-50,000 UniFi total reward

-100,000 BUIDL max staked simultaneously

### UniFi-ETH Tier

##### If reward is chosen in UniFi

-50% reward

-50,000 UniFi total reward

-100,000 UniFi max staked simultaneously

##### If reward is chosen in BUIDL

-30% reward

-30,000 BUIDL total reward

-100,000 UniFi max staked simultaneously

### uSD-USDC / uSD-DAI Tiers

##### If reward is chosen in BUIDL

-15% reward

-15,000 BUIDL total reward

-100,000 uSD max staked simultaneously

##### If reward is chosen in UniFi

-25% reward

-37,500 UniFi total reward

-150,000 uSD max staked simultaneously


Like the v1 mining contracts, all v1.5 contracts are redeemable on a weekly basis.

After the special three month reward period, rewards will be reduced to v1 levels.

We’ll also upgrade the DFOhub frontend with a new Farming section so that you can see every liquidity mining position available among all DFOs. 

We’ve also turned a joke of Ale’s (see the link below) into a real fork of Uniswap’s frontend. It will track DFO token trades more efficiently, and will also be available on the DFOhub GUI.

https://discordapp.com/channels/652132797032562689/701678117886099466/762690195753533500


## About The Proposal Vote

You can vote to agree or disagree with it by staking your BUIDL, UniFi and ARTE up until the end block (https://etherscan.io/block/countdown/11013333). If you have any questions, you can ask them here (https://discord.gg/FPcZpxB) and we will answer them ASAP.

Each token = one vote (1 BUIDL = 1 vote; 1 ARTE = 1 vote; 1 UniFi = 1 vote). When the end block ends, if the majority of staked tokens vote YES, the DFOhub team will immediately begin implementing the strategy to free us from Uniswap’s black hole once and for all.


## An Important Message From Ale

If you aren’t happy with this outcome, please remember it is not DFOhub’s fault (although it is only thanks to the quality of our smart contracts that we can do something about it).

The problem is with Uniswap's protocol. As soon as we understood this, we approached them, hoping they might work with us to find a solution. Instead, we were rudely dismissed. They would not even entertain the prospect that their protocol is flawed (even though it is, thanks to some centralized decisions viewable on their github repo), let alone try to help.

But using DFOhub's own funds, we have figured out our own solution and can resolve the problem (and reward stakers in the process) without relying on a third party, and without needing to compromise our long term strategy or the fair inflation of BUIDL, ARTE and UniFi. 

We delayed important projects like EthItem to deal with this, and are as annoyed as you are.

But we have worked very hard, and have found a way.	

### you can vote from here: https://unimergency.dfohub.com

