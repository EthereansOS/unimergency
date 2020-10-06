var Proposal = React.createClass({
    requiredScripts: [
        'spa/bigLoader.jsx'
    ],
    render() {
        return (
            <section>
                <section className="ExpTop">
                    <h1>Welcome to the dfohub Brand Contest!</h1>
                    <section className="ExpPar">
                        <p>For this contest, our community will come together and decide on a new logo, one that will better express the culture and mission of DFOhub. Before contributing, we recommend carefully reading the DFOhub <a href="https://dfohub.com" target="_Blank">Explainer Website</a> paying particular attention to the <a href="https://dfohub.com/manifesto" target="_Blank">Manifesto Statement</a>.</p>
                    </section>
                    <section className="ExpPar">
                        <p>This contest can be followed both here and on <a href="https://www.cryptovoxels.com/play?coords=SW@405E,69S" target="_Blank">Cryptovoxels</a>! All of the NFT entries will remain in the parcel gallery perpetually, memorializing the cool artists who participated in this contest forever! PS: You can find some easter eggs there!</p>
                    </section>
                    <h2>Phase 2 Structure</h2>
                    <section className="ExpPar">
                        <p><b>From the Ethereum Block no. 10800000 (~ Sat Sep 05 2020 - 07 am CEST)to the Ethereum Block no. 10817000 (~ Mon Sep 07 2020 - 8pm CEST) The Brand Challenge Phase 2 will be live!</b></p>
                    </section>
                    <section className="ExpPar">
                        <p>We’ve decided on a simple experimental voting system for this challenge, one that uses buidl.</p>
                    </section>
                    <h2>Rules:</h2>
                    <section className="ExpPar">
                        <p>buidl holders will be able to vote by staking their buidl until the end of the challenge (with no benefits for early voters). 1 Vote = 1,000 buidl Voters are disincentivized from double voting by a vote tax of 10 buidl (by burn).</p>
                    </section>
                    <section className="ExpPar">
                        <p>What this means is that buidl holders can vote more than once, but it will cost them 10 buidl each time.</p>
                    </section>
                    <h2>Why this experiment?</h2>
                    <section className="ExpPar">
                        <p>Among decentralized voting systems, there is an unresolved debate. Stake voting, Democratic Voting and Quadratic Voting all offer compelling arguments with different pros and cons.</p>
                    </section>
                    <section className="ExpPar">
                        <p>DFOhub aims to experiment with a variety of different and exotic voting systems. For this contest, we are trying a very simple fusion of Stake + Democratic + Quadratic Voting that incentivizes long term buidl holders to vote, while reducing whale voting as much as possible. If a whale really wants to vote more, he or she benefits all other holders by deflating the buidl supply.</p>
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