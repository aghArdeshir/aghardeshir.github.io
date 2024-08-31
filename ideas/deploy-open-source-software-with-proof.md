# Deploy Open Source Software With Proof

## The Problem

Imagine we have open sourced a project, only to gain trust. Think of a lottery website, or an online casino. How would you gain trust of people in fairness of your platform? One solution is by showing them the code! How? Probably you won't let everyone in your server to take a look at the code, because that wouldn't be safe. Or if the code is a compiled code, it would be even impossible. Then you have to make your code an open source project on GitHub or GitLab or any other platform and everyone is welcome to see your code. It sounds like a good solution, but this is not 100% honest. What if I put my code open source, but upon deploying, I add some devil code in the server manually:

```
if (Math.random() > 0.5) {
  userLosesAllTheMoneyToThePlatform();
}
```

So just putting the code online as open source is not the solution.

## The Solution

The only solution that occurred to me is a platform for deploying open source code. Think of how Vercel works for instance. What Vercel asks for input is only a GitHub repo.

There should be such a platform that accepts GitHub/GitLab repos and some environment variables (to replace on build time) as input and deploys and creates a website as output. No one, not even the owner is allowed to modify anything. The code is deployed as-is (according to the build instructions also available in the repo) and every information about every deployed application is publicly available on the deployment platform. So the users that we are trying to gain their trust, can see the code on GitHub, see the deployed functional website, and check the deployment platform that guarantees the website/service is deployed from that repo.

- As a cherry on top, this platform can add a route to every deployed application, e.g. `https://my-deployed-app.com/gurantee-by-the-deployment-platform` that shows a page that explains everything about the deployed application. For example it gives information like this:

  - This website (https://my-deployed-app.com) is deployed from https://github.com/some-org/some-app
  - We replaced 18 environment variables on the source code at build time:
    - AWS_DB_PASSWORD
    - ENVIRONMENT
    - API_URL
    - API_VERSION
    - ...
  - This application have communicated to 15 different backend APIs in the last 30 days:
    - `https://api.my-deployed-app.com/`: which is guaranteed to deploy from an open source repo. More info: `https://api.my-deployed-app.com/gurantee-by-the-deployment-platform`
    - `https://third-party-api.com`: which is guaranteed to deploy from an open source repo. More info: `https://third-party-api.com/gurantee-by-the-deployment-platform`
    - `https://metrics.google.com`: which is a closed source application and rated safe by 78% of users
    - `https://random-unfairness.com`: which is a closed source application and rated unsafe by 94% of users
    - ...

- As another cherry on top, we can have contributions/donations system for open-source deployed website, with transparency of how much the maintenance of this deployment costs and how much people are contributing to this. So as the developer of the project, all you need is the code. You ask to deploy it, and people contribute to maintenance cost if they find your app useful.
