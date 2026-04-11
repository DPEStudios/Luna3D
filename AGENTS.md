<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

<!-- BEGIN:luna3d-deploy-rules -->
# Luna 3D — Deploy rule (REGLA INMUTABLE)

Daniel quiere ver **siempre** los cambios desplegados en Vercel. Cada vez que edites código de este proyecto debes cerrar el ciclo así:

1. **Bump de versión** en `src/lib/changelog.ts` (`APP_VERSION` + nueva entrada en `versionHistory`).
   - PATCH: fix menor · MINOR: nueva sección/componente · MAJOR: rediseño.
2. **Verificar tipos**: `npx tsc --noEmit` (si falla, NO pushear).
3. **Commit atómico** con mensaje en español, formato `<tipo>: <resumen>` + bullet de cambios + `Bump: vX.Y.Z` + `Co-Authored-By`.
4. **`git push origin main`** → Vercel re-despliega solo (~1-2 min).
5. **Responder** a Daniel con: versión nueva, resumen corto, hash del commit y confirmación del push.

**No excepciones** salvo que Daniel diga explícitamente "no subas todavía" / "quiero revisar primero".

Detalles completos, convenciones de SemVer y seguridad en: `docs/claude-skills/luna3d-deploy/SKILL.md`
<!-- END:luna3d-deploy-rules -->
