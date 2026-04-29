# Connected OS — Project Context

## Stack
- Frontend: `index.html` (single-file SPA) → Vercel, repo `vilenkinpavel-eng/crm`
- Bots: `index.js` (Node.js) → Railway, repo `vilenkinpavel-eng/connected-bots`
- DB: Firebase Firestore, project `connected-crm`
- Desktop: Electron app (`Desktop App/`)
- GitHub token: в файле `~/.connected-env`

## Working version
- Commit: `a627a82` (feat: mobile layout, TicketsCloud, supports, tags column)
- Current HEAD восстановлен к этой версии после серии поломок

## Pre-deploy rule (ALWAYS)
node check.js index.html && git add index.html && git commit -m "..." && git push

## What check.js catches
- Duplicate function declarations → SyntaxError in browser
- Unbalanced braces

## Known issues / lessons learned
- При патчинге через Python/Node легко задвоить функции — всегда запускать check.js
- Vercel кеширует — после пуша делать hard refresh (Cmd+Shift+R)
- index.html живёт ТОЛЬКО в папке "GitHub Core" — никаких копий в Downloads

## Pending changes (нужно восстановить поверх a627a82)
1. Taplink + FB Event → вкладка Основное (убрать из Билетов)
2. Теги: нормализация @handle из URL, кнопки "Copy all (Stories)" и "Copy all (post)"  
3. "Add venue" вместо "Drugo" в селекторе площадок
4. "No tickets added" если ни один билет не активен
5. Медиа партнёры: EN, новая структура We provide / Our ask
6. Вкладка "Артисты": хедлайнер + саппорты, видео с Title/Description
7. Площадка: Dorčol Platz, адреса, кастомное название
8. Мобильная верстка: overflow fix, медиа запросы
9. IDLES: сбросить захардкоженные данные (скрипт reset-idles.js)

## Session log
### 2026-04-29
- Серия поломок из-за дублирования функций при патчинге
- Восстановлен рабочий файл (886 строк, 32 функции)
- Создан check.js для защиты от дублей
- Настроен CONTEXT.md для continuity между сессиями
