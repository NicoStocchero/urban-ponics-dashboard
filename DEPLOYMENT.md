# 🚀 Deployment Guide - Urban Ponics Dashboard

## Deploy to Vercel

### 1. Conectar Repositorio

Ve a [vercel.com/new](https://vercel.com/new) y conecta tu repositorio:

```
NicoStocchero/urban-ponics-dashboard
```

### 2. Configurar el Proyecto

**Framework Preset:** Next.js

**Build Settings:**
- Build Command: `npm run build`
- Output Directory: `.next` (auto-detectado)
- Install Command: `npm install`

### 3. Variables de Entorno

En **Environment Variables**, agrega:

```env
NEXT_PUBLIC_SUPABASE_URL=https://mwbkrkoeltsbkbguoemo.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im13Ymtya29lbHRzYmtiZ3VvZW1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA4OTg5MzMsImV4cCI6MjA4NjQ3NDkzM30.3DrznzqfbNP3RPYOGcj5uXiqPsSzFnWc5AoKyLk0OS8
```

**Importante:** Agrega estas variables para **todos los ambientes** (Production, Preview, Development)

### 4. Branch de Deployment

Selecciona el branch:

```
claude/dashboard-supabase-integration-81EGX
```

### 5. Deploy

Click en **Deploy** y espera ~2 minutos.

---

## ✅ Verificación Post-Deploy

Una vez desplegado, verifica:

1. **Root redirect funciona:**
   - `https://tu-app.vercel.app/` → redirige a → `https://tu-app.vercel.app/es`

2. **i18n funciona:**
   - `/es` - Español ✅
   - `/en` - English ✅
   - `/nl` - Nederlands ✅

3. **Todas las rutas funcionan:**
   - `/es/companies` - Vista de empresas
   - `/es/leads` - Vista de leads
   - `/es/meetings` - Vista de reuniones
   - `/es/campaigns` - Vista de campañas
   - `/es/pipeline` - Vista de pipeline

4. **Datos de Supabase cargan:**
   - Dashboard muestra KPIs
   - Gráfico de rendimiento renderiza
   - Top 10 Deals aparece
   - Tablas tienen datos

---

## 🐛 Troubleshooting

### Error: NOT_FOUND

**Causa:** Middleware no detectado

**Solución:** ✅ Ya resuelto - renombrado `proxy.ts` → `middleware.ts`

### Error: Build Failed

Verifica:
- Node version: `>=18.0.0`
- Variables de entorno configuradas
- Branch correcto seleccionado

### Datos no cargan

Verifica:
- Variables `NEXT_PUBLIC_SUPABASE_*` en Vercel
- Supabase URL es correcta
- Anon key es válida

---

## 📦 Archivos Clave

```
├── vercel.json          # Config de Vercel
├── src/middleware.ts    # i18n routing middleware
├── next.config.ts       # Next.js config
└── .env.local           # Variables locales (NO commitear)
```

---

## 🔄 Re-deploy

Para re-desplegar después de cambios:

```bash
git add .
git commit -m "tu mensaje"
git push origin claude/dashboard-supabase-integration-81EGX
```

Vercel detectará el push automáticamente y re-desplegará.

---

## 🌐 URLs de Producción

Una vez desplegado, obtendrás:

- **Production:** `https://urban-ponics-dashboard.vercel.app`
- **Preview:** `https://urban-ponics-dashboard-git-claude-dashboard-[...].vercel.app`

---

## 💡 Tips

1. **Usar Preview Deploys:** Cada push a una branch crea un preview deployment
2. **Environment Variables:** Cambios requieren re-deploy
3. **Custom Domain:** Configurable en Project Settings → Domains
4. **Analytics:** Habilitado automáticamente en Vercel

---

¿Problemas? Revisa los logs en: `https://vercel.com/[tu-usuario]/urban-ponics-dashboard/deployments`
