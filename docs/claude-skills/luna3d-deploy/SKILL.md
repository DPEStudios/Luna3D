---
name: luna3d-deploy
description: "Flujo de trabajo obligatorio para la página web Luna 3D (Next.js, repo DPEStudios/Luna3D, desplegado en Vercel). Usa esta skill SIEMPRE que Daniel pida cambios en la página web Luna 3D / Estrella 3D: edición de componentes, estilos, secciones del home, tema claro/oscuro, header, productos, checkout, cualquier archivo bajo /sessions/sleepy-elegant-ride/mnt/Estrella3D. Esta skill define el contrato: (1) bump automático de APP_VERSION, (2) commit atómico, (3) push automático a origin/main para que Vercel re-despliegue, (4) responder con la URL y la versión nueva. NO entregar cambios 'solo en disco' — Daniel quiere ver los cambios desplegados en Vercel inmediatamente."
---

# Luna 3D — Deploy Workflow (auto-push + version bump)

## Contexto

- **Proyecto:** Luna 3D (marca B2C de Estrella 3D SpA, Daniel Pardo)
- **Repo:** `https://github.com/DPEStudios/Luna3D.git`
- **Branch de producción:** `main`
- **Hosting:** Vercel (auto-deploy al hacer push a `main`)
- **Stack:** Next.js (versión custom en `node_modules/next/dist/docs/` — leer docs antes de usar APIs), CSS modules, Zustand, Supabase
- **Directorio local:** `/sessions/sleepy-elegant-ride/mnt/Estrella3D`
- **Versión actual:** leer de `src/lib/changelog.ts` → `APP_VERSION`

## Regla inmutable

> Daniel **nunca** quiere cambios que queden solo en disco.
> Cada vez que Claude edita un archivo del proyecto Luna 3D, debe cerrar el ciclo con un `git push` a `origin/main` para que Vercel lo despliegue, y debe subir la versión de la aplicación para que el badge del header refleje el cambio.

Si Daniel pide ver los cambios **antes** de subirlos (ej. "muéstrame el diff", "quiero revisar antes"), respétalo y espera su OK — pero la vía por defecto es commitear y pushear sin pedir permiso.

## Setup del entorno sandbox (leer antes del primer push de la sesión)

Este proyecto vive en un sandbox de Cowork con dos particularidades importantes:

### A) Credenciales de GitHub

Daniel ya configuró un Personal Access Token (scope `repo`) guardado en:

```
~/.git-credentials
```

con el formato `https://DPEStudios:<TOKEN>@github.com`, y `credential.helper = store` activado globalmente. Por tanto, un `git push origin main` debería funcionar sin preguntar nada.

Si el push falla con `could not read Username for 'https://github.com'`:

1. Verifica que el archivo exista: `ls -la ~/.git-credentials`
2. Verifica que el remote sea HTTPS limpio: `git remote -v` → debe ser `https://github.com/DPEStudios/Luna3D.git` (sin token embebido).
3. Si falta el archivo, pídele a Daniel un nuevo PAT y recréalo:
   ```bash
   echo "https://DPEStudios:<TOKEN>@github.com" > ~/.git-credentials
   chmod 600 ~/.git-credentials
   git config --global credential.helper store
   ```
4. **Nunca loguees el token ni lo dejes en el URL del remote.** Después de usar un token one-shot en la URL, restaura el remote limpio con `git remote set-url origin https://github.com/DPEStudios/Luna3D.git`.

### B) `.git/index.lock` fantasma (filesystem read-only para `unlink`)

El filesystem del sandbox deja crear archivos pero **no deja borrarlos**. Git crea `.git/index.lock` durante operaciones de escritura y, al terminar, no lo puede remover. Resultado: el siguiente `git add` falla con `fatal: Unable to create '.git/index.lock': File exists`.

**Workaround estándar**: usar un índice alternativo en `/tmp` vía la variable `GIT_INDEX_FILE`:

```bash
# Al inicio de cada sesión de commit
cp /sessions/sleepy-elegant-ride/mnt/Estrella3D/.git/index /tmp/git_index
export GIT_INDEX_FILE=/tmp/git_index

# Ahora todas las operaciones de git usan el índice temporal
git add <archivos>
git status -s            # debe mostrar staged + unstaged como siempre
git commit -m "..."       # funciona, avanza HEAD normalmente
git push origin main
```

Vas a ver warnings tipo `warning: unable to unlink '.git/objects/XX/tmp_obj_...': Operation not permitted` — **son inofensivos**, el objeto ya está escrito, git solo no puede limpiar sus tmp files. Ignóralos.

Si usas `git commit` con HEREDOC, también puede fallar la creación de `.git/HEAD.lock`; el commit igual queda aplicado porque el índice temporal fue escrito exitosamente. Verifica con `git log -1 --oneline` después de cada commit.

### C) Fallback: plumbing commands cuando TODO está bloqueado

Si en una sesión nueva `.git/HEAD.lock`, `.git/index.lock` o `.git/refs/heads/main.lock` ya existen desde una sesión anterior (no se pueden borrar en este sandbox) y hasta `git commit` falla:

```bash
# 1. Reconstruir índice temporal desde HEAD
GIT_INDEX_FILE=/tmp/git_index git read-tree HEAD
GIT_INDEX_FILE=/tmp/git_index git add <archivos>

# 2. Crear tree + commit con plumbing (no toca HEAD)
TREE=$(GIT_INDEX_FILE=/tmp/git_index git write-tree)
PARENT=$(git rev-parse HEAD)
NEW=$(echo "<mensaje de commit multilínea>" | git commit-tree "$TREE" -p "$PARENT")

# 3. Actualizar refs/heads/main sobreescribiendo el archivo directamente
#    (el filesystem del sandbox permite OVERWRITE pero no DELETE, por eso
#    no se puede usar `git update-ref`, que intenta crear un .lock nuevo)
printf "%s\n" "$NEW" > .git/refs/heads/main

# 4. Verificar
git log -1 --oneline

# 5. Push normal
git push origin main
```

Esto funciona porque git no valida HEAD.lock al hacer `git push` — solo lee `refs/heads/main` directamente. Usa este fallback **solo** cuando el workflow normal (sección "Workflow obligatorio") falla con `Another git process seems to be running`.

## Workflow obligatorio (en este orden)

### 1. Hacer los cambios de código

Sigue el CLAUDE.md global de Daniel: separación estricta de responsabilidades, tokens de diseño (nunca magic numbers), componentes resilientes (loading/error/empty), early return, etc.

### 2. Bump de versión en `src/lib/changelog.ts`

Reglas SemVer simplificadas:

- **PATCH** (`1.4.0 → 1.4.1`): fix de bug, ajuste menor de estilo, typo, refactor interno sin cambio visible.
- **MINOR** (`1.4.0 → 1.5.0`): nueva sección, nuevo componente visible, nueva página, tema nuevo, cambios notorios de UX.
- **MAJOR** (`1.x.x → 2.0.0`): rediseño completo, cambio de stack, breaking change en modelo de datos.

Pasos concretos:

1. Editar `APP_VERSION` en `src/lib/changelog.ts`.
2. Agregar una nueva entrada al inicio de `versionHistory` con:
   - `version`: la nueva
   - `date`: fecha de hoy en formato español, ej. `"11 de Abril de 2026"`
   - `title`: título corto en español, con la vibra Luna 3D
   - `changes`: bullets concretos, en español, escritos para el usuario final (no tech-speak)

### 3. Verificación pre-push

```bash
cd /sessions/sleepy-elegant-ride/mnt/Estrella3D
npx tsc --noEmit
```

Si `tsc` falla → **no pushear**, arreglar primero. Bajo ninguna circunstancia pushees código que no compila.

(Opcional pero recomendado si los cambios tocan el build: `npm run build` — pero puede ser lento. Prioriza `tsc --noEmit`.)

### 4. Commit atómico

```bash
cd /sessions/sleepy-elegant-ride/mnt/Estrella3D
git add <archivos específicos, NUNCA git add -A sin revisar>
git status
git commit -m "$(cat <<'EOF'
<tipo>: <resumen corto>

<descripción breve de los cambios en 1-3 líneas>

Bump: vX.Y.Z

Co-Authored-By: Claude Opus 4.6 <noreply@anthropic.com>
EOF
)"
```

Convención de `<tipo>`:
- `feat` — nueva funcionalidad
- `fix` — corrección
- `style` — solo CSS/UI
- `refactor` — reestructura sin cambio de comportamiento
- `docs` — documentación
- `chore` — build, deps, config

### 5. Push a origin/main

```bash
git push origin main
```

Vercel detecta el push y re-despliega automáticamente (~1-2 minutos).

### 6. Responder a Daniel

Formato de respuesta obligatorio al final del turno:

```
✅ Subido a GitHub — v<X.Y.Z>
🚀 Vercel desplegará automáticamente en ~1-2 min

<resumen de 2-4 bullets de lo que cambió>

Commit: <hash corto>
```

## Reglas de seguridad (no negociables)

1. **Nunca `git push --force` a main.** Si un push falla por conflicto, hacer `git pull --rebase origin main` primero, resolver, y volver a pushear.
2. **Nunca commitear `.env`, `*.key`, `credentials.json`.** Siempre `git status` antes de commit para verificar qué entra.
3. **Nunca `git add -A` sin revisar.** Usa paths específicos.
4. **Nunca omitir hooks** (`--no-verify`) a menos que Daniel lo pida explícitamente.
5. **Nunca amendar commits ya pusheados.** Si necesitas corregir, haz un nuevo commit.
6. **Si `tsc` falla, NO pushear.** Arregla primero.

## Archivos clave del proyecto

- `src/app/page.tsx` — Home (secciones: hero, trending, destacados, FeaturedGrids, novedades, mini hero, reseñas)
- `src/app/layout.tsx` — Root layout, header/footer, providers
- `src/components/layout/Header.tsx` — nav principal + toggle tema + login + carrito
- `src/components/layout/Footer.tsx`
- `src/components/layout/CategoryMenu.tsx` — mega menú de categorías
- `src/components/home/*` — TrendingCategories, FeaturedGrid, MiniHero, ReviewsCarousel
- `src/components/ui/ThemeToggle.tsx` + `PlaceholderImage.tsx` + `Button.tsx` + `Toast.tsx`
- `src/store/themeStore.ts` — wrapper de tema (dark/light, persistencia)
- `src/store/cartStore.ts` / `authStore.ts` / `toastStore.ts`
- `src/styles/tokens.css` — **única fuente de tokens** (colores, spacing, radius). Tema claro vía `[data-theme="light"]`. NO hardcodear colores en otros CSS.
- `src/lib/changelog.ts` — fuente única de verdad de la versión.

## Principios de diseño (recordatorio)

- **Tokens, no magic numbers.** Usa `var(--color-*)`, `var(--space-*)`, `var(--radius-*)`.
- **UI tonta, lógica en store.** Zustand stores encapsulan persistencia y side effects.
- **Wrapper de librerías externas.** Si integras algo nuevo, mete un wrapper.
- **Resiliencia visual.** Todo componente maneja loading/error/empty.
- **Responsive.** Mobile ≤768px, tablet ≤1024px, desktop >1024px.
- **Early return** en lógica condicional; evita arrow code.

## Atajos útiles

```bash
# Ver qué archivos cambiaron en el working tree
git status -s

# Diff de lo que vas a commitear
git diff --cached

# Último commit pusheado
git log -1 --oneline

# Versión actual
grep APP_VERSION src/lib/changelog.ts
```

## Cuándo NO usar esta skill

- Cuando Daniel pide solo **leer** archivos del proyecto sin modificarlos.
- Cuando Daniel pide un análisis, explicación o recomendación sin tocar código.
- Cuando el archivo editado está **fuera** de `/sessions/sleepy-elegant-ride/mnt/Estrella3D`.
- Cuando Daniel dice explícitamente "no subas nada todavía" o "quiero revisar primero".
