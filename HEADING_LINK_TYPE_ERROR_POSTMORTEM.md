# Heading and Link Type/Build Error Postmortem

Date: 2026-05-06
Project: portfolio (Next.js 16.2.4, React 19.2.4, TypeScript 5.x)

## Why this document exists

This document explains the exact chain of TypeScript and build errors that happened while scaffolding UI components, especially `Heading.tsx` and `Link.tsx`.

It includes:

1. What broke.
2. Why it broke.
3. The attempted fixes.
4. Why one attempted fix failed again.
5. The final correct solution.
6. Before/after code states.

---

## Environment snapshot at the time

- TypeScript strict mode enabled.
- `jsx` configured as `react-jsx`.
- Build pipeline: Next.js app router + Turbopack.
- Validation commands used:
  - `npm run type-check` (`tsc --noEmit`)
  - `npm run build`

---

## Error chain overview

### Stage 1: Initial scaffold errors

After creating component stubs, TypeScript reported 4 errors:

1. `Cannot find namespace 'JSX'` in `Heading.tsx`.
2. Dynamic `Tag` cannot be used as JSX component.
3. Another `Tag` typing incompatibility from the same dynamic pattern.
4. `LinkProps` conflict in `Link.tsx` because both Next Link props and anchor props define `href` differently.

Representative messages:

- `TS2503: Cannot find namespace 'JSX'`
- `TS2786: 'Tag' cannot be used as a JSX component`
- `TS2320: Interface 'LinkProps' cannot simultaneously extend types ...`

### Stage 2: First fix attempt on Heading

`Heading.tsx` changed from:

```tsx
const Tag = `h${level}` as keyof JSX.IntrinsicElements;
```

to:

```tsx
const Tag = `h${level}` as keyof HTMLElementTagNameMap;
```

Reason for attempt:

- Avoid direct dependency on the global `JSX` namespace.
- Use DOM tag-name map as a typed alternative.

### Stage 3: Why that still failed

A second TypeScript error remained on render:

- The dynamic `Tag` still widened into a union that is not safely compatible with `HTMLAttributes<HTMLHeadingElement>` spread props.
- TypeScript inferred conflicting intrinsic element attribute types (for unrelated tags) when using a computed JSX tag variable.

Representative follow-up message:

- `Type ... is not assignable ... onCopy ... HTMLHeadingElement vs HTMLSlotElement/HTMLBaseElement`

Root cause:

- `props` are typed for heading elements only.
- Computed `Tag` can be interpreted by TS as broader intrinsic element space.
- Spreading heading-only handlers into a broadly inferred tag causes attribute incompatibility.

### Stage 4: Link props issue and fix

Original Link interface:

```tsx
interface LinkProps extends NextLinkProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: "default" | "muted";
}
```

Why it failed:

- `NextLinkProps` and anchor attributes both define `href`, but with different shapes.
- Multiple inheritance with conflicting field type causes `TS2320`.

Fix:

```tsx
interface LinkProps
  extends NextLinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  children: ReactNode;
  variant?: "default" | "muted";
}
```

Why this is correct:

- Keep Next.js canonical `href` typing.
- Keep all safe anchor attributes except conflicting `href`.

---

## Final correct Heading solution

Instead of a computed JSX tag variable, use explicit branch rendering.

Why this is correct:

1. Each branch is a concrete intrinsic element (`h1`..`h6`).
2. `HTMLAttributes<HTMLHeadingElement>` props stay compatible.
3. No dynamic tag type widening.
4. Works cleanly with strict TypeScript.

Final pattern:

```tsx
export function Heading({ level = 2, className, children, ...props }: HeadingProps) {
  const baseStyles = "font-display font-bold tracking-tight text-foreground";
  const mergedClassName = twMerge(clsx(baseStyles, className));

  switch (level) {
    case 1:
      return <h1 className={mergedClassName} {...props}>{children}</h1>;
    case 2:
      return <h2 className={mergedClassName} {...props}>{children}</h2>;
    case 3:
      return <h3 className={mergedClassName} {...props}>{children}</h3>;
    case 4:
      return <h4 className={mergedClassName} {...props}>{children}</h4>;
    case 5:
      return <h5 className={mergedClassName} {...props}>{children}</h5>;
    default:
      return <h6 className={mergedClassName} {...props}>{children}</h6>;
  }
}
```

---

## Before and after states

## Heading before (problematic)

```tsx
const Tag = `h${level}` as keyof JSX.IntrinsicElements;
return (
  <Tag className={...} {...props}>
    {children}
  </Tag>
);
```

Issue:

- Depended on global `JSX` namespace typing path.
- Dynamic tag + strict spread typing mismatch.

## Heading intermediate attempt (still problematic)

```tsx
const Tag = `h${level}` as keyof HTMLElementTagNameMap;
return (
  <Tag className={...} {...props}>
    {children}
  </Tag>
);
```

Issue:

- Removed `JSX` namespace dependency but kept dynamic tag ambiguity.

## Heading final (correct)

- Explicit `h1`..`h6` switch branches.
- Passed both type-check and build.

## Link before (problematic)

```tsx
interface LinkProps extends NextLinkProps, AnchorHTMLAttributes<HTMLAnchorElement> {
  ...
}
```

Issue:

- Conflicting `href` property definitions.

## Link final (correct)

```tsx
interface LinkProps
  extends NextLinkProps,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  ...
}
```

---

## Validation results after final fixes

After applying final fixes:

- `npm run type-check` passed.
- `npm run build` passed.

So the chain is fully resolved.

---

## Practical guidance for future components

1. Prefer explicit intrinsic element branches over computed tag variables when strict DOM prop typing is required.
2. When combining framework props with native HTML props, use `Omit<..., "conflictingProp">` for overlap fields.
3. For reusable primitives, test with both:
   - `npm run type-check`
   - `npm run build`

This catches both pure TS issues and Next.js build-time type integration issues.

---

## Quick takeaway

- `HTMLElementTagNameMap` was a reasonable intermediate attempt to remove `JSX` namespace dependency.
- It still failed because dynamic tag inference remained too broad for strict heading-only props.
- The truly robust solution was explicit heading branches plus `Omit<...>` for Link prop conflicts.
