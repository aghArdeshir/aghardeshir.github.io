---
outline: deep
---

# Merge Request Mastery

::: info Note
This is a work in progress. Please come back later.
:::

This blog post is about making Merge Requests more "reviewable" and enhancing the value of code reviews. First I provide a TLDR version so you know the context of each point. Then I'll dive deep into each of them, with examples???? and philosophy behind it and my personal takes.

TLDR:
For a good MR:
- Minimize the diff
  - break the task
  - extract out refactors
  - extract out formattings
  - don't fix everything
  - Review your own MR before asking anyone else (to make sure you only have related changes)
- meaningful commits (see good commit convetions from good repositories on GitHub)
- meaningful description (including media when needed)
- let the comment author resolve comments

- [**Minimize the diff**](#minimize-the-diff): Simplify your changes by asking yourself if you can make them smaller or complete your task without certain changes. Create separate tasks for additional changes, ensuring each merge request stays focused on one concern, such as fixing a bug or adding a feature.
- [**Break the task at hand**](#break-the-task-at-hand): Break down big features into smaller, __deliverable__ parts. Share your plan with the team, use feature flags if needed, and create separate merge requests for each piece. This makes reviews faster, feedbacks more focused, and the merging process __safer__.
- [**Extract out refactors into a separate MR**](#do-not-mix-refactors-with-your-intended-changes): Keep refactors and functional changes separate. Make a different merge request for each refactor, explaining why it's needed. This makes the review process of the original merge request focused and uncomplicated.
- [**Extract out formattings into a separate MR**](#do-not-mix-formatting-with-your-intended-changes): Don't mix formatting changes with your main updates. If formatting is needed, create a separate branch that formats __all__ files. This also makes the original MR less complicated.
- [**Dont fix everything**](#todo): Don't be eager to fix every problem or clean up every piece of code on your way. Best you can do is to create a ticket in your issue tracking system. Prioritize and decide about it with the team.
- [**Review your own MR before asking someone else to review it**](#review-your-own-mr-before-asking-someone-else-to-review-it): Specially use the reviewing platform you always use to review other's MRs. Also ensure all CI checks pass to save time. Some problems can be catched using static checks only.
- [**Make sure CI passes**](#TODO): Because it helps save time to catch issues that can be catched automatically by tools rather than a human manual review.
- [**Meaningful commits**](#meaningful-commits): Make commits meaningful and separate. Use your IDE to stage specific and related changes separately, keeping things focused. Write concise commit messages and MR titles. If you can't, it __may__ be a sign your MR is doing more that one thing and should be broken into separate ones.
- [**Use the description field**](#use-the-description-field-when-creating-merge-requests): Use the MR description for technical details or clarifications. And remember it is only for reviewers, not the whole team. Include screenshots when needed, like for styling changes and add the task link if you're using an issue tracking system.
- [**Resolving comments on the MRs**](#resolving-comments-on-the-mrs-todo-make-the-title-of-this-part-better-like-on-comments-commenting-or-about-comments): Leave comments for the author of the comment to resolve. If you address one, reply to it (including a commit link if applicable). Don't resolve comments if you're not the author. If someone else resolves your comment, unresolve it first to verify and then resolve it again, so you know which ones are "really" reslved.

// TODO: What do I do with things below?
- [**Final words**](#final-words): Ignoring these may make reviews harder, leading to worse software or more technical issues. Remember these tips for improvement, adjust for your team, and aim for better code and easier maintenance.
- [**Don't panic!**](#don-t-panic): Stay calm, start your task without waiting for all reviews. Create branches for dependencies and fix bugs separately. If you find issues, make a ticket instead of fixing immediately. This helps manage workload and priorities, keeping your MR focused for easier reviews.
- [**Clean code!**](#clean-code): Create a neat merge request with clean code. Use clear variable names, simplify logic, and follow the "Don't make me think" principle. Add comments only when necessary to enhance code readability.

## Minimize the diff

For every change you are about to do in your branch, ask yourself:

1. Can I reduce the diff here?
2. Can my task be considered done without what I'm currently doing?
3. Can I separate concerns here to another MR/Task?

If the answer to any of these questions is "yes", you can either create a ticket for that particualr change, and forget about it in your branch or quickly create a separate MR out of the __main__ branch and ask your teammates to review it. (and again, forget about it)

This makes the original merge request more "pure" and "focused".

"Separation of concern" does not __only__ apply to codes, components, services, files and tasks. But also to MRs. Each MR should address one concern: "Fix a bug", "Add a new feature", "Refactor 1 thing", "Re-format the entire code", etc.

### Break the task at hand

If you have a big feature, chances are you don't have to deliver it all at once. You can break large tasks into __deliverable__ chunks. Most of the time, even if the stakeholders say "No we can't deliver only a subset of that feature", you can still use a feature flag to ease the development process of an epic feature.

You, as a Software Engineer, should help the management, stakeholders, and scrum master in this regard. Because only You will understand better where concerns can and should be separated from a technical point-of-view.

Sometimes we, software developers, have a perfect plan in mind for breaking big stuff into smaller chunks. But this plan should not leave only in our head. We should communicated it with the team and reflect it in our issue tracking system and in our branching + MR.

The whole idea of breaking things is just for "safer" stuff to be merged. Because with breaking the task, reviewer can give more "focused" feedbacks, and there is a smaller scope to test for and fewer things could break.

### Extract out refactors into a separate MR

Avoid mixing refactors and functional changes. Instead, create a separate merge request for the needed refactors before the main merge request. Make sure to clearly describe why you need this refactor.

Separating refactors prevents the reviewer from going through reviewing a newly added 20-lines long function, only to discover later that this function was merely moved from another file. With a separate MR, in this example the reviewer will only check if your "intention of moving" the function is correct, or if everything used in the function will work in its new environment, rather than inspecting closely if the logic of the moved function is correct. Because the logic has probably been there for a long time and your merge request has nothing to do with the logic behind it.

As another example, if you find the name of a variable unpleasant or misleading, cool, make a merge request that renames the variable only. Then, you can rebase your original branch on top of it and use the new variable name, without making your original merge request unnecessarily big and complicated.

This approach makes the review process easier and faster, and the original merge request remains "pure" and "focused".

### Extract out formattings into a separate MR

Similar to the previous point, avoid including unrelated file formatting with your changes. If you need to format some files, create a branch out of the __main__ branch that automatically formats __all__ files. The reviewer doesn't even need to read through the formatting merge request carefully, as you've already described in your merge request description that a tool automatically did this and tools are _almost_ never wrong. (tools being prettier, eslint, etc...)

No reviewer wants to sift through 400 lines of diff that only changes indentations and replaces single quotes with double quotes just to hunt down where the actual change is. (or miss it!)

This approach also, makes review easier, faster, more pure and more focused.

### Don't fix everything

From time to time we try to "leave the codebase better than we found it". Although that sounds good, it adds unnecessary complications for the reviewer. If something needs to be better, it could become a ticket in your issue tracking system. Most probably it should be a "techincal story" rather than a user story if it is about codebase only.

### Review your own MR before asking someone else to review it

By doing this, you double-check if your changes are applied correctly in the final diff and ensure you don't have unintended changes in your MR. It happens that we stage and commit changes by mistake, like an unnecessary logger, of a change we experimented with, but forgot to revert it at the end.

Do this self-review in the reviewing platform that you always use to review other people's MRs. Because when you see your MR in those red and green colors and in that UI, you automatically go into your reviewer-mode, but for your own MR. You start to see things that you didn't notice when you were authoring the code. You wear your critic glasses, but for your own code. This self-review helps a lot!

### Make sure CI passes

If your team/repo uses a CI pipeline, ensure all CI checks pass before requesting a review. This can save time for the reviewer and prevent back-and-forth converstaions on issues that could be caught automatically by tools.

## Meaningful commits

Again, separation of concerns is not just about the code and services and classes (and MRs). Your commits should be separated and independent too.

Separation in commits helps __you__ more than the reviewer, as it makes your work organized and easy to track. Especially the more small chunks of the changes you stage and commit away, the more focused you will be on what you are doing now. Your working tree won't be cluttered with all sorts of changes.

Also, It may help the reviewer. Sometimes the reviewer may need to understand your thought process, instead of looking at the whole dumped diff. Just looking at the list of commits from oldest to newest, they can see what went on in your head. They may want to review your MR one isolated commit at a time, then skimming through the list, they can safely ignore commits based on their commit message if they know the context.

You may need to master your favorite IDE to be able to do this more smoothly. A bad habit I see a lot is doing `git add .` or any equivalent action in the IDE. IDEs allow you to revert chunks of your changes, or stage only chunks of your current changes to later commit. These helpers help a lot with uncluttering your brain.

When you are about to commit your changes locally, review each file one by one, then out of each file, stage the parts that fit together in one commit. When you have a lot of changes locally, chances are you can create more than one commit out of them.

Also, try to describe what you did in a commit in 1 short line. If you can't, then it probably means something should be separated into another commit. The same is true about the MR title! If you cna't describe in 1 short line what you did in your MR, most probably it is a sign that some part of it could be separated into another task/MR.

## Use the description field when creating merge requests

Make sure you include descriptions with your MR as much as possible, if applicable. If a ticket is assigned to you, the description of the ticket in your issue tracking system is some sort of business description that everyone understands, including non-technical ones on your team. But sometimes the MRs need more technical clarifications, specifically for the person who is reviewing your code. Try using bullet lists and images when applicable to make reading the description easier.

Note that there is a tricky part to it. Always consider: "If I'm writing a description for the merge request, then only the reviewer gets to read it. But is this description something that all the team should be aware of?" And if the answer is "yes", then most probably what you are writing as description should live inside the code. Either by comments or by using proper naming and clean-coding techinques so everyone who reads the code knows about it. 

As another consideration, note that code reviewers are humans, not rendering engines. If you added/changed a piece of code that contains a lot of styling changes, include a screenshot with the changed result. Some teams have continuos deployments that deploy a short-lived app out of every MR. If you do, also include a link for the preview app so the reviewer can interact with your changes and test it in action.

Also, if you are using a tracking system like JIRA, you can include the link to the task in the description. This way the reviewer can quickly jump to the task and see what the task is about, what the stakeholders said about this task and what the acceptance criteria are. The more the reviewer knows about your changes, the better they can review, and the result is "safer" changes. Changes that don't break easily.

## Resolving comments on the MRs (TODO: make the title of this part better, like "on comments", "commenting", or "about comments")

Leave the "Resolve" button on comments for the author of the comment. If you think you have addressed a comment, the best thing to do is to leave a note: "Thanks, Done!" preferably with a link to the commit that solves the requested change if there is one. Or if not applicable, just reply to the comment why you did what you did, and leave it unresolved for them to come back and read the replies on their comments. This way the reviewer gets a chance to double-check the comment, make sure you understood the comment correctly, review the new change, and if all was good, they can resolve the comment, or, they can continue requesting changes or asking questions in the thread of the comment.

The big downside of resolving the comments if you are not the author of the comment is the author must come back, expand all resolved comments (because most UIs collapse the resolved comments), and make sure you've done them in the right way or check if you've replied to any of them. In case they find one that was resolved incorrectly or they simply want to continue discussion on one comment, they need to unresolve the comment first, and then continue on the thread. This makes them hard for the reviewer to know where they were in their review process. As the review is not a one-time thing, and is more of a back-and-forth communication, continuing reviewers can use the resolving of the comments as a tool to track their review.

Resolving comments is the right of the comment author (usually the reviewer) to be able to track their review. Then one time they resolve a comment, they notice now all comments are resolved, and they are resolved by themselves, and if all comments are resolved and all files are viewed, it means the MR can be approved. ✅

The term "resolved" means that both the author of the merge request and the author of the comment have come to a conclusion and agree to the current state of the code. 👍 Well, the author of the MR always agrees to the current state of the code, if they did not, they would have done it in a different way. So only if the comment author also agrees to the outcome of the conversation, then and only then it means the comment/thread is "resolved"! ✅

One trick I use when someone else has resolved my comment, is I unresolve it first, check it, and if all was good, I resolve it again, just so that the next time it says this comment is resolved by me. ✅ And know I don't need to expand it.


// TODO: SHould I remove everything below this?

## Don't panic!

Don't panic. You don't have to postpone starting your task until every diverged MR is reviewed and merged. You can create branches on top of branches. If you need to implement Feature A, but it requires Bug B to be fixed, and to fix Bug B you need to refactor C first, then create Branch C: refactor and put it to review. Create a branch off from branch C, and name it branch B to fix the bug. Branch off from B: Branch A and implement your feature. Do not mix refactors and bugfixes with your feature implementation in one MR.

Are you in the middle of implementing the feature and have already pushed 10 commits and now found a bug that needs to be fixed? Then branch off from your _main_ branch, do the bugfix or refactor, and then rebase your branch on top of it (or wait for it to be merged if you are not blocked, and then rebase on your _main_ branch). So you won't have those unrelated changes in your MR anymore.

Did a colleague leave a review on the refactor branch C? No worries, push the changes to refactor branch C, then rebase branch B on branch C, and then rebase branch A on branch B. If you find this approach overwhelming, you can just do git merge. Some UIs also help you with these. But doing `git rebase` is the cleanest and most logical way to do this (in my opinion).

Plus, do not be too eager to fix everything on your way. Do you see a badly named variable, a poorly designed function, or a file with corrupted spacing and indentations? You don't need to do it right away in your branch, because it would be unrelated to what you are doing. Each team and project has their way of handling "tasks". You can create a ticket and track it in your issue tracking system (be it JIRA, Trello, Github Projects, even shared TODO Lists). This way the management also knows about what needs to be fixed or refactored and can prioritize this. Sometimes it may not be in the current interest of the company to tackle every technical debt or even fix every bug right away. Even if it is, the managers need to "manage" and know what are you working on and what works need to be done. Because they need to plan for the future based on "workload", "the amount of time it takes a developer to do a certain task", and "the speed in which they can develop the software at hand". If you took 10 days to get a feature to production, but you've spent 3 days on refactoring stuff, 1 day on fixing a bug on your way, and takes a reviewer 1 day to review your giant diff, this can be misleading for managers, because:

1. they think such a feature usually takes 10 days to implement, while it does not if you factor out the refactor and the bugfix (and the amount of time those two add to the review process).
2. they don't know about bugs that are present in the product, which results in them mitigating the importance of Quality Engineering in the process. (which wouldn't happen if you've reported bugs you faced)

Usually, all you are facing is a badly engineered code, and you would "like" to see it in another way rather than it be blocking you. So creating a branch off of the main branch and doing the change, a refactor or anything else, should give you a green go to continue what you were working on. But again, creating a ticket for that makes it more observable and you can hear your teammates opinions about it. Maybe that refactoring idea you have is not a good one after all or maybe there is a _hidden thing_ about that bad engineered code you missed.

We as Software Engineers always hear the slogan of "leaving a codebase better than you found it", but unnecessary and unrelated changes usually makes the MR unreviewable and the reviewers frustrated. To make your codebase and product better, tracking needed changes in your issue tracking system is the best bet I'd say.

## Clean code!

Yes! Clean Code! This may be too obvious and not necessarily fit in this blog post which is specifically about Merge Requests. But you can't talk about a good merge request and not mention clean coding!

Clean code is crucial. When you're writing code, you understand what's happening. You know why you accessed the index `[0]` of an array and why that `if` statement is checking if the variable compares to `null`. Or that 20-line long function you wrote, is separated into 5 different meaningful steps in your mind, a neat algorithm! But; the reviewer does not know about that. They have to demystify everything. So make it clean: give nameable things a name. Instead of writing `if (user.actionsHistory.at(-1).type ==="undo")`, write `if (lastActionType ==="undo")` or `if (lastUserActionWasUndo)`.

It takes a lot of time, practice, consideration and consciousness to know what things you just know internally, and what things are obvious in the code. One practice that helps is the self-review of the code we talked earlier about. Have you heard the famous UI/UX slogan: "Don't make me think" ("me" refers to users)? It's about your software's UI/UX must be understandable enough for users to be able to understand and flow through it smoothly. The same exists for the MR: Don't make the reviewer think! Instead of writing an inline sort function like `users.sort((user1, user2) => user1.age > user2.age ? 1 : -1)` you can name it `usersSortedByAgeDescending` and use the variable insteaf, or maybe `Ascending`? Wait a minute...! 🤔 You see? Even I, the author, don't know what the hell that `1` or `-1` means. Does it make users sorted as Ascending or Descending? Because I have to correlate it with the greater than sign (`>`) and also I have to know the language's standard library specification by heart.

In addition to that, clean coding refers to leaving comments in necessary places. Note that comments are a very tricky aspect of software development and clean coding. You need to know when you need comments, how much you need them, why you need comments, and when you are using comments just to avoid "fixing/cleaning" something in the code.

A sign that you need to add a comment to a section of the code is if the reviewer asks a question about it. If the reviewer asks a question about a section of the code, it means they didn't understand it. So you can either explain it in a comment or improve the code's readability. Don't just reply back in the thread. Put the comment in the code. If its a question for reviewer, its a question for everyone.

There are too many clean coding principles, of course, and too many books, videos, articles, and websites dedicated to clean coding. I left these few examples here specifically about "naming variables" and "commenting in code" because I believe these are what are mostly overlooked.




## Final words

Not caring about any of the notes above will exhaust the reviewer.
An exhausted reviewer may overlook things, get lost in reviewing, take longer to review, or misunderstand the intentions.
And the resulting software will either be of poor quality or will have lots of technical debts.

Also not all of these considerations can be applied at the same time.
All these considerations describe a "perfection", if you can remember consciously to do them all, then bravo!
But if not, also don't worry, just having the perfect in mind makes us get better and better with each journey.
And, most importantly this is _my_ version of "perfection".
You can decide based on your trade-offs (e.g. how fast you want a feature), team culture, discussions in the MR, etc... and have _your_ own version of "perfection".
Feel free to use any of my suggestions though.
The ultimate purpose of a good MR and a good review is to be able to deploy "safer" code, and keep the maintainability of the software at hand at a good level.

Unfortunately, my blog does not have a comment section, but you can [open an issue or a discussion on GitHub](https://github.com/aghArdeshir/aghardeshir.github.io/) if you have anything to share, any idea, question, disagreement, or just want to contribute to this blog post.

Thanks for reading! ❤️

// TODO: Ronald's feedback:
// you should include a little bullet list with 1 to 2 sentences description of each point
// and then start deep diving into each of them.
// So they know what is going on
//
//
// search for "TODO"s and Question makrs ("?") in the text, maybe I left some somewhere and forgot about it
// 
// TODO: make all the words with underlines, either using 1 underline, or 2 underlines.
//       right now some of them have 1 underline and some have 2
