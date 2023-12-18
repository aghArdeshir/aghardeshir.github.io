---
outline: deep
---

# 🎓 Merge Request Mastery

<p class="subheading">A guide to creating better Merge Requests for more effective code reviews</p>

Merge Requests (MRs) are a way to allow collaboration on a codebase and make sure the code is up to the decided standards and readable by everyone. This blog post is about making Merge Requests more reviewable and enhancing the quality and value of code reviews. A good merge request is essential because it allows more in-depth discussion about important parts and the result would be better code and better software. My goal in this blog post is to share what makes a good MR in my opinion.

A good MR takes form while the branch is in development. There are some things we need to take into consideration constantly while developing the branch to improve the quality of our MRs.

First I provide a short explanation of each point so you know the context. Then I'll dive deep into each of them, with the philosophy behind it and my takes.

## 📌 TLDR {#tldr}

::: details Super-short TLDR (click to expand)
For a good MR:

- 🔍 Minimize the diff
  - 🪓 Break the task at hand
  - 🚧 Don't fix everything (unrelated stuff) on your way
  - 🔧 Extract out refactors to separate MRs
  - 📏 Extract out formattings to separate MRs
  - 🕵️ Review your own MR before asking anyone else to review it
- ✅ Make sure CI passes
- 📝 Write meaningful commit messages
- 📋 Write a description for the MR (including media when needed)
- 🗨️ Let the comment authors resolve their comment
- 🎯 Create your version of "What a good MR means"
  :::

- [**🔍 Minimize the diff**](#minimize-the-diff): Simplify your changes by asking yourself if you can make them smaller or complete your task without certain changes. Create separate tasks/MRs for additional changes that don't belong to the concern of your current MR, ensuring each Merge Request stays focused on one concern, such as fixing a bug or adding a feature.
  - [**🪓 Break the task at hand**](#break-the-task): Break down big features into smaller, **deliverable** parts. Share your plan with the team through your issue-tracking system, use feature flags if needed, and create separate Merge Requests for each piece. This makes reviews faster, feedback more focused and useful, and the merging process **safer**.
  - [**🚧 Don't fix everything on your way**](#dont-fix-everything): Don't be eager to fix every problem or clean up every poorly-written piece of code on your way. The best you can do is to create a ticket in your issue-tracking system when you see a problem (either functional or technical). Prioritize and decide about them with the team.
  - [**🔧 Extract refactors into separate MRs**](#extract-refactors): Keep refactors and functional changes separate. Make a different Merge Request for each refactor, explaining why it's needed. This makes the review of the original Merge Request focused and uncomplicated.
  - [**📏 Extract formattings into separate MRs**](#extract-formattings): Don't mix unnecessary formatting changes with your main updates. If formatting is needed, create a separate branch that formats **all** files of the project automatically using a formatting tool. This also makes the original MR less complicated and easier to read.
  - [**🕵️ Review your own MR before asking someone else to review it**](#review-your-own-mr): This helps you view your changes and your approach from a new perspective. To do this, make sure to use the reviewing platform you always use to review other MRs.
- [**✅ Make sure CI passes**](#make-ci-pass): It helps save time to catch issues that can be caught automatically by tools rather than a manual review by a teammate.
- [**📝 Meaningful commits**](#meaningful-commits): Make commits meaningful and well-separated. Use your IDE to stage specific and related changes together, keeping things focused. Write concise commit messages (and also MR titles). If you can't make your commit message (or the MR title) concise, it **may** be a sign your Commit (or the MR) is doing more than one thing and could be broken into separate ones.
- [**📋 Write a description for the MR**](#description-for-the-mr): Write some details about your decisions and the reasoning behind them if applicable. And remember it is only for the reviewers of the MR, not the whole team or other developers who need to read the codebase. Include screenshots when needed (for UI changes). Include a link to the task if you're using an issue-tracking system.
- [**🗨️ Comments**](#comments): Don't resolve comments if you're not the author of them. If you address one, reply to it (including a commit link if applicable) so the author of the comment double-checks and resolves it if agreed.
- [**🎯 Final Words**](#conclusion): All these stuff matter because they help us ship better software by making reviews more effective. Each team needs to have their version of a good MR based on their metrics decided by the whole team.

## 🔍 Minimize the diff {#minimize-the-diff}

"Separation of concerns" does not **only** apply to code, components, services, files, and tasks but also to MRs. Each MR should address one concern: "Fix a bug", "Add a new feature", "Refactor 1 thing", "Re-format the entire code", etc.

This makes the Merge Requests more **pure** and **focused**.

---

### 🪓 Break the task at hand {#break-the-task}

If you have a big feature, chances are you don't have to deliver it all at once. You can break large tasks into **deliverable** chunks. Most of the time, even if business reasons disallow you to break a task, you can still use a feature flag to ease the development and deployment process of an epic feature. Delivering in small chunks also makes the deployment **safer**: Because by breaking the task, the reviewer can give more **focused** feedback, there is a smaller scope to test for and fewer things could break.

We, as Software Engineers, should help in this regard. Because only we understand better where concerns can and should be separated from a technical point-of-view.

Sometimes we have a perfect plan in mind for breaking big stuff into smaller chunks. This plan should not be only in our heads. We should communicate it with the team and reflect it in our issue-tracking system, in our branching, and our Merge Requests.

---

### 🚧 Don't fix everything on your way {#dont-fix-everything}

For various reasons, we developers, find ourselves doing things that are unrelated to what we were doing or what we should be doing. One is we simply get distracted easily by code. And the other reason is this motto: "Leave the codebase better than you found it", which sounds good, but we'll see in a moment...

While developing, sometimes, on your way, you see a badly named variable, a poorly designed function, a file with corrupted spacing and indentations, or a bug in the software, and you want to just fix it on your way as it is a small tweak. Although that sounds good, it adds unnecessary complications for the reviewer and is probably unrelated to what your branch or assigned task is about. If something needs to be fixed, the best you can do is create a ticket in your issue-tracking system. Either a "technical ticket" or a "user story". This way you'll forget about it and can focus back on what you were doing.

But if you need the refactor or bug fix for your current task and are blocked by it, then you can create a separate merge request for it.

A good advantage of leaving stuff for the issue-tracking system is the observability it gets from everyone. If you quietly fix issues as you encounter them, no one else will have an understanding of the amount of bugs and regressions present in the software and as a result, your team may neglect the importance of quality engineering. Or if you refactor stuff on the way excessively, no one will ever know how much technical debt the software has. Apart from that, with a ticket, everyone can leave their opinion on what is the best approach for fixing what you've found, rather than just patching stuff quickly while you are focused on something else.

If you attempt to fix everything along the way, all that outside observers notice is that tasks are taking longer than expected, because you are doing other stuff quietly.

---

### 🔧 Extract refactors into separate MRs {#extract-refactors}

Avoid mixing refactors and functional changes. Instead, create a separate Merge Request for the needed refactors before the main Merge Request. Make sure to clearly describe why you need this refactor.

If you don't need a refactor at all in your branch, and you just **feel** like some piece of code is written poorly, then create a technical ticket and leave it for later.

Separating refactors into their own MRs allows the reviewer to focus solely on the intention behind the refactor, such as moving a function to another file, rather than getting caught up in the logic of the function itself. This keeps the review process focused and efficient.

As another example, if you find the name of a variable unpleasant or misleading, make a Merge Request that renames the variable only. Then, you can rebase your original branch on top of it and use the new variable name, without making your original Merge Request unnecessarily big and complicated. So the reviewer of the refactor merge request can only check one thing: "if the new variable name truly represents what it holds".

This approach makes the review process of both the refactor MR and the original MR easier and faster, and the original Merge Request remains, again, **pure** and **focused** on one thing.

---

### 📏 Extract formattings into separate MRs {#extract-formattings}

Similar to the previous point, avoid including unrelated file formatting with your changes. If you need to format some files, create a branch out of the **main** branch and use a tool (prettier, eslint, etc...) that automatically formats **all** files. Because tools are **rarely** wrong. The reviewer doesn't even need to read through the formatting Merge Request carefully, as you've already described in your Merge Request that "this MR is only code formatting".

No reviewer wants to sift through hundreds of lines of diff that only change indentations and replace single quotes with double quotes just to hunt down where the actual change is. (or miss it!)

This approach also, makes review easier, faster, more pure, and more focused.

---

### 🕵️ Review your own MR before asking someone else to review it {#review-your-own-mr}

During development, we experiment with various solutions, we may put a logger in the code, or any other form of experimental change that we may unintentionally commit. Not only unintentionally, but also you may find a better solution than you already committed and you may forget to revert changes related to the former solution. This way you will end up with unwanted changes in your MR.

Another way that unwanted diffs can end up in the MR is when we face and resolve conflicts. We can never be too careful when resolving conflicts, and as a result, we may introduce a change that we did not mean to.

Not only does self-review help you spot unwanted changes, but also helps you double-check your overall approach. If you've worked on the same branch for a long time, you need to double-check if the changes you made on day one, are aligned with the changes you did on the last day. You can double-check if your changes are on the same track and they all follow the same mindset. You get a bird's view of your solution while self-reviewing your MR.

Make sure to do this self-review in the reviewing platform you always use to review other people's MRs. Because when you see your MR in those red and green colors and in that UI, you automatically go into your reviewer mode, but for your own MR. You start to see things from a new perspective and notice things you missed when you were authoring the code. You wear your critic glasses for your code. Self-review helps a lot in delivering better code!

## ✅ Make sure CI passes {#make-ci-pass}

If your team/repo uses a CI pipeline, ensure all CI checks pass before requesting a review. This can save time for both you and the reviewer by preventing unnecessary back-and-forth conversations on issues that could be caught automatically by tools.

## 📝 Meaningful commits {#meaningful-commits}

Creating meaningful and distinct commits not only assists the reviewer but also helps keep your thoughts and progress organized and easy to track. Especially the more small chunks of the changes you stage and commit away, the more focused you will be on what you are doing now. Your working tree won't be cluttered with all sorts of changes. The same goes for your mind and thoughts.

Also, It may help the reviewer. Sometimes the reviewer may need to understand your thought process, instead of looking at the whole dumped diff. Just looking at the list of commits from oldest to newest, they can see what went on in your head. They may want to review your MR one isolated commit at a time. Then skimming through the list, they can safely ignore commits based on their commit message if they know the context.

In most IDEs, there are tools to help you do this more smoothly. IDEs allow you to revert chunks of your changes, or stage only chunks of your current changes to commit. A bad habit is to `git add .` or any equivalent action in your IDE.

When you are about to commit your changes locally, review each file one by one, then out of each file, stage the parts that fit together in one commit. When you have a lot of changes locally, chances are you can create more than one commit out of them.

Again, "separation of concerns" is not just about the code and services and classes (and MRs). Your commits should be separated in their concerns too.

Try to describe what you did in a commit in one concise line. If you can't, then it probably means something should be separated into another commit. The same is true about the MR title. If you can't describe in one concise line what you did in your MR, most probably it is a sign that some part of it could be separated into another task/MR.

## 📋 Write a description for the MR {#description-for-the-mr}

Make sure you include descriptions with your MR as much as possible, if applicable. Try using bullet lists and images when necessary to make reading the description easier.

Writing a description for MRs (and commits) not only benefits the reviewer at review time but it also acts as a form of documentation for anyone who might need to trace back the code later.

However, there's a tricky aspect to consider. If the information in the MR is crucial for the entire team, then this information should be included within the code itself. Either by comments in code or by improving code readability, so everyone who reads the code knows about what you had in mind.

As another consideration, note that code reviewers are human beings, not rendering engines! If you added/changed a piece of code that contains a lot of styling changes, include a screenshot with the changed result. Some teams have continuous deployments that deploy a short-lived app out of every MR. If you do, also include a link for the preview app so the reviewer can interact with your changes and test them in action.

If you are using an issue-tracking system like JIRA, you can also include the link to the task in the description. This way the reviewer can quickly jump to the task and see what the task is about, what everyone said about this task, and what the acceptance criteria are. The more the reviewer knows about your changes, the better they can review them, and the result is **safer** changes. Robust features and changes that don't break other stuff. 💪

## 🗨️ Comments {#comments}

The review process is not a one-time thing. It's more of a back-and-forth communication. Reviewers can use the "resolving" of the comments as a way to track their review process. Then one time they resolve a comment, they notice now all the comments are resolved by themselves, and if all comments are resolved and all files are viewed, it means the MR can be approved. ✅

Leave the "Resolve" button on comments for the author of the comment. If you think you have addressed a requested change, the best thing to do is to leave a note: "Thanks, Done!" preferably with a link to the commit that solves the requested change. Or if the comment is just asking questions, reply to the question and, again, leave it unresolved for the reviewer to come back and read the replies on their comments. This way, we make sure the reviewer sees your reply, gets a chance to double-check the comment, makes sure you understood the comment correctly, reviews the new change if there is any, and if all is good, they can resolve the comment. Otherwise, they can continue requesting changes or asking follow-up questions in the thread of the comment. If anyone else resolves the reviewer's comment, they may never know the conclusion on a question/request they had in their mind.

In this context, the term "resolved" means that both the author of the Merge Request and the author of the comment have come to a conclusion and agree to the current state of the code. 👍 It's obvious the author of the MR always agrees with the current state of the code. If they did not, they would have done things differently. So only if the comment author also agrees to the outcome of the conversation, then and only then does it mean the comment/thread is "resolved"! ✅

Another good consideration related to comments is if the reviewer asks a question about a piece of code, in addition to replying to the comment, consider if that reply needs to live inside the code as well. If the reviewer does not understand one part easily and asks questions about it, chances are other teammates won't understand that particular piece of code too. So in addition to replying in the comment thread, consider improving the code readability or adding a comment to the code so everyone understands it and not only the reviewer.

## 🎯 Final words {#conclusion}

An exhausted reviewer may overlook things, get lost in reviewing, take longer to review, or misunderstand the intentions. The resulting software will either be of poor quality or will have lots of technical debt. The guidelines above help make the reviewer's life easier with a good MR, and in return, we receive better software through better peer reviews. 💪 The ultimate purpose of a good MR and a good review is to be able to deploy **safer** code and keep the maintainability of the software at a very good level.

Not all of these considerations necessarily can be applied at the same time though. All these considerations describe some sort of **perfection**. And our goal is not to reach perfection, but to constantly move towards it. Just having the perfect in mind makes us better and better with each journey.

Most importantly, keep in mind that these guidelines for a good MR are based on my personal experience. You and your team may have different needs based on your metrics like speed of change, team culture, communication style, and so on. And remember everything depends. There are no strict rules, only considerations that are better **if** they could be done. From one task to another, you will need a completely different sort of MR and considerations. How good your MR is, also depends on your mood from one day to another.

Feel free to use any of my suggestions above though while creating your versions of good MR. Or share with me if you have any other considerations you are proud of.

Unfortunately, my blog does not have a comment section, but you can [open an issue or a discussion on GitHub](https://github.com/aghArdeshir/aghardeshir.github.io/) if you have anything to share, any idea, question, disagreement, or want to contribute to this blog post in any other way.

Thanks for reading! ❤️
