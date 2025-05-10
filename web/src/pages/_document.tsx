import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" data-theme="light">
      <Head>
        <title>TaskTracks - Optimize Your Workflow</title>
        <meta name="description" content="Streamline Your Workflow, Elevate Your Productivity.
                        From idea to execution, organize, track, and optimize your tasks with seamless ticket management and staging.
                        Whether you're collaborating with teams or managing projects solo, TaskTracks keeps everything in sync, structured, and effortless." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta charSet="UTF-8" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
