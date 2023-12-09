---
outline: deep
---

# Merge Request Mastery

::: info Note
This is a work in progress. Please come back later.
:::

This blog post is about making Merge Requests more "reviewable" and enhancing the value of code reviews. First I provide a TLDR version so you know the context of each point. Then I'll dive deep into each of them, with the philosophy behind it and my takes.

TLDR:
For a good MR:

- Minimize the diff
  - Break the task
  - Extract out refactors
  - Extract out formattings
  - Don't fix everything in your way (unrelated stuff)
  - Review your own MR before asking anyone else to review
- Make sure CI passes
- Choose meaningful commit messages
- Write a description for the MR (including media when needed)
- Let the comment authors resolve their comment

- [**Minimize the diff**](#minimize-the-diff): Simplify your changes by asking yourself if you can make them smaller or complete your task without certain changes. Create separate tasks for additional changes that don't belong to the concern of your MR, ensuring each merge request stays focused on one concern, such as fixing a bug or adding a feature.
- [**Break the task**](#break-the-task): Break down big features into smaller, **deliverable** parts. Share your plan with the team, use feature flags if needed, and create separate merge requests for each piece. This makes reviews faster, feedback more focused and useful, and the merging process **safer**.
- [**Extract refactors into a separate MR**](#do-not-mix-refactors-with-your-intended-changes): Keep refactors and functional changes separate. Make a different merge request for each refactor, explaining why it's needed. This makes the review process of the original merge request focused and uncomplicated.
- [**Extract formatting into a separate MR**](#do-not-mix-formatting-with-your-intended-changes): Don't mix unnecessary formatting changes with your main updates. If formatting is needed, create a separate branch that formats **all** files of the project. This also makes the original MR less complicated.
- [**Don't fix everything**](#todo): Don't be eager to fix every problem or clean up every piece of code on your way. The best you can do is to create a ticket in your issue-tracking system when you see a problem (either functional or technical). Prioritize and decide about it with the team.
- [**Review your own MR before asking someone else to review it**](#review-your-own-mr-before-asking-someone-else-to-review-it): To do this, make sure to use the reviewing platform you always use to review other's MRs.
- [**Make sure CI passes**](#TODO): It helps save time to catch issues that can be caught automatically by tools rather than a manual review by a teammate.
- [**Meaningful commits**](#meaningful-commits): Make commits meaningful and separate. Use your IDE to stage specific and related changes together, keeping things focused. Write concise commit messages and MR titles. If you can't make your commit message concise, it **may** be a sign your MR/Commit is doing more than one thing and should be broken into separate ones.
- [**Use the description field**](#use-the-description-field-when-creating-merge-requests): Use the description field for technical details or clarifications. And remember it is only for the reviewers of the MR, not the whole team or other developers who need to read the codebase. Include screenshots when needed (for styling changes). Include a link to the task if you're using an issue-tracking system.
- [**Resolving comments on the MRs**](#resolving-comments-on-the-mrs-todo-make-the-title-of-this-part-better-like-on-comments-commenting-or-about-comments): Leave comments for the author of the comment to resolve. If you address one, reply to it (including a commit link if applicable). Don't resolve comments if you're not the author. If someone else resolves your comment, unresolve it first to verify and then resolve it again, so you know which ones are "really" resolved.

## Minimize the diff

For every change you are about to do in your branch, ask yourself:

1. Can I reduce the diff here?
2. Can my task be considered done without what I'm currently doing?
3. Can I separate concerns here to another MR/Task?
4. Are the changes I'm currently doing related to the other changes I was doing before it?

If the answer to any of these questions is "yes", you can either create a ticket for that particular change and forget about it in your branch or quickly create a separate MR out of the **main** branch and ask your teammates to review it. (and again, forget about it)

This makes the original merge request more "pure" and "focused".

"Separation of concerns" does not **only** apply to codes, components, services, files, and tasks. But also to MRs. Each MR should address one concern: "Fix a bug", "Add a new feature", "Refactor 1 thing", "Re-format the entire code", etc.

### Break the task at hand

If you have a big feature, chances are you don't have to deliver it all at once. You can break large tasks into **deliverable** chunks. Most of the time, even if the stakeholders say "No we can't deliver only a subset of that feature", you can still use a feature flag to ease the development and deployment process of an epic feature. Delivering in small chunks also makes the deployment "safer": fewer things could break.

You, as a Software Engineer, should help the management, stakeholders, and scrum master in this regard. Because only You will understand better where concerns can and should be separated from a technical point-of-view.

Sometimes we, software developers, have a perfect plan in mind for breaking big stuff into smaller chunks. But this plan should not be only in our heads. We should communicate it with the team and reflect it in our issue-tracking system and our branching and finally in the merge requests.

The whole idea of breaking things is just for "safer" stuff to be merged. Because with breaking the task, the reviewer can give more "focused" feedback, there is a smaller scope to test for and fewer things could break.

### Extract refactors into a separate MR

Avoid mixing refactors and functional changes. Instead, create a separate merge request for the needed refactors before the main merge request. Make sure to clearly describe why you need this refactor.

Separating refactors prevents the reviewer from going through reviewing a newly added 20-line long function, only to discover later that this function was merely moved from another file. With a separate MR intended only for a refactor, in this example, the reviewer will only check if your "intention of moving the function to another file" is correct, or if everything used in the function will work in its new environment, rather than inspecting closely if the logic of the moved function is correct. Because the logic has probably been there for a long time and your merge request has nothing to do with the logic behind it.

As another example, if you find the name of a variable unpleasant or misleading, cool, make a merge request that renames the variable only. Then, you can rebase your original branch on top of it and use the new variable name, without making your original merge request unnecessarily big and complicated. So the reviewer can only check one thing: if "the new variable name truly represents what it holds".

This approach makes the review process of both the refactor MR and the original MR easier and faster, and the original merge request remains "pure" and "focused".

### Extract formattings into a separate MR

Similar to the previous point, avoid including unrelated file formatting with your changes. If you need to format some files, create a branch out of the **main** branch that automatically formats **all** files. The reviewer doesn't even need to read through the formatting merge request carefully, as you've already described in your merge request that "this MR is only code formatting" and most probably a tool automatically did this and tools are **rarely** wrong. (tools being prettier, eslint, etc...)

No reviewer wants to sift through 400 lines of diff that only changes indentations and replaces single quotes with double quotes just to hunt down where the actual change is. (or miss it!)

This approach also, makes review easier, faster, more "pure" and "focused".

### Don't fix everything

From time to time we try to "leave the codebase better than we found it". Sometimes you see a badly named variable, a poorly designed function, or a file with corrupted spacing and indentations and you want to just fix it on your way. Although that sounds good, it adds unnecessary complications for the reviewer and is probably unrelated to what your branch is about. If something needs to be fixed, it could become a ticket in your issue-tracking system. Either a "technical story" or a "user story".

Another good advantage of leaving stuff for the issue-tracking system is the observability it gets from everyone. If you just fix something on your way, no one will ever know the amount of bugs and regressions the software has. Or if you refactor stuff on the way and make it better, no one will ever know the amount of technical debt the software has.

If you fix everything on the way all that is observed from outside is tasks taking unnecessarily longer than expected.

Another disadvantage of fixing stuff on your way is others don't know how much bug the software has and hence they may neglect the importance of quality engineering.

### Review your own MR before asking someone else to review it

By doing this, you double-check if your changes are applied correctly in the final diff and ensure you don't have unintended changes in your MR. It happens that we stage and commit changes by mistake, like an unnecessary logger, or a change we experimented with but forgot to revert it. This self-review is especially useful if you've faced and resolved conflicts.

Do this self-review in the reviewing platform you always use to review other people's MRs. Because when you see your MR in those red and green colors and in that UI, you automatically go into your reviewer mode, but for your own MR. You start to see things that you didn't notice when you were authoring the code. You wear your critic glasses for your code. Self-review helps a lot in delivering better code!

### Make sure CI passes

If your team/repo uses a CI pipeline, ensure all CI checks pass before requesting a review. This can save time for the reviewer and prevent unnecessary back-and-forth conversations on issues that could be caught automatically by tools.

## Meaningful commits

Again, "separation of concerns" is not just about the code and services and classes (and MRs). Your commits should be separated and independent too.

Separation in commits helps **you** more than the reviewer, as it makes your work organized and easy to track. Especially the more small chunks of the changes you stage and commit away, the more focused you will be on what you are doing now. Your working tree won't be cluttered with all sorts of changes. The same goes for your mind and thoughts.

Also, It may help the reviewer. Sometimes the reviewer may need to understand your thought process, instead of looking at the whole dumped diff. Just looking at the list of commits from oldest to newest, they can see what went on in your head. They may want to review your MR one isolated commit at a time. Then skimming through the list, they can safely ignore commits based on their commit message if they know the context.

In most IDEs, there are tools to help do this more smoothly. IDEs allow you to revert chunks of your changes, or stage only chunks of your current changes to commit later. A bad habit is to `git add .` or any equivalent action in your IDE.

When you are about to commit your changes locally, review each file one by one, then out of each file, stage the parts that fit together in one commit. When you have a lot of changes locally, chances are you can create more than one commit out of them.

Also, try to describe what you did in a commit in 1 concise line. If you can't, then it probably means something should be separated into another commit. The same is true about the MR title. If you can't describe in 1 concise line what you did in your MR, most probably it is a sign that some part of it could be separated into another task/MR.

## Describe the MR for the reviewer

Make sure you include descriptions with your MR as much as possible, if applicable. If a ticket is assigned to you, the description of the ticket in your issue-tracking system is some sort of business description that everyone understands, including non-technical people on your team. But sometimes the MRs need more technical clarifications, specifically for the person who is reviewing your code. Try using bullet lists and images when necessary to make reading the description easier.

There is a tricky part to it though. Always consider: "If I'm writing a description for the merge request, then **only** the reviewer gets to read it. But is this description something that all the team should be aware of?" And if the answer is "yes", then what you are writing as a description should live inside the code. Either by comments in code or by using proper variable naming and clean-coding techniques. So everyone who reads the code knows about what you had to say.

As another consideration, note that code reviewers are humans, not rendering engines! If you added/changed a piece of code that contains a lot of styling changes, include a screenshot with the changed result. Some teams have continuous deployments that deploy a short-lived app out of every MR. If you do, also include a link for the preview app so the reviewer can interact with your changes and test them in action.

If you are using an issue-tracking system like JIRA, you can include the link to the task in the description. This way the reviewer can quickly jump to the task and see what the task is about, what the stakeholders said about this task, and what the acceptance criteria are. The more the reviewer knows about your changes, the better they can review, and the result is "safer" changes. Robust features and changes that don't break other stuff. 💪

## Comments

Leave the "Resolve" button on comments for the author of the comment. If you think you have addressed a comment, the best thing to do is to leave a note: "Thanks, Done!" preferably with a link to the commit that solves the requested change if there is one. Or if not applicable, just reply to the comment and answer if there are any questions: why you did what you did, and leave it unresolved for them to come back and read the replies on their comments. This way the reviewer gets a chance to double-check the comment, make sure you understood the comment correctly, review the new change, and if all was good, they can resolve the comment, or, they can continue requesting changes or asking follow-up questions in the thread of the comment.

If anyone else resolves the reviewer's comment, they never know the conclusion on a question/request they had in their mind. The review process is not a one-time thing. It's more of a back-and-forth communication. Reviewers can use the "resolving" of the comments as a way to track their review. Then one time they resolve a comment, they notice now all comments are resolved, and they are resolved by themselves, and if all comments are resolved and all files are viewed, it means the MR can be approved. ✅

The term "resolved" means that both the author of the merge request and the author of the comment have come to a conclusion and agree to the current state of the code. 👍 Well, the author of the MR always agrees to the current state of the code, if they did not, they would have done it differently. So only if the comment author also agrees to the outcome of the conversation, then and only then does it mean the comment/thread is "resolved"! ✅

As a reviewer, one trick I use when someone else has resolved my comment, is I unresolve it first, check it, and if all is good, I resolve it again, just so that the next time it says this comment is resolved by me. And I know I don't need to expand it again.

Another good consideration related to comments is if the reviewer asks a question about a piece of code, in addition to replying to the comment, consider if that reply needs to live inside the code as well. If the reviewer does not understand one part easily and asks questions about it, chances are other teammates won't understand that particular piece of code too. So in addition to replying in the comment thread, consider improving the code readability or adding a comment to the code so everyone understands it and not only the reviewer.

## Final words

An exhausted reviewer may overlook things, get lost in reviewing, take longer to review, or misunderstand the intentions. The resulting software will either be of poor quality or will have lots of technical debt. The guidelines above help make the reviewer's life easier, and in return, we receive better software through better peer reviews. 💪 The ultimate purpose of a good MR and a good review is to be able to deploy "safer" code, and keep the maintainability of the software at a very good level.

Not all of these considerations necessarily can be applied at the same time though. All these considerations describe "perfection". And our goal is not to reach perfection, but to constantly move towards it. Just having the perfect in mind makes us better and better with each journey.

And, most importantly this is **my** version of "perfection". You can draw **your** perfection based on your metrics, e.g. how fast you want a feature, team culture, the way the team communicates, how discussions look like usually in an MR, etc... That's having **your** version of "perfection". Or even better: your **team**'s version of perfection

Feel free to use any of my suggestions above though. Or share with me if you have anything you are proud of.

Unfortunately, my blog does not have a comment section, but you can [open an issue or a discussion on GitHub](https://github.com/aghArdeshir/aghardeshir.github.io/) if you have anything to share, any idea, question, disagreement, or want to contribute to this blog post in any other way.

Thanks for reading! ❤️

// search for "TODO"s and Question makrs ("?") in the text, maybe I left some somewhere and forgot about it
//
// TODO: make all the words with underlines, either using 1 underline, or 2 underlines.
// right now some of them have 1 underline and some have 2

// TODO: Make sure the titles are correct, and their links also sound correct, and wherever linking to some parts of the app, the links are also correct.
// TODO: we have 3 different sections that contain the same titles again and again: the first TLDR, that one-lie/one-paragraph description of each point, and then the deep dive. Make sure they are share the same title and the same link and the same .
