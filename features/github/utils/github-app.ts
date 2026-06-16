import { App } from "octokit";

let githubApp:App | null=null;

export function getGithubApp(){
    if(!githubApp){
        githubApp = new App({
            appId:process.env.GITHUB_APP_ID!,
            privateKey: process.env.GITHUB_APP_PRIVATE_KEY!.replace(/\\n/g, "\n"),
            webhooks:{
                secret:process.env.GITHUB_WEBHOOK_SECRET!
            }
        })
    }
    return githubApp;
}

export function getGithubInstallUrl(userId: string) {
    const appSlug =
        process.env.GITHUB_APP_NAME ??
        new URL(process.env.NEXT_PUBLIC_GITHUB_PUBLIC_LINK ?? "https://github.com/apps/ai-powered-code-review").pathname
            .split("/")
            .filter(Boolean)
            .pop();

    if (!appSlug) {
        throw new Error("Missing GitHub App slug");
    }

    const url = new URL(`https://github.com/apps/${appSlug}/installations/new`);
    // `state` round-trips through GitHub so we can link the installation to this user.
    url.searchParams.set("state", userId);
    return url.toString();
  }