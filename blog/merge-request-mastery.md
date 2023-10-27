---
outline: deep
---

# Merge Request Mastery

// TODO: DATE NEEDED

::: info Note
This is a work in progress. Please come back later.
:::

This blog post is about making Merge Requests more "reviewable" and enhancing the value of code reviews.

## Do not mix refactors with your intended changes

Avoid mixing refactors and functional changes. Instead, create a separate merge request for the refactor before the main merge request. Clearly describe why you need this refactor. For instance: "For the task TASK-ID-123, service A cannot be used in component B for reasons 1, 2, and 3".

Separating refactors prevents the reviewer from going through revieing a newly added 20-line function, only to discover later that this function was merely moved from another file. With a separate MR, the reviewer will only check if your "intention of moving" the function is correct, or if everything used in the function will work in its new environment, instead of checking if the logic of the moved function is correct. Because the logic has probably been there for a long time and your merge request has nothing to do with the content of it.

As another example, if you find the name of a variable unpleasant or misleading, cool, make a merge request that renames the variable only. Then, you can rebase your original branch on top of it and use the new variable name, without making your original merge request unnecessarily big and complicated.

This approach makes the review process easier and faster, and the original merge request remains "pure" and "focused".

## Do not mix formatting with your intended changes

Similar to the previous point, avoid including unrelated file formatting with your changes. If you need to format some files, create a merge request that automatically formats "all files". The reviewer doesn't even need to read through the formatting merge request carefully, as you've already described in your merge request description that a tool automatically did this. (and tools can rarely be wrong).

No reviewer wants to sift through 400 lines of diff that only change indentations and replace single quotes with double quotes just to hunt down where the actual change is. (or miss it!)

This approach makes the review process easier and faster, and the original merge request remains "pure" and "focused".

## Minimize the diff

For every change in the MR, ask yourself:

1. What can I do to reduce the diff here?
2. Is this necessary for this MR?
3. Can I separate concerns here to another MR/Task?

If the answer to any of these questions is "yes", you can either create a ticket for that particualr change,forget about it, and not include it in your original MR or quickly create a separate MR and ask your teammates to review it. (and again, forget about it)

This, again, makes the original merge request more "pure" and "focused".

## Separation of concerns

"Separation of concern" does not only apply to codes, components, services, tasks, etc. but also to MRs. Each MR should address one concern: "Fix a bug", "Add a new feature", "Refactor 1 thing", "Re-format the entire code", etc. This is also towards the "Minimize the diff" goal.

## Review your own MR before asking someone else to review it

This is particularly helpful if you've faced and resolved conflicts in your branch. By doing this, you double-check if your changes are applied correctly in the final diff and ensure you don't have unintended changes in your MR.

Make sure you do this self-review in the reviewing platform that you always use to review other people's MRs. Because when you see your MR in those red and green colors and in that UI, you automatically go into your reviewer mode, but for your own MR. You start to see things that you didn't notice when you were authoring the code. You wear your critic glasses.

If your team uses a CI pipeline, ensure all CI checks pass before requesting a review. This can save time for the reviewer and prevent back-and-forth on issues that could be caught automatically by tools.

## Break the task at hand

If you have a big feature, chances are you don't have to deliver it all at once. You can break large tasks into deliverable chunks. Most of the time, even if the stakeholders say "No we can't deliver only a subset of that feature", you can still use a feature flag.

You, as a Software Engineer, should help the management, stakeholders, and scrum master in this regard. Because only You will understand better where concerns are separated or can be separated from a technical point-of-view. They know where we should go, and we know how we should go there.

For example: you are handed with an epic feature Z, and you have a nice plan for it in your mind. You planned to first implement feature A, then refactor service B, then implement Feature C on top of it, and then finally implement the last part that forms the epic feature Z. This beautiful nice plan should not live only in your head. But the whole team should know about it, and it should be reflected in your issue tracking system too. This separation should also find its way into separated MRs. You can deliver each of those chunks separately, be it a sub-feature or a refactor. Only when you are done with the final feature Z, the feature can go "public" and stakeholders are then happy. So these manageable chunks do not live only in your head, but also the reviewers get to review each of those nice small separated MRs easily, instead of dumping the whole epic feature Z in one MR. This also helps you to get feedback on each of those features separately.

The whole idea of breaking things is just for "safer" stuff to be merged. Breaking your feature into smaller features, makes them "safer", because the reviewer gets to review it isolated and can give more "fcused" feedbacks, and there is a smaller scope to test for and fewer things could break.

## Don't panic!

Don't panic. You don't have to postpone starting your task until every diverged MR is reviewed and merged. You can create branches on top of branches. If you need to implement Feature A, but it requires Bug B to be fixed, and to fix Bug B you need to refactor C first, then create Branch C: refactor and put it to review. Create a branch off from branch C, and name it branch B to fix the bug. Branch off from B: Branch A and implement your feature. Do not mix refactor and bugfix with your feature in one MR.

Are you in the middle of implementing the feature and have already pushed 10 commits and now found a bug that needs to be fixed? Then branch off from your main branch, do the bugfix or refactor, and then rebase your branch on top of it. So when the bugfix or refactor branch is merged, you won't have those unrelated changes in your MR anymore.

Did a colleague leave a review on the refactor branch C? No worries, fix the refactor branch C, then rebase branch B on branch C, and then rebase branch A on branch B. If you find this approach overwhelming, you can just do git merge. Some UIs also help you with these. But getting comfortable with git rebase is the cleanest and most logical way to do this.

Also do not be too eager to fix everything on your way. Do you see a badly named variable, a poorly designed function, or a file with corrupted spacing and indentations? You don't need to do it right away in your branch which you created for implementing something else. Each team and project has its way of handling "tasks". You can create a ticket and track it in your issue tracking system (be it JIRA, Trello, Github Projects, even shared TODO Lists). This way the management also knows about what needs to be fixed or refactored and can prioritize this. Sometimes it may not be in the current interest of the company to tackle every technical debt or even fix every bug right away. Even if it is, the managers need to "manage" and know what are you working on and what works need to be done, so they can plan for the future based on "workload", "the amount of time it takes a developer to do a certain task", and "the speed in which they can develop the software at hand". If you took 10 days to get a feature to production, but you've spent 3 days on refactoring, 1 day on fixing an unrelated bug, and takes a reviewer 1 day to review your giant diff, this can be misleading for managers, because:

1. they think such a feature usually takes 10 days to implement, while it does not if you factor out the refactoring and bugfixing.
2. they don't know about bugs that are present in the product, which results in them mitigating the importance of Quality Engineering in the process.

Usually, all you are facing is a badly engineered code, and you would "like" to see it in another way rather than it be blocking you. So creating a branch off of the main branch and doing the change, a refactor or anything else, should give you a green go to continue what you were working on. But again, creating a ticket for that makes it more observable and you can hear your teammates opinions about it. Maybe that refactoring idea you have is not a good one after all or maybe there is a hidden thing about that bad engineered code you missed.

We as Software Engineers always hear the slogan of "leaving a codebase better than you found it", but unnecessary and unrelated changes usually makes the MR unreviewable and the reviewers frustrated. To make your codebase and product better, tracking needed changes in your issue tracking system is the best bet I'd say.

## Clean code!

Yes! Clean Code! This may be too obvious and not necessarily fit in this blog post which is specifically about Merge Requests. But you can't talk about a good merge request and not mention clean coding.

Clean code is crucial. When you're writing code, you understand what's happening. You know why you accessed the index `[0]` of an array and why that `if` statement is checking if the variable is `null`. Or that 20-line long function you wrote, in your mind is separated into 5 different meaningful steps, a neat algorithm; but; the reviewer does not know about that, they have to demystify everything. ?????????/However, the reviewer doesn't know this, so give nameable things a name. Instead of writing `if (user.actionsHistory.at(-1).type ==="undo")`, write `if (lastActionType ==="undo")` or `if (lastUserActionWasUndo)`.

It takes a lot of time and practice to know what things you just know internally, and what things are obvious in the code. One practice that helps is the self-review of the code we talked earlier about. Have you heard the famous UI/UX slogan: "Don't make me think" ("me" refers to users)? It's about your software's UI/UX must be understandable enough for users to be able to understand and flow through it smoothly. The same exists for the MR: Don't make the reviewer think! Instead of writing an inline sort function like `users.sort((user1, user2) => user1.age > user2.age ? 1 : -1)` you can write usersSortedByAgeDescending, or maybe Ascending? Wait a minute...! 🤔 You see? Even I, the author, don't know what the hell that `1` or `-1` means, does it make users sorted as Ascending or Descending? Because I have to correlate it with the greater than sign (`>`) and also I have to know the language's standard library specification by heart.

Also, clean coding refers to leaving comments in necessary places. Note that comments are a very tricky aspect of software development and clean coding. You need to know when you need comments, how much, why you need comments, and when you are using comments just to avoid "fixing/cleaning" something in the code.

For instance, if you have a function that is 20 lines long, and you think it's too long, and you want to refactor it, but you don't have time, you just add a comment on top of it saying "This function is too long, I will refactor it later". This is not a good comment. This is a comment that is trying to avoid a problem in the code. Instead, you can write a comment that explains what the function does, and then refactor it later. This way the reviewer can understand what the function does, and if they think it's too long, they can leave a comment on the MR and ask you to refactor it. This way you can also see if the reviewer thinks the function is too long, or if they think it's too long because they don't understand what it does.

Another sign that you need to add a comment to a section of the code is if the reviewer asks a question about it. If the reviewer asks a question about a section of the code, it means they didn't understand it. So you can either explain it in a comment or improve the code's readability.

There are too many clean coding principles, of course, and too many books, videos, articles, and websites dedicated to clean coding. I left these few examples here specifically about "naming variables" and "commenting in code" because I believe these are what are mostly overlooked.

## Meaningful commits

Again, separation of concerns is not just about the code and services and classes (and MRs), your commits must be separated too. Commit 1: create the new componentA, Commit2: Use ComponentA in ParentComponentB, Commit3: Fix propA in ComponentA, Commit4: Add FeatureC to ComponentA, Commit5: Extract ServiceD from ComponentA to a separate file, Commit6: Refactor.

Make sure your commits are meaningful and separated. This separation in commits helps you more than the reviewer, as it makes your work organized and easy to track.

Also, It may help the reviewer. Sometimes the reviewer may need to understand your thought process, instead of looking at the whole dumped diff, then just looking at the list of commits from oldest to newest, they can see what went on in your head. They may want to review your MR one isolated commit at a time, then skimming through the list, they can safely ignore commits that start with "refactor" or "rename" because they are sure and they trust you didn't do anything besides a refactor in a commit that says "refactor ServiceD out of ComponentA". But they are interested in seeing the "FeatureC in ComponentA" in isolation without looking at the whole diff in that file.

You may need to master your favorite IDE to be able to do this more smoothly: A bad habit I see a lot is doing git add . or any equivalent action in the IDE. IDEs allow you to revert chunks of your code, or stage only some chunks of your current changes for commit.

When you are about to commit your changes locally, review each file one by one, then out of each file, stage the parts only that fit together in one commit. When you have a lot of changes locally, chances are you can create more than one commit out of them. For instance, you notice in one file you have created a new service, and in 3 different files you have used that service, and in 2 of them, you have also changed styles based on your new feature/requirements. Then you can stage the created service separately as "Create X Service", then another commit can be "Use service X in Components A, B & C", (note that you don't stage and commit the style changes here), and then in another commit: "update styles according to the new design"

## Use the description field when creating merge requests

Make sure you include descriptions with your MR as much as possible, if applicable. If a task is assigned to you, the description of the task is some sort of business description that everyone understands. But sometimes the MRs need more technical clarification, for instance: "In this refactor MR I renamed variableA to VariableB because it more resembles what it holds, because this variable holds B, and A is a subset of B.". You can also include a bullet list to describe the reason of different changes in your MR. Note that this is also tricky like comments. Always consider: "If I'm writing a description for the merge request, then only the reviewer gets to read it. But is this description something that all the team should be aware of?" And if the answer is "yes", then most probably what you are writing as description should live inside the code as a comment.

Code reviewers are humans, not rendering engines. If you added/changed a piece of code that contains a lot of styling changes, like `width: 280px; height: calc(100% - 20px); align-items: center; z-index: 2;` include a screenshot with the changed result. Or even better, setup a continuous deployment in your workflow to create a preview app out of every MR. So the reviewer can lunch the software that includes your changes with 1 click. 

Also, if you are using a tracking system like JIRA, you can include the link to the task in the description. This way the reviewer can quickly jump to the task and see what the task is about, what the stakeholders said about this task, what the acceptance criteria are, etc.

## Resolving comments on the MRs

Do not resolve the comments in the MR if you are not the author of the comment. Leave it for the author of the comment to resolve it. If you think you have resolved the comment, the best thing to do is to leave a note: "Thanks, Done!" preferably with a link to the commit that solves the requested change. This way the reviewer gets a chance to double-check the comment, make sure you understood the comment correctly, review the new change, and if all was good, they can resolve the comment, or, they can continue requesting changes or asking questions in the thread.

The big downside of resolving the comments if you are not the author of the comment is the author must come back, expand all resolved comments (because most UIs collapse the resolved comments), and make sure you've done them in the right way and check if you've replied to any of them. If they find one change request that was resolved incorrectly or the comment they want to add more to it or ask questions, they need to unresolve the comment first, and then continue on the thread. They do, and then you come again, read all comments, fix or reply to them, then you resolve them all again. If the comment author comes back, they don't know where they were in their review process. The comments say "Resolved by Someone". They have to go through the process of opening all the resolved comments again to find out where there is a conversation that needs to be carried on.

Resolving comments is the right of the comment author (usually the reviewer) to be able to track their review. So if next time they see a comment is marked as "Resolved by Someone" and that Someone is the author of the comment themselves, they know it's all good then and can pass over that without expanding it. Then one time they resolve a comment, they notice now all comments are resolved, and if all comments are resolved and all files are viewed, means the MR can be approved. ✅

The term "resolved" means that both the author of the merge request and the author of the comment have come to a conclusion and agree to the current state of the code. 👍 Well, the author of the MR always agrees to the current state of the code, if they did not, they would have done it better. So only if the comment author also agrees to the outcome of the conversation, then and only then it means the comment/thread is "resolved"! ✅

One trick I use when someone else has resolved my comment, is I unresolve it first, check it, and if all was good, I resolve it again, just so that the next time it says that this comment is resolved by me. ✅ And I don't know I don't need to expand it.

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

You can also [contact me on my LinkedIn profile](https://www.linkedin.com/in/ardeshir-izadi/).

Thanks for reading! ❤️
