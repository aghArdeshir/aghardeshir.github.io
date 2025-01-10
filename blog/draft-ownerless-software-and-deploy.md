---
outline: deep
---

# Ownerless Software, Ownerless Deploys and Ownerless Data

<p class="subheading">Another alternative to open-source software for more freedom and longer maintainance</p>

Open-source software is great and lovely and already creates a lot of freedom in how software are made. But the open-source software is always owned, either by a person, a group or an organization. This results in more weight in one person/group's opinions vs the rest of the people (who could be maintainers, users, or generally stakeholders). Nevertheless, the open-source software has been working pretty well since its existence, by the power of excellent community and communications around it.

However there are some use cases to software in general, that open-source software shortcomes. In this article, I start by describing the proposal, discussing why its useful, and then listing challenges and downsides of such a system.

## The What

I have an idea of a software. I feel a use-case for which a software is missing in the world. I know the solution, but I'm a full-time employee and have a life to live besides. With current open-source system in the world, my options are:

1) Start a repo, write the solution as POC or MVP, give it to the world. The problem is however, if I initiate such a repo, then I "kinda" have to keep maintaining it. Even if I don't develop it personally, I need to keep reviewing, approving and merging the merge requests for the software to keep working and growing. You can argue there are ways to overcome this, like transfering ownership, giving access to other people, or anyone is free to just fork the repo, etc... But the underlying problem would still remain, and the proof is so many open-source software that are being heavily used (based on ther package-manager weekly-installs stats), but are last time updated few years ago, wiht a pile of hundreds of open issues.

2) Find a person or organization and ask them to implement a solution for my idea. However this is the same thing as above. It is just some else having all those problems. Even if they feel confident at first to keep working on this, priorities in life may change and they may eventually ive up, without giving a notice or transfering the ownership before letting the written software stael for a long time. Plus, you, as the owner of the idea, still need to find a person/organization to do this. That needs lots of research, tracking and follow-up.

3) Give it up, as I have other priorities.

In addition to that, if that software needs deployment and other maintainance costs, you'll need to seek sponsorship or by initiaing crowd funding.

Now, we get to solution I have in mind: Open-source Software does not need to have owners. As owner of an idea, all I need to do is to "initiate" the idea in a platform like GitHub, as a repo, and then I'm not even the owner; meaning, I, as the initiator, has no single privilege more than any other person. Everyone has the same access. Then how does it work? The answer is ... drum roll ... I don't know! Actually meaning it can be any other way than how currently the OSS works. The way OSS works currently is:

- I need a Software (a solution to a problem)
- I find an open-source one
- I use it
- I find a bug or feel a missing feature
- I contribute in form of a Merge Request
- People vote and discuss it
- If everything is good, the owner merges it, and then everyone has my change

But what if the owenr is dead, improsones, lost access to their account, or simply gave up on maintaining this software because of other priorities? They also have the right to "Reject" the MR, despite everybody else on the planet being in favor of that change, because they "own" the software. Even if 1000 person upvote and ask for a feature, the owner's opinion will weigh everybody's else accumulated.

But in the Ownerless system, everything is almost the same, except the last part:

- I need a Software (a solution to a problem)
- I find an open-source one, which is ownerless!
- I use it
- I find a bug or feel a missing feature
- I contribute in form of a Merge Request
- People vote and discuss it
- If everything is good, "it will be automatically merged" and then everyone has my change

The last part is the only different between an ownerless OSS and a regular one. Precisely this part:

> If everything is good, it will be automatically merged

But there are lots of questions with that:

- How we know everything is good?
- What are the conditions for it to be automatically merged?
- What system do we use to weigh opinions? Do we simply count the number of upvotes/downvotes, or do we weight one person's opinion more than anothers, maybe based on their good history on the platform?
- What about smaller repos, where only two or three people actively work and comment on a repo?
- What about very huge software that are used by millions, and what if we automatically merge an evil code because of whatever system in place? Then millions of user will be affected!
- Should we introduce a waiting time before MRs get merged so more people have time to look at it? Then what if an MR tries to deliver a security fix ASAP?
- What if a country uses their political force and heavey budgets to influence the system in place to be tricked in approving a bad change? Like, in form of, paying so many experts to influece and deliver a bad change.

It is already obvious in such a system/platform of ownerless OSS, the biggest challenge would be the system of approving changes. There is no good answer. We can't simply go for democracy, most people say "yes" to something, does not necessarily mean that's good. Also following trends is not always the best strategy. And this is a serious issue, because for thousands of years, humankind have been trying to establish the same perfect system in politics for governing, and it is still a WIP. So one can't simply decide on a stable/failr system for such a project.

Maybe there could be different systems which each repo can follow based on its needs.

To put this in an analogy, the current way OSS works, feels like a Monarchy. But some (ownerless) could be Democracy, Direct Democracy, a Hybrid System, or Communism! Or you can just keep thinking how the governance and making changes in each country works and just map it to how software is maintained by a collective group of people.

If you noticed the title of the article also mentions "Ownerless Deploys". This also refers to the "initiation" of a deployed software/service. As the owner of the idea/service, I need to buy a domain, remember to pay for it yearly, and also rent a VPS with a static IP, and pay the bills always on time, for users of the service to be able to keep using it. But the same "What if ..."s apply here:

- What if I decide not to pay anymore for the domain/host?
- What if the hosting company goes bankrupt?
- What if I forget to renew domain, it expires and ends up in hands of an (evil) person?

Even if I set up a system for receiving donations, and people actually donate, there is no guarantee that I will keep paying for the service to stay alive.

Such a platform/system could also have deployments builtin. Let me giev you an example, bear with me:

- I want to track my family expenses so I can control my finances
- There are free solutions on the market, but they are all local to my device, what I need is to create a family account, invite my partner and maybe my children to the same account
- Everyone in my family should be able to see/edit/add/update transactions they did, so over months we get a beautiful chart to analyze our finances
- 

## The Why

Now that you know what I have in mind, I can also tell you why I have this in mind. Part of the answer was given above:

- For any reason the maintainer stops maintainig the OSS
- One needs to spread an idea of a solution rather than the implemented solution and give it in hands of people (including themsleves) in hope of receiving back the implemented solution
- For me, growing up in a country in which you could be fined, imprisoned or even executed for expressing your opinions and beliefs, developing some sorts of software could have consequences. Imagine you are an activist for the rights of __BLANK__ and want to create a website for rights of __BLANK__, but your government arrest every activist of rights of __BLANK__. So having commits on an OSS on GitHub, having a registered domain udner your name, or having a host for your files, which is bought by your details and your credit card, in a Totalitarianism country, could totally get you arrested.
