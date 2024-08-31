# Ownerless Open Source Software

## The Problem

What if there is a very successful open source (open source) software. People depend on this piece of (open source) software for years, infrastructures built on it and all good. But suddenly...

- The owner stops maintaining it
- Or (hopefully not) the main maintainer passes away
- Or the maintainer starts acting evilish
- Or the main maintainer does not really follow what most people want, and follows their own desires and ideals

None of these are necessarily bad, (maybe "acting evilish is a bit bad, but yeah..."), but the problem is we end up with software/libraries that are not truly reliable.

An example is with VSCode depending on TextMate. VSCode relied on TextMate implementation for its language grammar (used to parse code in various programming languages to provide syntax highlighting). But TextMate author suddenly stopped maintaining it a few years ago. Not necessarily a bad thing, but caused so many unresolved issues on VSCode repo for problems with Language Servers. For instance one is HTML attributes cannot understand between `//` in URL protocols (`https://`) vs. `//` for a comment in JavaScript. This problem is known for years in VSCode, it would be an easy fix, even there is already an MR open on the TextMate repo for years now, but nobody is maintatining it.

This is problematic for VSCode:

- VSCode is not maintaining those language definitions. They are inserted/copied-over from TextMate remote and no one should touch them manually.
- VSCode team does not really want to assign more people to create and maintain their in-house language definitions. That's too much work and feels like re-inventing wheels while there are so many options out there.
- VSCode has developed a "Trust Issue" at this moment. While there are so many options for switching to a new langauge grammar, they fear if they spend so much time and energy to switch to a new one, and then the same problem happens again: the maintainer abandons the language grammar. Then they should spend all this time and energy **again** to find and implement a new language grammar definiont as an alternative.

## The solution (maybe?)

What could gain trust of the VSCode team for easily accepting a new alternative without the fear that their development cost in implementing the new alternative into their codebase won't go in vain ina few years in search for even another alternative?

We, as developers, can choose to keep some of our open source codes in a democracy-like mode.

I'm thinking of a platform, in which people initiate open source software, but the initiator is not necessary the maintainer. Actually there is no one person or one team in charge of maintaining a piece of software.

As an example think of a platform like GitHub: Somebody initiates a repository: "**HTML Language Grammar using Reegular Expressions**". And immediately after initiation, the person no longer has any special privilege on the repository. The initiator is treated as any other person visiting the platform in relation to that repository.

Now, how the repository develops, is actually a raw idea in my head. What I have till now, is any new code addition/removal, issue report, dicussions, future plans of the project, shutting down the project, renaming it, etc... are performed using a simple voting system. Required votes to approve a change should be proportional to how many people are actively contributing to the project. Larger projects with thousands daily contributors, require a very good balance of upvotes (few hundreds) versus downvotes (ideally only a few) for every change. Smaller projects, like ones that are jsut initiated, can be changed with one person (probably the initiator) until more people start using and contributing to it. Even the very system by which each proejct approves and applies a particular change, could be configurable and also put in vote to change.

P.S.
In such a platform there are no private repos. Its meaningless.

## Flaws

This is too raw and some flaws are obvious:

- A hateful team of only a few have potential to brutally sabotage every new package with only 1 contributor.
- Attacks similar to 51% attack sound like to be easy to carry on an even larger project in such a platform.
- There should be mechanism of weighing people's votes. Imagine there have been 100 good approved changes recently on various projects, and there is this one person who has left down votes on every one of them. We can conclude that this person is probably trying to break stuff rather than fix stuff. Then that person's vote weight should be lowered.
- Imagine you run a country on this basis: every single change requires people to vote and you just do as most people desire. I imagine the outcome won't be a good living situation. The same could be true for a piece of software. What majority believe cannot mean its 100% a good change. As another example, think of Instagram; Is any post with more likes necessarily better than any post with less likes?
- Imagine a giant company (let's say Google) depends on a project, and somebody presents a change that is not aligned with Google's goals. Even though that change could be a good change, Google can easily vote against it using its human power: so many good developers that have been already contributing to various projects and gaining reputation. Their votes will take over causing monopoly-dictatorship even on most free open source project platform.
- How would you handle reports of users in such a platform? If a few people report that somebody is trying to ruin a project, or someone is spamming, or being disruptive, misinformation or disinformation, etc...; how would you behave? Manual human intervention means a single person's belief/point-of-view takes precedence, ruining the whole democracy and voting system. And not acting at all could also result in different kind of problem: think of people posting porn everywhere when there is no reporting system in place.

But, is voting the ultimate solution? There should be some other (maybe combinatorial) method that would be more robust for maintaining ownerless projects in a democracy-like environment. Maybe include time: "If after 1 month, number of up votes were at least two times of down votes, merge!"

## Conclusion

What I'm trying to achieve is open source projects that will be active as long as they have contributors; vs. a project being active as long as its maintainer is maintaining it. (Consider TextMate as a bad example). In addition, a well-established project in such a democracy world, will have less/none suddens pivots or vandalism (think of the `left-pad` incidence). Such an **Ownerless Open Source Project** could be easily trusted to rely on.
