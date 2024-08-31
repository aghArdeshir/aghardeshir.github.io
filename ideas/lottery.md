# Lottery

There is this idea I've been thinking about a lot. A very fair lottery:

- 100,000 people join
- Every person pays 1 euro
- The winner gets 100,000 euros minus costs of the lottery
  - Costs include server cost, developer costs, contributors payout and other legal stuff required to keep the lottery running
- How is the winner chosen?
  - Randomly:
    - We could use a simple JS' `Math.random()` function
    - We could specify a time and date at which we use a stock market's index' value as a seed for a formula that generates random number
    - We could put a section in our website that people propose ideas for randomly picking a winner. And to encourage people to contribute to this, we can pay for the ideas we pick and implement

## Okay! What is different?

- There are so many lotteries. What makes this difference?
  - Code is open source which gains trust. Because there is proof that people are chosen randomly
  - Costs are transparent, which gains more trust
  - It is always 1-euro per-person. So it is nothing if you lose, but something if you win

## User Flow

- I am a user (a participant in a lottery)
- I enter the website
- I see one or multiple entries
- I choose one open entry
- I get information about the entry:
  - When it will conclude
  - How many people will participate
  - How much the winner wins (and why: explaining the costs)
  - What random method used for this lottery
- I can choose to proceed if I liked it
- I have to provide a means of contact: in case I won
- I have to provide the last 3 or 4 digits of my IBAN: in case I won
- I go to a payment page, do the payment and get back
- I'm provided with a number/identifier for this lottery, when to check, and the link for where to check (even if I lose the link, it should be easy to find where to check for winners from the website)
- I get back at the specified time to see the results:
  - Congratulations, you won xx,xxx euros, you will be contacted soon
  - Unfortunately you haven't won. (we are still contacting the winner and the lottery is not concluded, feel free to check back later)
  - Unfortunately you did not win. The lottery is concluded and the winner has got the money

**Note that**:

- There was no need to log in. There is no need for sign in / sign up any time

## Blockers / Unknowns

- The last time I started working on it, based on research, the payment gateways (stripe, etc...) charged a lot of money (around 30%), which affects the outcome and makes it far less appealing. ChatGPT said using SEPA would be less expensive, haven't looked into that yet. Maybe I can start small, limiting by the country (Netherlands) and then grow (Not even sure if that is zero-cost or cheap). Also ChatGPT said negotiations are possible, for instance with stripe, Adyen, etc... to charge less money.
- There is possibly a huge huge huge deal of legal stuff to know: Lottery regulations, taxing, etc... . Those need to be figured out and dealt with as well.
- How can I prove the code deployed and functioning in the production, is the same open source code people see in the repo?

## Ideas / Challenges (Technical)

- Like any other project, code must be clean and readable. But specially this one, because that's the main difference between this lottery and others: Its open-source and transparent. So everyone should be able to read and follow the code and gain trust in how things function in this lottery.
  - However, there is a challenge here. Imagine we have the super perfect code, readable, secure and everyone trusts the code. But how do you prove that this is the code in production? One can show you one code and deploy another code to prod. Its something that I haven't solved yet. One solution could be a third-party platform designed specifically for this. For instance something like linode+netlify that its only input is a GitHub repo. So as long as that third-party service confirms a website/domain/product is deployed from a GitHub repo, then its trusted that it is the same code. However not everything can be public: Secrets, API Keys, etc...
- Not sure why, but I believe simple files (JSON/CSV) are more suitable for this project than databases. Each round of lottery could be a folder, each participant or payment record becomes a file. Code will be less complicated (no SQL), more pure (Node.js supports files natively) and less setup required to get running (a Node.js runtime is enough - or, the Dockerfile becomes much much simpler).
- We don't need that much information from participants. If 100,000 participants have paid 1 dollar, and 1 is going to win, we don't really need that much information from the 99,999 people who has not won. We actually need none! We just need their 1 euro payment. For that, participants do not need to login. So when paying we ask for their email or phone number, or whatever means they are comfortable getting contacted with. And we may get the last 3 or 4 digits of their IBAN or account number, that in case of winning, the money will be credited into. And after a lottery is done, we can get rid of all data (files). We can keep on to them for another year, just in case, and then get rid of them.
- We can have multiple algorithms for generating a random number/winner. Some purely technical (JS' `Math.random()`), some dependent on the real world event (example: what value will S&P500 have the next Wednesday at 11:30). There should be a page for people submitting their ideas of generating randomness (maybe they could get money fo it), and there should be a page explaining the random methods used in the simplest language possible for everybody.
- We can include twists as well: a lottery can have multiple winners, its not always only one person.
- The website administration Authentication must be done through third party. No self-hosted authentication method can be secure enough. Use Google OAuth or other well established and secure methods to log in the admin. And, the admin must be hard coded in the deployed app, (as environment variables probably), like: `ADMIN_EMAIL=<someone>@gmail.com`. This way we harden the checking of who is admin.
- We get the last few digits of the IBAN to prevent fraud. We call the person by their provided contact method and ask for the full IBAN. If it didn't match with what they provided at the beginning, its cancelled. No change! (We should also communicate this when users are choosing to participate)
- If we contact a winner and they do not respond, we give them a few days and contact several other times, and if still unreachable, we rune the random number generator again and choose another winner.

## Names?

- I thought of several names for this business:
  - "Fairest Lottery"
  - "Buy a Dream"
  - "A Million Dreams"
  - "One Euro Lottery"
- And if I have the infrastructure right, I can deploy several instances with different names, so this business becomes rival of itself

## History / Origin

- This idea came to me when I was overwhelmed by how expensive it is to buy a home in the Netherlands. Thought what if there is a lottery that gave me this money, and it was easy to trust the lottery. This idea is to fulfill the role of that lottery I was dreaming about.
