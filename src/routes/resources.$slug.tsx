import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArticleCard } from "@/components/site/cards";
import { PageHero, PlaceholderNote, Section } from "@/components/site/primitives";
import { ARTICLES } from "@/data/site";
import { pageMeta } from "@/lib/seo";
export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params }) => {
    const article = ARTICLES.find((a) => a.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) =>
    loaderData
      ? pageMeta(loaderData.article.title, loaderData.article.excerpt)
      : pageMeta("Article Not Found", "The requested article could not be found."),
  component: Article,
  notFoundComponent: () => (
    <Section>
      <h1 className="text-3xl">Article not found</h1>
      <Button asChild className="mt-6">
        <Link to="/resources">All resources</Link>
      </Button>
    </Section>
  ),
  errorComponent: ({ reset }) => (
    <Section>
      <h1 className="text-3xl">Article unavailable</h1>
      <Button onClick={reset} className="mt-6">
        Try again
      </Button>
    </Section>
  ),
});
function Article() {
  const { article: a } = Route.useLoaderData();
  const related = ARTICLES.filter((x) => x.slug !== a.slug).slice(0, 3);
  return (
    <>
      <PageHero
        eyebrow={a.category}
        title={a.title}
        description={a.excerpt}
        crumbs={[{ label: "Resources", to: "/resources" }, { label: a.title }]}
      >
        <p className="text-sm text-muted-foreground">
          {new Date(a.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}{" "}
          · {a.readTime} · {a.author}
        </p>
      </PageHero>
      <Section>
        <div className="mx-auto max-w-3xl">
          <div className="aspect-16/9 min-w-0 w-full overflow-hidden rounded-3xl bg-secondary">
            <img
              src={a.image}
              alt={`${a.title} article illustration`}
              className="block h-full w-full max-w-full object-cover"
            />
          </div>
          <PlaceholderNote>
            Medically reviewed content placeholder. This article is for general information only and
            is not a substitute for professional medical advice.
          </PlaceholderNote>
          <article className="mt-8 space-y-6">
            {a.body.map((p, i) => (
              <p key={i} className="text-base leading-8 text-muted-foreground">
                {p}
              </p>
            ))}
            <h2 className="text-2xl">When to seek help</h2>
            <p className="text-base leading-8 text-muted-foreground">
              If symptoms are severe, sudden or worrying, seek urgent medical attention. Do not
              delay care because of information read online.
            </p>
          </article>
          <div className="mt-10 flex items-center gap-2 border-t border-border pt-6">
            <span className="mr-2 text-sm font-medium">Share</span>
            {[
              { l: "Facebook", i: Facebook },
              { l: "Twitter", i: Twitter },
              { l: "LinkedIn", i: Linkedin },
            ].map(({ l, i: Icon }) => (
              <Button
                key={l}
                variant="outline"
                size="icon"
                aria-label={`Share on ${l}`}
                className="min-h-11 min-w-11 rounded-full"
              >
                <Icon className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </Section>
      <Section tone="soft">
        <h2 className="text-2xl">Related Articles</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((x) => (
            <ArticleCard key={x.slug} article={x} />
          ))}
        </div>
      </Section>
    </>
  );
}
