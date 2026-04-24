

## Consolidate Schedule into /sessions

### Changes

1. **Rename route**: Change `/schedule` to `/sessions` in `src/App.tsx`
2. **Rename page file**: Rename `src/pages/Schedule.tsx` to keep as-is but update the route it serves
3. **Update Header nav**: Change `navItems` — replace `{ label: "Schedule", to: "/schedule" }` with `{ label: "Sessions", to: "/sessions" }` and remove the duplicate "Sessions" entry pointing to `/#sessions`
4. **Update Header CTA**: "Get your ticket" button currently links to `/schedule` — update to `/sessions`
5. **Update "View all →" link** in `SessionsSection.tsx`: Change from `/schedule` to `/sessions`
6. **Update Footer**: Any links pointing to `/schedule` → `/sessions`
7. **Remove `/#sessions` hash nav**: The "Sessions" nav link will now go to the dedicated `/sessions` page instead of scrolling on the homepage

### Nav structure after consolidation

- Sessions → `/sessions`
- Speakers → `/speakers`

