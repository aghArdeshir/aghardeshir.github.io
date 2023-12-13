---
outline: deep
---

# 🎓 Merge Request Mastery

<p class="subheading">A guide to create better Merge Requests for more effective code reviews</p>

Merge Requests (MRs) are a way to allow collaboration on a codebase and make sure the code is up to the decided standards and readable by everyone. This blog post is about making Merge Requests more reviewable and enhancing the quality and value of code reviews. A good merge request is essential because it allows more in-depth discussion about important parts and the result would be better code and better software. My goal in this blog post is to share with you what makes a good MR. A good MR takes form while the branch is in development. There are some things we need to take into consideration constantly while developing the branch to improve quality of our MRs.

First I provide a short listed explanation so you know the context of each point. Then I'll dive deep into each of them, with the philosophy behind it and my takes.

## 📌 TLDR {#tldr}

::: details Super-short TLDR
For a good MR:

- 🔍 Minimize the diff
  - 🪓 Break the task at hand
  - 🔧 Extract out refactors to separate MRs
  - 📏 Extract out formattings to separate MRs
  - 🚧 Don't fix everything (unrelated stuff) on your way
  - 🕵️ Review your own MR before asking anyone else to review it
- ✅ Make sure CI passes
- 📝 Choose meaningful commit messages
- 📋 Write a description for the MR (including media when needed)
- 🗨️ Let the comment authors resolve their own comment
- 🎯 Create your own version of perfection
  :::

- [**🔍 Minimize the diff**](#minimize-the-diff): Simplify your changes by asking yourself if you can make them smaller or complete your task without certain changes. Create separate tasks for additional changes that don't belong to the concern of your MR, ensuring each Merge Request stays focused on one concern, such as fixing a bug or adding a feature.
  - [**🪓 Break the task at hand**](#break-the-task): Break down big features into smaller, **deliverable** parts. Share your plan with the team through your issue-tracking system, use feature flags if needed, and create separate Merge Requests for each piece. This makes reviews faster, feedback more focused and useful, and the merging process **safer**.
  - [**🔧 Extract refactors into separate MRs**](#extract-refactors): Keep refactors and functional changes separate. Make a different Merge Request for each refactor, explaining why it's needed. This makes the review of the original Merge Request focused and uncomplicated.
  - [**📏 Extract formattings into separate MRs**](#extract-formattings): Don't mix unnecessary formatting changes with your main updates. If formatting is needed, create a separate branch that formats **all** files of the project automatically using a formatting tool. This also makes the original MR less complicated and easier to read.
  - [**🚧 Don't fix everything on your way**](#dont-fix-everything): Don't be eager to fix every problem or clean up every poorly-written piece of code on your way. The best you can do is to create a ticket in your issue-tracking system when you see a problem (either functional or technical). Prioritize and decide about them with the team.
  - [**🕵️ Review your own MR before asking someone else to review it**](#review-your-own-mr): This helps you view your changes from a new perspective. To do this, make sure to use the reviewing platform you always use to review other MRs.
- [**✅ Make sure CI passes**](#make-ci-pass): It helps save time to catch issues that can be caught automatically by tools rather than a manual review by a teammate.
- [**📝 Meaningful commits**](#meaningful-commits): Make commits meaningful and well-separated. Use your IDE to stage specific and related changes together, keeping things focused. Write concise commit messages (and also MR titles). If you can't make your commit message (or the MR title) concise, it **may** be a sign your Commit (or the MR) is doing more than one thing and could be broken into separate ones.
- [**📋 Write a description for the MR**](#description-for-the-mr): Use the description field for technical details or clarifications. And remember it is only for the reviewers of the MR, not the whole team or other developers who need to read the codebase. Include screenshots when needed (for UI changes). Include a link to the task if you're using an issue-tracking system.
- [**🗨️ Comments**](#comments): Don't resolve comments if you're not the author of them. If you address one, reply to it (including a commit link if applicable) so the author of the comment double-checks and resolves it if needed.
- [**🎯 Final Words**](#conclusion): All these stuff matter because they help us ship better software by making reviews more effective. Each team needs to have their version of metrics for a good MR.

## 🔍 Minimize the diff {#minimize-the-diff}

"Separation of concerns" does not **only** apply to code, components, services, files, and tasks. But also to MRs. Each MR should address one concern: "Fix a bug", "Add a new feature", "Refactor 1 thing", "Re-format the entire code", etc.

This makes the Merge Requests more **pure** and **focused**.

---

### 🪓 Break the task at hand {#break-the-task}

If you have a big feature, chances are you don't have to deliver it all at once. You can break large tasks into **deliverable** chunks. Most of the time, even if business reasons disallow you to break a task, you can still use a feature flag to ease the development and deployment process of an epic feature. Delivering in small chunks also makes the deployment **safer**: Because by breaking the task, the reviewer can give more **focused** feedback, there is a smaller scope to test for and fewer things could break.

We, as a Software Engineers, should help in this regard. Because only we understand better where concerns can and should be separated from a technical point-of-view.

Sometimes we have a perfect plan in mind for breaking big stuff into smaller chunks. But this plan should not be only in our heads. We should communicate it with the team and reflect it in our issue-tracking system, in our branching, and in our Merge Requests.

---

### 🚧 Don't fix everything on your way {#dont-fix-everything}

For every change you are about to do in your branch, ask yourself:

1. Can my task be considered done without what I'm currently doing?
2. Can I separate concerns here to another MR/Task?
3. Are the changes I'm currently doing unrelated to the other changes I was doing before this?

If the answer to any of these questions is "yes", probably you can either create a ticket for that particular change and forget about it in your branch or quickly create a separate MR out of the **main** branch and ask your teammates to review and merge it independently. (and again, forget about it)

For various reasons, we developers, find ourselves doing things that are unrelated to what we were doing or what we should be doing. One is we simply get distracted easily by code. And the other reason is this motto: "Leave the codebase better than you found it", which sounds good, but we'll see in a moment. While developing, sometimes, on your way, you see a badly named variable, a poorly designed function, a file with corrupted spacing and indentations, or a bug in the software, and you want to just fix it on your way as it is a small tweak. Although that sounds good, it adds unnecessary complications for the reviewer and is probably unrelated to what your branch or assigned task is about. If something needs to be fixed, the best you can do is create a ticket in your issue-tracking system. Either a "technical ticket" or a "user story". This way you'll forget about it and can focus back on what you were doing.

A good advantage of leaving stuff for the issue-tracking system is the observability it gets from everyone. If you quietly fix issues as you encounter them, no one else will have an understanding of the amount of bugs and regressions present in the software and your team may neglect the importance of quality engineering. Or if you refactor stuff on the way excessively, no one will ever know how much technical debt the software has. Apart from that, with a ticket, everyone can leave their opinion on what is the best approach for fixing what you've found, rather than you just patching stuff quickly while you are focused on something else.

If you attempt to fix everything along the way, all that outside observers might notice is that tasks are taking longer than expected, because you are doing other stuff quietly.

---

### 🔧 Extract refactors into separate MRs {#extract-refactors}

Avoid mixing refactors and functional changes. Instead, create a separate Merge Request for the needed refactors before the main Merge Request. Make sure to clearly describe why you need this refactor.

Separating refactors prevents the reviewer from going through reviewing a newly added 20-line long function, only to discover later that this function was merely moved from another file. With a separate MR intended only for a refactor, in this example, the reviewer will only check if your "intention of moving the function to another file" is correct, or if everything used in the function will work in its new environment, rather than inspecting closely if the logic of the moved function is correct. Because that function has probably been there for a long time and your Merge Request has nothing to do with the logic behind it.

As another example, if you find the name of a variable unpleasant or misleading, make a Merge Request that renames the variable only. Then, you can rebase your original branch on top of it and use the new variable name, without making your original Merge Request unnecessarily big and complicated. So the reviewer can only check one thing: if "the new variable name truly represents what it holds".

This approach makes the review process of both the refactor MR and the original MR easier and faster, and the original Merge Request remains, again, "pure" and "focused".

---

### 📏 Extract formattings into separate MRs {#extract-formattings}

Similar to the previous point, avoid including unrelated file formatting with your changes. If you need to format some files, create a branch out of the **main** branch that automatically formats **all** files. The reviewer doesn't even need to read through the formatting Merge Request carefully, as you've already described in your Merge Request that "this MR is only code formatting" and most probably a tool automatically did this and tools are **rarely** wrong. (tools being prettier, eslint, etc...)

No reviewer wants to sift through 400 lines of diff that only changes indentations and replaces single quotes with double quotes just to hunt down where the actual change is. (or miss it!)

This approach also, makes review easier, faster, more pure, and more focused.

---

### 🕵️ Review your own MR before asking someone else to review it {#review-your-own-mr}

By doing this, you double-check if your changes are applied correctly in the final diff and ensure you don't have unintended changes in your MR. It happens that we stage and commit changes by mistake, like an unnecessary logger, or a change we experimented with but forgot to revert it. This self-review is especially useful if you've faced and resolved conflicts.

Do this self-review in the reviewing platform you always use to review other people's MRs. Because when you see your MR in those red and green colors and in that UI, you automatically go into your reviewer mode, but for your own MR. You start to see things from a new perspective and notice things you missed when you were authoring the code. You wear your critic glasses for your code. Self-review helps a lot in delivering better code!

## ✅ Make sure CI passes {#make-ci-pass}

If your team/repo uses a CI pipeline, ensure all CI checks pass before requesting a review. This can save time for both you and the reviewer by preventing unnecessary back-and-forth conversations on issues that could be caught automatically by tools.

## 📝 Meaningful commits {#meaningful-commits}

Again, "separation of concerns" is not just about the code and services and classes (and MRs). Your commits should be separated in their concerns too.

Separation in commits helps **you** more than the reviewer, as it makes your mind organized and easy to track. Especially the more small chunks of the changes you stage and commit away, the more focused you will be on what you are doing now. Your working tree won't be cluttered with all sorts of changes. The same goes for your mind and thoughts.

Also, It may help the reviewer. Sometimes the reviewer may need to understand your thought process, instead of looking at the whole dumped diff. Just looking at the list of commits from oldest to newest, they can see what went on in your head. They may want to review your MR one isolated commit at a time. Then skimming through the list, they can safely ignore commits based on their commit message if they know the context.

In most IDEs, there are tools to help you do this more smoothly. IDEs allow you to revert chunks of your changes, or stage only chunks of your current changes to commit. A bad habit is to `git add .` or any equivalent action in your IDE.

When you are about to commit your changes locally, review each file one by one, then out of each file, stage the parts that fit together in one commit. When you have a lot of changes locally, chances are you can create more than one commit out of them.

Also, try to describe what you did in a commit in 1 concise line. If you can't, then it probably means something should be separated into another commit. The same is true about the MR title. If you can't describe in 1 concise line what you did in your MR, most probably it is a sign that some part of it could be separated into another task/MR.

## 📋 Write a description for the MR {#description-for-the-mr}

Make sure you include descriptions with your MR as much as possible, if applicable. If a task is assigned to you, the description of the ticket in your issue-tracking system is a business description that everyone understands, including non-technical people on your team. But sometimes the MRs need more technical clarifications, specifically for the person who is reviewing your code. Try using bullet lists and images when necessary to make reading the description easier.

However, there's a tricky aspect to consider. Always ask yourself: "Is the description I'm writing for the Merge Request something that the entire team should be aware of? Rather than only the reviewer?" If the answer is "yes", then this information should be included within the code itself, rather than as a description for the MR. Either by comments in code or by using proper variable naming and clean-coding techniques. So everyone who reads the code knows about what you had to say.

As another consideration, note that code reviewers are human beings, not rendering engines! If you added/changed a piece of code that contains a lot of styling changes, include a screenshot with the changed result. Some teams have continuous deployments that deploy a short-lived app out of every MR. If you do, also include a link for the preview app so the reviewer can interact with your changes and test them in action.

If you are using an issue-tracking system like JIRA, you can include the link to the task in the description. This way the reviewer can quickly jump to the task and see what the task is about, what the stakeholders said about this task, and what the acceptance criteria are. The more the reviewer knows about your changes, the better they can review them, and the result is "safer" changes. Robust features and changes that don't break other stuff. 💪

## 🗨️ Comments {#comments}

Leave the "Resolve" button on comments for the author of the comment. If you think you have addressed a requested change, the best thing to do is to leave a note: "Thanks, Done!" preferably with a link to the commit that solves the requested change. Or if the comment is just asking questions, reply to the question and, again, leave it unresolved for the reviewer to come back and read the replies on their comments. This way the reviewer gets a chance to double-check the comment, make sure you understood the comment correctly, review the new change if there is any, and if all is good, they can resolve the comment. Otherwise, they can continue requesting changes or asking follow-up questions in the thread of the comment.

If anyone else resolves the reviewer's comment, they never know the conclusion on a question/request they had in their mind. The review process is not a one-time thing. It's more of a back-and-forth communication. Reviewers can use the "resolving" of the comments as a way to track their review process. Then one time they resolve a comment, they notice now all the comments are resolved by themselves, and if all comments are resolved and all files are viewed, it means the MR can be approved. ✅

The term "resolved" means that both the author of the Merge Request and the author of the comment have come to a conclusion and agree to the current state of the code. 👍 Well, the author of the MR always agrees to the current state of the code, if they did not, they would have done things differently. So only if the comment author also agrees to the outcome of the conversation, then and only then does it mean the comment/thread is "resolved"! ✅

As a reviewer, one trick I use when someone else has resolved my comment, is I unresolve it first, check it, and if all is good, I resolve it again, just so that the next time I visit the MR it says this comment is "resolved by me". And I know I don't need to expand it again. Because I'm sure I'm happy with the outcome.

Another good consideration related to comments is if the reviewer asks a question about a piece of code, in addition to replying to the comment, consider if that reply needs to live inside the code as well. If the reviewer does not understand one part easily and asks questions about it, chances are other teammates won't understand that particular piece of code too. So in addition to replying in the comment thread, consider improving the code readability or adding a comment to the code so everyone understands it and not only the reviewer.

## 🎯 Final words {#conclusion}

An exhausted reviewer may overlook things, get lost in reviewing, take longer to review, or misunderstand the intentions. The resulting software will either be of poor quality or will have lots of technical debt. The guidelines above help make the reviewer's life easier, and in return, we receive better software through better peer reviews. 💪 The ultimate purpose of a good MR and a good review is to be able to deploy "safer" code and keep the maintainability of the software at a very good level.

Not all of these considerations necessarily can be applied at the same time though. All these considerations describe "perfection". And our goal is not to reach perfection, but to constantly move towards it. Just having the perfect in mind makes us better and better with each journey.

And, most importantly, remember that this is **my** version of "perfection". You can draw **your** version of perfection based on your specific metrics, e.g. how fast you want a change, team culture, the way the team communicates, how discussions look like usually in an MR, etc... That's having **your** version of "perfection". Or even better: your **team**'s version of perfection

Feel free to use any of my suggestions above though. Or share with me if you have anything you are proud of.

Unfortunately, my blog does not have a comment section, but you can [open an issue or a discussion on GitHub](https://github.com/aghArdeshir/aghardeshir.github.io/) if you have anything to share, any idea, question, disagreement, or want to contribute to this blog post in any other way.

Thanks for reading! ❤️
